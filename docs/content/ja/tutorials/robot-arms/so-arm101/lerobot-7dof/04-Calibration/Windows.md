---
title: "Windowsコンピューター"
description: "Windowsでリーダーアームとフォロワーアームを同時に接続し、COMポートを指定してキャリブレーションする手順と保存先を説明します。"
---

# Windowsコンピューター

リーダーアームとフォロワーアームを同時に接続する必要があります

## フォロワーアーム（Follower）のキャリブレーション（“wrist\_yaw”関節を追加）

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![wrist\_yaw \(1\)\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## リーダーアーム（Leader）のキャリブレーション（“wrist\_yaw”関節を追加）

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![wrist\_yaw\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## ファイルのエクスポート先

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\robots\\so101\_follower\\my\_follower\_arm\.json

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\teleoperators\\so101\_leader\\my\_leader\_arm\.json



## ロボットアームを交換してキャリブレーションする

lerobot\-calibrate \-\-robot\.type=so101\_follower \-\-robot\.port=COM4 \-\-robot\.id=my\_follower\_arm





## 注意事項

### ①片方のアームがリミットに達した後動かなくなった

再キャリブレーションが必要です

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②サーボが見つからない

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

サーボの電源が挿さっていません。挿し直して、コネクタを回してみてください



