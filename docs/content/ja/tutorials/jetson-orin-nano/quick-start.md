---
title: クイックスタート — 開梱から JetPack 7.2.1 が動作するシステムまで
sidebar_label: クイックスタート
slug: /getting-started/quick-start
description: >-
  NVIDIA Jetson Orin Nano Super Developer Kit (8GB)の初回セットアップ:
  ファームウェアの確認、Jetson 7.2.1 ISO の USB メモリへの書き込み、および
  JetPack 7.2.1(L4T r39.2.1)の microSD カードまたは NVMe SSD へのインストール。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# クイックスタート

本ページでは、NVIDIA Jetson Orin Nano Super Developer Kit (8 GB)を箱から出した状態から、**JetPack 7.2.1** が動作するシステム(Jetson Linux / L4T r39.2.1)まで導きます。NVIDIA が推奨する初回セットアップの流れ — USB メモリからインストールする **Jetson ISO** 方式に従います。Ubuntu ホスト PC は不要です。

**3 つのフェーズで進む流れ:**

1. **ファームウェアのゲートを通過します。** JetPack 7.2 をインストールする前に、古い工場出荷ファームウェアを更新する必要があります(ステップ 1)。
2. **インストーラー USB を作成します。** Jetson ISO をダウンロードし、Balena Etcher で USB メモリに書き込みます(ステップ 2～3)。
3. **インストールしてセットアップします。** microSD カードまたは NVMe SSD にインストールし、Ubuntu の初期設定を完了してから、JetPack コンポーネントを追加します(ステップ 4～7)。

> **重要**
> JetPack 7.2 以降、NVIDIA はこのキット向けの microSD カードイメージを公開しなくなりました。
> **書き込むべき SD カードイメージはありません**。インストールメディアは USB メモリです。
> microSD カード(または NVMe SSD)は**インストール先**にすぎません。「イメージを microSD
> カードに書き込む」ことから始まる古いチュートリアルは、もう当てはまりません。

## 同梱物

- ヒートシンク付きの Jetson Orin Nano 8 GB モジュール(リファレンスキャリアボードに搭載済み)
- 19 V 電源
- 802.11ac/ab/gn ワイヤレスネットワークインターフェースコントローラー(M.2 Key-E スロットに装着済み)
- クイックスタート & サポートカード

**記憶媒体は同梱されていません。** 箱に microSD カードも NVMe SSD もなく、モジュールには eMMC ストレージも内蔵されていません。ストレージはすべて、ご自身で取り付けるカードまたはドライブから供給されます。

## 別途用意するもの

- **ストレージ — 次のいずれか:**
  - **microSD カード、64 GB UHS-1 以上**(推奨)。**モジュールの裏面**にあるスロットに挿入します。インストーラーを起動する前に挿入してください。
  - キャリアボード上の M.2 Key-M スロットのいずれかに装着する **NVMe SSD**。任意ですが、より大容量でストレージ性能も高いため推奨します。
- **USB メモリ、16 GB 以上** — これがインストーラーになります。
- **ノート PC またはデスクトップ PC**(Windows、Mac、Linux のいずれか)で、**25 GB 以上の空き容量**があるもの — ISO のダウンロードと USB メモリへの書き込みに使用します。
- **DisplayPort モニター**、および USB キーボードとマウス。このキットのディスプレイ出力は DisplayPort のみです。HDMI 出力と USB-C 経由の DisplayPort はサポートされません。HDMI モニターを使う場合は、アクティブな DisplayPort-HDMI アダプターが使用できます。
- モニターがない場合:**USB-TTL シリアルケーブル**を使ったヘッドレスシリアルコンソール(ステップ 1 を参照)。

![microSD カード](/images/jetson-orin-nano/microsd_64gb.png)
*インストール先ストレージの選択肢 1:64 GB UHS-1 の microSD カード。*

![NVMe SSD](/images/jetson-orin-nano/ssd_nvme_1tb.png)
*インストール先ストレージの選択肢 2:M.2 Key-M スロットの NVMe SSD。*

> **Juxi 注記:** Juxi ストアのこのキット向けバンドルには、64 GB の microSD カードと
> M.2 Wi-Fi モジュールが追加で含まれます。カードは**イメージ未書き込み(ブランク)**の
> 状態で出荷されるため、本ページの ISO 手順に従ってシステムをインストールしてください。

## ステップ 1 — ファームウェアのゲートを確認する

JetPack 7.2 以降のインストールには、開発キットに **JetPack 6.x 世代の UEFI/QSPI ファームウェア**が必要です。お使いのキットがまだ古い工場出荷ファームウェアの場合は、先に **JetPack 6.x アップデートパス**を完了してください。

モニターを接続する場合:

1. DisplayPort モニターと USB キーボードを接続します。19 V 電源を接続すると、キットは自動的に電源が入り、USB-C コネクターの隣の緑色 LED が点灯します。
2. **NVIDIA の起動スプラッシュが表示されたら、`Esc` キーを繰り返し押します。** UEFI セットアップメニューが開きます。
3. 画面上部付近の**ファームウェアバージョン**の行を確認します:

| ファームウェアバージョン | 対処 |
|---|---|
| 36.x 以降 | ステップ 2 に進む |
| 36.0 より古い | 先に JetPack 6.x アップデートパスを完了する(下記参照) |

![ファームウェアバージョンを示す UEFI メニュー](/images/jetson-orin-nano/firmware-version-check.png)
*ファームウェアバージョンは UEFI セットアップメニューの上部付近に表示されます。*

ヘッドレスでの代替手段:USB-TTL シリアルケーブルをボタンヘッダーに接続し(アダプターの TX 線をピン 3 / RXD へ、RX 線をピン 4 / TXD へ、グラウンド線をピン 7 / GND へ)、PC でシリアルコンソールを開き、起動前オプションが表示されている間にコンソールで `Esc` キーを押します。

![ボタンヘッダーに接続した USB-TTL シリアルケーブル](/images/jetson-orin-nano/jon_adafruit_uart_cable.jpg)
*ヘッドレスでの方法:ボタンヘッダーに接続した USB-TTL シリアルケーブル。*

### ファームウェアが古すぎる場合

**JetPack 6.x アップデートパス**でファームウェアを新しくします。概要は次のとおりです(詳細な手順は[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)を参照):

1. **JetPack 5.1.3** ブリッジイメージ(ファイル名 `JP513-orin-nano-sd-card-image_b29.zip`)を microSD カードから起動します。
2. バックグラウンドサービスがブートローダーの更新をスケジュールします(`sudo systemctl status nv-l4t-bootloader-config` で確認します)。
3. 再起動します。この起動中にファームウェア更新が実行されます(`sudo nvbootctrl dump-slots-info` で確認します)。
4. QSPI アップデーターをインストールします:`sudo apt update`、続いて `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`、その後再起動します。
5. 電源を切り、ブリッジカードを取り外し、インストール先のストレージを挿入して、ステップ 2 に進みます。

このパスには microSD カードとカードリーダーが必要です。ない場合の代替手段は、Ubuntu ホスト上の SDK Manager です([書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)を参照)。もう 1 つ:ファームウェアが BSP 36.2(JetPack 5.0 DP)由来の場合、インストーラー内の capsule 更新はこれをサポートしません — JetPack 7.2.1 ISO のインストールを実行する前に、キットをそれより新しいリリースに更新してください。

それでもインストーラーを起動して画面が真っ暗のまま、または UEFI シェルに落ちる場合、ファームウェアが古すぎる可能性があります。起動を繰り返し再試行しないでください。電源を切り、アップデートパスを完了してから再試行してください。

![UEFI インタラクティブシェル](/images/jetson-orin-nano/uefi_interactive_shell.png)
*インストーラーの代わりに UEFI シェル(または真っ暗な画面)が表示される場合は、通常、対象の JetPack リリースに対してファームウェアが古すぎることを意味します。*

## ステップ 2 — Jetson ISO をダウンロードする

JetPack 7.2.1 インストーラー ISO(ラベル:**Jetson ISO (r39.2.1)**)を
[JetPack ダウンロードページ](https://developer.nvidia.com/embedded/jetpack/downloads)からダウンロードするか、次の直接リンクを使用します:

<https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso>

ISO のファイル名は `jetsoninstaller-r<L4T version>-<timestamp>-arm64.iso` というパターンです(今回のリリース:`jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso`)。NVIDIA のダウンロードページには、ISO のファイルサイズもチェックサムも記載されていません。

## ステップ 3 — ISO を USB メモリに書き込む

1. **Balena Etcher** を <https://etcher.balena.io/#download-etcher> からインストールします(Windows、Mac、Linux)。
2. USB メモリを PC に挿入します。
3. Etcher で ISO ファイルを選択し、USB ドライブを選択して、書き込みを開始します。

![Balena Etcher で Jetson ISO を USB メモリに書き込む様子](/images/jetson-orin-nano/jetson-iso_etcher-flash-start.gif)
*Balena Etcher で Jetson ISO を USB メモリに書き込みます。*

> **注意**
> **ISO を microSD カードに書き込まないでください。** JetPack 7.2 以降、SD カードイメージは
> サポートされなくなりました。ISO は USB メモリに書き込み、それを使って microSD カード
> または NVMe SSD に Jetson Linux をインストールしてください。

ISO ファイルをファイルマネージャーで USB メモリにコピーしても機能しません — ディスクイメージとして書き込む必要があります。出来上がった USB メモリはインストーラーにすぎず、使用可能なデスクトップとして起動することはできません。

## ステップ 4 — インストーラーを起動してインストールする

1. キットの電源を切り、**インストール先ストレージ**を取り付けます:
   - microSD カード:**モジュールの裏面**のスロットに挿入します。
   - NVMe SSD:キャリアボードの M.2 Key-M スロットに取り付けます。
   インストーラーを起動する前に、インストール先ストレージを取り付けてください。
2. インストーラー USB メモリを挿入します。モニター、キーボード、マウスを接続し、電源を接続します。インストーラードライブはハブ経由ではなく**直接**キットに接続してください。NVIDIA は、ISO インストールを妨げる USB 3.0 ハブ(モデル UH400)と、書き込みを失敗させる可能性のある USB-Ethernet アダプター(TRENDnet TU2-ET100)をそれぞれ 1 つずつ文書化しています。**[トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)**を参照してください。
3. **NVIDIA ロゴの起動スプラッシュが表示されたら `Esc` キーを押します。** **Boot Manager** を選択し、USB ディスクを選択して Enter キーを押すと、そこから起動します。NVIDIA は、正しいインストーラーが実行されていることを確認できるよう、USB ディスクを明示的に選択することを推奨しています。
4. **QSPI capsule 更新のプロンプトが表示されたら、30 秒以内に `Y` キーを押します。** これが最も見逃されやすいステップです。このプロンプトはリアルタイムでは見落としやすいものです。タイムアウトして更新なしでインストールが続行されると、インストールは後で失敗します — インストールを再起動し、プロンプトが表示されたら `Y` キーを押してください。capsule 更新は **2 回**実行され、その間または後にキットが再起動することがあります。これは想定どおりで、両方の実行が完了するのを待ってください。現在の QSPI ファームウェアが r38.2.0/r38.2.1 のキットは、1 回目の実行完了後にファームウェア更新を 2 度目に確定する必要があります(r39.2.1 リリースノートの既知の問題 6480645)— プロンプトが表示されたらもう一度 `Y` キーを押してください。
5. **Jetson BSP インストールの GRUB メニュー**で、**Install Jetson ISO r39.2.1** を選択します。インストール先ストレージデバイス(microSD カードまたは NVMe SSD)を選択して確定します。**インストールは選択したデバイスを消去します** — 確定する前に選択内容を確認してください。
6. インストールが完了するまで待ちます。NVIDIA の手順では、白いテキストが数分間画面に流れ、プロンプトが表示されたら再起動するとされています。コミュニティで報告されるインストール時間は大きく異なります — 約 15 分から、それよりずっと長い場合まであります(未確認、フォーラムの報告)。
7. **USB メモリを取り外します** — キットが再びインストーラーではなく、インストール先ストレージから新しいシステムを起動するようにします。

NVIDIA のフォーラム担当者は、ISO インストール中はモニターを接続したままにすることを推奨しています。

## ステップ 5 — 初回起動と Ubuntu 初期設定

インストーラーが再起動すると、キットは Ubuntu の初期設定(`oem-config`)を開始します:

1. NVIDIA Jetson ソフトウェアの EULA を確認して同意します。
2. システム言語、キーボードレイアウト、タイムゾーンを選択します。
3. ネットワークに接続します。
4. ユーザー名、パスワード、コンピューター名を作成します。
5. Ubuntu デスクトップにログインします。

## ステップ 6 — JetPack コンポーネントをインストールする

ISO はベースシステム(Jetson Linux)をインストールします。CUDA、cuDNN、TensorRT、その他の JetPack スタックは、初回起動後に追加します。キットのデスクトップでターミナルを開き、次を実行します:

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

プロンプトが表示されたら、インストール後に再起動します。

結果を確認します:

```bash
cat /etc/nv_tegra_release
apt list --installed | grep nvidia-jetpack
```

`/etc/nv_tegra_release` は R39 リリース、リビジョン 2.1 を示しているはずです。完全なチェックリストは[システムの確認](/ja/tutorials/jetson-orin-nano/verify-your-system)を参照してください。

## ステップ 7 — 電力モードを確認する

デフォルトの電力モードは通常 **25W** です。最大性能を得るには、Ubuntu デスクトップのトップバーで現在の電力モードをクリックし、**Power Mode** を選び、**MAXN SUPER** を選択します。コマンドラインでは `sudo /usr/sbin/nvpmodel -q` で現在のモードを確認できます。JetPack 7.2.1 の ISO インストールはデフォルトで Super Mode の書き込み構成を使用するため、25W と MAXN SUPER が利用できるはずです — 見つからない場合は[トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)を参照してください。

![電力モードメニューで MAXN SUPER を選択する様子](/images/jetson-orin-nano/jons_power-mode-to-maxn-super.png)
*最大性能には Power Mode → MAXN SUPER を選択します。*

## トラブルシューティング(クイックチェック)

| 症状 | 最初に確認すること |
|---|---|
| キットの電源が入らない | 19 V 電源が DC ジャックに接続されている必要があります。キットは自動的に電源が入り、USB-C コネクターの隣の緑色 LED が点灯するはずです。 |
| USB インストーラーが起動しない | UEFI Boot Manager で USB ディスクを明示的に選択します(スプラッシュで `Esc`)。ファームウェアが 36.x 以降であることを確認します。 |
| インストーラーの代わりに真っ暗な画面または UEFI シェルが表示される | ファームウェアが古すぎる可能性があります。先に JetPack 6.x アップデートパスを完了してください。 |
| インストーラーが言語/ネットワーク/ユーザー名の設定をスキップする。初回起動が真っ暗な画面で止まる | QSPI capsule プロンプトを見逃しています。インストールを再起動し、30 秒以内に `Y` キーを押してください。 |
| インストーラーがインストール先ストレージを表示しない | microSD:モジュール裏面のスロットに完全に挿入されているか確認します。NVMe:ドライブを差し直してインストーラーを再起動します。 |
| 7W/15W の電力モードしかない。25W と MAXN SUPER がない | [トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)を参照してください。 |

## 参考資料

- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (2026-09-26 確認)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (2026-09-26 確認)
- [Jetson Orin Nano Developer Kit User Guide — JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) (2026-09-26 確認)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (2026-09-26 確認)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-26 確認)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (2026-09-26 確認)

*ステータス:ドラフト、cheny によるレビュー待ち。記載日時点の NVIDIA 公式ドキュメントに基づく内容です。Juxi Technology による実機検証はまだ行われていません。*

**画像クレジット:** 本ページの画像は NVIDIA 公式の *Jetson Orin Nano Developer Kit User Guide*(2026-09-26 ダウンロード)からのもので、著作権は © NVIDIA Corporation に帰属します。公式のセットアップフローを説明するために掲載しています。

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
