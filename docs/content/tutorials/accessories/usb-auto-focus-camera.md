---
title: USB Auto-Focus Camera
description: "Juxi Technology USB Driver-Free 86° Wide Angle Auto-Focus 1080P Camera Tutorial"
---

# USB Auto-Focus Camera

## Overview

The Juxi Technology USB Auto-Focus Camera is a plug-and-play HD camera module designed for robot vision, AI inference, and computer vision applications. It features an 86° wide-angle lens, auto-focus, and 1080P 30FPS video output.

**Features**:
- USB driver-free, compatible with Windows / Linux / macOS / Jetson / Raspberry Pi
- 86° wide-angle lens for broader field of view
- Auto-focus (AF), no manual adjustment needed
- 1080P 30FPS HD video stream
- UVC standard protocol, plug and play

## Specifications

| Parameter | Spec |
|-----------|------|
| Resolution | 1920 × 1080 (1080P) |
| Frame Rate | 30 FPS |
| Field of View | 86° wide angle |
| Focus | Auto-focus (AF) |
| Interface | USB 2.0 |
| Protocol | UVC (USB Video Class) |
| OS Support | Windows / Linux / macOS / Jetson / Raspberry Pi |

## Quick Start

### Connecting the Device

Plug the camera's USB connector into your device's USB port. No additional drivers are needed.

### Verify Device Detection

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
# You should see /dev/video0 or /dev/video1

# View details
v4l2-ctl --list-devices
```

### Python Code Example

Install OpenCV:

```bash
pip install opencv-python
```

Basic image capture:

```python
import cv2

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
cap.set(cv2.CAP_PROP_FPS, 30)

if not cap.isOpened():
    print("Cannot open camera")
    exit()

print(f"Resolution: {cap.get(cv2.CAP_PROP_FRAME_WIDTH)}×{cap.get(cv2.CAP_PROP_FRAME_HEIGHT)}")

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('USB Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

Multi-camera selection:

```python
import cv2

def list_cameras(max_devices=5):
    available = []
    for i in range(max_devices):
        cap = cv2.VideoCapture(i)
        if cap.isOpened():
            available.append(i)
            cap.release()
    return available

print(f"Available cameras: {list_cameras()}")

camera_index = 1
cap = cv2.VideoCapture(camera_index)
```

## Using on Jetson

```bash
v4l2-ctl --list-devices
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! autovideosink
```

## FAQ

**Q: Camera not detected?**

**A:** Ensure the USB cable is firmly connected. Try a different USB port. Run `lsusb` to check USB device list.

**Q: Blurry image?**

**A:** The camera has auto-focus — wait 2-3 seconds after first connection. If still blurry, clean the lens surface.

**Q: How to change resolution?**

**A:** Use `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` and `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`.

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues: [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)

<RelatedProducts slugs="usb-auto-focus-camera" />
