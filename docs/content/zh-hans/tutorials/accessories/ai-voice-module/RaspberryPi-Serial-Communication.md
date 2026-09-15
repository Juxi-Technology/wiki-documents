---
title: "串口通讯"
description: "编辑 /boot/firmware/config.txt 或 /boot/config.txt，确保以下配置："
---

# 串口通讯

## 安装依赖

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## 文件位置

`~/UART_Voice/uart_voice.py`

## 启用串口

编辑 `/boot/firmware/config.txt` 或 `/boot/config.txt`，确保以下配置：

```Plain Text
enable_uart=1
dtoverlay=disable-bt
```

然后重启树莓派。

```Plain Text
sudo reboot
```

## 接线说明

Type直连树莓派时，取消注释`SERIAL_PORT = '/dev/ttyUSB0'`，注释掉`SERIAL_PORT = '/dev/ttyAMA0'`

![图 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/1.png)

通过UART针脚连接树莓派

![图 2](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/2.png)

注释掉`SERIAL_PORT = '/dev/ttyUSB0'`，取消注释`SERIAL_PORT = '/dev/ttyAMA0'`

![图 3](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/3.png)

## 运行

```Plain Text
cd UART_Voice
```

```Plain Text
python3 uart_voice.py
```

## 输出格式

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

<RelatedProducts slugs="ai-voice-module" />
