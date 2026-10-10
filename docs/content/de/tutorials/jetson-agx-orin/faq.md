---
title: FAQ
sidebar_label: FAQ
slug: /support/faq
description: >-
  Häufig gestellte Fragen zum NVIDIA Jetson AGX Orin Developer Kit (64GB) —
  Lieferumfang, Einrichtung, Display und Stromversorgung, Software und Support.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 / component versions per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# FAQ

## Einrichtung

**Was ist im Lieferumfang enthalten?**
Jetson AGX Orin Modul und Referenz-Trägerplatine, Wi-Fi-Modul, USB-Typ-C-Netzteil
und ein USB-Typ-C-auf-USB-Typ-A-Kabel. Monitor (DisplayPort), Tastatur/Maus und
optional ein Ethernet-Kabel stellen Sie selbst bereit — siehe
[Schnellstart](/de/tutorials/jetson-agx-orin/quick-start).

**Wird das Kit mit einem Betriebssystem ausgeliefert?**
Ja — der eMMC ist vorab geflasht und das Kit startet direkt in den
Ubuntu-Desktop. Einheiten können mit einer älteren L4T-Version ausgeliefert
werden; der empfohlene Aktualisierungsweg ist das Jetson ISO (kein Host-PC
erforderlich). Siehe [Schnellstart](/de/tutorials/jetson-agx-orin/quick-start).

**Brauche ich einen separaten PC für die Einrichtung?**
Nein, nicht für den empfohlenen Weg — das Jetson ISO installiert von einem
USB-Stick. Ein Host-PC (Ubuntu) ist nur für die alternativen
Installationsmethoden (SDK Manager / Flash-Skript) oder für die
Headless-Ersteinrichtung nötig. Siehe
[Flashen & Updates](/de/tutorials/jetson-agx-orin/flashing-and-updates).

**Welche Softwareversion ist aktuell?**
JetPack **7.2.1** (Jetson Linux **39.2.1**, Ubuntu 24.04, CUDA 13.2.2,
TensorRT 10.16.2). Prüfen Sie mit
[System überprüfen](/de/tutorials/jetson-agx-orin/verify-your-system), welche
Version Ihr Kit ausführt.

## Display & Stromversorgung

**Kann ich meinen HDMI-Monitor anschließen?**
Nur über einen **aktiven** DisplayPort→HDMI-Adapter oder ein entsprechendes
Kabel — das Kit hat nur einen DisplayPort-Ausgang (kein HDMI-Anschluss, kein
DP-über-USB-C). MST wird für bis zu zwei Displays unterstützt. Details:
[Schnittstellen & Hardware-Layout](/de/tutorials/jetson-agx-orin/interfaces).

**Wie versorge ich das Kit mit Strom?**
Verwenden Sie das mitgelieferte USB-C-Netzteil am USB-C-Anschluss oberhalb der
DC-Buchse (J24). Wenn Sie eigenen Strom über die Hohlsteckerbuchse (J41)
zuführen: 5,5 mm Außendurchmesser, 2,5 mm Innendurchmesser, Pluspol innen.

## Verwendung des Kits

**Kann dieses Developer Kit andere Jetson-Module emulieren?**
Ja. Das Developer Kit teilt die SoC-Architektur mit allen Jetson-Orin-Modulen
und kann erneut geflasht werden, um Leistung und Leistungsaufnahme von
AGX-Orin-, Orin-NX- oder Orin-Nano-Modulen zu emulieren. Ab Werk ist es auf die
AGX-Orin-Serie vorkonfiguriert.

**Ist das das Modul, das ich in einem Serienprodukt einsetzen würde?**
Nein. Serienprodukte basieren auf Jetson-Orin-**Modulen** (64 GB / 32 GB /
Industrial) auf Ihrer eigenen oder einer Partner-Trägerplatine. Das Developer
Kit ist das Entwicklungs- und Prototyping-Vehikel.

**Kann es große Sprachmodelle / agentische KI ausführen?**
Ja — das ist ein Kernanwendungsfall der Orin-Plattform. Mit JetPack 7.2 lässt
sich NVIDIA NemoClaw auf Developer Kits mit einem einzigen Befehl
installieren — für lokale und Cloud-Modell-Orchestrierung —, und das
[Jetson AI Lab](https://www.jetson-ai-lab.com) veröffentlicht praktische
Tutorials.

**Für Robotik: Ist Isaac ROS auf JetPack 7.2 verfügbar?**
Ja — Isaac ROS unterstützt Jetson Orin auf JetPack 7.2 seit Release
**4.6.0** (2026-08-18), mit einer offiziellen Einrichtungsanleitung für AGX
Orin. Beachten Sie, dass NVIDIAs JetPack-Downloadseite weiterhin „in Kürze
verfügbar" anzeigt: Isaac ROS wird unabhängig von JetPack veröffentlicht,
daher sind die Release Notes von Isaac ROS selbst die maßgebliche Quelle. Zu
Version und Wahl der ROS-2-Distribution (4.6.x = Jazzy, 5.0 = Lyrical) sowie
zu den bekannten Einschränkungen siehe
[Robotik unter JetPack 7.2](/de/tutorials/jetson-agx-orin/robotics).

## Support & Service

**Wo bekomme ich technischen Support?**
- Plattformfragen: [NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — zuerst suchen; geben Sie die Ausgabe von `cat /etc/nv_tegra_release` an.
- Technischer Support von Juxi Technology: **support@juxitech.com**
- Bestellung, Garantie und RMA: **support@juxitech.com** (geben Sie zur Beschleunigung Ihre Bestellnummer an)
- Vertrieb und Angebote: **sales@juxitech.com**
- Produktfragen (Auswahl, Kompatibilität): **pe@juxitech.com**

**Wo bekomme ich Zubehör (NVMe-Speicher, Kameras, Stromversorgung)?**
Durchsuchen Sie den Produktkatalog von Juxi Technology unter **<https://wiki.juxitech.com/products/>** —
er enthält Jetson-relevantes Zubehör wie die
[IMX219-CSI-Kamera](https://wiki.juxitech.com/products/imx219-csi-camera)
(für NVIDIA Jetson entwickelt), USB-Autofokus-Kameras und
[RealSense-Tiefenkameras](https://wiki.juxitech.com/products/realsense-depth-camera).
Für eine Beratung wenden Sie sich an sales@juxitech.com.

## Quellen

- Jetson AGX Orin Developer Kit User Guide — [Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html), [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (geprüft am 2026-09-23)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (geprüft am 2026-09-23)

*Status: geprüft am 2026-10-11.*

---

NVIDIA® und Jetson™ sind Marken der NVIDIA Corporation. Diese Seite wird
von Juxi Technology veröffentlicht und ist keine Veröffentlichung von NVIDIA.
