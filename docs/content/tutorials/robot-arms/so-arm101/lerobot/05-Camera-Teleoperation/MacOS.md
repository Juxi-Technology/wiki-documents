---
title: "Step 5: Camera Teleoperation (macOS)"
description: "Connect cameras for teleoperation on macOS, note the camera index numbers and keep 1280x720 at 30 fps for the later collection steps."
---

# Step 5: Camera Teleoperation (macOS)

## Connect the camera and the computer

```Shell
lerobot-find-cameras opencv
```

After running, it lists the number of each camera. Note it down and fill it into `index_or_path` in the commands below.

> The camera parameters (resolution, fps, aspect ratio) must remain consistent when collecting the dataset and deploying the model; for the reason, see the explanation in [Teaching and Collecting a Dataset](/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording). This tutorial uses `1280×720@30` throughout.

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## One camera: teleoperate and display the camera feed

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

After running, teleoperation starts

A rerun.io window opens, displaying the trajectory of each servo joint and the live camera feed in real time

The images are also saved to the `~/<username>/outputs/captured_images` directory

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/2.jpg)

## Multiple cameras: teleoperate and display the camera feed

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/3.jpg)

<RelatedProducts slugs="so-arm101" />
