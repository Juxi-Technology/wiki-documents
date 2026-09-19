---
title: "03-PWM Servo Version-User Manual"
description: "This firmware runs on an ESP32-S3 development board, and controls 8-channel servos via PWM signals to drive the dexterous hand to perform gestures."
---

# 03-PWM Servo Version-User Manual

## Table of Contents

1. Overview

2. Hardware Wiring

3. Firmware Compilation and Flashing

4. Serial Communication Protocol

5. Command Reference

6. Host Computer Usage Tutorial

7. Gesture Tracking

8. Fine-tuning Gesture Parameters

9. FAQ

---

## 1. Overview

This firmware runs on an **ESP32-S3** development board, and controls 8-channel servos via PWM signals to drive the dexterous hand to perform gestures. The host computer (PC/Raspberry Pi/other MCU) sends binary frame commands over the USB serial port; the ESP32 parses them, performs the corresponding gesture, and returns a response.

The project provides two firmware implementations:

|Firmware|Directory|Features|
|---|---|---|
|**ESP-IDF version** (recommended)|`esp-idf/AmazingHand_Serial/`|Component-based project structure, FreeRTOS dual tasks, production-ready|

> The two firmwares share **the same serial protocol** and **the same command set**, and their gesture parameters can reference each other.

### Supported Gestures (11 gesture commands)

|Gesture|Command|Description|
|---|---|---|
|Rock|0x01|Rock-paper-scissors: all fingers make a fist|
|Scissors|0x02|Rock-paper-scissors: index + middle finger extended in a V shape|
|Paper|0x03|Rock-paper-scissors: all fingers open|
|Thumbs Up|0x04|Thumb raised, the rest in a fist|
|Taunt 1|0x05|Wagging the index finger ("no no no")|
|Taunt 2|0x06|Ring finger extended and waving (replaces the pinky)|
|Open|0x07|All fingers open|
|Close|0x08|All fingers closed|
|OK|0x09|OK gesture|
|Pinch|0x0A|Pinch gesture|
|Point|0x0C|Index finger extended to make a "pointing" motion|
|Direct Drive|0xF0|Directly control the angles of the 8 servos|
|Set Hand Side|0xF1|Switch between left-hand/right-hand mode|
|Repeat|0xFE|Repeat the last gesture|
|Stop|0xFF|Immediately terminate the current gesture|
|NOP|0x00|Link test|

> Note: Command 0x0B is deprecated (the original "thumb down" duplicated the "thumbs up" action and has been removed).

---

## 2. Hardware Wiring

### Applicable Hardware

|Item|Model|
|---|---|
|Main controller|**ESP32-S3** development board (Youxin YX-ESP32-S3 or equivalent)|
|Servos|8-channel PWM analog servos (SG90 or equivalent)|
|Adapter board|PWM servo adapter board|

The ESP32-S3 development board has two Type-C ports:

- **Built-in USB Serial/JTAG**: directly connects to the USB controller built into the ESP32-S3 chip

- **External FT232**: communicates through the FT232 USB-to-serial chip

> Both ports can be used for serial communication; either one is fine. Select the corresponding serial device name on the host computer.

### Servos → Adapter Board

Plug the 3P connectors of the 8 servos into servo pin headers 1-8 on the adapter board according to their ID numbers.

### Adapter Board → ESP32-S3

|Adapter Board|ESP32-S3 GPIO|Description|
|---|---|---|
|PWM1|**4**|Index finger joint 1|
|PWM2|**5**|Index finger joint 2|
|PWM3|**6**|Middle finger joint 1|
|PWM4|**7**|Middle finger joint 2|
|PWM5|**15**|Ring finger joint 1|
|PWM6|**16**|Ring finger joint 2|
|PWM7|**17**|Thumb joint 1|
|PWM8|**18**|Thumb joint 2|
|5V|5V|Power supply (routed out from the adapter board)|
|GND|GND|**Common ground is required; connect at least one**|

> The left and right hands share the same GPIO mapping. When switching to "left hand" mode, the firmware mirrors the thumb's movement direction within the gesture; the pins do not change.

### Power Supply

The adapter board has two sets of 5V/GND power ports:

- One set is routed out via a Type-C cable and connects to a **5V 3A** power adapter

- The other set is routed out to power the **5V** pin of the ESP32-S3 (the development board no longer needs to be powered via Type-C)

---

## 3. Firmware Compilation and Flashing

### 3.1 ESP-IDF Version (Recommended)

> **Warning: Path requirement**: ESP-IDF compilation does not support Chinese paths. Please ensure the project path is entirely in English (including the user folder and parent directories).

#### Project Structure

```Plaintext
esp-idf/AmazingHand_Serial/
├── CMakeLists.txt              # Top-level project configuration
├── sdkconfig.defaults          # Default Kconfig configuration
├── main/
│   ├── CMakeLists.txt
│   └── main.c                  # FreeRTOS dual task + initialization (glue layer)
└── components/
    ├── hand_servo/             # Servo driver (LEDC PWM + calibration data)
    ├── hand_gestures/          # Gesture parameter macros + gesture functions + left/right hand control
    └── hand_protocol/          # Serial frame parsing + command dispatch
```

#### Build Environment

- ESP-IDF **v6.0.1**

- Target chip: **ESP32-S3**

- `idf.py` environment variables configured

#### Compilation and Flashing

```Bash
cd esp-idf/AmazingHand_Serial

# 1. Set the target chip (on first use or when changing chips)
idf.py set-target esp32s3

# 2. Compile
idf.py build

# 3. Flash (Windows: use a COM port, e.g. COM3)
idf.py -p COM3 flash

# 4. Serial monitor (optional, baud rate 115200)
idf.py -p COM3 monitor
```

> After modifying any source code under `components/` or `main/`, simply re-run `idf.py build && idf.py -p COM3 flash`.

### 3.3 Calibration (Optional, Recommended for First Use)

The servo center position and pulse width need to be calibrated according to the actual mechanism. There are two ways:

- **ESP-IDF version**: edit `middle_pos[8]` (line 40) and `min_pw/mid_pw/max_pw[8]` (lines 45-47) in `components/hand_servo/hand_servo.c`

Recompile and flash after calibration.

---

## 4. Serial Communication Protocol

### 4.1 Physical Layer

|Parameter|Value|
|---|---|
|Interface|USB Serial (UART0)|
|Baud rate|**115200**|
|Data bits|8|
|Parity|None (None)|
|Stop bits|1|
|Flow control|None|

### 4.2 Frame Format

#### Host → ESP32 (Command Frame)

```Plaintext
┌────────┬────────┬──────────┬────────────────┬──────────┐
│  0xAA  │ CMD_ID │ DATA_LEN │ DATA[0 .. N-1] │ CHECKSUM │
│ 1 Byte │ 1 Byte │  1 Byte  │    N Bytes     │  1 Byte  │
└────────┴────────┴──────────┴────────────────┴──────────┘
 帧头      命令ID    数据长度      数据负载         校验和
```

- **Frame header**: fixed `0xAA`, marks the start of a frame

- **CMD_ID**: command number (see Command Reference)

- **DATA_LEN**: number of bytes in the data payload (0-8; frames larger than 8 are invalid)

- **DATA**: data payload, whose length is determined by DATA_LEN

- **CHECKSUM**: `CMD_ID ^ DATA_LEN ^ DATA[0] ^ ... ^ DATA[N-1]` (XOR check)

> If DATA_LEN = 0, then CHECKSUM = CMD_ID.

#### ESP32 → Host (Response Frame)

```Plaintext
┌────────┬────────┬────────┬──────────┐
│  0xBB  │ CMD_ID │ STATUS │ CHECKSUM │
│ 1 Byte │ 1 Byte │ 1 Byte │  1 Byte  │
└────────┴────────┴────────┴──────────┘
 帧头      命令ID    状态码    校验和
```

- **Frame header**: fixed `0xBB`

- **CMD_ID**: original command number

- **STATUS**: status code (see the table below)

- **CHECKSUM**: `CMD_ID ^ STATUS`

#### Status Codes

|STATUS|Meaning|Description|
|---|---|---|
|0x00|OK|Command accepted, execution started|
|0x01|Invalid command|CMD_ID is not in the command table|
|0x02|Parameter error|Data length or content is incorrect|
|0x03|Busy|A gesture is being executed, new commands are temporarily not accepted|
|0x10|Complete|Gesture execution finished|

### 4.3 Communication Timing

```Plaintext
主机                          ESP32
 │                              │
 │──── [AA 01 00 01] ────────→│  发送"石头"命令
 │                              │
 │←─── [BB 01 00 01] ─────────│  ACK: 命令已接受
 │                              │
 │                      (执行手势中)
 │                              │
 │←─── [BB 01 10 11] ─────────│  完成: 手势执行完毕
 │                              │
 │──── [AA 02 00 02] ────────→│  发送"剪刀"命令
 │                              │
 │←─── [BB 02 00 02] ─────────│  ACK
 │                              │
```

### 4.4 Stopping Gestures & Frame Timeout

- Sending `[AA FF 00 FF]` can interrupt the gesture currently being executed at any time

- If the ESP32 does not finish receiving a complete frame within 200ms, it automatically discards it (to prevent permanent desynchronization caused by dropped bytes)

- Frames with a mismatched checksum are silently discarded; the host computer should implement timeout-based retransmission

### 4.5 Left/Right Hand Mode

Right-hand mode by default. Send `[AA F1 01 02 F2]` to switch to the left hand, and `[AA F1 01 01 F1]` to switch back to the right hand. The hand side affects the thumb's movement direction (gestures that involve the thumb, such as rock/scissors/thumbs up/OK/pinch).

---

## 5. Command Reference

### 5.1 Gesture Commands (0x01-0x0A, 0x0C)

These commands require no data payload (DATA_LEN=0); the ESP32 immediately performs the corresponding gesture upon receipt.

|Command|HEX Frame|Response|Description|
|---|---|---|---|
|Rock|`AA 01 00 01`|`BB 01 00 01` → `BB 01 10 11`|All fingers make a fist|
|Scissors|`AA 02 00 02`|`BB 02 00 02` → `BB 02 10 12`|Index + middle finger extended|
|Paper|`AA 03 00 03`|`BB 03 00 03` → `BB 03 10 13`|All fingers open|
|Thumbs Up|`AA 04 00 04`|`BB 04 00 04` → `BB 04 10 14`|Thumb raised|
|Taunt 1|`AA 05 00 05`|`BB 05 00 05` → `BB 05 10 15`|Wagging the index finger (about 2.5s)|
|Taunt 2|`AA 06 00 06`|`BB 06 00 06` → `BB 06 10 16`|Waving the ring finger (about 2.5s)|
|Open|`AA 07 00 07`|`BB 07 00 07` → `BB 07 10 17`|All fingers open|
|Close|`AA 08 00 08`|`BB 08 00 08` → `BB 08 10 18`|All fingers closed|
|OK|`AA 09 00 09`|`BB 09 00 09` → `BB 09 10 19`|OK gesture|
|Pinch|`AA 0A 00 0A`|`BB 0A 00 0A` → `BB 0A 10 1A`|Pinch gesture|
|Point|`AA 0C 00 0C`|`BB 0C 00 0C` → `BB 0C 10 1C`|Index finger extended to make a "pointing" motion|

### 5.2 Direct Drive Command (0xF0)

Directly control the angles of the 8 servos; the 8 data bytes correspond to servos 1-8 respectively, and each byte ranges from 0-180.

**Example: center all servos (90°)**

```Plaintext
发送: AA F0 08 5A 5A 5A 5A 5A 5A 5A 5A F8
       │  │  │  └── 8 个 0x5A (90°) ──┘  │
       │  │  │                            └── CHECKSUM
       │  │  └── DATA_LEN = 8
       │  └── CMD_DIRECT_DRIVE
       └── 帧头
```

Checksum = `F0 ^ 08 ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A ^ 5A` = `F8`

> XORing the eight identical 0x5A values in pairs yields 0x00, so finally `0xF0 ^ 0x08 ^ 0x00 = 0xF8`

**Example: index finger extended (servo 1=170°, servo 2=10°), the rest centered (90°)**

```Plaintext
发送: AA F0 08 AA 0A 5A 5A 5A 5A 5A 5A 58
               └─170°  └─10°
```

### 5.3 Set Hand Side (0xF1)

1 byte of data: `0x01` = right hand, `0x02` = left hand.

```Plaintext
设右手: AA F1 01 01 F1
设左手: AA F1 01 02 F2
```

### 5.4 Control Commands

|Command|HEX Frame|Description|
|---|---|---|
|NOP|`AA 00 00 00`|Link test, immediately returns `BB 00 00 00`|
|Repeat|`AA FE 00 FE`|Repeat the last gesture|
|Stop|`AA FF 00 FF`|Immediately terminate the current gesture|

### 5.5 Response Quick Reference

When an invalid command is received (using the non-existent command 0xFC as an example):

```Plaintext
发送: AA FC 00 FC
响应: BB FC 01 FD    （STATUS=0x01 无效命令）
```

> Checksum verification: `FC ^ 00 = FC`, response `FC ^ 01 = FD`

---

## 6. Host Computer Usage Tutorial

The project root provides two host computer tools:

|Tool|File|Type|Purpose|
|---|---|---|---|
|**Graphical interface**|`hand_gui.py` / packaged exe|Visual|Click buttons to perform gestures, sliders for direct drive, logs|
|**Command-line test**|`serial_test.py`|Scripted|Send gestures/single servo/sweep, automated testing|

> Both only depend on `pyserial`. Installation: `pip install -r requirements.txt`

### 6.1 Visual GUI (Recommended)

#### Method A: Run the packaged exe (for customers)

1. Obtain `AmazingHand控制台.exe` (or the extracted directory)

2. **Double-click the exe** to run it directly, with no need to install Python

3. Follow the steps below to connect and use it

#### Method B: Run from source

```Bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run
python hand_gui.py
```

#### GUI Usage Steps

1. **Select the serial port**: choose the COM port corresponding to the ESP32 from the drop-down box at the top (check Windows Device Manager)

2. **Click "Connect"**: the status light turns green, the log area shows "Connected", and a NOP link test is automatically sent

3. **Gesture commands**: click buttons such as "Rock", "Scissors", "Paper", "Thumbs Up", "OK", etc., and the robotic hand performs the corresponding gesture

4. **Left/right hand**: check "Right Hand"/"Left Hand" to switch the thumb's mirror direction

5. **Servo direct drive**: drag the 8 sliders to control individual servo angles in real time (0-180°)

6. **Finger differential control** (recommended): each finger has two progress bars — **Bend/Extend** controls the two servos of that finger in opposite differential motion (bending and extending), and **Swing Right/Swing Left** controls them in same-direction swing. The two degrees of freedom are independent and driven synchronously

7. **Repeat / Stop**: repeat the last gesture / immediately interrupt the current gesture

8. **Communication log**: displays sent/received frames and response status in real time at the bottom

### Finger Differential Control Description

Each finger is **driven differentially by two servos**, with two orthogonal degrees of freedom:

|Progress Bar|Function|Mechanical Effect|
|---|---|---|
|**Bend◀▶Extend**|The two servos rotate in opposite directions (differential)|The finger bends or extends|
|**Swing Right◀▶Swing Left**|The two servos rotate in the same direction|The finger swings left and right|

- **Bend/Extend** slider range -70 ~ +70 (0 = neutral, +70 = fully extended, -70 = fully bent)

- **Left/right swing** slider range 60 ~ 120 (90 = neutral, 60 = swing right, 120 = swing left)

- Servo angle = `swing ± bend`; the two servos are updated **synchronously** and a direct drive command is sent

> Example (index finger GPIO4/5): drag the bend slider to +70 and keep the swing at 90 → servo 4=160°, servo 5=20° (fully extended); drag bend to -70 → servo 4=20°, servo 5=160° (fully bent).

### 6.2 Scripted Testing (serial_test.py)

#### Command-Line Usage

```Bash
# View help
python serial_test.py

# Link test
python serial_test.py COM3 nop

# Send a gesture
python serial_test.py COM3 rock        # Rock
python serial_test.py COM3 thumbs_up    # Thumbs Up
python serial_test.py COM3 index        # Point
python serial_test.py COM3 open         # Open
python serial_test.py COM3 close        # Fist

# Single-servo direct drive
python serial_test.py COM3 servo 1 90   # Servo 1 → 90°

# Center all
python serial_test.py COM3 mid

# Set left/right hand
python serial_test.py COM3 hand L       # Left hand
python serial_test.py COM3 hand R       # Right hand

# Sweep / self-test
python serial_test.py COM3 sweep 1      # Servo 1 sweep
python serial_test.py COM3 test         # Test all servos one by one
```

#### Interactive Mode

```Bash
python serial_test.py COM3
```

Enter the REPL and type abbreviated commands directly (such as `servo 3 180`, `rock`, `mid`, `quit`).

### 6.3 Manual Testing with a Serial Tool (Optional)

**CoolTerm** (macOS/Windows/Linux):

1. Open CoolTerm, `Options` → set the baud rate to 115200, 8N1

2. `Connection` → `Send String` → select `Hex`

3. Enter `AA 01 00 01` → send → the robotic hand performs "rock"

4. Observe that the response area shows `BB 01 00 01 ... BB 01 10 11`

**SerialTool** (macOS):

```Bash
brew install serialtool
echo -ne '\xAA\x01\x00\x01' > /dev/cu.usbserial-0001
```

### 6.4 Python Control Script (Custom Development)

```Python
#!/usr/bin/env python3
"""灵巧手串口控制 - Python 上位机示例"""
import serial
import time

SERIAL_PORT = "/dev/cu.usbserial-0001"  # Change to the actual port
BAUD_RATE   = 115200

# Command definitions (consistent with the firmware command set)
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
    """计算 XOR 校验和 (CMD ^ LEN ^ DATA[0..N])"""
    result = cmd_id ^ len(data)
    for b in data:
        result ^= b
    return result & 0xFF

def send_command(ser, cmd_id, data=b""):
    """发送命令帧，返回 (ack_status, completion_status)"""
    data_len = len(data)
    checksum = calc_checksum(cmd_id, data)
    frame = bytes([0xAA, cmd_id, data_len]) + data + bytes([checksum])
    ser.write(frame)
    print(f"发送: {frame.hex(' ').upper()}")

def read_response(ser, timeout=1.0):
    """读取一个响应帧 [0xBB CMD STATUS CKSUM]"""
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
    """设置左右手: side='R' 右手, side='L' 左手"""
    val = 0x01 if side.upper() == 'R' else 0x02
    send_command(ser, CMD["set_side"], bytes([val]))

def direct_drive(ser, angles):
    """直驱 8 路舵机: angles 为 8 个 0-180 的角度列表"""
    data = bytes([min(180, max(0, a)) for a in angles[:8]])
    send_command(ser, CMD["direct"], data)

# ===== Usage examples =====
if __name__ == "__main__":
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    time.sleep(1)  # Wait for the ESP32 reset to complete

# 1. Link test
    print("=== NOP 链路测试 ===")
    send_command(ser, CMD["nop"])

# 2. Rock-paper-scissors game
    print("\n=== 猜拳: 石头 → 剪刀 → 布 ===")
    for name in ["rock", "scissors", "paper"]:
        send_command(ser, CMD[name])
        time.sleep(0.5)

# 3. Thumbs-up gesture
    print("\n=== 真棒 ===")
    send_command(ser, CMD["thumbs_up"])

# 4. Stop the test
    print("\n=== 停止测试 ===")
    send_command(ser, CMD["taunt1"])  # Start wiggling the index finger
    time.sleep(0.3)
    send_command(ser, CMD["stop"])    # Stop immediately

# 5. Direct drive mode: center all
    print("\n=== 直驱: 归中 ===")
    direct_drive(ser, [90] * 8)

    ser.close()
```

---

## 7. Gesture Tracking

Use **real-time palm recognition via camera** to drive the dexterous hand's finger bending/extending and left/right swinging. Based on the official AmazingHand hand-tracking algorithm (MediaPipe 21-point keypoints + 3D world coordinate rotation).

### 7.1 Principle

- Aim the camera at the palm → MediaPipe recognizes 21 hand keypoints

- Build a local hand coordinate system and compute the 3D vectors of the fingertips of the 4 fingers

- Fingertip vectors → the (flex, base) differential parameters of each finger → sent to the servos by reusing the direct drive protocol

### 7.2 Environment Requirements

Gesture tracking depends on **64-bit Python + mediapipe 0.10.14** (the older solutions API; only it can do 3D world coordinates):

|Dependency|Version|
|---|---|
|Python|64-bit 3.12|
|mediapipe|0.10.14|
|numpy|<2.0|
|scipy|>=1.9|
|opencv-python|>=4.10|
|Pillow|>=10.0|

> **Note**: The current default environment is 32-bit Python, which cannot install mediapipe. You need to separately install 64-bit Python 3.12 (install it to the D drive, e.g. `D:\Python312-64`; it coexists fully with the existing 32-bit installation without conflict).

### 7.3 One-Click Deployment

1. Install 64-bit Python 3.12 (download the 64-bit installer from [python.org](https://www.python.org/downloads/) and install it to `D:\Python312-64`)

2. Double-click **`setup_tracking.bat`** in the project root to run it

    - Automatically locates 64-bit Python

    - Creates the `tracking_env` virtual environment

    - Installs mediapipe 0.10.14 and other dependencies

    - Verifies the installation

### 7.4 Usage Steps

1. Start the GUI with the tracking environment:

```Plaintext
tracking_env\Scripts\python hand_gui.py
```

2. Connect the serial port (select the COM port corresponding to the ESP32)

3. In the "Gesture Tracking" panel, select the camera number (default 0)

4. Click **"Start Tracking"** → the camera image is displayed in the panel

5. Point your palm at the camera:

    - **Bend/extend fingers** → the corresponding fingers of the dexterous hand bend/extend

    - **Flip the palm left/right** → the dexterous hand's fingers swing left/right

6. Click **"Stop Tracking"** to finish

> If no hand is detected, the panel shows "No hand detected"; once detected, it shows "Hand detected: Right/Left".

### 7.5 Parameter Calibration

The mapping coefficients are at the bottom of `hand_tracking.py` (`FLEX_SCALE` / `BASE_SCALE`):

```Python
FLEX_SCALE = 80.0    # Fingertip z component → bend/straighten (flex)
BASE_SCALE = 30.0    # Fingertip x component → left/right swing (base)
```

If the bend/extend range is insufficient or the direction is reversed, adjust `FLEX_SCALE`; if the left/right swing range is insufficient or reversed, adjust `BASE_SCALE` (the sign adjusts the direction).

---

## 8. Fine-tuning Gesture Parameters

### 8.1 Parameter Location

The angle offset of each gesture is defined with a `#define` macro, **no logic code needs to be changed**, only the values.

- **ESP-IDF version**: the "Gesture parameters (user-adjustable)" section at the top of `components/hand_gestures/hand_gestures.c`

### 8.2 Parameter Meaning

```C
// Example: rock gesture
#define ROCK_IDX_OFF1    70    // Index finger joint 1 offset
#define ROCK_IDX_OFF2   -70    // Index finger joint 2 offset
```

- **A positive value = bend and clench**, **a negative value = extend and open**

- Each finger has 2 offsets, relative to `middle_pos` (default 90°)

- Differential structure: the difference between the two servo offsets = extend/contract, the same-direction component = left/right deflection

### 8.3 Tuning Steps

1. Find the `#define` macro for the corresponding gesture

2. Modify the value (increase → larger range; decrease → smaller range)

3. Recompile and flash, then test the result with the host computer

4. Fine-tune repeatedly until the motion looks natural

---

## 9. FAQ

### Q1: The host computer cannot connect to the serial port?

1. Confirm that the ESP32 is connected to the computer via Type-C

2. Check whether the COM port number in Device Manager matches the one selected in the GUI

3. Confirm the baud rate is 115200

4. Disconnect other software that is occupying the serial port

### Q2: No response after sending a command?

1. First send `AA 00 00 00` (NOP); you should receive `BB 00 00 00`

2. Confirm the firmware has been flashed and the target chip is ESP32-S3

3. Check the wiring (whether GND is common)

### Q3: The gesture range is wrong or the direction is reversed?

Go to Fine-tuning Gesture Parameters (see Section 7) and adjust the corresponding macro.

### Q4: Which gestures does left/right hand mode affect?

Gestures that **involve the thumb**, such as rock/scissors/thumbs up/OK/pinch; after switching the hand side, the thumb's direction is mirrored.

### Q5: A finger is stuck and cannot extend?

Before executing any contraction-type gesture, the hand automatically "fully opens the whole hand first, then closes", to prevent fingers from being blocked by the previous gesture. If it is still stuck, check the mechanical assembly or reduce the contraction range.

