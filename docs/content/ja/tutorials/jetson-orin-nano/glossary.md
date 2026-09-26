---
title: 用語集
sidebar_label: 用語集
slug: /appendix/glossary
description: >-
  NVIDIA Jetson Orin Nano Super Developer Kit(8GB)の重要用語 — JetPack と L4T の
  バージョン体系から、書き込み、電力モード、AI スタックまで。
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# 用語集

Jetson の新しいユーザーが最初に出会う用語を、アルファベット順にまとめました。
バージョン番号はこのキットの現行リリース(**JetPack 7.2.1 / L4T r39.2.1**、
2026-09-26 確認)を反映しています。

## 用語

| 用語 | 意味 |
|---|---|
| **BSP** | Board support package(ボードサポートパッケージ):ボードを起動させるためのソフトウェア層 — ブートローダー、カーネル、ドライバー、ルートファイルシステム。JetPack では、BSP は Jetson Linux(L4T)です。Jetson ISO インストール中、インストーラーは選択したストレージデバイスに BSP を書き込みます。 |
| **capsule update** | QSPI ブートファームウェアの更新。古い QSPI ファームウェアのキットで Jetson ISO インストールを行うと、インストーラーが capsule 更新の実行を求めます:30 秒以内に `Y` を押してください。押さないとインストールは後で失敗します。更新は 2 回に分けて実行され、その間にキットが再起動することがあります — これは想定どおりです。 |
| **carveout** | ブートファームウェアが、ディスプレイやカメラパイプラインなどの特定のハードウェアブロックのために予約するメモリ領域。オペレーティングシステムは使用できません。Orin Nano ではこれらの予約は文書化されており、BSP を編集してキットを再書き込みすることで削減できます([メモリ効率](/ja/tutorials/jetson-orin-nano/memory-efficiency)を参照)。 |
| **CUDA** | NVIDIA の並列コンピューティングプラットフォーム兼ツールキットで、GPU 上でコードを実行します。JetPack 7.2.1 には CUDA 13.2.2 が同梱されています。Orin の GPU コンピュートケイパビリティは 8.7(`sm_87`)です。`sm_87` を含まない GPU バイナリは CPU 実行にフォールバックします([ローカル LLM 推論](/ja/tutorials/jetson-orin-nano/local-llm)を参照)。 |
| **cuDNN** | NVIDIA の最適化されたディープラーニングプリミティブ(畳み込みや活性化関数など)のライブラリ。ディープラーニングフレームワークや TensorRT が中核演算に使用します。JetPack 7.2.1 には cuDNN 9.20.0 が同梱されています。 |
| **DeepStream** | NVIDIA のマルチストリーム映像解析向け SDK:映像をデコードし、推論を実行し、オブジェクトを追跡し、結果を出力します。DeepStream 9.1 は JetPack 7.2 上の Jetson Orin ファミリーをサポートします。NVIDIA は、新規ユーザーにとって最も手早いインストール方法として Docker コンテナを推奨しています([DeepStream](/ja/tutorials/jetson-orin-nano/deepstream)を参照)。 |
| **DLA** | Deep Learning Accelerator:一部の Jetson モジュールに内蔵された固定機能の推論エンジン。Orin Nano モジュールには DLA がないため、このキットでの推論は GPU で実行されます。 |
| **Edge-LLM** | TensorRT Edge-LLM:NVIDIA の大規模言語モデル(LLM)および視覚言語モデル(VLM)向けオンデバイスランタイム。Orin では FP16、INT8、INT4 のエンジンのみに対応します — FP8 と FP4 のエンジンは動作しません — また、エンジンはデバイス自体でビルドします([ローカル LLM 推論](/ja/tutorials/jetson-orin-nano/local-llm)を参照)。 |
| **eMMC** | 一部の Jetson モジュールでシステムディスクとして使われる組み込みフラッシュストレージ。本開発キットはストレージなしで出荷されます:開始前に microSD カードまたは NVMe SSD を用意してください([クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)を参照)。 |
| **Force Recovery mode** | ホスト PC からキットを書き込むための特殊な起動モード。実行中のシステムからは `sudo reboot --force forced-recovery` で入ります。またはキットの電源を切った状態で Button Header のピン 9 と 10 を短絡してから電源を接続します。このモードでは、USB-C ポートがホスト PC への書き込み接続を担います。 |
| **JetPack** | Jetson 向けの NVIDIA SDK バンドル:オペレーティングシステム、ドライバー、CUDA スタック、ライブラリ。このキットの現行リリースは JetPack 7.2.1 で、Jetson Linux(L4T)r39.2.1 が含まれます。 |
| **Jetson 6.x Update Path** | 工場出荷の UEFI/QSPI ファームウェアが 36.0 より古いキット向けのファームウェアブリッジ手順。JetPack 5.1.3 の microSD ブリッジイメージを起動し、ブートローダー(ファームウェア)更新をスケジュールします。その後、キットは JetPack 6.x または JetPack 7.2.1 の Jetson ISO を起動できるようになります。古いファームウェアのキットは、ISO インストールの前にこのパスを完了する必要があります([クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)を参照)。 |
| **Jetson ISO** | JetPack 7.2 以降向けの統合 USB インストーラーイメージ。Balena Etcher などのツールで USB メモリに書き込んでください — microSD カードには書き込まないでください — また、これはインストール専用でライブ USB ではないことに注意してください。インストール中にターゲット(microSD カードまたは NVMe SSD)を選択します。 |
| **L4T** | Jetson Linux:JetPack の土台となるボードサポートパッケージ — UEFI ブートローダー、カーネル、ドライバー、Ubuntu ルートファイルシステム。JetPack 7.2.1 では r39.2.1 で、Linux カーネル 6.8 と Ubuntu 24.04 のルートファイルシステムを備えます。 |
| **MAXN SUPER** | このキットの最上位の電力モード(モード 2):CPU 1,728 MHz、GPU 1,020 MHz、メモリ 3,199 MHz。実験的なモードで、キットが Super 構成で書き込まれている場合にのみ存在します。デスクトップの Power Mode メニューで選択するか、`sudo /usr/sbin/nvpmodel -m 2` を実行します。 |
| **microSD (UHS-1)** | このキットの既定のシステムストレージとして使われるカード形式。UHS-1 は SD の速度クラスです。NVIDIA は 64 GB 以上の UHS-1 microSD カードを推奨しています。スロットはモジュールの裏面にあるため、インストーラーを起動する前にカードを挿入してください。 |
| **nv_boot_control.conf / TNSPEC** | デバイス上のファイル `/etc/nv_boot_control.conf` で、ボード構成を TNSPEC 文字列として記録します。NVIDIA スタッフによると、Super 構成では `-super` 接尾辞が表示されます。例えば `TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-` です。接尾辞がない場合、上位の電力モードは利用できません。ISO インストール後、NVIDIA は正しいボード情報の参照先としてこの TNSPEC エントリーを挙げています。 |
| **NVMe** | PCIe バス上の SSD で、キャリアボードの M.2 Key-M スロットのいずれかに装着します:2280 サイズ(PCIe 3.0 x4)または 2230 サイズ(PCIe 3.0 x2)。NVMe SSD はシステムを格納でき、より大きな容量と優れたストレージ性能が必要な場合に推奨されます。 |
| **nvpmodel** | このキットの電力モードツール。`sudo /usr/sbin/nvpmodel -q` でお使いのシステムで利用可能なモードを一覧表示し、`sudo /usr/sbin/nvpmodel -m <mode_id>` でモードを切り替えます。同じモードがデスクトップの Power Mode メニューにもあります。 |
| **oem-config** | 初回起動時のセットアップウィザード:ライセンス同意、言語とキーボード、ネットワーク、初期ユーザー名とパスワード。インストール済みシステムの初回起動後に一度だけ実行されます。 |
| **QSPI** | キット上の UEFI ブートファームウェアを格納する小さな NOR フラッシュメモリ。JetPack 7.2 以降には、JetPack 6.x 世代(バージョン 36.0 より新しい)の QSPI ファームウェアが必要です。古いファームウェアでは、インストーラーが失敗したり、キットが黒い画面までしか起動しなかったりすることがあります。[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)を参照してください。 |
| **SDK Manager** | USB 経由で BSP の書き込みと JetPack コンポーネントのインストールを行う NVIDIA のホスト PC ツール。文書化されているホストは Ubuntu を実行する x86 PC です。オンデバイスの Jetson ISO 方式に対する代替手段です。 |
| **SO-DIMM** | モジュールのコネクター形状:260 ピン SO-DIMM、69.6 mm x 45 mm。モジュールはキャリアボードの SO-DIMM ソケットに装着し、同じソケットには Jetson Orin NX モジュールも装着できます。 |
| **Super Mode** | Orin Nano 向けの NVIDIA のソフトウェアによる電力・クロック構成 — ハードウェアが異なるわけではありません。既存のキットは JetPack ソフトウェアのアップグレードで「Super」の強化を得られますが、このキットでは、Super 構成で書き込まれている場合にのみ上位の電力モードが表示されます。 |
| **TensorRT** | NVIDIA の推論オプティマイザー兼ランタイム。学習済みモデルを TensorRT エンジン — ターゲット GPU 向けにビルドされたデバイス固有のファイル — にコンパイルし、そのエンジンを効率的に実行します。JetPack 7.2.1 には TensorRT 10.16.2 が同梱されています。 |
| **TOPS** | 毎秒 1 兆(テラ)回演算 — AI スループットの一般的な単位。このキットは最大 67 sparse INT8 TOPS(33 dense INT8)とされています。NVIDIA は同じモジュールについて sparse と dense の両方の値を公表しています。 |
| **UEFI** | キットのブートファームウェアとそのセットアップメニュー。NVIDIA の起動スプラッシュが表示されている間に Esc を押すとセットアップに入ります。メニュー内の Boot Manager で、USB インストーラーを起動デバイスとして選択します。ファームウェアのバージョンもここに表示され、JetPack 7.2 以降には 36.0 より新しいバージョンが必要です。 |
| **unified memory** | CPU と GPU が共有する単一の 8 GB LPDDR5 メモリプール — このキットに独立したビデオメモリはありません。ファームウェアとカーネルの予約領域を除くと約 7.6 GB が使用可能で、オペレーティングシステム、モデル、およびそれらの KV キャッシュがすべてこの 1 つのプールから消費します。[メモリ効率](/ja/tutorials/jetson-orin-nano/memory-efficiency)を参照してください。 |
| **VPI** | Vision Programming Interface:Jetson 上のハードウェアアクセラレーションによる画像処理のための NVIDIA のライブラリ。JetPack 7.2.1 には VPI 4.1.4 が同梱されています。 |

## バージョン対応表

最も覚えておく価値のあるバージョン対応表:

| JetPack | Jetson Linux(L4T) | Ubuntu | カーネル | CUDA |
|---|---|---|---|---|
| **7.2.1**(現行) | **r39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.2.3(JetPack 6 の最後のリリース) | r36.5.2 | 22.04 | 5.15 | 12.6 |

特定のシステムが実際に何で動作しているかを確認するには:
`cat /etc/nv_tegra_release`([システムの確認](/ja/tutorials/jetson-orin-nano/verify-your-system)を参照)。

## 出典

- [Jetson Orin Nano Developer Kit — はじめに](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html)(2026-09-26 確認)
- [Jetson Orin Nano Developer Kit — クイックスタートガイド](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)(2026-09-26 確認)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html)(2026-09-26 確認)
- [Jetson Orin Nano Developer Kit — How-to ガイド](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)(2026-09-26 確認)
- [JetPack SDK ダウンロード](https://developer.nvidia.com/embedded/jetpack/downloads) — ⚠️ コンポーネント表は行ごとに遅れています(VPI と PVA の行は依然として JetPack 7.2 の値です)。コンポーネントのバージョンには代わりに [NVIDIA のパッケージリポジトリ](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)を使用してください(2026-09-26 確認)
- [Jetson Linux r39.2.1 リリースノート(PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)(2026-09-26 確認)
- [TensorRT Edge-LLM — サポートマトリクス](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html)(2026-09-26 確認)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson(NVIDIA Technical Blog)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)(2026-09-26 確認)
- [Jetson Orin Nano シリーズ — 電力とパフォーマンス(L4T r39.2 開発者ガイド)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html)(2026-09-26 確認)
- [NVIDIA Jetson Orin ファミリー — 仕様](https://developer.nvidia.com/embedded/jetson-orin)(2026-09-26 確認)
- [DeepStream SDK — インストール](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html)(2026-09-26 確認)
- [NVIDIA フォーラム — 「25W と MAXN_SUPER が JetPack 7.2 で表示されない」(NVIDIA スタッフの回答)](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627)(2026-09-26 確認)

*ステータス:ドラフト、cheny によるレビュー待ち。定義は NVIDIA のドキュメントと
業界標準の用法に基づいてまとめたものです。バージョン番号は記載の日付時点で確認して
います。Juxi Technology による実機検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology
によって公開されており、NVIDIA の公式出版物ではありません。
