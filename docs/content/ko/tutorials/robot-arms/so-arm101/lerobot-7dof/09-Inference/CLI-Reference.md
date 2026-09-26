---
title: "커맨드라인 설명"
description: "모델 배포에 사용하는 rollout 커맨드의 파라미터와 카메라 설정을 수집 때와 똑같이 맞춰야 하는 이유를 설명합니다."
---

# 커맨드라인 설명

## 버전 설명(중요, 먼저 읽어 주세요)

LeRobot **0.6.0**부터는 학습한 모델을 `lerobot-rollout`으로 배포해야 합니다. 기존의 `lerobot-record --policy.path=...` 표기는 **0.5.2** 버전에서 이미 제거되었습니다.

이 튜토리얼의 1단계는 `git clone`으로 LeRobot을 설치하므로 현재 최신 버전을 받게 됩니다. 따라서 아래 `lerobot-rollout` 커맨드라인을 사용해 주세요. 굳이 `lerobot-record`를 쓰면 프로그램이 곧바로 오류를 내고 `lerobot-rollout`으로 바꾸라고 안내합니다.

두 커맨드의 역할 분담은 다음과 같습니다:

- `lerobot-record`: **시연 데이터 수집**만 담당하며(7단계에서 사용한 것이 이것입니다), 이제 `eval_`로 시작하는 dataset 이름을 거부합니다
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

## 커맨드라인 설명

실시간 시각화 포함: \-\-display\_data=true

실시간 시각화 미포함: \-\-display\_data=false

`--display_data=true`이면 rerun\.io의 멋진 시각화 인터페이스가 실행되지만, `/Users/tommy/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000` 디렉터리에 매 프레임의 이미지가 저장되어 공간을 꽤 차지합니다. 이후에는 `--display_data=false`로 설정해도 됩니다.



HuggingFace 모델 Repo의 모델 추론: \-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## 오렌지 집기 작업을 예로

- 로컬 모델 추론(실시간 시각화 포함)

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- 로컬 모델 추론(실시간 시각화 미포함)

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- HuggingFace 모델 Repo의 모델 추론

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --policy.path=Tommymy/lerobot_my_model_a
```

실행 후 모델을 다운로드합니다

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









