---
title: KWS Speech Recognition Module
description: "KWS speech recognition module series — serial, firmware, ROS2"
---

# KWS Speech Recognition Module

> **[Buy in Store](https://www.juxitech.com/products/ai-voice-recognition-module)**


Welcome to the KWS Speech Recognition Module! Here is the directory of all related tutorials.

## Tutorial List

- [Jetson Nano Serial Communication](./Jetson-Nano-serial-communication.md)
- [Jetson Serial Communication](./Jetson-serial-communication.md)
- [PC Serial Communication](./PC-serial-communication.md)
- [ROS2 RViz2 Visualization](./ROS2-rviz2-visualization.md)
- [Chinese and English Recognition Word Firmware Download and Burn](./download-and-burn-firmware-for-chinese-and-english-recognition-words.md)
- [Raspberry Pi Serial Communication](./raspberry-pi-serial-communication.md)


---

## Official Repository Example

Juxi Technology provides open-source code for the KWS speech recognition module: [GitHub](https://github.com/Juxi-Technology/Sound-card-for-KWS-speech-recognition-module)

### Python Serial Communication

The Python example in the repository demonstrates how to communicate with the KWS module over serial to receive wake-word recognition results:

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"Recognition result: {data}")
```
