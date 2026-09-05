---
title: 2 자유도 서보 팬틸트
category: accessory
description: 鉅犀科技 2 자유도 서보 팬틸트 — SCS0009 버스 서보, 수평 180°/수직 90°, 200만 화소 카메라, AI 비전 추적
keywords: [gimbal, 팬틸트, 2dof, 비전 추적, scs0009]
---

# 2 자유도 서보 팬틸트

> **[스토어에서 구매](https://www.juxitech.com/ko/products/2-dof-servo-pan-tilt-unit)**

## 제품 개요

2 자유도 서보 팬틸트는 고정밀 SCS0009 직렬 버스 서보를 장착하고 수평 180° / 수직 90° 2축 전동 구동을 지원합니다. 기본으로 200만 화소 HD USB 카메라(1080P 줌/고정 초점 모듈 선택 가능)를 제공하며, 얼굴·색상·QR 코드 인식과 실시간 추적을 지원합니다.

**주요 특징**:

- 2 자유도(수평 180° / 수직 90°)
- SCS0009 버스 서보: 2.5kg.cm 토크, 0.293° 정밀도, 실시간 피드백
- 스톨/과열/전압 보호 + TVS 레귤레이터 드라이버 보드
- 200만 화소 카메라, 줌 30FPS / 고정 60FPS 선택 가능
- 밀폐형 배선 은폐 설계

## 사양

| 카테고리 | 사양 |
|------|------|
| 서보 | FEETECH SCS0009 × 2 |
| 회전 범위 | 수평 180°, 수직 90° |
| 카메라 | 200만 화소 USB 플러그 앤 플레이(줌/고정 선택 가능) |
| 비전 기능 | 얼굴/색상/QR 코드 인식 추적 |
| 호환 호스트 | Raspberry Pi, Jetson, RDK |

## 빠른 시작
```bash
# USB 连接主控,摄像头即插即用
# Python SDK 控制云台
from sc_servo import SCServo, Gimbal
servo = SCServo("COM3")  # Linux: /dev/ttyUSB0
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()
gimbal.set_angle(0, 30)
```
## 관련 튜토리얼

- [2 자유도 카메라 팬틸트 튜토리얼](/ko/tutorials/accessories/2dof-camera-gimbal)

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
