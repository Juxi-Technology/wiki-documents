---
title: Schnittstellen und Hardware-Layout
sidebar_label: Schnittstellen & Hardware-Layout
slug: /product/interfaces
description: >-
  Beschriftetes Layout und Anschlussreferenz für das NVIDIA Jetson AGX Orin
  Developer Kit — Tasten, Ports und Steckverbinder der Trägerplatine, Display-
  und Speicheroptionen, der 40-Pin-Header und der Automation-Header.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-23
review_owner: cheny
---

# Schnittstellen und Hardware-Layout

Für das Developer Kit gibt es zwei Referenzsysteme: die **nummerierten
Beschriftungen (0–12) auf den Seitenansichten**, die NVIDIAs offizieller
Leitfaden und diese Seite verwenden, und die **Steckverbinder-Nummern der
Trägerplatine (J-Nummern)**, die auf der Leiterplatte aufgedruckt sind. Halten
Sie beide griffbereit — unsere übrigen Leitfäden verweisen darauf.

## Seitenansichten — beschriftete Teile

![Developer Kit, Seitenansicht mit Tasten und DC-Eingang](/images/jetson-agx-orin/jaodk_labeled_01.png)
![Developer Kit, Seitenansicht mit PCIe-Abdeckung und 40-Pin-Anschluss](/images/jetson-agx-orin/jaodk_labeled_02.png)

| # | Teil | Hinweise |
|---|---|---|
| 0 | Weiße LED | Stromanzeige |
| 1 | Power-Taste | |
| 2 | Force-Recovery-Taste | Für Recovery-/Flash-Modi |
| 3 | Reset-Taste | |
| 4 | USB-Typ-C-Port | Nur DFP (Peripheriegeräte anschließen) |
| 5 | DC-Stromanschluss | Hohlbuchse — Spezifikation siehe J41 |
| 6 | Ethernet-Port | |
| 7 | USB-Typ-A ×2 | USB 3.2 Gen 2 |
| 8 | DisplayPort-Ausgang | **Die einzige Display-Schnittstelle des Kits** |
| 9 | USB-Micro-B-Port | Für Debug |
| 10 | USB-Typ-C-Port | Flashen und Daten (UFP und DFP) |
| 11 | 40-Pin-Anschluss | |
| 12 | USB-Typ-A ×2 | USB 3.2 Gen 1 |

## Trägerplatine — Steckverbinder

| Markierung | Steckverbinder | Spezifikation / Hinweise |
|---|---|---|
| DS2 | Weiße LED | |
| S1 / S2 / S3 | Power-/Reset-/Force-Recovery-Tasten | |
| J24 | USB-Typ-C (über dem DC-Stromanschluss) | Nur DFP, USB 3.2 Gen 2 — **hier wird das mitgelieferte USB-C-Netzteil angeschlossen** |
| J41 | DC-Stromanschluss | Außendurchmesser 5,5 mm, Innendurchmesser 2,5 mm, Pluspol innen |
| J17 | Ethernet | Bis zu 10GBASE-T |
| J33 | USB-Typ-A ×2 (neben Ethernet) | USB 3.2 Gen 2 |
| J18 | DisplayPort-Ausgang | Unterstützt MST |
| J26 | USB-Micro-B | Debug-UART |
| J40 | USB-Typ-C (neben dem 40-Pin-Header) | UFP und DFP — **der Port, über den das Kit für SDK Manager mit einem Host-PC verbunden wird** |
| J30 | 40-Pin-Anschluss | Pin 1 ist auf der Leiterplatte mit einem weißen Dreieck markiert |
| J42 | Automation-Header | Automatisches Einschalten, Wake-on-LAN, Drosselungs-Trigger (Pins siehe unten) |
| J13 | Anschluss für RTC-Stützbatterie | |
| J509 | Kameraanschluss | |
| J502 | JTAG-Debug-Anschluss | |
| J505 | M.2-E-Key-Steckplatz | Enthält üblicherweise das Wi-Fi-Modul |
| J511 | HD-Audio-Header | |
| J1 | M.2-M-Key-Steckplatz | Für eine NVMe-SSD |
| J10 | microSD-Kartensteckplatz | UHS-1 |
| J3 | Jetson-Modul-Anschluss | 699-Pin |
| J6 | PCIe-x16-Anschluss | Elektrisch PCIe 4.0 ×8 |
| J9 | Lüfteranschluss | 4-Pin, Rastermaß 1,25 mm |

> **Die drei Dinge, nach denen zuerst gefragt wird:**
> - **Display:** DisplayPort (J18) ist der *einzige* Display-Ausgang — es gibt
>   weder einen HDMI-Port noch DisplayPort über USB-C. Für einen HDMI-Monitor
>   verwenden Sie einen aktiven DP→HDMI-Adapter oder ein entsprechendes Kabel.
> - **Stromversorgung:** Das mitgelieferte USB-C-Netzteil wird an **J24**
>   angeschlossen (der USB-Typ-C-Port über dem DC-Stromanschluss). Ein
>   separater Hohlbuchsen-Eingang (J41) steht zur Verfügung, wenn Sie selbst
>   für die Stromversorgung sorgen.
> - **Verbindung zum Host-PC:** Verwenden Sie für SDK Manager oder eine
>   serielle Konsole **J40** (der USB-Typ-C-Port neben dem 40-Pin-Header) —
>   nicht J24.

## DisplayPort-Ausgang

- Unterstützt DP SST, DP MST (bis zu 2 externe Displays) und DP DSC
- Maximale Auflösung: 8K@30 / 4K@120 (mit oder ohne DSC)
- Ausgabeformate: RGB 8/10 bpc, YUV444 8/10 bpc

## Speicheroptionen

- **Standard:** eMMC-Flashspeicher auf dem Modul
- **Optional:** NVMe-SSD (M.2 M-Key, J1) · microSD-Karte (J10, UHS-1) · USB-Laufwerk

Der Jetson-ISO-Installer kann das System auf eMMC oder NVMe installieren; SDK
Manager kann das Basis-L4T-BSP auf jedes der unterstützten Speichermedien
flashen.

## 40-Pin-Header (J30)

![Pinbelegung des 40-Pin-Headers](/images/jetson-agx-orin/jao_cbspec_figure_3-4_black-bg.png)
*Pinbelegung des 40-Pin-Headers — aus NVIDIAs Carrier Board Specification.*

![Pin-1-Markierung am 40-Pin-Header](/images/jetson-agx-orin/jao_40pin_pin1_marking.png)
*Pin 1 ist auf der Leiterplatte mit einem weißen Dreieck markiert.*

## Automation-Header (J42)

Für Produktion und Automatisierungsverdrahtung:

- Pin 1, 12: GND
- Pin 2, 3, 4: Eingänge, gleiche Funktion wie die Tasten für Recovery, Reset und Power
- Pin 5–6: offen = automatisches Einschalten deaktiviert; gebrückt = automatisches Einschalten aktiviert
- Pin 7: CVB_STBY-Ausgang — zeigt an, ob sich das Modul im Ruhezustand befindet
- Pin 8: SYSTEM_OC-Eingang — löst Tegra-Drosselung aus
- Pin 9–10: offen = Wake-on-LAN/Start über LAN aus dem Aus-Zustand deaktiviert; gebrückt = aktiviert
- Pin 11: JTAG_TRST — JTAG-Test-Reset

## Quellen

- [Hardware Layout — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) (geprüft am 2026-09-23)
- Details zur Trägerplatine finden Sie in der *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification* (verlinkt auf NVIDIAs [Downloads-Seite](https://developer.nvidia.com/embedded/downloads))

*Status: geprüft am 2026-10-11. Die oben genannten Schritte
und Werte basieren auf NVIDIAs offizieller Dokumentation zum angegebenen Datum;
noch nicht von Juxi Technology auf physischer Hardware verifiziert.*

**Bildnachweis:** Layout-Diagramme und Pinbelegungsbilder stammen aus NVIDIAs
offiziellem *Jetson AGX Orin Developer Kit User Guide* und der *Carrier Board
Specification* (heruntergeladen am 2026-09-23) und bleiben © NVIDIA Corporation.

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird von
Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
