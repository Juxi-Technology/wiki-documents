---
title: KWS 음성 인식 모듈
description: "KWS 음성 인식 모듈 시리즈 튜토리얼——직렬 통신, 펌웨어 굽기, ROS2 시각화"
---

# KWS 음성 인식 모듈

KWS 음성 인식 모듈에 오신 것을 환영합니다! 여기는 관련 튜토리얼 목차입니다.

## 튜토리얼 목록

- [Jetson Nano 직렬 통신](./Jetson-Nano-serial-communication.md)
- [Jetson 직렬 통신](./Jetson-serial-communication.md)
- [PC 직렬 통신](./PC-serial-communication.md)
- [ROS2 RViz2 시각화](./ROS2-rviz2-visualization.md)
- [중문/영문 인식어 펌웨어 다운로드 및 굽기](./download-and-burn-firmware-for-chinese-and-english-recognition-words.md)
- [라즈베리파이 직렬 통신](./raspberry-pi-serial-communication.md)


---

## 공식 저장소 예제

JUXI는 KWS 음성 인식 모듈용 오픈소스 코드를 제공합니다: [GitHub](https://github.com/Juxi-Technology/Sound-card-for-KWS-speech-recognition-module)

### Python 직렬 통신

저장소의 Python 예제는 직렬을 통해 KWS 모듈과 통신하여 웨이크워드 인식 결과를 얻는 방법을 보여줍니다:

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"Recognition result: {data}")
```
