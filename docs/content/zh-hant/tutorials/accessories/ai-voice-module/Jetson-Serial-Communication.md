---
title: "Jetson: 串列埠通訊"
description: "AI 語音互動模組教程(Jetson 平台)——串列埠接線、連接埠檢查與 Python 範例程式執行。"
---

# Jetson: 串列埠通訊

## 安裝相依性

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## 檢查使用者群組

```Plain Text
sudo usermod -aG i2c $USER
```

```Plain Text
sudo usermod -aG dialout $USER
```

登出並重新登入生效。

## 檔案位置

`UART_Voice/uart_voice.py`

模組透過UART接腳連接到Jetson，註解掉`SERIAL_PORT = '/dev/ttyUSB0'`，取消註解`SERIAL_PORT = '/dev/ttyTHS1'`

![圖 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/1.png)

## 接線說明

![圖 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/2.png)

## 檢查串列埠

```Plain Text
ls /dev/ttyTHS*
```

## 執行

```Plain Text
cd UART_Voice
```

```Plain Text
python3 uart_voice.py
```

## 輸出格式

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

模組透過Type資料線連接到Jetson，取消註解`SERIAL_PORT = '/dev/ttyUSB0'`，註解掉`SERIAL_PORT = '/dev/ttyTHS1'`

![圖 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/3.png)

## 檢查串列埠

```Plain Text
ls /dev/ttyUSB*
```

## 執行

```Plain Text
cd UART_Voice
```

```Plain Text
python3 uart_voice.py
```

## 輸出格式

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

## 常見問題

### 串列埠被佔用

如果串列埠無法開啟，請檢查是否被其他服務佔用：

```Plain Text
sudo systemctl stop nvgetty
```

```Plain Text
sudo systemctl disable nvgetty
```

<RelatedProducts slugs="ai-voice-module" />
