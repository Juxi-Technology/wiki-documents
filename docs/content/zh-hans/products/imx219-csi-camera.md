---
title: 79° IMX219 CSI 摄像头
category: compute-vision
description: "钜犀科技 79° IMX219 CSI 摄像头——800 万像素原生 CSI 接口,77° FOV,NVIDIA Jetson 低延迟视觉"
keywords: [imx219, csi camera, jetson, 摄像头]
---

# 79° IMX219 CSI 摄像头

> **[淘宝购买](https://item.taobao.com/item.htm?id=1044602087494)**

## 产品概述

79° IMX219 CSI 摄像头专为 NVIDIA Jetson Orin 系列设计,通过 CSI(Camera Serial Interface)接口提供低延迟、高带宽视频传输。8MP 高清成像,适用于 AI 视觉推理、机器人感知与边缘计算。

**核心特性**:

- CSI-2 接口,直连 Jetson Orin 开发板
- 77° FOV,800 万像素
- OpenCV + GStreamer 即用示例
- 低延迟视频传输

## 产品规格

| 类别 | 规格 |
|------|------|
| 传感器 | IMX219,8MP |
| 视场角 | 77° |
| 接口 | CSI-2 (MIPI) |
| 平台 | NVIDIA Jetson Orin 系列 |
| SDK | JetPack 5.0+ / GStreamer / OpenCV |

## 快速开始

```python
import cv2
# CSI 摄像头 GStreamer 管道
pipe = "nvarguscamerasrc ! video/x-raw(memory:NVMM) ! nvvidconv ! appsink"
cap = cv2.VideoCapture(pipe, cv2.CAP_GSTREAMER)
```

## 相关教程

- [Jetson CSI 摄像头教程](/zh-hans/tutorials/accessories/jetson-csi-camera)

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
