---
title: IMU 慣性モジュール
description: 100Hz 姿勢解算、6/9/10軸、IIC+UART、ROS対応
keywords: [imu-module]
---

# IMU 慣性モジュール

> **[ストアで購入](https://www.juxitech.com/ja/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## 概要

72MHz 32ビットプロセッサ搭載の高精度 IMU。最大100Hz の姿勢データ、IIC/シリアル双通信、ROS 統合。

## 仕様

| カテゴリ | 仕様 |
|------|------|
| データレート | デフォルト 25Hz、10~100Hz |
| インターフェース | IIC (100KHz) / UART (115200bps) |
| 電圧 | 5V または 3.3V、11mA |
| サイズ | 27.4×22.6×12mm、3.8g |
| ROS | ROS1 / ROS2 |

## クイックスタート

```bash
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data
```

---

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
