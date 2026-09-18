---
title: "Step 3: Arm Calibration (Ubuntu)"
description: "Calibrate the follower and leader arms on Ubuntu with the LeRobot calibration command and check the saved calibration configuration file."
---

# Step 3: Arm Calibration (Ubuntu)

## Grant permissions to the port

Grant all users read/write permission for these serial devices

```Shell
sudo chmod 666 /dev/ttyACM*
```

## Calibrate the follower arm (Follower)

```Shell
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_follower_arm
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/1.png)

## Calibrate the leader arm (Leader)

```Shell
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_leader_arm
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/2.png)

## View the calibration configuration file

```Shell
sudo nano /home/<username>/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_follower_arm.json
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/3.png)

## Notes

### ① Once one arm reaches its limit, it stops moving

Recalibration is required

[wx_camera_1768098182808.mp4](/downloads/wx_camera_1768098182808.mp4)

### ② Servos cannot be found

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-03-Calibration-Ubuntu/4.png)

The servo power is not plugged in

<RelatedProducts slugs="so-arm101" />
