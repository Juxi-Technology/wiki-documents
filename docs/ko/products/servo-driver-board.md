---
title: JUXI 버스 서보 드라이버 보드
description: "JUXI 버스 서보 드라이버 보드——단일 버스로 253개 서보 제어, 7~12.6V 광전압, Type-C 플러그 앤 플레이, LeRobot SO-ARM 전용 설계"
keywords: [servo driver, 서보 드라이버, 버스 서보, lerobot, so-arm]
---

# JUXI 버스 서보 드라이버 보드

> **[스토어에서 구매](https://www.juxitech.com/ko/products/bus-servo-driver-board)**

## 제품 개요

**주요 특징**:

- 단일 버스로 최대 **253개** 직렬 버스 서보 제어
- **7~12.6V** 광전압 입력, 전원 통합(DC 5521 인터페이스)
- 실시간 데이터 피드백: 위치, 속도, 토크, 동작 모드
- **Type-C 플러그 앤 플레이**, 라즈베리파이/Jetson/RDK/PC 호환
- 정밀 보정 장착 홀, 2분 만에 SO-ARM100/101 직접 장착
- TVS 보호 회로(과전압 과전류 보호)

## 제품 사양

| 항목 | 사양 |
|------|------|
| 입력 전압 | DC 7V ~ 12.6V |
| 인터페이스 | USB Type-C / UART |
| 서보 지원 | 최대 253개 직렬 버스 서보 |
| 데이터 피드백 | 위치, 속도, 토크 상태, 동작 모드 |
| 보드 크기 | 42.00mm × 33.00mm |
| 장착 홀 간격 | 37.00mm × 28.00mm(SO-ARM 장착 홀 일치) |
| 호환 서보 | 시중 주요 직렬 버스 서보 대부분 |
| 호환 보드 | 라즈베리파이, NVIDIA Jetson (Nano/Orin/Xavier), RDK, PC(Win/macOS/Linux), Orange Pi |

## 빠른 시작

```bash
# SO-ARM101 부팅 예제
python3 examples/arm_boot.py --port /dev/ttyACM0
```

## 관련 튜토리얼

- [SO-ARM101 개발 키트](/ko/products/so-arm101)
- [Feetech 버스 서보(SCS0009 / STS3215)](/ko/products/feetech-servo)

## 기술 지원

- 📧 이메일：support@juxitech.com
- 🌐 공식 사이트：[www.juxitech.com](https://www.juxitech.com)
