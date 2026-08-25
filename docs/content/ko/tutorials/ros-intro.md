---
title: ROS 입문 튜토리얼
description: Juxi Technology ROS 튜토리얼 — ROS 2 Humble 환경 구축, 토픽/서비스/launch 기초
keywords: [ros, ros2, 입문, 로봇]
---

# ROS 입문 튜토리얼

> ROS를 처음 접하는 개발자용. Ubuntu 22.04 + ROS 2 Humble 기준.

## 1. ROS란?

ROS(Robot Operating System)는 로봇 개발의 사실상 표준 미들웨어입니다:

- **토픽 (Topic)**: 발행/구독 통신
- **서비스 (Service)**: 요청/응답
- **Launch**: 여러 노드 일괄 실행

## 2. 환경 구축

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

## 3. 동작 확인

```bash
# 터미널 1
ros2 run demo_nodes_cpp talker
# 터미널 2
ros2 run demo_nodes_py listener
```

## 4. Juxi 제품 실습

### IMU 모듈 (ROS 2)

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build && source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

## 5. 명령어 빠른 참조

```bash
ros2 node list
ros2 topic list
ros2 topic echo /topic
ros2 launch pkg file.launch.py
```