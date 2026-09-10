---
title: SO-ARM101 ロボットアームビジョンキット
category: robot
description: Juxi Technology SO-ARM101 ロボットアームビジョンキット——手首/側面/真上 3 視点取付、60FPS 固定焦点または 30FPS オートフォーカスズームカメラ、ACT/Smolvla/Pi0/GR00T トレーニングフレームワーク対応
keywords: [camera mount, ビジョンキット, カメラマウント, so-arm101, ロボットアームビジョン]
---

# SO-ARM101 ロボットアームビジョンキット

> **[ストアで購入](https://www.juxitech.com/ja/products/so-arm101-wrist-camera-mount)**

## 製品概要

SO-ARM101 ロボットアームビジョンキットは、ロボットアーム向けに設計されたカメラアクセサリです。2 種類のカメラから選択可能:**60FPS 固定焦点**と**30FPS オートフォーカスズーム**。SO-ARM101、LeKiwi、XLerobot プラットフォームに対応し、**ACT、Smolvla、Pi0、Pi0.5、GR00T N1.5** などの主要な具身知能トレーニングフレームワークと互換です。

**主な特長**:

- 3 つの取付位置:**手首 / 側面 / 真上**
- デュアルカメラ選択:60FPS 固定焦点(高速モーションキャプチャ)/ 30FPS オートフォーカスズーム(柔軟なビジョン開発)
- SO-ARM101 に完全適合、追加改造不要
- 滑り止めクランプパッド付属

## 製品仕様

| カテゴリ | 仕様 |
|------|------|
| 対応プラットフォーム | SO-ARM101、LeKiwi、XLerobot、M3 取付穴互換プラットフォーム |
| 取付位置 | 手首 / 側面 / 真上 |
| カメラ選択 | 60FPS 固定焦点 / 30FPS オートフォーカスズーム |
| トレーニングフレームワーク互換 | ACT、Smolvla、Pi0、Pi0.5、GR00T N1.5 |

## カメラ比較

| カメラ | 用途 |
|------|---------|
| **60FPS 固定焦点** | 高フレームレート、安定した鮮明な画像、高速モーションキャプチャ、固定距離ビジョン |
| **30FPS オートフォーカスズーム** | 焦点距離を柔軟に調整、可変距離ビジョン |

## クイックスタート

### 1. 取付位置の選択

- **手首**:把持操作の視点(把持タスクに推奨)
- **側面**:グローバル環境の視点
- **真上**:デスクトップ操作の俯瞰視点(データ収集に適)

### 2. 取付

カメラモジュールを対応するマウントに固定し、USB でホスト(Jetson/Raspberry Pi)に接続。

### 3. トレーニングフレームワーク連携

LeRobot データ収集を例に:

```bash
# 查找相机
python -m lerobot.find_cameras

# 采集带视觉数据
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0, width: 640, height: 480} }' \
  --dataset.repo_id=juxi/vision_test \
  --dataset.num_episodes=50
```
## よくある質問

**Q: カメラの選び方は?**

**A:** 高速モーションキャプチャ(把持など)は 60FPS 固定焦点、可変距離ビジョン開発は 30FPS オートフォーカスズームを。

**Q: 対応トレーニングフレームワークは?**

**A:** ACT、Smolvla、Pi0、Pi0.5、GR00T N1.5。主要な具身知能モデルトレーニングフレームワークを網羅。

**Q: 他のロボットアームでも使えますか?**

**A:** SO-ARM101、LeKiwi、XLerobot、その他 M3 取付穴互換プラットフォーム。

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
- 💬 [問題フィードバック](https://github.com/Juxi-Technology/wiki-documents/issues)
