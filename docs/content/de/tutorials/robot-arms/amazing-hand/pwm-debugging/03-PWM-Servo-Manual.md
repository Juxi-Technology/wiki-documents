---
title: "03-PWM-Servo-Version - Handbuch"
description: "Diese Firmware läuft auf dem Entwicklungsboard ESP32-S3 und steuert über PWM-Signale 8 Servos an, um die Fingerhand Gesten ausführen zu lassen."
---

# 03-PWM-Servo-Version - Handbuch

## Inhaltsverzeichnis

1. Überblick

2. Hardware-Verkabelung

3. Firmware-Kompilierung und -Flashen

4. Serielles Kommunikationsprotokoll

5. Befehlsreferenz

6. Anleitung für das Host-Programm

7. Gesten-Tracking

8. Feinabstimmung der Gestenparameter

9. Häufige Fragen

---

## 1. Überblick

Diese Firmware läuft auf dem Entwicklungsboard **ESP32-S3** und steuert über PWM-Signale 8 Servos an, um die Fingerhand Gesten ausführen zu lassen. Das Host-Programm （PC/Raspberry Pi/anderer MCU） sendet über den USB-Seriellport binäre Frame-Befehle; der ESP32 wertet sie aus, führt die entsprechende Geste aus und sendet eine Antwort zurück.

Das Projekt bietet zwei Firmware-Implementierungen:

|Firmware|Verzeichnis|Merkmale|
|---|---|---|
|**ESP-IDF-Version** （empfohlen）|`esp-idf/AmazingHand_Serial/`|komponentenbasierte Projektstruktur, FreeRTOS-Dual-Task, produktionsreif|

> Beide Firmware-Varianten verwenden **dasselbe serielle Protokoll** und **denselben Befehlssatz**; die Gestenparameter können gegenseitig als Referenz dienen.

### Unterstützte Gesten （11 Gestenbefehle）

|Geste|Befehl|Beschreibung|
|---|---|---|
|Stein|0x01|Schere-Stein-Papier: alle Finger zur Faust|
|Schere|0x02|Schere-Stein-Papier: Zeigefinger+Mittelfinger ausgestreckt in V-Form|
|Papier|0x03|Schere-Stein-Papier: alle Finger geöffnet|
|Daumen hoch|0x04|Daumen nach oben, übrige Finger zur Faust|
|Spott1|0x05|Zeigefinger schütteln （„nein nein nein"）|
|Spott2|0x06|Ringfinger gestreckt und wackelnd （ersetzt den kleinen Finger）|
|Öffnen|0x07|alle Finger geöffnet|
|Faust|0x08|alle Finger geschlossen|
|OK|0x09|OK-Geste|
|Kneifen|0x0A|Kneif-Geste|
|Zeigen|0x0C|Zeigefinger ausgestreckt, „Zeige"-Bewegung|
|Direktantrieb|0xF0|direkte Steuerung der Winkel der 8 Servos|
|Linke/rechte Hand setzen|0xF1|zwischen linkem/rechtem Handmodus umschalten|
|Wiederholen|0xFE|die letzte Geste erneut ausführen|
|Stopp|0xFF|die aktuelle Geste sofort beenden|
|NOP|0x00|Linktest|

> Hinweis: Der Befehl 0x0B ist deaktiviert （das ursprüngliche „Daumen nach unten" war mit der Aktion „Daumen hoch" identisch und wurde entfernt）.

---

## 2. Hardware-Verkabelung

### Geeignete Hardware

|Position|Modell|
|---|---|
|Hauptsteuerung|**ESP32-S3** Entwicklungsboard （Youxin YX-ESP32-S3 oder gleichwertig）|
|Servo|8-Kanal-PWM-Analogservos (SG90 oder gleichwertig)|
|Adapterplatine|PWM-Servo-Adapterplatine|

Das ESP32-S3-Entwicklungsboard hat zwei Type-C-Schnittstellen:

- **Integriertes USB Serial/JTAG**: direkt verbunden mit dem im ESP32-S3-Chip integrierten USB-Controller

- **Externes FT232**: Kommunikation über den FT232-USB-zu-Seriell-Wandlerchip

> Beide Schnittstellen können für die serielle Kommunikation verwendet werden, eine beliebige davon genügt. Wählen Sie im Host-Programm den entsprechenden Gerätenamen des seriellen Ports.

### Servo → Adapterplatine

Die 3P-Stecker der 8 Servos werden entsprechend der ID-Nummer in die Servo-1-8-Stiftleisten der Adapterplatine gesteckt.

### Adapterplatine → ESP32-S3

|Adapterplatine|ESP32-S3 GPIO|Beschreibung|
|---|---|---|
|PWM1|**4**|Zeigefinger Gelenk1|
|PWM2|**5**|Zeigefinger Gelenk2|
|PWM3|**6**|Mittelfinger Gelenk1|
|PWM4|**7**|Mittelfinger Gelenk2|
|PWM5|**15**|Ringfinger Gelenk1|
|PWM6|**16**|Ringfinger Gelenk2|
|PWM7|**17**|Daumen Gelenk1|
|PWM8|**18**|Daumen Gelenk2|
|5V|5V|Stromversorgung （von der Adapterplatine abgegriffen）|
|GND|GND|**Gemeinsame Masse erforderlich, mindestens eine Leitung anschließen**|

> Linke und rechte Hand verwenden dieselbe GPIO-Zuordnung. Beim Umschalten in den „linke Hand"-Modus spiegelt die Firmware innerhalb der Geste die Bewegungsrichtung des Daumens; die Pins bleiben unverändert.

### Stromversorgung

Die Adapterplatine hat zwei Gruppen von 5V/GND-Stromversorgungsanschlüssen:

- Eine Gruppe wird über das Type-C-Kabel herausgeführt und mit einem **5V 3A**-Netzteil verbunden

- Die andere Gruppe wird herausgeführt, um den **5V**-Pin des ESP32-S3 mit Strom zu versorgen （das Entwicklungsboard muss dann nicht mehr über Type-C versorgt werden）

---

## 3. Firmware-Kompilierung und -Flashen

### 3.1 ESP-IDF-Version （empfohlen）

> **Warnung: Pfadanforderung**: Die ESP-IDF-Kompilierung unterstützt keine chinesischen Pfade. Stellen Sie sicher, dass der Pfad des Projekts vollständig englisch ist （einschließlich Benutzerordner und übergeordneter Verzeichnisse）.

#### Projektstruktur

```Plaintext
esp-idf/AmazingHand_Serial/
├── CMakeLists.txt              # Projektkonfiguration auf oberster Ebene
├── sdkconfig.defaults          # Standard-Kconfig-Konfiguration
├── main/
│   ├── CMakeLists.txt
│   └── main.c                  # FreeRTOS mit zwei Tasks + Initialisierung (Glue-Layer)
└── components/
    ├── hand_servo/             # Servo-Treiber (LEDC PWM + Kalibrierdaten)
    ├── hand_gestures/          # Gestenparameter-Makros + Gestenfunktionen + Steuerung für linke/rechte Hand
    └── hand_protocol/          # Serielle Frame-Analyse + Befehlsverteilung
```

#### Build-Umgebung

- ESP-IDF **v6.0.1**

- Zielchip: **ESP32-S3**

- Die Umgebungsvariable `idf.py` ist bereits konfiguriert

#### Kompilieren und Flashen

```Bash
cd esp-idf/AmazingHand_Serial

# 1. Zielchip festlegen (beim ersten Mal oder beim Chipwechsel)
idf.py set-target esp32s3

# 2. Kompilieren
idf.py build

# 3. Flashen (Windows: COM-Port verwenden, z. B. COM3)
idf.py -p COM3 flash

# 4. Serielle Überwachung (optional, Baudrate 115200)
idf.py -p COM3 monitor
```

> Nach Änderungen an beliebigem Quellcode unter `components/` oder `main/` einfach erneut `idf.py build && idf.py -p COM3 flash` ausführen.

### 3.3 Kalibrierung （optional, beim ersten Gebrauch empfohlen）

Die Mittelstellung und die Pulsbreite der Servos müssen entsprechend der tatsächlichen Mechanik kalibriert werden. Es gibt zwei Methoden:

- **ESP-IDF-Version**: Bearbeiten Sie in `components/hand_servo/hand_servo.c` `middle_pos[8]` （Zeile 40） und `min_pw/mid_pw/max_pw[8]` （Zeilen 45-47）

Nach der Kalibrierung muss erneut kompiliert und geflasht werden.

---

## 4. Serielles Kommunikationsprotokoll

### 4.1 Physische Schicht

|Parameter|Wert|
|---|---|
|Schnittstelle|USB Serial (UART0)|
|Baudrate|**115200**|
|Datenbits|8|
|Paritätsbit|keines (None)|
|Stoppbit|1|
|Flusskontrolle|keine|

### 4.2 Frame-Format

#### Host → ESP32 （Befehl-Frame）

```Plaintext
┌────────┬────────┬──────────┬────────────────┬──────────┐
│  0xAA  │ CMD_ID │ DATA_LEN │ DATA[0 .. N-1] │ CHECKSUM │
│ 1 Byte │ 1 Byte │  1 Byte  │    N Bytes     │  1 Byte  │
└────────┴────────┴──────────┴────────────────┴──────────┘
 帧头      命令ID    数据长度      数据负载         校验和
```

- **Frame-Header**: fest `0xAA`, kennzeichnet den Beginn eines Frames

- **CMD_ID**: Befehlsnummer （siehe Befehlsreferenz）

- **DATA_LEN**: Anzahl der Bytes der Datennutzlast （0-8; Frames mit mehr als 8 sind ungültig）

- **DATA**: Datennutzlast, die Länge wird durch DATA_LEN bestimmt

- **CHECKSUM**: `CMD_ID ^ DATA_LEN ^ DATA[0] ^ ... ^ DATA[N-1]` （XOR-Prüfung）

> Wenn DATA_LEN = 0, dann ist CHECKSUM = CMD_ID.

#### ESP32 → Host （Antwort-Frame）

```Plaintext
┌────────┬────────┬────────┬──────────┐
│  0xBB  │ CMD_ID │ STATUS │ CHECKSUM │
│ 1 Byte │ 1 Byte │ 1 Byte │  1 Byte  │
└────────┴────────┴────────┴──────────┘
 帧头      命令ID    状态码    校验和
```

- **Frame-Header**: fest `0xBB`

- **CMD_ID**: ursprüngliche Befehlsnummer

- **STATUS**: Statuscode （siehe Tabelle unten）

- **CHECKSUM**: `CMD_ID ^ STATUS`

#### Statuscodes

|STATUS|Bedeutung|Beschreibung|
|---|---|---|
|0x00|OK|Befehl akzeptiert, Ausführung beginnt|
|0x01|ungültiger Befehl|CMD_ID ist nicht in der Befehlstabelle|
|0x02|Parameterfehler|Datenlänge oder Inhalt nicht korrekt|
|0x03|beschäftigt|Geste wird ausgeführt, neue Befehle werden vorerst nicht angenommen|
|0x10|abgeschlossen|Geste vollständig ausgeführt|

### 4.3 Kommunikationsablauf

```Plaintext
主机                          ESP32
 │                              │
 │──── [AA 01 00 01] ────────→│  发送"石头"命令
 │                              │
 │←─── [BB 01 00 01] ─────────│  ACK: 命令已接受
 │                              │
 │                      (执行手势中)
 │                              │
 │←─── [BB 01 10 11] ─────────│  完成: 手势执行完毕
 │                              │
 │──── [AA 02 00 02] ────────→│  发送"剪刀"命令
 │                              │
 │←─── [BB 02 00 02] ─────────│  ACK
 │                              │
```

### 4.4 Gesten stoppen & Frame-Timeout

- Das Senden von `[AA FF 00 FF]` kann die gerade ausgeführte Geste jederzeit unterbrechen

- Der ESP32 verwirft einen Frame automatisch, wenn er innerhalb von 200ms nicht vollständig empfangen wurde （verhindert dauerhaften Synchronitätsverlust durch verlorene Bytes）

- Frames mit nicht übereinstimmender Prüfsumme werden stillschweigend verworfen; das Host-Programm sollte eine Timeout-Neusendung implementieren

### 4.5 Modus linke/rechte Hand

Standardmäßig rechter Handmodus. Senden Sie `[AA F1 01 02 F2]`, um auf die linke Hand umzuschalten, und `[AA F1 01 01 F1]`, um zur rechten Hand zurückzuschalten. Linke/rechte Hand beeinflusst die Bewegungsrichtung des Daumens （Gesten mit Daumen wie Stein/Schere/Daumen hoch/OK/Kneifen）.

---

## 5. Befehlsreferenz

### 5.1 Gestenbefehle (0x01-0x0A, 0x0C)

Diese Befehle benötigen keine Datennutzlast (DATA_LEN=0); der ESP32 führt nach Empfang sofort die entsprechende Geste aus.

|Befehl|HEX-Frame|Antwort|Beschreibung|
|---|---|---|---|
|Stein|`AA 01 00 01`|`BB 01 00 01` → `BB 01 10 11`|alle Finger zur Faust|
|Schere|`AA 02 00 02`|`BB 02 00 02` → `BB 02 10 12`|Zeigefinger+Mittelfinger ausgestreckt|
|Papier|`AA 03 00 03`|`BB 03 00 03` → `BB 03 10 13`|alle Finger geöffnet|
|Daumen hoch|`AA 04 00 04`|`BB 04 00 04` → `BB 04 10 14`|Daumen nach oben|
|Spott1|`AA 05 00 05`|`BB 05 00 05` → `BB 05 10 15`|Zeigefinger schütteln （ca. 2.5s）|
|Spott2|`AA 06 00 06`|`BB 06 00 06` → `BB 06 10 16`|Ringfinger wackeln （ca. 2.5s）|
|Öffnen|`AA 07 00 07`|`BB 07 00 07` → `BB 07 10 17`|alle Finger geöffnet|
|Faust|`AA 08 00 08`|`BB 08 00 08` → `BB 08 10 18`|alle Finger geschlossen|
|OK|`AA 09 00 09`|`BB 09 00 09` → `BB 09 10 19`|OK-Geste|
|Kneifen|`AA 0A 00 0A`|`BB 0A 00 0A` → `BB 0A 10 1A`|Kneif-Geste|
|Zeigen|`AA 0C 00 0C`|`BB 0C 00 0C` → `BB 0C 10 1C`|Zeigefinger ausgestreckt, „Zeige"-Bewegung|

### 5.2 Direktantriebsbefehl (0xF0)

Direkte Steuerung der Winkel der 8 Servos; die 8 Datenbytes entsprechen den Servos 1-8, der Wertebereich jedes Bytes ist 0-180.

**Beispiel: alle Servos auf Mittelstellung （90°）**

```Plaintext
发送: AA F0 08 5A 5A 5A 5A 5A 5A 5A 5A F8
       │  │  │  └── 8 个 0x5A (90°) ──┘  │
       │  │  │                            └── CHECKSUM
       │  │  └── DATA_LEN = 8
       │  └── CMD_DIRECT_DRIVE
       └── 帧头
```

Prüfsumme = `F0 ^ 08 ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A` = `F8`

> 8 identische 0x5A ergeben paarweise XOR 0x00, letztlich `0xF0 ^ 0x08 ^ 0x00 = 0xF8`

**Beispiel: Zeigefinger geöffnet(Servo1=170°, Servo2=10°), übrige auf Mittelstellung(90°)**

```Plaintext
发送: AA F0 08 AA 0A 5A 5A 5A 5A 5A 5A 58
               └─170°  └─10°
```

### 5.3 Linke/rechte Hand setzen (0xF1)

1 Datenbyte: `0x01` = rechte Hand, `0x02` = linke Hand.

```Plaintext
设右手: AA F1 01 01 F1
设左手: AA F1 01 02 F2
```

### 5.4 Steuerbefehle

|Befehl|HEX-Frame|Beschreibung|
|---|---|---|
|NOP|`AA 00 00 00`|Linktest, gibt sofort `BB 00 00 00` zurück|
|Wiederholen|`AA FE 00 FE`|die letzte Geste erneut ausführen|
|Stopp|`AA FF 00 FF`|die aktuelle Geste sofort beenden|

### 5.5 Antwort-Schnellreferenz

Bei Empfang eines ungültigen Befehls （am Beispiel des nicht existierenden Befehls 0xFC）:

```Plaintext
发送: AA FC 00 FC
响应: BB FC 01 FD    （STATUS=0x01 无效命令）
```

> Prüfsummenprüfung: `FC ^ 00 = FC`, Antwort `FC ^ 01 = FD`

---

## 6. Anleitung für das Host-Programm

Im Projektstammverzeichnis werden zwei Host-Werkzeuge bereitgestellt:

|Werkzeug|Datei|Typ|Zweck|
|---|---|---|---|
|**Grafische Oberfläche**|`hand_gui.py` / gepackte exe|visuell|Gesten per Buttonklick, Direktantrieb per Schieberegler, Log|
|**Kommandozeilentest**|`serial_test.py`|befehlbasiert|Gesten/einzelne Servos/Sweep senden, automatisierte Tests|

> Beide benötigen nur die Abhängigkeit `pyserial`. Installation: `pip install -r requirements.txt`

### 6.1 Visuelle GUI （empfohlen）

#### Methode A: die gepackte exe ausführen （für Kunden）

1. `AmazingHand控制台.exe` erhalten （oder das entpackte Verzeichnis）

2. **Doppelklick auf die exe** zur direkten Ausführung, keine Python-Installation nötig

3. Gemäß den folgenden Schritten verbinden und verwenden

#### Methode B: aus dem Quellcode ausführen

```Bash
# 1. Abhängigkeiten installieren
pip install -r requirements.txt

# 2. Ausführen
python hand_gui.py
```

#### Schritte zur Verwendung der GUI

1. **Seriellen Port wählen**: Im Dropdown-Menü oben den COM-Port des ESP32 auswählen （unter Windows im Geräte-Manager prüfen）

2. **Auf „Verbinden" klicken**: Die Statusanzeige wird grün, im Logbereich erscheint „Verbunden", und automatisch wird ein NOP-Linktest gesendet

3. **Gestenbefehle**: Auf Buttons wie „Stein", „Schere", „Papier", „Daumen hoch", „OK" … klicken, die Roboterhand führt die entsprechende Geste aus

4. **Linke/rechte Hand**: „Rechte Hand"/„Linke Hand" ankreuzen, um die Spiegelrichtung des Daumens umzuschalten

5. **Servo-Direktantrieb**: 8 Schieberegler ziehen, um den Winkel eines einzelnen Servos in Echtzeit zu steuern （0-180°）

6. **Finger-Differenzialsteuerung** （empfohlen）: Zwei Fortschrittsbalken pro Finger——**Beugen/Strecken** steuert die beiden Servos dieses Fingers gegenläufig differenziell （Beugen/Strecken）, **Rechts schwenken/Links schwenken** steuert das gleichgerichtete Schwenken. Die beiden Freiheitsgrade sind unabhängig und werden synchron angetrieben

7. **Wiederholen / Stopp**: die letzte Geste wiederholen / die aktuelle Geste sofort abbrechen

8. **Kommunikations-Log**: zeigt unten in Echtzeit die gesendeten/empfangenen Frames und den Antwortstatus an

### Erläuterung der Finger-Differenzialsteuerung

Jeder Finger wird **von zwei Servos differenziell angetrieben**; die beiden Freiheitsgrade sind orthogonal:

|Fortschrittsbalken|Wirkung|Mechanischer Effekt|
|---|---|---|
|**Beugen◀▶Strecken**|die beiden Servos drehen gegenläufig （differenziell）|Finger beugen oder strecken|
|**Rechts schwenken◀▶Links schwenken**|die beiden Servos drehen gleichgerichtet|Finger nach links/rechts schwenken|

- Der Schieberegler **Beugen/Strecken** hat den Bereich -70 ~ +70 （0 = neutral, +70 = vollständig gestreckt, -70 = vollständig gebeugt）

- Der Schieberegler **Links/Rechts-Schwenken** hat den Bereich 60 ~ 120 （90 = neutral, 60 = nach rechts schwenken, 120 = nach links schwenken）

- Servowinkel = `Schwenken ± Beugen`, beide Servos werden **synchron** aktualisiert und der Direktantriebsbefehl wird gesendet

> Beispiel （Zeigefinger GPIO4/5）: Beugen-Schieberegler auf +70 gezogen, Schwenken bleibt bei 90 → Servo4=160°, Servo5=20° （vollständig gestreckt）; Beugen auf -70 gezogen → Servo4=20°, Servo5=160° （vollständig gebeugt）.

### 6.2 Befehlbasierter Test （serial_test.py）

#### Kommandozeilenverwendung

```Bash
# Hilfe anzeigen
python serial_test.py

# Verbindungstest
python serial_test.py COM3 nop

# Geste senden
python serial_test.py COM3 rock        # Stein
python serial_test.py COM3 thumbs_up    # Daumen hoch
python serial_test.py COM3 index        # Zeigen
python serial_test.py COM3 open         # Öffnen
python serial_test.py COM3 close        # Faust

# Direktantrieb eines einzelnen Servos
python serial_test.py COM3 servo 1 90   # Servo 1 → 90°

# Alle auf Mittelstellung
python serial_test.py COM3 mid

# Linke/rechte Hand festlegen
python serial_test.py COM3 hand L       # Linke Hand
python serial_test.py COM3 hand R       # Rechte Hand

# Frequenzdurchlauf / Selbsttest
python serial_test.py COM3 sweep 1      # Servo 1 Frequenzdurchlauf
python serial_test.py COM3 test         # Alle Servos einzeln testen
```

#### Interaktiver Modus

```Bash
python serial_test.py COM3
```

Es wird eine REPL gestartet; geben Sie direkt Kurzbefehle ein （z. B. `servo 3 180`, `rock`, `mid`, `quit`）.

### 6.3 Manueller Test mit Seriell-Werkzeug （optional）

**CoolTerm** (macOS/Windows/Linux):

1. CoolTerm öffnen, `Options` → Baudrate auf 115200, 8N1 setzen

2. `Connection` → `Send String` → `Hex` wählen

3. `AA 01 00 01` eingeben → senden → die Roboterhand führt „Stein" aus

4. Im Antwortbereich wird `BB 01 00 01 ... BB 01 10 11` angezeigt

**SerialTool** (macOS):

```Bash
brew install serialtool
echo -ne '\xAA\x01\x00\x01' > /dev/cu.usbserial-0001
```

### 6.4 Python-Steuerskript （individuelle Entwicklung）

```Python
#!/usr/bin/env python3
"""灵巧手串口控制 - Python 上位机示例"""
import serial
import time

SERIAL_PORT = "/dev/cu.usbserial-0001"  # An den tatsächlichen Port anpassen
BAUD_RATE   = 115200

# Befehlsdefinition (entspricht dem Firmware-Befehlssatz)
CMD = {
    "nop":       0x00,
    "rock":      0x01,
    "scissors":  0x02,
    "paper":     0x03,
    "thumbs_up": 0x04,
    "taunt1":    0x05,
    "taunt2":    0x06,
    "open":      0x07,
    "close":     0x08,
    "ok":        0x09,
    "pinch":     0x0A,
    "index":     0x0C,
    "direct":    0xF0,
    "set_side":  0xF1,
    "repeat":    0xFE,
    "stop":      0xFF,
}

def calc_checksum(cmd_id, data=b""):
    """计算 XOR 校验和 (CMD ^ LEN ^ DATA[0..N])"""
    result = cmd_id ^ len(data)
    for b in data:
        result ^= b
    return result & 0xFF

def send_command(ser, cmd_id, data=b""):
    """发送命令帧，返回 (ack_status, completion_status)"""
    data_len = len(data)
    checksum = calc_checksum(cmd_id, data)
    frame = bytes([0xAA, cmd_id, data_len]) + data + bytes([checksum])
    ser.write(frame)
    print(f"发送: {frame.hex(' ').upper()}")

def read_response(ser, timeout=1.0):
    """读取一个响应帧 [0xBB CMD STATUS CKSUM]"""
    ser.timeout = timeout
    while True:
        b = ser.read(1)
        if not b:
            return None
        if b[0] == 0xBB:
            buf = ser.read(3)
            if len(buf) == 3:
                expected = buf[0] ^ buf[1]
                if expected == buf[2]:
                    return bytes([0xBB]) + buf
    return None

def set_side(ser, side):
    """设置左右手: side='R' 右手, side='L' 左手"""
    val = 0x01 if side.upper() == 'R' else 0x02
    send_command(ser, CMD["set_side"], bytes([val]))

def direct_drive(ser, angles):
    """直驱 8 路舵机: angles 为 8 个 0-180 的角度列表"""
    data = bytes([min(180, max(0, a)) for a in angles[:8]])
    send_command(ser, CMD["direct"], data)

# ===== Anwendungsbeispiel =====
if __name__ == "__main__":
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    time.sleep(1)  # Auf den Abschluss des ESP32-Resets warten

# 1. Verbindungstest
    print("=== NOP 链路测试 ===")
    send_command(ser, CMD["nop"])

# 2. Schere-Stein-Papier-Spiel
    print("\n=== 猜拳: 石头 → 剪刀 → 布 ===")
    for name in ["rock", "scissors", "paper"]:
        send_command(ser, CMD[name])
        time.sleep(0.5)

# 3. Daumen-hoch-Geste
    print("\n=== 真棒 ===")
    send_command(ser, CMD["thumbs_up"])

# 4. Test stoppen
    print("\n=== 停止测试 ===")
    send_command(ser, CMD["taunt1"])  # Zeigefinger-Wackeln starten
    time.sleep(0.3)
    send_command(ser, CMD["stop"])    # Sofort stoppen

# 5. Direktantriebsmodus: alle auf Mittelstellung
    print("\n=== 直驱: 归中 ===")
    direct_drive(ser, [90] * 8)

    ser.close()
```

---

## 7. Gesten-Tracking

Mit der **Kamera wird die Handfläche in Echtzeit erkannt**, um das Beugen/Strecken und das seitliche Schwenken der Finger der Fingerhand anzutreiben. Basiert auf dem Hand-Tracking-Algorithmus des offiziellen AmazingHand （MediaPipe 21-Punkt-Keypoints + 3D-Weltkoordinatenrotation）.

### 7.1 Prinzip

- Kamera auf die Handfläche richten → MediaPipe erkennt 21 Hand-Keypoints

- Aufbau eines lokalen Handkoordinatensystems, Berechnung der 3D-Vektoren der Fingerspitzen der 4 Finger

- Fingerspitzenvektor → (flex, base)-Differenzialparameter jedes Fingers → unter Wiederverwendung des Direktantriebsprotokolls an die Servos gesendet

### 7.2 Umgebungsanforderungen

Das Gesten-Tracking hängt von **64-Bit Python + mediapipe 0.10.14** ab （alte solutions-API, nur sie kann 3D-Weltkoordinaten）:

|Abhängigkeit|Version|
|---|---|
|Python|64-Bit 3.12|
|mediapipe|0.10.14|
|numpy|<2.0|
|scipy|>=1.9|
|opencv-python|>=4.10|
|Pillow|>=10.0|

> **Achtung**: Die vorhandene Standardumgebung ist 32-Bit Python, mediapipe kann nicht installiert werden. Es muss zusätzlich 64-Bit Python 3.12 installiert werden （auf Laufwerk D, z. B. `D:\Python312-64`; es besteht vollständig neben dem vorhandenen 32-Bit und steht nicht in Konflikt damit）.

### 7.3 Ein-Klick-Deployment

1. 64-Bit Python 3.12 installieren （von [python.org](https://www.python.org/downloads/) den 64-Bit-Installer herunterladen, nach `D:\Python312-64` installieren）

2. Im Projektstammverzeichnis **`setup_tracking.bat`** per Doppelklick ausführen

    - sucht automatisch nach 64-Bit Python

    - erstellt die virtuelle Umgebung `tracking_env`

    - installiert Abhängigkeiten wie mediapipe 0.10.14

    - überprüft die Installation

### 7.4 Verwendungsschritte

1. Die GUI mit der Tracking-Umgebung starten:

```Plaintext
tracking_env\Scripts\python hand_gui.py
```

2. Seriellen Port verbinden （den COM-Port des ESP32 wählen）

3. Im Panel „Gesten-Tracking" die Kameranummer wählen （Standard 0）

4. Auf **„Tracking starten"** klicken → das Kamerabild wird im Panel angezeigt

5. Die Handfläche auf die Kamera richten:

    - **Finger beugen/strecken** → die entsprechenden Finger der Fingerhand beugen/strecken

    - **Handfläche nach links/rechts drehen** → die Finger der Fingerhand schwenken nach links/rechts

6. Auf **„Tracking stoppen"** klicken zum Beenden

> Wird keine Hand erkannt, zeigt das Panel „Keine Hand erkannt"; nach der Erkennung wird „Hand erkannt: Right/Left" angezeigt.

### 7.5 Parameterkalibrierung

Die Zuordnungskoeffizienten befinden sich am Ende von `hand_tracking.py` （`FLEX_SCALE` / `BASE_SCALE`）:

```Python
FLEX_SCALE = 80.0    # Fingerspitzen-Z-Komponente → Beugen/Strecken (flex)
BASE_SCALE = 30.0    # Fingerspitzen-X-Komponente → Seitliches Schwenken (base)
```

Ist die Amplitude von Beugen/Strecken zu gering oder die Richtung vertauscht, `FLEX_SCALE` anpassen; ist die Amplitude des Links/Rechts-Schwenkens zu gering oder vertauscht, `BASE_SCALE` anpassen （das Vorzeichen ändert die Richtung）.

---

## 8. Feinabstimmung der Gestenparameter

### 8.1 Position der Parameter

Der Winkelversatz jeder Geste wird mit `#define`-Makros definiert; **der Logikcode muss nicht geändert werden**, nur die Zahlenwerte werden angepasst.

- **ESP-IDF-Version**: Der Bereich „Gestenparameter （benutzeranpassbar）" am Anfang von `components/hand_gestures/hand_gestures.c`

### 8.2 Bedeutung der Parameter

```C
// Beispiel: Geste Stein
#define ROCK_IDX_OFF1    70    // Offset von Zeigefinger Gelenk1
#define ROCK_IDX_OFF2   -70    // Offset von Zeigefinger Gelenk2
```

- **Positiver Wert = Beugen/fest Greifen**, **negativer Wert = Strecken/Öffnen**

- 2 Offsets pro Finger, relativ zu `middle_pos` （Standard 90°）

- Differenzialkonstruktion: Die Offsetdifferenz der beiden Servos = Strecken/Zusammenziehen, die gleichgerichtete Komponente = Links/Rechts-Abweichung

### 8.3 Schritte zur Parameteranpassung

1. Das `#define`-Makro der entsprechenden Geste finden

2. Den Zahlenwert ändern （vergrößern → größere Amplitude; verkleinern → kleinere Amplitude）

3. Erneut kompilieren und flashen, den Effekt mit dem Host-Programm testen

4. So lange feinjustieren, bis die Bewegung natürlich wirkt

---

## 9. Häufige Fragen

### Q1: Das Host-Programm kann keine Verbindung zum seriellen Port herstellen?

1. Vergewissern Sie sich, dass der ESP32 über Type-C mit dem Computer verbunden ist

2. Prüfen Sie, ob die COM-Portnummer im Geräte-Manager mit der in der GUI gewählten übereinstimmt

3. Vergewissern Sie sich, dass die Baudrate 115200 beträgt

4. Trennen Sie andere Software, die den seriellen Port belegt

### Q2: Beim Senden von Befehlen gibt es keine Reaktion?

1. Senden Sie zuerst `AA 00 00 00` （NOP）, Sie sollten `BB 00 00 00` empfangen

2. Vergewissern Sie sich, dass die Firmware geflasht ist und der Zielchip ESP32-S3 ist

3. Prüfen Sie die Verkabelung （ob GND gemeinsame Masse hat）

### Q3: Die Bewegungsamplitude der Geste ist falsch oder die Richtung vertauscht?

Gehen Sie zur Feinabstimmung der Gestenparameter （siehe Abschnitt 7） und passen Sie das entsprechende Makro an.

### Q4: Welche Gesten beeinflusst der Modus linke/rechte Hand?

Gesten mit **Daumen** wie Stein/Schere/Daumen hoch/OK/Kneifen; nach dem Umschalten der linken/rechten Hand ändert sich die Spiegelrichtung des Daumens.

### Q5: Finger klemmt und lässt sich nicht ausstrecken?

Bei allen kontrahierenden Gesten wird vor der Ausführung automatisch „zuerst die ganze Hand öffnen und dann schließen" durchgeführt, um zu vermeiden, dass die Finger von der vorherigen Geste blockiert werden. Klemmt es weiterhin, prüfen Sie die mechanische Montage oder verringern Sie die Kontraktionsamplitude.

