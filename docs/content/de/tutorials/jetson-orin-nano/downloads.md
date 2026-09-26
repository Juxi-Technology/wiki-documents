---
title: Downloads & offizielle Links
sidebar_label: Downloads
slug: /downloads
description: >-
  Ein geprüfter Index offizieller NVIDIA-Downloads und -Dokumentation für das
  Jetson Orin Nano Super Developer Kit (8GB) auf JetPack 7.2.1 / L4T r39.2.1,
  plus Partner-Ressourcen und die Einstiegspunkte von Juxi Technology.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-archive
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html
    checked: 2026-09-26
    note: target of the "NVIDIA SDK Manager Documentation" entry on the kit user guide's Additional Docs page
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/overview.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
  - source: https://wiki.juxitech.com/
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Downloads & offizielle Links

Diese Seite ist ein Index der NVIDIA-offiziellen Downloads und Dokumentation
für das **Jetson Orin Nano Super Developer Kit (8GB)** auf **JetPack 7.2.1 /
Jetson Linux (L4T) r39.2.1**, dazu einige Partner-Ressourcen und die
Einstiegspunkte von Juxi Technology. Alle Links wurden am **2026-09-26**
geprüft.

Zwei Orin-Nano-spezifische Fakten sind wichtig, bevor Sie etwas herunterladen:

- **Kein SD-Karten-Image.** Ab JetPack 7.2 wird das Kit über das Jetson ISO
  installiert, das auf einen USB-Stick geschrieben wird. Es gibt kein
  SD-Karten-Image, und das ISO darf nicht auf eine microSD-Karte geschrieben
  werden.
- **Firmware-Hürde.** JetPack 7.2.1 erfordert UEFI/QSPI-Firmware der
  JetPack-6.x-Generation auf dem Kit. Wenn Ihr Kit noch ältere Werksfirmware
  hat, absolvieren Sie zuerst den JetPack 6.x Update Path.

> **Juxi-Tipp:** Der vollständige Einrichtungsablauf steht im [Schnellstart](/de/tutorials/jetson-orin-nano/quick-start). Die Flash- und Update-Optionen werden in [Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates) verglichen.

## JetPack 7.2.1 / Jetson Linux r39.2.1

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) — die Hauptseite zu JetPack: Release Notes, die offizielle Komponenten-Versionstabelle und jeder JetPack-7.2.1-Download-Link.

> ⚠️ **Vertrauen Sie dieser Komponententabelle nicht Zeile für Zeile.** NVIDIA hat sie für 7.2.1 nicht vollständig aktualisiert: Die CUDA-Zeile wurde aktualisiert, die beiden Zeilen daneben aber nicht — VPI zeigt weiterhin den JetPack-7.2-Wert (**4.1.3, während 7.2.1 tatsächlich 4.1.4 liefert**) und die Isaac-ROS-Zeile nennt weiterhin „coming soon“, obwohl Isaac ROS Orin auf JetPack 7.2 seit seinem Release im August 2026 unterstützt. Für Komponentenversionen ist NVIDIAs Paket-Repository maßgeblich: Das Metapaket legt jede Komponente über ihre Abhängigkeitskette fest — [r39.2 arm64 Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages), wobei `nvidia-jetpack-runtime (= 7.2.1-b49)` → `nvidia-vpi (= 7.2.1-b49)` → `libnvvpi4 (= 4.1.4)` (geprüft am 2026-09-26). Komponentenversionen sind auch auf [System überprüfen](/de/tutorials/jetson-orin-nano/verify-your-system) aufgeführt.

- [Jetson ISO für r39.2.1 (Direktdownload)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso) — das Installer-Image für JetPack 7.2.1; die Quick-Start-Seite des Kits verlinkt es als „Direct Download Link: Jetson ISO (r39.2.1)“. Schreiben Sie es auf einen USB-Stick mit 16 GB oder mehr. Zur Downloaddatei wird keine Checksumme veröffentlicht.
- [NVIDIA SDK Manager-Dokumentation](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) — das Host-PC-Tool installieren und verwenden, um das Kit zu flashen, die Firmware zu aktualisieren und JetPack-Komponenten zu installieren (ein NVIDIA Developer Program-Konto ist erforderlich); der Kit-Ablauf steht in [BSP Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html).
- [JetPack-Archiv](https://developer.nvidia.com/embedded/jetpack-archive) — frühere JetPack-Releases, darunter JetPack 7.2 (das erste 7.x-Release mit Unterstützung der Orin-Familie) und die JetPack-6.x-Linie.

## Dokumentation

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — die primäre Referenz für dieses Kit.
  - [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — was neu ist in JetPack 7.2.1, die GA-Erklärung und die Liste der bekannten Probleme.
- [Jetson Linux r39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — Release Notes zu JetPack 7.2.
- [Jetson Linux Developer Guide (r39.2)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) — Flash-Ziele, Partitionskonfiguration und die Plattformtabellen zu Leistung und Leistungsaufnahme.
- [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) — NVIDIAs eigene Liste weiterer Ressourcen für dieses Kit (JetPack SDK, Developer Guide, SDK-Manager-Dokumentation, Jetson Download Center, Jetson AI Lab, Entwicklerforen, Jetson Ecosystem).
- [Jetson Download Center](https://developer.nvidia.com/embedded/downloads) — NVIDIAs Download-Index für Jetson; der Kit-Leitfaden verweist hierher für die Carrier-Board-Spezifikation und die Liste der unterstützten Komponenten. Teile davon erfordern eine NVIDIA-Anmeldung.

## KI-Frameworks & Tutorials

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) — NVIDIAs On-Device-LLM-Inferenz-Stack für Jetson. Orin ist ein offiziell unterstütztes Ziel, allerdings nur mit FP16, INT8 und INT4 ([Support-Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) · [unterstützte Modelle](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)).
- [DeepStream 9.1 installation guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) — Videoanalyse auf Jetson; DeepStream 9.1 ist das Release, das die Orin-Familie auf JetPack 7.2 unterstützt ([Quickstart](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) · [Docker-Container](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)).
- [Jetson AI Lab](https://www.jetson-ai-lab.com/) — ein von Partnern betriebener Hub mit praxisnahen Tutorials zum Ausführen von KI-Modellen auf Jetson, inklusive eines [TensorRT-Edge-LLM-Walkthroughs für Orin Nano 8 GB](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/).
- [SBSA-Wheel-Index (CUDA 13)](https://pypi.jetson-ai-lab.io/sbsa/cu130) — ein partner-gehosteter Index von aarch64-Python-Wheels für JetPack 7.2 / CUDA 13.2; NVIDIA-Mitarbeiter verweisen für die Python-Wheels dieses Releases auf diesen Index.

## Juxi Technology

- **Wiki:** [wiki.juxitech.com](https://wiki.juxitech.com/) — diese Dokumentationsreihe; der [Produktkatalog](https://wiki.juxitech.com/products/) listet Kameras, Sensoren und Zubehör für Jetson-Kits.
- **Shop:** [Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) — der Juxi-Shop-Eintrag für dieses Kit (SKU JX00110).
- **Kontakte:** technischer Support — support@juxitech.com · Vertrieb — sales@juxitech.com · Produktfragen — pe@juxitech.com.

## Quellen

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) (geprüft am 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) und [JetPack-Archiv](https://developer.nvidia.com/embedded/jetpack-archive) (geprüft am 2026-09-26) — ⚠️ ihre Komponententabelle hinkt Zeile für Zeile hinterher; für Komponentenversionen ist [NVIDIAs Paket-Repository](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) maßgeblich (siehe die Warnung oben)
- [NVIDIA-Paket-Repository — r39.2 arm64 Packages-Index](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — maßgeblich für Komponentenversionen, über die Abhängigkeits-Locks in den Metapaketen (geprüft am 2026-09-26)
- Jetson Linux Release Notes — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (geprüft am 2026-09-26)
- [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) (geprüft am 2026-09-26)
- [NVIDIA SDK Manager-Dokumentation](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) (geprüft am 2026-09-26)
- [TensorRT Edge-LLM documentation](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) · [DeepStream 9.1 installation guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) · [SBSA-Wheel-Index](https://pypi.jetson-ai-lab.io/sbsa/cu130) (geprüft am 2026-09-26)
- [Juxi Technology store product page](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) und [wiki](https://wiki.juxitech.com/) (geprüft am 2026-09-26)

*Status: Entwurf, Überprüfung durch cheny ausstehend.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von Juxi Technology
veröffentlicht und ist keine Veröffentlichung von NVIDIA.
