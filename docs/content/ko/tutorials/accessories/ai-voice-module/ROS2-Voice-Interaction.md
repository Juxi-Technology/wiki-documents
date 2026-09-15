---
title: "ROS2 음성 인터랙션"
description: "AI 음성 인터랙션 모듈은 다음 세 가지 배선 방식을 지원합니다."
---

# ROS2 음성 인터랙션

## 1、환경 준비

#### 시스템 요구 사항

- **운영 체제**: Ubuntu 22.04

- **ROS2 버전**: Humble

#### 의존성 라이브러리 설치

```Bash
# 1. 更新源
sudo apt update

# 2. 安装 ROS2 基础包
# (如果已安装ROS2，跳过)
sudo apt install ros-humble-desktop -y

# 3. 安装本项目依赖（同时支持串口和I2C）
sudo apt install python3-pip ros-humble-rviz2 ros-humble-visualization-msgs -y
pip3 install pyserial smbus2

# 4. 如果使用 I2C 接线，额外安装
sudo apt install python3-smbus2 i2c-tools -y
```

---

## 2、세 가지 배선 방식 설명

AI 음성 인터랙션 모듈은 다음 세 가지 배선 방식을 지원합니다.

#### 자동 감지 메커니즘

ROS2 노드는 시작할 때 다음 순서에 따라 배선 방식을 자동 감지합니다.

1. 먼저 시리얼 포트 시도: `/dev/ttyUSB0` → `/dev/ttyACM0` → `/dev/ttyAMA0` → `/dev/ttyS0` 순으로 감지

2. 다음으로 I2C 시도: `/dev/i2c-1` 에 슬레이브 `0x2A` 가 존재하는지 감지

3. 시리얼 포트 감지는 장치 파일이 존재하고 열 수 있으면 사용 가능한 것으로 간주하며, 추가 검증은 필요하지 않습니다.

어느 한 방식이 감지되면 감지를 중단하고 해당 방식을 고정하여 사용합니다. 수동 설정은 전혀 필요하지 않습니다.

---

## 3、IIC 프로토콜 설명

#### IIC 슬레이브 설정

#### 레지스터 정의

---

## 4、시리얼 포트 프로토콜 설명 (Type-C / UART)

#### 프레임 형식

각 프레임은 **5바이트** 로 고정됩니다.

#### 보드레이트

**115200** bps 로 고정됩니다.

---

## 5、작업 공간 및 디렉터리 구조 생성

#### 디렉터리 생성

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### ROS2 기능 패키지 생성

```Bash
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### 최종 디렉터리 구조

```Bash
~/juxi_speech_ws/
├── build/
├── install/
├── log/
└── src/
    └── juxi_voice/
        ├── package.xml
        ├── setup.py           # (替换为本项目提供的)
        ├── juxi_voice.rviz    # (新建：RViz预配置文件)
        ├── resource/
        │   └── juxi_voice
        └── juxi_voice/
            ├── __init__.py
            ├── voice_node.py    # (新建：语音节点)
            └── rviz_control.py  # (新建：RViz控制节点)
```

---

## 6、파일 내용 및 배치

#### 파일 1: `voice_node.py` (음성 제어 노드)

**위치**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

**핵심 기능**:

- Type-C / UART / IIC 배선 방식 자동 감지

- 통합 명령어 매핑 테이블 (명령어 114개)

- 배선 방식에 따라 해당 통신 백엔드 사용

**핵심 아키텍처**:

```Bash
# 统一命令数据: ID → (串口字节2, 串口字节3, 命令文本, 播报模式)
CMD_DATA = {
    1:  (0x01, 0x00, "欢迎语", "被"),
    3:  (0x03, 0x00, "你好小犀", "主"),
    14: (0x00, 0x04, "小车前进", "主"),
    84: (0xFF, 0x5F, "这是红色", "被"),
    ...
}

# 自动检测函数
def detect_connection(logger):
    # 1. 尝试 I2C
    # 2. 尝试串口 /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyAMA0, /dev/ttyS0
    ...
```

(전체 코드는 프로젝트에서 제공하는 `voice_node.py` 파일을 참조하십시오)

#### 파일 2: `rviz_control.py` (RViz 제어 노드)

**위치**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

`/juxi_voice_cmd` 토픽을 구독하여 명령 텍스트를 수신하고, 명령에 따라 큐브 시각화를 업데이트합니다.

(전체 코드는 프로젝트에서 제공하는 `rviz_control.py` 파일을 참조하십시오)

#### 파일 3: `setup.py` 수정

**위치**: `~/juxi_speech_ws/src/juxi_voice/setup.py`

```Bash
entry_points={
    'console_scripts': [
        'voice_node = juxi_voice.voice_node:main',
        'rviz_control = juxi_voice.rviz_control:main',
    ],
},
```

---

## 7、빌드 및 실행

#### 빌드

```Bash
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### 환경 변수

```Bash
source ~/juxi_speech_ws/install/setup.bash
# 或写入 ~/.bashrc
echo "source ~/juxi_speech_ws/install/setup.bash" >> ~/.bashrc
```

#### 권한 설정

```Bash
# I2C 权限
sudo chmod 666 /dev/i2c-1
# 串口权限
sudo chmod 666 /dev/ttyUSB0
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyAMA0
# 或加入用户组
sudo usermod -aG dialout $USER
sudo usermod -aG i2c $USER
```

#### 노드 실행 (터미널 3개)

**터미널 1**: 음성 노드

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice voice_node
```

시작 시 감지된 배선 방식이 표시됩니다:

```Bash
自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

또는

```Bash
自动检测: UART /dev/ttyUSB0
语音节点启动完成 - UART /dev/ttyUSB0
```

**터미널 2**: RViz 제어 노드

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```

**터미널 3**: RViz 시각화 (미리 설정된 파일을 바로 로드하므로 수동 설정 불필요)

```Bash
rviz2 -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

또는 RViz 를 먼저 열고 로드:

```Bash
rviz2
# 菜单栏: File → Open Config → 选择 juxi_voice.rviz
```

---

## 8、RViz 사전 설정 설명

`juxi_voice.rviz` 에는 다음 내용이 미리 설정되어 있어 실행하면 바로 사용할 수 있으며, 수동 조작이 전혀 필요하지 않습니다:

- **Fixed Frame**: `map`

- **Marker 표시**: `/juxi_visual_marker` 구독 완료 (단일 마커)

- **MarkerArray 표시**: `/juxi_visual_markers` 구독 완료 (다중 마커: 로봇 암, 배터리, 알람 등)

- **시점**: 비스듬한 위쪽에서 관찰하며 중심점은 원점

---

## 9、사용 방법

#### 웨이크

모듈을 향해 **"你好小犀"** 라고 말합니다 → 모듈이 "我在" 라고 응답합니다

#### 명령 전송

- "小车前进" → 사각형 전진

- "亮红灯" → 사각형이 빨간색으로 변함

- "打开流水灯" → 색상이 순환 변화

- "报警" → 빨간색 펄스 구체

- "显示电量" → 배터리 텍스트

#### 호스트에서 재생 트리거

```Bash
# 被动播报
ros2 topic pub /juxi_passive_play std_msgs/msg/String "data: '这是红色'"
# 功能词播报
ros2 topic pub /juxi_func_play std_msgs/msg/String "data: '欢迎语'"
# 命令词播报
ros2 topic pub /juxi_cmd_play std_msgs/msg/String "data: '小车前进'"
```

---

## 10、명령어 ID 대조표

### 기능어 (ID 1-10)

### 명령어 (ID 11-83, 113)

### 수동 재생 문구 (ID 84-112, 114)

---

## 11、ROS2 토픽 설명

---

## 12、자주 묻는 질문

**시작 시 "AI 음성 인터랙션 모듈이 감지되지 않았습니다" 오류 발생**

배선 방식에 해당하는 장치 파일이 존재하는지 확인합니다:

```Bash
# I2C 接线
ls /dev/i2c-1
sudo i2cdetect -y 1   # 应看到 0x2A

# Type-C 接线
ls /dev/ttyUSB0 /dev/ttyACM0

# UART 接线
ls /dev/ttyAMA0 /dev/ttyS0
```

**시리얼 포트 권한 오류**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
```

**I2C 권한 오류**

```Bash
sudo chmod 666 /dev/i2c-1
```

**RViz 에 사각형이 없음**

- Fixed Frame 이 `map` 인지 확인

- Topic 이 `/juxi_visual_marker` 인지 확인

**웨이크 후 명령을 말해도 반응이 없음**

```Bash
ros2 topic echo /juxi_voice_cmd
```

데이터가 있음 → RViz 설정 문제, 데이터가 없음 → 배선/통신 이상.

<RelatedProducts slugs="ai-voice-module" />
