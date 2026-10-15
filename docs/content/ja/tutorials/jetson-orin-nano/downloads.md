---
title: ダウンロードと公式リンク
sidebar_label: ダウンロード
slug: /downloads
description: >-
  JetPack 7.2.1 / L4T r39.2.1 時点の Jetson Orin Nano Super Developer Kit(8GB)
  に関する NVIDIA 公式ダウンロードとドキュメントの確認済みインデックス。パートナー
  リソースと Juxi Technology の窓口も掲載しています。
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-archive
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html
    checked: 2026-09-26
    note: target of the "NVIDIA SDK Manager Documentation" entry on the kit user guide's Additional Docs page
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/overview.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
  - source: https://wiki.juxitech.com/
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# ダウンロードと公式リンク

本ページは、**JetPack 7.2.1 / Jetson Linux(L4T)r39.2.1** 上の **Jetson Orin Nano
Super Developer Kit(8GB)** 向けの NVIDIA 公式ダウンロードとドキュメントの
インデックスです。加えて、いくつかのパートナーリソースと Juxi Technology の窓口を
掲載しています。すべてのリンクは **2026-09-26** に確認済みです。

ダウンロードの前に知っておくべき、Orin Nano 固有の事実が 2 つあります:

- **SD カードイメージはありません。** JetPack 7.2 以降、このキットは USB メモリに
  書き込んだ Jetson ISO からインストールします。SD カードイメージは存在せず、
  ISO を microSD カードに書き込んではいけません。
- **ファームウェアのゲート。** JetPack 7.2.1 には、キット上の JetPack 6.x 世代の
  UEFI/QSPI ファームウェアが必要です。キットに古い工場出荷ファームウェアが残って
  いる場合は、先に JetPack 6.x Update Path を完了してください。

> **Juxi のヒント:** セットアップの全手順は[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)にあります。書き込みと更新の方法の比較は[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)をご覧ください。

## JetPack 7.2.1 / Jetson Linux r39.2.1

- [JetPack SDK ダウンロード](https://developer.nvidia.com/embedded/jetpack/downloads) — JetPack のメインページ:リリースノート、公式のコンポーネントバージョン表、およびすべての JetPack 7.2.1 ダウンロードリンク。

> ⚠️ **そのコンポーネント表を鵜呑みにしないでください。** NVIDIA は 7.2.1 向けに完全には更新していません: CUDA の行は更新されましたが、その隣の 2 行は更新されていません — VPI は依然として JetPack 7.2 の値(**4.1.3 ですが、7.2.1 が実際に同梱するのは 4.1.4**)を示しており、Isaac ROS の行は、Isaac ROS が 2026 年 8 月のリリース以降 JetPack 7.2 上の Orin をサポートしているにもかかわらず、依然として「近日公開予定」のままです。コンポーネントのバージョンについては、NVIDIA のパッケージリポジトリを正式な情報源としてください: メタパッケージが依存関係チェーンを通じて各コンポーネントを固定しています — [r39.2 arm64 Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)、ここでは `nvidia-jetpack-runtime (= 7.2.1-b49)` → `nvidia-vpi (= 7.2.1-b49)` → `libnvvpi4 (= 4.1.4)` という依存関係が確認できます(2026-09-26 確認)。コンポーネントのバージョンは[システムの確認](/ja/tutorials/jetson-orin-nano/verify-your-system)にも記載されています。
- [r39.2.1 用 Jetson ISO(直接ダウンロード)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso) — JetPack 7.2.1 用のインストーラーイメージです。キットのクイックスタートページでは「Direct Download Link: Jetson ISO (r39.2.1)」としてリンクされています。16 GB 以上の USB メモリに書き込んでください。ダウンロードにチェックサムは公開されていません。
- [NVIDIA SDK Manager ドキュメント](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) — キットの書き込み、ファームウェア更新、JetPack コンポーネントのインストールに使うホスト PC ツールのインストールと使用方法(NVIDIA Developer Program アカウントが必要)。キットのワークフローは [BSP のセットアップ](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html)にあります。
- [JetPack アーカイブ](https://developer.nvidia.com/embedded/jetpack-archive) — 以前の JetPack リリース。Orin ファミリーをサポートした最初の 7.x リリースである JetPack 7.2 や、JetPack 6.x 系もここにあります。

## ドキュメント

- [Jetson Orin Nano Developer Kit ユーザーガイド](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — このキットの主要なリファレンス。
  - [クイックスタート](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [ハードウェアレイアウト](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux r39.2.1 リリースノート(PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — JetPack 7.2.1 の新機能、GA の記載、既知の問題リスト。
- [Jetson Linux r39.2 リリースノート(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — JetPack 7.2 のリリースノート。
- [Jetson Linux 開発者ガイド(r39.2)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) — 書き込みターゲット、パーティション構成、プラットフォームの電力とパフォーマンスの表。
- [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) — このキット向けのさらなるリソースの NVIDIA 自身による一覧(JetPack SDK、開発者ガイド、SDK Manager ドキュメント、Jetson ダウンロードセンター、Jetson AI Lab、開発者フォーラム、Jetson エコシステム)。
- [Jetson ダウンロードセンター](https://developer.nvidia.com/embedded/downloads) — Jetson に関する NVIDIA のダウンロードインデックス。キットのガイドは、キャリアボード仕様書とサポート対象コンポーネント一覧についてここを参照するよう案内しています。一部には NVIDIA へのログインが必要です。

## AI フレームワークとチュートリアル

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) — Jetson 向けの NVIDIA オンデバイス LLM 推論スタック。Orin は公式サポート対象で、FP16、INT8、INT4 のみに対応します([サポートマトリクス](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) · [対応モデル](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html))。
- [DeepStream 9.1 インストールガイド](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) — Jetson 上のビデオ解析。JetPack 7.2 で Orin ファミリーをサポートするリリースが DeepStream 9.1 です([クイックスタート](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) · [Docker コンテナ](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html))。
- [Jetson AI Lab](https://www.jetson-ai-lab.com/) — パートナーが運営する、Jetson で AI モデルを実行するためのハンズオンチュートリアル集。[Orin Nano 8 GB 向け TensorRT Edge-LLM ウォークスルー](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/)もあります。
- [SBSA ホイールインデックス(CUDA 13)](https://pypi.jetson-ai-lab.io/sbsa/cu130) — JetPack 7.2 / CUDA 13.2 用 aarch64 Python ホイールのパートナー運営インデックス。NVIDIA スタッフは、このリリースの Python ホイールについてこのインデックスを案内しています。

## Juxi Technology

- **Wiki:**[wiki.juxitech.com](https://wiki.juxitech.com/) — このドキュメントシリーズ。[製品カタログ](https://wiki.juxitech.com/products/)には Jetson キット用のカメラ、センサー、アクセサリーが掲載されています。
- **ストア:**[Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) — このキットの Juxi ストア掲載(SKU JX00110)。
- **連絡先:**テクニカルサポート — support@juxitech.com · 営業 — sales@juxitech.com · 製品に関するご質問 — pe@juxitech.com。

## 出典

- [Jetson Orin Nano Developer Kit ユーザーガイド](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — [クイックスタート](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)、[Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html)(2026-09-26 確認)
- [JetPack SDK ダウンロード](https://developer.nvidia.com/embedded/jetpack/downloads)と [JetPack アーカイブ](https://developer.nvidia.com/embedded/jetpack-archive) — ⚠️ コンポーネント表は行ごとに遅れているため、コンポーネントのバージョンには代わりに [NVIDIA のパッケージリポジトリ](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)を参照してください(2026-09-26 確認)
- [NVIDIA パッケージリポジトリ — r39.2 arm64 Packages インデックス](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — メタパッケージ内の依存関係のロックによる、コンポーネントバージョンの正式な情報源(2026-09-26 確認)
- Jetson Linux リリースノート — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)、[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)(2026-09-26 確認)
- [Jetson Linux 開発者ガイド](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html)(2026-09-26 確認)
- [NVIDIA SDK Manager ドキュメント](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html)(2026-09-26 確認)
- [TensorRT Edge-LLM ドキュメント](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) · [DeepStream 9.1 インストールガイド](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) · [SBSA ホイールインデックス](https://pypi.jetson-ai-lab.io/sbsa/cu130)(2026-09-26 確認)
- [Juxi Technology ストア製品ページ](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)と [wiki](https://wiki.juxitech.com/)(2026-09-26 確認)

*ステータス: レビュー済み（2026-10-11）。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology
によって公開されており、NVIDIA の公式出版物ではありません。
