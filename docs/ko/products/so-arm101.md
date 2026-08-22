---
title: SO-ARM101 개발 키트
description: 6-DOF 오픈소스 양팔 로봇, LeRobot 에코시스템, 원격 조작
keywords: [so-arm101]
---

# SO-ARM101 개발 키트

> **[스토어에서 구매](https://www.juxitech.com/ko/products/so-arm101-developers-kit)**

## 개요

LeRobot에 깊이 통합된 6-DOF 양팔 로봇 개발 키트. leader-follower 원격 조작, 모방 학습 데이터 수집, 정책 훈련 지원.

## 사양

| カテゴリ | 仕様 |
|------|------|
| 유형 | 양팔 원격 조작 로봇 |
| 자유도 | 각 팔 6 DOF |
| 구동 | Feetech 버스 서보 |
| 호스트 | PC (Linux) / Jetson |
| 에코시스템 | LeRobot, ROS 2 |

## 빠른 시작

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

---

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
