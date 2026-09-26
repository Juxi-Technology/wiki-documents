---
title: 映像解析パイプライン — DeepStream 9.1
sidebar_label: DeepStream 映像解析
slug: /tutorials/deepstream
description: >-
  Jetson Orin Nano Super 開発キット(8GB)で NVIDIA DeepStream 9.1 を実行 —
  バージョンの組み合わせ、インストール、デコードの上限、メモリ、ヘッドレス
  RTSP 出力。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.ultralytics.com/guides/nvidia-jetson/
    checked: 2026-09-26
review_owner: cheny
---

# 映像解析パイプライン — DeepStream 9.1

DeepStream は、高速化されたインテリジェント映像解析(IVA)パイプラインを構築するための NVIDIA の SDK であり、JetPack 7.2 上の Jetson Orin で動作するリリースが DeepStream 9.1 です。本ページでは、バージョンの組み合わせ、インストール経路、デコードの上限、初回実行時の見込み、ヘッドレス RTSP 出力、そして 8GB の Orin Nano Super 開発キットに関するメモを扱います。

## 1. バージョンの組み合わせ

**DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔ TensorRT 10.16.1.7 ↔ GStreamer 1.24.2**(Docker イメージ `deepstream:9.1`)— [DeepStream Installation Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html)の*プラットフォームと OS の互換性*の表に記載されているとおりです。

DeepStream 8.0 と 9.0 は **AGX Thor のみ**を記載していました。9.1 は、行に Jetson Orin が含まれる(「AGX Thor, Jetson Orin」)最初の 9.x リリースです — この行は **「Jetson Orin」** というグループとしての記載であり、以前の行(DS 6.3〜DS 7.1)は「Orin nano」を明示していました。Orin Nano を具体的に確認する 9.1 のリリースノートは見つかりませんでした — サポートはグループ表記による含意として扱ってください(未確認)。ベースラインのキット:JetPack 7.2.1 / L4T r39.2.1。

## 2. このキットがデコードできるもの

[Gst-nvvideo4linux2](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html)デコーダーは NVDEC ハードウェアエンジンを使用し、**H.264、H.265、AV1、JPEG、MJPEG** をサポートします。公開されている Orin Nano モジュールの能力:

| 能力 | 仕様 |
|---|---|
| ビデオデコード(H.265) | 1x 4K60 · 2x 4K30 · 5x 1080p60 · 11x 1080p30 |
| ビデオエンコード | ハードウェアエンコーダーなし — 「1080p30 は CPU コア 1〜2 個でサポート」 |
| DLA · PVA | なし |

推論は [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html)プラグイン上で TensorRT エンジンにより実行されます:FP16、FP32、INT8 モデル(FP16 と INT8 はプラットフォーム依存)で、INT8 にはキャリブレーションファイルが必要です。このプラグインの `enable-dla` オプションは、このモジュールでは対象となるエンジンがありません — Orin Nano の製品ページには「DL Accelerator: -」および「Vision Accelerator: -」と記載されています。

**8GB の場合:** デコードされたフレーム、エンジン、アプリケーションのメモリは 1 つのプールを共有し、作業をオフロードできる DLA もありません。後述の「30 ストリーム」サンプルは 30 本の 1080p ストリームをデコードしますが、このモジュールの公開デコード能力は 11x 1080p30(H.265)なので、より少ないストリーム数か低い解像度で計画してください。また、**ハードウェアビデオエンコーダーもありません** — エンコード出力(たとえば RTSP ストリーミング)は CPU 上で実行されます。

## 3. インストール — まず Docker

NVIDIA のガイドにはこうあります:「新規ユーザーには方法 4(Docker コンテナ)を推奨します。最速で、依存関係の心配がないセットアップです」。Jetson 向けの 4 つの方法:

| 方法 | 内容 |
|---|---|
| 1 — SDK Manager | 「Additional SDKs」で **DeepStreamSDK** を JetPack 7.2 GA のコンポーネントと一緒に選択します。 |
| 2 — tar パッケージ | `deepstream_sdk_v9.1.0_jetson.tbz2`(GitHub リリースのアセット)。 |
| 3 — Debian パッケージ | `deepstream-9.1_9.1.0-1_arm64.deb`。 |
| 4 — Docker(推奨) | NGC(`nvcr.io`)上の Jetson コンテナ。 |

Jetson コンテナは `nvcr.io/nvidia/deepstream:9.1-samples-multiarch`(リファレンスアプリケーション、サンプルモデルと設定)と `nvcr.io/nvidia/deepstream:9.1-triton-multiarch`(devel ライブラリと Triton バックエンドを含む)です。前提条件:`docker-ce`、NVIDIA Container Toolkit、NGC アカウント、そして `docker login nvcr.io`(ユーザー名 `$oauthtoken`、パスワードは NGC API キー)。

> **重要**:NVIDIA はこう述べています:「Jetson の Docker コンテナはデプロイ専用です。コンテナ内での DeepStream ソフトウェア開発はサポートされません」。アプリケーションはキット上でネイティブにビルドし、バイナリを独自のイメージに追加してください。

Docker の場合は代わりに `user_additional_install.sh` を実行してください(後述の EOS の注記を参照)。Triton コンテナの「Failed to detect NVIDIA driver version」というメッセージは無害です。

> **Juxi のヒント:** ホストへの最小限のインストールには、SDK Manager で「Jetson OS」だけを選択し、次に
> `sudo apt install docker.io`、`sudo apt install nvidia-container`、
> `sudo apt install nvidia-l4t-gstreamer`、`sudo service docker restart` を実行します。

## 4. クロックを引き上げる — キット固有の電力モードを使う

```bash
sudo nvpmodel -m 2
sudo jetson_clocks
```

クイックスタートからの引用:「Jetson Orin Nano モジュールでは、MAXN SUPER モードを有効にするために -m 0 ではなく sudo nvpmodel -m 2 を使用します。その他のすべての Jetson Orin モジュール(Orin NX を含む)は -m 0 を使用します」。DeepStream アプリケーションを実行する前に、これらを実行してください。Super 構成の 8GB キットでは、電力モードは **15W(モード 0)**、**25W(モード 1、デフォルト)**、**MAXN_SUPER(モード 2)** です。MAXN_SUPER は Super 書き込み済みの個体にのみ存在します。

> **注意**:25W / MAXN SUPER が存在しない場合、または `nvpmodel -m 2` が不正な電力モードを報告する場合、その個体は Super 構成で書き込みされていません。[トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)を参照してください。

## 5. 初回実行 — TensorRT エンジンは初回使用時にビルドされる

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

クイックスタートからの引用:既存のエンジンファイルがないモデルの場合、「ファイル生成とアプリケーション起動には(プラットフォームとモデルにもよりますが)数分かかることがあります。以降の実行では、生成されたエンジンファイルを再利用して読み込みを高速化できます」。FPS の指標がターミナルに流れ続けます。クイックスタートの「(この構成で約 30 FPS)」はドキュメントの一般的な数値であり、**Orin Nano での実測値ではありません**。アプリケーションが Gst 要素を作成できない場合は、キャッシュを削除して再試行してください:`rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`。他のサンプル設定は、USB カメラと CSI カメラ、およびセカンダリ推論を伴うトラッキングをカバーしています。

## 6. RTSP 出力によるヘッドレス運用

クイックスタートには、ディスプレイなしで実行する方法が記載されています:デフォルトの設定は EGL ベースの `nveglglessink` レンダラー(`[sink]` グループの `type=2`)を使用しており、実行中の X サーバーが必要です。代わりに RTSP 出力シンクグループを追加し(`source30_1080p_dec_infer-resnet_tiled_display.txt` の `[sink2]` グループがその例です)、EGL シンクグループに `enable=0` を設定します。エンコードされた RTSP 出力は CPU 上で実行されます(セクション 2:ハードウェアエンコーダーなし)。

> **Juxi の補足:** RTSP ストリームでは、アプリケーションが EOS に到達したまま止まることがあります(`rtpjitterbuffer` の問題)。
> ベアメタルの場合は、クイックスタートの依存パッケージをインストールした後に、`/opt/nvidia/deepstream/deepstream/` 内の
> `update_rtpmanager.sh` を一度実行してください。Docker の場合は代わりに `user_additional_install.sh` を実行します。

## 7. 8GB に向けたメモリ計画

NVIDIA のメモリ効率ブログにはこうあります:「Jetson Orin Nano 8GB モジュールでは、8GB の物理 DRAM のうち、ファームウェアとカーネルの予約領域を除いておよそ 7.6 GB が使用可能です」。CPU と GPU はこのプールを共有します。DeepStream スタイルのパイプラインについてドキュメント化された手段:

| レバー | 回収できるメモリ |
|---|---|
| コンテナではなくベアメタルで実行 | 最大 70 MB |
| Python から C++ アプリケーションへ切り替え | 最大 84 MB |
| Tiler/OSD を無効化し FakeSink を使用 | 最大 258 MB |
| **合計** | **412 MB** |

Tiler/OSD を無効化して FakeSink を使用することは、「可視化には必要でも、ヘッドレスや本番デプロイでは不要な表示ステージを削除します。これによりメモリを節約し、GPU 負荷を減らし、スループットを改善します」。これは上記のヘッドレス RTSP 経路と組み合わせられます。グラフィカルデスクトップを無効化すると、最大 865 MB を解放できます。8GB 向けの完全な手引きは、[8GB でのメモリ効率](/ja/tutorials/jetson-orin-nano/memory-efficiency)を参照してください。

## NVIDIA がこのキット向けに公開していないもの

Jetson 向けの公式 DeepStream 9.1 パフォーマンスページが扱うプラットフォームは 2 つだけです:**Jetson AGX Thor** と **Jetson AGX Orin**。Orin Nano の FPS 数値は公開されていません。AGX Orin の行を Orin Nano のパフォーマンスとして読まないでください。サイジングはデコード能力(セクション 2)から始め、パイプラインが収まるまでストリーム数と解像度を下げてください。

公開されている中で最も近いデータポイントとして、[Ultralytics の Jetson ベンチマーク](https://docs.ultralytics.com/guides/nvidia-jetson/)は、Orin Nano Super での YOLO26n について、TensorRT FP16 エンジンで約 4.57 ms/画像(約 219 FPS)、INT8 で約 3.80 ms/画像(約 263 FPS)(入力 640)と報告しています — **ベンダーデータであり、JetPack 6.1 時代のソフトウェアで測定されたもので、このキットの 7.2.1 スタックではありません**。推論時間には前処理/後処理は含まれません。同じソースによると、GPU を使用するのは PyTorch、TorchScript、TensorRT のエクスポート形式のみで、他のエクスポート形式は CPU 上で実行されます。

## トラブルシューティングと参考資料

- システムレベルの問題(電力モード、ストレージ、ディスプレイ):[トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting) · [8GB でのメモリ効率](/ja/tutorials/jetson-orin-nano/memory-efficiency)。
- DeepStream 以外のモデル:[ローカル LLM 推論](/ja/tutorials/jetson-orin-nano/local-llm) · 公式のパフォーマンス参考資料:[DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html)。

## 出典

- [DeepStream Installation Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html)(2026-09-26 確認)
- [DeepStream Quickstart Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html)(2026-09-26 確認)
- [DeepStream Docker Containers](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)(2026-09-26 確認)
- [DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html)(2026-09-26 確認)
- [Gst-nvvideo4linux2(ハードウェアデコーダー)](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html)(2026-09-26 確認)
- [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html)(2026-09-26 確認)
- [Jetson Orin モジュール — デコード、エンコード、アクセラレータの仕様](https://developer.nvidia.com/embedded/jetson-orin)(2026-09-26 確認)
- [NVIDIA Jetson でより大きなモデルを実行するためのメモリ効率の最大化(開発者ブログ)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)(2026-09-26 確認)
- [Jetson Linux r39.2 開発者ガイド — 電力とパフォーマンス](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html)(2026-09-26 確認)
- [Ultralytics — NVIDIA Jetson ガイド(ベンダーベンチマーク)](https://docs.ultralytics.com/guides/nvidia-jetson/)(2026-09-26 確認)

*ステータス:ドラフト、cheny によるレビュー待ち。記載した日付時点の NVIDIA 公式ドキュメントに基づいています。Juxi Technology による実機検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
