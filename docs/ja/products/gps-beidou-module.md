---
title: GPS & 北斗 GNSS 測位モジュール
description: "JUXI GPS & 北斗 GNSS 測位モジュール——ATGM336H-5N チップ、四大衛星システム連合測位、2.5m 精度、ROS 対応"
keywords: [gps, 北斗, gnss, 測位, atgm336h]
---

# GPS & 北斗 GNSS 測位モジュール

> **[ストアで購入](https://www.juxitech.com/ja/products/gps-beidou-gnss-positioning-module)**

## 製品概要

**主な特長**：

- **BDS/GPS/QZSS/GLONASS** 四大衛星システム対応（単一または任意組合せ）
- **32 チャンネル**高感度受信機、安定した測位
- 測位精度 **2.5m (CEP50)**、コールドスタート 32 秒
- プラグアンドプレイ USB シリアル + TTL シリアル
- Arduino/Jetson/ラズベリーパイ/ROS オープンソースチュートリアル提供

## 製品仕様

| カテゴリ | 仕様 |
|------|------|
| チップ | ATGM336H-5N |
| 衛星システム | BDS / GPS / QZSS / GLONASS |
| チャンネル数 | 32 チャンネル、複数システム同時受信 |
| 測位精度 | <2.5m (CEP50) |
| 更新周波数 | デフォルト 1Hz、最大 10Hz |
| ボーレート | 4800-115200bps（デフォルト 9600） |
| 感度 | コールドスタート -148dBm、追跡 -162dBm |
| 消費電力 | 25mA @ 3.3V |
| 動作温度 | -40℃ ~ +85℃ |
| インターフェース | USB Type-C / TTL シリアル（PH2.0） |

## クイックスタート

```bash
# USB シリアルを確認
ls /dev/ttyUSB*
# データ取得（例: /dev/ttyUSB0, 9600bps）
sudo gpsd /dev/ttyUSB0 -n
cgps
```

## 関連チュートリアル

- [公式リポジトリ](https://github.com/Juxi-Technology)

## 技術サポート

- 📧 メール：support@juxitech.com
- 🌐 公式サイト：[www.juxitech.com](https://www.juxitech.com)
