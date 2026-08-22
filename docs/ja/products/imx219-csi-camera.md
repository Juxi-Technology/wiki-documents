---
title: 79° IMX219 CSI カメラ
description: "JUXI 79° IMX219 CSI カメラ——800万画素ネイティブ CSI インターフェース、77° FOV、NVIDIA Jetson 低遅延ビジョン"
keywords: [csi camera, imx219, 8mp, jetson]
---

# 79° IMX219 CSI カメラ

> **[ストアで購入](https://www.juxitech.com/ja/products/79-imx219-csi-camera)**

## 製品概要

**主な特長**：

- CSI-2 インターフェース、Jetson Orin 開発ボードに直結
- 77° FOV、800万画素
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

```bash
sudo apt install -y python3-opencv
# GStreamer + OpenCV で撮影
python3 examples/csi_capture.py
```

## 関連チュートリアル

- [Jetson CSI カメラチュートリアル](/ja/tutorials/accessories/jetson-csi-camera)

## 技術サポート

- 📧 メール：support@juxitech.com
- 🌐 公式サイト：[www.juxitech.com](https://www.juxitech.com)
