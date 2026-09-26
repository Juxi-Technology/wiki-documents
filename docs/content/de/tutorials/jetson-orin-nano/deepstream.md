---
title: Videoanalyse-Pipelines — DeepStream 9.1
sidebar_label: DeepStream-Videoanalyse
slug: /tutorials/deepstream
description: >-
  NVIDIA DeepStream 9.1 auf dem Jetson Orin Nano Super Developer Kit (8GB)
  ausführen — Versionspaarung, Installation, Decode-Grenzen, Speicher und
  Headless-RTSP-Ausgabe.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.ultralytics.com/guides/nvidia-jetson/
    checked: 2026-09-26
review_owner: cheny
---

# Videoanalyse-Pipelines — DeepStream 9.1

DeepStream ist NVIDIAs SDK für den Aufbau beschleunigter Pipelines für
intelligente Videoanalyse (Intelligent Video Analytics, IVA), und DeepStream
9.1 ist das Release, das unter JetPack 7.2 auf Jetson Orin läuft. Diese Seite
behandelt Versionspaarung, Installationswege, Decode-Grenzen, Erwartungen beim
ersten Lauf, Headless-RTSP-Ausgabe und Speicherhinweise für das 8 GB Jetson
Orin Nano Super Developer Kit.

## 1. Versionspaarung

**DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔ TensorRT
10.16.1.7 ↔ GStreamer 1.24.2** (Docker-Image `deepstream:9.1`), wie in der
Tabelle *Platform and OS Compatibility* des
[DeepStream Installation Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html)
aufgeführt.

DeepStream 8.0 und 9.0 führten **nur AGX Thor** auf; 9.1 ist das erste
9.x-Release, dessen Zeile Jetson Orin enthält („AGX Thor, Jetson Orin“) — die
Zeile nennt **„Jetson Orin“** als Gruppe; frühere Zeilen (DS 6.3 bis DS 7.1)
nannten „Orin nano“ ausdrücklich. Es wurde keine 9.1-Release-Note gefunden, die
speziell Orin Nano bestätigt — behandeln Sie die Unterstützung als durch das
Gruppen-Label impliziert (noch nicht bestätigt). Basis-Kit: JetPack 7.2.1 /
L4T r39.2.1.

## 2. Was dieses Kit dekodieren kann

Der Decoder
[Gst-nvvideo4linux2](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html)
nutzt die NVDEC-Hardware-Engine und unterstützt **H.264, H.265, AV1, JPEG und
MJPEG**. Veröffentlichte Fähigkeiten des Orin-Nano-Moduls:

| Fähigkeit | Spezifikation |
|---|---|
| Videodekodierung (H.265) | 1x 4K60 · 2x 4K30 · 5x 1080p60 · 11x 1080p30 |
| Video-Encoding | Kein Hardware-Encoder — „1080p30 wird von 1-2 CPU-Kernen unterstützt“ |
| DLA · PVA | Keine |

Die Inferenz läuft im Plugin
[Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html)
auf TensorRT-Engines: FP16-, FP32- und INT8-Modelle (FP16 und INT8 sind
plattformabhängig); INT8 benötigt eine Kalibrierungsdatei. Die Option
`enable-dla` des Plugins hat auf diesem Modul keine Engine als Ziel — die
Orin-Nano-Produktseite führt „DL Accelerator: -“ und „Vision Accelerator: -“.

**Bei 8 GB:** Dekodierte Frames, Engines und Anwendungsspeicher teilen sich
einen Pool, und es gibt keine DLA, auf die sich Arbeit auslagern ließe. Das
„30-Stream“-Beispiel unten dekodiert 30 1080p-Streams; die veröffentlichte
Dekodierkapazität dieses Moduls beträgt 11x 1080p30 (H.265) — planen Sie also
mit weniger Streams oder geringerer Auflösung. Außerdem gibt es **keinen
Hardware-Video-Encoder** — kodierte Ausgabe (zum Beispiel RTSP-Streaming)
läuft auf der CPU.

## 3. Installation — Docker zuerst

NVIDIAs Leitfaden sagt: „Für neue Nutzer empfohlen: Verwenden Sie Methode 4
(Docker-Container) für das schnellste, abhängigkeitsfreie Setup.“ Die vier
Jetson-Methoden:

| Methode | Was sie ist |
|---|---|
| 1 — SDK Manager | Wählen Sie **DeepStreamSDK** unter „Additional SDKs“ zusammen mit den JetPack-7.2-GA-Komponenten aus. |
| 2 — tar-Paket | `deepstream_sdk_v9.1.0_jetson.tbz2`, ein GitHub-Release-Artefakt. |
| 3 — Debian-Paket | `deepstream-9.1_9.1.0-1_arm64.deb`. |
| 4 — Docker (empfohlen) | Jetson-Container auf NGC (`nvcr.io`). |

Die Jetson-Container sind `nvcr.io/nvidia/deepstream:9.1-samples-multiarch`
(Referenzanwendungen, Beispielmodelle und -konfigurationen) und
`nvcr.io/nvidia/deepstream:9.1-triton-multiarch` (plus Entwicklerbibliotheken
und Triton-Backends). Voraussetzungen: `docker-ce`, das NVIDIA Container
Toolkit, ein NGC-Konto und `docker login nvcr.io` (Benutzername `$oauthtoken`,
Passwort = Ihr NGC-API-Schlüssel).

> **Wichtig**: NVIDIA stellt fest: „Die Jetson-Docker-Container sind nur für
> das Deployment gedacht. Sie unterstützen keine DeepStream-Softwareentwicklung
> innerhalb eines Containers.“ Bauen Sie Anwendungen nativ auf dem Kit und
> fügen Sie Ihre Binärdateien Ihrem eigenen Image hinzu.

Führen Sie in Docker stattdessen `user_additional_install.sh` aus (siehe den
EOS-Hinweis unten). Die Meldung „Failed to detect NVIDIA driver version“ des
Triton-Containers ist harmlos.

> **Juxi-Tipp:** Wählen Sie für eine minimale Host-Installation im SDK Manager
> nur „Jetson OS“ aus, und führen Sie dann `sudo apt install docker.io`,
> `sudo apt install nvidia-container`, `sudo apt install nvidia-l4t-gstreamer`
> und `sudo service docker restart` aus.

## 4. Taktraten maximieren — mit einem kit-spezifischen Leistungsmodus

```bash
sudo nvpmodel -m 2
sudo jetson_clocks
```

Zitiert aus dem Quickstart: „Verwenden Sie für Jetson-Orin-Nano-Module
sudo nvpmodel -m 2 statt -m 0, um den Modus MAXN SUPER zu aktivieren.
Verwenden Sie für alle anderen Jetson-Orin-Module (einschließlich Orin NX)
-m 0.“ Führen Sie diese Befehle aus, bevor Sie DeepStream-Anwendungen starten.
Auf einem Super-konfigurierten 8-GB-Kit sind die Leistungsmodi **15W
(Modus 0)**, **25W (Modus 1, Standard)** und **MAXN_SUPER (Modus 2)**;
MAXN_SUPER existiert nur auf Super-geflashten Einheiten.

> **Achtung**: Wenn 25W / MAXN SUPER fehlt oder `nvpmodel -m 2` einen
> ungültigen Leistungsmodus meldet, wurde die Einheit nicht mit der
> Super-Konfiguration geflasht. Siehe
> [Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting).

## 5. Erster Lauf — TensorRT-Engines werden bei der ersten Verwendung gebaut

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

Zitiert aus dem Quickstart: Bei einem Modell ohne vorhandene Engine-Datei „kann
es bis zu einigen Minuten dauern (je nach Plattform und Modell), bis die Datei
erzeugt und die Anwendung gestartet ist. Bei späteren Läufen können diese
erzeugten Engine-Dateien für schnelleres Laden wiederverwendet werden.“
FPS-Metriken scrollen im Terminal. Das „(~30 FPS für diese Konfiguration)“ des
Quickstarts ist die allgemeine Angabe der Dokumentation — sie ist **keine
Orin-Nano-Messung**. Wenn die Anwendung keine Gst-Elemente erzeugen kann,
leeren Sie den Cache und versuchen Sie es erneut:
`rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`. Weitere
Beispielkonfigurationen decken USB- und CSI-Kameras sowie Tracking mit
sekundärer Inferenz ab.

## 6. Headless-Betrieb mit RTSP-Ausgabe

Der Quickstart dokumentiert, wie Sie ohne Display arbeiten: Die
Standardkonfigurationen verwenden den EGL-basierten Renderer `nveglglessink`
(`type=2` in den `[sink]`-Gruppen), der einen laufenden X-Server erfordert.
Fügen Sie stattdessen eine RTSP-Ausgabe-Sink-Gruppe hinzu — die Gruppe
`[sink2]` in `source30_1080p_dec_infer-resnet_tiled_display.txt` ist das
Beispiel — und setzen Sie `enable=0` für die EGL-Sink-Gruppe. Die kodierte
RTSP-Ausgabe läuft auf der CPU (Abschnitt 2: kein Hardware-Encoder).

> **Juxi-Hinweis:** Bei RTSP-Streams kann die Anwendung beim Erreichen von EOS
> hängen bleiben (ein `rtpjitterbuffer`-Problem). Führen Sie auf Bare Metal
> nach der Installation der Quickstart-Abhängigkeitspakete einmal
> `update_rtpmanager.sh` in `/opt/nvidia/deepstream/deepstream/` aus. Führen
> Sie in Docker stattdessen `user_additional_install.sh` aus.

## 7. Speicherplanung für 8 GB

NVIDIAs Speichereffizienz-Blog stellt fest: „Beim Jetson Orin Nano
8 GB-Modul sind von den 8 GB physischem DRAM nach Firmware- und
Kernel-Reservierungen rund 7,6 GB nutzbar.“ CPU und GPU teilen sich diesen
Pool. Dokumentierte Hebel für DeepStream-artige Pipelines:

| Hebel | Speicher, der zurückgewonnen werden kann |
|---|---|
| Bare Metal statt Container ausführen | Bis zu 70 MB |
| Von Python- auf C++-Anwendungen umstellen | Bis zu 84 MB |
| Tiler/OSD deaktivieren und FakeSink verwenden | Bis zu 258 MB |
| **Gesamt** | **412 MB** |

Das Deaktivieren von Tiler/OSD und die Verwendung von FakeSink „entfernt
Anzeige-Stufen, die für die Visualisierung nötig, in Headless- oder
Produktions-Deployments aber unnötig sind. Das spart Speicher, reduziert die
GPU-Last und verbessert den Durchsatz.“ Das passt zum Headless-RTSP-Weg oben;
das Deaktivieren des grafischen Desktops kann bis zu 865 MB freigeben. Das
vollständige 8-GB-Playbook finden Sie unter
[Speichereffizienz für 8 GB](/de/tutorials/jetson-orin-nano/memory-efficiency).

## Was NVIDIA für dieses Kit nicht veröffentlicht

Die offizielle DeepStream-9.1-Performance-Seite für Jetson deckt nur zwei
Plattformen ab: **Jetson AGX Thor** und **Jetson AGX Orin**. Es sind keine
Orin-Nano-FPS-Werte veröffentlicht; lesen Sie AGX-Orin-Zeilen nicht als
Orin-Nano-Leistung. Beginnen Sie für die Dimensionierung mit der
Dekodierkapazität (Abschnitt 2) und senken Sie dann Stream-Anzahl und
Auflösung, bis die Pipeline passt.

Für den nächstliegenden veröffentlichten Datenpunkt berichten die
[Ultralytics-Jetson-Benchmarks](https://docs.ultralytics.com/guides/nvidia-jetson/)
für YOLO26n auf dem Orin Nano Super etwa 4,57 ms/Bild (~219 FPS) mit einer
TensorRT-FP16-Engine und etwa 3,80 ms/Bild (~263 FPS) mit INT8, bei
640er-Eingabe — **Anbieterdaten, gemessen auf Software der JetPack-6.1-Ära,
nicht auf dem 7.2.1-Stack dieses Kits**; die Inferenzzeit schließt
Vor-/Nachverarbeitung aus. Laut derselben Quelle nutzen nur die Exportformate
PyTorch, TorchScript und TensorRT die GPU — andere Exportformate laufen auf
der CPU.

## Fehlerbehebung und weiterführende Literatur

- Systemweite Probleme (Leistungsmodi, Speicher, Display):
  [Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting) ·
  [Speichereffizienz für 8 GB](/de/tutorials/jetson-orin-nano/memory-efficiency).
- Modelle außerhalb von DeepStream:
  [Lokale LLM-Inferenz](/de/tutorials/jetson-orin-nano/local-llm) ·
  offizielle Performance-Referenz:
  [DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html).

## Quellen

- [DeepStream Installation Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (geprüft am 2026-09-26)
- [DeepStream Quickstart Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (geprüft am 2026-09-26)
- [DeepStream Docker Containers](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html) (geprüft am 2026-09-26)
- [DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) (geprüft am 2026-09-26)
- [Gst-nvvideo4linux2 (Hardware-Decoder)](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html) (geprüft am 2026-09-26)
- [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html) (geprüft am 2026-09-26)
- [Jetson-Orin-Module — Decode-, Encode- und Beschleuniger-Spezifikationen](https://developer.nvidia.com/embedded/jetson-orin) (geprüft am 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson (Entwickler-Blog)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (geprüft am 2026-09-26)
- [Jetson Linux r39.2 Developer Guide — Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (geprüft am 2026-09-26)
- [Ultralytics — NVIDIA Jetson guide (Anbieter-Benchmarks)](https://docs.ultralytics.com/guides/nvidia-jetson/) (geprüft am 2026-09-26)

*Status: Entwurf, Überprüfung durch cheny ausstehend. Basiert auf der
offiziellen NVIDIA-Dokumentation zum angegebenen Datum; noch nicht von Juxi
Technology auf physischer Hardware verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
