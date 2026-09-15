---
title: "STM32F103: GPS 파싱 출력"
description: "이번 과정에서는 주로 STM32F103C8T6와 GPS 모듈 모듈을 사용하여 위치 정보 분석 출력 기능을 구현하는 방법을 학습합니다."
---

# STM32F103: GPS 파싱 출력

**1. 학습 목표**

이번 과정에서는 주로 STM32F103C8T6와 GPS 모듈 모듈을 사용하여 위치 정보 분석 출력 기능을 구현하는 방법을 학습합니다.

**2. 사전 준비**

GPS 모듈은 UART와 USB로 통신하며, 여기서는 STM32의 UART 포트를 사용하여 정보를 읽습니다. 모듈의 TXD를 STM32F103C8T6 보드의 PA10 핀에 연결합니다. VCC와 GND는 각각 STM32F103C8T6의 5V와 GND에 연결합니다. TTL 모듈의 GND와 RXD는 각각 STM32의 GND와 PA9에 연결합니다.

![그림 1](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/1.png)

**3.** **프로그램**

모듈의 보드레이트는 9600입니다.

![그림 2](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/2.jpg) 

수신한 데이터를 읽고 분석합니다.

![그림 3](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/3.jpg) 

위도 경도 정보의 단위를 도로 변환합니다

![그림 4](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/4.jpg) 

시리얼 포트를 통해 수신한 데이터를 출력합니다.

![그림 5](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/5.jpg) 

주의: 실제로 GPS/北斗 측위의 좌표계 값은 단순한 100배 관계가 아니라, 한 번 도분초 변환을 해야 합니다. 즉 우리가 획득한 GPS/北斗 좌표값, 예를 들어 북위 2429.53531, 동경 11810.78036은 다음과 같이 계산해야 합니다: 24+(29.53531/60)≈ 24.49225517 118+(10.78036/60)≈118.17967267. 또한 마이크로컨트롤러에 따라 데이터 변환 정밀도 문제로 인해 일정한 오차가 존재할 수 있습니다.

**4. 실험 현상**

모듈에 전원을 인가하면 시동에 약 32s의 시간이 걸리며, 이후 모듈의 시리얼 출력 상태 램프가 계속 깜빡이고, 이때 정상적으로 데이터를 수신할 수 있습니다.

프로그램을 다운로드하여 실행하고, 시리얼 소프트웨어를 열고, 보드레이트를 9600으로 설정하면 시리얼에 현재 위치 정보가 반복 출력됩니다.

![그림 6](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/6.jpg) 

주의, 모듈 안테나는 실외에 있어야 합니다. 그렇지 않으면 GPS 신호를 검색하지 못할 수 있습니다.

<RelatedProducts slugs="gps-beidou-module" />
