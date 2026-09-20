---
title: "01-GUI可視化控制"
description: "本目錄提供上位機控制工具:連接 ESP32 後,用電腦點按鈕/敲命令讓靈巧手做手勢。"
---

# 01-GUI可視化控制

可視化手勢指令 — 使用教程

本目錄提供**上位機控制工具**:連接 ESP32 後,用電腦點按鈕/敲命令讓靈巧手做手勢。

> 適用:ESP32-S3 + 8 路 PWM 舵機(差動驅動)。固件燒錄見 `..\03_firmware_docs` 的說明。

## 一、兩種使用方式

|方式|需要|適合|
|---|---|---|
|**打包程式**(推薦)|雙擊 `AmazingHand控制台.exe`|免裝 Python,即點即用|
|**源碼執行**|64 位 Python 3.12|需要手勢追蹤、或自定義|

## 二、方式一:雙擊 exe

1. 雙擊 `AmazingHand控制台.exe`。

2. **選串口**:頂部下拉框選 ESP32 的 COM 口(裝置管理器查看)。

3. 點**「連接」**:狀態燈變綠,日誌顯示"已連接"。

4. 點手勢按鈕:**石頭 / 剪刀 / 布 / 真棒 / OK / 捏合 / 指向 / 張開 / 握拳**,靈巧手執行。

5. **左右手**:勾選「右手」/「左手」切換(拇指鏡像方向不同)。

6. **舵機直驅**:拖 8 個滑塊,實時控制單個舵機角度(0-180°)。

7. **手指差動控制**:每根手指兩個進度條——

    - **彎曲◀▶伸直**:手指彎曲或伸直(範圍 -70 ~ +70)。

    - **右擺◀▶左擺**:手指左右擺動(範圍 60 ~ 120,90=中立)。

8. **重複 / 停止**:重複上一次手勢 / 立即中斷。

## 三、方式二:源碼執行

### 安裝依賴

需要 **64 位 Python 3.12**(mediapipe 只支援 64 位)。

```Bash
# 1. 安裝基礎依賴
pip install -r requirements.txt

# 2. 安裝追蹤依賴(需要手勢追蹤時,自動建虛擬環境)
setup_tracking.bat
```

### 執行

```Bash
# 用追蹤環境啟動(含 mediapipe)
tracking_env\Scripts\python hand_gui.py
```

> 或直接 `python hand_gui.py`(任意帶 pyserial 的 Python)。

### GUI 內置手勢追蹤

GUI 裡自帶**手勢追蹤**面板(攝像頭跟隨手部動作):

1. 連接串口後,滾動到「手勢追蹤 (MediaPipe 攝像頭)」面板。

2. 選攝像頭號(預設 0),點**「開始追蹤」**。

3. 把手放進攝像頭畫面,靈巧手跟隨彎曲/伸直。

> 追蹤需要 `setup_tracking.bat` 裝好 mediapipe。免安裝 exe 不含追蹤功能。

## 四、命令列測試(serial_test.py)

```Bash
# 鏈路測試(先確認能通)
python serial_test.py COM3 nop

# 手勢
python serial_test.py COM3 rock         # 石頭
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 張開
python serial_test.py COM3 close        # 握拳

# 單舵機直驅
python serial_test.py COM3 servo 1 90   # 舵機1 → 90°

# 全部歸中
python serial_test.py COM3 mid

# 設左右手
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# 掃頻/自檢
python serial_test.py COM3 sweep 1      # 舵機1 掃頻
python serial_test.py COM3 test         # 全部舵機逐個測試
```

## 五、常見問題

|現象|處理|
|---|---|
|舵機不動|檢查供電(5V 3A 獨立電源)、COM 口、接線|
|exe 閃退|用源碼方式執行(打包版可能缺依賴)|
|攝像頭沒畫面|允許攝像頭權限(設定→隱私→相機)|
|手型反了|勾選相反的左右手|

> 完整協定與命令說明見 `..\03_firmware_docs\用戶手册.md`。

