---
title: ローカルでの LLM 実行 — 8GB Orin Nano 上の TensorRT Edge-LLM
sidebar_label: ローカル LLM 推論
slug: /tutorials/local-llm
description: >-
  8GB の Jetson Orin Nano で大規模言語モデルをローカル実行 — TensorRT Edge-LLM
  のサポート、精度の制約、収まるモデル、公式の数値。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/llms-full.txt
    checked: 2026-09-26
  - source: https://github.com/dusty-nv/jetson-containers
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
review_owner: cheny
---

# ローカルでの LLM 実行 — 8GB Orin Nano 上の TensorRT Edge-LLM

お使いの Jetson Orin Nano Super 開発キット(8GB)は、言語モデルをローカルで実行できます。このための NVIDIA の最適化された経路が **TensorRT Edge-LLM** であり、**JetPack 7.2 系列上の Jetson Orin を正式にサポートしています**。本ページでは、8GB に何が収まるか、現在どのランタイムが動作するかを扱います。具体的な手順は NVIDIA のドキュメントにあり、以下にリンクしています。

## まず読んでください — このキットの 4 つの制約

1. **Orin で動作するのは FP16、INT8、INT4 エンジンのみです。FP8 と FP4 エンジンはこのデバイスでは動作しません** — これらは Thor/Blackwell クラスの機能です(「Jetson Orin は FP8/FP4 モデルエンジンを実行しない」— サポートマトリクス)。
2. **エンジンは C++ ランタイムによってデバイス上でビルドされます。** ONNX エクスポートと量子化は x86-64 Linux ホスト上で実行され、Orin 上では実行されません。エンジンは SM 単位で厳密です:Thor(SM110)でビルドしたエンジンは Orin Nano(sm_87)にはロードできません。
3. **JetPack 7.2.1(L4T r39.2.1)がサポート対象のスタックです** — CUDA 13.2.2、TensorRT 10.16.2。Edge-LLM は JetPack に含まれるこのプラットフォーム TensorRT を使用します。
4. **8GB の統合メモリは OS とデスクトップと共有されます。** 使用可能なのはおよそ 7.6 GB です。制約となるのは TOPS ではなくモデルのサイズであり、KV キャッシュも同じメモリに収まる必要があります。

> **重要:** このキットでは **INT4 AWQ** または **INT4 GPTQ** のチェックポイントを選んでください。FP8、MXFP8、FP4、NVFP4 のチェックポイントは選択しないでください。INT8 GPTQ はサポートされていません。

## TensorRT Edge-LLM がカバーする範囲

TensorRT Edge-LLM は、エッジプラットフォーム上の LLM と VLM に向けた NVIDIA の公式ランタイムです。サポートマトリクスでは、Jetson Orin が JetPack 7.2 向けに「Official(正式)」と記載されており、エンジンはデバイス上でビルドされ、精度は FP16、INT8、INT4 です。

- **モデルのカバレッジ:** サポートされるチェックポイントには Llama 3.2 1B/3B、Llama 3.1 8B、Qwen2.5(0.5B〜14B)、Qwen3(0.6B〜8B)、および VLM(Qwen2.5-VL 3B/7B、InternVL3/3.5(1B〜14B)など)が含まれます — 30B パラメータ未満の dense チェックポイントです。これは検証済みリストではありません:「記載されたすべてのチェックポイントが、サポート対象のすべてのプラットフォームと精度で完全に検証されているわけではありません」。
- **8GB 向けビルドフラグ:** Orin Nano で INT4 エンジンをビルドする場合は、`--externalize-weights int4_ffn`(dense)または `--externalize-weights int4_ffn int4_moe`(MoE)を指定して、エンジンビルド時のメモリを削減します。
- **ディスク容量:** ONNX ファイルとエンジン用に、モデルワークフロー 1 つあたりおよそ 20〜50 GB を見込んでください。このキットには内蔵ストレージがありません([クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start))。
- **2 つのクイックスタート経路:** C++ 経路(ホストでエクスポート/量子化し、デバイス上でエンジンをビルドして実行)と、サーバー経路 — `tensorrt-edgellm-serve Qwen/Qwen3.5-0.8B`(初回起動時にチェックポイントをダウンロード)。

> **Juxi のヒント:** 正式な手順は NVIDIA のものです — [クイックスタート](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)、
> [インストール](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html)、
> [対応モデル](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)。
> 0.10.1 のインストールページには次のように記載されています:「0.10.1 ではホイールは公開されておらず、既定のインストール経路でもありません」。

## 実際に 8GB に収まるもの

- **NVIDIA がこのモジュールでベンチマークしたのは最大 2B パラメータです。** Edge-LLM のベンチマークページで最大の Orin Nano(8GB)行は Qwen3.5-2B の 4,692 MB です:「2B は NVIDIA が Orin Nano 8GB でベンチマークした最大のモデルです」。
- **ベンダーのウォークスルーでは 4B モデルを実行しています。** Jetson AI Lab のチュートリアルは、Qwen3-4B-Instruct INT4 AWQ(重み約 2 GB)が「Orin Nano の 8GB 統合メモリ内」に収まると報告しています。InternVL3 1B/2B も INT4 AWQ で収まりますが、より大きなバリアントは AGX Orin または Thor を対象としています。(ベンダー提供の内容。)
- **NVIDIA のメモリブログが示す実用的な範囲:LLM は約 10B まで、VLM は約 4B パラメータまで** — 4 ビット量子化と効率的なランタイムを使う、チューニング済み構成での値です。
- **ファイルサイズだけでは収まるかどうかの判断になりません — KV キャッシュも収まる必要があります。** コミュニティの報告では、12B/26B クラスの GGUF モデル(gemma4:12b は 7.4 GB、gemma4:26b は 16 GB)が 8GB ボード上の Ollama で失敗しています:`cudaMalloc failed: out of memory ... failed to allocate buffer for kv cache`。(未確認。)

## このキットの公式パフォーマンス数値

NVIDIA は **Jetson Orin Nano(8GB)** のベンチマーク表を公開しています — v0.10.0、JetPack 7.2 / CUDA 13.2 / TensorRT 10.16。MTBench(LLM)と COCO(VLM)でのランタイム結果で、ピーク GPU メモリ付きです:

| モデル | 種類 | スループット | ピーク GPU メモリ |
|---|---|---|---|
| Qwen3-0.6B | LLM | 77.0 tok/s | 1,917 MB |
| Qwen3-1.7B | LLM | 36.5 tok/s | 2,992 MB |
| Qwen3-VL-2B | VLM | 36.1 tok/s | 4,486 MB |
| Qwen3.5-0.8B | LLM | 59.1 tok/s | 2,127 MB |
| Qwen3.5-0.8B | VLM | 59.0 tok/s | 2,760 MB |
| Qwen3.5-2B | LLM | 29.6 tok/s | 3,642 MB |
| Qwen3.5-2B | VLM | 29.6 tok/s | 4,692 MB |

Orin の行はバッチ 1 と外部化した INT4 重みを使用しています。ビルド制限:maxInputLen 2048、maxKVCacheCapacity 2200。「本番パフォーマンスはシステムレベルのチューニング(電力モード、メモリ構成、熱管理)によって変動する可能性があります」。

> **重要:** NVIDIA が公開している **AGX Orin 64GB** の tokens/sec 表は、このキットには適用され**ません** — モジュール、メモリ帯域幅、電力範囲が異なります。AGX Orin の数値から Orin Nano の数値を推定しないでください。ここでの Ollama や llama.cpp の経路について、ファーストパーティの数値は存在しません。

## このキットで使えるその他のランタイム

### Ollama

NVIDIA スタッフが開発者フォーラムで JetPack 7.2.1 について検証した現在の状況(2026 年 9 月):標準のインストーラーが動作し — `curl -fsSL https://ollama.com/install.sh | sh` — `ollama ps` は `100% GPU` を示すはずです。「Unsupported JetPack version detected」という警告は無害です。

古いビルドは、プリビルドされた CUDA ライブラリに Orin のコンピュートケイパビリティである sm_87 が欠けていたため、CPU にフォールバックしていました。コミュニティの報告によれば Ollama 0.30.11 が「CC 87 for CUDA v13」を追加し、NVIDIA スタッフが修正を確認しています。一部のコミュニティの不具合報告は残っています(2026 年 8〜9 月)— お使いの実機で `ollama ps` を確認してください。CUDA v13 のソースビルドが引き続きフォールバック手段です。

### JetPack 7.2 用の Python ホイール

JetPack 7.2 / CUDA 13.2 向けの CUDA 対応 Python パッケージ(PyTorch など)は、NVIDIA スタッフが参照先として挙げる Jetson AI Lab の SBSA インデックスから入手できます:

```
https://pypi.jetson-ai-lab.io/sbsa/cu130
```

これを pip インデックスとして使用します(`--index-url https://pypi.jetson-ai-lab.io/sbsa/cu130`)。torch 2.11.0、torchvision 0.25.0、vllm 0.20.0+cu130 などの aarch64 ホイールが配布されています。`jp7/*` インデックスは存在せず、JetPack 6 時代のインデックスは `jp6/cu126` です。CUDA 13.2 により、Orin は Arm SBSA ツールキット(R595 以降のドライバー)に統一されます。

### jetson-containers と Jetson AI Lab(代替経路)

[jetson-containers](https://github.com/dusty-nv/jetson-containers) は JetPack 6.2(CUDA 12.6)と JetPack 7(CUDA 13.x)をサポートしています。主要なサービング経路向けにビルド済みの `-jetson-orin` イメージがあり、`ghcr.io/nvidia-ai-iot/llama_cpp:latest-jetson-orin` や `ghcr.io/nvidia-ai-iot/vllm:latest-jetson-orin` などが含まれます。

ベンダー資料による 8GB での注意点:vLLM の例では `--shm-size=16g` を使用しており(ここでのサイズ推奨ではありません)、推奨セットアップでは Docker のデータルートを NVMe に移し、16 GB のスワップファイルを追加します(先に ZRAM を無効化)。

## 8GB 向けのチューニング

モデルが収まらない場合は、プラットフォームのメモリを解放し(ヘッドレスモードで最大約 865 MB を回収)、4 ビットに量子化し、KV キャッシュとコンテキストを意図的に設計してください — [8GB でのメモリ効率](/ja/tutorials/jetson-orin-nano/memory-efficiency)を参照。

## トラブルシューティング

- **ロード時にメモリ不足** — `cudaMalloc failed: out of memory ... failed to allocate buffer for kv cache` は、モデルと KV キャッシュが 8GB の統合メモリを超えていることを意味します。より小さい、またはより強く量子化したモデルを使うか、コンテキストを短縮してください。Edge-LLM のエンジンビルドでは `--externalize-weights int4_ffn` を追加し、`--maxInputLen` / `--maxKVCacheCapacity` を小さくしてください。
- **Ollama の CPU フォールバック、または「Unsupported JetPack version detected」警告** — まず Ollama を更新してください(古いビルドには sm_87 がありませんでした)。NVIDIA スタッフによると、7.2.1 ではこの警告は無害です。`ollama ps`(`100% GPU`)で確認してください。
- **バージョンやセットアップの問題** — [システムの確認](/ja/tutorials/jetson-orin-nano/verify-your-system)と[トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)を参照してください。

## 出典

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/):[サポートマトリクス](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html)、[対応モデル](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)、[インストール](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html)、[クイックスタート](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)、[パフォーマンスベンチマーク](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html)(2026-09-26 確認)
- [JetPack 7.2.1 ダウンロードページ](https://developer.nvidia.com/embedded/jetpack/downloads)(2026-09-26 確認)
- [NVIDIA ブログ — NVIDIA Jetson でより大きなモデルを実行するためのメモリ効率の最大化](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)(2026-09-26 確認)
- [NVIDIA 開発者フォーラム — Jetson 上の Ollama(JetPack 7.2.1 でスタッフ検証済み)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)(2026-09-26 確認)
- [NVIDIA 開発者フォーラム — JetPack 7.2 の GPU アクセラレーション問題(ホイールインデックス、sm_87)](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)(2026-09-26 確認)
- [NVIDIA 開発者フォーラム — Jetson Orin Nano Super 8GB で動作する AI モデル(コミュニティ)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412)(2026-09-26 確認)
- [Jetson AI Lab — TensorRT Edge-LLM チュートリアル](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/)(2026-09-26 確認)
- [Jetson AI Lab — ドキュメント全文(コンテナイメージ表)](https://www.jetson-ai-lab.com/llms-full.txt)(2026-09-26 確認)
- [jetson-containers(GitHub)](https://github.com/dusty-nv/jetson-containers)(2026-09-26 確認)
- [Jetson AI Lab PyPI インデックス — sbsa/cu130](https://pypi.jetson-ai-lab.io/sbsa/cu130)(2026-09-26 確認)

*ステータス:ドラフト、cheny によるレビュー待ち。記載した日付時点の NVIDIA 公式ドキュメントに基づいています。Juxi Technology による実機検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
