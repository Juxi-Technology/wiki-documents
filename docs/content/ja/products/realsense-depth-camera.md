---
title: 3D RealSense 深度カメラ
description: 鉅犀科技 3D RealSense 深度カメラ——D435i/D405/D405CB の 3 モデル、高精度深度知覚、XLeRobot と SO-ARM101 に対応
keywords: [realsense, depth camera, 深度カメラ, 3d vision, 深度知覚, ロボットビジョン]
---

# 3D RealSense 深度カメラ

> **[ストアで購入](https://www.juxitech.com/ja/products/3d-realsense-depth-camera)**

## 製品概要

3D RealSense 深度カメラは高性能な視覚知覚デバイスで、**D435i、D405、D405CB** の 3 モデルを提供。顔分析、拡張現実、物体追跡、3D スキャンなどのアプリに対応し、具身知能開発シーンに特化して最適化されています。

**主な特長**:

- 3 モデルから選択、遠近距離と精度のニーズをカバー
- 高精度深度マップ、RGB 画像、赤外線画像を出力(D435i は IMU データも)
- 具身知能向け最適化:自律ナビゲーション、物体認識、対話操作
- **XLeRobot** と **SO-ARM101** ロボットプラットフォームに対応(オプション)、プラグアンドプレイ

## モデル比較

| モデル | 適用距離 | 適用シーン |
|------|---------|---------|
| **D435i** | 中遠距離 | 移動ロボットナビゲーション、環境 3D 再構築 |
| **D405** | 近距離高精度 | ロボットアーム把持、近距離物体認識 |
| **D405CB** | 近距離(D405 強化版) | 複雑な環境、低照度条件、より高精度 |

## 製品仕様

| カテゴリ | 仕様 |
|------|------|
| 選択モデル | D435i / D405 / D405CB |
| コア機能 | 顔分析、拡張現実、物体追跡、3D スキャン、具身知能視覚知覚 |
| 対応プラットフォーム | XLeRobot / SO-ARM101(オプション) |
| 出力データ | 深度マップ、RGB 画像、赤外線画像、IMU データ(D435i) |
| 適用シーン | ロボット開発、AI 研究、3D 再構築、産業検査、AR/VR、具身知能 |

## クイックスタート

### 1. ドライバインストール
```bash
# Ubuntu 22.04 (X86 / Jetson)
pip install pyrealsense2
```
### 2. デバイスの確認
```bash
rs-enumerate-devices
```
接続された RealSense カメラとそのモデルが表示されるはずです。

### 3. 基本サンプル
```python
import pyrealsense2 as rs
import numpy as np
import cv2

# 创建管道
pipeline = rs.pipeline()
config = rs.config()
config.enable_stream(rs.stream.depth, 640, 480, rs.format.z16, 30)
config.enable_stream(rs.stream.color, 640, 480, rs.format.bgr8, 30)

# 开始
pipeline.start(config)

try:
    while True:
        frames = pipeline.wait_for_frames()
        depth = frames.get_depth_frame()
        color = frames.get_color_frame()
        if not depth or not color:
            continue
        depth_image = np.asanyarray(depth.get_data())
        color_image = np.asanyarray(color.get_data())
        cv2.imshow('Color', color_image)
        cv2.imshow('Depth', depth_image * 80)  # 深度可视化
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
finally:
    pipeline.stop()
    cv2.destroyAllWindows()
```
### 4. LeRobot 環境統合

SO-ARM101 / XLeRobot プロジェクトでの使用:
```bash
# 查找相机 ID
python -m lerobot.find_cameras realsense

# 遥操作时启用 RealSense
lerobot-teleoperate \
  --robot.cameras='{ front: {type: realsense} }' \
  ...
```
## 応用シーン

| シーン | 説明 |
|------|------|
| **顔分析** | 顔認識、表情認識、顔属性分析 |
| **拡張現実** | AR オーバーレイ、空間位置決め、3D レジストレーション |
| **物体追跡** | 物体検出、追跡、カウント |
| **3D スキャン** | 3D モデル再構築、体積測定、寸法検査 |
| **具身知能** | 環境知覚、障害物回避、対話操作 |

## よくある質問

**Q: モデルの選び方は?**

**A:**

- 移動ロボットナビゲーション/環境再構築 → D435i(中遠距離、IMU 搭載)
- ロボットアーム把持/近距離認識 → D405(超コンパクト高精度)
- 低照度/複雑な環境 → D405CB(D405 強化版)

**Q: Jetson に対応しますか?**

**A:** はい。pyrealsense2 は Jetson プラットフォームに直接インストール可能で、SO-ARM101 チュートリアルの LeRobot フローと互換です。

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
- 💬 [問題フィードバック](https://github.com/Juxi-Technology/wiki-documents/issues)
