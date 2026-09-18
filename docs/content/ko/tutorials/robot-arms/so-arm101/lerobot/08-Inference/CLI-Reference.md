---
title: "8단계: 커맨드라인 설명"
description: "모델 배포에 사용하는 rollout 커맨드의 파라미터와 버전별 차이, 카메라 설정을 수집 때와 똑같이 맞춰야 하는 이유를 설명합니다."
---

# 8단계: 커맨드라인 설명

## 버전 설명(중요, 먼저 읽어 주세요)

LeRobot **0.6.0**부터는 학습한 모델을 `lerobot-rollout`으로 배포해야 합니다. 기존의 `lerobot-record --policy.path=...` 표기는 **0.5.2** 버전에서 이미 제거되었습니다.

이 튜토리얼의 1단계는 `git clone`으로 LeRobot을 설치하므로 현재 최신 버전을 받게 됩니다. 따라서 아래 `lerobot-rollout` 커맨드라인을 사용해 주세요. 굳이 `lerobot-record`를 쓰면 프로그램이 곧바로 오류를 내고 `lerobot-rollout`으로 바꾸라고 안내합니다.

두 커맨드의 역할 분담은 다음과 같습니다:

- `lerobot-record`: **시연 데이터 수집**만 담당하며(6단계에서 사용한 것이 이것입니다), 이제 `eval_`로 시작하는 dataset 이름을 거부합니다
- `lerobot-rollout`: **학습한 모델 배포**를 담당하며, `--strategy.type`으로 동작 방식을 선택합니다

## rollout 커맨드라인 파라미터

| 파라미터 | 설명 |
|---|---|
| `--strategy.type` | 동작 방식입니다. `base`는 모델만 실행하고 데이터를 녹화하지 않으며, 현장에서 효과를 확인할 때 사용합니다. `episodic`은 episode별로 녹화하고 reset 단계를 포함하며, 구버전 `lerobot-record`에 가까운 동작을 합니다 |
| `--policy.path` | 모델 경로로, 학습 출력의 `checkpoints/last/pretrained_model`을 가리킵니다 |
| `--task` | 작업 설명으로, `--strategy.type=base`와 함께 사용합니다 |
| `--duration` | 실행 시간(초)이며, `0`은 시간 제한 없음을 의미합니다 |
| `--interactive` | 중간에 개입해야 할 때 추가하며, 터미널에서 `/stop`, `/reset` 등의 명령으로 제어할 수 있습니다 |
| `--display_data` | rerun.io 시각화 인터페이스를 시작할지 여부입니다 |
| `--policy.device` | 계산 장치로, 예를 들어 `cuda`, `cpu`입니다 |

## 카메라 파라미터는 수집 시와 일치해야 합니다

아래 모든 커맨드의 `--robot.cameras`는 `1280×720@30`을 사용하며, 이는 [시연 dataset 수집](/ko/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording)과 통일한 값입니다. 배포할 때는 수집 시의 해상도, fps, 가로세로 비율을 그대로 따라야 합니다: 해상도는 dataset 메타데이터에 기록되어 검증에 사용되므로 일치하지 않으면 곧바로 오류가 납니다. 설령 통과하더라도 시야가 다르면 모델이 "보는 세계"가 시연할 때와 달라져 효과가 눈에 띄게 나빠집니다.

## 시각화에 대하여

`--display_data=true`는 rerun.io의 시각화 인터페이스를 시작하고, 동시에 `/Users/<你的用户名>/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000` 디렉터리에 매 프레임의 이미지를 저장하므로 공간을 꽤 차지합니다. 정식으로 사용할 때는 `--display_data=false`로 설정해도 됩니다.

## 오렌지 집기 작업을 예로

- 현장 평가(실시간 시각화 포함)

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

- 현장 평가(실시간 시각화 미포함)

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=false
```

- HuggingFace 모델 Repo의 모델 추론

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=<用户名>/lerobot_my_model_a \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

실행 후 모델을 다운로드합니다

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)

- 데이터 평가 및 녹화(`--strategy.type=episodic`)

실행하면서 과정을 dataset으로 녹화하려면 `base`를 `episodic`으로 바꾸면 됩니다. 이 모드에서는 `--task`를 쓰지 않고 `--dataset.single_task`를 사용하며, 반드시 `--dataset.repo_id`를 지정해야 합니다:

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --dataset.repo_id=<用户名>/rollout_lerobot_my_dataset_a \
  --dataset.num_episodes=10 \
  --dataset.single_task="Grab Oranges" \
  --display_data=false
```

<RelatedProducts slugs="so-arm101" />
