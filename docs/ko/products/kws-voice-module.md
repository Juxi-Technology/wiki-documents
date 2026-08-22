---
title: KWS 음성 상호작용 모듈
description: "JUXI KWS 음성 인식 상호작용 모듈——중영 웨이크워드 인식, 직렬/RViz2 시각화, Jetson/라즈베리파이 지원, 펌웨어 오픈소스"
keywords: [kws, 음성 인식, 음성 상호작용, 웨이크워드]
---

# KWS 음성 상호작용 모듈

> **[스토어에서 구매](https://www.juxitech.com/ko/products/ai-voice-recognition-module)**

## 제품 개요

**주요 특징**:

- 중영 인식어 펌웨어(다운로드 및 굽기)
- 직렬 통신(PC/Jetson/라즈베리파이/Jetson Nano)
- ROS2 + RViz2 시각화
- 오픈소스 저장소, Python 직렬 예제

## 제품 사양

| 항목 | 사양 |
|------|------|
| 통신 | 직렬(UART) |
| 인식 | 중영 웨이크워드 |
| 플랫폼 | Jetson, Nano, 라즈베리파이, PC |
| 시각화 | ROS2 RViz2 |
| 펌웨어 | 오픈소스 굽기 도구 |

## 빠른 시작

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"인식 결과: {data}")
```

## 관련 튜토리얼

- [KWS 음성 인식 모듈 시리즈 튜토리얼](/ko/tutorials/accessories/KWS-speech-recognition-module/)
- [중문/영문 인식어 펌웨어 다운로드 및 굽기](/ko/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [ROS2 RViz2 시각화](/ko/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 기술 지원

- 📧 이메일：support@juxitech.com
- 🌐 공식 사이트：[www.juxitech.com](https://www.juxitech.com)
