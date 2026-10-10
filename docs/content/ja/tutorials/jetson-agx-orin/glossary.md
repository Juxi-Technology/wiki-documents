---
title: 用語集
sidebar_label: 用語集
slug: /appendix/glossary
description: >-
  Jetson AGX Orin 開発キットの重要用語 — JetPack と L4T のバージョン体系から、
  書き込み、AI スタック、電力関連の用語まで。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: its component table lags on some rows (VPI/PVA still show 7.2 values) — component versions per the apt repository below
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: component versions verified through the nvidia-jetpack 7.2.1-b49 dependency chain
review_owner: cheny
---

# 用語集

お客様から最もよく問い合わせのある用語を、トピック別にまとめました。バージョン番号は
現在のリリース(**JetPack 7.2.1 / L4T 39.2.1**、コンポーネントバージョンは 2026-09-26 に再確認)を反映しています。

## プラットフォームとハードウェア

| 用語 | 意味 |
|---|---|
| **Jetson AGX Orin** | NVIDIA のエッジ AI モジュールファミリー。本開発キットには **64GB** モジュールが搭載されています。 |
| **モジュール** | SoC、メモリ、eMMC を搭載した小型ボードで、実際の計算を担います。 |
| **キャリアボード** | すべてのポートとコネクタを備えた大型ボード。モジュールはこれに装着します(699 ピンコネクタ、J3)。 |
| **開発キット** | モジュール + リファレンスキャリアボード + Wi-Fi モジュール + 電源 — プロトタイピング用プラットフォームです。量産製品では、自社製またはパートナー製のキャリアボードにモジュールを搭載します。 |
| **SoC** | System-on-chip(システムオンチップ):CPU、GPU、アクセラレータを 1 つのチップに統合したもの(NVIDIA はこのシリーズを「Tegra」と呼んでいます)。 |
| **TOPS** | 毎秒 1 兆回演算 — AI スループットの指標です(AGX Orin ファミリーは最大 275 TOPS)。 |
| **Tensor コア** | ニューラルネットワークの基盤となる行列演算に特化した GPU コアです。 |
| **eMMC** | モジュール上の組み込みフラッシュストレージ。デフォルトのシステムストレージです。 |
| **NVMe** | PCIe 接続の高速 SSD。M.2 M-Key スロット(J1)に装着し、システムの格納先にもできます。 |
| **M.2(M-Key / E-Key)** | スロットの種類:**M-Key** = NVMe SSD、**E-Key** = Wi-Fi モジュール。 |
| **CSI / GMSL** | カメラインターフェース(CSI はカメラコネクタ J509、GMSL は車載グレードのカメラ向け)。 |
| **DisplayPort(DP)** | キットの**唯一の**ディスプレイ出力。MST(最大 2 台のディスプレイ)と DSC に対応します。 |

## ソフトウェアとバージョン

| 用語 | 意味 |
|---|---|
| **JetPack** | Jetson 向けの NVIDIA SDK バンドル — OS、ドライバー、CUDA スタック、ライブラリ。**現行:7.2.1。** |
| **Jetson Linux(L4T)** | JetPack の土台となるボードサポートパッケージ:ブートローダー、カーネル、ドライバー、Ubuntu ルートファイルシステム。**現行:r39.2.1。** |
| **BSP** | 「Board support package」の略 — ボードを起動して動作させるために必要なもの一式。 |
| **ルートファイルシステム(rootfs)** | OS のユーザー空間部分(本キットでは Ubuntu 24.04)。 |
| **oem-config** | 初回起動時のセットアップウィザード(言語、ユーザーアカウント、ネットワーク)。 |
| **UEFI** | キットのファームウェア兼ブートメニュー。ブートマネージャーで起動デバイスを選択できます。 |
| **QSPI** | 初期ブートファームウェアを格納する小容量フラッシュ。ISO インストール中に「**QSPI capsule update**」の確認が表示されることがあります — `Y` を押してください(必須)。 |
| **Force Recovery モード** | ホスト PC から書き込むための特殊な起動モード。入り方:電源を接続しながら中央の Force Recovery ボタンを押し続けます。 |
| **Jetson ISO** | USB メモリ用のインストールイメージ。NVIDIA 推奨の更新方法です(ホスト PC 不要)。 |
| **SDK Manager** | BSP の書き込みと JetPack コンポーネントのインストールを行う NVIDIA の GUI ツール(ホスト PC 上)。 |
| **Linux_for_Tegra / flash.sh** | スクリプトベースの書き込みツール。上級者・製品開発向けです。 |
| **OTA** | Over-the-air 更新 — 現場に展開済みのデバイスに対するリモートのソフトウェア/セキュリティ更新。 |
| **デバイスツリー** | どのハードウェアが接続されているかをカーネルに伝えるデータ構造。カスタマイズしたデバイスツリーは L4T のバージョンごとに再ビルドが必要です。 |

**バージョン対応表**(真っ先に覚えておきたい、最も有用な表):

| JetPack | Jetson Linux(L4T) | Ubuntu | カーネル | CUDA |
|---|---|---|---|---|
| **7.2.1**(現行) | **39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.x(前世代) | 36.x | 22.04 | 5.15 | 12.x |

個々のシステムが実際に何で動作しているかは、必ず `cat /etc/nv_tegra_release` で確認してください。

## AI スタック

| 用語 | 意味 |
|---|---|
| **CUDA** | NVIDIA の GPU コンピューティングツールキット(本リリースでは 13.2.2)。 |
| **cuDNN** | 最適化されたディープラーニングプリミティブのライブラリ(9.20.0)。 |
| **TensorRT** | 推論オプティマイザー兼ランタイム(10.16.2)。 |
| **TensorRT エンジン** | コンパイル済みの、ハードウェア/バージョン依存のモデルファイル。エンジンはバージョンアップでは**引き継がれません** — 再ビルドが必要です。 |
| **DeepStream** | マルチストリーム映像解析向け SDK(9.1)。 |
| **VPI** | Vision Programming Interface — ハードウェアアクセラレーションによる画像処理(4.1.4)。 |
| **Holoscan** | リアルタイムセンサー処理向けのストリーミング AI フレームワーク(3.9.0)。 |
| **NGC** | NVIDIA のコンテナと事前学習済みモデルのカタログ(catalog.ngc.nvidia.com)。 |
| **コンテナ** | 分離されたパッケージ化済みの実行環境(Docker)。Jetson で AI ソフトウェアを配布する標準的な方法です。 |

## 電力とモニタリング

| 用語 | 意味 |
|---|---|
| **nvpmodel** | 電力モードを切り替えるツール。`sudo nvpmodel -q` を実行すると、お使いのシステムのモードを確認できます。 |
| **MAXN** | 「最大性能」の電力モード(電力上限なし)。 |
| **jetson_clocks** | クロックを最大値に固定します — ベンチマーク向けであり、常用のデフォルト設定には適しません。 |
| **tegrastats** | CPU/GPU/メモリの使用状況を表示する組み込みのライブモニター。 |

## JetPack 7 時代

| 用語 | 意味 |
|---|---|
| **NemoClaw** | Jetson 向けの NVIDIA エージェント型 AI フレームワーク。JetPack 7.2 以降はコマンド 1 つでインストールできます。 |
| **Jetson エージェントスキル** | NVIDIA がデバイス側および BSP タスク向けに公開している再利用可能なエージェントワークフロー。 |
| **Yocto / OpenEmbedded(OE4T)** | カスタムで再現可能な量産 Linux イメージをビルドするためのビルドシステム — 7.2 以降、公式にサポートされています。 |
| **SBSA** | Server Base System Architecture — Jetson **Thor** シリーズが準拠する Arm サーバーモデル(本キットには該当しません)。 |
| **MIG** | Multi-Instance GPU — 1 つの GPU を分離されたインスタンスに分割する技術(Jetson Thor、テクノロジープレビュー)。 |

## 出典

- [NVIDIA Jetson apt リポジトリ — 実際のコンポーネントバージョン](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)(2026-09-26 確認)— `nvidia-jetpack` 7.2.1 の依存関係チェーン経由。[JetPack ダウンロードページ](https://developer.nvidia.com/embedded/jetpack/downloads)の概要表は遅れており(依然として CUDA 13.2.1 / VPI 4.1.3 と記載)
- [Jetson AGX Orin Developer Kit ユーザーガイド](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html)(2026-09-24 確認)

*ステータス: レビュー済み（2026-10-11）。定義は NVIDIA のドキュメントと
業界標準の用法に基づいてまとめたものです。バージョン番号は記載の日付時点で確認しています。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology
によって公開されており、NVIDIA の公式出版物ではありません。
