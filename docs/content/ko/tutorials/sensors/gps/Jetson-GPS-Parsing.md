---
title: "GPS 모듈 위치 정보 분석"
description: "이번 과정에서는 주로 Jetson Orin과 GPS 모듈을 사용하여 위치 정보를 읽고 분석하는 것을 구현하는 방법을 학습합니다."
---

# GPS 모듈 위치 정보 분석

**1. 학습 목표**

이번 과정에서는 주로 Jetson Orin과 GPS 모듈을 사용하여 위치 정보를 읽고 분석하는 것을 구현하는 방법을 학습합니다.

**2. 사전 준비**

GPS 모듈은 UART 통신 또는 USB 통신을 사용하며, 여기서는 USB 통신을 예로 듭니다.

![그림 1](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/1.png)

type-c 케이블로 Jetson Orin과 GPS 모듈을 연결하고, 명령 ls /dev | grep 'ttyUSB' 을 실행하면 GPS 모듈이 USB0로 인식되는 것을 확인할 수 있습니다

![그림 2](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/2.jpg) 

**3****. 프로그램**

이번 과정의 프로그램은 다음을 참조하십시오: GPS.py

USB를 초기화합니다:

![그림 3](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/3.jpg) 

위치 정보 획득 및 분석 함수입니다. 아래 그림에서는 위치 정보 중 GNGGA로 시작하는 위치 정보를 추출한 후, 데이터를 분석하여 각 전역 변수에 저장합니다.

![그림 4](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/4.jpg) 

![그림 5](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/5.jpg) 

같은 방법으로 GNVTG의 방위 정보를 획득하여 분석합니다.

![그림 6](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/6.jpg) 

분석된 데이터를 반복 출력합니다

![그림 7](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/7.jpg) 

**4. 프로그램 실행**

터미널에 sudo python3 GPS.py를 입력하여 프로그램을 실행합니다.

**5.실험 현상**

모듈에 전원을 인가하면 시동에 약 32s의 시간이 걸리며, 이후 모듈의 시리얼 출력 상태 램프가 계속 깜빡이고, 이때 정상적으로 데이터를 수신할 수 있습니다.

프로그램을 실행하면 USB 초기화가 시작되고, 초기화에 성공하면 "GPS Serial Opened! Baudrate=9600"이 표시되며, 그렇지 않으면 "GPS Serial Open Failed!"가 표시됩니다. 오류가 있으면 배선 또는 USB 포트를 확인해야 합니다. 이후 위치와 방위 정보가 반복 출력됩니다.

![그림 8](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/8.jpg) 

Ctrl+C를 눌러 정보 읽기를 종료합니다.

![그림 9](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/9.jpg) 

주의, 모듈 안테나는 실외에 있어야 합니다. 그렇지 않으면 GPS 신호를 검색하지 못할 수 있습니다. 신호가 검색되지 않을 때는 "GPS no found"가 출력됩니다.

<RelatedProducts slugs="gps-beidou-module" />
