---
title: "03 · 實機連線與校正"
description: "CH343 晶片的驅動板插上後即出現一個 COM 埠；編號會隨插拔/更換 USB 埠變化，每次連線前先確認："
---

# 03 · 實機連線與校正

> 前置：完成 [01 環境準備](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/01-Environment)（`feetech` extra 提供序列埠通訊）。
> 本章範例連接埠：從動臂 `COM172`、主動臂 `COM124`（本機現役主動臂的實測值）——**每次插拔都可能變更編號，
> 一律以第一步查到的實際連接埠為準**，下文指令裡的連接埠只需替換成你的編號。

## 辨識序列埠

CH343 晶片的驅動板插上後即出現一個 COM 埠；編號會隨插拔/更換 USB 埠變化，每次連線前先確認：

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
uv run --frozen python -c "import serial.tools.list_ports as lp; [print(p.device, '|', p.description, '|', p.hwid) for p in lp.comports()]"
```

輸出裡出現 `CH343`（或類似 USB 序列埠裝置）的那一行就是驅動板；記下它的 `COM` 編號。

## 第一步：唯讀初步檢查（接線/供電/伺服馬達健檢）

**不寫入任何東西**，先把六顆伺服馬達逐一 ping 一遍再讀取電壓溫度（力矩狀態原樣保留）：

```bash
uv run --frozen python examples/so101_mujoco/hardware_check.py --port COM172   # 换成你查到的端口
```

`--port` 就是第一步查到的編號；要檢查哪台手臂就填哪個埠（從動臂/主動臂都可用同一腳本檢查）。

正常輸出形如：六行關節、溫度 20–30 °C、力矩 0（手臂自由）。**電壓視供電方式而定**：從動臂接外接
電源時約 11V，主動臂僅靠驅動板供電時約 5V——能把六顆伺服馬達全部讀完即為接線正常。有缺漏/型號不符
會直接報錯。

## 第二步：校正

校正把「每個關節的行程範圍 + 中位參考」寫進伺服馬達 EEPROM 並儲存到本機檔案；**從動臂和主動臂都要各校正一次**。
兩台手臂的校正檔案分開存放，互不影響：

| 裝置 | 指令 | 校正檔案位置 |
| --- | --- | --- |
| 從動臂 | `uv run --frozen lerobot-calibrate --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101` | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/juxi_so101.json` |
| 主動臂 | `uv run --frozen lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM124 --teleop.id=juxi_leader` | `.../calibration/teleoperators/so_leader/juxi_leader.json` |

指令裡各參數的含義：

| 參數 | 說明 |
| --- | --- |
| `--robot.type=so101_follower` / `--teleop.type=so101_leader` | 校正對象角色：從動臂 / 主動臂（角色別寫反，校正檔案依角色分目錄存放） |
| `--robot.port` / `--teleop.port` | 第一步查到的序列埠編號 |
| `--robot.id` / `--teleop.id` | 為這台手臂取的名稱（本例 `juxi_so101` / `juxi_leader`）；**之後遙控操作/錄製必須使用同一個 id**，否則會再次提示校正 |

`id` 可以任意命名，但兩台手臂的校正各自獨立、互不覆蓋。

### 實體步驟（終端機會顯示示意圖）

1. **擺到中位姿態再按 Enter**：底座平放桌面邊緣，大臂豎直向上、小臂水平朝前，肩部旋轉與腕部居中
   （主動臂的「夾爪」是握把/扳機）。這一刻的位置會被記為該臂的「中位參考」。
2. 按 Enter 後**逐一關節緩慢劃過整個活動範圍**（`wrist_roll` 不用掃，會自動按整圈處理），再按 Enter 儲存。

注意事項：

- 從動臂校正期間力矩為 0（手臂是軟的），請用手扶著移動；主動臂本來就無力矩。
- 校正過程會向伺服馬達寫入 EEPROM（這是校正的一部分，正常）。
- 本次實測校正結果（供對照）：從動臂各關節行程約 1474–2688 計數、腕部旋轉（`wrist_roll`）4095 計數；
  主動臂約 2208–2681 計數。行程明顯不對稱是正常的（原因與補償見
  [05 零點微調](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin)）。

<RelatedProducts slugs="so-arm101" />
