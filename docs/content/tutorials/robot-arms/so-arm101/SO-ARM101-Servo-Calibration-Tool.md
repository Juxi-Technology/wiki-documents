---
title: SoARM Series Servo Calibration Tool Tutorial
description: "An FTServo servo factory calibration and LeRobot calibration toolkit designed for the SoARM 10X series robotic arms, supporting middle calibration, single-servo control, FT debugger parameter read/write, and xdat parameter backup and restore."
---

# SoARM Series Servo Calibration Tool Tutorial

> **[Buy in Store](https://www.juxitech.com/products/so-arm101-developers-kit)**


**The SoARM Series Calibration Tool** is an FTServo servo factory calibration and LeRobot calibration toolkit designed specifically for the SoARM 10X series robotic arms (such as the [SO-ARM101 Developer Kit](/products/so-arm101)). Through the graphical interface you can complete servo middle calibration, single-servo control, parameter read/write, xdat parameter backup/restore, dual-port synchronized remote control and more, and it supports generating LeRobot-format JSON calibration files. For robotic arm assembly and servo installation, refer first to the [Lerobot SO-ARM101 Assembly Tutorial](./SO-ARM101-Assembly.md).

This tool is adapted and upgraded from Seeed Studio's [Seeed_RoboController](https://github.com/Seeed-Studio) project, which was released under the MIT license. While retaining the original core features, this project rebuilds the GUI and adds enhanced features such as the FT debugger, xdat parameter backup/restore, and cross-platform support.

## Compatibility Notice

> ⚠️ **This tool currently supports Feetech (STS3215 series) servos only**. The register table, xdat parameter format, and baud rate table are all designed for the Feetech STS3215 series; compatibility with other brands/models of servos is not guaranteed.

## Features

| Feature | Description |
| ---- | ---- |
| Automatic port detection | Intelligently identifies USB serial ports and automatically filters out virtual devices |
| Cross-platform support | Compatible with Windows / Ubuntu / macOS |
| Dual-port synchronization | The left and right serial ports operate independently; supports leader-follower dual-port synchronized remote control |
| Chinese/English switching | One-click switch between Chinese / English in the UI; the choice is remembered automatically |
| Middle calibration | Burns the servo's current position as the 2048 middle position (persisted to EEPROM) |
| Middle test | Enables torque and moves the servos to the middle position to verify the calibration result |
| Disable motor | One-click release of all servo torque for easy manual adjustment |
| Automatic scanning | Automatically detects all online servos within the ID 1–20 range |
| Single servo control | Slider-based real-time control of a single servo's position and torque switch |
| FT debugger | Serial connection, scanning, parameter read/write, position control, baud rate change, factory reset, xdat parameter backup |
| xdat parameters | Save the current servo's EEPROM parameters / open a backup to restore |
| LeRobot calibration | Generates a LeRobot-format JSON calibration file |
| Run to middle from calibration file | Move the robotic arm to the middle position according to a calibration file |

## Interface Overview

The main program contains three tabs:

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

- **Top bar**: application title, serial port selection dropdowns, refresh button, remote control button, language toggle button.
- **🦾 Tab1 Servo Calibration**: left/right panel shortcut operations (middle calibration, middle test, disable motor) and real-time status.
- **🎚️ Tab2 Single Servo Control**: fine-tune each online servo's position with a slider and toggle its torque.
- **🔬 Tab3 FT Debugger**: serial connection, scanning, parameter read/write (56 registers), position control, baud rate / factory reset, xdat parameter backup and restore.

## Installation and Startup

Environment requirements:

| Dependency | Version | Description |
| ---- | ---- | ---- |
| Python | >= 3.8 | 3.10+ recommended; download from [python.org](https://www.python.org/downloads/) |
| PySide6 | >= 6.0 | GUI framework |
| pyserial | >= 3.5 | Serial communication |
| System | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+ supports Apple Silicon / Intel |

Hardware connection: use a USB-to-serial adapter (such as CH340 / CP2102) to connect the robotic arm control board, and power the servos (DC 5V 5A recommended for the Standard version, DC 12V 5A for the Pro version).

### Windows

1. Install [Python 3.10+](https://www.python.org/downloads/) (be sure to check **Add Python to PATH** during installation, otherwise the command line won't find `python`). Verify the installation:

```bash
python --version
```

2. Create a virtual environment and install the dependencies:

```bash
cd Juxi_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

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

> **Note the COM number** and select it in the top bar after launching; you can also specify the port manually (when the port is occupied):

```bash
python -m src.gui.factory_calibration_tool --port1 COM3 --port2 COM4
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
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

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

To specify ports manually:

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/ttyUSB0 --port2 /dev/ttyUSB1
```

> If there is only one serial port, the tool automatically sets the second port to "disabled".

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
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

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

To specify ports manually:

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/cu.usbserial-0001 --port2 /dev/cu.usbmodem141101
```

4. USB drivers: macOS includes drivers for most common chips (CH340, CP2102, FTDI), so they work out of the box. If the device is not recognized:

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**: older batches require the official WCH driver;
- In general, as long as `ls /dev/cu.*` shows the device, you are good to go.

5. Usage tips:
   - **The serial port name can change**: after replugging into different USB ports the `cu.*` name may change; simply select it from the top bar dropdown at each launch.
   - **Power saving**: macOS may sleep and disconnect the serial port; keep the machine awake or extend the sleep timer during operation.
   - **Privacy permission**: on first run, if prompted to access removable volumes, click Allow.

## Usage Steps

### 1. Connect and Detect Servos

1. Connect the robotic arm control board via a USB-to-serial adapter and power the servos.
2. Open the GUI and select the corresponding port from the serial port dropdown in the top bar (or click `🔄` to refresh).
3. The top of the panel shows `🟢 已连接` and automatically scans for online servos within the ID 1–20 range (usually 1–6).

> If the port is reported as occupied, make sure no other program (serial monitor, a previously launched tool that did not exit) is using that port.

### 2. Middle Calibration (Set the Current Position to 2048)

> Before calibration, physically position the robotic arm so that each joint is at your desired "zero / middle position".

1. Click the **Port X Middle Calibration** button on the panel.
2. The program first disables the servos and prompts you to manually adjust them to the desired middle position.
3. After confirmation, the program performs the following for each servo: unlock EEPROM → write the calibration command (value 128 to address 40) → re-lock EEPROM.
4. Verify with "Middle Test" afterwards: if the servo stays in place (very little movement), the calibration succeeded.

### 3. Middle Test

1. Click **Port X Middle Test**.
2. The program enables torque and moves all servos to 2048.
3. If the servos hardly move from their current position, the calibration is correct; if they move substantially, the calibrated value is unreliable and recalibration is needed.

### 4. Disable Motor (Manual Adjustment)

- Click **Port X Disable Motor** to turn off the torque of all servos on that port, allowing free manual rotation.
- Individual servos can be toggled separately on the **Single Servo Control** page with the torque switch below the slider.

### 5. Single Servo Control (Tab2)

1. On the **🎚️ Single Servo Control** page, each online servo has a position slider and a torque switch.
2. **Drag the slider → on release**, the servo moves to the target position.
3. The torque switch below the slider toggles that servo's torque on / off individually.

### 6. FT Debugger (Parameter Read/Write and Position Control)

On the **🔬 FT Debugger** page:

1. **Serial connection**: choose the port and baud rate (default 1M); after connecting, click **Scan Servos** to detect online servos.
2. **Read parameters**: read all registers (EEPROM + SRAM).
3. **Parameter table**: displays all 56 registers in 5 columns; clicking a row automatically links the "Write Address".
4. **Position control**: set the target position / speed and execute; when the movement completes, the tool prompts you to turn off torque.
5. Baud rate change, factory reset, and xdat parameter backup/restore are covered in the sections below.

### 7. Change the Servo ID

1. Go to the **🔬 FT Debugger** page, connect the serial port, and scan for servos.
2. Select the target servo, change the value of "Servo ID" (address 0x05) in the parameter table, and click Write.
3. The program performs: unlock → write address 5 → verify the new ID → re-lock.

> ⚠️ Before changing the ID, make sure this is the only servo on the bus to avoid ID conflicts.

### 8. Change Baud Rate / Factory Reset

- **Change baud rate**: in the "Baud Rate / Factory Reset" section of the FT Debugger page, select a new baud rate (38400 – 1000000 bps) and apply it. After writing, the tool automatically switches the serial port baud rate and verifies with a ping; on failure it rolls back automatically.
- **Factory reset**: the servo is restored to factory defaults (ID=1, baud rate=1000000); rescan afterwards.

### 9. xdat Parameter Backup and Restore

In the "xdat Parameters (EEPROM only)" section of the FT Debugger page:

1. **💾 Save Current Servo**: save the EEPROM parameters of the currently selected servo to an xdat file (backup).
2. After modifying servo parameters freely, if you want to restore them:
3. **📂 Open xdat**: load the backup file.
4. **📤 Restore to Servo**: write the backup back to the current servo's EEPROM.

### 10. Dual-Port Synchronized Remote Control

> ⚠️ **Direction: Port 1 controls Port 2**. Port 1 (leader) only reads servo angles; Port 2 (follower) is synchronously controlled.

1. Click **🎮 Remote** in the top bar (Port 1 reads angles → Port 2 synchronously controls servos with the same ID).
2. The servo IDs on the two ports must match; only servos in the intersection are synchronized.
3. Click the same button again to stop; afterwards the scan threads of the left/right panels resume automatically.

### 11. LeRobot Calibration (Command Line)

```bash
# 校准从动臂（保存到 ~/.cache/huggingface/lerobot/calibration/robots/so_follower/）
python -m src.tools.lerobot_calibrate --arm-type follower

# 校准领导臂
python -m src.tools.lerobot_calibrate --arm-type leader
```

Workflow: disable the servos → move each joint to the middle position and record `homing_offset` → slowly rotate through the full travel to record `range_min/max` (`wrist_roll` is a continuous rotation joint; its range is fixed at `[0,4095]`) → save the JSON.

Run to the middle position from a calibration file:

```bash
python -m src.tools.run_calibration_middle <校准文件.json> --mode zero
```

For LeRobot environment setup and the data collection workflow, see the [LeRobot Robot Arm Tutorial](./SO-ARM101-Tutorial.md).

## Command-Line Tools

In addition to the graphical interface, the tool provides the following command-line entry points (no GUI required):

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

# LeRobot 风格校准（指定串口，macOS）
python -m src.tools.lerobot_calibrate /dev/cu.usbserial-0001

# 双端口同步遥控
python -m src.tools.servo_remote_control
```

## Notes

1. **Safety first**: middle calibration persists to EEPROM. Before calibrating, make sure the power supply is stable and the robotic arm will not collide with people or objects.
2. **Power supply**: DC 5V 5A is recommended for the SoARM 101 Standard version and DC 12V 5A for the Pro version. Insufficient power can cause the servos to lose steps or communication failures.
3. **Exclusive serial port**: on Windows the serial port is exclusively held by the program; the same port cannot be occupied by both the GUI scan thread and a calibration subprocess at the same time. The tool automatically stops the scan thread and terminates the old process before operating, so do not click repeatedly.
4. **Linux serial port permissions**: accessing `/dev/ttyUSB*` / `/dev/ttyACM*` requires adding your user to the `dialout` group (see the "Linux" section above).
5. **macOS serial port naming**: use `/dev/cu.*` (non-blocking) rather than `/dev/tty.*` (blocking, may hang); see the "macOS" section above.
6. **Hot-plugging**: after unplugging the USB, the program attempts to reconnect automatically; after plugging it back in, click `🔄` to refresh the port list.
7. **Over-temperature / over-voltage protection**: the program monitors voltage and temperature (warning above 60°C). If the servos stay hot, stop and let them cool down.
8. **Middle calibration is irreversible**: once written, the original offset is overwritten and cannot be undone. Record the original position before calibrating.
9. **ID change risk**: if the write or verification fails, the program reports an error and resumes scanning, but in extreme cases the servo may become "lost". If that happens, try Factory Reset (after reset the ID returns to 1).
10. **Encoding issues**: if emoji appear garbled in the Windows console, set `PYTHONIOENCODING=utf-8` before running the command-line tools. Linux / macOS use native UTF-8 and generally do not have this issue.

## Troubleshooting

| Symptom | Possible cause | Solution |
| ---- | -------- | -------- |
| Cannot open serial port / port in use | Occupied by another program | Close programs such as serial monitors, or switch ports and restart the tool |
| Opening the serial port on Windows reports PermissionError | Another process is using that COM port | Make sure no other process is using that COM port |
| No servos found when scanning | Insufficient power / incorrect wiring / baud rate mismatch | Check power and wiring; make sure the servos run at 1M baud rate |
| Servos run erratically after middle calibration | The pose was not set before calibration | Repeat "disable → manually position → middle calibration" |
| Rapid temperature rise | Excessive load or stall | Check the mechanism for jamming; reduce speed/acceleration |
| Servo not found after changing its ID | ID conflict or write failure | Perform Factory Reset, then rescan |
| Remote control out of sync | IDs on the two ports do not match | Make sure servos with the same IDs are online on both leader and follower ports |
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

This tool repository consists of modules such as `src/gui` (PySide6 graphical interface), `src/tools` (command-line tools), `scservo_sdk` (FTServo servo communication SDK), and `setup.py` (environment check script).

<RelatedProducts slugs="so-arm101,servo-driver-board" />
