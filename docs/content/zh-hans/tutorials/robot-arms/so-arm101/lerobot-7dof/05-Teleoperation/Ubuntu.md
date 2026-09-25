---
title: "Ubuntu电脑"
description: "在 Ubuntu 下做遥操作:先给串口赋权限,再运行遥操作命令,用主动臂带动从动臂实时同步运动。"
---

# Ubuntu电脑

## 给端口赋予权限

让所有用户都有权限读写这些串口设备

```Shell
sudo chmod 666 /dev/ttyACM*
```

## 遥操作

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



