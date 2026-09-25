---
title: "教示によるデータセット収集-握手200"
description: "Hugging Faceでデータセットリポジトリを作成し、7軸アームで握手200エピソードをlerobot-recordで収録する一連の実例を紹介します。"
---

# 教示によるデータセット収集\-握手200

## HuggingFace上でDataset Repoを作成する

https://huggingface\.co/new\-dataset

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## 以前から存在する同名のデータセットを削除する（ある場合）

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Shake200データセットの収集

カメラ1台でデータセットを収集する\-Macコンピューター

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

## 収集中

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

キーボードの方向キー操作：
→（右矢印）現在のepisodeを途中で終了し、次のepisodeに進みます。
←（左矢印）現在のepisodeをキャンセルし、録り直します。
ESCで即座に停止し、動画をエンコードして、データセットをアップロードします。

## 収集完了後、データセットの保存ディレクトリ

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```



