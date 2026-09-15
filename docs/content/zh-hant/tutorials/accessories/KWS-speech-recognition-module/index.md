---
title: KWS語音識別模組
description: "KWS 語音識別模組系列教程——串列埠通訊、韌體燒錄與 ROS2 視覺化。"
---

# KWS語音識別模組

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**


歡迎使用KWS語音識別模組！這裡是所有相關教程的目錄。

## 教程列表

- [Jetson Nano串口通訊](./Jetson-Nano-serial-communication.md)
- [Jetson串口通訊](./Jetson-serial-communication.md)
- [PC串口通訊](./PC-serial-communication.md)
- [ROS2 RViz2可視化](./ROS2-rviz2-visualization.md)
- [中英文識別詞固件下載與燒錄](./download-and-burn-firmware-for-chinese-and-english-recognition-words.md)
- [樹莓派串口通訊](./raspberry-pi-serial-communication.md)


---

## 官方倉庫示例

鉅犀科技為 KWS 語音識別模組提供開源代碼：[GitHub](https://github.com/Juxi-Technology/Sound-card-for-KWS-speech-recognition-module)

### Python 串口通信

倉庫中的 Python 示例演示了如何通過串口與 KWS 模組通信，獲取喚醒詞識別結果：

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"識別結果: {data}")
```
