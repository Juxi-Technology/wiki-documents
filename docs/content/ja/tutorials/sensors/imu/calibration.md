---
title: IMU キャリブレーションガイド
description: Juxi Technology 高精度 IMU モジュールのキャリブレーション — 全体/磁力計/温度、UART と I2C 両対応
keywords: [imu, キャリブレーション, 磁力計]
---

# IMU キャリブレーションガイド

> **[ストアで購入](https://www.juxitech.com/ja/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


> 初回使用前にキャリブレーションを推奨。公式 `IMU_Library` の `imu_calibration_tool.py` を使用します。

## キャリブレーションの種類

| タイプ | 説明 | 実施タイミング |
|--------|------|----------|
| **全体** (`imu`) | 加速度計 + ジャイロ + 磁力計 | 初回設置時、取付位置変更後 |
| **磁力計** (`mag`) | 環境磁場の干渉除去 | モーター/金属の近くで移動した後 |
| **温度** (`temp`) | 温度ドリフト補償 | 大きな温度変化時 |

---

## 準備

1. 公式リポジトリをクローン:

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
```

2. IMU がホストに接続されていることを確認(シリアルまたは I2C)

3. **キャリブレーション姿勢**: IMU を平らな場所に静止させ、強い磁気源(モーター、磁石、金属製の固定具)から離す

---

## シリアル通信

```bash
cd ~/IMU_Library/IMU_Library

# すべてのキャリブレーションを実行(全体、磁力計、温度)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# 全体のみ
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# 磁力計のみ
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# 温度のみ
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp
```

## I2C 通信

```bash
# すべてのキャリブレーションを実行
python3 imu_calibration_tool.py --mode i2c --port 1

# 全体のみ
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# 磁力計のみ
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# 温度のみ
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```

> `--port`: I2C モードでは I2C バス番号(例: Raspberry Pi/STM32 では 1)。シリアルモードではデバイスパス(例: `/dev/ttyUSB0`、`/dev/imu-serial`)。

---

## キャリブレーションのコツ

| コツ | 説明 |
|-----|------|
| **磁力計** | IMU を水平にゆっくり回転させ(8の字や円を描く)、すべての向きをカバー |
| **静止** | 全体キャリブレーション中は IMU を完全に静止させる |
| **磁石を避ける** | モーター、変圧器、金属製テーブルから離す |
| **多軸** | 磁力計キャリブレーションは 3 軸すべての回転をカバーする必要がある |

---

## FAQ

**Q: キャリブレーション後も姿勢がドリフトする?**

**A:** 全体キャリブレーション(`imu`)が実行されたか確認。IMU がしっかり固定されているか確認(振動はノイズの原因)。大きな温度変化がある場合は温度キャリブレーションを追加。

**Q: 磁力計キャリブレーションが失敗する?**

**A:** 環境に強い磁気干渉がある可能性。`--calibrate mag` フラグを確認。キャリブレーション中は全方向への回転を行う。

**Q: I2C モードの `--port` の値は?**

**A:** ホストの I2C バス番号。Raspberry Pi ではデフォルト 1。STM32 のハードウェア I2C マッピングを確認。`i2cdetect -l` で検証。

---

## 関連リンク

- [IMU モジュール概要(製品情報)](/ja/tutorials/sensors/imu/product-info)
- [IMU ROS1](/ja/tutorials/sensors/imu/ros-examples/ros1)
- [IMU ROS2](/ja/tutorials/sensors/imu/ros-examples/ros2)
- [公式リポジトリ](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

## サポート

- 📧 Email: support@juxitech.com
- 🌐 Web サイト: [www.juxitech.com](https://www.juxitech.com)
