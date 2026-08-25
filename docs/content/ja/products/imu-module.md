---
title: IMU 高精度慣性航法モジュール
description: 鉅犀科技 IMU 高精度慣性航法モジュール——100Hz 姿勢演算、6/9/10軸選択、IIC+シリアル双通信、ROS 統合
keywords: [imu, 慣性航法, 姿勢センサー, ahrs, ros]
---

# IMU 高精度慣性航法モジュール

> **[ストアで購入](https://www.juxitech.com/ja/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## 製品概要

高精度 IMU 姿勢センサーは 72MHz 高性能 32 ビットプロセッサを内蔵し、リアルタイム姿勢演算と動的補正を実現。データ更新周波数は最大 **100Hz**。IIC とシリアルの双通信モードに対応し、マイコンや Linux ホストと互換、ROS にシームレスに統合できます。

**バージョン選択**:

| バージョン | ジャイロ | 加速度計 | 磁力計 | 気圧計 | AHRS |
|------|--------|---------|--------|--------|------|
| 6軸 | ✅ | ✅ | - | - | - |
| 9軸 | ✅ | ✅ | ✅ | - | ✅ |
| 10軸 | ✅ | ✅ | ✅ | ✅ | ✅ |

## 仕様

| カテゴリ | 仕様 |
|------|------|
| プロセッサ | 72MHz 32 ビット |
| データ周波数 | デフォルト 25Hz、10~100Hz 可変 |
| 通信 | IIC(100KHz)/ シリアル(115200bps) |
| 出力 | 3軸加速度/角速度/オイラー角/磁力計/気圧/温度/クォータニオン |
| 動作電圧 | 5V または 3.3V、11mA |
| サイズ・重量 | 27.4×22.6×12mm、3.8g |
| 動作温度 | -40°C ~ +85°C(保管 -40°C ~ +100°C) |
| 耐衝撃性 | 20kg(裸基板) |
| ROS | ROS1 / ROS2 |

## クイックスタート
```bash
# ROS2 启动
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data

# 校准(首次使用)
python3 imu_calibration_tool.py --mode serial --port /dev/ttyUSB0
```
## 関連チュートリアル

- [IMU モジュール紹介](/ja/tutorials/sensors/imu/product-info)
- [IMU キャリブレーションガイド](/ja/tutorials/sensors/imu/calibration)
- [IMU ROS2 アプリ](/ja/tutorials/sensors/imu/ros-examples/ros2)
- [IMU マルチボード通信例](/ja/tutorials/sensors/imu/multi-board-examples/overview)

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
