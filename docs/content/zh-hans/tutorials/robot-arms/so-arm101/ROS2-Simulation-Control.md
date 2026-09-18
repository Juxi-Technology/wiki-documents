---
title: "ROS2 仿真控制"
description: "ROS2 仿真控制:提供 SO-ARM101 的完整 ROS 2 工作区,涵盖机器人描述、硬件驱动、Gazebo 仿真与 MoveIt 2 运动规划。"
---

# ROS2 仿真控制

[SO-ARM101_ROS2.zip](/downloads/SO-ARM101_ROS2.zip)

SO-ARM101 六自由度机械臂的完整 ROS 2 工作区，涵盖机器人描述、内置硬件驱动、Gazebo 仿真和 MoveIt 2 运动规划。

SO-ARM101 是 [TheRobotStudio](https://www.therobotstudio.com/)与 [LeRobot](https://huggingface.co/lerobot) 社区联合设计的第二代开源从臂，使用六个 STS3215 舵机、舵机驱动板和 3D 打印 PLA+ 零件。

**注意：****机械臂需要中位校准，所有关节处于可转动范围中间位置时进行中位校准**

## 包结构

目标平台：**ROS 2 Humble / Jazzy**。

---

## ROS2环境准备

在编译本项目之前，确保系统已安装 ROS 2 和相关组件。

### 系统要求

- Ubuntu 22.04（推荐）或 24.04

- 至少 4 GB 内存

- 真实硬件模式需要 USB 串口

### 0.1  安装 ROS 2 Humble

```Bash
# 设置 locale
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# 添加 ROS 2 软件源
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# 安装 ROS 2 Humble Desktop
sudo apt update
sudo apt install ros-humble-desktop
```

### 0.2  安装编译工具与依赖

```Bash
# colcon 编译工具
sudo apt install python3-colcon-common-extensions

# MoveIt 2
sudo apt install ros-humble-moveit

# ros2_control
sudo apt install ros-humble-ros2-control \
                 ros-humble-ros2-controllers \
                 ros-humble-controller-manager \
                 ros-humble-joint-state-publisher-gui
```

### 0.3  设置环境变量

```Bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### 0.4  设置串口权限（真实硬件必需）

**永久设置（推荐）**：

```Bash
sudo usermod -a -G dialout $USER
# 注销后重新登录生效
```

**临时设置（每次重启后需要重新执行）**：

```Bash
sudo chmod 666 /dev/ttyACM0
```

## 安装工作区环境

```Markdown
# 第 1 步  创建工作区
mkdir -p ~/so101_ws/src
cd ~/so101_ws/src

# 第 2 步  把源码放进去
cp -r /path/to/SO-ARM101_ROS2 ./

# 第 3 步  安装系统依赖
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y

# 第 4 步  编译所有包
colcon build --symlink-install

# 第 5 步  加载环境  ← 每个新终端都要执行
source install/setup.bash
```

**真实硬件说明** — `so_arm_hardware` 包已内置。无需安装额外驱动，
它通过串口使用 SCS 协议直接与 STS3215 舵机通信。

## 可视化验证

从这里开始最简单——不需要控制器，不需要硬件。

```Bash
#  终端 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description view_description.launch.py rviz:=true
```

RViz 会显示完整的机器人模型，拖动滑块可验证各关节运动是否正确。

---

## 控制器测试（虚拟硬件 / Mock 模式）

仍然不需要真实机器人，全部在内存中运行。

```Bash
#  终端 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py
```

等日志出现后说明就绪：

```Bash
joint_state_broadcaster      → active
joint_trajectory_controller  → active
```

**注意**：模拟模式只启动两个控制器（`joint_state_broadcaster` 和
`joint_trajectory_controller`）。`gripper_controller` 已移除，夹爪
由 `joint_trajectory_controller` 统一控制全部 6 个关节。

### 控制器职责

## MoveIt 运动规划（Mock 硬件）

**只需一个终端** — MoveIt 内部自动启动控制器栈。

```Bash
#  终端 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py
```

RViz 窗口打开后：

1. 在 **MotionPlanning** 面板中，**Planning Group → manipulator**

2. **Start State → ****`<current>`**，**Goal State → extended**

3. 依次点击 **Plan** 和 **Execute**

可用的预设姿态：`open`、`zero`、`extended`、`rest`。

### 4.1  MoveIt 界面详解

RViz 启动后左侧会显示 **MotionPlanning** 面板，包含以下主要标签：

#### Planning 标签

#### 规划参数

> **首次测试建议**：将 Velocity 和 Acceleration 设为 0.3，降低运动速度确保安全。
> 
> 

#### Scene Objects 标签

- 添加障碍物（Box / Sphere / Cylinder）用于碰撞检测

- 导入 / 导出场景

- MoveIt 会自动避开障碍物进行规划

#### Stored States 标签

- 保存常用的机械臂姿态

- 默认姿态：`open`、`zero`、`extended`、`rest`

### 4.2  基本操作流程

#### 方式 A：交互式拖动（推荐）

1. 在 3D 视图中找到机械臂末端的**交互式标记**（彩色箭头和圆环）

2. 拖动箭头平移末端位置，拖动圆环旋转朝向

3. 系统自动求解 IK，实时更新关节角度

4. 点击 **Plan** 查看规划轨迹（橙色）

5. 确认后点击 **Execute** 执行

> 如果拖动时卡顿，建议先从 `rest` 预设姿态出发再拖动。
> 
> 

#### 方式 B：预设姿态

1. **Query Goal State** 下拉菜单 → 选择 `open` / `extended` / `rest` 等

2. 点击 **Update**

3. 点击 **Plan**

4. 点击 **Execute**

#### 方式 C：手动设置关节角度

1. **Query Goal State** → **Joints** 标签

2. 拖动各关节滑块设置目标角度

3. 关节范围参考：

1. 点击 **Update**

2. 点击 **Plan**

3. 点击 **Execute**

#### 方式 D：随机有效目标

点击 **Random Valid** 按钮自动生成一个可达的随机姿态，然后 Plan → Execute。

### 4.3  安全注意事项

1. **首次使用降低速度**：Velocity / Acceleration 设为 0.1–0.3

2. **紧急停止**：随时 Ctrl+C 终止程序，或断开电源

3. **关节限位**：MoveIt 不会规划超出 `joint_limits.yaml` 的范围，但需确保配置正确

4. **真实硬件**：执行前确保机械臂周围有足够空间

### MoveIt 配置概览

---

## Gazebo 仿真

Gazebo 仿真需要**同时运行 4 个终端**。请严格按顺序执行。

### 5.1  启动 Gazebo 仿真  （终端 1）

```Bash
#  终端 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py
```

等待 Gazebo 窗口出现，机器人在空中短暂停留后落地。

### 5.2  加载轨迹控制器  （终端 2）

Gazebo 默认只激活 `forward_position_controller`，需要手工切换到
`joint_trajectory_controller`：

```Markdown
#  终端 2
source ~/so101_ws/install/setup.bash

# 步骤 A — 关掉 forward_position_controller
ros2 control set_controller_state forward_position_controller inactive

# 步骤 B — 用 spawner 加载并激活 joint_trajectory_controller
ros2 run controller_manager spawner joint_trajectory_controller

# 步骤 C — 验证
ros2 control list_controllers
```

期望输出：

```Bash
forward_position_controller  inactive
joint_state_broadcaster      active
joint_trajectory_controller  active
```

⚠️ 不要先用 `ros2 control load_controller`！它会将控制器置为
`unconfigured` 状态，导致 spawner 无法激活。如果已经执行了，先
`unload_controller` 重新来。

### 5.3  启动 move_group  （终端 3）

```Bash
#  终端 3
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py use_sim_time:=True
```

### 5.4  启动 RViz  （终端 4）

```Bash
#  终端 4
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

RViz 就绪后：

1. **Planning Group → manipulator**

2. **Goal State → open**（或 `extended`、`rest`）

3. 依次点击 **Plan** 和 **Execute**

Gazebo 中的臂关节会跟随运动。

**注意**：由于 `gz_ros2_control` Humble 版本的 PID 增益限制，
夹爪在 Gazebo 中可能不会物理张开（执行日志仍显示成功）。
Mock 模式和真实硬件无此问题。

### 5.5  无头模式（无 GUI）

```Bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py \
  gazebo_gui:=false \
  launch_rviz:=false
```

### 5.6  排错：反复加载失败时

如果 spawner 一直报 `Failed to activate controller`，执行以下步骤彻底重置：

```Bash
# 1. 卸掉卡住的控制器
ros2 control unload_controller joint_trajectory_controller

# 2. 关掉 forward_position_controller
ros2 control set_controller_state forward_position_controller inactive

# 3. 重新 spawn
ros2 run controller_manager spawner joint_trajectory_controller
```

## 真实硬件

前提：已组装 SO-ARM101 机械臂，舵机驱动板通过 USB 连接到电脑。

### 6.1  启动控制器（可跳过）

```Bash
#  终端 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

`so_arm_hardware` 插件会自动完成：

1. 打开串口

2. 扫描 6 个舵机 ID（1–6）

3. 验证每个舵机均响应

4. 使能力矩并读取当前位置

控制器就绪后，另开两个终端启动 MoveIt：

```Bash
#  终端 2 — move_group
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py
```

```Bash
#  终端 3 — RViz
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

### 6.2  MoveIt（一键式启动）

> 以下命令**替代** 6.1（不要同时运行，停止运行6.1的命令）——`demo.launch.py` 内部已包含控制器栈。
> 
> 

```Bash
#  终端 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

### 6.3  串口排错

### 6.4  RViz 显示与实际姿态不一致

如果 RViz 中机械臂姿态与真实硬件不一致（例如关节偏移、误报碰撞）：

1. 确认舵机已完成中位校准

2. 在 `so_arm101.ros2_control.xacro` 中调整各关节的 `position_offset`

3. 换算公式：`新 offset = 当前 offset + (当前显示 rad / 0.00153398)`

4. 修改后重新编译 `so_arm101_description` 包

---

## 常见问题

### Q1：编译时报 "package not found"

**A**：确保已正确安装所有系统依赖并 source 了 ROS 2 环境：

```Bash
source /opt/ros/humble/setup.bash
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
```

### Q2：启动时提示 "Permission denied" 访问串口

**A**：检查串口权限：

```Bash
# 临时解决
sudo chmod 666 /dev/ttyACM0

# 永久解决（注销后生效）
sudo usermod -a -G dialout $USER
```

### Q3：MoveIt 规划失败，提示 "Motion planning start tree could not be initialized"

**A**：通常有两个原因：

1. **关节超出限位** — 检查日志中 `FixStartStateBounds` 的输出。当前容差为
0.3 rad，如果超出量在此范围内会通过。否则需调整 `start_state_max_bounds_error`
或检查舵机偏移量。

2. **起始状态碰撞** — 检查日志中 `FixStartStateCollision` 的输出。如果
"Unable to find a valid state nearby"，说明当前姿态存在自碰撞。
机械臂可能处于折叠姿态（如 gripper 碰到 shoulder），或偏移量不正确。
调整 `position_offset` 后再试。

### Q4：Execute 后机械臂不动

**A**：检查控制器状态：

```Bash
ros2 control list_controllers
```

确保 `joint_trajectory_controller` 处于 `active` 状态。如果不是，重新 spawn：

```Bash
ros2 run controller_manager spawner joint_trajectory_controller
```

### Q5：RViz 启动慢或卡住

**A**：正常现象。MoveIt 启动时会加载 URDF 模型、碰撞检测插件、
运动学求解器等，首次启动约需要 10 秒。

### Q6：规划的路径不平滑或抖动

**A**：尝试以下方法：

- 切换到不同规划器（RViz 中 Planner 下拉菜单选 `RRTConnect`）

- 增加 Planning Time 到 10 秒

- 确认目标在工作空间内（使用 `Random Valid` 测试）

### Q7：Gazebo 中夹爪不动

**A**：这是 `gz_ros2_control` Humble 版本的 PID 增益硬编码限制
（固定在 0.1），无法通过 URDF 参数覆盖。日志中 Execute 显示成功，
但 Gazebo 物理模拟中夹爪不会张开。Mock 模式和真实硬件无此问题。

## 附：启动参数速查

### `controllers_bringup.launch.py`

### `so_arm_gz_bringup.launch.py`

---

## 目录布局

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
