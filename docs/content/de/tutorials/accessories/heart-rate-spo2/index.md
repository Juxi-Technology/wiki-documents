---
title: "MAX30102 Herzfrequenz- und SpO2-Sensormodul – Tutorial"
description: "Vollständiges Tutorial zum MAX30102-Herzfrequenz- und SpO2-Sensormodul: Produktinformationen, Web-Version, Arduino, Raspberry Pi und PC-Hostsoftware."
---

# MAX30102 Herzfrequenz- und SpO2-Sensormodul – Tutorial

Dieses Tutorial stellt die Verwendung des MAX30102-Herzfrequenz- und SpO2-Sensormoduls von Juxi Technology vor. Das Modul trägt den speziellen Herzfrequenz- und SpO2-Messchip MAX30102 von Maxim, enthält einen selbst entwickelten Herzfrequenz-/SpO2-Algorithmus und gibt Herzfrequenz, Blutsauerstoffsättigung und Boardtemperatur direkt aus; es unterstützt die beiden Kommunikationsarten I2C und UART.

## Tutorial-Inhalt

| Inhalt | Beschreibung |
|---|---|
| [Produktinformationen](./product-info.md) | Produktübersicht, Messprinzip, technische Daten, Pinbelegung und typische Anwendungsszenarien |
| [Web-Konsole – Anleitung](./web-console.md) | Direkte Verbindung über Web Serial im Browser, keine Softwareinstallation erforderlich |
| [Arduino – Anleitung](./arduino.md) | Verkabelung, Bibliotheksinstallation, Beispielcode, API und häufige Fragen |
| [Raspberry Pi – Anleitung](./raspberry-pi.md) | I2C-/UART-Verkabelung, Umgebungseinrichtung, Beispielcode und API |
| [PC · Python-Ausführung](./pc/python.md) | USB-zu-TTL + Python-Skript zum Auslesen der Daten |
| [PC-Hostsoftware](./pc/upper-computer.md) | Grafische Hostsoftware: serielle Einstellungen, Erfassung und Echtzeitüberwachung |

## Schnellstart

1. Lesen Sie zuerst die [Produktinformationen](./product-info.md) und prüfen Sie die Stromversorgung (3,3–5 V) sowie die Pinbelegung;
2. Nur schnell Daten ansehen: Verwenden Sie die [Web-Konsole – Anleitung](./web-console.md), öffnen Sie die Seite einfach in Chrome / Edge;
3. Für Mikrocontroller: siehe [Arduino – Anleitung](./arduino.md);
4. Für Raspberry Pi: siehe [Raspberry Pi – Anleitung](./raspberry-pi.md);
5. Für den PC: siehe [PC · Python-Ausführung](./pc/python.md) oder [PC-Hostsoftware](./pc/upper-computer.md).

> Dieses Produkt ist ein elektronisches Messmodul der Consumer-Klasse und kein medizinisches Fachgerät; die Messdaten dienen nur als allgemeine Gesundheitsreferenz.

<RelatedProducts slugs="heart-rate-spo2" />
