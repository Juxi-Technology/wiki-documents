---
title: "8단계: ACT 배포 커맨드라인"
description: "배포 입문 문서로, Ubuntu와 Mac에서 기존 데이터셋을 정리한 뒤 학습한 ACT 모델을 rollout으로 실행하는 커맨드라인을 안내합니다."
---

# 8단계: ACT 배포 커맨드라인

> 배포는 통일해서 `lerobot-rollout`을 사용합니다. 사용법과 파라미터는 [커맨드라인 설명](/ko/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference)을 참고하세요.

## Ubuntu

- 기존 dataset 삭제(있는 경우)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<사용자명>/.cache/huggingface/lerobot/<사용자명>/rollout_lerobot_my_dataset_shake_hands
```

- 배포 커맨드라인

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/home/<사용자명>/Downloads/lerobot_output/shake/ACT/5K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

## Mac

- 기존 dataset 삭제(있는 경우)

```Shell
sudo rm -rf /Users/<사용자명>/.cache/huggingface/lerobot/<사용자명>/rollout_lerobot_my_dataset_shake_hands
```

- 배포 커맨드라인

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<사용자명>/Downloads/7-lerobot/shake/ACT/5K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

<RelatedProducts slugs="so-arm101" />
