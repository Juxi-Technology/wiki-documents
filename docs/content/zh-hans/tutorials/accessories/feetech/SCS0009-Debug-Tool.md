---
title: SCS0009 舵机调试工具使用教程
description: "专为 Feetech SCS0009 舵机（电位器反馈，10 位分辨率 0–1023）设计的 FTServo 调试工具，支持串口连接、舵机扫描、44 个寄存器参数读写、位置控制与 xdat 参数备份恢复。"
---

# SCS0009 舵机调试工具使用教程

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**


**SCS0009 舵机调试工具**是专为 [Feetech 总线舵机](/zh-hans/products/feetech-servo) 中的 SCS0009 舵机（电位器反馈，10 位分辨率 0–1023）设计的 FTServo 调试工具。通过图形界面即可完成串口连接、舵机扫描、参数读写、位置控制、波特率修改、恢复出厂与 xdat 参数备份/恢复等操作。

本工具由 JUXI_Technology 开发并维护，采用 MIT 许可发布。FT 调试器、xdat 参数备份/恢复、跨平台支持等功能均为自主实现。

## 兼容性提示

> ⚠️ **本工具目前仅支持 Feetech SCS0009 舵机（SCS 系列，电位器位置反馈，10 位分辨率 0–1023）**。寄存器表、xdat 参数格式、波特率表均针对飞特 SCS0009 设计，其他品牌/型号舵机不保证兼容。

## 功能特性

| 特性 | 说明 |
| ---- | ---- |
| 自动端口检测 | 智能识别 USB 串口，自动过滤虚拟设备 |
| 跨平台支持 | Windows / Ubuntu / macOS 全平台兼容 |
| 中英文切换 | 界面内一键切换中 / 英文，选择自动记忆 |
| 串口连接 | 手动/自动选择串口，8 档波特率（38400~1M） |
| 舵机扫描 | 自动检测在线舵机（ID 1–254），实时显示 |
| 参数读取 | 读取全部 44 个寄存器（EEPROM + SRAM） |
| 参数表 | 5 列展示（地址/寄存器/值/存储区域/读写），点选联动 |
| 位置控制 | 目标位置/速度控制，移动完成提示关闭力矩 |
| 波特率修改 | 修改舵机波特率，失败自动回滚 |
| 恢复出厂 | 一键恢复出厂默认设置 |
| xdat 参数 | 保存当前舵机 EEPROM 参数 / 打开备份恢复 |

## 界面介绍

主程序为单面板布局（FT 调试器），窗口高度不足时自动出现滚动条，最大化时自适应拉伸：

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

- **顶栏**：应用标题、语言切换按钮。
- **🔌 串口连接**：选择端口、波特率、连接/断开。
- **🎯 舵机**：扫描、选择舵机、读取参数/状态。
- **📋 参数表**：44 个寄存器 5 列展示（地址/寄存器/值/存储区域/读写），点选自动联动写入地址。
- **🎯 位置控制**：目标位置/速度，移动完成后状态栏提示关闭力矩。
- **🔧 波特率/恢复出厂**：修改波特率（失败回滚）、恢复出厂。
- **📁 xdat 参数（仅保存 EEPROM）**：保存当前舵机参数、打开备份、恢复。

## 安装与启动

环境要求：

| 依赖 | 版本 | 说明 |
| ---- | ---- | ---- |
| Python | >= 3.8 | 建议 3.10+，从 [python.org](https://www.python.org/downloads/) 下载 |
| PySide6 | >= 6.0 | GUI 框架 |
| pyserial | >= 3.5 | 串口通信 |
| 系统 | Windows 10 / 11、Ubuntu 20.04+ / Debian 11+、macOS 11+ | macOS 11+ 支持 Apple Silicon / Intel |

硬件连接：用 USB 转串口适配器（如 CH340 / CP2102）连接舵机控制板，并给舵机供电（标准版建议 DC 5V 5A，Pro 版建议 DC 12V 5A）。

### Windows

1. 安装 [Python 3.10+](https://www.python.org/downloads/)（安装时务必勾选 **Add Python to PATH**，否则命令行找不到 `python`）。验证安装：

```bash
python --version
```

2. 创建虚拟环境并安装依赖：

```bash
cd SCS0009_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

> ⚠️ **虚拟环境只需创建一次**。重复执行 `python -m venv .venv` 会重置/覆盖原环境（清空已安装的依赖），之后每次只需 `activate` 激活即可。

> 提示：激活后命令行前缀会出现 `(.venv)`。

3. 检查环境并启动：

```bash
python setup.py
python -m src.gui.factory_calibration_tool
```

看到 `[OK] 环境检查通过，可以运行项目` 即表示环境正确。

4. 在设备管理器（`Win+X` → 设备管理器）的“端口 (COM 和 LPT)”下确认串口号：

```
端口 (COM 和 LPT)
  └─ USB-SERIAL CH340 (COM3)     ← 你的舵机串口
```

> **记下 COM 号**，启动后选择；也可手动指定端口（串口被占用时）：

```bash
python -m src.gui.factory_calibration_tool --port COM3
```

查看可用端口：

```bash
python -m src.gui.factory_calibration_tool --list-ports
```

### Linux（Ubuntu / Debian）

1. 安装中文字体与依赖（中文字体为显示中文界面必需，emoji 字体用于日志中的 ✅⚠️ 等图标）：

```bash
sudo apt install python3-venv fonts-noto-cjk fonts-noto-color-emoji
```

2. **⚠️ 添加串口权限（dialout 组）【必需】**（Linux 默认普通用户无法访问 `/dev/ttyUSB*` / `/dev/ttyACM*`）：

```bash
sudo usermod -a -G dialout $USER
# 注销并重新登录后生效
```

验证（输出应包含 `dialout`）：

```bash
groups
```

> 不生效时：重启电脑；部分发行版组名是 `uucp`（Arch）或 `tty`。

3. 创建虚拟环境、安装依赖并启动：

```bash
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **虚拟环境只需创建一次**。重复执行 `python3 -m venv .venv` 会覆盖原环境（清空已装依赖），之后每次只需 `source .venv/bin/activate`。

> 若 pip 报 externally managed environment 错误，可改用 `pip install --break-system-packages -r requirements.txt`，或使用虚拟环境。

4. 识别 USB 转串口设备（插入适配器后）：

```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

典型输出：

```
/dev/ttyUSB0   # CH340 / CP2102 / PL2303
/dev/ttyACM0   # 原生 USB 串口（Arduino / ESP32 板载）
```

查看详细制造商信息：

```bash
dmesg | tail -20 | grep -i tty
# 或
lsusb
```

> 多个设备时按插拔顺序分配 `ttyUSB0` / `ttyUSB1`，可能不稳定。建议用 `/dev/ttyACM*` 或按制造商固定（见下文 udev 小节）。

手动指定端口：

```bash
python -m src.gui.factory_calibration_tool --port /dev/ttyUSB0
```

5. 可选：用 udev 固定设备名（避免插拔后编号漂移）。创建 `/etc/udev/rules.d/99-servo.rules`，按 USB ID 固定：

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", SYMLINK+="ttyServo"
```

之后 `ls -l /dev/ttyServo` 即可用固定名访问；厂商 ID 用 `lsusb` 查询。

### macOS

1. 用 Homebrew 安装 Python（避免系统自带 Python 版本过旧）：

```bash
# 安装 Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python
```

验证：

```bash
python3 --version
```

2. 创建虚拟环境、安装依赖并启动（用 `source` 激活，不是 `.bat`）：

```bash
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **虚拟环境只需创建一次**。重复执行 `python3 -m venv .venv` 会覆盖原环境（清空已装依赖），之后每次只需 `source .venv/bin/activate`。

3. **⚠️ 串口命名**：macOS 把 USB 转串口设备放在 `/dev` 下，有**两套命名**：

| 前缀 | 含义 | 是否可用 |
| ---- | ---- | -------- |
| `/dev/tty.usbserial-*` | 调制解调器风格（阻塞式） | 可能卡住，不推荐 |
| `/dev/cu.usbserial-*` | 调用/终端风格（**非阻塞**） | ✅ 推荐使用 |

查看你的串口名：

```bash
ls /dev/cu.*
```

典型输出：

```
/dev/cu.usbserial-0001      # CP2102 / FTDI
/dev/cu.usbmodem141101      # 板载 USB 串口（Arduino / ESP32）
/dev/cu.wchusbserial1420    # CH340
```

> 程序会自动优先选择 `cu.*` 设备；手动指定端口请用 `cu.` 而非 `tty.`。

手动指定端口：

```bash
python -m src.gui.factory_calibration_tool --port /dev/cu.usbserial-0001
```

4. USB 驱动：大部分常见芯片（CH340、CP2102、FTDI）macOS 自带驱动，即插即用。若设备不识别：

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**：较老批次需安装 WCH 官方驱动；
- 一般 `ls /dev/cu.*` 能看到设备即可。

5. 使用提示：
   - **串口名会变**：不同 USB 口插拔后 `cu.*` 名可能变化，每次启动时在“🔌 串口连接”区选择即可。
   - **省电**：macOS 可能休眠导致串口断开，操作时保持唤醒或调高睡眠时间。
   - **隐私权限**：首次运行如提示“访问可移动磁盘”，点击允许。

## 使用步骤

### 1. 连接与识别舵机

1. 通过 USB 转串口适配器连接舵机控制板，给舵机供电。
2. 打开 GUI，在“🔌 串口连接”区选择端口（或点击 `🔄` 刷新），设置波特率（默认 1M）。
3. 点击 **连接**，状态显示 `🟢 已连接`。

> 若提示串口占用，请确认没有其他程序（串口监视器、上一个未退出的工具）占用该端口。

> 若只有一个串口，工具会自动把第二个端口设为“禁用”。

### 2. 扫描舵机

1. 点击 **🔍 扫描舵机**，检测 ID 1–254 范围内的在线舵机。
2. 扫描结果实时显示在舵机列表中（带型号）。
3. 在舵机列表点击某一行，自动填充到“舵机”下拉框。

### 3. 读取参数

1. 选中舵机后，点击 **📖 读取参数**，逐个读取全部 44 个寄存器。
2. 参数表 5 列展示（地址/寄存器/值/存储区域/读写），EPROM / SRAM / DEFAULT 颜色区分。
3. 日志区显示每个寄存器的读取结果和失败原因。

各寄存器的含义可参考 [电位器SCSCL舵机-内存表解析](./Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis.md)。

### 4. 修改参数 / 写入

1. 在参数表点击要修改的寄存器行 → 自动联动“写入地址”“长度”“值”。
2. 在“值”输入框修改新值，点击 **✏️ 写入**。
3. 程序执行：解锁 EEPROM → 写入 → 重新锁定。
4. 写入结果弹窗：成功弹绿色提示“✅ 已成功写入”，失败弹红色提示“❌ 写入失败”（含原因）。

### 5. 修改舵机 ID

1. 在参数表找到“舵机 ID”（地址 0x05）行，点击选中。
2. 修改“值”为新 ID，点击 **✏️ 写入**。
3. 程序执行：解锁 → 写入地址 5 → 重新锁定。

> ⚠️ 修改 ID 前务必确保总线上只有这一只舵机，避免 ID 冲突。

### 6. 位置控制

1. 在“🎯 位置控制”区，**拖动滑动条**调整目标位置（0–1023，电位器 10 位分辨率），数值框同步显示；也可直接在数值框输入，滑动条同步跟随。
2. 点击 **▶ 移动**，舵机开始移动，状态栏显示“移动中...”。
3. 移动完成后显示“✅ 已移动完成，请关闭力矩”，点击 **⏹ 力矩关**。

### 7. 修改波特率 / 恢复出厂设置

- **修改波特率**：在“🔧 波特率/恢复出厂”区选择新波特率（38400 – 1000000 bps）后点击 **🔧 修改波特率**。写入后自动切换串口波特率并 ping 验证，失败自动回滚。
- **恢复出厂设置**：点击 **🔄 恢复出厂**，舵机恢复为出厂默认（ID=1，波特率=1000000），之后需重新扫描。

### 8. xdat 参数备份与恢复

在“📁 xdat 参数（仅保存 EEPROM）”区：

1. **💾 保存当前舵机**：把当前选中舵机的 EEPROM 参数保存为 xdat 文件（备份）。
2. 随意修改舵机参数后，如想恢复：
3. **📂 打开 xdat**：加载备份文件。
4. **📤 恢复参数到舵机**：把备份写回当前舵机 EEPROM。

## 注意事项

1. **安全第一**：写入参数会持久化到 EEPROM。写入前确认供电稳定、机械臂不会碰撞到人或物。
2. **供电**：SoARM 101 标准版建议 DC 5V 5A，Pro 版建议 DC 12V 5A。供电不足会导致舵机丢步或通信失败。
3. **串口独占**：Windows 下串口被程序独占，同一端口不能同时被两个程序占用。请勿在别的程序（串口监视器）打开同一端口时使用本工具。
4. **Linux 串口权限**：访问 `/dev/ttyUSB*` / `/dev/ttyACM*` 需将用户加入 `dialout` 组（见上文“Linux”小节）。
5. **macOS 串口命名**：请使用 `/dev/cu.*`（非阻塞）而非 `/dev/tty.*`（阻塞，可能卡住），见上文“macOS”小节。
6. **热插拔**：拔掉 USB 后程序会尝试自动重连；重新插回后点击 `🔄` 刷新端口列表。
7. **过温 / 过压保护**：程序会监控电压与温度（温度 > 60°C 告警）。若舵机连续高温，请停机散热。
8. **参数写入不可逆**：EEPROM 写入后原值被覆盖，无法撤销。建议先用“xdat 保存当前舵机”备份再修改。
9. **ID 修改风险**：写入失败或验证失败时程序会报错，但极端情况下舵机可能“失联”。遇到失联可尝试“恢复出厂设置”（复位后 ID 回到 1）。
10. **编码问题**：若在 Windows 控制台出现 emoji 乱码，请设置 `PYTHONIOENCODING=utf-8` 后再运行命令行工具。Linux / macOS 原生 UTF-8 一般无此问题。

## 故障排除

| 现象 | 可能原因 | 解决办法 |
| ---- | -------- | -------- |
| 无法打开串口 / 端口被占用 | 其他程序占用 | 关闭串口监视器等程序，或更换端口后重启工具 |
| Windows 打开串口报 PermissionError | 其他进程占用该 COM 口 | 确保没有其他进程占用该 COM 口 |
| 扫描不到舵机 | 供电不足 / 接线错误 / 波特率不符 | 检查供电与接线，确认舵机为 1M 波特率 |
| 读取参数失败 | 串口被占用 / 舵机未响应 | 关闭其他程序；重新连接；检查地址是否正确 |
| 写入失败 | 舵机供电不足或目标寄存器不可写 | 检查舵机供电与连接；确认目标寄存器可写 |
| 温升过快 | 负载过大或堵转 | 检查机构卡滞，降低速度/加速度 |
| 修改 ID 后找不到舵机 | ID 冲突或写失败 | 恢复出厂设置，重新扫描 |
| Windows 找不到串口 | 驱动缺失 | 设备管理器检查驱动；换 USB 口；安装 CH340 驱动 |
| Linux 找不到串口 | 设备未识别 | `ls /dev/ttyUSB* /dev/ttyACM*`；`lsusb` 确认设备 |
| Permission denied: /dev/ttyUSB0 | 未加入 dialout 组 | 执行 `sudo usermod -a -G dialout $USER` 后重新登录；或 `sudo chmod 666 /dev/ttyUSB0`（临时） |
| Linux 设备名变化 | 插拔顺序影响 ttyUSB 编号 | 用 udev 规则固定（见上文“Linux”小节）或每次启动时选择 |
| macOS 串口名带 `tty.` 卡住 | 使用了阻塞式设备名 | 改用 `cu.` 前缀设备 |
| macOS 找不到设备 | 设备未识别 | `ls /dev/cu.*`；插拔后重插；用 `system_profiler SPUSBDataType` 查看 |
| macOS 权限问题 | 系统访问控制 | 一般无需额外权限；若弹出访问控制，允许终端访问 |
| 中文界面空白 | 缺少中文字体 | Windows 默认微软雅黑（异常时安装中文字体）；Linux 安装 `fonts-noto-cjk`；macOS 默认 PingFang（异常时安装 Noto Sans CJK） |
| emoji 显示方块 | 缺少 emoji 字体 | 安装 `fonts-noto-color-emoji` |
| pip 安装失败 | 系统 Python 受保护（externally managed environment） | 使用虚拟环境；或 `pip install --break-system-packages -r requirements.txt` |
| 程序无法启动 | 依赖缺失或版本不符 | `python3 --version` 确认版本；`pip list` 检查依赖 |
| macOS 虚拟环境激活失败 | 用错激活脚本 | 改用 `source .venv/bin/activate`（不是 `.bat`） |
| macOS Apple Silicon 编译错误 | 使用了 Rosetta 的旧 Python | 使用 Python 3.10+（原生支持 Apple Silicon） |

## 目录结构

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

本工具仓库由 `src/gui`（PySide6 图形界面与 FT 调试器）、`scservo_sdk`（FTServo 舵机通信 SDK）和 `setup.py`（环境检查脚本）等模块组成。

<RelatedProducts slugs="feetech-servo" />
