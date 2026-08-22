---
title: ロボットアーム選定ガイド
description: SO-ARM101 vs AmazingHand vs Lekiwi 比較と選定アドバイス
keywords: [選定, robot arm, 比較]
---

# ロボットアーム選定ガイド

Juxi Technology は複数のロボットアーム製品を提供しています。用途に合ったモデルを選ぶための比較ガイドです。

## 3 製品比較

| 特徴 | SO-ARM101 | AmazingHand | Lekiwi |
|------|-----------|-------------|--------|
| **タイプ** | 双腕テレオペレーション | 器用ハンド | 低コスト教学アーム |
| **自由度** | 各腕 6 DOF | 5 指多関節 | 6 DOF |
| **制御** | LeRobot / Python API | TTL シリアルバス | サーボ制御 |
| **用途** | AI 模倣学習、テレオペ研究 | 把持、ジェスチャー | 教育、入門 |
| **オープンソース** | [LeRobot](https://github.com/Juxi-Technology/lerobot) | [AmazingHand](https://github.com/Juxi-Technology/AmazingHand) | 公式ドキュメント |

## 選び方

- 🎓 学生/教育 → **Lekiwi**(低コスト、シンプル)
- 🤖 把持研究 → **AmazingHand**(5 指、TTL 制御)
- 🧠 AI 研究 → **SO-ARM101**(LeRobot 深統合、Jetson 対応)