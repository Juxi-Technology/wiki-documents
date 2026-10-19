---
title: "02 · 模擬模型驗證（MJCF 載入與驅動）"
description: "SO-ARM101 的三份公開 MJCF 模型，本專案全部驗證可用："
---

# 02 · 模擬模型驗證（MJCF 載入與驅動）

> 前置：完成 [01 環境準備](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/01-Environment)。本章全部是模擬驗證，不需要連接硬體。

## 模型來源

SO-ARM101 的三份公開 MJCF 模型，本專案全部驗證可用：

| 簡稱 | 檔案 | 來源 |
| --- | --- | --- |
| 官方-新校正 | `SO101/so101_new_calib.xml` | TheRobotStudio/SO-ARM100 官方儲存庫（本教學的比對驗證取自該處；本儲存庫不附帶原始 zip） |
| 官方-舊校正 | `SO101/so101_old_calib.xml` | 同儲存庫（zip 中沒有，需下載） |
| ROS2 描述套件 | `so_arm101_description/mjcf/so_arm101.xml` | 本儲存庫教學附件 `SO-ARM101_ROS2.zip` |

註：zip 解壓流程由早期版 `so101_assets.py` 提供並保留可供查閱；2026-10-16 起模擬機器人已遷移到
**mujoco_menagerie 的 SO-ARM100 模型**（以 vendored 形式置於 `assets/menagerie_so_arm100/`，
遷移原因與要點見 [07](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) 設計說明）。

## 驅動與渲染驗證

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 仓库自带、可直接运行的是 menagerie 模型（仿真机器人默认也用它）
uv run --frozen --with mujoco python examples/so101_mujoco/load_and_drive.py \
    --model examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml \
    --out-dir examples/so101_mujoco/outputs/renders/model_check
```

| 參數 | 說明 |
| --- | --- |
| `--model` | MJCF 模型路徑。儲存庫自帶可直接使用的是 `examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml`（上表三份歷史模型如需複驗，先從「來源」欄對應儲存庫取得，再把路徑換過去） |
| `--out-dir` | 產物目錄：驗證影片、靜態影格與結構摘要 txt 都寫在這裡（預設 `out`） |
| `--tag` | 產物檔案名稱前綴，預設取模型檔案名稱 |
| `--settle` / `--fps` / `--width` / `--height` | 每個姿態的穩定時長（秒）、影片影格率、渲染解析度；預設 25 fps、960×720，一般不用改 |

腳本會輸出結構摘要（關節/致動器/增益/範圍）、渲染一段「六關節逐一掃掠 + 協調正弦」的驗證影片和靜態影格。
結構摘要範例見 `reports/`（隨儲存庫提供）；對照影片（`media/`）體積較大，不隨儲存庫提供——依上面的指令可隨時重新產生。

## 三模型關鍵差異（實測）

| 項目 | 官方-新校正 | 官方-舊校正 | ROS2 描述套件 |
| --- | --- | --- | --- |
| 零位語義 | 關節**行程中點** | 水平**完全伸展**位 | 行程中點 |
| 關節名稱 | `shoulder_pan` | 同左 | `shoulder_pan_joint`（後綴） |
| 位置增益 | kp=998.22, kv=2.731 | **kp=17.8, kv=0** | kp=998.22 |
| 夾爪單位 | 弧度 hinge | 弧度 hinge | **0–1 正規化** |
| 自碰撞排除 | 無 | 無 | 有（6 對） |

**追蹤誤差實測**：新校正與描述套件靜止保持誤差 0.0005 rad，舊校正 0.03 rad（下垂約 1.7°，kp 弱 56 倍）。
在模擬裡評估同一策略，換模型會得到不同動態，注意記錄用的是哪一份。

## 必須記住的模型行為

1. **`shoulder_lift` 正方向朝下**：驅動力矩中「下擺」使用正角度，做遙控操作映射或資料換算時先驗證符號。
2. **壓地即擋**：下擺極限會讓指尖接觸地面並被擋停（腳本內建 8cm 離地保護會自動裁剪幅度）。
3. 官方模型無相機、無 keyframe；帶相機的變體 `so101_new_calib_camera.xml` 存在，後續錄製視覺資料時可用。

<RelatedProducts slugs="so-arm101" />
