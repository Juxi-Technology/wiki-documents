---
title: AI 음성 인터랙션 모듈
category: accessory
description: Juxi Technology AI 음성 인터랙션 모듈(CI1302) — 110+개 오프라인 음성 명령어, 5m 이내 인식률 99%, 사용자 정의 중국어/영어 명령어 지원, 시리얼/IIC 통신, Arduino/Jetson/RDK/Raspberry Pi/PC 지원
keywords: [ai 음성, 음성 인터랙션 모듈, ci1302, 오프라인 음성 인식, 웨이크 워드, 명령어, 시리얼, iic, ros1, ros2]
---

# AI 음성 인터랙션 모듈

> **[타오바오에서 구매](https://item.taobao.com/item.htm?id=1055967142978)**

## 제품 개요

AI 음성 인터랙션 모듈은 Chipintelli **CI1302** 고성능 신경망 지능형 음성 칩을 기반으로 BNPU V3 두뇌 신경망 프로세서를 통합해 오프라인 원거리 음성 인식을 지원합니다. 온보드 **STC8H 코프로세서**는 음성 인식 결과를 자동으로 시리얼 포트 또는 IIC 데이터로 변환하여 외부 호스트 컨트롤러 장치와의 통신을 간소화합니다. 인식 전 과정은 모듈 로컬에서 완료되며 네트워크 연결이 필요하지 않습니다.

**주요 특징**:

- 100% 오프라인 음성 인식, 네트워크 불필요(프라이버시 + 저지연)
- 출하 시 **110+개 음성 명령어** 사전 설정, 사용자 정의 중국어/영어 명령어 지원(최대 약 120개)
- 웨이크 워드 “你好，小犀”, 15초간 명령어가 없으면 자동으로 절전 모드 진입, 재웨이크 시 바로 사용 가능
- 고음질 스피커와 고성능 마이크 내장, 노이즈 제거와 에코 제거, 5m 이내 인식률 최대 99%
- 온보드 STC8H 코프로세서, 인식 결과를 시리얼 포트 / IIC 데이터로 출력
- 능동 재생과 수동 재생 두 가지 재생 모드
- ROS1 / ROS2 SDK, Arduino / Jetson / RDK / Raspberry Pi / PC 통신 튜토리얼 제공

---

## 제품 사양

| 카테고리 | 사양 |
|------|------|
| 음성 칩 | Chipintelli CI1302(BNPU V3 신경망 프로세서, 최대 220MHz) |
| 저장소 | 640KB SRAM + 2MB Flash |
| 음성 명령어 | 110+개 사전 설정; 사용자 정의 중국어/영어 명령어, 최대 약 120개까지 기록 가능 |
| 웨이크 방식 | 웨이크 워드 “你好，小犀”(수정 지원) |
| 인식 거리 | 5m 이내(조용한 환경, 인식률 최대 99%) |
| 오디오 | 고음질 스피커 + 고성능 마이크 내장(노이즈 제거 + 에코 제거) |
| 통신 인터페이스 | 시리얼 포트 / IIC / Type-C(온보드 STC8H 코프로세서) |
| 전원 | 5V(Type-C) |
| 지원 플랫폼 | Arduino, Jetson, RDK, Raspberry Pi, PC(STM32 / ESP32 / MSPM0 등 MCU) |
| 소프트웨어 지원 | ROS1 / ROS2 SDK, 펌웨어 플래싱 도구, 사용자 정의 항목 웹 도구 |

---

## 빠른 시작

출하 시 음성 인식 펌웨어가 이미 플래싱되어 있어 플래싱 없이 바로 체험할 수 있습니다:

1. Type-C 데이터 케이블로 모듈에 전원 공급(5V)
2. 웨이크 워드 “你好，小犀”를 말하면 모듈이 “我在”라고 응답한 후 명령어를 내릴 수 있습니다(예: “小车前进”)
3. 15초 이내에 명령 항목이 인식되지 않으면 모듈이 “我去休息了”를 재생하고 절전 모드에 들어가며, 다시 사용할 때에는 웨이크 워드를 다시 말하면 됩니다

다른 인식 항목을 추가해야 할 경우, 웹 도구로 명령어를 수정해 새 펌웨어를 생성한 뒤 PC 소프트웨어로 펌웨어를 모듈에 기록하면 됩니다. 자세한 내용은 [모듈 펌웨어 플래싱](/ko/tutorials/accessories/ai-voice-module/Firmware-Flashing)과 [사용자 정의 프로토콜 항목 제작](/ko/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)을 참조하세요.

---

## 전체 튜토리얼

- [퀵 스타트 — 개봉 체험, 웨이크 워드와 재생](/ko/tutorials/accessories/ai-voice-module/Quick-Start)
- [제품 자료 — 제품 특징, 작동 원리, 주의 사항과 하드웨어 인터페이스](/ko/tutorials/accessories/ai-voice-module/Product-Info)
- [모듈 펌웨어 플래싱](/ko/tutorials/accessories/ai-voice-module/Firmware-Flashing)
- [웨이크 워드 및 명령어 수정](/ko/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit)
- [사용자 정의 프로토콜 항목 제작](/ko/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)
- [ROS1 음성 인터랙션](/ko/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction) / [ROS2 음성 인터랙션](/ko/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction)
- [시리얼 포트 프로토콜](/ko/tutorials/accessories/ai-voice-module/Serial-Protocol) / [IIC 프로토콜](/ko/tutorials/accessories/ai-voice-module/IIC-Protocol)
- [PC 통신](/ko/tutorials/accessories/ai-voice-module/PC-Communication)
- Arduino: [시리얼 통신](/ko/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication) / [IIC 통신](/ko/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication)
- Jetson: [시리얼 통신](/ko/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication) / [IIC 통신](/ko/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication)
- RDK: [시리얼 통신](/ko/tutorials/accessories/ai-voice-module/RDK-Serial-Communication) / [IIC 통신](/ko/tutorials/accessories/ai-voice-module/RDK-IIC-Communication)
- Raspberry Pi: [시리얼 통신](/ko/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication) / [IIC 통신](/ko/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication)

---

## 응용 시나리오

- 로봇 음성 인터랙션과 명령 제어(예: “小车前进”, “停止”)
- 스마트홈 음성 제어(조명, 가전)
- 교육 및 완구용 음성 제품
- 산업 설비 음성 제어
- 각종 DIY 음성 인터랙션 프로젝트

---

## 자주 묻는 질문

**Q: 네트워크 연결이 필요한가요?**

**A:** 필요하지 않습니다. CI1302는 오프라인 음성 칩으로, 인식이 모듈 로컬에서 완료되므로 네트워크 연결 없이 작동합니다.

**Q: 출하 상태로 바로 사용할 수 있나요?**

**A:** 네. 출하 시 음성 인식 기능 펌웨어가 이미 플래싱되어 있어 Type-C로 전원을 공급한 후 웨이크 워드를 말하면 체험할 수 있습니다; 사용자 정의 항목을 추가할 때만 펌웨어를 다시 플래싱하면 됩니다.

**Q: 영어 명령어를 지원하나요?**

**A:** 지원합니다. 중국어와 영어 명령어를 사용자 정의할 수 있으며, 웹 도구로 수정한 후 펌웨어를 생성해 플래싱하면 됩니다.

**Q: 호스트 컨트롤러와 어떻게 통신하나요?**

**A:** 온보드 STC8H 코프로세서가 음성 인식 결과를 자동으로 시리얼 포트 또는 IIC 데이터로 변환합니다; Arduino, Jetson, RDK, Raspberry Pi, PC 통신 튜토리얼과 ROS1 / ROS2 SDK를 제공합니다.

**Q: 인식 거리는 얼마나 되나요?**

**A:** 조용한 환경에서 5m 이내 인식률 최대 99%; 시끄러운 환경은 인식 효과에 영향을 미칩니다.

---

## 주의 사항

- 5V 전압으로 전원을 공급하며, 5V를 초과하면 모듈이 손상됩니다
- 사용 환경은 최대한 조용해야 하며, 시끄러운 환경은 인식 효과에 영향을 미칩니다
- 항목을 말할 때는 목소리가 우렁차야 하고 말하는 속도가 너무 빠르지 않아야 하며, 모듈과의 거리는 5m 이내를 유지하는 것이 좋습니다

---

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
- 💬 [문제 피드백](https://github.com/Juxi-Technology/wiki-documents/issues)
