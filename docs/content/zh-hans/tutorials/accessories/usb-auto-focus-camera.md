---
title: USB 自动对焦摄像头
description: "钜犀科技 USB 免驱 86° 广角自动对焦 1080P 摄像头使用教程"
---

# USB 自动对焦摄像头

## 产品概述

钜犀科技 USB 自动对焦摄像头是一款即插即用的高清摄像头模块，适用于机器人视觉、AI 推理和计算机视觉应用。支持 86° 广角视野、自动对焦和 1080P 30FPS 视频输出。

**特性**：
- USB 免驱，兼容 Windows / Linux / macOS / Jetson / 树莓派
- 86° 广角镜头，覆盖更大视野范围
- 自动对焦（AF），无需手动调焦
- 1080P 30FPS 高清视频流
- UVC 标准协议，即插即用

## 产品规格

| 参数 | 规格 |
|------|------|
| 分辨率 | 1920 × 1080 (1080P) |
| 帧率 | 30 FPS |
| 视角 | 86° 广角 |
| 对焦方式 | 自动对焦 (AF) |
| 接口 | USB 2.0 |
| 协议 | UVC (USB Video Class) |
| 系统支持 | Windows / Linux / macOS / Jetson / Raspberry Pi |

## 快速开始

### 连接设备

将摄像头 USB 接口插入设备的 USB 端口即可。无需安装额外驱动。

### 确认设备识别

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
# 应看到 /dev/video0 或 /dev/video1

# 查看详细信息
v4l2-ctl --list-devices
```

### Python 代码示例

安装 OpenCV：

```bash
pip install opencv-python
```

基础图像捕获：

```python
import cv2

# 打开摄像头
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
cap.set(cv2.CAP_PROP_FPS, 30)

if not cap.isOpened():
    print("无法打开摄像头")
    exit()

print(f"分辨率: {cap.get(cv2.CAP_PROP_FRAME_WIDTH)}×{cap.get(cv2.CAP_PROP_FRAME_HEIGHT)}")

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

多摄像头选择：

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

print(f"可用摄像头: {list_cameras()}")

# 选择特定摄像头
camera_index = 1  # 第二个摄像头
cap = cv2.VideoCapture(camera_index)
```

## 在 Jetson 上使用

```bash
# 检查摄像头
v4l2-ctl --list-devices

# 使用 GStreamer 管道获得更好性能
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! autovideosink
```

## 常见问题

**Q: 摄像头无法识别？**

确认 USB 线缆连接牢固。尝试换一个 USB 端口。运行 `lsusb` 查看 USB 设备列表。

**Q: 画面模糊？**

摄像头具备自动对焦功能，首次连接后等待 2-3 秒自动对焦完成。如果仍然模糊，确认镜头表面清洁。

**Q: 如何调整分辨率？**

使用 `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` 和 `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`。

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues：[问题反馈](https://github.com/Juxi-Technology/wiki-documents/issues)
