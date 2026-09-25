---
title: "Mac電腦"
description: "本頁說明如何在 macOS 校準機械臂，包含回顧連接埠號、檢視校準設定檔，以及常見錯誤的排解方式。"
---

# Mac電腦

## 回顧端口號

從動臂：

/dev/tty\.usbmodem5AAF2193061

/dev/tty\.wchusbserial5AAF2193061

主動臂：

/dev/tty\.usbmodem5AAF2194741

/dev/tty\.wchusbserial5AAF2194741

## 校準從動臂Follower（新增“wrist\_yaw”關節）

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=zihao_follower_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## 校準主動臂Leader（新增“wrist\_yaw”關節）

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=zihao_leader_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## 查看校準配置文件

```Shell
sudo nano /Users/tommy/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/zihao_leader_arm.json
```



## 常見Bug

- 找不到其中的一個或者幾個舵機（不影響）

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/4.png)



## 注意事項

### ①有一個臂達到限位後不動了

需要重新校準

[wx\_camera\_1768098182808\.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②找不到舵機

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

舵機電沒插

