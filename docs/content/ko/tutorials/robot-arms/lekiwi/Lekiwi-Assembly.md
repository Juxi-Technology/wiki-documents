---
title: Lekiwi 이동 로봇 조립 튜토리얼
description: "Fusion360 온라인 CAD에서 정확한 부품 위치를 시각화할 수 있습니다."
---

# Lekiwi 이동 로봇 조립 튜토리얼

> **[스토어에서 구매](https://www.juxitech.com/ko/products/lekiwi-embodied-intelligence-mobile-robotic-car)**


[*Fusion360 온라인 CAD*](https://a360.co/4k1P8yO)*에서 정확한 부품 위치를 시각화할 수 있습니다.*
[URDF 파일](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)
온라인 URDF 미리보기 https://urdf.d-robotics.cc/

## 1. 휠 모듈 조립(로봇 1대당 3개)

1. 12개의 **M2x6** 셀프 태핑 나사로 구동 모터를 모터 브래킷에 고정합니다.(서보 박스 포함)

![image – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/1.jpg)

![image – 2](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/2.jpg)





2. 12개의 **M3x16 기계 나사와 12개의** 로 구동 모터 브래킷을 바닥판에 고정합니다.

![image – 3](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/3.jpg)



3. 82mm 전방향 휠의 기계 나사와 너트를 분리합니다

![image – 4](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/4.jpg)



4. m3*6 나사로 서보 혼을 서보에 고정합니다

![image – 5](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/5.jpg)



5. 4개의 풀림 방지 너트를 커플링에 넣고 4개의 m3*6 나사로 커플링을 서보 혼에 고정합니다

![image – 6](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/6.jpg)

![image – 7](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/7.jpg)





6. m3*25 기계 나사와 풀림 방지 너트로 82mm 전방향 휠을 커플링에 고정합니다

3개의 휠을 모두 바닥판에 장착한 후:

![image – 8](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/8.jpg)

![image – 9](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/9.jpg)

![image – 10](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/10.jpg)







## 2. 바닥판 조립

1. M3 너트를 서보 드라이버 보드와 배터리 장착 시트의 구멍에 삽입합니다. 4개의 M3x12 기계 나사로 둘을 바닥판에 고정합니다.

![image – 11](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/11.jpg)

![image – 12](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/12.jpg)





2. 4개의 M2.5*6.5 구리 스탠드와 4개의 M2.5*8 나사로 서보 드라이버 보드를 설치하고 3개의 서보에 연결합니다.



모바일 전원 케이블 연결

- **전원 입력**은 전원에 직접 연결





- **USB-C** 인터페이스는 라즈베리파이에 5V 전원 공급
- **12V 로봇팔**을 사용하는 경우 **DC 전원 분배기**로 직접 **서보 모터 보드**에 급전





케이블은 아래 그림처럼 연결할 수 있습니다:

![image – 13](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/13.jpg)

![image – 14](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/14.jpg)

![image – 15](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/15.jpg)

![image – 16](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/16.jpg)

![image – 17](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/17.jpg)

![image – 18](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/18.jpg)



## 3. 상판 조립

1. 라즈베리파이 5를 라즈베리파이 케이스 하단에 넣고 케이스 상단을 끼웁니다.
2. 2개의 M3x12 기계 나사와 2개의 M3 풀림 방지 너트로 라즈베리파이를 상부 바닥판에 고정하고, 4개의 M4x25 기계 나사와 4개의 M4 풀림 방지 너트로 SO-101 로봇팔 베이스를 설치합니다. 개량된 SO-101 베이스든 정품 베이스든 상관없습니다. 바닥판에 두 베이스용 장착 구멍이 모두 준비되어 있기 때문입니다.

![image – 19](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/19.jpg)



## 4.

1. 서보 드라이버 보드의 USB-C to USB-A 케이블, 5V USB-C 전원 케이블, SO0-101 서보 케이블을 상부 바닥판의 구멍으로 통과시킵니다.

![image – 20](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/20.jpg)



2. 6개의 m3x12 기계 나사와 6개의 m3 풀림 방지 너트로 상부 바닥판을 모터 브래킷에 설치합니다.

![image – 21](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/21.jpg)



3. 6개의 M3*50 구리 스탠드와 6개의 M3* 기계 나사로 상판과 바닥판을 연결

## 5. 카메라 설치

*주의: 우리가 설계한 브래킷은 선택한 카메라 전용입니다. 다른 카메라 모듈은 수정이 필요할 수 있습니다.*

### (옵션 1) 전방 카메라 설치

3개의 m3*12 기계 나사와 3개의 m3 너트로 전방 카메라 브래킷을 바닥판에 설치합니다
4개의 m2*5*5 스페이서 나사로 카메라 모듈 고정

### (옵션 2) 암 장착 카메라 설치

4개의 m2*5*5 스페이서 나사로 카메라 모듈 고정

## 6. 전원 연결

DC 원통형 플러그 어댑터를 서보 드라이버 보드에 꽂고 5V USB-C 커넥터를 라즈베리파이 5에 꽂으면 전자 장치에 전원이 공급됩니다. 서보 드라이버 보드와 카메라의 USB 데이터 케이블은 라즈베리파이에 직접 꽂을 수 있습니다.


![Option 2 Install an arm-mounted camera – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/22.jpg)



