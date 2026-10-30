---
title: "樹莓派使用教程"
description: "在樹莓派上用 I2C 或 UART 連接 MAX30102 心率血氧模組，含環境配置、範例程式碼、API 與常見問題。"
---

# 樹莓派使用教程

## 專案簡介

JUXI_HeartRate_SPO2 是一款基於 MAX30102 晶片的心率血氧傳感器模組，內置演算法可直接輸出心率和血氧飽和度數值。

**主要功能：**

- 血氧飽和度（SPO2）測量
- 心率測量（次/分鐘）
- 板載溫度測量
- 支援 UART 和 I2C 兩種通訊方式

---

## 硬體準備

| 所需材料 | 說明 |
|---|---|
| 樹莓派（2/3/4/Zero 均可） | 推薦使用樹莓派 3B+ 或 4B |
| JUXI_HeartRate_SPO2 傳感器 | 心率血氧傳感器模組 |
| 杜邦線若干 | 母對母杜邦線 4 根 |
| 電源適配器 | 樹莓派專用電源 |

---

## 硬體連接

### 方式一：I2C 通訊（推薦）

I2C 通訊接線簡單，推薦使用。

![圖示](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/01.png)

| 傳感器引腳 | 樹莓派物理引腳 | BCM 編號 | 說明 |
|---|---|---|---|
| VCC | 1 或 17 | - | 3.3V 電源（也可接 5V） |
| GND | 6 或 9 或 14 | - | 接地 |
| SDA | 3 | GPIO2 | I2C 數據線 |
| SCL | 5 | GPIO3 | I2C 時鐘線 |

**重要：** 將傳感器上的撥片撥動到 **IIC** 位置！

### 方式二：UART 串口通訊

UART 通訊需要交叉連接。

![圖示](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/02.png)

| 傳感器引腳 | 樹莓派物理引腳 | BCM 編號 | 說明 |
|---|---|---|---|
| VCC | 2 或 4 | - | 5V 電源（也可接 3.3V） |
| GND | 6 或 9 或 14 | - | 接地 |
| RX | 8 | GPIO14 | 傳感器 RX 接樹莓派 TX |
| TX | 10 | GPIO15 | 傳感器 TX 接樹莓派 RX |

**重要：** 將傳感器上的撥片撥動到 **UART** 位置！

![圖示](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/03.png)

---

## 環境配置

### 1. 啟用 I2C（I2C 模式需要）

```bash
sudo raspi-config
```

選擇 `Interface Options` → `I2C` → 選擇 `Yes` 啟用

重新啟動樹莓派：

```bash
sudo reboot
```

### 2. 啟用串口（UART 模式需要）

```bash
sudo raspi-config
```

選擇 `Interface Options` → `Serial`

- 第一個問題："Would you like a login shell to be accessible over serial?" → 選擇 `No`
- 第二個問題："Would you like the serial port hardware to be enabled?" → 選擇 `Yes`

重新啟動樹莓派：

```bash
sudo reboot
```

### 3. 安裝依賴庫

```bash
# 更新软件源
sudo apt-get update

# 安装 I2C 工具和 smbus2 库（I2C 模式必须使用 smbus2）
sudo apt-get install -y i2c-tools python3-smbus2

# 安装 pyserial（串口支持）
sudo pip3 install pyserial
```

> **注意：** I2C 模式必須安裝 `smbus2`，不能使用舊版 `python-smbus`。
庫內部使用 `smbus2.i2c_msg` 實現獨立的兩步 I2C 事務（先寫寄存器地址並發送 STOP，
再開啟新的讀事務連續讀取多位元組），以匹配傳感器晶片的 I2C 時序要求。

### 4. 驗證 I2C 連接（I2C 模式）

接線完成後，執行以下命令檢測 I2C 裝置：

```bash
i2cdetect -y 1
```

如果看到位址 `0x57`，說明傳感器連接成功。

---

## 範例程式碼使用

[JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)

### 檔案結構

```bash
python/raspberry/
├── JUXI_HeartRate_SPO2.py      # 主库文件
└── examples/
    ├── i2c_example.py          # I2C 模式示例
    └── uart_example.py         # UART 模式示例
```

### 執行 I2C 模式範例

```bash
cd python/raspberry/examples
```

```bash
sudo python3 i2c_example.py
```

### 執行 UART 模式範例

```bash
cd python/raspberry/examples
```

```bash
sudo python3 uart_example.py
```

**注意：** 使用硬體串口時需要 `sudo` 權限。

### 執行結果

如果一切正常，你會看到類似以下的輸出：

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

按 `Ctrl+C` 停止程式。

---

## API 參考

### 類：JUXI_HeartRate_SPO2_i2c

I2C 通訊方式的傳感器類。

**構造函數**

`JUXI_HeartRate_SPO2_i2c(bus_number=1, i2c_address=0x57)`

參數：

- `bus_number`: I2C 總線號，樹莓派通常為 1
- `i2c_address`: 傳感器 I2C 位址，預設 0x57

**方法**

| 方法 | 說明 | 返回值 |
|---|---|---|
| begin() | 初始化傳感器，檢測連接 | bool（成功返回 True） |
| sensor_start_collect() | 開始數據採集（傳感器亮燈） | 無 |
| sensor_end_collect() | 停止數據採集（傳感器關燈） | 無 |
| get_heartbeat_SPO2() | 讀取心率和血氧數據 | 無（結果存儲在物件屬性中） |
| get_temperature_c() | 讀取板載溫度 | float（攝氏度） |
| close() | 關閉 I2C 連接 | 無 |

**屬性**

| 屬性 | 說明 |
|---|---|
| SPO2 | 血氧飽和度（%），無效值為 -1 |
| heartbeat | 心率（次/分鐘），無效值為 -1 |

---

### 類：JUXI_HeartRate_SPO2_uart

UART 串口通訊方式的傳感器類。

**構造函數**

`JUXI_HeartRate_SPO2_uart(port='/dev/serial0', baudrate=9600)`

參數：

- `port`: 串口裝置路徑，樹莓派預設為 `/dev/serial0`
- `baudrate`: 波特率，預設 9600

**方法**

與 `JUXI_HeartRate_SPO2_i2c` 相同。

---

## 常見問題

### Q1: 傳感器初始化失敗怎麼辦？

**A:** 請按以下步驟檢查：

1. **檢查接線**
  - I2C 模式：確認 SDA 接 GPIO2，SCL 接 GPIO3
  - UART 模式：確認 RX-TX 交叉連接

1. **檢查傳感器撥片**
  - I2C 模式：撥片應在 IIC 位置
  - UART 模式：撥片應在 UART 位置

1. **檢查電源**
  - 確認 VCC 接 3.3V 或 5V
  - 確認 GND 已連接

1. **檢查系統設定**
  - I2C 模式：確認 I2C 已啟用
  - UART 模式：確認串口已啟用

1. **使用檢測命令**

```bash
# I2C 模式
i2cdetect -y 1

# UART 模式
ls /dev/serial*
```

### Q2: 數據一直顯示 -1 怎麼辦？

**A:**

1. 確認手指已正確放置在傳感器上，完全覆蓋兩個 LED 燈
1. 等待幾秒鐘讓數據穩定（通常需要 10-30 秒）
1. 檢查是否已調用 `sensor_start_collect()` 開啟採集
1. 確認傳感器指示燈是否亮起

### Q3: 數據不準確怎麼辦？

**A:**

1. 確保手指完全覆蓋傳感器光學區域
1. 保持手指靜止，不要移動
1. 等待 30 秒以上讓數據穩定
1. 多次測量取平均值
1. 避免強光直射傳感器

### Q4: I2C 和 UART 可以同時使用嗎？

**A:** 不可以，同一時間只能選擇一種通訊方式。

### Q5: 需要使用 sudo 執行嗎？

**A:**

- I2C 模式：建議使用 sudo，避免權限問題
- UART 模式：必須使用 sudo，否則無法存取串口

---

## 注意事項

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

### 安全提示

- 本傳感器僅供參考，不能替代專業醫療設備
- 如有健康問題，請及時就醫
- 測量結果僅作參考，不做診斷依據
