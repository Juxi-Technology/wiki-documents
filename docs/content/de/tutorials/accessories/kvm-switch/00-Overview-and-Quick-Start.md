---
title: "KVM-Switch · Tutorial-Übersicht"
description: "Ein 2-in-3-out-USB-Tastatur-/Maus-Umschalter: Eine Tastatur und Maus (sowie Peripheriegeräte) wechseln per Tastendruck zwischen zwei Computern; integrierter …"
---

# KVM-Switch · Tutorial-Übersicht

> Gilt für: JUXI Technology **KVM&HUB&TTL** Tastatur-/Maus-Umschalter für zwei Computer (USB 2.0)
> Version v1.0 (2026-10-14) | Das Tutorial ist nach Funktionsmodulen gegliedert — lesen Sie nur die benötigten Teile

---

## Nach Modul suchen

| Was ich tun möchte | Lesen Sie |
|---|---|
| Das Gerät zuerst in Betrieb nehmen | Diese Seite → „Schnellstart" |
| Tastatur/Maus & Peripherie zwischen zwei Computern umschalten | [01 - Umschalten zwischen zwei Computern](/de/tutorials/accessories/kvm-switch/01-Switching-Between-Two-Computers) |
| Als USB-HUB (eins zu drei) verwenden | [02 - HUB-Funktion (eins zu drei)](/de/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three) |
| **Per Handy-Bluetooth verbinden, Daten senden/empfangen** | [03 - Bluetooth](/de/tutorials/accessories/kvm-switch/03-Bluetooth) |
| **6-poligen TTL-Anschluss verdrahten, Daten am PC ansehen** | [04 - TTL-Serieller Anschluss (drahtlose serielle Verbindung)](/de/tutorials/accessories/kvm-switch/04-TTL-Serial-Port) |
| **Mehr über den 10-poligen Erweiterungsheader erfahren** | [05 - 10-Pin-Erweiterungsheader](/de/tutorials/accessories/kvm-switch/05-10-Pin-Expansion-Header) |
| Ein Entwicklungsboard/einen Host ohne Monitor steuern | [06 - Host ohne Monitor (Capture-Card + OBS)](/de/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |
| FAQ und Hinweise | [07 - FAQ und Hinweise](/de/tutorials/accessories/kvm-switch/07-FAQ-and-Precautions) |

## Das Produkt in einem Satz

**Ein 2-in-3-out-USB-Tastatur-/Maus-Umschalter**: Eine Tastatur und Maus (sowie Peripheriegeräte) wechseln per Tastendruck zwischen zwei Computern; integrierter 3-Port-USB-HUB; dazu eine **drahtlose serielle Funktion** — verbinden Sie den seriellen Anschluss eines Entwicklungsboards oder Sensors mit dem 6-poligen Header, und die Daten werden gleichzeitig an den PC-Seriellanschluss und per Bluetooth an Ihr Handy weitergegeben.

## Anschlüsse auf einen Blick

| Position | Name | Beschreibung |
|---|---|---|
| Links / rechts | PC1 / PC2 (Type-C) | Verbindung zu den beiden Computern |
| Unten | USB-A × 3 | Tastatur/Maus, USB-Stick, Drucker usw. — werden gemeinsam umgeschaltet |
| Oben | Stromanschluss (Type-C) | Zusatzstromversorgung (wenn die Host-Versorgung nicht ausreicht) |
| Mitte | Umschalttaste | Kurz drücken = umschalten; lang drücken = Bluetooth-Modus |
| Oben links | Infrarot-Empfänger | Für Umschalten per IR-Fernbedienung |
| Unten rechts | TTL-Anschluss (6-polig) | Drahtlose serielle Funktion (siehe 04) |
| Unten rechts | 10-poliger Header | Erweiterungsschnittstelle (siehe 05) |
| Oben rechts | Bluetooth-Modul (integriert) | Drahtlose serielle Funktion (siehe 03) |

**LED-Anzeigen**: PC1/PC2 (aktueller Kanal) | Strom | UART seriell (blinkt bei Datenverkehr) | Bluetooth (leuchtet nach langem Drücken)

## Schnellstart (5 Minuten)

1. Computer A → Type-C-Kabel → **PC1**; Computer B → **PC2** (auch nur ein Computer möglich — dann ist das Gerät einfach ein USB-HUB);
2. Tastatur/Maus (oder Funkempfänger) an einen beliebigen **USB-A**-Anschluss anschließen;
3. Umschalttaste drücken und anhand der **PC1/PC2-LED** prüfen, welcher Computer verbunden ist;
4. Bei unzureichender Host-Versorgung zusätzlich Type-C-Strom an den **Stromanschluss** anschließen.

(Abbildung: Tutorial-Material 01 – Funktionsanordnung)

## Zwei wichtige Hinweise

- Dieses Produkt **schaltet kein Video um**: Jeder Computer nutzt seinen eigenen Monitor. Für einen Host ohne Monitor verwenden Sie die Capture-Card-Lösung (siehe 06);
- Dieses Produkt ist **USB 2.0**: für Tastatur/Maus, Drucker, USB-Sticks und Dongles völlig ausreichend; für schnelle Speicher empfehlen wir den direkten Anschluss am Computer.

---

*(Details zu jedem Funktionsmodul finden Sie über den entsprechenden Eintrag in der Tabelle „Nach Modul suchen".)*

<RelatedProducts slugs="kvm-switch" />
