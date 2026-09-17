---
title: SCS0009 舵機調試工具使用教程
description: "SCS0009 舵機調試工具使用教程:介紹 FTServo 圖形化工具,涵蓋串口連接、舵機掃描、44 個寄存器讀寫、位置控制與參數備份恢復。"
---

# SCS0009 舵機調試工具使用教程

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**


**SCS0009 舵機調試工具**是專為 [Feetech 總線舵機](/zh-hant/products/feetech-servo) 中的 SCS0009 舵機（電位器反饋，10 位分辨率 0–1023）設計的 FTServo 調試工具。通過圖形界面即可完成串口連接、舵機掃描、參數讀寫、位置控制、波特率修改、恢復出廠與 xdat 參數備份/恢復等操作。

本工具由 JUXI_Technology 開發並維護，採用 MIT 許可發布。FT 調試器、xdat 參數備份/恢復、跨平台支持等功能均為自主實現。

## 兼容性提示

> ⚠️ **本工具目前僅支持 Feetech SCS0009 舵機（SCS 系列，電位器位置反饋，10 位分辨率 0–1023）**。寄存器表、xdat 參數格式、波特率表均針對飛特 SCS0009 設計，其他品牌/型號舵機不保證兼容。

## 功能特性

| 特性 | 說明 |
| ---- | ---- |
| 自動端口檢測 | 智能識別 USB 串口，自動過濾虛擬設備 |
| 跨平台支持 | Windows / Ubuntu / macOS 全平台兼容 |
| 中英文切換 | 界面內一鍵切換中 / 英文，選擇自動記憶 |
| 串口連接 | 手動/自動選擇串口，8 檔波特率（38400~1M） |
| 舵機掃描 | 自動檢測在線舵機（ID 1–254），實時顯示 |
| 參數讀取 | 讀取全部 44 個寄存器（EEPROM + SRAM） |
| 參數表 | 5 列展示（地址/寄存器/值/存儲區域/讀寫），點選聯動 |
| 位置控制 | 目標位置/速度控制，移動完成提示關閉力矩 |
| 波特率修改 | 修改舵機波特率，失敗自動回滾 |
| 恢復出廠 | 一鍵恢復出廠默認設置 |
| xdat 參數 | 保存當前舵機 EEPROM 參數 / 打開備份恢復 |

## 界面介紹

主程序為單面板布局（FT 調試器），窗口高度不足時自動出現滾動條，最大化時自適應拉伸：

```
┌─────────────────────────────────────────────────────────────┐
│  SCS0009 舵机调试工具                     [EN / English]     │  ← 顶栏
├─────────────────────────────────────────────────────────────┤
│  🔌 串口连接   [端口▾][🔄][波特率▾][连接] [🔴未连接]         │
│  🎯 舵机      [🔍扫描][舵机▾][读取参数][读取状态]            │
│               ┌ 扫描到的舵机列表 ┐                           │
│  📋 参数表    地址|寄存器|值|存储区域|读写  (44 个寄存器)      │
│  🎯 位置控制  目标位置|速度|移动|力矩开|力矩关 | 状态         │
│  🔧 波特率/恢复出厂  新波特率|修改波特率|恢复出厂            │
│  📁 xdat 参数(仅保存EEPROM) 保存当前舵机|打开xdat|恢复参数    │
│  📜 日志                                                      │
└─────────────────────────────────────────────────────────────┘
```

- **頂欄**：應用標題、語言切換按鈕。
- **🔌 串口連接**：選擇端口、波特率、連接/斷開。
- **🎯 舵機**：掃描、選擇舵機、讀取參數/狀態。
- **📋 參數表**：44 個寄存器 5 列展示（地址/寄存器/值/存儲區域/讀寫），點選自動聯動寫入地址。
- **🎯 位置控制**：目標位置/速度，移動完成後狀態欄提示關閉力矩。
- **🔧 波特率/恢復出廠**：修改波特率（失敗回滾）、恢復出廠。
- **📁 xdat 參數（僅保存 EEPROM）**：保存當前舵機參數、打開備份、恢復。

## 安裝與啟動

環境要求：

| 依賴 | 版本 | 說明 |
| ---- | ---- | ---- |
| Python | >= 3.8 | 建議 3.10+，從 [python.org](https://www.python.org/downloads/) 下載 |
| PySide6 | >= 6.0 | GUI 框架 |
| pyserial | >= 3.5 | 串口通信 |
| 系統 | Windows 10 / 11、Ubuntu 20.04+ / Debian 11+、macOS 11+ | macOS 11+ 支持 Apple Silicon / Intel |

硬體連接：用 USB 轉串口適配器（如 CH340 / CP2102）連接舵機控制板，並給舵機供電（標準版建議 DC 5V 5A，Pro 版建議 DC 12V 5A）。

### Windows

1. 安裝 [Python 3.10+](https://www.python.org/downloads/)（安裝時務必勾選 **Add Python to PATH**，否則命令行找不到 `python`）。驗證安裝：

```bash
python --version
```

2. 創建虛擬環境並安裝依賴：

```bash
cd SCS0009_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

> ⚠️ **虛擬環境只需創建一次**。重複執行 `python -m venv .venv` 會重置/覆蓋原環境（清空已安裝的依賴），之後每次只需 `activate` 激活即可。

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

> **記下 COM 號**，啟動後選擇；也可手動指定端口（串口被佔用時）：

```bash
python -m src.gui.factory_calibration_tool --port COM3
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
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **虛擬環境只需創建一次**。重複執行 `python3 -m venv .venv` 會覆蓋原環境（清空已裝依賴），之後每次只需 `source .venv/bin/activate`。

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
python -m src.gui.factory_calibration_tool --port /dev/ttyUSB0
```

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
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **虛擬環境只需創建一次**。重複執行 `python3 -m venv .venv` 會覆蓋原環境（清空已裝依賴），之後每次只需 `source .venv/bin/activate`。

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
python -m src.gui.factory_calibration_tool --port /dev/cu.usbserial-0001
```

4. USB 驅動：大部分常見芯片（CH340、CP2102、FTDI）macOS 自帶驅動，即插即用。若設備不識別：

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**：較老批次需安裝 WCH 官方驅動；
- 一般 `ls /dev/cu.*` 能看到設備即可。

5. 使用提示：
   - **串口名會變**：不同 USB 口插拔後 `cu.*` 名可能變化，每次啟動時在“🔌 串口連接”區選擇即可。
   - **省電**：macOS 可能休眠導致串口斷開，操作時保持喚醒或調高睡眠時間。
   - **隱私權限**：首次運行如提示“訪問可移動磁盤”，點擊允許。

## 使用步驟

### 1. 連接與識別舵機

1. 通過 USB 轉串口適配器連接舵機控制板，給舵機供電。
2. 打開 GUI，在“🔌 串口連接”區選擇端口（或點擊 `🔄` 刷新），設置波特率（默認 1M）。
3. 點擊 **連接**，狀態顯示 `🟢 已連接`。

> 若提示串口佔用，請確認沒有其他程序（串口監視器、上一個未退出的工具）佔用該端口。

> 若只有一個串口，工具會自動把第二個端口設為“禁用”。

### 2. 掃描舵機

1. 點擊 **🔍 掃描舵機**，檢測 ID 1–254 範圍內的在線舵機。
2. 掃描結果實時顯示在舵機列表中（帶型號）。
3. 在舵機列表點擊某一行，自動填充到“舵機”下拉框。

### 3. 讀取參數

1. 選中舵機後，點擊 **📖 讀取參數**，逐個讀取全部 44 個寄存器。
2. 參數表 5 列展示（地址/寄存器/值/存儲區域/讀寫），EPROM / SRAM / DEFAULT 顏色區分。
3. 日誌區顯示每個寄存器的讀取結果和失敗原因。

各寄存器的含義可參考 [電位器SCSCL舵機-內存表解析](./Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis.md)。

### 4. 修改參數 / 寫入

1. 在參數表點擊要修改的寄存器行 → 自動聯動“寫入地址”“長度”“值”。
2. 在“值”輸入框修改新值，點擊 **✏️ 寫入**。
3. 程序執行：解鎖 EEPROM → 寫入 → 重新鎖定。
4. 寫入結果彈窗：成功彈綠色提示“✅ 已成功寫入”，失敗彈紅色提示“❌ 寫入失敗”（含原因）。

### 5. 修改舵機 ID

1. 在參數表找到“舵機 ID”（地址 0x05）行，點擊選中。
2. 修改“值”為新 ID，點擊 **✏️ 寫入**。
3. 程序執行：解鎖 → 寫入地址 5 → 重新鎖定。

> ⚠️ 修改 ID 前務必確保總線上只有這一隻舵機，避免 ID 衝突。

### 6. 位置控制

1. 在“🎯 位置控制”區，**拖動滑動條**調整目標位置（0–1023，電位器 10 位分辨率），數值框同步顯示；也可直接在數值框輸入，滑動條同步跟隨。
2. 點擊 **▶ 移動**，舵機開始移動，狀態欄顯示“移動中...”。
3. 移動完成後顯示“✅ 已移動完成，請關閉力矩”，點擊 **⏹ 力矩關**。

### 7. 修改波特率 / 恢復出廠設置

- **修改波特率**：在“🔧 波特率/恢復出廠”區選擇新波特率（38400 – 1000000 bps）後點擊 **🔧 修改波特率**。寫入後自動切換串口波特率並 ping 驗證，失敗自動回滾。
- **恢復出廠設置**：點擊 **🔄 恢復出廠**，舵機恢復為出廠默認（ID=1，波特率=1000000），之後需重新掃描。

### 8. xdat 參數備份與恢復

在“📁 xdat 參數（僅保存 EEPROM）”區：

1. **💾 保存當前舵機**：把當前選中舵機的 EEPROM 參數保存為 xdat 文件（備份）。
2. 隨意修改舵機參數後，如想恢復：
3. **📂 打開 xdat**：加載備份文件。
4. **📤 恢復參數到舵機**：把備份寫回當前舵機 EEPROM。

## 注意事項

1. **安全第一**：寫入參數會持久化到 EEPROM。寫入前確認供電穩定、機械臂不會碰撞到人或物。
2. **供電**：SoARM 101 標準版建議 DC 5V 5A，Pro 版建議 DC 12V 5A。供電不足會導致舵機丟步或通信失敗。
3. **串口獨佔**：Windows 下串口被程序獨佔，同一端口不能同時被兩個程序佔用。請勿在別的程序（串口監視器）打開同一端口時使用本工具。
4. **Linux 串口權限**：訪問 `/dev/ttyUSB*` / `/dev/ttyACM*` 需將用戶加入 `dialout` 組（見上文“Linux”小節）。
5. **macOS 串口命名**：請使用 `/dev/cu.*`（非阻塞）而非 `/dev/tty.*`（阻塞，可能卡住），見上文“macOS”小節。
6. **熱插拔**：拔掉 USB 後程序會嘗試自動重連；重新插回後點擊 `🔄` 刷新端口列表。
7. **過溫 / 過壓保護**：程序會監控電壓與溫度（溫度 > 60°C 告警）。若舵機連續高溫，請停機散熱。
8. **參數寫入不可逆**：EEPROM 寫入後原值被覆蓋，無法撤銷。建議先用“xdat 保存當前舵機”備份再修改。
9. **ID 修改風險**：寫入失敗或驗證失敗時程序會報錯，但極端情況下舵機可能“失聯”。遇到失聯可嘗試“恢復出廠設置”（復位後 ID 回到 1）。
10. **編碼問題**：若在 Windows 控制台出現 emoji 亂碼，請設置 `PYTHONIOENCODING=utf-8` 後再運行命令行工具。Linux / macOS 原生 UTF-8 一般無此問題。

## 故障排除

| 現象 | 可能原因 | 解決辦法 |
| ---- | -------- | -------- |
| 無法打開串口 / 端口被佔用 | 其他程序佔用 | 關閉串口監視器等程序，或更換端口後重啟工具 |
| Windows 打開串口報 PermissionError | 其他進程佔用該 COM 口 | 確保沒有其他進程佔用該 COM 口 |
| 掃描不到舵機 | 供電不足 / 接線錯誤 / 波特率不符 | 檢查供電與接線，確認舵機為 1M 波特率 |
| 讀取參數失敗 | 串口被佔用 / 舵機未響應 | 關閉其他程序；重新連接；檢查地址是否正確 |
| 寫入失敗 | 舵機供電不足或目標寄存器不可寫 | 檢查舵機供電與連接；確認目標寄存器可寫 |
| 溫升過快 | 負載過大或堵轉 | 檢查機構卡滯，降低速度/加速度 |
| 修改 ID 後找不到舵機 | ID 衝突或寫失敗 | 恢復出廠設置，重新掃描 |
| Windows 找不到串口 | 驅動缺失 | 設備管理器檢查驅動；換 USB 口；安裝 CH340 驅動 |
| Linux 找不到串口 | 設備未識別 | `ls /dev/ttyUSB* /dev/ttyACM*`；`lsusb` 確認設備 |
| Permission denied: /dev/ttyUSB0 | 未加入 dialout 組 | 執行 `sudo usermod -a -G dialout $USER` 後重新登錄；或 `sudo chmod 666 /dev/ttyUSB0`（臨時） |
| Linux 設備名變化 | 插拔順序影響 ttyUSB 編號 | 用 udev 規則固定（見上文“Linux”小節）或每次啟動時選擇 |
| macOS 串口名帶 `tty.` 卡住 | 使用了阻塞式設備名 | 改用 `cu.` 前綴設備 |
| macOS 找不到設備 | 設備未識別 | `ls /dev/cu.*`；插拔後重插；用 `system_profiler SPUSBDataType` 查看 |
| macOS 權限問題 | 系統訪問控制 | 一般無需額外權限；若彈出訪問控制，允許終端訪問 |
| 中文界面空白 | 缺少中文字體 | Windows 默認微軟雅黑（異常時安裝中文字體）；Linux 安裝 `fonts-noto-cjk`；macOS 默認 PingFang（異常時安裝 Noto Sans CJK） |
| emoji 顯示方塊 | 缺少 emoji 字體 | 安裝 `fonts-noto-color-emoji` |
| pip 安裝失敗 | 系統 Python 受保護（externally managed environment） | 使用虛擬環境；或 `pip install --break-system-packages -r requirements.txt` |
| 程序無法啟動 | 依賴缺失或版本不符 | `python3 --version` 確認版本；`pip list` 檢查依賴 |
| macOS 虛擬環境激活失敗 | 用錯激活腳本 | 改用 `source .venv/bin/activate`（不是 `.bat`） |
| macOS Apple Silicon 編譯錯誤 | 使用了 Rosetta 的舊 Python | 使用 Python 3.10+（原生支持 Apple Silicon） |

## 目錄結構

```
SCS0009_ServoController/
├── docs/                    # 分系统教程（中英文）
│   ├── zh/                  # 中文教程
│   │   ├── Windows教程.md
│   │   ├── Linux教程.md
│   │   └── macOS教程.md
│   └── en/                  # 英文教程
│       ├── Windows.md
│       ├── Linux.md
│       └── macOS.md
├── src/
│   ├── gui/                  # PySide6 图形界面
│   │   ├── factory_calibration_tool.py   # 主窗口（FT 调试器 + 语言切换）
│   │   ├── ft_debugger.py                # FT 调试器面板（参数读写 / xdat 备份）
│   │   ├── theme_utils.py                # 浅色主题
│   │   └── language_dialog.py            # 语言选择对话框
│   ├── xdat_utils.py         # xdat 参数文件读写
│   ├── i18n*.py / i18n_translations/     # 中英文国际化
│   └── port_utils.py         # 串口检测
├── scservo_sdk/              # FTServo 舵机通信 SDK
├── requirements.txt
└── setup.py                  # 环境检查脚本
```

本工具倉庫由 `src/gui`（PySide6 圖形界面與 FT 調試器）、`scservo_sdk`（FTServo 舵機通信 SDK）和 `setup.py`（環境檢查腳本）等模組組成。

<RelatedProducts slugs="feetech-servo" />
