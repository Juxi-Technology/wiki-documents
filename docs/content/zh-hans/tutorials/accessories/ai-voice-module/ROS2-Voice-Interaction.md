---
title: "ROS2语音交互"
description: "AI语音交互模块支持以下三种接线方式："
---

# ROS2语音交互

## 1、环境准备

#### 系统要求

- **操作系统**：Ubuntu 22.04

- **ROS2 版本**：Humble

#### 安装依赖库

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

## 2、三种接线方式说明

AI语音交互模块支持以下三种接线方式：

#### 自动检测机制

ROS2节点启动时会按以下顺序自动检测接线方式：

1. 先尝试串口：依次检测 `/dev/ttyUSB0` → `/dev/ttyACM0` → `/dev/ttyAMA0` → `/dev/ttyS0`

2. 再尝试 I2C：检测 `/dev/i2c-1` 上是否存在从机 `0x2A`

3. 串口检测只需设备文件存在且可打开即认为可用，无需额外验证

检测到任意一种方式后即停止检测并锁定使用该方式。无需任何手动配置。

---

## 3、IIC 协议说明

#### IIC 从机配置

#### 寄存器定义

---

## 4、串口协议说明 (Type-C / UART)

#### 帧格式

每帧固定为 **5字节**：

#### 波特率

固定 **115200** bps。

---

## 5、创建工作空间与目录结构

#### 创建目录

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### 创建 ROS2 功能包

```Bash
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### 最终目录结构

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

## 6、文件内容与放置

#### 文件 1：`voice_node.py` (语音控制节点)

**位置**：`~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

**核心功能**：

- 自动检测 Type-C / UART / IIC 接线方式

- 统一命令词映射表（114条命令词）

- 根据接线方式使用对应的通信后端

**关键架构**：

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

（完整代码请查看项目提供的 `voice_node.py` 文件）

#### 文件 2：`rviz_control.py` (RViz 控制节点)

**位置**：`~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

订阅 `/juxi_voice_cmd` 话题接收命令文本，根据命令更新立方体可视化。

（完整代码请查看项目提供的 `rviz_control.py` 文件）

#### 文件 3：修改 `setup.py`

**位置**：`~/juxi_speech_ws/src/juxi_voice/setup.py`

```Bash
entry_points={
    'console_scripts': [
        'voice_node = juxi_voice.voice_node:main',
        'rviz_control = juxi_voice.rviz_control:main',
    ],
},
```

---

## 7、编译与运行

#### 编译

```Bash
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### 环境变量

```Bash
source ~/juxi_speech_ws/install/setup.bash
# 或写入 ~/.bashrc
echo "source ~/juxi_speech_ws/install/setup.bash" >> ~/.bashrc
```

#### 权限设置

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

#### 运行节点（3 个终端）

**终端 1**：语音节点

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice voice_node
```

启动时会显示检测到的接线方式：

```Bash
自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

或

```Bash
自动检测: UART /dev/ttyUSB0
语音节点启动完成 - UART /dev/ttyUSB0
```

**终端 2**：RViz 控制节点

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```

**终端 3**：RViz 可视化（直接加载预配文件，无需手动设置）

```Bash
rviz2 -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

或者先打开 RViz 再加载：

```Bash
rviz2
# 菜单栏: File → Open Config → 选择 juxi_voice.rviz
```

---

## 8、RViz 预配说明

`juxi_voice.rviz` 已预配好以下内容，启动即可使用，无需任何手动操作：

- **Fixed Frame**：`map`

- **Marker 显示**：已订阅 `/juxi_visual_marker`（单标记）

- **MarkerArray 显示**：已订阅 `/juxi_visual_markers`（多标记：机械臂、电量、报警等）

- **视角**：从斜上方观察，中心点在原点

---

## 9、使用方法

#### 唤醒

对着模块说 **"你好小犀"** → 模块回复 "我在"

#### 发指令

- "小车前进" → 方块前进

- "亮红灯" → 方块变红色

- "打开流水灯" → 颜色循环变化

- "报警" → 红色脉冲球体

- "显示电量" → 电量文字

#### 主机触发播报

```Bash
# 被动播报
ros2 topic pub /juxi_passive_play std_msgs/msg/String "data: '这是红色'"
# 功能词播报
ros2 topic pub /juxi_func_play std_msgs/msg/String "data: '欢迎语'"
# 命令词播报
ros2 topic pub /juxi_cmd_play std_msgs/msg/String "data: '小车前进'"
```

---

## 10、命令词ID对照表

### 功能词 (ID 1-10)

### 命令词 (ID 11-83, 113)

### 被动播报词 (ID 84-112, 114)

---

## 11、ROS2 话题说明

---

## 12、常见问题排查

**启动时报"未检测到AI语音交互模块"**

检查接线方式对应的设备文件是否存在：

```Bash
# I2C 接线
ls /dev/i2c-1
sudo i2cdetect -y 1   # 应看到 0x2A

# Type-C 接线
ls /dev/ttyUSB0 /dev/ttyACM0

# UART 接线
ls /dev/ttyAMA0 /dev/ttyS0
```

**串口权限报错**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
```

**I2C 权限报错**

```Bash
sudo chmod 666 /dev/i2c-1
```

**RViz 里没有方块**

- 检查 Fixed Frame 是否为 `map`

- 检查 Topic 是否为 `/juxi_visual_marker`

**唤醒后说指令没反应**

```Bash
ros2 topic echo /juxi_voice_cmd
```

有数据 → RViz 配置问题；无数据 → 接线/通信异常。

<RelatedProducts slugs="ai-voice-module" />
