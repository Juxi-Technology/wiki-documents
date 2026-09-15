---
title: "IIC通讯"
description: "选择 Interface Options -> I2C -> Yes"
---

# IIC通讯

## 安装依赖

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## 启用I2C

```Plain Text
sudo raspi-config
```

选择 `Interface Options` -> `I2C` -> `Yes`

重启树莓派

## 文件位置

`~/IIC_Voice/iic_voice.py`

## 接线说明

![图 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication/1.png)

## 运行

```Plain Text
cd IIC_Voice
```

```Plain Text
python3 iic_voice.py
```

## 输出格式

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

