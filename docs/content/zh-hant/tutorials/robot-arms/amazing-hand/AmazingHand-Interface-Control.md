---
title: "界面控制教程"
description: "AmazingHand Python GUI / 命令行控制工具：左右手選擇、安裝、標定、協議與常見問題。"
---

# 界面控制教程

## AmazingHand Python 控制工具（適用左手和右手）

用 Python 編寫的 GUI 與命令行工具，透過串口總線舵機驅動板控制 8 個 Feetech SCS0009 舵機，驅動 [Pollen Robotics 的 AmazingHand](https://github.com/pollen-robotics/AmazingHand) 靈巧手。

> **左右手都支援。** 啟動時選擇右手（舵機 ID 1-8）或左手（舵機 ID 11-18），--hand 可跳過提問。姿勢庫左右手共用，每隻手在 data/config.yaml 裡各自維護舵機映射、安裝偏移和原始值目標。詳見左右手選擇。

![圖示](../../../../../public/images/tutorials/robot-arms/amazing-hand/interface-control/01.png)

---

## 項目結構

```text
amazing_hand_gui.py   – GUI 主程序
amazing_hand_cmd.py   – 命令行工具
hand_logic.py         – 共用业务逻辑(不依赖 UI)
pyproject.toml        – 包元数据、依赖、pytest 配置
data/
  config.yaml         – 应用设置(串口、限位、原始值目标)
  hand_config.yaml    – 已保存的手势与序列
docs/
  REQUIREMENTS.md       – 需求与验收标准
  user_manual.md        – 用户手册
  CONFIG_FORMAT.md      – 配置文件格式说明
  scs_servo_protocol.md – SCS0009 寄存器参考
  优化说明.md            – 相对原版的改动说明与原因
  CHANGES.md            – 同一份文档的英文版
tests/
  test_hand_logic.py      – hand_logic 单元测试(155 项)
  test_gui_utils.py       – GUI 工具函数单元测试(51 项)
  test_cmd.py             – CLI 单元测试(42 项)
  test_integration.py     – 集成测试(14 项)
  test_system.py          – 子进程系统测试(22 项)
  test_system_hardware.py – 硬件测试(33 项,需 --hardware)
  test_cmd_hardware.py    – CLI 硬件测试(21 项,需 --hardware)
```

## 環境要求

- Python 3.10 或更高版本（GUI 需要包含 Tkinter）
- 為 8 個舵機提供獨立的 5V 外接電源
- 已安裝好驅動的 USB 串口總線適配器

## 安裝

推薦用 pip 安裝（讀取 pyproject.toml）：

```bash
pip install -e .
```

或直接安裝依賴：

```bash
pip install -r requirements.txt
```

開發與測試環境：

```bash
pip install -r requirements-dev.txt
```

---

## 標定

舵機的角度體系、手勢預設和中位都取決於具體的機械手。這些參數全部集中在 data/config.yaml。

### 左右手選擇

兩隻手用的舵機和機械結構都不同，所以界面彈出之前先選：

```text
  AmazingHand — which hand?
    1 = right hand  (servo IDs 1-8)
    2 = left hand   (servo IDs 11-18)
  Enter 1 or 2 [1]:
  LEFT hand — servo IDs 11-18
    Ring (11, 12)  Middle (13, 14)  Pointer (15, 16)  Thumb (17, 18)
    middle position raw: [571, 451, 571, 451, 571, 451, 571, 451]
```

跳過提問：

```bash
python amazing_hand_gui.py --hand left
python amazing_hand_cmd.py --pose victory --hand left
```

不加 --hand 時用 data/config.yaml 裡的 hand: 值。

**為什麼一隻手不只是換組 ID。** 除了舵機編號（右手 1-8、左手 11-18，且左手的手指編號是鏡像的 —— 無名指在前），左手還有兩處機械差異，程序都會自動處理：

|  | 右手 | 左手 |
|---|---|---|
| 舵機 ID | 1-8 | 11-18 |
| 手指 → ID | 食指 1,2 / 中指 3,4 / 無名指 5,6 / 拇指 7,8 | 無名指 11,12 / 中指 13,14 / 食指 15,16 / 拇指 17,18 |
| 廠商 MiddlePos | [451, 571, …] | [571, 451, …] |
| 安裝偏移 | 0° | **−35.16°**(hands.left.angle_offset) |
| 同指雙舵機 | (a, b) | **(b, a)**(hands.left.mirror_pose) |

上述後兩項漏掉任何一個手勢都會走形：安裝偏移會讓每根手指偏 35°，少了同指互換則張開方向整個反過來（V 字手勢兩指併攏、該併攏的三指反而張開）。

data/hand_config.yaml 是**左右手共用**的，儲存的永遠是右手序；左手在讀取時轉換、保存時換回。

**標定一隻新手。** 以 hands.left 裡的值為模板，然後按這個順序驗證：

1. 按 **Middle position**，看 Current (0-1023) 那行是否讀到預期的原始值
1. 按 **Open All** / **Close All** —— 行程應該到機械限位且不堵轉
1. 試一個張開手勢（victory 張成 V 字、greeting 三指併攏）

哪一項不對，該調哪個參數：

| 現象 | 改哪裡 |
|---|---|
| Middle position 讀數不對 | hands.<名稱>.raw_positions.middle |
| 張開方向反了 | hands.<名稱>.mirror_pose |
| 行程不夠或過頭 | hands.<名稱>.raw_positions.open / close |

### 角度體系

GUI 和 CLI 都使用**角度值**，由 rustypot 驅動換算成舵機內部的原始值：

```text
raw = 1024 × angle / 300° + 511        (0.29297°/step,原始值范围 0–1023)
```

| 角度 | 含義 |
|---|---|
| **−35°** | 完全張開（伸直） |
| **0°** | 中位，手指自然微屈 |
| **+75°** | 完全握緊（拳） |

偶數 ID 舵機相對奇數 ID **取反**，所以一個姿勢值就能讓同一根手指的兩個舵機朝相反方向運動。這一點由程序自動處理，你不需要手動換算。

### 限位

```text
limits:
  servo_min: -75      # 任何舵机指令的绝对行程上下限
  servo_max: 75
  base_min: -75       # 开合滑块范围
  base_max: 75
  side_min: -35       # 左右滑块范围
  side_max: 35
```

side_min/side_max 控制**左右張開**。由於程序做了歸一化（u = |side_offset| / |side_min|），**只改這個範圍不會改變實際張開幅度**，只是把滑塊刻度壓縮了。要真正改變手指張開的角度，必須同時修改 auto_extremes。

### 原始值目標

三個全局位置按鈕把舵機驅動到**精確的原始值**，不經過角度模型：

```text
raw_positions:              # 下标 0 -> 舵机 ID 1 …… 下标 7 -> 舵机 ID 8
  open:   [260, 760, 260, 760, 260, 760, 260, 760]
  close:  [760, 260, 760, 260, 760, 260, 760, 260]
  middle: [451, 571, 451, 571, 451, 571, 451, 571]
```

- open / close —— 機械行程兩端。用廠商的 Feetech 調試工具單獨驅動舵機測出來。
- middle —— **標定後的機械中位**（即廠商 Arduino 演示程序裡的 MiddlePos）。注意它**不是** open 和 close 的中點，而是偏離 raw 511 約 **±60 raw（±17.6°）**。

> 這些是**每隻手各自的標定值**。廠商原話是 *"replace values by your calibration results"*。

**如何校驗：** Servo Feedback 面板有一行 Current (0-1023)，實時顯示原始位置。按下 **Middle position** 按鈕後，這一行應該讀到 451, 571, 451, 571, …。

### 控件範圍速查

| 控件 | 範圍 |
|---|---|
| 開合滑塊（縱向） | −75 … +75 |
| 左右滑塊（橫向） | −35 … +35 |
| 速度 | 1（慢） … 6（快） |

速度值會由驅動當作 rad/s 傳給舵機，所以 1–6 大致對應 **57–344 °/s**。帶載後實際速度約為該值的 **70%** —— 安排序列延遲時要把這一點算進去。

---

## 執行 GUI（amazing_hand_gui.py）

pip 安裝後可直接呼叫：

```text
amazing-hand-gui
amazing-hand-gui --port /dev/ttyUSB0
```

或直接執行：

```bash
python amazing_hand_gui.py
python amazing_hand_gui.py --port /dev/ttyUSB0
```

串口下拉選單會列出本機**實際存在的**串口（優先使用 pyserial，沒有則讀取 Windows 註冊表），所以編號靠後的適配器也能顯示出來。下拉選單可以直接手動輸入串口名。配置裡的預設串口沒插時，GUI 會自動從第一個真實串口啟動；想固定串口就明確傳入 --port。

### 功能

- 逐指滑塊控制開合與左右，支援 **Auto**（開合 + 左右）和 **Raw**（直接控制兩個舵機角度）兩種模式
- 逐指 Open / Close / Center 快捷按鈕
- 逐指速度選擇（1–6），另有全局速度同步下拉選單
- 鍵盤快捷鍵，便於精確微調
- **全局位置按鈕**：Open All、Close All、Center All、Middle position
- 基於 data/hand_config.yaml 的手勢與序列管理
- 可直接在界面上刪除已保存的手勢（🗑 Delete 按鈕）
- 實時舵機遙測曲線（位置、負載、溫度、電壓）
- Servo Feedback 表格，含實時**原始位置**（0–1023），可用於標定校驗

### 鍵盤操作

- **1-4**：選擇手指（Ring 無名指、Middle 中指、Pointer 食指、Thumb 拇指）
- **方向鍵**：移動選中的手指
  - 上/下：握緊 / 張開
  - 左/右：左右移動
- **修飾鍵**：
  - 無：每次 1°（精調）
  - Shift：每次 5°（常規）
  - Ctrl：每次 10°（快速）
- **快捷動作**：
  - Q：選中的手指完全握緊
  - E：選中的手指完全張開
  - C：左右位置回正

### 全局按鈕

| 按鈕 | 開合 | 左右 |
|---|---|---|
| ✋ **Open All** | 所有手指到原始值 open | 回正 |
| ✊ **Close All** | 所有手指到原始值 close | 回正 |
| ⊙ **Center All** | **保持不變** | 回正 |
| ⊙ **Middle position** | 所有手指到原始值 middle | 回正 |

**Global Speed** 下拉選單（1–6）會立刻把選定速度應用到所有手指控件，並同步各指的滑塊顯示。

三個原始值按鈕（Open All、Close All、Middle position）繞過了角度模型，因此**執行後滑塊顯示的是最接近的可表示值，而不是精確值**。之後再碰滑塊，手會偏離原始目標最多約 0.3° —— 這是為了精確命中標定位置的刻意取捨。

> 已知問題：Center All **不會**跳過處於 **Raw** 模式的手指，會覆蓋你手動設置的原始角度。單指的 ⊙ Center 按鈕則不會。

---

## 執行 CLI（amazing_hand_cmd.py）

獨立的命令行工具，無需啟動 GUI 即可應用手勢和播放序列。它讀取與 GUI 相同的 data/hand_config.yaml，並**逐字發送**儲存的姿勢值 —— 與 GUI 發出的完全一致。

### Linux：串口權限

USB 串口適配器通常表現為 /dev/ttyACM0（Waveshare / CDC-ACM）或 /dev/ttyUSB0（FTDI / CH340）。

查找方式：

```bash
ls /dev/ttyACM* /dev/ttyUSB* 2>/dev/null
# 或者
dmesg | grep -E 'ttyACM|ttyUSB' | tail -5
```

如果報 **Permission denied**，把當前用戶加入 dialout 組後重新登入：

```bash
sudo usermod -aG dialout $USER
```

### pip 安裝後

```text
amazing-hand-cmd --list
amazing-hand-cmd --pose open
amazing-hand-cmd --sequence demo --loop
amazing-hand-cmd --pose open --speed 6
# 需要时覆盖串口:
amazing-hand-cmd --pose open --port /dev/ttyUSB0
```

### 直接執行

```bash
python amazing_hand_cmd.py --list
python amazing_hand_cmd.py --pose open
python amazing_hand_cmd.py --pose close --speed 6
python amazing_hand_cmd.py --sequence demo
python amazing_hand_cmd.py --sequence wave --loop
python amazing_hand_cmd.py --port /dev/ttyUSB0 --pose open
python amazing_hand_cmd.py --list --config /path/to/hand_config.yaml
```

### 參數

| 參數 | 默認值 | 說明 |
|---|---|---|
| --pose NAME | – | 應用指定名稱的手勢 |
| --sequence NAME | – | 播放指定名稱的序列 |
| --list | – | 列出所有手勢與序列 |
| --loop | 關 | 循環播放序列，直到 Ctrl+C |
| --speed N | 3 | 舵機速度 1（慢）… 6（快） |
| --port PORT | Linux /dev/ttyACM0<br>Windows COM9 | 串口名稱 |
| --baudrate N | 1000000 | 波特率 |
| --config PATH | data/hand_config.yaml | 指定其他配置文件 |
| --hand {right,left} | config.yaml 的 hand | 指定使用哪隻手（右手 1-8，左手 11-18） |

腳本退出時（包括 Ctrl+C）會自動關閉所有舵機的力矩。

> CLI 沒有對應 data/config.yaml 的 --config 參數，該文件始終從項目目錄加載。

---

## 配置文件

### data/config.yaml

| 段落 | 用途 |
|---|---|
| serial | 各平台默認串口、波特率、可選波特率列表 |
| servos | 每根手指對應的舵機 ID |
| limits | 舵機與兩個滑塊的角度範圍 |
| speeds | 1–6 速度刻度的默認值/最小/最大值 |
| auto_extremes | 左右滑塊到極限時的舵機位置 |
| raw_positions | 全局位置按鈕的精確原始值目標 |
| paths | 手勢/序列文件的位置 |

### 舵機與手指的對應關係

| 手指 | 舵機 ID | 姿勢數組下標 |
|---|---|---|
| Pointer 食指 | 1, 2 | 4, 5 |
| Middle 中指 | 3, 4 | 2, 3 |
| Ring 無名指 | 5, 6 | 0, 1 |
| Thumb 拇指 | 7, 8 | 6, 7 |

**姿勢數組的順序是 無名指、中指、食指、拇指，不是按舵機 ID 排列。** 手動編輯 hand_config.yaml 時這是最容易搞錯的一點。

> amazing_hand_cmd.py 頂部的註釋寫著 "index 0→servo1 … 7→servo8"，**那個註釋是錯的**，上表才是代碼的真實行為。

---

## 手勢與序列

所有手勢和序列都保存在 data/hand_config.yaml。文件不存在時 GUI 會自動創建。

### 保存手勢

1. 用滑塊或鍵盤把手擺到目標姿勢
1. 在 "Name:" 輸入框填入名稱
1. 點擊 Pose Management 區域的 "➕ Add New"

速度只影響滑塊的移動快慢；保存的手勢只記錄 8 個舵機位置。

### 加載 / 刪除手勢

- 從下拉選單選擇後點擊 **✓ Apply** 讓手移動到該姿勢
- 點擊 Apply 右側的 **🗑 Delete**，確認後永久刪除

### 序列管理

1. 在 Sequence Player 中點擊 "🔧 Manage" 打開序列管理器
1. **Saved Sequences**（左欄）
  - 查看、執行、編輯或刪除已有序列
  - 雙擊或點擊 "▶ Execute" 執行一次

1. **Sequence Builder**（右欄）
  - 雙擊 "Available Poses" 中的手勢即可加入為一步
  - 可為每一步單獨設置 8 個舵機的速度和延遲；步驟以 "pose:s1,s2,...,s8|delay" 形式保存
  - 用 ↑/↓ 調整順序，或用 "⏱ Delay" 按鈕插入獨立暫停
  - 填好名稱後點擊 "💾 Save Sequence" 保存；點 "▶ Execute" 可先試跑不保存

1. 回到主窗口，需要連續播放時勾選 Sequence Player 裡的 **Loop**

### 步驟格式

```text
pose_name:speed1,speed2,...,speed8|delay
```

- speed1..speed8 —— 按姿勢順序排列的 8 個舵機速度（1–6）
- delay —— 距離下一步的等待時間，如 0.6s。**可省略**；省略時 GUI 會退回到固定的自動等待
- 獨立暫停寫作 SLEEP:1.0s（沒有逗號分隔的速度列表）

**延遲的選取。** 驅動本身能讀到舵機是否停止，但序列播放用的是固定延遲。大致按 行程角度 / (速度 × 57.3 × 0.7) 秒來估算，並留出餘量 —— 在帶載的手上，超過約 130° 的動作在速度 3 下需要 1.0 秒以上。

### YAML 格式示例

```text
poses:
  open:
    positions: [-35, -35, -35, -35, -35, -35, -35, -35]
  close:
    positions: [75, 75, 75, 75, 75, 75, 75, 75]
  ring_close:                 # 无名指握紧,其余张开
    positions: [75, 75, -35, -35, -35, -35, -35, -35]

sequences:
  demo:
    steps:
      - "open:3,3,3,3,3,3,3,3|2.0s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
      - "ok:3,3,3,3,3,3,3,3|1.0s"
      - "victory:3,3,3,3,3,3,3,3|1.0s"
      - "greeting:3,3,3,3,3,3,3,3|1.5s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
  wave:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.8s"
      - "wave_r:5,5,5,5,5,5,5,5|0.6s"
      - "wave_l:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.8s"
  finger_roll:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.5s"
      - "ring_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
      - "middle_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
```

循環播放由運行時控制（GUI 的複選框），不再寫入 YAML。

---

## 測試

項目包含 284 項單元/集成/系統測試，以及 54 項硬件測試。

### 執行全部測試（無需硬件）

```text
pytest
```

### 執行 GUI + CLI 硬件測試（需要連接舵機）

```text
pytest tests/test_system_hardware.py --hardware --port /dev/ttyACM0
pytest tests/test_cmd_hardware.py --hardware --port /dev/ttyACM0
# 或两个一起:
pytest tests/test_system_hardware.py tests/test_cmd_hardware.py --hardware
```

test_system_hardware.py 驗證連接、手勢應用、遙測讀取、單指張合/揮手、速度控制、序列執行與運動檢測。

test_cmd_hardware.py 端到端驗證 CLI 層：姿勢位置、速度參數、序列步驟、wait_for_motion、--list 輸出，以及退出時關閉力矩。

完整的驗收標準見 docs/REQUIREMENTS.md。

> 注意：非硬件測試斷言的是 hand_logic.py 裡的**兜底默認值**，那套默認值仍是原版的 −40…110 尺度。運行時 data/config.yaml 會覆蓋它們，所以無論你怎麼標定，測試都能通過 —— 但也意味著**測試並不會校驗你當前的標定參數**。

---

## 舵機 ID 配置

用 Feetech 官方軟件配合串口總線驅動配置舵機 ID 的教程：[https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/](https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/)

Feetech 軟件下載：[https://github.com/Robot-Maker-SAS/FeetechServo](https://github.com/Robot-Maker-SAS/FeetechServo)

---

## 致謝

原始項目：[Betatester777](https://github.com/Betatester777/AmazingHandControl) 硬件與參考固件：[Pollen Robotics](https://github.com/pollen-robotics/AmazingHand)
