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

### Variante A: Direkt herunterladen (empfohlen)

```bash
docker pull chenyang310/xlerobot:cpu-slim
```

`cpu-slim` ist die schlanke Variante (ca. 660 MB Download) und enthält alles, was für Teleoperation, Kalibrierung und Datenaufzeichnung nötig ist.

Wenn Sie die vollständige Version möchten (mit Visualisierung, Training und Diffusion-Policy):

```bash
docker pull chenyang310/xlerobot:cpu
```

### Variante B: Selbst bauen

Geeignet, wenn Sie Anpassungen vornehmen oder den neuesten Quellcode verwenden möchten.

```bash
git clone <repository-url> xlerobot-docker
cd xlerobot-docker

# Allgemeine CPU-Version
bash scripts/build.sh cpu

# Jetson-GPU-Version (auf dem Jetson ausführen)
bash scripts/build.sh jetson
```

Das Build-Skript ist bereits mit Quellen für Festlandchina vorkonfiguriert (Alibaba-Cloud-PyPI, Alibaba-Cloud-Ubuntu-Mirror);
**ein Build aus einem Netzwerk in Festlandchina funktioniert ohne weitere Konfiguration**.

> Der erste Build lädt etwa 2 GB an Abhängigkeiten herunter; in einem langsamen Netz dauert das ein bis zwei Stunden.
> Mit `scripts/sync.sh` und dem `wheels/`-Cache auf dem Board lassen sich bereits heruntergeladene Pakete wiederverwenden.

---

## 2. Unterschiede der Varianten

| Image | Größe | Enthält | Geeignet für |
|---|---|---|---|
| `cpu-slim` | ca. 660 MB | Teleoperation, Kalibrierung, ACT-Policy-Inferenz | Nur den Roboter betreiben |
| `cpu` | ca. 1 GB | Obiges + Visualisierung, Datenaufzeichnung, Training, Diffusion | Den kompletten Workflow |
| `jetson` | ca. 3,6 GB | CPU-Version + **CUDA-Beschleunigung** | Jetson mit GPU-Inferenz |

---

## 3. Container starten

### 3.1 Mit dem Skript starten (empfohlen)

Wenn Sie das Repository geklont haben:

```bash
# Allgemeine Version
bash scripts/run.sh cpu

# Jetson-Version (GPU-Parameter werden automatisch ergänzt)
bash scripts/run.sh jetson
```

Das Skript übernimmt bereits Folgendes:

- **Geräte-Passthrough** – serielle Schnittstellen, Kamera, USB
- **Netzwerk** – `--network host`, benötigt für VR-Teleoperation und Web-Steuerung
- **Quellcode-Mount** – Codeänderungen ohne Neubau des Images
- **Cache-Mount** – Kalibrierungsdateien und Modelldownloads bleiben erhalten

### 3.2 Manuell starten

Ohne Skript, der minimal funktionsfähige Befehl:

```bash
docker run -it --rm \
  --privileged \
  --network host \
  -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=$DISPLAY \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:cpu-slim
```

**Wofür die einzelnen Parameter nötig sind:**

| Parameter | Zweck |
|---|---|
| `--privileged` + `-v /dev:/dev` | Passthrough für serielle Schnittstellen (SO-101-Servos), Kamera und USB |
| `--network host` | Kommunikation zwischen Host- und Client-Prozess (ZMQ) sowie VR-Steuerung |
| `-v ~/.cache/huggingface` | **Kalibrierungsdateien** und Modell-Cache. Ohne diesen Mount muss nach jedem Neustart des Containers neu kalibriert werden |
| `-v /tmp/.X11-unix` + `-e DISPLAY` | Wird für die Visualisierung benötigt (rerun öffnet ein Fenster) |
| `-e HF_ENDPOINT` | `huggingface.co` ist aus Festlandchina nicht erreichbar – der Mirror ist Pflicht |

Nach dem Start landen Sie in einer Bash, das Arbeitsverzeichnis ist `/opt/xlerobot`.

---

## 4. GPU-Parameter unter Jetson ⚠️ Anders als auf anderen Plattformen

Die Jetson-Version **muss** die GPU per CDI erhalten und **darf nicht `--runtime nvidia` verwenden**:

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

### Raspberry Pi / normales Ubuntu / x86-PC —— ⏳ Noch nicht unterstützt

Das Image wird **vom Design her** unterstützt – die allgemeine CPU-Version basiert auf `python:3.12-slim`,
und dieses Basis-Image erscheint offiziell für amd64 und arm64.

Aber **die derzeit veröffentlichte CPU-Version wurde noch nicht Multi-Arch gebaut** (das Build-Skript ist ein
gewöhnliches `docker build` und erzeugt nur die Architektur der Build-Maschine). Was Sie jetzt herunterladen,
ist möglicherweise nur amd64 oder nur arm64 – die jeweils andere Plattform bleibt unbrauchbar.

Sobald der Multi-Arch-Build fertig ist (`docker buildx build --platform linux/amd64,linux/arm64`),
wird dieser Teil freigegeben; bis dahin **verwenden Sie das Image bitte nur auf dem Jetson Orin**.

> Wenn Sie unsicher sind, ob Ihr Image nutzbar ist: <code v-pre>docker image inspect &lt;Image&gt; --format '{{.Architecture}}'</code>
> ausführen und mit `uname -m` vergleichen.

---

## Im Container

Führen Sie zunächst einen Selbsttest aus:

```bash
python -c "import torch, lerobot; print('torch', torch.__version__); print('lerobot', lerobot.__version__)"
```

Erwartete Ausgabe:

```
torch 2.11.0+cu130     ← Jetson-Version; CPU-Version zeigt +cpu
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
