---
title: "RDK: 串口通讯"
description: "钜犀科技 AI 语音交互模块教程——在 RDK X5 上通过串口 UART 与模块通信，含串口设备配置与 Python 示例代码。"
---

# RDK: 串口通讯

## 简介

本仓库提供了 RDK X5（Raspberry Pi）平台与 AI 语音交互模块通信的 Python 示例代码，支持 I2C 和 UART 两种通信方式。

- **语音识别模块**：支持离线语音识别，识别后输出命令ID

- **播报功能**：支持被动播报、功能词播报、命令词播报

- **通信协议**：I2C 地址 0x2A，UART 波特率 115200

- **编程语言**：Python 3

---

## 硬件连接

### 通用连接

> **重要提示**：确保所有设备共地！
> 
> 

---

### UART 版本连接

**注意**：默认使用 `/dev/ttyAMA0` 串口设备

---

### Type-C 数据线连接（UART 备选）

如果使用 USB-TTL 转接模块：

**注意**：此时串口设备通常为 `/dev/ttyUSB0`

![图 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-Serial-Communication/1.jpg)

---

## 环境配置

### 系统要求

- RDK X5

- Ubuntu / Debian 系统

- Python 3.7+

### 安装依赖包

```Bash
# 更新软件包
sudo apt update
sudo apt upgrade -y

# 安装 Python 库
sudo apt install -y python3-pip

# 安装 pyserial
pip3 install pyserial
```

### 启用串口接口

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

### 检查代码文件

```Bash
cd UART_Voice
ls -la
# 应该看到 uart_voice.py
```

### 配置串口设备

编辑 `uart_voice.py` 文件，修改串口设备：

```Bash
# UART 直连（默认）
SERIAL_PORT = '/dev/ttyAMA0'

# 或者使用 USB-TTL
SERIAL_PORT = '/dev/ttyUSB0'

# 波特率
BAUD_RATE = 115200
```

### 运行程序

## 赋予执行权限

```Bash
chmod +x uart_voice.py
# 运行（需要 sudo 权限访问串口）
sudo python3 uart_voice.py
```

### 运行测试

正常启动后会显示：

```Bash
Speech Serial Opened! Baudrate=115200
```

对语音模块说出命令词，会显示对应的 ID：

```Bash
Speech Serial Opened! Baudrate=115200
ID:1
ID:4
ID:10
```

### 停止程序

按 `Ctrl + C` 停止程序

---

## 常见问题

### Q1: 串口设备找不到

**A: 检查：**

1. 检查串口是否启用（raspi-config）

2. 检查设备名称是否正确

    - UART 直连：`/dev/ttyAMA0`

    - USB-TTL：`/dev/ttyUSB0` 或 `/dev/ttyUSB1`

3. 检查硬件连接是否正确

4. 检查串口是否被其他程序占用

```Bash
# 查看可用串口
ls /dev/tty* | grep tty
```

---

### Q2: 命令 ID 只显示 0 或不显示

**A: 正常现象：**

- 0 = 未识别到有效命令

- 只有说出有效命令词才会输出 ID

- 先唤醒模块，再说命令

---

### Q3: 识别准确率不高

**A: 优化建议：**

- 确保环境安静，背景噪音不要太大

- 离麦克风距离适中（10-50cm）

- 语速适中，发音清晰

---

### Q4: 串口通信异常

**A: 检查：**

1. TX/RX 是否交叉连接（模块 TX → RPi RX）

2. 波特率是否为 115200

3. 是否共地

4. 串口是否被其他进程占用

```Bash
# 检查串口占用
sudo lsof /dev/ttyAMA0
```

---

## 技术支持

如有问题，请检查：

1. 硬件接线是否正确（共地非常重要！）

2. 串口波特率是否为 115200

3. 是否有足够的权限访问硬件接口

## 常用调试命令

```Bash
ls -l /dev/ttyAMA0   # 查看串口设备
groups                # 查看用户组权限
```

<RelatedProducts slugs="ai-voice-module" />
