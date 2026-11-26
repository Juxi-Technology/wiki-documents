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

Enter キーでキャリブレーションを開始する前に、ロボットアームを中間位置（各関節が可動範囲の中央）に合わせてください。

各関節の最小値と最大値を確認してください。最小値が 0 を越えて突然 4095 から減少する場合、または最大値が 4095 を越えて 0 から増加する場合は、Feetech の上位ソフトで中間位置キャリブレーションを行ってから、ロボットアームのキャリブレーションをやり直してください。

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## リーダーアーム（Leader）のキャリブレーション

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

Enter キーでキャリブレーションを開始する前に、ロボットアームを中間位置（各関節が可動範囲の中央）に合わせてください。

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## キャリブレーション設定ファイルを確認する

```Shell
sudo nano /Users/<ユーザー名>/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/my_leader_arm.json
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
