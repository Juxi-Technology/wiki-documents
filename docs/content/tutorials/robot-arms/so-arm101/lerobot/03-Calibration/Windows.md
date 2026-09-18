---
title: "Step 3: Arm Calibration (Windows)"
description: "Calibrate the follower and leader arms on Windows by their COM ports and find the exported calibration files for both arms."
---

# Step 3: Arm Calibration (Windows)

Both the leader arm and the follower arm must be connected at the same time

## Calibrate the follower arm (Follower)

```Shell
lerobot-calibrate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/1.png)

## Calibrate the leader arm (Leader)

```Shell
lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/2.png)

## File export location

C:\Users\<Windows-username>\.cache\huggingface\lerobot\calibration\robots\so101_follower\my_follower_arm.json

C:\Users\<Windows-username>\.cache\huggingface\lerobot\calibration\teleoperators\so101_leader\my_leader_arm.json

## Calibrating a different robot arm

lerobot-calibrate --robot.type=so101_follower --robot.port=COM4 --robot.id=my_follower_arm

## Notes

### ① Once one arm reaches its limit, it stops moving

Recalibration is required

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Servos cannot be found

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Windows/3.png)

The servo power is not plugged in; plug and unplug it again and turn the connector a little

<RelatedProducts slugs="so-arm101" />
