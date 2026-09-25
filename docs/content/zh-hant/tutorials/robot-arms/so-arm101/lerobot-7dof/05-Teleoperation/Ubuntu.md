---
title: "Ubuntu電腦"
description: "本頁說明如何在 Ubuntu 設定連接埠權限後執行機械臂遙操作，讓主動臂帶動從動臂同步動作。"
---

# Ubuntu電腦

## 給端口賦予權限

讓所有用戶都有權限讀寫這些串口設備

```Shell
sudo chmod 666 /dev/ttyACM*
```

## 遙操作

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-04-Teleoperation-Ubuntu/1.png)



