---
title: "8단계: Diffusion 배포 커맨드라인"
description: "lerobot-rollout으로 SO-ARM101에서 학습된 Diffusion 정책을 실행하는 추론 명령과 실기 데모 영상."
---

# 8단계: Diffusion 배포 커맨드라인

## Ubuntu

- 기존의 eval 접두사가 붙은 데이터셋 삭제(있는 경우)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- 추론 명령줄

```Shell
lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --policy.path=/home/tommy/Downloads/lerobot_output/shake/Diffusion/15K/pretrained_model
```

## Mac

- 기존의 eval 접두사가 붙은 데이터셋 삭제(있는 경우)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands
```

- 추론 명령줄

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/eval_lerobot_my_dataset_shake_hands

lerobot-record  \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/eval_lerobot_my_dataset_shake_hands \
  --dataset.single_task="Shake Hands" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/shake/Diffusion/5K/pretrained_model
```

## 결과: 눈에 띄는 끊김

[ea9ffc82e6501aa1c3af9d74dc551650.mp4](/downloads/ea9ffc82e6501aa1c3af9d74dc551650.mp4)

[02cfb7022f0828428e6fb10d62dc0e77.mp4](/downloads/02cfb7022f0828428e6fb10d62dc0e77.mp4)

<RelatedProducts slugs="so-arm101" />
