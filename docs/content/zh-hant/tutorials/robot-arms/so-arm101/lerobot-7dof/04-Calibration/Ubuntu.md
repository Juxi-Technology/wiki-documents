---
title: "Ubuntu電腦"
description: "本頁說明如何在 Ubuntu 校準機械臂，包含連接埠權限設定、從動臂與主動臂的校準流程，以及常見問題排解。"
---

# Ubuntu電腦

## 給端口賦予權限

讓所有用戶都有權限讀寫這些串口設備

```Shell
sudo chmod 666 /dev/ttyACM*
```

## 校準從動臂Follower（新增“wrist\_yaw”關節）

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## 校準Leader主動臂（新增“wrist\_yaw”關節）

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## 查看校準配置文件

```Shell
sudo nano /home/tommy/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_follower_arm.json
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/3.png)



## 注意事項

### ①有一個臂達到限位後不動了

需要重新校準

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②找不到舵機

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

舵機電沒插

