---
title: "Windowsコンピューター"
description: "Windowsでカメラを接続して映像表示付きのテレオペレーションを行い、カメラが開けない場合の対処も併せて説明します。"
---

# Windowsコンピューター

## カメラとパソコンの接続

```Shell
lerobot-find-cameras opencv
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/1.png)

## テレオペレーションとカメラ映像の表示

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

rerun\.io の画面が開き、各サーボ関節の軌跡、およびカメラのリアルタイム映像がリアルタイムに表示されます

また、画像は`C:\Users\ユーザー\outputs\captured_images`ディレクトリに保存されます

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/06-camera-teleoperation/1.png)

## 以下のようなエラーが発生した場合

カメラに接続できませんが、Tencent Meeting でカメラを切り替えると、正常に起動できます

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/3.png)

`lerobot\src\lerobot\cameras\utils.py`ファイルを修正し、OpenCV のバックエンドを`cv2.CAP_SHOW`に変更します

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/4.png)

> これはDoubaoですら解決できないbugで、lerobotライブラリのカプセル化が深すぎるのが原因です。初心者にはdubugが非常に困難です
> 
> 

[wx\_camera\_1768139334330\.mp4](/downloads/wx_camera_1768139334330.mp4)

## カメラを複数台接続してテレオペレーションし、カメラ映像を表示する

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```



