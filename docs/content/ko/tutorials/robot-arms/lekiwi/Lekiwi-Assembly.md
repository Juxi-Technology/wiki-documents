---
title: Lekiwi 이동 로봇 조립 튜토리얼
description: "Fusion360 온라인 CAD에서 정확한 부품 위치를 시각화할 수 있습니다."
---

# Lekiwi 이동 로봇 조립 튜토리얼

> **[스토어에서 구매](https://www.juxitech.com/ko/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

[*Fusion360 온라인 CAD*](https://a360.co/4k1P8yO)*에서 각 부품의 정확한 위치를 확인할 수 있습니다.*

[URDF 파일](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

온라인 URDF 미리보기 https://urdf.d-robotics.cc/

## 1. 휠 모듈 조립 (로봇 1대당 3개)

1. **M2x6** 셀프 태핑 나사 12개를 사용하여 구동 모터를 모터 브래킷에 고정합니다. (서보 박스에 포함되어 있습니다.)

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-01.png)
![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-02.png)

2. **M3x16** 기계 나사 12개와 **M3 너트** 12개를 사용하여 구동 모터 브래킷으로 서보를 베이스 플레이트에 고정합니다.

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-03.jpg)

3. 82mm 옴니 휠에서 기계 나사와 너트를 분리합니다.

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-04.png)

4. m3\*6 나사를 사용하여 서보 혼을 서보에 고정합니다.

![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-05.png)

5. 커플링에 잠금 너트 4개를 설치합니다. 먼저 m3\*6 나사 4개를 사용하여 커플링을 서보 혼에 고정합니다.

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-06.png)
![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-07.png)

6. m3\*25 기계 나사와 잠금 너트를 사용하여 82mm 옴니 휠을 커플링에 고정합니다.



세 개의 휠을 모두 베이스 플레이트에 설치한 후:

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-09.jpg)

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-10.png)

## 2. 베이스 플레이트 조립

1. 서보 드라이버 보드와 배터리 마운트의 구멍에 M3 너트 2개를 삽입합니다. M3x12 육각 나사 4개를 사용하여 두 부품을 베이스 플레이트에 고정합니다.

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-11.png)
![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-12.png)

2. M3\*12 육각 나사 2개와 M3 너트 2개를 사용하여 서보 드라이버 보드를 설치하고 3개의 서보에 연결합니다.

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-13.png)

휴대용 전원 공급 장치 케이블 연결

- **전원 입력**은 전원 공급 장치에 직접 연결됩니다

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-14.png)
![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-15.png)

- **USB-C** 인터페이스는 Raspberry Pi에 5V 전원을 공급합니다
- **12V 로봇 암**을 사용하는 경우 **DC 전원 분배기**로 **서보 모터 보드**에 직접 전원을 공급합니다

![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-16.png)
![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-17.png)

케이블은 아래 그림과 같이 연결할 수 있습니다:

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-18.png)

## 3. 상판 조립

1. Raspberry Pi 5를 Raspberry Pi 케이스 하단에 넣은 다음, 케이스 상단을 끼워 결합합니다.

2. M3x16 육각 나사 2개와 M3 너트 2개를 사용하여 Raspberry Pi를 상판 베이스 플레이트에 고정하고, M4x25 기계 나사 4개와 M4 너트 4개를 사용하여 SO-101 로봇 암 베이스를 설치합니다.

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-19.png)

## 4.

1. 서보 드라이버 보드의 USB-C to USB-A 케이블, 5V USB-C 전원 케이블, 서보 케이블을 상판의 구멍을 통해 배선합니다.

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-20.png)

2. m3x16 기계 나사 8개와 m3 너트 4개를 사용하여 상판을 모터 브래킷에 설치합니다.

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-21.png)



## 5. 카메라 설치

*참고: 저희가 설계한 브래킷은 저희가 선택한 카메라에 맞춰 제작되었습니다. 다른 카메라 모듈을 사용하는 경우 수정이 필요할 수 있습니다.*

## (옵션 1) 전방 카메라 설치

①m2\*5\*5 스페이서 나사 4개를 사용하여 카메라 모듈을 고정합니다

②m3\*12 기계 나사 2개와 m3 너트 2개를 사용하여 전방 카메라 브래킷을 베이스 플레이트에 설치합니다

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-22.webp)
![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-23.webp)

## (옵션 2) 로봇 암 장착형 카메라 설치

m2\*5\*5 스페이서 나사 4개를 사용하여 카메라 모듈을 고정합니다

이 브래킷은 홀 간격이 24\*25mm 또는 28\*28mm인 카메라를 지원합니다

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-24.png)

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-25.png)

## 6. 전원 연결 및 배선

DC 배럴 플러그 어댑터를 **서보 드라이버 보드**에 연결합니다.

5V USB-C 커넥터를 **Raspberry Pi 5**에 연결하여 전자 부품에 전원을 공급합니다.

서보 드라이버 보드와 카메라의 USB 데이터 케이블은 Raspberry Pi에 직접 연결할 수 있습니다.

![image – 26](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-26.png)
