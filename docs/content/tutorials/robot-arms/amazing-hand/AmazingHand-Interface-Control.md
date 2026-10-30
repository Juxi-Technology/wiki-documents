---
title: "Interface Control Tutorial"
description: "AmazingHand Python GUI / command-line control tool: left/right hand selection, installation, calibration, protocol and common issues."
---

# Interface Control Tutorial

## AmazingHand Python Control Tool (for Left and Right Hands)

A GUI and command-line tool written in Python that controls 8 Feetech SCS0009 servos through a serial-bus servo driver board to drive the [Pollen Robotics AmazingHand](https://github.com/pollen-robotics/AmazingHand) dexterous hand.

> **Both left and right hands are supported.** On startup, choose the right hand (servo IDs 1-8) or the left hand (servo IDs 11-18); --hand skips the prompt. The pose library is shared by both hands, while each hand keeps its own servo mapping, mounting offset and raw-value targets in data/config.yaml. See Left/right hand selection for details.

![Illustration](../../../../public/images/tutorials/robot-arms/amazing-hand/interface-control/01.png)

---

## Project Structure

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

## Requirements

- Python 3.10 or later (the GUI requires Tkinter)
- An independent 5V external power supply for the 8 servos
- A USB serial bus adapter with its driver installed

## Installation

Installing with pip is recommended (reads pyproject.toml):

```bash
pip install -e .
```

Or install the dependencies directly:

```bash
pip install -r requirements.txt
```

Development and test environment:

```bash
pip install -r requirements-dev.txt
```

---

## Calibration

The servo angle system, gesture presets and middle positions all depend on the specific hand. These parameters are all kept in data/config.yaml.

### Left/Right Hand Selection

The two hands use different servos and mechanical structures, so choose before the interface appears:

```text
  AmazingHand — which hand?
    1 = right hand  (servo IDs 1-8)
    2 = left hand   (servo IDs 11-18)
  Enter 1 or 2 [1]:
  LEFT hand — servo IDs 11-18
    Ring (11, 12)  Middle (13, 14)  Pointer (15, 16)  Thumb (17, 18)
    middle position raw: [571, 451, 571, 451, 571, 451, 571, 451]
```

Skip the prompt:

```bash
python amazing_hand_gui.py --hand left
python amazing_hand_cmd.py --pose victory --hand left
```

Without --hand, the hand: value in data/config.yaml is used.

**Why one hand is not just a different set of IDs.** Besides the servo numbering (right hand 1-8, left hand 11-18, and the left hand's finger numbering is mirrored — ring finger first), the left hand has two mechanical differences, both handled automatically by the program:

|  | Right hand | Left hand |
|---|---|---|
| Servo ID | 1-8 | 11-18 |
| Finger → ID | Index 1,2 / Middle 3,4 / Ring 5,6 / Thumb 7,8 | Ring 11,12 / Middle 13,14 / Index 15,16 / Thumb 17,18 |
| Vendor MiddlePos | [451, 571, …] | [571, 451, …] |
| Mounting offset | 0° | **−35.16°**(hands.left.angle_offset) |
| Two servos per finger | (a, b) | **(b, a)**(hands.left.mirror_pose) |

Missing either of the last two items will distort every gesture: without the mounting offset each finger is off by 35°, and without the per-finger swap the spreading direction is completely reversed (the V-sign brings two fingers together, while the three that should stay together spread apart).

data/hand_config.yaml is **shared by both hands** and always stores right-hand order; the left hand is converted when reading and converted back when saving.

**Calibrating a new hand.** Use the values under hands.left as a template, then verify in this order:

1. Press **Middle position** and check whether the Current (0-1023) row reads the expected raw values
1. Press **Open All** / **Close All** — the travel should reach the mechanical limits without stalling
1. Try a spreading gesture (victory forms a V, greeting has three fingers together)

If something is off, here is which parameter to adjust:

| Symptom | What to change |
|---|---|
| Middle position readings are wrong | `hands.<name>.raw_positions.middle` |
| Spreading direction is reversed | `hands.<name>.mirror_pose` |
| Travel is insufficient or excessive | `hands.<name>.raw_positions.open / close` |

### Angle System

The GUI and CLI both use **angle values**, which the rustypot driver converts into the servos' internal raw values:

```text
raw = 1024 × angle / 300° + 511        (0.29297°/step,原始值范围 0–1023)
```

| Angle | Meaning |
|---|---|
| **−35°** | Fully open (straight) |
| **0°** | Middle position, fingers naturally slightly bent |
| **+75°** | Fully closed (fist) |

Even-ID servos are **inverted** relative to odd IDs, so a single pose value makes the two servos of the same finger move in opposite directions. The program handles this automatically; you don't need to convert anything by hand.

### Limits

```text
limits:
  servo_min: -75      # 任何舵机指令的绝对行程上下限
  servo_max: 75
  base_min: -75       # 开合滑块范围
  base_max: 75
  side_min: -35       # 左右滑块范围
  side_max: 35
```

side_min/side_max control **left/right spreading**. Because the program normalizes (u = |side_offset| / |side_min|), **changing only this range does not change the actual spreading amplitude**; it merely compresses the slider scale. To truly change the finger-spreading angle, you must also modify auto_extremes.

### Raw-Value Targets

The three global position buttons drive the servos to **exact raw values**, bypassing the angle model:

```text
raw_positions:              # 下标 0 -> 舵机 ID 1 …… 下标 7 -> 舵机 ID 8
  open:   [260, 760, 260, 760, 260, 760, 260, 760]
  close:  [760, 260, 760, 260, 760, 260, 760, 260]
  middle: [451, 571, 451, 571, 451, 571, 451, 571]
```

- open / close — the two ends of the mechanical travel. Measured by driving the servos individually with the vendor's Feetech debugging tool.
- middle — the **calibrated mechanical middle position** (i.e., MiddlePos in the vendor's Arduino demo program). Note that it is **not** the midpoint between open and close, but deviates from raw 511 by about **±60 raw (±17.6°)**.

> These are **per-hand calibration values**. The vendor's own words: *"replace values by your calibration results"*.

**How to verify:** The Servo Feedback panel has a Current (0-1023) row that shows the raw position in real time. After pressing the **Middle position** button, this row should read 451, 571, 451, 571, ….

### Control Ranges at a Glance

| Control | Range |
|---|---|
| Open/close slider (vertical) | −75 … +75 |
| Left/right slider (horizontal) | −35 … +35 |
| Speed | 1 (slow) … 6 (fast) |

The speed value is passed to the servos by the driver as rad/s, so 1–6 roughly corresponds to **57–344 °/s**. Under load, the actual speed is about **70%** of that value — take this into account when setting sequence delays.

---

## Running the GUI (amazing_hand_gui.py)

After installing with pip, call it directly:

```text
amazing-hand-gui
amazing-hand-gui --port /dev/ttyUSB0
```

Or run it directly:

```bash
python amazing_hand_gui.py
python amazing_hand_gui.py --port /dev/ttyUSB0
```

The port dropdown lists the serial ports **actually present** on the machine (it prefers pyserial, falling back to the Windows registry), so adapters with higher numbers also show up. You can also type a port name directly into the dropdown. If the default port in the configuration is not plugged in, the GUI automatically starts from the first real port; to pin a port, pass --port explicitly.

### Features

- Per-finger sliders control open/close and left/right, with two modes: **Auto** (open/close + left/right) and **Raw** (direct control of the two servo angles)
- Per-finger Open / Close / Center shortcut buttons
- Per-finger speed selection (1–6), plus a global speed sync dropdown
- Keyboard shortcuts for precise fine-tuning
- **Global position buttons**: Open All, Close All, Center All, Middle position
- Gesture and sequence management based on data/hand_config.yaml
- Saved gestures can be deleted directly in the interface (🗑 Delete button)
- Real-time servo telemetry curves (position, load, temperature, voltage)
- Servo Feedback table with real-time **raw positions** (0–1023), usable for calibration verification

### Keyboard Controls

- **1-4**: Select a finger (Ring, Middle, Pointer, Thumb)
- **Arrow keys**: Move the selected finger
  - Up/Down: Close / open
  - Left/Right: Move left/right
- **Modifier keys**:
  - None: 1° per step (fine)
  - Shift: 5° per step (normal)
  - Ctrl: 10° per step (fast)
- **Quick actions**:
  - Q: Fully close the selected finger
  - E: Fully open the selected finger
  - C: Re-center the left/right position

### Global Buttons

| Button | Open/close | Left/right |
|---|---|---|
| ✋ **Open All** | All fingers to raw value open | Re-center |
| ✊ **Close All** | All fingers to raw value close | Re-center |
| ⊙ **Center All** | **Keep unchanged** | Re-center |
| ⊙ **Middle position** | All fingers to raw value middle | Re-center |

The **Global Speed** dropdown (1–6) immediately applies the selected speed to all finger controls and syncs each finger's slider display.

The three raw-value buttons (Open All, Close All, Middle position) bypass the angle model, so **after execution the sliders show the nearest representable value rather than the exact value**. Touching a slider afterwards will move the hand away from the raw target by up to about 0.3° — a deliberate trade-off for hitting the calibrated positions exactly.

> Known issue: Center All does **not** skip fingers in **Raw** mode and will overwrite raw angles you set by hand. The per-finger ⊙ Center button does not.

---

## Running the CLI (amazing_hand_cmd.py)

A standalone command-line tool that applies gestures and plays sequences without starting the GUI. It reads the same data/hand_config.yaml as the GUI and **sends the stored pose values verbatim** — exactly what the GUI sends.

### Linux: Serial Port Permissions

USB serial adapters usually appear as /dev/ttyACM0 (Waveshare / CDC-ACM) or /dev/ttyUSB0 (FTDI / CH340).

How to find them:

```bash
ls /dev/ttyACM* /dev/ttyUSB* 2>/dev/null
# 或者
dmesg | grep -E 'ttyACM|ttyUSB' | tail -5
```

If you get **Permission denied**, add your user to the dialout group and log in again:

```bash
sudo usermod -aG dialout $USER
```

### After pip Installation

```text
amazing-hand-cmd --list
amazing-hand-cmd --pose open
amazing-hand-cmd --sequence demo --loop
amazing-hand-cmd --pose open --speed 6
# 需要时覆盖串口:
amazing-hand-cmd --pose open --port /dev/ttyUSB0
```

### Running Directly

```bash
python amazing_hand_cmd.py --list
python amazing_hand_cmd.py --pose open
python amazing_hand_cmd.py --pose close --speed 6
python amazing_hand_cmd.py --sequence demo
python amazing_hand_cmd.py --sequence wave --loop
python amazing_hand_cmd.py --port /dev/ttyUSB0 --pose open
python amazing_hand_cmd.py --list --config /path/to/hand_config.yaml
```

### Arguments

| Argument | Default | Description |
|---|---|---|
| --pose NAME | – | Apply the gesture with the given name |
| --sequence NAME | – | Play the sequence with the given name |
| --list | – | List all gestures and sequences |
| --loop | Off | Loop the sequence until Ctrl+C |
| --speed N | 3 | Servo speed 1 (slow) … 6 (fast) |
| --port PORT | Linux /dev/ttyACM0<br>Windows COM9 | Serial port name |
| --baudrate N | 1000000 | Baud rate |
| --config PATH | data/hand_config.yaml | Use an alternative configuration file |
| --hand {right,left} | hand in config.yaml | Which hand to use (right 1-8, left 11-18) |

When the script exits (including via Ctrl+C), torque is automatically disabled on all servos.

> The CLI has no --config option for data/config.yaml; that file is always loaded from the project directory.

---

## Configuration Files

### data/config.yaml

| Section | Purpose |
|---|---|
| serial | Default serial port per platform, baud rate, list of selectable baud rates |
| servos | Servo IDs for each finger |
| limits | Angle ranges for the servos and the two sliders |
| speeds | Default/min/max values of the 1–6 speed scale |
| auto_extremes | Servo positions when the left/right slider reaches its limits |
| raw_positions | Exact raw-value targets for the global position buttons |
| paths | Locations of the gesture/sequence files |

### Servo-to-Finger Mapping

| Finger | Servo ID | Pose array index |
|---|---|---|
| Pointer (index) | 1, 2 | 4, 5 |
| Middle | 3, 4 | 2, 3 |
| Ring | 5, 6 | 0, 1 |
| Thumb | 7, 8 | 6, 7 |

**The pose array order is Ring, Middle, Pointer, Thumb — not ordered by servo ID.** This is the easiest thing to get wrong when editing hand_config.yaml by hand.

> The comment at the top of amazing_hand_cmd.py says "index 0→servo1 … 7→servo8", but **that comment is wrong**; the table above reflects what the code actually does.

---

## Gestures and Sequences

All gestures and sequences are stored in data/hand_config.yaml. If the file does not exist, the GUI creates it automatically.

### Saving a Gesture

1. Pose the hand at the target gesture using the sliders or keyboard
1. Enter a name in the "Name:" field
1. Click "➕ Add New" in the Pose Management area

Speed only affects how fast the sliders move; a saved gesture records only the 8 servo positions.

### Loading / Deleting Gestures

- Select from the dropdown and click **✓ Apply** to move the hand to that pose
- Click **🗑 Delete** to the right of Apply; confirm to delete permanently

### Sequence Management

1. Click "🔧 Manage" in the Sequence Player to open the sequence manager
1. **Saved Sequences** (left column)
  - View, execute, edit or delete existing sequences
  - Double-click or click "▶ Execute" to run once

1. **Sequence Builder** (right column)
  - Double-click a gesture in "Available Poses" to add it as a step
  - The speed and delay of the 8 servos can be set individually for each step; steps are saved in the form "pose:s1,s2,...,s8|delay"
  - Use ↑/↓ to reorder, or the "⏱ Delay" button to insert a standalone pause
  - Enter a name and click "💾 Save Sequence" to save; click "▶ Execute" to try it without saving

1. Back in the main window, tick **Loop** in the Sequence Player to play continuously

### Step Format

```text
pose_name:speed1,speed2,...,speed8|delay
```

- speed1..speed8 — the 8 servo speeds (1–6) in pose order
- delay — the wait until the next step, e.g. 0.6s. **Optional**; when omitted, the GUI falls back to a fixed automatic wait
- A standalone pause is written SLEEP:1.0s (no comma-separated speed list)

**Choosing delays.** The driver itself can read when the servos have stopped, but sequence playback uses fixed delays. Estimate roughly as travel angle / (speed × 57.3 × 0.7) seconds, and leave some margin — on a loaded hand, a motion of more than about 130° takes over 1.0 second at speed 3.

### YAML Format Example

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

Loop playback is controlled at runtime (the GUI checkbox) and is no longer written into the YAML.

---

## Testing

The project contains 284 unit/integration/system tests, plus 54 hardware tests.

### Running All Tests (no hardware required)

```text
pytest
```

### Running GUI + CLI Hardware Tests (servos must be connected)

```text
pytest tests/test_system_hardware.py --hardware --port /dev/ttyACM0
pytest tests/test_cmd_hardware.py --hardware --port /dev/ttyACM0
# 或两个一起:
pytest tests/test_system_hardware.py tests/test_cmd_hardware.py --hardware
```

test_system_hardware.py verifies connection, gesture application, telemetry reading, single-finger open/close and waving, speed control, sequence execution and motion detection.

test_cmd_hardware.py end-to-end verifies the CLI layer: pose positions, the speed argument, sequence steps, wait_for_motion, --list output, and disabling torque on exit.

See docs/REQUIREMENTS.md for the complete acceptance criteria.

> Note: the non-hardware tests assert against the **fallback defaults** in hand_logic.py, which still use the original −40…110 scale. At runtime data/config.yaml overrides them, so the tests pass no matter how you calibrate — but that also means **the tests do not verify your current calibration parameters**.

---

## Servo ID Configuration

Tutorial for configuring servo IDs with the official Feetech software and a serial-bus servo driver board: [https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/](https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/)

Feetech software download: [https://github.com/Robot-Maker-SAS/FeetechServo](https://github.com/Robot-Maker-SAS/FeetechServo)

---

## Acknowledgements

Original project: [Betatester777](https://github.com/Betatester777/AmazingHandControl) Hardware and reference firmware: [Pollen Robotics](https://github.com/pollen-robotics/AmazingHand)
