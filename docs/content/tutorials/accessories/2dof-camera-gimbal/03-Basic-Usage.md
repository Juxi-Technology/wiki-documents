---
title: Basic Usage
---

# Basic Usage

> **[Buy in Store](https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit)**

This chapter describes in detail the gimbal's basic control methods and usage workflow to help users get familiar with basic operations.

---

## Control Modes Overview

The gimbal system supports two main control modes:
1. Keyboard control: manually control the gimbal's movement with keyboard keys
2. Automatic tracking: the system automatically detects and tracks the target

---

## Keyboard Control

### Keyboard Shortcuts

The following keyboard shortcuts are available in the main program:

|Key|Function|
|---|---|
|Arrow key ←|Pan the gimbal left|
|Arrow key →|Pan the gimbal right|
|Arrow key ↑|Tilt the gimbal up|
|Arrow key ↓|Tilt the gimbal down|
|C|Connect or disconnect the gimbal|
|R|Return the gimbal to center (initial position)|
|1|Switch to face tracking mode|
|2|Switch to color tracking mode|
|T|Lock / start tracking the target|
|S|Stop tracking|
|X|Color mode: track red objects|
|Y|Color mode: track green objects|
|Z|Color mode: track blue objects|
|Q|Quit the program|


### Standalone Keyboard Control Example

You can also practice with the standalone keyboard control program:

```python
python examples/keyboard_control.py --port COM3
```

This program only provides basic gimbal control functions and is suitable for beginners.

---

## Basic Operation Workflow

### Launching and Connecting

1. Start the main program with the following command:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3
```

1. After the program starts, press `C` to connect the gimbal
2. Check whether the servos respond normally; if anything is wrong, refer to the troubleshooting chapter

### Manual Control Practice

1. Press the arrow keys and check whether the gimbal moves as expected
2. Practice moving the gimbal to different positions with the arrow keys
3. Press `R` to return the gimbal to center
4. Get familiar with the gimbal's minimum and maximum position limits
The following exercises are recommended:
- Exercise 1: Move the gimbal to the four extreme positions (leftmost, rightmost, topmost, bottommost) to get familiar with its position range
- Exercise 2: Return to center from any position and check whether the recentering is smooth
- Exercise 3: Try fine adjustments to get familiar with the servos' movement precision

---

## Basic Example Programs

The project provides several example programs of increasing difficulty for learning:

### Camera Only

```python
python examples/01_camera_only.py --camera 0
```

This program only opens the camera and displays the live feed; it does not involve gimbal control. It is suitable for verifying that the camera works properly.

### Gimbal Only

```python
python examples/02_gimbal_only.py --port COM3
```

This program only provides gimbal control and does not involve the camera. It is suitable for verifying that the servos and driver board are connected properly.

### Camera and Gimbal Combined

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

This program combines camera display with gimbal control, so you can observe how the video feed and the gimbal work together.

---

## Usage Notes

During use, note the following points:
1. After connecting the gimbal, make sure the servo power supply is connected
2. During manual control, avoid leaving the gimbal at extreme positions for extended periods
3. Avoid bumping or knocking the gimbal bracket during operation
4. If the servos jitter abnormally or make unusual noises, cut the power immediately and check
5. If the device will not be used for a long time, disconnect the power supply
