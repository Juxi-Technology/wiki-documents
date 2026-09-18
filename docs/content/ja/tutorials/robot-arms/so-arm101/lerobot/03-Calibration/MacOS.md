---
title: "ステップ3:ロボットアームのキャリブレーション（macOS）"
description: "Macでポート番号を確認したうえで両方のアームをキャリブレーションし、設定ファイルの確認とサーボが見つからない場合の対処を扱います。"
---

# ステップ3:ロボットアームのキャリブレーション（macOS）

## ポート番号を振り返る

フォロワーアーム：

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

リーダーアーム：

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## フォロワーアーム（Follower）のキャリブレーション

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## リーダーアーム（Leader）のキャリブレーション

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## キャリブレーション設定ファイルを確認する

```Shell
sudo nano /Users/<你的用户名>/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/my_leader_arm.json
```

## よくあるBug

- サーボを1つまたはいくつか見つけられない

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/4.png)

## 注意事項

### ①片方のアームがリミットに達した後動かなくなった

再キャリブレーションが必要です

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②サーボが見つからない

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

サーボの電源が挿さっていません

<RelatedProducts slugs="so-arm101" />
