---
title: ROS-Einführung
description: Juxi Technology ROS-Tutorial — ROS 2 Humble Setup, Topics/Services/Launch-Grundlagen
keywords: [ros, ros2, einführung, robotik]
---

# ROS-Einführung

> Für Einsteiger. Basis: Ubuntu 22.04 + ROS 2 Humble.

## 1. Was ist ROS?

ROS (Robot Operating System) ist der De-facto-Standard für Robotik:

- **Topics**: Publish/Subscribe-Kommunikation
- **Services**: Request/Response
- **Launch**: mehrere Nodes starten

## 2. Umgebung einrichten

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

## 3. Verifikation

```bash
# Terminal 1
ros2 run demo_nodes_cpp talker
# Terminal 2
ros2 run demo_nodes_py listener
```

## 4. Praxis mit Juxi-Produkten

### IMU-Modul (ROS 2)

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build && source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

## 5. Befehls-Übersicht

```bash
ros2 node list
ros2 topic list
ros2 topic echo /topic
ros2 launch pkg file.launch.py
```