---
title: よくある質問(FAQ)
sidebar_label: FAQ
slug: /support/faq
description: >-
  NVIDIA Jetson Orin Nano Super Developer Kit(8GB)に関するよくある質問 —
  ストレージ、初回セットアップ、ファームウェア、電力モード、AI ワークロード、
  サポート。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# よくある質問(FAQ)

## はじめる前に

**同梱物は何ですか?**
Jetson Orin Nano Developer Kit、19 V 電源、クイックスタート/サポートカードです。
**NVIDIA の箱にはストレージが含まれていません**:microSD カードまたは NVMe SSD、
インストーラー用の USB メモリ、モニターとキーボードはご自身で用意します — ただし、
このキットの Juxi ストアバンドルには 64 GB microSD カードが追加されます(ストアの
掲載内容による)。[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)を
参照してください。

**ストレージを購入する必要がありますか?**
はい — Juxi ストアのバンドルを購入した場合を除きます。バンドルには 64 GB
microSD カードがすでに含まれており、インストール先ストレージの要件を満たすため、
容量を増やしたい場合にのみ NVMe SSD を購入してください。(同梱カードは空の状態で
出荷され、イメージは書き込まれていません — Jetson ISO でカードにシステムを
インストールします。)NVIDIA の記載:「Jetson Orin Nano Developer Kit には
リムーバブルストレージが同梱されていないため、セットアップを開始する前に
microSD カードまたは NVMe SSD のいずれかをご用意ください。」NVIDIA の箱のみを
お持ちの場合は 64GB UHS-1 以上の microSD カード(NVIDIA の推奨)を、キャリア
ボードの M.2 Key-M スロットのいずれかに装着する場合は PCIe NVMe SSD を購入して
ください。このキットに eMMC はありません:カードまたは SSD がシステムのメイン
ストレージになります。[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)
と[インターフェースとハードウェアレイアウト](/ja/tutorials/jetson-orin-nano/interfaces)
を参照してください。

**以前の JetPack リリースのように SD カードイメージを書き込めますか?**
いいえ。JetPack 7.2 以降、SD カードイメージはサポートされなくなりました。NVIDIA
の指示:「Jetson ISO を microSD カードに書き込まないでください — USB メモリに
書き込み、それを使って microSD カードまたは NVMe SSD に Jetson Linux を
インストールしてください。」microSD カードは今も有効なインストール先ですが、
イメージの書き込み先メディアではなくなっただけです。ISO の USB メモリは
インストーラーであり、ライブ USB ではありません — デスクトップの実行はできず、
システムをインストールするだけです。[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)
と [JetPack 6.x からの移行](/ja/tutorials/jetson-orin-nano/jetpack-6-to-7)を
参照してください。

**開始前に正確に何が必要ですか?**
必要なもの:

- キットと同梱の 19 V 電源。
- 25GB 以上の空き容量があるノート PC または PC(Windows、Mac、Linux)。
- インストーラーイメージを入れる 16GB 以上の USB メモリ。
- インストール先ストレージ:microSD カード(64GB UHS-1 以上を推奨)および/または
  NVMe SSD — Juxi ストアバンドルには 64 GB microSD カードがすでに含まれています。
- DisplayPort モニターと USB キーボード・マウス、またはヘッドレスセットアップ用の
  USB-TTL シリアルケーブル。

NVIDIA のガイドでは Balena Etcher を使って ISO を USB メモリに書き込みます —
ファイルをコピーするだけでは不十分です。手順の詳細:
[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)。

**Ubuntu PC は必要ですか?**
いいえ、推奨の方法では必要ありません。Jetson ISO インストールはキット自体で実行
され、PC の役割は ISO を USB メモリに書き込むことだけです — Windows、Mac、Linux
のいずれでも可能です。Ubuntu x86_64 ホスト PC が必要になるのは代替方法(SDK
Manager または書き込みスクリプト)を使う場合だけです — 例えば、Super 構成で
キットを再書き込みしたい場合です。注意:SDK Manager のページには Ubuntu
20.04 / 22.04 x86_64 ホストが記載されていますが、NVIDIA スタッフは Windows からの
書き込み成功も報告しています。
[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)を
参照してください。

**microSD スロットはどこにありますか?**
Jetson Orin Nano モジュールの裏面にあり、キャリアボードの端にはありません。ISO
インストーラーを起動する前にカードを挿入してください。インストーラーは、すでに
装着されているストレージだけを提示します。後でカードを交換する場合:電源を切り、
新しいカードに差し替え、挿入したまま JetPack 7.2.1 の ISO インストーラーを再実行
します — JetPack 7.2 以降には書き込めるカードイメージがありません。
[インターフェースとハードウェアレイアウト](/ja/tutorials/jetson-orin-nano/interfaces)
と [クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)を参照してください。

## セットアップ

**キットは新品なのに、なぜガイドは先にファームウェアを更新するよう言うのですか?**
JetPack 7.2 以降のインストールには、キットに JetPack 6.x 世代の UEFI/QSPI
ファームウェア(バージョン 36.x 以降)が必要です。古い工場出荷ファームウェアで
出荷されたキットは、JetPack 7.2.1 の ISO を起動する前に NVIDIA の
「JetPack 6.x Update Path」を完了する必要があります。バージョンの確認方法:
モニターを接続して電源を入れ、起動スプラッシュで Esc キーを繰り返し押します。
UEFI メニューの上部付近にファームウェアのバージョンが表示されます。36.x 以降なら
そのまま続行し、36.0 より古い場合は先に更新パスを実行してください。
[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)、
[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)、
および QSPI や capsule update などの用語については
[用語集](/ja/tutorials/jetson-orin-nano/glossary)を参照してください。

**セットアップにはどのくらい時間がかかりますか?**
NVIDIA はセットアップの合計時間を公表していません。公式の手順書には、画面に白い
テキストが数分間流れることがあり、インストーラーが完了して再起動を求められるまで
待つよう記載されています。ユーザー報告では、microSD カードへのインストールで
約 15 分から約 2 時間です(ユーザー報告、未確認)。その後、初回起動時に Ubuntu の
セットアップ画面(言語、ネットワーク、ユーザー名)が追加されます。
[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)を参照してください。

**インストーラーがユーザー名/パスワード画面をスキップした場合は?**
これは既知の報告と一致します:QSPI capsule プロンプトがタイムアウトしたのです。
インストーラーはファームウェア(QSPI)の更新確認を求めますが、待ち時間は 30 秒
だけです — 見逃すと以降の手順が失敗し、言語・ネットワーク・ユーザー名の画面が
表示されないことがあります。次の起動ではカーソルが表示された黒い画面で止まる
こともあります。公式ガイドによる修正方法:インストールを再起動し、capsule
プロンプトが表示されたら Y を押します。一部のユーザーは再試行前に残存パーティション
を消去したり、SDK Manager でインストールしたりして解決しました(ユーザー報告。
NVIDIA スタッフがスレッドを認知)。
[トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)を参照して
ください。

> **重要** インストーラーが QSPI capsule 更新のプロンプトを表示したら、30 秒以内に
> **Y** を押してください。NVIDIA はこれを「最も見逃されやすい手順」と呼んでいます。

**シリアルコンソールを使うにはどうすればよいですか?**
USB-TTL シリアルケーブルを Button Header に接続します:RXD ピン 3 をアダプターの
TX 線に、TXD ピン 4 をアダプターの RX 線に、GND ピン 7 をアダプターのグラウンド線に
接続します。次に PC でシリアルコンソールを開き、電源を入れて起動前画面で Esc を
押すと UEFI / Boot Manager に入ります — この方法で ISO インストール全体を完了
できます。正直に言って、1 つ欠けている情報があります:NVIDIA のページは「PC で
シリアルコンソールを開く」と述べるだけで、ボーレートやターミナルプログラムを
示していません。キットが USB-C 経由のデバイスモードで PC に接続されている場合は、
シリアルターミナルアクセス用の「USB Serial device」も提供されます。
[インターフェースとハードウェアレイアウト](/ja/tutorials/jetson-orin-nano/interfaces)
と [トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)を
参照してください。

## 電力とパフォーマンス

**25W / MAXN SUPER の選択肢がないのはなぜですか?**
お使いのキットは非 Super のブート構成で書き込まれているため、7W と 15W モード
しか表示されません。これは JetPack 7.2 の ISO の文書化された既知の問題 6279443
です:ISO インストールでは「Super」に切り替わらず、更新前のプロファイルが維持
されていました。JetPack 7.2.1 では新規インストールでこれが修正されています —
ISO は「Jetson Orin Nano Developer Kit をデフォルトで Super Mode の書き込み構成で
フラッシュするようになりました」。NVIDIA は、7.2.1 の再インストールで 7.2.0 ISO
のキットが変換されるかどうかは述べていません。`/etc/nv_boot_control.conf` を
確認してください:Super 構成では `-super` 接尾辞が表示されます。既存の 7.2
インストールを修正するには、Ubuntu ホストから Super 構成で再書き込みします
(SDK Manager または書き込みスクリプト)。すると Power Mode メニューに 15W、
25W(デフォルト)、MAXN SUPER が表示されます。
[システムの確認](/ja/tutorials/jetson-orin-nano/verify-your-system)、
[トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)、
[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)を
参照してください。

> **Juxi 注記:** コミュニティによるインプレース修正があります
> (`/etc/nv_boot_control.conf` を編集し、ブートローダーを再構成し、
> `/etc/nvpmodel.conf` を削除して再起動)。複数のユーザーが成功を報告していますが、
> NVIDIA は承認しておらず、1 人のユーザーがブートループを報告しています。

## AI ワークロード

**8 GB ではどのくらいの大きさのモデルを実行できますか?**
8GB の LPDDR5 は CPU、GPU、オペレーティングシステムで共有されるユニファイド
メモリです — ファームウェアとカーネルの予約領域を除くと約 7.6GB が使用可能です。
NVIDIA が公開している指針:4 ビット量子化とメモリ効率の良いランタイムを使えば、
約 10B パラメータまでの LLM と約 4B パラメータまでの VLM を収められます。
TensorRT Edge-LLM の公式 Orin Nano 8GB ベンチマークは 2B までのモデルを対象に
しており、これが NVIDIA がこのキットでベンチマークする最大のモデルクラスです。
ファイルサイズが収まるように見えても、KV キャッシュにもメモリが必要なため
ロードに失敗することがあります。8GB のキットでは 7.4GB と 16GB の GGUF の
ロードに失敗した例があります(ユーザー報告)。
[ローカル LLM 推論](/ja/tutorials/jetson-orin-nano/local-llm)と
[メモリ効率](/ja/tutorials/jetson-orin-nano/memory-efficiency)を参照してください。

## サポートとサービス

**サポート窓口はどこですか?**
まず NVIDIA 公式の[トラブルシューティングページ](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)
を参照してください。セットアップのよくある問題 5 つ(ISO が起動しない、映像出力が
ない、インストーラーがインストール先ストレージを表示しない、ファームウェア更新が
必要、Docker の権限エラー)を扱っています。プラットフォームに関する質問には、
公式の [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html)
ページに掲載されている NVIDIA Jetson 開発者フォーラムをご利用ください。投稿前に
検索し、`cat /etc/nv_tegra_release` の出力を添えてください。Juxi Technology の
連絡先:

- テクニカルサポート: **support@juxitech.com**
- 注文・保証・RMA: **support@juxitech.com**(注文番号を添えてください)
- 販売・見積もり: **sales@juxitech.com**
- 製品に関するご質問(選定・互換性): **pe@juxitech.com**

公式ダウンロードと参考リンク:[ダウンロード](/ja/tutorials/jetson-orin-nano/downloads)。

> **Juxi 注記:** NVIDIA スタッフと表示されたフォーラム返信の中には、自動生成された
> AI 回答があります(「This is an automated AI response」で始まります)。これらは
> 権威ある情報として扱わず、公式ドキュメントを優先してください。

## 出典

- Jetson Orin Nano Developer Kit ユーザーガイド — [クイックスタート](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)、[トラブルシューティング](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)、[How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)、[ハードウェアレイアウト](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)(2026-09-26 確認)
- [JetPack SDK ダウンロード](https://developer.nvidia.com/embedded/jetpack/downloads)(2026-09-26 確認)
- Jetson Linux リリースノート — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)、[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)(2026-09-26 確認)
- [NVIDIA Jetson でより大きなモデルを実行するためのメモリ効率の最大化](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)(2026-09-26 確認)
- [TensorRT Edge-LLM パフォーマンスベンチマーク](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html)(2026-09-26 確認)
- NVIDIA 開発者フォーラム — [起動ハング/ユーザー名セットアップのスキップに関するスレッド](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410)、[25W / MAXN SUPER に関するスレッド](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627)(2026-09-26 確認)
- [Juxi Technology ストア掲載 — Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)(2026-09-26 確認)

*ステータス:ドラフト、cheny によるレビュー待ち。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology
によって公開されており、NVIDIA の公式出版物ではありません。
