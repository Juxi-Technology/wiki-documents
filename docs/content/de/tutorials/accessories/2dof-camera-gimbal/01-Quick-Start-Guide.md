---
title: Schnellstart
---

# Schnellstart

> **[Im Shop kaufen](https://www.juxitech.com/de/products/2-dof-servo-pan-tilt-unit)**

> Für Nutzer, deren Hardware bereits montiert ist und die die Funktionen schnell ausprobieren möchten

---

## Schritt 0: Verfügbare Geräte finden

Bevor Sie beginnen, müssen Sie die richtige Kamera und die richtige serielle Schnittstelle finden.

### Verfügbare Kameras finden

```python
python examples/list_cameras.py
```

Das Programm listet alle verfügbaren Kameras und ihre Indizes auf; notieren Sie sich den Index, den Sie benötigen (in der Regel 0).

### Verfügbare serielle Schnittstellen finden

```python
python examples/list_ports.py
```

Das Programm listet alle verfügbaren seriellen Schnittstellen auf: unter Windows COM3, COM4 usw., unter Linux /dev/ttyUSB0 usw.

---

## Schritt 1: Abhängigkeiten installieren

```python
pip install -r requirements.txt
```

---

## Schritt 2: Die Schritt-für-Schritt-Tutorials der Reihe nach ausführen (optional, aber empfohlen)

Um das System besser zu verstehen, empfiehlt es sich, diese Programme der Reihe nach auszuführen:
1. **01_camera_only.py** - Nur das Kamerabild anzeigen, ohne Verbindung zum Gimbal

```python
python examples/01_camera_only.py --camera 0
```

Funktion: Überprüfen, ob die Kamera ordnungsgemäß funktioniert
1. **02_gimbal_only.py** - Nur das Gimbal steuern, ohne Kamera

```python
python examples/02_gimbal_only.py --port COM3
```

Funktion: Überprüfen, ob die Servos und die Treiberplatine ordnungsgemäß verbunden sind
1. **03_simple_gimbal_camera.py** - Kamera und Gimbal kombiniert

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

Funktion: Das Gimbal manuell steuern und dabei das Kamerabild ansehen
1. **04_color_track_simple.py** - Einfaches Farb-Tracking (ohne Verriegelung)

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

Funktion: Die einfachste Demo des automatischen Trackings

---

## Schritt 3: Das vollständige Programm ausführen

Wenn Sie mit den Grundfunktionen vertraut sind, führen Sie das vollständige Programm für das automatische Tracking aus:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

---

## Tastenkürzel des vollständigen Programms


|Taste|Funktion|
|---|---|
|1|In den Gesichts-Tracking-Modus wechseln|
|2|In den Farb-Tracking-Modus wechseln|
|C|Gimbal verbinden|
|R|Gimbal in die Mittelstellung bringen|
|T|Ziel verriegeln/Tracking starten|
|S|Tracking stoppen|
|X|Farbmodus: Rot|
|Y|Farbmodus: Grün|
|Z|Farbmodus: Blau|
|Q|Programm beenden|


---

## Schnelldurchlauf

### Farb-Tracking ausprobieren

1. `C` drücken, um das Gimbal zu verbinden
2. `2` drücken, um in den Farb-Tracking-Modus zu wechseln
3. Ein rotes Objekt (oder eine andere Farbe) in die Bildmitte bewegen
4. `T` drücken, um das Ziel zu verriegeln
5. Das Objekt bewegen und beobachten, wie das Gimbal folgt

### Gesichts-Tracking ausprobieren

1. `C` drücken, um das Gimbal zu verbinden
2. `1` drücken, um in den Gesichts-Tracking-Modus zu wechseln
3. Das Gesicht in die Bildmitte bringen
4. `T` drücken, um das Ziel zu verriegeln
5. Das Gesicht bewegen und beobachten, wie das Gimbal folgt

---

## Schnelle Antworten auf häufige Fragen

F: Das Programm meldet, dass der serielle Port nicht gefunden wird?
A: Führen Sie `list_ports.py` aus, um die verfügbaren seriellen Ports anzuzeigen, und geben Sie den Port anschließend mit dem Parameter `--port` an.
F: Die Kamera lässt sich nicht öffnen?
A: Führen Sie `list_cameras.py` aus, um die verfügbaren Kameras anzuzeigen, und geben Sie den Index mit dem Parameter `--camera` an.
F: Das Gimbal bewegt sich nicht?
A: Vergewissern Sie sich, dass Sie das Gimbal mit `C` verbunden haben und dass die Servo-Stromversorgung eingeschaltet ist.
F: Die Tracking-Richtung ist vertauscht?
A: Siehe Kapitel Fehlerbehebung.
