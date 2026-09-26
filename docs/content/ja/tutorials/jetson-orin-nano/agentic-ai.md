---
title: エージェント型 AI — 8GB Orin Nano 上の NemoClaw
sidebar_label: エージェント型 AI(NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  常時稼働のエージェントスタック NVIDIA NemoClaw を 8GB の Jetson Orin Nano
  Super 開発キットにインストールして実行 — 公式のインストール、8GB に対する
  正直な見込み、セキュリティ上の注意。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/nemoclaw/
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# エージェント型 AI — 8GB Orin Nano 上の NemoClaw

お使いのキットは、常時稼働の自律エージェントである NVIDIA NemoClaw を、コマンド 1 つでインストールして実行できます。本ページでは、NemoClaw とは何か、公式のインストール、周辺のエージェントスキル、8GB に対する正直な見込み、そして必要となるセキュリティ上の判断を扱います。

## NemoClaw とは

NVIDIA によると、NemoClaw は「自律エージェントを構築するためのオープンなブループリントの集合」です — 現実のワークフローを横断して推論し、計画し、行動する常時稼働の AI システムです。エージェントハーネス(OpenClaw、Hermes、LangChain Deep Agents)と、NVIDIA Agent Toolkit のコンポーネント(Nemotron モデル、NeMo、OpenShell のランタイムポリシー制御)をまとめたものです。

OpenShell はセキュリティ層です:「エージェントがアクセスできるもの — ファイル、ネットワーク、認証情報、ツール — を強制する、内部のセキュアなランタイム」です。

NemoClaw はアルファ版ソフトウェアです — NVIDIA は「Early preview」と位置づけています(2026-03-16 以降)。製品ページ:<https://www.nvidia.com/en-us/ai/nemoclaw> · Build-a-Claw ハブ:<https://www.nvidia.com/en-us/ai/build-a-claw/>

## インストール — 公式のコマンド 1 つ

キット上で NVIDIA のインストーラーを実行します:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

これにより、デフォルトのハーネスである **OpenClaw** がインストールされます。ほかの 2 つは環境変数で選択できます:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=hermes bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=langchain-deepagents-code bash
```

このキットでは、インストーラーが Jetson(Orin と Thor)を自動検出し、まず JetPack のホスト構成を適用します。L4T 39.x では `br_netfilter` モジュールが存在しない場合にのみロードします(これがないと、サンドボックスで DNS 解決が失敗し、オンボーディングが「Setting up OpenClaw inside sandbox」で止まります)。Ollama を選択すると、インストーラーは Ollama もインストールします:「このスクリプトは(ollama が選択されていれば)ollama もインストールするので、事前に手動でインストールする必要はありません」(NVIDIA スタッフ)。NVIDIA のサイトはこのデバイスを次のように説明しています:「Install OpenClaw on Your NVIDIA Jetson Orin Nano」—「Jetson 上の完全にローカルな AI パーソナルアシスタント…クラウド API は不要です」。

> **重要** — NemoClaw のプラットフォームサポートマトリクス(v1.1、2026-09-04)に Jetson の行はありません。テスト済みプラットフォームは Linux(Ubuntu 24.04)と DGX OS Spark です。Orin Nano のサポートは実際には機能します — インストーラーがボードを検出し、NVIDIA がそのフローをドキュメント化しています — ただし正式サポートとして公開されているわけではないため、粗い部分を想定してください。

ここで重要な要件(NVIDIA の NemoClaw 前提条件ページより):

| 要件 | 最小 / 推奨 | このキットでは |
|---|---|---|
| RAM | 8 GB / 16 GB | 合計 8GB — 最小値ちょうど |
| 空きディスク | 20 GB | 内蔵ストレージなし。microSD か NVMe を使用([クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)) |
| Node.js / npm | 22.19+ / 10+ | 別途インストール |
| コンテナランタイム | Docker Engine / Desktop / Colima | ソケットの修正:`sudo usermod -aG docker $USER` の後、`newgrp docker` |

## インストール後 — 最初のセッション

NVIDIA スタッフは Orin でのフローについて、[Jetson AI Lab のウォークスルー](https://www.jetson-ai-lab.com/tutorials/nemoclaw/)(ベンダーガイド)を参照先として挙げています:

1. `curl -fsSL https://ollama.com/install.sh | sh` — または省略可。NemoClaw のインストーラーが Ollama もインストールできます。
2. Nemotron3 Nano 4B など、4B クラスのツール呼び出しモデルを取得します(ガイドの `nemotron-3-nano:30b` の例はより大きなデバイス向けです)。
3. `curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash`
4. オンボーディング:モデルソースとして Ollama を選択し、機能する範囲で最も厳しいサンドボックスポリシーティアを選びます。
5. `source ~/.bashrc` の後、`nemoclaw my-assistant connect`。エージェントは `openclaw tui` で起動します。

## エージェントスキル

NVIDIA は **エージェントスキル**も提供しています — オープンな Agent Skills 形式のパッケージ化されたワークフローで、AI コーディングアシスタント(Claude Code、Cursor、Codex)にデバイス固有の自動化を追加するものです。この時代にドキュメント化されている領域は 2 つです:

- **フィジカル AI(ロボティクス)。** Isaac ROS はエージェントスキルのカタログを提供しています — NVIDIA によれば、Isaac ROS 開発コンテナの起動や Mission Control クラウドスタックの立ち上げなどのタスクです。カタログは <https://github.com/nvidia/skills>(「Physical AI」カテゴリ)にあり、`npx` でインストールします(Node.js は標準の Isaac ROS 環境には含まれません)。Isaac ROS 5.0 では `isaac-ros-activate` CLI と、早期アクセスの `migrate-node-to-rosidl-buffer` スキルが追加されています。[ロボティクス](/ja/tutorials/jetson-orin-nano/robotics)を参照。
- **ビデオパイプライン。** L4T r39.2.1 のリリースノートは、「ビデオパイプライン向けエージェントスキル」を新機能の 1 つとして挙げています。

正直に言うべきギャップが 1 つあります:本ページの情報源がドキュメント化している NVIDIA エージェントスキルは Isaac ROS(フィジカル AI)向けとビデオパイプライン向けであり、NemoClaw 固有のスキルカタログをドキュメント化したものはありません。

## 8GB に対する現実的な期待

常時稼働のエージェント、ローカルモデル、そして Ubuntu デスクトップは、このキット上では同時に余裕をもって収まりません。ドキュメント化された予算:

- **使用可能なメモリは 8GB ではなく約 7.6 GB です。** NVIDIA 曰く:「8GB の物理 DRAM のうち、ファームウェアとカーネルの予約領域を除いておよそ 7.6 GB が使用可能です」。
- **8GB は NemoClaw の下限であり、快適圏ではありません。** 前提条件では 8GB が最小、16GB が推奨とされています:「RAM が 8GB 未満のマシンでは、この合計使用量が OOM killer を引き起こすことがあります。メモリを追加できない場合は、少なくとも 8GB のスワップを構成して、パフォーマンス低下と引き換えに問題を回避してください」。このキットのメモリは固定です — スワップファイルを計画してください([メモリ効率](/ja/tutorials/jetson-orin-nano/memory-efficiency))。約 2.4 GB のサンドボックスイメージのプッシュは、8GB の Orin Nano で既に OOM を引き起こしています。
- **モデルがロードされる前に、エージェントとデスクトップがメモリを消費します。** NVIDIA フォーラムのコミュニティガイドは OpenClaw ランタイムを最大約 1 GB としています。グラフィカルデスクトップを無効化すると最大約 865 MB が解放され(NVIDIA の数値)、コミュニティの計測では GNOME が 600 MB 超です。
- **モデルが大きすぎる場合の失敗は、NVIDIA フォーラムのコミュニティ報告でドキュメント化されています。** 8GB ボード上の Ollama は 7.4 GB のモデルと 16 GB のモデルのロードに失敗しました:`cudaMalloc failed: out of memory ... failed to allocate buffer for kv cache`。ファイルサイズだけでは収まるかどうかの判断になりません — KV キャッシュも同じ 8GB に収まる必要があります。

情報源による「収まるもの」:NVIDIA が検証済みの Ollama デフォルト(`qwen3.6:35b`、`nemotron-3-nano:30b`、`qwen3.5:9b`)はより大きなマシン向けのサイズです。Jetson AI Lab のガイドは 4B クラスのツール呼び出しモデルから始めるよう述べています — 「動作はしますが、30B クラスのモデルより弱いパフォーマンスは覚悟してください」。また NVIDIA のメモリブログは、チューニング済みの 4 ビットでの範囲を LLM 約 10B まで、VLM 約 4B パラメータまでとしています — これは専用構成での上限であり、デスクトップとエージェントも同時に抱えられる予算ではありません。

NVIDIA はこのデバイス上の Ollama について tokens/sec の数値を公開していません。外部の速度の主張は慎重に扱ってください([ローカル LLM 推論](/ja/tutorials/jetson-orin-nano/local-llm)を参照)。

> **Juxi の補足:** ここで実用的な常時稼働構成を組むなら、ヘッドレスモード、4B クラスの量子化モデル、そして 20GB の要件とスワップファイルのための
> NVMe ストレージを計画してください。これは情報源が支持する範囲と一致します。それより大きいものは未検証です。

## Ollama とエージェントに関するメモ — NVIDIA スタッフ確認済み

NVIDIA スタッフは Orin Nano + JetPack 7.2 + Ollama のフローを開発者フォーラムでデバッグし、2026 年 9 月に JetPack 7.2.1 上の Ollama を再検証しています。

- **まず GPU を確認してください。** `ollama ps` は PROCESSOR 列に `100% GPU` を示すはずです。CPU と表示される場合、エージェントは非常に遅くなります。
- **ドキュメント化された失敗(2026 年 6 月)。** 書き込み直後の JetPack 7.2 の Orin Nano で NemoClaw + Ollama を使うと、`openclaw tui` は開いても応答しませんでした(「Autocompaction could not recover this turn」)。NVIDIA が再現しました:Ollama が GPU 検出をスキップしており(CPU フォールバック)、サンドボックスのコンテキストウィンドウはわずか 4096 トークンでした。スタッフによる修正は、次の行を `/etc/systemd/system/ollama.service.d/override.conf` に書き込むものでした:

  ```ini
  Environment="OLLAMA_HOST=127.0.0.1:11434"
  Environment="OLLAMA_CONTEXT_LENGTH=32768"
  Environment="OLLAMA_IGPU_ENABLE=1"
  Environment="GGML_BACKEND_PATH=/usr/local/lib/ollama/cuda_v13/libggml-cuda.so"
  Environment="LD_LIBRARY_PATH=/usr/local/lib/ollama:/usr/local/lib/ollama/cuda_v13"
  ```

  その後 `sudo systemctl daemon-reload && sudo systemctl restart ollama` を実行します。サンドボックス内(`nemoclaw my-assistant connect`)では、`.openclaw/openclaw.json` の `contextWindow` を 32768 に引き上げ、設定のハッシュを更新しました。報告者は、その後 Ollama が GPU 上で動作することを確認しています。
- **現在の状況:この回避策は不要なはずです。** 2026 年半ばのスタッフ発言:「この問題は最新の ollama リリースで修正されています。回避策(override.conf)はもはや必要ありません」。JetPack 7.2.1 では上流のインストーラーが動作し、`ollama ps` は 100% GPU を報告します。「WARNING: Unsupported JetPack version detected」の行は無害です。まず標準インストールを試してください。
- **それでも Ollama が CPU にフォールバックする場合:** まず Ollama を更新してください。あるフォーラムユーザーは、古い `/usr/local/lib/ollama/cuda_v12` ディレクトリを削除することで、しつこいフォールバックを解消しました(スタッフが削除を確認)。override.conf は最後の手段のフォールバックとして残してください — これは NVIDIA がまさにこのキットで成功裏に使用したものです。

## 常時稼働エージェントのセキュリティ

常時稼働のエージェントは、認証情報とツールへのアクセスを持つプログラムであり、あなたが見ていない間も動作し続けます。あなたのデータを保持するデバイス上では、これは現実のリスクです:ここでのツールとシェルへのアクセスを持つエージェントは、到達できるものなら何でも読み、変更し、送信できます。

**ポリシー層を使用してください。** NVIDIA は OpenShell を「エージェントがアクセスできるもの — ファイル、ネットワーク、認証情報、ツール — を強制する、内部のセキュアなランタイム」と説明しています。オンボーディングでは、役割を果たせる範囲で最も厳しいサンドボックスポリシーティアを選んでください(Jetson AI Lab のウォークスルーも最も厳しいティアを勧めています)。

**認証情報。** エージェントにはスコープ付きで失効可能な認証情報 — 専用のキーとアカウント — を与え、個人のものは決して使わないでください。エージェントが読めるものはコピーでき、使えるものは騙されて使わされる可能性があります。メッセージング連携はあなたの身元で動作します:NVIDIA の Orin Nano ページには OpenClaw + WhatsApp の例があるため、専用のアカウントまたは番号を使用してください。

**ネットワーク露出。** ローカルサービスは localhost に留めてください — ここでの NVIDIA スタッフによる Ollama の構成は `127.0.0.1` にバインドしています(`OLLAMA_HOST=127.0.0.1:11434`)。エージェントのダッシュボード、制御 API、モデルサーバーをオープンなインターネットに公開しないでください。リモートアクセスには、自分で管理するトンネルまたは VPN を使用してください。インストールには Docker(Engine/Desktop/Colima、上記の要件参照)と、サンドボックス化されたコンテナクラスター(OpenShell ゲートウェイは内部で k3s を実行します)、および sudo アクセスが必要です。

**運用習慣。** まずは監督下で始めてください — 無人で放置する前に、エージェントが何をするか観察します。失効や取り消しができないアクセスを与えないでください。バックアップと復旧手段を維持してください([書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)を参照)。NemoClaw はアルファ版ソフトウェア(「Early preview」)です。サンドボックスは複数ある層の 1 つとして扱い、唯一の層とはしないでください。

> **注意** — このスタックはローカルで動作するため(「クラウド API は不要」)、セキュリティ境界はあなたのデバイス、ネットワーク、認証情報です。エージェントを動かし続ける前に、この 3 つすべてを見直してください。

## 出典

- [NVIDIA NemoClaw 製品ページ](https://www.nvidia.com/en-us/ai/nemoclaw)(2026-09-26 確認)— 定義、ハーネス、インストールコマンド、OpenShell。
- [NVIDIA Build-a-Claw リソースハブ](https://www.nvidia.com/en-us/ai/build-a-claw/)(2026-09-26 確認)— Orin Nano のインストールセクション。
- [NemoClaw — 前提条件](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md)および[プラットフォームサポート](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md)(2026-09-26 確認)
- [NemoClaw — トラブルシューティング(Jetson ホスト構成)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx)(2026-09-26 確認)
- [NVIDIA 開発者フォーラム — JetPack 7.2 搭載 Jetson Orin Super 上の NemoClaw(NVIDIA スタッフによる修正)](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)(2026-09-26 確認)
- [NVIDIA 開発者フォーラム — Jetson 上の Ollama(スタッフ検証済み)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)と [JetPack 7.2 の GPU アクセラレーション](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)(2026-09-26 確認)
- [NVIDIA テクニカルブログ — NVIDIA Jetson におけるメモリ効率の最大化](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)(2026-09-26 確認)
- [NVIDIA 開発者フォーラム — Orin Nano Super 8GB で動作する AI モデル(コミュニティガイド)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412)(2026-09-26 確認)
- [Jetson AI Lab — NemoClaw チュートリアル(ベンダーガイド)](https://www.jetson-ai-lab.com/tutorials/nemoclaw/)(2026-09-26 確認)
- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html)と[リリースノート](https://nvidia-isaac-ros.github.io/releases/index.html)(2026-09-26 確認)
- [Jetson Linux r39.2.1 リリースノート(PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)(2026-09-26 確認)— 「ビデオパイプライン向けエージェントスキル」の新機能項目。

*ステータス:ドラフト、cheny によるレビュー待ち。記載した日付時点の NVIDIA 公式ドキュメント、NVIDIA 開発者フォーラムの投稿、Jetson AI Lab のベンダーガイドに基づいています。Juxi Technology による実機検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
