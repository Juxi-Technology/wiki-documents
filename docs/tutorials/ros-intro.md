---
title: ROS 入门教程
description: 钜犀科技 ROS 入门教程——ROS 1/ROS 2 环境安装、话题/服务/launch 基础概念,结合 IMU 与 SO-ARM101 机器人实践
keywords: [ros, ros2, ros1, 入门, 机器人操作系统]
---

# ROS 入门教程

> 面向第一次接触 ROS 的开发者。基于 Ubuntu 22.04 + ROS 2 Humble,结合钜犀科技 IMU 模块与 SO-ARM101 机械臂实践。

## 1. 什么是 ROS?

ROS(Robot Operating System)是机器人开发的事实标准中间件,提供:

- **话题 (Topic)**:发布/订阅机制,点对点通信(如 IMU 数据流)
- **服务 (Service)**:请求/响应机制(如触发一次动作)
- **Launch**:多节点一键启动

ROS 2(Humble)是当前主流版本,支持实时、多机与安全增强。

## 2. 环境安装

### Ubuntu 22.04 + ROS 2 Humble

```bash
# 添加 ROS 2 源
sudo apt update && sudo apt install -y curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key \
  -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | \
  sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# 安装
sudo apt update
sudo apt install -y ros-humble-desktop

# 配置环境(每次新终端执行,或写入 ~/.bashrc)
source /opt/ros/humble/setup.bash
```

### 验证安装

```bash
# 终端 1
ros2 run demo_nodes_cpp talker

# 终端 2
ros2 run demo_nodes_py listener
```

看到 `Hello World: N` 循环即安装成功。

## 3. 核心概念速览

| 概念 | 说明 | 示例 |
|------|------|------|
| **节点 (Node)** | 独立进程,完成特定任务 | IMU 节点、机械臂节点 |
| **话题 (Topic)** | 发布/订阅,数据流 | `/imu/data` 姿态数据 |
| **消息 (Message)** | 话题数据类型 | `sensor_msgs/Imu` |
| **服务 (Service)** | 请求/响应 | 触发舵机复位 |
| **Launch 文件** | 多节点启动编排 | `imu_launch.py` |

## 4. 结合钜犀科技产品实践

### IMU 模块(ROS 2)

```bash
# 安装驱动(参考 IMU 官方仓库)
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build
source install/setup.bash

# 启动
ros2 launch icm42670p imu_launch.py

# 查看数据
ros2 topic echo /imu/data
```

- [IMU ROS2 详细教程](/tutorials/sensors/imu/ros-examples/ros2)
- [IMU ROS1 详细教程](/tutorials/sensors/imu/ros-examples/ros1)

### SO-ARM101 机械臂(RViz2)

```bash
# 查看 KWS 模块 ROS2 RViz2 可视化示例
# (详细见 KWS 系列教程)
```

- [KWS ROS2 RViz2 可视化](/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 5. 常用命令速查

```bash
ros2 node list              # 列出节点
ros2 topic list             # 列出话题
ros2 topic echo /topic      # 查看话题数据
ros2 service list           # 列出服务
ros2 launch pkg file.launch.py  # 启动 launch
```

## 常见问题

**Q: `source /opt/ros/humble/setup.bash` 报错?**
确认安装版本与实际路径;Jetson 设备可能需要 `source /opt/ros/humble/setup.bash` 前先激活 conda。

**Q: 端口权限报错?**
串口设备授权:`sudo chmod 666 /dev/ttyACM*`。

**Q: 想在 Jetson 上用?**
Jetson 平台注意 PyTorch 版本兼容性,参考 [Jetson PyTorch 兼容性](/tutorials/learning-resources/jetson-orin-pytorch-compatibility)。

---

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [问题反馈](https://github.com/Juxi-Technology/wiki-documents/issues)
