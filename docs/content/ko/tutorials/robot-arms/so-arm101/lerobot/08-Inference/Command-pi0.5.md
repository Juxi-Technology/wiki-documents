---
title: "8단계: pi0.5 배포 커맨드라인"
description: "pi0를 개선한 모델을 rollout으로 실행하는 배포 커맨드라인을 Ubuntu와 Mac용으로 각각 정리한 심화 페이지입니다."
---

# 8단계: pi0.5 배포 커맨드라인

> 배포는 통일해서 `lerobot-rollout`을 사용합니다. 사용법과 파라미터는 [커맨드라인 설명](/ko/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference)을 참고하세요.

## Ubuntu

- 기존 dataset 삭제(있는 경우)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
export TOKENIZERS_PARALLELISM=false
```

- 배포 커맨드라인

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/home/<你的用户名>/Downloads/lerobot_output/shake/pi05/50K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

## Mac

- 기존 dataset 삭제(있는 경우)

```Shell
sudo rm -rf /Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
```

- 배포 커맨드라인

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.freeze_vision_encoder=false \
  --policy.dtype=bfloat16 \
  --policy.compile_model=true \
  --policy.device=cpu \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/shake/pi05/50K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0.5/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0.5/2.jpg)

## 추론이 매우 느린 이유

- dataset이 너무 작습니다

- 그래픽 카드의 VRAM이 부족합니다. 50 시리즈 그래픽 카드가 필요합니다

<RelatedProducts slugs="so-arm101" />
