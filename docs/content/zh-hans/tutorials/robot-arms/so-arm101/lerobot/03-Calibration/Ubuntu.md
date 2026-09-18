---
title: "第三步:校准机械臂(Ubuntu)"
description: "在 Ubuntu 下校准机械臂:给端口赋权限后依次校准从动臂与主动臂,查看生成的校准配置文件,并了解限位不动、找不到舵机等注意事项。"
---

# 第三步:校准机械臂(Ubuntu)

## 给端口赋予权限

让所有用户都有权限读写这些串口设备

```Shell
sudo chmod 666 /dev/ttyACM*
```

## 校准从动臂Follower

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/1.png)

## 校准Leader主动臂

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/2.png)

## 查看校准配置文件

```Shell
sudo nano /home/<你的用户名>/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_follower_arm.json
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/3.png)

## 注意事项

### ①有一个臂达到限位后不动了

需要重新校准

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②找不到舵机

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/4.png)

舵机电没插

<RelatedProducts slugs="so-arm101" />
