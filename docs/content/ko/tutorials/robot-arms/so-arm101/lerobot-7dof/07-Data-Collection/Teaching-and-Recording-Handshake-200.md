---
title: "시연 데이터셋 수집-악수 200"
description: "Hugging Face 데이터셋 리포지터리 생성부터 7축 팔에서 lerobot-record로 악수 200 episode를 녹화하는 실습까지 안내합니다."
---

# 시연 데이터셋 수집\-악수 200

## HuggingFace에서 Dataset Repo 생성

https://huggingface\.co/new\-dataset

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## 이전에 이미 있던 같은 이름의 데이터셋 삭제(있는 경우)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Shake200 데이터셋 수집

카메라 1대, 데이터셋 수집\-Mac 컴퓨터

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
    --dataset.repo_id=Tommymy/lerobot_my_dataset_shake200 \
    --dataset.num_episodes=200 \
    --dataset.single_task="Shanke Hands" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=12 \
    --dataset.reset_time_s=1
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
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```



