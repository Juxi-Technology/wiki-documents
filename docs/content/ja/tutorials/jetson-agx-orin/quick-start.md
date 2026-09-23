---
title: クイックスタート — 開梱から JetPack 7.2.1 システムが動作するまで
sidebar_label: クイックスタート
slug: /getting-started/quick-start
description: >-
  NVIDIA Jetson AGX Orin 開発キット(64GB)のウォークスルー:初回起動、Jetson ISO
  方式による BSP の JetPack 7.2.1(L4T r39.2.1)への更新、および JetPack
  コンポーネントのインストール。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
review_owner: cheny
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
---

# クイックスタート

本ページでは、Jetson AGX Orin 開発キット(64GB)を箱から取り出した状態から、**JetPack 7.2.1** に完全更新されたシステムまで導きます。以下の手順は NVIDIA が現在推奨するセットアップフローに従っており、各ステップは本ページ下部に記載した日付時点で NVIDIA 公式の開発キットドキュメントと照合済みです。

**3 ステップの流れ:**

1. **箱から出してそのまま起動**し、Ubuntu の初期設定(`oem-config`)を完了します。
2. **Jetson ISO** 方式で BSP を L4T r39.2.1(JetPack 7.2.1)に**更新**します — 起動可能な USB メモリを使い、Ubuntu ホスト PC は不要です。
3. 1 つの `apt` コマンドで **JetPack コンポーネント**(CUDA、cuDNN、TensorRT など)を**インストール**します。

> **なぜ SDK Manager ではなく USB ISO 更新なのか?**
> NVIDIA は現在、開発キットには Jetson ISO 方式を推奨しています。この方式は USB
> メモリからボードを直接更新し、別途 Ubuntu ホストマシンを必要と**しません**。SDK
> Manager も代替手段として利用できます(ステップ 3b を参照)。

## 必要なもの

同梱品:

- Jetson AGX Orin モジュールとリファレンスキャリアボード
- Wi-Fi モジュール
- USB Type-C 電源アダプタ
- USB Type-C - USB Type-A ケーブル

別途用意するもの:

- DisplayPort 入力のあるディスプレイと DisplayPort ケーブル、および USB キーボードとマウス — **または**、ヘッドレスセットアップを希望する場合は 2 台目のコンピューター(Windows/Mac/Linux)
- インターネット接続(イーサネットケーブル、またはセットアップ中に設定する Wi-Fi)
- ISO イメージを保存できる十分な容量の USB メモリ(サイズはダウンロードページで確認してください) — ステップ 2 の ISO 更新に必要です
- インストール用 USB を作成するための PC(Balena Etcher は Windows/Mac/Linux で動作します)

## ステップ 1 — 初回起動と Ubuntu 初期設定

開発キットには L4T BSP イメージがあらかじめ eMMC に書き込まれた状態で出荷され、箱から出してすぐに Ubuntu デスクトップが起動します。出荷直後の製品には**古い** L4T バージョン(例:r35.x / JetPack 5.x)が搭載されている場合がありますが、ステップ 2 でどの製品も最新リリースに更新できます。

ディスプレイを接続する場合:

1. DisplayPort 対応のディスプレイ、USB キーボードとマウス、(任意で)イーサネットケーブルを接続します。
2. 付属の電源アダプタを **DC ジャックの上にある USB Type-C ポート**に接続します。キットは自動的に電源が入り、電源ボタン付近の白い LED が点灯します。点灯しない場合は、電源ボタンを押します。
3. 約 1 分で Ubuntu の画面が表示されます。初回起動では `oem-config` のウィザードに従って、NVIDIA ソフトウェアの EULA への同意、言語/キーボード/タイムゾーンの選択、ユーザーアカウントの作成、ネットワークの設定を順に行います。
4. `oem-config` が完了すると、キットは再起動して Ubuntu デスクトップが表示されます。

![初期設定後の Ubuntu デスクトップ](/images/jetson-agx-orin/ubuntu_initial_desktop_1280x720.png)

ヘッドレスセットアップは別のコンピューターからも可能です — 正確な接続方法は NVIDIA の Quick Start Guide(下部のリンク)を参照してください。

> **Juxi のヒント:** NVMe SSD からシステムを運用する予定がある場合は、ステップ 2
> でその点を考慮してください — ISO インストーラーは NVMe ドライブに直接インストールできます。

## ステップ 2 — Jetson ISO で BSP を更新する(推奨)

**前提条件:** ISO 方式を使用するには、インストール済みの BSP が **L4T r35.5 以降**である必要があります。まず次で確認します:

```bash
cat /etc/nv_tegra_release
```

JetPack 7.2.1 のシステムでは `# R39 (release), REVISION: 2.1` と表示されます。出力がこれより古いリリースの場合は、先に L4T r35.5 以降へ更新してください(後述の*注意点*を参照)。

1. JetPack 7.2.1 / L4T r39.2.1 用の **Jetson ISO をダウンロード**します:
   <https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso>
2. **インストール用 USB を作成します。** [Balena Etcher](https://etcher.balena.io) で ISO を USB メモリに書き込みます("Flash from file" → ISO を選択 → USB ドライブを選択)。
   > ISO ファイルをファイルマネージャーでドライブにコピーするだけでは**いけません** —
   > ディスクイメージとして書き込む必要があり、そうしないと起動しません。
3. **USB ドライブを開発キットに挿入**して電源を入れます。USB から自動的に起動しない場合は、起動中に UEFI ブートマネージャーを開き、USB ドライブを選択します。
4. **起動してインストールします:**
   - **QSPI カプセルアップデート**の確認を求められたら、`Y` を押します。このファームウェア更新は ISO インストールの*前に*実行され、**2 回**実行されます。スキップしないでください — 互換性のために必須です。プロンプトを見逃した場合は、インストールをやり直し、確認が表示されたら承認してください。
   - GRUB メニューで **Install Jetson ISO r39.2.1** を選択し、Enter キーを押します。
   - 矢印キーでインストール先のストレージを選択します:**eMMC**(デフォルトの内蔵ストレージ)または **NVMe**(SSD を取り付けた場合に推奨)。
   - インストールにはおよそ 15 分かかり、画面上にテキスト出力が流れます。
5. インストールが完了してシステムが再起動したら、**USB ドライブを取り外します** — 取り外さないと、キットが新しいシステムではなく再び USB メモリから起動してしまう可能性があります。
6. 更新後のシステムでは初回起動用の `oem-config` が開始されます — 新しいインストール用のユーザーアカウントを作成するため、Ubuntu のセットアップをもう一度完了してください。

### 表示される画面(順番どおり)

![Balena Etcher で ISO を USB ドライブに書き込む様子](/images/jetson-agx-orin/jetson-iso_etcher-flash-start.gif)
*Balena Etcher で Jetson ISO を USB ドライブに書き込みます。*

![USB ドライブを選択した UEFI ブートマネージャー](/images/jetson-agx-orin/jetson-iso_uefi_boot-manager-menu.png)
*キットが USB ドライブから自動的に起動しない場合は、UEFI ブートマネージャーで選択します。*

![QSPI カプセルアップデートの確認プロンプト](/images/jetson-agx-orin/jetson-iso__qspi_update_options.png)
*QSPI カプセルアップデートのプロンプト — `Y` を押します。互換性のために必須で、2 回実行されます。*

![Jetson ISO の GRUB メニュー](/images/jetson-agx-orin/jetson-iso_grub-menu-r39-top.png)
*"Install Jetson ISO r39.2.1" を選択します。*

![GRUB メニューのインストール先選択肢](/images/jetson-agx-orin/jetson-iso_grub-menu-options.png)
*インストール先として eMMC または NVMe を選択します。*

![インストーラーの進行画面](/images/jetson-agx-orin/jetson-iso_wait-for-15min.png)
*インストーラーはおよそ 15 分間実行されます。*

![更新後の oem-config ようこそ画面](/images/jetson-agx-orin/oem-config_welcome.png)
*更新後、新しいシステムをセットアップするために `oem-config` が再び実行されます。*

### 注意点と既知の問題

- **旧製品(< L4T r35.5):** Jetson ISO 方式では、インストール済みの BSP が r35.5 以降である必要があります。旧キットを先に更新するには、ホスト PC を使う方式(SDK Manager または `flash.sh` スクリプト)を使用してください — [書き込みとアップデート](/ja/tutorials/jetson-agx-orin/flashing-and-updates)を参照。
- **QSPI カプセルのプロンプトを見逃した?** ISO インストールをやり直し、`Y` を押します。
- **インストール中に画面が真っ黒になる:** KVM スイッチによっては、ISO インストール中の AGX Orin の映像出力をうまく扱えないことがあります。ディスプレイを開発キットに直接接続して、再試行してください。

## ステップ 3 — JetPack コンポーネントをインストールする

### 3a. `apt` を使用する(最も簡単 — ホスト PC 不要)

キットのデスクトップでターミナルを開き(`Ctrl`+`Alt`+`T`)、次を実行します:

```bash
sudo apt update
sudo apt dist-upgrade
sudo reboot
sudo apt install nvidia-jetpack
```

これにより、CUDA、cuDNN、TensorRT をはじめ JetPack スタックの残りがインストールされます。接続速度にもよりますが、**約 1 時間**かかる見込みです。

結果を確認します:`cat /etc/nv_tegra_release` が R39 / REVISION 2.1 を示し、CUDA ツールキットが利用可能になる(`nvcc --version`)ことを確認してください。完全なチェックリストは[システムの検証](/ja/tutorials/jetson-agx-orin/verify-your-system)を参照してください。

### 3b. SDK Manager を使用する(代替)

SDK Manager は、ホスト PC から USB 経由で JetPack コンポーネントをインストールします:

1. キットの電源を入れた状態で、同梱の USB Type-C - USB Type-A ケーブルを使い、キット上の **40 ピンコネクタの隣にある USB Type-C ポート**に接続してホスト PC とつなぎます。
2. SDK Manager で Jetson AGX Orin ターゲットを選択し、**Jetson SDK Components** を選び("Jetson OS" の再書き込みではなく)、画面の手順(USB 接続、アドレス `192.168.55.1`)に従います。

SDK Manager の詳細な手順は NVIDIA が管理しています(下記のリンクを参照)。当社の書き込みガイドでも詳しく扱う予定です。

## トラブルシューティング(クイックチェック)

| 症状 | 最初に確認すること |
|---|---|
| キットの電源が入らない | 電源が **DC ジャックの上**の USB-C ポートに接続されているか確認し、電源ボタンを押す |
| 画面が表示されない | DisplayPort ケーブルを確認(HDMI ディスプレイにはアクティブな DP→HDMI アダプタを使用)。ISO の USB を挿さずに起動してみる |
| ISO インストーラーが起動しない | USB が Etcher で書き込まれているか(ファイルコピーではないか)を確認。UEFI ブートマネージャーで USB を選択する |
| QSPI のプロンプトが表示された | `Y` を押す — 必須です。更新は 2 回実行されます |
| インストール中に画面が真っ暗になる | KVM スイッチの干渉 — ディスプレイを直接接続する |

## 出典と検証

本ページは Juxi Technology が NVIDIA の公式ドキュメントに基づいて作成・確認したものです:

- [Jetson AGX Orin Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (2026-09-23 確認)
- [Jetson AGX Orin Developer Kit User Guide — JetPack SDK Setup](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (2026-09-23 確認)
- [BSP Installation (SDK Manager / flash script)](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html)

*ステータス:ドラフト。手順はまだ Juxi Technology による実機検証が行われていません。上記の日付時点の NVIDIA 公式ドキュメントに基づいています。*

**画像クレジット:** 本ページのすべてのスクリーンショットは NVIDIA 公式の *Jetson AGX Orin Developer Kit User Guide*(2026-09-23 ダウンロード)からのもので、著作権は © NVIDIA Corporation に帰属します。公式のセットアップフローを説明するために掲載しています。

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ガイドは Juxi Technology が発行するものであり、NVIDIA の公式出版物ではありません。
