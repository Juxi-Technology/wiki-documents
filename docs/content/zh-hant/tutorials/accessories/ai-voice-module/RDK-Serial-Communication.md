---
title: "RDK: 串列埠通訊"
description: "本倉庫提供了 RDK X5（Raspberry Pi）平台與 AI 語音互動模組通訊的 Python 範例程式碼，支援 I2C 和 UART 兩種通訊方式。"
---

# RDK: 串列埠通訊

## 簡介

本倉庫提供了 RDK X5（Raspberry Pi）平台與 AI 語音互動模組通訊的 Python 範例程式碼，支援 I2C 和 UART 兩種通訊方式。

- **語音辨識模組**：支援離線語音辨識，辨識後輸出命令ID

- **播報功能**：支援被動播報、功能詞播報、命令詞播報

- **通訊協定**：I2C 位址 0x2A，UART 鮑率 115200

- **程式語言**：Python 3

---

## 硬體連接

### 通用連接

> **重要提示**：確保所有裝置共地！
> 
> 

---

### UART 版本連接

**注意**：預設使用 `/dev/ttyAMA0` 串列埠裝置

---

### Type-C 資料線連接（UART 備選）

如果使用 USB-TTL 轉接模組：

**注意**：此時串列埠裝置通常為 `/dev/ttyUSB0`

![圖 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-Serial-Communication/1.jpg)

---

## 環境設定

### 系統要求

- RDK X5

- Ubuntu / Debian 系統

- Python 3.7+

### 安裝相依性套件

```Bash
# 更新软件包
sudo apt update
sudo apt upgrade -y

# 安装 Python 库
sudo apt install -y python3-pip

# 安装 pyserial
pip3 install pyserial
```

### 啟用串列埠介面

```Bash
# 打开配置工具
sudo raspi-config

# 选择 Interface Options → Serial
Select: No (shell) → Yes (hardware serial port)
# 重启生效
sudo reboot
```

---

## UART 版本使用

### 檢查程式碼檔案

```Bash
cd UART_Voice
ls -la
# 应该看到 uart_voice.py
```

### 配置串列埠裝置

編輯 `uart_voice.py` 檔案，修改串列埠裝置：

```Bash
# UART 直连（默认）
SERIAL_PORT = '/dev/ttyAMA0'

# 或者使用 USB-TTL
SERIAL_PORT = '/dev/ttyUSB0'

# 波特率
BAUD_RATE = 115200
```

### 執行程式

## 賦予執行權限

```Bash
chmod +x uart_voice.py
# 运行（需要 sudo 权限访问串口）
sudo python3 uart_voice.py
```

### 執行測試

正常啟動後會顯示：

```Bash
Speech Serial Opened! Baudrate=115200
```

對語音模組說出命令詞，會顯示對應的 ID：

```Bash
Speech Serial Opened! Baudrate=115200
ID:1
ID:4
ID:10
```

### 停止程式

按 `Ctrl + C` 停止程式

---

## 常見問題

### Q1: 串列埠裝置找不到

**A: 檢查：**

1. 檢查串列埠是否啟用（raspi-config）

2. 檢查裝置名稱是否正確

    - UART 直連：`/dev/ttyAMA0`

    - USB-TTL：`/dev/ttyUSB0` 或 `/dev/ttyUSB1`

3. 檢查硬體連接是否正確

4. 檢查串列埠是否被其他程式占用

```Bash
# 查看可用串口
ls /dev/tty* | grep tty
```

---

### Q2: 命令 ID 只顯示 0 或不顯示

**A: 正常現象：**

- 0 = 未辨識到有效命令

- 只有說出有效命令詞才會輸出 ID

- 先喚醒模組，再說命令

---

### Q3: 辨識準確率不高

**A: 最佳化建議：**

- 確保環境安靜，背景噪音不要太大

- 離麥克風距離適中（10-50cm）

- 語速適中，發音清晰

---

### Q4: 串列埠通訊異常

**A: 檢查：**

1. TX/RX 是否交叉連接（模組 TX → RPi RX）

2. 鮑率是否為 115200

3. 是否共地

4. 串列埠是否被其他行程占用

```Bash
# 检查串口占用
sudo lsof /dev/ttyAMA0
```

---

## 技術支援

如有問題，請檢查：

1. 硬體接線是否正確（共地非常重要！）

2. 串列埠鮑率是否為 115200

3. 是否有足夠的權限存取硬體介面

## 常用除錯命令

```Bash
ls -l /dev/ttyAMA0   # 查看串口设备
groups                # 查看用户组权限
```

<RelatedProducts slugs="ai-voice-module" />
