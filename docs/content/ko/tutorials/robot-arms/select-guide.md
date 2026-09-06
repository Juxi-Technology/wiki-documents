---
title: 로봇 암 선택 가이드
description: SO-ARM101 vs AmazingHand vs Lekiwi 비교 및 선택 조언
keywords: [선택, robot arm, 비교]
---

# 로봇 암 선택 가이드

Juxi Technology는 여러 로봇 암 제품을 제공합니다. 용도에 맞는 모델을 선택하기 위한 비교 가이드입니다.

> 참고: 자세한 사양은 각 제품의 공식 문서를 참조하세요. 이 표는 선택 참고용입니다.

## 3개 제품 비교

| 특징 | SO-ARM101 | AmazingHand | Lekiwi |
|------|-----------|-------------|--------|
| **유형** | 양팔 텔레오퍼레이션 | 로봇 손 | 저비용 교육용 암 |
| **자유도** | 팔당 6 DOF | 5지 다관절 | 6 DOF |
| **제어** | LeRobot / Python API | TTL 직렬 버스 | 서보 제어 |
| **호스트 플랫폼** | PC(Linux) / Jetson | 컨트롤러 보드 | PC / MCU |
| **용도** | AI 모방 학습, 텔레오프 연구 | 파지, 제스처 | 교육, 입문 |
| **오픈소스** | [LeRobot](https://github.com/Juxi-Technology/lerobot) | [AmazingHand](https://github.com/Juxi-Technology/AmazingHand) | 공식 문서 |
| **적합 대상** | 연구자, AI 개발자 | 조작 연구자 | 학생, 메이커 |

## 선택 방법

### 🎓 학생 / 입문자 → Lekiwi

- 간단한 구조, 저비용 — 교실 수업과 입문에 이상적
- 직관적인 서보 제어

### 🤖 파지 및 조작 연구 → AmazingHand

- 파지 전략 및 제스처 제어 연구를 위한 4지 정교 손
- TTL 직렬 버스 제어, 주류 컨트롤러와 호환

### 🧠 AI 모방 학습 / 텔레오퍼레이션 → SO-ARM101

- 리더-팔로워 텔레오퍼레이션을 지원하는 양팔 설계
- LeRobot 에코시스템과의 깊은 통합, 모방 학습에 이상적
- Jetson 지원으로 원활한 AI 워크플로

## 추천 조합

| 필요 | 추천 구성 |
|------|-----------|
| AI 텔레오퍼레이션 연구 | SO-ARM101 + AmazingHand(정교 조작) |
| 교육 실습실 | Lekiwi 여러 대 |
| 완전한 로봇 시스템 | SO-ARM101 + IMU 모듈 + 비전 액세서리 |

## 관련 튜토리얼

- [SO-ARM101 튜토리얼](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [AmazingHand 인터페이스 제어](/ko/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Lekiwi 튜토리얼](/ko/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial)

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 웹사이트: [www.juxitech.com](https://www.juxitech.com)
