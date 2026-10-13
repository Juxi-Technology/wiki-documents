---
title: "6단계: 시연 데이터셋 수집 — Handshake 200"
description: "완전한 수집 예시: Hugging Face에서 Dataset 저장소를 만들고, lerobot-record로 단일 카메라에서 200개의 악수 episode를 녹화합니다. 키 조작과 저장 경로도 정리했습니다."
---

# 6단계: 시연 데이터셋 수집 — Handshake 200

## HuggingFace에 데이터셋 저장소 생성

https://huggingface.co/new-dataset

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-01.png)

## 같은 이름의 기존 데이터셋 삭제(있을 경우)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Shake200 데이터셋 수집

카메라 한 대, 데이터셋 수집 - Mac 컴퓨터

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

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-03.png)

키보드 화살표 키 조작:
→ (오른쪽 화살표) 현재 에피소드를 조기에 종료하고 다음 에피소드로 넘어갑니다.
← (왼쪽 화살표) 현재 에피소드를 취소하고 다시 기록합니다.
ESC, 즉시 중지하고, 비디오를 인코딩한 뒤 데이터셋을 업로드합니다.

## 수집 완료 — 데이터셋 저장 디렉터리

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

<RelatedProducts slugs="so-arm101" />
