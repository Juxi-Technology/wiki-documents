---
title: SO-ARM101 7-DOF 改造与 LeRobot 使用教程
description: "SO-ARM101 从 6 舵机改造为 7 自由度的完整教程：舵机 ID 对照、代码改动与标定说明，并附 LeRobot 使用流程。"
---

# SO-ARM101 7-DOF 改造与 LeRobot 使用教程

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**

本教程面向把 **SO-ARM101 从 6 舵机改造成 7 舵机**后,用 LeRobot 跑完整流程(标定 → 录制 → 训练 → 部署)的用户。对应的改造版代码基于 LeRobot 官方源码复制并改造,适配 **SO-ARM101 7 自由度机械臂**(7 个 STS3215 舵机)。

**与官方 SO-101(6 舵机)的核心差异:**

| 舵机 ID | 关节名 | 官方 SO-101(6-DOF) | 说明 |
| :---: | :--- | :--- | :--- |
| 1 | `shoulder_pan` | shoulder_pan | 肩部水平旋转 |
| 2 | `shoulder_lift` | shoulder_lift | 肩部抬升 |
| 3 | `elbow_flex` | elbow_flex | 肘部弯曲 |
| 4 | `wrist_flex` | wrist_flex | 腕部俯仰(上下弯曲) |
| 5 | `wrist_yaw` | —(新增) | 腕部偏航(左右旋转约 90°),**本次新增的舵机**(插在原 4、5 号之间) |
| 6 | `wrist_roll` | wrist_roll(ID 5→6) | 腕部滚动,原 5 号滚动电机,打印件未改、名字不变 |
| 7 | `gripper` | gripper(ID 6→7) | 夹爪,原 ID=6,改动后顺延到 7 |

> ⚠️ 注意:**6 舵机版本的数据、标定文件、已训练模型都与 7-DOF 改造不兼容**,必须按本教程重新做一遍。

## 关节数据顺序

录制后 Parquet 里 `action` / `observation.state` 的关节维顺序为:

`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`

## 机械安装变化

在原来的 4 号(`wrist_flex`)和 5 号(`wrist_roll`)之间插入新增的 `wrist_yaw` 舵机及一个打印件,其后电机整体后移一位:原 5 号滚动电机 → 6 号位,夹爪 → 7 号位(这两个老电机的打印件未改动)。

## 核心代码改动

1. **电机定义改为 7 个**:新增 `wrist_yaw(5)`(左右旋转);原 `wrist_roll` 电机挪到 **ID 6**(仍是滚动、名字不变);夹爪 `gripper(6)` → `gripper(7)`。夹爪仍用 `RANGE_0_100`(0~100 开合度),其余关节用 `DEGREES`。
   - `src/lerobot/robots/so_follower/so_follower.py`
   - `src/lerobot/teleoperators/so_leader/so_leader.py`
2. **标定不再设"整圈关节"**:原代码把 `wrist_roll` 硬编码为整圈关节(0~4095);7-DOF 改造后腕部 yaw/roll 均有机械限位、无法整圈,标定时改为用 `record_ranges_of_motion()` 记录**所有**关节的真实运动范围。
   - `src/lerobot/robots/so_follower/so_follower.py`(`calibrate()`)
   - `src/lerobot/teleoperators/so_leader/so_leader.py`(`calibrate()`)

## 用改造版仓库或手动替换文件

如果你是从官方代码仓库克隆来的,需要替换/修改以下文件。

### 方案 A:直接使用改造版仓库(推荐)

直接使用已完成 7-DOF 适配的代码仓库,无需任何手动修改。

### 方案 B:在官方 lerobot git clone 后手动替换

从改造版仓库覆盖官方 clone 的**3 个文件**:

| 改造版仓库文件(源) | 覆盖到(目标) |
| :--- | :--- |
| `src/lerobot/robots/so_follower/so_follower.py` | 官方 clone 同名文件 |
| `src/lerobot/teleoperators/so_leader/so_leader.py` | 官方 clone 同名文件 |
| `src/lerobot/robots/so_follower/robot_kinematic_processor.py` | 官方 clone 同名文件(**仅注释修正**,功能不影响,可不换) |

```bash
cp src/lerobot/robots/so_follower/so_follower.py          <官方clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <官方clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> 前提:你的官方 clone 与改造版仓库基线(lerobot 2026-08 版本)结构一致。若版本差距大,**不要整文件覆盖**,改为按下面"手动修改"两处即可。

### 版本不一致时的手动修改(只改两处)

**① 电机字典**(`so_follower.py` 和 `so_leader.py` 各一份,内容相同)——把原来的

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

改成

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # 新增舵机,左右旋转
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # 原 5 号滚动电机,ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② 标定逻辑**(两文件各自的 `calibrate()`)——去掉"整圈关节"特判,把

```python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

替换为一行,改为记录全部关节的真实范围:

```python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

修改原因与风险见下节"标定注意事项"。

## 标定注意事项

- **不再有"整圈关节"**:原版官方代码把 `wrist_roll`(绕前臂轴滚动)当作可整圈(0~4095)转动的关节硬编码全范围。7-DOF 改造后,5/6 号腕关节(`wrist_yaw` / `wrist_roll`)都被机械限位、无法整圈。
- **风险说明**:如果沿用官方的整圈硬编码,代码会把关节命令发到机械上到不了的角度,有损坏风险;因此标定时改为每个电机都手动记录实际 min/max(对应上面代码修改 ②)。
- **6 舵机版本的标定文件与 7-DOF 不兼容**,改造后必须重新标定一遍。
- 双臂(双从臂)的标定与使用流程见 [SO-ARM101 双臂(双从臂)教程](./SO-ARM101-Bi-Arm-Tutorial.md)。

## 双臂(bi_so_follower)说明

`bi_so_follower` / `bi_so_leader`(`src/lerobot/robots/bi_so_follower/`、`src/lerobot/teleoperators/bi_so_leader/`)只是把单臂包一层加 `left_`/`right_` 前缀,**不含电机定义**。只要上面的单臂文件改好,双臂命令(`--robot.type=bi_so_follower`)自动就是 7-DOF。完整双臂流程(标定、遥操作、录制数据集、训练、部署)见 [SO-ARM101 双臂(双从臂)教程](./SO-ARM101-Bi-Arm-Tutorial.md)。

<RelatedProducts slugs="so-arm101" />
