---
title: AmazingHand 오픈소스 4손가락 정교 손
category: robot
description: 鉅犀科技 AmazingHand 오픈소스 4손가락 정교 손, TTL 버스 제어, 오픈 CAD, 임베디드 지능·HRI 연구
keywords: [amazinghand, 정교 손, dexterous hand, 임베디드 지능]
---

# AmazingHand 오픈소스 4손가락 정교 손

> **[스토어에서 구매](https://www.juxitech.com/ko/products/amazinghand)**

## 제품 개요

AmazingHand은 鉅犀科技가 오픈소스로 제공하는 4손가락 정교 손입니다. 다관절 설계로 TTL 직렬 버스 제어를 지원합니다. 오픈 CAD 파일로 손가락 설계를 자유롭게 커스터마이즈할 수 있으며, 정교한 조작, 파지 전략, 인간-로봇 상호작용(HRI) 연구에 널리 사용됩니다.

**주요 특징**:

- 4손가락 다관절, 사람 손과 유사한 비율
- TTL 직렬 버스 제어, 주요 컨트롤러 호환
- 오픈 CAD/소스, 커스텀 개조 지원
- SO-ARM101과 결합해 완전한 조작 플랫폼 구축
- 실시간 손 추적: 웹캠으로 제스처를 추적하고 실시간 제어
- 시뮬레이션 데모: 하드웨어 없이 손 추적 데모 실행(dora-rs 생태계)
- 손가락 각도 제어: 각 손가락 각도 개별 제어, 좌우/양손 지원
- 전원: 서보 드라이버 보드 5V3A, USB로 호스트 연결

## 사양

| 카테고리 | 사양 |
|------|------|
| 유형 | 4손가락 정교 손 |
| 제어 | TTL 직렬 버스 |
| 생태계 | Python SDK, ROS |
| 오픈소스 | CAD/소스 GitHub 공개 |

## 빠른 시작

```bash
git clone https://github.com/Juxi-Technology/AmazingHand.git
cd AmazingHand
pip install -r requirements.txt
python examples/basic_control.py
```

## 관련 튜토리얼

- [AmazingHand 인터페이스 제어](/ko/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [AmazingHand 공식 예제 실행](/ko/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
- [AmazingHand TTL 디버깅](/ko/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
