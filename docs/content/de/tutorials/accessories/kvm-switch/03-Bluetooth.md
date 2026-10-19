---
title: "03 · Bluetooth"
description: "Das Gerät hat ein integriertes Bluetooth-Modul (die drahtlose Seite desselben seriellen Kanals wie der 6-polige TTL-Anschluss)."
---

# 03 · Bluetooth

> [← Zurück zur Übersicht](/de/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Gilt für: JUXI Technology KVM&HUB&TTL

## Wofür Bluetooth da ist

Das Gerät hat ein integriertes Bluetooth-Modul (**die drahtlose Seite desselben seriellen Kanals wie der 6-polige TTL-Anschluss**). Sobald ein Entwicklungsboard oder Sensor am TTL-Anschluss angeschlossen ist, werden dessen Daten nicht nur am PC-Seriellanschluss ausgegeben, sondern **gleichzeitig auch per Bluetooth**; verbinden Sie ein Handy, können Sie Daten drahtlos senden und empfangen.

> Zur Verkabelung siehe [04 - TTL-Serieller Anschluss](/de/tutorials/accessories/kvm-switch/04-TTL-Serial-Port). Bluetooth-Verbindung und Datenübertragung sind **vom Computer-Umschalten unabhängig** (die Verbindung bleibt bestehen, egal welcher Computer gewählt ist).

## So funktioniert es (zuerst lesen)

⚠️ **Bluetooth ist keine „Fernbedienung"** — es ist ein **drahtloses serielles Kabel**: Es überträgt serielle Daten zwischen dem „Gerät am 6-poligen Header" und „Handy/Computer". **Ohne angeschlossenes externes Gerät zeigt eine Bluetooth-Verbindung keine Daten an — das ist normal.**

```
【Externes Gerät】        【Dieses Produkt】          【Sie】
 Entwicklungsboard/Sensor ──6-polig──> Serielles Passthrough ──┬─ kabelgebunden → PC seriell (USB-BLE-SERIAL CH9143)
 (erzeugt/empfängt Daten)                                      └─ drahtlos → Handy/PC Bluetooth (BleUart App)
```

**Beispiel 1: IMU-Lagedaten drahtlos anzeigen**

1. TX/RX/GND/5V des IMU-Moduls an den 6-poligen Header anschließen (gekreuzt, mit Stromversorgung — siehe 04) → das IMU beginnt mit der Datenausgabe;
2. Umschalttaste ca. 3 Sekunden lang drücken, um den Bluetooth-Modus zu aktivieren (LED leuchtet);
3. Mit der Handy-App BleUart mit `CH9143BLE2U` verbinden;
4. Auf dem Handy erscheinen sofort fortlaufende Datenframes (im Test ca. 80 Frames/Sekunde Lagedaten);
5. Gleichzeitig zeigt ein PC-Seriellwerkzeug bei `USB-BLE-SERIAL CH9143` exakt dieselben Daten.

**Beispiel 2: Drahtloses Debuggen von Raspberry Pi / Jetson**

1. Raspberry Pi Pin8(TXD)/Pin10(RXD)/GND gekreuzt an den 6-poligen Header anschließen;
2. Raspberry Pi einschalten — das Boot-Log wird über den seriellen Anschluss ausgegeben;
3. Nach dem Verbinden über Handy-BleUart das **Boot-Log drahtlos ansehen**;
4. Eingaben in der App werden über TXD des 6-poligen Headers an den Raspberry Pi gesendet — das Handy wird zur **drahtlosen seriellen Konsole** (Login, Befehle senden).

## Schritte zum Verbinden des Handys (4 Schritte)

1. **Umschalttaste ca. 3 Sekunden lang drücken**, bis die LED leuchtet — Bluetooth-Modus (Anzeigename: `CH9143BLE2U`);
2. Offizielle WCH-App **„BleUart"** auf dem Handy installieren (im App-Store suchen, kostenlos);
3. App öffnen → „Bluetooth verbinden" tippen → **CH9143BLE2U** aus der Liste wählen;
4. Verbunden (**kein Passwort erforderlich**) — Daten senden und empfangen.

(Abbildung: Tutorial-Material 04 – Langer Druck für den Bluetooth-Modus)

## ⚠️ Wichtige Hinweise

- **Verwenden Sie nicht die Bluetooth-„Kopplung" der Handy-Systemeinstellungen**: Sie werden nach einer PIN gefragt, und keine PIN funktioniert — verbinden Sie BLE-Geräte immer direkt über die **BleUart-App**;
- Das Bluetooth-Modul kann **nur mit einem Host-Gerät gleichzeitig** verbunden werden (ist ein Handy verbunden, kann kein Computer per Bluetooth verbinden und umgekehrt). Der **serielle Anschluss** (USB) am PC ist davon nicht betroffen und kann parallel genutzt werden.

## Fehlersuche

| Problem | Lösung |
|---|---|
| CH9143BLE2U wird nicht gefunden | Taste erneut lange drücken, bis die LED leuchtet; Abstand unter 10 m sicherstellen |
| PIN-Abfrage / Verbindung schlägt fehl | System-Kopplung abbrechen und die BleUart-App verwenden |
| App kann nicht verbinden | Möglicherweise von einem anderen Gerät (z. B. Computer) belegt — zuerst die andere Verbindung trennen |
| Verbunden, aber keine Daten | Bluetooth überträgt die seriellen Daten des 6-poligen Headers — zuerst prüfen, ob das externe Gerät am TTL-Anschluss hängt (siehe 04) |

<RelatedProducts slugs="kvm-switch" />
