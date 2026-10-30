---
title: "Arduino – Anleitung"
description: "Herzfrequenz, SpO2 und Boardtemperatur auf Arduino mit der Bibliothek JUXI_HeartRate_SPO2 auslesen – mit Verkabelung, Beispielcode, API und häufigen Fragen."
---

# Arduino – Anleitung

## Sensorübersicht

JUXI_HeartRate_SPO2 ist ein Herzfrequenz- und SpO2-Sensormodul auf Basis des MAX30102-Chips; der integrierte Algorithmus gibt Herzfrequenz und Blutsauerstoffsättigung direkt aus.

**Hauptfunktionen:**

- Messung der Blutsauerstoffsättigung (SPO2)
- Herzfrequenzmessung (Schläge/min)
- Messung der Boardtemperatur
- Unterstützt I2C-Kommunikation

---

## Arduino – Anleitung

### Hardwarevorbereitung

| Benötigtes Material |
|---|
| Arduino-Board (Uno/ESP32 usw.) |
| JUXI_HeartRate_SPO2-Sensor |
| Jumper-Kabel (mehrere) |
| USB-Datenkabel (Arduino mit dem Computer verbunden) |

### Bibliotheksinstallation

1. Laden Sie die Bibliotheksdatei herunter: [JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)
1. Entpacken Sie das Archiv und kopieren Sie es in das Arduino-Bibliotheksverzeichnis:
  - Windows: `C:\Users\用户名\Documents\Arduino\libraries\`
  - Mac: `~/Documents/Arduino/libraries/`
  - Linux: `~/Arduino/libraries/`

1. Starten Sie die Arduino IDE neu

### Beispielcode hochladen

> Achtung: Beim Hochladen des Codes nur den Arduino an den Computer anschließen, das Herzfrequenz-/SpO2-Messmodul nicht mit dem Arduino verbinden!

#### Variante 1: UART-Modus-Beispiel

Kommentieren Sie #define I2C_COMMUNICATION aus und laden Sie den Code auf den Arduino.

```cpp
#include "JUXI_HeartRate_SPO2.h"

// I2C 地址
#define I2C_ADDRESS 0x57

// 创建传感器对象，I2C模式
JUXI_HeartRate_SPO2_I2C sensor(&Wire, I2C_ADDRESS);

void setup() {
  Serial.begin(9600);

  // 初始化传感器
  while (!sensor.begin()) {
    Serial.println("传感器初始化失败，请检查连接！");
    delay(1000);
  }
  Serial.println("传感器初始化成功！");

  // 启动数据采集
  sensor.sensorStartCollect();
}

void loop() {
  // 读取心率和血氧数据
  sensor.getHeartbeatSPO2();

  // 输出血氧饱和度
  Serial.print("血氧饱和度: ");
  Serial.print(sensor._sHeartbeatSPO2.SPO2);
  Serial.println(" %");

  // 输出心率
  Serial.print("心率: ");
  Serial.print(sensor._sHeartbeatSPO2.Heartbeat);
  Serial.println(" 次/分钟");

  // 读取并输出温度
  Serial.print("板载温度: ");
  Serial.print(sensor.getTemperature_C());
  Serial.println(" ℃");

  Serial.println("------------------------");

  // 传感器每4秒更新一次数据
  delay(4000);
}
```

##### Hardwareverbindung

I2C-Kommunikation

![Abbildung](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/01.png)

![Abbildung](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/02.png)

| Sensor-Pin | Arduino |
|---|---|
| VCC | 5V/3.3V |
| GND | GND |
| SDA | SDA/A4 |
| SCL | SCL/A5 |

- Stellen Sie den Schiebeschalter des Herzfrequenz-/SpO2-Messmoduls auf IIC!!!
- Verbinden Sie den Arduino mit dem Datenkabel mit dem Computer

#### Ergebnis:

1. Öffnen Sie die Arduino IDE unter Werkzeuge → Serieller Monitor

Stellen Sie die Baudrate auf 9600 ein

![Abbildung](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/03.png)

2. Öffnen Sie den seriellen Debug-Assistenten

[Serieller Debug-Assistent uartassist5.15.zip](https://juxitech.feishu.cn/wiki/BJlfwSQydi7u5lkRDQ6cV4dvnBd)

Wählen Sie den COM-Port

Stellen Sie die Baudrate auf `9600` ein

Datenbits `8`, Stoppbit `1`, Parität `NONE`, Flusskontrolle `NONE`

Für Empfangs- und Sendeeinstellungen `ASCII` wählen

![Abbildung](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/04.png)

### API-Übersicht

| Funktion | Beschreibung |
|---|---|
| begin() | Initialisiert den Sensor, gibt true/false zurück |
| getHeartbeatSPO2() | Liest Herzfrequenz- und SpO2-Daten und speichert sie in der Struktur _sHeartbeatSPO2 |
| getTemperature_C() | Liest die Boardtemperatur (Grad Celsius) |
| sensorStartCollect() | Startet die Datenerfassung (Sensor-LED leuchtet) |
| sensorEndCollect() | Stoppt die Datenerfassung (Sensor-LED erlischt) |

### Datenhinweise

- **SPO2 (Blutsauerstoffsättigung)**: Normalbereich 95% - 100%, der Wert -1 bedeutet ungültig
- **Heartbeat (Herzfrequenz)**: Normalbereich 60 - 100 Schläge/min, der Wert -1 bedeutet ungültig
- **Ursache für ungültige Werte**: Finger nicht richtig aufgelegt oder Daten noch nicht stabil

---

## Hinweise zur Verwendung

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

---

## Häufige Fragen

### F1: Was tun, wenn die Sensorinitialisierung fehlschlägt?

**A:**

1. Prüfen Sie die Verkabelung (SDA an GPIO2/A4, SCL an GPIO3/A5)
1. Prüfen Sie die Stromversorgung (3,3 V oder 5 V)
1. Detektieren Sie das Gerät mit dem Befehl `i2cdetect -y 1`
1. Prüfen Sie, ob der Schiebeschalter des Sensors auf IIC steht

### F2: Was tun, wenn die Daten dauerhaft -1 anzeigen?

**A:**

1. Prüfen Sie, ob der Finger richtig auf dem Sensor liegt
1. Warten Sie einige Sekunden, bis sich die Daten stabilisiert haben
1. Prüfen Sie, ob `sensorStartCollect()` zur Erfassung aufgerufen wurde
1. Prüfen Sie, ob die Sensor-LED leuchtet

### F3: Was tun, wenn die Daten ungenau sind?

**A:**

1. Stellen Sie sicher, dass der Finger den optischen Bereich des Sensors vollständig bedeckt
1. Halten Sie den Finger ruhig und bewegen Sie ihn nicht
1. Warten Sie mindestens 30 Sekunden, bis sich die Daten stabilisiert haben
1. Führen Sie mehrere Messungen durch und bilden Sie den Mittelwert

### F4: Welche Arduino-Boards werden unterstützt?

**A:** Unterstützt werden:

- Arduino Uno/Mega
- ESP8266
- ESP32
- Andere Boards mit Arduino-Unterstützung

---

## Speicherort der Beispieldateien

### Arduino-Beispiel

```text
JUXI_HeartRate_SPO2/
└── examples/
    └── gainHeartbeatSPO2/
        └── gainHeartbeatSPO2.ino
```
