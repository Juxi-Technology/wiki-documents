---
title: "ROS2 Simulation Control"
description: "A complete ROS 2 workspace for the SO-ARM101 with Gazebo simulation, MoveIt 2 motion planning, controller tests and real hardware."
---

# ROS2 Simulation Control

[SO-ARM101_ROS2.zip](/downloads/SO-ARM101_ROS2.zip)

A complete ROS 2 workspace for the SO-ARM101 six-degree-of-freedom robotic arm, covering robot description, a built-in hardware driver, Gazebo simulation, and MoveIt 2 motion planning.

The SO-ARM101 is a second-generation open-source follower arm designed jointly by [TheRobotStudio](https://www.therobotstudio.com/) and the [LeRobot](https://huggingface.co/lerobot) community, using six STS3215 servos, a servo driver board, and 3D-printed PLA+ parts.

**Note: ****the robotic arm requires center calibration; perform center calibration when all joints are at the middle of their rotatable range**

## Package Structure

Target platform: **ROS 2 Humble / Jazzy**.

---

## ROS2 Environment Preparation

Before building this project, make sure ROS 2 and the related components are installed on your system.

### System Requirements

- Ubuntu 22.04 (recommended) or 24.04

- At least 4 GB of memory

- Real-hardware mode requires a USB serial port

### 0.1  Install ROS 2 Humble

```Bash
# Set the locale
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# Add the ROS 2 software source
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Install ROS 2 Humble Desktop
sudo apt update
sudo apt install ros-humble-desktop
```

### 0.2  Install Build Tools and Dependencies

```Bash
# colcon build tool
sudo apt install python3-colcon-common-extensions

# MoveIt 2
sudo apt install ros-humble-moveit

# ros2_control
sudo apt install ros-humble-ros2-control \
                 ros-humble-ros2-controllers \
                 ros-humble-controller-manager \
                 ros-humble-joint-state-publisher-gui
```

### 0.3  Set Environment Variables

```Bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### 0.4  Set Serial Port Permissions (Required for Real Hardware)

**Permanent setup (recommended)**:

```Bash
sudo usermod -a -G dialout $USER
# Takes effect after logging out and back in
```

**Temporary setup (must be re-executed after each reboot)**:

```Bash
sudo chmod 666 /dev/ttyACM0
```

## Install the Workspace Environment

```Markdown
# Step 1  Create the workspace
mkdir -p ~/so101_ws/src
cd ~/so101_ws/src

# Step 2  Put the source code in
cp -r /path/to/SO-ARM101_ROS2 ./

# Step 3  Install system dependencies
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y

# Step 4  Build all packages
colcon build --symlink-install

# Step 5  Load the environment  ← run in every new terminal
source install/setup.bash
```

**Real-hardware note** — the `so_arm_hardware` package is built in. No additional driver installation is needed;
it communicates directly with the STS3215 servos over the serial port using the SCS protocol.

## Visualization Verification

This is the simplest place to start — no controller, no hardware needed.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description view_description.launch.py rviz:=true
```

RViz displays the complete robot model; drag the sliders to verify that each joint moves correctly.

---

## Controller Test (Virtual Hardware / Mock Mode)

Still no real robot is needed; everything runs in memory.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py
```

It is ready once the following appears in the log:

```Bash
joint_state_broadcaster      → active
joint_trajectory_controller  → active
```

**Note**: simulation mode starts only two controllers (`joint_state_broadcaster` and
`joint_trajectory_controller`). `gripper_controller` has been removed, and the gripper
is uniformly controlled by `joint_trajectory_controller` along with all 6 joints.

### Controller Responsibilities

## MoveIt Motion Planning (Mock Hardware)

**Only one terminal is needed** — MoveIt automatically starts the controller stack internally.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py
```

After the RViz window opens:

1. In the **MotionPlanning** panel, set **Planning Group → manipulator**

2. **Start State → ****`<current>`**, **Goal State → extended**

3. Click **Plan** and then **Execute**

Available preset poses: `open`, `zero`, `extended`, `rest`.

### 4.1  MoveIt Interface in Detail

After RViz starts, the **MotionPlanning** panel is shown on the left, containing the following main tabs:

#### Planning Tab

#### Planning Parameters

> **Recommendation for the first test**: set Velocity and Acceleration to 0.3 to reduce motion speed and ensure safety.
> 
> 

#### Scene Objects Tab

- Add obstacles (Box / Sphere / Cylinder) for collision detection

- Import / export the scene

- MoveIt automatically plans around obstacles

#### Stored States Tab

- Save commonly used robotic arm poses

- Default poses: `open`, `zero`, `extended`, `rest`

### 4.2  Basic Operation Workflow

#### Method A: Interactive Dragging (Recommended)

1. In the 3D view, find the **interactive markers** (colored arrows and rings) at the end of the robotic arm

2. Drag the arrows to translate the end position, and drag the rings to rotate the orientation

3. The system automatically solves IK and updates the joint angles in real time

4. Click **Plan** to view the planned trajectory (orange)

5. After confirming, click **Execute** to execute

> If dragging is laggy, it is recommended to start from the `rest` preset pose before dragging.
> 
> 

#### Method B: Preset Poses

1. **Query Goal State** dropdown menu → select `open` / `extended` / `rest`, etc.

2. Click **Update**

3. Click **Plan**

4. Click **Execute**

#### Method C: Manually Set Joint Angles

1. **Query Goal State** → **Joints** tab

2. Drag each joint slider to set the target angle

3. Joint range reference:

1. Click **Update**

2. Click **Plan**

3. Click **Execute**

#### Method D: Random Valid Goal

Click the **Random Valid** button to automatically generate a reachable random pose, then Plan → Execute.

### 4.3  Safety Notes

1. **Reduce speed on first use**: set Velocity / Acceleration to 0.1–0.3

2. **Emergency stop**: press Ctrl+C at any time to terminate the program, or cut the power

3. **Joint limits**: MoveIt will not plan beyond the range in `joint_limits.yaml`, but you must ensure the configuration is correct

4. **Real hardware**: before executing, ensure there is enough space around the robotic arm

### MoveIt Configuration Overview

---

## Gazebo Simulation

Gazebo simulation requires **4 terminals running simultaneously**. Please execute them strictly in order.

### 5.1  Start Gazebo Simulation  (Terminal 1)

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py
```

Wait for the Gazebo window to appear; the robot briefly remains in the air and then lands.

### 5.2  Load the Trajectory Controller  (Terminal 2)

By default, Gazebo activates only `forward_position_controller`; you need to manually switch to
`joint_trajectory_controller`:

```Markdown
#  Terminal 2
source ~/so101_ws/install/setup.bash

# Step A — turn off forward_position_controller
ros2 control set_controller_state forward_position_controller inactive

# Step B — use spawner to load and activate joint_trajectory_controller
ros2 run controller_manager spawner joint_trajectory_controller

# Step C — verify
ros2 control list_controllers
```

Expected output:

```Bash
forward_position_controller  inactive
joint_state_broadcaster      active
joint_trajectory_controller  active
```

⚠️ Do not use `ros2 control load_controller` first! It puts the controller into
the `unconfigured` state, preventing the spawner from activating it. If you have already done so, first
`unload_controller` and start over.

### 5.3  Start move_group  (Terminal 3)

```Bash
#  Terminal 3
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py use_sim_time:=True
```

### 5.4  Start RViz  (Terminal 4)

```Bash
#  Terminal 4
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

After RViz is ready:

1. **Planning Group → manipulator**

2. **Goal State → open** (or `extended`, `rest`)

3. Click **Plan** and then **Execute**

The arm joints in Gazebo will follow the motion.

**Note**: Due to the PID gain limitation of the `gz_ros2_control` Humble version,
the gripper may not physically open in Gazebo (the execution log still shows success).
Mock mode and real hardware do not have this problem.

### 5.5  Headless Mode (No GUI)

```Bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py \
  gazebo_gui:=false \
  launch_rviz:=false
```

### 5.6  Troubleshooting: When Loading Fails Repeatedly

If the spawner keeps reporting `Failed to activate controller`, perform the following steps for a complete reset:

```Bash
# 1. Unload the stuck controller
ros2 control unload_controller joint_trajectory_controller

# 2. Turn off forward_position_controller
ros2 control set_controller_state forward_position_controller inactive

# 3. Spawn again
ros2 run controller_manager spawner joint_trajectory_controller
```

## Real Hardware

Prerequisite: the SO-ARM101 robotic arm is assembled, and the servo driver board is connected to the computer via USB.

### 6.1  Start the Controller (Can Be Skipped)

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

The `so_arm_hardware` plugin automatically performs the following:

1. Open the serial port

2. Scan the 6 servo IDs (1–6)

3. Verify that each servo responds

4. Enable torque and read the current position

Once the controller is ready, open two more terminals to start MoveIt:

```Bash
#  Terminal 2 — move_group
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py
```

```Bash
#  Terminal 3 — RViz
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

### 6.2  MoveIt (One-Click Start)

> The following command **replaces** 6.1 (do not run both at the same time; stop the command from 6.1) — `demo.launch.py` already includes the controller stack internally.
> 
> 

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

### 6.3  Serial Port Troubleshooting

### 6.4  RViz Display Does Not Match the Actual Pose

If the robotic arm pose in RViz does not match the real hardware (for example, joint offset or false collision reports):

1. Confirm that the servos have completed center calibration

2. Adjust the `position_offset` of each joint in `so_arm101.ros2_control.xacro`

3. Conversion formula: `new offset = current offset + (currently displayed rad / 0.00153398)`

4. After modifying, rebuild the `so_arm101_description` package

---

## FAQ

### Q1: "package not found" during build

**A**: Make sure all system dependencies are correctly installed and the ROS 2 environment is sourced:

```Bash
source /opt/ros/humble/setup.bash
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
```

### Q2: "Permission denied" when accessing the serial port at startup

**A**: Check the serial port permissions:

```Bash
# Temporary fix
sudo chmod 666 /dev/ttyACM0

# Permanent fix (takes effect after logout)
sudo usermod -a -G dialout $USER
```

### Q3: MoveIt planning fails with "Motion planning start tree could not be initialized"

**A**: There are usually two reasons:

1. **Joint out of limits** — Check the output of `FixStartStateBounds` in the log. The current tolerance is
0.3 rad; if the exceedance is within this range, it will pass. Otherwise, you need to adjust `start_state_max_bounds_error`
or check the servo offsets.

2. **Start state collision** — Check the output of `FixStartStateCollision` in the log. If it reports
"Unable to find a valid state nearby", it means the current pose has self-collision.
The robotic arm may be in a folded pose (for example, the gripper touching the shoulder), or the offset is incorrect.
Adjust `position_offset` and try again.

### Q4: The robotic arm does not move after Execute

**A**: Check the controller status:

```Bash
ros2 control list_controllers
```

Make sure `joint_trajectory_controller` is in the `active` state. If not, spawn it again:

```Bash
ros2 run controller_manager spawner joint_trajectory_controller
```

### Q5: RViz starts slowly or hangs

**A**: This is normal. When MoveIt starts, it loads the URDF model, the collision detection plugin,
the kinematics solvers, etc.; the first startup takes about 10 seconds.

### Q6: The planned path is not smooth or jitters

**A**: Try the following methods:

- Switch to a different planner (select `RRTConnect` from the Planner dropdown in RViz)

- Increase Planning Time to 10 seconds

- Confirm that the goal is within the workspace (test with `Random Valid`)

### Q7: The gripper does not move in Gazebo

**A**: This is a hardcoded PID gain limitation of the `gz_ros2_control` Humble version
(fixed at 0.1) and cannot be overridden via URDF parameters. The Execute in the log shows success,
but the gripper will not open in the Gazebo physics simulation. Mock mode and real hardware do not have this problem.

## Appendix: Launch Parameter Quick Reference

### `controllers_bringup.launch.py`

### `so_arm_gz_bringup.launch.py`

---

## Directory Layout

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
