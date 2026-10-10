---
title: Produktinformationen
---

# Produktinformationen

> **[Im Shop kaufen](https://www.juxitech.com/de/products/2-dof-servo-pan-tilt-unit)**

2-DOF-Kamera-Gimbal-Steuerungsprojekt mit automatischem Farb-, Gesichts- und QR-Code-Tracking.

---

## 📋 Funktionen

- 🎮 Manuelle Gimbal-Steuerung per Tastatur
- 🎯 Automatisches Tracking farbiger Objekte
- 👤 Automatisches Gesichts-Tracking
- 📱 Automatisches QR-Code-Tracking
- 🔒 Zielverriegelungsmechanismus
- 🚀 Schnellstart (mit DSHOW-Backend)

---

## 🛠 Hardware-Konfiguration

- **Servo-Modell**: SCS009
- **Servo-Zuordnung**:
  - Servo Nr. 1: Steuerung der Links-/Rechts-Drehung
  - Servo Nr. 2: Steuerung der Auf-/Ab-Neigung
- **Kommunikationsart**: Serielle Bus-Treiberplatine
- **Chip der Treiberplatine**: CH343
- **Baudrate**: Standard 1Mbps

### Servo-Parameter


|Parameter|Servo Nr. 1 (Links/Rechts)|Servo Nr. 2 (Auf/Ab)|
|---|---|---|
|Bereich|220-802|220-511|
|Mittelstellung|511|511|
|Beschreibung|220=links, 802=rechts|220=oben, 511=Mittelstellung|


---

## 📁 Projektstruktur

```python
2-DOF-Camera-Gimbal/
├── docs/            # Dokumentation und Tutorials
│   └── tutorials/  # Tutorial-Dateien
├── examples/        # Beispielprogramme
│   ├── auto_tracking_demo.py  # Vollständige Tracking-Demo
│   ├── basic_usage.py        # Beispiel für die grundlegende Nutzung
│   ├── keyboard_control.py    # Beispiel für die Tastatursteuerung
│   └── diagnostic.py         # Diagnosewerkzeug
├── src/            # Quellcode
│   ├── detectors/  # Zieldetektoren
│   │   ├── color_detector.py
│   │   ├── face_detector.py
│   │   └── qr_detector.py
│   ├── trackers/  # Tracking-Controller
│   │   └── tracking_controller.py
│   └── sc_servo.py  # Servo-Kommunikationsbibliothek
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 🚀 Schnellstart

### Abhängigkeiten installieren

```python
pip install -r requirements.txt
```

### Verfügbare Geräte finden

**Verfügbare Kameras finden**

```python
python examples/list_cameras.py
```

**Verfügbare serielle Schnittstellen finden**

```python
python examples/list_ports.py
```

### Demo ausführen

Konfiguration über Kommandozeilenparameter:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

**Parameterbeschreibung**
- `--camera` oder `-c`: Kamera-Index (Standard 0)
- `--port` oder `-p`: Serielles Gerät (Standard COM3)
- `--color` oder `-C`: Standardfarbe (Standard red)

---

## 🎮 Bedienung

### Tastenkürzel


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


### Ablauf des automatischen Trackings

1. `C` drücken, um das Gimbal zu verbinden
2. Modus wählen (`1` oder `2` drücken)
3. Das Zielobjekt in die Bildmitte bewegen
4. `T` drücken, um das Ziel zu verriegeln
5. Das Ziel bewegen; das Gimbal folgt automatisch

---

## 📚 Dokumentation und Tutorials

Detaillierte Tutorials finden Sie im Verzeichnis docs/tutorials/:
- 01-快速开始指南.md - Schneller Einstieg in die Nutzung
- 02-硬件与环境准备.md - Hardware-Liste und Umgebungsvorbereitung
- 03-基础使用.md - Tastatursteuerung und grundlegende Nutzung
- 04-高级功能与追踪.md - Erweiterte Funktionen und Tracking im Detail
- 05-故障排除.md - Häufige Probleme und Lösungen

---

## 🔧 Technische Hinweise

### Tracking-Parameter

In `src/trackers/tracking_controller.py` anpassbar:

|Parameter|Standardwert|Beschreibung|
|---|---|---|
|kp_pan|0.08|Proportionalverstärkung für das Links-/Rechts-Tracking|
|kp_tilt|0.12|Proportionalverstärkung für das Auf-/Ab-Tracking|
|dead_zone|30|Totzone (Pixel); innerhalb dieser Zone erfolgt keine Bewegung|
|min_move_interval|0.15|Minimales Bewegungsintervall (Sekunden)|


### Zielverriegelung

Nach dem Verriegeln wählt das System das Ziel nach folgenden Kriterien aus:
- Geringster Abstand zum Verriegelungspunkt (Gewichtung 70 %)
- Größte Ähnlichkeit mit der Größe zum Zeitpunkt der Verriegelung (Gewichtung 30 %)

---

## 📖 Servo-Spezifikationen

- **Modell**: SCS009
- **Betriebsspannung**: 4V-7.4V (typisch 6V)
- **Blockierdrehmoment**: 2.3kg·cm bei 6V
- **Protokoll**: Halbduplex-asynchrone serielle Schnittstelle (TTL)
