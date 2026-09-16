---
title: "02-Gesten-Tracking-Tutorial"
description: "\\# Gesten-Tracking — Anleitung(PWM-Servo-Version)"
---

# 02-Gesten-Tracking-Tutorial

**\# Gesten-Tracking — Anleitung(PWM-Servo-Version)**

Dieses Verzeichnis bietet **Gesten-Tracking**: Die Kamera erkennt Ihre Hand, die Fingerhand folgt in Echtzeit (vollständige IK-Kette).

> Kette: Kamera → mediapipe Hand-Skelett → MuJoCo+IK → 8 Gelenkwinkel → ESP32 → PWM-Servos

> Geeignet für: ESP32-S3 + 8-Kanal-PWM-Servos. Zum Firmware-Flashen siehe `..\03_firmware_docs`.

## I. Voraussetzungen

1. **Hardware**: ESP32-S3 + 8-Kanal-PWM-Servos mit Stromversorgung, USB angeschlossen, Kamera verfügbar.

2. **Firmware**: Bereits geflasht (siehe Benutzerhandbuch unter `..\03_firmware_docs`).

3. **Erstmaliges Deployment** (nur einmal erforderlich, siehe unten).

## II. Erstmaliges Deployment

### 2.1 Umgebung installieren

In `Demo\Windows_Scripts_CN\` wechseln (für englische Systeme `Windows_Deploy_Scripts\`), nach Nummer doppelklicken:

```Plaintext
1-安装环境.bat   → 安装 Rust / uv / dora(几分钟)
```

Nach der Installation **das Terminal schließen und neu öffnen**.

### 2.2 Demo deployen

```Plaintext
3-部署代码.bat   → 创建 Python 环境 + 编译 AHControl + 安装依赖(几分钟)
```

## III. Gesten-Tracking ausführen (jedes Mal)

### 3.1 Skript per Doppelklick ausführen

In `Demo\Windows_Scripts_CN\` wechseln, `4-运行代码.bat` doppelklicken:

```Plaintext
Select a run mode:
   1 - 模拟仿真（摄像头手势追踪）
   2 - 真实硬件（SCS0009 总线舵机）
   3 - PWM 舵机（ESP32 直驱）    ← 选 3
```

Dann den Handtyp wählen:

```Plaintext
PWM 舵机（ESP32 直驱）- 请选择灵巧手：
   1 - 右手          ← 选 1
   2 - 左手          ← 选 2
```

### 3.2 Verwendung starten

1. Das Skript führt automatisch `dora build` + `dora run` aus.

2. Das Kamerafenster öffnet sich, 3D-Simulationsfinger erscheinen.

3. Die Hand ins Bild halten, Finger bewegen → **3D-Simulation folgt → Fingerhand folgt**.

4. Stoppen: Ctrl+C (oder Fenster schließen).

> Linux-System: `Demo\Linux_Scripts_CN\` (Chinesisch) oder `Linux_Deploy_Scripts\` (Englisch) verwenden, die Skriptnamen enden auf `.sh`, Ausführung mit `bash 脚本名` oder nach Erteilen der Ausführungsrechte.

## IV. Wie Sie erkennen, dass alles normal läuft

Im Ausführungsfenster gibt der AHControl-Knoten Folgendes aus:

```Plaintext
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N` (z. B. `sent 300 frames, ESP32 acked 300 frames`)→ **normal**, Servo-Kette verbunden.

- `M = 0` → ESP32 hat keine Daten empfangen, seriellen Port/Stromversorgung prüfen (siehe unten).

Solange diese Zeile wächst, ist die Servo-Kette in Ordnung; es bleibt nur die Frage, ob die Kamera mithalten kann.

## V. Linke/rechte Hand umschalten

Im Ausführungsmenü einfach den Handtyp wählen. Nach dem Umschalten wird das Skript automatisch neu gebaut; warten Sie, bis der Build abgeschlossen ist, bevor Sie weiterarbeiten.

## VI. Häufige Fragen

|Symptom|Behandlung|
|---|---|
|Servo bewegt sich überhaupt nicht|Stromversorgung prüfen (5V 3A), COM-Port, Verkabelung; ob im Log `acked M frames` gleich 0 ist|
|Kamera zeigt kein Bild|Kameraberechtigung erlauben (Einstellungen→Datenschutz→Kamera)|
|Hand folgt nicht / träge|Für ausreichend Licht sorgen, die Hand vollständig ins Bild halten, langsamer und mit größerer Amplitude bewegen|
|Handbewegung vertauscht / Daumenrichtung falsch|Ist im Menü die richtige linke/rechte Hand gewählt? Versuchen Sie die andere|
|Nach Wechsel des USB-Ports wird der serielle Port nicht gefunden|`2-配置串口.bat` erneut ausführen und einen neuen COM-Port wählen|

## VII. Benutzer von SCS0009-Busservos

Dieses Demo unterstützt auch den offiziellen **SCS0009-Busservo**. Im Menü `2 - 真实硬件(SCS0009 总线舵机)` wählen; Konfiguration und Beschreibung siehe `Demo\双版本舵机并存说明.md` und das offizielle Tutorial.

## Verzeichnisbeschreibung

|Pfad|Inhalt|
|---|---|
|`Demo\AHControl`|Rust-Servo-Steuerprogramm (Quellcode, wird beim Deployment automatisch kompiliert)|
|`Demo\AHSimulation`|MuJoCo-Simulation + IK-Lösung|
|`Demo\HandTracking`|MediaPipe-Hand-Tracking|
|`Demo\Windows_Scripts_CN` / `Windows_Deploy_Scripts`|Windows-Ein-Klick-Skripte (Chinesisch/Englisch)|
|`Demo\Linux_Scripts_CN` / `Linux_Deploy_Scripts`|Linux-Ein-Klick-Skripte (Chinesisch/Englisch)|
|`Demo\dataflow_*_pwm.yml`|PWM-Datenfluss (Baudrate 115200 bereits integriert)|

