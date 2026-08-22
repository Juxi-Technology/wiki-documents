---
title: GPS & 北斗 GNSS 측위 모듈
description: "JUXI GPS & 北斗 GNSS 측위 모듈——ATGM336H-5N 칩, 4대 위성 시스템 연합 측위, 2.5m 정밀도, ROS 지원"
keywords: [gps, 북두, gnss, 측위, atgm336h]
---

# GPS & 北斗 GNSS 측위 모듈

> **[스토어에서 구매](https://www.juxitech.com/ko/products/gps-beidou-gnss-positioning-module)**

## 제품 개요

**주요 특징**:

- **BDS/GPS/QZSS/GLONASS** 4대 위성 시스템 지원(단일 또는 임의 조합)
- **32채널** 고감도 수신기, 안정적인 측위
- 측위 정밀도 **2.5m (CEP50)**, 콜드 스타트 32초
- 플러그 앤 플레이 USB 직렬 + TTL 직렬
- Arduino/Jetson/라즈베리파이/ROS 오픈소스 튜토리얼 제공

## 제품 사양

| 항목 | 사양 |
|------|------|
| 칩 | ATGM336H-5N |
| 위성 시스템 | BDS / GPS / QZSS / GLONASS |
| 채널 수 | 32채널, 다중 시스템 동시 수신 |
| 측위 정밀도 | <2.5m (CEP50) |
| 업데이트 주파수 | 기본 1Hz, 최대 10Hz |
| 보율 | 4800-115200bps(기본 9600) |
| 감도 | 콜드 스타트 -148dBm, 추적 -162dBm |
| 소비 전력 | 25mA @ 3.3V |
| 동작 온도 | -40℃ ~ +85℃ |
| 인터페이스 | USB Type-C / TTL 직렬(PH2.0) |

## 빠른 시작

```bash
# USB 직렬 확인
ls /dev/ttyUSB*
# 데이터 수신(예: /dev/ttyUSB0, 9600bps)
sudo gpsd /dev/ttyUSB0 -n
cgps
```

## 관련 튜토리얼

- [공식 저장소](https://github.com/Juxi-Technology)

## 기술 지원

- 📧 이메일：support@juxitech.com
- 🌐 공식 사이트：[www.juxitech.com](https://www.juxitech.com)
