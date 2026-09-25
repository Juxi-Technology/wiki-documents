---
title: "Windows电脑"
description: "在 Windows 下连接摄像头的遥操作:查找摄像头并在遥操作中显示实时画面,解决摄像头连接不上时改用 DSHOW 后端的报错。"
---

# Windows电脑

## 连接摄像头和电脑

```Shell
lerobot-find-cameras opencv
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/1.png)

## 遥操作并显示摄像头画面

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

会打开rerun\.io画面，实时显示各个舵机关节的轨迹，以及摄像头实时画面

并保存图像至`C:\Users\用户\outputs\captured_images`目录

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/06-camera-teleoperation/1.png)

## 如果遇到了下面这种报错

摄像头连接不上，但在腾讯会议中切换摄像头，仍然能正常开启

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/3.png)

修改`lerobot\src\lerobot\cameras\utils.py`文件，将OpenCV后端改为`cv2.CAP_SHOW`

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/4.png)

> 这是一个豆包都无法解决的bug，都怪lerobot库封装的太深了，初学者小白很难dubug
> 
> 

[wx\_camera\_1768139334330\.mp4](/downloads/wx_camera_1768139334330.mp4)

## 连接多个摄像头，遥操作并显示摄像头画面

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```



