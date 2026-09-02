---
title: Heart Rate & SpO2 Sensor
description: "Juxi Technology MAX30102 Heart Rate & SpO2 Sensor Module — Arduino / Python Tutorial"
---

# Heart Rate & SpO2 Sensor

## Overview

The Juxi Technology Heart Rate & SpO2 Sensor is based on the MAX30102 chip, supporting both IIC and UART communication modes for real-time heart rate and blood oxygen saturation data collection. It includes an Arduino library and Python SDK (Raspberry Pi / Windows / Jetson), along with a visual host application.

**Features**:
- MAX30102 high-precision heart rate & SpO2 chip
- Dual communication modes: IIC and UART
- Arduino library + Python SDK
- Windows visual host application
- Open source: [GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## Specifications

| Parameter | Detail |
|-----------|--------|
| Chip | MAX30102 |
| Measurements | Heart Rate (HR) / Blood Oxygen Saturation (SpO2) |
| Communication | IIC (0x57) / UART (9600bps) |
| Operating Voltage | 3.3V - 5V |
| Development Support | Arduino / Python (RPi / Windows / Jetson) |

## Quick Start

### Wiring

**IIC Wiring**:

![IIC Wiring Diagram](../../../public/images/tutorials/accessories/heart-rate-spo2/IIC.png)

| MAX30102 | Arduino / Raspberry Pi |
|----------|------------------------|
| VCC | 3.3V / 5V |
| GND | GND |
| SCL | SCL (I2C Clock) |
| SDA | SDA (I2C Data) |

**UART Wiring**:

![UART Wiring Diagram](../../../public/images/tutorials/accessories/heart-rate-spo2/UART.png)

| MAX30102 | Arduino UNO |
|----------|-------------|
| VCC | VCC |
| GND | GND |
| TX | Pin 4 |
| RX | Pin 5 |

### Arduino Example

Install the library: copy `JUXI_HeartRate_SPO2.h` and `.cpp` from the repo `src/` directory into your Arduino libraries folder.

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

### Python Example (Raspberry Pi / Jetson)

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

## Host Application

Juxi Technology provides a Windows visual host application for real-time heart rate and SpO2 waveform display:

![Host Application Screenshot](../../../public/images/tutorials/accessories/heart-rate-spo2/心率模块上位机.png)

- Repo path: `HeartRateOximeter/上位机源代码/HeartRateOximeter.py`
- Download: [GitHub Releases](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## FAQ

**Q: Initialization fails (init fail)?**

**A:** Verify wiring is correct. For IIC mode, check the device address (default 0x57). For UART mode, confirm the baud rate is 9600.

**Q: Unstable readings?**

**A:** Ensure the sensor has good skin contact. Keep your finger steady on the sensor and avoid movement.

**Q: How to use on Windows?**

**A:** Refer to the example code and documentation in the repo's `python/windows/` directory.

## Support

- Email: support@juxitech.com
- Website: [www.juxitech.com](https://www.juxitech.com)
- Open Source Repository: [GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)
