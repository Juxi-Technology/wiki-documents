---
title: ROS 入門チュートリアル
description: Juxi Technology ROS チュートリアル — ROS 2 Humble 環境構築、トピック/サービス/launch の基礎
keywords: [ros, ros2, 入門, ロボット]
---

# ROS 入門チュートリアル

> ROS を初めて触る開発者向け。Ubuntu 22.04 + ROS 2 Humble ベース。

## 1. ROS とは?

ROS(Robot Operating System)はロボット開発の事実上の標準ミドルウェアです:

- **トピック (Topic)**: パブリッシュ/サブスクライブ通信
- **サービス (Service)**: リクエスト/レスポンス
- **Launch**: 複数ノードを一括起動

## 2. 環境構築

```bash
sudo apt update && sudo apt install -y curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key \
  -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | \
  sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

sudo apt update
sudo apt install -y ros-humble-desktop
source /opt/ros/humble/setup.bash
```

## 3. 動作確認

```bash
# ターミナル 1
ros2 run demo_nodes_cpp talker
# ターミナル 2
ros2 run demo_nodes_py listener
```

## 4. Juxi 製品での実践

### IMU モジュール (ROS 2)

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build && source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

## 5. コマンド早見表

```bash
ros2 node list
ros2 topic list
ros2 topic echo /topic
ros2 launch pkg file.launch.py
```