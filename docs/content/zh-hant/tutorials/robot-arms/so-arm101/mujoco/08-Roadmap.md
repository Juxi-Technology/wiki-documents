---
title: "08 · 後續路線"
description: "已完成的："
---

# 08 · 後續路線

## 已完成（本儲存庫可直接執行）

| 能力 | 狀態 |
| --- | --- |
| 模擬模型載入/驅動/渲染驗證（3 份 MJCF） | ✅ |
| 鍵盤遙控操作（模擬 / 實機） | ✅ 實機驗證 |
| 主動臂數位孿生（實體手臂 → 模擬手臂，含零點微調） | ✅ 實機驗證 |
| 資料錄製（實機 / 模擬）＋ 回合控制 ＋ 健檢腳本 | ✅ 實機驗證 |
| 資料回放（實機 / 模擬，官方機制） | ✅ 實機驗證 |
| 自動化冒煙測試（無硬體 `smoke_test.py`） | ✅ 26 項通過 |
| 雙相機視覺資料集 `so101_sim_vision`（5 回合 / 10610 影格 / 353.8s） | ✅ |
| 訓練（ACT）與模擬策略部署（`lerobot-train` / `lerobot-rollout`） | ✅ 冒煙實測（見 [09](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)） |

## 下一步（按價值排序）

### 階段 2 · 相機進場景（進行中）

**已完成的**：
- 支架（STEP→STL）與相機（按 HBVCAM-F2170HD V22 資料表 25×30×5.2mm 建的佔位體）裝配進模擬，
  位姿經 `adjust_mount.py` / `adjust_camera.py` 實機對照調整；
- `<camera>` 元素接入（`sim_cam`，fovy 初值 49°），**模擬視覺錄製鏈路已打通**：
  `--robot.image_camera=sim_cam` 即產出 `observation.images.wrist` 影片資料集（冒煙測試 [5] 全過）。

**2026-10-16 更新**：相機瞄準/fovy 已調到滿意（`adjust_camera.py` 新增 **live view 即時畫面視窗**，
斷點續調、視窗誤關自動重開；並修復了 MuJoCo 相機取景方向=**元素 −Z** 導致的「鏡頭指向與畫面反向」bug，
詳見 [07](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)）。已用新校正的主動臂正式錄成視覺資料集（含 wrist 影片，跟隨誤差 ≤2 單位）✅；
舊的實驗錄製已於 2026-10-16 清理，正式資料集統一為 `so101_sim_vision`（雙相機）。
**同日模擬機器人遷移到 mujoco_menagerie 的 SO-ARM100 模型**（2026-10-16）：原教學模型爪無法夾取，
新模型爪部為實機 CAD 碰撞、實測可穩定夾住 34mm 方塊；錄製/遙控操作/雙相機/工作區鏈路全部保留，
待一次實機遙控操作複核（尤其 wrist_roll 方向符號）。
**待完成的**：實機 HBVCAM 接上後做「實機拍 vs 模擬渲染」對照微調；
可選：相機本體 STL 替換佔位體。實機側相機設定（`--robot.cameras` OpenCV）後續同做。

### 階段 3 · 場景與規模化（進行中）

- ✅ 工作區進入場景（2026-10-16）：墊板 + 三色方塊（34mm，可抓取）+ 收納盒 + 固定頂視相機 `top_cam`
  （定義在 `so101_assets.add_workspace`，渲染/收益檢查工具 `preview_workspace.py`）；**雙相機（wrist+top）
  錄製鏈路已打通**（`--robot.top_camera=top_cam`）；
- **自動資料生成**：腳本策略/RL 在模擬裡整夜批次跑（無人在環），這是「幾十倍效率」的來源；
- 視覺域隨機化（紋理/光照/相機抖動）為 sim2real 做準備。

### 階段 4 · 訓練與部署

- ✅ **訓練/部署鏈路已實測**（2026-10-16）：`lerobot-train`（ACT，CPU 12 步冒煙——約 2s/步、loss 正常下降、
  checkpoint 按預期寫入磁碟）與 `lerobot-rollout --strategy.type=base`（在模擬裡實際執行策略 20s、
  自動把手臂送回初始位姿後收場）均已打通；完整指令、要點與續訓方法見 [09](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) 第 7/8 節，
  教學自帶示範 checkpoint `outputs/train/smoke_act` 可直接用來試通部署鏈路；
- 正式訓練在 **有 GPU 的機器**上進行（ACT / SmolVLA；本機純 CPU 僅適合小步數驗證鏈路）；
  資料集複製或推 HF 私有儲存庫即可；
- 實機部署同樣走 `lerobot-rollout`（把 `--robot.*` 換成 `so101_follower` 設定）。

### 長期 · sim2real

模擬資料 + 少量實機資料混訓 → 實機零成本評估（模擬裡可重現評測策略成功率）。
注意：純模擬資料直接上實機（零樣本遷移）是最難的路線，先做「短閉環」（實機資料訓練→實機部署），
模擬逐步疊加。

## 一句話定位

對已有實體手臂的團隊：模擬 = **開發沙盒 + 示範資料 + 資料放大器**；
對潛在客戶：模擬 = **買之前就能走完整個流程的體驗工具**。

<RelatedProducts slugs="so-arm101" />
