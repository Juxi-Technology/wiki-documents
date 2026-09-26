---
title: "추론 커맨드라인-pi0.5"
description: "pi0를 개선한 모델을 rollout으로 실행하는 배포 커맨드라인을 Ubuntu와 Mac용으로 각각 정리한 심화 페이지입니다."
---

# 추론 커맨드라인\-pi0\.5

> 배포는 통일해서 `lerobot-rollout`을 사용합니다. 사용법과 파라미터는 [커맨드라인 설명](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)을 참고하세요.

## Ubuntu

- 기존의 rollout으로 시작하는 데이터셋 삭제(있는 경우)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/rollout_lerobot_my_dataset_shake_hands
export TOKENIZERS_PARALLELISM=false
```

- 추론 커맨드라인

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --dataset.push_to_hub=false \
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/pi05/50K/pretrained_model
```













## Mac

- 기존의 rollout으로 시작하는 데이터셋 삭제(있는 경우)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/rollout_lerobot_my_dataset_shake_hands
```

- 추론 커맨드라인

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.freeze_vision_encoder=false \
  --policy.dtype=bfloat16 \
  --policy.compile_model=true \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --dataset.push_to_hub=false \
  --policy.device=cpu \
  --policy.path=/Users/tommy/Downloads/7-lerobot/shake/pi0/50K/pretrained_model
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/4.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/09-inference/1.png)

## 추론이 매우 느린 이유

- 데이터셋이 너무 작습니다

- 그래픽 카드의 VRAM이 부족합니다. 50 시리즈 그래픽 카드가 필요합니다



