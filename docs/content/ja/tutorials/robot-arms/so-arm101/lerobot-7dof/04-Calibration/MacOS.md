---
title: "Macコンピューター"
description: "Macでポート番号を確認したうえで両方のアームをキャリブレーションし、設定ファイルの確認とサーボが見つからない場合の対処を扱います。"
---

# Macコンピューター

## ポート番号を振り返る

フォロワーアーム（Follower）：

/dev/tty\.usbmodem5AAF2193061

/dev/tty\.wchusbserial5AAF2193061

リーダーアーム（Leader）：

/dev/tty\.usbmodem5AAF2194741

/dev/tty\.wchusbserial5AAF2194741

## フォロワーアーム（Follower）のキャリブレーション（“wrist\_yaw”関節を追加）

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=zihao_follower_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## リーダーアーム（Leader）のキャリブレーション（“wrist\_yaw”関節を追加）

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=zihao_leader_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## キャリブレーション設定ファイルを確認する

```Shell
sudo nano /Users/tommy/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/zihao_leader_arm.json
```



## よくあるBug

- サーボを1つまたはいくつか見つけられない（影響なし）

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/4.png)



## 注意事項

### ①片方のアームがリミットに達した後動かなくなった

再キャリブレーションが必要です

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②サーボが見つからない

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

サーボの電源が挿さっていません

