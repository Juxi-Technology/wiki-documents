---
title: "IIC通讯"
description: "本仓库提供了 RDK X5（Raspberry Pi）平台与 AI 语音交互模块通信的 Python 示例代码，支持 I2C 和 UART 两种通信方式。"
---

# IIC通讯

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

### I2C 版本连接

**注意**：默认使用 I2C 总线 5（BCM 编号）

![图 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-IIC-Communication/1.jpg)

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
sudo apt install -y python3-pip python3-smbus i2c-tools
```

### 启用 I2C 接口

```Bash
# 打开配置工具
sudo raspi-config

# 选择 Interface Options → I2C → Enable
# 重启生效
sudo reboot
```

### 测试硬件接口

```Bash
# 测试 I2C 设备
sudo i2cdetect -y 5
```

---

## IIC 版本使用

### 检查代码文件

```Bash
cd IIC_Voice
ls -la
# 应该看到 iic_voice.py
```

### 配置 I2C 总线

编辑 `iic_voice.py` 文件，修改需要的参数：

```Bash
# I2C 设备地址
DEVICE_ADDRESS = 0x2A

# 寄存器地址
REG_RESULT = 0xDA

# I2C 总线编号（根据实际连接修改）
bus = smbus.SMBus(5)  # I2C 总线 5
```

### 运行程序

```Bash
# 赋予执行权限
chmod +x iic_voice.py

# 运行（需要 sudo 权限访问 I2C）
sudo python3 iic_voice.py
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

按 `Ctrl + C` 停止程序：

```Bash
Program terminated
```

---

## 常见问题

### Q1: I2C 操作权限不足

**A: 添加用户到 I2C 用户组：**

```Bash
sudo usermod -aG i2c $USER
# 重新登录生效
```

或者使用 `sudo` 运行程序

---

### Q2: I2C 设备扫描不到

**A: 检查：**

1. 确认 I2C 已启用（raspi-config）

2. 检查 SDA/SCL 是否接反

3. 检查是否共地

4. 检查设备是否上电

```Bash
# 扫描 I2C 设备
sudo i2cdetect -y 5
# 如果看到 0x2A，说明设备连接正常
```

---

### Q3: 命令 ID 只显示 0 或不显示

**A: 正常现象：**

- 0 = 未识别到有效命令

- 只有说出有效命令词才会输出 ID

- 先唤醒模块，再说命令

---

### Q4: 识别准确率不高

**A: 优化建议：**

- 确保环境安静，背景噪音不要太大

- 离麦克风距离适中（10-50cm）

- 语速适中，发音清晰

---

## 技术支持

如有问题，请检查：

1. 硬件接线是否正确（共地非常重要！）

2. 串口波特率是否为 115200

3. I2C 地址是否正确（0x2A）

4. 是否有足够的权限访问硬件接口

## 常用调试命令

```Bash
ls -l /dev/i2c*      # 查看 I2C 设备
groups                # 查看用户组权限
```



