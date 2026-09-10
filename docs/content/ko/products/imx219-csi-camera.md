---
title: 79° IMX219 CSI 카메라
category: compute-vision
description: Juxi Technology 79° IMX219 CSI 카메라 — 800만 화소 네이티브 CSI 인터페이스, 77° FOV, NVIDIA Jetson 저지연 비전
keywords: [imx219, csi camera, jetson, 카메라]
---

# 79° IMX219 CSI 카메라

> **[스토어에서 구매](https://www.juxitech.com/ko/products/79-imx219-csi-camera)**

## 제품 개요

79° IMX219 CSI 카메라는 NVIDIA Jetson Orin 시리즈 전용 설계입니다. CSI(Camera Serial Interface)를 통해 저지연·고대역폭 영상 전송을 실현합니다. 8MP 고해상도로 AI 비전 추론, 로봇 인지, 엣지 컴퓨팅에 적합합니다.

**주요 특징**:

- CSI-2 인터페이스, Jetson Orin 개발 보드 직접 연결
- 77° FOV, 800만 화소
- OpenCV + GStreamer 즉시 사용 샘플
- 저지연 영상 전송

## 제품 사양

| 카테고리 | 사양 |
|------|------|
| 센서 | IMX219, 8MP |
| 화각 | 77° |
| 인터페이스 | CSI-2 (MIPI) |
| 플랫폼 | NVIDIA Jetson Orin 시리즈 |
| SDK | JetPack 5.0+ / GStreamer / OpenCV |

## 빠른 시작

```python
import cv2
# CSI 摄像头 GStreamer 管道
pipe = "nvarguscamerasrc ! video/x-raw(memory:NVMM) ! nvvidconv ! appsink"
cap = cv2.VideoCapture(pipe, cv2.CAP_GSTREAMER)
```
## 관련 튜토리얼

- [Jetson CSI 카메라 튜토리얼](/ko/tutorials/accessories/jetson-csi-camera)

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
