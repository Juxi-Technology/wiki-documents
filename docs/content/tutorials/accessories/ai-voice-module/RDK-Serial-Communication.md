---
title: "RDK: Serial Port Communication"
description: "RDK X5 serial port communication example for the AI Voice Interaction Module: Python sample code for UART control and voice playback at 115200 baud."
---

# RDK: Serial Port Communication

## Introduction

This repository provides Python example code for communication between the RDK X5 (Raspberry Pi) platform and the AI voice interaction module, supporting two communication methods: I2C and UART.

- **Speech recognition module**: supports offline speech recognition and outputs the command ID after recognition

- **Playback functions**: supports passive playback, function word playback and command word playback

- **Communication protocol**: I2C address 0x2A, UART baud rate 115200

- **Programming language**: Python 3

---

## Hardware Connection

### General Connection

> **Important:** make sure all devices share a common ground!
> 
> 

---

### UART Version Connection

**Note**: the `/dev/ttyAMA0` serial device is used by default

---

### Type-C Data Cable Connection (UART Alternative)

If a USB-TTL adapter module is used:

**Note**: in this case the serial device is usually `/dev/ttyUSB0`

![Image 1](../../../../public/images/tutorials/accessories/ai-voice-module/RDK-Serial-Communication/1.jpg)

---

## Environment Setup

### System Requirements

- RDK X5

- Ubuntu / Debian system

- Python 3.7+

### Install Dependency Packages

```Bash
# 更新软件包
sudo apt update
sudo apt upgrade -y

# 安装 Python 库
sudo apt install -y python3-pip

# 安装 pyserial
pip3 install pyserial
```

### Enable the Serial Port Interface

```Bash
# 打开配置工具
sudo raspi-config

# 选择 Interface Options → Serial
Select: No (shell) → Yes (hardware serial port)
# 重启生效
sudo reboot
```

---

## Using the UART Version

### Check the Code Files

```Bash
cd UART_Voice
ls -la
# 应该看到 uart_voice.py
```

### Configure the Serial Port Device

Edit the `uart_voice.py` file and modify the serial port device:

```Bash
# UART 直连（默认）
SERIAL_PORT = '/dev/ttyAMA0'

# 或者使用 USB-TTL
SERIAL_PORT = '/dev/ttyUSB0'

# 波特率
BAUD_RATE = 115200
```

### Run the Program

## Grant Execute Permission

```Bash
chmod +x uart_voice.py
# 运行（需要 sudo 权限访问串口）
sudo python3 uart_voice.py
```

### Running Test

After a normal startup it will display:

```Bash
Speech Serial Opened! Baudrate=115200
```

Say a command word to the voice module and the corresponding ID will be displayed:

```Bash
Speech Serial Opened! Baudrate=115200
ID:1
ID:4
ID:10
```

### Stop the Program

Press `Ctrl + C` to stop the program

---

## Troubleshooting

### Q1: The serial device cannot be found

**A: Check:**

1. Check whether the serial port is enabled (raspi-config)

2. Check whether the device name is correct

    - UART direct connection: `/dev/ttyAMA0`

    - USB-TTL: `/dev/ttyUSB0` or `/dev/ttyUSB1`

3. Check whether the hardware connection is correct

4. Check whether the serial port is occupied by another program

```Bash
# 查看可用串口
ls /dev/tty* | grep tty
```

---

### Q2: The command ID only shows 0 or does not appear

**A: Normal behavior:**

- 0 = no valid command recognized

- the ID is output only when a valid command word is spoken

- wake the module first, then say the command

---

### Q3: Recognition accuracy is not high

**A: Optimization suggestions:**

- Keep the environment quiet and the background noise low

- Keep a moderate distance from the microphone (10-50cm)

- Speak at a moderate rate and articulate clearly

---

### Q4: Abnormal serial port communication

**A: Check:**

1. Whether TX/RX are cross-connected (module TX → RPi RX)

2. Whether the baud rate is 115200

3. Whether the grounds are common

4. Whether the serial port is occupied by another process

```Bash
# 检查串口占用
sudo lsof /dev/ttyAMA0
```

---

## Technical Support

If there are problems, please check:

1. Whether the hardware wiring is correct (a common ground is very important!)

2. Whether the serial port baud rate is 115200

3. Whether there is sufficient permission to access the hardware interface

## Common Debugging Commands

```Bash
ls -l /dev/ttyAMA0   # 查看串口设备
groups                # 查看用户组权限
```

<RelatedProducts slugs="ai-voice-module" />
