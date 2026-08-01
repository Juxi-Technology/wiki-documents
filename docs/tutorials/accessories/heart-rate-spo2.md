---
title: 心率血氧传感器
description: "钜犀科技 MAX30102 心率血氧传感器模块 Arduino / Python 使用教程"
---

# 心率血氧传感器

## 产品概述

钜犀科技心率血氧传感器基于 MAX30102 芯片，支持 IIC 和 UART 双通信模式，可实时采集心率和血氧饱和度数据。提供 Arduino 库和 Python SDK（树莓派 / Windows / Jetson），附带可视化上位机。

**特性**：
- MAX30102 高精度心率血氧芯片
- IIC 和 UART 双通信模式
- Arduino 库 + Python SDK
- Windows 可视化上位机
- 开源代码：[GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## 产品规格

| 参数 | 规格 |
|------|------|
| 芯片 | MAX30102 |
| 测量参数 | 心率 (HR) / 血氧饱和度 (SpO2) |
| 通信接口 | IIC (0x57) / UART (9600bps) |
| 工作电压 | 3.3V - 5V |
| 开发支持 | Arduino / Python (RPi / Windows / Jetson) |

## 快速开始

### 接线说明

**IIC 接线**：

![IIC 接线图](../../public/images/tutorials/accessories/heart-rate-spo2/IIC.png)

| MAX30102 | Arduino / 树莓派 |
|----------|-----------------|
| VCC | 3.3V / 5V |
| GND | GND |
| SCL | SCL (I2C Clock) |
| SDA | SDA (I2C Data) |

**UART 接线**：

![UART 接线图](../../public/images/tutorials/accessories/heart-rate-spo2/UART.png)

| MAX30102 | Arduino UNO |
|----------|------------|
| VCC | VCC |
| GND | GND |
| TX | Pin 4 |
| RX | Pin 5 |

### Arduino 代码示例

安装库：将仓库 `src/` 中的 `JUXI_HeartRate_SPO2.h` 和 `.cpp` 文件复制到 Arduino libraries 目录。

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

### Python 代码示例（树莓派 / Jetson）

```python
import sys
import os
import time
sys.path.append(os.path.dirname(os.path.realpath(__file__)))
from JUXI_HeartRate_SPO2 import *

# 选择通信模式：ctype=0 为 IIC，ctype=1 为 UART
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
        print("程序结束")
```

## 上位机

钜犀科技提供 Windows 可视化上位机，可实时显示心率和血氧波形：

![上位机截图](../../public/images/tutorials/accessories/heart-rate-spo2/心率模块上位机.png)

- 仓库路径：`HeartRateOximeter/上位机源代码/HeartRateOximeter.py`
- 下载：[GitHub Releases](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## 常见问题

**Q: 初始化失败（init fail）？**
确认接线正确，IIC 模式下检查设备地址（默认 0x57）。UART 模式下确认波特率为 9600。

**Q: 数据读数不稳定？**
确保传感器与皮肤接触良好。手指应平稳放置在传感器上，避免移动。

**Q: 如何在 Windows 上使用？**
参考仓库 `python/windows/` 目录下的示例代码和说明文档。

## 技术支持

- 邮箱：support@juxitech.com
- 官方网站：[www.juxitech.com](https://www.juxitech.com)
- 开源仓库：[GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)
