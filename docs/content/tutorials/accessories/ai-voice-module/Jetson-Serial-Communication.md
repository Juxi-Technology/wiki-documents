---
title: "Serial Port Communication"
description: "Log out and log back in for it to take effect."
---

# Serial Port Communication

## Install Dependencies

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
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

`UART_Voice/uart_voice.py`

When the module is connected to the Jetson through the UART pins, comment out `SERIAL_PORT = '/dev/ttyUSB0'` and uncomment `SERIAL_PORT = '/dev/ttyTHS1'`

![Image 1](../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/1.png)

## Wiring Instructions

![Image 2](../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/2.png)

## Check the Serial Port

```Plain Text
ls /dev/ttyTHS*
```

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

When the module is connected to the Jetson through a Type data cable, uncomment `SERIAL_PORT = '/dev/ttyUSB0'` and comment out `SERIAL_PORT = '/dev/ttyTHS1'`

![Image 3](../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/3.png)

## Check the Serial Port

```Plain Text
ls /dev/ttyUSB*
```

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

## Troubleshooting

### Serial Port Is Occupied

If the serial port cannot be opened, check whether it is occupied by another service:

```Plain Text
sudo systemctl stop nvgetty
```

```Plain Text
sudo systemctl disable nvgetty
```



