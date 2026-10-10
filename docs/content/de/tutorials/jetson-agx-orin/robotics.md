---
title: Robotik unter JetPack 7.2 — Was heute funktioniert
sidebar_label: Robotik (Stand der Dinge)
slug: /tutorials/robotics
description: >-
  Eine ehrliche Statusseite zur Robotik-Entwicklung auf dem AGX Orin Developer
  Kit mit JetPack 7.2 — ROS 2, Isaac-ROS-Verfügbarkeit, Robotik-Lern-Stacks und
  was Sie prüfen sollten, bevor Sie sich festlegen.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: still lists Isaac ROS as "coming soon"; see the disagreement note below
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
review_owner: cheny
---

# Robotik unter JetPack 7.2 — Was heute funktioniert

JetPack 7.2 hat Orin auf eine neue Plattformgeneration gehoben (Ubuntu 24.04,
Kernel 6.8, CUDA 13). In der Robotik ist das Bild gemischt: Die Kernbausteine
(ROS 2, Isaac ROS) sind auf dieser Plattform inzwischen vorhanden, während sich
Teile des umgebenden Stacks noch einpendeln — deshalb ist diese Seite bewusst
eine Statusseite, kein Tutorial. Prüfen Sie sie, bevor Sie sich auf eine
Architektur festlegen.

## Statustabelle (geprüft am 2026-09-24; Isaac-ROS-Zeile erneut geprüft am 2026-09-26)

| Was Sie brauchen | Status unter JetPack 7.2 / AGX Orin | Hinweise |
|---|---|---|
| **ROS 2 (Kern)** | ✅ Funktioniert | Ubuntu 24.04 ist die Zielplattform für ROS 2 **Jazzy**; installieren Sie gemäß der [ROS-2-Installationsdokumentation](https://docs.ros.org/en/jazzy/Installation.html). Docker-basiertes ROS 2 ist ebenfalls eine Option. |
| **Isaac ROS** (hardwarebeschleunigte ROS-2-Pakete) | ✅ **Unterstützt seit Isaac ROS 4.6.0** (2026-08-18) | Für JetPack 7.2 auf Jetson Orin veröffentlicht, mit offizieller Schritt-für-Schritt-Anleitung zur Einrichtung auf dem AGX Orin. Ihre eigentliche Entscheidung ist die ROS-2-Distribution: **4.6.x auf Jazzy** vs. **5.0 auf Lyrical** — siehe [Isaac ROS unter JetPack 7.2](#isaac-ros-unter-jetpack-7-2). |
| **Lokale LLM-/VLM-/VLA-Modelle** | ✅ Funktioniert | TensorRT Edge-LLM unterstützt Orin unter JP7.2 offiziell, einschließlich **Vision-Language-Action**-Beispielen — siehe [Lokale LLM-Inferenz](/de/tutorials/jetson-agx-orin/local-llm). |
| **Multi-Kamera-Video-Pipelines** | ✅ Funktioniert | DeepStream 9.1 wird mit JP7.2 ausgeliefert — siehe [DeepStream-Videoanalyse](/de/tutorials/jetson-agx-orin/deepstream). |
| **Agentische Verhaltensweisen / Orchestrierung** | ✅ Funktioniert | NemoClaw + Jetson-Agent-Skills — siehe [Agentische KI](/de/tutorials/jetson-agx-orin/agentic-ai). |
| **Robotik-Lern-Stacks (Python-Frameworks im LeRobot-Stil)** | ⚠️ Vor der Festlegung prüfen | Diese Stacks sind stark Python-lastig; Ubuntu 24.04 ist auf Python 3.12 umgestiegen, und einige Abhängigkeiten hinken möglicherweise hinterher. Testen Sie Ihren konkreten Stack unter JP7.2, bevor Sie Ihre Architektur darauf auslegen — und beachten Sie: **wir haben dies nicht auf Hardware verifiziert**. |
| **GR00T (humanoide Foundation-Modelle)** | ⚠️ Offizielle Quellen prüfen | Verfolgen Sie NVIDIAs offizielles Isaac-GR00T-Repository und die Ankündigungen zur Plattformunterstützung. Eine von einem Partner veröffentlichte Schritt-für-Schritt-Anleitung berichtet von einem Full-Weight-TensorRT-Deployment auf AGX Orin + JP7.2 *(Drittanbieter, nicht von uns verifiziert)*. |
| **Eigene Trägerplatinen / BSP-Arbeit** | ✅ Neues Tooling | Die **Agent-Skills zur Jetson-Linux-Anpassung** von JetPack 7.2 automatisieren BSP-Bring-up-Aufgaben — siehe die [Agent-Skills-Repositories](https://github.com/jetson-bsp-skills). |

## Isaac ROS unter JetPack 7.2

Die Ära des „coming soon“ ist vorbei. Das Isaac-ROS-Release **4.6.0**
(2026-08-18) hat Unterstützung für **Jetson Orin** und **JetPack 7.2**
hinzugefügt, und die Tabelle der unterstützten Plattformen führt *Jetson Orin*
zusammen mit *JetPack 7.2* (128+ GB NVMe-SSD). NVIDIA veröffentlicht für diese
Kombination einen eigenen **Jetson AGX Orin**-Schnellstart samt
Docker-Einrichtungsanleitung — dieses Kit ist ein vollwertiges Ziel, keine
Nebensache.

Die Entscheidung, auf die es wirklich ankommt, ist die Wahl der
**ROS-2-Distribution**:

| | Isaac ROS **4.6.x** | Isaac ROS **5.0** |
|---|---|---|
| Veröffentlicht | 2026-08-18 | 2026-09-21 |
| ROS-2-Distribution | **Jazzy** — das Standard-Release von Ubuntu 24.04 | **Lyrical Luth** — NVIDIA baut die ROS-2-Noble-Pakete selbst und stellt sie über sein Buildfarm-CDN bereit |
| NITROS-Pakete | Vorhanden | **Entfernt** und nativ auf `rosidl::Buffer` neu aufgebaut; Code, der NITROS-APIs oder -Typen direkt aufruft, benötigt eine Migration auf Quellcode-Ebene |
| Isaac-Sim-Kompatibilität | 6.0 (5.0/5.1 weiterhin als Legacy unterstützt) | 6.0 |

- Wenn Sie neu anfangen und den Mainstream-Weg möchten: **4.6.x auf Jazzy**
  hält Sie auf dem Standard-ROS-2-Release. **5.0** ist die Richtung, in die
  NVIDIA geht, und bringt das Lyrical-Ökosystem — lesen Sie die in den
  [5.0.0-Release-Notes](https://nvidia-isaac-ros.github.io/releases/index.html)
  verlinkte Migrationsanleitung von NITROS zu `rosidl::Buffer`, bevor Sie
  bestehenden Node-Code aktualisieren.
- **Bekannte Einschränkungen auf Orin** bei diesen Versionen: RealSense-Kameras
  funktionieren **nur im Docker-Modus**; bei `isaac_ros_stereo_image_proc` kann
  die Auswahl von `backend:=JETSON` auf dem AGX Orin mit RGB8/BGR8-Eingabe den
  Node mit einem VPI-Fehler abbrechen — behalten Sie den Standardwert
  `backend:=CUDA` bei; Teleop aus dem Debian-Paket benötigt auf Orin
  `ISAAC_TELEOP_CLOUDXR_EXP=0`; und die Vorverarbeitung des
  `isaac_ros_dnn_image_encoder` aus 5.0 ist auf dem AGX Orin langsamer als bei
  4.6 — wenn dieser Node in Ihrem Graph auf dem heißen Pfad liegt, bevorzugen
  Sie 4.6.
- **OpenCV:** JetPack 7.2 liefert OpenCV **4.8.0** aus, während Isaac ROS
  **4.6.0** erwartet. Entfernen Sie die Systempakete
  (`sudo apt-get remove -y libopencv* opencv*`); dann installieren die
  Isaac-ROS-Pakete ihre gepinnte Version.

### Worüber sich NVIDIAs eigene Seiten widersprechen

NVIDIAs [JetPack-Downloadseite](https://developer.nvidia.com/embedded/jetpack/downloads)
führt Isaac ROS für dieses Release weiterhin als **„coming soon“**, während
die Isaac-ROS-Release-Notes Unterstützung seit 4.6.0 angeben. Die beiden
Seiten wurden nicht miteinander in Einklang gebracht — Isaac ROS wird
unabhängig von JetPack veröffentlicht, und die Komponententabelle der
JetPack-Seite führt auf, was *mit* JetPack ausgeliefert wird. Die
apt-Repositories, auf die die Isaac-ROS-Dokumentation verweist, sind der harte
Beleg für die unterstützte Kombination: `…/isaac-ros/release-4.6 noble-jetpack`
— *noble* für Ubuntu 24.04, *jetpack* für den JetPack-Build. Wenn die beiden
sich widersprechen, behandeln Sie die
[Isaac-ROS-Release-Notes](https://nvidia-isaac-ros.github.io/releases/index.html)
als maßgebliche Quelle und verifizieren Sie auf Ihrem eigenen Setup, bevor Sie
Ihr Design auf eine der beiden stützen.

## Empfehlung

- **Neue Projekte ohne Robotik-Abhängigkeit:** setzen Sie auf JetPack 7.2 — Sie
  erhalten Unterstützung für Ubuntu 24.04 LTS, CUDA 13, DeepStream 9.1, LLMs auf
  dem Gerät und das Agent-Tooling.
- **Projekte, die Isaac ROS einsetzen:** JetPack 7.2 ist wieder ein
  unterstütztes Ziel. Wählen Sie 4.6.x (Jazzy) oder 5.0 (Lyrical) bewusst und
  rechnen Sie mit dem OpenCV-Austausch und damit, dass RealSense-Kameras nur
  im Docker-Modus unterstützt werden. Wenn Sie sich mitten in einem Projekt auf
  JetPack 6.x mit einem validierten Stack befinden, gibt es keinen
  Zwangsumstieg — migrieren Sie, sobald Sie sich für eine Isaac-ROS-Version
  entschieden haben (unser
  [Migrationsleitfaden](/de/tutorials/jetson-agx-orin/jetpack-6-to-7) deckt die
  nötige Neuaufsetzung ab).
- **Ein Kit, viele Module:** Denken Sie daran, dass Ihr Developer Kit durch
  erneutes Flashen die anderen Jetson-Orin-Module emulieren kann — praktisch,
  um eine Roboter-Workload über die gesamte Modellreihe hinweg zu validieren,
  bevor Sie sich für ein Serienbauteil entscheiden
  ([Produktübersicht](/de/tutorials/jetson-agx-orin/overview)).

## Quellen

- [Isaac ROS — Releases: Release-Notes zu 4.6.0 (2026-08-18) und 5.0.0 (2026-09-21)](https://nvidia-isaac-ros.github.io/releases/index.html) (geprüft am 2026-09-26)
- [Isaac ROS 4.6 — Getting Started: unterstützte Plattformen, Jetson-AGX-Orin-Anleitung, apt-Installation](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (geprüft am 2026-09-26)
- [Isaac ROS 5.0 — Getting Started: unterstützte Plattformen, Lyrical-Buildfarm-CDN](https://nvidia-isaac-ros.github.io/getting_started/index.html) (geprüft am 2026-09-26)
- [JetPack 7.2.1 Downloadseite — Komponentenliste](https://developer.nvidia.com/embedded/jetpack/downloads) — enthält weiterhin die veraltete Isaac-ROS-Zeile „coming soon“ (geprüft am 2026-09-26)
- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (Modul-Emulation; geprüft am 2026-09-24)
- [ROS 2 Jazzy Installationsdokumentation](https://docs.ros.org/en/jazzy/Installation.html)

*Status: geprüft am 2026-10-11. Die Verfügbarkeit im
Ökosystem ändert sich schnell — prüfen Sie die verlinkten NVIDIA-Seiten erneut,
bevor Sie sich auf diese Tabelle verlassen. Noch nicht auf physischer Hardware
durch Juxi Technology verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
