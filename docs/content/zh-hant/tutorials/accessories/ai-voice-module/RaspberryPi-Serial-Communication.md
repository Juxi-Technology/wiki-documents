---
title: "樹莓派: 串列埠通訊"
description: "編輯 /boot/firmware/config.txt 或 /boot/config.txt，確保以下配置："
---

# 樹莓派: 串列埠通訊

## 安裝相依性

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## 檔案位置

`~/UART_Voice/uart_voice.py`

## 啟用串列埠

編輯 `/boot/firmware/config.txt` 或 `/boot/config.txt`，確保以下配置：

```Plain Text
enable_uart=1
dtoverlay=disable-bt
```

然後重啟Raspberry Pi。

```Plain Text
sudo reboot
```

## 接線說明

Type直連Raspberry Pi時，取消註解`SERIAL_PORT = '/dev/ttyUSB0'`，註解掉`SERIAL_PORT = '/dev/ttyAMA0'`

![圖 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/1.png)

透過UART接腳連接Raspberry Pi

![圖 2](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/2.png)

註解掉`SERIAL_PORT = '/dev/ttyUSB0'`，取消註解`SERIAL_PORT = '/dev/ttyAMA0'`

![圖 3](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/3.png)

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

<RelatedProducts slugs="ai-voice-module" />
