---
title: "09 · 完整使用教學（開臂 → 資料集 → 看影片 → 訓練 → 部署）"
---

# 09 · 完整使用教學（開臂 → 資料集 → 看影片 → 訓練 → 部署）

> 一條龍操作手冊：照著走一遍，就能從「插上主動臂」一路走到「訓練好的策略自己在模擬裡幹活」。
> 本文按章節順序執行即可——全部相依性（含訓練用的 `training` extra）都在 [01](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/01-Environment)
> 一次性裝齊，中途不需要再補裝任何東西。
> 前提：環境已按 [01](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/01-Environment) 裝好、主動臂已按 [03](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration) 校正
> （本機為 `juxi_leader` / COM124）。所有錄製相關的坑集中在 [07](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)。

## 0 · 一次性準備

```bash
# 本机所有 uv 命令都要先设（跨盘缓存特例，见 07）
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
```

插上主動臂，確認序列埠（**每次插拔都可能變更編號**）：

```bash
uv run --frozen python -c "from serial.tools import list_ports; print([p.device for p in list_ports.comports()])"
```

桌面留出空間：錄製會彈出 **3 個視窗**（主視角 + `wrist camera - live` + `top camera - live`）。

## 1 · 遙控操作暖身（推薦）

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --robot.type=so101_mujoco \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false
```

動一動主動臂，確認模擬臂跟手；退出（Ctrl-C）前把主動臂停到**中位姿態附近**，開錄瞬間不會有大收斂段。

## 2 · 錄製（核心指令）

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/record.py \
    --robot.image_camera=sim_cam --robot.top_camera=top_cam \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision \
    --dataset.num_episodes=5 --dataset.episode_time_s=600 --dataset.reset_time_s=10 \
    --dataset.single_task="put the cube in the box" \
    --dataset.video=true --dataset.push_to_hub=false --play_sounds=false --dataset.no_stamp=true
```

要點（其餘參數見 [06](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay) 參數表）：

| 項目 | 說明 |
| --- | --- |
| `--dataset.root` | **root 就是資料集目錄本身**，每場換一個新目錄（同名目錄存在會拒絕啟動） |
| 自動注入的預設值 | 影片編碼 `h264`、編碼執行緒 `2`——`record.py` 啟動時會輸出兩行提示；明確傳入 `--dataset.rgb_encoder.vcodec=...` / `--dataset.encoder_threads=...` 可覆蓋（原因見 07） |
| 預覽視窗 | 預設開啟（15Hz，`--robot.preview_cameras=false` 可關；`--robot.preview_fps` 可調） |
| `--dataset.video=true` | 雙相機畫面入庫（`observation.images.wrist / top`）；只要腕部相機就去掉 `top_camera` |

## 3 · 錄製中的操作

| 按鍵 | 作用 |
| --- | --- |
| `→` 或 `n` | 結束目前回合並儲存 |
| `←` 或 `r` | 捨棄目前回合，原地重錄 |
| `q` | 整場結束，儲存資料集 |

- 回合結束後**方塊自動歸位**，你只需要把主動臂拉回起始姿態；看到 `Recording episode N` 再開始下一回合的動作。
- 儲存階段（幾十秒）主控台會輸出 `[record.py] reset done; saving the episode + encoding videos now`——
  這段時間**按鍵會被安全忽略**（誤按不會弄壞任何回合），等下一行 `Recording episode` 出現再操作。
- 編碼失敗有**自動重試兜底**（輸出 `video encode failed ... retrying once` 後 3 秒自動重試）；已儲存的回合永不遺失。

## 4 · 健檢

```bash
uv run --frozen python examples/so101_mujoco/inspect_dataset.py \
    --repo-id local/so101_sim_vision \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

怎麼讀輸出：

- **action span 全為 0（或夾爪為 0）的回合**是空錄/無效錄製，刪除重錄；
- **每回合開頭 `max |act-obs|` 偏大**是收斂段，正常；中後段應小於 ~10 單位。

## 5 · 看影片

```bash
uv run --frozen python examples/so101_mujoco/export_videos.py \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

產物：

- `examples/so101_mujoco/outputs/videos/so101_sim_vision/epN_top.mp4`、`epN_wrist.mp4` —— **每回合每相機一個可雙擊播放的影片**；
- `examples/so101_mujoco/outputs/renders/so101_sim_vision_epN_dual.png` —— 每回合一張拼圖（上排頂視、下排腕部，均勻取樣 6 影格），快速目檢用（`--no-strips` 可跳過）。

資料集裡也有原始打包影片（多回合按順序拼在同一個檔案）：
`outputs/datasets/so101_sim_vision/videos/observation.images.{top,wrist}/chunk-000/file-000.mp4`。

## 6 · 回放（可選）

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/replay.py \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision --dataset.episode=0
```

## 7 · 訓練

```bash
uv run --frozen lerobot-train \
    --policy.type=act \
    --policy.push_to_hub=false \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision \
    --output_dir=examples/so101_mujoco/outputs/train/act_so101_sim_vision \
    --steps=100000 --batch_size=8 --save_freq=20000 --log_freq=200 \
    --num_workers=4 --wandb.enable=false --policy.device=cpu
```

| 要點 | 說明 |
| --- | --- |
| `--policy.type` | 策略類型，**`act` 起步**（與這套資料規模/任務最匹配）；`ls src/lerobot/policies/` 可看其他選擇（diffusion / smolvla / pi0 等） |
| `--policy.push_to_hub=false` | **必加**——預設想推 HuggingFace Hub，沒配 `repo_id` 會直接報錯退出；要推時改為 `--policy.repo_id=你的用户名/模型名`（需先 `hf auth login`） |
| `--policy.device=cpu` | 本機無獨顯用 `cpu`；有 NVIDIA 卡的機器刪掉該參數（自動用 cuda） |
| 產物 | 訓練目錄下會產生 `checkpoints/last/pretrained_model/`（最新，**部署指向它**）和按儲存步數命名的歷史快照（如 `checkpoints/000012/`）；續訓用的 `train_config.json` 就在 `pretrained_model/` 裡 |
| 續訓 | 中斷後原指令加：`--resume=true --config_path=examples/so101_mujoco/outputs/train/act_so101_sim_vision/checkpoints/last/pretrained_model/train_config.json`（路徑即上條指令 `--output_dir` 之下的位置） |

**本機速度預期**：純 CPU 約 **2 秒/步**（batch 2、480p 雙相機；實測 12 步冒煙 loss 從 70 降到 22，方向正常）。
所以本機適合小步數驗證鏈路——教學自帶的 `outputs/train/smoke_act` 就是 12 步的產物；
**正式訓練建議換帶 GPU 的機器**（ACT 常規 10 萬步量級，指令完全一樣）。

> 相依性說明：訓練所需的 `training` extra（accelerate 等）已包含在 [01](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/01-Environment) 的一次性
> 安裝裡，本章不需要任何補裝步驟。

## 8 · 部署（讓策略在模擬裡自己幹活）

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/rollout.py \
    --policy.path=examples/so101_mujoco/outputs/train/act_so101_sim_vision/checkpoints/last/pretrained_model \
    --strategy.type=base \
    --robot.image_camera=sim_cam --robot.top_camera=top_cam \
    --task="put the cube in the box" --duration=30
```

| 要點 | 說明 |
| --- | --- |
| 相機參數 | `--robot.image_camera/--robot.top_camera` **必須與錄製資料集時一致**（sim_cam + top_cam），否則策略拿不到它訓練過的畫面 |
| `--task` | 與錄製時的 `--dataset.single_task` 一致 |
| `--duration` | 跑滿多少秒自動收場（收場前會把機械臂送回初始位姿再斷開）；中途 `Ctrl-C` 也可停 |
| 想先試通鏈路 | 用教學自帶示範模型即可：`--policy.path=examples/so101_mujoco/outputs/train/smoke_act/checkpoints/last/pretrained_model`（12 步訓練，動作接近亂動，只驗證鏈路） |
| 純 CPU 部署 | 策略推論偶發 0.5s 尖峰，會提示 `Control loop is running slower ... than the target FPS`——模擬裡能跑但會頓；GPU 上無此問題（實測 20s 冒煙全程可跑、正常收場） |
| 實機部署 | 把 `--robot.*` 換成實機：`--robot.type=so101_follower --robot.port=COMxx --robot.id=juxi_so101 --robot.use_degrees=false`（注意桌面留出空間） |
| 其他模式 | `--strategy.type=sentry / highlight / dagger / episodic`：邊跑邊錄 / 環形緩衝按鍵存 / 人在迴路糾偏 / 回合制錄製，見 `lerobot-rollout --help` |

## 附錄 A · 換成 conda 環境（可選）

本儲存庫預設用 **uv 管理的專案內 `.venv`**（見 [01](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/01-Environment)），執行指令都要帶
`uv run --frozen --with mujoco` 前綴。如果你更習慣 conda，做法是**把「建環境」那一步換成下面三條**，
之後**所有指令去掉 uv 前綴**（`python examples/...` 直接跑），`UV_CACHE_DIR` 也不再需要
（那是 uv 的跨盤快取特例，與 conda 無關）：

```bash
# 一次性：在仓库根目录建好环境（python 版本对齐 01 的 3.12）
conda create -n lerobot-sim python=3.12 -y
conda activate lerobot-sim
pip install -e .            # 安装本仓库 lerobot 及其依赖（含 torch，Windows 上 pip 默认就是 CPU 版）
pip install "mujoco==3.16"  # uv 路线用 --with mujoco 临时提供，conda 路线装成常驻依赖
```

之後例如錄製就變成：

```bash
python examples/so101_mujoco/record.py --robot.image_camera=sim_cam ...
```

兩個注意點：

1. **版本對齊**：`pip install -e .` 由 pip 自行解析版本，未必和 `uv.lock` 完全一致；
   想要與目前實測環境一字不差的組合，用 uv 往 conda 環境裡按鎖定檔裝：

   ```bash
   uv pip sync uv.lock --python "$(conda run -n lerobot-sim python -c 'import sys; print(sys.executable)')"
   pip install "mujoco==3.16"
   ```

2. 主動臂的校正快取存在 `~/.cache/huggingface/lerobot/calibration/`，與用哪個環境無關，遷移環境不用重新校正。

## 附錄 B · 常見坑速查

| 現象 | 一句話 |
| --- | --- |
| 序列埠打不開 | 先列連接埠，號可能變了（第 0 步） |
| 儲存時主控台安靜幾十秒 | 正在編碼，屬正常；看到 `saving the episode...` 提示就別按鍵 |
| 錄製時畫面偶發卡頓 | 儲存視窗的編碼資源競爭；控制迴路本身不受影響（cadence 數字為準），詳見 07 |
| 崩了一次還能救嗎 | 已儲存回合永不遺失；`record.py --resume=true ... --dataset.num_episodes=N` 續錄 |
| `lerobot-train` 報 `'repo_id' argument missing` | 預設想推 Hub：加 `--policy.push_to_hub=false`（要推就配 `--policy.repo_id` 並先 `hf auth login`） |
| 部署時策略不動或亂動 | 先核對 `--robot.image_camera/--robot.top_camera` 和 `--task` 是否與錄製時一致；再看是否只訓了很少步數 |

全部坑與解法（含記憶體吃緊、編碼 OOM、空回合等）見 [07 · 常見問題](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)。

<RelatedProducts slugs="so-arm101" />
