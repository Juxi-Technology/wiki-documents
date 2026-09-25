---
title: "시연 데이터셋 수집"
description: "시연 데이터셋 수집 페이지로, 자리 표시자 교체와 카메라 설정, 녹화 절차, 저장 디렉터리와 악수 작업 예시까지 차례로 안내합니다."
---

# 시연 데이터셋 수집

## 이전에 이미 있던 같은 이름의 데이터셋 삭제(있는 경우)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_a
```

## 카메라 1대, 데이터셋 수집\-Mac 컴퓨터

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## 카메라 2대, 데이터셋 수집\-Mac 컴퓨터

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1920, height: 1080, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## 수집 중

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

키보드 방향키 조작:
→(오른쪽 화살표) 현재 episode를 미리 종료하고, 다음 episode로 넘어갑니다.
←(왼쪽 화살표) 현재 episode를 취소하고, 다시 녹화합니다.
ESC, 즉시 중지하고, 영상을 인코딩한 뒤 데이터셋을 업로드합니다.

## 수집 완료, 데이터셋 저장 디렉터리

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_a
```





## 악수

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
    --dataset.num_episodes=30 \
    --dataset.single_task="Shanke Hands" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=12 \
    --dataset.reset_time_s=1
```



