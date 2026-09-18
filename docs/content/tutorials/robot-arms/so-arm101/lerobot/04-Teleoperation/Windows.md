---
title: "Step 4: Teleoperation (Windows)"
description: "Run LeRobot teleoperation on Windows using the recorded COM ports of the follower and leader arms in a single command."
---

# Step 4: Teleoperation (Windows)

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

<RelatedProducts slugs="so-arm101" />
