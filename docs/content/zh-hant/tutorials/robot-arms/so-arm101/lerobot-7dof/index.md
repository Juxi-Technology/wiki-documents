---
title: "SO-ARM101機械臂 7軸 教程"
description: "動手跑 7-DOF 課程前，先確認舵機與關節的對應關係、搞懂與 6 舵機版本的差異，並選好替換文件的方式（方案 A 或 B）。"
---

# SO\-ARM101機械臂 7軸 教程

# SO\-ARM101 7\-DOF · 運行前準備

> 本說明面向把 **SO\-ARM101 從 6 舵機改造成 7 舵機** 後，用 LeRobot 跑完整流程（校準 → 錄製 → 訓練 → 部署）的人。
> 對應代碼：本倉庫（`lerobot-7dof`），它是對官方 lerobot 的 fork，僅改了 SO 相關電機配置。
> 
> 

---

## 0\. 先確認你的機械臂

7 舵機（全部 STS3215），舵機 ID 與關節對應關係：

|**舵機 ID**|**關節名**|**說明**|
|---|---|---|
|1|`shoulder_pan`|肩部水平旋轉|
|2|`shoulder_lift`|肩部抬升|
|3|`elbow_flex`|肘部彎曲|
|4|`wrist_flex`|腕部俯仰（上下彎曲）|
|5|`wrist_yaw`|腕部偏航（左右旋轉約 90°）· **本次新增的舵機**（插在原 4、5 號之間）|
|6|`wrist_roll`|腕部滾動 · 原 5 號滾動電機，ID 5→6，打印件未改、名字不變|
|7|`gripper`|夾爪 · 原 ID=6，改動後順延到 7|

關節數據順序（錄製後 Parquet 裏 `action` / `observation.state` 的關節維順序）：
`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`。

⚠️ 注意：**6 舵機版本的數據、校準文件、已訓練模型都與本倉庫不兼容**，必須按下面重新做一遍。

---

## 1\. 如果你是從官方代碼倉庫克隆來的，需要替換/修改哪些文件

### 方案 A：直接用本倉庫代碼（推薦）

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### 方案 B：在官方 lerobot git clone 後手動替換

從本倉庫覆蓋官方 clone 的**3 個文件**：

|本倉庫文件（源）|覆蓋到（目標）|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|官方 clone 同名文件|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|官方 clone 同名文件|
|`src/lerobot/robots/so_follower/robot_kinematic_processor.py`|官方 clone 同名文件（**僅註釋修正**，功能不影響，可不換）|

```Bash
cp src/lerobot/robots/so_follower/so_follower.py          <官方clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <官方clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> 前提：你的官方 clone 與本倉庫基線（lerobot 2026\-08 版本）結構一致。若版本差距大，**不要整文件覆蓋**，改為按下面“手動修改”兩處即可。
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

`bi_so_follower / bi_so_leader（src/lerobot/robots/bi_so_follower/、src/lerobot/teleoperators/bi_so_leader/）只是把單臂包一層加 left_/right_ 前綴，`**`不含電機定義`**`。只要`**`上面的單臂文件`**`改好，雙臂命令（--robot.type=bi_so_follower）自動就是 7-DOF。`

## 1. 安裝 LeRobot 環境

- [Ubuntu電腦](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
- [Windows電腦](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
- [MAC電腦](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)

## 2. 替換文件（適配7DOF）

- [替換文件（適配7DOF）](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)

## 3. 查看串列埠編號

- [Ubuntu](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
- [Windows電腦](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
- [MAC電腦](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)

## 4. 校準機械臂

- [Ubuntu電腦](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
- [Windows電腦](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
- [Mac電腦](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)

## 5. 遙操作

- [Ubuntu電腦](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
- [Windows電腦](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
- [Mac電腦](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)

## 6. 連接攝像頭的遙操作

- [Ubuntu電腦](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
- [Windows電腦](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
- [Mac電腦](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)

## 7. 採集數據集(實機)

- [回看、回放數據集](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
- [採集數據集注意事項](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
- [註冊Hugging Face賬號（可選）](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
- [上傳數據集到HuggingFace（可選）](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
- [示教採集數據集-握手200](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
- [示教採集數據集](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)

## 8. 訓練模型

- [雲GPU訓練環境配置](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
- [訓練命令行-ACT（推薦入門）](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
- [訓練命令行-Diffusion](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
- [訓練命令行-pi0.5](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
- [訓練命令行-pi0（效果最好）](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
- [訓練命令行-pi0fast](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
- [訓練命令行-smolvla（推薦進階）](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
- [上傳模型到HuggingFace（可選）](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
- [LeRobot支持的模仿學習算法](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
- [本地Ubuntu訓練](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
- [獲得模型權重文件](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
- [訓練參數建議](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
- [wandb查看實時訓練曲線](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)

## 9. 模型推論

- [命令行說明](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
- [推理命令行-ACT](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
- [推理命令行-Diffusion](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
- [推理命令行-pi0.5](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
- [推理命令行-pi0](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
- [推理命令行-smolvla](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
- [常見Bug及解決](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
- [英偉達DGX Spark推理](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
- [地瓜機器人 RDK S100推理](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)
