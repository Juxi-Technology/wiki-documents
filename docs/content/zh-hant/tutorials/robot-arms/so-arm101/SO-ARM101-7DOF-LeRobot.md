---
title: SO-ARM101 7-DOF 改造與 LeRobot 使用教程
description: "SO-ARM101 從 6 舵機改造為 7 自由度(新增 wrist_yaw)後的舵機 ID 對照、代碼改動與替換方法、校準注意事項,以及在 LeRobot 中的使用方法。"
---

# SO-ARM101 7-DOF 改造與 LeRobot 使用教程

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**

本教程面向把 **SO-ARM101 從 6 舵機改造成 7 舵機**後,用 LeRobot 跑完整流程(校準 → 錄製 → 訓練 → 部署)的用戶。對應的改造版代碼基於 LeRobot 官方源碼複製並改造,適配 **SO-ARM101 7 自由度機械臂**(7 個 STS3215 舵機)。

**與官方 SO-101(6 舵機)的核心差異:**

| 舵機 ID | 關節名 | 官方 SO-101(6-DOF) | 說明 |
| :---: | :--- | :--- | :--- |
| 1 | `shoulder_pan` | shoulder_pan | 肩部水平旋轉 |
| 2 | `shoulder_lift` | shoulder_lift | 肩部抬升 |
| 3 | `elbow_flex` | elbow_flex | 肘部彎曲 |
| 4 | `wrist_flex` | wrist_flex | 腕部俯仰(上下彎曲) |
| 5 | `wrist_yaw` | —(新增) | 腕部偏航(左右旋轉約 90°),**本次新增的舵機**(插在原 4、5 號之間) |
| 6 | `wrist_roll` | wrist_roll(ID 5→6) | 腕部滾動,原 5 號滾動電機,打印件未改、名字不變 |
| 7 | `gripper` | gripper(ID 6→7) | 夾爪,原 ID=6,改動後順延到 7 |

> ⚠️ 注意:**6 舵機版本的數據、校準文件、已訓練模型都與 7-DOF 改造不兼容**,必須按本教程重新做一遍。

## 關節數據順序

錄製後 Parquet 裏 `action` / `observation.state` 的關節維順序為:

`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`

## 機械安裝變化

在原來的 4 號(`wrist_flex`)和 5 號(`wrist_roll`)之間插入新增的 `wrist_yaw` 舵機及一個打印件,其後電機整體後移一位:原 5 號滾動電機 → 6 號位,夾爪 → 7 號位(這兩個老電機的打印件未改動)。

## 核心代碼改動

1. **電機定義改為 7 個**:新增 `wrist_yaw(5)`(左右旋轉);原 `wrist_roll` 電機挪到 **ID 6**(仍是滾動、名字不變);夾爪 `gripper(6)` → `gripper(7)`。夾爪仍用 `RANGE_0_100`(0~100 開合度),其餘關節用 `DEGREES`。
   - `src/lerobot/robots/so_follower/so_follower.py`
   - `src/lerobot/teleoperators/so_leader/so_leader.py`
2. **校準不再設"整圈關節"**:原代碼把 `wrist_roll` 硬編碼為整圈關節(0~4095);7-DOF 改造後腕部 yaw/roll 均有機械限位、無法整圈,校準時改為用 `record_ranges_of_motion()` 記錄**所有**關節的真實運動範圍。
   - `src/lerobot/robots/so_follower/so_follower.py`(`calibrate()`)
   - `src/lerobot/teleoperators/so_leader/so_leader.py`(`calibrate()`)

## 用改造版倉庫或手動替換文件

如果你是從官方代碼倉庫克隆來的,需要替換/修改以下文件。

### 方案 A:直接使用改造版倉庫(推薦)

直接使用已完成 7-DOF 適配的代碼倉庫,無需任何手動修改。

### 方案 B:在官方 lerobot git clone 後手動替換

從改造版倉庫覆蓋官方 clone 的**3 個文件**:

| 改造版倉庫文件(源) | 覆蓋到(目標) |
| :--- | :--- |
| `src/lerobot/robots/so_follower/so_follower.py` | 官方 clone 同名文件 |
| `src/lerobot/teleoperators/so_leader/so_leader.py` | 官方 clone 同名文件 |
| `src/lerobot/robots/so_follower/robot_kinematic_processor.py` | 官方 clone 同名文件(**僅註釋修正**,功能不影響,可不換) |

```bash
cp src/lerobot/robots/so_follower/so_follower.py          <官方clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <官方clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> 前提:你的官方 clone 與改造版倉庫基線(lerobot 2026-08 版本)結構一致。若版本差距大,**不要整文件覆蓋**,改為按下面"手動修改"兩處即可。

### 版本不一致時的手動修改(只改兩處)

**① 電機字典**(`so_follower.py` 和 `so_leader.py` 各一份,內容相同)——把原來的

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

改成

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # 新增舵機,左右旋轉
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # 原 5 號滾動電機,ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② 校準邏輯**(兩文件各自的 `calibrate()`)——去掉"整圈關節"特判,把

```python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

替換為一行,改為記錄全部關節的真實範圍:

```python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

修改原因與風險見下節"校準注意事項"。

## 校準注意事項

- **不再有"整圈關節"**:原版官方代碼把 `wrist_roll`(繞前臂軸滾動)當作可整圈(0~4095)轉動的關節硬編碼全範圍。7-DOF 改造後,5/6 號腕關節(`wrist_yaw` / `wrist_roll`)都被機械限位、無法整圈。
- **風險說明**:如果沿用官方的整圈硬編碼,代碼會把關節命令發到機械上到不了的角度,有損壞風險;因此校準時改為每個電機都手動記錄實際 min/max(對應上面代碼修改 ②)。
- **6 舵機版本的校準文件與 7-DOF 不兼容**,改造後必須重新校準一遍。
- 雙臂(雙從動臂)的校準與使用流程見 [SO-ARM101 雙臂(雙從動臂)教程](./SO-ARM101-Bi-Arm-Tutorial.md)。

## 雙臂(bi_so_follower)說明

`bi_so_follower` / `bi_so_leader`(`src/lerobot/robots/bi_so_follower/`、`src/lerobot/teleoperators/bi_so_leader/`)只是把單臂包一層加 `left_`/`right_` 前綴,**不含電機定義**。只要上面的單臂文件改好,雙臂命令(`--robot.type=bi_so_follower`)自動就是 7-DOF。完整雙臂流程(校準、遙操作、錄製數據集、訓練、部署)見 [SO-ARM101 雙臂(雙從動臂)教程](./SO-ARM101-Bi-Arm-Tutorial.md)。

<RelatedProducts slugs="so-arm101" />
