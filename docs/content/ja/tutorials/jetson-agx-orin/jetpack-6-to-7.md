---
title: JetPack 6.x から JetPack 7.2 への移行
sidebar_label: JetPack 6.x からの移行
slug: /migration/jetpack-6-to-7
description: >-
  Jetson AGX Orin 開発キットにおいて JetPack 6.x と JetPack 7.2.1 の間で何が変わるか、何を再ビルドする必要があるか、推奨される移行順序をまとめます。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: its component table lags on some rows (VPI/PVA still show 7.2 values)
  - source: https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/
    checked: 2026-09-23
    note: secondary source — used for migration-topic organization only
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
    note: Isaac ROS support status — supersedes the "coming soon" note in the migration checklist
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 (not the 13.2.1 shown on the JetPack downloads page) per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# JetPack 6.x から JetPack 7.2 への移行

本ページは、AGX Orin 開発キットを使用している既存の JetPack 6.x ユーザー向けです。
新しいキットをお持ちの場合は、代わりに
[クイックスタート](/ja/tutorials/jetson-agx-orin/quick-start)から始めてください。

## 何が変わるか

| レイヤー | JetPack 6.x 世代 | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux(L4T) | 36.x(6.2 では 36.4.x) | **39.2.1** |
| OS / ルートファイルシステム | Ubuntu 22.04 | **Ubuntu 24.04** |
| Linux カーネル | 5.15 | **6.8** |
| CUDA | 12.x | **13.2.2** |
| TensorRT | 10.x(6.x 世代) | **10.16.2** |

> JetPack 6.x 列の値はあくまで例示です(JetPack 6.2 世代)。計画を立てる前に、
> `cat /etc/nv_tegra_release` で**お手元の**正確な現在のバージョンを確認し、
> リリースごとの詳細は NVIDIA の
> [JetPack アーカイブ](https://developer.nvidia.com/embedded/jetpack-archive)を参照してください。

## 7.2 系における Orin の新機能

Jetson Linux 39.2 リリースノートより:

- **Jetson Orin ファミリーが JetPack 7** ソフトウェアラインに加わります(Thor と同世代)。
- **統合 ISO インストール** — USB メモリからのインストール経路で、ホスト PC は不要です。
- エージェント型 AI ワークフロー向けの **NemoClaw** ワンコマンドインストール。
- カスタム量産イメージ向けの公式 **Yocto/OpenEmbedded レシピ**(OE4T)。
- カメラスタック:**SIPL API v2.0**(GMSL および CoE)— このリリースには **ABI 変更**がある点に注意してください。JetPack 7.1 向けにビルドされた UDDF ドライバーは、JetPack 7.2 のヘッダーに対して再ビルドが必要です。
- *(AGX Orin 32GB の Super Mode / MAXN_SUPER は 32GB 固有のもので、64GB キットには該当しません。SBSA および MIG の変更は Jetson Thor に関係するものです。)*

## 引き継げないもの — 再ビルドの計画を

- **アウトオブツリーのカーネルモジュール** — カーネルが 6.8 に移行したため、モジュールは新しいヘッダーに対して再ビルドする必要があります。
- **カメラドライバーとデバイスツリーのカスタマイズ** — 39.2 向けに再ビルドしてください。SIPL 2.0 は UDDF ドライバーの ABI 変更ももたらします。
- **TensorRT エンジン** — シリアライズされたエンジンは TensorRT のバージョンに紐づきます。ターゲット上で TensorRT 10.16.2 を使って再ビルドしてください。
- **CUDA バイナリ** — CUDA 13 で再ビルドしてください。12.x のバイナリがそのまま引き継げるとは期待しないでください。
- **コンテナ** — JetPack 7 対応のイメージ(例:更新された NGC コンテナ)に切り替えてください。
- **Python 環境とシステムサービス** — Ubuntu 24.04 向けに再作成してください(パッケージ名、リポジトリ、インタープリターのバージョンが変わっています)。

## 推奨される移行順序

1. 何かを消去する*前に*、**ソフトウェアスタックが 7.2.1 でサポートされていることを確認**してください — 依存する各コンポーネントを NVIDIA の [JetPack 7.2.1 コンポーネントリスト](https://developer.nvidia.com/embedded/jetpack/downloads)と照合します。このページは独立してリリースされる SDK については遅れることがあります。Isaac ROS 4.6.0 が Jetson Orin + JetPack 7.2 のサポートを追加しているにもかかわらず、まだ Isaac ROS を「近日公開予定」と記載しています([JetPack 7.2 のロボティクス](/ja/tutorials/jetson-agx-orin/robotics)を参照)。
2. **バックアップ:**アプリケーションデータ、センサーのキャリブレーションファイル、コンテナボリューム、デバイスツリーのソース、TensorRT ビルドスクリプト/ONNX モデル。
3. **JetPack 7.2.1 を書き込み**([書き込みと更新](/ja/tutorials/jetson-agx-orin/flashing-and-updates))、起動、ストレージ、ネットワーク、および Force Recovery が引き続き機能することを検証します。
4. **周辺機器を復元:**Wi-Fi、カメラ、CAN、フィールドバスのドライバー — カーネル 6.8 向けに再ビルドしたものを使います。
5. CUDA アプリケーション、TensorRT プラグイン、TensorRT エンジンを**ターゲット上で再ビルド**します。
6. **まず元の電力モードでアプリケーションを検証**し、その後に他のパフォーマンスモードを試してください。
7. **ベースラインを記録:**メモリ使用量、温度、消費電力、レイテンシー、スループット — 本番運用に移行する前に。

## ロールバック

- 消去する前に、現在のシステムの**動作確認済みのコピー**を保管してください(予備の NVMe/eMMC イメージ、または最低限ステップ 2 のデータ)。
- ISO インストーラーは、メディアをお持ちの任意の L4T バージョンをインストールできます — 以前のバージョンに戻す必要がある可能性がある場合は、古いインストーラー USB を保管しておいてください。
- フリートの場合は、展開を段階的に進め、インプレースアップグレードよりも独立したリカバリー経路(リカバリー USB + バックアップイメージ)を備えた設計を優先してください。

## 参考資料

- [Jetson Linux 39.2.0 リリースノート(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — *What's New*、既知の問題(2026-09-23 確認)
- [JetPack SDK ダウンロード](https://developer.nvidia.com/embedded/jetpack/downloads)(2026-09-23 確認) — ⚠️ コンポーネント表は一部の行で遅れています。7.2.1 システムが実際にインストールするバージョンについては[システムの検証](/ja/tutorials/jetson-agx-orin/verify-your-system)を参照してください
- [Seeed Studio JetPack 7.2 リソースハブ](https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/) — 二次情報源。移行トピックの構成に使用(2026-09-23 確認)

*ステータス:ドラフト、cheny のレビュー待ち。記載日時点の NVIDIA 公式
ドキュメントに基づく内容です。Juxi Technology による実機での検証はまだ
行われていません。再ビルド一覧は標準的なプラットフォーム上の帰結(カーネル/TensorRT/CUDA
のバージョン変更)を述べたものです — ご自身のスタックで検証してください。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは
Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
