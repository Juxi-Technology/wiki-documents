---
title: KWS 音声対話モジュール
description: "JUXI KWS 音声認識対話モジュール——中英ウェイクワード認識、シリアル/RViz2 可視化、Jetson/ラズベリーパイ対応、ファームウェアオープンソース"
keywords: [kws, 音声認識, 音声対話, wake word]
---

# KWS 音声対話モジュール

> **[ストアで購入](https://www.juxitech.com/ja/products/ai-voice-recognition-module)**

## 製品概要

**主な特長**：

- 中英認識語ファームウェア（ダウンロードと書き込み）
- シリアル通信（PC/Jetson/ラズベリーパイ/Jetson Nano）
- ROS2 + RViz2 可視化
- オープンソースリポジトリ、Python シリアルサンプル

## 製品仕様

| カテゴリ | 仕様 |
|------|------|
| 通信 | シリアル（UART） |
| 認識 | 中英ウェイクワード |
| プラットフォーム | Jetson、Nano、ラズベリーパイ、PC |
| 可視化 | ROS2 RViz2 |
| ファームウェア | オープンソース書き込みツール |

## クイックスタート

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"認識結果: {data}")
```

## 関連チュートリアル

- [KWS 音声認識モジュールシリーズチュートリアル](/ja/tutorials/accessories/KWS-speech-recognition-module/)
- [中英認識語ファームウェアのダウンロードと書き込み](/ja/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [ROS2 RViz2 可視化](/ja/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 技術サポート

- 📧 メール：support@juxitech.com
- 🌐 公式サイト：[www.juxitech.com](https://www.juxitech.com)
