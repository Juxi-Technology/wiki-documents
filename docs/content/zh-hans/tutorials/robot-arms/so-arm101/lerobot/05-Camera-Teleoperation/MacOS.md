---
title: "第五步:连接摄像头的遥操作(macOS)"
description: "在 Mac 下连接摄像头的遥操作:列出摄像头编号后,用一个或多个摄像头遥操作并显示画面,并提醒相机参数需与采集推理一致。"
---

# 第五步:连接摄像头的遥操作(macOS)

## 连接摄像头和电脑

```Shell
lerobot-find-cameras opencv
```

运行后会列出每个摄像头的编号，记下来填到下面命令的 `index_or_path` 里。

> 相机参数（分辨率、fps、宽高比）在采集数据集和部署模型时必须保持一致，原因见[示教采集数据集](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording)里的说明。本教程统一使用 `1280×720@30`。

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## 一个摄像头，遥操作并显示摄像头画面

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

运行后启动遥操作

会打开rerun.io画面，实时显示各个舵机关节的轨迹，以及摄像头实时画面

并保存图像至`~/用户名/outputs/captured_images`目录

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/2.jpg)

## 多个摄像头，遥操作并显示摄像头画面

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

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/3.jpg)

<RelatedProducts slugs="so-arm101" />
