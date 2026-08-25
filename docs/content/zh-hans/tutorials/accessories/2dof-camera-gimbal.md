---
title: 2 自由度相机云台
description: "钜犀科技 2-DOF 相机云台模块，支持颜色追踪、人脸检测和自动追踪"
---

# 2 自由度相机云台

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**


## 产品概述

钜犀科技 2-DOF 相机云台是一款开源的二自由度摄像头稳定平台，支持 Python 编程控制、颜色追踪、人脸检测和自动目标追踪。适用于机器人视觉、监控和自动化场景。

**特性**：
- 2 自由度（Pitch / Yaw）舵机控制
- 颜色追踪、人脸检测、二维码检测
- 纯 Python 实现，易于二次开发
- 支持 USB 摄像头和串口舵机
- 开源代码：[GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)

## 产品规格

| 参数 | 规格 |
|------|------|
| 自由度 | 2 轴（Pitch 俯仰 + Yaw 偏航） |
| 舵机类型 | 串行总线舵机（SCS 协议） |
| 控制接口 | USB 串口 |
| 摄像头支持 | USB UVC 摄像头 |
| 追踪算法 | 颜色追踪 / 人脸检测 / 二维码检测 |
| 开发语言 | Python 3 |

## 快速开始

### 硬件连接

1. 将舵机连接至串行总线接口
2. USB 转串口模块连接至电脑/Jetson/树莓派
3. 安装摄像头至云台支架
4. 连接 USB 摄像头

### 安装依赖

```bash
pip install -r requirements.txt
# 或手动安装
pip install opencv-python pyserial numpy
```

### 基础控制代码

```python
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from sc_servo import SCServo, Gimbal
import time

# 初始化舵机控制器
servo = SCServo("COM3")  # Linux: "/dev/ttyUSB0"
if servo.connect():
    print("✓ 串口连接成功")

    gimbal = Gimbal(servo)
    gimbal.enable_all()

    # 设置方向 (pitch, yaw)
    gimbal.set_angle(0, 30)   # yaw: -90~90
    time.sleep(1)
    gimbal.set_angle(1, -20)  # pitch: -45~45
    time.sleep(1)

    # 回到中心
    gimbal.set_angle(0, 0)
    gimbal.set_angle(1, 0)

    gimbal.disable_all()
    servo.disconnect()
```

### 颜色追踪示例

```python
import sys
import os
import cv2
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))
from sc_servo import SCServo, Gimbal

# 初始化摄像头和云台
cap = cv2.VideoCapture(0)
servo = SCServo("COM3")
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # 转为 HSV 进行颜色检测
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # 红色范围
    lower_red1 = (0, 100, 100)
    upper_red1 = (10, 255, 255)
    mask = cv2.inRange(hsv, lower_red1, upper_red1)

    # 寻找最大轮廓
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest)
        center_x = x + w // 2
        center_y = y + h // 2

        # 将像素坐标映射到舵机角度
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

## 进阶功能

### 人脸检测追踪

仓库 `src/detectors/face_detector.py` 提供了基于 OpenCV DNN 的人脸检测器，可用于自动追踪人脸。

### 自动追踪

仓库 `examples/auto_tracking_demo.py` 实现了完整的自动追踪流程，包括目标选择、PID 控制和平滑跟踪。

## 常见问题

**Q: 串口无法连接？**
确认端口号正确。Windows 使用 `COMx`，Linux 使用 `/dev/ttyUSBx`。运行 `python examples/list_ports.py` 列出可用端口。

**Q: 舵机不响应？**
检查舵机电源供电是否充足。SCS 舵机需要外部供电（6-8.4V）。

**Q: 追踪不稳定？**
调整 PID 参数和追踪频率。减少帧分辨率可以提升实时性。

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
- 💻 开源仓库：[GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)
