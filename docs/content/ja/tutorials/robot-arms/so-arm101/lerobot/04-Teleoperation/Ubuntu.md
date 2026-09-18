---
title: "ステップ4:テレオペレーション（Ubuntu）"
description: "Ubuntuでシリアルポートに権限を付与し、LeRobotのテレオペレーション機能でリーダーアームの動きをフォロワーアームに伝える手順です。"
---

# ステップ4:テレオペレーション（Ubuntu）

## ポートに権限を付与する

すべてのユーザーがこれらのシリアルデバイスを読み書きできるようにします

```Shell
sudo chmod 666 /dev/ttyACM*
```

## テレオペレーション

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-04-Teleoperation-Ubuntu/1.png)

<RelatedProducts slugs="so-arm101" />
