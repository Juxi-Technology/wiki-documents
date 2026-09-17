---
title: USB Auto-Focus Camera
category: compute-vision
description: "Driver-free USB auto-focus camera with an 86° wide-angle lens and 1080P 30FPS UVC output, plug-and-play on Windows, Linux, macOS, Jetson and Raspberry Pi."
keywords: [usb camera, auto-focus, 1080p, uvc, driver-free, robot vision, jetson, raspberry pi]
---

# USB Auto-Focus Camera

> **[Buy on Taobao](https://item.taobao.com/item.htm?id=912105917442)**

## Overview

A plug-and-play HD camera module designed for robot vision, AI inference and computer vision applications. It offers an **86° wide-angle** field of view, auto-focus and **1080P 30FPS** video output over the UVC standard protocol, with no driver installation required.

**Key features:**

- USB driver-free, UVC standard protocol, plug and play
- Compatible with Windows / Linux / macOS / Jetson / Raspberry Pi
- 86° wide-angle lens for a broader field of view
- Auto-focus (AF), no manual adjustment needed
- 1080P 30FPS HD video stream

---

## Specifications

| Parameter | Specification |
|------|------|
| Resolution | 1920 × 1080 (1080P) |
| Frame rate | 30 FPS |
| Field of view | 86° wide angle |
| Focus | Auto-focus (AF) |
| Interface | USB 2.0 |
| Protocol | UVC (USB Video Class) |
| System support | Windows / Linux / macOS / Jetson / Raspberry Pi |

---

## Quick Start

### 1. Connect the camera

Plug the camera into a USB port — no additional drivers are needed.

### 2. Verify the device is detected

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
v4l2-ctl --list-devices
```

A USB camera typically exposes two `video` devices (for example the newly added `/dev/video2` and `/dev/video3`); use the lower-numbered one.

### 3. Read frames with Python

```python
import cv2

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
cap.set(cv2.CAP_PROP_FPS, 30)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('USB Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
```

---

## Tutorials

- [USB Auto-Focus Camera Tutorial — device detection, multi-camera selection and Python examples](/tutorials/accessories/usb-auto-focus-camera)
- [Using an Auto-Focus Camera on Jetson (video devices and GUVCView)](/tutorials/accessories/csi-camera/02-Auto-Focus-Camera)

---

## Applications

- Robot vision and teleoperation video feeds
- AI inference and computer vision projects
- Multi-camera setups on Jetson / Raspberry Pi (alongside CSI cameras)
- Live streaming, screen recording and video capture

---

## FAQ

**Q: The camera is not detected?**

**A:** Make sure the USB cable is firmly connected, try another USB port, and check the USB device list with `lsusb`.

**Q: The image is blurry?**

**A:** The camera auto-focuses; wait 2-3 seconds after connecting. If it is still blurry, check that the lens surface is clean.

**Q: How do I change the resolution?**

**A:** Use `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` and `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`.

---

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Issue tracker](https://github.com/Juxi-Technology/wiki-documents/issues)
