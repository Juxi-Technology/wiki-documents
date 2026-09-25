---
title: "Windows電腦"
description: "本頁說明如何在 Windows 用記錄好的 COM 埠執行機械臂遙操作，讓主動臂帶動從動臂同步動作。"
---

# Windows電腦

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```



