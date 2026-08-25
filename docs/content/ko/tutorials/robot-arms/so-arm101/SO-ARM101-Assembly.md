---
title: Lerobot 로봇 암 조립 가이드
description: "Pro 버전: 리더 암은 5V6A, 팔로워 암은 12V5A 전원 어댑터 사용"
---

# Lerobot 로봇 암 조립 가이드

> **[스토어에서 구매](https://www.juxitech.com/ko/products/so-arm101-developers-kit)**


**Pro 버전: 리더(검정) 암은 5V6A 전원 어댑터, 팔로워(흰색) 암은 12V5A 전원 어댑터 사용**

서보 ID 설정·각도 캘리브레이션·조립은 사전에 완료하세요. [공식 조립 가이드](https://huggingface.co/docs/lerobot/so101) 참조.

## 1단계: 서보 ID 설정, 서보 혼 장착(5번 제외)

**주의**: 서보 관절 ID와 기어비는 **SO-ARM101**과 정확히 일치해야 합니다.

버스의 각 모터에는 고유 ID가 필요합니다(신품은 기본 `1`). 통신 속도(보레이트)는 100000으로 설정합니다.

### Windows

[비트 서보 상위 프로그램.zip]으로 서보 ID(1~6) 설정 및 중립 위치 캘리브레이션.

### Linux/Ubuntu

```
lerobot-setup-motors \\
    --robot.type=so101_follower \\
    --robot.port=/dev/ttyACM0
```

gripper 서보부터 순서대로 연결하여 ID(6→1) 설정:

```
'gripper' motor id set to 6
```

각 서보는 **반드시 1개만** 연결한 상태로 작업하세요. 완료 후 ID 1 서보부터 3핀 케이블을 순서대로 연결합니다.

리더 암에도 동일 절차:

```
lerobot-setup-motors \\
    --teleop.type=so101_leader \\
    --teleop.port=/dev/ttyACM0
```

## 2단계: 조립

팔로워 암 조립은 리더와 거의 동일(12단계 이후 엔드이펙터 장착만 다름).

서보 드라이버 보드: 구리 스탠드 4개 → M2.5*8 나사 4개로 고정.