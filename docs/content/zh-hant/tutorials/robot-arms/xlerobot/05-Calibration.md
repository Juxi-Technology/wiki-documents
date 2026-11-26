---
title: "標定機械臂"
description: "XLeRobot 雙臂與頭部標定：Windows / macOS / Linux 的 lerobot-calibrate 指令、中位姿態、限位檢查與左右臂驗證。"
---

# 標定機械臂

![雙臂與頭部的標定流程](/images/tutorials/robot-arms/xlerobot/05-calibration/01.png)

## 雙臂與頭部的標定流程

> 下面三條指令依你的作業系統選一條複製執行。`port1` 對應左臂控制板，`port2` 對應右臂控制板；實際埠號請先用 `lerobot-find-port` 確認。
>
> Linux 下快速查看埠：`ls /dev/ttyACM*`

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

執行標定指令後，終端會先提示 Middle Position。把機械臂擺到中位姿態——活動爪朝上、固定爪朝下——再按 Enter。然後依次把每個關節轉到最大和最小限位。

::: warning 標定提醒

按 Enter 開始校準前，先讓機械臂處於中位狀態，即所有關節都處於可轉動範圍的中間位置。

注意查看每個關節的最小值和最大值。如果出現最小值越過 0 突然變成 4095 遞減，或者最大值越過 4095 變成 0 遞增的情況，請使用飛特上位機進行中位校準，再重新進行標定機械臂。

:::

相機塔上的兩個舵機同理，各轉一次最大、最小限位即可。

終端出現下面這行提示時，表示開始標定左臂和頭部：

![雙臂與頭部的標定流程](/images/tutorials/robot-arms/xlerobot/05-calibration/02.png)

![雙臂與頭部的標定流程](/images/tutorials/robot-arms/xlerobot/05-calibration/03.png)

終端出現下面這行提示時，表示開始標定右臂。底盤輪子不需要標定。

![雙臂與頭部的標定流程](/images/tutorials/robot-arms/xlerobot/05-calibration/04.png)

![雙臂與頭部的標定流程](/images/tutorials/robot-arms/xlerobot/05-calibration/05.png)
