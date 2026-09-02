---
title: ROS Intro Tutorial
description: Juxi Technology ROS tutorial — ROS 1/ROS 2 environment setup, topics/services/launch basics, hands-on with IMU & SO-ARM101
keywords: [ros, ros2, ros1, tutorial, robot operating system]
---

# ROS Intro Tutorial

> For developers new to ROS. Based on Ubuntu 22.04 + ROS 2 Humble, with hands-on examples using Juxi Technology IMU module and SO-ARM101 arm.

## 1. What is ROS?

ROS (Robot Operating System) is the de-facto middleware standard for robotics:

- **Topics**: publish/subscribe, point-to-point comms (e.g., IMU data streams)
- **Services**: request/response (e.g., trigger an action)
- **Launch**: one-command multi-node startup

ROS 2 (Humble) is the current mainstream version with real-time, multi-machine, and security improvements.

## 2. Environment Setup

### Ubuntu 22.04 + ROS 2 Humble

```bash
# Add ROS 2 repository
sudo apt update && sudo apt install -y curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key \
  -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | \
  sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Install
sudo apt update
sudo apt install -y ros-humble-desktop

# Source environment (each new terminal, or add to ~/.bashrc)
source /opt/ros/humble/setup.bash
```

### Verify Installation

```bash
# Terminal 1
ros2 run demo_nodes_cpp talker

# Terminal 2
ros2 run demo_nodes_py listener
```

Seeing `Hello World: N` looping means success.

## 3. Core Concepts

| Concept | Description | Example |
|---------|-------------|---------|
| **Node** | Independent process | IMU node, robot arm node |
| **Topic** | Publish/subscribe data stream | `/imu/data` attitude |
| **Message** | Topic data type | `sensor_msgs/Imu` |
| **Service** | Request/response | Trigger servo reset |
| **Launch file** | Multi-node startup orchestration | `imu_launch.py` |

## 4. Hands-on with Juxi Products

### IMU Module (ROS 2)

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build
source install/setup.bash

ros2 launch icm42670p imu_launch.py

# View data
ros2 topic echo /imu/data
```

- [IMU ROS2 Tutorial](/tutorials/sensors/imu/ros-examples/ros2)
- [IMU ROS1 Tutorial](/tutorials/sensors/imu/ros-examples/ros1)

### KWS Module (RViz2)

- [KWS ROS2 RViz2 Visualization](/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 5. Command Cheatsheet

```bash
ros2 node list                 # List nodes
ros2 topic list                # List topics
ros2 topic echo /topic         # View topic data
ros2 service list              # List services
ros2 launch pkg file.launch.py # Launch
```

## FAQ

**Q: `source /opt/ros/humble/setup.bash` errors?**

**A:** Verify your installed version and path; on Jetson, activate conda first if used.

**Q: Port permission errors?**

**A:** `sudo chmod 666 /dev/ttyACM*`.

**Q: Using Jetson?**

**A:** Watch PyTorch compatibility — see [Jetson PyTorch Compatibility](/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

---

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Report Issues](https://github.com/Juxi-Technology/wiki-documents/issues)
