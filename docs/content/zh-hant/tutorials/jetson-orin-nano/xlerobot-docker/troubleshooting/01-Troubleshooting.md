---
title: 常見問題與速查
---

# 常見問題與速查

> **所屬**：[troubleshooting/](01-Troubleshooting.md)
> **相關**：[deployment/](../deployment/01-Overview.md) ·
> [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)

---

## 常見問題

### 容器裡看不到機器人的串口

```bash
# 宿主機上確認裝置存在
ls /dev/ttyACM*
# 確認使用者在 dialout 群組
groups | grep dialout
```

不在群組裡的話，執行 `sudo usermod -aG dialout $USER`，然後**重新登入**。

### 拉鏡像卡住 / 逾時

沒有設定鏡像加速器。請見 [02-Environment-Setup](../deployment/02-Environment-Setup.md) 第 2 節。

### 下載模型失敗 / 連不上 huggingface

設定 `-e HF_ENDPOINT=https://hf-mirror.com`。
請見 [02-Environment-Setup](../deployment/02-Environment-Setup.md) 第 4 節。

### rerun 視覺化視窗崩潰

```
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

缺少 X11 函式庫。**機器人本身不受影響**，只是看不到視窗。
安裝函式庫的指令和注意事項請見 [xlerobot/](../xlerobot/01-Operation.md) 第 1 節——
關鍵是 `docker exec` **必須加上 `-u root`**。

### 容器裡 `torch.cuda.is_available()` 是 False

GPU 是必需的，所以這一定是設定問題——兩項都檢查：

- 你是用 `--device nvidia.com/gpu=all` 啟動容器的——**不是 `--runtime nvidia`**，
  它不會注入裝置節點
- 宿主機上存在 CDI 規格（`/etc/cdi/nvidia.yaml`）——見
  [03-Deployment §4](../deployment/03-Deployment.md)

### 容器起不來，出現 CDI 錯誤

```
CDI device injection failed: failed to stat CDI host device "/dev/dri/card0"
```

宿主機上的自動重新整理服務產生了引用不存在 `card0` 的規格。修復方式：

```bash
sudo systemctl disable --now nvidia-cdi-refresh.path nvidia-cdi-refresh.service
sudo rm -f /var/run/cdi/nvidia.yaml
sudo systemctl restart docker
```

（這個問題每次重新啟動都會重現。）

### 校準每次都要重做

校準檔案只存在容器裡，容器一刪除就沒了。啟動時請掛載快取目錄：

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

`scripts/run.sh` 已經做好這件事了。

### 校準指令出現 `invalid choice: 'xlerobot'`

這不是故障，是設計如此。`lerobot-calibrate` 的命令列工具不支援 XLeRobot，
校準會在範例腳本裡自動觸發。請見 [xlerobot/](../xlerobot/01-Operation.md) 第 0、3 節。

### 操作資料集時刷出一大段 torchcodec 錯誤

如果你用的是**自行安裝**的環境而不是鏡像，可能會看到
`libnvrtc.so.13: cannot open shared object file`。這是因為 torchcodec 在純 CPU
環境下無法載入，lerobot 會自動退回使用 pyav，功能不受影響。
鏡像裡已經將它移除，不會出現這個錯誤。

### 容器裡 `import` 兩個機器人變體出現錯誤

```
Cannot register ... as xlerobot because ... is already registered
```

只在 **`xlerobot` 和 `xlerobot_mecanum` 這一對**之間發生——兩者在原始碼裡都註冊成
`"xlerobot"`（mecanum 那份 config 是複製來的，註冊名沒改），這是 XLeRobot 上游的 bug。

**其他組合都不衝突**：原版 LeRobot 的所有機器人 + XLeRobot 可以**在同一個行程裡共存**
（實測 8 個類型同時註冊成功），`xlerobot_2wheels` 也不衝突。

一台機器人只會用到一個變體，所以實際使用不受影響。真要同時用（例如寫對比腳本），
分開行程跑。

---

## 用原版 `lerobot-*` 命令時的問題

### `lerobot-record` 出現攝影機相關的錯誤 / 錄出來的資料沒有影像

攝影機要透過 `--robot.cameras` **巢狀字典**傳，不是單獨的頂層參數：

```bash
--robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }"
```

注意是 `index_or_path`（不是 `index`），`front` 是攝影機名稱，可以起多個。
完整範例見 [lerobot/](../lerobot/01-Operation.md) 第 6 節。

### `lerobot-eval` 跑真機不工作

`lerobot-eval` 是給**模擬 benchmark** 用的（`--env.type=aloha/pusht/libero/metaworld...`），
**不是真機部署工具**。

真機上跑訓練好的策略要用 **`lerobot-rollout`**：

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<your-username>/<my-model> --strategy.type=base
```

### 分不清該用 `examples/` 還是 `lerobot-*`

| 你的硬體 | 用哪個 |
|---|---|
| XLeRobot 整機（雙臂 + 底盤） | `examples/` 腳本 → [xlerobot/](../xlerobot/01-Operation.md) |
| 單條 SO-101 / SO-100 臂、LeKiwi | `lerobot-*` 命令列 → [lerobot/](../lerobot/01-Operation.md) |

判斷依據很簡單：`lerobot-*` 的機器人白名單裡**沒有 `xlerobot`**（完整清單見
[lerobot/](../lerobot/01-Operation.md) 第 11 節）。

### `--robot.type` 傳了但出現 `invalid choice`

對照 [lerobot/](../lerobot/01-Operation.md) 第 11 節的完整清單——
只有那 14 種原版類型能用。`xlerobot` 不在裡面，要用 `examples/` 腳本。

---

## 速查表

### 通用（兩條路都要）

```bash
# 拉鏡像
docker pull chenyang310/xlerobot:jetson

# 啟動
bash scripts/run.sh jetson

# 進容器之後 —— 首次設定
lerobot-find-port                     # 找串口（互動式，依提示拔插舵機線）

# 安裝 rerun 需要的兩個 X11 函式庫（另開一個終端機，-u root 不能省）
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"

# 訓練（兩條路共用：不需要 robot.type）
lerobot-train --policy.type=act --dataset.repo_id=<username>/<dataset-name>

# 自檢
python -c "import torch, lerobot; print(torch.__version__, lerobot.__version__)"
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

### A · XLeRobot 整機（雙臂 + 底盤）

```bash
# 遙操作：一個終端機就夠，首次會自動進入校準引導
python examples/4_xlerobot_teleop_keyboard.py

# 兩輪底盤版
python examples/4_xlerobot_2wheels_teleop_keyboard.py

# ⚠️ 別用 lerobot-calibrate / lerobot-record / lerobot-teleoperate 傳 xlerobot，
#    白名單裡沒有，只會出現 invalid choice。XLeRobot 走 examples/ 腳本。
```

詳見 [xlerobot/](../xlerobot/01-Operation.md)。

### B · 單條 SO-101 / LeKiwi（`lerobot-*` 命令列）

```bash
# 找設備
lerobot-find-port
lerobot-find-cameras opencv

# 新舵機寫入 ID（只有新裝的臂需要）
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 校準
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# 遙操作（鍵盤，不需要主臂）
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# 錄資料集
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<username>/<dataset-name> --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"

# 回放檢查
lerobot-replay --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<username>/<dataset-name> --dataset.episode=0

# 真機部署訓練好的策略（⚠️ 不是 lerobot-eval，那個是模擬用的）
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<username>/<model-name> --strategy.type=base
```

詳見 [lerobot/](../lerobot/01-Operation.md)。

### 按鍵速查

| 部位 | 鍵 | 作用 |
|---|---|---|
| 底盤 | `i` `k` `j` `l` | 前 / 後 / 左 / 右 |
| 底盤 | `u` `o` `n` `m` | 左轉 / 右轉 / 加速 / 減速 |
| 底盤 | `b` | 結束 |
| 左臂 | `q/e` `w/s` `a/d` `z/x` | pan / x / y / pitch |
| 左臂 | `r/f` `t/g` `c` `y` | wrist / 夾爪 / 回零 / 矩形軌跡 |
| 左臂 | `<` `>` `,` `.` | 頭部舵機 1 / 2 |
| 右臂 | `7/9` `8/2` `4/6` `1/3` | pan / x / y / pitch |
| 右臂 | `/` `*` `+` `-` `0` | wrist / 夾爪 / 回零 |
| 右臂 | `Y`（**大寫**） | 矩形軌跡 |
| 其他 | `?` | 頭部回零 |

完整說明請見 [xlerobot/](../xlerobot/01-Operation.md) 第 4 節。

---

## 附錄：這份教程裡提到的東西為什麼是這樣

| 決定 | 原因 |
|---|---|
| 必須要 Python 3.12 | lerobot 0.6.2 用了 PEP 695 語法（`type X = ...`、`class Foo[T]:`），3.10/3.11 連編譯都過不了 |
| 中國大陸必須設定鏡像加速器 | Docker Hub 直連逾時，實測 `context deadline exceeded` |
| 必須設定 HF_ENDPOINT | `huggingface.co` 從中國大陸完全無法連線，`hf-mirror.com` 可以連上 |
| Jetson 使用 CDI 而不是 `--runtime nvidia` | 在 JetPack 6/7 的 cgroup v2 環境下，`--runtime nvidia` 不會注入裝置節點 |
| 不安裝 placo 運動學函式庫 | 它沒有 cp312/aarch64 的輪子；XLeRobot 用的是內建的解析式 IK，不依賴它 |

---

## 相關連結

- [XLeRobot 專案](https://github.com/Vector-Wangel/XLeRobot)
- [LeRobot 官方文件](https://huggingface.co/docs/lerobot)
- [Docker Hub 使用量與限制](https://docs.docker.com/docker-hub/usage/)
- [鉅犀科技 Wiki](https://wiki.juxitech.com)

---

> **回到開頭**：[deployment/01-Overview](../deployment/01-Overview.md)
> **另一條路**：[xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)
