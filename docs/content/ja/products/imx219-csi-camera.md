---
title: 79° IMX219 CSI カメラ
category: compute-vision
description: 鉅犀科技 79° IMX219 CSI カメラ——800 万画素ネイティブ CSI インターフェース、77° FOV、NVIDIA Jetson 低遅延ビジョン
keywords: [imx219, csi camera, jetson, カメラ]
---

# 79° IMX219 CSI カメラ

> **[ストアで購入](https://www.juxitech.com/ja/products/79-imx219-csi-camera)**

## 製品概要

79° IMX219 CSI カメラは NVIDIA Jetson Orin シリーズ専用設計。CSI(Camera Serial Interface)経由で低遅延・高帯域の映像転送を実現します。8MP 高画質で、AI ビジョン推論、ロボット知覚、エッジコンピューティングに最適。

**主な特長**:

- CSI-2 インターフェース、Jetson Orin 開発ボードに直結
- 77° FOV、800 万画素
- OpenCV + GStreamer 即用サンプル
- 低遅延映像転送

## 製品仕様

| カテゴリ | 仕様 |
|------|------|
| センサー | IMX219、8MP |
| 視野角 | 77° |
| インターフェース | CSI-2 (MIPI) |
| プラットフォーム | NVIDIA Jetson Orin シリーズ |
| SDK | JetPack 5.0+ / GStreamer / OpenCV |

## クイックスタート

```python
import cv2
# CSI 摄像头 GStreamer 管道
pipe = "nvarguscamerasrc ! video/x-raw(memory:NVMM) ! nvvidconv ! appsink"
cap = cv2.VideoCapture(pipe, cv2.CAP_GSTREAMER)
```
## 関連チュートリアル

- [Jetson CSI カメラチュートリアル](/ja/tutorials/accessories/jetson-csi-camera)

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
