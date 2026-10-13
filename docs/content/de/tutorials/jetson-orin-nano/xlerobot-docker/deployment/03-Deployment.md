---
title: 03 · Bereitstellung
---

# 03 · Bereitstellung

> **Zurück:** [02-Environment-Setup](02-Environment-Setup.md)
> **Jetzt einen der beiden Wege wählen**: [xlerobot/](../xlerobot/01-Operation.md) (kompletter Roboter)
> oder [lerobot/](../lerobot/01-Operation.md) (Einzelarm / LeKiwi)

Image auf den Rechner holen, Container starten. Nach diesem Teil befinden Sie sich in einer Shell, in der die komplette Umgebung eingerichtet ist.

---

## 1. Das Image beschaffen

Es gibt genau ein Image:

```bash
docker pull chenyang310/xlerobot:jetson
```

| | |
|---|---|
| Architektur | `arm64` |
| Läuft auf | Jetson + JetPack 7.2 |
| Download | ca. 3,6 GB (nach dem Entpacken größer – halten Sie 20 GB frei) |
| Enthält | Teleoperation, Kalibrierung, Datenaufzeichnung, Training und Inferenz, **GPU-beschleunigt** |

Prüfen, ob es angekommen ist:

```bash
docker images | grep xlerobot
```

Sie sollten `chenyang310/xlerobot` mit dem Tag `jetson` sehen.

> **Festlandchina**: Dieser Pull funktioniert ohne Anpassung – kein Registry-Mirror nötig. Falls es langsam ist, siehe
> [02-Environment-Setup](02-Environment-Setup.md), Abschnitt 2.

### Selbst bauen (Maintainer)

Geeignet, wenn Sie Anpassungen vornehmen oder aus dem neuesten Quellcode bauen möchten.

```bash
git clone <repository-url> xlerobot-docker
cd xlerobot-docker

bash scripts/build.sh jetson
```

Das Build-Skript ist bereits mit Quellen für Festlandchina vorkonfiguriert (Alibaba-Cloud-PyPI, Alibaba-Cloud-Ubuntu-Mirror);
**ein Build aus einem Netzwerk in Festlandchina funktioniert ohne weitere Konfiguration**.

> Der erste Build lädt etwa 2 GB an Abhängigkeiten herunter; in einem langsamen Netz dauert das ein bis zwei Stunden.
> Mit `scripts/sync.sh` und dem `wheels/`-Cache auf dem Board lassen sich bereits heruntergeladene Pakete wiederverwenden.

---

## 2. Was im Image steckt

Ein Image, alles enthalten:

- **Teleoperation und Kalibrierung** – den Roboter von Hand führen und seine Kalibrierung speichern
- **Datenaufzeichnung und Wiedergabe**
- **Training** – ACT, Diffusion Policy, SmolVLA, π₀, π₀.₅, Wall-OSS
- **Inferenz** – eine trainierte Policy auf dem Roboter ausführen, **GPU-beschleunigt**

---

## 3. Container starten

### 3.1 Mit dem Skript starten (empfohlen)

Wenn Sie das Repository geklont haben:

```bash
bash scripts/run.sh jetson
```

Das Skript übernimmt bereits Folgendes:

- **GPU** – `--device nvidia.com/gpu=all` (CDI)
- **Geräte-Passthrough** – serielle Schnittstellen, Kamera, USB
- **Netzwerk** – `--network host`, benötigt für VR-Teleoperation und Web-Steuerung
- **Quellcode-Mount** – Codeänderungen ohne Neubau des Images
- **Cache-Mount** – Kalibrierungsdateien und Modelldownloads bleiben erhalten

### 3.2 Manuell starten

Ohne Skript, der minimal funktionsfähige Befehl:

```bash
docker run -it --rm \
  --name xlerobot \
  --device nvidia.com/gpu=all \
  --privileged \
  --network host \
  -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=$DISPLAY \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson
```

**Wofür die einzelnen Parameter nötig sind:**

| Parameter | Zweck |
|---|---|
| `--device nvidia.com/gpu=all` | **Gibt dem Container die GPU** (über CDI). Ohne ihn gibt es überhaupt keine GPU |
| `--privileged` + `-v /dev:/dev` | Passthrough für serielle Schnittstellen (SO-101-Servos), Kamera und USB |
| `--network host` | Kommunikation zwischen Host- und Client-Prozess (ZMQ) sowie VR-Steuerung |
| `-v ~/.cache/huggingface` | **Kalibrierungsdateien** und Modell-Cache. Ohne diesen Mount muss nach jedem Neustart des Containers neu kalibriert werden |
| `-v /tmp/.X11-unix` + `-e DISPLAY` | Wird für die Visualisierung benötigt (rerun öffnet ein Fenster) |
| `-e HF_ENDPOINT` | `huggingface.co` ist aus Festlandchina nicht erreichbar – der Mirror ist Pflicht |

> Das `/home/jetson` im Mount-Pfad ist das Benutzerverzeichnis **innerhalb des Images** – es fest zu
> verdrahten ist korrekt, denn der Benutzer dieses Images heißt `jetson`.

Nach dem Start landen Sie in einer Bash, das Arbeitsverzeichnis ist `/opt/xlerobot`.

---

## 4. GPU-Parameter – der CDI-Weg

Das Image **muss** die GPU per CDI erhalten – **`--runtime nvidia` darf nicht verwendet werden**:

```bash
docker run -it --rm \
  --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  ... \
  chenyang310/xlerobot:jetson
```

Vor der ersten Verwendung muss auf dem **Hostsystem** eine CDI-Spezifikation erzeugt werden:

```bash
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
sudo systemctl restart docker
```

> **Stolperfalle aus der Praxis**: Unter JetPack 7.2 stürzt der Hook `enable-cuda-compat` von
> `nvidia-container-toolkit 1.19.1` ab (`slice bounds out of range`),
> sodass der Container überhaupt nicht startet. Mit diesem zusätzlichen Parameter lässt er sich deaktivieren:
> ```bash
> sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml \
>   --disable-hook enable-cuda-compat
> ```
> Stimmt die CUDA-Version des Containers mit der des Hostsystems überein, wird dieser Hook nicht benötigt.

### GPU-Verfügbarkeit prüfen

```bash
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

---

## 5. Plattformspezifisches

### Jetson-Orin-Serie —— ✅ Derzeit offiziell unterstützt

| Modell | Erforderlich | Hinweis |
|---|---|---|
| **Orin Nano** | JetPack **7.2** | Unser Testboard (läuft auch mit 3,4 GB Arbeitsspeicher für die Teleoperation) |
| **Orin NX** | JetPack **7.2** | Wie oben |
| **AGX Orin / AGX Orin 64GB** | JetPack **7.2** | ⚠️ 7.0 / 7.1 **unterstützen** das AGX Orin 64GB **nicht** – erforderlich ist 7.2 |

**Die einzige harte Anforderung ist die JetPack-Version**: Das torch im Image ist mit CUDA 13.0 kompiliert,
und CUDA 13.x erfordert einen Treiber **≥ 580**.

| JetPack | L4T | CUDA | Treiber | Nutzbar? |
|---|---|---|---|---|
| 6.2 | 36.4.3 | 12.6 | 540.4.0 | ❌ Treiber zu alt |
| **7.2** | 39.2 | 13.2 | 595er-Serie | ✅ |

Ihre Version anzeigen:

```bash
cat /etc/nv_tegra_release
dpkg -l | grep nvidia-jetpack
```

> ⚠️ Von JetPack 6.x auf 7.x **ist kein `apt upgrade` / OTA möglich** (OTA funktioniert nur innerhalb
> derselben L4T-Hauptversion) – ein komplettes Neuflashen ist erforderlich.

### Jetson Nano (2019, Original) —— ❌ Nie unterstützt

Drei unabhängige Gründe – alle sind Sackgassen:

1. **CUDA 13 hat die Maxwell-Architektur vollständig entfernt**. Der Treiber R580 ist der letzte
   Zweig mit Unterstützung für Maxwell / Pascal / Volta, und CUDA 13 setzt genau 580+ voraus.
   Das Jetson Nano kommt höchstens bis JetPack 4.6.6 / CUDA 10.2.
2. **Compute 5.3 liegt unter der Untergrenze, die torch unterstützt**. Im Image ist torch für die
   Architekturen `sm_80 / sm_90 / sm_100 / sm_110 / sm_120` kompiliert – Minimum ist sm_80,
   das Jetson Nano ist jedoch sm_53: Es gibt weder native Kernel, noch ist es über
   PTX-Just-in-Time-Kompilierung erreichbar.
3. **Die Plattform ist EOL** (JetPack 4 wurde im November 2024 eingestellt).

### Jede andere Plattform —— ❌ Nicht unterstützt

Raspberry Pi, gewöhnliche x86-PCs, Windows und macOS **können dieses Image nicht ausführen**. Es ist gegen
den CUDA-Stack von JetPack 7.2 gebaut und wird ausschließlich als `arm64` ausgeliefert, es gibt also keine
CPU-Ausgabe als Ausweichlösung. Verwenden Sie ein Jetson-Orin-Board.

> Prüfen Sie, was Sie haben: `uname -m` sollte `aarch64` ausgeben, und `cat /etc/nv_tegra_release`
> sollte **R39** melden.

---

## Im Container

Führen Sie zunächst einen Selbsttest aus:

```bash
python -c "import torch, lerobot; print('torch', torch.__version__); print('lerobot', lerobot.__version__)"
```

Erwartete Ausgabe:

```
torch 2.11.0+cu130
lerobot 0.6.2
```

> ⚠️ **`xlerobot` und `xlerobot_mecanum` dürfen nicht in denselben Prozess** – beide registrieren sich im Quellcode
> als `"xlerobot"` (ein Bug im XLeRobot-Upstream), sonst erscheint
> `Cannot register ... as xlerobot because ... already registered`.
>
> Alle anderen Kombinationen sind unproblematisch: **Die Roboter des Original-LeRobot und XLeRobot können im selben Prozess koexistieren**
> (gemessen: 8 Typen wurden gleichzeitig erfolgreich registriert), `xlerobot_2wheels` kollidiert ebenfalls nicht.
> Ein Roboter verwendet nur eine Variante, daher ist der normale Betrieb nicht beeinträchtigt.

---

> **Jetzt einen der beiden Wege wählen**: [xlerobot/](../xlerobot/01-Operation.md) kompletter Roboter ·
> [lerobot/](../lerobot/01-Operation.md) Einzelarm / LeKiwi
