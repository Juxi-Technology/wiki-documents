---
title: "Arduino Nano 사용 튜토리얼"
description: "Arduino Nano(328P)와 서보 드라이버 보드로 AmazingHand 「02 데모 프로그램」 실행: 배선, 라이브러리 설치, 컴파일 업로드 및 실행 결과."
---

# Arduino Nano 사용 튜토리얼

## 배선 방법(서보 드라이버 보드 + Nano 보드)

**Nano 보드(즉 328P 개발 보드)의 핀 위치를 잘 확인하세요!**

![그림](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/01.png)

![그림](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/02.png)

![그림](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/03.png)

![그림](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/04.png)

아래는 마이크로컨트롤러를 사용한 디버깅 과정을 설명합니다. 마이크로컨트롤러 자체가 데모 프로그램을 계속 반복 실행하므로 데이터 케이블만 뽑으면 정지됩니다.

## 「02 데모 프로그램」 실행

1. Arduino IDE를 직접 설치합니다.

2. **왼손인지 오른손인지**에 따라 해당 `.ino` 파일을 엽니다.

   ![그림](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/05.png)

3. Arduino 프로그램을 컴파일하여 Nano 보드에 업로드하기 전에 먼저 「라이브러리 관리자」에서 **FTServo 라이브러리**와 **SCServo 라이브러리**를 설치합니다.

   ![그림](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/06.png)

4. Nano 보드 종류는 「**Arduino Nano**」를 선택합니다.

   ![그림](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/07.png)

5. 컴파일하고 업로드합니다.

> **주의:** 이때 컴퓨터는 Nano 보드에만 단독으로 연결하며, Nano 보드는 아직 서보 드라이버 보드에 연결하지 마세요(즉, 로봇 손과 연결하지 않습니다).

업로드에 성공하면 Nano 보드를 점퍼 와이어 3개로 서보 드라이버 보드에 연결하고, 서보를 서보 드라이버 보드에 연결합니다. 참고: [MEGA328P Nano 보드 디버깅 시 배선 방법](https://juxitech.feishu.cn/wiki/Wt46wtt26imdWkkQlxTcL87qnHd#share-HdS4dNgwyo2seVxRZ9PcZ1R3nuc).

로봇 손은 「02 데모 프로그램」을 계속 반복 실행합니다. 실행 결과는 다음과 같습니다:

![그림](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/08.png)
