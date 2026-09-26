---
title: システムの確認 — バージョン、Super Mode、電源のチェックリスト
sidebar_label: システムの確認
slug: /getting-started/verify-your-system
description: >-
  Jetson Orin Nano Super Developer Kit が JetPack 7.2.1 を、完全なコンポーネント
  スタック、Super Mode のボード設定、正しい電力モードで実行していることを確認します。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
review_owner: cheny
---

# システムの確認

JetPack 7.2.1 システムの初回起動後に、このチェックリストを実行してください。**L4T リリース**、**インストール済みの JetPack コンポーネント**、**Super Mode のボード設定**、**電力モード**を確認します。まだシステムをセットアップしていない場合は、**[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)** から始めてください。

## ステップ 1 — L4T(BSP)リリースを確認する

```bash
cat /etc/nv_tegra_release
```

**JetPack 7.2.1** のシステムは **R39**、**REVISION: 2.1** を示します:

```
# R39 (release), REVISION: 2.1, GCID: 46758480, BOARD: generic, EABI: aarch64, DATE: Fri Aug 7 05:54:22 AM UTC 2026
# KERNEL_VARIANT: oot
TARGET_USERSPACE_LIB_DIR=nvidia
TARGET_USERSPACE_LIB_DIR_PATH=usr/lib/aarch64-linux-gnu/nvidia
```

> **Juxi 注記:** NVIDIA はこのファイルのサンプル出力を公開していません。上記のブロックは、
> Orin デバイスからコミュニティが観測した r39.2.1 の出力です。`GCID` と `DATE` の値は
> 環境によって異なります。重要なのは `REVISION: 2.1` の部分です。

出力がより古いリリース(例えば JetPack 6.x の R36)を示している場合、システムは JetPack 7.2.1 で動作していません — **[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)** と **[JetPack 6 から 7 への移行](/ja/tutorials/jetson-orin-nano/jetpack-6-to-7)** を参照してください。

## ステップ 2 — JetPack コンポーネントとバージョンを確認する

CUDA、cuDNN、TensorRT などの JetPack コンポーネントは Debian パッケージとしてインストールされています。NVIDIA 公式の一覧表示コマンドは次のとおりです:

```bash
apt list --installed | grep nvidia-jetpack
```

`nvidia-jetpack` メタパッケージが出力に含まれている必要があります。1 つのコンポーネントを抜き取り確認するには、`dpkg` を直接照会します — 例えば cuDNN なら `dpkg -l | grep cudnn` です。メタパッケージがない場合は、`sudo apt update`、続いて `sudo apt install nvidia-jetpack` を実行し、プロンプトが表示されたら再起動します。

下表は **JetPack 7.2.1 / Jetson Linux 39.2.1** に関する NVIDIA 公式のコンポーネントバージョン一覧です(2026-09-26 に JetPack ダウンロードページで確認):

| コンポーネント | バージョン |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| オペレーティングシステム | Ubuntu 24.04 (L4T) |
| カーネル | 6.8 |
| CUDA | 13.2.2 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI(コンピュータビジョン) | 4.1.4 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19(ISO イメージ同梱) |
| Isaac ROS | **出荷済み** — Isaac ROS 4.6.0(2026 年 8 月)が Jetson Orin と JetPack 7.2 のサポートを追加しました。NVIDIA のコンポーネント表は依然として「近日公開予定」と記載しています |

> **Juxi 注記:** NVIDIA の 7.2.1 ページは、JetPack 7 ライン全体(Thor と Orin をまとめて)の
> 1 つのマトリクスを示しており、プラットフォーム別ではありません。`dpkg` はビルドサフィックス
> 付きのバージョンを表示することがあります — 完全な文字列ではなくバージョン番号を照合して
> ください。NVIDIA の表には OpenCV、DLA、Python のバージョンが記載されていないため、
> 本ページにも記載しません。

> **VPI のバージョンについて:** NVIDIA のダウンロードページは 7.2.1 向けに完全には更新されて
> いません — VPI の行は依然として JetPack 7.2 の値(4.1.3)を記載しています。JetPack 7.2.1
> が実際に同梱するのは **VPI 4.1.4** です。これは NVIDIA 自身のパッケージリポジトリで確認
> できます: `nvidia-jetpack-runtime (= 7.2.1-b49)` は `nvidia-vpi (= 7.2.1-b49)` に依存し、
> これが `libnvvpi4 (= 4.1.4)` を固定します。4.1.3 と 4.1.4 の両方がパッケージプールに
> 存在するため、決め手となるのは依存関係のロックだけです。(2026-09-26 確認)

## ステップ 3 — jtop をインストールしてシステムの稼働状況を確認する(任意)

`jtop` はコミュニティプロジェクト **jetson-stats** の一部であり、NVIDIA の製品ではありません。NVIDIA はこのリリース向けに文書化しておらず、L4T r39 との互換性は NVIDIA によって検証されていません。

[jetson-stats プロジェクトページ](https://pypi.org/project/jetson-stats/)のコミュニティの手順に従ってインストールしてください。

次に `jtop` を実行します — 対話型のシステムモニター兼プロセスビューアーです。大きな AI ワークロードを開始する前に、8 GB の共有統合メモリを監視してください。公式の代替手段は `sudo tegrastats` です(CPU、GPU、メモリ、温度、電力関連の稼働状況をライブ表示します。`Ctrl`+`C` で停止します)。NVIDIA の How-To ページは、Jetson でのモニタリングに `nvidia-smi` より `tegrastats` を推奨しています。

## ステップ 4 — Super Mode のボード設定を確認する(TNSPEC)

JetPack 7.2.1 の ISO インストールは、デフォルトで **Super Mode** 構成を書き込みます。デバイス上で確認します:

```bash
cat /etc/nv_boot_control.conf
```

Super 構成のキットでは、`TNSPEC` 行に `-super` サフィックスが付きます。NVIDIA の担当者が次の例を投稿しています:

```
TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-
```

非 Super のキットでは、同じ行が `-super` なしで終わります — 例えば、影響を受けたシステムのユーザー報告から:`TNSPEC 3767-300-0005-X.1-1-1-jetson-orin-nano-devkit-`

> **Juxi 注記:** TNSPEC 文字列の中ほどの文字はユニットやファームウェアの状態によって異なります。
> 重要なのは、TNSPEC 行の末尾に付く `-super` サフィックスです。

リリースノートの既知の問題 **6480645**:ISO インストール後、UEFI 変数 `TegraPlatformSpec` がボード仕様を正確に反映しないことがあります。NVIDIA は、正しいボード情報は `/etc/nv_boot_control.conf` の `TNSPEC` エントリを読むよう述べています。

## ステップ 5 — 電力モードを確認する

デフォルトの電力モードは通常 **25W** です。デスクトップから:Ubuntu のトップバーで電力モードをクリックし、**Power Mode** を選択して **MAXN SUPER** を選びます。コマンドラインからは、現在のモードとモード ID を表示します:

```bash
sudo /usr/sbin/nvpmodel -q
```

モードを切り替えるには、照会で表示された ID を使用します(`sudo /usr/sbin/nvpmodel -m <mode_id>`)。Super と非 Super の見分け方:

| | Super 構成 | 非 Super 構成 |
|---|---|---|
| 利用可能なモード | 15W、25W、**MAXN SUPER** | 7W、15W のみ |
| モード ID(コミュニティ観測) | 0 = 15W、1 = 25W、2 = MAXN_SUPER、デフォルト 25W | 0 = 15W、1 = 7W |
| `sudo nvpmodel -m 2` | MAXN SUPER を選択 | 失敗:`NVPM ERROR: request for bad power mode 2` |

> **Juxi のヒント:** モード ID は 7.2 システム上のプロファイルファイルに関するコミュニティ報告に
> よるものです。デスクトップの電源メニューには利用可能なモードが直接一覧表示されます。GPU を
> 使用した後は、電力モードの変更に再起動を求められることがあります — NVIDIA の担当者によると、
> このプロンプトは想定どおりです。

## 7W と 15W しか表示されない場合

これは JetPack 7.2 の既知の問題で、7.2.1 で設計上修正されました。

- **JetPack 7.2(L4T 39.2)** では、既知の問題 **6279443** が、ISO インストーラーで更新したユニットは「デフォルトで 'Super' モードにならない」と述べています。NVIDIA のガイダンスは、Linux ホストまたは SDK Manager でインストール先に書き込むことでした。
- **JetPack 7.2.1** はこれを変更しました:「ISO は Jetson Orin Nano Developer Kit をデフォルトで Super Mode の書き込み構成でフラッシュするようになりました」。問題 6279443 は 7.2.1 の既知の問題一覧になく、NVIDIA の担当者は「これは jp7.2.1 で修正される予定です」と述べています。

新規の 7.2.1 ISO インストールでは、25W と MAXN SUPER が表示されるはずです。表示されない場合:

1. 7.2 ISO でインストールされたシステムの場合、Linux ホストまたは SDK Manager から Super 構成で再書き込みします — **[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)** を参照してください。
2. NVIDIA は、7.2.1 ISO の再インストールが 7.2 ISO でインストールされたボードを変換するかどうかを述べていません。それでも Super モードが表示されない場合は、**[トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)** の再書き込みの選択肢を使用してください。

同じ疑問は **[FAQ](/ja/tutorials/jetson-orin-nano/faq)** にも索引されています。

## 正常な状態の例

| 確認項目 | コマンド | 正しいシステムの表示 |
|---|---|---|
| L4T リリース | `cat /etc/nv_tegra_release` | `R39 (release), REVISION: 2.1` |
| JetPack パッケージ | `apt list --installed \| grep nvidia-jetpack` | `nvidia-jetpack` メタパッケージを含む、インストール済みの JetPack パッケージ |
| cuDNN の抜き取り確認 | `dpkg -l \| grep cudnn` | バージョン 9.20.0 |
| ボード設定 | `cat /etc/nv_boot_control.conf` | `TNSPEC` 行が `jetson-orin-nano-devkit-super-` で終わる |
| 電力モード | `sudo /usr/sbin/nvpmodel -q` | デフォルトでは 25W がアクティブ。15W、25W、MAXN SUPER を選択可能 |

## それでも解決しない場合

コンポーネントが不足している場合:ステップ 2 の 2 つのコマンドを再実行してください。Super 構成または電力モードの問題は **[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)** と **[トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)** を参照してください。サポートを求める前に、`cat /etc/nv_tegra_release` と `cat /etc/nv_boot_control.conf` の出力を収集してください — NVIDIA の担当者は、構成ファイルの回避策に取り組む前にこの状態(`sudo /usr/sbin/nvpmodel -q --verbose` も)を求めています。Juxi サポート:**support@juxitech.com** まで、ご注文番号を添えてご連絡ください。

## 参考資料

- [JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) · [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) — Jetson Orin Nano Developer Kit User Guide (2026-09-26 確認)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-26 確認)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) · [39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (2026-09-26 確認)
- [NVIDIA forum — 25W and MAXN SUPER not seen in JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [continuing power-mode issues](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [Super Mode not unlocking](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) (2026-09-26 確認。NVIDIA 担当者の返信を含む)
- [jetson-stats (jtop) on PyPI](https://pypi.org/project/jetson-stats/) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) (2026-09-26 確認。jtop のインストールに関するコミュニティの情報源)

*ステータス:ドラフト、cheny によるレビュー待ち。記載日時点の NVIDIA 公式ドキュメントおよび NVIDIA フォーラムの情報に基づく内容です。Juxi Technology による実機検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
