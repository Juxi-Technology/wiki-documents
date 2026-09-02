---
title: AmazingHand オープンソース 4指器用ハンド
description: 鉅犀科技 AmazingHand オープンソース 4指器用ハンド、TTLバス制御、オープンCAD、具身知能・HRI研究
keywords: [amazinghand, 器用ハンド, dexterous hand, 具身知能]
---

# AmazingHand オープンソース 4指器用ハンド

> **[ストアで購入](https://www.juxitech.com/ja/products/amazinghand)**

## 製品概要

AmazingHand は鉅犀科技がオープンソースで提供する4指器用ハンドです。多関節設計で、TTLシリアルバス制御に対応。オープンCADファイルで指の設計を自由にカスタマイズでき、器用操作、把持戦略、人とロボットのインタラクション(HRI)研究に広く使われています。

**主な特長**:

- 4指多関節、人間の手に近い比率
- TTLシリアルバス制御、主要コントローラと互換
- オープンCAD/ソース、カスタム改造対応
- SO-ARM101 と組み合わせて完全な操作プラットフォームを構築
- リアルタイムハンドトラッキング：Webカメラでジェスチャを追跡し、ハンドをリアルタイム制御
- シミュレーションデモ：ハードウェアなしでハンドトラッキングデモを実行（dora-rsエコシステム）
- 指角度制御：各指の角度を個別制御、左右/両手対応
- 電源：サーボドライバボード 5V3A、USBでホストに接続

## 仕様

| カテゴリ | 仕様 |
|------|------|
| タイプ | 4指器用ハンド |
| 制御 | TTLシリアルバス |
| エコシステム | Python SDK, ROS |
| オープンソース | CAD/ソースをGitHubで公開 |

## クイックスタート

```bash
git clone https://github.com/Juxi-Technology/AmazingHand.git
cd AmazingHand
pip install -r requirements.txt
python examples/basic_control.py
```

## 関連チュートリアル

- [AmazingHand インターフェース制御](/ja/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [AmazingHand 公式サンプル実行](/ja/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
- [AmazingHand TTL デバッグ](/ja/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
