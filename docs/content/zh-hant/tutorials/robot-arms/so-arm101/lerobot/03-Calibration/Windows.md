---
title: "第三步:校準機械臂(Windows)"
description: "本頁說明如何在 Windows 校準機械臂，包含以 COM 埠校準兩支手臂、校準檔案的匯出位置與更換手臂的處理。"
---

# 第三步:校準機械臂(Windows)

需要同時接上主動臂和從動臂

## 校準從動臂Follower

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/1.png)

## 校準主動臂Leader

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/2.png)

## 檔案導出位置

C:\Users\<你的Windows使用者名稱>\.cache\huggingface\lerobot\calibration\robots\so101_follower\my_follower_arm.json

C:\Users\<你的Windows使用者名稱>\.cache\huggingface\lerobot\calibration\teleoperators\so101_leader\my_leader_arm.json

## 換機械臂校準

lerobot-calibrate --robot.type=so101_follower --robot.port=COM4 --robot.id=my_follower_arm

## 注意事項

### ①有一個臂達到限位後不動了

需要重新校準

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②找不到舵機

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/3.png)

舵機電沒插，重新插拔並轉一轉插口

<RelatedProducts slugs="so-arm101" />
