---
title: "01-GUI Visual Control"
description: "GUI console for the AmazingHand dexterous hand on ESP32 with 8-channel PWM servos: connect over serial, click gesture buttons and tune each servo with sliders."
---

# 01-GUI Visual Control

Visual Gesture Commands — Usage Tutorial

This directory provides a **host-computer control tool**: after connecting the ESP32, use your computer to click buttons / type commands and make the dexterous hand perform gestures.

> Applies to: ESP32-S3 + 8-channel PWM servos (differential drive). For firmware flashing, see the instructions in `..\03_firmware_docs`.

## 1. Two Ways to Use

|Method|Requires|Suitable for|
|---|---|---|
|**Packaged program** (recommended)|Double-click `AmazingHand控制台.exe`|No Python installation, click and use|
|**Running from source**|64-bit Python 3.12|Gesture tracking needed, or customization|

## 2. Method One: Double-click the exe

1. Double-click `AmazingHand控制台.exe`.

2. **Select the serial port**: in the top drop-down box, select the ESP32's COM port (check in Device Manager).

3. Click **"Connect"**: the status light turns green and the log shows "Connected".

4. Click a gesture button: **Rock / Scissors / Paper / Thumbs Up / OK / Pinch / Point / Open / Fist**, and the dexterous hand performs it.

5. **Left/right hand**: check "Right Hand"/"Left Hand" to switch (the thumb mirror direction differs).

6. **Direct servo drive**: drag the 8 sliders to control an individual servo's angle in real time (0-180°).

7. **Finger differential control**: two progress bars for each finger——

    - **Bend◀▶Straighten**: bend or straighten the finger (range -70 ~ +70).

    - **Swing Right◀▶Swing Left**: swing the finger left and right (range 60 ~ 120, 90=neutral).

8. **Repeat / Stop**: repeat the last gesture / interrupt immediately.

## 3. Method Two: Running from Source

### Installing Dependencies

Requires **64-bit Python 3.12** (mediapipe only supports 64-bit).

```Bash
# 1. Install basic dependencies
pip install -r requirements.txt

# 2. Install tracking dependencies (auto-creates a virtual environment when hand tracking is needed)
setup_tracking.bat
```

### Running

```Bash
# Start with the tracking environment (includes mediapipe)
tracking_env\Scripts\python hand_gui.py
```

> Or simply `python hand_gui.py` (any Python with pyserial).

### Built-in Gesture Tracking in the GUI

The GUI includes a built-in **gesture tracking** panel (the camera follows hand movements):

1. After connecting the serial port, scroll to the "Gesture Tracking (MediaPipe Camera)" panel.

2. Select the camera number (default 0) and click **"Start Tracking"**.

3. Put your hand into the camera view, and the dexterous hand follows by bending/straightening.

> Tracking requires `setup_tracking.bat` to install mediapipe. The install-free exe does not include tracking.

## 4. Command-Line Testing (serial_test.py)

```Bash
# Link test (confirm connectivity first)
python serial_test.py COM3 nop

# Gestures
python serial_test.py COM3 rock         # 石头
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 张开
python serial_test.py COM3 close        # 握拳

# Single-servo direct drive
python serial_test.py COM3 servo 1 90   # 舵机1 → 90°

# Center all
python serial_test.py COM3 mid

# Set left/right hand
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# Sweep/self-test
python serial_test.py COM3 sweep 1      # 舵机1 扫频
python serial_test.py COM3 test         # 全部舵机逐个测试
```

## 5. FAQ

|Symptom|Handling|
|---|---|
|Servo does not move|Check the power supply (5V 3A independent power supply), COM port, and wiring|
|exe crashes on launch|Run it from source (the packaged version may lack dependencies)|
|No camera image|Allow camera permission (Settings→Privacy→Camera)|
|Hand shape is reversed|Check the opposite left/right hand|

> For the complete protocol and command reference, see `..\03_firmware_docs\用户手册.md`.

