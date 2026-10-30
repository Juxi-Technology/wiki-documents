---
title: "So-ARM-Serie STS3215 Servo-Kalibrierung – Web-Version"
description: "Web-Version der STS3215-Servo-Kalibrierung für SO-ARM101: Verbindung von Führungs- und Folgearm über Web Serial im Browser, Mitten- und Stellwegkalibrierung, Teleoperation, FT-Debugger und Export von Kalibrierdateien."
---

# So-ARM-Serie STS3215 Servo-Kalibrierung – Web-Version

> **Desktop-Tool:** [Anleitung zum SoARM-Servo-Kalibrierungstool](./SO-ARM101-Servo-Calibration-Tool.md)

**Web-Version** des Servo-Kalibrierungstools für den SO-ARM101: Die gesamte Oberfläche läuft im Browser und verbindet sich über Web Serial direkt mit dem seriellen Port – **keine Python-Installation nötig**.

Online-Adresse:

[https://juxi-technology.github.io/SO-ARM101-ServoController/](https://juxi-technology.github.io/SO-ARM101-ServoController/)

> ⚠️ Dieses Tool unterstützt nur **Feetech-Servos (STS3215-Serie)**.

## 1. Vorbereitung

- **Browser**: Chrome oder Edge 89+ (Firefox / Safari unterstützen Web Serial nicht)
- Öffnen über **HTTPS oder localhost**; GitHub Pages erfüllt dies bereits
- **USB-zu-Seriell-Adapter** + Feetech STS3215 Servo, Standard **1 M Baudrate** (`1000000`)


## 2. Roboterarm verbinden

1. In der oberen Leiste links die **Verbindungs-Baudrate** wählen, Standard `1000000`. **Wurde die Baudrate des Servos geändert, bitte zuerst den richtigen Wert wählen und dann verbinden**.
1. Bei „Führungsarm" oder „Folgearm" auf „**Seriellen Port verbinden**" klicken und im Browser-Dialog den entsprechenden COM-Port auswählen.
1. Nach erfolgreicher Verbindung werden die Servos automatisch gescannt (ID 1–6).


> Beide Arme können getrennt verbunden und unabhängig bedient werden. Werden keine Servos gefunden, zuerst prüfen, ob die Verbindungs-Baudrate mit dem Servo übereinstimmt, und dann, ob der serielle Port von anderen Programmen belegt ist.

## 3. Demo-Modus (ohne Hardware)

Die Option „**Demo-Modus (ohne Hardware)**" in der oberen Leiste aktivieren und dann verbinden; es wird ein simulierter Datensatz mit 6 Servos verwendet, sodass die gesamte Oberfläche erkundet werden kann.

> Die Daten im Demo-Modus sind simuliert und **es wird keine echte Hardware angesteuert**.

## 4. Drei Funktionsseiten

### 🦾 Servo-Kalibrierung

Zeigt in Echtzeit Position, Spannung, Temperatur und Drehmomentstatus jedes Servos; bietet die Aktionen „Mittenkalibrierung", „Mittentest", „Motoren deaktivieren" und „Grenzwerte löschen" für einzelne Servos sowie den Einstieg in die Gesamtarm-Kalibrierung.

### 🎚️ Einzelservo-Steuerung

Pro Servo eine Zeile: **ID / Pos / Schieberegler / L (Ziel)**.

- **Pos und Schieberegler sind bidirektional gekoppelt**: Beim Ziehen des Schiebereglers folgt Pos, beim Loslassen wird der Befehl gesendet; wird in Pos ein Wert eingegeben, wird er sofort gesendet.


### 🔬 FT-Debugger

Serielle Verbindung, Servo-Scan, Lesen aller Register, Lesen/Schreiben einzelner Register, Positionssteuerung, Baudrate ändern, Werkseinstellungen wiederherstellen, xdat-Parameter-Backup und -Wiederherstellung.

## 5. Vollständiger Kalibrierablauf (empfohlen)

1. Auf der Seite „Servo-Kalibrierung" auf „**Mittenkalibrierung Führungsarm**" klicken, um den Assistenten zu öffnen.
1. Auf „**Mittenwert-Aufzeichnung starten**" klicken (Schaltfläche wird orange) → den Roboterarm in die Standard-Mittelstellung bringen → auf „**Mittenwert-Aufzeichnung abschließen**" klicken.
1. Auf „**Bewegungsbereich aufzeichnen**" klicken (Schaltfläche wird grün) → jedes Gelenk von Anfang bis Ende durchfahren (**auch den Greifer durchfahren**) → erneut klicken, um zu stoppen.
1. Nach Abschluss aller 6 Gelenke wird die **Kalibrierdatei automatisch gespeichert**; den Vorgang für den Folgearm wiederholen.
1. Sind beide Arme kalibriert, auf „**🎮 Teleoperation**" in der oberen Leiste klicken, um den Folgearm mit dem Führungsarm zu führen.


## 6. Wohin die Kalibrierdateien gehören

Der Browser kann Dateien nur in das Verzeichnis „Downloads" herunterladen. Nach dem Speichern zeigt der Assistent den Zielpfad an; **bitte manuell dorthin verschieben**:

| Arm | Zielpfad |
|---|---|
| Führungsarm | `~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_leader_arm.json` |
| Folgearm | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_follower_arm.json` |

Unter Windows ist `~` gleich `%USERPROFILE%`; der vollständige Pfad sieht wie `%USERPROFILE%.cache\huggingface\lerobot\calibration...` aus.

## 7. Teleoperation

Sind beide Arme kalibriert und verbunden, auf „**🎮 Teleoperation**" in der oberen Leiste klicken, um den Folgearm mit den Winkeln des Führungsarms zu steuern. Ein weiterer Klick auf „⏹ Teleoperation stoppen" beendet den Vorgang.

> Vor der Teleoperation sicherstellen, dass der Bereich um beide Arme sicher ist – **bei eingeschaltetem Drehmoment lässt sich der Servo nicht von Hand bewegen**. Die Teleoperation benötigt zwei verbundene serielle Ports.

## 8. FT-Debugger im Detail

### Register lesen und schreiben

- Auf „**Alle Parameter lesen**" klicken, um alle Register des ausgewählten Servos zu lesen; die Ergebnisse werden in die Parametertabelle eingetragen.
- **Ein Klick auf eine Zeile der Parametertabelle trägt Adresse und Länge oben ein; dann den „Wert" eingeben und auf „Schreiben" klicken**.
- Graue Zeilen (DEFAULT-Bereich) **sind nicht les- und schreibbar**, um versehentliches Beschreiben schreibgeschützter Bereiche zu vermeiden.


### Positionssteuerung

Nach Auswahl des Servos die Zielposition über den Schieberegler oder einen Zahlenwert einstellen und auf „Bewegen" klicken. Ist das Drehmoment nicht eingeschaltet, wird zuerst gefragt, ob es eingeschaltet werden soll.

### Baudrate ändern

Nach Auswahl der neuen Baudrate auf „Anwenden" klicken; nach dem Schreiben wird die Verbindung getrennt und mit der neuen Baudrate erneut verbunden; bei Fehlschlag wird die Ursache im Log angegeben.

### Werkseinstellungen wiederherstellen

Setzt die ID auf 1 und die Baudrate auf 1M zurück, **und dies ist nicht rückgängig zu machen**; vor der Ausführung ist eine zweite Bestätigung erforderlich.

### xdat-Parameter-Backup und -Wiederherstellung

| Schaltfläche | Funktion |
|---|---|
| 💾 Aktuellen Servo als xdat speichern | Alle Parameter lesen und als `.xdat`-Datei herunterladen |
| 📂 xdat öffnen | Eine lokale `.xdat`-Datei laden |
| 📤 Parameter auf Servo zurückschreiben | Die xdat-Parameter zurück in das EEPROM des aktuellen Servos schreiben |

> Die Wiederherstellung überschreibt Einstellungen wie ID, Baudrate und Grenzwerte; vor der Ausführung bitte prüfen, ob der ausgewählte Servo korrekt ist. Das EEPROM hat eine begrenzte Anzahl an Schreibzyklen – nicht zu häufig schreiben.

## 9. Hinweise

1. **Die Seite muss im Vordergrund bleiben**: Der Browser drosselt Hintergrund-Tabs; Teleoperation und Echtzeit-Aktualisierung werden langsamer oder bleiben stehen.
1. **Der Stellweg desselben Gelenks muss bei beiden Armen gleichmäßig durchfahren werden**, sonst stimmen die Bewegungsamplituden bei der Teleoperation nicht überein.
1. **Der Greifer ist kein kontinuierlich drehendes Gelenk und muss ebenfalls durchfahren werden**, sonst fällt der Bereich auf die Standardwerte 0–4095 zurück.
1. Im FT-Debugger **sind graue Zeilen (DEFAULT-Bereich) nicht les- und schreibbar**; das EEPROM hat eine begrenzte Anzahl an Schreibzyklen – nicht zu häufig schreiben.
1. **Vor der Teleoperation sicherstellen, dass der Bereich um beide Arme sicher ist**; bei eingeschaltetem Drehmoment lässt sich der Servo nicht von Hand bewegen.
1. Zur selben Zeit kann nur ein Programm den seriellen Port belegen – während der Nutzung dieser Seite bitte die Desktop-Version oder andere Hostprogramme schließen.


## 10. Häufige Fragen

**Q1: Keine Verbindung / keine Servos gefunden.**
Zuerst prüfen, ob die Verbindungs-Baudrate mit dem Servo übereinstimmt, und dann, ob der serielle Port von anderen Programmen belegt ist.

**Q2: Pos aktualisiert sich nicht.**
Prüfen, ob der Servo online ist; erneut auf „Seriellen Port verbinden" klicken oder die Seite neu laden.

**Q3: Schreiben fehlgeschlagen.**
Die konkrete Ursache im Log prüfen; sicherstellen, dass Adresse und Länge aus einer Zeile der Parametertabelle stammen.

**Q4: Meldung, dass der aktuelle Browser Web Serial nicht unterstützt.**
Chrome / Edge 89+ verwenden und über HTTPS oder localhost öffnen.

**Q5: LeRobot findet die gespeicherte Kalibrierdatei nicht.**
Der Browser lädt nur in das Verzeichnis „Downloads" herunter; die Datei muss manuell an den in Abschnitt 6 genannten Pfad verschoben werden.
