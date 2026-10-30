---
title: "AmazingHand PWM 靈巧手 — 全流程使用教程"
description: "從 ESP32-S3 PWM 固件、上位機手勢指令到 GUI / dora 手勢追蹤的 AmazingHand PWM 版全流程教程。"
---

# AmazingHand PWM 靈巧手 — 全流程使用教程

> **配套交付包：** [delivery_package.zip](/downloads/delivery_package.zip)


> 從**上位機手勢指令**到**手勢追蹤**，一條龍使用教程。
> 適用硬件：ESP32-S3 + 8 路 PWM 舵機（差動驅動）。
>
> 版本：2026-08-20 · 配套固件：ESP-IDF 組件化版（`AmazingHand_Serial`）

---

## 第 0 章 教程導航

本教程按**先後順序**組織。先看清你要走哪條路線，再跳到對應章節。

| 路線 | 用途 | 前置要求 | 章節 |
|------|------|----------|------|
| **A. 上位機手勢指令** | 點按鈕/敲命令讓機械手做手勢（石頭/剪刀/布/真棒…） | Python + 燒錄固件 | 第 1-4 章 |
| **B. GUI 內置手勢追蹤** | 攝像頭跟隨手部動作，機械手實時復現（簡化版，無 IK） | A + 64位Python + mediapipe | 第 1-4 章 + 5.1 |
| **C. dora 官方 IK 追蹤** | 官方完整鏈路：攝像頭→IK→8關節角→舵機（完整版） | A + Rust + uv + dora | 第 1-4 章 + 5.2 |

**推薦路線**：
- 第一次用 → 走 **A**，先確認固件和接線沒問題。
- 想快速看攝像頭跟隨 → 走 **B**（輕量，幾分鐘裝好）。
- 要正式、完整的追蹤 → 走 **C**（官方鏈路，精度最高）。

三條路線的硬件共用，環境只有**路線 C** 需要額外裝 Rust/uv/dora。

---

## 第 1 章 環境準備

按先後順序安裝。**路線 A/B 只需要第 1.1 節；路線 C 還需要第 1.2 節。**

### 1.1 上位機環境（路線 A/B 必需）

#### ① 64 位 Python 3.12

> **必須 64 位**。mediapipe 0.10.14 只提供 64 位 Windows wheel，32 位裝不上；
> 這也是 GUI 雙擊閃退的常見原因。

- 推薦安裝到 `D:\Python312-64bit`（本機已有該路徑）。
- 安裝時勾選 **Add to PATH**。
- 驗證（64 位）：

```bash
py -3.12-64 -c "import sys; print('64bit' if sys.maxsize > 2**32 else '32bit')"
# 输出: 64bit
```

#### ② 安裝上位機依賴

項目根目錄（包含 `hand_gui.py` 的目錄）：

```bash
pip install -r requirements.txt     # 只需 pyserial
```

#### ③ 追蹤附加依賴（路線 B 用）

項目根目錄運行：

```bash
setup_tracking.bat
```

它會自動：找 64 位 Python → 建 `tracking_env` 虛擬環境 → 安裝 `requirements-tracking.txt`
（mediapipe==0.10.14、numpy<2、scipy、opencv、Pillow、pyserial）→ 驗證 mediapipe。

> 或手動安裝：
> ```bash
> D:\Python312-64bit\python.exe -m pip install -r requirements-tracking.txt
> ```

### 1.2 dora 官方 IK 環境（路線 C 必需）

**客戶安裝**：雙擊 `..\02_hand_tracking\Demo\Windows_Scripts_CN\1-安装环境.bat`（英文版為 `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\1-Install_Env.bat`），自動安裝全部依賴：
Rust 工具鏈、uv（Python 包管理）、dora-cli。

> 裝完後**關掉終端重新打開**一次，讓 PATH 生效。
> 詳細依賴（版本、手動安裝方式）見維護文檔，無需客戶處理。

---

## 第 2 章 硬件接線

### 2.1 硬件清單

| 硬件 | 說明 |
|------|------|
| ESP32-S3 開發板 | YX-ESP32-S3 或同類 |
| 8 路 PWM 舵機 | 模擬舵機，差動驅動 |
| 舵機轉接板 | 舵機 → 8 路 PWM 輸出 |
| 獨立 5V 電源 | **至少 5V 3A**，舵機瞬態電流大 |
| USB 數據線 | ESP32-S3 Type-C → PC |
| 攝像頭 | 內置或 USB 攝像頭（追蹤用） |

### 2.2 GPIO 映射

轉接板 PWM1-8 → ESP32-S3 GPIO：

| 轉接板 | GPIO | 手指 |
|--------|------|------|
| PWM1 | 4 | 食指關節 1 |
| PWM2 | 5 | 食指關節 2 |
| PWM3 | 6 | 中指關節 1 |
| PWM4 | 7 | 中指關節 2 |
| PWM5 | 15 | 無名指關節 1 |
| PWM6 | 16 | 無名指關節 2 |
| PWM7 | 17 | 拇指關節 1 |
| PWM8 | 18 | 拇指關節 2 |

> **左右手共用同一套 GPIO**。左手/右手由軟件切換（第 4 章），不用改接線。

### 2.3 供電要求

- 舵機用**獨立 5V 電源**（至少 3A），不要只靠 USB 供電。
- 舵機瞬間電流衝擊可能把 ESP32 拉復位（現象：ESP32 反覆重啟）。此時**斷電重啟** ESP32。

### 2.4 接線步驟

1. 8 路舵機 → 轉接板 PWM1-8
2. 轉接板 → ESP32-S3 對應 GPIO（上表）
3. ESP32-S3 Type-C → PC
4. 攝像頭接 PC（追蹤用）

> 詳細接線/電路圖見 `ESP32开发板电路图/` 目錄。

---

## 第 3 章 前置條件：固件燒錄

> 舵機要能響應，必須先燒固件。固件位於 `esp-idf\AmazingHand_Serial\`。

### 3.1 ESP-IDF 版編譯（推薦）

用 Espressif IDE 打開 `AmazingHand_Serial` 工程：

1. 設定目標芯片（首次）：
   ```
   idf.py set-target esp32s3
   ```
2. 編譯：
   ```
   idf.py build
   ```
3. 燒錄（Windows 用 COM 口，如 COM3）：
   ```
   idf.py -p COM3 flash
   ```

### 3.2 燒錄後驗證

串口監控（波特率 **115200**）：

```
idf.py -p COM3 monitor
```

應看到啟動日誌：

```
AmazingHand Serial Control Ready (ESP-IDF)
Protocol: 115200-8N1 [0xAA CMD LEN DATA CKSUM]
```

> 串口波特率已由固件/腳本統一配置（115200），客戶無需手動設定。

> 注：通常設備交付時固件已燒錄好，這一步僅在新固件/重新燒錄時執行。

---

## 第 4 章 初步運行：上位機手勢指令

> 前置：固件已燒錄（第 3 章）、ESP32 已通電、串口線已接。先看裝置管理員確認 COM 口。

### 4.1 GUI 可視化（推薦）

#### 方式 A：運行打包 exe

雙擊 `dist/AmazingHand控制台.exe`（**不含追蹤**，追蹤需源碼方式）。

#### 方式 B：從源碼運行

```bash
# 项目根目录,先激活追踪环境(装了 mediapipe)或任意带 pyserial 的 Python
tracking_env\Scripts\python hand_gui.py
```

#### GUI 使用步驟

1. **選串口**：頂部下拉框選 ESP32 的 COM 口。
2. **點「連接」**：狀態燈變綠，日誌顯示「已連接」，自動發 NOP 鏈路測試。
3. **手勢命令**：點「石頭」「剪刀」「布」「真棒」「OK」「捏合」「指向」等，機械手執行。
4. **左右手**：勾選「右手」/「左手」切換拇指鏡像方向。
5. **舵機直驅**：拖 8 個滑塊，實時控制單個舵機角度（0-180°）。
6. **手指差動控制**（推薦）：每根手指兩個進度條——「彎曲◀▶伸直」反向差動、「右擺◀▶左擺」同向擺動。兩個自由度獨立，同步驅動。
7. **重複/停止**：重複上一次手勢 / 立即中斷。
8. **通信日誌**：底部實時顯示收發幀和響應。

### 4.2 命令行測試（serial_test.py）

項目根目錄：

```bash
# 链路测试(先确认能通)
python serial_test.py COM3 nop

# 手势
python serial_test.py COM3 rock         # 石头
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 张开
python serial_test.py COM3 close        # 握拳

# 单舵机直驱
python serial_test.py COM3 servo 1 90   # 舵机1 → 90°

# 全部归中
python serial_test.py COM3 mid

# 设左右手
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# 扫频/自检
python serial_test.py COM3 sweep 1      # 舵机1 扫频
python serial_test.py COM3 test         # 全部舵机逐个测试
```

### 4.3 驗證

- 點手勢後舵機應執行對應動作；串口日誌返回 `ACK` 和 `DONE`。
- 響應碼：`0x00=OK`，`0x01=無效命令`，`0x02=參數錯誤`，`0x03=忙`，`0x10=完成`。
- 如果舵機完全不動：見第 6 章常見問題（先查供電/串口）。

> 手勢命令與串口協議完整速查見第 7 章。

---

## 第 5 章 進階教程：手勢追蹤

> 前置：第 1-4 章已完成（固件燒錄、串口能控制、攝像頭就位）。
> 本章兩條路，選一條走。

### 5.1 GUI 內置追蹤（輕量版）

**適合**：快速演示，免裝 dora。攝像頭 → 直接映射到差動舵機，無 IK。

#### 前置

- 64 位 Python + `setup_tracking.bat`（第 1.1 節）。
- 攝像頭可用。

#### 運行

```bash
# 项目根目录,用追踪环境启动 GUI
tracking_env\Scripts\python hand_gui.py
```

1. 選串口 → 「連接」。
2. 滾動到「手勢追蹤 (MediaPipe 攝像頭)」面板。
3. 選攝像頭號（默認 0）→ 點「開始追蹤」。
4. 把手放進畫面，機械手跟隨手部彎曲/伸直。

#### 原理

- mediapipe 0.10.14 提取 4 指指尖 3D 向量（手部座標系）。
- `hand_tracking.py` 的 `tips_to_angles()` 把每指映射為差動角度：
  - flex（彎曲/伸直）：三指用 z 分量，拇指用 y 分量；
  - base（左右擺）：固定 90（暫未做左右擺）。
- GUI 內置 EMA 平滑（alpha=0.4）+ 60ms 節流，避免抖動。

#### 局限

- **無 IK**：直接把指尖映射到角度，精度不如官方鏈路。
- **左右擺暫緩**：base 固定 90，不做左右擺動。
- 適合演示/原型，正式用推薦 5.2。

### 5.2 dora 官方 IK 追蹤（完整版）

**適合**：正式使用。官方鏈路：攝像頭 → mediapipe → MuJoCo+mink IK → 8 關節角 → AHControl（Rust）→ ESP32 → PWM 舵機。

#### 前置

- 完整環境（Rust + uv + dora，第 1.2 節）。
- 固件燒錄（第 3 章）。
- 數據流 yml 已寫好 PWM 波特率（115200），無需手動改。

#### 第一步：部署（推薦一鍵腳本）

雙擊 `..\02_hand_tracking\Demo\Windows_Scripts_CN\3-部署代码.bat`（英文版為 `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\3-Deploy_Demo.bat`），自動完成：
建 Python 環境、編譯 AHControl（Rust）、安裝 AHSimulation/HandTracking（mediapipe）。

> 首次部署需幾分鐘。腳本已內置環境變量處理，無需手動設定。

#### 第二步：運行

雙擊 `..\02_hand_tracking\Demo\Windows_Scripts_CN\4-运行代码.bat`（英文版為 `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\4-Run_Demo.bat`），按選單選擇：

```
1 - 模拟仿真（摄像头手势追踪）
2 - 真实硬件（SCS0009 总线舵机）
3 - PWM 舵机（ESP32 直驱）   ← 选 3
```

再選手型：`1 右手` / `2 左手`。腳本自動 `dora build` + `dora run`。

- 攝像頭窗口打開，把手放進畫面 → 3D 仿真手指跟隨 → 機械手跟隨。
- 停止：Ctrl+C（或關閉窗口）。

#### 左右手切換

在運行選單裡選擇手型即可（第 5.2 節第二步）：選 `1 右手` 或 `2 左手`。

> 切換後腳本會自動重新構建對應數據流，等構建完成再動攝像頭前的操作即可。

#### 運行日誌怎麼看

運行窗口裡 AHControl 節點會持續輸出日誌。重點看這一行：

```
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N`（例如 `sent 300 frames, ESP32 acked 300 frames`）→ 正常，ESP32 每幀都收到。
- `M = 0` → ESP32 沒收到數據，檢查串口/供電（見第 6 章）。

只要這一行在正常增長，就說明舵機鏈路是通的，剩下的就是攝像頭跟不跟得上的問題。

---

## 第 6 章 常見問題（運行途中）

> 本節只列使用過程中**最容易遇到、自己就能解決**的問題。按現象快速定位。

### 6.1 舵機完全不動

按順序排查：

1. **供電**：舵機是否接了獨立電源（5V 3A 以上）？只靠 USB 供電時，舵機可能不動或 ESP32 反覆重啟。→ 斷電重啟 ESP32。
2. **串口**：COM 口選對了嗎？裝置管理員 → 連接埠（COM 和 LPT）看 ESP32 對應的口。有沒有別的程式（如串口助手）佔用？→ 關掉佔用程式。
3. **接線**：轉接板 PWM1-8 是否接對 GPIO？舵機信號線是否插緊？

### 6.2 攝像頭沒畫面

- Windows 首次運行會彈攝像頭權限 → 點「允許」。
- 如果之前選了「否」：設定 → 隱私和安全性 → 相機 → 允許桌面應用訪問相機，然後重新運行。

### 6.3 攝像頭有畫面，但手不跟隨 / 跟隨遲鈍

- 確認攝像頭**正對**手，光線充足，手在畫面裡完整可見。
- 動慢一點、幅度大一點。太快或幅度太小，追蹤可能跟不上。
- 3D 仿真窗口裡手指動了嗎？
  - **動了**：追蹤鏈路正常，問題在舵機/串口，看 6.1。
  - **沒動**：是追蹤節點沒識別到手，調整姿勢/光線重試。

### 6.4 手型反了 / 拇指方向反

- 左手/右手選錯了？在運行選單中選擇對應手型。
- 上位機 GUI 裡勾「右手」/「左手」切換。

### 6.5 左右手切換後不生效

- 切換手型後，`dora` 需要重新構建數據流：運行選單選好手型後會自動 `dora build`，等它完成即可。

### 6.6 運行中途畫面卡住 / 日誌停住

- 可能是攝像頭被其它應用佔用（視頻會議、另一個腳本），關掉後重試。
- 或按 `Ctrl+C` 停止，重新運行。

### 6.7 換了 USB 口 / 重啟電腦後找不到串口

- COM 口號可能變了。裝置管理員確認新的 COM 號，重跑 `2-配置串口.bat`（或 `2-Setup_Serial.bat`）選一次口，再運行。

### 6.8 還不行？

- 把運行終端的日誌截圖發給維護方，並說明：在哪個步驟、什麼操作、看到什麼現象。
- 關鍵日誌：啟動時的 `[CONFIG]` 行、運行中的 `[ACK-STATS]` 行（`ESP32 acked M frames` 的 M 是否接近 N）。

---

## 第 7 章 命令速查（附錄）

> 完整協議說明見同目錄 `用户手册.md`。這裡給速查表。

### 7.1 手勢命令

| 手勢 | HEX | ACK | DONE |
|------|-----|-----|------|
| NOP | `AA 00 00 00` | `BB 00 00 00` | — |
| 石頭 | `AA 01 00 01` | `BB 01 00 01` | `BB 01 10 11` |
| 剪刀 | `AA 02 00 02` | `BB 02 00 02` | `BB 02 10 12` |
| 布 | `AA 03 00 03` | `BB 03 00 03` | `BB 03 10 13` |
| 真棒 | `AA 04 00 04` | `BB 04 00 04` | `BB 04 10 14` |
| 嘲諷1（搖食指） | `AA 05 00 05` | `BB 05 00 05` | `BB 05 10 15` |
| 嘲諷2（無名指） | `AA 06 00 06` | `BB 06 00 06` | `BB 06 10 16` |
| 張開 | `AA 07 00 07` | `BB 07 00 07` | `BB 07 10 17` |
| 握拳 | `AA 08 00 08` | `BB 08 00 08` | `BB 08 10 18` |
| OK | `AA 09 00 09` | `BB 09 00 09` | `BB 09 10 19` |
| 捏合 | `AA 0A 00 0A` | `BB 0A 00 0A` | `BB 0A 10 1A` |
| 指向 | `AA 0C 00 0C` | `BB 0C 00 0C` | `BB 0C 10 1C` |

### 7.2 控制命令

| 命令 | HEX | 說明 |
|------|-----|------|
| 重複 | `AA FE 00 FE` | 重複上次手勢 |
| 停止 | `AA FF 00 FF` | 立即中斷 |
| 設右手 | `AA F1 01 01 F1` | — |
| 設左手 | `AA F1 01 02 F2` | — |
| 直驅 | `AA F0 08 [8×角度] CKSUM` | 8 字節角度 |

### 7.3 幀格式

```
帧头(0xAA) + 命令(CMD) + 长度(LEN) + 数据(DATA) + 校验和(CKSUM)
CKSUM = CMD ^ LEN ^ DATA[0] ^ ... ^ DATA[N-1]
响应: 帧头(0xBB) + CMD + STATUS + (CMD^STATUS)
```

### 7.4 上位機工具

| 工具 | 命令 | 用途 |
|------|------|------|
| GUI | `tracking_env\Scripts\python hand_gui.py` | 可視化手勢 + 直驅 + 差動 + 追蹤 |
| 打包 exe | `dist/AmazingHand控制台.exe` | 免裝 Python 可視化（無追蹤） |
| 命令列 | `python serial_test.py COMx <cmd>` | 自動化測試 |

### 7.5 追蹤數據流檔案（PWM 版）

| 用途 | 檔案 |
|------|------|
| 左手 PWM 追蹤 | `dataflow_tracking_real_left_pwm.yml` |
| 右手 PWM 追蹤 | `dataflow_tracking_real_right_pwm.yml` |
| 左手 PWM 配置 | `AHControl/config/l_hand_pwm.toml` |
| 右手 PWM 配置 | `AHControl/config/r_hand_pwm.toml` |
