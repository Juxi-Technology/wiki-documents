---
title: "Ubuntuコンピューター"
description: "Ubuntuでフォロワーアームとリーダーアームを順にキャリブレーションし、設定ファイルの確認方法やよくある問題の対処も説明します。"
---

# Ubuntuコンピューター

## ポートに権限を付与する

すべてのユーザーがこれらのシリアルポートデバイスを読み書きできるようにします

```Shell
sudo chmod 666 /dev/ttyACM*
```

Enter キーでキャリブレーションを開始する前に、ロボットアームを中間位置（各関節が可動範囲の中央）に合わせてください。

各関節の最小値と最大値を確認してください。最小値が 0 を越えて突然 4095 から減少する場合、または最大値が 4095 を越えて 0 から増加する場合は、Feetech の上位ソフトで中間位置キャリブレーションを行ってから、ロボットアームのキャリブレーションをやり直してください。

## フォロワーアーム（Follower）のキャリブレーション（“wrist\_yaw”関節を追加）

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## リーダーアーム（Leader）のキャリブレーション（“wrist\_yaw”関節を追加）

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## キャリブレーション設定ファイルを確認する

```Shell
sudo nano /home/tommy/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_follower_arm.json
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/3.png)



## 注意事項

### ①片方のアームがリミットに達した後動かなくなった

再キャリブレーションが必要です

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②サーボが見つからない

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

サーボの電源が挿さっていません

