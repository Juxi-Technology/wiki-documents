---
title: "Serial Port Communication"
description: "Edit /boot/firmware/config.txt or /boot/config.txt and ensure the following configuration:"
---

# Serial Port Communication

## Install Dependencies

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## File Location

`~/UART_Voice/uart_voice.py`

## Enable the Serial Port

Edit `/boot/firmware/config.txt` or `/boot/config.txt` and ensure the following configuration:

```Plain Text
enable_uart=1
dtoverlay=disable-bt
```

Then restart the Raspberry Pi.

```Plain Text
sudo reboot
```

## Wiring Instructions

When the Type cable is connected directly to the Raspberry Pi, uncomment `SERIAL_PORT = '/dev/ttyUSB0'` and comment out `SERIAL_PORT = '/dev/ttyAMA0'`

![Image 1](../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/1.png)

Connect to the Raspberry Pi through the UART pins

![Image 2](../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/2.png)

Comment out `SERIAL_PORT = '/dev/ttyUSB0'` and uncomment `SERIAL_PORT = '/dev/ttyAMA0'`

![Image 3](../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/3.png)

## Run

```Plain Text
cd UART_Voice
```

```Plain Text
python3 uart_voice.py
```

## Output Format

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```



