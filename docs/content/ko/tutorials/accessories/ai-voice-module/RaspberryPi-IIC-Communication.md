---
title: "라즈베리파이: IIC 통신"
description: "AI 음성 인터랙션 모듈 라즈베리파이 IIC 통신 — I2C 활성화와 배선 설명, 실행 및 출력 형식 확인까지 안내합니다."
---

# 라즈베리파이: IIC 통신

## 의존성 설치

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## I2C 활성화

```Plain Text
sudo raspi-config
```

`Interface Options` -> `I2C` -> `Yes` 선택

Raspberry Pi 재부팅

## 파일 위치

`~/IIC_Voice/iic_voice.py`

## 배선 설명

![그림 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication/1.png)

## 실행

```Plain Text
cd IIC_Voice
```

```Plain Text
python3 iic_voice.py
```

## 출력 형식

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

<RelatedProducts slugs="ai-voice-module" />
