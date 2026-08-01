---
title: KWS语音识别模块
---

# KWS语音识别模块

欢迎使用KWS语音识别模块！这里是所有相关教程的目录。

## 教程列表

- [Jetson Nano串口通讯](./Jetson-Nano-serial-communication.md)
- [Jetson串口通讯](./Jetson-serial-communication.md)
- [PC串口通讯](./PC-serial-communication.md)
- [ROS2 RViz2可视化](./ROS2-rviz2-visualization.md)
- [中英文识别词固件下载与烧录](./download-and-burn-firmware-for-chinese-and-english-recognition-words.md)
- [树莓派串口通讯](./raspberry-pi-serial-communication.md)


---

## 官方仓库示例

钜犀科技为 KWS 语音识别模块提供开源代码：[GitHub](https://github.com/Juxi-Technology/Sound-card-for-KWS-speech-recognition-module)

### Python 串口通信

仓库中的 Python 示例演示了如何通过串口与 KWS 模块通信，获取唤醒词识别结果：

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"识别结果: {data}")
```
