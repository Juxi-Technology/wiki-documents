---
title: "Windows電腦"
description: "本頁說明如何在 Windows 連接攝像頭進行遙操作並顯示實時畫面，包含多攝像頭設定與攝像頭無法開啟的處理。"
---

# Windows電腦

## 連接攝像頭和電腦

```Shell
lerobot-find-cameras opencv
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/1.png)

## 遙操作並顯示攝像頭畫面

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

會打開rerun\.io畫面，實時顯示各個舵機關節的軌跡，以及攝像頭實時畫面

並保存圖像至`C:\Users\用戶\outputs\captured_images`目錄

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/06-camera-teleoperation/1.png)

## 如果遇到了下面這種報錯

攝像頭連接不上，但在騰訊會議中切換攝像頭，仍然能正常開啟

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/3.png)

修改`lerobot\src\lerobot\cameras\utils.py`文件，將OpenCV後端改為`cv2.CAP_SHOW`

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/4.png)

> 這是一個豆包都無法解決的bug，都怪lerobot庫封裝的太深了，初學者小白很難dubug
> 
> 

[wx\_camera\_1768139334330\.mp4](/downloads/wx_camera_1768139334330.mp4)

## 連接多個攝像頭，遙操作並顯示攝像頭畫面

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```



