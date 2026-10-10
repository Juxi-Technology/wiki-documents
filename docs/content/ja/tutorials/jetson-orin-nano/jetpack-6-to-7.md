---
title: JetPack 6.x から JetPack 7.2.1 への移行
sidebar_label: JetPack 6.x からの移行
slug: /migration/jetpack-6-to-7
description: >-
  Jetson Orin Nano Super Developer Kit(8GB)において JetPack 6.x と JetPack 7.2.1 の
  間で何が変わるか:ファームウェアの前提条件、Super モードの罠、移行チェックリスト、
  ロールバック。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-sdk-623
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# JetPack 6.x から JetPack 7.2.1 への移行

本ページは、JetPack 6.x から JetPack 7.2.1 へ移行する Jetson Orin Nano (Super)
Developer Kit の所有者向けです。新しいキットをお持ちの場合は、代わりに
[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)から始めてください。

JetPack 7.2.1 は大きな飛躍です:完全な再書き込み、ファームウェアの前提条件、
およびいくつかのソフトウェアの再ビルドを計画してください。

## 何が変わるか

| レイヤー | JetPack 6.x 世代 | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux(L4T) | 36.x(JetPack 6.2.3 = 36.5.2) | **39.2.1** |
| OS / ルートファイルシステム | Ubuntu 22.04 | **Ubuntu 24.04** |
| Linux カーネル | 5.15 | **6.8** |
| CUDA | 12.6(JetPack 6.2.3 = 12.6.10) | **13.2.2** |
| TensorRT | 10.3.0 | **10.16.2** |
| cuDNN | 9.3.0 | **9.20.0** |
| VPI | 3.2 | **4.1.4** |

> **Juxi 注記:** 6.x の列は JetPack 6 の最後の本番リリースである JetPack 6.2.3 を
> 使用しています。お手元のバージョンは `cat /etc/nv_tegra_release` で確認してください。
> 7.2.1 の VPI の値は、NVIDIA のダウンロードページではなくパッケージリポジトリから取得
> しています。ダウンロードページは依然として JetPack 7.2 の値を示しています — 詳細は
> [システムの確認](/ja/tutorials/jetson-orin-nano/verify-your-system)の注記を参照してください。

- **SD カードイメージはなくなりました。**「JetPack 7.2 以降、SD カードイメージは
  サポートされなくなりました。」インストーラーは USB メモリ用の単一の ISO です。
  microSD カードは今も有効なインストール先です。
- **ファームウェアの前提条件。** JetPack 7.2 以降のインストールには、JetPack 6.x
  世代の Jetson UEFI/QSPI ファームウェアが必要です。古い工場出荷ファームウェアの
  キットは、先に JetPack 6.x 更新パスを完了する必要があります。JetPack 7.0 と 7.1
  には Orin ハードウェアの記載がないため、7.2 がこのファミリーにとって最初の 7.x
  リリースです。
- **異なるインストールフロー。** ISO は USB メモリからデバイス上の microSD または
  NVMe にインストールします。これはインストール専用で、「ライブ USB」ではありません。

## 次の場合はまだアップグレードしないでください

- **ロボットが Isaac ROS に依存している。** 7.2.1 のコンポーネントマトリクスは
  Isaac ROS を「近日公開予定」と記載していますが、NVIDIA スタッフは Isaac ROS 4.6
  が JetPack 7.2 をサポートすると述べています — 情報源が一致していません。
  [ロボティクス](/ja/tutorials/jetson-orin-nano/robotics)を参照してください。
- **カメラコードが古い SIPL API に固定されている。** Jetson Linux 39.2.1 の
  SIPL API v2.0.0 には「API、ABI、JSON スキーマ、パッケージレイアウト、ドライバー
  ローディングに影響する破壊的変更」が含まれています。コミュニティの報告(NVIDIA は
  未確認)によると、NITO カメラ構成がデフォルトになり、従来の
  `NVCAMERA_NITO_PATH=CONFIG` モードは動作しなくなったとのことです。
- **スタックを再検証できない。** CUDA 13 対応のホイール、Python パッケージ、
  サードパーティライブラリが Ubuntu 24.04 と CUDA 13.2 向けに存在している必要が
  あります。NVIDIA の 7.2.1 のページには Python や OpenCV のバージョンが記載されて
  いません。CUDA 13.2 のホイールについては、NVIDIA スタッフは Jetson AI Lab の
  SBSA インデックスを案内しています —
  [ローカル LLM 推論](/ja/tutorials/jetson-orin-nano/local-llm)を参照してください。

## 引き継げないもの — 再ビルドの計画を

- **TensorRT エンジン。** TensorRT は 10.3.0 から 10.16.2 に移行します。シリアライズ
  されたエンジンは TensorRT のバージョンに紐づきます。ターゲット上で再ビルドして
  ください。
- **CUDA バイナリ。** CUDA は 12.6 から 13.2.2 へのメジャーアップグレードです。
  CUDA 12.x のバイナリがそのまま引き継げるとは期待しないでください。新しい
  ツールキットで再ビルドしてください。
- **アウトオブツリーのカーネルモジュール。** カーネルは 5.15 から 6.8 に移行します。
  新しいカーネルヘッダーに対してモジュールを再ビルドしてください。
- **カメラドライバーとデバイスツリー。** SIPL 2.0 の API と ABI の変更が適用されます
  (上記参照)。
- **コンテナ。** JetPack 6 / L4T r36 向けにビルドされたイメージは古いスタックのまま
  です。ISO には NVIDIA Container Toolkit 1.19 が同梱されています。NVIDIA スタッフに
  よると、Orin Nano は主流の Arm64「arm64-SBSA」コンテナを実行できるようになりました。
- **Python 環境。** Ubuntu 24.04 は 22.04 より新しい Python を使用します。仮想環境を
  再作成し、`python3 --version` を確認してください。

## 移行チェックリスト

1. **まずバックアップ。** インストールは、選択したターゲットストレージを消去します。
   キットからコピーしておくもの:アプリケーションデータ、構成ファイル、カメラの
   キャリブレーション、コンテナボリューム、TensorRT ビルドスクリプトと ONNX
   モデル、カスタムドライバーまたはデバイスツリーのソース。バージョンは
   `cat /etc/nv_tegra_release` と `apt list --installed | grep nvidia-jetpack` で
   記録します。
2. **ファームウェアのゲートを通過する。** 電源を入れ、NVIDIA のスプラッシュで
   Esc を繰り返し押し、UEFI メニューでファームウェアのバージョンを確認します。
   ファームウェア 36.x 以降であれば 7.2.1 に対応しています。36.0 より古い場合は、
   まず「JetPack 6.x Update Path」を完了します:更新済みの JetPack 5.1.3 SD カード
   イメージ(`JP513-orin-nano-sd-card-image_b29.zip`)をブリッジとして起動し、
   ブートローダー更新をスケジュールさせ、再起動し、QSPI アップデーター
   (`sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`)をインストールし、
   もう一度再起動します。再起動は複数回に及ぶ見込みです。JetPack 6.2.x は初回起動
   後にさらにもう 1 回更新をスケジュールすることがあります。BSP 36.2 /
   JetPack 5.0 DP の個体は、先により新しいリリースへ更新する必要があります。
   スケジュールの確認は `sudo systemctl status nv-l4t-bootloader-config`、
   ファームウェアの確認は `sudo nvbootctrl dump-slots-info` で行います。
3. **インストーラー用 USB を作成する。** r39.2.1 の Jetson ISO を Balena Etcher で
   USB メモリ(16 GB 以上)に書き込みます。ISO を microSD カードに書き込まないで
   ください。起動前にターゲットストレージ(microSD または NVMe)を装着します —
   インストーラーは装着済みのデバイスだけを提示します。
4. **JetPack 7.2.1 をインストールする。** UEFI ブートマネージャー経由で起動します:
   スプラッシュで Esc を押し、Boot Manager を選択し、USB ディスクを選択します
   (NVIDIA はこの明示的な選択を推奨しています)。

   > **重要** — QSPI capsule 更新のプロンプトで、30 秒以内に **Y** を押して
   > ください(「最も見逃されやすい手順」)。タイムアウトすると、インストールは
   > 後で失敗します。capsule 更新は 2 回に分けて実行され、その間にキットが再起動
   > することがあります — これは想定どおりです。

   GRUB メニューで Install Jetson ISO r39.2.1 を選択し、ターゲットストレージを
   選択して確定します(インストールは選択したストレージを消去します)。インストール
   後にプロンプトが表示されたら USB メモリを取り外し、Ubuntu の初期セットアップ
   (ライセンス、言語、ネットワーク、ユーザー)を完了して、`sudo apt update` と
   `sudo apt install nvidia-jetpack` を実行します。
5. **Super プロファイルを確認する。** `sudo /usr/sbin/nvpmodel -q` に電力モードが
   一覧表示されます。デスクトップでは上部バー(Power Mode、MAXN SUPER)を使用します。
   Super Mode が有効な場合、`cat /etc/nv_boot_control.conf` の TNSPEC 行に
   `-super` 接尾辞が表示されます。表示されない場合は、次のセクションをお読み
   ください。
6. **ワークロードを再検証する。** TensorRT エンジンと CUDA アプリケーションを
   ターゲット上で再ビルドします。Python 環境を再作成し、コンテナを更新し、カメラを
   再テストします。[システムの確認](/ja/tutorials/jetson-orin-nano/verify-your-system)
   のチェックを実行してください — r39.2.1 では、`cat /etc/nv_tegra_release` が
   R39、リビジョン 2.1 を示すはずです。

## Super モードの罠(7.2.1 で修正済み)

7.2.0 の ISO インストールでは、個体は既存のボード構成を維持しました:25W と
MAXN SUPER の電力モードが表示されず、`sudo nvpmodel -m 2` は「bad power mode 2」で
失敗しました。NVIDIA はこれを r39.2 リリースノートの既知の問題 6279443 として
文書化しています:「個体は更新後にデフォルトで「Super」モードになりません。
「Super」モードを使用するには、Linux ホストまたは SDKM でターゲットを書き込む
必要があります。」NVIDIA スタッフは後にこれを ISO のバグと呼び、7.2.1 で修正され
ました。

JetPack 7.2.1 はデフォルトで Super 構成を書き込みます:「ISO は Jetson Orin Nano
Developer Kit をデフォルトで Super Mode の書き込み構成でフラッシュするように
なりました。」既知の問題 6279443 は r39.2.1 の既知の問題リストにありません。

ただし 2 つの注意点が残ります:

- **ホストから書き込むときは正しいターゲットを選択してください。** SDK Manager では、
  ターゲットは「Jetson Orin Nano [8GB developer kit version]」です。書き込み
  スクリプトでは、Super モードを有効にするには、通常のターゲットではなく
  `jetson-orin-nano-devkit-super` ターゲットを使用します。例(開発者ガイド、NVMe):
  `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`。
- **既存システムへの 7.2.1 の再インストール。** NVIDIA の記載:「すでにインストール
  済みのシステムに ISO を使って JetPack 7.2.1 を再インストールする場合は、Getting
  Started Guide の手順に注意深く従ってください。」7.2.0 の ISO で非 Super のままに
  なった個体に 7.2.1 を再インストールすると Super モードが復元されるかどうかを
  NVIDIA は述べていません。文書化された方法は、Super 構成でのホストからの書き込み
  です。コミュニティのインプレース修正(`/etc/nv_boot_control.conf` の編集)は
  NVIDIA が承認しておらず、ブートループを報告したユーザーも 1 人います。
  [トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)を参照して
  ください。

## ロールバック

NVIDIA スタッフの発言:「ダウングレード:はい、必要であれば SDK Manager 経由で
JP 6.2.2 に戻して書き込むことができます。」あるユーザーが往復(6.2.2 への再書き込み
後、7.2 へ再アップグレード)を確認しています。正直に述べるコスト:

- **インプレースのダウングレードはできません。** x86 Ubuntu ホストからの完全な
  再書き込みが必要です(公式ページには Ubuntu ホストが記載されていますが、NVIDIA
  スタッフは Windows の SDK Manager も動作すると報告しています)。
- **ターゲットストレージは消去されます。** バックアップが唯一のコピーです。
- **それ以上は保証されません。** NVIDIA はダウングレード手順を公開しておらず、
  JetPack 6.x のブートメディアが r39.2.x の QSPI ファームウェアで動作することが
  保証されるという文書もありません。ダウングレードは、古いスタックの再インストール
  と同じ再ビルド作業と捉えてください。

Super 電力モードだけが欠けている場合は、より限定的な修正として Super 構成での
ホストからの再書き込みがあります — これなら 7.x のままです。
[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)を
参照してください。

## 出典

- [JetPack SDK ダウンロード — JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) — コンポーネントマトリクス、SD カードの廃止、Super モードのデフォルト、再インストールの注意(2026-09-26 確認)
- [Jetson Orin Nano Developer Kit — クイックスタート](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) — ISO インストールの流れ、ファームウェアのゲート、capsule プロンプト、MAXN SUPER(2026-09-26 確認)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) — ファームウェアのブリッジ、バージョン確認(2026-09-26 確認)
- [Jetson Linux 39.2.1 リリースノート(PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — GA の状態、SIPL 2.0 の破壊的変更(2026-09-26 確認)
- [Jetson Linux 39.2 リリースノート(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — 既知の問題 6279443、Super モードの罠(2026-09-26 確認)
- [JetPack 6.2.3](https://developer.nvidia.com/embedded/jetpack-sdk-623) — JetPack 6.x の基準バージョン(2026-09-26 確認)
- [NVIDIA 開発者フォーラム — JetPack 7.2 の GPU アクセラレーション問題](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) — NVIDIA スタッフ:ダウングレード経路と CUDA 13.2 ホイールインデックス(2026-09-26 確認)
- [NVIDIA 開発者フォーラム — JetPack 7.2 で 25W と MAXN SUPER が表示されない](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) — NVIDIA スタッフとユーザー:`-super` TNSPEC の確認、ホストからの再書き込み(2026-09-26 確認)

*ステータス: レビュー済み（2026-10-11）。記載日時点の NVIDIA 公式
ドキュメントおよび開発者フォーラムの発言に基づく内容であり、Juxi Technology による
実機検証はまだ行われていません。再ビルド一覧は標準的なプラットフォーム上の帰結を
述べたものです — ご自身のスタックで検証してください。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology
によって公開されており、NVIDIA の公式出版物ではありません。
