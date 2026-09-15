---
title: "IIC Communication"
description: "Log out and log back in for it to take effect."
---

# IIC Communication

## Install Dependencies

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## Check User Groups

```Plain Text
sudo usermod -aG i2c $USER
```

```Plain Text
sudo usermod -aG dialout $USER
```

Log out and log back in for it to take effect.

## File Location

`IIC_Voice/iic_voice.py`

## Wiring Instructions

![Image 1](../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication/1.png)

## Check the I2C Device

```Plain Text
sudo i2cdetect -y -r 1
```

You should see the address `0x2A`

## Run

```Plain Text
cd IIC_Voice
```

```Plain Text
sudo python3 iic_voice.py
```

## Output Format

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

## Troubleshooting

### I2C Permission Problem

```Plain Text
sudo chmod 666 /dev/i2c-1
```



