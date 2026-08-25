---
title: IMU キャリブレーションガイド
description: Juxi Technology 高精度 IMU モジュールのキャリブレーション — 全体/磁力計/温度、UART と I2C 両対応
keywords: [imu, キャリブレーション, 磁力計]
---

# IMU キャリブレーションガイド

> **[ストアで購入](https://www.juxitech.com/ja/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


> 初回使用前にキャリブレーションを推奨。公式 `IMU_Library` の `imu_calibration_tool.py` を使用します。

## キャリブレーションの種類

| タイプ | 説明 |
|--------|------|
| **全体** (`imu`) | 加速度計 + ジャイロ + 磁力計 |
| **磁力計** (`mag`) | 環境磁場の干渉除去 |
| **温度** (`temp`) | 温度ドリフト補償 |

## シリアル通信

```bash
cd ~/IMU_Library/IMU_Library
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp
```

## I2C 通信

```bash
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag
```

## コツ

- 磁力計: 水平にゆっくり回転し全方向をカバー
- 全体キャリブレーション中は完全静止
- モーター・磁石から離す

## 関連

- [IMU モジュール紹介](/ja/products/imu-module)