---
title: Fehlerbehebung
---

# Fehlerbehebung

> **[Im Shop kaufen](https://www.juxitech.com/de/products/2-dof-servo-pan-tilt-unit)**

Dieses Kapitel fasst häufige Probleme und ihre Lösungen zusammen und hilft Ihnen, bei der Nutzung auftretende Probleme schnell zu erkennen und zu beheben.

---

## Hardware-Probleme

### Servo reagiert nicht

**Mögliche Ursachen:**
1. Die Servo-Stromversorgung ist nicht angeschlossen
2. Die Verbindung zwischen Servo und Treiberplatine ist fehlerhaft
3. Die serielle Verbindung ist fehlgeschlagen
4. Der Servo ist nicht aktiviert
**Lösung:**
1. Prüfen, ob die Servo-Stromversorgung korrekt angeschlossen und eingeschaltet ist
2. Prüfen, ob die Verbindungskabel zwischen Servo und Treiberplatine fest sitzen
3. `examples/diagnostic.py` ausführen, um Diagnoseinformationen anzuzeigen
4. Sicherstellen, dass das Gimbal mit `C` verbunden und der Servo aktiviert ist

### Servo bewegt sich in die entgegengesetzte Richtung

**Mögliche Ursachen:**
- Die Einbaurichtung des Servos oder die Steuerparameter im Programm müssen angepasst werden
**Lösung:**
Ändern Sie die Methode `calculate_move` in `src/trackers/tracking_controller.py` und kehren Sie das Vorzeichen des entsprechenden Parameters um:

# Falls Links/Rechts vertauscht ist

```python
delta_pan = -int(self.kp_pan * err_x)
```

# Falls Oben/Unten vertauscht ist

```python
delta_tilt = -int(self.kp_tilt * err_y)
```

### Servo zittert

**Mögliche Ursachen:**
- Tracking-Parameter zu empfindlich
- Totzone zu klein
- Servo überlastet oder unzureichende Stromversorgung
**Lösung:**
1. Parameter `dead_zone` erhöhen
2. `min_move_interval` erhöhen
3. `kp_pan` und `kp_tilt` verringern
4. Prüfen, ob die Versorgungsspannung korrekt ist

### Serielle Verbindung fehlgeschlagen

**Mögliche Ursachen:**
- Treiber nicht installiert
- Falsche Portnummer
- Die serielle Schnittstelle wird von einem anderen Programm belegt
- Defektes Verbindungskabel
**Lösung:**
1. Unter Windows den Geräte-Manager prüfen und sicherstellen, dass der Treiber korrekt installiert ist
2. `examples/list_ports.py` ausführen, um die richtige serielle Schnittstelle zu finden
3. Andere Programme schließen, die die serielle Schnittstelle möglicherweise belegen
4. Anderen USB-Anschluss oder ein anderes Datenkabel ausprobieren

---

## Software-Probleme

### Kamera lässt sich nicht öffnen

**Mögliche Ursachen:**
- Falscher Kamera-Index
- Die Kamera wird von einem anderen Programm belegt
- Problem mit der Hardware-Verbindung der Kamera
- Problem mit dem Kameratreiber
**Lösung:**
1. `examples/list_cameras.py` ausführen, um die verfügbaren Kamera-Indizes anzuzeigen
2. Andere Programme schließen, die die Kamera möglicherweise verwenden
3. Prüfen, ob die Kamera korrekt angeschlossen ist
4. Anderen USB-Anschluss ausprobieren

### OpenCV-Fehler

**Mögliche Ursachen:**
- Problem mit der OpenCV-Version
- Unvollständige Installation der Abhängigkeitsbibliotheken
- Hardware-Fehler der Kamera
**Lösung:**
1. Abhängigkeitsbibliotheken neu installieren:

```python
pip install --upgrade opencv-python numpy
```

1. Prüfen, ob die Python-Version den Anforderungen entspricht (>=3.8)
2. Fehler-Stacktrace ansehen, um die problematische Code-Stelle zu lokalisieren

### Installation der Abhängigkeiten fehlgeschlagen

**Mögliche Ursachen:**
- Veraltete pip-Version
- Netzwerkverbindungsproblem
- Berechtigungsproblem
**Lösung:**
1. Zuerst pip aktualisieren:

```python
pip install --upgrade pip
```

1. Zur Beschleunigung einen chinesischen Mirror verwenden:

```python
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

1. Prüfen, ob die Netzwerkverbindung in Ordnung ist

### Programm startet langsam

**Mögliche Ursachen:**
- DSHOW wird unter Windows nicht verwendet
- Die Hardware-Initialisierung der Kamera benötigt Zeit
**Lösung:**
1. Sicherstellen, dass der Code `cv2.CAP_DSHOW` als Kamera-Backend verwendet
2. Prüfen, ob ein anderes Programm die Kamera belegt
3. Einige Sekunden warten; die Kamera-Initialisierung dauert in der Regel etwas Zeit

---

## Tracking-Probleme

### Ungenaue Zielerkennung

**Beim Farb-Tracking:**
- Prüfen, ob sich die Zielfarbe deutlich vom Hintergrund abhebt
- Farbparameter anpassen (in `src/detectors/color_detector.py`)
- Für ausreichendes und gleichmäßiges Licht sorgen
**Beim Gesichts-Tracking:**
- Auf ausreichendes Licht achten, Gegenlicht vermeiden
- Das Gesicht muss zur Kamera ausgerichtet sein
- Angemessenen Abstand einhalten

### Gimbal bewegt sich während des Trackings nicht

**Mögliche Ursachen:**
1. Das Gimbal ist nicht verbunden
2. Das Ziel ist nicht verriegelt
3. Das Ziel befindet sich innerhalb der Totzone
4. Programmfehler
**Lösung:**
1. Prüfen, ob das Gimbal mit `C` verbunden wurde
2. Prüfen, ob das Ziel mit `T` verriegelt wurde
3. Konsolenausgabe prüfen und nach Fehlermeldungen suchen
4. Prüfen, ob sich das Ziel innerhalb der `dead_zone` (Totzone) befindet

### Tracking-Richtung vertauscht

**Lösung:**
Siehe Lösung unter „Servo bewegt sich in die entgegengesetzte Richtung“.

### Tracking zittert

**Lösung:**
Siehe Lösung unter „Servo zittert“.

### Zielverriegelung fehlgeschlagen

**Mögliche Ursachen:**
1. Das Ziel war beim Verriegeln nicht in der Bildmitte
2. Das Ziel ist zu klein oder die Farbe ist zu unauffällig
3. Das Ziel wurde nicht erkannt
**Lösung:**
1. Sicherstellen, dass sich das Ziel beim Verriegeln in der Bildmitte befindet
2. Das Ziel muss eine geeignete Größe haben, um korrekt erkannt zu werden
3. Konsolenausgabe prüfen, um festzustellen, ob das Ziel erkannt wird
4. Die Zielposition neu ausrichten und dann erneut verriegeln

---

## Verwendung des Diagnosewerkzeugs

### Diagnoseprogramm verwenden

Das System bietet ein umfassendes Diagnosewerkzeug zum Testen der gesamten Hardware:

```python
python examples/diagnostic.py --camera 0 --port COM3
```

Das Diagnoseprogramm testet nacheinander:
1. Ob die Kamera ordnungsgemäß funktioniert
2. Ob die serielle Verbindung ordnungsgemäß hergestellt werden kann
3. Ob die Servos ordnungsgemäß reagieren
Nach Abschluss der Diagnose werden die Testergebnisse angezeigt, um das Problem zu lokalisieren.

### Debug-Ausgaben anzeigen

Während das Programm läuft, gibt die Konsole relevante Debug-Informationen aus, darunter:
- Informationen über erkannte Ziele
- Zielkoordinaten
- Fehlerwerte
- Gimbal-Bewegungsbefehle
- Alle Fehlermeldungen
Eine aufmerksame Beobachtung dieser Ausgaben hilft, Probleme schnell zu lokalisieren.

---

## Wiederherstellungsmaßnahmen

### Gimbal in eine sichere Position bringen

- `R` drücken, um das Gimbal in die Mittelstellung zu bringen
- Oder `gimbal.return_to_center()` aufrufen

### Alle Einstellungen zurücksetzen

- `S` drücken, um das Tracking zu stoppen
- `R` drücken, um in die Mittelstellung zurückzukehren
- Das Ziel erneut verriegeln

### Erneute Kalibrierung

Falls die Tracking-Ergebnisse deutlich unzureichend sind, können Sie:
1. Die Tracking-Parameter anpassen
2. Das Ziel erneut verriegeln
3. Bei Bedarf das Programm neu starten
4. Die Hardware-Verbindungen prüfen

---

## Hilfe erhalten

Falls die oben genannten Methoden das Problem nicht lösen, notieren Sie bitte die folgenden Informationen:
- Betriebssysteminformationen
- Python-Version
- Detaillierte Fehlermeldungen
- Schritte zur Reproduktion des Problems
- Ergebnisse der Ausführung von diagnostic
