---
title: SO-ARM101 TPU 플렉서블 그리퍼
description: 鉅犀科技 SO-ARM101 TPU 플렉서블 그리퍼 — 부드러운 TPU 소재로 불규칙/깨지기 쉬운 물체를 안전하게 파지, 암 장착 카메라 지원, 30FPS 줌 또는 60FPS 고정 초점 선택
keywords: [gripper, 그리퍼, tpu, 플렉서블, so-arm101, 파지]
---

# SO-ARM101 TPU 플렉서블 그리퍼

> **[스토어에서 구매](https://www.juxitech.com/ko/products/so-arm101-tpu-flexible-gripper)**

## 제품 개요

이 SO-ARM101 TPU 플렉서블 그리퍼는 XLerobot 로봇 팔 전용 설계이며 SO-ARM101 암 장착 카메라 마운트/키트 설치를 지원합니다. 부드러운 **TPU 소재**로 불규칙하고 깨지기 쉬운 물체를 손상 없이 파지합니다. 선택형 카메라 구성(줌 30FPS / 고정 초점 60FPS)과 함께 로봇 파지 개발 및 비전 가이드 응용에 대응합니다.

**주요 특징**:

- XLerobot 로봇 팔에 직접 설치, 추가 수정 불필요
- 소프트 TPU: 유연, 내마모, 미끄럼 방지, 깨지기 쉽거나 불규칙한 물체 안전 파지
- SO-ARM101 암 장착 카메라 마운트/키트 호환(비전 가이드 파지)
- 나사 직결 고정, 플러그 앤 플레이, 복잡한 배선 불필요

## 제품 사양

| 카테고리 | 사양 |
|------|------|
| 호환 로봇 팔 | SO-ARM101(XLerobot 시리즈) |
| 소재 | 소프트 TPU(열가소성 폴리우레탄, 유연·내마모·미끄럼 방지) |
| 구동 방식 | 서보 구동 |
| 옵션 카메라 | 줌 30FPS / 고정 초점 60FPS |
| 설치 방식 | 나사 직결 고정, 플러그 앤 플레이 |

## 키트 구성

| 키트 | 구성 |
|------|------|
| **베이직 그리퍼** | 1× TPU 플렉서블 그리퍼 |
| **줌 카메라 키트** | 그리퍼 + 30FPS 자동 초점 줌 카메라 |
| **고정 초점 카메라 키트** | 그리퍼 + 60FPS 고정 초점 카메라 |

## 빠른 시작

1. 그리퍼 나사 구멍을 로봇 팔 엔드이펙터에 맞춤
2. 나사 직결 고정(배선 변경 불필요)
3. 비전 가이드가 필요하면 SO-ARM101 암 장착 카메라 마운트 추가 설치

### 비전 파지 개발

암 장착 카메라와 LeRobot 프레임워크를 함께 사용:

```bash
# 录制视觉抓取数据
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0} }' \
  --dataset.repo_id=juxi/gripper_test \
  --dataset.num_episodes=50
```
## 자주 묻는 질문

**Q: 왜 불규칙/깨지기 쉬운 물체도 파지할 수 있나요?**

**A:** TPU 플렉서블 소재가 물체 모양에 적응해 힘이 균등하게 분산되므로 파지물 손상을 효과적으로 방지합니다.

**Q: 카메라는 어떻게 선택하나요?**

**A:**

- 줌 30FPS: 초점 거리 유연, 가변 거리 비전에 적합
- 고정 초점 60FPS: 고프레임레이트, 빠른 모션 캡처에 적합

**Q: 어떤 플랫폼을 지원하나요?**

**A:** SO-ARM101 / XLerobot 로봇 팔 시리즈. ACT, Smolvla, Pi0 등 LeRobot 훈련 프레임워크와 호환.

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
- 💬 [문제 피드백](https://github.com/Juxi-Technology/wiki-documents/issues)
