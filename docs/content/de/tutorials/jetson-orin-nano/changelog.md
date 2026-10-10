---
title: Changelog
sidebar_label: Changelog
slug: /appendix/changelog
description: >-
  Aktualisierungen dieser Dokumentation und die JetPack-Release-Historie für
  das NVIDIA Jetson Orin Nano Super Developer Kit.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# Changelog

## Aktualisierungen der Dokumentation

| Datum | Änderung |
|---|---|
| 2026-09-26 | Erster Dokumentationssatz als Entwurf veröffentlicht: Schnellstart, Flashen & Updates, System überprüfen, Produktübersicht, Schnittstellen & Hardware-Layout, FAQ, Fehlerbehebung, Downloads, der Migrationsleitfaden JetPack 6.x → 7.2, fünf Tutorials (Lokale LLM-Inferenz, Speichereffizienz, DeepStream, Robotik, Agentische KI), Glossar und dieser Changelog. Verfasst anhand von NVIDIAs offizieller Dokumentation für JetPack 7.2.1; noch nicht auf physischer Hardware verifiziert. |

## JetPack-Releases für dieses Kit

| JetPack | Jetson Linux (L4T) | Datum | Hinweise |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **Aktuell.** Das ISO flasht das Orin Nano Developer Kit jetzt standardmäßig mit der Super-Modus-Konfiguration, womit das r39.2-Problem behoben wird, dass per ISO aktualisierte Geräte auf ihrem vorherigen Leistungsprofil blieben. |
| 7.2 | 39.2.0 | 2026-06 | Erstes JetPack-7-Release für die Orin-Familie (Ubuntu 24.04, Kernel 6.8, CUDA 13.x). Bekanntes Problem dieses Releases: Über das Jetson ISO aktualisierte Geräte wechselten nicht standardmäßig in den Super-Modus — siehe [Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting). |
| 6.2.x | 36.x | 2025 | Die JetPack-6-Linie für dieses Kit (Ubuntu 22.04). Hier wurde der „Super“-Leistungsmodus eingeführt — dieselbe Hardware, mit höheren CPU-/GPU-/Speicher-Taktraten und dem 25-W-Modus. |
| 6.0 / 6.1 | 36.x | 2024–2025 | Frühere JetPack-6-Releases. |
| 5.1.3 | 35.x | 2023–2024 | Älteste heute noch referenzierte Firmware-Linie: Der JetPack 6.x Update Path verwendet ein 5.1.3-Brücken-Image, um sehr alte Kits auf Firmware der JetPack-6.x-Generation zu bringen, bevor JetPack 7 installiert werden kann. |

Vollständige Versionshistorien: [JetPack-Archiv](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson-Linux-Archiv](https://developer.nvidia.com/embedded/jetson-linux-archive)

Um Ihr Kit zu aktualisieren, siehe **[Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates)**;
um zu prüfen, welche Version Sie einsetzen, siehe
**[System überprüfen](/de/tutorials/jetson-orin-nano/verify-your-system)**.

## Quellen

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (geprüft am 2026-09-26)
- [NVIDIA JetPack 6.2 announcement — Super mode for Jetson Orin Nano](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (verlinkt als Herstellerankündigung des Super-Leistungsmodus)

*Status: geprüft am 2026-10-11. Basiert auf NVIDIAs
offizieller Dokumentation zum angegebenen Datum; noch nicht von Juxi Technology
auf physischer Hardware verifiziert.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von Juxi Technology
veröffentlicht und ist keine Veröffentlichung von NVIDIA.
