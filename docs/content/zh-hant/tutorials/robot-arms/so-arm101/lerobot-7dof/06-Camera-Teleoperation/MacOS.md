---
title: "Mac電腦"
description: "本頁說明如何在 macOS 連接攝像頭進行遙操作，並提醒攝像頭解析度與 fps 要和後續的數據集採集保持一致。"
---

# Mac電腦

## 連接攝像頭和電腦

```Shell
lerobot-find-cameras opencv
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-MacOS/1.png)

## 一個攝像頭，遙操作並顯示攝像頭畫面

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```

運行後啟動遙操作

會打開rerun\.io畫面，實時顯示各個舵機關節的軌跡，以及攝像頭實時畫面

並保存圖像至`~/用戶名/outputs/captured_images`目錄

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/06-camera-teleoperation/1.png)

## 多個攝像頭，遙操作並顯示攝像頭畫面

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1920, height: 1080, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true
```



