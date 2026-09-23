---
title: Robotik unter JetPack 7.2 — Was heute funktioniert
sidebar_label: Robotik (Stand der Dinge)
slug: /tutorials/robotics
description: >-
  Eine ehrliche Statusseite zur Robotik-Entwicklung auf dem AGX Orin Developer
  Kit mit JetPack 7.2 — ROS 2, Isaac-ROS-Verfügbarkeit, Robotik-Lern-Stacks und
  das, was Sie nutzen können, während das Ökosystem aufholt.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
review_owner: cheny
---

# Robotik unter JetPack 7.2 — Was heute funktioniert

JetPack 7.2 hat Orin auf eine neue Plattformgeneration gehoben (Ubuntu 24.04,
Kernel 6.8, CUDA 13). Die Robotik ist der eine Bereich, in dem das *Ökosystem*
noch zur Plattform aufholt — deshalb ist diese Seite bewusst eine Statusseite,
kein Tutorial. Prüfen Sie sie, bevor Sie sich auf eine Architektur festlegen.

## Statustabelle (geprüft am 2026-09-24)

| Was Sie brauchen | Status unter JetPack 7.2 / AGX Orin | Hinweise |
|---|---|---|
| **ROS 2 (Kern)** | ✅ Funktioniert | Ubuntu 24.04 ist die Zielplattform für ROS 2 **Jazzy**; installieren Sie gemäß der [ROS-2-Installationsdokumentation](https://docs.ros.org/en/jazzy/Installation.html). Docker-basiertes ROS 2 ist ebenfalls eine Option. |
| **Isaac ROS** (hardwarebeschleunigte ROS-2-Pakete) | ⛔ **Noch nicht — NVIDIA führt es für JetPack 7 als „coming soon“** | Dies ist die größte Lücke. Wenn Isaac ROS heute auf Ihrem kritischen Pfad liegt, bleiben Sie auf **JetPack 6.x** und behalten Sie NVIDIAs [Downloadseite](https://developer.nvidia.com/embedded/jetpack/downloads) im Blick, um das Release nicht zu verpassen. |
| **Lokale LLM-/VLM-/VLA-Modelle** | ✅ Funktioniert | TensorRT Edge-LLM unterstützt Orin unter JP7.2 offiziell, einschließlich **Vision-Language-Action**-Beispielen — siehe [Lokale LLM-Inferenz](/de/tutorials/jetson-agx-orin/local-llm). |
| **Multi-Kamera-Video-Pipelines** | ✅ Funktioniert | DeepStream 9.1 wird mit JP7.2 ausgeliefert — siehe [DeepStream-Videoanalyse](/de/tutorials/jetson-agx-orin/deepstream). |
| **Agentische Verhaltensweisen / Orchestrierung** | ✅ Funktioniert | NemoClaw + Jetson-Agent-Skills — siehe [Agentische KI](/de/tutorials/jetson-agx-orin/agentic-ai). |
| **Robotik-Lern-Stacks (Python-Frameworks im LeRobot-Stil)** | ⚠️ Vor der Festlegung prüfen | Diese Stacks sind stark Python-lastig; Ubuntu 24.04 ist auf Python 3.12 umgestiegen, und einige Abhängigkeiten hinken möglicherweise hinterher. Testen Sie Ihren konkreten Stack unter JP7.2, bevor Sie Ihre Architektur darauf auslegen — und beachten Sie: **wir haben dies nicht auf Hardware verifiziert**. |
| **GR00T (humanoide Foundation-Modelle)** | ⚠️ Offizielle Quellen prüfen | Verfolgen Sie NVIDIAs offizielles Isaac-GR00T-Repository und die Ankündigungen zur Plattformunterstützung. Eine von einem Partner veröffentlichte Schritt-für-Schritt-Anleitung berichtet von einem Full-Weight-TensorRT-Deployment auf AGX Orin + JP7.2 *(Drittanbieter, nicht von uns verifiziert)*. |
| **Eigene Trägerplatinen / BSP-Arbeit** | ✅ Neues Tooling | Die **Agent-Skills zur Jetson-Linux-Anpassung** von JetPack 7.2 automatisieren BSP-Bring-up-Aufgaben — siehe die [Agent-Skills-Repositories](https://github.com/jetson-bsp-skills). |

## Empfehlung

- **Neue Projekte ohne Isaac-ROS-Abhängigkeit:** setzen Sie auf JetPack 7.2 — Sie
  erhalten Unterstützung für Ubuntu 24.04 LTS, CUDA 13, DeepStream 9.1, LLMs auf
  dem Gerät und das Agent-Tooling.
- **Projekte, die heute von Isaac ROS abhängen:** planen Sie vorerst mit
  JetPack 6.x; betrachten Sie JP7.x als Ihr Migrationsziel, sobald Isaac ROS
  dafür erscheint (unser [Migrationsleitfaden](/de/tutorials/jetson-agx-orin/jetpack-6-to-7)
  deckt die nötige Neuaufsetzung ab, wenn es so weit ist).
- **Ein Kit, viele Module:** Denken Sie daran, dass Ihr Developer Kit durch
  erneutes Flashen die anderen Jetson-Orin-Module emulieren kann — praktisch,
  um eine Roboter-Workload über die gesamte Modellreihe hinweg zu validieren,
  bevor Sie sich für ein Serienbauteil entscheiden
  ([Produktübersicht](/de/tutorials/jetson-agx-orin/overview)).

## Quellen

- [JetPack 7.2.1 Downloadseite — Isaac ROS „coming soon“ für JetPack 7](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-24)
- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (Modul-Emulation; geprüft am 2026-09-24)
- [ROS 2 Jazzy Installationsdokumentation](https://docs.ros.org/en/jazzy/Installation.html)

*Status: Entwurf, Überprüfung durch cheny steht aus. Die Verfügbarkeit im
Ökosystem ändert sich schnell — prüfen Sie die verlinkten NVIDIA-Seiten erneut,
bevor Sie sich auf diese Tabelle verlassen. Noch nicht auf physischer Hardware
durch Juxi Technology verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
