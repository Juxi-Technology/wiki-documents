---
title: "RDK: IIC Communication"
description: "RDK X5 IIC communication example for the AI Voice Interaction Module: Python sample code that reads recognized command IDs over the I2C bus."
---

# RDK: IIC Communication

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

### I2C Version Connection

**Note**: I2C bus 5 (BCM numbering) is used by default

![Image 1](../../../../public/images/tutorials/accessories/ai-voice-module/RDK-IIC-Communication/1.jpg)

---

## Environment Setup

### System Requirements

- RDK X5

- Ubuntu / Debian system

- Python 3.7+

### Install Dependency Packages

```Bash
# Update packages
sudo apt update
sudo apt upgrade -y

# Install Python libraries
sudo apt install -y python3-pip python3-smbus i2c-tools
```

### Enable the I2C Interface

```Bash
# Open the configuration tool
sudo raspi-config

# Select Interface Options → I2C → Enable
# Reboot to take effect
sudo reboot
```

### Test the Hardware Interfaces

```Bash
# Test the I2C device
sudo i2cdetect -y 5
```

---

## Using the IIC Version

### Check the Code Files

```Bash
cd IIC_Voice
ls -la
# You should see iic_voice.py
```

### Configure the I2C Bus

Edit the `iic_voice.py` file and modify the required parameters:

```Bash
# I2C device address
DEVICE_ADDRESS = 0x2A

# Register address
REG_RESULT = 0xDA

# I2C bus number (modify according to the actual connection)
bus = smbus.SMBus(5)  # I2C bus 5
```

### Run the Program

```Bash
# Grant execute permission
chmod +x iic_voice.py

# Run (sudo privileges required to access I2C)
sudo python3 iic_voice.py
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

Press `Ctrl + C` to stop the program:

```Bash
Program terminated
```

---

## Troubleshooting

### Q1: Insufficient permission for I2C operations

**A: Add the user to the I2C user group:**

```Bash
sudo usermod -aG i2c $USER
# Takes effect after logging in again
```

Or run the program with `sudo`

---

### Q2: The I2C device cannot be scanned

**A: Check:**

1. Confirm that I2C is enabled (raspi-config)

2. Check whether SDA/SCL are reversed

3. Check whether the grounds are common

4. Check whether the device is powered

```Bash
# Scan I2C devices
sudo i2cdetect -y 5
# If you see 0x2A, the device is connected properly
```

---

### Q3: The command ID only shows 0 or does not appear

**A: Normal behavior:**

- 0 = no valid command recognized

- the ID is output only when a valid command word is spoken

- wake the module first, then say the command

---

### Q4: Recognition accuracy is not high

**A: Optimization suggestions:**

- Keep the environment quiet and the background noise low

- Keep a moderate distance from the microphone (10-50cm)

- Speak at a moderate rate and articulate clearly

---

## Technical Support

If there are problems, please check:

1. Whether the hardware wiring is correct (a common ground is very important!)

2. Whether the serial port baud rate is 115200

3. Whether the I2C address is correct (0x2A)

4. Whether there is sufficient permission to access the hardware interface

## Common Debugging Commands

```Bash
ls -l /dev/i2c*      # View I2C devices
groups                # Check user group permissions
```

<RelatedProducts slugs="ai-voice-module" />
