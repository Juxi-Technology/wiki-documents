---
title: "Browse and Replay the Dataset"
description: "Visualize a recorded dataset in the LeRobot dataset visualizer and replay it on the arm to check the episodes before training."
---

# Browse and Replay the Dataset

## Visualize the entire dataset

https://huggingface\.co/spaces/lerobot/visualize\_dataset

http://io\-ai\.tech/lerobot

https://open\.platform\.io\-ai\.tech

Enter `TommyZihao/lerobot_zihao_dataset_a`, or another dataset

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

Observation: the action and the state are not identical; the action is provided by the leader arm (Leader), while the state is provided by the follower arm (Follower)

## Visualize a specific episode

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

Drag the timeline to view the camera feed and servo positions at any moment

## Replay the follower arm motion of a specific episode

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

You will hear the voice `Replaying episode`, then the follower arm moves and replays the motion of the specified episode



