---
title: "01-GUI-visuelle Steuerung"
description: "GUI-Steuerprogramm für die AmazingHand am ESP32-S3: Gesten per Button auslösen, Servowinkel mit Schiebereglern steuern und Finger differenziell beugen."
---

# 01-GUI-visuelle Steuerung

Visuelle Gestenbefehle — Anleitung

Dieses Verzeichnis bietet ein **Host-Steuerwerkzeug**: Nach dem Anschluss des ESP32 lassen Sie die Fingerhand durch Anklicken von Buttons/Eingeben von Befehlen am Computer Gesten ausführen.

> Geeignet für: ESP32-S3 + 8-Kanal-PWM-Servos (Differenzialantrieb). Zum Firmware-Flashen siehe die Hinweise in `..\03_firmware_docs`.

## I. Zwei Verwendungsmöglichkeiten

|Methode|Erforderlich|Geeignet für|
|---|---|---|
|**Paketversion** (empfohlen)|Doppelklick auf `AmazingHand控制台.exe`|Keine Python-Installation nötig, sofort einsatzbereit|
|**Ausführung aus dem Quellcode**|64-Bit Python 3.12|Erforderlich für Gesten-Tracking oder Anpassungen|

## II. Methode 1: Doppelklick auf die exe

1. Doppelklick auf `AmazingHand控制台.exe`.

2. **Seriellen Port wählen**: Im Dropdown-Menü oben den COM-Port des ESP32 auswählen (im Geräte-Manager prüfen).

3. Auf **„Verbinden"** klicken: Die Statusanzeige wird grün, das Log zeigt „Verbunden".

4. Auf Gesten-Buttons klicken: **Stein / Schere / Papier / Daumen hoch / OK / Kneifen / Zeigen / Öffnen / Faust**, die Fingerhand führt sie aus.

5. **Linke/rechte Hand**: „Rechte Hand"/„Linke Hand" ankreuzen zum Umschalten (Spiegelrichtung des Daumens unterschiedlich).

6. **Servo-Direktantrieb**: 8 Schieberegler ziehen, um den Winkel eines einzelnen Servos in Echtzeit zu steuern (0-180°).

7. **Differenzialsteuerung der Finger**: Zwei Fortschrittsbalken pro Finger——

    - **Beugen◀▶Strecken**: Finger beugen oder strecken (Bereich -70 ~ +70).

    - **Rechts schwenken◀▶Links schwenken**: Finger nach links/rechts schwenken (Bereich 60 ~ 120, 90=neutral).

8. **Wiederholen / Stopp**: Letzte Geste wiederholen / sofort abbrechen.

## III. Methode 2: Ausführung aus dem Quellcode

### Abhängigkeiten installieren

Erfordert **64-Bit Python 3.12** (mediapipe unterstützt nur 64-Bit).

```Bash
# 1. Basierabhängigkeiten installieren
pip install -r requirements.txt

# 2. Tracking-Abhängigkeiten installieren (bei Bedarf an Handgesten-Tracking wird automatisch eine virtuelle Umgebung erstellt)
setup_tracking.bat
```

### Ausführen

```Bash
# Mit der Tracking-Umgebung starten (enthält mediapipe)
tracking_env\Scripts\python hand_gui.py
```

> Oder direkt `python hand_gui.py` (beliebiges Python mit pyserial).

### In der GUI integriertes Gesten-Tracking

Die GUI enthält ein integriertes **Gesten-Tracking**-Panel (Kamera folgt den Handbewegungen):

1. Nach dem Anschließen des seriellen Ports zum Panel „Gesten-Tracking (MediaPipe-Kamera)" scrollen.

2. Kameranummer wählen (Standard 0), auf **„Tracking starten"** klicken.

3. Die Hand in das Kamerabild halten, die Fingerhand folgt dem Beugen/Strecken.

> Für das Tracking muss mediapipe über `setup_tracking.bat` installiert sein. Die installationsfreie exe enthält keine Tracking-Funktion.

## IV. Kommandozeilentest (serial_test.py)

```Bash
# Verbindungstest (zuerst prüfen, ob sie funktioniert)
python serial_test.py COM3 nop

# Geste
python serial_test.py COM3 rock         # 石头
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 张开
python serial_test.py COM3 close        # 握拳

# Direktantrieb eines einzelnen Servos
python serial_test.py COM3 servo 1 90   # 舵机1 → 90°

# Alle auf Mittelstellung
python serial_test.py COM3 mid

# Linke/rechte Hand festlegen
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# Frequenzdurchlauf/Selbsttest
python serial_test.py COM3 sweep 1      # 舵机1 扫频
python serial_test.py COM3 test         # 全部舵机逐个测试
```

## V. Häufige Fragen

|Symptom|Behandlung|
|---|---|
|Servo bewegt sich nicht|Stromversorgung prüfen (5V 3A separate Stromversorgung), COM-Port, Verkabelung|
|exe stürzt sofort ab|Ausführung aus dem Quellcode verwenden (Paketversion kann Abhängigkeiten vermissen)|
|Kamera zeigt kein Bild|Kameraberechtigung erlauben (Einstellungen→Datenschutz→Kamera)|
|Handbewegung vertauscht|Die entgegengesetzte linke/rechte Hand ankreuzen|

> Das vollständige Protokoll und die Befehlsbeschreibung finden Sie in `..\03_firmware_docs\用户手册.md`.

