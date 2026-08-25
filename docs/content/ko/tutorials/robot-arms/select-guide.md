---
title: 로봇 암 선택 가이드
description: SO-ARM101 vs AmazingHand vs Lekiwi 비교 및 선택 조언
keywords: [선택, robot arm, 비교]
---

# 로봇 암 선택 가이드

Juxi Technology는 여러 로봇 암 제품을 제공합니다. 용도에 맞는 모델을 선택하기 위한 비교 가이드입니다.

## 3개 제품 비교

| 특징 | SO-ARM101 | AmazingHand | Lekiwi |
|------|-----------|-------------|--------|
| **유형** | 양팔 텔레오퍼레이션 | 로봇 손 | 저비용 교육용 암 |
| **자유도** | 팔당 6 DOF | 5지 다관절 | 6 DOF |
| **제어** | LeRobot / Python API | TTL 직렬 버스 | 서보 제어 |
| **용도** | AI 모방 학습, 텔레오프 연구 | 파지, 제스처 | 교육, 입문 |
| **오픈소스** | [LeRobot](https://github.com/Juxi-Technology/lerobot) | [AmazingHand](https://github.com/Juxi-Technology/AmazingHand) | 공식 문서 |

## 선택 방법

- 🎓 학생/교육 → **Lekiwi**(저비용, 간단)
- 🤖 파지 연구 → **AmazingHand**(5지, TTL)
- 🧠 AI 연구 → **SO-ARM101**(LeRobot 통합, Jetson 지원)