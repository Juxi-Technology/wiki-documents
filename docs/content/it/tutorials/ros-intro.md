---
title: Tutorial di introduzione a ROS
description: Tutorial ROS Juxi Technology — installazione ROS 2 Humble, basi di topic/servizi/launch
keywords: [ros, ros2, introduzione, robotica]
---

# Tutorial di introduzione a ROS

> Per principianti. Basato su Ubuntu 22.04 + ROS 2 Humble.

## 1. Cos'è ROS?

ROS (Robot Operating System) è il middleware standard della robotica:

- **Topic**: comunicazione publish/subscribe
- **Servizi**: richiesta/risposta
- **Launch**: avvio multi-nodo

## 2. Installazione

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

## 3. Verifica

```bash
# Terminale 1
ros2 run demo_nodes_cpp talker
# Terminale 2
ros2 run demo_nodes_py listener
```

## 4. Pratica con i prodotti Juxi

### Modulo IMU (ROS 2)

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build && source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

## 5. Riferimento rapido

```bash
ros2 node list
ros2 topic list
ros2 topic echo /topic
ros2 launch pkg file.launch.py
```