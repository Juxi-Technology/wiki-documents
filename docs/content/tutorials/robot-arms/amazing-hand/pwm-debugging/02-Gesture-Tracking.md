---
title: "02-Gesture Tracking Tutorial"
description: "\\# Gesture Tracking — Usage Tutorial (PWM Servo Version)"
---

# 02-Gesture Tracking Tutorial

**\# Gesture Tracking — Usage Tutorial (PWM Servo Version)**

This directory provides **gesture tracking**: the camera recognizes your hand, and the dexterous hand follows in real time (full IK chain).

> Chain: camera → mediapipe hand skeleton → MuJoCo+IK → 8 joint angles → ESP32 → PWM servos

> Applies to: ESP32-S3 + 8-channel PWM servos. For firmware flashing, see `..\03_firmware_docs`.

## 1. Prerequisites

1. **Hardware**: ESP32-S3 + 8-channel PWM servos powered on, USB connected, camera available.

2. **Firmware**: already flashed (see the user manual in `..\03_firmware_docs`).

3. **First-time deployment** (only once, see below).

## 2. First-Time Deployment

### 2.1 Installing the Environment

Go into `Demo\Windows_Scripts_CN\` (use `Windows_Deploy_Scripts\` on an English system), and double-click in numerical order:

```Plaintext
1-安装环境.bat   → 安装 Rust / uv / dora(几分钟)
```

After installing, **close the terminal and open it again** once.

### 2.2 Deploying the Demo

```Plaintext
3-部署代码.bat   → 创建 Python 环境 + 编译 AHControl + 安装依赖(几分钟)
```

## 3. Running Gesture Tracking (Every Time)

### 3.1 Double-click the Run Script

Go into `Demo\Windows_Scripts_CN\` and double-click `4-运行代码.bat`:

```Plaintext
Select a run mode:
   1 - 模拟仿真（摄像头手势追踪）
   2 - 真实硬件（SCS0009 总线舵机）
   3 - PWM 舵机（ESP32 直驱）    ← 选 3
```

Then select the hand type:

```Plaintext
PWM 舵机（ESP32 直驱）- 请选择灵巧手：
   1 - 右手          ← 选 1
   2 - 左手          ← 选 2
```

### 3.2 Getting Started

1. The script automatically runs `dora build` + `dora run`.

2. The camera window opens and the 3D simulated fingers appear.

3. Put your hand into the frame and move your fingers → **the 3D simulation follows → the dexterous hand follows**.

4. To stop: Ctrl+C (or close the window).

> Linux systems: use `Demo\Linux_Scripts_CN\` (Chinese) or `Linux_Deploy_Scripts\` (English); the script names end with `.sh`, and you need to run `bash 脚本名` or add execute permission.

## 4. How to Confirm It Is Running Correctly

In the run window, the AHControl node outputs:

```Plaintext
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N` (e.g. `sent 300 frames, ESP32 acked 300 frames`)→ **normal**, the servo chain is working.

- `M = 0` → the ESP32 is not receiving data; check the serial port/power supply (see below).

As long as this line keeps growing, the servo chain is working normally, and the only remaining question is whether the camera can keep up.

## 5. Switching Between Left and Right Hand

Just select the hand type in the run menu. After switching, the script rebuilds automatically; wait for the build to finish before operating.

## 6. FAQ

|Symptom|Handling|
|---|---|
|The servo does not move at all|Check the power supply (5V 3A), COM port, and wiring; check whether the log's `acked M frames` is 0|
|No camera image|Allow camera permission (Settings→Privacy→Camera)|
|The hand does not follow / is sluggish|Ensure sufficient lighting, keep the whole hand in frame, move more slowly and with a larger range|
|The hand shape is reversed / the thumb direction is reversed|Did you select the correct left/right hand in the menu? Try the other one|
|Cannot find the serial port after changing the USB port|Re-run `2-配置串口.bat` and select the new COM port once|

## 7. For SCS0009 Bus Servo Users

This Demo also supports the official **SCS0009 bus servos**. Select `2 - Real hardware (SCS0009 bus servos)` in the menu; for configuration and instructions, see `Demo\双版本舵机并存说明.md` and the official tutorial.

## Directory Description

|Path|Contents|
|---|---|
|`Demo\AHControl`|Rust servo control program (source code, compiled automatically during deployment)|
|`Demo\AHSimulation`|MuJoCo simulation + IK solving|
|`Demo\HandTracking`|MediaPipe hand tracking|
|`Demo\Windows_Scripts_CN` / `Windows_Deploy_Scripts`|Windows one-click scripts (Chinese/English)|
|`Demo\Linux_Scripts_CN` / `Linux_Deploy_Scripts`|Linux one-click scripts (Chinese/English)|
|`Demo\dataflow_*_pwm.yml`|PWM dataflow (baud rate 115200 already built in)|

