---
title: 心拍・血中酸素濃度センサー
description: "JUXI MAX30102 心拍・血中酸素濃度センサーモジュール Arduino / Python 使用チュートリアル"
---

# 心拍・血中酸素濃度センサー

## 製品概要

JUXI 心拍・血中酸素濃度センサーは MAX30102 チップを搭載し、IIC と UART の2つの通信モードに対応し、心拍数と血中酸素飽和度をリアルタイムに取得できます。Arduino ライブラリと Python SDK(ラズベリーパイ / Windows / Jetson)、可視化アプリを提供します。

**特長**:
- MAX30102 高精度心拍・血中酸素濃度チップ
- IIC / UART の2つの通信モード
- Arduino ライブラリ + Python SDK
- Windows 可視化アプリ
- オープンソースコード: [GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## 製品仕様

| 項目 | 仕様 |
|------|------|
| チップ | MAX30102 |
| 測定項目 | 心拍数 (HR) / 血中酸素飽和度 (SpO2) |
| 通信インターフェース | IIC (0x57) / UART (9600bps) |
| 動作電圧 | 3.3V - 5V |
| 開発サポート | Arduino / Python (RPi / Windows / Jetson) |

## クイックスタート

### 配線

**IIC 配線**:

![IIC 配線図](../../../../public/images/tutorials/accessories/heart-rate-spo2/IIC.png)

| MAX30102 | Arduino / Raspberry Pi |
|----------|-----------------|
| VCC | 3.3V / 5V |
| GND | GND |
| SCL | SCL (I2C Clock) |
| SDA | SDA (I2C Data) |

**UART 配線**:

![UART 配線図](../../../../public/images/tutorials/accessories/heart-rate-spo2/UART.png)

| MAX30102 | Arduino UNO |
|----------|------------|
| VCC | VCC |
| GND | GND |
| TX | Pin 4 |
| RX | Pin 5 |

### Arduino コード例

ライブラリのインストール: リポジトリの `src/` にある `JUXI_HeartRate_SPO2.h` と `.cpp` を Arduino の libraries ディレクトリにコピーします。

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

### Python コード例(Raspberry Pi / Jetson)

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

## 可視化アプリ

JUXI は心拍と血中酸素の波形をリアルタイム表示できる Windows 可視化アプリを提供しています:

![可視化アプリのスクリーンショット](../../../../public/images/tutorials/accessories/heart-rate-spo2/心率模块上位机.png)

- リポジトリパス: `HeartRateOximeter/上位机源代码/HeartRateOximeter.py`
- ダウンロード: [GitHub Releases](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## よくある質問

**Q: 初期化に失敗する(init fail)?**

**A:** 配線を確認してください。IIC モードではデバイスアドレス(デフォルト 0x57)を確認します。UART モードではボーレートが 9600 であることを確認してください。

**Q: 測定値が不安定?**

**A:** センサーと皮膚がしっかり密着していることを確認してください。指をセンサー上に安定して置き、動かさないようにしてください。

**Q: Windows ではどう使う?**

**A:** リポジトリの `python/windows/` ディレクトリにあるサンプルコードとドキュメントを参照してください。

## 技術サポート

- メール：support@juxitech.com
- 公式サイト：[www.juxitech.com](https://www.juxitech.com)
- オープンソースリポジトリ：[GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)
