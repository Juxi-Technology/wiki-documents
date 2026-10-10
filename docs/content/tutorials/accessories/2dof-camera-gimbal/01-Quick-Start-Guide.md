---
title: Quick Start Guide
---

# Quick Start Guide

> **[Buy in Store](https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit)**

> For users whose hardware is already assembled and who want to quickly try out the features

---

## Step 0: Find Available Devices

Before we start, we need to find the correct camera and serial port.

### Find an Available Camera

```python
python examples/list_cameras.py
```

The program lists all available cameras and their indexes; note the index you need (usually 0).

### Find an Available Serial Port

```python
python examples/list_ports.py
```

The program lists all available serial ports — COM3, COM4, etc. on Windows, and /dev/ttyUSB0, etc. on Linux.

---

## Step 1: Install Dependencies

```python
pip install -r requirements.txt
```

---

## Step 2: Run the Step-by-Step Tutorials in Order (Optional but Recommended)

To better understand the system, it is recommended to run these programs in order:
1. **01_camera_only.py** - Show the camera feed only, without connecting the gimbal

```python
python examples/01_camera_only.py --camera 0
```

Purpose: verify that the camera works properly
1. **02_gimbal_only.py** - Control the gimbal only, without connecting the camera

```python
python examples/02_gimbal_only.py --port COM3
```

Purpose: verify that the servos and driver board are connected properly
1. **03_simple_gimbal_camera.py** - Camera and gimbal combined

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

Purpose: control the gimbal manually while viewing the camera feed
1. **04_color_track_simple.py** - Simple color tracking (no locking)

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

Purpose: the most basic automatic tracking demo

---

## Step 3: Run the Full Program

Once you are familiar with the basic features, run the full automatic tracking program:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

---

## Full Program Keyboard Shortcuts


|Key|Function|
|---|---|
|1|Switch to face tracking mode|
|2|Switch to color tracking mode|
|C|Connect the gimbal|
|R|Return the gimbal to center|
|T|Lock / start tracking the target|
|S|Stop tracking|
|X|Color mode: red|
|Y|Color mode: green|
|Z|Color mode: blue|
|Q|Quit the program|


---

## Quick Walkthrough

### Try Color Tracking

1. Press `C` to connect the gimbal
2. Press `2` to enter color tracking mode
3. Move a red object (or another color) to the center of the frame
4. Press `T` to lock the target
5. Move the object and watch the gimbal follow

### Try Face Tracking

1. Press `C` to connect the gimbal
2. Press `1` to enter face tracking mode
3. Place your face in the center of the frame
4. Press `T` to lock the target
5. Move your face and watch the gimbal follow

---

## Quick Answers to Common Questions

Q: The program says it cannot find the serial port?
A: Run `list_ports.py` to see the available serial ports, then specify one with the `--port` parameter.
Q: The camera will not open?
A: Run `list_cameras.py` to see the available cameras, then specify the index with the `--camera` parameter.
Q: The gimbal does not move?
A: Make sure you have pressed `C` to connect the gimbal and that the servo power supply is switched on.
Q: The tracking direction is reversed?
A: See the troubleshooting chapter.
