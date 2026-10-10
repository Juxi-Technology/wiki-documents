---
title: Advanced Features and Tracking
---

# Advanced Features and Tracking

> **[Buy in Store](https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit)**

This chapter describes the system's automatic tracking features in detail, including color tracking, face tracking, and QR code tracking, as well as the target lock mechanism and parameter tuning.

---

## Automatic Tracking Modes Overview

The system supports three automatic tracking modes:
1. Color tracking: track objects of a specified color
2. Face tracking: track faces
3. QR code tracking: track QR codes

---

## Color Tracking

### Color Selection

The system supports tracking of several colors:
- Red
- Green
- Blue
You can switch colors with keys in the program:
- `X`: select red
- `Y`: select green
- `Z`: select blue

### Color Tracking Workflow

1. Press `C` to connect the gimbal
2. Press `2` to enter color tracking mode
3. Place the object of the target color in the center of the frame
4. Press `T` to lock the target
5. Move the target and observe the gimbal following it

### Simple Color Tracking Example

You can also use the simple color tracking example program:

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

This program provides the most basic color tracking functionality and is good for learning.

---

## Face Tracking

### How Face Tracking Works

The system uses OpenCV's Haar cascade classifier for face detection. Once a face is detected, the system automatically calculates the target position and controls the gimbal to follow it.

### Face Tracking Workflow

1. Press `C` to connect the gimbal
2. Press `1` to enter face tracking mode
3. Place your face in the center of the frame
4. Press `T` to lock the target
5. Move your face; the gimbal follows automatically

### Tips for Improving Face Detection

- Keep the lighting adequate and avoid backlight
- Face the camera directly
- Keep an appropriate distance (1-3 m recommended)
- Avoid scenes with multiple faces, or use the lock mechanism to keep the tracking target fixed

---

## QR Code Tracking

QR code tracking mode uses OpenCV's QRCodeDetector for QR code recognition and localization. It works in a similar way to the previous two tracking modes:
1. Connect the gimbal and enter QR code tracking mode
2. Place the QR code in the center of the frame and press `T` to lock
3. Move the QR code and observe the gimbal following it

---

## Target Lock Mechanism

### What Locking Does

The target lock mechanism is a key feature of the system. It:
- Records the target's center position and size at the moment of locking
- Prefers the target closest to the lock point when multiple targets appear
- Prevents the target from jumping around frequently, keeping tracking stable

### Locking Workflow

1. Place the target object in the center of the frame
2. Press `T` to lock
3. After a successful lock, the system prioritizes the target most similar to the one locked
4. Press `S` to cancel the lock and stop tracking

### Target Selection Logic After Locking

When selecting a target after locking, the system considers two factors:
- Distance: how close the target center is to the lock point (weight 70%)
- Size: how similar the target's size is to the locked size (weight 30%)
- The system tracks the target with the highest combined score

---

## Tuning Tracking Control Parameters

The following tunable parameters are in `src/trackers/tracking_controller.py`:

|Parameter|Default|Description|
|---|---|---|
|kp_pan|0.08|Proportional gain for pan tracking|
|kp_tilt|0.12|Proportional gain for tilt tracking|
|dead_zone|30|Dead zone (pixels); the gimbal does not move within this range|
|min_move_interval|0.15|Minimum move interval (seconds); limits how often the gimbal moves|


### How to Adjust the Parameters

- **Tracking too slow**: increase `kp_pan` and `kp_tilt`
- **Tracking too sensitive, causing jitter**: decrease `kp_pan` and `kp_tilt`, increase `min_move_interval`, or increase `dead_zone`
- **Frequent small adjustments causing jitter**: increase `dead_zone`
- **Direction reversed**: change the sign of `delta_pan` or `delta_tilt` in the `calculate_move` method

---

## Complete Tracking Example

Here is a complete usage example:
1. Start the program:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

1. Press `C` to connect the gimbal
2. Press `2` to select color tracking mode
3. Place the red object in the center of the frame
4. Press `T` to lock the target
5. Move the object and observe the gimbal following it
6. To switch to green, press `Y` and then press `T` again to lock
7. Press `S` to stop tracking and press `R` to return to center
8. Press `Q` to quit

---

## Advanced Development Tips

If you need custom features or further development, refer to:
- `src/sc_servo.py`: low-level servo communication
- `src/gimbal.py`: gimbal control
- `src/trackers/tracking_controller.py`: tracking controller
- `src/detectors/`: various target detectors
