---
title: "第二步：替換文件（適配7DOF）"
description: "把官方 lerobot 改造成 7-DOF 版本要替換哪些文件？方案 A 直接套用本倉庫代碼，方案 B 手動覆蓋 so_follower.py 與 so_leader.py；版本有差異時只需改兩處。"
---

# 第二步：替換文件（適配7DOF）

## 1\. 如果你是從官方代碼倉庫克隆來的，需要替換/修改哪些文件

### 方案 A：直接用本倉庫代碼（推薦）

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### 方案 B：在官方 lerobot git clone 後手動替換

從本倉庫覆蓋官方 clone 的**3 個文件**：

|本倉庫文件（源）|覆蓋到（目標）|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|官方 clone 同名文件|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|官方 clone 同名文件|

[so\_follower\.py](/downloads/so_follower.py)

[so\_leader\.py](/downloads/so_leader.py)

> 前提：你的官方 clone 與本倉庫基線（lerobot 2026\-09 版本）結構一致。
> 
> 若版本差距大，**不要整個文件覆蓋**，改為按下面“手動修改”兩處即可。
> 
> 

### 版本不一致時的手動修改（只改兩處）

**① 電機字典**（`so_follower.py` 和 `so_leader.py` 各一份，內容相同）——把原來的

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

改成

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # 新增舵機，左右旋轉
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # 原 5 號滾動電機，ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② 校準邏輯**（兩文件各自的 `calibrate()`）——去掉“整圈關節”特判：把

```Python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

替換為一行，改為記錄全部關節的真實範圍：

```Python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

> 為什麼：原版把 `wrist_roll`（繞前臂軸滾動）當作可整圈（0\~4095）轉動的關節硬編碼全範圍。7\-DOF 改造後 5/6 號腕關節（yaw / roll）**都被機械限位、無法整圈**，硬設整圈會讓代碼把關節命令發到機械上到不了的角度，有損壞風險。現在校準時每個電機都手動記錄實際 min/max。
> 
> 

### 雙從臂 說明

`bi_so_follower` / `bi_so_leader`（`src/lerobot/robots/bi_so_follower/`、`src/lerobot/teleoperators/bi_so_leader/`）只是把單臂包一層加 `left_`/`right_` 前綴，**不含電機定義**。只要**上面的單臂文件**改好，雙臂命令（`--robot.type=bi_so_follower`）自動就是 7\-DOF。

