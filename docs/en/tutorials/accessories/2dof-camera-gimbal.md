---
title: 2-DOF Camera Gimbal
description: Juxi Technology 2-DOF Camera Gimbal module with color tracking, face detection, and auto-tracking
---

# 2-DOF Camera Gimbal

## Overview

The Juxi Technology 2-DOF Camera Gimbal is an open-source two-degree-of-freedom camera stabilization platform that supports Python-based control, color tracking, face detection, and automatic target tracking. It is suitable for robot vision, surveillance, and automation applications.

**Features**:
- 2-DOF (Pitch / Yaw) servo control
- Color tracking, face detection, QR code detection
- Pure Python implementation, easy to customize
- Supports USB camera and serial bus servo
- Open-source code: [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)

## Specifications

| Parameter | Spec |
|-----------|------|
| Degrees of Freedom | 2 axes (Pitch + Yaw) |
| Servo Type | Serial bus servo (SCS protocol) |
| Control Interface | USB Serial |
| Camera Support | USB UVC camera |
| Tracking Algorithms | Color tracking / Face detection / QR code detection |
| Programming Language | Python 3 |

## Quick Start

### Hardware Connection

1. Connect the servo to the serial bus interface
2. Connect the USB-to-serial module to your computer/Jetson/Raspberry Pi
3. Mount the camera onto the gimbal bracket
4. Connect the USB camera

### Install Dependencies

```bash
pip install -r requirements.txt
# Or install manually
pip install opencv-python pyserial numpy
```

### Basic Control Code

```python
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from sc_servo import SCServo, Gimbal
import time

# Initialize servo controller
servo = SCServo("COM3")  # Linux: "/dev/ttyUSB0"
if servo.connect():
    print("✓ Serial connected")

    gimbal = Gimbal(servo)
    gimbal.enable_all()

    # Set angle (pitch, yaw)
    gimbal.set_angle(0, 30)   # yaw: -90~90
    time.sleep(1)
    gimbal.set_angle(1, -20)  # pitch: -45~45
    time.sleep(1)

    # Return to center
    gimbal.set_angle(0, 0)
    gimbal.set_angle(1, 0)

    gimbal.disable_all()
    servo.disconnect()
```

### Color Tracking Example

```python
import sys
import os
import cv2
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))
from sc_servo import SCServo, Gimbal

# Initialize camera and gimbal
cap = cv2.VideoCapture(0)
servo = SCServo("COM3")
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convert to HSV for color detection
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Red color range
    lower_red1 = (0, 100, 100)
    upper_red1 = (10, 255, 255)
    mask = cv2.inRange(hsv, lower_red1, upper_red1)

    # Find the largest contour
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest)
        center_x = x + w // 2
        center_y = y + h // 2

        # Map pixel coordinates to servo angles
        frame_h, frame_w = frame.shape[:2]
        yaw = int((center_x / frame_w - 0.5) * 180)
        pitch = int((0.5 - center_y / frame_h) * 90)
        gimbal.set_angle(0, max(-90, min(90, yaw)))
        gimbal.set_angle(1, max(-45, min(45, pitch)))

        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

    cv2.imshow('Color Tracking', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

gimbal.disable_all()
cap.release()
cv2.destroyAllWindows()
```

## Advanced Features

### Face Detection Tracking

The repository's `src/detectors/face_detector.py` provides an OpenCV DNN-based face detector that can be used for automatic face tracking.

### Auto Tracking

The repository's `examples/auto_tracking_demo.py` implements a complete auto-tracking workflow, including target selection, PID control, and smooth tracking.

## FAQ

**Q: Serial port cannot connect?**
Verify the correct port name. Windows uses `COMx`, Linux uses `/dev/ttyUSBx`. Run `python examples/list_ports.py` to list available ports.

**Q: Servo not responding?**
Check if the servo power supply is sufficient. SCS servos require external power (6-8.4V).

**Q: Tracking is unstable?**
Adjust PID parameters and tracking frequency. Reducing frame resolution can improve real-time performance.

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💻 Open Source Repository: [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)
