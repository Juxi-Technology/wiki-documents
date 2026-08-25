---
title: 심박·혈중 산소 포화도 센서
description: "JUXI MAX30102 심박·혈중 산소 포화도 센서 모듈 Arduino / Python 사용 튜토리얼"
---

# 심박·혈중 산소 포화도 센서

## 제품 개요

JUXI 심박·혈중 산소 포화도 센서는 MAX30102 칩을 기반으로 IIC 및 UART 이중 통신 모드를 지원하며, 심박수와 혈중 산소 포화도를 실시간으로 수집할 수 있습니다. Arduino 라이브러리와 Python SDK(라즈베리파이 / Windows / Jetson), 시각화 프로그램을 제공합니다.

**특징**:
- MAX30102 고정밀 심박·혈중 산소 포화도 칩
- IIC / UART 이중 통신 모드
- Arduino 라이브러리 + Python SDK
- Windows 시각화 프로그램
- 오픈소스 코드: [GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## 제품 사양

| 항목 | 사양 |
|------|------|
| 칩 | MAX30102 |
| 측정 항목 | 심박수 (HR) / 혈중 산소 포화도 (SpO2) |
| 통신 인터페이스 | IIC (0x57) / UART (9600bps) |
| 동작 전압 | 3.3V - 5V |
| 개발 지원 | Arduino / Python (RPi / Windows / Jetson) |

## 빠른 시작

### 배선

**IIC 배선**:

![IIC 배선도](../../../../public/images/tutorials/accessories/heart-rate-spo2/IIC.png)

| MAX30102 | Arduino / Raspberry Pi |
|----------|-----------------|
| VCC | 3.3V / 5V |
| GND | GND |
| SCL | SCL (I2C Clock) |
| SDA | SDA (I2C Data) |

**UART 배선**:

![UART 배선도](../../../../public/images/tutorials/accessories/heart-rate-spo2/UART.png)

| MAX30102 | Arduino UNO |
|----------|------------|
| VCC | VCC |
| GND | GND |
| TX | Pin 4 |
| RX | Pin 5 |

### Arduino 코드 예제

라이브러리 설치: 저장소 `src/` 폴더의 `JUXI_HeartRate_SPO2.h`와 `.cpp` 파일을 Arduino libraries 디렉터리에 복사합니다.

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

### Python 코드 예제(Raspberry Pi / Jetson)

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

## 프로그램(上位机)

JUXI는 심박과 혈중 산소 파형을 실시간으로 표시하는 Windows 시각화 프로그램을 제공합니다:

![프로그램 스크린샷](../../../../public/images/tutorials/accessories/heart-rate-spo2/心率模块上位机.png)

- 저장소 경로: `HeartRateOximeter/上位机源代码/HeartRateOximeter.py`
- 다운로드: [GitHub Releases](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## 자주 묻는 질문

**Q: 초기화 실패(init fail)?**
배선을 확인하세요. IIC 모드에서는 디바이스 주소(기본 0x57)를 확인합니다. UART 모드에서는 보율이 9600인지 확인합니다.

**Q: 측정값이 불안정한가요?**
센서가 피부에 잘 밀착되었는지 확인하세요. 손가락을 센서 위에 안정적으로 올리고 움직이지 않도록 하세요.

**Q: Windows에서 어떻게 사용하나요?**
저장소 `python/windows/` 디렉터리의 샘플 코드와 설명 문서를 참조하세요.

## 기술 지원

- 이메일：support@juxitech.com
- 공식 사이트：[www.juxitech.com](https://www.juxitech.com)
- 오픈소스 저장소：[GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)
