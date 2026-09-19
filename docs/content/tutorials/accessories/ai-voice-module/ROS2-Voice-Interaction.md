---
title: "ROS2 Voice Interaction"
description: "ROS2 voice interaction node for the AI Voice Interaction Module on Ubuntu 22.04 with Humble: three wiring methods, auto detection, and RViz2 command control."
---

# ROS2 Voice Interaction

## 1、Environment Preparation

#### System Requirements

- **Operating System**: Ubuntu 22.04

- **ROS2 Version**: Humble

#### Install Dependencies

```Bash
# 1. Update sources
sudo apt update

# 2. Install the ROS2 base packages
# (skip if ROS2 is already installed)
sudo apt install ros-humble-desktop -y

# 3. Install this project's dependencies (supports both serial and I2C)
sudo apt install python3-pip ros-humble-rviz2 ros-humble-visualization-msgs -y
pip3 install pyserial smbus2

# 4. If using I2C wiring, install additionally
sudo apt install python3-smbus2 i2c-tools -y
```

---

## 2、Three Wiring Methods

The AI voice interaction module supports the following three wiring methods:

#### Automatic Detection Mechanism

When the ROS2 node starts, it automatically detects the wiring method in the following order:

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

#### Create the Directory

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### Create the ROS2 Package

```Bash
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### Final Directory Structure

```Bash
~/juxi_speech_ws/
├── build/
├── install/
├── log/
└── src/
    └── juxi_voice/
        ├── package.xml
        ├── setup.py           # (replace with the one provided by this project)
        ├── juxi_voice.rviz    # (new: RViz preset config file)
        ├── resource/
        │   └── juxi_voice
        └── juxi_voice/
            ├── __init__.py
            ├── voice_node.py    # (new: voice node)
            └── rviz_control.py  # (new: RViz control node)
```

---

## 6、File Contents and Placement

#### File 1: `voice_node.py` (Voice Control Node)

**Location**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

**Core Features**:

- Automatically detects the Type-C / UART / IIC wiring method

- Unified command word mapping table (114 command words)

- Uses the corresponding communication backend based on the wiring method

**Key Architecture**:

```Bash
# Unified command data: ID → (serial byte 2, serial byte 3, command text, playback mode)
CMD_DATA = {
    1:  (0x01, 0x00, "欢迎语", "被"),
    3:  (0x03, 0x00, "你好小犀", "主"),
    14: (0x00, 0x04, "小车前进", "主"),
    84: (0xFF, 0x5F, "这是红色", "被"),
    ...
}

# Automatic detection function
def detect_connection(logger):
    # 1. Try I2C
    # 2. Try serial ports /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyAMA0, /dev/ttyS0
    ...
```

(For the complete code, see the `voice_node.py` file provided with the project)

#### File 2: `rviz_control.py` (RViz Control Node)

**Location**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

Subscribes to the `/juxi_voice_cmd` topic to receive command text and updates the cube visualization according to the command.

(For the complete code, see the `rviz_control.py` file provided with the project)

#### File 3: Modify `setup.py`

**Location**: `~/juxi_speech_ws/src/juxi_voice/setup.py`

```Bash
entry_points={
    'console_scripts': [
        'voice_node = juxi_voice.voice_node:main',
        'rviz_control = juxi_voice.rviz_control:main',
    ],
},
```

---

## 7、Build and Run

#### Build

```Bash
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### Environment Variables

```Bash
source ~/juxi_speech_ws/install/setup.bash
# Or write to ~/.bashrc
echo "source ~/juxi_speech_ws/install/setup.bash" >> ~/.bashrc
```

#### Permission Setup

```Bash
# I2C permissions
sudo chmod 666 /dev/i2c-1
# Serial port permissions
sudo chmod 666 /dev/ttyUSB0
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyAMA0
# Or add to the user group
sudo usermod -aG dialout $USER
sudo usermod -aG i2c $USER
```

#### Run the Nodes (3 Terminals)

**Terminal 1**: Voice node

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice voice_node
```

On startup, the detected wiring method is displayed:

```Bash
自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

or

```Bash
自动检测: UART /dev/ttyUSB0
语音节点启动完成 - UART /dev/ttyUSB0
```

**Terminal 2**: RViz control node

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```

**Terminal 3**: RViz visualization (load the preconfigured file directly; no manual setup required)

```Bash
rviz2 -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

Or open RViz first and then load it:

```Bash
rviz2
# Menu bar: File → Open Config → select juxi_voice.rviz
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
# Passive playback
ros2 topic pub /juxi_passive_play std_msgs/msg/String "data: '这是红色'"
# Function word playback
ros2 topic pub /juxi_func_play std_msgs/msg/String "data: '欢迎语'"
# Command word playback
ros2 topic pub /juxi_cmd_play std_msgs/msg/String "data: '小车前进'"
```

---

## 10、Command Word ID Reference Table

### Function Words (ID 1-10)

### Command Words (ID 11-83, 113)

### Passive Playback Words (ID 84-112, 114)

---

## 11、ROS2 Topic Description

---

## 12、Troubleshooting

**"AI voice interaction module not detected" on startup**

Check whether the device file for the corresponding wiring method exists:

```Bash
# I2C wiring
ls /dev/i2c-1
sudo i2cdetect -y 1   # You should see 0x2A

# Type-C wiring
ls /dev/ttyUSB0 /dev/ttyACM0

# UART wiring
ls /dev/ttyAMA0 /dev/ttyS0
```

**Serial port permission error**

```Bash
sudo chmod 666 /dev/ttyUSB0   # or /dev/ttyACM0, etc.
```

**I2C permission error**

```Bash
sudo chmod 666 /dev/i2c-1
```

**No cube in RViz**

- Check whether Fixed Frame is `map`

- Check whether the Topic is `/juxi_visual_marker`

**No response to commands after wake-up**

```Bash
ros2 topic echo /juxi_voice_cmd
```

Data present → RViz configuration problem; no data → wiring/communication problem.

<RelatedProducts slugs="ai-voice-module" />
