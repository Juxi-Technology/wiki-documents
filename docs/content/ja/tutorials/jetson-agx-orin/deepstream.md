---
title: マルチストリーム映像解析 — DeepStream 9.1
sidebar_label: DeepStream 映像解析
slug: /tutorials/deepstream
description: >-
  AGX Orin 開発キットに DeepStream 9.1 をインストールし、リファレンスの
  映像解析アプリケーションを実行します — 公式のインストールオプション、
  サンプル設定、JP7.2 固有の注意点を交えて解説します。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-24
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: its component table lags on some rows (VPI/PVA still show 7.2 values) — see the Sources caveat
review_owner: cheny
---

# マルチストリーム映像解析 — DeepStream 9.1

DeepStream は、高速化されたインテリジェント映像解析(IVA)パイプラインを構築
するための NVIDIA のフレームワークであり、Jetson Orin では **DeepStream 9.1 が
JetPack 7.2 に同梱**されています。本チュートリアルは NVIDIA 公式のインストール
ガイドとクイックスタートドキュメントに従っており、以下に示すコマンドはすべて
それらのページから引用(または直接要約)したものです。

**バージョンの組み合わせ:** DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔
CUDA 13.2 ↔ TensorRT 10.16.1.7 ↔ Ubuntu 24.04 ↔ GStreamer 1.24.2 *(NVIDIA の
互換性表による)*。

## 1. インストール

NVIDIA は Jetson 向けに 4 つのインストール方法を提供しています。公式の注記では
**新規ユーザーには Docker** を推奨しています(最速で、依存関係の心配がありません):

- **方法 4 — Docker(新規ユーザーに推奨):** NGC の DeepStream コンテナを使用します — [Docker Containers](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html) を参照してください。
- **方法 1 — SDK Manager:** 「Additional SDKs」で **DeepStreamSDK** を JetPack 7.2 GA のコンポーネントと一緒に選択します。
- **方法 2 — tar パッケージ:** `deepstream_sdk_v9.1.0_jetson.tbz2` をダウンロードし([NVIDIA/DeepStream releases](https://github.com/DeepStream/releases/tag) から)、次のように実行します:
  ```bash
  sudo tar -xvf deepstream_sdk_v9.1.0_jetson.tbz2 -C /
  cd /opt/nvidia/deepstream/deepstream-9.1
  sudo ./install.sh
  sudo ldconfig
  ```
- **方法 3 — Debian パッケージ:** `deepstream-9.1_9.1.0-1_arm64.deb` を `sudo apt-get install ./deepstream-9.1_9.1.0-1_arm64.deb` でインストールします。

**前提パッケージ**(ネイティブインストール向けの公式依存リスト):

```bash
sudo apt install \
libssl3 libssl-dev libcurl4-openssl-dev \
libgstreamer1.0-0 gstreamer1.0-tools gstreamer1.0-plugins-good \
gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav \
libgstreamer-plugins-base1.0-dev libgstrtspserver-1.0-0 \
libjansson4 libyaml-cpp-dev libmosquitto1
```

> **Juxi の補足:** 既知の RTSP 問題(RTSP ストリームでアプリケーションが
> EOS のまま止まる)に遭遇した場合は、上記のパッケージをインストールした後に
> `/opt/nvidia/deepstream/deepstream/` 内の `update_rtpmanager.sh` スクリプトを
> 実行してください。

## 2. クロックを最大に引き上げる(何も実行する前に)

```bash
sudo nvpmodel -m 0
sudo jetson_clocks
```

NVIDIA は 1 つの例外を注記しています。**Jetson Orin Nano** は MAXN SUPER のために
`-m 2` を使用し、それ以外のすべての Orin モジュール(AGX Orin を含む)は `-m 0` を
使用します。DeepStream アプリケーションを実行する前に、これらを実行してください。

## 3. リファレンスアプリケーションを実行する

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

NVIDIA によると、期待できる結果は次のとおりです。30 本のシミュレートされた
1080p ストリームを ResNet 推論で処理したタイル表示と、パフォーマンス指標 —
**この構成で約 30 FPS** — がターミナルに出力されます。タイルをクリックすると
拡大表示され、右クリックでタイル表示に戻ります。

試す価値のある設定ファイル(すべて同じディレクトリ内にあります):

| 設定ファイル | 用途 |
|---|---|
| `source30_1080p_dec_infer-resnet_tiled_display.txt` | 30 ストリームのベンチマーク |
| `source4_1080p_dec_infer-resnet_tracker_sgie_tiled_display.txt` | トラッキング + セカンダリ推論 |
| `source1_usb_dec_infer_resnet.txt` | **単一 USB カメラ** |
| `source1_csi_dec_infer_resnet.txt` · `source2_csi_usb_dec_infer_resnet.txt` | **CSI カメラ**の構成(ドライバーの対応はお使いのカメラに依存します) |
| `source2_1080p_dec_infer-resnet_demux.txt` | Demux のサンプル |

公式クイックスタートからの注意点:

- **新しいモデルでの初回実行には数分かかります** — TensorRT エンジンの生成に時間がかかるためです。以降の実行では生成済みのエンジンが再利用されます。
- GStreamer の要素が初期化に失敗する場合は、キャッシュを削除してください: `rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`
- **ヘッドレス運用(モニターなし):** デフォルトの EGL シンクにはディスプレイが必要です。代わりに設定で **RTSP 出力シンク**を利用できます(30 ストリームの設定ファイルの `[sink2]` グループを参照してください)— 結果を別のマシンに配信します。
- プリコンパイル済みのサンプルアプリはすべて `/opt/nvidia/deepstream/deepstream-9.1/samples/` 以下にあり、それぞれに README が付属しています。

## 4. JetPack 7.2 上の DeepStream 9.1 周辺の新機能

- **エージェント支援パイプライン:** NVIDIA は *DeepStream Coding Agent*(パイプライン構築を支援する AI エージェント)をドキュメント化しています — [ドキュメント](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_AI_Agent.html) · [GitHub](https://github.com/DeepStream_Coding_Agent)。
- **パイプラインでの LLM/VLM:** リファレンスアプリには、映像パイプラインと大規模モデルの推論を組み合わせるための **deepstream-vllm-plugin** が含まれています — [ドキュメント](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_ref_app_vllm_plugin.html) を参照してください。DeepStream の外でオンデバイスのモデル推論を行う方法は、[ローカル LLM 推論](/ja/tutorials/jetson-agx-orin/local-llm)をご覧ください。
- **デバイス上の Triton:** Triton Inference Server をネイティブで(Docker なしで)実行するには、samples ディレクトリで `sudo ./triton_backend_setup.sh` を実行します(Jetson 用の Triton 2.68.0 がインストールされます)。

## トラブルシューティングと参考資料

- [DeepStream Troubleshooting & FAQ](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_troubleshooting.html)
- [パフォーマンスチューニング](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) — リファレンス構成を超えて使う場合に必要になります
- [サンプル設定の解説](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_sample_configs_streams.html)
- システムレベルの問題(ディスプレイ、電源、ストレージ):[トラブルシューティング](/ja/tutorials/jetson-agx-orin/troubleshooting) を参照してください

## 出典

- [DeepStream Installation Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html)(2026-09-24 確認)
- [DeepStream Quickstart Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html)(2026-09-24 確認)
- [JetPack 7.2.1 ダウンロードページ](https://developer.nvidia.com/embedded/jetpack/downloads)(2026-09-24 確認) — ⚠️ コンポーネント表は一部の行で遅れています。実際にインストールされるバージョンについては [ダウンロード](/ja/tutorials/jetson-agx-orin/downloads) を参照してください

*ステータス: レビュー済み（2026-10-11）。上記の日付時点の NVIDIA 公式
ドキュメントに基づいています;まだ Juxi Technology による実機検証は行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
