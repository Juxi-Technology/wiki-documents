---
title: "51 MCU: GPS 파싱"
description: "이번 과정에서는 주로 STC89C52RC 모델의 51 마이크로컨트롤러와 GPS 모듈을 사용하여 위치 정보 분석 기능을 구현하는 방법을 학습합니다."
---

# 51 MCU: GPS 파싱

**1. 학습 목표**

이번 과정에서는 주로 STC89C52RC 모델의 51 마이크로컨트롤러와 GPS 모듈을 사용하여 위치 정보 분석 기능을 구현하는 방법을 학습합니다.

**2. 사전 준비**

GPS 모듈은 UART와 USB로 통신하며, 여기서는 C51의 UART 포트를 사용하여 정보를 읽습니다. 모듈의 TX를 51 보드의 P3.0 핀에 연결합니다. VCC와 GND는 각각 5V와 GND에 연결합니다.

![그림 1](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/1.png)

**3.** **프로그램**

시리얼 포트와 데이터 배열을 초기화합니다

![그림 2](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/2.jpg) 

수신한 데이터를 읽고 분석합니다.

![그림 3](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/3.jpg) 

시리얼 포트를 통해 수신한 데이터를 출력합니다.

![그림 4](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/4.jpg) 

**4****. 실험 현상**

모듈에 전원을 인가하면 시동에 약 32s의 시간이 걸리며, 이후 모듈의 시리얼 출력 상태 램프가 계속 깜빡이고, 이때 정상적으로 데이터를 수신할 수 있습니다.

프로그램을 다운로드하여 실행하고, 시리얼 소프트웨어를 열고, 보드레이트를 9600으로 설정하면 시리얼에 현재 위치 정보가 반복 출력됩니다.

![그림 5](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/5.jpg) 

주의, 모듈 안테나는 실외에 있어야 합니다. 그렇지 않으면 GPS 신호를 검색하지 못할 수 있습니다.

<RelatedProducts slugs="gps-beidou-module" />
