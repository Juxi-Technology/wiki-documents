---
title: Jetson CSI Camera
description: "Juxi Technology NVIDIA Jetson Orin CSI Camera Module Tutorial"
---

# Jetson CSI Camera

> **[Buy in Store](https://www.juxitech.com/products/79-imx219-csi-camera)**


## Overview

The Juxi Technology CSI Camera Module is designed for the NVIDIA Jetson Orin Developer Kit, delivering low-latency, high-bandwidth video via the CSI (Camera Serial Interface) interface. Ideal for AI vision inference, robot perception, and edge computing.

**Features**:
- CSI-2 interface, direct connection to Jetson Orin
- Ready-to-use OpenCV and GStreamer examples
- Low-latency video transmission
- UVC protocol compatible

## Specifications

| Parameter | Spec |
|-----------|------|
| Interface | CSI-2 (MIPI) |
| Platform | NVIDIA Jetson Orin series |
| Video Format | RAW / YUV |
| SDK | JetPack 5.0+ |
| Framework | GStreamer / OpenCV |

## Quick Start

### Hardware Connection

1. Power off the Jetson Orin
2. Connect one end of the CSI ribbon cable to the camera module
3. Insert the other end into the CSI connector on the Jetson Orin board
4. Ensure correct orientation (metal contacts facing the board)

> ⚠️ **Warning**: Always connect the CSI cable with power OFF to avoid hardware damage.

### Verify Device Detection

```bash
ls /dev/video*
v4l2-ctl --list-devices
v4l2-ctl --list-formats-ext -d /dev/video0
```

### Python Code Example

Install dependencies:

```bash
sudo apt install -y python3-opencv
```

GStreamer + OpenCV CSI capture:

```python
import cv2

def gstreamer_pipeline(
    sensor_id=0,
    capture_width=1920,
    capture_height=1080,
    display_width=960,
    display_height=540,
    framerate=30,
    flip_method=0,
):
    return (
        "nvarguscamerasrc sensor-id=%d ! "
        "video/x-raw(memory:NVMM), "
        "width=(int)%d, height=(int)%d, "
        "format=(string)NV12, framerate=(fraction)%d/1 ! "
        "nvvidconv flip-method=%d ! "
        "video/x-raw, width=(int)%d, height=(int)%d, format=(string)BGRx ! "
        "videoconvert ! "
        "video/x-raw, format=(string)BGR ! appsink"
        % (
            sensor_id, capture_width, capture_height,
            framerate, flip_method, display_width, display_height,
        )
    )

cap = cv2.VideoCapture(gstreamer_pipeline(), cv2.CAP_GSTREAMER)
if not cap.isOpened():
    print("Cannot open CSI camera")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('CSI Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

## FAQ

**Q: Camera not detected?**

**A:** Verify the ribbon cable is correctly connected and oriented. Run `ls /dev/video*`. If still not detected, try re-flashing JetPack.

**Q: GStreamer pipeline errors?**

**A:** Ensure JetPack ≥ 5.0. Run `apt list --installed | grep nvarguscamerasrc` to verify GStreamer plugins.

**Q: How to switch cameras?**

**A:** Change the `sensor-id` parameter: `sensor_id=0` for first camera, `sensor_id=1` for second.

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues: [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
