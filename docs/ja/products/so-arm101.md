---
title: SO-ARM101 開発キット
description: 6-DOF オープンソース双腕ロボット、LeRobotエコシステム、遠隔操作対応
keywords: [so-arm101]
---

# SO-ARM101 開発キット

> **[ストアで購入](https://www.juxitech.com/ja/products/so-arm101-developers-kit)**

## 概要

LeRobot に深く統合された 6-DOF 双腕ロボット開発キット。leader-follower 遠隔操作、模倣学習データ収集、ポリシー訓練に対応。

## 仕様

| カテゴリ | 仕様 |
|------|------|
| タイプ | 双腕遠隔操作ロボット |
| 自由度 | 各腕 6 DOF |
| 駆動 | Feetech バスサーボ |
| ホスト | PC (Linux) / Jetson |
| エコシステム | LeRobot, ROS 2 |

## クイックスタート

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

---

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
