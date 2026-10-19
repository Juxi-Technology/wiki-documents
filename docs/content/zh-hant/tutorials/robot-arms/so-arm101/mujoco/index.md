---
title: "SO-ARM101 × MuJoCo 全流程教學（索引）"
---

# SO-ARM101 × MuJoCo 全流程教學（索引）


> 本教學記錄並重現 SO-ARM101 的**模擬 + 實機完整工作流程**：從環境建置、模型驗證、實機校正，
> 到鍵盤/主動臂遙控操作、資料錄製與回放。所有指令均於 2026-10-15 的實機 + 模擬工作階段中實測通過。
>
> 適用對象：Juxi SO-ARM101 套件使用者與內部工程師。不要求事先了解 MuJoCo 或 LeRobot。

## 全流程地圖（兩條軌，共用一套元件）

```
                         ┌──────────────── 共用组件 ────────────────┐
                         │  数据集格式(LeRobotDataset) · 回放 · 未来训练  │
                         └──────────────────────────────────────────┘
                                      ▲                    ▲
        ┌── 真机轨 ──────────────────┘                    └──────────── 仿真轨 ──┐
        │  操控: 主动臂(实体) / 键盘                                      操控: 键盘 / 主动臂(实体) │
        │  被控: 真机从动臂 (COM 串口)                                    被控: MuJoCo 仿真从动臂   │
        │  命令: --robot.type=so101_follower                            命令: --robot.type=so101_mujoco │
        └───────────────────────────────────────────────────────────────────────┘
```

| 章 | 內容 | 你會得到 |
| --- | --- | --- |
| [01 環境準備](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/01-Environment) | uv 環境、相依性 extras、Windows 注意事項 | 可執行的環境 |
| [02 模擬模型驗證](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification) | 三份 MJCF 模型載入/比對/驅動渲染 | 對模型與模擬行為的確信 |
| [03 實機連線與校正](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration) | 序列埠辨識、唯讀初步檢查、從動臂/主動臂校正 | 可被軟體辨識的兩台手臂 |
| [04 鍵盤遙控操作](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/04-Keyboard-Teleop) | 鍵盤驅動實機/模擬、速率調參、安全限速 | 最快的手動控制方式 |
| [05 主動臂數位孿生](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin) | 實體主動臂驅動模擬從動臂、零點微調 | 數位孿生示範與資料蒐集 |
| [06 資料錄製與回放](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay) | 錄實機/錄模擬/回合控制/回放/健檢腳本 | 可訓練的資料集 |
| [07 常見問題與經驗](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) | 本流程遇過的所有問題與解法 | 疑難排解手冊 |
| [08 後續路線](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/08-Roadmap) | 相機、物體場景、自動資料生成、訓練 | 下一步計畫 |
| [09 完整使用教學](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) | 開臂 → 錄製 → 健檢 → 看影片 → 訓練 → 模擬部署一條龍；含 conda 環境替代方案 | 從零到合格資料集，再到策略上場 |

**首次使用順序建議**：01（環境）→ 03（接實機時才需要）→ 按 [09 完整使用教學](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)
走主線（錄製 → 健檢 → 看影片 → 訓練 → 部署）；02 與 04–08 是參考手冊，按需查閱即可。
09 裡的每條指令都可以直接複製執行，不需要中途回到其他章節補裝環境。

## 三條必須記住的約定

1. **單位制**（三方對齊）：五個身體關節使用 **−100 到 100**（行程比例，0 = 行程中點），夾爪使用
   **0 到 100**（0 = 閉合）。實機（`use_degrees=false`）、模擬、主動臂全部對齊這項約定；錄出的資料集與官方
   `lerobot/svla_so101_pickplace` 等實機資料集結構一致（6 維向量 + 關節名稱）。
2. **角色對應**：被控對象（實機或模擬）永遠搭配 `--robot.*`；操控裝置（鍵盤/主動臂）永遠搭配 `--teleop.*`。
3. **本機指令前綴**：這台開發機上所有 `uv` 指令需要先設定快取目錄（原因見 [07](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)）：

   ```bash
   export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
   ```

## 實測環境

| 項目 | 版本 |
| --- | --- |
| 系統 | Windows 11 |
| Python / uv | 3.12.9 / 0.12.5 |
| lerobot | 0.6.2（本儲存庫，專案 `.venv` 隔離，不影響 conda） |
| MuJoCo | 3.16.0 |
| PyTorch | 2.11.0（CPU 版） |
| 硬體 | SO-ARM101 主動臂（COM124）+ 從動臂（COM172），CH343 序列埠晶片 |

<RelatedProducts slugs="so-arm101" />
