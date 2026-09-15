---
title: USB 自动对焦摄像头
category: compute-vision
description: 钜犀科技 USB 免驱自动对焦摄像头——86° 广角,1080P 30FPS,UVC 免驱,适用于机器人视觉与 AI 推理,兼容 Windows/Linux/macOS/Jetson/树莓派
keywords: [usb 摄像头, 自动对焦, 1080p, uvc, 免驱, 机器人视觉, jetson, 树莓派]
---

# USB 自动对焦摄像头

## 产品概述

USB 自动对焦摄像头是一款即插即用的高清摄像头模块,适用于机器人视觉、AI 推理和计算机视觉应用。支持 **86° 广角视野**、自动对焦和 **1080P 30FPS** 视频输出,采用 UVC 标准协议,无需安装驱动。

**核心特性**:

- USB 免驱,UVC 标准协议即插即用
- 兼容 Windows / Linux / macOS / Jetson / 树莓派
- 86° 广角镜头,覆盖更大视野范围
- 自动对焦(AF),无需手动调焦
- 1080P 30FPS 高清视频流

---

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

---

## 快速开始

### 1. 连接设备

将摄像头 USB 接口插入设备的 USB 端口即可,无需安装额外驱动。

### 2. 确认设备识别

```bash
# Linux / Jetson / 树莓派
ls /dev/video*
v4l2-ctl --list-devices
```

一个 USB 摄像头通常显示两个 `video` 设备(如新增的 `/dev/video2`、`/dev/video3`),调用时选择数字较小的那个。

### 3. Python 读取画面

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

## 完整教程

- [USB 自动对焦摄像头使用教程——设备识别、多摄像头选择与 Python 示例](/zh-hans/tutorials/accessories/usb-auto-focus-camera)
- [Jetson 自动对焦摄像头使用(video 设备与 GUVCView)](/zh-hans/tutorials/accessories/csi-camera/02-Auto-Focus-Camera)

---

## 应用场景

- 机器人视觉与遥操作图传
- AI 推理与计算机视觉项目
- Jetson / 树莓派多摄像头方案(与 CSI 摄像头搭配)
- 直播、录屏与视频采集

---

## 常见问题

**Q: 摄像头无法识别?**

**A:** 确认 USB 线缆连接牢固,尝试更换 USB 端口,并用 `lsusb` 查看 USB 设备列表。

**Q: 画面模糊?**

**A:** 摄像头具备自动对焦功能,首次连接后等待 2-3 秒自动对焦完成;如果仍然模糊,确认镜头表面清洁。

**Q: 如何调整分辨率?**

**A:** 使用 `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` 和 `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)` 设置。

---

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [问题反馈](https://github.com/Juxi-Technology/wiki-documents/issues)
