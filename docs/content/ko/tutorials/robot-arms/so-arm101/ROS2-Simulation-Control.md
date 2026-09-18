---
title: "ROS2 시뮬레이션 제어"
description: "ROS 2 워크스페이스로 로봇 설명과 하드웨어 드라이버, Gazebo 시뮬레이션, MoveIt 2 모션 플래닝을 다루는 시뮬레이션 자료 페이지입니다."
---

# ROS2 시뮬레이션 제어

[SO-ARM101_ROS2.zip](/downloads/SO-ARM101_ROS2.zip)

SO-ARM101 6자유도 로봇암의 완전한 ROS 2 워크스페이스로, 로봇 설명, 내장 하드웨어 드라이버, Gazebo 시뮬레이션 및 MoveIt 2 모션 플래닝을 다룹니다.

SO-ARM101은 [TheRobotStudio](https://www.therobotstudio.com/)와 [LeRobot](https://huggingface.co/lerobot) 커뮤니티가 공동 설계한 2세대 오픈소스 팔로워 암으로, 6개의 STS3215 서보, 서보 드라이버 보드 및 3D 프린팅 PLA+ 부품을 사용합니다.

**주의:****로봇암은 중심 위치 캘리브레이션이 필요하며, 모든 관절이 회전 가능 범위의 중간 위치에 있을 때 중심 위치 캘리브레이션을 진행합니다**

## 패키지 구조

대상 플랫폼: **ROS 2 Humble / Jazzy**.

---

## ROS2 환경 준비

이 프로젝트를 컴파일하기 전에 시스템에 ROS 2와 관련 구성 요소가 설치되어 있는지 확인합니다.

### 시스템 요구 사항

- Ubuntu 22.04(권장) 또는 24.04

- 최소 4 GB 메모리

- 실제 하드웨어 모드에는 USB 시리얼 포트가 필요합니다

### 0.1  ROS 2 Humble 설치

```Bash
# locale 설정
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# ROS 2 소프트웨어 소스 추가
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# ROS 2 Humble Desktop 설치
sudo apt update
sudo apt install ros-humble-desktop
```

### 0.2  컴파일 도구와 의존성 설치

```Bash
# colcon 컴파일 도구
sudo apt install python3-colcon-common-extensions

# MoveIt 2
sudo apt install ros-humble-moveit

# ros2_control
sudo apt install ros-humble-ros2-control \
                 ros-humble-ros2-controllers \
                 ros-humble-controller-manager \
                 ros-humble-joint-state-publisher-gui
```

### 0.3  환경 변수 설정

```Bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### 0.4  시리얼 포트 권한 설정(실제 하드웨어 필수)

**영구 설정(권장)**:

```Bash
sudo usermod -a -G dialout $USER
# 로그아웃 후 다시 로그인하면 적용됨
```

**임시 설정(재부팅할 때마다 다시 실행해야 함)**:

```Bash
sudo chmod 666 /dev/ttyACM0
```

## 워크스페이스 환경 설치

```Markdown
# 1단계  워크스페이스 생성
mkdir -p ~/so101_ws/src
cd ~/so101_ws/src

# 2단계  소스 코드 넣기
cp -r /path/to/SO-ARM101_ROS2 ./

# 3단계  시스템 의존성 설치
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y

# 4단계  모든 패키지 컴파일
colcon build --symlink-install

# 5단계  환경 로드  ← 새 터미널마다 실행해야 함
source install/setup.bash
```

**실제 하드웨어 설명** — `so_arm_hardware` 패키지가 내장되어 있습니다. 추가 드라이버를 설치할 필요 없이,
시리얼 포트를 통해 SCS 프로토콜로 STS3215 서보와 직접 통신합니다.

## 시각화 검증

여기서부터 시작하는 것이 가장 간단합니다——컨트롤러도 필요 없고, 하드웨어도 필요 없습니다.

```Bash
#  터미널 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description view_description.launch.py rviz:=true
```

RViz가 전체 로봇 모델을 표시하며, 슬라이더를 드래그하여 각 관절의 운동이 올바른지 검증할 수 있습니다.

---

## 컨트롤러 테스트(가상 하드웨어 / Mock 모드)

여전히 실제 로봇은 필요 없으며, 전부 메모리에서 실행됩니다.

```Bash
#  터미널 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py
```

로그가 나타나면 준비 완료입니다:

```Bash
joint_state_broadcaster      → active
joint_trajectory_controller  → active
```

**주의**: 시뮬레이션 모드에서는 두 개의 컨트롤러만 시작합니다(`joint_state_broadcaster` 및
`joint_trajectory_controller`). `gripper_controller`는 제거되었으며, 그리퍼는
`joint_trajectory_controller`가 6개 관절 전체를 통합 제어합니다.

### 컨트롤러 역할

## MoveIt 모션 플래닝(Mock 하드웨어)

**터미널 하나만 필요** — MoveIt이 내부적으로 컨트롤러 스택을 자동으로 시작합니다.

```Bash
#  터미널 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py
```

RViz 창이 열리면:

1. **MotionPlanning** 패널에서 **Planning Group → manipulator**

2. **Start State → ****`<current>`**, **Goal State → extended**

3. **Plan**과 **Execute**를 차례로 클릭합니다

사용 가능한 사전 설정 자세: `open`, `zero`, `extended`, `rest`.

### 4.1  MoveIt 인터페이스 상세

RViz를 시작하면 왼쪽에 **MotionPlanning** 패널이 표시되며, 다음과 같은 주요 탭이 포함됩니다:

#### Planning 탭

#### 플래닝 파라미터

> **최초 테스트 권장 사항**: Velocity와 Acceleration을 0.3으로 설정하여 운동 속도를 낮춰 안전을 확보합니다.
> 
> 

#### Scene Objects 탭

- 충돌 감지용 장애물(Box / Sphere / Cylinder) 추가

- 씬 가져오기 / 내보내기

- MoveIt이 자동으로 장애물을 회피하여 플래닝합니다

#### Stored States 탭

- 자주 사용하는 로봇암 자세 저장

- 기본 자세: `open`, `zero`, `extended`, `rest`

### 4.2  기본 조작 흐름

#### 방식 A: 인터랙티브 드래그(권장)

1. 3D 뷰에서 로봇암 끝단의 **인터랙티브 마커**(컬러 화살표와 고리)를 찾습니다

2. 화살표를 드래그하여 끝단 위치를 이동하고, 고리를 드래그하여 방향을 회전합니다

3. 시스템이 자동으로 IK를 계산하고 관절 각도를 실시간으로 갱신합니다

4. **Plan**을 클릭하여 플래닝 궤적(주황색)을 확인합니다

5. 확인 후 **Execute**를 클릭하여 실행합니다

> 드래그할 때 버벅거린다면, 먼저 `rest` 사전 설정 자세에서 출발한 후 드래그하는 것을 권장합니다.
> 
> 

#### 방식 B: 사전 설정 자세

1. **Query Goal State** 드롭다운 메뉴 → `open` / `extended` / `rest` 등 선택

2. **Update** 클릭

3. **Plan** 클릭

4. **Execute** 클릭

#### 방식 C: 관절 각도 수동 설정

1. **Query Goal State** → **Joints** 탭

2. 각 관절 슬라이더를 드래그하여 목표 각도를 설정합니다

3. 관절 범위 참고:

1. **Update** 클릭

2. **Plan** 클릭

3. **Execute** 클릭

#### 방식 D: 무작위 유효 목표

**Random Valid** 버튼을 클릭하면 도달 가능한 무작위 자세가 자동 생성되며, 이후 Plan → Execute합니다.

### 4.3  안전 주의 사항

1. **최초 사용 시 속도 저하**: Velocity / Acceleration을 0.1–0.3으로 설정

2. **비상 정지**: 언제든지 Ctrl+C로 프로그램을 종료하거나 전원을 차단합니다

3. **관절 리밋**: MoveIt은 `joint_limits.yaml` 범위를 벗어난 플래닝을 하지 않지만, 설정이 올바른지 확인해야 합니다

4. **실제 하드웨어**: 실행 전 로봇암 주변에 충분한 공간이 있는지 확인합니다

### MoveIt 설정 개요

---

## Gazebo 시뮬레이션

Gazebo 시뮬레이션은 **4개의 터미널을 동시에 실행**해야 합니다. 반드시 순서대로 실행하세요.

### 5.1  Gazebo 시뮬레이션 시작  (터미널 1)

```Bash
#  터미널 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py
```

Gazebo 창이 나타날 때까지 기다리면, 로봇이 공중에 잠시 머문 후 착지합니다.

### 5.2  궤적 컨트롤러 로드  (터미널 2)

Gazebo는 기본적으로 `forward_position_controller`만 활성화하므로, 수동으로
`joint_trajectory_controller`로 전환해야 합니다:

```Markdown
#  터미널 2
source ~/so101_ws/install/setup.bash

# 단계 A — forward_position_controller 끄기
ros2 control set_controller_state forward_position_controller inactive

# 단계 B — spawner로 joint_trajectory_controller 로드 및 활성화
ros2 run controller_manager spawner joint_trajectory_controller

# 단계 C — 검증
ros2 control list_controllers
```

예상 출력:

```Bash
forward_position_controller  inactive
joint_state_broadcaster      active
joint_trajectory_controller  active
```

⚠️ 먼저 `ros2 control load_controller`를 사용하지 마세요! 컨트롤러를
`unconfigured` 상태로 만들어 spawner가 활성화할 수 없게 됩니다. 이미 실행했다면 먼저
`unload_controller` 후 다시 진행하세요.

### 5.3  move_group 시작  (터미널 3)

```Bash
#  터미널 3
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py use_sim_time:=True
```

### 5.4  RViz 시작  (터미널 4)

```Bash
#  터미널 4
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

RViz 준비가 완료되면:

1. **Planning Group → manipulator**

2. **Goal State → open**(또는 `extended`, `rest`)

3. **Plan**과 **Execute**를 차례로 클릭합니다

Gazebo의 암 관절이 따라 움직입니다.

**주의**: `gz_ros2_control` Humble 버전의 PID 게인 제한으로 인해
Gazebo에서 그리퍼가 물리적으로 벌어지지 않을 수 있습니다(실행 로그에는 여전히 성공으로 표시됩니다).
Mock 모드와 실제 하드웨어에는 이 문제가 없습니다.

### 5.5  헤드리스 모드(GUI 없음)

```Bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py \
  gazebo_gui:=false \
  launch_rviz:=false
```

### 5.6  문제 해결: 로드가 반복적으로 실패할 때

spawner가 계속 `Failed to activate controller`를 보고하면 다음 단계로 완전히 리셋합니다:

```Bash
# 1. 멈춘 컨트롤러 언로드
ros2 control unload_controller joint_trajectory_controller

# 2. forward_position_controller 끄기
ros2 control set_controller_state forward_position_controller inactive

# 3. 다시 spawn
ros2 run controller_manager spawner joint_trajectory_controller
```

## 실제 하드웨어

전제 조건: SO-ARM101 로봇암이 조립되어 있고, 서보 드라이버 보드가 USB로 컴퓨터에 연결되어 있어야 합니다.

### 6.1  컨트롤러 시작(생략 가능)

```Bash
#  터미널 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

`so_arm_hardware` 플러그인이 자동으로 수행합니다:

1. 시리얼 포트 열기

2. 6개 서보 ID 스캔(1–6)

3. 각 서보가 모두 응답하는지 검증

4. 토크 활성화 및 현재 위치 읽기

컨트롤러가 준비되면 터미널 두 개를 추가로 열어 MoveIt을 시작합니다:

```Bash
#  터미널 2 — move_group
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py
```

```Bash
#  터미널 3 — RViz
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

### 6.2  MoveIt(원클릭 시작)

> 다음 명령은 6.1을 **대체**합니다(동시에 실행하지 말고, 6.1의 명령 실행을 중지하세요)——`demo.launch.py` 내부에 이미 컨트롤러 스택이 포함되어 있습니다.
> 
> 

```Bash
#  터미널 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

### 6.3  시리얼 포트 문제 해결

### 6.4  RViz 표시와 실제 자세 불일치

RViz에서 로봇암 자세가 실제 하드웨어와 일치하지 않는 경우(예: 관절 오프셋, 충돌 오탐):

1. 서보의 중심 위치 캘리브레이션이 완료되었는지 확인

2. `so_arm101.ros2_control.xacro`에서 각 관절의 `position_offset` 조정

3. 환산 공식: `새 offset = 현재 offset + (현재 표시 rad / 0.00153398)`

4. 수정 후 `so_arm101_description` 패키지 다시 컴파일

---

## 자주 묻는 질문

### Q1: 컴파일 시 "package not found" 발생

**A**: 모든 시스템 의존성이 올바르게 설치되었고 ROS 2 환경을 source했는지 확인합니다:

```Bash
source /opt/ros/humble/setup.bash
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
```

### Q2: 시작 시 시리얼 포트 접근에서 "Permission denied" 발생

**A**: 시리얼 포트 권한을 확인합니다:

```Bash
# 임시 해결
sudo chmod 666 /dev/ttyACM0

# 영구 해결(로그아웃 후 적용)
sudo usermod -a -G dialout $USER
```

### Q3: MoveIt 플래닝 실패, "Motion planning start tree could not be initialized" 발생

**A**: 일반적으로 두 가지 원인이 있습니다:

1. **관절이 리밋 초과** — 로그에서 `FixStartStateBounds` 출력을 확인합니다. 현재 허용 오차는
0.3 rad이며, 초과량이 이 범위 내라면 통과합니다. 그렇지 않으면 `start_state_max_bounds_error`
를 조정하거나 서보 오프셋을 확인해야 합니다.

2. **시작 상태 충돌** — 로그에서 `FixStartStateCollision` 출력을 확인합니다. 만약
"Unable to find a valid state nearby"라면 현재 자세에 자기 충돌이 있다는 의미입니다.
로봇암이 접힌 자세(gripper가 shoulder에 닿는 등)이거나 오프셋이 올바르지 않을 수 있습니다.
`position_offset`을 조정한 후 다시 시도하세요.

### Q4: Execute 후 로봇암이 움직이지 않음

**A**: 컨트롤러 상태를 확인합니다:

```Bash
ros2 control list_controllers
```

`joint_trajectory_controller`가 `active` 상태인지 확인합니다. 아니라면 다시 spawn합니다:

```Bash
ros2 run controller_manager spawner joint_trajectory_controller
```

### Q5: RViz 시작이 느리거나 멈춤

**A**: 정상적인 현상입니다. MoveIt은 시작 시 URDF 모델, 충돌 감지 플러그인,
운동학 솔버 등을 로드하므로, 최초 시작에 약 10초가 필요합니다.

### Q6: 플래닝된 경로가 매끄럽지 않거나 떨림

**A**: 다음 방법을 시도해 보세요:

- 다른 플래너로 전환(RViz의 Planner 드롭다운 메뉴에서 `RRTConnect` 선택)

- Planning Time을 10초로 증가

- 목표가 워크스페이스 내에 있는지 확인(`Random Valid`로 테스트)

### Q7: Gazebo에서 그리퍼가 움직이지 않음

**A**: 이는 `gz_ros2_control` Humble 버전의 PID 게인 하드코딩 제한
(0.1로 고정)이며, URDF 파라미터로 덮어쓸 수 없습니다. 로그에서는 Execute가 성공으로 표시되지만,
Gazebo 물리 시뮬레이션에서는 그리퍼가 벌어지지 않습니다. Mock 모드와 실제 하드웨어에는 이 문제가 없습니다.

## 부록: 시작 파라미터 빠른 참조

### `controllers_bringup.launch.py`

### `so_arm_gz_bringup.launch.py`

---

## 디렉터리 구조

```Bash
SO-ARM101_ROS2/
├── so_arm_utils/                   # Python 工具库
├── so_arm101_description/          # URDF · 控制器 · 网格 · RViz · MuJoCo
├── so_arm101_moveit_config/        # MoveIt 2 SRDF · 规划器 · 启动文件
├── so_arm_gz/                      # Gazebo 仿真启动
├── so_arm_hardware/                # 内置 SCS 串口驱动（C++）
└── Simulation/                     # 原始 CAD URDF（参考保留）
```

<RelatedProducts slugs="so-arm101" />
