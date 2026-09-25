---
title: "Windows 컴퓨터"
description: "Windows에서 카메라를 연결해 원격조작과 실시간 화면 표시를 실행하고, 카메라가 열리지 않을 때의 해결 방법까지 함께 다룹니다."
---

# Windows 컴퓨터

## 카메라와 컴퓨터 연결

```Shell
lerobot-find-cameras opencv
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/1.png)

## 원격조작 및 카메라 화면 표시

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```

rerun\.io 화면이 열려 각 서보 관절의 궤적과 카메라 실시간 화면을 실시간으로 표시합니다

또한 이미지를 `C:\Users\사용자명\outputs\captured_images` 디렉터리에 저장합니다

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/06-camera-teleoperation/1.png)

## 아래와 같은 오류가 발생하는 경우

카메라가 연결되지 않지만, 텐센트 미팅에서 카메라를 전환하면 정상적으로 켜집니다

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/3.png)

`lerobot\src\lerobot\cameras\utils.py` 파일을 수정하여 OpenCV 백엔드를 `cv2.CAP_SHOW`로 변경합니다

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-05-Camera-Teleoperation-Windows/4.png)

> 이것은 도우바오(Doubao)로도 해결할 수 없는 bug이며, 모두 lerobot 라이브러리의 캡슐화가 너무 깊은 탓이라, 초보자가 debug하기 매우 어렵습니다
> 
> 

[wx\_camera\_1768139334330\.mp4](/downloads/wx_camera_1768139334330.mp4)

## 카메라 여러 대 연결, 원격조작 및 카메라 화면 표시

```Shell
lerobot-teleoperate --robot.type=so101_follower --robot.port=COM6 --robot.id=my_follower_arm --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 60, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 60, fourcc: "MJPG"}}" --teleop.type=so101_leader --teleop.port=COM7 --teleop.id=my_leader_arm --display_data=true
```



