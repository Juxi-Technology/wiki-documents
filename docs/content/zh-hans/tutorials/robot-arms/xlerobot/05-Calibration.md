---
title: "标定机械臂"
description: "XLeRobot 双臂与头部标定：Windows / macOS / Linux 的 lerobot-calibrate 命令、中位姿态、限位检查与左右臂验证。"
---

# 标定机械臂

![双臂与头部的标定流程](/images/tutorials/robot-arms/xlerobot/05-calibration/01.png)

## 双臂与头部的标定流程

> 下面三条命令按你的操作系统选一条复制执行。`port1` 对应左臂控制板，`port2` 对应右臂控制板；实际端口号请先用 `lerobot-find-port` 确认。
>
> Linux 下快速查看端口：`ls /dev/ttyACM*`

**Windows**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=COM3 \
    --robot.port2=COM4
```

**macOS**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=/dev/tty.usbmodem58546521551 \
    --robot.port2=/dev/tty.usbmodem58546521552
```

**Linux**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=/dev/ttyACM0 \
    --robot.port2=/dev/ttyACM1
```

运行标定命令后，终端会先提示 Middle Position。把机械臂摆到中位姿态——活动爪朝上、固定爪朝下——再按回车。然后依次把每个关节转到最大和最小限位。

::: warning 标定提醒

按回车开始校准前，先让机械臂处于中位状态，即所有关节都处于可转动范围的中间位置。

注意看每个关节的最小值和最大值。如果出现最小值越过0突然变成4095递减，或者最大值越过4095变成0递增的情况，请使用飞特上位机进行中位校准，再重新进行标定机械臂。

:::

相机塔上的两个舵机同理，各转一次最大、最小限位即可。

终端出现下面这行提示时，表示开始校准左臂和头部：

![双臂与头部的标定流程](/images/tutorials/robot-arms/xlerobot/05-calibration/02.png)

![双臂与头部的标定流程](/images/tutorials/robot-arms/xlerobot/05-calibration/03.png)

终端出现下面这行提示时，表示开始校准右臂。底盘轮子不需要校准。

![双臂与头部的标定流程](/images/tutorials/robot-arms/xlerobot/05-calibration/04.png)

![双臂与头部的标定流程](/images/tutorials/robot-arms/xlerobot/05-calibration/05.png)
