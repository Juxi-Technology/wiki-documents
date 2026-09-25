---
title: "示教採集數據集-握手200"
description: "以握手任務為例：在 Hugging Face 建立 Dataset Repo，再用 lerobot-record 在 7-DOF 機械臂上錄製 200 組示教數據，並確認數據集保存目錄。"
---

# 示教採集數據集\-握手200

## 在HuggingFace上創建Dataset Repo

https://huggingface\.co/new\-dataset

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## 刪除之前已經有的同名數據集（如果有）

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Shake200數據集採集

一個攝像頭，採集數據集\-Mac電腦

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

## 採集中

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

鍵盤方向鍵操作：
→（右箭頭）提前終止當前episode；進入下一個episode。
←（左箭頭）取消當前episode；重新錄製。
ESC，立即停止，編碼視頻，並上傳數據集。

## 採集完畢，數據集保存目錄

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```



