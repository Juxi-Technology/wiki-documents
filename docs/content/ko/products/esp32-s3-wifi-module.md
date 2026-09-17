---
title: ESP32-S3 WiFi 영상 모듈
category: compute-vision
description: "ESP32-S3 WiFi 영상 모듈(NanoCam): 200만 화소 카메라, AP+STA 실시간 전송과 8가지 AI 비전 모드 지원 제품 페이지."
keywords: [esp32, wifi, 영상 전송, 카메라, ai vision]
---

# ESP32-S3 WiFi 영상 모듈

> **[스토어에서 구매](https://www.juxitech.com/ko/products/esp32-s3-wifi-video-module)**

## 제품 개요

ESP32-WiFi 영상 전송 모듈(모델 **ESP32-NanoCam**)은 컴팩트하고 가성비 높은 AI 비전 솔루션으로, 듀얼 보드 모듈러 아키텍처(코어 처리 보드 + 통신 확장 보드)를 채택합니다. 코어 보드에는 **ESP32-S3** 고성능 프로세서와 200만 화소 HD 카메라를 탑재해 WiFi 영상 스트림 전송, AI 비전 인식과 음성 상호작용 기능을 지원하며, 펌웨어 사전 설치로 개봉 즉시 사용 가능합니다.

**주요 특징**:

- 200만 화소 HD 카메라(1600×1200@30FPS)
- **AP + STA 듀얼 모드** WiFi 실시간 전송
- 8가지 AI 모드: 고양이 얼굴 검출, 얼굴 검출, 색상 인식, 얼굴 인식, QR 코드 스캔, LLM 음성 대화(XiaoZhi AI), ESP-Claw 음성 제어
- 온보드 ES8311 오디오(마이크 + 스피커), 음성 상호작용 지원
- WS2812 RGB 상태 표시등
- Type-C 원클릭 펌웨어 업그레이드
- 표준 PH2.0 I2C / UART 통신 인터페이스

## 제품 사양

| 카테고리 | 사양 |
|------|------|
| 메인 MCU | ESP32-S3 N16R8(에스프레시프 공식, 듀얼 코어 240MHz) |
| 저장소 | 16MB Flash + 8MB PSRAM |
| 카메라 | 200만 화소 CMOS GC2145(1600×1200@30FPS) |
| 화각 | 대각 68°, 수평 49.5° |
| 오디오 | ES8311 코덱 + MEMS 마이크 + D급 앰프 스피커 |
| 상태 표시등 | WS2812 RGB |
| 무선 | WiFi(BT 듀얼 모드)AP/STA + 고이득 안테나 |
| 인터페이스 | Type-C / I2C / UART(PH2.0) |
| 기능 키 | 리셋 키 + BOOT 키 |
| 인식 능력 | 고양이 얼굴, 얼굴 검출, 얼굴 인식, 색상, QR 코드, 음성 대화 |

## 빠른 시작

### 1. 전원 연결

사전 설치된 펌웨어로 개봉 즉시 사용 가능. 전원을 켜면 모듈이 자체적으로 WiFi 핫스팟을 생성합니다:

- 휴대폰/PC에서 모듈 핫스팟에 연결
- 브라우저에서 지정 주소 접속해 실시간 영상 확인

### 2. 두 가지 동작 모드

| 모드 | 설명 |
|------|------|
| **AP 모드** | 모듈이 WiFi 핫스팟을 자체 생성, 단말이 모듈에 직접 연결 |
| **STA 모드** | 모듈이 기존 WiFi 라우터에 연결, 단말과 동일 네트워크로 전송 |

### 3. 호스트 연결

**UART 통신**(Raspberry Pi/Jetson Orin):

```
ESP32 模块 RX → 主控 TX
ESP32 模块 TX → 主控 RX
```

**I2C 통신**: 표준 PH2.0 I2C 인터페이스로 얼굴 감지/색상 인식의 **좌표 데이터**를 출력할 수 있습니다.

### 4. 2차 개발

Type-C로 PC에 연결해 원클릭 펌웨어 업그레이드;시리얼 명령으로 AI 모드(고양이 얼굴/얼굴 검출/색상/얼굴 인식/QR 코드/음성 대화)를 전환합니다. 전체 명령은 [시리얼 프로토콜 매뉴얼](/ko/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol)을 참조하세요.

---

## 전체 튜토리얼

- [빠른 시작 — 3분 만에 펌웨어 플래싱, WiFi 연결, 화면 열기](/ko/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start)
- [하드웨어 사양서 — 전체 GPIO 핀 매핑과 전원 설계](/ko/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec)
- [시리얼 프로토콜 매뉴얼 — WiFi 구성과 AI 모드 전체 AT 명령](/ko/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol)
- [AI 비전 튜토리얼 — 11장 단계별 실전(얼굴/고양이 얼굴/색상/QR 코드/음성)](/ko/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup)
- [ESP32-NanoCam을 SO-ARM101 무선 팔로워 암 컨트롤러로 사용](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)

---

## 응용 시나리오

- 무선 영상 전송(AP/STA 듀얼 모드)
- AI 비전 개발(색상/얼굴/QR 인식)
- IoT/AIoT 프로젝트
- 로봇 비전 확장

---

## 자주 묻는 질문

**Q: 실시간 영상은 어떻게 보나요?**

**A:** 사전 설치된 펌웨어가 AP 핫스팟을 자체 생성합니다. 휴대폰/PC에서 연결 후 지정 웹 페이지 또는 앱으로 확인합니다.

**Q: 어떤 인식을 지원하나요?**

**A:** 내장 색상 임계값 분할 + 경량 CNN으로 색상, 얼굴, QR 코드 인식을 지원하며 통신 명령으로 전환할 수 있습니다.

**Q: 인식 좌표를 반환할 수 있나요?**

**A:** 네. I2C/UART 통신 인터페이스로 얼굴/색상 감지 좌표 데이터를 출력해 2차 개발에 사용할 수 있습니다.

**Q: 펌웨어는 어떻게 업데이트하나요?**

**A:** Type-C로 PC에 연결, 원클릭 펌웨어 업그레이드 지원.

---

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
- 💬 [문제 피드백](https://github.com/Juxi-Technology/wiki-documents/issues)
