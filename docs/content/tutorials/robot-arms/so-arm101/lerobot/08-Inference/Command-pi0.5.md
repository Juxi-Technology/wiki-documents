---
title: "Step 8: Inference — pi0.5 Command"
description: "Deploy a trained pi05 policy with the rollout command on Ubuntu and macOS, plus the common reasons inference can run very slowly."
---

# Step 8: Inference — pi0.5 Command

> Deployment uniformly uses `lerobot-rollout`; for usage and parameters, see [Command line reference](/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference).

## Ubuntu

- Delete the existing dataset (if any)

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<username>/.cache/huggingface/lerobot/<username>/rollout_lerobot_my_dataset_shake_hands
export TOKENIZERS_PARALLELISM=false
```

- Deployment command

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/home/<username>/Downloads/lerobot_output/shake/pi05/50K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

## Mac

- Delete the existing dataset (if any)

```Shell
sudo rm -rf /Users/<username>/.cache/huggingface/lerobot/<username>/rollout_lerobot_my_dataset_shake_hands
```

- Deployment command

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
  --policy.path=/Users/<username>/Downloads/7-lerobot/shake/pi05/50K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0.5/1.png)

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0.5/2.jpg)

## Reasons inference is very slow

- The dataset is too small

- The GPU VRAM is insufficient; you need a 50-series GPU

<RelatedProducts slugs="so-arm101" />
