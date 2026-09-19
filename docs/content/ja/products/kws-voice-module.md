---
title: KWS 音声対話モジュール
category: accessory
description: "中英認識語ファームウェアを書き込める KWS 音声認識モジュール。シリアルで Jetson や Raspberry Pi に対応し、ROS2 可視化とオフライン認識を提供します。"
keywords: [kws, 音声認識, 音声対話, ウェイクワード, ai voice]
---

# KWS 音声対話モジュール

> **[ストアで購入](https://www.juxitech.com/ja/products/ai-voice-recognition-module)**

## 製品概要

KWS(Keyword Spotting)音声認識対話モジュールは、中英認識語のダウンロードと書き込みに対応。音声チップは**到着後に出荷ファームウェアの書き込みが必要**です。シリアルでホストと通信し、Jetson、Raspberry Pi などのプラットフォームに対応。ROS2 RViz2 可視化を提供します。

**主な特長**:

- 中英認識語ファームウェア(ダウンロードと書き込み)
- シリアル通信(PC/Jetson/Raspberry Pi/Jetson Nano)
- ROS2 + RViz2 可視化
- オープンソースリポジトリ、Python シリアルサンプル
- 100% オフライン認識、インターネット不要(プライバシー + 低遅延)
- 通常環境での認識精度 >95%、コマンド入力 300ms 以内に応答
- 最大 100 個のカスタム音声コマンド、ウェイクワードカスタマイズ可能
- 低消費電力:平均動作電流 <50mA

## 製品仕様

| カテゴリ | 仕様 |
|------|------|
| 通信 | シリアル(UART) |
| 認識 | 中英ウェイクワード |
| プラットフォーム | Jetson、Nano、Raspberry Pi、PC |
| 可視化 | ROS2 RViz2 |
| ファームウェア | オープンソース書き込みツール |

## クイックスタート

```bash
# ファームウェアを書き込み(チュートリアル参照)
# Python シリアル通信の例
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"识别结果: {data}")
```
## 関連チュートリアル

- [KWS 音声認識モジュールシリーズ](/ja/tutorials/accessories/KWS-speech-recognition-module/)
- [中英認識語ファームウェアのダウンロードと書き込み](/ja/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [ROS2 RViz2 可視化](/ja/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
