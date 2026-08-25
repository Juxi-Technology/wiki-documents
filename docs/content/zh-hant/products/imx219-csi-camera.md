---
title: 79° IMX219 CSI 攝像頭
description: 鉅犀科技 79° IMX219 CSI 攝像頭——800 萬像素原生 CSI 接口,77° FOV,NVIDIA Jetson 低延遲視覺
keywords: [imx219, csi camera, jetson, 攝像頭]
---

# 79° IMX219 CSI 攝像頭

> **[在商店購買](https://www.juxitech.com/zh-hant/products/79-imx219-csi-camera)**

## 產品概述

79° IMX219 CSI 攝像頭專為 NVIDIA Jetson Orin 系列設計,通過 CSI(Camera Serial Interface)接口提供低延遲、高帶寬視頻傳輸。8MP 高清成像,適用於 AI 視覺推理、機器人感知與邊緣計算。

**核心特性**:

- CSI-2 接口,直連 Jetson Orin 開發板
- 77° FOV,800 萬像素
- OpenCV + GStreamer 即用示例
- 低延遲視頻傳輸

## 產品規格

| 類別 | 規格 |
|------|------|
| 傳感器 | IMX219,8MP |
| 視場角 | 77° |
| 接口 | CSI-2 (MIPI) |
| 平台 | NVIDIA Jetson Orin 系列 |
| SDK | JetPack 5.0+ / GStreamer / OpenCV |

## 快速開始

```python
import cv2
# CSI 攝像頭 GStreamer 管道
pipe = "nvarguscamerasrc ! video/x-raw(memory:NVMM) ! nvvidconv ! appsink"
cap = cv2.VideoCapture(pipe, cv2.CAP_GSTREAMER)
```

## 相關教程

- [Jetson CSI 攝像頭教程](/zh-hant/tutorials/accessories/jetson-csi-camera)

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
