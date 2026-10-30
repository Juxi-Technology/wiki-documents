---
title: "Raspberry Pi – Anleitung"
description: "MAX30102-Herzfrequenz-/SpO2-Modul am Raspberry Pi über I2C oder UART anschließen – mit Umgebungseinrichtung, Beispielcode, API und häufigen Fragen."
---

# Raspberry Pi – Anleitung

## Projektübersicht

JUXI_HeartRate_SPO2 ist ein Herzfrequenz- und SpO2-Sensormodul auf Basis des MAX30102-Chips; der integrierte Algorithmus gibt Herzfrequenz und Blutsauerstoffsättigung direkt aus.

**Hauptfunktionen:**

- Messung der Blutsauerstoffsättigung (SPO2)
- Herzfrequenzmessung (Schläge/min)
- Messung der Boardtemperatur
- Unterstützt die beiden Kommunikationsarten UART und I2C

---

## Hardwarevorbereitung

| Benötigtes Material | Beschreibung |
|---|---|
| Raspberry Pi (2/3/4/Zero) | Raspberry Pi 3B+ oder 4B empfohlen |
| JUXI_HeartRate_SPO2-Sensor | Herzfrequenz-/SpO2-Sensormodul |
| Jumper-Kabel (mehrere) | 4 Buchse-zu-Buchse-Jumper-Kabel |
| Netzteil | Spezielles Netzteil für den Raspberry Pi |

---

## Hardwareverbindung

### Variante 1: I2C-Kommunikation (empfohlen)

Die I2C-Verkabelung ist einfach; sie wird empfohlen.

![Abbildung](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/01.png)

| Sensor-Pin | Physischer Pin am Raspberry Pi | BCM-Nummer | Beschreibung |
|---|---|---|---|
| VCC | 1 oder 17 | - | 3,3-V-Versorgung (auch 5 V möglich) |
| GND | 6 oder 9 oder 14 | - | Masse |
| SDA | 3 | GPIO2 | I2C-Datenleitung |
| SCL | 5 | GPIO3 | I2C-Taktleitung |

**Wichtig:** Stellen Sie den Schiebeschalter am Sensor auf die Position **IIC**!

### Variante 2: UART-Seriellkommunikation

Die UART-Kommunikation erfordert gekreuzte Verbindungen.

![Abbildung](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/02.png)

| Sensor-Pin | Physischer Pin am Raspberry Pi | BCM-Nummer | Beschreibung |
|---|---|---|---|
| VCC | 2 oder 4 | - | 5-V-Versorgung (auch 3,3 V möglich) |
| GND | 6 oder 9 oder 14 | - | Masse |
| RX | 8 | GPIO14 | Sensor-RX an Raspberry-Pi-TX |
| TX | 10 | GPIO15 | Sensor-TX an Raspberry-Pi-RX |

**Wichtig:** Stellen Sie den Schiebeschalter am Sensor auf die Position **UART**!

![Abbildung](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/03.png)

---

## Umgebungseinrichtung

### 1. I2C aktivieren (für I2C-Modus erforderlich)

```bash
sudo raspi-config
```

Wählen Sie `Interface Options` → `I2C` → `Yes` zum Aktivieren

Raspberry Pi neu starten:

```bash
sudo reboot
```

### 2. Seriellen Port aktivieren (für UART-Modus erforderlich)

```bash
sudo raspi-config
```

Wählen Sie `Interface Options` → `Serial`

- Erste Frage: "Would you like a login shell to be accessible over serial?" → `No` wählen
- Zweite Frage: "Would you like the serial port hardware to be enabled?" → `Yes` wählen

Raspberry Pi neu starten:

```bash
sudo reboot
```

### 3. Abhängigkeiten installieren

```bash
# 更新软件源
sudo apt-get update

# 安装 I2C 工具和 smbus2 库（I2C 模式必须使用 smbus2）
sudo apt-get install -y i2c-tools python3-smbus2

# 安装 pyserial（串口支持）
sudo pip3 install pyserial
```

> **Hinweis:** Für den I2C-Modus muss `smbus2` installiert sein; das alte `python-smbus` darf nicht verwendet werden.
Intern verwendet die Bibliothek `smbus2.i2c_msg`, um eigenständige zweistufige I2C-Transaktionen umzusetzen (zuerst die Registeradresse schreiben und STOP senden,
dann eine neue Lese-Transaktion starten und mehrere Bytes kontinuierlich lesen), um die I2C-Timing-Anforderungen des Sensorchips zu erfüllen.

### 4. I2C-Verbindung prüfen (I2C-Modus)

Nach dem Verkabeln den folgenden Befehl ausführen, um I2C-Geräte zu erkennen:

```bash
i2cdetect -y 1
```

Wenn die Adresse `0x57` erscheint, ist der Sensor erfolgreich verbunden.

---

## Verwendung des Beispielcodes

[JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)

### Dateistruktur

```bash
python/raspberry/
├── JUXI_HeartRate_SPO2.py      # 主库文件
└── examples/
    ├── i2c_example.py          # I2C 模式示例
    └── uart_example.py         # UART 模式示例
```

### I2C-Modus-Beispiel ausführen

```bash
cd python/raspberry/examples
```

```bash
sudo python3 i2c_example.py
```

### UART-Modus-Beispiel ausführen

```bash
cd python/raspberry/examples
```

```bash
sudo python3 uart_example.py
```

**Hinweis:** Für die Verwendung der Hardware-Seriellschnittstelle sind `sudo`-Rechte erforderlich.

### Ausgabe

Bei ordnungsgemäßem Ablauf erscheint eine Ausgabe ähnlich der folgenden:

```bash
==================================================
JUXI 心率血氧传感器 - I2C 模式
==================================================

正在初始化 I2C 总线 1，地址 0x57...
传感器初始化成功！

开始数据采集...
传感器 LED 已亮起！

请将手指放在传感器上...

血氧饱和度: 98 %
心率: 72 次/分钟
板载温度: 25.5 ℃
...
```

Drücken Sie `Ctrl+C`, um das Programm zu beenden.

---

## API-Referenz

### Klasse: JUXI_HeartRate_SPO2_i2c

Sensor-Klasse für die I2C-Kommunikation.

**Konstruktor**

`JUXI_HeartRate_SPO2_i2c(bus_number=1, i2c_address=0x57)`

Parameter:

- `bus_number`: I2C-Busnummer, beim Raspberry Pi üblicherweise 1
- `i2c_address`: I2C-Adresse des Sensors, Standard 0x57

**Methoden**

| Methode | Beschreibung | Rückgabewert |
|---|---|---|
| begin() | Initialisiert den Sensor und prüft die Verbindung | bool (bei Erfolg True) |
| sensor_start_collect() | Startet die Datenerfassung (Sensor-LED leuchtet) | keiner |
| sensor_end_collect() | Stoppt die Datenerfassung (Sensor-LED erlischt) | keiner |
| get_heartbeat_SPO2() | Liest Herzfrequenz- und SpO2-Daten | keiner (Ergebnisse werden in Objektattributen gespeichert) |
| get_temperature_c() | Liest die Boardtemperatur | float (Grad Celsius) |
| close() | Schließt die I2C-Verbindung | keiner |

**Attribute**

| Attribut | Beschreibung |
|---|---|
| SPO2 | Blutsauerstoffsättigung (%), ungültiger Wert ist -1 |
| heartbeat | Herzfrequenz (Schläge/min), ungültiger Wert ist -1 |

---

### Klasse: JUXI_HeartRate_SPO2_uart

Sensor-Klasse für die UART-Seriellkommunikation.

**Konstruktor**

`JUXI_HeartRate_SPO2_uart(port='/dev/serial0', baudrate=9600)`

Parameter:

- `port`: Gerätepfad des seriellen Ports, beim Raspberry Pi standardmäßig `/dev/serial0`
- `baudrate`: Baudrate, Standard 9600

**Methoden**

Identisch mit `JUXI_HeartRate_SPO2_i2c`.

---

## Häufige Fragen

### F1: Was tun, wenn die Sensorinitialisierung fehlschlägt?

**A:** Prüfen Sie bitte die folgenden Punkte:

1. **Verkabelung prüfen**
  - I2C-Modus: SDA an GPIO2, SCL an GPIO3
  - UART-Modus: gekreuzte RX-TX-Verbindung prüfen

1. **Schiebeschalter des Sensors prüfen**
  - I2C-Modus: Schalter muss auf IIC stehen
  - UART-Modus: Schalter muss auf UART stehen

1. **Stromversorgung prüfen**
  - VCC an 3,3 V oder 5 V anschließen
  - GND muss verbunden sein

1. **Systemeinstellungen prüfen**
  - I2C-Modus: I2C muss aktiviert sein
  - UART-Modus: serieller Port muss aktiviert sein

1. **Erkennungsbefehle verwenden**

```bash
# I2C 模式
i2cdetect -y 1

# UART 模式
ls /dev/serial*
```

### F2: Was tun, wenn die Daten dauerhaft -1 anzeigen?

**A:**

1. Prüfen Sie, ob der Finger richtig auf dem Sensor liegt und beide LEDs vollständig bedeckt
1. Warten Sie einige Sekunden, bis sich die Daten stabilisiert haben (üblicherweise 10-30 Sekunden)
1. Prüfen Sie, ob `sensor_start_collect()` zur Erfassung aufgerufen wurde
1. Prüfen Sie, ob die Sensor-LED leuchtet

### F3: Was tun, wenn die Daten ungenau sind?

**A:**

1. Stellen Sie sicher, dass der Finger den optischen Bereich des Sensors vollständig bedeckt
1. Halten Sie den Finger ruhig und bewegen Sie ihn nicht
1. Warten Sie mindestens 30 Sekunden, bis sich die Daten stabilisiert haben
1. Führen Sie mehrere Messungen durch und bilden Sie den Mittelwert
1. Direktes starkes Licht auf den Sensor vermeiden

### F4: Können I2C und UART gleichzeitig verwendet werden?

**A:** Nein, es kann jeweils nur eine Kommunikationsart gewählt werden.

### F5: Muss das Programm mit sudo ausgeführt werden?

**A:**

- I2C-Modus: sudo wird empfohlen, um Berechtigungsprobleme zu vermeiden
- UART-Modus: sudo ist erforderlich, sonst ist kein Zugriff auf den seriellen Port möglich

---

## Hinweise

### Messtipps

1. **Finger richtig auflegen**
  - Legen Sie den Finger leicht auf den Sensor und bedecken Sie beide LEDs
  - Nicht fest drücken, um die Blutzirkulation nicht zu beeinträchtigen
  - Halten Sie den Finger ruhig und bewegen Sie ihn nicht

1. **Auf stabile Daten warten**
  - Zu Beginn der Messung können die Werte instabil sein
  - Warten Sie 10-30 Sekunden, bis sich die Daten stabilisiert haben, bevor Sie sie ablesen
  - Der Sensor aktualisiert die Daten alle 4 Sekunden

1. **Umgebungsanforderungen**
  - Direktes starkes Licht auf den Sensor vermeiden
  - Eine angenehme Umgebungstemperatur beibehalten
  - Während der Messung ruhig bleiben

### Interpretation der Daten

| SPO2-Bereich | Beschreibung |
|---|---|
| 95% - 100% | normal |
| 90% - 94% | leichte Hypoxämie |
| < 90% | Hypoxämie, Arztbesuch empfohlen |

| Herzfrequenzbereich | Beschreibung |
|---|---|
| 60 - 100 Schläge/min | Normalbereich bei Erwachsenen |
| < 60 Schläge/min | Bradykardie |
| > 100 Schläge/min | Tachykardie |

### Sicherheitshinweise

- Dieser Sensor dient nur als Referenz und ersetzt kein professionelles medizinisches Gerät
- Bei gesundheitlichen Problemen suchen Sie bitte rechtzeitig einen Arzt auf
- Die Messergebnisse dienen nur als Referenz und nicht als Grundlage für Diagnosen
