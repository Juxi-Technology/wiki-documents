---
title: メモリ効率 — 8GB でモデルを動かす
sidebar_label: メモリ効率
slug: /tutorials/memory-efficiency
description: >-
  LLM、VLM、ビジョンのワークロードを Jetson Orin Nano Super 開発キットの
  8GB 統合メモリに収めるための、ドキュメント化された手段 — プラットフォーム、
  モデル、計測。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/ram-optimization/
    checked: 2026-09-26
review_owner: cheny
---

# メモリ効率 — 8GB でモデルを動かす

Orin Nano Super キットでは、8GB の統合メモリがすべてにとっての厳しい上限です:OS、デスクトップ、サービス、そしてモデル自体。ドキュメント化された手段は **プラットフォーム**、**モデル**、**計測**という 3 つの層に分かれており、本ページでは、より大きなモジュール向けにしかドキュメント化されていない手法がある場合はその旨を記します。

## 8GB のメモリ予算を数字で見る

- ファームウェアとカーネルの予約領域を除くと、**8GB のうちおよそ 7.6 GB が使用可能**です — NVIDIA のメモリ効率ブログが、すべての「使用可能メモリ」の数値に用いている予算です。
- CPU メモリと GPU メモリ(CUDA、マルチメディアバッファ)は**同一の物理プール**から割り当てられます。一方を減らせば、もう一方にも余裕が生まれます。
- ブログの代表的なデモ — 2B パラメータの VLM パイプライン — は **4.5 / 7.6 GB(約 60%)** で動作します。

## レバー 1 — プラットフォーム層:OS とサービスが占めるもの

以下の削減量は NVIDIA のメモリ効率ブログによるものです。

| レバー | ドキュメント化された削減量 | 方法 |
|---|---|---|
| グラフィカルデスクトップを無効化(ヘッドレス) | 最大 865 MB | `sudo systemctl set-default multi-user.target` |
| ネットワークおよびジャーナリングサービスを無効化 | 最大 32 MB | `sudo systemctl disable <service-name>` |
| ディスプレイとカメラのカーブアウト | 合計約 100 MB | BSP のデバイスツリーを編集し、再書き込み |
| SWIOTLB 予約 | 約 4 MB | カーネル引数 `swiotlb=2048` — DMA の問題が発生した場合のみ |
| DeepStream スタイルのパイプライン | 最大 412 MB | コンテナからベアメタルへ(70 MB)、Python から C++ へ(84 MB)、Tiler/OSD を無効化して FakeSink を使用(258 MB) — [DeepStream](/ja/tutorials/jetson-orin-nano/deepstream)を参照 |
| 推論フレームワークの選択 | 2.7 GB 超のオーバーヘッドを回避 | 軽量なランタイム(C++ ランタイム、llama.cpp)。重いフレームワークは初期化だけで 2.7 GB 以上を追加することがあります |

> **Juxi の補足:** カーブアウトの編集は BSP ソースの変更です。再書き込みが必要で、削減量もわずかです。変更は一度に
> 1 つずつ行い、動作する書き込みイメージを保持してください — [書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)を参照。

**スワップは削減ではなく、圧力逃がし弁です。** ベンダーの RAM 最適化チュートリアルは、ZRAM を **NVMe 上の 16 GB スワップファイル**に置き換えます(先に `sudo systemctl disable nvzramconfig`)。NVIDIA の 8GB デモは、ピーク時に約 **2 GB のスワップ使用**を想定していました。

### サーバー停止後はキャッシュを解放する

vLLM や SGLang のサーバー、または Docker コンテナを停止した後も、メモリ使用量が高いままになることがあります(L4T r39.2.1 の既知の問題 5661165)。NVIDIA のコマンド:

```bash
sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
```

Edge-LLM のエンジンビルドでメモリ不足が発生した場合も同じ対処が有効です:`sudo sysctl -w vm.drop_caches=3` と、より小さなビルド制限を組み合わせます(ベンダーのチュートリアル)。

### 電力モードが変えるのはクロックであり、容量ではない

| 電力モード | モード ID | CPU 最大クロック | GPU 最大クロック | メモリ最大クロック |
|---|---|---|---|---|
| 15W | 0 | 1497.6 MHz | 612 MHz | 2133 MHz |
| 25W(デフォルト) | 1 | 1344 MHz | 918 MHz | 3199 MHz |
| MAXN_SUPER | 2 | 1728 MHz | 1020 MHz | 3199 MHz |

上記のクロック最大値は NVIDIA の r39.2 の電力とパフォーマンスの表によるものです。電力モードが変えるのはクロック周波数であり、メモリ容量ではありません — 収まらないモデルは、より高速なモードでも収まりません。切り替えは `sudo nvpmodel -q`(一覧)と `sudo nvpmodel -m <mode_id>` で行います。MAXN_SUPER には Super 書き込み構成が必要で、実験的位置づけです(同表による)。25W または MAXN SUPER が存在しない場合は、[トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)を参照してください。

> **注意:** 過度に大きな CUDA メモリ割り当ては**デバイスを再起動**させることがあります(L4T r39.2.1 の既知の問題 5699079)。同じリリースノートのガイダンス:CUDA やその他のアプリケーションが物理的に利用可能な量を超えるメモリを要求しないようにし、システムプロセスが強制終了されないよう、CUDA プロセスをより高い OOM スコアで起動してください。

## レバー 2 — モデル層:モデルとそのキャッシュが占めるもの

### 量子化は最大の単一レバー

Orin で動作するのは **FP16、INT8、INT4 エンジンのみ**です。FP8 と FP4 は Orin では動作しません(Thor/Blackwell クラス)。TensorRT Edge-LLM では **INT4 AWQ または INT4 GPTQ** のチェックポイントを使用し、INT8 GPTQ は避け、FP8、MXFP8、FP4、NVFP4 のチェックポイントは決して選ばないでください。[ローカル LLM 推論](/ja/tutorials/jetson-orin-nano/local-llm)を参照。

ファーストパーティの数値:Qwen3 8B を FP16 から W4A16 にすると約 **10 GB** を回収、Qwen3 4B を BF16 から INT4 にすると約 **5.6 GB** を回収します。4B の場合の NVIDIA のグラフには「Jetson Orin NX 16 GB」というキャプションが付いています — より大きなモジュールなので、この数値は参考として扱い、8GB での約束とはしないでください。

4 ビット量子化と効率的なランタイムを用いた場合、この予算に対する NVIDIA のドキュメント上の範囲は **LLM が約 10B パラメータまで、VLM が約 4B パラメータまで**です。

### NVIDIA が 8GB で実際にベンチマークしているもの

TensorRT Edge-LLM は、0.6B〜2B パラメータのモデル(Qwen3 および Qwen3.5 ファミリー)について Orin Nano 8GB の行を公開しています。**2B は NVIDIA がこのモジュールでベンチマークしている最大のモデルです**。4B の INT4 AWQ ウォークスルーはベンダーのチュートリアルとして存在します(重み約 2 GB)が、公式の 4B の数値は公開されていません。

### エンジンビルドのメモリ(TensorRT Edge-LLM)

- `--externalize-weights int4_ffn`(dense)または `--externalize-weights int4_ffn int4_moe`(MoE)は、システムメモリの少ない Orin デバイスでエンジンビルド時のメモリを削減します。
- ベンダーのチュートリアルによる Orin Nano 向けに調整された制限:`llm_build --maxBatchSize 1 --maxInputLen 512 --maxKVCacheCapacity 1024`。それでもビルドでメモリ不足になる場合は、まずシステムメモリを解放してから、さらに小さくします(例:`--maxInputLen 256 --maxKVCacheCapacity 512`)。エンジンはデバイス上でビルドされ、モジュール間で移植できません。

### KV キャッシュ:サイズ設定と再利用

KV キャッシュはコンテキスト長、バッチサイズ、同時実行数に応じて増大します。これはメモリ予算の一部であり、後から考えるおまけではありません。

- ビルド制限がその上限を定めます:`--maxInputLen` と `--maxKVCacheCapacity`。Orin Nano のベンチマークビルドでは maxInputLen 2048、maxKVCacheCapacity 2200、バッチ 1 が使われました。
- **KV キャッシュの再利用**はドキュメント化された Edge-LLM ランタイムの機能です。繰り返される入力プレフィックス向けの、プロセスローカルで内容アドレス指定型のキャッシュであり、ドキュメント、以前のターン、生成された続き、繰り返される画像プレフィックスからの prefill 状態が、再計算されずに再利用されます。
- 収まるはずのモデルファイルでも失敗することがあります:コミュニティの報告では、7.4 GB と 16 GB の GGUF ファイルが 8GB ボード上で KV キャッシュの割り当てエラーで失敗しています — 収まるかどうかを判断する際は、KV キャッシュとランタイムのオーバーヘッドを加算してください。
- **語彙の削減**(生成をタスク固有のトークン部分集合に制限)と **ビジュアルトークンプルーニング(DART)**(prefill 前に重複した視覚トークンを削除)は、ドキュメント化された Edge-LLM の機能ページです。ビジュアルエンジンのビルドでは画像トークンの制限も指定します:`--minImageTokens`、`--maxImageTokens`、`--maxImageTokensPerImage`。

> **重要:** FP8 KV キャッシュ — KV キャッシュのメモリを約 50% 節約できる手段 — には SM89 以降(Ada Lovelace 以降)が必要です。Orin は SM87 なので、**このキットでは利用できません**。FP16 KV キャッシュを使用してください。

### ファーストパーティによるビフォー/アフター

NVIDIA の 8GB ケーススタディ(メモリ効率ブログ、表 7):完全な GNOME デスクトップではなくヘッドレスモード(1.8 GB → 1.1 GB)と、4 ビット GGUF の VLM(Q4_K_M、6.6 GB → 2.2 GB)。このパイプラインは以前は Orin Nano 8GB では動作せず(VLM だけで RAM の 87% を使用)、現在は **4.5 / 7.6 GB(約 60%)** で動作しています — 5.1 GB 超の節約です。「ビフォー」の列は **Orin NX 16 GB** 上のもので、同じ最適化によってワークロードが 8GB キット上へ移りました。

## レバー 3 — 計測層:メモリの行き先を見る

| ツール | わかること | 備考 |
|---|---|---|
| `sudo tegrastats` | CPU、GPU、メモリ、温度、電力 | 開発キットユーザーガイド:Jetson では nvidia-smi は主要なモニタリングツールではありません |
| `nvidia-smi dmon` | GPU 使用率 | リリースノート 5406663 による。Jetson Power GUI の GPU 使用率は「まだ評価中」です |
| `free -h` | OS から見たメモリ | GPU ワークロードが割り当て可能な量はわかりません |
| procrank | プロセスごとの物理メモリ(PSS) | `git clone https://github.com/csimmonds/procrank_linux.git`、`cd procrank_linux/`、`make`、`sudo ./procrank` |
| nvmap clients | GPU/マルチメディアバッファを保持しているプロセス | `sudo cat /sys/kernel/debug/nvmap/iovmm/clients` |

### 「空きメモリ」は予算ではない

`free -h` は OS 全体から見た値を示しますが、GPU の割り当ては同じプールから別の会計で行われます。8GB ボードに関するコミュニティの報告では、`free -h` がまだ 5.7 GiB の「空き」を示しているのに、KV キャッシュ用の `cudaMalloc` が失敗しました[グレード B、コミュニティ報告]。収まるかどうかは「空き」ではなく、約 7.6 GB の予算に対して判断してください。

### 方法

1. まずプラットフォームの基本を確認します — [システムの確認](/ja/tutorials/jetson-orin-nano/verify-your-system)。
2. ベースラインを記録します:アイドル時と負荷時のメモリ(`tegrastats`)。
3. レバーを 1 つ変更して、もう一度計測します。何も変化しなければ元に戻します。

## どこから始めるか

ドキュメント化された効果の大きさの順に:

1. **ランタイムと量子化** — NVIDIA のまとめで最大の層です(推論フレームワークとモデル量子化で約 5〜10 GB、ブログの表 5 による)。
2. **ヘッドレス** — 最大約 865 MB、コマンド 1 つ。
3. **パイプラインのチューニング** — 最大約 412 MB(DeepStream スタイル)。
4. **NVMe 上のスワップ** — 圧力逃がしであり、削減ではありません。
5. **カーブアウトと SWIOTLB** — 約 100 MB と 4 MB、そして再書き込み。最後に。

それでもモデルが収まらない場合、問題は設定ではなくモデルです:より小さくする、さらに量子化する、コンテキストを短縮する、バッチを減らす — [ローカル LLM 推論](/ja/tutorials/jetson-orin-nano/local-llm)と [FAQ](/ja/tutorials/jetson-orin-nano/faq)を参照してください。

## 出典

- [NVIDIA テクニカルブログ — NVIDIA Jetson でより大きなモデルを実行するためのメモリ効率の最大化](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)(7.6 GB の予算、デスクトップ 865 MB、ネットワーク/ジャーナリング 32 MB、カーブアウト、SWIOTLB、パイプラインの削減量、量子化とビフォー/アフターの表、procrank のインストール手順と nvmap clients。2026-09-26 確認)
- TensorRT Edge-LLM ドキュメント:[対応モデル](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html) · [FP8 KV キャッシュ](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html) · [パフォーマンスベンチマーク](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) · [クイックスタートガイド](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html) · 機能ページ:[KV キャッシュの再利用](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [語彙の削減](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) · [ビジュアルトークンプルーニング(DART)](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html)(2026-09-26 確認)
- Jetson Linux ドキュメント:[r39.2.1 リリースノート](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)(問題 5661165、5699079、5406663) · [電力とパフォーマンス、r39.2](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) · [開発キット How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html)(2026-09-26 確認)
- Jetson AI Lab:[TensorRT Edge-LLM チュートリアル](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) · [RAM 最適化](https://www.jetson-ai-lab.com/tutorials/ram-optimization/)(Orin Nano のビルド制限、NVMe スワップ。2026-09-26 確認)
- [NVIDIA 開発者フォーラム — Jetson 上の Ollama](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)(コミュニティ:free -h と cudaMalloc の比較。グレード B。2026-09-26 確認)

*ステータス:ドラフト、cheny によるレビュー待ち。記載した日付時点の NVIDIA 公式ドキュメントに基づいています。Juxi Technology による実機検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
