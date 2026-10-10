---
title: エージェント型 AI — JetPack 7.2 上の NemoClaw
sidebar_label: エージェント型 AI(NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  AGX Orin 開発キットに NVIDIA NemoClaw を導入 — コマンド 1 つでのインストール、
  Jetson エージェントスキル、常時稼働エージェント向けの実用メモ。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
review_owner: cheny
---

# エージェント型 AI — JetPack 7.2 上の NemoClaw

JetPack 7.2 はお使いのキットを **エージェント対応**にします。NVIDIA NemoClaw は
コマンド 1 つでインストールでき、NVIDIA のエージェントスキルが、これまで手作業
だったプラットフォーム作業の多くを自動化します。

## NemoClaw とは

NVIDIA によると、NemoClaw は **自律エージェント** — 推論し、計画し、行動する
常時稼働の AI システム — を構築するためのオープンなスタック/ブループリントの
集合です。OpenClaw エージェントエコシステムに、プライバシーとセキュリティの
制御(**OpenShell** のランタイムポリシー制御による)を追加し、Nemotron モデルや
NeMo といった NVIDIA のコンポーネントをパッケージ化しています。JetPack 7.2 には
**必要な依存関係が事前設定されている**ため、お使いのキットでの手動の環境
セットアップは不要です。

- NemoClaw 製品ページ: <https://www.nvidia.com/en-us/ai/nemoclaw>
- GitHub 上の NemoClaw: <https://github.com/NemoClaw> · コミュニティの事例: <https://github.com/nemoclaw-community>

## インストール(コマンド 1 つ、公式)

キット上(JetPack 7.2 以降)で次を実行します:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

> **セキュリティに関する注意 — 実行前に読んでください:** これは常時稼働の
> エージェントフレームワークをインストールします。有効にする*前に*、エージェントが
> 何にアクセスを許可され、どの認証情報を使用できるかを確認し、スコープ付き/失効
> 可能なトークンを優先し、OpenShell のポリシー制御を使用してください。失効できない
> アクセス権を付けたまま、エージェントを無人で放置しないでください。

## インストール後 — 次に進む先

NVIDIA は、インストールガイド、クラウドトライアル、学習リソースをまとめた
**Build-a-Claw Resource Hub** を運営しています:
<https://www.nvidia.com/en-us/ai/build-a-claw>

その他に役立つ情報:

- NVIDIA Deep Learning Institute のコース: *Securing Agents With NemoClaw and OpenShell*(リソースハブを参照)
- NVIDIA Developer Discord — `#nemoclaw` チャンネル
- サードパーティによるウォークスルー(例: [Seeed Studio の NemoClaw ガイド](https://wiki.seeedstudio.com/control_rebot_arm_with_nemoclaw_on_nvidia_jetson_thor_bk/)、Jetson Thor のロボットアーム向けに書かれたもの)では、`nemoclaw onboard` などのインストール後のフローが説明されています — これらはコミュニティのガイダンスとして扱い、正式なフローについては NVIDIA のハブに従ってください。

## Jetson エージェントスキル — プラットフォーム作業の自動化

JetPack 7.2 には **エージェントスキル**が同梱されています:Jetson 開発向けの、
繰り返し可能でエージェントが実行できるワークフローです。NVIDIA によると 3 つの
カテゴリがあります:

| スキルカテゴリ | 自動化される内容 |
|---|---|
| **Jetson Linux のカスタマイズ** | カスタムキャリアボード向けの BSP のビルド/カスタマイズ — I/O 設定、クロック、ファン制御、電力プロファイル |
| **メモリ最適化** | ブートローダーのカーブアウト、カーネルの予約領域、ユーザー空間メモリを監査し、より少ないメモリでより高性能なワークロードを実行できるようにします |
| **モデルのベンチマーク** | デバイスに最適なモデル構成の特定と診断 |

エコシステムにあるその他のエージェントスキル:

- [Jetson デバイス側スキル](https://github.com/jetson-device-skills) · [Jetson BSP スキル](https://github.com/jetson-bsp-skills)
- [DeepStream Coding Agent](https://github.com/DeepStream_Coding_Agent) — エージェント支援によるビジョンパイプライン構築([当社の DeepStream チュートリアル](/ja/tutorials/jetson-agx-orin/deepstream)を参照)
- [Metropolis VSS ブループリントスキル](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization/tree/main/skills) — 動画検索と要約のワークフロー

## AGX Orin キットの実用メモ

- **常時稼働エージェントには専用のコンピュートが必要** — スリープするノート PC
  ではなくキット上で動かす意味はまさにここにあります。電力と熱の設計はそれに
  合わせて計画してください([トラブルシューティング](/ja/tutorials/jetson-agx-orin/troubleshooting)
  の電力モードに関する注記を参照)。
- **メモリの観点ではモデル選択が重要** — Orin 上のローカルモデルは 64GB の範囲で
  問題なく動作しますが、常時稼働エージェントはコンテキストを蓄積します。調整の
  手段については[メモリ効率](/ja/tutorials/jetson-agx-orin/memory-efficiency)、
  オンデバイスでのモデル性能については[ローカル LLM 推論](/ja/tutorials/jetson-agx-orin/local-llm)
  を参照してください。
- **この分野は動きが速い。** 上記のコマンドは現時点の公式な手順として扱い、
  デプロイをスクリプト化する前にリソースハブで更新情報を確認してください。

## 出典

- [NVIDIA テクニカルブログ — JetPack 7.2 のエージェント型 AI(インストールコマンド、エージェントスキル、リリース機能)](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)(2026-09-24 確認)
- [NVIDIA NemoClaw 製品ページ](https://www.nvidia.com/en-us/ai/nemoclaw)(2026-09-24 確認)
- [JetPack 7.2.1 ダウンロードページ](https://developer.nvidia.com/embedded/jetpack/downloads)(2026-09-24 確認)

*ステータス: レビュー済み（2026-10-11）。記載した日付時点の NVIDIA 公式
ドキュメントに基づいています。Juxi Technology による実機検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。このページは
Juxi Technology によって公開されたものであり、NVIDIA の出版物ではありません。
