---
title: "추론 커맨드라인-smolvla"
description: "가벼운 VLA 모델 smolvla를 rollout으로 배포하는 커맨드라인을 Ubuntu와 Mac 환경별로 정리해 소개합니다."
---

# 추론 커맨드라인\-smolvla

> 배포는 통일해서 `lerobot-rollout`을 사용합니다. 사용법과 파라미터는 [커맨드라인 설명](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)을 참고하세요.

## Ubuntu

- 기존의 rollout으로 시작하는 데이터셋 삭제(있는 경우)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/rollout_lerobot_my_dataset_shake_hands
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
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/smolvla/40K/pretrained_model
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
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --policy.path=/Users/tommy/Downloads/7-lerobot/shake/smolvla/40K/pretrained_model \
  --dataset.push_to_hub=false \
  --robot.type=so101_follower \
  --robot.id=my_follower_arm \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --display_data=false \
  --dataset.episode_time_s=2000
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-smolvla/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-smolvla/2.png)



