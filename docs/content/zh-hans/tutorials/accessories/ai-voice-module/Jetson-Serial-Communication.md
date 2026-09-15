---
title: "串口通讯"
description: "注销并重新登录生效。"
---

# 串口通讯

## 安装依赖

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## 检查用户组

```Plain Text
sudo usermod -aG i2c $USER
```

```Plain Text
sudo usermod -aG dialout $USER
```

注销并重新登录生效。

## 文件位置

`UART_Voice/uart_voice.py`

模块通过UART针脚连接到Jetson，注释掉`SERIAL_PORT = '/dev/ttyUSB0'`，取消注释`SERIAL_PORT = '/dev/ttyTHS1'`

![图 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/1.png)

## 接线说明

![图 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/2.png)

## 检查串口

```Plain Text
ls /dev/ttyTHS*
```

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

模块通过Type数据线连接到Jetson，取消注释`SERIAL_PORT = '/dev/ttyUSB0'`，注释掉`SERIAL_PORT = '/dev/ttyTHS1'`

![图 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/3.png)

## 检查串口

```Plain Text
ls /dev/ttyUSB*
```

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

## 常见问题

### 串口被占用

如果串口无法打开，请检查是否被其他服务占用：

```Plain Text
sudo systemctl stop nvgetty
```

```Plain Text
sudo systemctl disable nvgetty
```

<RelatedProducts slugs="ai-voice-module" />
