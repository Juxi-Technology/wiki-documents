---
title: Produktübersicht — Jetson Orin Nano Super Developer Kit
sidebar_label: Produktübersicht
slug: /product/overview
description: >-
  Was das NVIDIA Jetson Orin Nano Super Developer Kit (8GB) ist, wofür es
  verwendet wird und wo es in der Jetson-Orin-Familie einzuordnen ist.
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
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Produktübersicht

![Jetson Orin Nano Super Developer Kit](/images/jetson-orin-nano/jetson-orin-nano-super-developer-kit-hero.jpg)

Das NVIDIA® Jetson Orin Nano™ Super Developer Kit ist das Einstiegs-Kit der
Jetson-Orin-Familie: ein kleiner KI-Computer für das Prototyping von Computer-Vision-,
Robotik- und lokalen generativen KI-Anwendungen am Edge. Es läuft mit JetPack
7.2.1 (Jetson Linux / L4T r39.2.1), dem aktuellen Release für dieses Kit.

## Wichtige Fakten (geprüft anhand der NVIDIA-Dokumentation)

- „Super“ ist eine Software-Konfiguration, keine neue Hardware: dasselbe Modul
  (P3767) und dieselbe Trägerplatine (P3768) wie beim früheren „Jetson Orin Nano Developer
  Kit“, umbenannt beim Super-Update. *(Developer Kit User Guide; NVIDIA Super
  Boost-Ankündigung)*
- Eckdaten des Kits: bis zu **67 INT8 TOPS**, bis zu **102 GB/s** Speicherbandbreite,
  Leistungsaufnahme **7W bis 25W** und eine **1,7-fache Verbesserung bei generativer KI**
  gegenüber der vorherigen Generation. *(Developer Kit User Guide — Introduction)*
- Ampere-GPU mit **1.024 CUDA-Kernen und 32 Tensor Cores**; **6-Kern-Arm
  Cortex-A78AE**-64-Bit-CPU bis zu 1,7 GHz; **8GB 128-bit LPDDR5**. *(Datenblatt;
  Jetson Orin Spec-Seite)*
- Speicher: ein **microSD-Kartensteckplatz auf der Unterseite des Moduls** plus
  Unterstützung für **externe NVMe**; kein eMMC und kein Speicher im Lieferumfang. *(Datenblatt;
  Schnellstart)*
- Läuft mit JetPack **7.2.1** (L4T **r39.2.1**; Ubuntu 24.04, Kernel 6.8, CUDA
  13.2.2, TensorRT 10.16.2) über die Jetson-ISO-Methode von einem USB-Stick.
  Unterstützter Bereich: JetPack 6.x oder 7.2/7.2.1 (7.0/7.1 unterstützten Orin nicht).
  *(Schnellstart; JetPack-Downloads; JetPack-Archiv)*
- Trägerplatine: DisplayPort, Gigabit-Ethernet, vier USB-3.2-Typ-A-Anschlüsse,
  USB-C, zwei MIPI-CSI-Anschlüsse, drei M.2-Steckplätze, 40-Pin-Header. Siehe
  **[Schnittstellen & Hardware-Layout](/de/tutorials/jetson-orin-nano/interfaces)**. *(Developer Kit User
  Guide — Hardware Layout)*

## Was „Super“ bedeutet

Der Super-Leistungsschub wird durch einen Software-Leistungsmodus erzielt, der
die GPU-, Speicher- und CPU-Takte auf derselben Hardware anhebt; NVIDIA zufolge
erhalten bestehende Kits ihn durch ein JetPack-Upgrade: „Bestehende Nutzer des Jetson Orin Nano
Developer Kit erhalten den ‚Super'-Leistungsschub mit einem Software-Upgrade.“ *(Developer Kit User Guide; NVIDIA Super Boost-Ankündigung)*

Die folgende Tabelle vergleicht das ursprüngliche Kit mit der Super-Konfiguration.
*(NVIDIA Super Boost-Ankündigung)*

| Punkt | Ursprüngliches Orin Nano Developer Kit | Super-Konfiguration |
|---|---|---|
| GPU-Takt | 635 MHz | 1.020 MHz |
| CPU-Takt | 1,5 GHz | 1,7 GHz |
| Speicherbandbreite | 68 GB/s | 102 GB/s |
| KI-Leistung (sparse INT8) | 40 TOPS | 67 TOPS |
| FP16-Rechenleistung | 10 TFLOPs | 17 TFLOPs |
| Leistungsmodi | 7W, 15W | 7W, 15W, 25W |
| Preis (zum Super-Start, Dez. 2024) | $499 | $249 |

*Bei einer Zahl weichen NVIDIAs eigene Materialien voneinander ab: Die Super-Ankündigung beschreibt
die frühere Speicherbandbreite mit „65 GB/s“, während NVIDIAs Modul-Spezifikationstabellen 68 GB/s für die ursprüngliche 8-GB-Konfiguration
angeben. Die obige Tabelle verwendet den Spezifikationswert; beide beziehen sich auf dieselbe Pre-Super-Hardware.*

Die aktuelle Preisgestaltung finden Sie im Juxi-Shop unter dem
[Eintrag für dieses Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)
(SKU JX00110).

Ab JetPack 7.2.1 flasht das Jetson ISO das Kit standardmäßig mit der Super-
Konfiguration *(JetPack-Downloadseite)*. Einheiten, die zuerst mit dem JetPack-7.2-ISO installiert
wurden, behalten möglicherweise ein Nicht-Super-Profil; wenn 25W oder MAXN SUPER
fehlt, siehe **[Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting)**.

In der Leistungsmodus-Tabelle von L4T r39.2 listet die Super-Konfiguration 15W (Modus 0),
25W (Modus 1, Standard) und MAXN SUPER (Modus 2, experimentell; nur auf Kits, die
mit der Super-Konfiguration geflasht wurden). MAXN SUPER betreibt die CPU mit bis zu 1,7 GHz,
die GPU mit bis zu 1.020 MHz und den Speichercontroller mit 3.199 MHz. Lesen Sie den Modus
mit `sudo /usr/sbin/nvpmodel -q` aus; setzen Sie ihn mit
`sudo /usr/sbin/nvpmodel -m <mode_id>`. NVIDIAs Kit-Seiten nennen „7W bis 25W“;
die r39.2-Tabelle listet die drei obigen Modi — prüfen Sie Ihre Einheit unter **[System
überprüfen](/de/tutorials/jetson-orin-nano/verify-your-system)**. *(L4T r39.2 Power
and Performance-Seite)*

## Modulspezifikationen

| Punkt | Spezifikation |
|---|---|
| KI-Leistung | Bis zu 67 sparse INT8 TOPS (33 dense) in der Super-Konfiguration |
| GPU | NVIDIA-Ampere-Architektur, 1.024 CUDA-Kerne, 32 Tensor Cores, bis zu 1.020 MHz |
| CPU | 6-Kern-Arm Cortex-A78AE v8.2 (64-Bit), 1,5 MB L2 + 4 MB L3, bis zu 1,7 GHz |
| Arbeitsspeicher | 8GB 128-bit LPDDR5, 102 GB/s |
| Speicher | microSD-Kartensteckplatz auf der Unterseite des Moduls; Unterstützung für externe NVMe-SSD |
| Videodekodierung | 1x 4K60 (H.265), 2x 4K30, 5x 1080p60, 11x 1080p30 |
| Videokodierung | 1080p30 mit 1–2 CPU-Kernen (keine dedizierte Encoder-Hardware) |
| KI-Beschleuniger | Kein DLA und kein PVA — die Inferenz läuft auf den GPU-Tensor-Cores |
| Modulformfaktor | 260-Pin-SO-DIMM, 69,6 mm x 45 mm |

*Quellen: Jetson Orin Nano Super Developer Kit Datasheet (Dezember 2024);
NVIDIA Jetson Orin Spec-Seite; L4T r39.2 Power and Performance-Seite.*

## Teilenummern

| Teilenummer | Was sie bezeichnet |
|---|---|
| P3766 | Das vollständige Jetson Orin Nano Developer Kit |
| P3767 | Das System-on-Module (SOM) |
| P3768 | Die Referenz-Trägerplatine |
| P3767-0005 | Modul-SKU im Developer Kit (Jetson Orin Nano 8GB, „nur für Entwicklungszwecke“) |

Weitere Orin-Nano-Modul-SKUs: P3767-0003 (8GB, kommerziell) und P3767-0004
(4GB). Die Trägerplatine des Developer Kit nimmt P3767-Module mit den SKUs 0, 1, 3, 4
und 5 auf. *(L4T r39.2 Developer Guide; L4T r38.2.1 Developer Guide)*

## Einordnung in die Orin-Familie

- **Jetson Orin Nano 8GB — dieses Kit.** Der Einstiegspunkt der Orin-Familie:
  67 INT8 TOPS, 8 GB Unified Memory, 7W bis 25W.
- **Jetson Orin NX.** Dieselbe Trägerplatine kann Orin-NX-Module versorgen, testen und damit
  entwickeln (eigener Kühlkörper und Lüfter erforderlich; ein fabrikneues Modul muss von einem
  Ubuntu-Host mit dem SDK Manager geflasht werden). *(Developer Kit User Guide —
  How-To)*
- **Jetson AGX Orin — die Flaggschiff-Klasse.** Das AGX-Orin-32GB-Modul erreicht
  241 TOPS im Super-Modus *(JetPack-7.2-Release-Highlights)*. Siehe Juxis
  [Jetson AGX Orin-Serie](/de/tutorials/jetson-agx-orin/quick-start).

Die wichtigste Einschränkung, für die Sie planen müssen, sind die **8 GB Unified Memory**;
da es weder DLA noch PVA gibt, laufen KI-Workloads allein auf der GPU — siehe **[Speicher-
effizienz](/de/tutorials/jetson-orin-nano/memory-efficiency)** und **[Lokales
LLM](/de/tutorials/jetson-orin-nano/local-llm)**.

## Wofür das Developer Kit gedacht ist

- **Prototyping für die Serienfertigung.** JetPack 7.2.1 bedient die gesamte Orin-Familie,
  sodass Arbeiten am Kit auf Orin-Module in Produkten übertragbar sind. *(JetPack-
  Downloadseite)*
- **Computer Vision.** Zwei MIPI-CSI-Kameraanschlüsse; das DeepStream SDK 9.1 ist
  in der JetPack-7.2.1-Komponentenmatrix — siehe
  **[DeepStream](/de/tutorials/jetson-orin-nano/deepstream)**.
- **Lokale generative KI.** Die zentrale Aussage ist eine 1,7-fache Verbesserung bei generativer
  KI; die 8-GB-Obergrenze bestimmt, was passt — siehe
  **[Lokales LLM](/de/tutorials/jetson-orin-nano/local-llm)**.
- **Robotik.** NVIDIA-Mitarbeiter empfehlen ROS 2 Jazzy für JetPack 7.2.1 — siehe
  **[Robotik](/de/tutorials/jetson-orin-nano/robotics)**.

> **Juxi-Hinweis:** Serienprodukte basieren auf Jetson-Orin-Modulen — dem
> Orin Nano 8GB oder 4GB oder einem Orin NX — auf einer kundenspezifischen Trägerplatine. Das
> Developer Kit ist das Entwicklungsvehikel, nicht das Serienbauteil.

## Lieferumfang

Der Karton enthält das Developer Kit (Orin-Nano-8GB-Modul mit Kühlkörper auf
der Referenz-Trägerplatine), ein 19-V-Netzteil, die mitgelieferte 802.11ac/ab/gn-
WLAN-Karte und eine Schnellstart- und Support-Karte. NVIDIA gibt an, dass das Kit
„keinen wechselbaren Speicher im Lieferumfang enthält“. *(Datenblatt; Schnellstart)*

Selbst bereitzustellen:

- **Speicher** — eine microSD-Karte (64 GB, UHS-1 oder größer) oder eine NVMe-SSD. Der
  microSD-Steckplatz befindet sich auf der **Unterseite des Moduls**; vor dem Einschalten einlegen.
  Das Juxi-Shop-Bundle enthält bereits eine 64-GB-microSD-Karte; kaufen Sie Speicher
  nur, wenn Sie die nackte NVIDIA-Box erhalten haben oder stattdessen eine NVMe-SSD möchten.
- **Ein Installer-USB-Stick** — 16 GB oder größer. Schreiben Sie das JetPack-ISO auf diesen
  USB-Stick, nicht auf eine microSD-Karte: SD-Karten-Images wurden in JetPack
  7.2 entfernt.
- **Ein Host-Computer** mit 25 GB oder mehr freiem Speicherplatz, ein DisplayPort-Monitor und
  USB-Tastatur/-Maus für die Desktop-Einrichtung. *(Schnellstart; Supported Hardware)*

> **Wichtig** Sehr alte Werks-Firmware muss zuerst aktualisiert werden — JetPack
> 7.2.1 erfordert UEFI/QSPI-Firmware der JetPack-6.x-Generation. Siehe **[Schnell-
> start](/de/tutorials/jetson-orin-nano/quick-start)** und **[Flashen &
> Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Wie es weitergeht

- **[Schnellstart](/de/tutorials/jetson-orin-nano/quick-start)** — vom Auspacken bis zu einem
  lauffähigen JetPack 7.2.1-System
- **[Schnittstellen & Hardware-Layout](/de/tutorials/jetson-orin-nano/interfaces)** — jeder Anschluss, Steckplatz und
  Steckverbinder
- **[Downloads](/de/tutorials/jetson-orin-nano/downloads)** — offizielle Images, Tools und Dokumentations-
  links

## Quellen

- [Jetson Orin Nano Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (geprüft am 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (geprüft am 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (geprüft am 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (geprüft am 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (geprüft am 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Supported Hardware](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/supported_hardware.html) (geprüft am 2026-09-26)
- [NVIDIA Super Boost: Jetson Orin Nano Developer Kit gets a Super boost](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (geprüft am 2026-09-26)
- [NVIDIA JetPack 6.2 brings Super Mode to Jetson Orin Nano and Jetson Orin NX modules](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (verlinkt als die Ankündigung des Super-Leistungsmodus)
- [NVIDIA Jetson Orin module and developer kit spec page](https://developer.nvidia.com/embedded/jetson-orin) (geprüft am 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-26)
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) (geprüft am 2026-09-26)
- [L4T r39.2 Developer Guide — Jetson Orin NX and Orin Nano series: module adaptation and bring-up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (geprüft am 2026-09-26)
- [L4T r39.2 Developer Guide — Platform Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (geprüft am 2026-09-26)
- [L4T r38.2.1 Developer Guide — Partition Configuration (module SKUs)](https://docs.nvidia.com/jetson/archives/r38.2.1/DeveloperGuide/AR/BootArchitecture/PartitionConfiguration.html) (geprüft am 2026-09-26)
- [Jetson Orin Nano Super Developer Kit Datasheet (PDF, linked from nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (geprüft am 2026-09-26)
- [Juxi Technology Shop-Eintrag für dieses Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (geprüft am 2026-09-26)

*Status: Entwurf, ausstehende Prüfung durch cheny. Basiert auf NVIDIAs offizieller
Dokumentation mit Stand der oben genannten Daten; noch nicht von Juxi Technology auf physischer
Hardware verifiziert.*

**Bildnachweis:** Produktbild aus NVIDIAs offiziellem *Jetson Orin Nano
Developer Kit User Guide* (heruntergeladen am 2026-09-26), © NVIDIA Corporation.

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird
von Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
