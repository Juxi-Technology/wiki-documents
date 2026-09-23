---
title: JetPack 7.2 のロボティクス — 今すぐ使えるもの
sidebar_label: ロボティクス(現状)
slug: /tutorials/robotics
description: >-
  JetPack 7.2 を搭載した AGX Orin 開発キットでロボティクス開発を行うための、正直な現状を
  まとめたページです——ROS 2、Isaac ROS の提供状況、ロボット学習スタック、そして
  エコシステムが追いつくまでの間に何を使うべきかを解説します。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
review_owner: cheny
---

# JetPack 7.2 のロボティクス — 今すぐ使えるもの

JetPack 7.2 は Orin を新しいプラットフォーム世代(Ubuntu 24.04、カーネル 6.8、
CUDA 13)へと移行させました。ロボティクスは、*エコシステム* が依然として
プラットフォームに追いつこうとしている領域です——そのため本ページは意図的に
チュートリアルではなく現状説明ページとしています。アーキテクチャを確定する前に
ご確認ください。

## ステータス表(2026-09-24 確認)

| 必要なもの | JetPack 7.2 / AGX Orin での状態 | 備考 |
|---|---|---|
| **ROS 2(コア)** | ✅ 利用可能です | Ubuntu 24.04 は ROS 2 **Jazzy** のターゲットプラットフォームです。導入は [ROS 2 インストールドキュメント](https://docs.ros.org/en/jazzy/Installation.html) に従ってください。Docker ベースの ROS 2 も選択肢です。 |
| **Isaac ROS**(ハードウェアアクセラレーションされた ROS 2 パッケージ) | ⛔ **未提供——NVIDIA は JetPack 7 向けに「近日公開」と記載** | これが最大のギャップです。Isaac ROS が現在クリティカルパスにある場合は、当面 **JetPack 6.x** を使い続け、リリースについては NVIDIA の[ダウンロードページ](https://developer.nvidia.com/embedded/jetpack/downloads) を確認してください。 |
| **ローカル LLM / VLM / VLA モデル** | ✅ 利用可能です | TensorRT Edge-LLM は JP7.2 上の Orin を正式にサポートしており、**Vision-Language-Action** のサンプルも含まれます——[ローカル LLM 推論](/ja/tutorials/jetson-agx-orin/local-llm)をご覧ください。 |
| **マルチカメラ映像パイプライン** | ✅ 利用可能です | DeepStream 9.1 は JP7.2 に同梱されています——[DeepStream ビデオ分析](/ja/tutorials/jetson-agx-orin/deepstream)をご覧ください。 |
| **エージェント的行動 / オーケストレーション** | ✅ 利用可能です | NemoClaw + Jetson エージェントスキル——[エージェント AI](/ja/tutorials/jetson-agx-orin/agentic-ai)をご覧ください。 |
| **ロボット学習スタック(LeRobot スタイルの Python フレームワーク)** | ⚠️ 採用前に必ず検証してください | こうしたスタックは Python への依存度が高く、Ubuntu 24.04 では Python 3.12 に移行したため、一部の依存関係が追随できていない可能性があります。それを前提に設計する前に、JP7.2 上でお使いのスタックをテストしてください——また、**当社はハードウェア上での検証を行っていない**点にご注意ください。 |
| **GR00T(ヒューマノイド基盤モデル)** | ⚠️ 公式情報を確認してください | プラットフォーム対応については、NVIDIA 公式の Isaac GR00T リポジトリと発表を追ってください。パートナーが公開したウォークスルーでは、AGX Orin + JP7.2 でのフルウェイトの TensorRT デプロイが報告されています*(第三者の情報であり、当社は検証していません)*。 |
| **カスタムキャリアボード / BSP 作業** | ✅ 新しいツール | JetPack 7.2 の **Jetson Linux カスタマイズ用エージェントスキル** が BSP の立ち上げ作業を自動化します——[エージェントスキルリポジトリ](https://github.com/jetson-bsp-skills)をご覧ください。 |

## 推奨

- **Isaac ROS に依存しない新規プロジェクト:** JetPack 7.2 を基盤にしてください——
  Ubuntu 24.04 LTS のサポート、CUDA 13、DeepStream 9.1、オンデバイス LLM、
  そしてエージェントツール群が利用できます。
- **現在 Isaac ROS に依存しているプロジェクト:** 当面は JetPack 6.x で計画してください。
  Isaac ROS が JP7.x 向けにリリースされたら、JP7.x を移行先として扱ってください
  (その日が来たときの再構築作業は、当社の[移行ガイド](/ja/tutorials/jetson-agx-orin/jetpack-6-to-7)で
  扱っています)。
- **1 台のキットで多数のモジュール:** 開発キットは再書き込みによって他の
  Jetson Orin モジュールをエミュレートできることを覚えておいてください——
  量産部品を選定する前に、モジュールラインナップ全体にわたってロボットの
  ワークロードを検証するのに便利です([製品概要](/ja/tutorials/jetson-agx-orin/overview))。

## 参考資料

- [JetPack 7.2.1 ダウンロードページ — Isaac ROS は JetPack 7 向けに「近日公開」](https://developer.nvidia.com/embedded/jetpack/downloads)(2026-09-24 確認)
- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html)(モジュールエミュレーション;2026-09-24 確認)
- [ROS 2 Jazzy インストールドキュメント](https://docs.ros.org/en/jazzy/Installation.html)

*ステータス: ドラフト、cheny によるレビュー待ち。エコシステムの可用性は急速に変化します——
この表に依拠する前に、リンク先の NVIDIA ページを再確認してください。Juxi Technology
による実機での検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
