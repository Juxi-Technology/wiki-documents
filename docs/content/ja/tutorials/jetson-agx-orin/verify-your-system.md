---
title: システムの確認 — バージョンとコンポーネントのチェックリスト
sidebar_label: システムの確認
slug: /getting-started/verify-your-system
description: >-
  Jetson AGX Orin 開発キットが JetPack 7.2.1 と完全なコンポーネントスタックで
  動作していることを確認します — バージョン確認コマンドと期待されるコンポーネント一覧。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
review_owner: cheny
---

# システムの確認

キットのセットアップまたはアップデートが完了したら、次の 2 点を確認してください: **BSP バージョン**と**インストール済みの JetPack コンポーネントスタック**です。どちらの確認も 1 分未満で完了します。

## ステップ 1：L4T(BSP)バージョンを確認する

```bash
cat /etc/nv_tegra_release
```

**JetPack 7.2.1** のシステムでは、次のように表示されます:

```
# R39 (release), REVISION: 2.1, ...
```

出力がより古いリリース(例えば R35)を示している場合は、まず BSP を更新してください — **[書き込みと更新](/ja/tutorials/jetson-agx-orin/flashing-and-updates)** を参照してください。

## ステップ 2：JetPack コンポーネントを確認する

JetPack のコンポーネント(CUDA、cuDNN、TensorRT など)は Debian パッケージとしてインストールされています。メタパッケージが存在することを確認します:

```bash
dpkg -l | grep -i nvidia-jetpack
```

続いて、CUDA ツールキットが利用可能か確認します:

```bash
nvcc --version
```

本リリースの期待される出力は **CUDA 13.2** です。`nvcc` が見つからない場合、またはメタパッケージが存在しない場合は、次のコマンドでコンポーネントをインストールしてください:

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

(接続速度により異なりますが、約 1 時間かかります — [クイックスタート → ステップ 3](/ja/tutorials/jetson-agx-orin/quick-start) を参照してください。)

## ステップ 3：JetPack 7.2.1 の期待バージョン

下表は **JetPack 7.2.1 / Jetson Linux 39.2.1** に関する NVIDIA 公式のコンポーネント一覧です(2026-09-23 に NVIDIA の JetPack ダウンロードページで確認):

| コンポーネント | バージョン |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| オペレーティングシステム | Ubuntu 24.04 (L4T) |
| カーネル | 6.8 |
| CUDA | 13.2.1 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI(コンピュータビジョン) | 4.1.3 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19(ISO イメージ同梱) |
| Isaac ROS | **JetPack 7 では未提供**(NVIDIA によると「近日公開予定」) |

> **Juxi 注記:** `dpkg` はパッケージのバージョンにビルドサフィックス(例えば `13.2.1-b48`)を付けて表示することがありますが、これは正常です — サフィックスではなくバージョン番号を照合してください。ロボティクス関連のユーザーは、Isaac ROS に依存する作業を計画する前に Isaac ROS の行を確認してください。

## オプション — システムの稼働状況を簡単に確認

`tegrastats`(Jetson Linux に同梱)は、CPU/GPU/メモリの使用状況をリアルタイムで表示します:

```bash
tegrastats
```

停止するには `Ctrl`+`C` を押します。

## コンポーネントが不足している場合

1. `sudo apt update && sudo apt install nvidia-jetpack` を再実行します。
2. セットアップ手順の `apt dist-upgrade` + 再起動が完了していることを確認します([クイックスタート → ステップ 3](/ja/tutorials/jetson-agx-orin/quick-start) を参照)。
3. ディスク容量(`df -h`)とインターネット接続を確認します。
4. それでも解決しない場合は、**[トラブルシューティング](/ja/tutorials/jetson-agx-orin/troubleshooting)** を参照してください。

## 参考資料

- [JetPack SDK Setup — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html)(2026-09-23 に確認)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads)(2026-09-23 に確認)

*ステータス: ドラフト、cheny によるレビュー待ち。記載日時点の NVIDIA 公式ドキュメントに基づく内容であり、Juxi Technology による実機検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
