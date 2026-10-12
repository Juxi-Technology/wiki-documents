---
title: 01 · 概要
---

# 01 · 概要

> **前へ：**なし、これが最初のページです
> **次へ：**[02-Environment-Setup](02-Environment-Setup.md)

このページでは、**XLeRobot の完全なワークフローとは何か、必要なハードウェアは何か、お使いのマシンで動くかどうか**をはっきり説明します。

---

## ワークフロー

XLeRobot の全体的な流れは 4 ステップです：

```
① ロボットのキャリブレーション  →  ② テレオペレーションによるデータ収集  →  ③ モデルのトレーニング  →  ④ モデルのデプロイと自律動作
   calibrate        record              train           eval / rollout
```

Docker イメージには、この 4 ステップに必要な**ソフトウェア環境**がすべて入っています——Python、PyTorch、
LeRobot、XLeRobot のロボットコード、サーボとカメラのドライバ。もうバージョン競合で悩む必要はありません。

**自分で用意する必要があるのは**：ロボット 1 台（またはまずソフトウェアを動かすだけでも可）、パソコン 1 台、USB ケーブル 1 本だけです。

---

## 対応ハードウェア

| プラットフォーム | 対応状況 |
|---|---|
| **Jetson Orin シリーズ**（JetPack 7.2） | ✅ **現在正式対応しているプラットフォーム**。GPU アクセラレーションが利用可能 |
| Jetson Nano（2019 オリジナル） | ❌ 非対応——演算能力が低すぎます。後述参照 |
| Raspberry Pi / 一般的な Ubuntu / x86 PC | ⏳ **未対応**、後述参照 |
| Windows / macOS | ❌ 非対応（シリアルポートとカメラのパススルーは Linux 上でのみ安定して動作します） |

> 💡 **現在、このイメージは Jetson Orin デバイスのみを対象としています。**
>
> - **Jetson Orin Nano / Orin NX / AGX Orin**：**JetPack 7.2** が必要です
>   （L4T 39.2 / CUDA 13.2）。AGX Orin 64GB も 7.2 で初めて完全対応します。
> - **Jetson Nano（2019 オリジナル）**：❌ 永遠に不可です。Maxwell アーキテクチャ（演算能力 5.3）ですが、
>   CUDA 13 では Maxwell サポートが完全に削除されており、torch も最低 sm_80 を要求します。
> - **Raspberry Pi / x86 PC**：イメージは設計上対応しています（汎用 CPU 版は `python:3.12-slim` ベースで、
>   このベースイメージは公式に amd64 と arm64 の両バージョンが提供されています）が、
>   **現在公開されている CPU 版はまだマルチアーキテクチャになっていません**。
>   取得しても amd64 のみ、または arm64 のみの可能性があります。マルチアーキテクチャビルドができ次第開放します。
>
> メモリは 4 GB 以上を推奨します。Jetson Orin Nano の 3.4 GB でもテレオペレーションは動きますが、
> トレーニングは厳しくなります。

### システム要件

- Ubuntu 20.04 / 22.04 / 24.04、または Debian 12 以降
- Raspberry Pi：64 ビットシステムが必要（`uname -m` が `aarch64` と表示されること）
- カーネルが USB シリアルポートに対応していること（通常は対応しています）

### アーキテクチャの確認

```bash
uname -m
```

- `aarch64` → Raspberry Pi、Jetson（arm64 イメージを使用）
- `x86_64` → 一般的なパソコン（amd64 イメージを使用）

---

## 読むべきフォルダー

| # | フォルダー | 内容 | いつ読むか |
|:---:|---|---|---|
| **1** | [**deployment/**](01-Overview.md)（ここです） | **イメージの取得、イメージの実行** | 初めて使う場合。`01` → `02` → `03` の順に読む |
| **2** | [**xlerobot/**](../xlerobot/01-Operation.md) | **XLeRobot 本体の実行コマンド** | 本体（両腕 + 台車）を持っている場合 |
| **3** | [**lerobot/**](../lerobot/01-Operation.md) | **原版 LeRobot の実行コマンド** | 単腕の SO-101 / SO-100 アームまたは LeKiwi のみの場合 |
| **4** | [**troubleshooting/**](../troubleshooting/01-Troubleshooting.md) | よくある問題と早見表 | 問題が起きたとき |

> ⚠️ **2 番目と 3 番目のフォルダーは二者択一です**——お使いのハードウェアで選んでください：
> - **XLeRobot 本体**（両腕 + 台車）→ `xlerobot/` へ
> - **単腕の SO-101 / SO-100 アーム**、**LeKiwi** → `lerobot/` へ
>
> イメージは同じ環境なので、2 つのルートはいつでも切り替えられ、何もインストールし直す必要はありません。

---

## 最短ルート（まずは動かしてみたい場合）

**Jetson 上（JetPack 7.2）**で、いくつかのコマンドでまずロボットが動くところまで確認し、それから細部を読み返しましょう：

```bash
# 1. Docker をインストール（インストール済みならスキップ）
curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER

# 2. コンテナに GPU チャネルを開く（Jetson 特有、1 回だけで OK）
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml --disable-hook enable-cuda-compat
sudo systemctl restart docker

# 3. イメージを取得（約 3.6 GB）
docker pull chenyang310/xlerobot:jetson

# 4. コンテナを起動
docker run -it --rm --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson

# 5. コンテナ内でテレオペレーションを実行（初回は自動的にキャリブレーションガイドに入る）
python examples/4_xlerobot_teleop_keyboard.py
```

> ⚠️ このショートカットは、**遅かれ早かれ必要になる** 2 つの作業を省略しています。詰まったら該当セクションを見直してください：
> - **中国本土向けミラーアクセラレータ**（ステップ 3 で止まる可能性があります）→ [02-Environment-Setup §2](02-Environment-Setup.md)
> - **`--disable-hook enable-cuda-compat` は省略できません**（このフックは
>   JetPack 7.2 でバグがあり、コンテナが起動しなくなります）→ [03-Deployment §4](03-Deployment.md)
>
> 上記のステップ 5 で実行するのは **XLeRobot 本体**のサンプルです。単腕の SO-101 アームしかない場合は、
> `lerobot-*` コマンドラインに切り替えてください。詳しくは [lerobot/](../lerobot/01-Operation.md) を参照。

---

> **次へ：**[02-Environment-Setup](02-Environment-Setup.md) —— Docker のインストール、中国本土向けアクセラレータの設定、ハードウェアの接続
