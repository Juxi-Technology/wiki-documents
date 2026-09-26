---
title: よくある質問(FAQ)
sidebar_label: FAQ
slug: /support/faq
description: >-
  NVIDIA Jetson AGX Orin 開発キット(64GB)に関するよくある質問 —
  同梱物、セットアップ、ディスプレイと電源、ソフトウェア、サポート。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 / component versions per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# よくある質問(FAQ)

## セットアップ

**同梱物は何ですか?**
Jetson AGX Orin モジュールとリファレンスキャリアボード、Wi-Fi モジュール、USB
Type-C 電源アダプタ、および USB Type-C - USB Type-A ケーブルです。ディスプレイ
(DisplayPort)、キーボードとマウス、任意でイーサネットケーブルは別途ご用意ください
— [クイックスタート](/ja/tutorials/jetson-agx-orin/quick-start)を参照してください。

**オペレーティングシステムは付属していますか?**
はい — eMMC にはあらかじめ書き込まれており、キットはそのまま Ubuntu デスクトップへ
起動します。出荷される製品には古い L4T バージョンが搭載されている場合があります。
推奨の更新方法は Jetson ISO(ホスト PC 不要)です —
[クイックスタート](/ja/tutorials/jetson-agx-orin/quick-start)を参照してください。

**セットアップに別途 PC は必要ですか?**
いいえ、推奨の方法では必要ありません — Jetson ISO は USB メモリからインストール
します。ホスト PC(Ubuntu)が必要になるのは、代替のインストール方法(SDK
Manager / 書き込みスクリプト)を使う場合、またはヘッドレスでの初回セットアップを
行う場合だけです —
[書き込みと更新](/ja/tutorials/jetson-agx-orin/flashing-and-updates)を参照してください。

**現在のソフトウェアバージョンは何ですか?**
JetPack **7.2.1**(Jetson Linux **39.2.1**、Ubuntu 24.04、CUDA 13.2.2、
TensorRT 10.16.2)です。お使いのキットが動作しているバージョンは
[システムの確認](/ja/tutorials/jetson-agx-orin/verify-your-system)で確認してください。

## ディスプレイと電源

**HDMI モニターを接続できますか?**
**アクティブ**な DisplayPort→HDMI アダプタまたはケーブルを介した場合のみ可能です
— キットの出力は DisplayPort のみで(HDMI ポートはなく、DP-over-USB-C にも
対応していません)。MST に対応しており、最大 2 台のディスプレイを接続できます。
詳細:[インターフェースとハードウェアレイアウト](/ja/tutorials/jetson-agx-orin/interfaces)。

**キットへの電源供給はどうすればよいですか?**
付属の USB-C 電源アダプタを、DC ジャック(J24)の上にある USB-C ポートに接続します。
バレルジャック(J41)からご自身で電源を供給する場合:外形 5.5 mm、内径 2.5 mm、
センタープラスです。

## キットの使用

**この開発キットは他の Jetson モジュールをエミュレートできますか?**
はい。開発キットはすべての Jetson Orin モジュールと同一の SoC アーキテクチャを
共有しており、再書き込みによって AGX Orin、Orin NX、Orin Nano の性能と消費電力の
特性をエミュレートできます。出荷時は AGX Orin シリーズ向けに設定されています。

**量産製品ではこのモジュールを使うことになりますか?**
いいえ。量産製品は、自社またはパートナー製のキャリアボードに搭載された Jetson
Orin **モジュール**(64 GB / 32 GB / 産業用)をベースに構築されます。開発キットは
開発とプロトタイピングのためのプラットフォームです。

**大規模言語モデル / エージェント型 AI を実行できますか?**
はい — これは Orin プラットフォームの中心的なユースケースです。JetPack 7.2 では、
NVIDIA NemoClaw を開発キット上に 1 つのコマンドでインストールでき、ローカルおよび
クラウドのモデルオーケストレーションに利用できます。また、
[Jetson AI Lab](https://www.jetson-ai-lab.com) では実践的なチュートリアルが
公開されています。

**ロボティクス関連:JetPack 7.2 で Isaac ROS は利用できますか?**
はい — Isaac ROS はリリース **4.6.0**(2026-08-18)以降、JetPack 7.2 上の
Jetson Orin をサポートしており、公式の AGX Orin セットアップウォークスルーも
提供されています。なお、NVIDIA の JetPack ダウンロードページには依然として
「近日公開」と表示されています:Isaac ROS は JetPack とは独立してリリースされる
ため、Isaac ROS 自身のリリースノートが優先されます。バージョンと ROS 2
ディストリビューションの選択(4.6.x = Jazzy、5.0 = Lyrical)、および既知の
制約については、[ロボティクス(現状)](/ja/tutorials/jetson-agx-orin/robotics)を
参照してください。

## サポートとサービス

**技術的なサポートはどこで受けられますか?**
- プラットフォームに関する質問:[NVIDIA Jetson 開発者フォーラム](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — まず検索してください。質問には `cat /etc/nv_tegra_release` の出力を添えてください。
- Juxi Technology テクニカルサポート:**support@juxitech.com**
- 注文・保証・RMA:**support@juxitech.com**(迅速に対応するため、注文番号を添えてください)
- 販売・見積もり:**sales@juxitech.com**
- 製品に関する質問(選定・互換性):**pe@juxitech.com**

**アクセサリー(NVMe ストレージ、カメラ、電源)はどこで入手できますか?**
Juxi Technology の製品カタログ
**<https://wiki.juxitech.com/products/>** をご覧ください — Jetson 関連のアクセサリー
として、[IMX219 CSI カメラ](https://wiki.juxitech.com/products/imx219-csi-camera)
(NVIDIA Jetson 向けに設計)、USB オートフォーカスカメラ、
[RealSense 深度カメラ](https://wiki.juxitech.com/products/realsense-depth-camera)
などが掲載されています。選定のご相談は sales@juxitech.com までお問い合わせください。

## 参考資料

- Jetson AGX Orin Developer Kit User Guide — [はじめに](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html)、[クイックスタート](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html)(2026-09-23 に確認)
- [JetPack SDK ダウンロード](https://developer.nvidia.com/embedded/jetpack/downloads)(2026-09-23 に確認)

*ステータス: ドラフト、cheny によるレビュー待ち。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology
によって公開されており、NVIDIA の公式出版物ではありません。
