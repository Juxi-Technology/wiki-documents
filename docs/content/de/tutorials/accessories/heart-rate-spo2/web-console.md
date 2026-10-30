---
title: "Web-Konsole – Benutzerhandbuch"
description: "Das MAX30102-Herzfrequenz-/SpO2-Modul mit der browserbasierten Hostsoftware (Web Serial) verbinden und überwachen – ohne Softwareinstallation."
---

# Web-Konsole – Benutzerhandbuch

Dieses Tutorial zeigt, wie Sie mit der browserbasierten Hostsoftware das Herzfrequenz-/SpO2-Modul verbinden und überwachen. Die Web-Version greift über Web Serial direkt auf den seriellen Port zu; es muss weder Python noch eine `.exe` installiert werden. Sie funktioniert unter Windows, macOS und Linux.

**Online-Adresse:** [https://juxi-technology.github.io/JUXI_HeartRate_SPO2/](https://juxi-technology.github.io/JUXI_HeartRate_SPO2/)

> Die Web-Version und die Desktop-Hostsoftware verwenden dasselbe Modbus-RTU-Protokoll (Slave-Adresse `0x20`, Baudrate 9600); die Messwerte sind vollständig identisch.

## 1. Systemvoraussetzungen

- Desktop-Version von **Chrome, Edge oder Opera** (Web-Serial-Unterstützung erforderlich)
- Safari, Firefox und mobile Browser implementieren Web Serial nicht und können keine serielle Verbindung herstellen
- USB-zu-TTL-Treiber (CH340, CP2102, FT232 usw.)
- Die Seite benötigt eine Internetverbindung zum Laden
- Der Browser erteilt der Seite jeweils nur Zugriff auf ein serielles Gerät

## 2. Hardwareverbindung

| Herzfrequenz-/SpO2-Modul | USB-zu-TTL |
|---|---|
| **VCC** | **5 V** (nicht 3,3 V anschließen) |
| **GND** | **GND** |
| **TX** | **RX** (gekreuzt verbinden) |
| **RX** | **TX** (gekreuzt verbinden) |

⚠️ TX und RX müssen gekreuzt verbunden werden. Erst danach den USB-zu-TTL-Adapter in den Computer stecken.

## 3. Gerät verbinden

1. Öffnen Sie die oben genannte Online-Adresse in der Desktop-Version von Chrome / Edge / Opera.
1. Lassen Sie die Baudrate auf **9600**, passend zum Modul.
1. Klicken Sie auf „**Seriellen Port verbinden**“ und wählen Sie im browsereigenen Dialog das zum Modul gehörende USB-Seriell-Gerät aus.
1. Zeigt der Status „**Verbunden, bereit zur Erfassung**“ an, ist die Verbindung erfolgreich; neben der Schaltfläche wird das ausgewählte Gerät angezeigt.

> Die seriellen Parameter sind fest auf 8 Datenbits, 1 Stoppbit, keine Parität und keine Flusskontrolle eingestellt. Sie werden von der Seite automatisch gesetzt, eine manuelle Konfiguration ist nicht erforderlich.

## 4. Erfassung starten und überwachen

1. Klicken Sie auf „**Erfassung starten**“ – die Modul-LED leuchtet, der Status wechselt zu „Erfassung gestartet, LED an“.
1. Legen Sie den Finger auf den Sensor und bedecken Sie den optischen Bereich vollständig; leicht auflegen genügt, nicht fest drücken.
1. Klicken Sie auf „**Überwachung starten**“ – der Status wechselt zu „Überwachung läuft …“, und die Echtzeitdaten werden aktualisiert.

## 5. Oberfläche

### Echtzeitdaten

| Messwert | Einheit | Beschreibung |
|---|---|---|
| Blutsauerstoff (SPO2) | % | Blutsauerstoffsättigung |
| Herzfrequenz | Schläge/min | Pulsfrequenz |
| Temperatur | °C | Boardtemperatur des Moduls, nicht die Körpertemperatur |

**Filterung**: standardmäßig aktiviert. Die Messwerte werden mit einem 5-Punkt-Median geglättet, und Ausreißer außerhalb des sinnvollen Bereichs (Herzfrequenz 35–220, SpO2 70–100 %, Temperatur 0–60 °C) werden entfernt. Die Anzahl der entfernten Werte wird unterhalb des Datenbereichs angezeigt, z. B. „N Ausreißer entfernt“. Deaktivieren Sie das Kontrollkästchen, um die ungefilterten Rohwerte anzuzeigen.

**Statusanzeigen**: Nicht verbunden / Warten auf Geräteauswahl… / Verbunden, bereit zur Erfassung / Erfassung gestartet, LED an / Erfassung beendet, LED aus / Überwachung läuft … / Überwachung gestoppt / Gerät getrennt / Der aktuelle Browser unterstützt Web Serial nicht.

### Sprachumschaltung

Mit der Schaltfläche **EN / 中文** oben rechts wechseln Sie die Sprache der Oberfläche. Baudrate und Filtereinstellung werden vom Browser gespeichert und bleiben beim nächsten Öffnen erhalten.

### Tab „Dokumentation“

Der Tab „**Dokumentation**“ oben enthält die Tutorials dieses Produkts in 11 Sprachen; die Sprache lässt sich direkt auf der Seite umschalten.

## 6. Stoppen und Trennen

Empfohlene Reihenfolge:

1. Auf „Überwachung stoppen“ klicken
1. Auf „Erfassung beenden“ klicken – die LED erlischt
1. Auf „Verbindung trennen“ klicken

## 7. Interpretation der Daten

| Daten | Normalbereich | Beschreibung |
|---|---|---|
| Blutsauerstoff SpO2 | 95% – 100% | unter 90 %: Arztbesuch empfohlen |
| Herzfrequenz | 60 – 100 Schläge/min | Ruhebereich bei Erwachsenen |
| Temperatur | 25 – 35 °C | Temperatur des Board-Sensors, nicht die Körpertemperatur |

Direkt nach dem Verbinden oder bei nicht richtig aufgelegtem Finger ist die Anzeige `-1` normal.

## 8. Unterschiede zur Desktop-Hostsoftware

| Vergleichspunkt | Web-Version | Desktop-Hostsoftware |
|---|---|---|
| Installation | keine Installation erforderlich | `.exe` oder Python-Skript erforderlich |
| Laufzeitumgebung | Browser | Windows |
| Kommunikation | Web Serial | System-Seriellanschluss |
| Offline-Nutzung | nicht unterstützt, die Seite benötigt Internet | unterstützt |
| Protokoll und Messwerte | identisch | identisch |

## 9. Häufige Fragen

**F1: Es erscheint „Der aktuelle Browser unterstützt Web Serial nicht“.**

Verwenden Sie die Desktop-Version von Chrome, Edge oder Opera. Safari, Firefox und mobile Browser implementieren Web Serial nicht.

**F2: Nach dem Klick auf „Seriellen Port verbinden“ erscheint kein Gerät im Dialog.**

Prüfen Sie, ob der USB-zu-TTL-Treiber installiert ist und das Datenkabel die Datenübertragung unterstützt; versuchen Sie einen anderen USB-Anschluss oder stecken Sie das Gerät erneut ein.

**F3: Die Verbindung schlägt fehl.**

Stellen Sie sicher, dass der serielle Port nicht von anderen Programmen belegt ist (Seriell-Assistent, Arduino IDE usw.) und dass das Gerät mit Strom versorgt wird.

**F4: Nach dem Klick auf „Erfassung starten“ leuchtet die LED nicht.**

Prüfen Sie, ob VCC an 5 V und nicht an 3,3 V angeschlossen ist, und ob TX/RX gekreuzt verbunden sind.

**F5: Die Daten zeigen dauerhaft -1.**

Stellen Sie sicher, dass „Erfassung starten“ angeklickt wurde, der Finger den optischen Bereich des Sensors vollständig bedeckt und einige Sekunden ruhig gehalten wird.

**F6: Das Gerät wurde abgezogen.**

Die Seite zeigt „Gerät getrennt“ an; stecken Sie das Gerät wieder ein und klicken Sie erneut auf „Seriellen Port verbinden“.

## 10. Hinweise

1. Zuerst den Sensor anschließen, dann USB einstecken.
1. Der Sensor muss mit 5 V versorgt werden; 3,3 V reichen möglicherweise nicht aus.
1. Während der Messung den optischen Bereich vollständig mit dem Finger bedecken und nicht fest drücken.
1. Direktes starkes Licht auf den Sensor vermeiden.
1. Der Browser erteilt jeweils nur einem seriellen Gerät Zugriff; mehrere Geräte müssen einzeln verbunden werden.
