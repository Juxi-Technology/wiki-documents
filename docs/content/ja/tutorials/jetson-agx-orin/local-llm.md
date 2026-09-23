---
title: ローカルでの LLM 実行 — JetPack 7.2 上の TensorRT Edge-LLM
sidebar_label: ローカル LLM 推論
slug: /tutorials/local-llm
description: >-
  AGX Orin 開発キット上で NVIDIA TensorRT Edge-LLM を使い、大規模言語モデルと
  マルチモーダルモデルをローカル実行 — 対応モデル、Orin の制約、ワークフロー、
  予想されるパフォーマンスを解説します。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
review_owner: cheny
---

# ローカルでの LLM 実行 — JetPack 7.2 上の TensorRT Edge-LLM

お使いの AGX Orin 64GB は大規模言語モデルをローカルで実行できます — クラウドもネットワークも不要です。NVIDIA がこのために提供する最適化された経路が **TensorRT Edge-LLM** であり、**JetPack 7.2 上の Jetson Orin を正式にサポートしています**。このページでは全体像をつかめるようにします:お使いのキットにできること・できないこと、ワークフローの形、そして期待できるパフォーマンスです。正式なステップバイステップの手順は NVIDIA のドキュメントにあります(本文中にリンクしています)。

## まず読んでください — Orin 固有の 3 つの事実

1. **Orin で動作するのは FP16、INT8、INT4 エンジンのみです。FP8 と FP4 は Orin ではサポートされません**(これらは Thor クラスの機能です)。NVIDIA のサポートマトリクスにも明記されています — 量子化の選択はこれを踏まえて計画してください。
2. **Orin のデプロイ経路では、エンジンはデバイス上でビルドされます**(PC からのクロスコンパイルではありません)。
3. **JetPack 7.2 がサポート対象のスタックです** — CUDA 13.2 とプラットフォーム TensorRT(本リリースでは 10.16.2)の組み合わせです。aarch64 ホイールは Python 3.10〜3.12 の Jetson Orin(SM87)を対象としています。

*(出典: TensorRT Edge-LLM 公式サポートマトリクス、2026-09-24 確認。)*

## TensorRT Edge-LLM がカバーする範囲

NVIDIA のドキュメントによると、Edge-LLM はエッジプラットフォーム上で **テキスト、ビジョン、オーディオ、スピーチ、アクションモデル** に最適化された推論を提供します:

| 機能 | ドキュメント内の例 |
|---|---|
| テキスト生成 | Qwen、Gemma、Nemotron を含む LLM ファミリー |
| マルチモーダル(VLM) | Phi-4 Multimodal の例 |
| 音声認識(ASR) | 専用のサンプルワークフロー |
| 音声生成(TTS) | 専用のサンプルワークフロー |
| Vision-Language-Action | VLA の例(ロボティクス) |
| Omni(オーディオ + ビジョン + スピーチ I/O) | 専用のサンプルワークフロー |

主な機能:量子化(Orin では INT8/INT4)、投機的デコーディング(EAGLE3、DFlash など)、**KV キャッシュの再利用**、**語彙削減**、VLM 向けの **DART ビジュアルトークンプルーニング**、ストリーミング出力、LoRA サポートです。

## ワークフロー(ドキュメント記載どおり)

TensorRT Edge-LLM には、ドキュメント化された 2 つのクイックスタート経路があります:

1. **ONNX + C++ ランタイム** — チェックポイントをエクスポート/量子化し(通常は x86 ホスト上)、デバイスへ転送し、デバイス上でエンジンをビルドし、C++ ランタイムを実行します。
2. **ワンライナー Python サーバー** — サービングエンドポイントまでのより速い経路です。

ここから始めてください:**[TensorRT Edge-LLM クイックスタート](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)**

クイックスタートの先へ:

- [インストールオプション →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html)(ソース C++ ランタイム、エクスポート/量子化ワークフロー、実験的なローカルホイール)
- [対応モデル →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)
- [量子化ガイド →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) · [KV キャッシュの再利用 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [DART プルーニング →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html)

> **Juxi のヒント:** エクスポート/量子化ツールは x86 Linux ホストで最適に動作します(ドキュメントの x86 開発者向け記載によると)、**エンジンのビルドと推論はお使いのキット上で実行されます**。モデルのチェックポイント用にディスク容量を確保してください — モデル 1 つあたり数 GB が一般的です。

## サービング:OpenAI 互換エンドポイント(および Claude Code)

ドキュメントには、OpenAI 互換のチャットインターフェースを公開する**実験的な Python API とサーバー**が含まれています — OpenAI スタイルのクライアント向けの例や、**「Anthropic と Claude Code」の統合例**(Claude Code をお使いの Jetson 上のエンドポイントに向けるもの)まで記載されています。

- [実験的な Python API とサーバー →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/examples/experimental-server.html)

## 期待されるパフォーマンス(AGX Orin 64GB)

NVIDIA は 64GB モジュール上の JetPack 7.2 について、以下の tokens/sec 値を公開しています(2026 年 6 月。完全な文脈と計測方法は出典ブログを参照):

| モデル | AGX Orin 64GB |
|---|---|
| Nemotron3 Nano 30B A3B | ~40 tok/s |
| Qwen 3.5 4B | ~28 tok/s |
| Qwen 3.5 9B | ~17 tok/s |
| Qwen 3.6 27B | ~7 tok/s |
| Gemma 4 E4B | ~32 tok/s |

数値はモデル、量子化、コンテキスト長、電力モードによって変わります。これらはベンダーが公開した参考値として扱ってください。保証ではありません。

## よりシンプルな代替手段

Edge-LLM のエクスポート/ビルドワークフローが今のニーズに対して大がかりすぎる場合、NVIDIA の [Jetson AI Lab](https://www.jetson-ai-lab.com) が他のランタイム(llama.cpp、vLLM など)向けの実践的なチュートリアルを公開しています — 古いチュートリアルを参照する前に、JetPack バージョンの注記を確認してください。

## トラブルシューティング

- **初回実行は遅い:** エンジンビルドは初回起動時に数分かかることがあります。以降の実行ではエンジンを再利用します(DeepStream も同じ動作です — [当社の DeepStream チュートリアル](/ja/tutorials/jetson-agx-orin/deepstream)を参照)。
- **FP8/FP4 の命令が動作しない:** 想定どおりです — Orin がサポートするのは FP16/INT8/INT4 エンジンのみです。
- **バージョンが違う:** まず JetPack 7.2.1 を確認してください — [システムの確認](/ja/tutorials/jetson-agx-orin/verify-your-system)。

## 出典

- [TensorRT Edge-LLM — 公式サポートマトリクス](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html)(2026-09-24 確認)
- [TensorRT Edge-LLM ドキュメントホーム](https://nvidia.github.io/TensorRT-Edge-LLM/)(v0.10.1、2026-09-24 確認)
- [NVIDIA テクニカルブログ — Deploy Agentic-Ready AI at the Edge with Memory Efficiency in JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)(パフォーマンス数値。2026-09-24 確認)

*ステータス: ドラフト、cheny によるレビュー待ち。記載した日付時点の NVIDIA 公式ドキュメントに基づいています。Juxi Technology による実機検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。このページは Juxi Technology によって公開されたものであり、NVIDIA の出版物ではありません。
