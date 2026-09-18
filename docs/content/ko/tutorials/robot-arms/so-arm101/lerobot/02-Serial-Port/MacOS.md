---
title: "2단계: 시리얼 장치 포트 번호 확인 (macOS)"
description: "macOS에서 시리얼 포트 목록을 확인해 권한을 부여하고, 같은 장치가 두 포트로 보이는 이유까지 함께 설명합니다."
---

# 2단계: 시리얼 장치 포트 번호 확인 (macOS)

## 포트 확인

```Shell
ls /dev/tty.*
```

결과는 아래 그림과 유사하며, 두 포트 중 아무 것이나 사용해도 됩니다

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-MacOS/1.png)

## 포트에 권한 부여

모든 사용자가 이 시리얼 포트 장치를 읽고 쓸 수 있는 권한을 갖도록 합니다

```Shell
chmod 666 /dev/tty.*
```

## 내 포트 기록

팔로워 암:

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

리더 암:

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## 왜 Mac에서는 포트가 두 개 보이나요?

우리가 사용하는 서보모터 제어 보드는 Mac 시스템에서 **동시에 두 가지 서로 다른 유형의 시리얼 드라이버로 인식**되므로, 포트가 두 개 표시됩니다:

- 하나는 시스템 기본 범용 시리얼 드라이버(`/dev/tty.usbmodemxxxx`)입니다

- 다른 하나는 칩 제조사(예를 들어 여기서 "wch"는 난징 친헝의 CH340/CH341 칩에 해당)가 제공하는 전용 시리얼 드라이버(`/dev/tty.wchusbserialxxxx`)입니다

이는 정상적인 현상이며, **두 포트는 실제로 동일한 하드웨어 장치에 대응**하므로 어느 것을 선택해도 연결·통신할 수 있습니다(예를 들어 로봇 암을 제어하는 소프트웨어에서 둘 중 하나의 포트를 선택하면 됩니다).

이후 특정 포트에서 오류가 발생하면 다른 포트로 바꿔 시도해 보세요.

<RelatedProducts slugs="so-arm101" />
