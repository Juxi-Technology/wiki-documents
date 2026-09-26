---
title: 製品概要 — Jetson Orin Nano Super Developer Kit
sidebar_label: 製品概要
slug: /product/overview
description: >-
  NVIDIA Jetson Orin Nano Super Developer Kit (8GB)とは何か、何に使われるのか、
  Jetson Orin ファミリーの中でどのような位置づけにあるのかを説明します。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# 製品概要

![Jetson Orin Nano Super Developer Kit](/images/jetson-orin-nano/jetson-orin-nano-super-developer-kit-hero.jpg)

NVIDIA® Jetson Orin Nano™ Super Developer Kit は、Jetson Orin ファミリーのエントリーキットです。エッジにおいてコンピュータビジョン、ロボティクス、ローカル生成 AI アプリケーションをプロトタイピングするための小型 AI コンピューターです。このキットの現行リリースである JetPack 7.2.1(Jetson Linux / L4T r39.2.1)で動作します。

## 主要な事実(NVIDIA 公式ドキュメントで確認済み)

- 「Super」は新しいハードウェアではなく、ソフトウェア構成です:以前の「Jetson Orin Nano Developer Kit」と同じモジュール(P3767)とキャリアボード(P3768)を、Super アップデートで改名したものです。*(Developer Kit User Guide、NVIDIA Super Boost 発表)*
- キットの主要な数値:最大 **67 INT8 TOPS**、最大 **102 GB/s** のメモリ帯域幅、電力 **7W～25W**、前世代比 **1.7 倍の生成 AI** 改善。*(Developer Kit User Guide — Introduction)*
- **1,024 CUDA コアと 32 Tensor コア**を搭載した Ampere GPU。**6 コア Arm Cortex-A78AE** 64 ビット CPU(最大 1.7 GHz)。**8GB 128 ビット LPDDR5**。*(データシート、Jetson Orin 仕様ページ)*
- ストレージ:**モジュール裏面の microSD カードスロット**と**外部 NVMe** サポート。eMMC はなく、箱にストレージもありません。*(データシート、クイックスタート)*
- JetPack **7.2.1**(L4T **r39.2.1**、Ubuntu 24.04、カーネル 6.8、CUDA 13.2.2、TensorRT 10.16.2)を、USB メモリからの Jetson ISO 方式で実行します。サポート範囲:JetPack 6.x または 7.2/7.2.1(7.0/7.1 は Orin をサポートしませんでした)。*(クイックスタート、JetPack ダウンロード、JetPack アーカイブ)*
- キャリアボード:DisplayPort、ギガビットイーサネット、USB 3.2 Type-A ポート ×4、USB-C、MIPI CSI コネクター ×2、M.2 スロット ×3、40 ピンヘッダー。**[インターフェースとハードウェアレイアウト](/ja/tutorials/jetson-orin-nano/interfaces)** を参照。*(Developer Kit User Guide — Hardware Layout)*

## 「Super」とは何か

Super の性能向上は、同じハードウェア上で GPU、メモリ、CPU のクロックを引き上げるソフトウェアの電力モードによってもたらされます。NVIDIA は、既存のキットも JetPack をアップグレードすることで入手できると述べています:「既存の Jetson Orin Nano Developer Kit ユーザーは、ソフトウェアアップグレードで 'Super' の性能向上を得ることができます」。*(Developer Kit User Guide、NVIDIA Super Boost 発表)*

下表は、元のキットと Super 構成を比較したものです。*(NVIDIA Super Boost 発表)*

| 項目 | 元の Orin Nano Developer Kit | Super 構成 |
|---|---|---|
| GPU クロック | 635 MHz | 1,020 MHz |
| CPU クロック | 1.5 GHz | 1.7 GHz |
| メモリ帯域幅 | 68 GB/s | 102 GB/s |
| AI 性能(スパース INT8) | 40 TOPS | 67 TOPS |
| FP16 演算 | 10 TFLOPs | 17 TFLOPs |
| 電力モード | 7W、15W | 7W、15W、25W |
| 価格(Super 発売時、2024 年 12 月) | $499 | $249 |

*1 つの数値について、NVIDIA 自身の資料が食い違っています:Super 発表は以前のメモリ帯域幅を "65 GB/s" と記述していますが、NVIDIA のモジュール仕様表は元の 8 GB 構成について 68 GB/s と記載しています。上の表は仕様表の数値を用いています。どちらも Super 以前の同じハードウェアを指しています。*

現在の価格については、Juxi ストアの[このキットの掲載ページ](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)を参照してください(SKU JX00110)。

JetPack 7.2.1 以降、Jetson ISO はデフォルトで Super 構成でキットを書き込みます*(JetPack ダウンロードページ)*。JetPack 7.2 ISO で最初にインストールされたユニットは非 Super プロファイルを維持することがあります。25W または MAXN SUPER がない場合は **[トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)** を参照してください。

L4T r39.2 の電力モード表では、Super 構成は 15W(モード 0)、25W(モード 1、デフォルト)、MAXN SUPER(モード 2、実験的。Super 構成で書き込まれたキットのみ)を挙げています。MAXN SUPER は CPU を最大 1.7 GHz、GPU を最大 1,020 MHz、メモリコントローラーを 3,199 MHz で動作させます。モードは `sudo /usr/sbin/nvpmodel -q` で確認し、`sudo /usr/sbin/nvpmodel -m <mode_id>` で設定します。NVIDIA のキットページは「7W～25W」と記載していますが、r39.2 の表には上記 3 つのモードが記載されています — お使いのユニットを **[システムの確認](/ja/tutorials/jetson-orin-nano/verify-your-system)** で確認してください。*(L4T r39.2 Power and Performance ページ)*

## モジュール仕様

| 項目 | 仕様 |
|---|---|
| AI 性能 | Super 構成で最大 67 スパース INT8 TOPS(デンス 33) |
| GPU | NVIDIA Ampere アーキテクチャ、1,024 CUDA コア、32 Tensor コア、最大 1,020 MHz |
| CPU | 6 コア Arm Cortex-A78AE v8.2(64 ビット)、1.5MB L2 + 4MB L3、最大 1.7 GHz |
| メモリ | 8GB 128 ビット LPDDR5、102 GB/s |
| ストレージ | モジュール裏面の microSD カードスロット。外部 NVMe SSD サポート |
| ビデオデコード | 1x 4K60 (H.265)、2x 4K30、5x 1080p60、11x 1080p30 |
| ビデオエンコード | 1～2 CPU コアを使用して 1080p30(専用エンコーダーハードウェアなし) |
| AI アクセラレーター | DLA も PVA もなし — 推論は GPU の Tensor コア上で実行 |
| モジュールフォームファクター | 260 ピン SO-DIMM、69.6 mm x 45 mm |

*出典:Jetson Orin Nano Super Developer Kit データシート(2024 年 12 月)、NVIDIA Jetson Orin 仕様ページ、L4T r39.2 Power and Performance ページ。*

## 部品番号

| 部品番号 | 指すもの |
|---|---|
| P3766 | Jetson Orin Nano Developer Kit 全体 |
| P3767 | System on Module(SOM) |
| P3768 | リファレンスキャリアボード |
| P3767-0005 | 開発キットに搭載されるモジュール SKU(Jetson Orin Nano 8GB、"for development only") |

本ドキュメントシリーズは **8GB 開発キットのみ**を対象とします。商用 8GB Orin Nano モジュールは別の型番(**P3767-0003**)であり、書き込みツールでは別ターゲットになります — [書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates) のモジュール SKU に関する注記を参照してください。

## Orin ファミリーでの位置づけ

- **Jetson Orin Nano 8GB — このキット。** Orin ファミリーのエントリーポイント:67 INT8 TOPS、8GB の統合メモリ、7W～25W。
- **Jetson Orin NX。** 同じキャリアボードで Orin NX モジュールの給電、テスト、開発ができます(専用のヒートシンクとファンが必要で、新品のモジュールは SDK Manager を使って Ubuntu ホストから書き込む必要があります)。*(Developer Kit User Guide — How-To)*
- **Jetson AGX Orin — フラッグシップ層。** AGX Orin 32GB モジュールは Super Mode で 241 TOPS に達します*(JetPack 7.2 リリースハイライト)*。Juxi の [Jetson AGX Orin シリーズ](/ja/tutorials/jetson-agx-orin/quick-start)を参照してください。

計画で考慮すべき主な制約は **8GB の統合メモリ**です。DLA も PVA もないため、AI ワークロードは GPU のみで実行されます — **[メモリ効率](/ja/tutorials/jetson-orin-nano/memory-efficiency)** と **[ローカル LLM](/ja/tutorials/jetson-orin-nano/local-llm)** を参照してください。

## 開発キットの用途

- **本番へのプロトタイピング。** JetPack 7.2.1 は Orin ファミリー全体に対応するため、キット上での作業は製品に使われる Orin モジュールにも引き継がれます。*(JetPack ダウンロードページ)*
- **コンピュータビジョン。** MIPI CSI カメラコネクター ×2。DeepStream SDK 9.1 は JetPack 7.2.1 のコンポーネントマトリクスに含まれます — **[DeepStream](/ja/tutorials/jetson-orin-nano/deepstream)** を参照。
- **ローカル生成 AI。** 目玉の主張は 1.7 倍の生成 AI 改善です。8GB という上限が何を動かせるかを決めます — **[ローカル LLM](/ja/tutorials/jetson-orin-nano/local-llm)** を参照。
- **ロボティクス。** NVIDIA の担当者は JetPack 7.2.1 に ROS 2 Jazzy を推奨しています — **[ロボティクス](/ja/tutorials/jetson-orin-nano/robotics)** を参照。

> **Juxi 注記:** 量産製品は、カスタムキャリアボード上の Jetson Orin モジュール — Orin Nano
> 8GB または Orin NX — をベースに構築されます。開発キットは開発用の媒体であり、
> 量産部品ではありません。

## 同梱物

箱には開発キット(ヒートシンク付き Orin Nano 8GB モジュール、リファレンスキャリアボード搭載)、19 V 電源、付属の 802.11ac/ab/gn ワイヤレスカード、クイックスタート & サポートカードが入っています。NVIDIA は、キットに「箱にリムーバブルストレージは同梱されていません」と述べています。*(データシート、クイックスタート)*

ご自身で用意するもの:

- **ストレージ** — microSD カード(64GB、UHS-1 以上)または NVMe SSD。microSD スロットは**モジュールの裏面**にあり、電源を入れる前に挿入してください。Juxi ストアのバンドルには 64 GB の microSD カードがすでに含まれているため、NVIDIA の素の箱を受け取った場合や、代わりに NVMe SSD を使いたい場合にのみストレージを購入してください。
- **インストーラー用 USB ドライブ** — 16GB 以上。JetPack ISO はこの USB ドライブに書き込んでください。microSD カードには書き込まないでください:SD カードイメージは JetPack 7.2 で廃止されました。
- **ホストコンピューター** — 25GB 以上の空き容量があるもの。デスクトップセットアップ用の DisplayPort モニターと USB キーボード/マウス。*(クイックスタート、Supported Hardware)*

> **重要** 非常に古い工場出荷ファームウェアは先に更新する必要があります — JetPack 7.2.1 には
> JetPack 6.x 世代の UEFI/QSPI ファームウェアが必要です。**[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)**
> と **[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)** を参照してください。

## 次のステップ

- **[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)** — 箱から出して、JetPack 7.2.1 が動作するシステムまで
- **[インターフェースとハードウェアレイアウト](/ja/tutorials/jetson-orin-nano/interfaces)** — すべてのポート、スロット、コネクター
- **[ダウンロード](/ja/tutorials/jetson-orin-nano/downloads)** — 公式イメージ、ツール、ドキュメントへのリンク

## 参考資料

- [Jetson Orin Nano Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (2026-09-26 確認)
- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (2026-09-26 確認)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (2026-09-26 確認)
- [Jetson Orin Nano Developer Kit User Guide — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (2026-09-26 確認)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (2026-09-26 確認)
- [Jetson Orin Nano Developer Kit User Guide — Supported Hardware](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/supported_hardware.html) (2026-09-26 確認)
- [NVIDIA Super Boost: Jetson Orin Nano Developer Kit gets a Super boost](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (2026-09-26 確認)
- [NVIDIA JetPack 6.2 brings Super Mode to Jetson Orin Nano and Jetson Orin NX modules](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (Super 電力モードの発表としてリンク)
- [NVIDIA Jetson Orin module and developer kit spec page](https://developer.nvidia.com/embedded/jetson-orin) (2026-09-26 確認)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-26 確認)
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) (2026-09-26 確認)
- [L4T r39.2 Developer Guide — Jetson Orin NX and Orin Nano series: module adaptation and bring-up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (2026-09-26 確認)
- [L4T r39.2 Developer Guide — Platform Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (2026-09-26 確認)
- [L4T r38.2.1 Developer Guide — Partition Configuration (module SKUs)](https://docs.nvidia.com/jetson/archives/r38.2.1/DeveloperGuide/AR/BootArchitecture/PartitionConfiguration.html) (2026-09-26 確認)
- [Jetson Orin Nano Super Developer Kit Datasheet (PDF, linked from nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (2026-09-26 確認)
- [Juxi Technology store listing for this kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (2026-09-26 確認)

*ステータス:ドラフト、cheny によるレビュー待ち。記載日時点の NVIDIA 公式ドキュメントに基づく内容です。Juxi Technology による実機検証はまだ行われていません。*

**画像クレジット:** 製品画像は NVIDIA 公式の *Jetson Orin Nano Developer Kit User Guide*(2026-09-26 ダウンロード)からのもので、著作権は © NVIDIA Corporation に属します。

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
