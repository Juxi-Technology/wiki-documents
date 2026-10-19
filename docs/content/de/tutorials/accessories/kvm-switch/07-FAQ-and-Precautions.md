---
title: "07 · FAQ und Hinweise"
description: "F1: Kann es das Monitorbild umschalten?"
---

# 07 · FAQ und Hinweise

> [← Zurück zur Übersicht](/de/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Gilt für: JUXI Technology KVM&HUB&TTL
> Modulspezifische Fragen finden Sie auf den jeweiligen Seiten (Bluetooth → 03; TTL seriell → 04).

## FAQ

**F1: Kann es das Monitorbild umschalten?**
Nein. Dieses Produkt schaltet Tastatur/Maus und USB-Geräte um. Jeder Computer nutzt seinen eigenen Monitor; für einen Host ohne Monitor verwenden Sie die Capture-Card-Lösung (siehe [06](/de/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS)).

**F2: Muss ich Treiber installieren?**
Nein — treiberfrei (Windows / macOS / Linux / chinesische Inlands-Betriebssysteme).

**F3: Kann ich eine externe Festplatte anschließen?**
Dieses Produkt ist USB 2.0; für schnelle Speicher und Capture-Cards empfehlen wir den direkten Anschluss am Computer. USB-Sticks, Tastatur/Maus, Drucker und Dongles sind kein Problem.

**F4: Das Handy kann per Bluetooth nicht verbinden / PIN-Abfrage erscheint?**
Verwenden Sie nicht die System-Bluetooth-„Kopplung"; installieren Sie die **BleUart**-App und verbinden Sie innerhalb der App (siehe [03](/de/tutorials/accessories/kvm-switch/03-Bluetooth)).

**F5: Können Handy und Computer gleichzeitig per Bluetooth verbinden?**
Nein — es ist immer nur ein Host-Gerät möglich. Der **serielle Anschluss** (USB) am PC ist davon nicht betroffen und parallel nutzbar.

**F6: Verschwinden USB-Geräte beim Umschalten kurz?**
Normal: Geräte „wandern" beim Umschalten zwischen den Computern, der andere Computer erkennt sie neu (bei manchen Geräten dauert es einige Sekunden).

**F7: Kann es nur als HUB verwendet werden?**
Ja — mit nur einem Computer ist es ein 3-Port-USB-HUB (siehe [02](/de/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three)).

**F8: Werden Gaming-Mäuse unterstützt?**
Tastatur/Maus laufen über Standard-USB-2.0-HID — im Büro- und Debugging-Einsatz nicht wahrnehmbar; Gaming-Geräte mit hoher Abtastrate bitte mit Vorsicht verwenden.

## Hinweise

- Der TTL-Anschluss hat **3,3 V** Pegel — niemals 5-V-Signalpegel einspeisen; `3V3/5V` sind **Ausgangs**pins — niemals Strom zurückspeisen;
- Die USB-2.0-Bandbreite ist begrenzt; wählen Sie Geräte gemäß den Empfehlungen in [02](/de/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three);
- Gerät nicht zerlegen oder nachlöten; es ist ESD-empfindlich — vor dem Anfassen entladen;
- Produktfunktionen und Anschlüsse entsprechen dem physischen Gerät; bei Aktualisierungen dieses Tutorials gilt die neueste Version.

## Versionsverlauf

| Version | Datum | Beschreibung |
|---|---|---|
| v1.0 | 2026-10-14 | Erstversion, gegliedert nach Funktionsmodulen (Umschalten/HUB/Bluetooth/TTL/10-Pin/Capture-Card/FAQ) |

<RelatedProducts slugs="kvm-switch" />
