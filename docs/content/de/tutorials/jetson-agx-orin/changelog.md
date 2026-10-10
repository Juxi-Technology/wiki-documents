---
title: Changelog
sidebar_label: Changelog
slug: /appendix/changelog
description: >-
  Aktualisierungen dieser Dokumentation und die JetPack-Release-Historie für
  das Jetson AGX Orin Developer Kit.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: source for the CUDA 13.2.2 / VPI 4.1.4 correction
review_owner: cheny
---

# Changelog

## Aktualisierungen der Dokumentation

| Datum | Änderung |
|---|---|
| 2026-09-26 | **Zwei Komponentenversionen für JetPack 7.2.1 korrigiert: CUDA 13.2.1 → 13.2.2 und VPI 4.1.3 → 4.1.4.** Beide stammten von NVIDIAs JetPack-Downloadseite, deren Übersichtstabelle noch Werte für JetPack **7.2** enthält; die Versionen wurden über die `nvidia-jetpack`-7.2.1-Abhängigkeitskette in NVIDIAs Jetson-apt-Repository verifiziert. **System überprüfen** (Quellenhinweis zur Tabelle), **Glossar**, **FAQ**, den **Migrationsleitfaden für JetPack 6.x → 7.2** und die Produktseite aktualisiert. Außerdem überall dort, wo diese Seite als Quelle für Komponentenversionen zitiert wird, einen Hinweis ergänzt, dass diese Tabelle nachläuft (**Downloads**, **Glossar**, **DeepStream**, **Migrationsleitfaden**). |
| 2026-09-26 | **Isaac ROS-Status auf JetPack 7.2 korrigiert.** Isaac ROS 4.6.0 (2026-08-18) unterstützt nun Jetson Orin + JetPack 7.2 und löst damit den Status „in Kürze verfügbar“ ab, der zuvor von der JetPack-Downloadseite übernommen wurde (die ihn weiterhin anzeigt). **Robotik** (neue Version und Hinweise zur ROS-2-Distribution), **System überprüfen**, den **Migrationsleitfaden für JetPack 6.x → 7.2** und die **FAQ** aktualisiert. |
| 2026-09-24 | **Glossar** und diesen **Changelog** hinzugefügt. Kontaktinformationen von Juxi Technology (technischer Support, Vertrieb, Produktfragen) in FAQ, Fehlerbehebung und Downloads aufgenommen; den Juxi-Produktkatalog für Zubehör verlinkt. |
| 2026-09-23 | Erster Dokumentationssatz als Entwurf veröffentlicht: Schnellstart, Flashen & Updates, System überprüfen, Produktübersicht, Schnittstellen & Hardware-Layout, FAQ, Fehlerbehebung, Downloads und der Migrationsleitfaden für JetPack 6.x → 7.2. Alle Seiten wurden anhand der offiziellen NVIDIA-Dokumentation verfasst. |

## JetPack-Releases für dieses Kit

| JetPack | Jetson Linux (L4T) | Datum | Hinweise |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **Aktuell.** Fehlerbehebungen und Sicherheitsupdates; T3000-Emulation; Agent-Skills für Video-Pipelines. |
| 7.2 | 39.2.0 | 2026-06 | Erstes Release, das die Jetson-Orin-Familie in JetPack 7 bringt (Ubuntu 24.04, Kernel 6.8, CUDA 13). |
| 6.x | 36.x | 2024–2025 | Vorherige Generation (Ubuntu 22.04, Kernel 5.15, CUDA 12) — wenn Sie noch auf dieser Version sind, siehe die Archive, sowie unseren [Migrationsleitfaden](/de/tutorials/jetson-agx-orin/jetpack-6-to-7). |

Vollständige Versionshistorien: [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux Archive](https://developer.nvidia.com/embedded/jetson-linux-archive)

Um Ihr Kit zu aktualisieren, siehe **[Flashen & Updates](/de/tutorials/jetson-agx-orin/flashing-and-updates)**;
um zu prüfen, welche Version Sie einsetzen, siehe **[System überprüfen](/de/tutorials/jetson-agx-orin/verify-your-system)**.

## Quellen

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-24)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (geprüft am 2026-09-24)

*Status: geprüft am 2026-10-11.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
