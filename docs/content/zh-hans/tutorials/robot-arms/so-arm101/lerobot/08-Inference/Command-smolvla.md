---
title: "第八步:模型推理——smolvla 推理命令"
description: "smolvla 模型推理命令:给出 Ubuntu 与 Mac 上用 smolvla 模型推理握手任务的部署命令,含摄像头参数与模型路径。"
---

# 第八步:模型推理——smolvla 推理命令

> 部署统一使用 `lerobot-rollout`，用法和参数见[命令行说明](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference)。

## Ubuntu

- 删除原有的数据集（如有）

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
```

- 部署命令行

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

- 删除原有的数据集（如有）

```Shell
sudo rm -rf /Users/<你的用户名>/.cache/huggingface/lerobot/<用户名>/rollout_lerobot_my_dataset_shake_hands
```

- 部署命令行

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
