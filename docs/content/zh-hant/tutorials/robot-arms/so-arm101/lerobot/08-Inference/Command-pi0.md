---
title: "第八步:pi0 推論命令列"
description: "本頁提供 pi0 模型的推論命令列，包含 Ubuntu 與 Mac 的部署方式，並說明機械臂動作卡頓的可能原因。"
---

# 第八步:pi0 推論命令列

> 部署統一使用 `lerobot-rollout`，用法和參數見[命令列說明](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference)。

## Ubuntu

- 刪除原有的數據集（如有）

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<你的使用者名稱>/.cache/huggingface/lerobot/<你的使用者名稱>/rollout_lerobot_my_dataset_shake_hands
export TOKENIZERS_PARALLELISM=false
```

- 部署命令列

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/home/<你的使用者名稱>/Downloads/lerobot_output/shake/pi0/50K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

![b04cfa2962f16a1e354063623e5f86e3.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/1.png)

![a5c84c9e12afe207fc64f99d1116e770.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/3.png)

## Mac

- 刪除原有的數據集（如有）

```Shell
sudo rm -rf /Users/<你的使用者名稱>/.cache/huggingface/lerobot/<你的使用者名稱>/rollout_lerobot_my_dataset_shake_hands
```

- 部署命令列

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
  --policy.path=/Users/<你的使用者名稱>/Downloads/7-lerobot/shake/pi0/50K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/4.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/5.jpg)

## 用Mac推理，機械臂一頓一頓的原因

- 數據集太小了

- 顯卡顯存不夠，需要上50系顯卡

<RelatedProducts slugs="so-arm101" />
