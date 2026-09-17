---
title: 구현 지능 입문(LeRobot)
description: "구현 지능 입문——LeRobot 프레임워크 사용, SO-ARM101 데이터 수집/훈련/평가 전체 흐름, ACT/확산 정책/SmolVLA 선택"
keywords: [lerobot, 구현 지능, 모방 학습, act, so-arm101, 로봇 학습]
---

# 구현 지능 입문(LeRobot)

> 처음으로 '로봇 학습'에 도전하는 개발자용. HuggingFace LeRobot + JUXI SO-ARM101 로봇팔을 예로 **데이터 수집 → 훈련 → 평가** 전체 흐름을 완주합니다.

## 1. 구현 지능이란?

구현 지능(Embodied AI)은 에이전트가 몸의 센서를 통해 물리 세계와 상호작용하게 합니다. 로봇 모방 학습(Imitation Learning)은 그 주요 경로입니다: 인간 원격 조작 데모 → 데이터 수집 → 정책 모델 훈련 → 로봇이 동작 재현.

**왜 중요한가**: 기존 프로그래밍은 복잡한 작업(나사 조이기, 옷 개기)을 커버하지 못하며, 모방 학습은 '데모 + 훈련'만으로 충분합니다.

## 2. 하드웨어 구성

| 구성 | 권장 | 설명 |
|------|------|------|
| 로봇팔 | SO-ARM101(leader + follower) | 양팔 원격 조작, 6 DOF |
| 컴퓨팅 | Jetson Orin NX Super / 4090 호스트 | 훈련은 큰 연산, 추론은 Jetson |
| 비전 | RealSense / USB 카메라 | 원격 조작 시 환경 수집 |

- [SO-ARM101 사용 튜토리얼](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Jetson Orin NX Super 개발 키트](/ko/products/jetson-orin-nx-super-kit)

## 3. 환경 설치

```bash
# 클론(JUXI 포크 안정 버전)
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"        # SO-ARM은 feetech 서보 사용
# Jetson 사용자: 먼저 PyTorch 사용 가능 여부 확인
python3 -c "import torch; print(torch.cuda.is_available())"
```

## 4. 데이터 수집(원격 조작)

```bash
# 로봇팔 캘리브레이션(최초)
lerobot-calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
# 데이터 수집
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 \
  --dataset.repo_id=juxi/pick_cube \
  --dataset.num_episodes=50 \
  --dataset.single_task="Pick the red cube" \
  --dataset.episode_time_s=30
```

**수집 팁**:

- 각 태스크 ≥50 에피소드, 위치/기법 다양화
- 카메라 고정, 물체를 일관되게 보이게
- 일관된 조작 스타일 유지(같은 데모 수행자)

## 5. 훈련

```bash
# ACT 정책(입문 추천)
lerobot-train \
  --dataset.repo_id=juxi/pick_cube \
  --policy.type=act \
  --output_dir=outputs/train/act_pick \
  --steps=300000 \
  --policy.device=cuda
```

**정책 선택**:

| 정책 | 장점 | 적용 |
|------|------|------|
| ACT | 소규모 데이터도 안정, 초보자 친화적 | 단일 태스크, 데이터 적음 |
| 확산 정책(Diffusion Policy) | 복잡한 멀티모달 동작 | 정교한 조작 |
| SmolVLA / 기반 모델 | 제로샷/소수샷 일반화 | 다중 태스크 |

## 6. 평가

```bash
# 데이터셋 재생(데이터 품질 확인)
lerobot-dataset-viz --repo-id juxi/pick_cube
# 정책 평가
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --policy.path=outputs/train/act_pick/checkpoints/last/pretrained_model \
  --dataset.repo_id=juxi/eval_pick \
  --policy.device=cuda
```

| 평가 지표 | 설명 |
|---------|------|
| 성공률 | 태스크 완료 비율 |
| 궤적 평활도 | 동작 떨림 여부 |
| 일반화 능력 | 물체/위치 변경에도 성공하는지 |

## 7. 자주 묻는 질문

**Q: 훈련이 느린가요?**

**A:** 데이터량, steps, 연산력이 비례합니다. 먼저 50 에피소드 / 100k steps로 시작해 흐름을 확인한 후 규모 확대.

**Q: 정책이 단일 동작만 가능?**

**A:** 단일 태스크 훈련은 태스크 데이터셋 필요. GR00T/Pi0 계열 기반 모델은 소량 데이터로 멀티태스크 미세조정 가능.

**Q: 훈련 후 동작이 떨리나요?**

**A:** 데이터 품질 확인(데모 안정), 평활화 필터 추가, 제어 주파수 낮추기.

**Q: 메모리/VRAM 부족?**

**A:** batch_size 감소, 이미지 해상도 낮추기, Jetson은 16GB 버전 사용.

---

## 관련 링크

- [로봇팔 선택 가이드](/ko/tutorials/robot-arms/select-guide)
- [엣지 AI 배포 입문](/ko/topics/edge-ai-intro)
- [SO-ARM101 TPU 플렉시블 그리퍼](/ko/products/tpu-flexible-gripper)
- [SO-ARM101 로봇 비전 키트](/ko/products/robot-vision-kit)

## 기술 지원

- 📧 이메일：support@juxitech.com
- 🌐 공식 사이트：[www.juxitech.com](https://www.juxitech.com)
