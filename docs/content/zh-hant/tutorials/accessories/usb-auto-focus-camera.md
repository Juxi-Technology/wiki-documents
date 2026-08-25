---
title: USB 自動對焦攝像頭
description: "鉅犀科技 USB 免驅 86° 廣角自動對焦 1080P 攝像頭使用教程"
---

# USB 自動對焦攝像頭

## 產品概述

鉅犀科技 USB 自動對焦攝像頭是一款即插即用的高清攝像頭模組，適用於機器人視覺、AI 推理和電腦視覺應用。支援 86° 廣角視野、自動對焦和 1080P 30FPS 視頻輸出。

**特性**：
- USB 免驅，兼容 Windows / Linux / macOS / Jetson / 樹莓派
- 86° 廣角鏡頭，覆蓋更大視野範圍
- 自動對焦（AF），無需手動調焦
- 1080P 30FPS 高清視頻流
- UVC 標準協議，即插即用

## 產品規格

| 參數 | 規格 |
|------|------|
| 分辨率 | 1920 × 1080 (1080P) |
| 幀率 | 30 FPS |
| 視角 | 86° 廣角 |
| 對焦方式 | 自動對焦 (AF) |
| 接口 | USB 2.0 |
| 協議 | UVC (USB Video Class) |
| 系統支援 | Windows / Linux / macOS / Jetson / Raspberry Pi |

## 快速開始

### 連接裝置

將攝像頭 USB 接口插入裝置的 USB 端口即可。無需安裝額外驅動。

### 確認裝置識別

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
# 應看到 /dev/video0 或 /dev/video1

# 查看詳細信息
v4l2-ctl --list-devices
```

### Python 代碼示例

安裝 OpenCV：

```bash
pip install opencv-python
```

基礎圖像捕獲：

```python
import cv2

# 打開攝像頭
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
cap.set(cv2.CAP_PROP_FPS, 30)

if not cap.isOpened():
    print("無法打開攝像頭")
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

多攝像頭選擇：

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

print(f"可用攝像頭: {list_cameras()}")

# 選擇特定攝像頭
camera_index = 1  # 第二個攝像頭
cap = cv2.VideoCapture(camera_index)
```

## 在 Jetson 上使用

```bash
# 檢查攝像頭
v4l2-ctl --list-devices

# 使用 GStreamer 管道獲得更好性能
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! autovideosink
```

## 常見問題

**Q: 攝像頭無法識別？**
確認 USB 線纜連接牢固。嘗試換一個 USB 端口。運行 `lsusb` 查看 USB 裝置列表。

**Q: 畫面模糊？**
攝像頭具備自動對焦功能，首次連接後等待 2-3 秒自動對焦完成。如果仍然模糊，確認鏡頭表面清潔。

**Q: 如何調整分辨率？**
使用 `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` 和 `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`。

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues：[問題反饋](https://github.com/Juxi-Technology/wiki-documents/issues)
