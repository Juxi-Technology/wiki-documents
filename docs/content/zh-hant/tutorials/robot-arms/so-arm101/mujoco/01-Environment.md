---
title: "01 · 環境準備"
description: "一次性操作。本儲存庫使用 uv 管理一個專案內隔離的 ."
---

# 01 · 環境準備

一次性操作。本儲存庫使用 **uv 管理一個專案內隔離的 `.venv`**——`uv run` 只會使用這個目錄裡的環境，
不會動到你的 conda（這個設計是刻意的，見 [07 常見問題](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)）。

## 安裝

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'   # 本机特例，见 07

# CPU 版 torch（本机无独显；有 NVIDIA GPU 的机器去掉 UV_TORCH_BACKEND 并参考 pyproject 注释换 CUDA 版）
UV_TORCH_BACKEND=cpu uv sync --frozen --extra core_scripts --extra feetech --extra pynput-dep --extra training
```

四個 extra 的用途：

| extra | 提供什麼 | 誰需要 |
| --- | --- | --- |
| `core_scripts` | 官方 record / teleoperate / calibrate / replay 入口 + 資料集 + 視覺化相依性 | 全部 |
| `feetech` | `scservo_sdk`（STS3215 伺服馬達序列埠協定） | 實機相關操作 |
| `pynput-dep` | 全域鍵盤監聽 | 鍵盤遙控操作、錄製回合控制鍵 |
| `training` | `accelerate` / `wandb` 等 | `lerobot-train` 訓練、策略部署（`lerobot-rollout`） |

需要時再臨時疊加 MuJoCo（不進鎖定檔，按需載入）：

```bash
# 末尾换成你要运行的脚本；下面这条是仿真遥操的例子
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py
```

三個部分怎麼解讀：`uv run` 使用本儲存庫的 `.venv` 執行指令；`--frozen` 嚴格依照 `uv.lock` 使用已鎖定的
版本、不重新解析相依性；`--with mujoco` **僅對本次指令**臨時疊加 MuJoCo 套件——下一條指令不帶，環境裡
它就不存在，所以 02–09 裡的模擬指令都帶著這個前綴。

裝完這一章，02–09 的所有指令都可以直接執行：`training` extra（訓練/部署所需）已包含在上面的
`uv sync` 裡，後續**不需要再補裝任何相依性**。

**想改用 conda 環境**？那執行指令就不需要 `uv run` 前綴了——建立環境的三條指令與注意事項見
[09 完整使用教學 · 附錄 A](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)。

## 驗證

```bash
uv run --frozen --with mujoco python -c "import mujoco, scservo_sdk, pynput, lerobot, torch; print('OK')"
uv run --frozen lerobot-calibrate --help | head -3   # 官方入口可用
```

## 常見問題

- **`uv sync` 報 `failed to persist temporary file ... os error 17`**：本機 uv 快取目錄跨磁碟的
  特例，使用上面的 `UV_CACHE_DIR` 前綴即可，詳見 [07](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)。
- **不要使用 Microsoft Store 版 Python**：選 uv 自動管理的 Python 3.12 即可。
- 首次 `uv run --with mujoco` 會下載約 5.6MB 的 mujoco wheel，之後走快取。

<RelatedProducts slugs="so-arm101" />
