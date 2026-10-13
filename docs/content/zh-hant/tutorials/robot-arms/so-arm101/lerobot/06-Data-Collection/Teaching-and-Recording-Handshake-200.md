---
title: "第六步:示教採集資料集-握手200"
description: "完整採集範例:先在 Hugging Face 建立 Dataset 倉庫,再用 lerobot-record 以單鏡頭錄製 200 條握手 episode,並附鍵盤操作與儲存目錄。"
---

# 第六步:示教採集資料集-握手200

## 在HuggingFace上建立Dataset Repo

https://huggingface.co/new-dataset

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-01.png)

## 刪除之前已經有的同名資料集（如果有）

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Shake200資料集採集

一個攝影機，採集資料集-Mac電腦

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

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-03.png)

鍵盤方向鍵操作：
→（右箭頭）提前終止目前episode；進入下一個episode。
←（左箭頭）取消目前episode；重新錄製。
ESC，立即停止，編碼影片，並上傳資料集。

## 採集完畢，資料集儲存目錄

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

<RelatedProducts slugs="so-arm101" />
