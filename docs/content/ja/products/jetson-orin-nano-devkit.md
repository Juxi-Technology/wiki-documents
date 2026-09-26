---
title: Jetson Orin Nano Super 開発キット(8GB)
category: compute-vision
description: "NVIDIA Jetson Orin Nano Super 開発キット(8GB) — 最大 67 INT8 TOPS のエッジ AI 性能、8 GB ユニファイドメモリ、microSD と NVMe のストレージオプション、Juxi Technology による完全な JetPack 7.2.1 ドキュメント付き。"
keywords: [jetson, orin nano, edge ai, jetpack, nvidia, robotics]
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Jetson Orin Nano Super 開発キット(8GB)

> **[ストアで購入](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)**

## 製品概要

NVIDIA® Jetson Orin Nano™ Super 開発キットは、Jetson Orin ファミリーのコンパクトな開発キットです — エッジにおいてコンピュータビジョン、ロボティクス、生成 AI プロジェクトを構築するための小型 AI コンピューターです。Juxi Technology は NVIDIA 公式キットを純正の元箱入りで販売しており、JetPack 7.2.1 / L4T r39.2.1 ソフトウェアベースラインに対応する完全なドキュメントシリーズを提供しています。

主な特長:

- **最大 67 INT8 TOPS** の AI 性能(スパース、デンス時は 33)と、従来キット比 **最大 1.7 倍の生成 AI 改善** *(NVIDIA)*
- **8 GB 128-bit LPDDR5 メモリ、102 GB/s** *(NVIDIA)* — CPU、GPU、およびすべてのアプリケーションで共有されるユニファイドメモリです。8 GB はあらゆるワークロードにとっての厳格な上限です
- **1024 コアの NVIDIA Ampere アーキテクチャ GPU、32 基の Tensor コア**、および最大 1.7 GHz の 6 コア Arm Cortex-A78AE CPU *(NVIDIA)*
- **「Super」はソフトウェアアップグレードであり、新しいシリコンではありません** — 既存の Orin Nano 開発キットも、JetPack を更新すれば GPU、メモリ、CPU のより高いクロックを利用できます *(NVIDIA)*
- **7 W～25 W で設定可能な消費電力** *(NVIDIA)* — デフォルトの電力モードは 25 W
- **eMMC なし、NVIDIA からのストレージもなし** — microSD スロットは**モジュールの裏面**にあり、ほかに NVMe SSD 用の M.2 Key-M スロットが 2 つ *(NVIDIA)*。Juxi のバンドルには 64 GB microSD カードが付属します
- **現在のソフトウェア:JetPack 7.2.1**(Jetson Linux / L4T r39.2.1) *(NVIDIA)* — USB ドライブからの Jetson ISO 方式でインストールします。別途 Ubuntu ホスト PC は不要です
- **NVIDIA 純正の元箱、Juxi Technology が販売** — バンドルには 19 V 電源アダプター、電源ケーブル、64 GB microSD カード、M.2 Wi-Fi モジュールが付属します

**用途**:小規模なローカル LLM と生成 AI、DeepStream による映像解析、ロボティクスと ROS 2 開発、教育・プロトタイピング。

## 製品仕様

| カテゴリ | 仕様 |
|---|---|
| キット | NVIDIA Jetson Orin Nano Super 開発キット — P3767 モジュール + P3768 キャリアボード、キット全体の型番は P3766 *(NVIDIA)* |
| AI 性能 | 最大 67 INT8 TOPS(スパース)/ 33 INT8 TOPS(デンス)、生成 AI 性能は従来キット比 最大 1.7 倍 *(NVIDIA)* |
| GPU | NVIDIA Ampere アーキテクチャ、1024 CUDA コア + 32 Tensor コア、最大 1,020 MHz *(NVIDIA)* |
| CPU | 6 コア Arm Cortex-A78AE v8.2 64-bit、最大 1.7 GHz、1.5 MB L2 + 4 MB L3 キャッシュ *(NVIDIA)* |
| メモリ | 8 GB 128-bit LPDDR5、102 GB/s *(NVIDIA)* — CPU、GPU、アプリケーション間で共有 |
| ストレージ | eMMC なし。microSD カードスロットはモジュール裏面(メインストレージ)+ 2x M.2 Key-M NVMe スロット:2280(PCIe 3.0 x4)と 2230(PCIe 3.0 x2) *(NVIDIA)* |
| 映像 | デコードは最大 1x 4K60(H.265)、2x 4K30、5x 1080p60、11x 1080p30。エンコードは 1-2 個の CPU コアを使用して 1080p30(専用ハードウェアエンコーダーなし) *(NVIDIA)* |
| ディスプレイ | 1x DisplayPort 1.2(+MST) — 唯一のディスプレイ出力です。USB-C ポートは映像信号を出力しません *(NVIDIA)*。ストアの掲載:「DP 1.2、最大 4K@60Hz」 — NVIDIA の取得済みページには最大表示解像度の記載がありません |
| ネットワーク | 1x ギガビットイーサネット(RJ45) *(NVIDIA)*。同梱の M.2 Key-E ワイヤレスモジュールは、NVIDIA の表記では「802.11ac/ab/gn wireless network interface controller」 *(NVIDIA)*。ストアの掲載:デュアルバンド 2.4/5 GHz Wi-Fi 5 + Bluetooth 5.0(NVIDIA のページには Bluetooth のバージョン記載がありません — Bluetooth 5.0 は未確認として扱ってください) |
| I/O | 4x USB 3.2 Type-A(10 Gbps、2 段積みコネクター 2 つ)、1x USB-C(データ専用、Host / Device / USB Recovery モード)、40 ピンヘッダー(UART、SPI、I2S、I2C、GPIO)、12 ピンボタンヘッダー、4 ピンファンヘッダー、DC 電源ジャック(5.5 mm x 2.5 mm) *(NVIDIA)* |
| カメラ | 2x MIPI CSI コネクター(22 ポジション、0.5 mm ピッチ、ボトムコンタクト):CAM0 は 1x2 レーン、CAM1 は 1x2 または 1x4 レーン *(NVIDIA)* |
| 消費電力 | 7 W～25 W で設定可能 *(NVIDIA)*。デフォルトモード:25 W。MAXN SUPER は実験的であり、`jetson-orin-nano-devkit-super` または `jetson-orin-nano-devkit-super-maxn` 構成で書き込んだ場合にのみ利用できます *(NVIDIA)* |
| 寸法 | NVIDIA データシート:103 x 90.5 x 34.77 mm。NVIDIA ファミリー仕様表:100 x 79 x 21 mm(どちらの定義も、高さには脚、キャリアボード、モジュール、サーマルソリューションを含みます)。NVIDIA はこの 2 つの数値を統合していません。ストアの掲載は 100 x 79 x 21 mm |
| ソフトウェア | 現在のリリース:JetPack 7.2.1(Jetson Linux(L4T)r39.2.1 を含む)。Jetson ISO 方式でインストールします *(NVIDIA)* |
| 同梱物(Juxi ストアのバンドル) | NVIDIA Jetson Orin Nano Super 開発キット x1(NVIDIA 純正の元箱)、19 V 電源アダプター x1、Type B 電源ケーブル(US、JP、CA、PH)x1、64 GB microSD カード x1、M.2 Wi-Fi モジュール x1 |
| 同梱物(NVIDIA) | 開発キット(ヒートシンク付き Orin Nano 8GB モジュール + リファレンスキャリアボード)、19 V 電源、802.11ac/ab/gn ワイヤレスネットワークインターフェースコントローラー、クイックスタートガイド *(NVIDIA)*。リムーバブルストレージはありません:「Jetson Orin Nano Developer Kit の箱にはリムーバブルストレージは含まれていません」 *(NVIDIA)* |
| 保証 | 1 年間、開発用途のみ(ストア掲載) |

*キットの完全な仕様:NVIDIA 公式データシート(リンクは nvidia.com にあります)をご参照ください。*

> **Juxi の補足:** ストアの掲載と NVIDIA 公式の数値が異なる場合、本ページは
> NVIDIA の数値を採用し、差異を明記しています。ストアが掲載していて NVIDIA の
> ページでは確認できない項目:Bluetooth 5.0、および 4K@60Hz のディスプレイ出力。
> 同梱の 64 GB microSD カードは**イメージ未書き込み(空)**の状態で届きます。
> NVIDIA は 64 GB 以上の UHS-1 カードを推奨しています。JetPack のフルインストールを
> 前提に計画してください — 下の「クイックスタート」を参照してください。

## クイックスタート

1. **まずファームウェアのバージョンを確認します。** JetPack 7.2.1 には JetPack
   6.x 世代の Jetson UEFI/QSPI ファームウェア(バージョン 36.0 より新しいもの)が
   必要です。お手元のキットが古い工場出荷ファームウェアの場合は、インストールの
   前に JetPack 6.x の更新手順を実行してください — [書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)
   を参照してください。
2. **ご自身で用意するもの**:PC またはノート PC(Windows、macOS、Linux)と
   25 GB 以上の空き容量、16 GB 以上の USB メモリ、そして DisplayPort モニター +
   USB キーボードとマウス、またはヘッドレスセットアップ用の USB-TTL シリアル
   ケーブル。
3. **ストレージを選択します**:同梱の 64 GB microSD カード(起動前にモジュール
   裏面のスロットに挿入します)、または M.2 Key-M スロットに装着するご自身の
   NVMe SSD。
4. **インストーラーを書き込みます**:JetPack 7.2.1 の Jetson ISO をダウンロード
   し、USB メモリに書き込みます。ISO を microSD カードに書き込まないでください
    — JetPack 7.2 以降、SD カードイメージはサポートされていません。
5. **インストール**:キットを USB メモリから起動し、インストール先のストレージを
   選択します。ファームウェア capsule プロンプトは **30 秒以内に Y** を押して
   確定してください — NVIDIA はこれを最も見逃されやすい手順として挙げています。
6. **初回起動**:Ubuntu の初期セットアップを完了し、JetPack コンポーネントを
   インストールします。
7. 詳細な手順:**[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)**

## ドキュメント(Jetson Orin Nano シリーズ)

- [クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start) · [書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates) · [システムの確認](/ja/tutorials/jetson-orin-nano/verify-your-system)
- [製品概要](/ja/tutorials/jetson-orin-nano/overview) · [インターフェースとハードウェアレイアウト](/ja/tutorials/jetson-orin-nano/interfaces) · [トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting) · [FAQ](/ja/tutorials/jetson-orin-nano/faq)
- [ダウンロード](/ja/tutorials/jetson-orin-nano/downloads) · [JetPack 6.x からの移行](/ja/tutorials/jetson-orin-nano/jetpack-6-to-7) · [用語集](/ja/tutorials/jetson-orin-nano/glossary) · [変更履歴](/ja/tutorials/jetson-orin-nano/changelog)
- [ローカル LLM 推論](/ja/tutorials/jetson-orin-nano/local-llm) · [メモリ効率](/ja/tutorials/jetson-orin-nano/memory-efficiency) · [DeepStream 映像解析](/ja/tutorials/jetson-orin-nano/deepstream) · [ロボティクス(現状)](/ja/tutorials/jetson-orin-nano/robotics) · [エージェント AI(NemoClaw)](/ja/tutorials/jetson-orin-nano/agentic-ai)

## 推奨アクセサリ

[Juxi Technology 製品カタログ](https://wiki.juxitech.com/products/)をご覧ください — カメラ(IMX219 CSI、USB オートフォーカス、RealSense 深度)、[Jetson Orin Radiator](https://www.juxitech.com/products/jetson-orin-radiator)(ストアでは Orin NX / Orin Nano SUPER 向けに掲載)、ロボットアーム、センサーなど。

## サポート

- 📧 技術サポート:support@juxitech.com
- 🌐 ウェブサイト:[www.juxitech.com](https://www.juxitech.com)
- 💬 ドキュメントの問題報告:[GitHub](https://github.com/Juxi-Technology/wiki-documents/issues)

## 出典

- [Jetson Orin Nano Developer Kit ユーザーガイド — はじめに](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (2026-09-26 確認)
- [Jetson Orin Nano Developer Kit ユーザーガイド — クイックスタート](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (2026-09-26 確認)
- [Jetson Orin Nano Developer Kit ユーザーガイド — ハードウェアレイアウト](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (2026-09-26 確認)
- [Jetson Orin Nano Developer Kit ユーザーガイド — ハウツー](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (2026-09-26 確認)
- [Jetson Orin Nano Developer Kit ユーザーガイド — JetPack 6.x の更新手順](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (2026-09-26 確認)
- [L4T r39.2 開発者ガイド — プラットフォームの電力と性能](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (2026-09-26 確認)
- [L4T r39.2 開発者ガイド — Jetson Orin NX および Orin Nano シリーズ:モジュールの適合とブリングアップ](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (2026-09-26 確認)
- [NVIDIA Jetson Orin モジュールおよび開発キットのスペックページ](https://developer.nvidia.com/embedded/jetson-orin) (2026-09-26 確認)
- [NVIDIA Super Boost:Jetson Orin Nano Developer Kit gets a Super boost](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (2026-09-26 確認)
- [Jetson Orin Nano Super Developer Kit データシート(PDF、nvidia.com からリンク)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (2026-09-26 確認)
- [Juxi Technology ストア商品ページ](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (2026-09-26 確認)

*ステータス:ドラフト、cheny によるレビュー待ち。記載の日付時点の NVIDIA 公式
ドキュメントに基づいており、Juxi Technology による実機検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology
によって公開されており、NVIDIA の公式出版物ではありません。
