---
title: "Feetech-Bus-Servo Web-Debugging (SCS0009 / STS3215 / HD1910)"
description: "Web-Debugging für Feetech-Bus-Servos: Verbindung über Web Serial im Browser, Unterstützung für Scan, Parameter-Lesen/-Schreiben, Positionssteuerung, Baudratenänderung, Werkseinstellungen und xdat-Backup bei SCS0009 / STS3215 / HD1910."
---

# Feetech-Bus-Servo Web-Debugging (SCS0009 / STS3215 / HD1910)

> **Desktop-Tool:** [Anleitung zum SCS0009-Servo-Debug-Tool](./SCS0009-Debug-Tool.md) ｜ [STS3215 & SCS0009 – Debug-Tutorial](./Feetech-STS3215&SCS0009-Tutorial.md)

Web-Version des Feetech-Bus-Servo-Debug-Tools: Der Browser öffnet über **Web Serial** direkt den USB-Seriell-Port und kommuniziert mit den Servos; damit lassen sich serielle Verbindung, Servo-Scan, Modellerkennung, Parameter-Lesen/-Schreiben, Positionssteuerung mit Echtzeit-Follow, Baudratenänderung, Werkseinstellungen wiederherstellen sowie xdat-Parameter-Backup und -Wiederherstellung durchführen.

Reine statische Seite, **keine Installation von Software oder einer Python-Umgebung erforderlich** – einfach die URL öffnen und loslegen. Derzeit werden die drei Modelle **SCS0009**, **STS3215** und **HD1910** unterstützt.

## 1. Webseite öffnen

Online-Adresse:

[https://juxi-technology.github.io/FT-ServoController-web/](https://juxi-technology.github.io/FT-ServoController-web/)

Auf derselben Website gibt es außerdem eine vollständige Web-Anleitung (umschaltbar zwischen Chinesisch und Englisch):

[https://juxi-technology.github.io/FT-ServoController-web/guide.html](https://juxi-technology.github.io/FT-ServoController-web/guide.html)

Systemvoraussetzungen:

- **Chrome oder Edge 89+** (Firefox und Safari unterstützen Web Serial nicht)
- Die Seite muss über **https oder localhost** geöffnet werden
- USB-zu-TTL-Treiber muss installiert sein (CH340, CH343, CP2102 usw.)


## 2. Serielle Verbindung herstellen

1. Im Bereich „🔌 Serielle Verbindung" die **Baudrate** wählen, Standard ist 1000000 (1M).
1. Auf „**Seriellen Port verbinden**" klicken und im Systemdialog des Browsers den USB-Seriell-Port des Servos auswählen.
1. Nach erfolgreicher Verbindung zeigt der Status oben rechts „🟢 Verbunden" an.


Verfügbare Baudraten: 1000000 / 500000 / 250000 / 128000 / 115200 / 76800 / 57600 / 38400.

## 3. Servo-Scan und Modellerkennung

1. Nach dem Verbinden auf „🔍 **Servos scannen**" klicken. Die Seite scannt die IDs 1–254 und **zeigt gefundene Servos sofort an**, ohne auf den Abschluss des gesamten Scans zu warten.
1. Während des Scans wird die Schaltfläche zum roten „⏹ **Scan stoppen**"; ein weiterer Klick bricht den Scan ab, bereits gefundene Servos bleiben erhalten.
1. Auf das Servo-Chip-Symbol (oder das Dropdown-Menü darüber) klicken, um den Zielservo auszuwählen.


Das Modell wird automatisch anhand der **beiden Bytes an Adresse 3 / 4** (Hauptversionsnummer und Nebenversionsnummer des Servos) bestimmt:

| Modell | Erkennungsbytes (Haupt / Neben) | Positionsbereich | Byte-Reihenfolge |
|---|---|---|---|
| SCS0009 | 5 / 4 | 0–1023 | Big-Endian |
| STS3215 | 9 / 3 | 0–4095 | Little-Endian |
| HD1910 | 10 / 31 | 0–4095 | Little-Endian |

Das Erkennungsergebnis wird auf dem Servo-Chip angezeigt, z. B. **ID1 (SCS0009 · SCS)**; Parametertabelle und Positionsbereich wechseln automatisch mit dem ausgewählten Servo. Modelle, die nicht in der Erkennungstabelle stehen, werden als „Unbekanntes Modell" angezeigt; im Log werden die tatsächlich gelesenen beiden Bytes ausgegeben, damit sie zur Ergänzung an uns gemeldet werden können.

## 4. Parametertabelle

Die Parametertabelle zeigt alle Register des ausgewählten Servos in fünf Spalten – **Adresse, Register, Wert, Speicherbereich, Lesen/Schreiben** –; der Speicherbereich ist in EPROM, SRAM und DEFAULT unterteilt und wird farblich unterschieden.

> **Nur Zeilen, deren Spalte „Lesen/Schreiben" als beschreibbar markiert ist, können ausgewählt und beschrieben werden**; schreibgeschützte Register und der DEFAULT-Bereich reagieren nicht auf Klicks und gelangen nicht in die Schreibzeile, um versehentliches Beschreiben schreibgeschützter Bereiche zu vermeiden.

## 5. Parameter lesen und schreiben

**Parameter lesen**: Nach dem Auswählen des Zielservos über das Servo-Chip-Symbol **liest die Seite automatisch alle Parameter des Servos** und trägt sie in die Parametertabelle ein; gleichzeitig wird der Schieberegler der Positionssteuerung auf die aktuelle tatsächliche Position gesetzt. Jederzeit kann auch manuell über „📖 Parameter lesen" aktualisiert werden.

**Parameter schreiben**:

1. In der Parametertabelle **eine Zeile auswählen** (nur beschreibbare Zeilen sind auswählbar).
1. Unten werden „Schreibadresse 0x" und „Länge" automatisch ausgefüllt.
1. Im Feld „Wert" den neuen Wert eingeben und auf „✏️ **Schreiben**" klicken.
1. Beim Schreiben ins EEPROM führt die Seite automatisch **Entsperren → Schreiben → Sperren** aus; das Ergebnis wird als Overlay mit Erfolg oder Fehlerursache angezeigt.


> Vor dem Ändern von Parametern wie ID, Baudrate oder Winkelgrenzen zunächst über „Aktuellen Servo speichern" ein xdat-Backup anlegen, um bei Fehlern einfach wiederherstellen zu können.

## 6. Positionssteuerung

1. Nach Auswahl des Servos im Bereich „🎯 Positionssteuerung" den Schieberegler **Zielposition** ziehen oder den Wert direkt im Zahlenfeld eingeben. Der Bereich hängt vom Modell ab: **SCS0009: 0–1023**, **STS3215 / HD1910: 0–4095**; Schieberegler und Zahlenfeld sind bidirektional gekoppelt.
1. Die **Geschwindigkeit** einstellen (Rohwert des Registers; die Bedeutung der Einheit unterscheidet sich je nach Serie).
1. Auf „▶ **Bewegen**" klicken; die Seite pollt das MOVING-Flag und weist nach Abschluss der Bewegung auf das Abschalten des Drehmoments hin.


**Echtzeit-Follow**: Nach Aktivieren von „Echtzeit-Follow" folgt der Servo dem Schieberegler in Echtzeit. Beim Aktivieren wird zunächst eine zweite Bestätigung angefordert und das Drehmoment des Servos automatisch eingeschaltet; das Senden wird gedrosselt, damit der Bus nicht überlastet wird. Beim Wechsel des Servos, erneutem Scannen oder Trennen der Verbindung wird dies automatisch deaktiviert und ein Hinweis zum Abschalten des Drehmoments angezeigt.

Drehmomentsteuerung:

| Schaltfläche | Funktion |
|---|---|
| ⚡ Drehmoment ein | Drehmoment des aktuellen Servos einschalten |
| ⏹ Drehmoment aus | Drehmoment des aktuellen Servos ausschalten |
| ⏹ Alle Drehmomente aus | Alle Servos am Bus mit einem Klick freigeben |

> **Wenn die Verbindung während einer Bewegung abbricht, nach dem erneuten Verbinden sofort das Drehmoment ausschalten.**

## 7. Status lesen

Auf „📊 Status lesen" klicken; die Statusleiste darunter zeigt aktuelle Position, Geschwindigkeit, Last, Spannung, Temperatur, Strom und Betriebsflags.

## 8. Baudrate ändern

1. Im Bereich „🔧 Baudrate / Werkseinstellungen" die **neue Baudrate** wählen.
1. Auf „🔧 **Baudrate ändern**" klicken.
1. Nach dem Schreiben **öffnet die Seite den seriellen Port mit der neuen Rate erneut und liest zur Verifizierung zurück**; bei Fehlschlag erfolgt ein **automatischer Rollback** auf die alte Baudrate, damit der Servo nicht den Kontakt verliert.


## 9. Werkseinstellungen wiederherstellen

Auf „🔄 **Werkseinstellungen wiederherstellen**" klicken; die Ausführung erfordert eine **zweite Bestätigung**. Der Wiederherstellungsbefehl unterscheidet sich je nach Serie; die Seite wählt ihn automatisch anhand des erkannten Modells:

| Modell | Wiederherstellungsbefehl | Nach der Ausführung |
|---|---|---|
| SCS0009 | 0x0A Werkseinstellungen wiederherstellen | ID zurück auf 1, Baudrate zurück auf 1M |
| STS3215 / HD1910 | 0x06 Parameter wiederherstellen | ID bleibt unverändert, übrige Parameter auf Standardwerte |

> Die Wiederherstellung der Werkseinstellungen ist **nicht rückgängig zu machen**; vor der Ausführung wird empfohlen, ein xdat-Backup zu speichern.

## 10. xdat-Parameter-Backup und -Wiederherstellung

Der Bereich „📁 xdat-Parameter (nur EEPROM speichern)" bietet drei Funktionen:

| Schaltfläche | Funktion |
|---|---|
| 💾 Aktuellen Servo speichern | Alle Parameter des Servos lesen und als .xdat-Datei herunterladen |
| 📂 xdat öffnen | Eine lokale .xdat-Datei laden und den Inhalt anzeigen |
| 📤 Parameter auf Servo zurückschreiben | Die geladenen xdat-Parameter zurück in das EEPROM des aktuellen Servos schreiben |

Der Dateiname enthält **Modell und ID**, z. B. **SCS0009_ID1.xdat**, **HD1910_ID6.xdat**, damit sich gleiche IDs verschiedener Modelle nicht gegenseitig überschreiben.

Das Dateiformat besteht aus „2 Byte Dateikopf + 49 Byte Datenbereich"; die Registeradresse A liegt bei Offset A+2; mehrbyteige Werte werden in der Byte-Reihenfolge des Modells gespeichert (SCS Big-Endian, STS / HD1910 Little-Endian).

> Um ein Durcheinander der Parameter zu vermeiden, prüft die Seite, ob Datei und aktueller Servo zur selben Byte-Reihenfolge-Familie gehören; **bei Abweichung ist das Zurückschreiben gesperrt**. Beim Wiederherstellen werden nur beschreibbare EEPROM-Parameter geschrieben, Modell und schreibgeschützte Bereiche werden übersprungen; der Datenbereich deckt nur die Adressen 0–48 ab. Vor dem Wiederherstellen bitte prüfen, ob die ausgewählte Servo-ID korrekt ist.

## 11. Log

Das „📜 Log" am Seitenende zeichnet jeden Bedienschritt und das zurückgegebene Ergebnis in Echtzeit auf; über „Leeren" kann es geleert werden.

Die Oberfläche unterstützt **Chinesisch/Englisch-Umschaltung** – die Schaltfläche „EN / English" oben rechts schaltet Oberflächen- und Log-Sprache sofort um; auch historische Logeinträge werden synchron aktualisiert, ohne dass eine Neuverbindung nötig ist.

## 12. Sicherheitshinweise

- ⚠️ Zur selben Zeit kann nur ein Programm den seriellen Port belegen. Während der Nutzung dieser Seite bitte die Desktop-Hostsoftware, serielle Terminals und andere Programme schließen.
- ⚠️ Wird während einer Bewegung das Kabel gezogen, führt der Servo die Aktion möglicherweise weiter aus – nach dem erneuten Verbinden **zuerst das Drehmoment ausschalten**.
- ⚠️ Verdrahtung und Ein-/Ausstecken immer im stromlosen Zustand durchführen.
- ⚠️ Vor dem Verlassen der Seite kann über „⏹ Alle Drehmomente aus" mit einem Klick alle Servos freigegeben werden.


## 13. Häufige Fragen

**Q1: Die Seite meldet, dass Web Serial nicht unterstützt wird, oder die Verbindung ist nicht möglich.**
Chrome / Edge 89+ verwenden und über https oder localhost zugreifen. Firefox und Safari implementieren Web Serial nicht.

**Q2: Verbindung fehlgeschlagen, Meldung „Serieller Port kann nicht geöffnet werden".**
Prüfen, ob der Port von anderen Programmen belegt ist (Desktop-Hostsoftware, serielles Terminal, Arduino IDE usw.) und ob der USB-zu-TTL-Treiber installiert ist.

**Q3: Keine Servos werden gefunden.**
Prüfen, ob die Verdrahtung korrekt ist, der Servo mit Strom versorgt wird und die Baudrate zum Servo passt. Wurde die Baudrate des Servos geändert, zuerst andere Stufen ausprobieren; bei ID-Konflikten auf dem Bus antworten zwei Servos gleichzeitig – zunächst nur einen einzelnen Servo anschließen und prüfen.

**Q4: Einige Zeilen in der Parametertabelle reagieren nicht auf Klicks.**
Das ist beabsichtigt: Nur Zeilen, deren Spalte „Lesen/Schreiben" als beschreibbar markiert ist, können zum Schreiben ausgewählt werden; schreibgeschützte Register und der DEFAULT-Bereich sind nicht beschreibbar.

**Q5: Was tun, wenn die Baudratenänderung fehlschlägt?**
Die Seite führt automatisch einen Rollback auf die alte Baudrate durch und meldet die Fehlerursache; nach Prüfung der Verdrahtung erneut versuchen.

**Q6: Was tun, wenn der Servo „Unbekanntes Modell" anzeigt?**
Das bedeutet, dass die beiden Bytes an Adresse 3 / 4 des Servos nicht in der Erkennungstabelle stehen. Derzeit werden nur SCS0009, STS3215 und HD1910 unterstützt; die Werte „Hauptversion / Nebenversion" im Log können an uns gemeldet werden, damit wir sie ergänzen.

**Q7: Das Verhalten hat sich nach einem Seitenupdate nicht geändert.**
Der Browser cached Skripte; bitte mit Hard-Refresh neu laden (Windows: Ctrl+Shift+R; macOS: Cmd+Shift+R).
