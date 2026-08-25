---
title: Tutoriel d'introduction à ROS
description: Tutoriel ROS Juxi Technology — installation ROS 2 Humble, bases topics/services/launch
keywords: [ros, ros2, introduction, robotique]
---

# Tutoriel d'introduction à ROS

> Pour les débutants. Basé sur Ubuntu 22.04 + ROS 2 Humble.

## 1. Qu'est-ce que ROS ?

ROS (Robot Operating System) est le middleware standard de la robotique :

- **Topics** : communication publish/subscribe
- **Services** : requête/réponse
- **Launch** : démarrage multi-nœuds

## 2. Installation

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

## 3. Vérification

```bash
# Terminal 1
ros2 run demo_nodes_cpp talker
# Terminal 2
ros2 run demo_nodes_py listener
```

## 4. Pratique avec les produits Juxi

### Module IMU (ROS 2)

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build && source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

## 5. Référence rapide

```bash
ros2 node list
ros2 topic list
ros2 topic echo /topic
ros2 launch pkg file.launch.py
```