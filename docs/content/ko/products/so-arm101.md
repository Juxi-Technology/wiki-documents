---
title: SO-ARM101 개발 키트
category: robot
description: 鉅犀科技 SO-ARM101 양팔 로봇 개발 키트 — 6 DOF 오픈소스 로봇 팔, LeRobot 생태계, 원격 조작/모방 학습/AI 연구의 첫 번째 선택
keywords: [so-arm101, 로봇 팔, leRobot, 원격 조작, 양팔 로봇]
---

# SO-ARM101 개발 키트

> **[스토어에서 구매](https://www.juxitech.com/ko/products/so-arm101-developers-kit)**

## 제품 개요

SO-ARM101은 鉅犀科技가 오픈소스로 제공하는 6-DOF 양팔 로봇 개발 키트입니다. **LeRobot** 생태계에 깊이 통합되어 리더-팔로워 원격 조작, 모방 학습 데이터 수집, 정책 훈련을 지원합니다. 검은색 리더 암 + 흰색 팔로워 암, 개봉 즉시 사용 가능합니다.

**주요 특징**:

- 양팔 각 6 DOF, 버스 서보 구동
- LeRobot(HuggingFace) 심층 호환, ACT/Diffusion/Pi0 등 정책 지원
- Jetson / PC(Linux) 플랫폼 지원
- 하드웨어 완전 오픈소스(회로도/CAD/펌웨어)

## 사양

| 카테고리 | 사양 |
|------|------|
| 유형 | 양팔 원격 조작 로봇 |
| 자유도 | 각 팔 6 DOF |
| 구동 | Feetech 버스 서보 |
| 호스트 | PC (Linux) / Jetson |
| 생태계 | LeRobot, ROS 2, ROS 1 |
| 전원 | 리더 5V6A / 팔로워 12V5A |
| 페이로드 | 500g |
| 반복 정밀도 | ±0.1mm |
| 작업 반경 | 520mm |
| 통신 방식 | USB-C |

## 빠른 시작

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## 관련 튜토리얼

- [SO-ARM101 튜토리얼](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [SO-ARM101 조립 튜토리얼](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [로봇 팔 선택 가이드](/ko/tutorials/robot-arms/select-guide)
- [임베디드 지능 입문(LeRobot)](/ko/topics/embodied-ai-intro)

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
