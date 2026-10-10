---
title: 書き込みと更新 — BSP インストール方法
sidebar_label: 書き込みと更新
slug: /getting-started/flashing-and-updates
description: Jetson AGX Orin 開発者キットに BSP をインストールまたは更新する 3 つの公式な方法 — Jetson ISO(推奨)、NVIDIA SDK Manager、Linux_for_Tegra 書き込みスクリプト — および Force Recovery モードへの入り方を解説します。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# 書き込みと更新 — BSP インストール方法

NVIDIA は、開発者キットに BSP をインストールまたは更新する 3 つの公式な方法を
提供しています。状況に応じて選んでください:

| | 💾 eMMC から始める | 🛠️ SDK Manager | 📜 書き込みスクリプト |
|---|---|---|---|
| 概要 | 書き込み済みの eMMC から起動し、Jetson ISO で更新 | ホスト PC 上の GUI ツール。BSP を書き込み、JetPack パッケージもインストール可能 | ホスト PC 上の `flash.sh` スクリプト |
| Ubuntu ホスト PC | **不要** | 必要 | 必要 |
| 所要時間の目安 | 初回起動はすぐに可能。ISO 更新は約 15 分 | 書き込みに約 30 分 | 環境によって異なります |
| 対象者 | すべての方(推奨のデフォルト) | Ubuntu PC をお持ちの方。NVMe/microSD/USB への書き込みや、キットを直接インターネットに接続できない場合に必要 | 製品開発者、上級ユーザー |

> **Juxi の補足:** 現在のリリースは **JetPack 7.2.1(L4T r39.2.1)** です。お手元の
> キットが新品の場合は、まず **[クイックスタート](/ja/tutorials/jetson-agx-orin/quick-start)** から始めてください — 推奨される
> 手順を最初から最後まで案内します。

## 方法 1 — eMMC から始めて Jetson ISO で更新(推奨)

開発者キットには、L4T BSP が eMMC に書き込み済みの状態で出荷され、箱から出して
すぐに Ubuntu デスクトップへ起動します。推奨の更新方法は **Jetson ISO** です
— 起動可能な USB メモリで、**Ubuntu ホスト PC なしで**キットを更新できます。

**前提条件:** インストール済みの BSP が **L4T r35.5 以降**である必要があります
(`cat /etc/nv_tegra_release` で確認できます)。それより古いキットでは、先にホスト PC を
使う方法(下記の方法 2 または 3)が必要です。

詳細な手順(Balena Etcher での USB 作成、UEFI ブート、QSPI capsule のプロンプト、
GRUB メニュー、ストレージの選択、初回起動)は
**[クイックスタート → ステップ 2](/ja/tutorials/jetson-agx-orin/quick-start)** にあります。

NVIDIA のドキュメントからの要点:

- GRUB メニューでインストール先を選択します: **eMMC** または **NVMe**(SSD を増設した場合は NVMe を推奨)。
- プロンプトが表示されたら、`Y` で **QSPI capsule 更新**を確定してください — 互換性のために必須で、2 回実行されます。スキップするとインストールに問題が生じます(この件は L4T リリースノートに既知の問題 6266271 としても記載されています)。
- すでに JetPack 7.2.1 が動作しているシステムへの再インストールもサポートされています — 公式の手順に注意深く従ってください。

## 方法 2 — NVIDIA SDK Manager(ホスト PC)

次のような場合には SDK Manager を選んでください:

- eMMC とは**別の記憶媒体**(NVMe SSD、USB ドライブ、microSD カード)にベースの L4T BSP を書き込む場合、または
- **直接インターネットに接続できない**キットに書き込む場合。

**ホスト PC の要件**(NVIDIA の SDK Manager ドキュメントに準拠):x86_64 上の Ubuntu
Desktop **20.04 または 22.04**、8 GB のシステムメモリ、25 GB の空きディスク
容量、およびツールのダウンロードとログインに必要な **NVIDIA Developer Program
メンバーシップ**(無料)。注:L4T 39.2 リリースノートでは、書き込み用のホスト Linux
ディストリビューションは Ubuntu **24.04 と 22.04** と記載されています — この分野は
動きが速いため、最新のリストは NVIDIA の SDK Manager システム要件ページで
確認してください。

**インストールとログイン:**

1. NVIDIA から SDK Manager の `.deb` パッケージをダウンロードしてインストールします:
   `sudo apt install ./sdkmanager_*-*_amd64.deb`
2. `sdkmanager` で起動し、**NVIDIA DEVELOPER** タブをクリックしてログインします。

**ハードウェアの接続と Force Recovery モード:**

1. 同梱の USB-A↔USB-C ケーブルでキットをホスト PC に接続します。ケーブルは **40 ピンヘッダの隣にある USB-C ポート**(port 10 / J40 と表記)に差し込みます。
2. **中央の Force Recovery ボタン**(ボタン 2、Power と Reset の間)を**押し続けながら**、USB-C 電源を DC ジャックの上にある USB-C ポートに差し込みます。キットは **Force Recovery モード**で起動します。
3. ホスト側では、SDK Manager がキットを検出するはずです。*(検出されない場合は、[トラブルシューティング](/ja/tutorials/jetson-agx-orin/troubleshooting)を参照してください。)*

**SDK Manager での書き込み手順**(概要 — 画面の指示に従ってください):

1. **ステップ 01:** 製品カテゴリで **Jetson** を選択し、"Host Machine" のチェックを外し、**Jetson AGX Orin** モジュールを選択して続行します。
2. **ステップ 02:** ベース BSP のみが必要な場合は、**Jetson OS** だけを選択します("Jetson SDK Components" のチェックを外します)。ライセンスに同意します。
3. **ステップ 03:** sudo パスワードを入力し、ダウンロードを待ちます。書き込みダイアログで **"Manual Setup – Jetson AGX Orin"** を選択し、OEM 設定は無視して、書き込み先の**ストレージデバイス**を選択し、**Flash** をクリックします。
4. 書き込みが完了すると、キットは新しい BSP で再起動します。Ubuntu の `oem-config` を完了し、続いて JetPack コンポーネントをインストールします([クイックスタート → ステップ 3](/ja/tutorials/jetson-agx-orin/quick-start)を参照)。

## 方法 3 — Linux_for_Tegra 書き込みスクリプト

上級ユーザーと製品開発者向け:Jetson Linux パッケージの `flash.sh`(または initrd flash)
スクリプトは、ホスト PC から Jetson デバイスに書き込みを行います。
[Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide) の
**Flashing Support** セクションを参照してください。

L4T 39.2 リリースノートに記載されたホストとツールチェーンの情報:書き込み用のホスト
Linux ディストリビューション — Ubuntu 24.04 / 22.04、クロスコンパイルツールチェーン —
GCC 13.2、ソースリリースタグ — `jetson_39.2_GA`。

## Force Recovery モード — 入り方

手順は上記と同じです。実行にホストは必要ありません:

1. キットの電源を切った状態で、USB-C データケーブルをホストに接続します(ホストが必要な場合)、
2. **中央の Force Recovery ボタンを押し続けながら**、USB-C 電源を接続します — キットは Force Recovery モードで起動します。

リカバリーモードを終了するには、キットの電源を入れ直すかリセットしてください。ホスト側
では、リカバリーモードは通常 NVIDIA の USB デバイスとして表示されます(`lsusb`)。

## 書き込み後

結果を確認しましょう:**[システムの検証](/ja/tutorials/jetson-agx-orin/verify-your-system)** — L4T、CUDA、
そして JetPack コンポーネント一式のバージョンチェックができます。

## 参考資料

- [BSP のインストール — Jetson AGX Orin Developer Kit ユーザーガイド](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html)(2026-09-23 確認)
- [クイックスタート — 同じガイド](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html)(2026-09-23 確認)
- [Jetson Linux 39.2.0 リリースノート(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)(2026-09-23 確認)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)

*ステータス: レビュー済み（2026-10-11）。記載日時点の NVIDIA 公式
ドキュメントに基づく内容です。Juxi Technology による実機での検証はまだ
行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。このページは
Juxi Technology によって公開されているものであり、NVIDIA の公式出版物ではありません。
