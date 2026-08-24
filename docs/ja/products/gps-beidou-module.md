---
title: GPS & 北斗 GNSS 測位モジュール
description: 鉅犀科技 GPS & 北斗 GNSS 測位モジュール——ATGM336H-5N チップ、四大衛星システム連合測位、2.5m 精度、ROS 対応
keywords: [gps, beidou, gnss, 北斗, 測位モジュール, ros]
---

# GPS & 北斗 GNSS 測位モジュール

> **[ストアで購入](https://www.juxitech.com/ja/products/gps-beidou-gnss-positioning-module)**

## 製品概要

GPS & BDS 測位モジュールは和芯星通(Unicore) **ATGM336H-5N** チップをベースに、北斗二代/三代(1-63 番の全衛星)、GPS、GLONASS、QZSS などの衛星航法システムに対応。複数システム信号を同時受信し、連合測位・ナビゲーション・時刻同期を実現します。

**主な特長**:

- **BDS/GPS/QZSS/GLONASS** 四大衛星システム対応(単一または任意組み合わせ)
- **32 チャンネル**高感度受信機、安定した測位
- 測位精度 **2.5m (CEP50)**、コールドスタート 32 秒
- プラグアンドプレイ USB シリアル + TTL シリアル
- Arduino/Jetson/Raspberry Pi/ROS オープンソースチュートリアル提供

## 製品仕様

| カテゴリ | 仕様 |
|------|------|
| チップ | ATGM336H-5N |
| 衛星システム | BDS / GPS / QZSS / GLONASS |
| チャンネル数 | 32 チャンネル、複数システム同時受信 |
| 測位精度 | <2.5m (CEP50) |
| 更新周波数 | デフォルト 1Hz、最大 10Hz |
| ボーレート | 4800-115200bps(デフォルト 9600) |
| 感度 | コールドスタート -148dBm、追尾 -162dBm |
| 消費電力 | 25mA @ 3.3V |
| 動作温度 | -40℃ ~ +85℃ |
| インターフェース | USB Type-C / TTL シリアル(PH2.0) |

## ピン説明

| ピン | 機能 |
|------|------|
| 5V | 電源入力 |
| RES | モジュールリセット |
| PPS | 毎秒パルス出力 |
| TX | シリアルデータ出力 |
| RX | シリアルデータ入力(オプション) |

## クイックスタート

### 1. アンテナとモジュールの接続

3 メートルのアクティブ GPS アンテナをモジュールに接続。アンテナは見通しの良い場所(屋外または窓際)に設置して素早く衛星を捕捉します。

### 2. USB で PC/ホストに接続

Type-C データケーブルで直結、プラグアンドプレイ(デフォルト 9600bps)。

### 3. 測位の確認

```bash
# 安装 pynmea2 解析 NMEA 数据
pip install pynmea2

# 读取定位数据示例
import serial
import pynmea2

ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
while True:
    line = ser.readline().decode(errors='ignore')
    if line.startswith('$GPRMC') or line.startswith('$GNRMC'):
        msg = pynmea2.parse(line)
        print(f'纬度: {msg.latitude}, 经度: {msg.longitude}')
```
### 4. ROS 統合

ROS 測位ノードに対応し、IMU フュージョンや Move_Base ナビゲーションと組み合わせて使用できます。

## ツールと資料

- **GnssToolKit3**:可視化ツール。衛星状態表示、データ記録、KML エクスポートに対応
- **座標系変換**:WGS-84 → GCJ-02 → BD-09 の完全なソリューションを提供
- **サンプルコード**:Arduino / Python / Jetson Nano チュートリアル
- [公式リポジトリ](https://github.com/Juxi-Technology)(IMU/測位関連コード)

## よくある質問

**Q: 測位が遅い、または信号なし?**
アンテナは見通しの良い場所(屋外/窓際)に設置してください。アンテナ接続を確認し、コールドスタートには 32 秒かかるため、初回起動時はしばらくお待ちください。

**Q: 対応衛星システムは?**
BDS、GPS、QZSS、GLONASS の 4 システム。単一または任意組み合わせで連合測位可能。

**Q: マイコンに接続できますか?**
はい。TTL シリアル(PH2.0)で MCU 開発ボードに接続可能。51/Arduino/STM32 チュートリアル付属。

**Q: 出力フォーマットは?**
標準 NMEA 0183 プロトコル。

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
- 💬 [問題フィードバック](https://github.com/Juxi-Technology/wiki-documents/issues)
