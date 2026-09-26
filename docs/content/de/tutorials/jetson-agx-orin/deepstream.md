---
title: Multi-Stream-Videoanalyse — DeepStream 9.1
sidebar_label: DeepStream-Videoanalyse
slug: /tutorials/deepstream
description: >-
  DeepStream 9.1 auf dem AGX Orin Developer Kit installieren und die
  Referenzanwendung für Videoanalyse ausführen — mit den offiziellen
  Installationsoptionen, Beispielkonfigurationen und JP7.2-spezifischen
  Hinweisen.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-24
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: its component table lags on some rows (VPI/PVA still show 7.2 values) — see the Sources caveat
review_owner: cheny
---

# Multi-Stream-Videoanalyse — DeepStream 9.1

DeepStream ist NVIDIAs Framework für den Aufbau beschleunigter intelligenter
Videoanalyse-Pipelines (Intelligent Video Analytics, IVA), und **DeepStream 9.1
wird auf Jetson Orin mit JetPack 7.2 ausgeliefert**. Dieses Tutorial folgt
NVIDIAs offizieller Installations- und Schnellstart-Dokumentation; jeder der
folgenden Befehle stammt aus diesen Seiten (oder ist direkt daraus
zusammengefasst).

**Versionspaarung:** DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔
TensorRT 10.16.1.7 ↔ Ubuntu 24.04 ↔ GStreamer 1.24.2 *(laut
NVIDIA-Kompatibilitätstabelle)*.

## 1. Installation

NVIDIA bietet auf Jetson vier Installationsmethoden an; die offizielle
Empfehlung lautet **Docker für neue Nutzer** (am schnellsten, ohne
Abhängigkeiten):

- **Methode 4 — Docker (empfohlen für neue Nutzer):** Verwenden Sie die NGC-DeepStream-Container — siehe [Docker Containers](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html).
- **Methode 1 — SDK Manager:** Wählen Sie **DeepStreamSDK** unter „Additional SDKs“ zusammen mit den JetPack-7.2-GA-Komponenten aus.
- **Methode 2 — tar-Paket:** Laden Sie `deepstream_sdk_v9.1.0_jetson.tbz2` herunter (von [NVIDIA/DeepStream releases](https://github.com/DeepStream/releases/tag)), dann:
  ```bash
  sudo tar -xvf deepstream_sdk_v9.1.0_jetson.tbz2 -C /
  cd /opt/nvidia/deepstream/deepstream-9.1
  sudo ./install.sh
  sudo ldconfig
  ```
- **Methode 3 — Debian-Paket:** Installieren Sie `deepstream-9.1_9.1.0-1_arm64.deb` mit `sudo apt-get install ./deepstream-9.1_9.1.0-1_arm64.deb`.

**Voraussetzungspakete** (offizielle Abhängigkeitsliste für die native
Installation):

```bash
sudo apt install \
libssl3 libssl-dev libcurl4-openssl-dev \
libgstreamer1.0-0 gstreamer1.0-tools gstreamer1.0-plugins-good \
gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav \
libgstreamer-plugins-base1.0-dev libgstrtspserver-1.0-0 \
libjansson4 libyaml-cpp-dev libmosquitto1
```

> **Juxi-Hinweis:** Falls das dokumentierte RTSP-Problem auftritt (Anwendungen
> bleiben bei RTSP-Streams bei EOS hängen), führen Sie nach der Installation der
> oben genannten Pakete das Skript `update_rtpmanager.sh` in
> `/opt/nvidia/deepstream/deepstream/` aus.

## 2. Taktraten maximieren (bevor Sie etwas ausführen)

```bash
sudo nvpmodel -m 0
sudo jetson_clocks
```

NVIDIA nennt eine Ausnahme: **Jetson Orin Nano** verwendet `-m 2` für MAXN
SUPER; alle anderen Orin-Module (einschließlich AGX Orin) verwenden `-m 0`.
Führen Sie diese Befehle aus, bevor Sie DeepStream-Anwendungen starten.

## 3. Die Referenzanwendung ausführen

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

Was Sie erwarten können (laut NVIDIA): eine gekachelte Anzeige von 30
simulierten 1080p-Streams mit ResNet-Inferenz sowie Leistungsmetriken — **~30
FPS für diese Konfiguration** — die im Terminal ausgegeben werden. Klicken Sie
auf eine Kachel, um sie zu vergrößern; mit einem Rechtsklick kehren Sie zur
gekachelten Anzeige zurück.

Nützliche Konfigurationsdateien zum Erkunden (alle in diesem Verzeichnis):

| Konfiguration | Anwendungsfall |
|---|---|
| `source30_1080p_dec_infer-resnet_tiled_display.txt` | 30-Stream-Benchmark |
| `source4_1080p_dec_infer-resnet_tracker_sgie_tiled_display.txt` | Tracking + sekundäre Inferenz |
| `source1_usb_dec_infer_resnet.txt` | **Einzelne USB-Kamera** |
| `source1_csi_dec_infer_resnet.txt` · `source2_csi_usb_dec_infer_resnet.txt` | **CSI-Kamera**-Setups (Treiberunterstützung hängt von Ihrer Kamera ab) |
| `source2_1080p_dec_infer-resnet_demux.txt` | Demux-Beispiel |

Hinweise aus der offiziellen Schnellstart-Anleitung:

- **Der erste Lauf mit einem neuen Modell dauert Minuten**, weil die
  TensorRT-Engine erzeugt wird; spätere Läufe verwenden sie erneut.
- Wenn GStreamer-Elemente nicht initialisiert werden können, leeren Sie den
  Cache: `rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`
- **Headless-Betrieb (ohne Monitor):** Der standardmäßige EGL-Sink benötigt ein
  Display. Die Konfigurationen unterstützen stattdessen einen **RTSP-Ausgabe-Sink**
  (siehe die Gruppe `[sink2]` in der 30-Stream-Konfiguration) — streamen Sie die
  Ergebnisse an einen anderen Rechner.
- Alle vorkompilierten Beispielanwendungen liegen unter
  `/opt/nvidia/deepstream/deepstream-9.1/samples/` — jede hat eine README.

## 4. Neuerungen rund um DeepStream 9.1 auf JetPack 7.2

- **Agentengestützte Pipelines:** NVIDIA dokumentiert einen *DeepStream Coding
  Agent* (KI-Agenten-Unterstützung beim Aufbau von Pipelines) —
  [Dokumentation](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_AI_Agent.html) · [GitHub](https://github.com/DeepStream_Coding_Agent).
- **LLM/VLM in der Pipeline:** Die Referenzanwendungen enthalten ein
  **deepstream-vllm-plugin**, mit dem sich Video-Pipelines mit dem Reasoning
  großer Modelle kombinieren lassen — siehe [die
  Dokumentation](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_ref_app_vllm_plugin.html).
  Für On-Device-Modellinferenz außerhalb von DeepStream siehe [Lokale
  LLM-Inferenz](/de/tutorials/jetson-agx-orin/local-llm).
- **Triton auf dem Gerät:** Um den Triton Inference Server nativ (ohne Docker)
  auszuführen, führen Sie `sudo ./triton_backend_setup.sh` im Samples-Verzeichnis
  aus (installiert Triton 2.68.0 für Jetson).

## Fehlerbehebung & weiterführende Literatur

- [DeepStream Troubleshooting & FAQ](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_troubleshooting.html)
- [Performance-Tuning](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) — erforderlich, sobald Sie über die Referenzkonfigurationen hinausgehen
- [Beispielkonfigurationen erklärt](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_sample_configs_streams.html)
- Systemweite Probleme (Display, Stromversorgung, Speicher): siehe [Fehlerbehebung](/de/tutorials/jetson-agx-orin/troubleshooting)

## Quellen

- [DeepStream Installation Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (geprüft am 2026-09-24)
- [DeepStream Quickstart Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (geprüft am 2026-09-24)
- [JetPack 7.2.1 Downloadseite](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-24) — ⚠️ ihre Komponententabelle hinkt bei einigen Zeilen hinterher; die tatsächlich installierten Versionen finden Sie unter [Downloads](/de/tutorials/jetson-agx-orin/downloads)

*Status: Entwurf, Überprüfung durch cheny ausstehend. Basiert auf der offiziellen
NVIDIA-Dokumentation zum angegebenen Datum; noch nicht von Juxi Technology auf
physischer Hardware verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
