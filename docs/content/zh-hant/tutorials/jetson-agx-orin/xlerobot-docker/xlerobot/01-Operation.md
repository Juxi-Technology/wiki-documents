---
title: XLeRobot 執行指令
---

# XLeRobot 執行指令

> **所屬**：[xlerobot/](01-Operation.md) —— XLeRobot 整機（雙臂 + 底盤）
> **前置**：先讀完 [deployment/](../deployment/01-Overview.md) 並進到容器裡
> **另一條路**：[lerobot/](../lerobot/01-Operation.md)（單條 SO-101 臂 / LeKiwi）
> **下一篇**：[troubleshooting/](../troubleshooting/01-Troubleshooting.md)

🎯 **本篇只講 XLeRobot 整機**（雙臂 + 底盤）怎麼跑。

要用 `lerobot-*` 命令列操作**單條 SO-101 臂**或 **LeKiwi**，去
[lerobot/](../lerobot/01-Operation.md)——兩條路不一樣。

本篇內容：校準、遙操作、按鍵表、錄製資料、訓練、推理。

---

## 0. 先選路徑 ⚠️

鏡像裡有**兩個專案**，執行方式不同。**先看這張表確定你走哪條**：

| 你的硬體 | 走哪條 | 進入點 |
|---|---|---|
| **XLeRobot 整機**（雙臂 + 底盤） | ✅ **本篇** | `examples/` 下的範例腳本 |
| **單條 SO-101 / SO-100 臂** | ➡️ [lerobot/](../lerobot/01-Operation.md) | `lerobot-*` 命令列 |
| **LeKiwi** | ➡️ [lerobot/](../lerobot/01-Operation.md) | `lerobot-*` 命令列 |

**為什麼分兩條**：`lerobot-calibrate`、`lerobot-record`、`lerobot-teleoperate`
這些命令列工具**只認它們明確匯入的機器人類型**（14 種原版機器人，**沒有 `xlerobot`**）。
硬傳的話會出現：

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

**XLeRobot 的進入點是 `examples/` 下的範例腳本**（它們直接 import `XLerobot`）。

兩條路**共用同一套環境**——隨時可切，不用重裝任何東西。

> 範例檔案裡雖然寫著 host/client 雙行程的用法，但**那部分是註解掉的**，
> 實際跑的是**直連模式**——一個終端機就夠，不用另外啟動 host。

---

## 1. 第一次跑遙操作之前：安裝兩個 X11 函式庫 ⚠️

鏡像裡缺了兩個 X11 函式庫，**不安裝的話 rerun 視覺化視窗會崩潰**：

```
Failed loading libxkbcommon-x11.so.0
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

**機器人本身不受影響**（遙操作照常運作，按鍵也會回應），只是看不到視覺化視窗，
而且 rerun 的資料通道會堵塞、不斷刷 WARN，拖慢遙操作。

**另外開一個終端機**安裝進容器：

```bash
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"
```

⚠️ **`-u root` 不能省略**——鏡像預設以 `jetson` 使用者身分執行，`docker exec` 進去
預設也是這個身分，而安裝 apt 套件需要 root 權限。少了這個參數會出現：

```
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock — are you root?
```

而且**套件會默默安裝失敗**，rerun 照樣崩潰，很容易誤以為「裝了也沒用」。

裝完後**重新啟動遙操作腳本**（`Ctrl+C` 結束後再重跑）。

> ⚠️ 這個變更**只在本次執行期間有效**——容器是 `--rm` 的，結束後就沒了，
> 所以每次重開容器都要重新安裝一遍。

---

## 2. 尋找串口

```bash
lerobot-find-port
```

它會提示你拔掉再插上舵機線，然後印出串口名稱（例如 `/dev/ttyACM0`）。

> 這個指令是**互動式**的，直接 `--help` 會出現 EOF，這是正常現象。

**XLeRobot 會用到兩個串口**（對應設定裡的 `port1` 和 `port2`）：

| 參數 | 預設值 | 連接什麼 |
|---|---|---|
| `port1` | `/dev/ttyACM0` | SO-101 雙臂 + 頭部相機 |
| `port2` | `/dev/ttyACM1` | 底盤（輪子）相關的舵機 |

兩個都要找出來。預設值是 `/dev/ttyACM0` 和 `/dev/ttyACM1`，**如果實際上不是，
後面每條指令都要用 `--robot.port1=` / `--robot.port2=` 指定**（見第 6 節）。

---

## 3. 校準：跑範例時自動觸發，不用另外跑指令

⚠️ **不要用 `lerobot-calibrate --robot.type=xlerobot`**。那個命令列工具只認它
明確匯入的一批機器人（so100/so101/lekiwi 等），XLeRobot 的設定**不在名單裡**，
會出現 `invalid choice: 'xlerobot'`。

XLeRobot 的校準**內建在 `XLerobot.connect()` 裡**，跑任何範例都會自動進入：

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**它會做什麼：**

- **沒有校準檔案** → 自動進入引導式校準：
  1. 提示「把左臂和頭部舵機移到行程中點，按 Enter 鍵」
  2. 接著提示「逐個關節走一遍完整行程，按 Enter 鍵停止」
  3. 右臂和底盤同理
- **已有校準檔案** → 會問你：按 Enter 鍵恢復校準，還是輸入 `c` 重新校準

校準檔案存放於：

```
~/.cache/huggingface/lerobot/calibration/robots/xlerobot/<id>.json
```

**這個目錄必須掛載到宿主機**，否則每次重開容器都要重新校準：

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

> 如果你只想單獨校準某一個 SO-101 手臂（不是整個 XLeRobot），可以使用原版指令，
> `so101_follower` 那個類型在 CLI 白名單裡：
> ```bash
> lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
> ```

> 有些範例（例如 `examples/0_so100_keyboard_joint_control.py`）用的是
> **程式碼裡手寫的校準係數**，而不是上面這個流程。具體用哪一種取決於你的機器人
> 變體和所使用的範例——先看一下對應範例檔案開頭的註解。

---

## 4. 遙操作

**一個終端機就夠**（範例是直連模式，不用另外啟動 host）：

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**首次執行會自動進入校準引導**（不需要另外跑校準指令）：

1. `Move left arm and head motors to the middle of their range of motion and press ENTER....`
   → 把左臂和頭部舵機擺到行程中間，**按 Enter 鍵**
2. `Move all left arm and head joints sequentially through their entire ranges of motion...`
   → 每個關節從頭到尾走一遍，**按 Enter 鍵**結束
3. 右臂和底盤同理

之後有校準檔案時會問：按 Enter 鍵恢復，還是輸入 `c` 重新校準。

### 按鍵對應

**底盤**

| 鍵 | 作用 |
|---|---|
| `i` / `k` | 前進 / 後退 |
| `j` / `l` | 左移 / 右移 |
| `u` / `o` | 左轉 / 右轉 |
| `n` / `m` | 加速 / 減速（三段） |
| `b` | 結束程式 |

**左臂**

| 鍵 | 關節 |
|---|---|
| `q` / `e` | shoulder_pan（底座旋轉）± |
| `w` / `s` | x（前後）± |
| `a` / `d` | y（左右）± |
| `z` / `x` | pitch（俯仰）± |
| `r` / `f` | wrist_roll（腕部旋轉）± |
| `t` / `g` | gripper（夾爪）開 / 合 |
| `c` | 回零位 |
| `y` | 走矩形軌跡（示範/測試用） |
| `<` / `>` | head_motor_1 ± |
| `,` / `.` | head_motor_2 ± |

**右臂**

| 鍵 | 關節 |
|---|---|
| `7` / `9` | shoulder_pan ± |
| `8` / `2` | x（前後）± |
| `4` / `6` | y（左右）± |
| `1` / `3` | pitch（俯仰）± |
| `/` / `*` | wrist_roll ± |
| `+` / `-` | gripper 開 / 合 |
| `0` | 回零位 |
| `Y`（**大寫**） | 走矩形軌跡 |

**其他**：`?` → 頭部舵機回零位

> 左右臂是**鏡像**的：左邊用字母區（`q/e`、`w/a/s/d`），右邊用數字鍵盤/數字區
> （`7/9`、`4/6`、`8/2`、`1/3`）。`reset` 鍵也不一樣——左臂 `c`，右臂 `0`。
> 注意矩形軌跡鍵左臂是小寫 `y`、右臂是**大寫** `Y`。

### 其他範例

| 範例 | 說明 | 需要額外安裝嗎 |
|---|---|---|
| `4_xlerobot_2wheels_teleop_keyboard.py` | 兩輪底盤版 | 不需要（同樣要先裝那兩個函式庫） |
| `5_xlerobot_teleop_xbox.py` | Xbox 手把 | 需要 `pip install "lerobot[gamepad]"` |
| `7_xlerobot_teleop_joycon.py` | Joy-Con | 缺少 `joyconrobotics` 模組，無法使用 |
| `8_xlerobot_teleop_vr.py` | VR | 需要額外掛載 XLeVR 目錄 |

---

## 5. 採集示教資料

⚠️ `lerobot-record --robot.type=xlerobot` **用不了**（原因同第 0 節）。

XLeRobot 只有 VR 這一條錄製路徑，而它依賴 `XLeVR` 模組，不在鏡像裡。

**要用的話得自己寫腳本**，使用 LeRobotDataset API（函式庫在鏡像裡）：

```python
from lerobot.datasets.lerobot_dataset import LeRobotDataset

ds = LeRobotDataset.create(
    repo_id="<your-username>/<dataset-name>", fps=30,
    features={"observation.state": {"dtype": "float32", "shape": (6,), "names": None},
              "action": {"dtype": "float32", "shape": (6,), "names": None}},
    root="/data/ds")

# 遙操作迴圈裡：
#   ds.add_frame({"observation.state": ..., "action": ..., "task": "pick"})
#   ds.save_episode()

ds.finalize()   # 必須呼叫，否則中繼資料不會寫入磁碟
```

可以參考鏡像裡的 `examples/8_vr_teleop_with_dataset_recording.py`，
把 VR 部分換成鍵盤遙操作。

**記得加上 `-e HF_ENDPOINT=https://hf-mirror.com`**，不然推送資料集到 Hub 會失敗。

> 寫資料集時有個坑：`save_episode()` 之後**必須呼叫 `ds.finalize()`**，
> 否則 episode 中繼資料不會寫入磁碟，之後就讀不回來（會出現
> `Provided directory does not contain any parquet file`）。

---

## 6. 串口不是 ACM0/ACM1 怎麼辦

範例**沒有 argparse**，串口用的是 `XLerobotConfig()` 的預設值：

```python
robot_config = XLerobotConfig()
robot = XLerobot(robot_config)
```

改成明確指定連接埠：

```python
robot_config = XLerobotConfig(port1="/dev/ttyACM1", port2="/dev/ttyACM2")
robot = XLerobot(robot_config)
```

改完直接重新執行（原始碼是掛載進去的，修改宿主機上的檔案會立刻生效）。

---

## 7. 部署訓練好的模型

ACT 策略**不需要額外相依套件**，在鏡像裡直接就能用：

```python
from lerobot.policies.act.configuration_act import ACTConfig
from lerobot.policies.act.modeling_act import ACTPolicy

policy = ACTPolicy.from_pretrained("<your-username>/<model-name>")
policy.eval()

# 接上機器人後迴圈推理
# action = policy.select_action(batch)
```

鏡像裡已經預先安裝好的策略：

| 策略 | 相依套件 | 說明 |
|---|---|---|
| **ACT** | 無 | 最常用，實測可用 |
| **Diffusion** | `diffusers` | 需要完整版鏡像 |
| SmolVLA / pi0 / groot | transformers | **未預先安裝**，套件很大且在 CPU 上跑不動 |

> 同一個行程裡**不能同時 import 兩個機器人變體**——`xlerobot_mecanum`
> 把自己的設定註冊成 `"xlerobot"`，和基礎版撞名了，會出現
> `Cannot register ... already registered`。一台機器人只用一個變體，
> 分開行程跑就沒問題。

---

## 8. 訓練

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<your-username>/<my-dataset-name>
```

> `lerobot-train` **不需要 `robot.type`**（只吃資料集和策略類型），
> 所以這個指令可以使用，不受第 0 節的限制。
>
> 訓練非常耗算力。在 CPU 上只能跑極小規模，要實用的話需要 Jetson 的 GPU。

---

> **下一篇**：[troubleshooting/](../troubleshooting/01-Troubleshooting.md) —— 出問題了查這裡
> **另一條路**：[lerobot/](../lerobot/01-Operation.md)（用 `lerobot-*` 命令列跑單臂 / LeKiwi）
