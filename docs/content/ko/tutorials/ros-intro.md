---
title: ROS 입문 튜토리얼
description: Juxi Technology ROS 튜토리얼 — ROS 2 Humble 환경 구축, 토픽/서비스/launch 기초
keywords: [ros, ros2, 입문, 로봇]
---

# ROS 입문 튜토리얼

> ROS를 처음 접하는 개발자용. Ubuntu 22.04 + ROS 2 Humble 기준이며, Juxi Technology IMU 모듈과 SO-ARM101 암을 사용한 실습을 포함합니다.

## 1. ROS란?

ROS(Robot Operating System)는 로봇 개발의 사실상 표준 미들웨어입니다:

- **토픽 (Topic)**: 발행/구독 방식의 지점 간 통신(예: IMU 데이터 스트림)
- **서비스 (Service)**: 요청/응답(예: 동작 트리거)
- **Launch**: 한 번의 명령으로 여러 노드 일괄 실행

ROS 2(Humble)은 실시간성, 다중 머신, 보안 개선이 적용된 현재 주류 버전입니다.

## 2. 환경 구축

### Ubuntu 22.04 + ROS 2 Humble

```bash
# ROS 2 저장소 추가
sudo apt update && sudo apt install -y curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key \
  -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | \
  sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# 설치
sudo apt update
sudo apt install -y ros-humble-desktop

# 환경 변수 로드(새 터미널마다, 또는 ~/.bashrc에 추가)
source /opt/ros/humble/setup.bash
```

### 설치 확인

```bash
# 터미널 1
ros2 run demo_nodes_cpp talker

# 터미널 2
ros2 run demo_nodes_py listener
```

`Hello World: N`이 반복 출력되면 성공입니다.

## 3. 핵심 개념

| 개념 | 설명 | 예시 |
|------|------|------|
| **노드 (Node)** | 독립 실행 프로세스 | IMU 노드, 로봇 암 노드 |
| **토픽 (Topic)** | 발행/구독 데이터 스트림 | `/imu/data` 자세 데이터 |
| **메시지 (Message)** | 토픽 데이터 타입 | `sensor_msgs/Imu` |
| **서비스 (Service)** | 요청/응답 | 서보 리셋 트리거 |
| **Launch 파일** | 다중 노드 실행 오케스트레이션 | `imu_launch.py` |

## 4. Juxi 제품 실습

### IMU 모듈 (ROS 2)

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build
source install/setup.bash

ros2 launch icm42670p imu_launch.py

# 데이터 확인
ros2 topic echo /imu/data
```

- [IMU ROS2 튜토리얼](/ko/tutorials/sensors/imu/ros-examples/ros2)
- [IMU ROS1 튜토리얼](/ko/tutorials/sensors/imu/ros-examples/ros1)

### KWS 모듈 (RViz2)

- [KWS ROS2 RViz2 시각화](/ko/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 5. 명령어 빠른 참조

```bash
ros2 node list                 # 노드 목록
ros2 topic list                # 토픽 목록
ros2 topic echo /topic         # 토픽 데이터 확인
ros2 service list              # 서비스 목록
ros2 launch pkg file.launch.py # 실행
```

## FAQ

**Q: `source /opt/ros/humble/setup.bash` 오류가 발생하나요?**

**A:** 설치된 버전과 경로를 확인하세요. Jetson에서는 conda를 사용한다면 먼저 활성화하세요.

**Q: 포트 권한 오류가 발생하나요?**

**A:** `sudo chmod 666 /dev/ttyACM*`를 실행하세요.

**Q: Jetson을 사용하나요?**

**A:** PyTorch 호환성을 확인하세요 — [Jetson PyTorch 호환성](/ko/tutorials/learning-resources/jetson-orin-pytorch-compatibility)을 참고하세요.

---

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 웹사이트: [www.juxitech.com](https://www.juxitech.com)
- 💬 [이슈 제출](https://github.com/Juxi-Technology/wiki-documents/issues)
