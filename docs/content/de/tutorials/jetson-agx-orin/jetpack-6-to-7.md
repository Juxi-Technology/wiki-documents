---
title: Migration von JetPack 6.x auf JetPack 7.2
sidebar_label: Migration von JetPack 6.x
slug: /migration/jetpack-6-to-7
description: >-
  Was sich auf dem Jetson AGX Orin Developer Kit zwischen JetPack 6.x und
  JetPack 7.2.1 ändert, was neu gebaut werden muss und eine empfohlene
  Migrationsreihenfolge.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: its component table lags on some rows (VPI/PVA still show 7.2 values)
  - source: https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/
    checked: 2026-09-23
    note: secondary source — used for migration-topic organization only
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
    note: Isaac ROS support status — supersedes the "coming soon" note in the migration checklist
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 (not the 13.2.1 shown on the JetPack downloads page) per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# Migration von JetPack 6.x auf JetPack 7.2

Diese Seite richtet sich an bestehende JetPack 6.x-Nutzer auf dem AGX Orin Developer Kit.
Neue Kits: Beginnen Sie stattdessen mit dem [Schnellstart](/de/tutorials/jetson-agx-orin/quick-start).

## Was sich ändert

| Ebene | JetPack 6.x-Ära | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (6.2 verwendete 36.4.x) | **39.2.1** |
| Betriebssystem / Root-Dateisystem | Ubuntu 22.04 | **Ubuntu 24.04** |
| Linux-Kernel | 5.15 | **6.8** |
| CUDA | 12.x | **13.2.2** |
| TensorRT | 10.x (6.x-Ära) | **10.16.2** |

> Die Werte in der JetPack 6.x-Spalte sind beispielhaft (JetPack 6.2-Ära). Prüfen
> Sie **Ihre** genauen aktuellen Versionen mit `cat /etc/nv_tegra_release`, bevor
> Sie planen, und sehen Sie in NVIDIAs [JetPack-Archiv](https://developer.nvidia.com/embedded/jetpack-archive)
> für Details zu den einzelnen Releases nach.

## Was ist neu für Orin in der 7.2-Linie

Aus den Release Notes zu Jetson Linux 39.2:

- Die **Jetson Orin-Familie wird Teil der JetPack 7**-Software-Linie (dieselbe Generation wie Thor).
- **Einheitliche ISO-Installation** — ein Installationsweg per USB-Stick, kein Host-PC erforderlich.
- **NemoClaw**-Installation mit einem einzigen Befehl für agentische KI-Workflows.
- Offizielle **Yocto/OpenEmbedded-Rezepte** (OE4T) für individuelle Produktions-Images.
- Kamera-Stack: **SIPL API v2.0** (GMSL und CoE) — beachten Sie, dass dieses Release **ABI-Änderungen** enthält: Für JetPack 7.1 gebaute UDDF-Treiber müssen gegen die Header von JetPack 7.2 neu gebaut werden.
- *(AGX Orin 32GB Super Mode / MAXN_SUPER gilt nur für 32GB und nicht für das 64GB-Kit. Die SBSA- und MIG-Änderungen betreffen Jetson Thor.)*

## Was nicht übernommen werden kann — Neuaufbau einplanen

- **Out-of-Tree-Kernelmodule** — der Kernel ist auf 6.8 umgestiegen; Module müssen gegen die neuen Header neu gebaut werden.
- **Kameratreiber und Device-Tree-Anpassungen** — für 39.2 neu bauen; SIPL 2.0 bringt außerdem ABI-Änderungen für UDDF-Treiber.
- **TensorRT-Engines** — serialisierte Engines sind an die TensorRT-Version gebunden; bauen Sie sie mit TensorRT 10.16.2 auf dem Zielgerät neu.
- **CUDA-Binärdateien** — mit CUDA 13 neu bauen; erwarten Sie nicht, dass 12.x-Binärdateien übernommen werden können.
- **Container** — wechseln Sie zu JetPack 7-kompatiblen Images (z. B. aktualisierte NGC-Container).
- **Python-Umgebungen und Systemdienste** — für Ubuntu 24.04 neu erstellen (Paketnamen, Repositories und Interpreter-Versionen haben sich geändert).

## Empfohlene Migrationsreihenfolge

1. **Prüfen Sie, dass Ihr Software-Stack auf 7.2.1 unterstützt wird**, *bevor* Sie irgendetwas löschen — prüfen Sie jede Komponente, von der Sie abhängen, gegen NVIDIAs [JetPack 7.2.1-Komponentenliste](https://developer.nvidia.com/embedded/jetpack/downloads). Diese Seite kann bei unabhängig veröffentlichten SDKs hinterherhinken: sie führt Isaac ROS weiterhin als „in Kürze verfügbar“ auf, obwohl Isaac ROS 4.6.0 Unterstützung für Jetson Orin + JetPack 7.2 hinzugefügt hat (siehe [Robotik unter JetPack 7.2](/de/tutorials/jetson-agx-orin/robotics)).
2. **Sichern Sie:** Anwendungsdaten, Sensor-Kalibrierungsdateien, Container-Volumes, Device-Tree-Quellen, TensorRT-Build-Skripte/ONNX-Modelle.
3. **Flashen Sie JetPack 7.2.1** ([Flashen & Updates](/de/tutorials/jetson-agx-orin/flashing-and-updates)) und validieren Sie: Boot, Speicher, Netzwerk und ob der Force-Recovery-Modus weiterhin funktioniert.
4. **Stellen Sie Peripheriegeräte wieder her:** Wi-Fi, Kameras, CAN- oder Feldbus-Treiber — neu gebaut für Kernel 6.8.
5. **Bauen Sie** CUDA-Anwendungen, TensorRT-Plugins und TensorRT-Engines **auf dem Zielgerät** neu.
6. **Validieren Sie Ihre Anwendung zuerst in ihrem ursprünglichen Leistungsmodus**; testen Sie erst danach andere Leistungsmodi.
7. **Dokumentieren Sie Baselines:** Speicherverbrauch, Wärmeentwicklung, Leistungsaufnahme, Latenz, Durchsatz — bevor Sie in den Produktivbetrieb gehen.

## Rollback

- Behalten Sie vor dem Löschen eine **nachweislich funktionierende Kopie** Ihres aktuellen Systems (ein Ersatz-Image für NVMe/eMMC oder mindestens die Daten aus Schritt 2).
- Der ISO-Installer kann jede L4T-Version installieren, für die Sie Installationsmedien besitzen — bewahren Sie den älteren Installer-USB-Stick auf, falls Sie zurückgehen müssen.
- Für Flotten: Rollen Sie schrittweise aus, und bevorzugen Sie Lösungen mit einem unabhängigen Wiederherstellungspfad (Recovery-USB + Backup-Image) gegenüber In-Place-Upgrades.

## Quellen

- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — *What's New*, bekannte Probleme (geprüft am 2026-09-23)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-23) — ⚠️ die Komponententabelle ist bei einigen Zeilen veraltet; für die Versionen, die ein 7.2.1-System tatsächlich installiert, siehe [System überprüfen](/de/tutorials/jetson-agx-orin/verify-your-system)
- [Seeed Studio JetPack 7.2 Resource Hub](https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/) — sekundäre Quelle; verwendet für die Organisation der Migrationsthemen (geprüft am 2026-09-23)

*Status: Entwurf, Überprüfung durch cheny ausstehend. Basiert auf der offiziellen
NVIDIA-Dokumentation zum angegebenen Datum; noch nicht von Juxi Technology auf
physischer Hardware verifiziert. Die Liste der Neuaufbauten beschreibt
Standardfolgen der Plattform (Kernel-/TensorRT-/CUDA-Versionsänderungen) —
validieren Sie sie gegen Ihren eigenen Stack.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von Juxi Technology
veröffentlicht und ist keine Veröffentlichung von NVIDIA.
