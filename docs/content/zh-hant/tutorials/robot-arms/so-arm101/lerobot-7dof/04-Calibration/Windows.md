---
title: "Windows電腦"
description: "本頁說明如何在 Windows 校準機械臂，包含以 COM 埠校準兩支手臂、校準檔案的匯出位置與更換手臂的處理。"
---

# Windows電腦

需要同時接上主動臂和從動臂

## 校準從動臂Follower（新增“wrist\_yaw”關節）

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![wrist\_yaw \(1\)\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## 校準主動臂Leader（新增“wrist\_yaw”關節）

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![wrist\_yaw\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## 文件導出位置

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\robots\\so101\_follower\\my\_follower\_arm\.json

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\teleoperators\\so101\_leader\\my\_leader\_arm\.json



## 換機械臂校準

lerobot\-calibrate \-\-robot\.type=so101\_follower \-\-robot\.port=COM4 \-\-robot\.id=my\_follower\_arm





## 注意事項

### ①有一個臂達到限位後不動了

需要重新校準

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②找不到舵機

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

舵機電沒插，重新插拔並轉一轉插口



