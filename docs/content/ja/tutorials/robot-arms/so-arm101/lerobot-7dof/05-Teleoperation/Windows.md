---
title: "Windowsコンピューター"
description: "WindowsでリーダーアームとフォロワーアームのCOMポートを指定し、テレオペレーションを開始する最小限の手順です。"
---

# Windowsコンピューター

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```



