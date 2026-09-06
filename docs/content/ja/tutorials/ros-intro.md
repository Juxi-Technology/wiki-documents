---
title: ROS 入門チュートリアル
description: Juxi Technology ROS チュートリアル — ROS 2 Humble 環境構築、トピック/サービス/launch の基礎
keywords: [ros, ros2, 入門, ロボット]
---

# ROS 入門チュートリアル

> ROS を初めて触る開発者向け。Ubuntu 22.04 + ROS 2 Humble ベースで、Juxi Technology の IMU モジュールと SO-ARM101 アームを使ったハンズオン例を交えて解説します。

## 1. ROS とは?

ROS(Robot Operating System)はロボット開発の事実上の標準ミドルウェアです:

- **トピック (Topic)**: パブリッシュ/サブスクライブ通信(例: IMU データストリーム)
- **サービス (Service)**: リクエスト/レスポンス(例: アクションのトリガー)
- **Launch**: 複数ノードを一括起動

ROS 2 (Humble) は、リアルタイム性・マルチマシン対応・セキュリティの改善を備えた現在の主流バージョンです。

## 2. 環境構築

### Ubuntu 22.04 + ROS 2 Humble

```bash
# ROS 2 リポジトリを追加
sudo apt update && sudo apt install -y curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key \
  -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | \
  sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# インストール
sudo apt update
sudo apt install -y ros-humble-desktop

# 環境を読み込む(新しいターミナルごと、または ~/.bashrc に追記)
source /opt/ros/humble/setup.bash
```

### 動作確認

```bash
# ターミナル 1
ros2 run demo_nodes_cpp talker

# ターミナル 2
ros2 run demo_nodes_py listener
```

`Hello World: N` が繰り返し表示されれば成功です。

## 3. コアコンセプト

| 概念 | 説明 | 例 |
|------|------|-----|
| **ノード** | 独立したプロセス | IMU ノード、ロボットアームノード |
| **トピック** | パブリッシュ/サブスクライブのデータストリーム | `/imu/data` 姿勢 |
| **メッセージ** | トピックのデータ型 | `sensor_msgs/Imu` |
| **サービス** | リクエスト/レスポンス | サーボリセットのトリガー |
| **Launch ファイル** | 複数ノード起動のオーケストレーション | `imu_launch.py` |

## 4. Juxi 製品での実践

### IMU モジュール (ROS 2)

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build
source install/setup.bash

ros2 launch icm42670p imu_launch.py

# データを表示
ros2 topic echo /imu/data
```

- [IMU ROS2 チュートリアル](/ja/tutorials/sensors/imu/ros-examples/ros2)
- [IMU ROS1 チュートリアル](/ja/tutorials/sensors/imu/ros-examples/ros1)

### KWS モジュール (RViz2)

- [KWS ROS2 RViz2 可視化](/ja/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 5. コマンド早見表

```bash
ros2 node list                 # ノード一覧
ros2 topic list                # トピック一覧
ros2 topic echo /topic         # トピックデータを表示
ros2 service list              # サービス一覧
ros2 launch pkg file.launch.py # 起動
```

## FAQ

**Q: `source /opt/ros/humble/setup.bash` でエラーが出る?**

**A:** インストール済みのバージョンとパスを確認してください。Jetson で conda を使用している場合は、先に conda を有効化してください。

**Q: ポートの権限エラー?**

**A:** `sudo chmod 666 /dev/ttyACM*` を実行します。

**Q: Jetson を使用している場合?**

**A:** PyTorch の互換性に注意してください — [Jetson での PyTorch 非互換問題](/ja/tutorials/learning-resources/jetson-orin-pytorch-compatibility) を参照してください。

---

## サポート

- 📧 Email: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
- 💬 [問題を報告する](https://github.com/Juxi-Technology/wiki-documents/issues)
