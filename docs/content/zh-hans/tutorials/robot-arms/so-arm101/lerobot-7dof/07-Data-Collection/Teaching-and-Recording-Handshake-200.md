---
title: "示教采集数据集-握手200"
description: "完整采集示例：先在 Hugging Face 新建 Dataset 仓库，再用 lerobot-record 以单摄像头录 200 条握手 episode，并附键位操作与保存目录。"
---

# 示教采集数据集\-握手200

## 在HuggingFace上创建Dataset Repo

https://huggingface\.co/new\-dataset

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## 删除之前已经有的同名数据集（如果有）

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Shake200数据集采集

一个摄像头，采集数据集\-Mac电脑

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

## 采集中

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

键盘方向键操作：
→（右箭头）提前终止当前episode；进入下一个episode。
←（左箭头）取消当前episode；重新录制。
ESC，立即停止，编码视频，并上传数据集。

## 采集完毕，数据集保存目录

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```



