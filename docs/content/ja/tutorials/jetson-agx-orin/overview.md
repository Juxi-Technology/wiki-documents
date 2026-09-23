---
title: 製品概要 — Jetson AGX Orin 開発キット
sidebar_label: 製品概要
slug: /product/overview
description: >-
  NVIDIA Jetson AGX Orin 開発キット(64GB)とは何か、何に使われるのか、
  Jetson Orin ラインナップの中でどのような位置づけにあるのかを説明します。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
todo: add full module specification table from NVIDIA's official data sheet
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/
    checked: 2026-09-23
review_owner: cheny
---

# 製品概要

![Jetson AGX Orin 開発キット](/images/jetson-agx-orin/jaodk_1024px.png)

NVIDIA® Jetson AGX Orin™ 開発キットは、Jetson Orin ファミリーのフラッグシップ開発キットです。エッジにおいてロボティクス、コンピュータビジョン、生成 AI アプリケーションを開発・プロトタイピングするためのコンパクトな AI コンピュータです。本ガイドでは **64GB** 版の開発キットを扱います。

## 主要な事実(NVIDIA 公式ドキュメントで確認済み)

- 開発キットは**すべての Jetson Orin モジュールと同一の SoC アーキテクチャを共有**しているため、再書き込みによって AGX Orin、Orin NX、Orin Nano モジュールの**性能と消費電力をエミュレート**できます。出荷時はデフォルトで **Jetson AGX Orin シリーズ**向けに設定されています。*(Developer Kit User Guide)*
- NVIDIA は AGX Orin モジュールファミリーの AI 性能を**最大 275 TOPS** と公表しており、消費電力は **15W～60W** の間で設定できます。*(NVIDIA 製品ページ)*
- 64GB モジュールの GPU は、**2048 コアの NVIDIA Ampere アーキテクチャ GPU で、64 基の Tensor コアを搭載**しています。*(NVIDIA 製品ページ、比較表)*
- 付属のリファレンスキャリアボードは、DisplayPort、10GBASE-T Ethernet、USB 3.2、M.2(NVMe および Wi-Fi)、40 ピンヘッダー、PCIe、カメラコネクタなどの標準インターフェースを備えています。詳細は**[インターフェースとハードウェアレイアウト](/ja/tutorials/jetson-agx-orin/interfaces)**をご覧ください。

## 開発キットの用途

- **開発とプロトタイピング**——最終的に本番環境の Jetson Orin モジュールで動作するアプリケーションのリファレンスプラットフォームです。
- **性能と消費電力の検討**——他の Orin モジュールをエミュレートできるため、量産部品の採用を決める前に、1 台のキットでモジュールラインナップ全体にわたってワークロードをテストできます。
- **エッジ AI ワークロード**——コンピュータビジョン、ロボティクス、ローカル生成 AI(拡充中のチュートリアルセクションをご参照ください)。

> **Juxi 注記:** 量産製品は、自社またはパートナー製のキャリアボードに搭載された Jetson Orin *モジュール*(64GB / 32GB / 産業用)をベースに構築されます。開発キットは開発用のプラットフォームであり、量産部品ではありません。

## 同梱物

Jetson AGX Orin モジュールとリファレンスキャリアボード、Wi-Fi モジュール、USB Type-C 電源アダプター、USB Type-C to USB Type-A ケーブル。ご自身で用意する必要があるものについては、**[クイックスタート](/ja/tutorials/jetson-agx-orin/quick-start)**をご覧ください。

## 次のステップ

- **[クイックスタート](/ja/tutorials/jetson-agx-orin/quick-start)**——箱を開けてから、JetPack 7.2.1 が動作するシステムを構築するまで
- **[インターフェースとハードウェアレイアウト](/ja/tutorials/jetson-agx-orin/interfaces)**——すべてのポートとコネクタ
- **[ダウンロード](/ja/tutorials/jetson-agx-orin/downloads)**——公式イメージ、ツール、ドキュメントへのリンク *(ページ準備中)*

## 参考資料

- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html)(2026-09-23 確認)
- [NVIDIA Jetson Orin 製品ページ](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/)(2026-09-23 確認)

*ステータス:ドラフト、cheny によるレビュー待ち。完全なモジュール仕様表は NVIDIA 公式データシートから追加される予定です。それまでは、仕様に関する正式な情報源を NVIDIA 製品ページとして扱ってください。*

**画像クレジット:** 製品画像は NVIDIA 公式の *Jetson AGX Orin Developer Kit User Guide* より(2026-09-23 ダウンロード)、© NVIDIA Corporation。

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
