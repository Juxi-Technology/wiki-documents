---
title: Troubleshooting
---

# Troubleshooting

> **[Buy in Store](https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit)**

This chapter summarizes common problems and solutions to help users quickly diagnose and resolve various issues encountered during use.

---

## Hardware Issues

### Servos Not Responding

**Possible causes:**
1. The servo power supply is not connected
2. Poor connection between the servos and the driver board
3. Serial port connection failed
4. The servos are not enabled
**Solutions:**
1. Check that the servo power supply is connected correctly and powered on
2. Check that the cables between the servos and the driver board are firmly connected
3. Run `examples/diagnostic.py` to view diagnostic information
4. Make sure you have pressed `C` to connect the gimbal and that the servos are enabled

### Servo Movement Direction Is Reversed

**Possible causes:**
- The servo mounting direction or the program's control parameters need adjustment
**Solutions:**
Modify the `calculate_move` method in `src/trackers/tracking_controller.py` and negate the corresponding parameters:

# If pan is reversed

```python
delta_pan = -int(self.kp_pan * err_x)
```

# If tilt is reversed

```python
delta_tilt = -int(self.kp_tilt * err_y)
```

### Servo Jitter

**Possible causes:**
- Tracking parameters are too sensitive
- The dead zone is too small
- The servo load is too heavy or the power supply is insufficient
**Solutions:**
1. Increase the `dead_zone` parameter
2. Increase `min_move_interval`
3. Decrease `kp_pan` and `kp_tilt`
4. Check whether the power supply voltage is normal

### Serial Port Connection Fails

**Possible causes:**
- The driver is not installed
- The serial port name is incorrect
- The serial port is occupied by another program
- The cable is faulty
**Solutions:**
1. On Windows, check Device Manager to confirm the driver is installed correctly
2. Run `examples/list_ports.py` to find the correct serial port
3. Close other programs that may be occupying the serial port
4. Try a different USB port or cable

---

## Software Issues

### Camera Cannot Be Opened

**Possible causes:**
- The camera index is incorrect
- The camera is occupied by another program
- Camera hardware connection problems
- Camera driver problems
**Solutions:**
1. Run `examples/list_cameras.py` to view available camera indexes
2. Close other programs that may be using the camera
3. Check whether the camera is connected properly
4. Try a different USB port

### OpenCV Errors

**Possible causes:**
- OpenCV version issues
- Incomplete installation of dependencies
- Camera hardware problems
**Solutions:**
1. Try reinstalling the dependencies:

```python
pip install --upgrade opencv-python numpy
```

1. Check that the Python version meets the requirement (>=3.8)
2. Read the error stack trace to locate the problematic code

### Dependency Installation Fails

**Possible causes:**
- pip is too old
- Network connection problems
- Permission problems
**Solutions:**
1. Upgrade pip first:

```python
pip install --upgrade pip
```

1. Use a domestic mirror to speed things up:

```python
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

1. Check whether the network connection is working

### Program Starts Slowly

**Possible causes:**
- DSHOW is not used on Windows
- Camera hardware initialization takes time
**Solutions:**
1. Confirm that the code uses `cv2.CAP_DSHOW` as the camera backend
2. Check whether another program is using the camera
3. Wait a few seconds; camera initialization usually takes some time

---

## Tracking Issues

### Inaccurate Target Detection

**For color tracking:**
- Check that the target color contrasts clearly with the background
- Adjust the color parameters (in `src/detectors/color_detector.py`)
- Make sure the lighting is adequate and even
**For face tracking:**
- Ensure adequate lighting and avoid backlight
- The face should be facing the camera directly
- Keep an appropriate distance

### Gimbal Does Not Move During Tracking

**Possible causes:**
1. The gimbal is not connected
2. The target is not locked
3. The target is within the dead zone
4. A program error occurred
**Solutions:**
1. Make sure you have pressed `C` to connect the gimbal
2. Make sure you have pressed `T` to lock the target
3. Check the console output for error messages
4. Check whether the target is within `dead_zone`

### Tracking Direction Is Reversed

**Solutions:**
Refer to the solution for "Servo Movement Direction Is Reversed".

### Tracking Jitter

**Solutions:**
Refer to the solution for "Servo Jitter".

### Target Lock Fails

**Possible causes:**
1. The target is not in the center of the frame when locking
2. The target is too small or its color is not distinct
3. No target is detected
**Solutions:**
1. Make sure the target is in the center of the frame when locking
2. Use an appropriately sized target that can be detected correctly
3. Check the console output to confirm whether the target is detected
4. Adjust the target position and lock again

---

## Using the Diagnostic Tool

### Running the Diagnostic Program

The system provides a comprehensive diagnostic tool that can test the hardware of the entire system:

```python
python examples/diagnostic.py --camera 0 --port COM3
```

The diagnostic program tests the following in sequence:
1. Whether the camera works properly
2. Whether the serial port connects properly
3. Whether the servos respond properly
When the tests are complete, it displays the results to help you locate the problem.

### Viewing Debug Output

While the program runs, the console outputs relevant debug information, including:
- Information about detected targets
- Target coordinates
- Error values
- Gimbal movement commands
- Any error messages
Carefully observing this output helps you locate problems quickly.

---

## Recovery Methods

### Return the Gimbal to a Safe Position

- Press `R` to return the gimbal to center
- Or call `gimbal.return_to_center()`

### Reset All Settings

- Press `S` to stop tracking
- Press `R` to return to center
- Lock the target again

### Recalibration

If tracking performance is seriously poor, you can:
1. Adjust the tracking parameters
2. Lock the target again
3. Restart the program if necessary
4. Check the hardware connections

---

## Getting Help

If the above methods do not solve the problem, please record the following information:
- Operating system information
- Python version
- Detailed error information
- Steps to reproduce the problem
- Results of running diagnostic
