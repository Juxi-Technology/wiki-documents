---
title: KWS音声認識モジュール
description: "KWS 音声認識モジュールシリーズチュートリアル——シリアル通信、ファームウェア書き込み、ROS2 可視化"
---

# KWS音声認識モジュール

KWS音声認識モジュールへようこそ！ここは関連チュートリアルの目次です。

## チュートリアル一覧

- [Jetson Nanoシリアル通信](./Jetson-Nano-serial-communication.md)
- [Jetsonシリアル通信](./Jetson-serial-communication.md)
- [PCシリアル通信](./PC-serial-communication.md)
- [ROS2 RViz2可視化](./ROS2-rviz2-visualization.md)
- [中英認識語ファームウェアのダウンロードと書き込み](./download-and-burn-firmware-for-chinese-and-english-recognition-words.md)
- [ラズベリーパイシリアル通信](./raspberry-pi-serial-communication.md)


---

## 公式リポジトリのサンプル

JUXIはKWS音声認識モジュールのオープンソースコードを提供しています：[GitHub](https://github.com/Juxi-Technology/Sound-card-for-KWS-speech-recognition-module)

### Python シリアル通信

リポジトリのPythonサンプルは、シリアル経由でKWSモジュールと通信し、ウェイクワード認識結果を取得する方法を示しています：

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"Recognition result: {data}")
```
