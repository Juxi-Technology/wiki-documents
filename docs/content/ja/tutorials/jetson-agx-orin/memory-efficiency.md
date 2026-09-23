---
title: メモリ効率 — 64GB でより大きなワークロードを実行する
sidebar_label: メモリ効率
slug: /tutorials/memory-efficiency
description: >-
  AGX Orin 開発キットでメモリ使用量を削減するための、ドキュメント化された
  手段 — プラットフォームレベルのエージェントスキル、TensorRT Edge-LLM に
  おけるモデルレベルの最適化、そして結果を計測する方法。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
review_owner: cheny
---

# メモリ効率 — 64GB でより大きなワークロードを実行する

エッジデバイスでは、どのモデルを実行できるかを制限するのは通常、演算能力ではなくメモリです。JetPack 7.2 はメモリ効率を主要テーマとしてリリースされ、最適化には**プラットフォーム**、**モデル**、**計測**という 3 つのドキュメント化されたレイヤーがあります。本ページではその手段を整理し、それぞれから正式な情報源へリンクします。

## レバー 1 — プラットフォームレベル(NVIDIA エージェントスキル)

NVIDIA によると、JetPack 7.2 の**メモリ最適化エージェントスキル**は、AI エージェントがスタック全体のメモリ消費を監査・削減する作業を導きます:

- **ブートローダーのメモリカーブアウト** — Linux が起動する前に予約されるメモリを回収する
- **カーネルのメモリ予約** — カーネルが確保しておくメモリを調整する
- **ユーザー空間のオーバーヘッド** — 冗長なプロセスやサービスを見つけて削除する

NVIDIA が示す目標は、より高性能なワークロードをより小さなメモリフットプリントに収めることです(これにより、同じハードウェアがソフトウェアリリースを重ねるごとに使い続けられるようになります)。まずはこちらから:

- [Jetson デバイス側スキル](https://github.com/jetson-device-skills) · [Jetson BSP スキル](https://github.com/jetson-bsp-skills)
- 背景:[NVIDIA の JetPack 7.2 メモリ効率ブログ](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)

> **注意:** カーブアウトと予約の変更は起動動作に影響します。変更は一度に
> 1 つずつ行い、リカバリー手段([書き込みと更新](/ja/tutorials/jetson-agx-orin/flashing-and-updates))を確保したうえで、
> 本番運用に移す前に再検証してください。

## レバー 2 — モデルレベル(TensorRT Edge-LLM の機能)

LLM/VLM ワークロードでは、メモリ消費が最も大きいのは重みと KV キャッシュです。TensorRT Edge-LLM は以下の手段をドキュメント化しています(Orin は FP16/INT8/INT4 エンジンを実行します — [ローカル LLM 推論](/ja/tutorials/jetson-agx-orin/local-llm)を参照):

| レバー | 機能 | ドキュメント |
|---|---|---|
| **量子化**(Orin では INT8/INT4) | 重みが小さくなり、帯域幅が減る | [量子化ガイド](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) |
| **語彙の削減** | 出力語彙 / 埋め込みテーブルを縮小する | [語彙の削減](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) |
| **KV キャッシュの再利用** | 再計算せず、関連するリクエスト間でキャッシュを再利用する | [KV キャッシュの再利用](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) |
| **DART ビジュアルトークンプルーニング** | VLM の冗長な画像トークンを削減する | [DART プルーニング](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) |

*(FP8 KV キャッシュはドキュメントに記載がありますが Thor 向けです。公式のサポートマトリクスによると、Orin は FP16/INT8/INT4 エンジンに限定されます。)*

## レバー 3 — 推測せず、計測する

- **システムビュー:** `tegrastats`(Jetson Linux に組み込み)で CPU/GPU/メモリをリアルタイムに確認 — [システムの検証](/ja/tutorials/jetson-agx-orin/verify-your-system)を参照。
- **モデルビュー:** TensorRT Edge-LLM には[メモリ監視の設計とツール](https://nvidia.github.io/TensorRT-Edge-LLM/developer_guide/software-design/memory-monitoring.html)があり、[リリースごとの性能ベンチマーク](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html)も公開しています。
- **方法:** ベースライン(アイドル時と負荷時のメモリ使用量)を記録し、**1 つ**のレバーだけを変更して、もう一度計測します。公開できる数値は、常に自分のワークロードから得たものでなければなりません。

## 実践における意味

- 64GB モジュールはすでに 30B クラスのモデルを実行できます([ローカル LLM 推論](/ja/tutorials/jetson-agx-orin/local-llm)の公開数値を参照)。メモリ最適化は、その上に*さらに*積み増すための手段です — マルチモデルパイプライン、より長いコンテキスト、常時稼働のエージェント([エージェント AI](/ja/tutorials/jetson-agx-orin/agentic-ai))、推論と並行して動く映像パイプライン([DeepStream](/ja/tutorials/jetson-agx-orin/deepstream))など。
- 現在のワークロードが今はぎりぎり収まっているなら、まずレバー 2(モデルレベル)から始めてください — 最もリスクが低く、ドキュメントも最も充実しています。プラットフォーム自体を絞り込みたい場合はレバー 1 を使ってください。

## 参考資料

- [NVIDIA テクニカルブログ — JetPack 7.2 におけるメモリ効率とエージェントスキル](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)(2026-09-24 確認)
- [TensorRT Edge-LLM ドキュメント](https://nvidia.github.io/TensorRT-Edge-LLM/)(機能とサポートマトリクス、2026-09-24 確認)

*ステータス:ドラフト、cheny のレビュー待ち。記載日時点の NVIDIA 公式
ドキュメントに基づく内容です。Juxi Technology による実機での検証はまだ
行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。このページは
Juxi Technology によって公開されているものであり、NVIDIA の公式出版物ではありません。
