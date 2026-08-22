---
title: JUXI バスサーボドライバ基板
description: "JUXI バスサーボドライバ基板——単一バスで 253 個のサーボ制御、7~12.6V 広電圧、Type-C プラグアンドプレイ、LeRobot SO-ARM 専用設計"
keywords: [servo driver, サーボドライバ, バスサーボ, lerobot, so-arm]
---

# JUXI バスサーボドライバ基板

> **[ストアで購入](https://www.juxitech.com/ja/products/bus-servo-driver-board)**

## 製品概要

**主な特長**：

- 単一バスで最大 **253 個**のシリアルバスサーボ制御
- **7~12.6V** 広電圧入力、給電一体型（DC 5521 インターフェース）
- リアルタイムデータフィードバック：位置、速度、トルク、操作モード
- **Type-C プラグアンドプレイ**、ラズベリーパイ/Jetson/RDK/PC 互換
- 精密にキャリブレーションされた取り付け穴、2 分で SO-ARM100/101 に直接取り付け
- TVS 保護回路（過電圧過電流保護）

## 製品仕様

| カテゴリ | 仕様 |
|------|------|
| 入力電圧 | DC 7V ~ 12.6V |
| インターフェース | USB Type-C / UART |
| サーボ対応 | 最大 253 個のシリアルバスサーボ |
| データフィードバック | 位置、速度、トルク状態、操作モード |
| ボードサイズ | 42.00mm × 33.00mm |
| 取り付け穴間隔 | 37.00mm × 28.00mm（SO-ARM 取り付け穴と一致） |
| 互換サーボ | 市場の主要なシリアルバスサーボの大半 |
| 対応ホスト | ラズベリーパイ、NVIDIA Jetson (Nano/Orin/Xavier)、RDK、PC(Win/macOS/Linux)、Orange Pi |

## クイックスタート

```bash
# SO-ARM101 起動例
python3 examples/arm_boot.py --port /dev/ttyACM0
```

## 関連チュートリアル

- [SO-ARM101 開発キット](/ja/products/so-arm101)
- [Feetech バスサーボ（SCS0009 / STS3215）](/ja/products/feetech-servo)

## 技術サポート

- 📧 メール：support@juxitech.com
- 🌐 公式サイト：[www.juxitech.com](https://www.juxitech.com)
