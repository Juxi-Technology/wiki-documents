---
title: Glossar
sidebar_label: Glossar
slug: /appendix/glossary
description: >-
  Zentrale Begriffe zum Jetson AGX Orin Developer Kit — von der JetPack- und
  L4T-Versionierung über das Flashen bis zur Terminologie von KI-Stack und
  Leistungsaufnahme.
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

# Glossar

Die Begriffe, nach denen Kunden am häufigsten fragen, nach Themen gruppiert.
Die Versionsnummern beziehen sich auf das aktuelle Release (**JetPack 7.2.1 /
L4T 39.2.1**, geprüft am 2026-09-24).

## Plattform & Hardware

| Begriff | Bedeutung |
|---|---|
| **Jetson AGX Orin** | NVIDIAs Edge-KI-Modulfamilie; dieses Developer Kit trägt das **64GB**-Modul. |
| **Modul** | Die kleine Platine mit SoC, Speicher und eMMC, auf der die Rechenarbeit stattfindet. |
| **Trägerplatine** | Die größere Platine mit allen Ports und Anschlüssen; das Modul wird darauf gesteckt (699-Pin-Steckverbinder, J3). |
| **Developer Kit** | Modul + Referenz-Trägerplatine + Wi-Fi-Modul + Netzteil — die Prototyping-Plattform. Serienprodukte verwenden Module auf kundenspezifischen oder Partner-Trägerplatinen. |
| **SoC** | System-on-Chip: CPU, GPU und Beschleuniger auf einem Chip integriert (NVIDIA nennt die Reihe „Tegra“). |
| **TOPS** | Billionen Operationen pro Sekunde — ein Maß für den KI-Durchsatz (die AGX-Orin-Familie erreicht bis zu 275 TOPS). |
| **Tensor Core** | GPU-Kerne, die auf die Matrixmathematik hinter neuronalen Netzen spezialisiert sind. |
| **eMMC** | Eingebetteter Flash-Speicher auf dem Modul; der standardmäßige Systemspeicher. |
| **NVMe** | Schnelle SSD über PCIe, installiert im M.2-M-Key-Slot (J1); kann das System beherbergen. |
| **M.2 (M-Key / E-Key)** | Slot-Typen: **M-Key** = NVMe-SSD, **E-Key** = Wi-Fi-Modul. |
| **CSI / GMSL** | Kamera-Schnittstellen (CSI am Kameraanschluss J509; GMSL für Kameras in Automotive-Qualität). |
| **DisplayPort (DP)** | Der **einzige** Display-Ausgang des Kits; unterstützt MST (bis zu 2 Displays) und DSC. |

## Software & Versionen

| Begriff | Bedeutung |
|---|---|
| **JetPack** | NVIDIAs SDK-Bundle für Jetson — Betriebssystem, Treiber, CUDA-Stack und Bibliotheken. **Aktuell: 7.2.1.** |
| **Jetson Linux (L4T)** | Das Board-Support-Paket unterhalb von JetPack: Bootloader, Kernel, Treiber und das Ubuntu-Root-Dateisystem. **Aktuell: r39.2.1.** |
| **BSP** | „Board-Support-Paket“ — alles, was zum Booten und Betreiben der Platine nötig ist. |
| **Root-Dateisystem (rootfs)** | Der User-Space-Teil des Betriebssystems (hier: Ubuntu 24.04). |
| **oem-config** | Der Einrichtungsassistent beim ersten Start (Sprache, Benutzerkonto, Netzwerk). |
| **UEFI** | Das Firmware-/Boot-Menü des Kits; wählen Sie über dessen Boot-Manager das zu bootende Gerät aus. |
| **QSPI** | Kleiner Flash-Speicher für die frühe Boot-Firmware. Bei der ISO-Installation kann eine Aufforderung zum „**QSPI-Capsule-Update**“ erscheinen — drücken Sie `Y` (erforderlich). |
| **Force-Recovery-Modus** | Spezieller Boot-Modus zum Flashen von einem Host-PC. Aktivierung: die mittlere Force-Recovery-Taste gedrückt halten, während Sie die Stromversorgung anschließen. |
| **Jetson ISO** | Das Installationsimage für USB-Sticks; NVIDIAs empfohlener Aktualisierungsweg (kein Host-PC erforderlich). |
| **SDK Manager** | NVIDIAs GUI-Tool (Host-PC) zum Flashen des BSP und Installieren der JetPack-Komponenten. |
| **Linux_for_Tegra / flash.sh** | Die skriptbasierten Flash-Werkzeuge für fortgeschrittene Anwender und Produktentwicklung. |
| **OTA** | Over-the-Air-Update — Software- und Sicherheitsupdates aus der Ferne für bereits ausgelieferte Geräte. |
| **Device Tree** | Die Datenstruktur, die dem Kernel mitteilt, welche Hardware angeschlossen ist; angepasste Device Trees müssen für jede L4T-Version neu gebaut werden. |

**Versionszuordnung** (die nützlichste Tabelle zum Einprägen):

| JetPack | Jetson Linux (L4T) | Ubuntu | Kernel | CUDA |
|---|---|---|---|---|
| **7.2.1** (aktuell) | **39.2.1** | **24.04** | **6.8** | **13.2.1** |
| 6.x (vorherige Generation) | 36.x | 22.04 | 5.15 | 12.x |

Prüfen Sie immer, was auf einem konkreten System tatsächlich läuft:
`cat /etc/nv_tegra_release`.

## KI-Stack

| Begriff | Bedeutung |
|---|---|
| **CUDA** | NVIDIAs GPU-Computing-Toolkit (13.2.1 in dieser Version). |
| **cuDNN** | Bibliothek optimierter Deep-Learning-Primitive (9.20.0). |
| **TensorRT** | Inferenz-Optimierer und Laufzeitumgebung (10.16.2). |
| **TensorRT-Engine** | Eine kompilierte, hardware- und versionsspezifische Modelldatei. Engines überleben Versions-Upgrades **nicht** — bauen Sie sie neu. |
| **DeepStream** | SDK für Multi-Stream-Videoanalyse (9.1). |
| **VPI** | Vision Programming Interface — hardwarebeschleunigte Bildverarbeitung (4.1.3). |
| **Holoscan** | Streaming-KI-Framework für Echtzeit-Sensorverarbeitung (3.9.0). |
| **NGC** | NVIDIAs Katalog für Container und vortrainierte Modelle (catalog.ngc.nvidia.com). |
| **Container** | Isolierte, paketierte Laufzeitumgebung (Docker); der Standardweg, um KI-Software auf Jetson auszuliefern. |

## Leistungsaufnahme & Überwachung

| Begriff | Bedeutung |
|---|---|
| **nvpmodel** | Werkzeug zum Umschalten der Leistungsmodi. Führen Sie `sudo nvpmodel -q` aus, um die Modi Ihres Systems anzuzeigen. |
| **MAXN** | Leistungsmodus „maximale Leistung“ (ohne Leistungsbegrenzung). |
| **jetson_clocks** | Fixiert die Taktraten auf das Maximum — für Benchmarks, nicht für den dauerhaften Standardbetrieb. |
| **tegrastats** | Eingebauter Live-Monitor für die CPU-/GPU-/Speicherauslastung. |

## JetPack-7-Ära

| Begriff | Bedeutung |
|---|---|
| **NemoClaw** | NVIDIAs agentisches KI-Framework für Jetson; seit JetPack 7.2 mit einem einzigen Befehl installierbar. |
| **Jetson-Agent-Skills** | Wiederverwendbare Agent-Workflows, die NVIDIA für geräteseitige Aufgaben und BSP-Aufgaben veröffentlicht. |
| **Yocto / OpenEmbedded (OE4T)** | Das Build-System für kundenspezifische, reproduzierbare Linux-Images für die Produktion — seit 7.2 offiziell unterstützt. |
| **SBSA** | Server Base System Architecture — das Arm-Servermodell, an dem sich die Jetson-**Thor**-Reihe orientiert (nicht dieses Kit). |
| **MIG** | Multi-Instance GPU — die Aufteilung einer GPU in isolierte Instanzen (Jetson Thor, Tech-Preview). |

## Quellen

- [JetPack SDK Downloads — Komponentenversionen](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-24)
- [Jetson AGX Orin Developer Kit Benutzerhandbuch](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (geprüft am 2026-09-24)

*Status: Entwurf, ausstehende Prüfung durch cheny. Definitionen zusammengestellt
aus der NVIDIA-Dokumentation und üblicher Branchenpraxis; Versionsnummern am
angegebenen Datum geprüft.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine NVIDIA-Publikation.
