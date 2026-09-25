---
title: "SO-ARM101机械臂 7轴 教程"
description: "7 轴课程运行前必读：核对 7 个舵机与关节的对应关系，了解 6 舵机版本数据与模型均不兼容，并选好适配 7DOF 的文件替换方案。"
---

# SO\-ARM101机械臂 7轴 教程

# SO\-ARM101 7\-DOF · 运行前准备

> 本说明面向把 **SO\-ARM101 从 6 舵机改造成 7 舵机** 后，用 LeRobot 跑完整流程（标定 → 录制 → 训练 → 部署）的人。
> 对应代码：本仓库（`lerobot-7dof`），它是对官方 lerobot 的 fork，仅改了 SO 相关电机配置。
> 
> 

---

## 0\. 先确认你的机械臂

7 舵机（全部 STS3215），舵机 ID 与关节对应关系：

|**舵机 ID**|**关节名**|**说明**|
|---|---|---|
|1|`shoulder_pan`|肩部水平旋转|
|2|`shoulder_lift`|肩部抬升|
|3|`elbow_flex`|肘部弯曲|
|4|`wrist_flex`|腕部俯仰（上下弯曲）|
|5|`wrist_yaw`|腕部偏航（左右旋转约 90°）· **本次新增的舵机**（插在原 4、5 号之间）|
|6|`wrist_roll`|腕部滚动 · 原 5 号滚动电机，ID 5→6，打印件未改、名字不变|
|7|`gripper`|夹爪 · 原 ID=6，改动后顺延到 7|

关节数据顺序（录制后 Parquet 里 `action` / `observation.state` 的关节维顺序）：
`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`。

⚠️ 注意：**6 舵机版本的数据、标定文件、已训练模型都与本仓库不兼容**，必须按下面重新做一遍。

---

## 1\. 如果你是从官方代码仓库克隆来的，需要替换/修改哪些文件

### 方案 A：直接用本仓库代码（推荐）

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### 方案 B：在官方 lerobot git clone 后手动替换

从本仓库覆盖官方 clone 的**3 个文件**：

|本仓库文件（源）|覆盖到（目标）|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|官方 clone 同名文件|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|官方 clone 同名文件|
|`src/lerobot/robots/so_follower/robot_kinematic_processor.py`|官方 clone 同名文件（**仅注释修正**，功能不影响，可不换）|

```Bash
cp src/lerobot/robots/so_follower/so_follower.py          <官方clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <官方clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> 前提：你的官方 clone 与本仓库基线（lerobot 2026\-08 版本）结构一致。若版本差距大，**不要整文件覆盖**，改为按下面“手动修改”两处即可。
> 
> 

### 版本不一致时的手动修改（只改两处）

**① 电机字典**（`so_follower.py` 和 `so_leader.py` 各一份，内容相同）——把原来的

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

改成

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # 新增舵机，左右旋转
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # 原 5 号滚动电机，ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② 标定逻辑**（两文件各自的 `calibrate()`）——去掉“整圈关节”特判：把

```Python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

替换为一行，改为记录全部关节的真实范围：

```Python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

> 为什么：原版把 `wrist_roll`（绕前臂轴滚动）当作可整圈（0\~4095）转动的关节硬编码全范围。7\-DOF 改造后 5/6 号腕关节（yaw / roll）**都被机械限位、无法整圈**，硬设整圈会让代码把关节命令发到机械上到不了的角度，有损坏风险。现在标定时每个电机都手动记录实际 min/max。
> 
> 

### 双从臂 说明

`bi_so_follower / bi_so_leader（src/lerobot/robots/bi_so_follower/、src/lerobot/teleoperators/bi_so_leader/）只是把单臂包一层加 left_/right_ 前缀，`**`不含电机定义`**`。只要`**`上面的单臂文件`**`改好，双臂命令（--robot.type=bi_so_follower）自动就是 7-DOF。`

## 1. 安装 LeRobot 环境

- [Ubuntu电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
- [Windows电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
- [MAC电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)

## 2. 替换文件（适配7DOF）

- [替换文件（适配7DOF）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)

## 3. 查看串口设备端口号

- [Ubuntu](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
- [Windows电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
- [MAC电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)

## 4. 校准机械臂

- [Ubuntu电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
- [Windows电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
- [Mac电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)

## 5. 遥操作

- [Ubuntu电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
- [Windows电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
- [Mac电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)

## 6. 连接摄像头的遥操作

- [Ubuntu电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
- [Windows电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
- [Mac电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)

## 7. 采集数据集(真机)

- [回看、回放数据集](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
- [采集数据集注意事项](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
- [注册Hugging Face账号（可选）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
- [上传数据集到HuggingFace（可选）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
- [示教采集数据集-握手200](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
- [示教采集数据集](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)

## 8. 训练模型

- [云GPU训练环境配置](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
- [训练命令行-ACT（推荐入门）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
- [训练命令行-Diffusion](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
- [训练命令行-pi0.5](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
- [训练命令行-pi0（效果最好）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
- [训练命令行-pi0fast](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
- [训练命令行-smolvla（推荐进阶）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
- [上传模型到HuggingFace（可选）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
- [LeRobot支持的模仿学习算法](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
- [本地Ubuntu训练](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
- [获得模型权重文件](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
- [训练参数建议](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
- [wandb查看实时训练曲线](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)

## 9. 模型推理

- [命令行说明](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
- [推理命令行-ACT](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
- [推理命令行-Diffusion](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
- [推理命令行-pi0.5](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
- [推理命令行-pi0](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
- [推理命令行-smolvla](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
- [常见Bug及解决](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
- [英伟达DGX Spark推理](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
- [地瓜机器人 RDK S100推理](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)
