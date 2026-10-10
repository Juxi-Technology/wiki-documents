---
title: Erweiterte Funktionen und Tracking
---

# Erweiterte Funktionen und Tracking

> **[Im Shop kaufen](https://www.juxitech.com/de/products/2-dof-servo-pan-tilt-unit)**

Dieses Kapitel beschreibt ausführlich die automatischen Tracking-Funktionen des Systems, einschließlich Farb-, Gesichts- und QR-Code-Tracking sowie Zielverriegelung und Parameterabstimmung.

---

## Übersicht der automatischen Tracking-Modi

Das System unterstützt drei automatische Tracking-Modi:
1. Farb-Tracking: Verfolgen von Objekten einer bestimmten Farbe
2. Gesichts-Tracking: Verfolgen von Gesichtern
3. QR-Code-Tracking: Verfolgen von QR-Codes

---

## Farb-Tracking

### Farbauswahl

Das System unterstützt das Tracking mehrerer Farben:
- Rot
- Grün
- Blau
Im Programm können Sie die Farbe per Tastendruck wechseln:
- `X`: Rot auswählen
- `Y`: Grün auswählen
- `Z`: Blau auswählen

### Ablauf des Farb-Trackings

1. `C` drücken, um das Gimbal zu verbinden
2. `2` drücken, um in den Farb-Tracking-Modus zu wechseln
3. Das Objekt in der Zielfarbe in die Bildmitte bringen
4. `T` drücken, um das Ziel zu verriegeln
5. Das Ziel bewegen und beobachten, wie das Gimbal folgt

### Einfaches Beispiel zum Farb-Tracking

Sie können auch das einfache Beispielprogramm zum Farb-Tracking verwenden:

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

Dieses Programm bietet die einfachste Farb-Tracking-Funktion und eignet sich zum Lernen.

---

## Gesichts-Tracking

### Funktionsprinzip des Gesichts-Trackings

Das System verwendet den Haar-Kaskadenklassifikator von OpenCV zur Gesichtserkennung. Nach der Erkennung eines Gesichts berechnet das System automatisch die Zielposition und steuert das Gimbal entsprechend.

### Ablauf des Gesichts-Trackings

1. `C` drücken, um das Gimbal zu verbinden
2. `1` drücken, um in den Gesichts-Tracking-Modus zu wechseln
3. Das Gesicht in die Bildmitte bringen
4. `T` drücken, um das Ziel zu verriegeln
5. Das Gesicht bewegen; das Gimbal folgt automatisch

### Empfehlungen für eine höhere Erfolgsquote bei der Gesichtserkennung

- Für ausreichende Beleuchtung sorgen, Gegenlicht vermeiden
- Das Gesicht frontal zur Kamera ausrichten
- Angemessenen Abstand einhalten (empfohlen 1-3 Meter)
- Szenen mit mehreren Gesichtern vermeiden oder das Tracking-Ziel mit der Zielverriegelung fixieren

---

## QR-Code-Tracking

Der QR-Code-Tracking-Modus nutzt den QRCodeDetector von OpenCV zur Erkennung und Lokalisierung von QR-Codes. Die Verwendung ist ähnlich wie bei den beiden vorherigen Tracking-Modi:
1. Gimbal verbinden und in den QR-Code-Tracking-Modus wechseln
2. QR-Code in die Bildmitte bringen und `T` drücken, um zu verriegeln
3. QR-Code bewegen und beobachten, wie das Gimbal folgt

---

## Zielverriegelung

### Zweck der Verriegelung

Die Zielverriegelung ist eine Schlüsselfunktion des Systems. Sie dient dazu:
- Die Mittelposition und die Größe des Ziels zum Zeitpunkt der Verriegelung zu speichern
- Bei mehreren Zielen das Ziel zu bevorzugen, das dem Verriegelungspunkt am nächsten liegt
- Häufiges Springen zwischen Zielen zu verhindern und die Stabilität des Trackings zu gewährleisten

### Ablauf der Verriegelung

1. Das Zielobjekt in die Bildmitte bringen
2. `T` drücken, um zu verriegeln
3. Nach erfolgreicher Verriegelung bevorzugt das System Ziele, die dem zum Zeitpunkt der Verriegelung gespeicherten Ziel am ähnlichsten sind
4. `S` drücken, um die Verriegelung aufzuheben und das Tracking zu stoppen

### Auswahllogik bei der Verriegelung

Bei der Zielauswahl nach der Verriegelung berücksichtigt das System zwei Faktoren:
- Abstand: Entfernung des Zielmittelpunkts vom Verriegelungspunkt (Gewichtung 70 %)
- Größe: Ähnlichkeit der Zielgröße mit der Größe zum Zeitpunkt der Verriegelung (Gewichtung 30 %)
- Das System verfolgt das Ziel mit der höchsten Gesamtbewertung

---

## Abstimmung der Tracking-Parameter

In `src/trackers/tracking_controller.py` stehen folgende Parameter zur Anpassung zur Verfügung:

|Parameter|Standardwert|Beschreibung|
|---|---|---|
|kp_pan|0.08|Proportionalverstärkung für das Links-/Rechts-Tracking|
|kp_tilt|0.12|Proportionalverstärkung für das Auf-/Ab-Tracking|
|dead_zone|30|Totzone (Pixel); innerhalb dieser Zone bewegt sich das Gimbal nicht|
|min_move_interval|0.15|Minimales Bewegungsintervall (Sekunden); begrenzt die Bewegungsfrequenz des Gimbals|


### Vorgehensweise bei der Parameteranpassung

- **Tracking zu langsam**: `kp_pan` und `kp_tilt` erhöhen
- **Tracking zu empfindlich und dadurch zittrig**: `kp_pan` und `kp_tilt` verringern, `min_move_interval` erhöhen oder `dead_zone` erhöhen
- **Häufige Feinanpassungen führen zu Zittern**: `dead_zone` erhöhen
- **Richtung vertauscht**: Das Vorzeichen von `delta_pan` oder `delta_tilt` in der Methode `calculate_move` ändern

---

## Vollständiges Anwendungsbeispiel für das Tracking

Das folgende Beispiel zeigt einen vollständigen Nutzungsablauf:
1. Programm starten:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

1. `C` drücken, um das Gimbal zu verbinden
2. `2` drücken, um den Farb-Tracking-Modus zu wählen
3. Das rote Objekt in die Bildmitte bringen
4. `T` drücken, um das Ziel zu verriegeln
5. Das Objekt bewegen und beobachten, wie das Gimbal folgt
6. Für Grün: `Y` drücken und anschließend erneut `T` drücken, um das Ziel zu verriegeln
7. `S` drücken, um das Tracking zu stoppen; `R` drücken, um in die Mittelstellung zurückzukehren
8. `Q` drücken, um das Programm zu beenden

---

## Hinweise für die Weiterentwicklung

Für eigene Funktionen oder eine Weiterentwicklung können Sie sich an folgenden Dateien orientieren:
- `src/sc_servo.py`: Servo-Kommunikation (Low-Level)
- `src/gimbal.py`: Gimbal-Steuerung
- `src/trackers/tracking_controller.py`: Tracking-Controller
- `src/detectors/`: Verschiedene Zieldetektoren
