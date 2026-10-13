---
title: "6단계: 데이터셋 보기 및 재생"
description: "수집한 데이터셋을 LeRobot Dataset Visualizer에서 확인하고, lerobot-dataset-viz로 특정 episode를 시각화한 뒤, lerobot-replay로 팔로워 암의 동작을 재생해 수집 품질을 검증합니다."
---

# 6단계: 데이터셋 보기 및 재생

## 전체 데이터셋 시각화

https://huggingface.co/spaces/lerobot/visualize_dataset

http://io-ai.tech/lerobot

https://open.platform.io-ai.tech

`TommyZihao/lerobot_zihao_dataset_a` 또는 다른 데이터셋을 입력합니다

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-01.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-03.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-04.png)

관찰: 명령과 상태는 다릅니다 — 명령은 Leader 암이 제공하고, 상태는 Follower 암이 제공합니다

## 특정 에피소드 시각화

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-05.png)

타임라인을 드래그하여 언제든 임의 시점의 카메라 화면과 서보 위치를 볼 수 있습니다

## 특정 에피소드의 Follower 암 동작 재생

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

`Replaying episode`라는 메시지가 들리고, 그다음 Follower 암이 움직이며 지정된 에피소드의 동작을 재생하여 재현합니다

사실 이쯤 되면 이미 많은 일반인에게 깊은 인상을 줄 수 있지 않습니까

[VID_20260115_140050.mp4](/downloads/VID_20260115_140050.mp4)

<RelatedProducts slugs="so-arm101" />
