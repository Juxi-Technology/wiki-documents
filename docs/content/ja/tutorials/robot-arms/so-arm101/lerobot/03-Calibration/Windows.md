---
title: "ステップ3:ロボットアームのキャリブレーション（Windows）"
description: "Windowsでリーダーアームとフォロワーアームを同時に接続し、COMポートを指定してキャリブレーションする手順と保存先を説明します。"
---

# ステップ3:ロボットアームのキャリブレーション（Windows）

リーダーアームとフォロワーアームを同時に接続する必要があります

## フォロワーアーム（Follower）のキャリブレーション

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/1.png)

## リーダーアーム（Leader）のキャリブレーション

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/2.png)

## ファイルのエクスポート先

C:\Users\<Windows-ユーザー名>\.cache\huggingface\lerobot\calibration\robots\so101_follower\my_follower_arm.json

C:\Users\<Windows-ユーザー名>\.cache\huggingface\lerobot\calibration\teleoperators\so101_leader\my_leader_arm.json

## ロボットアームを交換してキャリブレーションする

lerobot-calibrate --robot.type=so101_follower --robot.port=COM4 --robot.id=my_follower_arm

## 注意事項

### ①片方のアームがリミットに達した後動かなくなった

再キャリブレーションが必要です

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②サーボが見つからない

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/3.png)

サーボの電源が挿さっていません。挿し直して、コネクタを回してみてください

<RelatedProducts slugs="so-arm101" />
