---
title: "ステップ8:デプロイコマンドライン-pi0"
description: "pi0モデルをUbuntuとMacでデプロイするコマンドと、Macで動作がカクカクする場合に考えられる原因を説明します。"
---

# ステップ8:デプロイコマンドライン-pi0

> デプロイは統一して `lerobot-rollout` を使用します。使い方とパラメータは[コマンドラインの説明](/ja/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference)を参照してください。

## Ubuntu

- 既存のデータセットを削除する（ある場合）

```Shell
sudo chmod 666 /dev/ttyACM*
sudo rm -rf /home/<ユーザー名>/.cache/huggingface/lerobot/<ユーザー名>/rollout_lerobot_my_dataset_shake_hands
export TOKENIZERS_PARALLELISM=false
```

- デプロイコマンドライン

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/home/<ユーザー名>/Downloads/lerobot_output/shake/pi0/50K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

![b04cfa2962f16a1e354063623e5f86e3.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/1.png)

![a5c84c9e12afe207fc64f99d1116e770.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/3.png)

## Mac

- 既存のデータセットを削除する（ある場合）

```Shell
sudo rm -rf /Users/<ユーザー名>/.cache/huggingface/lerobot/<ユーザー名>/rollout_lerobot_my_dataset_shake_hands
```

- デプロイコマンドライン

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
  --policy.path=/Users/<ユーザー名>/Downloads/7-lerobot/shake/pi0/50K/pretrained_model \
  --task="Shake Hands" \
  --duration=60 \
  --display_data=false
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/4.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Command-pi0/5.jpg)

## Macで推論するとロボットアームがカクカクする原因

- データセットが小さすぎる

- グラフィックスカードのVRAMが足りない。50シリーズのグラフィックスカードが必要

<RelatedProducts slugs="so-arm101" />
