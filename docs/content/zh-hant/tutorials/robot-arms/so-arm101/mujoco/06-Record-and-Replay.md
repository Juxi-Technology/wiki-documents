---
title: "06 · 資料錄製與回放"
---

# 06 · 資料錄製與回放

> 前置：環境按 [01](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/01-Environment)；錄實機還需完成 [03](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)。
> 指令裡的連接埠（從動臂 `COM172` / 主動臂 `COM124`）為範例，按 03 章查到的替換；`id` 用校正時取的名稱。
> 想要「從開臂到看影片再到訓練部署」的完整順序流程，直接看 [09 完整使用教學](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)，
> 本章是參數與機制的參考手冊。

## 錄製指令範本

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 录真机（主动臂 → 真机从动臂）
uv run --frozen --with mujoco python examples/so101_mujoco/record.py \
    --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101 \
    --robot.use_degrees=false --robot.max_relative_target=10 \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false \
    --dataset.repo_id=local/juxi_so101_teleop \
    --dataset.root=examples/so101_mujoco/outputs/datasets/real_run1 \
    --dataset.num_episodes=5 --dataset.episode_time_s=600 --dataset.reset_time_s=10 \
    --dataset.single_task="pick up the cube" \
    --dataset.video=false --dataset.push_to_hub=false --play_sounds=false --dataset.no_stamp=true

# 录仿真（主动臂 → 仿真从动臂）
#   把 --robot.* 换成: --robot.type=so101_mujoco
# 录仿真（键盘控制）
#   把 --teleop.* 换成: --teleop.type=so101_keyboard --teleop.rate=150
```

## 參數要點（容易踩的）

| 參數 | 說明 |
| --- | --- |
| `--dataset.root` | **root 就是資料集目錄本身**（不是父目錄 + repo_id 拼接）；每次錄製換一個新目錄 |
| `--dataset.repo_id` | 本機錄製只是識別碼；將來推 Hub 時才需要真實的 `用户名/名字` |
| `--dataset.num_episodes` | 本次工作階段要錄的回合數；錄滿自動收場（中途 `q` 也儲存已錄部分） |
| `--dataset.single_task` | 任務描述字串，寫進每個影格的 task 欄位；**訓練/部署時的 `--task` 必須與它一致** |
| `--dataset.no_stamp=true` | 不加時間戳後綴，目錄/名稱穩定；重錄同名需先刪除舊目錄 |
| `--dataset.episode_time_s` | 單回合**上限**（保險）；正常操作按 `→` 提前結束 |
| `--dataset.reset_time_s` | 回合間不記錄的歸位時間；期間主動臂仍即時驅動從動臂。**模擬錄製時方塊會在進入該階段時自動瞬移回初始位置**（見下） |
| `--dataset.video` | 需要相機資料時才開（視覺資料集必須 true；pyav 回退已驗證可用） |
| `--dataset.rgb_encoder.vcodec` | 影片編碼器。**本機雙相機錄製用 `h264`**：`record.py` 已預設注入（上游預設 libsvtav1 兩路編碼同時開啟時會記憶體配置失敗、整場崩潰——見 [07](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)）；明確傳入則不再注入 |
| `--dataset.encoder_threads` | 編碼執行緒數。**`record.py` 預設注入 2**：預設吃滿所有核心會讓儲存期間的模擬畫面明顯卡頓（見 [07](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)）；每路編碼限制 2 個執行緒後，儲存時模擬保持順暢；明確傳入則不再注入 |
| `--dataset.push_to_hub` | 本機直連 HF 需代理，先保持 false，錄製完手動推 |

## 回合控制鍵（全域，錄製期間一直有效）

| 按鍵 | 作用 |
| --- | --- |
| `→` 或 `n` | 結束目前回合（**儲存**） |
| `←` 或 `r` | 捨棄目前回合並**原地重錄**（單回合不滿意用它，不必重啟工作階段） |
| `q` | 整場結束，儲存資料集（**推薦**） |
| `Esc` | 同 `q`（會順帶中斷鍵盤遙控操作；已驗證乾淨退出，但仍優先使用 `q`） |

**操作建議**：開錄前把主動臂停在中位姿態附近（避免開錄一瞬模擬臂/實機手臂「甩過去」的收斂段被錄進去）；
開錄後先做一秒靜止再開始動作。

## 模擬錄製的自動場景重置

實機錄製時，「Reset the environment」階段需要你手動把方塊放回原位。模擬裡錄製啟動器（`record.py`）
會在該階段開始時**自動把三個方塊瞬移回出生位**（同時清零速度），所以每回合按 `→` 結束後，
你只需要把主動臂移回起始姿態，方塊會自動歸位，下一回合從固定的初始場景開始。
實機從動臂沒有這個行為（照常手動擺放）；`teleoperate.py`/`replay.py` 也不涉及。

## 錄製後健檢

```bash
uv run --frozen python examples/so101_mujoco/inspect_dataset.py \
    --repo-id local/so101_sim_vision \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

輸出每回合的影格數、時長、六關節動作幅度與跟隨誤差：

- **action span = 0 的回合**是空錄（人沒動），刪除重錄即可；
- **開頭的 |action−obs| 很大**是收斂段（正常），中後段一般 <10 單位。

## 在模擬裡錄「帶畫面」的資料（wrist 相機）

模擬機器人支援把場景裡的腕部相機（`sim_cam`）作為影像觀測錄進資料集：

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

要點：`--robot.image_camera=sim_cam`（相機名）+ `--dataset.video=true`（影像走影片編碼，pyav 回退已驗證可用）。
資料集特徵裡會出現 `observation.images.wrist`（480×640×3）。解析度和影格率可用
`--robot.image_width/--robot.image_height/--robot.image_fps` 調整。
開視窗時（`onscreen=true`，預設）除了主視角視窗，還會為**每個相機各開一個即時預覽視窗**
（腕部 / 俯視，視窗左上角有標註），錄製時可直接看到兩路畫面是否正常；不需要就加
`--robot.preview_cameras=false`。預覽視窗預設按 **15Hz** 更新（`--robot.preview_fps` 可調）——
它們是狀態顯示、不必跟隨主視窗的 50Hz，這樣同螢幕 3 個視窗時渲染負擔小得多。

**場景與頂視相機**（2026-10-16 起）：模擬場景自帶工作區——墊板、三色方塊（34mm）、收納盒（見 `so101_assets.add_workspace`，
佈局可用 `preview_workspace.py` 渲染微調）；另有一台固定頂視相機 `top_cam`（畫面上方 = 遠離機械臂方向）。
加 `--robot.top_camera=top_cam` 即把頂視畫面錄成 `observation.images.top`（雙相機同時錄）；只要腕部相機就去掉該參數。
單回合結束後的影片編碼會同時處理兩路畫面，等待時間略長屬正常。

## 回放

```bash
# 仿真空回放（窗口里看轨迹重演）
uv run --frozen --with mujoco python examples/so101_mujoco/replay.py \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision --dataset.episode=0

# 真机回放（同款机制，注意周围环境与录制时一致）
uv run --frozen --with mujoco python examples/so101_mujoco/replay.py \
    --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101 \
    --robot.use_degrees=false --robot.max_relative_target=10 \
    --dataset.repo_id=local/juxi_so101_teleop \
    --dataset.root=examples/so101_mujoco/outputs/datasets/juxi_teleop_run1 --dataset.episode=0
```

> 官方 `lerobot-replay` 入口不載入本專案外掛，直接用會報 `invalid choice: 'so101_mujoco'`——
> 所以統一走 `replay.py` 啟動器。

## 資料集格式與位置

資料集為 LeRobotDataset v3：`action` 與 `observation.state` 均為 6 維向量
（`shoulder_pan.pos … gripper.pos`），與官方實機資料集一致，可直接混合訓練。

```
examples/so101_mujoco/outputs/datasets/
└── juxi_teleop_run1/   真机键盘遥操（1 回合 / 2430 帧 / 81s）✅ 保留的真机数据
```

> 2026-10-16 清理：舊的模擬錄製（`sim_run2`、`sim_vision_demo`、`sim_vision_run1/2/3`）
> 已全部刪除。**正式資料集 `so101_sim_vision`（雙相機 / 5 回合 / 10610 影格 / 353.8s / h264）
> 已於當晚錄成 ✅**；每回合單機影片匯出在 `outputs/videos/so101_sim_vision/`，
> 雙相機預覽拼圖在 `outputs/renders/sim_vision_epN_dual.png`。

## 本次實測記錄（2026-10-15）

| 工作階段 | 內容 | 結果 |
| --- | --- | --- |
| 實機 run1 | 鍵盤遙控操作錄實機 | 1 回合 81s，六關節幅度 75–140 單位，30Hz 穩定 |
| 實機回放 | 同回合重放 | 2430 影格完整重現，無異常 |
| 模擬 run2 | 主動臂遙控操作錄模擬 | 5 回合 157s，ep1–4 跟隨誤差 <12 單位 |
| 模擬回放 ep1 | 視窗重演 | 軌跡與操作一致（已確認） |

## 追加實測（2026-10-16）

| 工作階段 | 內容 | 結果 |
| --- | --- | --- |
| 新主動臂（COM124） | 重新校正（新手臂/新伺服馬達）| ✅ 校正成功；`so101_leader_trim` 零點補償自動按新校正適配 |
| 視覺 run1 | 主動臂遙控操作錄模擬（含畫面）| 2 回合 / 3177 影格 / 106s @ 29.97Hz；跟隨誤差全程 ≤2 單位（僅首影格收斂 0.5s）；`observation.images.wrist` 影片入庫並解碼驗證 ✅ |
| 視覺 run2 | 雙相機續錄（`--resume`）| ep0（2776 影格 / 92.6s）無損；ep1 儲存時 libsvtav1 編碼器 OOM 整場崩潰 → 編碼器改 h264（`record.py` 預設注入）並端到端實測通過（2 回合 × 雙路編碼）；殘留已清理，正式重錄轉入 run3 |
| 視覺 run3 | 雙相機正式錄製（h264）| 第 1 場：ep0（185.2s / 5554 影格）+ ep1（72.8s / 2186 影格）入庫完好、健檢通過；場間編碼停頓期連按 `→` 觸發空回合崩潰（機制與防護見 [07](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)）→ 續場錄餘下回合（5 回合計畫）|
| 正式錄製首戰（so101_sim_vision）| 雙相機（h264 + 2 執行緒 + 預覽視窗 15Hz）| ep0（82.3s / 2469 影格）儲存時編碼器記憶體配置失敗整場崩潰（系統 commit 近滿，見 [07](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)）→ 已加**編碼失敗自動重試**與**主控台靜音**（均實測生效，冒煙 26 項全過）；待重啟機器後正式重錄 |
| 正式錄製（so101_sim_vision）✅ | 雙相機主動臂遙控操作，5 回合 | **5/5 回合全部入庫**：61.5 / 53.4 / 101.1 / 62.4 / 75.4 s，共 10610 影格 @29.97Hz、0 tick 超預算、零崩潰；六軸+夾爪全程有效動作；雙路影片解碼核驗通過 |

<RelatedProducts slugs="so-arm101" />
