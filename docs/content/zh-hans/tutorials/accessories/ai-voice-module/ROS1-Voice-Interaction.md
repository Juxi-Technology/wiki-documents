---
title: "ROS1语音交互"
description: "钜犀科技 AI 语音交互模块教程——从 ROS1 节点自动检测串口或 I2C 接线,实现语音交互。"
---

# ROS1语音交互

## 1、环境准备

#### 系统要求

- **操作系统**：Ubuntu 20.04 或 18.04

- **ROS1 版本**：Noetic (推荐) 或 Melodic

#### 安装依赖库

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

## 2、三种接线方式说明

AI语音交互模块支持以下三种接线方式：

#### 自动检测机制

ROS1节点启动时会按以下顺序自动检测接线方式：

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

#### 创建 catkin 工作空间

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### 创建 ROS 功能包

```Bash
catkin_create_pkg juxi_voice rospy std_msgs visualization_msgs
```

#### 最终目录结构

将本项目提供的文件放置到对应位置：

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

## 6、文件内容与放置

#### 文件 1：`voice_node.py` (语音控制节点)

**位置**：`~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py`

**核心功能**：

- 自动检测 Type-C / UART / IIC 接线方式

- 统一命令词映射表（114条命令词，与Excel协议表V1完全一致）

- 根据接线方式使用对应的通信后端（串口 / I2C）

**关键架构**：

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

（完整代码请查看项目提供的 `voice_node.py` 文件）

#### 文件 2：`rviz_control.py` (RViz 控制节点)

**位置**：`~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py`

订阅 `/juxi_voice_cmd` 话题接收命令文本，根据命令更新立方体可视化。

（完整代码请查看项目提供的 `rviz_control.py` 文件）

#### 文件 3：`CMakeLists.txt` 和 `package.xml`

已在本项目中提供，直接替换 `catkin_create_pkg` 自动生成的默认文件即可。

---

## 7、编译与运行

#### 编译

```Bash
cd ~/juxi_speech_ws
catkin_make
```

#### 环境变量

```Bash
source ~/juxi_speech_ws/devel/setup.bash
# 或写入 ~/.bashrc
echo "source ~/juxi_speech_ws/devel/setup.bash" >> ~/.bashrc
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
# 设置后需要重新登录生效
```

#### 运行节点

**方式一：一键启动（推荐）**

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
roslaunch juxi_voice juxi_voice.launch
```

启动时会自动打开语音节点、RViz控制节点和RViz可视化界面。

**方式二：分步启动（3 个终端）**

**终端 1**：启动 roscore

```Bash
roscore
```

**终端 2**：语音节点

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice voice_node.py
```

启动时会显示检测到的接线方式：

```Bash
[INFO] 自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
[INFO] 语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

或

```Bash
[INFO] 自动检测: UART /dev/ttyUSB0
[INFO] 语音节点启动完成 - UART /dev/ttyUSB0
```

如果未检测到任何设备：

```Bash
[FATAL] 未检测到AI语音交互模块！请检查接线 (Type-C / UART / IIC)
[FATAL] 支持的端口: I2C(/dev/i2c-1) | 串口(/dev/ttyUSB0 /dev/ttyACM0 /dev/ttyAMA0 /dev/ttyS0)
```

**终端 3**：RViz 控制节点

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice rviz_control.py
```

**终端 4**：RViz 可视化（直接加载预配文件，无需手动设置）

```Bash
rviz -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

或者先打开 RViz 再加载：

```Bash
rviz
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
# 被动播报 (I2C → 写 0xD1, 串口 → 发 FE EF FF XX EE)
rostopic pub /juxi_passive_play std_msgs/String "data: '这是红色'"
# 功能词播报 (I2C → 写 0xD2, 串口 → 发 FE EF 01 00 EE)
rostopic pub /juxi_func_play std_msgs/String "data: '欢迎语'"
# 命令词播报 (I2C → 写 0xD3, 串口 → 发 FE EF 00 04 EE)
rostopic pub /juxi_cmd_play std_msgs/String "data: '小车前进'"
```

---

## 10、命令词ID对照表

> 共114条命令词，与`命令词播报词协议列表V1_中文.xlsx`完全一致。
> 
> 

### 功能词 (ID 1-10)

### 命令词 (ID 11-83, 113)

### 被动播报词 (ID 84-112, 114)

---

## 11、ROS1 话题说明

---

## 12、常见问题排查

**1.启动时报"未检测到AI语音交互模块"**

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

**2.串口权限报错**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
# 或加入 dialout 用户组（需要重新登录）
sudo usermod -aG dialout $USER
```

**3.I2C 权限报错**

```Bash
sudo chmod 666 /dev/i2c-1
# 或加入 i2c 用户组（需要重新登录）
sudo usermod -aG i2c $USER
```

**4.RViz 里没有方块**

- 检查 Fixed Frame 是否为 `map`

- 检查 Topic 是否为 `/juxi_visual_marker`

- 确认 rviz_control.py 节点已启动

**5.唤醒后说指令没反应**

```Bash
rostopic echo /juxi_voice_cmd
```

有数据 → RViz 配置问题；无数据 → 接线/通信异常。

**6.rosrun 找不到节点**

确认已执行过编译和 source：

```Bash
cd ~/juxi_speech_ws
catkin_make
source devel/setup.bash
```

**7.提示语法错误**

```Bash
# 确认 Python 脚本有执行权限
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py
```

<RelatedProducts slugs="ai-voice-module" />
