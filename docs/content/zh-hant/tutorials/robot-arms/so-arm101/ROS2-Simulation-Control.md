---
title: "ROS2 模擬控制"
description: "本頁介紹 SO-ARM101 的 ROS 2 工作區，涵蓋機器人描述、硬體驅動、Gazebo 模擬與 MoveIt 2 運動規劃。"
---

# ROS2 模擬控制

[SO-ARM101_ROS2.zip](/downloads/SO-ARM101_ROS2.zip)

SO-ARM101 六自由度機械臂的完整 ROS 2 工作區，涵蓋機器人描述、內置硬件驅動、Gazebo 仿真和 MoveIt 2 運動規劃。

SO-ARM101 是 [TheRobotStudio](https://www.therobotstudio.com/)與 [LeRobot](https://huggingface.co/lerobot) 社區聯合設計的第二代開源從臂，使用六個 STS3215 舵機、舵機驅動板和 3D 列印 PLA+ 零件。

**注意：****機械臂需要中位校準，所有關節處於可轉動範圍中間位置時進行中位校準**

## 包結構

目標平臺：**ROS 2 Humble / Jazzy**。

---

## ROS2環境準備

在編譯本項目之前，確保系統已安裝 ROS 2 和相關組件。

### 系統要求

- Ubuntu 22.04（推薦）或 24.04

- 至少 4 GB 記憶體

- 真實硬件模式需要 USB 串口

### 0.1  安裝 ROS 2 Humble

```Bash
# 設定 locale
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# 添加 ROS 2 軟件源
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# 安裝 ROS 2 Humble Desktop
sudo apt update
sudo apt install ros-humble-desktop
```

### 0.2  安裝編譯工具與依賴

```Bash
# colcon 編譯工具
sudo apt install python3-colcon-common-extensions

# MoveIt 2
sudo apt install ros-humble-moveit

# ros2_control
sudo apt install ros-humble-ros2-control \
                 ros-humble-ros2-controllers \
                 ros-humble-controller-manager \
                 ros-humble-joint-state-publisher-gui
```

### 0.3  設定環境變量

```Bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### 0.4  設定串口權限（真實硬件必需）

**永久設定（推薦）**：

```Bash
sudo usermod -a -G dialout $USER
# 註銷後重新登錄生效
```

**臨時設定（每次重啟後需要重新執行）**：

```Bash
sudo chmod 666 /dev/ttyACM0
```

## 安裝工作區環境

```Markdown
# 第 1 步  建立工作區
mkdir -p ~/so101_ws/src
cd ~/so101_ws/src

# 第 2 步  把源碼放進去
cp -r /path/to/SO-ARM101_ROS2 ./

# 第 3 步  安裝系統依賴
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y

# 第 4 步  編譯所有包
colcon build --symlink-install

# 第 5 步  載入環境  ← 每個新終端都要執行
source install/setup.bash
```

**真實硬件說明** — `so_arm_hardware` 包已內置。無需安裝額外驅動，
它通過串口使用 SCS 協定直接與 STS3215 舵機通信。

## 可視化驗證

從這裡開始最簡單——不需要控制器，不需要硬件。

```Bash
#  終端 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description view_description.launch.py rviz:=true
```

RViz 會顯示完整的機器人模型，拖動滑塊可驗證各關節運動是否正確。

---

## 控制器測試（虛擬硬件 / Mock 模式）

仍然不需要真實機器人，全部在記憶體中運行。

```Bash
#  終端 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py
```

等日誌出現後說明就緒：

```Bash
joint_state_broadcaster      → active
joint_trajectory_controller  → active
```

**注意**：模擬模式只啟動兩個控制器（`joint_state_broadcaster` 和
`joint_trajectory_controller`）。`gripper_controller` 已移除，夾爪
由 `joint_trajectory_controller` 統一控制全部 6 個關節。

### 控制器職責

## MoveIt 運動規劃（Mock 硬件）

**只需一個終端** — MoveIt 內部自動啟動控制器棧。

```Bash
#  終端 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py
```

RViz 視窗打開後：

1. 在 **MotionPlanning** 面板中，**Planning Group → manipulator**

2. **Start State → ****`<current>`**，**Goal State → extended**

3. 依次點擊 **Plan** 和 **Execute**

可用的預設姿態：`open`、`zero`、`extended`、`rest`。

### 4.1  MoveIt 介面詳解

RViz 啟動後左側會顯示 **MotionPlanning** 面板，包含以下主要標籤：

#### Planning 標籤

#### 規劃參數

> **首次測試建議**：將 Velocity 和 Acceleration 設為 0.3，降低運動速度確保安全。
> 
> 

#### Scene Objects 標籤

- 添加障礙物（Box / Sphere / Cylinder）用於碰撞檢測

- 導入 / 導出場景

- MoveIt 會自動避開障礙物進行規劃

#### Stored States 標籤

- 儲存常用的機械臂姿態

- 預設姿態：`open`、`zero`、`extended`、`rest`

### 4.2  基本操作流程

#### 方式 A：交互式拖動（推薦）

1. 在 3D 視圖中找到機械臂末端的**交互式標記**（彩色箭頭和圓環）

2. 拖動箭頭平移末端位置，拖動圓環旋轉朝向

3. 系統自動求解 IK，實時更新關節角度

4. 點擊 **Plan** 查看規劃軌跡（橙色）

5. 確認後點擊 **Execute** 執行

> 如果拖動時卡頓，建議先從 `rest` 預設姿態出發再拖動。
> 
> 

#### 方式 B：預設姿態

1. **Query Goal State** 下拉選單 → 選擇 `open` / `extended` / `rest` 等

2. 點擊 **Update**

3. 點擊 **Plan**

4. 點擊 **Execute**

#### 方式 C：手動設定關節角度

1. **Query Goal State** → **Joints** 標籤

2. 拖動各關節滑塊設定目標角度

3. 關節範圍參考：

1. 點擊 **Update**

2. 點擊 **Plan**

3. 點擊 **Execute**

#### 方式 D：隨機有效目標

點擊 **Random Valid** 按鈕自動生成一個可達的隨機姿態，然後 Plan → Execute。

### 4.3  安全注意事項

1. **首次使用降低速度**：Velocity / Acceleration 設為 0.1–0.3

2. **緊急停止**：隨時 Ctrl+C 終止程式，或斷開電源

3. **關節限位**：MoveIt 不會規劃超出 `joint_limits.yaml` 的範圍，但需確保配置正確

4. **真實硬件**：執行前確保機械臂周圍有足夠空間

### MoveIt 配置概覽

---

## Gazebo 仿真

Gazebo 仿真需要**同時運行 4 個終端**。請嚴格按順序執行。

### 5.1  啟動 Gazebo 仿真  （終端 1）

```Bash
#  終端 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py
```

等待 Gazebo 視窗出現，機器人在空中短暫停留後落地。

### 5.2  載入軌跡控制器  （終端 2）

Gazebo 預設只激活 `forward_position_controller`，需要手工切換到
`joint_trajectory_controller`：

```Markdown
#  終端 2
source ~/so101_ws/install/setup.bash

# 步驟 A — 關掉 forward_position_controller
ros2 control set_controller_state forward_position_controller inactive

# 步驟 B — 用 spawner 載入並激活 joint_trajectory_controller
ros2 run controller_manager spawner joint_trajectory_controller

# 步驟 C — 驗證
ros2 control list_controllers
```

期望輸出：

```Bash
forward_position_controller  inactive
joint_state_broadcaster      active
joint_trajectory_controller  active
```

⚠️ 不要先用 `ros2 control load_controller`！它會將控制器置為
`unconfigured` 狀態，導致 spawner 無法激活。如果已經執行了，先
`unload_controller` 重新來。

### 5.3  啟動 move_group  （終端 3）

```Bash
#  終端 3
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py use_sim_time:=True
```

### 5.4  啟動 RViz  （終端 4）

```Bash
#  終端 4
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

RViz 就緒後：

1. **Planning Group → manipulator**

2. **Goal State → open**（或 `extended`、`rest`）

3. 依次點擊 **Plan** 和 **Execute**

Gazebo 中的臂關節會跟隨運動。

**注意**：由於 `gz_ros2_control` Humble 版本的 PID 增益限制，
夾爪在 Gazebo 中可能不會物理張開（執行日誌仍顯示成功）。
Mock 模式和真實硬件無此問題。

### 5.5  無頭模式（無 GUI）

```Bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py \
  gazebo_gui:=false \
  launch_rviz:=false
```

### 5.6  排錯：反覆載入失敗時

如果 spawner 一直報 `Failed to activate controller`，執行以下步驟徹底重置：

```Bash
# 1. 卸掉卡住的控制器
ros2 control unload_controller joint_trajectory_controller

# 2. 關掉 forward_position_controller
ros2 control set_controller_state forward_position_controller inactive

# 3. 重新 spawn
ros2 run controller_manager spawner joint_trajectory_controller
```

## 真實硬件

前提：已組裝 SO-ARM101 機械臂，舵機驅動板通過 USB 連接到電腦。

### 6.1  啟動控制器（可跳過）

```Bash
#  終端 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

`so_arm_hardware` 插件會自動完成：

1. 打開串口

2. 掃描 6 個舵機 ID（1–6）

3. 驗證每個舵機均回應

4. 使能力矩並讀取當前位置

控制器就緒後，另開兩個終端啟動 MoveIt：

```Bash
#  終端 2 — move_group
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py
```

```Bash
#  終端 3 — RViz
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

### 6.2  MoveIt（一鍵式啟動）

> 以下命令**替代** 6.1（不要同時運行，停止運行6.1的命令）——`demo.launch.py` 內部已包含控制器棧。
> 
> 

```Bash
#  終端 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

### 6.3  串口排錯

### 6.4  RViz 顯示與實際姿態不一致

如果 RViz 中機械臂姿態與真實硬件不一致（例如關節偏移、誤報碰撞）：

1. 確認舵機已完成中位校準

2. 在 `so_arm101.ros2_control.xacro` 中調整各關節的 `position_offset`

3. 換算公式：`新 offset = 當前 offset + (當前顯示 rad / 0.00153398)`

4. 修改後重新編譯 `so_arm101_description` 包

---

## 常見問題

### Q1：編譯時報 "package not found"

**A**：確保已正確安裝所有系統依賴並 source 了 ROS 2 環境：

```Bash
source /opt/ros/humble/setup.bash
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
```

### Q2：啟動時提示 "Permission denied" 存取串口

**A**：檢查串口權限：

```Bash
# 臨時解決
sudo chmod 666 /dev/ttyACM0

# 永久解決（註銷後生效）
sudo usermod -a -G dialout $USER
```

### Q3：MoveIt 規劃失敗，提示 "Motion planning start tree could not be initialized"

**A**：通常有兩個原因：

1. **關節超出限位** — 檢查日誌中 `FixStartStateBounds` 的輸出。當前容差為
0.3 rad，如果超出量在此範圍內會通過。否則需調整 `start_state_max_bounds_error`
或檢查舵機偏移量。

2. **起始狀態碰撞** — 檢查日誌中 `FixStartStateCollision` 的輸出。如果
"Unable to find a valid state nearby"，說明當前姿態存在自碰撞。
機械臂可能處於摺疊姿態（如 gripper 碰到 shoulder），或偏移量不正確。
調整 `position_offset` 後再試。

### Q4：Execute 後機械臂不動

**A**：檢查控制器狀態：

```Bash
ros2 control list_controllers
```

確保 `joint_trajectory_controller` 處於 `active` 狀態。如果不是，重新 spawn：

```Bash
ros2 run controller_manager spawner joint_trajectory_controller
```

### Q5：RViz 啟動慢或卡住

**A**：正常現象。MoveIt 啟動時會載入 URDF 模型、碰撞檢測插件、
運動學求解器等，首次啟動約需要 10 秒。

### Q6：規劃的路徑不平滑或抖動

**A**：嘗試以下方法：

- 切換到不同規劃器（RViz 中 Planner 下拉選單選 `RRTConnect`）

- 增加 Planning Time 到 10 秒

- 確認目標在工作空間內（使用 `Random Valid` 測試）

### Q7：Gazebo 中夾爪不動

**A**：這是 `gz_ros2_control` Humble 版本的 PID 增益硬編碼限制
（固定在 0.1），無法通過 URDF 參數覆蓋。日誌中 Execute 顯示成功，
但 Gazebo 物理模擬中夾爪不會張開。Mock 模式和真實硬件無此問題。

## 附：啟動參數速查

### `controllers_bringup.launch.py`

### `so_arm_gz_bringup.launch.py`

---

## 目錄佈局

```Bash
SO-ARM101_ROS2/
├── so_arm_utils/                   # Python 工具庫
├── so_arm101_description/          # URDF · 控制器 · 網格 · RViz · MuJoCo
├── so_arm101_moveit_config/        # MoveIt 2 SRDF · 規劃器 · 啟動文件
├── so_arm_gz/                      # Gazebo 仿真啟動
├── so_arm_hardware/                # 內置 SCS 串口驅動（C++）
└── Simulation/                     # 原始 CAD URDF（參考保留）
```

<RelatedProducts slugs="so-arm101" />
