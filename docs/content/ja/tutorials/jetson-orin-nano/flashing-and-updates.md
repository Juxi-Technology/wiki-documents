---
title: 書き込みと更新 — BSP インストール方法
sidebar_label: 書き込みと更新
slug: /getting-started/flashing-and-updates
description: >-
  Jetson Orin Nano Super Developer Kit に BSP をインストールまたは更新する 3 つの
  公式な方法 — Jetson ISO(推奨)、NVIDIA SDK Manager、Linux_for_Tegra 書き込み
  スクリプト — に加えて、ストレージの選択、旧キット向けの JetPack 6.x ファームウェア
  更新パス、Force Recovery モードを解説します。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html
    checked: 2026-09-26
review_owner: cheny
---

# 書き込みと更新 — BSP インストール方法

NVIDIA は、Jetson Orin Nano Super Developer Kit に BSP(Jetson Linux)をインストールまたは更新する 3 つの公式な方法を提供しています。2 つのハードウェア上の事実がそのすべてに影響します:箱に**ストレージがない**こと(eMMC も microSD カードも SSD もなし)、そして JetPack 7.2 が **SD カードイメージを廃止**したことです — USB メモリ上の統合 ISO がそれに代わり、microSD カード自体は有効なインストール先として残ります。

| | Jetson ISO(推奨) | NVIDIA SDK Manager | Linux_for_Tegra 書き込みスクリプト |
|---|---|---|---|
| 概要 | 任意の PC で作成した USB インストーラーからキットを起動し、キット上でインストール先ストレージを選択 | ホスト PC 上の GUI ツール。USB-C 経由で選択したストレージに BSP を書き込む | ホスト PC 上のコマンドライン書き込みツール。インストール先を直接制御できる |
| Ubuntu ホスト PC | 不要 | 必要(x86_64) | 必要(x86_64) |
| 所要時間の目安 | 非公開。インストーラーは「数分間」出力を表示 | 非公開。ホストが先に BSP とルートファイルシステムをダウンロード | 環境によって異なります |
| 対象者 | 新しいキットの初回セットアップ、ほとんどのユーザー | Ubuntu PC をお持ちのユーザー。NVMe SSD へ直接書き込む場合に NVIDIA が推奨する経路。ファームウェア更新にも使用 | 上級ユーザーと製品開発者 |

NVIDIA はインストール時間を公表していません。フォーラムの報告は約 15 分から 2 時間まで幅があります(未確認)。

> **Juxi 注記:** 現在のリリースは **JetPack 7.2.1(L4T r39.2.1)** です。新しいキットでは、まず
> **[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)** から始めてください — 推奨される ISO 経路を最初から
> 最後まで案内します。経路の比較、ストレージの選択、旧キットの更新を行う場合はここに戻ってください。

## 方法 1 — Jetson ISO(推奨)

Jetson ISO は NVIDIA 推奨の初回セットアップ経路であり、Ubuntu ホスト PC を必要としない唯一の方法です:任意のコンピューターで 1 つの ISO ファイルを USB メモリに書き込み、その USB メモリからキットを起動し、用意したストレージにインストールします。次のものを用意してください:

- **インストール先ストレージ**(キットにはありません。下記のストレージの節を参照):**microSD カード、64 GB UHS-1 以上(推奨)**を**モジュールの裏面**のスロットに、インストーラーを起動する前に挿入するか、**NVMe SSD**(任意。より大容量でストレージ性能が向上するため推奨)。
- **USB メモリ、16 GB 以上** — これがインストーラーになります。
- **ノート PC またはデスクトップ PC(Windows、Mac、Linux)で、25 GB 以上の空き容量があるもの** — ISO の書き込みに使用します。
- **DisplayPort モニターと USB キーボード**(ヘッドレスセットアップの場合は USB-TTL シリアルケーブル。HDMI はサポートされません)、および付属の 19 V 電源。

成功を左右する注意点が 2 つあります:ファームウェアが JetPack 6.x 世代であること — ディスプレイが真っ黒のまま、または UEFI シェルが表示される場合は、先に下記の JetPack 6.x アップデートパスを実行してください — そして、QSPI capsule プロンプトでは 30 秒以内に `Y` キーを押すことです。プロンプトがタイムアウトするとインストールは後で失敗するため、インストールを再起動して `Y` キーを押してください。

> **重要** — ISO は **microSD カードではなく USB メモリ**に書き込んでください(「Jetson ISO を
> microSD カードに書き込まないでください」)。インストールはまた、**選択したインストール先
> ストレージを消去します**。開始する前に、どのデバイスを選択したかを確認してください。

詳細な手順(ISO のダウンロード、Balena Etcher、UEFI Boot Manager、GRUB メニュー、ストレージの選択、初回起動時の Ubuntu セットアップ)は **[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)** にあります。インストーラー USB は「Live USB」では**ありません**(インストールのみを行う)ので、インストール後にプロンプトが表示されたら取り外してください。

## 方法 2 — NVIDIA SDK Manager(ホスト PC)

SDK Manager はホスト PC 経由の方法です:USB-C 経由で BSP を書き込み、キットのファームウェアも更新できます(下記のアップデートパスの節を参照)。

**ホスト PC の要件**(キットの BSP Setup ページに準拠):**Ubuntu 22.04 または Ubuntu 20.04 が動作する x86 PC**;**インターネット接続と無料の NVIDIA Developer Program アカウント**;キットの USB-C ポート用の **USB ケーブル**、および「ジャンパーピンまたは金属製のペーパークリップ」;キット用のディスプレイまたは USB-TTL シリアルケーブル。

> **Juxi 注記:** NVIDIA の情報源はここで一致していません。キットのセットアップページには
> Ubuntu 22.04 または 20.04 と記載されていますが、L4T r39.2.1 リリースノートには書き込み用
> ホストディストリビューションとして「Ubuntu 24.04 と 22.04」が記載されています。ホスト PC を
> 準備する前に、NVIDIA の SDK Manager の要件を確認してください。

**ホストに SDK Manager をインストールします。** NVIDIA のセットアップページに Ubuntu 22.04 と 20.04 向けの正確なコマンドが記載されています。`sdkmanager` で起動し、NVIDIA Developer の認証情報でログインします(ブラウザーウィンドウが開きます。二要素認証が表示される場合があります)。

**BSP を書き込みます**(概要。画面の指示に従ってください)。SDK Manager は USB 経由で書き込むため、まずキットを Force Recovery モードにします(下記参照):

1. **Jetson Orin Nano [8GB developer kit version]** を選択して **OK** をクリックします。**Host Machine** のチェックを外して Jetson ターゲットだけが選択された状態にし、**Continue** をクリックします。次のステップでは **Jetson Linux** だけを選択したままにし、ライセンスに同意して、ホストの sudo パスワードを入力します。
2. 書き込みのプロンプトで(SDK Manager は先にパッケージをダウンロードします):**Runtime for OEM Configuration** を選択し、ストレージとして **NVMe** または **SD Card** を選択し、**Flash** をクリックします。
3. 書き込みが完了したら、J14 ヘッダーからジャンパーを取り外し、キットの電源を入れ直して、Ubuntu の初期設定(oem-config)を完了します。

> **Juxi 注記 — モジュール SKU:** このキットには **P3767-0005** モジュールが搭載されており、
> NVIDIA はこれを "Jetson Orin Nano 8GB (P3767-0005, for development only)" と記載しています。
> 商用の 8GB Orin Nano モジュールは **P3767-0003** です — 別の SKU であり、このキットには
> 含まれません。NVIDIA がこのキットに付けたターゲットエントリ名
> **Jetson Orin Nano [8GB developer kit version]** を使用してください。

## 方法 3 — Linux_for_Tegra 書き込みスクリプト

上級ユーザーと製品開発者向け:Jetson Linux Driver Package を使ったコマンドラインからの書き込みです。NVIDIA のセットアップページより:お使いの JetPack リリース用の Driver Package とサンプルルートファイルシステムをダウンロードし、Ubuntu x86_64 ホストで Driver Package を展開し、サンプルルートファイルシステムを `Linux_for_Tegra/rootfs` に展開して `Linux_for_Tegra` から `apply_binaries.sh` を実行し、キットを Force Recovery モードにして(下記)、Jetson Orin Nano Developer Kit ターゲット用の適切な書き込みコマンドを実行します。ターゲット名と詳細なコマンドは Jetson Linux Developer Guide にあります。

- このキットのターゲット名は `jetson-orin-nano-devkit` と `jetson-orin-nano-devkit-super` です。NVIDIA は Super 構成について「より高い電力バジェットと拡張されたクロック周波数ステップ」を持つと注記しています。
- Developer Guide のこのキット向けの例 — Super 構成の NVMe:
  `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`
  (`--erase-all` オプションはインストール先ストレージのデータを消去します)。
- L4T r39.2.1 リリースノートより:書き込み用ホスト — Ubuntu 24.04 / 22.04。ツールチェーン — GCC 13.2。ソースタグ — `jetson_39.2.1_GA`。JetPack ダウンロードページより:BSP パッケージ — `Jetson_Linux_R39.2.1_aarch64.tbz2`。

## インストール先ストレージの選択:microSD 対 NVMe SSD

インストーラーは、起動時に**すでに接続されている**ストレージしか提示しません。先に決めて、ストレージを取り付けてから、インストーラーを開始してください。

| | microSD カード | NVMe SSD |
|---|---|---|
| 仕様 | 64 GB UHS-1 以上を推奨 | M.2 Key-M スロットの PCIe NVMe ドライブ |
| 装着場所 | **モジュールの裏面**のスロット | M.2 Key-M 2280 スロット(PCIe 3.0 ×4)または 2230 スロット(PCIe 3.0 ×2) |
| 選ぶ理由 | モジュールのデフォルトストレージ。最も簡単で低コストな選択肢 | より大容量でストレージ性能も高い。AI モデル、コンテナー、データセット、プロジェクトファイルに推奨 |

**microSD は今でも有効なインストール先です。** JetPack 7.2 が廃止したのは SD カードの*イメージファイル*であり、microSD という*インストール先*ではありません。ISO の流れでは、カードを挿した状態で USB インストーラーを起動してカードを選択します(SDK Manager でもホストから microSD カードに書き込めます)。microSD スロットは**モジュールの裏面**にあります。どのインストール経路も**選択したインストール先ストレージを消去する**ため、必要なデータが入ったドライブは選択しないでください。インストーラーがお使いの NVMe ドライブを提示しない場合は **[トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)** を、購入のアドバイスは **[FAQ](/ja/tutorials/jetson-orin-nano/faq)** を参照してください。

## 旧キット:JetPack 6.x アップデートパス

**これが必要になる場合:** JetPack 7.2 以降は JetPack 6.x 世代の UEFI/QSPI ファームウェアを必要とします。NVIDIA の基準:ファームウェアが **36.x 以降**ならキットは準備完了、**36.0 より古い**なら先にこのパスを完了してください(UEFI メニューでバージョンを確認します。手順は[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)にあります)。公式な経路は 2 つあります:下記の **microSD ブリッジ方式**は microSD カードが必要ですが Ubuntu ホスト PC は不要です。**SDK Manager**(方法 2)は Ubuntu ホスト PC が必要で、ファームウェア/QSPI 更新のために NVIDIA が挙げている代替手段です。

ブリッジ方式を、NVIDIA が文書化した順序で示します:

1. **JetPack 5.1.3 ブリッジイメージ**(`JP513-orin-nano-sd-card-image_b29.zip` — 更新版のイメージを使用)を microSD カードに書き込み、そこからキットを起動し、初回起動の Ubuntu セットアップを完了して、キットをインターネットに接続します。
2. バックグラウンドサービスがブートローダーの更新をスケジュールします(デスクトップ通知が表示されることがあります)。`sudo systemctl status nv-l4t-bootloader-config` で確認します — 「スケジュール実行が完了すると、サービスは正常終了ステータスで inactive と表示されます」。

   ![Jetson Linux デスクトップのブートローダー更新通知](/images/jetson-orin-nano/nvidia-l4t-bootloader-post-install-notification.png)

3. 再起動します。起動中にファームウェア更新が実行されます。後で `sudo nvbootctrl dump-slots-info` で状態を確認します — この段階での NVIDIA の出力例は "Current version: 35.5.0" です。

   ![JetPack 6.x ファームウェアからのファームウェア更新の進行状況](/images/jetson-orin-nano/fw-update_from_36-4.3.jpg)

4. QSPI アップデーターをインストールします:`sudo apt update`、続いて
   `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`。再起動して更新を完了させます。
5. これでファームウェアは JetPack 6.x 世代に対応し、5.1.3 カードは起動対象メディアではなくなります。電源を切り、USB インストーラーから JetPack 7.2.1 のインストールを実行します([クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)を参照)。

補足:JetPack 6.2.x を経由すると、その初回起動後に**さらに** UEFI ファームウェア更新がスケジュールされることがあります — プロンプトが表示されたらもう一度再起動してください。r39.2.1 リリースノート(既知の問題 6379600)より、ISO インストール中の capsule 更新は **BSP 36.2 / JetPack 5.0 DP** リリースのユニットをサポートしません — そのようなユニットは先により新しいリリースに更新してください。

## Force Recovery モード — 入り方

Force Recovery モード(RCM)は、ホスト PC が書き込みに必要とする状態です。NVIDIA は 3 つの方法を文書化しています:

1. **動作中のシステムのターミナルから:** `sudo reboot --force forced-recovery`。
2. **キットの電源が切れている場合:** ボタンヘッダー(セットアップページでは J14 ヘッダーと呼んでいます)のピン 9 とピン 10 を接続し、DC 電源を差し込んで電源を入れます。
3. **キットの電源がすでに入っている場合:** ピン 9 と 10 を接続し、次にピン 7 と 8 を一時的に接続してシステムをリセットします。

RCM に入ったら、ホストがデバイスを検出した時点でジャンパーを取り外します。**USB-C ポート**が書き込み接続を担い(USB Recovery モードとして動作します)、ホスト側では書き込みを開始する前に `lsusb` で NVIDIA の USB デバイスが表示されるはずです。

## 再インストールとアップグレード

**動作中のキットで JetPack コンポーネントを更新します** — `sudo apt update`、続いて `sudo apt install nvidia-jetpack` を実行します([クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)を参照)。

**BSP を再インストールします(同じまたは新しい JetPack)。** 3 つの経路のいずれかをもう一度実行します。ISO 方式はデバイス上で完結する選択肢です。ISO 再インストールに関する NVIDIA の注意:「すでにインストール済みのシステムに ISO を使って JetPack 7.2.1 を再インストールする場合は、Getting Started Guide の手順に注意深く従ってください」。再インストールは**インストール先ストレージを消去します**(先にバックアップしてください)。QSPI capsule プロンプトが表示されたら、30 秒以内に `Y` キーを押してください。完了したら USB インストーラーを取り外し、キットが新しいシステムを起動するようにします。

**再インストール後の Super モード。** 7.2.1 の ISO は「デフォルトで Super Mode の書き込み構成で Jetson Orin Nano Developer Kit を書き込みます」。以前の 7.2 リリースでは、ISO で更新したキットは以前のプロファイルを維持し、25 W / MAXN SUPER モードがない状態になることがありました(r39.2 の既知の問題 6279443。NVIDIA のガイダンスは Linux ホストまたは SDK Manager から書き込むことでした)。NVIDIA は、7.2.1 ISO の再実行で既存の非 Super インストールが Super に変換されるかどうかを文書化していません。キットに 25 W / MAXN SUPER モードがない場合は **[トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)** を参照してください。

**JetPack メジャーバージョン間の移行。** JetPack 6.x → 7.2.1 の変更一覧とロールバックの注意については **[JetPack 6.x → 7.2.1](/ja/tutorials/jetson-orin-nano/jetpack-6-to-7)** を参照してください。インストールまたは更新の後は、結果を検証してください:**[システムの確認](/ja/tutorials/jetson-orin-nano/verify-your-system)**。

## 参考資料

- [BSP Setup — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html) (2026-09-26 確認)
- [Quick Start — 同じガイド](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (2026-09-26 確認)
- [JetPack 6.x Update Path — 同じガイド](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (2026-09-26 確認)
- [How-To — 同じガイド](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (2026-09-26 確認)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (2026-09-26 確認)
- [Jetson Linux Developer Guide (r39.2.1) — Quick Start](https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html) (2026-09-26 確認)
- [JetPack Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-26 確認)
- [SDK Manager — monitor-attached installation instructions](https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html) (2026-09-26 確認)

*ステータス: レビュー済み（2026-10-11）。記載日時点の NVIDIA 公式ドキュメントに基づく内容です。Juxi Technology による実機検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
