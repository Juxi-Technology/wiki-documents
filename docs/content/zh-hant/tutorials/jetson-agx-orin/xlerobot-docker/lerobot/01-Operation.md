---
title: 原版 LeRobot 執行指令
---

# 原版 LeRobot 執行指令

> **所屬**：[lerobot/](01-Operation.md) —— 單條 SO-101 / SO-100 臂、LeKiwi
> **前置**：先讀完 [deployment/](../deployment/01-Overview.md) 並進到容器裡
> **另一條路**：[xlerobot/](../xlerobot/01-Operation.md)（XLeRobot 整機）
> **下一篇**：[troubleshooting/](../troubleshooting/01-Troubleshooting.md)

用 `lerobot-*` 命令列操作**單條 SO-101 / SO-100 臂**或 **LeKiwi**。

> ⚠️ 跑 **XLeRobot 整機**請回到 [xlerobot/](../xlerobot/01-Operation.md)。
> 這些命令列工具**不支援 `xlerobot`**——原因見下面第 0 節。

---

## 0. 什麼情況走這條

| 你的硬體 | 走哪條 | 為什麼 |
|---|---|---|
| **單條 SO-101 / SO-100 臂** | ✅ **本篇**（`lerobot-*` CLI） | 原版工具直接支援 |
| **LeKiwi** | ✅ **本篇**（`lerobot-*` CLI） | 原版工具直接支援 |
| **XLeRobot 整機**（雙臂 + 底盤） | ❌ 走 [04](../xlerobot/01-Operation.md) | CLI 白名單裡沒有 `xlerobot` |

**為什麼分兩條路**：`lerobot-calibrate` 這類命令列工具在原始碼裡寫死了一份機器人匯入
清單（14 種原版機器人，完整清單見第 11 節），**裡面沒有 `xlerobot`**。硬傳會報：

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

反過來，`examples/` 下的腳本是給 XLeRobot 整機寫的，單臂用不上。

**兩條路共用同一套環境**——鏡像裡裝的套件就叫 `lerobot`，XLeRobot 只是往
`robots/` 目錄裡多放了三份程式碼。所以**隨時可以切，不用重裝任何東西**，
同一個行程裡兩者都能一起匯入。

---

## 1. 完整流程

```
準備          校準          用起來                  訓練         部署
────          ────          ──────                  ────         ────
find-port  →  calibrate  →  teleoperate  ┐
find-cameras              record        ┴→  train  →  rollout
                          replay
```

每一步一條指令，下面逐個說。

---

## 2. 準備：找串口和攝影機

```bash
lerobot-find-port          # 互動式：依提示拔插舵機線，印出串口名稱
lerobot-find-cameras opencv   # 逐個試攝影機並截圖
```

`lerobot-find-cameras` 會把截圖存到 `outputs/captured_images/`，看到畫面
就代表攝影機可用。**實測可用**（辨識 `/dev/video0` 並成功採集）。

> 兩個指令都是**互動式**的，直接加 `--help` 會出現 EOF，這是正常現象。

---

## 3. 第一次用新舵機：寫入 ID

全新的舵機出廠 ID 都是 1，必須逐個改成 1~6 才能串在同一條匯流排上：

```bash
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

它會提示你「只接一個舵機，按 Enter 鍵」，改完一個再插下一個。

> 只在新組裝、或換過舵機時才需要。已經能正常通訊的臂跳過這步。

---

## 4. 校準

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_arm
```

- **沒有校準檔案** → 進入引導：先把臂擺到行程中點按 Enter 鍵，再逐個關節走完整行程
- **已有校準檔案** → 問你是恢復還是重新校準

校準檔案在 `~/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_arm.json`。
**容器啟動時掛載了 `-v ~/.cache/huggingface`**（見 [03-Deployment](../deployment/03-Deployment.md)），
所以重開容器不會遺失。

主從臂的話，從臂和主臂**各校準一次**：

```bash
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower
lerobot-calibrate --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

---

## 5. 遙操作

### 用主臂帶著從臂動（主從模式）

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

### 沒有主臂？用鍵盤

`--teleop.type` 裡有個 `keyboard`，不需要第二種硬體：

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard
```

也可以用 `--teleop.type=gamepad` 接 Xbox 手把（需要 `pip install "lerobot[gamepad]"`）。

### 帶攝影機看畫面

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --display_data=true --display_mode=rerun
```

> 用 rerun 視覺化同樣需要先安裝那兩個 X11 函式庫，見
> [xlerobot/](../xlerobot/01-Operation.md) 第 1 節。

---

## 6. 採集示教資料

```bash
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --dataset.repo_id=你的使用者名稱/我的第一個資料集 \
  --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"
```

**參數說明：**

| 參數 | 作用 |
|---|---|
| `--robot.cameras` | 攝影機設定，**巢狀字典語法**，`名字: {type: opencv, index_or_path: ..., width/height/fps}` |
| `--dataset.repo_id` | 資料集在 Hugging Face 上的 ID（本機錄完也可以推上去） |
| `--dataset.num_episodes` | 錄幾條 |
| `--dataset.single_task` | 任務描述，訓練時用得上 |
| `--dataset.root` | 想存到其他目錄就加這個，預設在快取目錄下 |

**錄製過程中的按鍵**（終端機裡會提示）：

| 鍵 | 作用 |
|---|---|
| `→`（右方向鍵） | 提前結束當前 episode，進入重置階段 |
| `←`（左方向鍵） | 丟棄當前 episode，重錄這一條 |
| `Esc` | 停止整個錄製 |

錄完在本機就能用。想推到 Hub：

```bash
--dataset.push_to_hub=true
```

（記得容器啟動時加了 `-e HF_ENDPOINT=https://hf-mirror.com`。）

---

## 7. 回放檢查

錄完先回放看一遍，確認資料沒問題再訓練：

```bash
lerobot-replay \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=你的使用者名稱/我的第一個資料集 \
  --dataset.episode=0
```

---

## 8. 訓練

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=你的使用者名稱/我的第一個資料集
```

> `lerobot-train` **不需要 `robot.type`**（只吃資料集和策略類型），
> 所以這條指令和 XLeRobot 那條路是**共用**的——你錄的 XLeRobot 資料也能這樣訓。
>
> 訓練非常耗算力。在 CPU 上只能跑極小規模，要實用的話需要 Jetson 的 GPU。

可選策略（`--policy.type`）：`act`（最常用）、`diffusion`、`smolvla`、
`pi0` / `pi05` / `pi0_fast`、`groot`、`tdmpc`、`vqbet` 等。

---

## 9. 真機部署：跑訓練好的策略

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=你的使用者名稱/我的模型 \
  --strategy.type=base
```

| 參數 | 說明 |
|---|---|
| `--policy.path` | 訓練好的模型（Hub 上的 ID 或本機路徑） |
| `--strategy.type` | `base` 最常用；還有 `sentry`、`highlight`、`episodic`、`dagger` |
| `--inference.type` | `sync`（預設）或 `rtc` |

> ⚠️ **別用 `lerobot-eval` 跑真機**——它是給**模擬 benchmark** 用的
> （`--env.type=aloha/pusht/libero/metaworld...`），不是真機部署。真機用
> `lerobot-rollout`。

---

## 10. 命令列工具全表

| 命令 | 作用 | 需要 `robot.type` 嗎 |
|---|---|---|
| `lerobot-find-port` | 找串口 | 否 |
| `lerobot-find-cameras` | 找攝影機 | 否 |
| `lerobot-setup-motors` | 給新舵機寫入 ID | 是 |
| `lerobot-calibrate` | 校準 | 是 |
| `lerobot-teleoperate` | 遙操作 | 是 |
| `lerobot-record` | 錄資料集 | 是 |
| `lerobot-replay` | 回放資料 | 是 |
| `lerobot-train` | 訓練策略 | **否**（和 XLeRobot 共用） |
| `lerobot-rollout` | **真機**部署策略 | 是 |
| `lerobot-eval` | **模擬** benchmark 評測 | 否（用 `--env.type`） |
| `lerobot-edit-dataset` | 編輯資料集 | 否 |
| `lerobot-dataset-viz` | 資料集視覺化 | 否 |
| `lerobot-info` | 印出環境與版本資訊 | 否 |

---

## 11. CLI 支援的機器人類型（完整清單）

這是 `lerobot-*` 命令列**實際能認**的全部類型（從原始碼的白名單裡讀出來的）。
**沒有 `xlerobot`**——這就是必須分兩條路的原因。

**機器人（`--robot.type`）—— 14 種：**

```
openarm_follower      bi_openarm_follower     rebot_b601_follower
bi_rebot_b601_follower so100_follower         so101_follower
bi_so_follower        hope_jr_hand            hope_jr_arm
koch_follower         lekiwi                  lekiwi_client
omx_follower          unitree_g1
```

**遙操作器（`--teleop.type`）—— 包括：**

```
so101_leader      so100_leader      bi_so_leader      koch_leader
openarm_leader    omx_leader        rebot_102_leader  unitree_g1
keyboard          gamepad           homunculus_arm    homunculus_glove
```

> 完整清單以你自己鏡像裡的 `--help` 為準，不同版本會有增刪。

---

## 12. 一個完整的範例（從零到能跑）

```bash
# 1. 找設備
lerobot-find-port                          # 記下串口號，下面用 /dev/ttyACM0
lerobot-find-cameras opencv                # 記下攝影機，下面用 /dev/video0

# 2. 新舵機寫入 ID（只有新裝的臂需要）
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 3. 校準
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# 4. 用鍵盤試一下能不能動
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# 5. 錄 10 條資料
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=你的使用者名稱/my-first-dataset \
  --dataset.num_episodes=10 --dataset.single_task="pick up the cube"

# 6. 訓練
lerobot-train --policy.type=act --dataset.repo_id=你的使用者名稱/my-first-dataset

# 7. 讓機械手臂自己跑
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=你的使用者名稱/my-first-dataset --strategy.type=base
```

---

## 驗證情況

本篇的指令都在 JetPack 7.2 的 `chenyang310/xlerobot:jetson` 鏡像裡**實際執行過**：

| 項目 | 結果 |
|---|---|
| 14 種原版 `--robot.type` 參數解析 | ✅ 通過 |
| `--teleop.type`（含 `keyboard`）參數解析 | ✅ 通過 |
| `lerobot-calibrate` 全鏈路 | ✅ 走到開啟串口才停（當時沒接舵機） |
| `lerobot-teleoperate --teleop.type=keyboard` 全鏈路 | ✅ 同上 |
| `lerobot-find-cameras opencv` | ✅ **真硬體**：辨識 `/dev/video0` 並成功採集影像 |
| `--robot.cameras` 巢狀語法解析 | ✅ 通過 |
| 原版機器人與 XLeRobot **同一行程共存** | ✅ 8 個類型同時註冊成功 |

沒接機械手臂，所以**動作層面的驗證還沒做**。你接上 SO-101 之後照第 12 節跑一遍，
哪一步不對告訴我。

---

> **下一篇**：[troubleshooting/](../troubleshooting/01-Troubleshooting.md) —— 出問題了查這裡
