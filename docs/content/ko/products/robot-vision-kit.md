---
title: SO-ARM101 로봇 팔 비전 키트
description: 鉅犀科技 SO-ARM101 로봇 팔 비전 키트 — 손목/측면/정면 위 3시점 설치, 60FPS 고정 초점 또는 30FPS 자동 초점 줌 카메라, ACT/Smolvla/Pi0/GR00T 훈련 프레임워크 호환
keywords: [camera mount, 비전 키트, 카메라 마운트, so-arm101, 로봇 팔 비전]
---

# SO-ARM101 로봇 팔 비전 키트

> **[스토어에서 구매](https://www.juxitech.com/ko/products/so-arm101-wrist-camera-mount)**

## 제품 개요

SO-ARM101 로봇 팔 비전 키트는 로봇 팔을 위해 설계된 카메라 액세서리로, 듀얼 카메라 옵션을 제공합니다:**60FPS 고정 초점**과 **30FPS 자동 초점 줌**. SO-ARM101, LeKiwi, XLerobot 플랫폼을 지원하며 **ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5** 등 주요 임베디드 지능 훈련 프레임워크와 호환됩니다.

**주요 특징**:

- 3가지 설치 위치:**손목 / 측면 / 정면 위**
- 듀얼 카메라 선택:60FPS 고정 초점(빠른 모션 캡처)/ 30FPS 자동 초점 줌(유연한 비전 개발)
- SO-ARM101과 완벽 호환, 추가 수정 불필요
- 미끄럼 방지 클램프 패드 동봉

## 제품 사양

| 카테고리 | 사양 |
|------|------|
| 호환 플랫폼 | SO-ARM101, LeKiwi, XLerobot, M3 장착 홀 호환 플랫폼 |
| 설치 위치 | 손목 / 측면 / 정면 위 |
| 카메라 선택 | 60FPS 고정 초점 / 30FPS 자동 초점 줌 |
| 훈련 프레임워크 호환 | ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5 |

## 카메라 비교

| 카메라 | 용도 |
|------|---------|
| **60FPS 고정 초점** | 고프레임레이트, 안정적이고 선명한 이미지, 빠른 모션 캡처, 고정 거리 비전 |
| **30FPS 자동 초점 줌** | 초점 거리 유연한 조정, 가변 거리 비전 |

## 빠른 시작

### 1. 설치 위치 선택

- **손목**:파지 작업 시점(파지 작업 추천)
- **측면**:전체 환경 시점
- **정면 위**:데스크톱 작업 정면 위 시점(데이터 수집에 적합)

### 2. 설치

카메라 모듈을 해당 마운트에 고정하고 USB로 호스트(Jetson/라즈베리파이)에 연결합니다.

### 3. 훈련 프레임워크 연동

LeRobot 데이터 수집 예시:

```bash
# 查找相机
python -m lerobot.find_cameras

# 采集带视觉数据
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0, width: 640, height: 480} }' \
  --dataset.repo_id=juxi/vision_test \
  --dataset.num_episodes=50
```
## 자주 묻는 질문

**Q: 카메라는 어떻게 선택하나요?**

빠른 모션 캡처(파지 등)는 60FPS 고정 초점, 가변 거리 비전 개발은 30FPS 자동 초점 줌을 선택하세요.

**Q: 지원 훈련 프레임워크는?**

ACT, Smolvla, Pi0, Pi0.5, GR00T N1.5. 주요 임베디드 지능 모델 훈련 프레임워크를 모두 지원합니다.

**Q: 다른 로봇 팔에도 사용할 수 있나요?**

SO-ARM101, LeKiwi, XLerobot 및 기타 M3 장착 홀 호환 플랫폼.

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
- 💬 [문제 피드백](https://github.com/Juxi-Technology/wiki-documents/issues)
