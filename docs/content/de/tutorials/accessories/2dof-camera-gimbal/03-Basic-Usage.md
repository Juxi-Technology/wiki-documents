---
title: Grundlegende Nutzung
---

# Grundlegende Nutzung

> **[Im Shop kaufen](https://www.juxitech.com/de/products/2-dof-servo-pan-tilt-unit)**

Dieses Kapitel beschreibt ausführlich die grundlegenden Steuerungsmethoden und den Nutzungsablauf des Gimbals und erleichtert Nutzern den Einstieg in die grundlegende Bedienung.

---

## Übersicht der Steuerungsmethoden

Das Gimbal-System unterstützt zwei Hauptsteuerungsmethoden:
1. Tastatursteuerung: Manuelle Steuerung der Gimbal-Bewegung über Tasten
2. Automatisches Tracking: Das System erkennt Ziele automatisch und verfolgt sie

---

## Tastatursteuerung

### Erläuterung der Tastenkürzel

Die folgenden Tastenkürzel stehen im Hauptprogramm zur Verfügung:

|Taste|Funktion|
|---|---|
|Pfeiltaste ←|Gimbal nach links drehen|
|Pfeiltaste →|Gimbal nach rechts drehen|
|Pfeiltaste ↑|Gimbal nach oben neigen|
|Pfeiltaste ↓|Gimbal nach unten neigen|
|C|Gimbal verbinden oder trennen|
|R|Gimbal in die Mittelstellung bringen (zurück in die Ausgangsposition)|
|1|In den Gesichts-Tracking-Modus wechseln|
|2|In den Farb-Tracking-Modus wechseln|
|T|Ziel verriegeln/Tracking starten|
|S|Tracking stoppen|
|X|Farbmodus: Rote Objekte verfolgen|
|Y|Farbmodus: Grüne Objekte verfolgen|
|Z|Farbmodus: Blaue Objekte verfolgen|
|Q|Programm beenden|


### Eigenständiges Beispiel zur Tastatursteuerung

Zum Üben können Sie auch das separate Tastatursteuerungsprogramm verwenden:

```python
python examples/keyboard_control.py --port COM3
```

Dieses Programm bietet nur die grundlegenden Gimbal-Steuerungsfunktionen und eignet sich für Einsteiger.

---

## Grundlegender Bedienablauf

### Start und Verbindung

1. Starten Sie das Hauptprogramm mit folgendem Befehl:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3
```

1. Drücken Sie nach dem Programmstart `C`, um das Gimbal zu verbinden
2. Beobachten Sie, ob die Servos ordnungsgemäß reagieren; bei Problemen siehe Kapitel Fehlerbehebung

### Übung zur manuellen Steuerung

1. Drücken Sie die Pfeiltasten und beobachten Sie, ob die Gimbal-Bewegung wie erwartet ausfällt
2. Üben Sie, das Gimbal mit den Pfeiltasten an verschiedene Positionen zu bewegen
3. Drücken Sie `R`, um das Gimbal in die Mittelstellung zu bringen
4. Machen Sie sich mit den minimalen und maximalen Positionsgrenzen des Gimbals vertraut
Folgende Übungen werden empfohlen:
- Übung 1: Bewegen Sie das Gimbal in die vier Extrempositionen ganz links, ganz rechts, ganz oben und ganz unten, um den Positionsbereich kennenzulernen
- Übung 2: Kehren Sie aus einer beliebigen Position in die Mittelstellung zurück und prüfen Sie, ob dies reibungslos verläuft
- Übung 3: Probieren Sie Feineinstellungen aus und machen Sie sich mit der Bewegungsgenauigkeit der Servos vertraut

---

## Grundlegende Beispielprogramme

Das Projekt bietet mehrere aufeinander aufbauende Beispielprogramme zum Lernen:

### Nur Kamera anzeigen

```python
python examples/01_camera_only.py --camera 0
```

Dieses Programm öffnet nur die Kamera und zeigt das Live-Bild an, ohne Gimbal-Steuerung. Es eignet sich, um zu prüfen, ob die Kamera ordnungsgemäß funktioniert.

### Nur Gimbal steuern

```python
python examples/02_gimbal_only.py --port COM3
```

Dieses Programm bietet nur die Gimbal-Steuerung, ohne Kamera. Es eignet sich, um zu prüfen, ob die Verbindung zwischen Servos und Treiberplatine ordnungsgemäß funktioniert.

### Kamera und Gimbal kombiniert

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

Dieses Programm kombiniert Kamerabild und Gimbal-Steuerung, sodass Sie das Zusammenspiel von Bild und Gimbal beobachten können.

---

## Nutzungshinweise

Beachten Sie während der Nutzung die folgenden Punkte:
1. Vergewissern Sie sich nach dem Verbinden des Gimbals, dass die Servos an die Stromversorgung angeschlossen sind.
2. Halten Sie das Gimbal bei der manuellen Steuerung nicht über längere Zeit in den Endpositionen.
3. Vermeiden Sie bei der Bedienung heftige Stöße gegen die Gimbal-Halterung.
4. Trennen Sie bei ungewöhnlichem Zittern oder ungewöhnlichen Geräuschen der Servos sofort die Stromversorgung und führen Sie eine Prüfung durch.
5. Bei längerer Nichtbenutzung empfiehlt es sich, die Stromversorgung zu trennen.
