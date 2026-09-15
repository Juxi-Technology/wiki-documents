---
title: ROS1 응용
description: "Ubuntu 20.04의 ROS1 noetic 환경에서 IMU 자세 센서 사용 — 패키지 빌드와 노드 실행, RViz 시각화 방법."
---

# ROS1 응용

> **[스토어에서 구매](https://www.juxitech.com/ko/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**시스템 구성: ubuntu20.04**

**ROS1 버전: noetic**

### ROS1 환경 설정

1. **ROS1 설치 소스 설정**

```PowerShell
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ros/ubuntu/ `lsb_release -cs` main" > /etc/apt/sources.list.d/ros-latest.list'
```

2. **Key 설정**

```PowerShell
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

```Plain Text
sudo apt update
```

3. **ROS1 설치 (공식 다운로드)**

```PowerShell
sudo apt install ros-noetic-desktop-full
```

프록시 가속 다운로드로 ROS1 설치
wget http://fishros.com/install -O fishros && . fishros

4. **환경 변수 설정**

```Plain Text
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
```

```PowerShell
source ~/.bashrc
```

### 가상 머신에 디바이스 연결

1. **디바이스 확인**

```PowerShell
ll /dev/ttyUSB*
```

2. **포트 매핑 생성**

```PowerShell
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
```

3. **매핑 파일 내용 작성**

```PowerShell
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
```

4. **저장 후 종료, 명령 실행으로 규칙 적용**

```PowerShell
sudo udevadm trigger
```

```Plain Text
sudo service udev reload
```

```Plain Text
sudo service udev restart
```

5. **검증**

```PowerShell
ll /dev/imu-serial
```

```Bash
sudo usermod -aG dialout ash
```

### 준비된 압축 패키지 가져오기

1. **飞书 같은 레벨 디렉터리에 있음**[IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb)

2. **압축 해제 후 파일 전송 소프트웨어로 가상 머신에 전송**

3. **IMU_Library 라이브러리 설치**

```PowerShell
cd IMU_ROS1
# 下载解压IMU_ROS1压缩文件后，进入到IMU_Library目录下，运行以下指令
cd IMU_Library
# 安装库及其依赖
pip install -e .
# 或使用setup.py安装
python setup.py install
```

### python 관련 라이브러리 설치

```PowerShell
sudo pip3 install pyserial
sudo pip3 install smbus2
```

**렌더링 문제가 발생하면 다음 명령을 실행하세요**

```PowerShell
sudo apt-get install ros-noetic-imu-filter-madgwick
sudo apt-get install ros-noetic-rviz-imu-plugin
```

### ROS1 프로젝트 빌드

1. **/home 디렉터리에서 새 터미널 열고 ros1 워크스페이스 생성**

```PowerShell
mkdir imu_ros1
cd imu_ros1
mkdir src
cd src/
catkin_init_workspace
```

2. **전송된 IMU_ROS1 폴더를 ~/imu_ros1/src/ 디렉터리로 복사**

```PowerShell
# 复制 IMU_ROS1 文件夹到新建的 src 目录下
cp -r ~/IMU_ROS1 ~/imu_ros1/src
cd ~/imu_ros1
catkin_make
```

3. **작업 디렉터리 ~/imu_ros1을 환경 변수에 추가**

```PowerShell
# 编辑 ~/.bashrc
sudo gedit ~/.bashrc
# 把下面命令写到末尾
source ~/imu_ros1/devel/setup.bash
source ~/.bashrc
```

### ROS1 노드 시작

1. **터미널을 열고 roscore 입력으로 노드 시작**

```PowerShell
# 启动roscore
roscore
# 新开终端，设置环境，启动节点
source ~/imu_ros1/devel/setup.bash
```

2. **Python 스크립트에 실행 권한 부여 (중요)**

스크립트가 있는 `scripts` 디렉터리로 이동하여 `chmod +x` 명령으로 실행 권한을 부여합니다 (`+x`는 실행 권한 추가):

```PowerShell
# 进入imu_driver.py所在目录（按你的实际路径）
cd ~/imu_ros1/src/IMU_ROS1/scripts/
# 赋予可执行权限（仅需执行1次，永久生效）
chmod +x imu_driver.py
chmod +x mag_visualizer.py
```

imu_ros1 폴더로 돌아가 imu_driver.py 실행
```Plain Text
cd ~/imu_ros1
```

```Plain Text
rosrun IMU_ROS1 imu_driver.py
```

### IMU 데이터 출력

1. **새 터미널을 열고 imu 토픽 확인**

```PowerShell
# 查看当前发布的所有话题
rostopic list
```

2. **토픽 데이터 출력**

```PowerShell
# 打印IMU原始数据
rostopic echo /imu/data_raw
# 打印磁力计数据
rostopic echo /imu/mag
```

### RViz 시각화

1. **명령 실행으로 rviz 시작**

```PowerShell
roslaunch IMU_ROS1 imu_display.launch
```

### 자주 묻는 질문

1. 노드 시작 시 실패하면 다음 명령을 시도하세요

```PowerShell
# 在~/imu_ros1目录下运行
source devel/setup.bash
# 端口号问题
sudo chmod 666 /dev/imu-serial
```

2. RVIZ 시각화에서 3축 표시가 매우 작으면 Enable axes를 다시 체크하세요
