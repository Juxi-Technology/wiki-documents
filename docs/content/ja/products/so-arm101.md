---
title: SO-ARM101 開発キット
category: robot
description: Juxi Technology SO-ARM101 双腕ロボット開発キット——6 DOF オープンソース機械腕、LeRobot エコシステム、遠隔操作/模倣学習/AI 研究の第一候補
keywords: [so-arm101, 機械腕, leRobot, 遠隔操作, 双腕ロボット]
---

# SO-ARM101 開発キット

> **[ストアで購入](https://www.juxitech.com/ja/products/so-arm101-developers-kit)**

## 製品概要

SO-ARM101 はJuxi Technologyがオープンソースで提供する 6-DOF 双腕ロボット開発キットです。**LeRobot** エコシステムに深く統合され、leader-follower 遠隔操作、模倣学習データ収集、ポリシー訓練に対応します。黒色のリーダーアーム + 白色のフォロワーアームで、開封後すぐに使用可能です。

**主な特長**:

- 両腕各 6 DOF、バスサーボ駆動
- LeRobot(HuggingFace)に深く対応、ACT/Diffusion/Pi0 などのポリシーをサポート
- Jetson / PC(Linux)プラットフォーム対応
- ハードウェア完全オープンソース(回路図/CAD/ファームウェア)

## 仕様

| カテゴリ | 仕様 |
|------|------|
| タイプ | 双腕遠隔操作ロボット |
| 自由度 | 各腕 6 DOF |
| 駆動 | Feetech バスサーボ |
| ホスト | PC (Linux) / Jetson |
| エコシステム | LeRobot, ROS 2, ROS 1 |
| 電源 | リーダー 5V6A / フォロワー 12V5A |
| ペイロード | 500g |
| 繰り返し位置決め精度 | ±0.1mm |
| 作業半径 | 520mm |
| 通信方式 | USB-C |

## クイックスタート

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## 関連チュートリアル

- [SO-ARM101 チュートリアル](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [SO-ARM101 組み立てチュートリアル](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [ロボットアーム選定ガイド](/ja/tutorials/robot-arms/select-guide)
- [具身知能入門(LeRobot)](/ja/topics/embodied-ai-intro)

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
