---
title: 79° IMX219 CSI 카메라
description: "JUXI 79° IMX219 CSI 카메라——800만 화소 네이티브 CSI 인터페이스, 77° FOV, NVIDIA Jetson 저지연 비전"
keywords: [csi camera, imx219, 8mp, jetson]
---

# 79° IMX219 CSI 카메라

> **[스토어에서 구매](https://www.juxitech.com/ko/products/79-imx219-csi-camera)**

## 제품 개요

**주요 특징**:

- CSI-2 인터페이스, Jetson Orin 개발 보드 직접 연결
- 77° FOV, 800만 화소
- OpenCV + GStreamer 즉시 사용 예제
- 저지연 영상 전송

## 제품 사양

| 항목 | 사양 |
|------|------|
| 센서 | IMX219, 8MP |
| 화각 | 77° |
| 인터페이스 | CSI-2 (MIPI) |
| 플랫폼 | NVIDIA Jetson Orin 시리즈 |
| SDK | JetPack 5.0+ / GStreamer / OpenCV |

## 빠른 시작

```bash
sudo apt install -y python3-opencv
# GStreamer + OpenCV로 촬영
python3 examples/csi_capture.py
```

## 관련 튜토리얼

- [Jetson CSI 카메라 튜토리얼](/ko/tutorials/accessories/jetson-csi-camera)

## 기술 지원

- 📧 이메일：support@juxitech.com
- 🌐 공식 사이트：[www.juxitech.com](https://www.juxitech.com)
