---
title: "第三步:校准机械臂(macOS)"
description: "在 Mac 下校准机械臂:回顾端口号后依次校准从动臂与主动臂,查看校准配置文件,并处理找不到舵机、臂达到限位后不动等问题。"
---

# 第三步:校准机械臂(macOS)

## 回顾端口号

从动臂：

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

主动臂：

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## 校准从动臂Follower

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm
```

::: warning 标定提醒

按回车开始校准前，先让机械臂处于中位状态，即所有关节都处于可转动范围的中间位置。

注意看每个关节的最小值和最大值。如果出现最小值越过0突然变成4095递减，或者最大值越过4095变成0递增的情况，请使用飞特上位机进行中位校准，再重新进行标定机械臂。

:::

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/2.png)

## 校准主动臂Leader

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

::: warning 标定提醒

按回车开始校准前，先让机械臂处于中位状态，即所有关节都处于可转动范围的中间位置。

:::

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/3.png)

## 查看校准配置文件

```Shell
sudo nano /Users/<你的用户名>/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/my_leader_arm.json
```

## 常见Bug

- 找不到其中的一个或者几个舵机

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/4.png)

## 注意事项

### ①有一个臂达到限位后不动了

需要重新校准

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ②找不到舵机

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-MacOS/5.png)

舵机电没插

<RelatedProducts slugs="so-arm101" />
