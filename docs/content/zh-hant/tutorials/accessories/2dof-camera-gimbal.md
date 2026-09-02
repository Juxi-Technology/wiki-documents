---
title: 2 自由度相機雲台
description: "鉅犀科技 2-DOF 相機雲台模組，支援顏色追蹤、人臉檢測和自動追蹤"
---

# 2 自由度相機雲台

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**


## 產品概述

鉅犀科技 2-DOF 相機雲台是一款開源的二自由度攝像頭穩定平台，支援 Python 編程控制、顏色追蹤、人臉檢測和自動目標追蹤。適用於機器人視覺、監控和自動化場景。

**特性**：
- 2 自由度（Pitch / Yaw）舵機控制
- 顏色追蹤、人臉檢測、二維碼檢測
- 純 Python 實現，易於二次開發
- 支援 USB 攝像頭和串口舵機
- 開源代碼：[GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)

## 產品規格

| 參數 | 規格 |
|------|------|
| 自由度 | 2 軸（Pitch 俯仰 + Yaw 偏航） |
| 舵機類型 | 串行總線舵機（SCS 協議） |
| 控制接口 | USB 串口 |
| 攝像頭支援 | USB UVC 攝像頭 |
| 追蹤算法 | 顏色追蹤 / 人臉檢測 / 二維碼檢測 |
| 開發語言 | Python 3 |

## 快速開始

### 硬件連接

1. 將舵機連接至串行總線接口
2. USB 轉串口模組連接至電腦/Jetson/樹莓派
3. 安裝攝像頭至雲台支架
4. 連接 USB 攝像頭

### 安裝依賴

```bash
pip install -r requirements.txt
# 或手動安裝
pip install opencv-python pyserial numpy
```

### 基礎控制代碼

```python
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from sc_servo import SCServo, Gimbal
import time

# 初始化舵機控制器
servo = SCServo("COM3")  # Linux: "/dev/ttyUSB0"
if servo.connect():
    print("✓ 串口連接成功")

    gimbal = Gimbal(servo)
    gimbal.enable_all()

    # 設置方向 (pitch, yaw)
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

### 顏色追蹤示例

```python
import sys
import os
import cv2
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))
from sc_servo import SCServo, Gimbal

# 初始化攝像頭和雲台
cap = cv2.VideoCapture(0)
servo = SCServo("COM3")
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # 轉為 HSV 進行顏色檢測
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # 紅色範圍
    lower_red1 = (0, 100, 100)
    upper_red1 = (10, 255, 255)
    mask = cv2.inRange(hsv, lower_red1, upper_red1)

    # 尋找最大輪廓
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest)
        center_x = x + w // 2
        center_y = y + h // 2

        # 將像素坐標映射到舵機角度
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

## 進階功能

### 人臉檢測追蹤

倉庫 `src/detectors/face_detector.py` 提供了基於 OpenCV DNN 的人臉檢測器，可用於自動追蹤人臉。

### 自動追蹤

倉庫 `examples/auto_tracking_demo.py` 實現了完整的自動追蹤流程，包括目標選擇、PID 控制和平滑跟蹤。

## 常見問題

**Q: 串口無法連接？**

確認端口號正確。Windows 使用 `COMx`，Linux 使用 `/dev/ttyUSBx`。運行 `python examples/list_ports.py` 列出可用端口。

**Q: 舵機不響應？**

檢查舵機電源供電是否充足。SCS 舵機需要外部供電（6-8.4V）。

**Q: 追蹤不穩定？**

調整 PID 參數和追蹤頻率。減少幀分辨率可以提升實時性。

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
- 💻 開源倉庫：[GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)
