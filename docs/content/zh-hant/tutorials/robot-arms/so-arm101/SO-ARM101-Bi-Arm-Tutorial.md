---
title: SO-ARM101 雙臂(雙從動臂)教程
description: "介紹 SO-ARM101 雙臂(雙從動臂)系統的完整流程:硬體接線與校準、雙臂遙操作、數據集錄製與管理、ACT 策略訓練以及真實機器人部署。"
---

# SO-ARM101 雙臂(雙從動臂)教程

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**

本指南介紹如何使用 LeRobot 訓練雙臂 SO-ARM 機器人系統的完整流程,包括硬體連接、雙臂校準、雙臂遙操作、數據集錄製與管理、ACT 策略訓練以及真實機器人部署。按照本指南操作,你可以使用兩個主動臂和兩個從動臂採集示教數據,訓練模仿學習策略,並在真實機械臂上運行。

首先,按如下進行插線:

| 角色 | 端口 |
| --- | --- |
| 左從動臂 | `/dev/ttyACM0` |
| 右從動臂 | `/dev/ttyACM1` |
| 左主動臂 | `/dev/ttyACM2` |
| 右主動臂 | `/dev/ttyACM3` |

從動臂類型為 `so101_follower`,主動臂類型為 `so101_leader`(LeRobot 中 `so100_leader` 和 `so101_leader` 共用同一實現)。

## 前置準備

### 安裝依賴

環境安裝請參考 [SO-ARM101 使用教程](./SO-ARM101-Tutorial.md)。

### USB 權限

```bash
sudo chmod 666 /dev/ttyACM0 /dev/ttyACM1 /dev/ttyACM2 /dev/ttyACM3
```

## 1. 校準(關鍵步驟)

### 1.1 校準左從動臂

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_so101_bi_follower_left
```

### 1.2 校準右從動臂

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower_right
```

### 1.3 校準左主動臂

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM2 \
  --teleop.id=my_so101_bi_leader_left
```

### 1.4 校準右主動臂

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader_right
```

校準完成後,文件會保存在:

```text
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_left.json
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_right.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_left.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_right.json
```

> 目錄名說明:`so101_follower` 與 `so100_follower`、`so101_leader` 與 `so100_leader` 共用同一實現,因此目錄統一為 `so_follower` / `so_leader`;主動臂屬於 teleoperator,校準文件在 `teleoperators/` 下而不是 `robots/`。

### (可選)如果之前已用其他 ID 校準過

比如你之前用的是 `my_awesome_follower_arm1`、`my_awesome_follower_arm2` 等,可以複製校準文件:

```bash
CAL_DIR=~/.cache/huggingface/lerobot/calibration

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm1.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_left.json

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm2.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_right.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm3.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_left.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm4.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_right.json
```

## 2. 雙臂遙操作

### 2.1 不帶攝像頭

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### 2.2 帶攝像頭

可用 `lerobot-find-cameras opencv` 查看攝像頭索引,同時可自行添加或減少攝像頭。

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### 安全提示

- 注意周圍環境,避免從動臂碰撞。

## 3. 錄製數據集

### 3.1 保存到本地(不上傳 Hub)

添加 `--dataset.root`(數據寫到該目錄)和 `--dataset.push_to_hub=false`,並加 `--dataset.no_stamp=true` 保持數據集名穩定(否則 `repo_id` 會被自動追加時間戳,後續續錄/回放/訓練都會找不到它)。

> 注意:`repo_id` 建議包含 `/`(形如 `用戶名/數據集名`),本地數據集不會真的上傳。

```bash
lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> 視頻編碼默認已是 `libsvtav1`,無需指定;如需自定義,用 `--dataset.rgb_encoder.vcodec=h264` 這類嵌套參數。

數據會保存在 `./datasets/bi_so101_task/`,結構為:

```text
├── meta/
│   ├── info.json         # 數據集信息(fps、特徵形狀等)
│   ├── episodes/         # 每集的元數據(chunk-000/...)
│   ├── stats.json        # 各特徵歸一化統計
│   └── tasks.parquet     # 任務文本 → task_index
├── data/                 # 每幀特徵數據(chunk-*.parquet)
└── videos/               # 每個攝像頭一個子目錄(chunk-*.mp4)
```

### 3.2 上傳到 Hugging Face Hub

如果你希望自動上傳,保留 `HF_USER` 並去掉 `root` 和 `push_to_hub=false`(默認會上傳)。端口和攝像頭索引請與接線表保持一致:

```bash
export HF_USER=your_hf_username

lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> 上傳後的 Hub 倉庫名即為 `${HF_USER}/bi_so101_task`,與下方 4.2 從 Hub 訓練所用的 `repo_id` 一致。本地副本會先存到 `~/.cache/huggingface/lerobot/${HF_USER}/bi_so101_task/`。

### 3.3 繼續採集(斷點續錄)

如果錄製過程中意外退出(例如按右鍵退出時處於 reset 階段),或者想分多次完成採集,可以使用 `--resume` 繼續往同一個數據集追加 episode。

**注意**:

- 必須加 `--resume=true`,否則 `LeRobotDataset.create()` 會因為目錄已存在而報錯。
- 續錄命令的 `--dataset.root` 和 `--dataset.repo_id` 必須與首次錄製(3.1)完全一致(`resume` 強制要求顯式 `root`)。
- `--dataset.num_episodes` 是指**本次要錄多少條**,不是總目標。例如已錄 15 條,想湊夠 50 條,就寫 `35`。
- 退出時盡量在 episode 錄製過程中或自然結束後再退出,避免在 "Reset the environment" 階段退出(會導致空 episode 保存失敗)。

```bash
lerobot-record \
  --resume=true \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=35 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

### 3.4 回放與刪除 episode

#### 回放指定 episode

```bash
lerobot-replay \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.episode=24
```

> `episode` 是 0-based 索引,`24` 表示第 25 條 episode。

#### 刪除指定 episode

```bash
python -m lerobot.scripts.lerobot_edit_dataset \
  --repo_id=juxi/bi_so101_task \
  --root=./datasets/bi_so101_task \
  --operation.type=delete_episodes \
  --operation.episode_indices="[24]"
```

刪除後會原地重寫數據集,原數據會備份到 `./datasets/bi_so101_task_old/`。確認新數據集無誤後,可以手動刪除備份:

```bash
rm -rf ./datasets/bi_so101_task_old
```

#### 刪除整條數據集

```bash
rm -rf ./datasets/bi_so101_task
```

## 4. ACT 訓練

### 4.1 從本地數據集訓練

```bash
lerobot-train \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=60000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> `--dataset.root` 指向 3.1 錄製的數據集目錄(`repo_id` 要與錄製時一致)。若 `--output_dir` 目錄已存在,會直接報 `FileExistsError`,請換一個新的輸出目錄或加 `--resume=true` 續訓。

### 4.2 從 Hugging Face Hub 訓練

```bash
export HF_USER=your_hf_username

lerobot-train \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=100000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> 上面使用了 ACT 的默認參數(`chunk_size=100`、`dim_model=512` 等)。

> `repo_id` 須與 3.2 上傳時的倉庫名一致(3.2 已加 `--dataset.no_stamp=true`,倉庫名固定為 `${HF_USER}/bi_so101_task`)。訓練時無需 `--dataset.root`,會自動從 Hub 下載。

## 5. 真實機器人部署

> 注意:`lerobot-record` 只用於採集示教數據。部署訓練好的策略請用 `lerobot-rollout`——當前版本 `lerobot-record` 不再接受 `--policy.path`,也會拒絕 `eval_` 前綴的數據集名。

### 5.1 現場評估(不錄製數據)

```bash
lerobot-rollout \
  --strategy.type=base \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --task="Pick the cube with left arm and hand it to right arm" \
  --duration=60 \
  --display_data=true
```

- `--duration` 為運行秒數,`0` 表示不限時。
- 如需中途接管/停止,加 `--interactive=true`,在終端用 `/stop`、`/reset` 等命令控制。

### 5.2 評估並錄製數據(本地)

用 `episodic` 策略(行為類似舊版 `lerobot-record`,按 episode 錄製並帶 reset 階段):

```bash
lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=juxi/rollout_bi_so101_task \
  --dataset.root=./datasets/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

> 部署數據集名必須以 `rollout_` 開頭(當前版本的強制約定)。錄製到本地時建議加 `--dataset.root` 和 `--dataset.no_stamp=true`,避免目錄名被追加時間戳。

### 5.3 評估數據上傳到 Hugging Face Hub

```bash
export HF_USER=your_hf_username

lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=${HF_USER}/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

## 6. 常見問題

| 問題 | 原因 | 解決方案 |
| --- | --- | --- |
| 遙操時提示重新校準 | `bi_so_follower` 找不到 `_left` / `_right` 後綴的校準文件 | 用帶 `_left` / `_right` 的 ID 重新校準,或複製已有校準文件 |
| 主動臂無法拖動 | leader 扭矩未關閉 | 重新校準或檢查電機 |
| 繼續採集時報目錄已存在 | 未加 `--resume=true` | 在 `lerobot-record` 命令中添加 `--resume=true` |
| `--resume=true` 時報錯要求 `root` | 續錄必須顯式指定數據集目錄 | 續錄命令添加 `--dataset.root=./datasets/bi_so101_task`,且與首次錄製保持一致 |
| 數據集目錄名多出時間戳,回放/訓練找不到 | 錄製時未設置 `no_stamp`,`repo_id` 被自動追加時間戳 | 錄製/續錄時添加 `--dataset.no_stamp=true` |
| `--dataset.vcodec=...` 報參數不存在 | 舊版參數,當前視頻編碼參數已改為嵌套 | 改用 `--dataset.rgb_encoder.vcodec=h264`(默認已是 `libsvtav1`) |
| 部署時 `lerobot-record` 報 `--policy.path` / `eval_` 錯誤 | 當前版本 `lerobot-record` 已不含策略部署能力 | 部署改用 `lerobot-rollout --strategy.type=episodic`,數據集名以 `rollout_` 開頭 |
| 左右臂反了 | 端口配置錯誤 | 交換 `left_arm_config.port` 和 `right_arm_config.port` |
| 訓練時找不到數據集 | 本地數據集未指定 `root` | 訓練時添加 `--dataset.root=./datasets/xxx` |
| 數據集被自動上傳 | 未設置 `push_to_hub=false` | 錄製時添加 `--dataset.push_to_hub=false` |
| 退出時報 `You must add one or several frames before calling add_episode` | 在 reset 階段退出,當前 episode 沒有幀 | 不影響已錄數據,用 `--resume=true` 繼續採集 |

<RelatedProducts slugs="so-arm101" />
