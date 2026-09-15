---
title: "IIC 통신"
description: "로그아웃 후 다시 로그인하면 적용됩니다."
---

# IIC 통신

## 의존성 설치

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## 사용자 그룹 확인

```Plain Text
sudo usermod -aG i2c $USER
```

```Plain Text
sudo usermod -aG dialout $USER
```

로그아웃 후 다시 로그인하면 적용됩니다.

## 파일 위치

`IIC_Voice/iic_voice.py`

## 배선 설명

![그림 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication/1.png)

## I2C 장치 확인

```Plain Text
sudo i2cdetect -y -r 1
```

주소 `0x2A` 를 확인할 수 있어야 합니다

## 실행

```Plain Text
cd IIC_Voice
```

```Plain Text
sudo python3 iic_voice.py
```

## 출력 형식

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

## 자주 묻는 질문

### I2C 권한 문제

```Plain Text
sudo chmod 666 /dev/i2c-1
```



