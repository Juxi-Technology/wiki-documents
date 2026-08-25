---
title: Jetson CSI 摄像头
description: "钜犀科技 NVIDIA Jetson Orin CSI 摄像头模块使用教程"
---

# Jetson CSI 摄像头

## 产品概述

钜犀科技 CSI 摄像头模块专为 NVIDIA Jetson Orin 开发者套件设计，通过 CSI (Camera Serial Interface) 接口提供低延迟、高带宽的视频传输。适用于 AI 视觉推理、机器人感知和边缘计算场景。

**特性**：
- CSI-2 接口，直连 Jetson Orin 开发板
- 基于 OpenCV 和 GStreamer 的即用示例
- 低延迟视频传输
- 兼容 UVC 协议

## 产品规格

| 参数 | 规格 |
|------|------|
| 接口 | CSI-2 (MIPI) |
| 兼容平台 | NVIDIA Jetson Orin 系列 |
| 视频格式 | RAW / YUV |
| SDK 支持 | JetPack 5.0+ |
| 软件框架 | GStreamer / OpenCV |

## 快速开始

### 硬件连接

1. 关闭 Jetson Orin 电源
2. 将 CSI 排线一端连接摄像头模块
3. 将排线另一端插入 Jetson Orin 开发板的 CSI 接口
4. 确保排线方向正确（金属触点朝向主板）

> ⚠️ **注意**：务必在断电状态下连接 CSI 排线，否则可能损坏硬件。

### 确认设备识别

```bash
# 查看 CSI 摄像头设备
ls /dev/video*

# 使用 v4l2 查看详细信息
v4l2-ctl --list-devices
v4l2-ctl --list-formats-ext -d /dev/video0
```

### Python 代码示例

安装依赖：

```bash
sudo apt install -y python3-opencv
```

使用 GStreamer + OpenCV 捕获 CSI 摄像头：

```python
import cv2

# CSI 摄像头 GStreamer 管道
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
            sensor_id,
            capture_width,
            capture_height,
            framerate,
            flip_method,
            display_width,
            display_height,
        )
    )

cap = cv2.VideoCapture(gstreamer_pipeline(), cv2.CAP_GSTREAMER)

if not cap.isOpened():
    print("无法打开 CSI 摄像头")
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

基础捕获（如果摄像头以 UVC 模式工作）：

```python
import cv2

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

## 常见问题

**Q: 摄像头未被识别？**
首先确认排线连接正确且方向无误。运行 `ls /dev/video*` 检查设备节点。如果仍未识别，尝试重新安装 JetPack。

**Q: GStreamer 管道报错？**
确认 JetPack 版本 ≥ 5.0。运行 `apt list --installed | grep nvarguscamerasrc` 确认相关 GStreamer 插件已安装。

**Q: 如何切换摄像头？**
修改 `sensor-id` 参数：`sensor_id=0` 为第一个摄像头，`sensor_id=1` 为第二个。

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues：[问题反馈](https://github.com/Juxi-Technology/wiki-documents/issues)
