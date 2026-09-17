---
title: "選定ガイド"
description: "SO-ARM101 vs AmazingHand vs Lekiwi 比較と選定アドバイス"
keywords: [選定, robot arm, 比較]
---

# 選定ガイド

Juxi Technology は複数のロボットアーム製品を提供しています。用途に合ったモデルを選ぶための比較ガイドです。

> 注: 詳細な仕様は各製品の公式ドキュメントを参照してください。この表は選定の参考用です。

## 3 製品比較

| 特徴 | SO-ARM101 | AmazingHand | Lekiwi |
|------|-----------|-------------|--------|
| **タイプ** | 双腕テレオペレーション | 器用ハンド | 低コスト教学アーム |
| **自由度** | 各腕 6 DOF | 5 指多関節 | 6 DOF |
| **制御** | LeRobot / Python API | TTL シリアルバス | サーボ制御 |
| **ホストプラットフォーム** | PC (Linux) / Jetson | コントローラーボード | PC / MCU |
| **用途** | AI 模倣学習、テレオペ研究 | 把持、ジェスチャー再現 | 教育、初心者学習 |
| **オープンソース** | [LeRobot](https://github.com/Juxi-Technology/lerobot) | [AmazingHand](https://github.com/Juxi-Technology/AmazingHand) | 公式ドキュメント |
| **こんな方におすすめ** | 研究者、AI 開発者 | マニピュレーション研究者 | 学生、メーカー |

## 選び方

### 🎓 学生・初心者 → Lekiwi

- シンプルな構造で低コスト — 教室での授業や入門に最適
- 直感的なサーボ制御

### 🤖 把持・マニピュレーション研究 → AmazingHand

- 把持戦略やジェスチャー制御の研究向け 4 指器用ハンド
- TTL シリアルバス制御、主流コントローラーと互換

### 🧠 AI 模倣学習・テレオペレーション → SO-ARM101

- リーダー・フォロワー方式のテレオペレーションを備えた双腕設計
- LeRobot エコシステムと深く統合、模倣学習に最適
- Jetson 対応で AI ワークフローをシームレスに実現

## おすすめの組み合わせ

| ニーズ | おすすめ構成 |
|------|-------------------|
| AI テレオペ研究 | SO-ARM101 + AmazingHand(器用なマニピュレーション) |
| 教学ラボ | Lekiwi 複数台 |
| フルロボットシステム | SO-ARM101 + IMU モジュール + ビジョンアクセサリー |

## 関連チュートリアル

- [SO-ARM101 チュートリアル](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [AmazingHand インターフェース制御](/ja/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Lekiwi チュートリアル](/ja/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial)

## サポート

- 📧 Email: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
