---
title: "Arduino 使用教程"
description: "在 Arduino 上使用 JUXI_HeartRate_SPO2 庫讀取心率、血氧與板載溫度，含接線、範例程式碼、API 與常見問題。"
---

# Arduino 使用教程

## 傳感器簡介

JUXI_HeartRate_SPO2 是一款基於 MAX30102 晶片的心率血氧傳感器模組，內置演算法可直接輸出心率和血氧飽和度數值。

**主要功能：**

- 血氧飽和度（SPO2）測量
- 心率測量（次/分鐘）
- 板載溫度測量
- 支援 I2C 通訊方式

---

## Arduino 使用教程

### 硬體準備

| 所需材料 |
|---|
| Arduino 開發板（Uno/ESP32 等） |
| JUXI_HeartRate_SPO2 傳感器 |
| 杜邦線若干 |
| USB 數據線（Arduino 連接到電腦上） |

### 庫安裝

1. 下載本庫檔案 [JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)
1. 將壓縮包解壓並複製到 Arduino 庫目錄：
  - Windows: `C:\Users\使用者名稱\Documents\Arduino\libraries\`
  - Mac: `~/Documents/Arduino/libraries/`
  - Linux: `~/Arduino/libraries/`

1. 重新啟動 Arduino IDE

### 範例程式碼上傳

> 注意上傳程式碼時，只連接 Arduino 到電腦上，Arduino 不連接心率血氧監測模組！

#### 方式一：UART 模式範例

註釋掉 #define I2C_COMMUNICATION，上傳程式碼到 Arduino 裡

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

##### 硬體連接

I2C 通訊

![圖示](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/01.png)

![圖示](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/02.png)

| 傳感器引腳 | Arduino |
|---|---|
| VCC | 5V/3.3V |
| GND | GND |
| SDA | SDA/A4 |
| SCL | SCL/A5 |

- 將心率血氧監測模組撥片撥動到 IIC！！！
- 使用數據線將 Arduino 連接到電腦上

#### 執行結果：

1、開啟 Arduino-工具-串口監視器

設定波特率為 9600

![圖示](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/03.png)

2、開啟串口調試助手

[串口調試助手 uartassist5.15.zip](https://juxitech.feishu.cn/wiki/BJlfwSQydi7u5lkRDQ6cV4dvnBd)

選擇串口號

設定波特率為`9600`

數據位`8`，停止位`1`，校驗位`NONE`，流控制`NONE`

接受設定和發送設定選擇`ASCII`

![圖示](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/04.png)

### API 說明

| 函數 | 說明 |
|---|---|
| begin() | 初始化傳感器，返回 true/false |
| getHeartbeatSPO2() | 讀取心率和血氧數據，存儲在 _sHeartbeatSPO2 結構體中 |
| getTemperature_C() | 讀取板載溫度（攝氏度） |
| sensorStartCollect() | 開始數據採集（傳感器亮燈） |
| sensorEndCollect() | 停止數據採集（傳感器關燈） |

### 數據說明

- **SPO2（血氧飽和度）**: 正常範圍 95% - 100%，值為 -1 表示無效
- **Heartbeat（心率）**: 正常範圍 60 - 100 次/分鐘，值為 -1 表示無效
- **無效值原因**: 手指未放置好或數據未穩定

---

## 使用注意事項

### 測量技巧

1. **正確放置手指**
  - 將手指輕輕放在傳感器上，覆蓋兩個 LED 燈
  - 不要用力按壓，以免影響血液循環
  - 保持手指穩定，不要移動

1. **等待數據穩定**
  - 剛開始測量時，數值可能不穩定
  - 建議等待 10-30 秒，待數據穩定後再讀取
  - 傳感器每 4 秒更新一次數據

1. **環境要求**
  - 避免強光直射傳感器
  - 保持環境溫度適宜
  - 測量時保持安靜

### 數據解讀

| SPO2 範圍 | 說明 |
|---|---|
| 95% - 100% | 正常 |
| 90% - 94% | 輕度低氧 |
| < 90% | 低氧，建議就醫 |

| 心率範圍 | 說明 |
|---|---|
| 60 - 100 次/分 | 成人正常範圍 |
| < 60 次/分 | 心動過緩 |
| > 100 次/分 | 心動過速 |

---

## 常見問題

### Q1: 傳感器初始化失敗怎麼辦？

**A:**

1. 檢查接線是否正確（SDA 接 GPIO2/A4，SCL 接 GPIO3/A5）
1. 確認電源是否正常（3.3V 或 5V）
1. 使用 `i2cdetect -y 1` 命令檢測裝置
1. 確認傳感器撥片在 IIC 位置

### Q2: 數據一直顯示 -1 怎麼辦？

**A:**

1. 確認手指已正確放置在傳感器上
1. 等待幾秒鐘讓數據穩定
1. 檢查是否已調用 `sensorStartCollect()` 開啟採集
1. 確認傳感器指示燈是否亮起

### Q3: 數據不準確怎麼辦？

**A:**

1. 確保手指完全覆蓋傳感器光學區域
1. 保持手指靜止，不要移動
1. 等待 30 秒以上讓數據穩定
1. 多次測量取平均值

### Q4: 傳感器支援哪些 Arduino 開發板？

**A:** 支援：

- Arduino Uno/Mega
- ESP8266
- ESP32
- 其他支援 Arduino 環境的開發板

---

## 範例檔案位置

### Arduino 範例

```text
JUXI_HeartRate_SPO2/
└── examples/
    └── gainHeartbeatSPO2/
        └── gainHeartbeatSPO2.ino
```
