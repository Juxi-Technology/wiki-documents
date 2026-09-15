---
title: "Herzfrequenz- und SpO2-Sensor"
description: "Anleitung zum JUXI MAX30102 Herzfrequenz- und SpO2-Sensormodul (Arduino / Python)"
---

# Herzfrequenz- und SpO2-Sensor

## Produktübersicht

Der JUXI Herzfrequenz- und SpO2-Sensor basiert auf dem MAX30102-Chip, unterstützt IIC- und UART-Kommunikation und erfasst Herzfrequenz und Blutsauerstoffsättigung in Echtzeit. Enthält eine Arduino-Bibliothek und ein Python-SDK (Raspberry Pi / Windows / Jetson) sowie eine Visualisierungssoftware.

**Merkmale**:
- MAX30102-Hochpräzisionschip für Herzfrequenz und SpO2
- IIC- und UART-Kommunikation
- Arduino-Bibliothek + Python-SDK
- Windows-Visualisierungssoftware
- Open Source: [GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## Produktspezifikationen

| Parameter | Spezifikation |
|------|------|
| Chip | MAX30102 |
| Messgrößen | Herzfrequenz (HR) / Blutsauerstoffsättigung (SpO2) |
| Schnittstellen | IIC (0x57) / UART (9600 bps) |
| Betriebsspannung | 3,3 V – 5 V |
| Entwicklungsunterstützung | Arduino / Python (RPi / Windows / Jetson) |

## Schnellstart

### Verkabelung

**IIC-Verkabelung**:

![IIC-Verkabelung](../../../../public/images/tutorials/accessories/heart-rate-spo2/IIC.png)

| MAX30102 | Arduino / Raspberry Pi |
|----------|-----------------|
| VCC | 3,3 V / 5 V |
| GND | GND |
| SCL | SCL (I2C-Takt) |
| SDA | SDA (I2C-Daten) |

**UART-Verkabelung**:

![UART-Verkabelung](../../../../public/images/tutorials/accessories/heart-rate-spo2/UART.png)

| MAX30102 | Arduino UNO |
|----------|------------|
| VCC | VCC |
| GND | GND |
| TX | Pin 4 |
| RX | Pin 5 |

### Arduino-Codebeispiel

Bibliothek installieren: Kopieren Sie `JUXI_HeartRate_SPO2.h` und `.cpp` aus dem `src/`-Ordner des Repositories in das Arduino-libraries-Verzeichnis.

```cpp
#include "JUXI_HeartRate_SPO2.h"

#define I2C_COMMUNICATION
#define I2C_ADDRESS  0x57
JUXI_HeartRate_SPO2_I2C MAX30102(&Wire, I2C_ADDRESS);

void setup() {
  Serial.begin(9600);
  while (!MAX30102.begin()) {
    Serial.println("init fail!");
    delay(1000);
  }
  Serial.println("start measuring...");
}

void loop() {
  MAX30102.sensor_read_data();
  int heartRate = MAX30102.sensor_get_heartRate();
  int spo2 = MAX30102.sensor_get_spo2();

  if (heartRate > 0 && spo2 > 0) {
    Serial.print("Heart Rate: ");
    Serial.print(heartRate);
    Serial.print(" bpm, SpO2: ");
    Serial.print(spo2);
    Serial.println(" %");
  }
  delay(100);
}
```

### Python-Codebeispiel (Raspberry Pi / Jetson)

```python
import sys
import os
import time
sys.path.append(os.path.dirname(os.path.realpath(__file__)))
from JUXI_HeartRate_SPO2 import *

# Select communication mode: ctype=0 for IIC, ctype=1 for UART
ctype = 1

if ctype == 0:
    I2C_1 = 0x01
    I2C_ADDRESS = 0x57
    max30102 = JUXI_HeartRate_SPO2_i2c(I2C_1, I2C_ADDRESS)
else:
    max30102 = JUXI_HeartRate_SPO2_uart(9600)

def setup():
    while not max30102.begin():
        print("init fail!")
        time.sleep(1)
    print("start measuring...")
    max30102.sensor_start_collect()
    time.sleep(1)

def loop():
    max30102.sensor_read_data()
    hr = max30102.sensor_get_heartRate()
    spo2 = max30102.sensor_get_spo2()
    if hr > 0 and spo2 > 0:
        print(f"Heart Rate: {hr} bpm, SpO2: {spo2}%")
    time.sleep(0.1)

if __name__ == "__main__":
    setup()
    try:
        while True:
            loop()
    except KeyboardInterrupt:
        print("Program ended")
```

## Visualisierungssoftware

JUXI bietet eine Windows-Software, die Herzfrequenz- und SpO2-Kurven in Echtzeit anzeigt:

![Screenshot der Software](../../../../public/images/tutorials/accessories/heart-rate-spo2/心率模块上位机.png)

- Repository-Pfad: `HeartRateOximeter/上位机源代码/HeartRateOximeter.py`
- Download: [GitHub Releases](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## Häufige Fragen

**Q: Initialisierung schlägt fehl (init fail)?**

**A:** Prüfen Sie die Verkabelung. Im IIC-Modus die Geräteadresse prüfen (Standard 0x57). Im UART-Modus sicherstellen, dass die Baudrate 9600 beträgt.

**Q: Messwerte sind instabil?**

**A:** Stellen Sie sicher, dass der Sensor gut auf der Haut aufliegt. Legen Sie den Finger ruhig auf den Sensor und vermeiden Sie Bewegungen.

**Q: Wie verwende ich es unter Windows?**

**A:** Siehe die Beispiele und die Dokumentation im Ordner `python/windows/` des Repositories.

## Technischer Support

- E-Mail:support@juxitech.com
- Offizielle Website:[www.juxitech.com](https://www.juxitech.com)
- Open-Source-Repository:[GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)
