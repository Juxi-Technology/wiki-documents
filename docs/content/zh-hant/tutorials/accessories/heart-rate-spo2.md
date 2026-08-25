---
title: 心率血氧感測器
description: "鉅犀科技 MAX30102 心率血氧感測器模組 Arduino / Python 使用教學"
---

# 心率血氧感測器

## 產品概述

鉅犀科技心率血氧感測器基於 MAX30102 晶片，支援 IIC 和 UART 雙通訊模式，可實時採集心率和血氧飽和度數據。提供 Arduino 庫和 Python SDK（樹莓派 / Windows / Jetson），附帶視覺化上位機。

**特性**：
- MAX30102 高精度心率血氧晶片
- IIC 和 UART 雙通訊模式
- Arduino 庫 + Python SDK
- Windows 視覺化上位機
- 開源程式碼：[GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## 產品規格

| 參數 | 規格 |
|------|------|
| 晶片 | MAX30102 |
| 測量參數 | 心率 (HR) / 血氧飽和度 (SpO2) |
| 通訊介面 | IIC (0x57) / UART (9600bps) |
| 工作電壓 | 3.3V - 5V |
| 開發支援 | Arduino / Python (RPi / Windows / Jetson) |

## 快速開始

### 接線說明

**IIC 接線**：

![IIC 接線圖](../../../../public/images/tutorials/accessories/heart-rate-spo2/IIC.png)

| MAX30102 | Arduino / 樹莓派 |
|----------|-----------------|
| VCC | 3.3V / 5V |
| GND | GND |
| SCL | SCL (I2C Clock) |
| SDA | SDA (I2C Data) |

**UART 接線**：

![UART 接線圖](../../../../public/images/tutorials/accessories/heart-rate-spo2/UART.png)

| MAX30102 | Arduino UNO |
|----------|------------|
| VCC | VCC |
| GND | GND |
| TX | Pin 4 |
| RX | Pin 5 |

### Arduino 程式碼範例

安裝庫：將倉庫 `src/` 中的 `JUXI_HeartRate_SPO2.h` 和 `.cpp` 檔案複製到 Arduino libraries 目錄。

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

### Python 程式碼範例（樹莓派 / Jetson）

```python
import sys
import os
import time
sys.path.append(os.path.dirname(os.path.realpath(__file__)))
from JUXI_HeartRate_SPO2 import *

# 選擇通訊模式：ctype=0 為 IIC，ctype=1 為 UART
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
        print("程式結束")
```

## 上位機

鉅犀科技提供 Windows 視覺化上位機，可實時顯示心率和血氧波形：

![上位機截圖](../../../../public/images/tutorials/accessories/heart-rate-spo2/心率模块上位机.png)

- 倉庫路徑：`HeartRateOximeter/上位机源代码/HeartRateOximeter.py`
- 下載：[GitHub Releases](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## 常見問題

**Q: 初始化失敗（init fail）？**
確認接線正確，IIC 模式下檢查裝置位址（預設 0x57）。UART 模式下確認波特率為 9600。

**Q: 數據讀數不穩定？**
確保感測器與皮膚接觸良好。手指應平穩放置在感測器上，避免移動。

**Q: 如何在 Windows 上使用？**
參考倉庫 `python/windows/` 目錄下的範例程式碼和說明文件。

## 技術支援

- 電郵：support@juxitech.com
- 官方網站：[www.juxitech.com](https://www.juxitech.com)
- 開源倉庫：[GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)
