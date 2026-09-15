---
title: "ROS1 Voice Interaction"
description: "ROS1 voice interaction node for the AI Voice Interaction Module on Ubuntu 20.04 with Noetic: three wiring methods, auto detection, and RViz command control."
---

# ROS1 Voice Interaction

## 1、Environment Preparation

#### System Requirements

- **Operating System**: Ubuntu 20.04 or 18.04

- **ROS1 Version**: Noetic (recommended) or Melodic

#### Install Dependencies

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

## 2、Three Wiring Methods

The AI voice interaction module supports the following three wiring methods:

#### Automatic Detection Mechanism

When the ROS1 node starts, it automatically detects the wiring method in the following order:

1. First try the serial port: check `/dev/ttyUSB0` → `/dev/ttyACM0` → `/dev/ttyAMA0` → `/dev/ttyS0` in turn

2. Then try I2C: check whether slave `0x2A` exists on `/dev/i2c-1`

3. For serial port detection, the port is considered available as long as the device file exists and can be opened; no additional verification is required

Once any one method is detected, detection stops and that method is locked in for use. No manual configuration is required.

---

## 3、IIC Protocol Description

#### IIC Slave Configuration

#### Register Definitions

---

## 4、Serial Port Protocol Description (Type-C / UART)

#### Frame Format

Each frame is fixed at **5 bytes**:

#### Baud Rate

Fixed at **115200** bps.

---

## 5、Create the Workspace and Directory Structure

#### Create the catkin Workspace

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### Create the ROS Package

```Bash
catkin_create_pkg juxi_voice rospy std_msgs visualization_msgs
```

#### Final Directory Structure

Place the files provided with this project into the corresponding locations:

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

## 6、File Contents and Placement

#### File 1: `voice_node.py` (Voice Control Node)

**Location**: `~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py`

**Core Features**:

- Automatically detects the Type-C / UART / IIC wiring method

- Unified command word mapping table (114 command words, fully consistent with Excel protocol table V1)

- Uses the corresponding communication backend (serial port / I2C) based on the wiring method

**Key Architecture**:

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

(For the complete code, see the `voice_node.py` file provided with the project)

#### File 2: `rviz_control.py` (RViz Control Node)

**Location**: `~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py`

Subscribes to the `/juxi_voice_cmd` topic to receive command text and updates the cube visualization according to the command.

(For the complete code, see the `rviz_control.py` file provided with the project)

#### File 3: `CMakeLists.txt` and `package.xml`

These are already provided in this project; simply replace the default files generated automatically by `catkin_create_pkg`.

---

## 7、Build and Run

#### Build

```Bash
cd ~/juxi_speech_ws
catkin_make
```

#### Environment Variables

```Bash
source ~/juxi_speech_ws/devel/setup.bash
# 或写入 ~/.bashrc
echo "source ~/juxi_speech_ws/devel/setup.bash" >> ~/.bashrc
```

#### Permission Setup

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

#### Run the Nodes

**Method 1: One-click Startup (Recommended)**

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
roslaunch juxi_voice juxi_voice.launch
```

On startup, the voice node, RViz control node, and RViz visualization interface are opened automatically.

**Method 2: Step-by-step Startup (3 Terminals)**

**Terminal 1**: Start roscore

```Bash
roscore
```

**Terminal 2**: Voice node

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice voice_node.py
```

On startup, the detected wiring method is displayed:

```Bash
[INFO] 自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
[INFO] 语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

or

```Bash
[INFO] 自动检测: UART /dev/ttyUSB0
[INFO] 语音节点启动完成 - UART /dev/ttyUSB0
```

If no device is detected:

```Bash
[FATAL] 未检测到AI语音交互模块！请检查接线 (Type-C / UART / IIC)
[FATAL] 支持的端口: I2C(/dev/i2c-1) | 串口(/dev/ttyUSB0 /dev/ttyACM0 /dev/ttyAMA0 /dev/ttyS0)
```

**Terminal 3**: RViz control node

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice rviz_control.py
```

**Terminal 4**: RViz visualization (load the preconfigured file directly; no manual setup required)

```Bash
rviz -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

Or open RViz first and then load it:

```Bash
rviz
# 菜单栏: File → Open Config → 选择 juxi_voice.rviz
```

---

## 8、RViz Preconfiguration

`juxi_voice.rviz` is preconfigured with the following; it is ready to use on startup with no manual operation required:

- **Fixed Frame**: `map`

- **Marker display**: subscribed to `/juxi_visual_marker` (single marker)

- **MarkerArray display**: subscribed to `/juxi_visual_markers` (multiple markers: robotic arm, battery level, alarm, etc.)

- **Viewpoint**: viewed from above at an angle, with the center at the origin

---

## 9、Usage

#### Wake-up

Say **"你好小犀"** to the module → the module replies "我在"

#### Issuing Commands

- "小车前进" → the cube moves forward

- "亮红灯" → the cube turns red

- "打开流水灯" → the color cycles

- "报警" → a red pulsing sphere

- "显示电量" → battery level text

#### Host-triggered Playback

```Bash
# 被动播报 (I2C → 写 0xD1, 串口 → 发 FE EF FF XX EE)
rostopic pub /juxi_passive_play std_msgs/String "data: '这是红色'"
# 功能词播报 (I2C → 写 0xD2, 串口 → 发 FE EF 01 00 EE)
rostopic pub /juxi_func_play std_msgs/String "data: '欢迎语'"
# 命令词播报 (I2C → 写 0xD3, 串口 → 发 FE EF 00 04 EE)
rostopic pub /juxi_cmd_play std_msgs/String "data: '小车前进'"
```

---

## 10、Command Word ID Reference Table

> A total of 114 command words, fully consistent with `命令词播报词协议列表V1_中文.xlsx`.
> 
> 

### Function Words (ID 1-10)

### Command Words (ID 11-83, 113)

### Passive Playback Words (ID 84-112, 114)

---

## 11、ROS1 Topic Description

---

## 12、Troubleshooting

**1. "AI voice interaction module not detected" on startup**

Check whether the device file for the corresponding wiring method exists:

```Bash
# I2C 接线
ls /dev/i2c-1
sudo i2cdetect -y 1   # 应看到 0x2A

# Type-C 接线
ls /dev/ttyUSB0 /dev/ttyACM0

# UART 接线
ls /dev/ttyAMA0 /dev/ttyS0
```

**2. Serial port permission error**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
# 或加入 dialout 用户组（需要重新登录）
sudo usermod -aG dialout $USER
```

**3. I2C permission error**

```Bash
sudo chmod 666 /dev/i2c-1
# 或加入 i2c 用户组（需要重新登录）
sudo usermod -aG i2c $USER
```

**4. No cube in RViz**

- Check whether Fixed Frame is `map`

- Check whether the Topic is `/juxi_visual_marker`

- Confirm that the rviz_control.py node has been started

**5. No response to commands after wake-up**

```Bash
rostopic echo /juxi_voice_cmd
```

Data present → RViz configuration problem; no data → wiring/communication problem.

**6. rosrun cannot find the node**

Confirm that the build and source have already been executed:

```Bash
cd ~/juxi_speech_ws
catkin_make
source devel/setup.bash
```

**7. Syntax error reported**

```Bash
# 确认 Python 脚本有执行权限
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py
```

<RelatedProducts slugs="ai-voice-module" />
