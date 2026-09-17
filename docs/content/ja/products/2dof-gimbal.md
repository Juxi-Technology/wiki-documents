---
title: 2 自由度サーボパンチルト
category: accessory
description: "Juxi Technology 2 自由度サーボ雲台——SCS0009 バスサーボ、水平 180°/垂直 90°、200 万画素カメラ、AI ビジョントラッキング"
keywords: [gimbal, 雲台, 2dof, ビジョントラッキング, scs0009]
---

# 2 自由度サーボパンチルト

> **[ストアで購入](https://www.juxitech.com/ja/products/2-dof-servo-pan-tilt-unit)**

## 製品概要

2 自由度サーボパンチルトは高精度 SCS0009 シリアルバスサーボを搭載し、水平 180° / 垂直 90° の 2 軸電動駆動に対応。標準で 200 万画素高解像度 USB カメラ(1080P ズーム/固定焦点モジュール選択可)を装備し、顔・色・QR コード認識とリアルタイムトラッキングをサポートします。

**主な特長**:

- 2 自由度(水平 180° / 垂直 90°)
- SCS0009 バスサーボ:2.5kg.cm トルク、0.293° 精度、リアルタイムフィードバック
- ストール/過熱/電圧保護 + TVS レギュレータドライバボード
- 200 万画素カメラ、ズーム 30FPS / 固定 60FPS 選択可
- 密閉型配線隠し設計

## 仕様

| カテゴリ | 仕様 |
|------|------|
| サーボ | FEETECH SCS0009 × 2 |
| 回転範囲 | 水平 180°、垂直 90° |
| カメラ | 200 万画素 USB プラグアンドプレイ(ズーム/固定選択可) |
| ビジョン機能 | 顔/色/QR コード認識トラッキング |
| 対応ホスト | Raspberry Pi、Jetson、RDK |

## クイックスタート
```bash
# USB 连接主控,摄像头即插即用
# Python SDK 控制云台
from sc_servo import SCServo, Gimbal
servo = SCServo("COM3")  # Linux: /dev/ttyUSB0
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()
gimbal.set_angle(0, 30)
```
## 関連チュートリアル

- [2 自由度カメラ雲台チュートリアル](/ja/tutorials/accessories/2dof-camera-gimbal)

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
