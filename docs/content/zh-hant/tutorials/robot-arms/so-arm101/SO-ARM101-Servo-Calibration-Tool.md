---
title: SoARM 系列舵機校準工具使用教程
description: "面向 SoARM 10X 系列機械臂的 FTServo 舵機工廠校準與 LeRobot 校準工具，支持中位校準、單舵機控制、FT 調試器參數讀寫與 xdat 參數備份恢復。"
---

# SoARM 系列舵機校準工具使用教程

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**


**SoARM 系列校準工具**是專為 SoARM 10X 系列機械臂（如 [SO-ARM101 開發套件](/zh-hant/products/so-arm101)）設計的 FTServo 舵機工廠校準與 LeRobot 校準工具包。通過圖形界面即可完成舵機中位校準、單舵機控制、參數讀寫、xdat 參數備份/恢復、雙端口同步遙控等操作，並支持生成 LeRobot 格式的 JSON 校準文件。機械臂組裝與舵機安裝請先參考 [Lerobot機械臂組裝教程](./SO-ARM101-Assembly.md)。

本工具基於 [Seeed Studio 的 Seeed_RoboController](https://github.com/Seeed-Studio) 項目改造與升級，原項目以 MIT 許可發布。本項目在保留原有核心功能的基礎上，重構了 GUI 界面，新增了 FT 調試器、xdat 參數備份/恢復、跨平台支持等增強功能。

## 兼容性提示

> ⚠️ **本工具目前僅支持 Feetech（STS3215 系列）舵機**。寄存器表、xdat 參數格式、波特率表均針對飛特 STS3215 系列設計，其他品牌/型號舵機不保證兼容。

## 功能特性

| 特性 | 說明 |
| ---- | ---- |
| 自動端口檢測 | 智能識別 USB 串口，自動過濾虛擬設備 |
| 跨平台支持 | Windows / Ubuntu / macOS 全平台兼容 |
| 雙端口同步 | 左、右兩個串口獨立操作，支持主從雙端口同步遙控 |
| 中英文切換 | 界面內一鍵切換中 / 英文，選擇自動記憶 |
| 中位校準 | 將舵機當前位置燒錄為 2048 中位（EEPROM 持久化） |
| 中位測試 | 啟動力矩並將舵機移動到中位，驗證校準結果 |
| 失能電機 | 一鍵關閉所有舵機力矩，便於手動調整 |
| 自動掃描 | 自動檢測 ID 1–20 範圍內所有在線舵機 |
| 單舵機控制 | 滑桿實時控制單個舵機位置與力矩開關 |
| FT 調試器 | 串口連接、掃描、參數讀寫、位置控制、波特率修改、恢復出廠、xdat 參數備份 |
| xdat 參數 | 保存當前舵機 EEPROM 參數 / 打開備份恢復 |
| LeRobot 校準 | 生成 LeRobot 格式的 JSON 校準文件 |
| 校準文件中位運行 | 根據校準文件將機械臂移動到中位 |

## 界面介紹

主程序包含三個標籤頁：

```
┌─────────────────────────────────────────────────────────────┐
│  SoARM 系列校准工具         [串口1▾] [串口2▾] [🔄]  [🎮遥控][EN]│  ← 顶栏
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┬──────────────────────────────┐ │
│  │ 串口1 - 舵机标定        │ 串口2 - 舵机标定            │ │
│  │  [🔴未连接] 当前舵机:…   │  [🔴未连接] 当前舵机:…      │ │
│  │  舵机1~6 状态表格        │  舵机1~6 状态表格           │ │
│  │  [中位校准][中位测试]…   │  [中位校准][中位测试]…      │ │
│  └─────────────────────────┴──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

- **頂欄**：應用標題、串口選擇下拉框、刷新按鈕、遙控按鈕、語言切換按鈕。
- **🦾 Tab1 舵機標定**：左右面板快捷操作（中位校準、中位測試、失能電機）及實時狀態。
- **🎚️ Tab2 單舵機控制**：對每個在線舵機用滑桿微調位置、開關力矩。
- **🔬 Tab3 FT 調試器**：串口連接、掃描、參數讀寫（56 個寄存器）、位置控制、波特率/恢復出廠、xdat 參數備份恢復。

## 安裝與啟動

環境要求：

| 依賴 | 版本 | 說明 |
| ---- | ---- | ---- |
| Python | >= 3.8 | 建議 3.10+，從 [python.org](https://www.python.org/downloads/) 下載 |
| PySide6 | >= 6.0 | GUI 框架 |
| pyserial | >= 3.5 | 串口通信 |
| 系統 | Windows 10 / 11、Ubuntu 20.04+ / Debian 11+、macOS 11+ | macOS 11+ 支持 Apple Silicon / Intel |

硬體連接：用 USB 轉串口適配器（如 CH340 / CP2102）連接機械臂控制板，並給舵機供電（標準版建議 DC 5V 5A，Pro 版建議 DC 12V 5A）。

### Windows

1. 安裝 [Python 3.10+](https://www.python.org/downloads/)（安裝時務必勾選 **Add Python to PATH**，否則命令行找不到 `python`）。驗證安裝：

```bash
python --version
```

2. 創建虛擬環境並安裝依賴：

```bash
cd Juxi_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

> 提示：激活後命令行前綴會出現 `(.venv)`。

3. 檢查環境並啟動：

```bash
python setup.py
python -m src.gui.factory_calibration_tool
```

看到 `[OK] 环境检查通过，可以运行项目` 即表示環境正確。

4. 在設備管理器（`Win+X` → 設備管理器）的“端口 (COM 和 LPT)”下確認串口號：

```
端口 (COM 和 LPT)
  └─ USB-SERIAL CH340 (COM3)     ← 你的舵机串口
```

> **記下 COM 號**，啟動後在頂欄選擇；也可手動指定端口（串口被佔用時）：

```bash
python -m src.gui.factory_calibration_tool --port1 COM3 --port2 COM4
```

查看可用端口：

```bash
python -m src.gui.factory_calibration_tool --list-ports
```

### Linux（Ubuntu / Debian）

1. 安裝中文字體與依賴（中文字體為顯示中文界面必需，emoji 字體用於日誌中的 ✅⚠️ 等圖標）：

```bash
sudo apt install python3-venv fonts-noto-cjk fonts-noto-color-emoji
```

2. **⚠️ 添加串口權限（dialout 組）【必需】**（Linux 默認普通用戶無法訪問 `/dev/ttyUSB*` / `/dev/ttyACM*`）：

```bash
sudo usermod -a -G dialout $USER
# 注销并重新登录后生效
```

驗證（輸出應包含 `dialout`）：

```bash
groups
```

> 不生效時：重啟電腦；部分發行版組名是 `uucp`（Arch）或 `tty`。

3. 創建虛擬環境、安裝依賴並啟動：

```bash
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> 若 pip 報 externally managed environment 錯誤，可改用 `pip install --break-system-packages -r requirements.txt`，或使用虛擬環境。

4. 識別 USB 轉串口設備（插入適配器後）：

```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

典型輸出：

```
/dev/ttyUSB0   # CH340 / CP2102 / PL2303
/dev/ttyACM0   # 原生 USB 串口（Arduino / ESP32 板载）
```

查看詳細製造商信息：

```bash
dmesg | tail -20 | grep -i tty
# 或
lsusb
```

> 多個設備時按插拔順序分配 `ttyUSB0` / `ttyUSB1`，可能不穩定。建議用 `/dev/ttyACM*` 或按製造商固定（見下文 udev 小節）。

手動指定端口：

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/ttyUSB0 --port2 /dev/ttyUSB1
```

> 若只有一個串口，工具會自動把第二個端口設為“禁用”。

5. 可選：用 udev 固定設備名（避免插拔後編號漂移）。創建 `/etc/udev/rules.d/99-servo.rules`，按 USB ID 固定：

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", SYMLINK+="ttyServo"
```

之後 `ls -l /dev/ttyServo` 即可用固定名訪問；廠商 ID 用 `lsusb` 查詢。

### macOS

1. 用 Homebrew 安裝 Python（避免系統自帶 Python 版本過舊）：

```bash
# 安装 Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python
```

驗證：

```bash
python3 --version
```

2. 創建虛擬環境、安裝依賴並啟動（用 `source` 激活，不是 `.bat`）：

```bash
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

3. **⚠️ 串口命名**：macOS 把 USB 轉串口設備放在 `/dev` 下，有**兩套命名**：

| 前綴 | 含義 | 是否可用 |
| ---- | ---- | -------- |
| `/dev/tty.usbserial-*` | 調製解調器風格（阻塞式） | 可能卡住，不推薦 |
| `/dev/cu.usbserial-*` | 調用/終端風格（**非阻塞**） | ✅ 推薦使用 |

查看你的串口名：

```bash
ls /dev/cu.*
```

典型輸出：

```
/dev/cu.usbserial-0001      # CP2102 / FTDI
/dev/cu.usbmodem141101      # 板载 USB 串口（Arduino / ESP32）
/dev/cu.wchusbserial1420    # CH340
```

> 程序會自動優先選擇 `cu.*` 設備；手動指定端口請用 `cu.` 而非 `tty.`。

手動指定端口：

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/cu.usbserial-0001 --port2 /dev/cu.usbmodem141101
```

4. USB 驅動：大部分常見芯片（CH340、CP2102、FTDI）macOS 自帶驅動，即插即用。若設備不識別：

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**：較老批次需安裝 WCH 官方驅動；
- 一般 `ls /dev/cu.*` 能看到設備即可。

5. 使用提示：
   - **串口名會變**：不同 USB 口插拔後 `cu.*` 名可能變化，每次啟動時在頂欄下拉框選擇即可。
   - **省電**：macOS 可能休眠導致串口斷開，操作時保持喚醒或調高睡眠時間。
   - **隱私權限**：首次運行如提示“訪問可移動磁盤”，點擊允許。

## 使用步驟

### 1. 連接與識別舵機

1. 通過 USB 轉串口適配器連接機械臂控制板，給舵機供電。
2. 打開 GUI，在頂欄串口下拉框中選擇對應端口（或點擊 `🔄` 刷新）。
3. 面板頂部顯示 `🟢 已连接`，並自動掃描出 ID 1–20 範圍內的在線舵機（通常為 1–6）。

> 若提示串口佔用，請確認沒有其他程序（串口監視器、上一個未退出的工具）佔用該端口。

### 2. 中位校準（將當前位置設為 2048）

> 校準前請先物理擺好機械臂姿態，使每個關節位於你期望的“零位 / 中位”。

1. 點擊面板上的 **串口X中位校準** 按鈕。
2. 程序先失能舵機，提示你手動調整舵機到期望中位。
3. 確認後，程序對每個舵機執行：解鎖 EEPROM → 寫入校準命令（值 128 到地址 40）→ 重新鎖定 EEPROM。
4. 校準後可使用“中位測試”驗證：舵機應保持原位（位移很小）說明校準成功。

### 3. 中位測試

1. 點擊 **串口X中位測試**。
2. 程序啟動力矩並把所有舵機移動到 2048。
3. 若舵機從當前位置幾乎不動，說明校準正確；若大幅移動，說明該校準值不可靠，需要重新校準。

### 4. 失能電機（手動調整）

- 點擊 **串口X失能電機**，關閉該端口全部舵機力矩，可自由手動旋轉。
- 單舵機可在 **單舵機控制** 頁通過滑桿下方的力矩開關單獨開關。

### 5. 單舵機控制（Tab2）

1. 在 **🎚️ 單舵機控制** 頁，每個在線舵機對應一個位置滑桿和一個力矩開關。
2. **拖動滑桿 → 鬆開後**，舵機移動到目標位置。
3. 滑桿下方的力矩開關可單獨開啟 / 關閉該舵機力矩。

### 6. FT 調試器（參數讀寫與位置控制）

在 **🔬 FT 調試器** 頁：

1. **串口連接**：選擇端口、波特率（默認 1M），連接後 **掃描舵機** 檢測在線舵機。
2. **讀取參數**：讀取全部寄存器（EEPROM + SRAM）。
3. **參數表**：5 列顯示全部 56 個寄存器，點選某行自動聯動“寫入地址”。
4. **位置控制**：設置目標位置 / 速度後執行，移動完成後提示關閉力矩。
5. 波特率修改、恢復出廠與 xdat 參數備份/恢復見下文各節。

### 7. 修改舵機 ID

1. 進入 **🔬 FT 調試器** 頁，連接串口並掃描舵機。
2. 選中目標舵機，在參數表中修改“舵機 ID”（地址 0x05）的值，點擊寫入。
3. 程序執行：解鎖 → 寫入地址 5 → 驗證新 ID → 重新鎖定。

> ⚠️ 修改 ID 前務必確保總線上只有這一隻舵機，避免 ID 衝突。

### 8. 修改波特率 / 恢復出廠設置

- **修改波特率**：在 FT 調試器頁的“波特率 / 恢復出廠”區，選擇新波特率（38400 – 1000000 bps）後修改。寫入後自動切換串口波特率並 ping 驗證，失敗自動回滾。
- **恢復出廠設置**：舵機恢復為出廠默認（ID=1，波特率=1000000），之後需重新掃描。

### 9. xdat 參數備份與恢復

在 FT 調試器頁“xdat 參數（僅保存 EEPROM）”區：

1. **💾 保存當前舵機**：把當前選中舵機的 EEPROM 參數保存為 xdat 文件（備份）。
2. 隨意修改舵機參數後，如想恢復：
3. **📂 打開 xdat**：加載備份文件。
4. **📤 恢復參數到舵機**：把備份寫回當前舵機 EEPROM。

### 10. 雙端口同步遙控

> ⚠️ **方向說明：串口1 控制 串口2**。串口1（主控）只讀取舵機角度，串口2（從控）被同步控制。

1. 頂欄點擊 **🎮 遙控**（串口1 讀取角度 → 串口2 同步控制同 ID 舵機）。
2. 兩個端口的舵機 ID 需一致；僅交集內的舵機會被同步。
3. 再次點擊同一按鈕停止，之後左右面板掃描線程自動恢復。

### 11. LeRobot 校準（命令行）

```bash
# 校准从动臂（保存到 ~/.cache/huggingface/lerobot/calibration/robots/so_follower/）
python -m src.tools.lerobot_calibrate --arm-type follower

# 校准领导臂
python -m src.tools.lerobot_calibrate --arm-type leader
```

流程：失能舵機 → 每個關節擺到中位記錄 `homing_offset` → 緩慢轉動整個行程記錄 `range_min/max`（`wrist_roll` 為連續旋轉關節，範圍固定 `[0,4095]`）→ 保存 JSON。

按校準文件運行到中位：

```bash
python -m src.tools.run_calibration_middle <校准文件.json> --mode zero
```

LeRobot 環境的安裝與數據採集流程詳見 [LeRobot機械臂教程](./SO-ARM101-Tutorial.md)。

## 命令行工具

除圖形界面外，工具提供以下命令行入口（無需 GUI）：

```bash
# 扫描舵机
python -m src.tools.scan_id

# 舵机快速中位校准
python -m src.tools.servo_quick_calibration

# 舵机中位测试
python -m src.tools.servo_center_test

# 失能全部舵机
python -m src.tools.servo_disable

# LeRobot 风格校准
python -m src.tools.lerobot_calibrate

# LeRobot 风格校准（指定串口）
python -m src.tools.lerobot_calibrate /dev/ttyACM0

# 双端口同步遥控
python -m src.tools.servo_remote_control
```

## 注意事項

1. **安全第一**：中位校準會把 EEPROM 持久化。校準前確認供電穩定、機械臂不會碰撞到人或物。
2. **供電**：SoARM 101 標準版建議 DC 5V 5A，Pro 版建議 DC 12V 5A。供電不足會導致舵機丟步或通信失敗。
3. **串口獨佔**：Windows 下串口被程序獨佔，同一端口不能同時被 GUI 掃描線程和校準子進程佔用。工具會自動先停掃描線程、結束舊進程再操作，請勿手動重複點擊。
4. **Linux 串口權限**：訪問 `/dev/ttyUSB*` / `/dev/ttyACM*` 需將用戶加入 `dialout` 組（見上文“Linux”小節）。
5. **macOS 串口命名**：請使用 `/dev/cu.*`（非阻塞）而非 `/dev/tty.*`（阻塞，可能卡住），見上文“macOS”小節。
6. **熱插拔**：拔掉 USB 後程序會嘗試自動重連；重新插回後點擊 `🔄` 刷新端口列表。
7. **過溫 / 過壓保護**：程序會監控電壓與溫度（溫度 > 60°C 告警）。若舵機連續高溫，請停機散熱。
8. **中位校準不可逆**：寫入後原偏移被覆蓋，無法撤銷。建議先記錄原始位置再校準。
9. **ID 修改風險**：寫入失敗或驗證失敗時程序會報錯並恢復掃描，但極端情況下舵機可能“失聯”。遇到失聯可嘗試“恢復出廠設置”（復位後 ID 回到 1）。
10. **編碼問題**：若在 Windows 控制台出現 emoji 亂碼，請設置 `PYTHONIOENCODING=utf-8` 後再運行命令行工具。Linux / macOS 原生 UTF-8 一般無此問題。

## 故障排除

| 現象 | 可能原因 | 解決辦法 |
| ---- | -------- | -------- |
| 無法打開串口 / 端口被佔用 | 其他程序佔用 | 關閉串口監視器等程序，或更換端口後重啟工具 |
| Windows 打開串口報 PermissionError | 其他進程佔用該 COM 口 | 確保沒有其他進程佔用該 COM 口 |
| 掃描不到舵機 | 供電不足 / 接線錯誤 / 波特率不符 | 檢查供電與接線，確認舵機為 1M 波特率 |
| 中位校準後舵機亂跑 | 校準前未擺好姿態 | 重新執行“失能→手動擺位→中位校準” |
| 溫升過快 | 負載過大或堵轉 | 檢查機構卡滯，降低速度/加速度 |
| 修改 ID 後找不到舵機 | ID 衝突或寫失敗 | 恢復出廠設置，重新掃描 |
| 遙控不同步 | 兩端口 ID 不一致 | 確認主從端口同 ID 舵機在線 |
| Windows 找不到串口 | 驅動缺失 | 設備管理器檢查驅動；換 USB 口；安裝 CH340 驅動 |
| Linux 找不到串口 | 設備未識別 | `ls /dev/ttyUSB* /dev/ttyACM*`；`lsusb` 確認設備 |
| Permission denied: /dev/ttyUSB0 | 未加入 dialout 組 | 執行 `sudo usermod -a -G dialout $USER` 後重新登錄；或 `sudo chmod 666 /dev/ttyUSB0`（臨時） |
| Linux 設備名變化 | 插拔順序影響 ttyUSB 編號 | 用 udev 規則固定（見上文“Linux”小節）或每次啟動時選擇 |
| macOS 串口名帶 `tty.` 卡住 | 使用了阻塞式設備名 | 改用 `cu.` 前綴設備 |
| macOS 找不到設備 | 設備未識別 | `ls /dev/cu.*`；插拔後重插；用 `system_profiler SPUSBDataType` 查看 |
| macOS 權限問題 | 系統訪問控制 | 一般無需額外權限；若彈出訪問控制，允許終端訪問 |
| 中文界面空白 | 缺少中文字體 | Linux 安裝 `fonts-noto-cjk`；macOS 異常時安裝 Noto Sans CJK |
| emoji 顯示方塊 | 缺少 emoji 字體 | 安裝 `fonts-noto-color-emoji` |
| pip 安裝失敗 | 系統 Python 受保護（externally managed environment） | 使用虛擬環境；或 `pip install --break-system-packages -r requirements.txt` |
| 程序無法啟動 | 依賴缺失或版本不符 | `python3 --version` 確認版本；`pip list` 檢查依賴 |
| macOS 虛擬環境激活失敗 | 用錯激活腳本 | 改用 `source .venv/bin/activate`（不是 `.bat`） |
| macOS Apple Silicon 編譯錯誤 | 使用了 Rosetta 的舊 Python | 使用 Python 3.10+（原生支持 Apple Silicon） |

## 目錄結構

```
Juxi_ServoController/
├── docs/                    # 分系统教程
│   ├── Windows教程.md
│   ├── Linux教程.md
│   └── macOS教程.md
├── src/
│   ├── gui/                  # PySide6 图形界面
│   │   ├── factory_calibration_tool.py   # 主工具（双串口标定 + 遥控 + 语言切换）
│   │   ├── ft_debugger.py                # FT 调试器（参数读写 / xdat 备份）
│   │   ├── calibration_wizard.py         # LeRobot 校准向导
│   │   ├── theme_utils.py                # 浅色主题
│   │   └── language_dialog.py            # 语言选择对话框
│   ├── tools/                # 命令行工具
│   ├── xdat_utils.py         # xdat 参数文件读写
│   ├── i18n*.py / i18n_translations/     # 中英文国际化
│   ├── port_utils.py         # 串口检测
│   └── calibration_manager.py# LeRobot 校准文件管理
├── scservo_sdk/              # FTServo 舵机通信 SDK
├── requirements.txt
└── setup.py                  # 环境检查脚本
```

本工具倉庫由 `src/gui`（PySide6 圖形界面）、`src/tools`（命令行工具）、`scservo_sdk`（FTServo 舵機通信 SDK）和 `setup.py`（環境檢查腳本）等模組組成。

<RelatedProducts slugs="so-arm101,servo-driver-board" />
