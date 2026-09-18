---
title: "ステップ5:カメラ付きテレオペレーション（Ubuntu）"
description: "Ubuntuでカメラを認識させ、カメラ映像を表示しながらテレオペレーションを行う方法を、1台の場合と複数台の場合に分けて説明します。"
---

# ステップ5:カメラ付きテレオペレーション（Ubuntu）

## カメラとパソコンの接続

```Shell
lerobot-find-cameras opencv
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Ubuntu/1.png)

## テレオペレーションとカメラ映像の表示

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

## カメラ複数台でテレオペレーションし、カメラ映像を表示する

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

<RelatedProducts slugs="so-arm101" />
