---
title: USB 自動對焦攝像頭
category: compute-vision
description: "鉅犀科技 USB 自動對焦攝像頭:86° 廣角、1080P 30FPS,UVC 標準協議免驅即插即用,兼容 Windows、Linux、macOS 與 Jetson 等平台。"
keywords: [usb 攝像頭, 自動對焦, 1080p, uvc, 免驅, 機器人視覺, jetson, 樹莓派]
---

# USB 自動對焦攝像頭

> **[淘寶購買](https://item.taobao.com/item.htm?id=912105917442)**

## 產品概述

USB 自動對焦攝像頭是一款即插即用的高清攝像頭模組,適用於機器人視覺、AI 推理和電腦視覺應用。支援 **86° 廣角視野**、自動對焦和 **1080P 30FPS** 視頻輸出,採用 UVC 標準協議,無需安裝驅動。

**核心特性**:

- USB 免驅,UVC 標準協議即插即用
- 兼容 Windows / Linux / macOS / Jetson / 樹莓派
- 86° 廣角鏡頭,覆蓋更大視野範圍
- 自動對焦(AF),無需手動調焦
- 1080P 30FPS 高清視頻流

---

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

---

## 快速開始

### 1. 連接裝置

將攝像頭 USB 接口插入裝置的 USB 端口即可,無需安裝額外驅動。

### 2. 確認裝置識別

```bash
# Linux / Jetson / 樹莓派
ls /dev/video*
v4l2-ctl --list-devices
```

一個 USB 攝像頭通常顯示兩個 `video` 裝置(如新增的 `/dev/video2`、`/dev/video3`),呼叫時選擇數字較小的那個。

### 3. Python 讀取畫面

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

- [USB 自動對焦攝像頭使用教程——裝置識別、多攝像頭選擇與 Python 示例](/zh-hant/tutorials/accessories/usb-auto-focus-camera)
- [Jetson 自動對焦攝像頭使用(video 裝置與 GUVCView)](/zh-hant/tutorials/accessories/csi-camera/02-Auto-Focus-Camera)

---

## 應用場景

- 機器人視覺與遙操作圖傳
- AI 推理與電腦視覺項目
- Jetson / 樹莓派多攝像頭方案(與 CSI 攝像頭搭配)
- 直播、錄屏與視頻採集

---

## 常見問題

**Q: 攝像頭無法識別?**

**A:** 確認 USB 線纜連接牢固,嘗試更換 USB 端口,並用 `lsusb` 查看 USB 裝置列表。

**Q: 畫面模糊?**

**A:** 攝像頭具備自動對焦功能,首次連接後等待 2-3 秒自動對焦完成;如果仍然模糊,確認鏡頭表面清潔。

**Q: 如何調整分辨率?**

**A:** 使用 `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` 和 `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)` 設置。

---

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [問題反饋](https://github.com/Juxi-Technology/wiki-documents/issues)
