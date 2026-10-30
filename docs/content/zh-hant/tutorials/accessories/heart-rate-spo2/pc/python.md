---
title: "PC 端 · Python 執行"
description: "在 Windows 上透過 USB 轉 TTL 與 Python 腳本讀取 MAX30102 心率血氧數據，含驅動、COM 埠、執行步驟與 Modbus 寄存器。"
---

# PC 端 · Python 執行

## 目錄

1. 硬體準備
1. 硬體連接
1. 軟體環境配置
1. 執行範例程式
1. 常見問題

---

## 硬體準備

### 所需材料

| 材料 | 說明 |
|---|---|
| JUXI_HeartRate_SPO2 傳感器 | 心率血氧模組 |
| USB 轉 TTL 模組 | CH340 / CP2102 / FT232 等 |
| 杜邦線 | 4 根（母對母） |
| Windows 電腦 | Win7/Win10/Win11 |

---

## 硬體連接

### 接線方式

| 傳感器引腳 | USB 轉 TTL 引腳 | 說明 |
|---|---|---|
| VCC | 3.3V 或 5V | 電源正極 |
| GND | GND | 電源負極 |
| TX | RX | 傳感器發送 → 模組接收 |
| RX | TX | 傳感器接收 → 模組發送 |

![圖示](../../../../../../public/images/tutorials/accessories/heart-rate-spo2/pc-python/01.png)

⚠️ **重要提示**：

1. 模組撥片撥動到 UART！！！
1. **TX 和 RX 必須交叉連接！**
1. 傳感器支援 3.3V 和 5V，不要接錯電壓
1. 先接好所有線，再插入 USB 到電腦

### 接線示意圖

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

## 軟體環境配置

### 安裝驅動

根據你的 USB 轉 TTL 晶片型號，安裝對應的驅動：

- **CH340**: [https://sparks.gogo.co.nz/ch340.html](https://sparks.gogo.co.nz/ch340.html)
- **CP2102**: [https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
- **FT232**: [https://ftdichip.com/drivers/vcp-drivers/](https://ftdichip.com/drivers/vcp-drivers/)

安裝完成後，插入 USB 轉 TTL 模組。

### 查看 COM 埠

#### 方法一：裝置管理員

1. 按 `Win + X`，選擇「裝置管理員」
1. 展開「連接埠 (COM 和 LPT)」
1. 查看你的 USB 轉 TTL 對應的 COM 埠號（如 COM3）

#### 方法二：程式自動檢測

執行範例程式時，會自動列出所有可用串口。

### 安裝 Python 依賴

開啟命令提示字元（CMD）或 PowerShell，執行：

```bash
pip install pyserial
```

---

## 執行範例程式

下載壓縮包 [JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh) 並解壓

### 檔案位置

```text
JUXI_HeartRate_SPO2/python/windows/
├── gain_heartbeat_SPO2.py  ← 主程序（直接运行这个）
├── JUXI_HeartRate_SPO2_Windows.py
├── JUXI_RTU_Windows.py
└── README_CN.md        ← 本文件
└── README.md
```

### 執行步驟

1. **確認硬體連接正確**
  - VCC → 3.3V/5V
  - GND → GND
  - TX → RX（交叉）
  - RX → TX（交叉）

1. **插入 USB 到電腦**
1. **執行程式**

```bash
cd D:\JUXI_HeartRate_SPO2\python\windows
```

```bash
python gain_heartbeat_SPO2.py
```

1. **按照提示操作**
  - 程式會列出所有可用串口
  - 輸入你的 COM 埠號（如 COM3）
  - 程式自動檢測傳感器並開始測量

### 預期輸出

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

按 `Ctrl + C` 停止程式。

---

## 程式功能說明

### 主要API

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

## 常見問題

### Q1: 找不到 COM 埠怎麼辦？

**A:**

1. 檢查 USB 轉 TTL 是否插好
1. 重新安裝驅動程式
1. 換一個 USB 埠試試
1. 在裝置管理員中查看是否有「未知裝置」

### Q2: 傳感器初始化失敗怎麼辦？

**A:**

1. 檢查接線：
  - VCC 和 GND 是否接對
  - **TX 和 RX 是否交叉連接**（最常見問題）

1. 確認波特率是 9600
1. 檢查 USB 轉 TTL 模組是否正常工作
1. 重新插拔 USB

### Q3: 數據一直顯示 -1 怎麼辦？

**A:**

1. 確認手指正確放在傳感器上（完全覆蓋 LED 區域）
1. 保持手指穩定，不要移動
1. 等待幾秒鐘讓數據穩定
1. 檢查傳感器 LED 是否亮起

### Q4: LED 燈不亮但通訊正常？

**A:**

- 可能是 LED 燈硬體問題，但傳感器功能正常
- 只要數據正常，可以忽略 LED 不亮問題

### Q5: 串口被佔用怎麼辦？

**A:**

1. 關閉其他串口軟體（串口助手、Arduino IDE 等）
1. 檢查是否有其他 Python 程式正在執行
1. 重新插拔 USB

### Q6: 數據不準確怎麼辦？

**A:**

1. 確保手指完全覆蓋傳感器光學區域
1. 測量時保持安靜，不要說話或移動
1. 等待 30 秒以上讓數據穩定
1. 多次測量取平均值

---

## 技術規格

| 參數 | 規格 |
|---|---|
| 通訊方式 | UART (TTL 電平) |
| 波特率 | 9600 bps（預設） |
| 數據格式 | 8N1 (8 數據位, 無校驗, 1 停止位) |
| 供電電壓 | 3.3V / 5V |
| SPO2 測量範圍 | 35% - 100% |
| 心率測量範圍 | 30 - 250 BPM |
| Modbus 裝置位址 | 0x20 |

---

## Modbus 寄存器說明

| 寄存器地址 | 功能 | 說明 |
|---|---|---|
| 0x02 | 裝置 ID | 讀：返回 0x0020 |
| 0x06-0x09 | 心率血氧數據 | 讀：SPO2 + 心率 |
| 0x0A | 溫度 | 讀：板載溫度 |
| 0x10 | 採集控制 | 寫：0x0001=開始, 0x0002=停止 |
