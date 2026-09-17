---
title: GPS & 北斗 GNSS 측위 모듈
category: sensor
description: "Juxi Technology GPS & 北斗 GNSS 측위 모듈 — ATGM336H-5N 칩, 4대 위성 시스템 연합 측위, 2.5m 정밀도, ROS 지원"
keywords: [gps, beidou, gnss, 북두, 측위 모듈, ros]
---

# GPS & 北斗 GNSS 측위 모듈

> **[스토어에서 구매](https://www.juxitech.com/ko/products/gps-beidou-gnss-positioning-module)**

## 제품 개요

GPS & BDS 측위 모듈은 유니코어(和芯星通) **ATGM336H-5N** 칩을 기반으로 북두 2세대/3세대(1-63번 전 위성), GPS, GLONASS, QZSS 등 위성 항법 시스템을 지원합니다. 다중 시스템 신호를 동시 수신해 연합 측위, 내비게이션, 시각 동기화를 실현합니다.

**주요 특징**:

- **BDS/GPS/QZSS/GLONASS** 4대 위성 시스템(단일 또는 임의 조합)
- **32채널** 고감도 수신기, 안정적인 측위
- 측위 정밀도 **2.5m (CEP50)**, 콜드 스타트 32초
- 플러그 앤 플레이 USB 직렬 + TTL 직렬
- Arduino/Jetson/Raspberry Pi/ROS 오픈소스 튜토리얼 제공

## 제품 사양

| 카테고리 | 사양 |
|------|------|
| 칩 | ATGM336H-5N |
| 위성 시스템 | BDS / GPS / QZSS / GLONASS |
| 채널 수 | 32채널, 다중 시스템 동시 수신 |
| 측위 정밀도 | <2.5m (CEP50) |
| 갱신 주파수 | 기본 1Hz, 최대 10Hz |
| 보레이트 | 4800-115200bps(기본 9600) |
| 감도 | 콜드 스타트 -148dBm, 추적 -162dBm |
| 소비 전력 | 25mA @ 3.3V |
| 작동 온도 | -40℃ ~ +85℃ |
| 인터페이스 | USB Type-C / TTL 직렬(PH2.0) |

## 핀 설명

| 핀 | 기능 |
|------|------|
| 5V | 전원 입력 |
| RES | 모듈 리셋 |
| PPS | 초당 펄스 출력 |
| TX | 직렬 데이터 출력 |
| RX | 직렬 데이터 입력(선택) |

## 빠른 시작

### 1. 안테나와 모듈 연결

3미터 능동 GPS 안테나를 모듈에 연결하고, 안테나는 시야가 트인 곳(실외 또는 창가)에 배치해 빠른 위성 탐색을 지원합니다.

### 2. USB로 PC/호스트 연결

Type-C 데이터 케이블로 직결, 플러그 앤 플레이(기본 9600bps).

### 3. 측위 확인

```bash
# 安装 pynmea2 解析 NMEA 数据
pip install pynmea2

# 读取定位数据示例
import serial
import pynmea2

ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
while True:
    line = ser.readline().decode(errors='ignore')
    if line.startswith('$GPRMC') or line.startswith('$GNRMC'):
        msg = pynmea2.parse(line)
        print(f'纬度: {msg.latitude}, 经度: {msg.longitude}')
```
### 4. ROS 통합

ROS 측위 노드를 지원하며 IMU 퓨전, Move_Base 내비게이션과 함께 사용할 수 있습니다.

## 도구와 자료

- **GnssToolKit3**:시각화 도구. 위성 상태 확인, 데이터 기록, KML 내보내기 지원
- **좌표계 변환**:WGS-84 → GCJ-02 → BD-09 완전 솔루션 제공
- **샘플 코드**:Arduino / Python / Jetson Nano 튜토리얼
- [공식 저장소](https://github.com/Juxi-Technology)(IMU/측위 관련 코드)

## 자주 묻는 질문

**Q: 측위가 느리거나 신호가 없나요?**

**A:** 안테나는 시야가 트인 곳(실외/창가)에 설치하세요. 안테나 연결을 확인하고, 콜드 스타트에 32초가 걸리므로 첫 부팅 시 잠시 기다리세요.

**Q: 지원 위성 시스템은?**

**A:** BDS, GPS, QZSS, GLONASS 4개 시스템. 단일 또는 임의 조합 연합 측위 가능.

**Q: 마이컴에 연결할 수 있나요?**

**A:** 네. TTL 직렬(PH2.0)로 MCU 개발 보드에 연결 가능. 51/Arduino/STM32 튜토리얼 포함.

**Q: 출력 형식은?**

**A:** 표준 NMEA 0183 프로토콜.

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
- 💬 [문제 피드백](https://github.com/Juxi-Technology/wiki-documents/issues)
