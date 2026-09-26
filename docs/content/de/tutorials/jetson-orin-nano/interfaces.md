---
title: Schnittstellen und Hardware-Layout
sidebar_label: Schnittstellen & Hardware-Layout
slug: /product/interfaces
description: >-
  Beschriftetes Layout und Anschlussreferenz für das NVIDIA Jetson Orin Nano
  Super Developer Kit — jeder Anschluss, Steckplatz, Header und jede
  Bedieneinheit, der microSD-Steckplatz auf der Unterseite, Kameraanschlüsse,
  Stromversorgung und die serielle Konsole.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697
    checked: 2026-09-26
review_owner: cheny
---

# Schnittstellen und Hardware-Layout

Das Kit besteht aus zwei Platinen: das **Jetson-Orin-Nano-Modul** (P3767) auf der
**Referenz-Trägerplatine** (P3768); das vollständige Kit ist P3766. Diese Seite
behandelt die Steckverbinder und Bedienelemente anhand von NVIDIAs offiziellen Markierungen (1–12).

## Nummeriertes Layout — beschriftete Teile

![Nummeriertes Layout des Developer Kit](/images/jetson-orin-nano/jetson-orin-nano-qtr_numbered.png)
*Das offizielle nummerierte Layout — NVIDIAs Markierungen 1–12.*

| # | Teil | Hinweise |
|---|---|---|
| 1 | microSD-Kartensteckplatz | Auf der **Unterseite des Moduls** — siehe unten |
| 2 | 40-Pin-Erweiterungsheader | UART, SPI, I2S, I2C, GPIO |
| 3 | Betriebsanzeige-LED | Grün; leuchtet, wenn das Kit mit Strom versorgt wird |
| 4 | USB-C-Anschluss | Host-, Geräte- und USB-Recovery-Modus; keine Videoausgabe |
| 5 | Gigabit-Ethernet-Anschluss | RJ45 |
| 6 | USB 3.2 Typ-A ×4 | 10 Gbps; zwei doppelt gestapelte Anschlüsse |
| 7 | DisplayPort-Ausgang | **Die einzige Bildausgabe des Kits** |
| 8 | DC-Stromanschluss | Hohlbuchse 5,5 mm × 2,5 mm |
| 9 | MIPI-CSI-Kameraanschlüsse ×2 | 22-polig, Rastermaß 0,5 mm |
| 10 | M.2-Key-M-Steckplatz (2280) | PCIe 3.0 ×4 — für eine NVMe-SSD |
| 11 | M.2-Key-M-Steckplatz (2230) | PCIe 3.0 ×2 — für eine NVMe-SSD |
| 12 | M.2-Key-E-Steckplatz (2230) | Mit dem mitgelieferten WLAN-Modul bestückt |

> **Drei Dinge, die Sie zuerst wissen sollten:**
> - **Speicher:** kein eMMC und **kein Speicher im Lieferumfang**. Fügen Sie eine microSD-Karte oder eine NVMe-SSD hinzu.
> - **microSD-Steckplatz:** auf der **Unterseite des Moduls** — siehe unten.
> - **Bildausgabe:** DisplayPort ist die *einzige* Bildausgabe — kein HDMI, kein Video über USB-C.

## microSD-Steckplatz — Unterseite des Moduls

![Der microSD-Steckplatz auf der Unterseite des Moduls](/images/jetson-orin-nano/jetson-orin-nano-dev-kit-sd-slot.jpg)
*Die Karte wird in die **Unterseite des Moduls** eingesetzt — NVIDIA-Bild, mit vergrößertem Ausschnitt.*

> **Achtung:** Der microSD-Steckplatz (Markierung 1) befindet sich auf der **Unterseite des
> Moduls**, nicht auf der Trägerplatine. Er ist das am häufigsten übersehene physische Detail
> dieses Kits. Legen Sie die Karte ein, bevor Sie den Installer booten.

- Das Kit bootet von der microSD-Karte, wenn eine vorhanden ist; empfohlen werden 64 GB UHS-1 oder größer.
- Wenn der Installer die Karte nicht anzeigt, empfiehlt NVIDIAs Fehlerbehebungsanleitung
  zu prüfen, ob die Karte vollständig im Modulsteckplatz sitzt.
- JetPack 7.2 und später haben keine SD-Karten-Images. Um zu ändern, was installiert ist,
  verwenden Sie einen unterstützten Installationsweg — siehe **[Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Speicheroptionen

- **microSD** (Modulunterseite, Markierung 1) — der Hauptspeicher des Moduls.
- **NVMe-SSD** — Größe 2280 oder 2230 in den M.2-Key-M-Steckplätzen (Markierungen 10 und 11, unten).
- **USB-Laufwerk** — an USB-C oder Typ-A; die Boot-Reihenfolge wird im UEFI-Boot-Manager festgelegt.

Was Sie kaufen sollten und wie der erste Start abläuft, steht im **[Schnellstart](/de/tutorials/jetson-orin-nano/quick-start)**.

## USB

| Anschluss | Geschwindigkeit | Modi | Hinweise |
|---|---|---|---|
| USB 3.2 Typ-A ×4 (Markierung 6) | USB 3.2 Gen 2, 10 Gbps | Nur Host | Zwei doppelt gestapelte Anschlüsse; VBUS auf 3 A pro Stapel begrenzt |
| USB-C (Markierung 4) | USB 3.2 Typ-C | Host, Device, USB Recovery | Nur Daten — dieser Anschluss gibt kein Video aus |

Im **Device-Modus** präsentiert der USB-C-Anschluss das Kit einem Host-PC als:

- Massenspeichergerät mit der Datei **L4T-README**;
- USB-Seriellgerät;
- USB-Ethernet-Verbindung (RNDIS) — der Jetson ist unter **192.168.55.1** erreichbar.

## DisplayPort-Ausgang

- Nur ein Ausgang (Markierung 7): **DisplayPort 1.2 mit MST**. Es gibt keinen HDMI-
  Anschluss, und der USB-C-Anschluss führt kein Video.
- Verwenden Sie für einen HDMI-Monitor einen DisplayPort-auf-HDMI-Adapter.
- Wenn keine Bildausgabe erfolgt, schließen Sie den Monitor direkt an — keinen KVM-Switch
  und keine Adapterkette.

## Ethernet

- 1× Gigabit-Ethernet (RJ45), Markierung 5. Das Kit hat keinen 10-GbE-Anschluss.

## M.2-Steckplätze

| Markierung | Steckplatz | Größe | Elektrisch | Geeignet für |
|---|---|---|---|---|
| 10 | M.2 Key-M | 2280 | PCIe 3.0 ×4 | NVMe-SSD |
| 11 | M.2 Key-M | 2230 | PCIe 3.0 ×2 | NVMe-SSD |
| 12 | M.2 Key-E | 2230 | — | Das mitgelieferte WLAN-Modul (bestückt) |

### WLAN-Modul

- Der Key-E-Steckplatz ist **bestückt**. NVIDIA beschreibt die Karte nur als
  „802.11ac/ab/gn Wireless-Netzwerk-Controller“ — kein Chipsatzname.
- Community-Berichte (unbestätigt) identifizieren die verbaute Karte als **Realtek
  RTL8822CE** (AzureWave-Modul, PCI-ID 10ec:c822). Dies ist Community-Information,
  keine Aussage von NVIDIA.
- Die offiziell unterstützten NVMe-Modelle und Key-E-Module stehen in der Liste „Jetson
  supported components information“ im Jetson Download Center, nicht auf
  einer öffentlichen Seite. Prüfen Sie ein Teil dort, bevor Sie es kaufen.
- Wenn die Karte Ihr Netzwerk nicht sehen kann — zum Beispiel einen 6-GHz-Router mit
  MBSSID — siehe **[Fehlerbehebung → WLAN kann das Netzwerk nicht sehen](/de/tutorials/jetson-orin-nano/troubleshooting)**.

## CSI-Kameraanschlüsse

- Zwei Anschlüsse (Markierung 9): 22-polig, Rastermaß 0,5 mm, Flexkabel mit Kontakten unten.
- **CAM0:** CSI 1×2-Lane. **CAM1:** CSI 1×2-Lane oder 1×4-Lane.
- Eine 15-Pin-Kamera (zum Beispiel das Raspberry Pi Camera Module v2) benötigt ein 15-auf-22-Pin-Kabel.

## 40-Pin-Erweiterungsheader (Markierung 2)

- GPIO- und Peripherieschnittstellen: UART, SPI, I2S, I2C, GPIO.
- Für Pinbelegung, Spannungspegel und elektrische Grenzwerte verweist NVIDIA
  auf die *Jetson Orin Nano Developer Kit Carrier Board Specification* (Jetson
  Download Center). Dieses Dokument war für diese Seite nicht zugänglich.

## Button-Header (12-polig)

Der Button-Header trägt die Funktionen serielle Konsole, Reset und Force-Recovery.

| Pins | Funktion |
|---|---|
| 3 (RXD), 4 (TXD), 7 (GND) | Serielle Konsole (UART) |
| 9 + 10 | Force-Recovery-Modus — Pins überbrücken, dann einschalten |
| 7 + 8 | Reset — Pins bei eingeschaltetem System überbrücken |
| Jumper | Legt das automatische Einschaltverhalten fest |

### Serielle Konsole

- Schließen Sie einen USB-TTL-Serielladapter an: TX des Adapters an Pin 3 (RXD), RX an Pin 4 (TXD), GND an Pin 7.
- Dies ist der Headless-Fallback. Siehe **[Fehlerbehebung](/de/tutorials/jetson-orin-nano/troubleshooting)**,
  um Boot-Protokolle zu erfassen.

### Force Recovery und Reset

- **Force-Recovery-Modus:** Verbinden Sie Pin 9 und 10 und schalten Sie dann das Kit ein.
- **Reset:** Überbrücken Sie bei eingeschaltetem Kit Pin 7 und 8.
- Der Force-Recovery-Modus wird für Flash-Abläufe verwendet — siehe **[Flashen & Updates](/de/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Stromversorgung

- **DC-Stromanschluss (Markierung 8):** Hohlbuchse 5,5 mm × 2,5 mm; verwenden Sie das mitgelieferte
  19-V-Netzteil.
- **Automatisches Einschalten:** Standardmäßig schaltet sich das Kit ein, sobald DC-Strom
  angeschlossen wird. Ein Jumper auf dem Button-Header ändert dieses Verhalten.
- **Power-LED (Markierung 3):** Eine grüne LED neben dem USB-C-Anschluss leuchtet, wenn
  das Kit mit Strom versorgt wird.
- NVIDIAs geprüfte Seiten nennen weder die Strombelastbarkeit des mitgelieferten Netzteils noch
  die Polarität der Buchse. Bestätigen Sie beides bei einem Drittanbieter-Netzteil mit Ihrem Lieferanten.

## Lüfteranschluss

- Die Trägerplatine hat einen 4-Pin-Lüfteranschluss.
- Das Modul wird mit einem Kühlkörper ausgeliefert; offizielle Bilder zeigen den Lüfter in die
  Kühlkörper-Abdeckung integriert. Der Anschluss ist für alternative Kühllösungen vorgesehen.
- NVIDIAs geprüfte Seiten nennen weder den Betriebstemperaturbereich noch die Tj-Grenzwerte
  des Moduls — diese stehen im Jetson Orin Nano Series Data Sheet und
  im Orin NX/Orin Nano Thermal Design Guide, beide im anmeldepflichtigen
  Download Center.

## Abmessungen

- **Modul:** 69,6 mm × 45 mm, 260-Pin-SO-DIMM-Steckverbinder.
- **Kit:** Zwei offizielle Angaben widersprechen sich — das Datenblatt (Dez. 2024) nennt
  **103 mm × 90,5 mm × 34,77 mm**; NVIDIAs Produktfamilien-Tabelle nennt
  **100 mm × 79 mm × 21 mm**. Beide definieren die Höhe einschließlich Füßen, Trägerplatine, Modul
  und Kühllösung.
- NVIDIA hat keine Auflösung des Widerspruchs veröffentlicht. Eine Händler-Erklärung (Kit auf
  seiner Basis vs. nackte Trägerplatine) ist **unbestätigt**.

> **Juxi-Hinweis:** Prüfen Sie die Abmessungen im aktuellen Datenblatt von NVIDIA, bevor Sie ein Gehäuse entwerfen.

## Quellen

- [Hardware Layout — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (geprüft am 2026-09-26)
- [Quick Start — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (geprüft am 2026-09-26)
- [How-To — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (geprüft am 2026-09-26)
- [Troubleshooting — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) (geprüft am 2026-09-26)
- [Jetson Orin Nano Super Developer Kit datasheet (PDF, Dec 2024)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (geprüft am 2026-09-26)
- [Jetson Orin NX/Nano Series — Module Adaptation and Bring-Up, L4T r39.2 Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (geprüft am 2026-09-26)
- [Jetson Orin product family — developer.nvidia.com](https://developer.nvidia.com/embedded/jetson-orin) (geprüft am 2026-09-26)
- [NVIDIA Developer Forums — „Slow Wi-Fi on Orin Nano DevKit (RTL8822CE)“, Community-Thread](https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697) (geprüft am 2026-09-26)

*Status: Entwurf, ausstehende Prüfung durch cheny. Basiert auf NVIDIAs offizieller
Dokumentation mit Stand der oben genannten Daten; noch nicht von Juxi Technology auf physischer Hardware
verifiziert.*

**Bildnachweis:** Die Layout-Bilder stammen aus NVIDIAs offiziellem *Jetson Orin
Nano Developer Kit User Guide* (heruntergeladen am 2026-09-26), © NVIDIA Corporation.

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird
von Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
