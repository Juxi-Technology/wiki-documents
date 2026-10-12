---
title: 01 · Überblick
---

# 01 · Überblick

> **Zurück:** Keine – dies ist der erste Teil
> **Weiter:** [02-Environment-Setup](02-Environment-Setup.md)

Dieser Teil erklärt: **wie der komplette Workflow von XLeRobot aussieht, welche Hardware Sie benötigen und ob Ihr Rechner unterstützt wird.**

---

## Workflow

Der komplette Ablauf bei XLeRobot umfasst vier Schritte:

```
① Roboter kalibrieren  →  ② Daten per Teleoperation aufzeichnen  →  ③ Modell trainieren  →  ④ Modell einsetzen und autonom laufen lassen
   kalibrieren             aufzeichnen                               trainieren               einsetzen
```

Das Docker-Image bringt die **Softwareumgebung** für alle vier Schritte bereits mit – Python, PyTorch,
LeRobot, den Roboter-Code von XLeRobot sowie Servo- und Kameratreiber. Sie müssen nicht mehr mit Versionskonflikten kämpfen.

**Selbst bereitstellen müssen Sie** nur: einen Roboter (oder erst einmal nur die Software zum Laufen bringen), einen Computer und ein USB-Kabel.

---

## Hardware-Unterstützung

| Plattform | Unterstützung |
|---|---|
| **Jetson Orin-Serie** (JetPack 7.2) | ✅ **Derzeit offiziell unterstützte Plattform**, GPU-Beschleunigung möglich |
| Jetson Nano (2019, Original) | ❌ Nicht unterstützt – zu wenig Rechenleistung, siehe unten |
| Raspberry Pi / normales Ubuntu / x86-PC | ⏳ **Noch nicht unterstützt**, siehe unten |
| Windows / macOS | ❌ Nicht unterstützt (serielle Schnittstellen und Kamera-Passthrough funktionieren nur unter Linux reibungslos) |

> 💡 **Dieses Image richtet sich derzeit ausschließlich an Jetson-Orin-Geräte.**
>
> - **Jetson Orin Nano / Orin NX / AGX Orin**: erfordern **JetPack 7.2**
>   (L4T 39.2 / CUDA 13.2). Auch das AGX Orin 64GB wird erst ab 7.2 vollständig unterstützt.
> - **Jetson Nano (2019, Original)**: ❌ Nie möglich. Es ist Maxwell-Architektur (Compute 5.3),
>   und CUDA 13 hat die Maxwell-Unterstützung vollständig entfernt; torch verlangt mindestens sm_80.
> - **Raspberry Pi / x86-PC**: Vom Image-Design her unterstützt (die allgemeine CPU-Version basiert auf `python:3.12-slim`,
>   dieses Basis-Image erscheint offiziell für amd64 und arm64),
>   aber **die derzeit veröffentlichte CPU-Version wurde noch nicht Multi-Arch gebaut** –
>   was Sie herunterladen, ist möglicherweise nur amd64 oder nur arm64. Freigabe erfolgt, sobald der Multi-Arch-Build steht.
>
> Empfohlener Arbeitsspeicher: über 4 GB. Auch die 3,4 GB des Jetson Orin Nano reichen noch für die Teleoperation,
> aber das Training wird zäh.

### Systemanforderungen

- Ubuntu 20.04 / 22.04 / 24.04 oder Debian 12+
- Raspberry Pi: 64-Bit-System erforderlich (`uname -m` zeigt `aarch64`)
- Kernel-Unterstützung für USB-Seriell (normalerweise vorhanden)

### Architektur prüfen

```bash
uname -m
```

- `aarch64` → Raspberry Pi, Jetson (arm64-Image verwenden)
- `x86_64` → Gewöhnlicher PC (amd64-Image verwenden)

---

## Die Ordner, die Sie lesen müssen

| # | Ordner | Inhalt | Wann lesen |
|:---:|---|---|---|
| **1** | [**deployment/**](01-Overview.md) (hier) | **Image herunterladen, Image ausführen** | Beim ersten Mal: `01` → `02` → `03` der Reihe nach lesen |
| **2** | [**xlerobot/**](../xlerobot/01-Operation.md) | **Betriebsbefehle für den kompletten XLeRobot** | Wenn Sie den kompletten Roboter haben (beide Arme + Fahrgestell) |
| **3** | [**lerobot/**](../lerobot/01-Operation.md) | **Betriebsbefehle für das Original-LeRobot** | Wenn Sie nur einen einzelnen SO-101- / SO-100-Arm oder einen LeKiwi haben |
| **4** | [**troubleshooting/**](../troubleshooting/01-Troubleshooting.md) | Häufige Probleme und Schnellreferenz | Wenn Probleme auftreten |

> ⚠️ **Die Ordner 2 und 3 sind Alternativen – wählen Sie einen davon**, je nach Ihrer Hardware:
> - **Kompletter XLeRobot** (beide Arme + Fahrgestell) → gehen Sie in `xlerobot/`
> - **Einzelner SO-101 / SO-100 Arm**, **LeKiwi** → gehen Sie in `lerobot/`
>
> Das Image ist dieselbe Umgebung; Sie können jederzeit zwischen den beiden Wegen wechseln, ohne irgendetwas neu zu installieren.

---

## Der kürzeste Weg (erst einmal nur zum Laufen bringen)

**Auf dem Jetson (JetPack 7.2)** – mit wenigen Befehlen bringen Sie den Roboter zuerst zum Laufen und lesen die Details später nach:

```bash
# 1. Docker installieren (überspringen, falls schon installiert)
curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER

# 2. GPU-Zugriff für den Container freischalten (Jetson-spezifisch, nur einmal nötig)
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml --disable-hook enable-cuda-compat
sudo systemctl restart docker

# 3. Image herunterladen (ca. 3,6 GB)
docker pull chenyang310/xlerobot:jetson

# 4. Container starten
docker run -it --rm --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson

# 5. Teleoperation im Container ausführen (beim ersten Mal startet automatisch die geführte Kalibrierung)
python examples/4_xlerobot_teleop_keyboard.py
```

> ⚠️ Der Schnellweg überspringt zwei Dinge, die **früher oder später** erledigt werden müssen; wenn Sie hängen bleiben, lesen Sie das jeweilige Kapitel nach:
> - **Registry-Mirror für Festlandchina** (Schritt 3 kann hängen bleiben) → [02-Environment-Setup §2](02-Environment-Setup.md)
> - **`--disable-hook enable-cuda-compat` darf nicht fehlen** (dieser Hook hat unter
>   JetPack 7.2 einen Bug und lässt den Container nicht starten) → [03-Deployment §4](03-Deployment.md)
>
> Schritt 5 oben führt das Beispiel des **kompletten XLeRobot** aus. Falls Sie nur einen einzelnen SO-101-Arm haben,
> verwenden Sie stattdessen die `lerobot-*`-Kommandozeile, siehe [lerobot/](../lerobot/01-Operation.md).

---

> **Weiter:** [02-Environment-Setup](02-Environment-Setup.md) – Docker installieren, Mirror für Festlandchina einrichten, Hardware anschließen
