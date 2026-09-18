---
title: "Step 5: Camera Teleoperation (Windows)"
description: "Connect cameras for teleoperation on Windows, watch live trajectories in rerun and switch the OpenCV backend if the camera fails to open."
---

# Step 5: Camera Teleoperation (Windows)

## Connect the camera and the computer

```Shell
lerobot-find-cameras opencv
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/1.png)

## Teleoperate and display the camera feed

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

A rerun.io window opens, displaying the trajectory of each servo joint and the live camera feed in real time

The images are also saved to the `C:\Users\<Windows-username>\outputs\captured_images` directory

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/2.jpg)

## If you encounter the following error

The camera cannot be connected, but switching cameras in Tencent Meeting can still open it normally

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/3.png)

Modify the `lerobot\src\lerobot\cameras\utils.py` file and change the OpenCV backend to `cv2.CAP_DSHOW`

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/4.png)

> This is a bug that even Doubao cannot solve. It is because the lerobot library is wrapped too deeply, making it very hard for beginners to debug
> 
> 

[wx_camera_1768139334330.mp4](/downloads/wx_camera_1768139334330.mp4)

## Connect multiple cameras, teleoperate and display the camera feed

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/5.jpg)

<RelatedProducts slugs="so-arm101" />
