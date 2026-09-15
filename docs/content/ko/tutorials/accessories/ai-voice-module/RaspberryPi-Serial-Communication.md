---
title: "시리얼 통신"
description: "그런 다음 Raspberry Pi 를 재부팅합니다."
---

# 시리얼 통신

## 의존성 설치

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## 파일 위치

`~/UART_Voice/uart_voice.py`

## 시리얼 포트 활성화

`/boot/firmware/config.txt` 또는 `/boot/config.txt` 를 편집하여 다음 설정을 확인합니다:

```Plain Text
enable_uart=1
dtoverlay=disable-bt
```

그런 다음 Raspberry Pi 를 재부팅합니다.

```Plain Text
sudo reboot
```

## 배선 설명

Type 를 Raspberry Pi 에 직결하는 경우, `SERIAL_PORT = '/dev/ttyUSB0'` 의 주석을 해제하고 `SERIAL_PORT = '/dev/ttyAMA0'` 를 주석 처리합니다

![그림 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/1.png)

UART 핀을 통해 Raspberry Pi 에 연결

![그림 2](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/2.png)

`SERIAL_PORT = '/dev/ttyUSB0'` 를 주석 처리하고 `SERIAL_PORT = '/dev/ttyAMA0'` 의 주석을 해제합니다

![그림 3](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/3.png)

## 실행

```Plain Text
cd UART_Voice
```

```Plain Text
python3 uart_voice.py
```

## 출력 형식

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

<RelatedProducts slugs="ai-voice-module" />
