---
title: "第三步:校準機械臂(macOS)"
description: "本頁說明如何在 macOS 校準機械臂，包含回顧連接埠號、檢視校準設定檔，以及常見錯誤的排解方式。"
---

# 第三步:校準機械臂(macOS)

## 回顧連接埠號

從動臂：

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

主動臂：

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## 校準從動臂Follower

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## 校準主動臂Leader

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## 查看校準設定檔

```Shell
sudo nano /Users/<你的用户名>/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/my_leader_arm.json
```

## 常見Bug

- 找不到其中的一個或者幾個舵機

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/4.png)

## 注意事項

### ①有一個臂達到限位後不動了

需要重新校準

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②找不到舵機

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

舵機電沒插

<RelatedProducts slugs="so-arm101" />
