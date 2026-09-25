---
title: "Windows电脑"
description: "在 Windows 下做遥操作:填好两个机械臂的 COM 端口号,运行遥操作命令,用主动臂控制从动臂同步跟随运动。"
---

# Windows电脑

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```



