---
title: Jetson CSI 攝像頭
description: 鉅犀科技 NVIDIA Jetson Orin CSI 攝像頭模組使用教程
---

# Jetson CSI 攝像頭

## 產品概述

鉅犀科技 CSI 攝像頭模組專為 NVIDIA Jetson Orin 開發者套件設計，通過 CSI (Camera Serial Interface) 接口提供低延遲、高帶寬的視頻傳輸。適用於 AI 視覺推理、機器人感知和邊緣計算場景。

**特性**：
- CSI-2 接口，直連 Jetson Orin 開發板
- 基於 OpenCV 和 GStreamer 的即用示例
- 低延遲視頻傳輸
- 兼容 UVC 協議

## 產品規格

| 參數 | 規格 |
|------|------|
| 接口 | CSI-2 (MIPI) |
| 兼容平台 | NVIDIA Jetson Orin 系列 |
| 視頻格式 | RAW / YUV |
| SDK 支援 | JetPack 5.0+ |
| 軟件框架 | GStreamer / OpenCV |

## 快速開始

### 硬件連接

1. 關閉 Jetson Orin 電源
2. 將 CSI 排線一端連接攝像頭模組
3. 將排線另一端插入 Jetson Orin 開發板的 CSI 接口
4. 確保排線方向正確（金屬觸點朝向主板）

> ⚠️ **注意**：務必在斷電狀態下連接 CSI 排線，否則可能損壞硬件。

### 確認裝置識別

```bash
# 查看 CSI 攝像頭裝置
ls /dev/video*

# 使用 v4l2 查看詳細信息
v4l2-ctl --list-devices
v4l2-ctl --list-formats-ext -d /dev/video0
```

### Python 代碼示例

安裝依賴：

```bash
sudo apt install -y python3-opencv
```

使用 GStreamer + OpenCV 捕獲 CSI 攝像頭：

```python
import cv2

# CSI 攝像頭 GStreamer 管道
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
    print("無法打開 CSI 攝像頭")
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

基礎捕獲（如果攝像頭以 UVC 模式工作）：

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

## 常見問題

**Q: 攝像頭未被識別？**
首先確認排線連接正確且方向無誤。運行 `ls /dev/video*` 檢查裝置節點。如果仍未識別，嘗試重新安裝 JetPack。

**Q: GStreamer 管道報錯？**
確認 JetPack 版本 ≥ 5.0。運行 `apt list --installed | grep nvarguscamerasrc` 確認相關 GStreamer 插件已安裝。

**Q: 如何切換攝像頭？**
修改 `sensor-id` 參數：`sensor_id=0` 為第一個攝像頭，`sensor_id=1` 為第二個。

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues：[問題反饋](https://github.com/Juxi-Technology/wiki-documents/issues)
