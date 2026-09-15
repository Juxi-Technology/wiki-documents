---
title: "ROS1 음성 인터랙션"
description: "AI 음성 인터랙션 모듈은 다음 세 가지 배선 방식을 지원합니다."
---

# ROS1 음성 인터랙션

## 1、환경 준비

#### 시스템 요구 사항

- **운영 체제**: Ubuntu 20.04 또는 18.04

- **ROS1 버전**: Noetic (권장) 또는 Melodic

#### 의존성 라이브러리 설치

```Bash
# 1. 更新源
sudo apt update

# 2. 安装 ROS1 桌面完整版
# (如果已安装ROS1，跳过)
sudo apt install ros-noetic-desktop-full -y    # Ubuntu 20.04
sudo apt install ros-melodic-desktop-full -y   # Ubuntu 18.04

# 3. 安装本项目依赖（同时支持串口和I2C）
sudo apt install python3-pip ros-noetic-rviz i2c-tools -y
pip3 install pyserial smbus2

# 如果是 Melodic (Python2)
sudo apt install python-pip ros-melodic-rviz i2c-tools -y
pip install pyserial smbus2

# 4. 如果使用 I2C 接线，额外安装
sudo apt install python3-smbus2 -y
```

---

## 2、세 가지 배선 방식 설명

AI 음성 인터랙션 모듈은 다음 세 가지 배선 방식을 지원합니다.

#### 자동 감지 메커니즘

ROS1 노드는 시작할 때 다음 순서에 따라 배선 방식을 자동 감지합니다.

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

#### catkin 작업 공간 생성

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### ROS 기능 패키지 생성

```Bash
catkin_create_pkg juxi_voice rospy std_msgs visualization_msgs
```

#### 최종 디렉터리 구조

본 프로젝트에서 제공하는 파일을 해당 위치에 배치합니다:

```Bash
~/juxi_speech_ws/
├── build/
├── devel/
└── src/
    └── juxi_voice/
        ├── CMakeLists.txt      # (替换为本项目提供的)
        ├── package.xml          # (替换为本项目提供的)
        ├── juxi_voice.rviz      # (新建：RViz预配置文件)
        ├── launch/
        │   └── juxi_voice.launch # (新建：一键启动文件)
        └── scripts/
            ├── voice_node.py     # (新建：语音节点)
            └── rviz_control.py   # (新建：RViz控制节点)
```

---

## 6、파일 내용 및 배치

#### 파일 1: `voice_node.py` (음성 제어 노드)

**위치**: `~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py`

**핵심 기능**:

- Type-C / UART / IIC 배선 방식 자동 감지

- 통합 명령어 매핑 테이블 (명령어 114개, Excel 프로토콜 표 V1과 완전히 동일)

- 배선 방식에 따라 해당 통신 백엔드 (시리얼 포트 / I2C) 사용

**핵심 아키텍처**:

```Bash
# 统一命令数据: ID → (串口字节2, 串口字节3, 命令文本, 播报模式)
CMD_DATA = {
    1:   (0x01, 0x00, "欢迎语", "被"),
    3:   (0x03, 0x00, "你好小犀", "主"),
    14:  (0x00, 0x04, "小车前进", "主"),
    84:  (0xFF, 0x5F, "这是红色", "被"),
    ...
}

# 自动检测函数
def detect_connection():
    # 1. 尝试串口 /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyAMA0, /dev/ttyS0
    # 2. 尝试 I2C /dev/i2c-1 (从机地址 0x2A)
    ...
```

(전체 코드는 프로젝트에서 제공하는 `voice_node.py` 파일을 참조하십시오)

#### 파일 2: `rviz_control.py` (RViz 제어 노드)

**위치**: `~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py`

`/juxi_voice_cmd` 토픽을 구독하여 명령 텍스트를 수신하고, 명령에 따라 큐브 시각화를 업데이트합니다.

(전체 코드는 프로젝트에서 제공하는 `rviz_control.py` 파일을 참조하십시오)

#### 파일 3: `CMakeLists.txt` 와 `package.xml`

본 프로젝트에서 이미 제공되며, `catkin_create_pkg` 가 자동으로 생성한 기본 파일을 그대로 교체하면 됩니다.

---

## 7、빌드 및 실행

#### 빌드

```Bash
cd ~/juxi_speech_ws
catkin_make
```

#### 환경 변수

```Bash
source ~/juxi_speech_ws/devel/setup.bash
# 或写入 ~/.bashrc
echo "source ~/juxi_speech_ws/devel/setup.bash" >> ~/.bashrc
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
# 设置后需要重新登录生效
```

#### 노드 실행

**방식 1: 원클릭 실행 (권장)**

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
roslaunch juxi_voice juxi_voice.launch
```

시작 시 음성 노드, RViz 제어 노드, RViz 시각화 인터페이스가 자동으로 열립니다.

**방식 2: 단계별 실행 (터미널 3개)**

**터미널 1**: roscore 실행

```Bash
roscore
```

**터미널 2**: 음성 노드

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice voice_node.py
```

시작 시 감지된 배선 방식이 표시됩니다:

```Bash
[INFO] 自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
[INFO] 语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

또는

```Bash
[INFO] 自动检测: UART /dev/ttyUSB0
[INFO] 语音节点启动完成 - UART /dev/ttyUSB0
```

어떤 장치도 감지되지 않은 경우:

```Bash
[FATAL] 未检测到AI语音交互模块！请检查接线 (Type-C / UART / IIC)
[FATAL] 支持的端口: I2C(/dev/i2c-1) | 串口(/dev/ttyUSB0 /dev/ttyACM0 /dev/ttyAMA0 /dev/ttyS0)
```

**터미널 3**: RViz 제어 노드

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice rviz_control.py
```

**터미널 4**: RViz 시각화 (미리 설정된 파일을 바로 로드하므로 수동 설정 불필요)

```Bash
rviz -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

또는 RViz 를 먼저 열고 로드:

```Bash
rviz
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
# 被动播报 (I2C → 写 0xD1, 串口 → 发 FE EF FF XX EE)
rostopic pub /juxi_passive_play std_msgs/String "data: '这是红色'"
# 功能词播报 (I2C → 写 0xD2, 串口 → 发 FE EF 01 00 EE)
rostopic pub /juxi_func_play std_msgs/String "data: '欢迎语'"
# 命令词播报 (I2C → 写 0xD3, 串口 → 发 FE EF 00 04 EE)
rostopic pub /juxi_cmd_play std_msgs/String "data: '小车前进'"
```

---

## 10、명령어 ID 대조표

> 총 114개의 명령어로, `命令词播报词协议列表V1_中文.xlsx` 와 완전히 동일합니다.
> 
> 

### 기능어 (ID 1-10)

### 명령어 (ID 11-83, 113)

### 수동 재생 문구 (ID 84-112, 114)

---

## 11、ROS1 토픽 설명

---

## 12、자주 묻는 질문

**1.시작 시 "AI 음성 인터랙션 모듈이 감지되지 않았습니다" 오류가 발생하는 경우**

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

**2.시리얼 포트 권한 오류**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
# 或加入 dialout 用户组（需要重新登录）
sudo usermod -aG dialout $USER
```

**3.I2C 권한 오류**

```Bash
sudo chmod 666 /dev/i2c-1
# 或加入 i2c 用户组（需要重新登录）
sudo usermod -aG i2c $USER
```

**4.RViz 에 사각형이 없음**

- Fixed Frame 이 `map` 인지 확인

- Topic 이 `/juxi_visual_marker` 인지 확인

- rviz_control.py 노드가 실행되었는지 확인

**5.웨이크 후 명령을 말해도 반응이 없음**

```Bash
rostopic echo /juxi_voice_cmd
```

데이터가 있음 → RViz 설정 문제, 데이터가 없음 → 배선/통신 이상.

**6.rosrun 이 노드를 찾지 못함**

빌드와 source 를 실행했는지 확인합니다:

```Bash
cd ~/juxi_speech_ws
catkin_make
source devel/setup.bash
```

**7.구문 오류가 표시됨**

```Bash
# 确认 Python 脚本有执行权限
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py
```



