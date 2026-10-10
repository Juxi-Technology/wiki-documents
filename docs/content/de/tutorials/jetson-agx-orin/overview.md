---
title: Produktübersicht — Jetson AGX Orin Developer Kit
sidebar_label: Produktübersicht
slug: /product/overview
description: >-
  Was das NVIDIA Jetson AGX Orin Developer Kit (64GB) ist, wofür es verwendet
  wird und wo es in der Jetson-Orin-Produktreihe einzuordnen ist.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
todo: add full module specification table from NVIDIA's official data sheet
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/
    checked: 2026-09-23
review_owner: cheny
---

# Produktübersicht

![Jetson AGX Orin Developer Kit](/images/jetson-agx-orin/jaodk_1024px.png)

Das NVIDIA® Jetson AGX Orin™ Developer Kit ist das Flaggschiff-Developer-Kit
der Jetson-Orin-Familie: ein kompakter KI-Computer für die Entwicklung und das
Prototyping von Robotik-, Computer-Vision- und generativen KI-Anwendungen am
Edge. Dieser Leitfaden behandelt das Developer Kit mit **64GB**.

## Wichtige Fakten (geprüft anhand der NVIDIA-Dokumentation)

- Das Developer Kit teilt **eine SoC-Architektur mit allen Jetson-Orin-Modulen**,
  sodass es durch erneutes Flashen die **Leistung und die Leistungsaufnahme**
  von AGX-Orin-, Orin-NX- oder Orin-Nano-Modulen **emulieren** kann. Ab Werk ist
  es auf die **Jetson AGX Orin Serie** vorkonfiguriert. *(Developer Kit User
  Guide)*
- NVIDIA gibt für die AGX-Orin-Modulfamilie eine KI-Leistung von **bis zu
  275 TOPS** an, wobei die Leistungsaufnahme zwischen **15W und 60W**
  konfigurierbar ist. *(NVIDIA-Produktseite)*
- Die GPU des 64GB-Moduls ist eine **NVIDIA-Ampere-GPU mit 2048 Kernen und 64
  Tensor Cores**. *(NVIDIA-Produktseite, Vergleichstabelle)*
- Die mitgelieferte Referenz-Trägerplatine bietet Standard-Schnittstellen —
  DisplayPort, 10GBASE-T-Ethernet, USB 3.2, M.2 (NVMe und Wi-Fi), 40-Pin-Header,
  PCIe, Kameraanschluss und mehr. Siehe **[Schnittstellen &
  Hardware-Layout](/de/tutorials/jetson-agx-orin/interfaces)**.

## Wofür das Developer Kit gedacht ist

- **Entwicklung und Prototyping** — das Kit ist die Referenzplattform für
  Anwendungen, die später in der Serienfertigung auf Jetson-Orin-Modulen laufen
  sollen.
- **Leistung und Leistungsaufnahme erkunden** — da es die anderen Orin-Module
  emuliert, können Sie mit einem einzigen Kit Workloads über die gesamte
  Modellreihe hinweg testen, bevor Sie sich für ein Serienbauteil entscheiden.
- **Edge-KI-Workloads** — Computer Vision, Robotik und lokale generative KI
  (siehe unseren Tutorials-Bereich, der nach und nach wächst).

> **Juxi-Hinweis:** Serienprodukte basieren auf Jetson-Orin-*Modulen*
> (64GB / 32GB / Industrial-Versionen), die auf Ihrer eigenen oder einer
> Partner-Trägerplatine montiert werden. Das Developer Kit ist das Entwicklungsvehikel, nicht das Serienbauteil.

## Lieferumfang

Jetson AGX Orin Modul und Referenz-Trägerplatine, Wi-Fi-Modul, USB-Typ-C-Netzteil
und ein USB-Typ-C-auf-USB-Typ-A-Kabel. Was Sie selbst bereitstellen müssen,
erfahren Sie im **[Schnellstart](/de/tutorials/jetson-agx-orin/quick-start)**.

## Wie es weitergeht

- **[Schnellstart](/de/tutorials/jetson-agx-orin/quick-start)** — vom Auspacken bis zum lauffähigen JetPack 7.2.1 System
- **[Schnittstellen & Hardware-Layout](/de/tutorials/jetson-agx-orin/interfaces)** — jeder Port und Steckverbinder
- **[Downloads](/de/tutorials/jetson-agx-orin/downloads)** — offizielle Images, Tools und Dokumentationslinks *(Seite in Arbeit)*

## Quellen

- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (geprüft am 2026-09-23)
- [NVIDIA Jetson Orin Produktseite](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/) (geprüft am 2026-09-23)

*Status: geprüft am 2026-10-11. Eine vollständige
Modulspezifikationstabelle wird aus NVIDIAs offiziellem Datenblatt ergänzt; bis
dahin gilt NVIDIAs Produktseite als maßgebliche Quelle für die Spezifikationen.*

**Bildnachweis:** Produktbild aus NVIDIAs offiziellem *Jetson AGX Orin
Developer Kit User Guide* (heruntergeladen am 2026-09-23), © NVIDIA Corporation.

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
