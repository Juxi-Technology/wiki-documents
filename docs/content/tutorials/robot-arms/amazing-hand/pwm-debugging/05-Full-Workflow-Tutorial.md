---
title: "AmazingHand PWM Dexterous Hand — Full Workflow Tutorial"
description: "A full-workflow tutorial for the AmazingHand PWM version: from the ESP32-S3 PWM firmware and host computer gesture commands to GUI / dora gesture tracking."
---

# AmazingHand PWM Dexterous Hand — Full Workflow Tutorial

> **Bundled delivery package:** [delivery_package.zip](/downloads/delivery_package.zip)


> From **host computer gesture commands** to **gesture tracking** — an all-in-one tutorial.
> Applicable hardware: ESP32-S3 + 8-channel PWM servos (differential drive).
>
> Version: 2026-08-20 · Bundled firmware: ESP-IDF component version (`AmazingHand_Serial`)

---

## Chapter 0 Tutorial Navigation

This tutorial is organized **in sequential order**. First figure out which route you want to take, then jump to the corresponding chapter.

| Route | Purpose | Prerequisites | Chapters |
|------|------|----------|------|
| **A. Host computer gesture commands** | Click buttons/type commands to make the robotic hand perform gestures (rock/scissors/paper/thumbs up…) | Python + firmware flashed | Chapters 1-4 |
| **B. GUI built-in gesture tracking** | The camera follows hand movements, and the robotic hand reproduces them in real time (simplified version, no IK) | A + 64-bit Python + mediapipe | Chapters 1-4 + 5.1 |
| **C. dora official IK tracking** | Official full chain: camera→IK→8 joint angles→servos (full version) | A + Rust + uv + dora | Chapters 1-4 + 5.2 |

**Recommended routes**:
- First time using it → take **A**; first confirm that the firmware and wiring are OK.
- Want a quick look at camera following → take **B** (lightweight, installs in a few minutes).
- Need formal, complete tracking → take **C** (official chain, highest precision).

All three routes share the same hardware; only **Route C** requires additionally installing Rust/uv/dora.

---

## Chapter 1 Environment Setup

Install in the following order. **Routes A/B only need Section 1.1; Route C also needs Section 1.2.**

### 1.1 Host Computer Environment (Required for Routes A/B)

#### ① 64-bit Python 3.12

> **Must be 64-bit**. mediapipe 0.10.14 only provides 64-bit Windows wheels and cannot be installed on 32-bit;
> this is also a common cause of the GUI crashing immediately when double-clicked.

- Recommended installation path: `D:\Python312-64bit` (this path already exists on this machine).
- Check **Add to PATH** during installation.
- Verify (64-bit):

```bash
py -3.12-64 -c "import sys; print('64bit' if sys.maxsize > 2**32 else '32bit')"
# 输出: 64bit
```

#### ② Install Host Computer Dependencies

Project root directory (the directory containing `hand_gui.py`):

```bash
pip install -r requirements.txt     # 只需 pyserial
```

#### ③ Tracking Extra Dependencies (for Route B)

Run in the project root directory:

```bash
setup_tracking.bat
```

It will automatically: find 64-bit Python → create the `tracking_env` virtual environment → install `requirements-tracking.txt`
(mediapipe==0.10.14, numpy<2, scipy, opencv, Pillow, pyserial) → verify mediapipe.

> Or install manually:
> ```bash
> D:\Python312-64bit\python.exe -m pip install -r requirements-tracking.txt
> ```

### 1.2 dora Official IK Environment (Required for Route C)

**Customer installation**: double-click `..\02_hand_tracking\Demo\Windows_Scripts_CN\1-安装环境.bat` (English version: `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\1-Install_Env.bat`), which automatically installs all dependencies:
Rust toolchain, uv (Python package manager), dora-cli.

> After installation, **close the terminal and reopen it** once so that PATH takes effect.
> For detailed dependencies (versions, manual installation methods), see the maintenance documentation; customers do not need to deal with them.

---

## Chapter 2 Hardware Wiring

### 2.1 Hardware List

| Hardware | Description |
|------|------|
| ESP32-S3 development board | YX-ESP32-S3 or equivalent |
| 8-channel PWM servos | Analog servos, differential drive |
| Servo adapter board | Servo → 8-channel PWM output |
| Independent 5V power supply | **At least 5V 3A**; servos draw large transient currents |
| USB data cable | ESP32-S3 Type-C → PC |
| Camera | Built-in or USB camera (for tracking) |

### 2.2 GPIO Mapping

Adapter board PWM1-8 → ESP32-S3 GPIO:

| Adapter Board | GPIO | Finger |
|--------|------|------|
| PWM1 | 4 | Index finger joint 1 |
| PWM2 | 5 | Index finger joint 2 |
| PWM3 | 6 | Middle finger joint 1 |
| PWM4 | 7 | Middle finger joint 2 |
| PWM5 | 15 | Ring finger joint 1 |
| PWM6 | 16 | Ring finger joint 2 |
| PWM7 | 17 | Thumb joint 1 |
| PWM8 | 18 | Thumb joint 2 |

> **The left and right hands share the same GPIO set**. The left/right hand is switched in software (Chapter 4); no wiring changes are needed.

### 2.3 Power Supply Requirements

- Use an **independent 5V power supply** for the servos (at least 3A); do not rely only on USB power.
- The instantaneous current surge of the servos may pull the ESP32 into reset (symptom: the ESP32 repeatedly reboots). In this case, **power-cycle** the ESP32.

### 2.4 Wiring Steps

1. 8 servo channels → adapter board PWM1-8
2. Adapter board → the corresponding ESP32-S3 GPIOs (table above)
3. ESP32-S3 Type-C → PC
4. Camera → PC (for tracking)

> For detailed wiring/circuit diagrams, see the `ESP32开发板电路图/` directory.

---

## Chapter 3 Prerequisite: Firmware Flashing

> For the servos to respond, the firmware must be flashed first. The firmware is located in `esp-idf\AmazingHand_Serial\`.

### 3.1 ESP-IDF Version Compilation (Recommended)

Open the `AmazingHand_Serial` project with Espressif IDE:

1. Set the target chip (first time):
   ```
   idf.py set-target esp32s3
   ```
2. Compile:
   ```
   idf.py build
   ```
3. Flash (use a COM port on Windows, e.g. COM3):
   ```
   idf.py -p COM3 flash
   ```

### 3.2 Verification After Flashing

Serial monitor (baud rate **115200**):

```
idf.py -p COM3 monitor
```

You should see the startup log:

```
AmazingHand Serial Control Ready (ESP-IDF)
Protocol: 115200-8N1 [0xAA CMD LEN DATA CKSUM]
```

> The serial baud rate has already been configured uniformly by the firmware/scripts (115200); customers do not need to set it manually.

> Note: Usually the firmware has been flashed before the device is delivered; this step is only performed for new firmware/reflashing.

---

## Chapter 4 Initial Run: Host Computer Gesture Commands

> Prerequisite: firmware flashed (Chapter 3), ESP32 powered on, serial cable connected. First check Device Manager to confirm the COM port.

### 4.1 GUI Visualization (Recommended)

#### Method A: Run the Packaged exe

Double-click `dist/AmazingHand控制台.exe` (**tracking is not included**; tracking requires running from source).

#### Method B: Run from Source

```bash
# 项目根目录,先激活追踪环境(装了 mediapipe)或任意带 pyserial 的 Python
tracking_env\Scripts\python hand_gui.py
```

#### GUI Usage Steps

1. **Select the serial port**: choose the ESP32's COM port from the drop-down box at the top.
2. **Click "Connect"**: the status light turns green, the log shows "Connected", and a NOP link test is sent automatically.
3. **Gesture commands**: click "Rock", "Scissors", "Paper", "Thumbs Up", "OK", "Pinch", "Point", etc., and the robotic hand executes the gesture.
4. **Left/right hand**: check "Right Hand"/"Left Hand" to switch the thumb's mirror direction.
5. **Servo direct drive**: drag the 8 sliders to control individual servo angles in real time (0-180°).
6. **Finger differential control** (recommended): two progress bars per finger — "Bend◀▶Extend" for reverse differential motion, and "Swing Right◀▶Swing Left" for same-direction swing. The two degrees of freedom are independent and driven synchronously.
7. **Repeat/Stop**: repeat the last gesture / immediately interrupt.
8. **Communication log**: displays sent/received frames and responses in real time at the bottom.

### 4.2 Command-Line Testing (serial_test.py)

Project root directory:

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

### 4.3 Verification

- After clicking a gesture, the servos should perform the corresponding action; the serial log returns `ACK` and `DONE`.
- Response codes: `0x00=OK`, `0x01=invalid command`, `0x02=parameter error`, `0x03=busy`, `0x10=done`.
- If the servos do not move at all: see the FAQ in Chapter 6 (check the power supply/serial port first).

> For a complete quick reference of gesture commands and the serial protocol, see Chapter 7.

---

## Chapter 5 Advanced Tutorial: Gesture Tracking

> Prerequisite: Chapters 1-4 are complete (firmware flashed, serial control working, camera ready).
> This chapter has two routes; pick one.

### 5.1 GUI Built-in Tracking (Lightweight Version)

**Suitable for**: quick demonstrations without installing dora. Camera → mapped directly to the differential servos, no IK.

#### Prerequisites

- 64-bit Python + `setup_tracking.bat` (Section 1.1).
- Camera available.

#### Run

```bash
# 项目根目录,用追踪环境启动 GUI
tracking_env\Scripts\python hand_gui.py
```

1. Select the serial port → "Connect".
2. Scroll to the "Gesture Tracking (MediaPipe Camera)" panel.
3. Select the camera number (default 0) → click "Start Tracking".
4. Put your hand into the frame; the robotic hand follows the hand's bending/extending.

#### Principle

- mediapipe 0.10.14 extracts the 3D vectors of the 4 fingertips (in the hand coordinate system).
- `tips_to_angles()` in `hand_tracking.py` maps each finger to differential angles:
  - flex (bend/extend): the three fingers use the z component, while the thumb uses the y component;
  - base (left/right swing): fixed at 90 (left/right swing not yet implemented).
- The GUI has built-in EMA smoothing (alpha=0.4) + 60ms throttling to avoid jitter.

#### Limitations

- **No IK**: fingertips are mapped directly to angles, so precision is lower than the official chain.
- **Left/right swing postponed**: base is fixed at 90; no left/right swinging.
- Suitable for demos/prototypes; for formal use, 5.2 is recommended.

### 5.2 dora Official IK Tracking (Full Version)

**Suitable for**: formal use. Official chain: camera → mediapipe → MuJoCo+mink IK → 8 joint angles → AHControl (Rust) → ESP32 → PWM servos.

#### Prerequisites

- Complete environment (Rust + uv + dora, Section 1.2).
- Firmware flashed (Chapter 3).
- The dataflow yml already has the PWM baud rate (115200) filled in; no manual changes are needed.

#### Step 1: Deploy (One-Click Script Recommended)

Double-click `..\02_hand_tracking\Demo\Windows_Scripts_CN\3-部署代码.bat` (English version: `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\3-Deploy_Demo.bat`); it automatically:
creates the Python environment, compiles AHControl (Rust), and installs AHSimulation/HandTracking (mediapipe).

> The first deployment takes a few minutes. The script already handles environment variables internally; no manual setup is needed.

#### Step 2: Run

Double-click `..\02_hand_tracking\Demo\Windows_Scripts_CN\4-运行代码.bat` (English version: `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\4-Run_Demo.bat`), and select from the menu:

```
1 - 模拟仿真（摄像头手势追踪）
2 - 真实硬件（SCS0009 总线舵机）
3 - PWM 舵机（ESP32 直驱）   ← 选 3
```

Then select the hand type: `1 右手` / `2 左手`. The script automatically runs `dora build` + `dora run`.

- The camera window opens; put your hand into the frame → the 3D simulated fingers follow → the robotic hand follows.
- To stop: Ctrl+C (or close the window).

#### Left/Right Hand Switching

Simply select the hand type in the run menu (Section 5.2, Step 2): choose `1 右手` or `2 左手`.

> After switching, the script automatically rebuilds the corresponding dataflow; just wait for the build to finish before operating in front of the camera again.

#### How to Read the Run Log

In the run window, the AHControl node continuously outputs logs. Focus on this line:

```
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N` (e.g. `sent 300 frames, ESP32 acked 300 frames`) → normal; the ESP32 receives every frame.
- `M = 0` → the ESP32 is not receiving data; check the serial port/power supply (see Chapter 6).

As long as this line keeps growing normally, the servo chain is working; the only remaining question is whether the camera can keep up.

---

## Chapter 6 FAQ (During Operation)

> This section only lists the problems **most likely to be encountered during use and that you can solve yourself**. Locate them quickly by symptom.

### 6.1 Servos Do Not Move at All

Troubleshoot in order:

1. **Power supply**: Are the servos connected to an independent power supply (5V 3A or above)? When powered only by USB, the servos may not move, or the ESP32 may repeatedly reboot. → Power-cycle the ESP32.
2. **Serial port**: Is the correct COM port selected? Device Manager → Ports (COM & LPT) to find the port corresponding to the ESP32. Is another program (such as a serial assistant) occupying it? → Close the occupying program.
3. **Wiring**: Are adapter board PWM1-8 connected to the correct GPIOs? Are the servo signal wires plugged in firmly?

### 6.2 No Camera Image

- The first run on Windows prompts for camera permission → click "Allow".
- If you previously selected "No": Settings → Privacy & security → Camera → Allow desktop apps to access your camera, then run again.

### 6.3 Camera Image Present, but the Hand Does Not Follow / Follows Sluggishly

- Make sure the camera is **facing** the hand, with sufficient light, and the hand fully visible in the frame.
- Move more slowly and with a larger amplitude. If you move too fast or the amplitude is too small, tracking may not keep up.
- Do the fingers move in the 3D simulation window?
  - **Yes**: the tracking chain is working; the problem is with the servos/serial port, see 6.1.
  - **No**: the tracking node has not recognized the hand; adjust the posture/lighting and retry.

### 6.4 Hand Type Reversed / Thumb Direction Reversed

- Is the left/right hand selected incorrectly? Select the corresponding hand type in the run menu.
- In the host computer GUI, check "Right Hand"/"Left Hand" to switch.

### 6.5 Left/Right Hand Switching Does Not Take Effect

- After switching the hand type, `dora` needs to rebuild the dataflow: after you select the hand type in the run menu, `dora build` runs automatically; just wait for it to finish.

### 6.6 The Image Freezes / Logs Stop Mid-Run

- The camera may be occupied by another application (video conference, another script); close it and retry.
- Or press `Ctrl+C` to stop, then run again.

### 6.7 Cannot Find the Serial Port After Changing the USB Port / Restarting the Computer

- The COM port number may have changed. Confirm the new COM number in Device Manager, re-run `2-配置串口.bat` (or `2-Setup_Serial.bat`) to select the port once, then run again.

### 6.8 Still Not Working?

- Send a screenshot of the run terminal logs to the maintainer, and explain: at which step, what operation, and what symptom you saw.
- Key logs: the `[CONFIG]` line at startup, the `[ACK-STATS]` line during operation (whether the M in `ESP32 acked M frames` is close to N).

---

## Chapter 7 Command Quick Reference (Appendix)

> For the complete protocol description, see `用户手册.md` in the same directory. Here is the quick-reference table.

### 7.1 Gesture Commands

| Gesture | HEX | ACK | DONE |
|------|-----|-----|------|
| NOP | `AA 00 00 00` | `BB 00 00 00` | — |
| Rock | `AA 01 00 01` | `BB 01 00 01` | `BB 01 10 11` |
| Scissors | `AA 02 00 02` | `BB 02 00 02` | `BB 02 10 12` |
| Paper | `AA 03 00 03` | `BB 03 00 03` | `BB 03 10 13` |
| Thumbs Up | `AA 04 00 04` | `BB 04 00 04` | `BB 04 10 14` |
| Taunt 1 (wagging the index finger) | `AA 05 00 05` | `BB 05 00 05` | `BB 05 10 15` |
| Taunt 2 (ring finger) | `AA 06 00 06` | `BB 06 00 06` | `BB 06 10 16` |
| Open | `AA 07 00 07` | `BB 07 00 07` | `BB 07 10 17` |
| Close | `AA 08 00 08` | `BB 08 00 08` | `BB 08 10 18` |
| OK | `AA 09 00 09` | `BB 09 00 09` | `BB 09 10 19` |
| Pinch | `AA 0A 00 0A` | `BB 0A 00 0A` | `BB 0A 10 1A` |
| Point | `AA 0C 00 0C` | `BB 0C 00 0C` | `BB 0C 10 1C` |

### 7.2 Control Commands

| Command | HEX | Description |
|------|-----|------|
| Repeat | `AA FE 00 FE` | Repeat the last gesture |
| Stop | `AA FF 00 FF` | Immediately interrupt |
| Set Right Hand | `AA F1 01 01 F1` | — |
| Set Left Hand | `AA F1 01 02 F2` | — |
| Direct Drive | `AA F0 08 [8×角度] CKSUM` | 8-byte angles |

### 7.3 Frame Format

```
帧头(0xAA) + 命令(CMD) + 长度(LEN) + 数据(DATA) + 校验和(CKSUM)
CKSUM = CMD ^ LEN ^ DATA[0] ^ ... ^ DATA[N-1]
响应: 帧头(0xBB) + CMD + STATUS + (CMD^STATUS)
```

### 7.4 Host Computer Tools

| Tool | Command | Purpose |
|------|------|------|
| GUI | `tracking_env\Scripts\python hand_gui.py` | Visual gestures + direct drive + differential + tracking |
| Packaged exe | `dist/AmazingHand控制台.exe` | Visual GUI without installing Python (no tracking) |
| Command line | `python serial_test.py COMx <cmd>` | Automated testing |

### 7.5 Tracking Dataflow Files (PWM Version)

| Purpose | File |
|------|------|
| Left-hand PWM tracking | `dataflow_tracking_real_left_pwm.yml` |
| Right-hand PWM tracking | `dataflow_tracking_real_right_pwm.yml` |
| Left-hand PWM configuration | `AHControl/config/l_hand_pwm.toml` |
| Right-hand PWM configuration | `AHControl/config/r_hand_pwm.toml` |
