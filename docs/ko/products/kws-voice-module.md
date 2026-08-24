---
title: KWS 음성 상호작용 모듈
description: 鉅犀科技 KWS 음성 인식 상호작용 모듈 — 중문/영문 인식어, 직렬/RViz2 시각화, Jetson/라즈베리파이 지원, 펌웨어 오픈소스
keywords: [kws, 음성 인식, 음성 상호작용, 웨이크 워드, ai voice]
---

# KWS 음성 상호작용 모듈

> **[스토어에서 구매](https://www.juxitech.com/ko/products/ai-voice-recognition-module)**

## 제품 개요

KWS(Keyword Spotting)음성 인식 상호작용 모듈은 중문/영문 인식어 다운로드와 굽기를 지원합니다. 음성 칩은 **수령 후 출고 펌웨어를 먼저 굽어야 합니다**. 직렬로 호스트와 통신하며 Jetson, 라즈베리파이 등 플랫폼을 지원하고 ROS2 RViz2 시각화를 제공합니다.

**주요 특징**:

- 중문/영문 인식어 펌웨어(다운로드 및 굽기)
- 직렬 통신(PC/Jetson/라즈베리파이/Jetson Nano)
- ROS2 + RViz2 시각화
- 오픈소스 저장소, Python 직렬 예제
- 100% 오프라인 인식, 인터넷 불필요(프라이버시 + 저지연)
- 일반 환경 인식 정확도 >95%, 명령 입력 300ms 내 응답
- 최대 100개 사용자 지정 음성 명령, 웨이크 워드 커스터마이즈 가능
- 저전력: 평균 작동 전류 <50mA

## 제품 사양

| 카테고리 | 사양 |
|------|------|
| 통신 | 직렬(UART) |
| 인식 | 중문/영문 웨이크 워드 |
| 플랫폼 | Jetson, Nano, 라즈베리파이, PC |
| 시각화 | ROS2 RViz2 |
| 펌웨어 | 오픈소스 굽기 도구 |

## 빠른 시작

```bash
# 烧录固件(参考教程)
# Python 串口通信示例
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"识别结果: {data}")
```
## 관련 튜토리얼

- [KWS 음성 인식 모듈 시리즈](/ko/tutorials/accessories/KWS-speech-recognition-module/)
- [중문/영문 인식어 펌웨어 다운로드 및 굽기](/ko/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [ROS2 RViz2 시각화](/ko/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
