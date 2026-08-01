# Wiki 内容丰富实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 基于 Juxi-Technology GitHub 组织仓库，补齐 4 个缺失产品教程（三语）+ 为已有教程补充代码示例，参照 Seeed Studio 标准教程结构。

**Architecture:** 每个产品教程遵循 SO-ARM101 模式：概述 → 规格 → 接线 → 代码 → FAQ。新教程放在 `docs/tutorials/accessories/` 和三语对应目录。图片从对应仓库复制。侧边栏在 `config.ts` 中统一注册。

**Tech Stack:** VitePress 1.4, Markdown, Python/Arduino 代码块

---

## 文件结构

| 文件 | 操作 | 职责 |
|------|------|------|
| `docs/tutorials/accessories/usb-auto-focus-camera.md` | 新建 | USB 摄像头教程 (zh-CN) |
| `docs/tutorials/accessories/jetson-csi-camera.md` | 新建 | Jetson CSI 摄像头教程 (zh-CN) |
| `docs/tutorials/accessories/2dof-camera-gimbal.md` | 新建 | 2 自由度云台教程 (zh-CN) |
| `docs/tutorials/accessories/heart-rate-spo2.md` | 新建 | 心率血氧传感器教程 (zh-CN) |
| `docs/en/tutorials/accessories/` (4 文件) | 新建 | 英文教程 |
| `docs/zh-HK/tutorials/accessories/` (4 文件) | 新建 | 繁体教程 |
| `docs/public/images/tutorials/accessories/heart-rate-spo2/` | 新建 | 心率传感器产品图（从仓库复制） |
| `docs/.vitepress/config.ts` | 修改 | 三语侧边栏新增 4 产品入口 |
| 5 篇已有教程 | 修改 | 追加「官方仓库示例」章节 |

---

### Task 1: USB 自动对焦摄像头教程（三语）

**Files:**
- Create: `docs/tutorials/accessories/usb-auto-focus-camera.md`
- Create: `docs/en/tutorials/accessories/usb-auto-focus-camera.md`
- Create: `docs/zh-HK/tutorials/accessories/usb-auto-focus-camera.md`

- [ ] **Step 1: 创建简体中文版**

写入 `docs/tutorials/accessories/usb-auto-focus-camera.md`：

```markdown
---
title: USB 自动对焦摄像头
description: 钜犀科技 USB 免驱 86° 广角自动对焦 1080P 摄像头使用教程
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
```

- [ ] **Step 2: 创建 English 版**

写入 `docs/en/tutorials/accessories/usb-auto-focus-camera.md`（翻译上述内容为英文，保持相同结构）。

- [ ] **Step 3: 创建繁体中文版**

写入 `docs/zh-HK/tutorials/accessories/usb-auto-focus-camera.md`（翻译为繁体中文）。

- [ ] **Step 4: Commit**

```bash
git add docs/tutorials/accessories/usb-auto-focus-camera.md docs/en/tutorials/accessories/usb-auto-focus-camera.md docs/zh-HK/tutorials/accessories/usb-auto-focus-camera.md
git commit -m "docs: 添加 USB 自动对焦摄像头教程（三语）

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 2: Jetson CSI 摄像头教程（三语）

**Files:**
- Create: `docs/tutorials/accessories/jetson-csi-camera.md`
- Create: `docs/en/tutorials/accessories/jetson-csi-camera.md`
- Create: `docs/zh-HK/tutorials/accessories/jetson-csi-camera.md`

- [ ] **Step 1: 创建简体中文版**

写入 `docs/tutorials/accessories/jetson-csi-camera.md`：

```markdown
---
title: Jetson CSI 摄像头
description: 钜犀科技 NVIDIA Jetson Orin CSI 摄像头模块使用教程
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
```

- [ ] **Step 2: 创建 English 版** — `docs/en/tutorials/accessories/jetson-csi-camera.md`

- [ ] **Step 3: 创建繁体中文版** — `docs/zh-HK/tutorials/accessories/jetson-csi-camera.md`

- [ ] **Step 4: Commit**

```bash
git add docs/tutorials/accessories/jetson-csi-camera.md docs/en/tutorials/accessories/jetson-csi-camera.md docs/zh-HK/tutorials/accessories/jetson-csi-camera.md
git commit -m "docs: 添加 Jetson CSI 摄像头教程（三语）

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3: 2 自由度相机云台教程（三语）

**Files:**
- Create: `docs/tutorials/accessories/2dof-camera-gimbal.md`
- Create: `docs/en/tutorials/accessories/2dof-camera-gimbal.md`
- Create: `docs/zh-HK/tutorials/accessories/2dof-camera-gimbal.md`

- [ ] **Step 1: 创建简体中文版**

写入 `docs/tutorials/accessories/2dof-camera-gimbal.md`：

```markdown
---
title: 2 自由度相机云台
description: 钜犀科技 2-DOF 相机云台模块，支持颜色追踪、人脸检测和自动追踪
---

# 2 自由度相机云台

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
```

- [ ] **Step 2: 创建 English 版** — `docs/en/tutorials/accessories/2dof-camera-gimbal.md`

- [ ] **Step 3: 创建繁体中文版** — `docs/zh-HK/tutorials/accessories/2dof-camera-gimbal.md`

- [ ] **Step 4: Commit**

```bash
git add docs/tutorials/accessories/2dof-camera-gimbal.md docs/en/tutorials/accessories/2dof-camera-gimbal.md docs/zh-HK/tutorials/accessories/2dof-camera-gimbal.md
git commit -m "docs: 添加 2 自由度相机云台教程（三语）

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 4: 心率血氧传感器教程（三语）+ 图片复制

**Files:**
- Create: `docs/tutorials/accessories/heart-rate-spo2.md`
- Create: `docs/en/tutorials/accessories/heart-rate-spo2.md`
- Create: `docs/zh-HK/tutorials/accessories/heart-rate-spo2.md`
- Copy: `docs/public/images/tutorials/accessories/heart-rate-spo2/` (11 images from repo)

- [ ] **Step 1: 复制产品图片**

从仓库下载图片到本地 public 目录：

```bash
mkdir -p docs/public/images/tutorials/accessories/heart-rate-spo2
for i in 1 2 3 4 5 6 7 8; do
  curl -sL "https://raw.githubusercontent.com/Juxi-Technology/JUXI_HeartRate_SPO2/main/img/$i.png" -o "docs/public/images/tutorials/accessories/heart-rate-spo2/$i.png"
done
curl -sL "https://raw.githubusercontent.com/Juxi-Technology/JUXI_HeartRate_SPO2/main/img/IIC.png" -o "docs/public/images/tutorials/accessories/heart-rate-spo2/IIC.png"
curl -sL "https://raw.githubusercontent.com/Juxi-Technology/JUXI_HeartRate_SPO2/main/img/UART.png" -o "docs/public/images/tutorials/accessories/heart-rate-spo2/UART.png"
```

- [ ] **Step 2: 创建简体中文版**

写入 `docs/tutorials/accessories/heart-rate-spo2.md`：

```markdown
---
title: 心率血氧传感器
description: 钜犀科技 MAX30102 心率血氧传感器模块 Arduino / Python 使用教程
---

# 心率血氧传感器

## 产品概述

钜犀科技心率血氧传感器基于 MAX30102 芯片，支持 IIC 和 UART 双通信模式，可实时采集心率和血氧饱和度数据。提供 Arduino 库和 Python SDK（树莓派 / Windows / Jetson），附带可视化上位机。

**特性**：
- MAX30102 高精度心率血氧芯片
- IIC 和 UART 双通信模式
- Arduino 库 + Python SDK
- Windows 可视化上位机
- 开源代码：[GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## 产品规格

| 参数 | 规格 |
|------|------|
| 芯片 | MAX30102 |
| 测量参数 | 心率 (HR) / 血氧饱和度 (SpO2) |
| 通信接口 | IIC (0x57) / UART (9600bps) |
| 工作电压 | 3.3V - 5V |
| 开发支持 | Arduino / Python (RPi / Windows / Jetson) |

## 快速开始

### 接线说明

**IIC 接线**：

![IIC 接线图](../../public/images/tutorials/accessories/heart-rate-spo2/IIC.png)

| MAX30102 | Arduino / 树莓派 |
|----------|-----------------|
| VCC | 3.3V / 5V |
| GND | GND |
| SCL | SCL (I2C Clock) |
| SDA | SDA (I2C Data) |

**UART 接线**：

![UART 接线图](../../public/images/tutorials/accessories/heart-rate-spo2/UART.png)

| MAX30102 | Arduino UNO |
|----------|------------|
| VCC | VCC |
| GND | GND |
| TX | Pin 4 |
| RX | Pin 5 |

### Arduino 代码示例

安装库：将仓库 `src/` 中的 `JUXI_HeartRate_SPO2.h` 和 `.cpp` 文件复制到 Arduino libraries 目录。

```cpp
#include "JUXI_HeartRate_SPO2.h"

#define I2C_COMMUNICATION
#define I2C_ADDRESS  0x57
JUXI_HeartRate_SPO2_I2C MAX30102(&Wire, I2C_ADDRESS);

void setup() {
  Serial.begin(9600);
  while (!MAX30102.begin()) {
    Serial.println("init fail!");
    delay(1000);
  }
  Serial.println("start measuring...");
}

void loop() {
  MAX30102.sensor_read_data();
  int heartRate = MAX30102.sensor_get_heartRate();
  int spo2 = MAX30102.sensor_get_spo2();

  if (heartRate > 0 && spo2 > 0) {
    Serial.print("Heart Rate: ");
    Serial.print(heartRate);
    Serial.print(" bpm, SpO2: ");
    Serial.print(spo2);
    Serial.println(" %");
  }
  delay(100);
}
```

### Python 代码示例（树莓派 / Jetson）

```python
import sys
import os
sys.path.append(os.path.dirname(os.path.realpath(__file__)))
from JUXI_HeartRate_SPO2 import *

# 选择通信模式：ctype=0 为 IIC，ctype=1 为 UART
ctype = 1

if ctype == 0:
    I2C_1 = 0x01
    I2C_ADDRESS = 0x57
    max30102 = JUXI_HeartRate_SPO2_i2c(I2C_1, I2C_ADDRESS)
else:
    max30102 = JUXI_HeartRate_SPO2_uart(9600)

def setup():
    while not max30102.begin():
        print("init fail!")
        time.sleep(1)
    print("start measuring...")
    max30102.sensor_start_collect()
    time.sleep(1)

def loop():
    max30102.sensor_read_data()
    hr = max30102.sensor_get_heartRate()
    spo2 = max30102.sensor_get_spo2()
    if hr > 0 and spo2 > 0:
        print(f"Heart Rate: {hr} bpm, SpO2: {spo2}%")
    time.sleep(0.1)

if __name__ == "__main__":
    setup()
    try:
        while True:
            loop()
    except KeyboardInterrupt:
        print("程序结束")
```

## 上位机

钜犀科技提供 Windows 可视化上位机，可实时显示心率和血氧波形：

- 仓库路径：`HeartRateOximeter/上位机源代码/HeartRateOximeter.py`
- 下载：[GitHub Releases](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## 常见问题

**Q: 初始化失败（init fail）？**
确认接线正确，IIC 模式下检查设备地址（默认 0x57）。UART 模式下确认波特率为 9600。

**Q: 数据读数不稳定？**
确保传感器与皮肤接触良好。手指应平稳放置在传感器上，避免移动。

**Q: 如何在 Windows 上使用？**
参考仓库 `python/windows/` 目录下的示例代码和说明文档。

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
- 💻 开源仓库：[GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)
```

- [ ] **Step 3: 创建 English 版** — `docs/en/tutorials/accessories/heart-rate-spo2.md`

- [ ] **Step 4: 创建繁体中文版** — `docs/zh-HK/tutorials/accessories/heart-rate-spo2.md`

- [ ] **Step 5: Commit**

```bash
git add docs/tutorials/accessories/heart-rate-spo2.md docs/en/tutorials/accessories/heart-rate-spo2.md docs/zh-HK/tutorials/accessories/heart-rate-spo2.md docs/public/images/tutorials/accessories/heart-rate-spo2/
git commit -m "docs: 添加心率血氧传感器教程（三语）+ 产品图片

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 5: 更新侧边栏（三语）

**Files:**
- Modify: `docs/.vitepress/config.ts`

- [ ] **Step 1: 在 sidebar accessories 分组添加 4 个新产品**

读取 `config.ts`，找到三语侧边栏中 `/tutorials/accessories/` 的 accessories 分组。

在 **zh-CN** accessories 分组（约 line 84-119）的独立配件列表中添加 4 条：

```typescript
{ text: 'USB自动对焦摄像头-教程', link: '/tutorials/accessories/usb-auto-focus-camera' },
{ text: 'Jetson CSI摄像头-教程', link: '/tutorials/accessories/jetson-csi-camera' },
{ text: '2自由度相机云台-教程', link: '/tutorials/accessories/2dof-camera-gimbal' },
{ text: '心率血氧传感器-教程', link: '/tutorials/accessories/heart-rate-spo2' },
```

在 **en** accessories 分组中：

```typescript
{ text: 'USB Auto-Focus Camera Tutorial', link: '/en/tutorials/accessories/usb-auto-focus-camera' },
{ text: 'Jetson CSI Camera Tutorial', link: '/en/tutorials/accessories/jetson-csi-camera' },
{ text: '2-DOF Camera Gimbal Tutorial', link: '/en/tutorials/accessories/2dof-camera-gimbal' },
{ text: 'Heart Rate SpO2 Sensor Tutorial', link: '/en/tutorials/accessories/heart-rate-spo2' },
```

在 **zh-HK** accessories 分组中：

```typescript
{ text: 'USB自動對焦攝像頭-教程', link: '/zh-HK/tutorials/accessories/usb-auto-focus-camera' },
{ text: 'Jetson CSI攝像頭-教程', link: '/zh-HK/tutorials/accessories/jetson-csi-camera' },
{ text: '2自由度相機雲台-教程', link: '/zh-HK/tutorials/accessories/2dof-camera-gimbal' },
{ text: '心率血氧傳感器-教程', link: '/zh-HK/tutorials/accessories/heart-rate-spo2' },
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/config.ts
git commit -m "feat: 侧边栏新增 4 个产品教程入口（三语）

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 6: 已有教程补充仓库代码示例

**Files:**
- Modify: `docs/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control.md`
- Modify: `docs/tutorials/accessories/KWS-speech-recognition-module/index.md`
- Modify: `docs/tutorials/accessories/0.91-oled-screen-tutorial.md`
- Modify: `docs/tutorials/sensors/imu/index.md`
- Modify: `docs/tutorials/accessories/usb-audio-card-tutorial.md`

- [ ] **Step 1: AmazingHand — 追加仓库控制代码示例**

Read `docs/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control.md`，在末尾追加：

```markdown

---

## 官方仓库示例

钜犀科技为 AmazingHand 灵巧手提供开源控制代码：[GitHub](https://github.com/Juxi-Technology/AmazingHand)

### 基础控制

仓库包含完整的 Python 控制示例，支持 TTL 通信协议。克隆仓库后运行：

```bash
git clone https://github.com/Juxi-Technology/AmazingHand.git
cd AmazingHand
pip install -r requirements.txt
python examples/basic_control.py
```

### TTL 通信协议

灵巧手通过 TTL 串行总线与主控通信，协议详情请参阅仓库 README 和源码。
```

- [ ] **Step 2: KWS 语音识别 — 追加仓库代码示例**

Read `docs/tutorials/accessories/KWS-speech-recognition-module/index.md`，在末尾追加：

```markdown

---

## 官方仓库示例

钜犀科技为 KWS 语音识别模块提供开源代码：[GitHub](https://github.com/Juxi-Technology/Sound-card-for-KWS-speech-recognition-module)

### Python 串口通信

仓库中的 Python 示例演示了如何通过串口与 KWS 模块通信，获取唤醒词识别结果：

```python
# 参考仓库 python/ 目录
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"识别结果: {data}")
```
```

- [ ] **Step 3: OLED 屏幕 — 追加仓库驱动代码**

Read `docs/tutorials/accessories/0.91-oled-screen-tutorial.md`，在末尾追加：

```markdown

---

## 官方仓库示例

钜犀科技为 OLED 屏幕提供开源驱动代码：[GitHub](https://github.com/Juxi-Technology/OLED-Secondary-Display-RaspberryPi-Jetson)

### I2C 驱动示例

```bash
sudo apt install -y python3-pip
sudo pip3 install smbus Adafruit_SSD1306
```

```python
import Adafruit_SSD1306
from PIL import Image, ImageDraw, ImageFont

# 初始化 OLED (128x32)
disp = Adafruit_SSD1306.SSD1306_128_32(rst=None)
disp.begin()
disp.clear()
disp.display()

# 绘制文字
image = Image.new('1', (disp.width, disp.height))
draw = ImageDraw.Draw(image)
draw.text((0, 0), 'Hello Juxi!', font=ImageFont.load_default(), fill=255)
disp.image(image)
disp.display()
```
```

- [ ] **Step 4: IMU 模块 — 追加仓库 ROS 代码示例**

Read `docs/tutorials/sensors/imu/index.md`，在末尾追加：

```markdown

---

## 官方仓库示例

钜犀科技为 IMU 惯导模块提供完整的开源代码：[GitHub](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

### ROS1 / ROS2 示例

仓库原生支持 ROS1 和 ROS2，包含标定工具和可视化节点：

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module

# ROS2
colcon build
source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

### Python 校准工具

```python
# 参考仓库 calibration/ 目录
# 运行六面校准获取精确的加速度计和陀螺仪零偏
python calibration/calibrate.py --port /dev/ttyUSB0
```
```

- [ ] **Step 5: USB 免驱声卡 — 追加规格和仓库引用**

Read `docs/tutorials/accessories/usb-audio-card-tutorial.md`，在末尾追加：

```markdown

---

## 官方仓库

钜犀科技 USB 免驱声卡开源仓库：[GitHub](https://github.com/Juxi-Technology/Driver-Free-Sound-Card)

即插即用，兼容 Raspberry Pi、Jetson、PC 等设备。无需额外驱动，系统自动识别为音频输入/输出设备。
```

- [ ] **Step 6: Commit**

```bash
git add docs/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control.md docs/tutorials/accessories/KWS-speech-recognition-module/index.md docs/tutorials/accessories/0.91-oled-screen-tutorial.md docs/tutorials/sensors/imu/index.md docs/tutorials/accessories/usb-audio-card-tutorial.md
git commit -m "docs: 已有教程追加官方仓库代码示例

- AmazingHand: Python 控制代码 + TTL 协议
- KWS 语音识别: 串口通信示例
- OLED 屏幕: I2C SSD1306 驱动示例
- IMU 模块: ROS1/ROS2 示例 + 校准工具
- USB 声卡: 仓库引用

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 7: 构建验证

- [ ] **Step 1: 运行生产构建**

```bash
npm run docs:build
```

预期：exit code 0，无错误。

- [ ] **Step 2: 验证新页面渲染存在**

```bash
# 检查构建产物中包含新产品页面
find docs/.vitepress/dist -name "*usb-auto-focus*" | wc -l
find docs/.vitepress/dist -name "*jetson-csi*" | wc -l
find docs/.vitepress/dist -name "*2dof*" | wc -l
find docs/.vitepress/dist -name "*heart-rate*" | wc -l
```

预期：每个产品 > 0 个文件。

- [ ] **Step 3: 验证无死链**

```bash
# 死链检测（ignoreDeadLinks 已配置，但人工抽查新页面链接）
grep -r '/tutorials/accessories/usb-auto-focus-camera' docs/.vitepress/dist/ | head -2
grep -r '/tutorials/accessories/jetson-csi-camera' docs/.vitepress/dist/ | head -2
```

- [ ] **Step 4: Commit 收尾**

```bash
git add -A
git commit -m "chore: 构建验证通过，Wiki 内容丰富完成

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## 实施顺序

```
Task 1 (USB摄像头) ─┐
Task 2 (CSI摄像头) ─┤
Task 3 (云台)      ├── 并行 ──→ Task 5 (侧边栏) ──→ Task 6 (已有教程补充) ──→ Task 7 (验证)
Task 4 (心率传感器)─┘
```

Task 1-4 独立并行，Task 5 依赖前 4 个任务完成（需要文件已存在），Task 6 独立，Task 7 收尾串行。
