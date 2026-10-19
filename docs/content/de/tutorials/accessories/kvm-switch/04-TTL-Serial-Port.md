---
title: "04 · TTL-Serieller Anschluss (drahtlose serielle Verbindung)"
description: "Der 6-polige TTL-Anschluss ist ein serieller Passthrough-Anschluss: Schließen Sie ein Entwicklungsboard, einen Sensor usw."
---

# 04 · TTL-Serieller Anschluss (drahtlose serielle Verbindung)

> [← Zurück zur Übersicht](/de/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Gilt für: JUXI Technology KVM&HUB&TTL

## Was es ist

Der 6-polige TTL-Anschluss ist ein **serieller Passthrough-Anschluss**: Schließen Sie ein Entwicklungsboard, einen Sensor usw. an, werden dessen serielle Daten „gleichzeitig" an zwei Stellen ausgegeben (bidirektional):

```
                ┌─→ PC-Seriellanschluss (USB; vom System als "USB-BLE-SERIAL CH9143" erkannt)
Externes Gerät → 6-polig ┤
                └─→ Bluetooth drahtlos (Handy BleUart App, siehe 03)
```

**Messreferenz**: Mit einem IMU-Sensor empfingen PC-Seriellanschluss und Bluetooth gleichzeitig stabil etwa 1650 Byte/Sekunde.

## Pinbelegung und Verkabelung

Von links nach rechts: `GND` `RXD` `TXD` `TNOW` `3V3` `5V`

| Pin | Beschreibung | Verkabelung |
|---|---|---|
| GND | Masse | Mit GND des externen Geräts verbinden (**zwingend**) |
| RXD | Lokaler Empfang | Mit **TXD** des externen Geräts verbinden (gekreuzt) |
| TXD | Lokales Senden | Mit **RXD** des externen Geräts verbinden (gekreuzt) |
| TNOW | Senderichtungs-Anzeige | **Unverbunden lassen** |
| 3V3 | 3,3-V-Stromausgang | Kann Low-Power-Peripherie versorgen (alternativ zu 5V) |
| 5V | 5-V-Stromausgang | Kann Low-Power-Peripherie versorgen (alternativ zu 3V3) |

**Wichtig**: Senden/Empfangen müssen **gekreuzt** sein; Pegel **3,3 V**; die Strompins sind **Ausgänge** — niemals zurückspeisen; nur Low-Power-Module versorgen.

(Abbildung: Tutorial-Material 12 – TTL-Verkabelungsbeispiel)

## Verwendung am Computer

1. Dieses Produkt per Type-C an den Computer anschließen (PC1 oder PC2, beliebig);
2. Das System erkennt den seriellen Anschluss **`USB-BLE-SERIAL CH9143`** automatisch (treiberfrei unter Windows 10/11);
3. Mit einem Seriell-Tool öffnen; Parameter: **115200, 8N1**;
4. Die Daten des externen Geräts kommen sofort an (Daten zum Gerät senden ist ebenfalls möglich).

## Anschluss an Entwicklungsboards (Raspberry Pi / Jetson)

Pegel 3,3 V — direkte Verbindung möglich (gekreuzte Verkabelung, GND verbunden):

| Dieses Produkt | Raspberry Pi | Jetson (Orin-Serie, 40-polig) |
|---|---|---|
| RXD | Pin8 (GPIO14 / TXD) | Pin8 (UART1_TXD) |
| TXD | Pin10 (GPIO15 / RXD) | Pin10 (UART1_RXD) |
| GND | Beliebiges GND (z. B. Pin9) | Beliebiges GND (z. B. Pin9) |

> Beim Raspberry Pi muss der serielle Anschluss in `raspi-config` aktiviert werden; beim Jetson muss die 40-polige UART zuerst aktiviert werden.
> Typisches Szenario: Seriell des Entwicklungsboards → KVM → Befehle am PC tippen und Logs ansehen, gleichzeitig am Handy per Bluetooth (drahtloses Debuggen).

(Abbildung: Tutorial-Material 10 – Jetson-Pinbelegung, 11 – Raspberry-Pi-Pinbelegung)

## Fehlersuche: Keine seriellen Daten?

Der Reihe nach prüfen:
1. Sind TX/RX des externen Geräts **gekreuzt** und ist GND verbunden?
2. Ist die Baudrate des externen Geräts **115200**?
3. Ist das externe Gerät versorgt (die 5V/3V3-Pins dieses Produkts können verwendet werden)?
4. Ist der PC-Seriellanschluss von einer anderen Software belegt? Beim Umschalten auf den anderen Computer verschwindet der Anschluss kurz (normal).

<RelatedProducts slugs="kvm-switch" />
