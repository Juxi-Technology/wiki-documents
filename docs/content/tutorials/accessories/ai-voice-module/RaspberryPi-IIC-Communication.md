---
title: "IIC Communication"
description: "Select Interface Options -> I2C -> Yes"
---

# IIC Communication

## Install Dependencies

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## Enable I2C

```Plain Text
sudo raspi-config
```

Select `Interface Options` -> `I2C` -> `Yes`

Restart the Raspberry Pi

## File Location

`~/IIC_Voice/iic_voice.py`

## Wiring Instructions

![Image 1](../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication/1.png)

## Run

```Plain Text
cd IIC_Voice
```

```Plain Text
python3 iic_voice.py
```

## Output Format

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

