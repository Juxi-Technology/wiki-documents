---
title: "ROS 入門"
description: 鉅犀科技 ROS 入門教程——ROS 1/ROS 2 環境安裝、話題/服務/launch 基礎概念,結合 IMU 與 SO-ARM101 機器人實踐
keywords: [ros, ros2, ros1, 入門, 機器人操作系統]
---

# ROS 入門

> 面向第一次接觸 ROS 的開發者。基於 Ubuntu 22.04 + ROS 2 Humble,結合鉅犀科技 IMU 模組與 SO-ARM101 機械臂實踐。

## 1. 什麼是 ROS?

ROS(Robot Operating System)是機器人開發的事實標準中間件,提供:

- **話題 (Topic)**:發布/訂閱機制,點對點通信(如 IMU 數據流)
- **服務 (Service)**:請求/響應機制(如觸發一次動作)
- **Launch**:多節點一鍵啟動

ROS 2(Humble)是當前主流版本,支持實時、多機與安全增強。

## 2. 環境安裝

### Ubuntu 22.04 + ROS 2 Humble

```bash
# 添加 ROS 2 源
sudo apt update && sudo apt install -y curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key \
  -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | \
  sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# 安裝
sudo apt update
sudo apt install -y ros-humble-desktop

# 配置環境(每次新終端執行,或寫入 ~/.bashrc)
source /opt/ros/humble/setup.bash
```

### 驗證安裝

```bash
# 終端 1
ros2 run demo_nodes_cpp talker

# 終端 2
ros2 run demo_nodes_py listener
```

看到 `Hello World: N` 循環即安裝成功。

## 3. 核心概念速覽

| 概念 | 說明 | 示例 |
|------|------|------|
| **節點 (Node)** | 獨立進程,完成特定任務 | IMU 節點、機械臂節點 |
| **話題 (Topic)** | 發布/訂閱,數據流 | `/imu/data` 姿態數據 |
| **消息 (Message)** | 話題數據類型 | `sensor_msgs/Imu` |
| **服務 (Service)** | 請求/響應 | 觸發舵機復位 |
| **Launch 文件** | 多節點啟動編排 | `imu_launch.py` |

## 4. 結合鉅犀科技產品實踐

### IMU 模組(ROS 2)

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build
source install/setup.bash

# 啟動
ros2 launch icm42670p imu_launch.py

# 查看數據
ros2 topic echo /imu/data
```

- [IMU ROS2 詳細教程](/zh-hant/tutorials/sensors/imu/ros-examples/ros2)
- [IMU ROS1 詳細教程](/zh-hant/tutorials/sensors/imu/ros-examples/ros1)

### KWS 模組(RViz2)

- [KWS ROS2 RViz2 可視化](/zh-hant/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 5. 常用命令速查

```bash
ros2 node list              # 列出節點
ros2 topic list             # 列出話題
ros2 topic echo /topic      # 查看話題數據
ros2 service list           # 列出服務
ros2 launch pkg file.launch.py  # 啟動 launch
```

## 常見問題

**Q: `source /opt/ros/humble/setup.bash` 報錯?**

**A:** 確認安裝版本與實際路徑;Jetson 設備可能需要先激活 conda。

**Q: 端口權限報錯?**

**A:** 串口設備授權:`sudo chmod 666 /dev/ttyACM*`。

**Q: 想在 Jetson 上用?**

**A:** Jetson 平台注意 PyTorch 版本兼容性,參考 [Jetson PyTorch 兼容性](/zh-hant/tutorials/learning-resources/jetson-orin-pytorch-compatibility)。

---

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [問題反饋](https://github.com/Juxi-Technology/wiki-documents/issues)
