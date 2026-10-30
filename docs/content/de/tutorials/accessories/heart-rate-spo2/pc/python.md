---
title: "PC · Python-Ausführung"
description: "MAX30102-Herzfrequenz-/SpO2-Daten unter Windows über USB-zu-TTL und ein Python-Skript auslesen – mit Treiber, COM-Port, Ausführungsschritten und Modbus-Registern."
---

# PC · Python-Ausführung

## Inhalt

1. Hardwarevorbereitung
1. Hardwareverbindung
1. Einrichtung der Softwareumgebung
1. Beispielprogramm ausführen
1. Häufige Fragen

---

## Hardwarevorbereitung

### Benötigtes Material

| Material | Beschreibung |
|---|---|
| JUXI_HeartRate_SPO2-Sensor | Herzfrequenz-/SpO2-Modul |
| USB-zu-TTL-Modul | CH340 / CP2102 / FT232 usw. |
| Jumper-Kabel | 4 Stück (Buchse zu Buchse) |
| Windows-PC | Win7/Win10/Win11 |

---

## Hardwareverbindung

### Verkabelung

| Sensor-Pin | USB-zu-TTL-Pin | Beschreibung |
|---|---|---|
| VCC | 3,3 V oder 5 V | Versorgungsplus |
| GND | GND | Versorgungsminus |
| TX | RX | Sensor sendet → Modul empfängt |
| RX | TX | Sensor empfängt → Modul sendet |

![Abbildung](../../../../../../public/images/tutorials/accessories/heart-rate-spo2/pc-python/01.png)

⚠️ **Wichtige Hinweise**:

1. Den Schiebeschalter des Moduls auf UART stellen!!!
1. **TX und RX müssen gekreuzt verbunden werden!**
1. Der Sensor unterstützt 3,3 V und 5 V; schließen Sie die Spannung nicht falsch an
1. Zuerst alle Kabel anschließen, dann den USB in den Computer stecken

### Verkabelungsskizze

```text
传感器        USB转TTL模块
┌──────┐      ┌──────────┐
│ VCC  │──────│ 3.3V/5V  │
│ GND  │──────│ GND      │
│ TX   │──────│ RX       │  ← 交叉连接
│ RX   │──────│ TX       │  ← 交叉连接
└──────┘      └──────────┘
```

---

## Einrichtung der Softwareumgebung

### Treiber installieren

Installieren Sie je nach Chip des USB-zu-TTL-Adapters den passenden Treiber:

- **CH340**: [https://sparks.gogo.co.nz/ch340.html](https://sparks.gogo.co.nz/ch340.html)
- **CP2102**: [https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
- **FT232**: [https://ftdichip.com/drivers/vcp-drivers/](https://ftdichip.com/drivers/vcp-drivers/)

Nach der Installation den USB-zu-TTL-Adapter einstecken.

### COM-Port ermitteln

#### Methode 1: Geräte-Manager

1. Drücken Sie `Win + X` und wählen Sie „Geräte-Manager“
1. Klappen Sie „Anschlüsse (COM und LPT)“ auf
1. Suchen Sie die COM-Portnummer Ihres USB-zu-TTL-Adapters (z. B. COM3)

#### Methode 2: Automatische Erkennung durch das Programm

Beim Ausführen des Beispielprogramms werden alle verfügbaren seriellen Ports automatisch aufgelistet.

### Python-Abhängigkeiten installieren

Öffnen Sie die Eingabeaufforderung (CMD) oder PowerShell und führen Sie aus:

```bash
pip install pyserial
```

---

## Beispielprogramm ausführen

Laden Sie das Archiv [JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh) herunter und entpacken Sie es.

### Dateispeicherort

```text
JUXI_HeartRate_SPO2/python/windows/
├── gain_heartbeat_SPO2.py  ← 主程序（直接运行这个）
├── JUXI_HeartRate_SPO2_Windows.py
├── JUXI_RTU_Windows.py
└── README_CN.md        ← 本文件
└── README.md
```

### Ausführungsschritte

1. **Richtige Hardwareverbindung sicherstellen**
  - VCC → 3,3 V/5 V
  - GND → GND
  - TX → RX (gekreuzt)
  - RX → TX (gekreuzt)

1. **USB in den Computer stecken**
1. **Programm ausführen**

```bash
cd D:\JUXI_HeartRate_SPO2\python\windows
```

```bash
python gain_heartbeat_SPO2.py
```

1. **Den Anweisungen folgen**
  - Das Programm listet alle verfügbaren seriellen Ports auf
  - Geben Sie Ihre COM-Portnummer ein (z. B. COM3)
  - Das Programm erkennt den Sensor automatisch und startet die Messung

### Erwartete Ausgabe

```python
==================================================
JUXI Blood Oxygen Sensor - Windows Test
==================================================
Available serial ports:
  COM3

Please enter the COM port number (e.g., COM3):

Connecting to COM3 at 9600 baud...
Initializing sensor...
Sensor initialized successfully!

Starting data collection...
Sensor LED should be ON now!

Place your finger on the sensor...

SPO2 (血氧): 97 %
Heart Rate (心率): 82 BPM
Temperature (温度): 26.5 °C
SPO2 (血氧): 98 %
Heart Rate (心率): 78 BPM
Temperature (温度): 26.6 °C
...
```

Drücken Sie `Ctrl + C`, um das Programm zu beenden.

---

## Funktionsbeschreibung des Programms

### Wichtige API

```bash
# 创建传感器对象
sensor = BloodOxygenSensor("COM3", 9600)

# 初始化传感器
sensor.begin()

# 开始采集（LED亮起）
sensor.sensor_start_collect()

# 读取心率血氧
sensor.get_heartbeat_SPO2()
print(f"SPO2: {sensor.SPO2}%")
print(f"Heart Rate: {sensor.heartbeat} BPM")

# 读取温度
temp = sensor.get_temperature_c()

# 停止采集（LED熄灭）
sensor.sensor_end_collect()

# 关闭串口
sensor.close()
```

---

## Häufige Fragen

### F1: Was tun, wenn kein COM-Port gefunden wird?

**A:**

1. Prüfen Sie, ob der USB-zu-TTL-Adapter richtig eingesteckt ist
1. Installieren Sie den Treiber neu
1. Versuchen Sie einen anderen USB-Anschluss
1. Prüfen Sie im Geräte-Manager, ob ein „Unbekanntes Gerät“ angezeigt wird

### F2: Was tun, wenn die Sensorinitialisierung fehlschlägt?

**A:**

1. Verkabelung prüfen:
  - Sind VCC und GND richtig angeschlossen
  - **Sind TX und RX gekreuzt verbunden** (häufigste Ursache)

1. Prüfen Sie, ob die Baudrate 9600 beträgt
1. Prüfen Sie, ob das USB-zu-TTL-Modul ordnungsgemäß funktioniert
1. Stecken Sie den USB erneut ein

### F3: Was tun, wenn die Daten dauerhaft -1 anzeigen?

**A:**

1. Prüfen Sie, ob der Finger richtig auf dem Sensor liegt (LED-Bereich vollständig bedeckt)
1. Halten Sie den Finger ruhig und bewegen Sie ihn nicht
1. Warten Sie einige Sekunden, bis sich die Daten stabilisiert haben
1. Prüfen Sie, ob die Sensor-LED leuchtet

### F4: LED leuchtet nicht, aber die Kommunikation funktioniert?

**A:**

- Möglicherweise liegt ein Hardwareproblem der LED vor, die Sensorfunktion ist jedoch normal
- Solange die Daten normal sind, kann das nicht leuchtende LED ignoriert werden

### F5: Was tun, wenn der serielle Port belegt ist?

**A:**

1. Schließen Sie andere serielle Programme (Seriell-Assistent, Arduino IDE usw.)
1. Prüfen Sie, ob ein anderes Python-Programm läuft
1. Stecken Sie den USB erneut ein

### F6: Was tun, wenn die Daten ungenau sind?

**A:**

1. Stellen Sie sicher, dass der Finger den optischen Bereich des Sensors vollständig bedeckt
1. Bleiben Sie während der Messung ruhig, sprechen oder bewegen Sie sich nicht
1. Warten Sie mindestens 30 Sekunden, bis sich die Daten stabilisiert haben
1. Führen Sie mehrere Messungen durch und bilden Sie den Mittelwert

---

## Technische Daten

| Parameter | Spezifikation |
|---|---|
| Kommunikation | UART (TTL-Pegel) |
| Baudrate | 9600 bps (Standard) |
| Datenformat | 8N1 (8 Datenbits, keine Parität, 1 Stoppbit) |
| Versorgungsspannung | 3,3 V / 5 V |
| SPO2-Messbereich | 35% - 100% |
| Herzfrequenz-Messbereich | 30 - 250 BPM |
| Modbus-Geräteadresse | 0x20 |

---

## Modbus-Registerbeschreibung

| Registeradresse | Funktion | Beschreibung |
|---|---|---|
| 0x02 | Geräte-ID | Lesen: gibt 0x0020 zurück |
| 0x06-0x09 | Herzfrequenz- und SpO2-Daten | Lesen: SPO2 + Herzfrequenz |
| 0x0A | Temperatur | Lesen: Boardtemperatur |
| 0x10 | Erfassungssteuerung | Schreiben: 0x0001=Start, 0x0002=Stopp |
