---
title: 第 3 章:カメラの基礎
description: "ESP32-NanoCam チュートリアル第 3 章:DVP カメラインターフェース、MJPEG ストリーミングと PSRAM フレームバッファの原理を理解し、デフォルト映像を確認、ファームウェア内蔵の ai_mode 各モードを把握します。"
---

# 第 3 章:カメラの基礎

> **[ストアで購入](https://www.juxitech.com/ja/products/esp32-s3-wifi-video-module)**

**この章の目標**:NanoCam のカメラデータ経路を理解し、ファームウェア内蔵の各 AI モードを把握します。

## 原理

NanoCam は DVP(デジタルビデオパラレル)インターフェースでカメラを接続します。GC2145 センサーが 8-bit パラレルピクセルデータを出力し、ESP32-S3 の LCD_CAM ペリフェラルが DMA で直接 PSRAM に格納、その後 HTTP サーバーが MJPEG 形式でブラウザへストリーミングします。

### 主要な概念

- **DVP**: 8 本のパラレルデータ + 3 本の同期信号(VSYNC/HREF/PCLK)

- **MJPEG**: 各フレームは独立した JPEG 画像で、ブラウザが連続して読み込むことで動画のように表示される

- **PSRAM**: 8MB PSRAM をフレームバッファとして使用し、2〜4 フレームを保存可能

## 手順

### 3.1 デフォルト映像の確認

ファームウェア書き込み後のデフォルトはストリームモードで、ブラウザで `http://<IP>` を開くと映像が表示されます。

|コマンド|機能|
|---|---|
|`ai_mode:0\r`|映像転送モジュール|
|`ai_mode:1\r`|猫顔検出|
|`ai_mode:2\r`|顔検出|
|`ai_mode:3\r`|色認識|
|`ai_mode:4\r`|顔認識|
|`ai_mode:5\r`|QR コード認識|

> 完全な AI モードとシリアルコマンドは[シリアルプロトコルマニュアル](./ESP32-NanoCam-Serial-Protocol.md)を参照。

次の章:[第 4 章:顔検出](./Ch04-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
