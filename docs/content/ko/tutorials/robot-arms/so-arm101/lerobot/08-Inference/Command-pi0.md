---
title: "8단계: pi0 배포 커맨드라인"
description: "학습한 pi0 모델을 배포하는 커맨드라인을 Ubuntu와 Mac 환경별로 정리하고, 실행 전 데이터셋 삭제 절차를 함께 안내합니다."
---

# 8단계: pi0 배포 커맨드라인

> 배포는 통일해서 `lerobot-rollout`을 사용합니다. 사용법과 파라미터는 [커맨드라인 설명](/ko/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference)을 참고하세요.

## Ubuntu

- 기존 dataset 삭제(있는 경우)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<사용자명>/.cache/huggingface/lerobot/<사용자명>/rollout_lerobot_my_dataset_shake_hands
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
  --policy.path=/home/<사용자명>/Downloads/lerobot_output/shake/pi0/50K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

![b04cfa2962f16a1e354063623e5f86e3.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/1.png)

![a5c84c9e12afe207fc64f99d1116e770.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/3.png)

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
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.freeze_vision_encoder=false \
  --policy.dtype=bfloat16 \
  --policy.compile_model=true \
  --policy.device=cpu \
  --policy.path=/Users/<사용자명>/Downloads/7-lerobot/shake/pi0/50K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/4.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/5.jpg)

## Mac으로 추론할 때 로봇팔이 덜컹거리는 이유

- dataset이 너무 작습니다

- 그래픽 카드의 VRAM이 부족합니다. 50 시리즈 그래픽 카드가 필요합니다

<RelatedProducts slugs="so-arm101" />
