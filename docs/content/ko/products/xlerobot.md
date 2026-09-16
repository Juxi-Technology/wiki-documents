---
title: XLeRobot 양팔 이동 로봇
category: robot
description: Juxi Technology XLeRobot 양팔 이동 로봇 — SO-ARM101 양팔 + 전방향 바퀴 섀시 + 카메라 타워, 듀얼 서보 드라이버 보드 12V 전원, LeRobot 생태계, 완제품/부품 키트 두 가지 형태
keywords: [xlerobot, 양팔 로봇, 이동 로봇, 구현 지능, lerobot, so-arm101, 전방향 바퀴 섀시]
---

# XLeRobot 양팔 이동 로봇

> **[타오바오에서 구매](https://item.taobao.com/item.htm?id=1045195950187)**

## 제품 개요

XLeRobot은 양팔 이동 로봇 플랫폼입니다: 전방향 바퀴(만능 바퀴) 섀시 카를 이동 베이스로, 카메라 타워에 SO-ARM101 팔로워 암 2개를 탑재하고, 듀얼 서보 드라이버 보드, Raspberry Pi/Jetson 호스트 컨트롤러와 PD 보조 배터리를 결합하여 이동하며 조작할 수 있는 오픈소스 로봇을 구성합니다. 구현 지능 연구, 가사 작업과 LeRobot 생태계 개발을 겨냥합니다.

**주요 특징**:

- 양팔 조작 + 전방향 이동 섀시, 다양한 가정용 물품을 이동하며 파지 가능
- SO-ARM101 로봇 암 기반, Feetech STS3215-C018 버스 서보 채택
- 카메라 타워 + 손목 카메라, 데이터 수집과 모방 학습 지원
- 듀얼 서보 드라이버 보드가 양팔과 섀시를 독립 구동, 12V 전원
- 완전한 LeRobot 소프트웨어 생태계: 환경 구축, 데이터 수집, 훈련과 추론
- 완제품 조립과 부품 키트 조립 두 가지 형태 제공, 부품 키트에는 전체 부품 목록 포함
- Lekiwi 베이스 호환(Lekiwi가 있으면 바퀴형 베이스 재사용 가능)

---

## 제품 사양

| 카테고리 | 사양 |
|------|------|
| 로봇 암 | SO-ARM101 팔로워 암 ×2(Feetech STS3215-C018 버스 서보, ID 1-6) |
| 섀시 | 전방향 바퀴(만능 바퀴) 섀시 카, STS3215-C018 서보 3개(ID 7/8/9) |
| 카메라 타워 | 카메라 타워 베이스 + STS3215-C018 서보 2개(ID 7/8) + 카메라 |
| 구동 | 서보 드라이버 보드 ×2(USB-C to USB-A 데이터 케이블로 호스트 연결; PD to DC12V3A 전원 케이블) |
| 전원 | PD 보조 배터리 12V 버전(단일 포트 최대 100W, 테스트 결과 구동에 충분) |
| 호스트 | Raspberry Pi(별도 구매) / Jetson |
| 연결 케이블 | 90CM 서보 연장 케이블 ×2(섀시 카와 카메라 타워 → 서보 드라이버 보드) |
| 전체 무게 | 약 12kg(완전 조립 후) |
| 소프트웨어 | LeRobot 생태계; 서보 구성은 Bambot 사용(Windows / macOS / Linux) |

---

## 빠른 시작

### 1. LeRobot 환경 구축

운영 체제에 맞는 환경 구축 튜토리얼(macOS / Ubuntu / Windows)을 따라 LeRobot과 의존성을 설치합니다.

### 2. XLeRobot 파일 이동

XLeRobot 파일을 해당 디렉터리로 이동하여 소프트웨어 준비를 완료합니다.

### 3. 로봇 조립

- **완제품 조립**: 부품 목록에 따라 섀시 카, 카메라 타워 베이스, 양팔과 배선을 바로 설치
- **부품 키트 조립**: 먼저 서보를 구성한 후([Bambot](https://bambot.org/feetech.js)으로 ID 스캔 및 이름 변경), 카트, 바퀴형 베이스, 로봇 암 베이스와 배선을 순서대로 조립하고 마지막으로 배터리를 배치

부품 키트 조립 시에는 전원 케이블을 마지막에 연결하는 것이 좋으며, 다른 케이블을 꽂거나 뽑을 때에는 서보 드라이버 보드 보호를 위해 전원을 분리한 상태로 유지하세요.

---

## 전체 튜토리얼

- [XLeRobot 튜토리얼 개요](/ko/tutorials/robot-arms/xlerobot/)
- [환경 구축(macOS)](/ko/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS)
- [환경 구축(Ubuntu)](/ko/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu)
- [환경 구축(Windows)](/ko/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows)
- [XLeRobot 파일 이동](/ko/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files)
- [완제품 조립](/ko/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit)
- [부품 키트 조립](/ko/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit)

---

## 응용 시나리오

- 구현 지능과 모방 학습 연구(가사 작업, 물품 파지)
- 양팔 이동 조작 알고리즘 개발(LeRobot 생태계)
- 로봇 교육과 대회
- 가정 서비스 로봇 프로토타입 검증

---

## 자주 묻는 질문

**Q: 완제품과 부품 키트의 차이는 무엇인가요?**

**A:** 완제품은 부품 목록에 따라 조립된 키트입니다; 부품 키트는 직접 조립해야 하며, 먼저 Bambot 도구로 서보 ID를 구성해야 합니다(로봇 암 1-6, 섀시 7/8/9, 카메라 타워 7/8).

**Q: 별도로 구매해야 하는 부품은 무엇인가요?**

**A:** 보조 배터리, Raspberry Pi 및 PD 5V5A Raspberry Pi 전원 케이블은 직접 구매해야 합니다(튜토리얼에 명시되어 있습니다).

**Q: 서보 ID는 어떻게 구성하나요?**

**A:** 서보와 서보 드라이버 보드를 컴퓨터에 연결한 후 [Bambot 서보 구성 페이지](https://bambot.org/feetech.js)에서 서보 ID를 스캔하고 이름을 변경합니다; 공식 LeRobot 코드 저장소는 아직 로봇 암 이외의 서보 구성을 지원하지 않으므로 Bambot을 대신 사용합니다.

**Q: 조립 완료 후 그냥 밀어서 이동할 수 있나요?**

**A:** 안 됩니다. 완전히 조립한 후에는 카트처럼 밀고 다니지 마세요. 서보 기어가 손상될 수 있습니다; 수동으로 이동해야 할 때는 로봇을 들어 옮기세요(약 12kg).

---

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
- 💬 [문제 피드백](https://github.com/Juxi-Technology/wiki-documents/issues)
