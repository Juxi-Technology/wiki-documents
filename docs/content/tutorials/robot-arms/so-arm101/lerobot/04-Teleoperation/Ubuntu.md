---
title: "Step 4: Teleoperation (Ubuntu)"
description: "Run LeRobot teleoperation on Ubuntu with the leader and follower arm ports, after granting read and write permissions to the serial devices."
---

# Step 4: Teleoperation (Ubuntu)

## Grant permissions to the port

Grant all users read/write permission for these serial devices

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Teleoperation

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-04-Teleoperation-Ubuntu/1.png)

<RelatedProducts slugs="so-arm101" />
