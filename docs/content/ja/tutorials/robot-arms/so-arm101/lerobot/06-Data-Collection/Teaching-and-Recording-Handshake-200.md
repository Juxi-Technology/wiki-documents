---
title: "ステップ6:教示データ収集-Handshake 200"
description: "完全な収集例:まず Hugging Face で Dataset リポジトリを作成し、lerobot-record で単一カメラにより握手200エピソードを収録。キー操作と保存先も解説。"
---

# ステップ6:教示データ収集-Handshake 200

## HuggingFace にデータセットリポジトリを作成する

https://huggingface.co/new-dataset

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-01.png)

## 同名の既存データセットがある場合は削除する

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Shake200 データセットの収集

カメラ 1 台でデータセットを収集する - Mac コンピューター

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

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-03.png)

キーボードの矢印キー操作：
→（右矢印）現在のエピソードを途中で終了し、次のエピソードへ進みます。
←（左矢印）現在のエピソードをキャンセルし、録り直します。
ESC、即座に停止し、動画をエンコードしてデータセットをアップロードします。

## 収集完了 — データセットの保存ディレクトリ

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

<RelatedProducts slugs="so-arm101" />
