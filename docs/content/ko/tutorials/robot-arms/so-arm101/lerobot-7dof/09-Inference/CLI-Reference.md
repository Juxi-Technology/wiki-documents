---
title: "커맨드라인 설명"
description: "모델 배포에 사용하는 rollout 커맨드의 파라미터와 카메라 설정을 수집 때와 똑같이 맞춰야 하는 이유를 설명합니다."
---

# 커맨드라인 설명

## 커맨드라인 설명

실시간 시각화 포함: \-\-display\_data=true

실시간 시각화 미포함: \-\-display\_data=false

`--display_data=true`이면 rerun\.io의 멋진 시각화 인터페이스가 실행되지만, `/Users/tommy/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000` 디렉터리에 매 프레임의 이미지가 저장되어 공간을 꽤 차지합니다. 이후에는 `--display_data=false`로 설정해도 됩니다.



HuggingFace 모델 Repo의 모델 추론: \-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## 오렌지 집기 작업을 예로

- 로컬 모델 추론(실시간 시각화 포함)

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- 로컬 모델 추론(실시간 시각화 미포함)

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- HuggingFace 모델 Repo의 모델 추론

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --policy.path=Tommymy/lerobot_my_model_a
```

실행 후 모델을 다운로드합니다

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









