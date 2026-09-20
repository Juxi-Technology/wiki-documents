---
title: "RDK: IIC通訊"
description: "AI 語音互動模組教程(RDK X5 平台)——IIC 接線、I2C 位址設定與 Python 範例程式執行。"
---

# RDK: IIC通訊

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

### I2C 版本連接

**注意**：預設使用 I2C 匯流排 5（BCM 編號）

![圖 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-IIC-Communication/1.jpg)

---

## 環境設定

### 系統要求

- RDK X5

- Ubuntu / Debian 系統

- Python 3.7+

### 安裝相依性套件

```Bash
# 更新軟件包
sudo apt update
sudo apt upgrade -y

# 安裝 Python 庫
sudo apt install -y python3-pip python3-smbus i2c-tools
```

### 啟用 I2C 介面

```Bash
# 打開配置工具
sudo raspi-config

# 選擇 Interface Options → I2C → Enable
# 重啟生效
sudo reboot
```

### 測試硬體介面

```Bash
# 測試 I2C 設備
sudo i2cdetect -y 5
```

---

## IIC 版本使用

### 檢查程式碼檔案

```Bash
cd IIC_Voice
ls -la
# 應該看到 iic_voice.py
```

### 配置 I2C 匯流排

編輯 `iic_voice.py` 檔案，修改需要的參數：

```Bash
# I2C 設備地址
DEVICE_ADDRESS = 0x2A

# 寄存器地址
REG_RESULT = 0xDA

# I2C 總線編號（根據實際連接修改）
bus = smbus.SMBus(5)  # I2C 總線 5
```

### 執行程式

```Bash
# 賦予執行權限
chmod +x iic_voice.py

# 運行（需要 sudo 權限訪問 I2C）
sudo python3 iic_voice.py
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

按 `Ctrl + C` 停止程式：

```Bash
Program terminated
```

---

## 常見問題

### Q1: I2C 操作權限不足

**A: 新增使用者到 I2C 使用者群組：**

```Bash
sudo usermod -aG i2c $USER
# 重新登錄生效
```

或者使用 `sudo` 執行程式

---

### Q2: I2C 裝置掃描不到

**A: 檢查：**

1. 確認 I2C 已啟用（raspi-config）

2. 檢查 SDA/SCL 是否接反

3. 檢查是否共地

4. 檢查裝置是否上電

```Bash
# 掃描 I2C 設備
sudo i2cdetect -y 5
# 如果看到 0x2A，說明設備連接正常
```

---

### Q3: 命令 ID 只顯示 0 或不顯示

**A: 正常現象：**

- 0 = 未辨識到有效命令

- 只有說出有效命令詞才會輸出 ID

- 先喚醒模組，再說命令

---

### Q4: 辨識準確率不高

**A: 最佳化建議：**

- 確保環境安靜，背景噪音不要太大

- 離麥克風距離適中（10-50cm）

- 語速適中，發音清晰

---

## 技術支援

如有問題，請檢查：

1. 硬體接線是否正確（共地非常重要！）

2. 串列埠鮑率是否為 115200

3. I2C 位址是否正確（0x2A）

4. 是否有足夠的權限存取硬體介面

## 常用除錯命令

```Bash
ls -l /dev/i2c*      # 查看 I2C 設備
groups                # 查看用戶組權限
```

<RelatedProducts slugs="ai-voice-module" />
