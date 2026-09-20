---
title: "03-PWM舵機版本-使用手冊"
description: "AmazingHand PWM 舵機版使用手冊:ESP32-S3 固件以 PWM 信號驅動 8 路舵機執行手勢,上位機經 USB 串口發送指令,含命令參考與手勢參數精調。"
---

# 03-PWM舵機版本-使用手冊

## 目錄

1. 概述

2. 硬件接線

3. 固件編譯與燒錄

4. 串口通訊協定

5. 命令參考

6. 上位機使用教程

7. 手勢追蹤

8. 手勢參數精調

9. 常見問題

---

## 1. 概述

本固件執行在 **ESP32-S3** 開發板上，通過 PWM 信號控制 8 路舵機驅動靈巧手執行手勢。上位機（PC/樹莓派/其他 MCU）通過 USB 串口發送二進制幀指令，ESP32 解析後執行對應手勢並返回回應。

項目提供兩套固件實現：

|固件|目錄|特點|
|---|---|---|
|**ESP-IDF 版**（推薦）|`esp-idf/AmazingHand_Serial/`|組件化工程結構，FreeRTOS 雙任務，生產就緒|

> 兩套固件共享**相同的串口協定**和**相同的命令集**，手勢參數可互相參考。

### 支援的手勢（11 個手勢命令）

|手勢|命令|說明|
|---|---|---|
|石頭|0x01|猜拳：全指握拳|
|剪刀|0x02|猜拳：食指+中指伸出呈 V 字|
|布|0x03|猜拳：全指張開|
|真棒|0x04|拇指豎起，其餘握拳|
|嘲諷1|0x05|搖食指（"不不不"）|
|嘲諷2|0x06|無名指伸展晃動（替代小拇指）|
|張開|0x07|全指張開|
|握拳|0x08|全指閉合|
|OK|0x09|OK 手勢|
|捏合|0x0A|捏合手勢|
|指向|0x0C|食指伸出做"指"動作|
|直驅|0xF0|直接控制 8 路舵機角度|
|設左右手|0xF1|切換左手/右手模式|
|重複|0xFE|重複執行上一次手勢|
|停止|0xFF|立即終止當前手勢|
|NOP|0x00|鏈路測試|

> 注：命令 0x0B 已停用（原"拇指朝下"與"真棒"動作重複，已移除）。

---

## 2. 硬件接線

### 適用硬件

|項目|型號|
|---|---|
|主控|**ESP32-S3** 開發板（優信 YX-ESP32-S3 或同類）|
|舵機|8 路 PWM 模擬舵機 (SG90 或同類)|
|轉接板|PWM 舵機轉接板|

ESP32-S3 開發板有兩個 Type-C 接口：

- **內置 USB Serial/JTAG**：直連 ESP32-S3 芯片內置 USB 控制器

- **外掛 FT232**：通過 FT232 轉串口芯片通信

> 兩個接口均可用於串口通訊，任選其一即可。上位機選擇對應的串口裝置名。

### 舵機 → 轉接板

8 個舵機的 3P 插頭按 ID 號插入轉接板的舵機 1-8 排針。

### 轉接板 → ESP32-S3

|轉接板|ESP32-S3 GPIO|說明|
|---|---|---|
|PWM1|**4**|食指關節1|
|PWM2|**5**|食指關節2|
|PWM3|**6**|中指關節1|
|PWM4|**7**|中指關節2|
|PWM5|**15**|無名指關節1|
|PWM6|**16**|無名指關節2|
|PWM7|**17**|拇指關節1|
|PWM8|**18**|拇指關節2|
|5V|5V|供電（從轉接板引出）|
|GND|GND|**必須共地，至少接一根**|

> 左右手共用同一 GPIO 映射。切"左手"模式時，固件在手勢內鏡像拇指運動方向，引腳不變。

### 供電

轉接板有兩組 5V/GND 供電口：

- 一組由 Type-C 線引出，接 **5V 3A** 電源適配器

- 另一組引出給 ESP32-S3 的 **5V** 引腳供電（開發板無需再通過 Type-C 供電）

---

## 3. 固件編譯與燒錄

### 3.1 ESP-IDF 版（推薦）

> **警告：路徑要求**：ESP-IDF 編譯不支援中文路徑。請確保工程所在路徑完全為英文（含使用者資料夾、上級目錄）。

#### 工程結構

```Plaintext
esp-idf/AmazingHand_Serial/
├── CMakeLists.txt              # 頂層工程配置
├── sdkconfig.defaults          # 默認 Kconfig 配置
├── main/
│   ├── CMakeLists.txt
│   └── main.c                  # FreeRTOS 雙任務 + 初始化（膠水層）
└── components/
    ├── hand_servo/             # 舵機驅動（LEDC PWM + 校準數據）
    ├── hand_gestures/          # 手勢參數宏 + 手勢函數 + 左右手控制
    └── hand_protocol/          # 串口幀解析 + 命令分發
```

#### 構建環境

- ESP-IDF **v6.0.1**

- 目標芯片：**ESP32-S3**

- 已配置 `idf.py` 環境變量

#### 編譯與燒錄

```Bash
cd esp-idf/AmazingHand_Serial

# 1. 設定目標芯片（首次或更換芯片時）
idf.py set-target esp32s3

# 2. 編譯
idf.py build

# 3. 燒錄（Windows: 用 COM 口，如 COM3）
idf.py -p COM3 flash

# 4. 串口監控（可選，波特率 115200）
idf.py -p COM3 monitor
```

> 修改任何 `components/` 或 `main/` 下的源碼後，重新 `idf.py build && idf.py -p COM3 flash` 即可。

### 3.3 校準（可選，首次使用建議）

舵機中心位和脈寬需按實際機構校準。有兩種方式：

- **ESP-IDF 版**：編輯 `components/hand_servo/hand_servo.c` 中 `middle_pos[8]`（第 40 行）和 `min_pw/mid_pw/max_pw[8]`（第 45-47 行）

校準後需重新編譯燒錄。

---

## 4. 串口通訊協定

### 4.1 物理層

|參數|值|
|---|---|
|接口|USB Serial (UART0)|
|波特率|**115200**|
|數據位|8|
|校驗位|無 (None)|
|停止位|1|
|流控|無|

### 4.2 幀格式

#### 主機 → ESP32（命令幀）

```Plaintext
┌────────┬────────┬──────────┬────────────────┬──────────┐
│  0xAA  │ CMD_ID │ DATA_LEN │ DATA[0 .. N-1] │ CHECKSUM │
│ 1 Byte │ 1 Byte │  1 Byte  │    N Bytes     │  1 Byte  │
└────────┴────────┴──────────┴────────────────┴──────────┘
 幀頭      命令ID    數據長度      數據負載         校驗和
```

- **幀頭**: 固定 `0xAA`，標識一幀的開始

- **CMD_ID**: 命令編號（見 命令參考）

- **DATA_LEN**: 數據負載的字節數（0-8，超過 8 的幀無效）

- **DATA**: 數據負載，長度由 DATA_LEN 決定

- **CHECKSUM**: `CMD_ID ^ DATA_LEN ^ DATA[0] ^ ... ^ DATA[N-1]`（XOR 校驗）

> 如果 DATA_LEN = 0，則 CHECKSUM = CMD_ID。

#### ESP32 → 主機（回應幀）

```Plaintext
┌────────┬────────┬────────┬──────────┐
│  0xBB  │ CMD_ID │ STATUS │ CHECKSUM │
│ 1 Byte │ 1 Byte │ 1 Byte │  1 Byte  │
└────────┴────────┴────────┴──────────┘
 幀頭      命令ID    狀態碼    校驗和
```

- **幀頭**: 固定 `0xBB`

- **CMD_ID**: 原始命令編號

- **STATUS**: 狀態碼（見下表）

- **CHECKSUM**: `CMD_ID ^ STATUS`

#### 狀態碼

|STATUS|含義|說明|
|---|---|---|
|0x00|OK|命令已接受，開始執行|
|0x01|無效命令|CMD_ID 不在命令表中|
|0x02|參數錯誤|數據長度或內容不正確|
|0x03|忙|手勢執行中，暫不接受新命令|
|0x10|完成|手勢執行完畢|

### 4.3 通信時序

```Plaintext
主機                          ESP32
 │                              │
 │──── [AA 01 00 01] ────────→│  發送"石頭"命令
 │                              │
 │←─── [BB 01 00 01] ─────────│  ACK: 命令已接受
 │                              │
 │                      (執行手勢中)
 │                              │
 │←─── [BB 01 10 11] ─────────│  完成: 手勢執行完畢
 │                              │
 │──── [AA 02 00 02] ────────→│  發送"剪刀"命令
 │                              │
 │←─── [BB 02 00 02] ─────────│  ACK
 │                              │
```

### 4.4 停止手勢 & 幀超時

- 發送 `[AA FF 00 FF]` 可隨時中斷正在執行的手勢

- ESP32 在 200ms 內未收完一幀會自動丟棄（防止丟字節導致永久失步）

- 校驗和不匹配的幀會被靜默丟棄，上位機應實現超時重發

### 4.5 左右手模式

預設右手模式。發送 `[AA F1 01 02 F2]` 切換左手，`[AA F1 01 01 F1]` 切回右手。左右手影響拇指的運動方向（石頭/剪刀/真棒/OK/捏合等含拇指手勢）。

---

## 5. 命令參考

### 5.1 揮手勢命令 (0x01-0x0A, 0x0C)

這些命令無需數據負載 (DATA_LEN=0)，ESP32 收到後立即執行對應手勢。

|命令|HEX 幀|回應|說明|
|---|---|---|---|
|石頭|`AA 01 00 01`|`BB 01 00 01` → `BB 01 10 11`|全指握拳|
|剪刀|`AA 02 00 02`|`BB 02 00 02` → `BB 02 10 12`|食指+中指伸出|
|布|`AA 03 00 03`|`BB 03 00 03` → `BB 03 10 13`|全指張開|
|真棒|`AA 04 00 04`|`BB 04 00 04` → `BB 04 10 14`|拇指豎起|
|嘲諷1|`AA 05 00 05`|`BB 05 00 05` → `BB 05 10 15`|搖食指（約 2.5s）|
|嘲諷2|`AA 06 00 06`|`BB 06 00 06` → `BB 06 10 16`|無名指晃動（約 2.5s）|
|張開|`AA 07 00 07`|`BB 07 00 07` → `BB 07 10 17`|全指張開|
|握拳|`AA 08 00 08`|`BB 08 00 08` → `BB 08 10 18`|全指閉合|
|OK|`AA 09 00 09`|`BB 09 00 09` → `BB 09 10 19`|OK 手勢|
|捏合|`AA 0A 00 0A`|`BB 0A 00 0A` → `BB 0A 10 1A`|捏合手勢|
|指向|`AA 0C 00 0C`|`BB 0C 00 0C` → `BB 0C 10 1C`|食指伸出做"指"動作|

### 5.2 直驅命令 (0xF0)

直接控制 8 路舵機角度，8 字節數據分別對應舵機 1-8，每字節取值範圍 0-180。

**示例：全部舵機歸中位（90°）**

```Plaintext
發送: AA F0 08 5A 5A 5A 5A 5A 5A 5A 5A F8
       │  │  │  └── 8 個 0x5A (90°) ──┘  │
       │  │  │                            └── CHECKSUM
       │  │  └── DATA_LEN = 8
       │  └── CMD_DIRECT_DRIVE
       └── 幀頭
```

校驗和 = `F0 ^ 08 ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A` = `F8`

> 8 個相同的 0x5A 兩兩 XOR 得 0x00，最終 `0xF0 ^ 0x08 ^ 0x00 = 0xF8`

**示例：食指張開(舵機1=170°, 舵機2=10°)，其餘歸中(90°)**

```Plaintext
發送: AA F0 08 AA 0A 5A 5A 5A 5A 5A 5A 58
               └─170°  └─10°
```

### 5.3 設左右手 (0xF1)

1 字節數據：`0x01` = 右手，`0x02` = 左手。

```Plaintext
設右手: AA F1 01 01 F1
設左手: AA F1 01 02 F2
```

### 5.4 控制命令

|命令|HEX 幀|說明|
|---|---|---|
|NOP|`AA 00 00 00`|鏈路測試，立即返回 `BB 00 00 00`|
|重複|`AA FE 00 FE`|重複執行上一次手勢|
|停止|`AA FF 00 FF`|立即終止當前手勢|

### 5.5 回應速查

收到無效命令時（以 0xFC 這個不存在的命令為例）：

```Plaintext
發送: AA FC 00 FC
響應: BB FC 01 FD    （STATUS=0x01 無效命令）
```

> 校驗和驗證: `FC ^ 00 = FC`，回應 `FC ^ 01 = FD`

---

## 6. 上位機使用教程

項目根目錄提供兩個上位機工具：

|工具|檔案|類型|用途|
|---|---|---|---|
|**圖形介面**|`hand_gui.py` / 打包的 exe|可視化|點按鈕做手勢、滑塊直驅、日誌|
|**命令列測試**|`serial_test.py`|指令化|發送手勢/單舵機/掃頻，自動化測試|

> 兩者都只需依賴 `pyserial`。安裝：`pip install -r requirements.txt`

### 6.1 可視化 GUI（推薦）

#### 方式 A：執行打包好的 exe（給客戶）

1. 拿到 `AmazingHand控制台.exe`（或解壓後目錄）

2. **雙擊 exe** 直接執行，無需安裝 Python

3. 按下面步驟連接和使用

#### 方式 B：從源碼執行

```Bash
# 1. 安裝依賴
pip install -r requirements.txt

# 2. 運行
python hand_gui.py
```

#### GUI 使用步驟

1. **選串口**：頂部下拉框選擇 ESP32 對應的 COM 口（Windows 裝置管理器查看）

2. **點"連接"**：狀態燈變綠，日誌區顯示"已連接"，並自動發送 NOP 鏈路測試

3. **手勢命令**：點擊「石頭」「剪刀」「布」「真棒」「OK」…等按鈕，機械手執行對應手勢

4. **左右手**：勾選「右手」/「左手」切換拇指鏡像方向

5. **舵機直驅**：拖動 8 個滑塊，實時控制單個舵機角度（0-180°）

6. **手指差動控制**（推薦）：每根手指兩個進度條——**彎曲/伸直** 控制該手指兩個舵機反向差動（彎曲伸張），**右擺/左擺** 控制同向擺動。兩個自由度獨立，同步驅動

7. **重複 / 停止**：重複上一次手勢 / 立即中斷當前手勢

8. **通信日誌**：底部實時顯示收發幀和回應狀態

### 手指差動控制說明

每根手指由**兩個舵機差動驅動**，兩個自由度正交：

|進度條|作用|機械效果|
|---|---|---|
|**彎曲◀▶伸直**|兩個舵機反向旋轉（差動）|手指彎曲或伸直|
|**右擺◀▶左擺**|兩個舵機同向旋轉|手指左右擺動|

- **彎曲/伸直**滑塊範圍 -70 ~ +70（0 = 中立，+70 = 完全伸直，-70 = 完全彎曲）

- **左右擺動**滑塊範圍 60 ~ 120（90 = 中立，60 = 向右擺，120 = 向左擺）

- 舵機角度 = `擺動 ± 彎曲`，兩個舵機**同步**更新併發送直驅命令

> 例（食指 GPIO4/5）：彎曲滑塊拖到 +70、擺動保持 90 → 舵機4=160°、舵機5=20°（完全伸直）；彎曲拖到 -70 → 舵機4=20°、舵機5=160°（完全彎曲）。

### 6.2 指令化測試（serial_test.py）

#### 命令列用法

```Bash
# 查看幫助
python serial_test.py

# 鏈路測試
python serial_test.py COM3 nop

# 發送手勢
python serial_test.py COM3 rock        # 石頭
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 張開
python serial_test.py COM3 close        # 握拳

# 單舵機直驅
python serial_test.py COM3 servo 1 90   # 舵機1 → 90°

# 全部歸中
python serial_test.py COM3 mid

# 設左右手
python serial_test.py COM3 hand L       # 左手
python serial_test.py COM3 hand R       # 右手

# 掃頻 / 自檢
python serial_test.py COM3 sweep 1      # 舵機1 掃頻
python serial_test.py COM3 test         # 全部舵機逐個測試
```

#### 交互模式

```Bash
python serial_test.py COM3
```

進入 REPL，直接輸入簡寫命令（如 `servo 3 180`、`rock`、`mid`、`quit`）。

### 6.3 串口工具手動測試（可選）

**CoolTerm** (macOS/Windows/Linux):

1. 打開 CoolTerm，`Options` → 設定波特率 115200, 8N1

2. `Connection` → `Send String` → 選擇 `Hex`

3. 輸入 `AA 01 00 01` → 發送 → 機械手執行"石頭"

4. 觀察回應區顯示 `BB 01 00 01 ... BB 01 10 11`

**SerialTool** (macOS):

```Bash
brew install serialtool
echo -ne '\xAA\x01\x00\x01' > /dev/cu.usbserial-0001
```

### 6.4 Python 控制腳本（自定義開發）

```Python
#!/usr/bin/env python3
"""靈巧手串口控制 - Python 上位機示例"""
import serial
import time

SERIAL_PORT = "/dev/cu.usbserial-0001"  # 修改為實際端口
BAUD_RATE   = 115200

# 命令定義（與固件命令集一致）
CMD = {
    "nop":       0x00,
    "rock":      0x01,
    "scissors":  0x02,
    "paper":     0x03,
    "thumbs_up": 0x04,
    "taunt1":    0x05,
    "taunt2":    0x06,
    "open":      0x07,
    "close":     0x08,
    "ok":        0x09,
    "pinch":     0x0A,
    "index":     0x0C,
    "direct":    0xF0,
    "set_side":  0xF1,
    "repeat":    0xFE,
    "stop":      0xFF,
}

def calc_checksum(cmd_id, data=b""):
    """計算 XOR 校驗和 (CMD ^ LEN ^ DATA[0..N])"""
    result = cmd_id ^ len(data)
    for b in data:
        result ^= b
    return result & 0xFF

def send_command(ser, cmd_id, data=b""):
    """發送命令幀，返回 (ack_status, completion_status)"""
    data_len = len(data)
    checksum = calc_checksum(cmd_id, data)
    frame = bytes([0xAA, cmd_id, data_len]) + data + bytes([checksum])
    ser.write(frame)
    print(f"發送: {frame.hex(' ').upper()}")

def read_response(ser, timeout=1.0):
    """讀取一個響應幀 [0xBB CMD STATUS CKSUM]"""
    ser.timeout = timeout
    while True:
        b = ser.read(1)
        if not b:
            return None
        if b[0] == 0xBB:
            buf = ser.read(3)
            if len(buf) == 3:
                expected = buf[0] ^ buf[1]
                if expected == buf[2]:
                    return bytes([0xBB]) + buf
    return None

def set_side(ser, side):
    """設置左右手: side='R' 右手, side='L' 左手"""
    val = 0x01 if side.upper() == 'R' else 0x02
    send_command(ser, CMD["set_side"], bytes([val]))

def direct_drive(ser, angles):
    """直驅 8 路舵機: angles 為 8 個 0-180 的角度列表"""
    data = bytes([min(180, max(0, a)) for a in angles[:8]])
    send_command(ser, CMD["direct"], data)

# ===== 使用示例 =====
if __name__ == "__main__":
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    time.sleep(1)  # 等待 ESP32 復位完成

# 1. 鏈路測試
    print("=== NOP 鏈路測試 ===")
    send_command(ser, CMD["nop"])

# 2. 猜拳遊戲
    print("\n=== 猜拳: 石頭 → 剪刀 → 布 ===")
    for name in ["rock", "scissors", "paper"]:
        send_command(ser, CMD[name])
        time.sleep(0.5)

# 3. 真棒手勢
    print("\n=== 真棒 ===")
    send_command(ser, CMD["thumbs_up"])

# 4. 停止測試
    print("\n=== 停止測試 ===")
    send_command(ser, CMD["taunt1"])  # 開始搖食指
    time.sleep(0.3)
    send_command(ser, CMD["stop"])    # 立即停止

# 5. 直驅模式: 全部歸中
    print("\n=== 直驅: 歸中 ===")
    direct_drive(ser, [90] * 8)

    ser.close()
```

---

## 7. 手勢追蹤

用**攝像頭實時識別手掌**，驅動靈巧手手指彎曲/伸直和左右擺動。基於官方 AmazingHand 的手部追蹤算法（MediaPipe 21 點關鍵點 + 3D 世界座標旋轉）。

### 7.1 原理

- 攝像頭對準手掌 → MediaPipe 識別 21 個手部關鍵點

- 構建手部局部座標系，計算 4 指指尖的 3D 向量

- 指尖向量 → 每根手指的 (flex, base) 差動參數 → 複用直驅協定發往舵機

### 7.2 環境要求

手勢追蹤依賴 **64 位 Python + mediapipe 0.10.14**（舊版 solutions API，只有它能做 3D 世界座標）：

|依賴|版本|
|---|---|
|Python|64 位 3.12|
|mediapipe|0.10.14|
|numpy|<2.0|
|scipy|>=1.9|
|opencv-python|>=4.10|
|Pillow|>=10.0|

> **注意**：現有預設環境是 32 位 Python，無法安裝 mediapipe。需另裝 64 位 Python 3.12（裝到 D 盤如 `D:\Python312-64`，與現有 32 位完全並存，不衝突）。

### 7.3 一鍵部署

1. 安裝 64 位 Python 3.12（從 [python.org](https://www.python.org/downloads/) 下載 64 位 installer，裝到 `D:\Python312-64`）

2. 雙擊執行項目根目錄 **`setup_tracking.bat`**

    - 自動查找 64 位 Python

    - 建立 `tracking_env` 虛擬環境

    - 安裝 mediapipe 0.10.14 等依賴

    - 驗證安裝

### 7.4 使用步驟

1. 用追蹤環境啟動 GUI：

```Plaintext
tracking_env\Scripts\python hand_gui.py
```

2. 連接串口（選擇 ESP32 對應的 COM 口）

3. 在"手勢追蹤"面板選擇攝像頭編號（預設 0）

4. 點擊 **"開始追蹤"** → 攝像頭畫面顯示在面板中

5. 手掌對準攝像頭：

    - **手指彎曲/伸直** → 靈巧手對應手指彎曲/伸直

    - **手掌左右翻轉** → 靈巧手手指左右擺動

6. 點擊 **"停止追蹤"** 結束

> 若未檢測到手，面板顯示"未檢測到手"；檢測到後顯示"檢測到手: Right/Left"。

### 7.5 參數標定

映射係數在 `hand_tracking.py` 底部（`FLEX_SCALE` / `BASE_SCALE`）：

```Python
FLEX_SCALE = 80.0    # 指尖 z 分量 → 彎曲/伸直 (flex)
BASE_SCALE = 30.0    # 指尖 x 分量 → 左右擺動 (base)
```

若彎曲/伸直幅度不夠或方向反了，調整 `FLEX_SCALE`；左右擺幅度不夠或反了，調整 `BASE_SCALE`（正負號調方向）。

---

## 8. 手勢參數精調

### 8.1 參數位置

每個手勢的角度偏移量用 `#define` 宏定義，**無需改邏輯代碼**，只調數值。

- **ESP-IDF 版**：`components/hand_gestures/hand_gestures.c` 頂部"手勢參數（使用者可調）"區

### 8.2 參數含義

```C
// 例：石頭手勢
#define ROCK_IDX_OFF1    70    // 食指關節1 偏移量
#define ROCK_IDX_OFF2   -70    // 食指關節2 偏移量
```

- **正值 = 彎曲握緊**，**負值 = 伸展打開**

- 每根手指 2 個偏移量，相對 `middle_pos`（預設 90°）

- 差動結構：兩舵機偏移差值 = 伸展/收縮，同向分量 = 左右偏

### 8.3 調參步驟

1. 找到對應手勢的 `#define` 宏

2. 修改數值（增大 → 幅度更大；減小 → 幅度更小）

3. 重新編譯燒錄，用上位機測試效果

4. 反覆微調直到動作自然

---

## 9. 常見問題

### Q1: 上位機連不上串口？

1. 確認 ESP32 已通過 Type-C 連接電腦

2. 檢查裝置管理器中的 COM 口號是否與 GUI 選擇一致

3. 確認波特率 115200

4. 斷開其他佔用串口的軟件

### Q2: 發送命令沒反應？

1. 先發 `AA 00 00 00`（NOP），應收到 `BB 00 00 00`

2. 確認固件已燒錄且目標芯片是 ESP32-S3

3. 檢查接線（GND 是否共地）

### Q3: 手勢動作幅度不對或方向反了？

進入手勢參數精調（見 第 7 節）調整對應宏。

### Q4: 左右手模式影響哪些手勢？

石頭/剪刀/真棒/OK/捏合等**含拇指**的手勢，切換左右手後拇指鏡像方向。

### Q5: 手指卡住、伸不出來？

所有收縮類手勢執行前會自動"先全手展開再收攏"，避免手指被上一手勢擋住。若仍卡住，檢查機械裝配或減小收縮幅度。

