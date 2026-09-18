---
title: "第三步:校準機械臂(Ubuntu)"
description: "本頁說明如何在 Ubuntu 校準機械臂，包含連接埠權限設定、從動臂與主動臂的校準流程，以及常見問題排解。"
---

# 第三步:校準機械臂(Ubuntu)

## 給連接埠賦予權限

讓所有使用者都有權限讀寫這些串口裝置

```Shell
sudo chmod 666 /dev/ttyACM*
```

## 校準從動臂Follower

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/1.png)

## 校準Leader主動臂

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/2.png)

## 查看校準設定檔

```Shell
sudo nano /home/<你的用户名>/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_follower_arm.json
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/3.png)

## 注意事項

### ①有一個臂達到限位後不動了

需要重新校準

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②找不到舵機

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/4.png)

舵機電沒插

<RelatedProducts slugs="so-arm101" />
