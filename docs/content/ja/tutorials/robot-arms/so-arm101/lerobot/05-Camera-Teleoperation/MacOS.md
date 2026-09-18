---
title: "ステップ5:カメラ付きテレオペレーション（macOS）"
description: "Macでカメラを接続し、解像度とフレームレートをデータセット収集時と揃えたうえで映像表示付きのテレオペレーションを行います。"
---

# ステップ5:カメラ付きテレオペレーション（macOS）

## カメラとパソコンの接続

```Shell
lerobot-find-cameras opencv
```

実行すると各カメラの番号が一覧表示されるので、それを控えて以下のコマンドの `index_or_path` に記入します。

> カメラのパラメータ（解像度、fps、アスペクト比）は、データセットの収集時とモデルのデプロイ時に必ず一致させる必要があります。理由は[教示によるデータセット収集](/ja/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording)内の説明を参照してください。本チュートリアルでは統一して `1280×720@30` を使用します。

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## カメラ1台でテレオペレーションし、カメラ映像を表示する

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

実行するとテレオペレーションが開始されます

rerun.ioの画面が開き、各サーボ関節の軌跡、およびカメラのリアルタイム映像がリアルタイムに表示されます

また、画像は`~/用户名/outputs/captured_images`ディレクトリに保存されます

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/2.jpg)

## カメラ複数台でテレオペレーションし、カメラ映像を表示する

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/3.jpg)

<RelatedProducts slugs="so-arm101" />
