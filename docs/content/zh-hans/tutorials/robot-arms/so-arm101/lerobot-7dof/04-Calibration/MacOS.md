---
title: "Mac电脑"
description: "在 Mac 下校准机械臂:回顾端口号后依次校准从动臂与主动臂,查看校准配置文件,并处理找不到舵机、臂达到限位后不动等问题。"
---

# Mac电脑

## 回顾端口号

从动臂：

/dev/tty\.usbmodem5AAF2193061

/dev/tty\.wchusbserial5AAF2193061

主动臂：

/dev/tty\.usbmodem5AAF2194741

/dev/tty\.wchusbserial5AAF2194741

## 校准从动臂Follower（新增“wrist\_yaw”关节）

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=zihao_follower_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## 校准主动臂Leader（新增“wrist\_yaw”关节）

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=zihao_leader_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## 查看校准配置文件

```Shell
sudo nano /Users/tommy/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/zihao_leader_arm.json
```



## 常见Bug

- 找不到其中的一个或者几个舵机（不影响）

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/4.png)



## 注意事项

### ①有一个臂达到限位后不动了

需要重新校准

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②找不到舵机

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

舵机电没插

