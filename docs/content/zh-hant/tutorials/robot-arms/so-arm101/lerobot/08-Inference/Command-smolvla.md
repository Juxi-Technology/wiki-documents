---
title: "第八步:SmolVLA 推論命令列"
description: "本頁提供 SmolVLA 模型的推論命令列，包含 Ubuntu 與 Mac 的部署方式，並說明如何從訓練輸出載入模型檢查點。"
---

# 第八步:SmolVLA 推論命令列

> 部署統一使用 `lerobot-rollout`，用法和參數見[命令列說明](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference)。

## Ubuntu

- 刪除原有的數據集（如有）

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
```

- 部署命令列

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/home/<你的用户名>/Downloads/lerobot_output/shake/smolvla/40K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

## Mac

- 刪除原有的數據集（如有）

```Shell
sudo rm -rf /Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
```

- 部署命令列

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/shake/smolvla/40K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-smolvla/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-smolvla/2.png)

<RelatedProducts slugs="so-arm101" />
