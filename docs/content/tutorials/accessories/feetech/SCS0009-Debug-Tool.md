---
title: SCS0009 Servo Debug Tool Tutorial
description: "An FTServo debug tool designed for the Feetech SCS0009 servo (potentiometer feedback, 10-bit resolution 0–1023), supporting serial connection, servo scanning, read/write of 44 register parameters, position control, and xdat parameter backup and restore."
---

# SCS0009 Servo Debug Tool Tutorial

> **[Buy in Store](https://www.juxitech.com/products/feetech-scs0009-serial-bus-servo)**


**The SCS0009 Servo Debug Tool** is an FTServo debug tool designed specifically for the SCS0009 servo (potentiometer feedback, 10-bit resolution 0–1023) among the Feetech bus servos ([Feetech Bus Servos](/products/feetech-servo)). Through the graphical interface you can complete serial connection, servo scanning, parameter read/write, position control, baud rate change, factory reset, and xdat parameter backup/restore.

This tool is developed and maintained by JUXI_Technology and released under the MIT license. Features such as the FT debugger, xdat parameter backup/restore, and cross-platform support are all our own implementations.

## Compatibility Notice

> ⚠️ **This tool currently supports the Feetech SCS0009 servo only (SCS series, potentiometer position feedback, 10-bit resolution 0–1023)**. The register table, xdat parameter format, and baud rate table are all designed for the Feetech SCS0009; compatibility with other brands/models of servos is not guaranteed.

## Features

| Feature | Description |
| ---- | ---- |
| Automatic port detection | Intelligently identifies USB serial ports and automatically filters out virtual devices |
| Cross-platform support | Compatible with Windows / Ubuntu / macOS |
| Chinese/English switching | One-click switch between Chinese / English in the UI; the choice is remembered automatically |
| Serial connection | Manual/automatic port selection, 8 baud rate options (38400~1M) |
| Servo scanning | Automatically detects online servos (ID 1–254), displayed in real time |
| Parameter reading | Reads all 44 registers (EEPROM + SRAM) |
| Parameter table | 5-column display (address/register/value/storage area/read-write); selection links the fields |
| Position control | Target position/speed control; prompts to turn off torque when the movement completes |
| Baud rate change | Change the servo baud rate; automatic rollback on failure |
| Factory reset | One-click restore to factory default settings |
| xdat parameters | Save the current servo's EEPROM parameters / open a backup to restore |

## Interface Overview

The main program uses a single-panel layout (FT debugger); a scrollbar appears automatically when the window height is insufficient, and the layout stretches adaptively when maximized:

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

- **Top bar**: application title, language toggle button.
- **🔌 Serial Connection**: select port and baud rate, connect/disconnect.
- **🎯 Servo**: scan, select a servo, read parameters/status.
- **📋 Parameter Table**: 44 registers in 5 columns (address/register/value/storage area/read-write); selection automatically links the write address.
- **🎯 Position Control**: target position/speed; after the movement completes the status bar prompts you to turn off torque.
- **🔧 Baud Rate / Factory Reset**: change the baud rate (rollback on failure), factory reset.
- **📁 xdat Parameters (EEPROM only)**: save the current servo's parameters, open a backup, restore.

## Installation and Startup

Environment requirements:

| Dependency | Version | Description |
| ---- | ---- | ---- |
| Python | >= 3.8 | 3.10+ recommended; download from [python.org](https://www.python.org/downloads/) |
| PySide6 | >= 6.0 | GUI framework |
| pyserial | >= 3.5 | Serial communication |
| System | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+ supports Apple Silicon / Intel |

Hardware connection: use a USB-to-serial adapter (such as CH340 / CP2102) to connect the servo control board, and power the servos (DC 5V 5A recommended for the Standard version, DC 12V 5A for the Pro version).

### Windows

1. Install [Python 3.10+](https://www.python.org/downloads/) (be sure to check **Add Python to PATH** during installation, otherwise the command line won't find `python`). Verify the installation:

```bash
python --version
```

2. Create a virtual environment and install the dependencies:

```bash
cd SCS0009_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

> ⚠️ **The virtual environment only needs to be created once**. Running `python -m venv .venv` again resets/overwrites the original environment (clearing the installed dependencies); afterwards you only need to `activate` it each time.

> Tip: after activation, the command line prefix will show `(.venv)`.

3. Check the environment and launch:

```bash
python setup.py
python -m src.gui.factory_calibration_tool
```

If you see `[OK] 环境检查通过，可以运行项目`, the environment is correct.

4. Confirm the serial port number under "Ports (COM & LPT)" in Device Manager (`Win+X` → Device Manager):

```
端口 (COM 和 LPT)
  └─ USB-SERIAL CH340 (COM3)     ← 你的舵机串口
```

> **Note the COM number** and select it after launching; you can also specify the port manually (when the port is occupied):

```bash
python -m src.gui.factory_calibration_tool --port COM3
```

To list the available ports:

```bash
python -m src.gui.factory_calibration_tool --list-ports
```

### Linux (Ubuntu / Debian)

1. Install Chinese fonts and dependencies (Chinese fonts are required to display the Chinese UI; the emoji font is used for icons such as ✅⚠️ in the log):

```bash
sudo apt install python3-venv fonts-noto-cjk fonts-noto-color-emoji
```

2. **⚠️ Add serial port permissions (dialout group) [required]** (by default, regular users on Linux cannot access `/dev/ttyUSB*` / `/dev/ttyACM*`):

```bash
sudo usermod -a -G dialout $USER
# 注销并重新登录后生效
```

Verify (the output should contain `dialout`):

```bash
groups
```

> If it does not take effect: reboot the computer; on some distributions the group is named `uucp` (Arch) or `tty`.

3. Create a virtual environment, install the dependencies, and launch:

```bash
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **The virtual environment only needs to be created once**. Running `python3 -m venv .venv` again overwrites the original environment (clearing the installed dependencies); afterwards you only need `source .venv/bin/activate` each time.

> If pip reports an externally managed environment error, use `pip install --break-system-packages -r requirements.txt` instead, or use a virtual environment.

4. Identify the USB-to-serial device (after plugging in the adapter):

```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Typical output:

```
/dev/ttyUSB0   # CH340 / CP2102 / PL2303
/dev/ttyACM0   # 原生 USB 串口（Arduino / ESP32 板载）
```

View detailed manufacturer information:

```bash
dmesg | tail -20 | grep -i tty
# 或
lsusb
```

> With multiple devices, `ttyUSB0` / `ttyUSB1` are assigned in plug order and may be unstable. Prefer `/dev/ttyACM*` or pin the name by manufacturer (see the udev subsection below).

To specify the port manually:

```bash
python -m src.gui.factory_calibration_tool --port /dev/ttyUSB0
```

5. Optional: pin the device name with udev (to avoid numbering drift after replugging). Create `/etc/udev/rules.d/99-servo.rules` and pin by USB ID:

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", SYMLINK+="ttyServo"
```

Afterwards, `ls -l /dev/ttyServo` confirms access via the fixed name; look up vendor IDs with `lsusb`.

### macOS

1. Install Python with Homebrew (to avoid the outdated system Python):

```bash
# 安装 Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python
```

Verify:

```bash
python3 --version
```

2. Create a virtual environment, install the dependencies, and launch (activate with `source`, not `.bat`):

```bash
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **The virtual environment only needs to be created once**. Running `python3 -m venv .venv` again overwrites the original environment (clearing the installed dependencies); afterwards you only need `source .venv/bin/activate` each time.

3. **⚠️ Serial port naming**: macOS places USB-to-serial devices under `/dev` with **two naming schemes**:

| Prefix | Meaning | Usable |
| ---- | ---- | -------- |
| `/dev/tty.usbserial-*` | Modem-style (blocking) | May hang; not recommended |
| `/dev/cu.usbserial-*` | Callout/terminal-style (**non-blocking**) | ✅ Recommended |

Check your serial port name:

```bash
ls /dev/cu.*
```

Typical output:

```
/dev/cu.usbserial-0001      # CP2102 / FTDI
/dev/cu.usbmodem141101      # 板载 USB 串口（Arduino / ESP32）
/dev/cu.wchusbserial1420    # CH340
```

> The program automatically prefers `cu.*` devices; when specifying a port manually, use `cu.` rather than `tty.`.

To specify the port manually:

```bash
python -m src.gui.factory_calibration_tool --port /dev/cu.usbserial-0001
```

4. USB drivers: macOS includes drivers for most common chips (CH340, CP2102, FTDI), so they work out of the box. If the device is not recognized:

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**: older batches require the official WCH driver;
- In general, as long as `ls /dev/cu.*` shows the device, you are good to go.

5. Usage tips:
   - **The serial port name can change**: after replugging into different USB ports the `cu.*` name may change; simply select it in the "🔌 Serial Connection" section at each launch.
   - **Power saving**: macOS may sleep and disconnect the serial port; keep the machine awake or extend the sleep timer during operation.
   - **Privacy permission**: on first run, if prompted to access removable volumes, click Allow.

## Usage Steps

### 1. Connect and Detect Servos

1. Connect the servo control board via a USB-to-serial adapter and power the servos.
2. Open the GUI and select the port in the "🔌 Serial Connection" section (or click `🔄` to refresh), then set the baud rate (default 1M).
3. Click **Connect**; the status shows `🟢 Connected`.

> If the port is reported as occupied, make sure no other program (serial monitor, a previously launched tool that did not exit) is using that port.

> If there is only one serial port, the tool automatically sets the second port to "Disabled".

### 2. Scan Servos

1. Click **🔍 Scan Servos** to detect online servos within the ID 1–254 range.
2. The scan results are displayed in real time in the servo list (with model names).
3. Click a row in the servo list to automatically fill it into the "Servo" dropdown.

### 3. Read Parameters

1. After selecting a servo, click **📖 Read Params** to read all 44 registers one by one.
2. The parameter table displays 5 columns (address/register/value/storage area/read-write), with EPROM / SRAM / DEFAULT distinguished by color.
3. The log area shows the read result of each register and the reason for any failure.

For the meaning of each register, see [Potentiometer SCSCL Servo - Memory Table Analysis](./Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis.md).

### 4. Modify Parameters / Write

1. Click the row of the register to modify in the parameter table → the "Write Address", "Length", and "Value" fields are linked automatically.
2. Change the new value in the "Value" input box and click **✏️ Write**.
3. The program performs: unlock EEPROM → write → re-lock.
4. Write result popup: on success, a green "✅ Written successfully" prompt; on failure, a red "❌ Write failed" prompt (including the reason).

### 5. Change the Servo ID

1. Find the "Servo ID" (address 0x05) row in the parameter table and click to select it.
2. Change "Value" to the new ID and click **✏️ Write**.
3. The program performs: unlock → write address 5 → re-lock.

> ⚠️ Before changing the ID, make sure this is the only servo on the bus to avoid ID conflicts.

### 6. Position Control

1. In the "🎯 Position Control" section, **drag the slider** to adjust the target position (0–1023, 10-bit potentiometer resolution); the value box updates in sync. You can also type directly in the value box and the slider follows.
2. Click **▶ Move**; the servo starts moving and the status bar shows "⏳ moving...".
3. When the movement completes, "✅ move complete, please turn off the torque" is shown; click **⏹ Torque OFF**.

### 7. Change Baud Rate / Factory Reset

- **Change baud rate**: in the "🔧 Baud Rate / Factory Reset" section, select a new baud rate (38400 – 1000000 bps) and click **🔧 Change Baud Rate**. After writing, the tool automatically switches the serial port baud rate and verifies with a ping; on failure it rolls back automatically.
- **Factory reset**: click **🔄 Factory Reset**; the servo is restored to factory defaults (ID=1, baud rate=1000000); rescan afterwards.

### 8. xdat Parameter Backup and Restore

In the "📁 xdat Parameters (EEPROM only)" section:

1. **💾 Save Current Servo**: save the EEPROM parameters of the currently selected servo to an xdat file (backup).
2. After modifying servo parameters freely, if you want to restore them:
3. **📂 Open xdat**: load the backup file.
4. **📤 Restore to Servo**: write the backup back to the current servo's EEPROM.

## Notes

1. **Safety first**: writing parameters persists them to EEPROM. Before writing, make sure the power supply is stable and the robotic arm will not collide with people or objects.
2. **Power supply**: DC 5V 5A is recommended for the SoARM 101 Standard version and DC 12V 5A for the Pro version. Insufficient power can cause the servos to lose steps or communication failures.
3. **Exclusive serial port**: on Windows the serial port is exclusively held by the program; the same port cannot be used by two programs at the same time. Do not use this tool while another program (e.g. a serial monitor) has the same port open.
4. **Linux serial port permissions**: accessing `/dev/ttyUSB*` / `/dev/ttyACM*` requires adding your user to the `dialout` group (see the "Linux" section above).
5. **macOS serial port naming**: use `/dev/cu.*` (non-blocking) rather than `/dev/tty.*` (blocking, may hang); see the "macOS" section above.
6. **Hot-plugging**: after unplugging the USB, the program attempts to reconnect automatically; after plugging it back in, click `🔄` to refresh the port list.
7. **Over-temperature / over-voltage protection**: the program monitors voltage and temperature (warning above 60°C). If the servos stay hot, stop and let them cool down.
8. **Parameter writes are irreversible**: once written to EEPROM, the original value is overwritten and cannot be undone. Back up first with "💾 Save Current Servo" before modifying.
9. **ID change risk**: if the write or verification fails, the program reports an error, but in extreme cases the servo may become "lost". If that happens, try Factory Reset (after reset the ID returns to 1).
10. **Encoding issues**: if emoji appear garbled in the Windows console, set `PYTHONIOENCODING=utf-8` before running the command-line tools. Linux / macOS use native UTF-8 and generally do not have this issue.

## Troubleshooting

| Symptom | Possible cause | Solution |
| ---- | -------- | -------- |
| Cannot open serial port / port in use | Occupied by another program | Close programs such as serial monitors, or switch ports and restart the tool |
| Opening the serial port on Windows reports PermissionError | Another process is using that COM port | Make sure no other process is using that COM port |
| No servos found when scanning | Insufficient power / incorrect wiring / baud rate mismatch | Check power and wiring; make sure the servos run at 1M baud rate |
| Reading parameters fails | Serial port in use / servo not responding | Close other programs; reconnect; check that the address is correct |
| Write fails | Insufficient servo power or the target register is not writable | Check the servo power and connection; make sure the target register is writable |
| Rapid temperature rise | Excessive load or stall | Check the mechanism for jamming; reduce speed/acceleration |
| Servo not found after changing its ID | ID conflict or write failure | Perform Factory Reset, then rescan |
| Serial port not found on Windows | Missing driver | Check the driver in Device Manager; try another USB port; install the CH340 driver |
| Serial port not found on Linux | Device not recognized | `ls /dev/ttyUSB* /dev/ttyACM*`; confirm the device with `lsusb` |
| Permission denied: /dev/ttyUSB0 | User not in the dialout group | Run `sudo usermod -a -G dialout $USER` and log in again; or `sudo chmod 666 /dev/ttyUSB0` (temporary) |
| Linux device name changes | Plug order affects ttyUSB numbering | Pin it with a udev rule (see the "Linux" section above) or select the port at each launch |
| Serial port name with `tty.` hangs on macOS | A blocking device name was used | Switch to a `cu.`-prefixed device |
| Device not found on macOS | Device not recognized | `ls /dev/cu.*`; unplug and replug; inspect with `system_profiler SPUSBDataType` |
| macOS permission issues | System access control | Usually no extra permissions are needed; if an access prompt appears, allow the terminal to access |
| Blank Chinese UI | Missing Chinese fonts | Windows uses Microsoft YaHei by default (install a Chinese font if the issue occurs); install `fonts-noto-cjk` on Linux; macOS uses PingFang by default (install Noto Sans CJK if the issue occurs) |
| Emoji shown as squares | Missing emoji font | Install `fonts-noto-color-emoji` |
| pip installation fails | System Python is protected (externally managed environment) | Use a virtual environment; or `pip install --break-system-packages -r requirements.txt` |
| Program fails to start | Missing dependencies or version mismatch | Check the version with `python3 --version`; inspect dependencies with `pip list` |
| macOS virtual environment activation fails | Wrong activation script | Use `source .venv/bin/activate` instead (not `.bat`) |
| macOS Apple Silicon compilation errors | An old Rosetta-based Python is used | Use Python 3.10+ (native Apple Silicon support) |

## Directory Structure

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

This tool repository consists of modules such as `src/gui` (PySide6 graphical interface and FT debugger), `scservo_sdk` (FTServo servo communication SDK), and `setup.py` (environment check script).

<RelatedProducts slugs="feetech-servo" />
