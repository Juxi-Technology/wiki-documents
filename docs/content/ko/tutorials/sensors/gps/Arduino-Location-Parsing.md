---
title: "GPS 위치 정보 분석"
description: "이번 과정에서는 주로 arduino와 GPS 모듈을 사용하여 위치 정보 분석 및 출력 기능을 구현하는 방법을 학습합니다."
---

# GPS 위치 정보 분석

**1. 학습 목표**

이번 과정에서는 주로 arduino와 GPS 모듈을 사용하여 위치 정보 분석 및 출력 기능을 구현하는 방법을 학습합니다.

**2. 사전 준비**

GPS 모듈은 UART와 USB로 통신하며, 여기서는 arduino UNO의 UART 포트를 사용하여 정보를 읽습니다. 모듈의 TX를 arduino UNO 보드의 D0 핀에 연결합니다. VCC와 GND는 각각 5V와 GND에 연결합니다.

![그림 1](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/1.png)

**3.** **프로그램**

시리얼 포트를 초기화합니다.

![그림 2](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/2.jpg) 

시리얼 데이터를 읽습니다.

![그림 3](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/3.jpg) 

시리얼 데이터를 분석합니다.

![그림 4](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/4.jpg) 

분석 후의 위치 정보를 출력합니다.

![그림 5](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/5.jpg) 

**4. 컴파일 및 프로그램 다운로드**

4.1 Arduino IDE 소프트웨어로 파일을 열고, 메뉴 표시줄의 "√"를 클릭하여 프로그램을 컴파일한 후, 왼쪽 아래에 "컴파일 성공"이라는 문구가 나타날 때까지 기다려야 합니다.

 ![그림 6](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/6.jpg)

4.2 Arduino IDE의 메뉴 표시줄에서 【도구】---【포트】---장치 관리자에 방금 표시된 포트 번호를 선택해야 합니다. 아래 그림과 같습니다.

![그림 7](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/7.jpg) 

4.3 선택이 완료되면 메뉴 표시줄 아래의 "→"를 클릭하여 코드를 UNO 보드에 업로드합니다. 왼쪽 아래에 "업로드 완료"라는 문구가 나타나면 프로그램이 UNO 보드에 성공적으로 업로드된 것입니다. 아래 그림과 같습니다.

![그림 8](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/8.jpg) 

 

**5. 실험 현상**

모듈에 전원을 인가하면 시동에 약 32s의 시간이 걸리며, 이후 모듈의 시리얼 출력 상태 램프가 계속 깜빡이고, 이때 정상적으로 데이터를 수신할 수 있습니다.

프로그램을 다운로드하여 실행하고, 시리얼 모니터 창을 열고, 시리얼 소프트웨어를 열고, 보드레이트를 9600으로 설정하면 시리얼에 분석된 실시간 위치 정보가 반복 출력됩니다.

![그림 9](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/9.jpg) 

주의, 모듈 안테나는 실외에 있어야 합니다. 그렇지 않으면 GPS 신호를 검색하지 못할 수 있습니다.

<RelatedProducts slugs="gps-beidou-module" />
