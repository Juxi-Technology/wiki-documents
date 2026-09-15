---
title: "Jetson: IIC通讯"
description: "注销并重新登录生效。"
---

# Jetson: IIC通讯

## 安装依赖

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
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

`IIC_Voice/iic_voice.py`

## 接线说明

![图 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication/1.png)

## 检查I2C设备

```Plain Text
sudo i2cdetect -y -r 1
```

应能看到地址`0x2A`

## 运行

```Plain Text
cd IIC_Voice
```

```Plain Text
sudo python3 iic_voice.py
```

## 输出格式

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

## 常见问题

### I2C权限问题

```Plain Text
sudo chmod 666 /dev/i2c-1
```

<RelatedProducts slugs="ai-voice-module" />
