---
title: "Windows电脑"
description: "在 Windows 下校准机械臂:同时接上主动臂与从动臂,依次校准后查看校准文件的导出位置,并了解更换机械臂重新校准的方法。"
---

# Windows电脑

需要同时接上主动臂和从动臂

## 校准从动臂Follower（新增“wrist\_yaw”关节）

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![wrist\_yaw \(1\)\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## 校准主动臂Leader（新增“wrist\_yaw”关节）

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![wrist\_yaw\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/04-calibration/1.png)

## 文件导出位置

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\robots\\so101\_follower\\my\_follower\_arm\.json

C:\\Users\\40743\\\.cache\\huggingface\\lerobot\\calibration\\teleoperators\\so101\_leader\\my\_leader\_arm\.json



## 换机械臂校准

lerobot\-calibrate \-\-robot\.type=so101\_follower \-\-robot\.port=COM4 \-\-robot\.id=my\_follower\_arm





## 注意事项

### ①有一个臂达到限位后不动了

需要重新校准

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②找不到舵机

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

舵机电没插，重新插拔并转一转插口



