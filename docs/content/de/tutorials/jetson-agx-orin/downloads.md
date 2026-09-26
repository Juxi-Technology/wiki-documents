---
title: Downloads & offizielle Links
sidebar_label: Downloads
slug: /downloads
description: >-
  Direkte Links zu den offiziellen Ressourcen für JetPack 7.2.1 /
  Jetson Linux 39.2.1 des Jetson AGX Orin Developer Kit — Images, Tools,
  Dokumentation und Community-Ressourcen.
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: component table lags on some rows (VPI/PVA still show 7.2 values) — see the caveat in the body
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: authoritative source for installed component versions
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
review_owner: cheny
---

# Downloads & offizielle Links

Alle Links auf dieser Seite verweisen auf **offizielle NVIDIA-Ressourcen** und wurden
am **2026-09-23** geprüft (ein Hinweis zu Komponentenversionen wurde am 2026-09-26 ergänzt).
Für Aktualisierungen behandeln Sie die ersten beiden Links als die kanonischen Ausgangspunkte.

## JetPack 7.2.1 / Jetson Linux 39.2.1

- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) — **kanonischer Hub** für Release-Infos und Downloads. ⚠️ **Die Komponententabelle hinkt Zeile für Zeile hinterher**: Stand 2026-09-26 führt sie für VPI und PVA noch die Werte von JetPack **7.2**, und die Isaac-ROS-Zeile lautet weiterhin „coming soon“ (seit 4.6.0 veröffentlicht). Für die Versionen, die ein JetPack-7.2.1-System tatsächlich installiert, verwenden Sie NVIDIAs [Jetson-apt-Repository](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — siehe [System überprüfen](/de/tutorials/jetson-agx-orin/verify-your-system).
- [JetPack-ISO-Image (r39.2.1)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso) — das USB-Installations-Image aus unserem [Schnellstart](/de/tutorials/jetson-agx-orin/quick-start)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager) — Flash-Tool für den Host-PC
- [Yocto-Images für Jetson AGX Orin](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/yocto2) — offizielle Yocto/OpenEmbedded-Rezepte und -Images
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux Archive](https://developer.nvidia.com/embedded/jetson-linux-archive) — ältere Releases

## Dokumentation

- [Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) — die primäre Referenz für dieses Kit
  - [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP Installation](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [JetPack SDK Setup](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) · [Hardware Layout](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — Neuerungen und **bekannte Probleme**
- [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide) — Flash-Unterstützung, Sicherheit, Kamera-Entwicklung, OTA
- [Jetson Linux API Reference](https://docs.nvidia.com/jetson/archives/ApiReference/index.html)
- [Camera Development Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide/SD/CameraDevelopment.html)
- Carrier-Board-Spezifikation: *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification* — aufgeführt auf NVIDIAs [Downloads-Seite](https://developer.nvidia.com/embedded/downloads)

## Tools & Konten

- [Balena Etcher](https://etcher.balena.io) — schreibt das Jetson-ISO auf einen USB-Stick (Windows / macOS / Linux)
- [NVIDIA Developer Program](https://developer.nvidia.com/developer-program) — Mitgliedschaft (kostenlos) erforderlich, um den SDK Manager herunterzuladen
- [NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — offizieller Community-Support

## Lernen & agentische KI (JetPack 7)

- [Jetson AI Lab](https://www.jetson-ai-lab.com) — praxisnahe Tutorials zum Ausführen von KI-Modellen auf dem Jetson
- [NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) — agentische KI auf dem Jetson; Ein-Kommando-Installation seit JetPack 7.2 unterstützt
- [Jetson Device-side Skills](https://github.com/jetson-device-skills) · [Jetson BSP Skills](https://github.com/jetson-bsp-skills) — wiederverwendbare Agent-Skills von NVIDIA

## Juxi Technology

- **Produktkatalog & Zubehör:** <https://wiki.juxitech.com/products/> — Erweiterungen für Ihr Kit (Kameras, Roboterarme, Sensoren und mehr), mit Spezifikationen und Kauf-Links
- **Kontakte:** technischer Support — support@juxitech.com · Vertrieb — sales@juxitech.com · Produktfragen — pe@juxitech.com
- Einstiegs-Skripte und Beispielcode von Juxi werden hier ergänzt, sobald sie verfügbar sind.

## Quellen

- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-23; Hinweis zur Komponententabelle am 2026-09-26)
- [NVIDIA Jetson apt-Repository — Packages-Index](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — maßgeblich für die installierten Komponentenversionen (geprüft am 2026-09-26)

*Status: Entwurf, Überprüfung durch cheny ausstehend.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von Juxi Technology
veröffentlicht und ist keine Veröffentlichung von NVIDIA.
