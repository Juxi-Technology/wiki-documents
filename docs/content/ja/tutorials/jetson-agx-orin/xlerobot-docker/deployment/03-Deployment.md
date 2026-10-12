---
title: 03 · デプロイ
---

# 03 · デプロイ

> **前へ：**[02-Environment-Setup](02-Environment-Setup.md)
> **次はどちらかのルートを選ぶ**：[xlerobot/](../xlerobot/01-Operation.md)（本体）
> または [lerobot/](../lerobot/01-Operation.md)（単腕 / LeKiwi）

イメージをローカルマシンに取得し、コンテナを起動します。このページが終われば、すべての環境が整ったシェルに入れます。

---

## 1. イメージの取得

### 方法 A：直接取得（推奨）

```bash
docker pull chenyang310/xlerobot:cpu-slim
```

`cpu-slim` はスリム版（約 660 MB のダウンロード量）で、テレオペレーション、キャリブレーション、データ記録に必要なものがすべて含まれています。

フル版（可視化、トレーニング、Diffusion ポリシーを含む）が必要な場合：

```bash
docker pull chenyang310/xlerobot:cpu
```

### 方法 B：自分でビルド

改修が必要な場合や、最新のソースコードを使いたい場合に適しています。

```bash
git clone <このリポジトリのURL> xlerobot-docker
cd xlerobot-docker

# 汎用 CPU 版
bash scripts/build.sh cpu

# Jetson GPU 版（Jetson 上で実行）
bash scripts/build.sh jetson
```

ビルドスクリプトには中国本土向けのミラー（Alibaba Cloud PyPI、Alibaba Cloud Ubuntu リポジトリ）があらかじめ設定されています。
**追加設定なしで、中国本土のネットワーク環境でもビルドできます**。

> 初回ビルドでは約 2 GB の依存関係をダウンロードするため、低速なネットワークでは 1〜2 時間かかります。
> `scripts/sync.sh` とボード上の `wheels/` キャッシュを使えば、ダウンロード済みのパッケージを再利用できます。

---

## 2. 各バージョンの違い

| イメージ | サイズ | 含まれるもの | 用途 |
|---|---|---|---|
| `cpu-slim` | 約 660 MB | テレオペレーション、キャリブレーション、ACT ポリシー推論 | ロボットを動かすだけ |
| `cpu` | 約 1 GB | 上記 + 可視化、データ記録、トレーニング、Diffusion | フルワークフローを実施する場合 |
| `jetson` | 約 3.6 GB | CPU 版 + **CUDA アクセラレーション** | Jetson、GPU 推論が必要な場合 |

---

## 3. コンテナの起動

### 3.1 スクリプトで起動（推奨）

リポジトリをクローン済みの場合：

```bash
# 汎用版
bash scripts/run.sh cpu

# Jetson 版（GPU パラメータが自動で追加される）
bash scripts/run.sh jetson
```

スクリプトには以下がすでに設定されています：

- **デバイスパススルー** —— シリアルポート、カメラ、USB
- **ネットワーク** —— `--network host`。VR テレオペレーションと web 制御に必要
- **ソースコードのマウント** —— コードを変更してもイメージの再ビルドが不要
- **キャッシュのマウント** —— キャリブレーションファイルとモデルのダウンロードが保持されます

### 3.2 手動で起動

スクリプトを使わない場合の、最小構成のコマンド：

```bash
docker run -it --rm \
  --privileged \
  --network host \
  -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=$DISPLAY \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:cpu-slim
```

**各パラメータの役割：**

| パラメータ | 必要な理由 |
|---|---|
| `--privileged` + `-v /dev:/dev` | シリアルポート（SO-101 サーボ）、カメラ、USB のパススルー |
| `--network host` | host/client の 2 プロセス間通信（ZMQ）、および VR 制御 |
| `-v ~/.cache/huggingface` | **キャリブレーションファイル**とモデルキャッシュ。マウントしないと、コンテナを開き直すたびに再キャリブレーションが必要になります |
| `-v /tmp/.X11-unix` + `-e DISPLAY` | 可視化を実行する場合に使用（rerun のウィンドウ表示） |
| `-e HF_ENDPOINT` | `huggingface.co` は中国本土から完全に到達できないため、ミラー経由が必須 |

中に入ると bash が起動し、作業ディレクトリは `/opt/xlerobot` です。

---

## 4. Jetson の GPU パラメータ ⚠️ 他プラットフォームと異なります

Jetson 版では GPU を渡すために CDI を**必ず**使用します。**`--runtime nvidia` は使用できません**：

```bash
docker run -it --rm \
  --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  ... \
  chenyang310/xlerobot:jetson
```

初回使用の前に、**ホストマシン**上で CDI 仕様を生成する必要があります：

```bash
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
sudo systemctl restart docker
```

> **ハマりどころ**：JetPack 7.2 では `nvidia-container-toolkit 1.19.1` の
> `enable-cuda-compat` フックがクラッシュし（`slice bounds out of range`）、
> コンテナがまったく起動しなくなります。パラメータを追加して無効化すれば解決します：
> ```bash
> sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml \
>   --disable-hook enable-cuda-compat
> ```
> コンテナの CUDA バージョンとホストマシンが一致している場合、このフックは不要です。

### GPU が利用可能か確認

```bash
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

---

## 5. プラットフォーム別

### Jetson Orin シリーズ —— ✅ 現在正式対応

| モデル | 必要なもの | 説明 |
|---|---|---|
| **Orin Nano** | JetPack **7.2** | 私たちが実測したボード（3.4 GB メモリでもテレオペレーションは動作） |
| **Orin NX** | JetPack **7.2** | 同上 |
| **AGX Orin / AGX Orin 64GB** | JetPack **7.2** | ⚠️ 7.0 / 7.1 は AGX Orin 64GB に**非対応**。必ず 7.2 |

**唯一の必須要件は JetPack のバージョンです**：イメージ内の torch は CUDA 13.0 でコンパイルされており、
CUDA 13.x はドライバー **580 以上**を要求します。

| JetPack | L4T | CUDA | ドライバー | 使用可能か |
|---|---|---|---|---|
| 6.2 | 36.4.3 | 12.6 | 540.4.0 | ❌ ドライバーが古すぎる |
| **7.2** | 39.2 | 13.2 | 595 系 | ✅ |

お使いのバージョンを確認：

```bash
cat /etc/nv_tegra_release
dpkg -l | grep nvidia-jetpack
```

> ⚠️ JetPack 6.x から 7.x へのアップグレードは **`apt upgrade` / OTA ではできません**（OTA は同一
> L4T メジャーバージョン内でのみ利用可能です）。ボード全体の再フラッシュが必要です。

### Jetson Nano（2019 オリジナル）—— ❌ 永遠に非対応

3 つの独立した理由があり、いずれも解決の余地がありません：

1. **CUDA 13 が Maxwell アーキテクチャを完全に削除しました**。ドライバー R580 が
   Maxwell / Pascal / Volta を最後にサポートするブランチであり、CUDA 13 が要求するのはまさに 580 以上です。
   Jetson Nano は最高でも JetPack 4.6.6 / CUDA 10.2 に留まるしかありません。
2. **演算能力 5.3 は torch のサポート下限を下回ります**。このイメージ内の torch がコンパイルされたアーキテクチャは
   `sm_80 / sm_90 / sm_100 / sm_110 / sm_120`——最低が sm_80 で、
   Jetson Nano は sm_53 のため、ネイティブカーネルがなく、PTX による即時コンパイルも適用できません。
3. **プラットフォームは EOL 済み**（JetPack 4 は 2024 年 11 月にサポート終了）。

### Raspberry Pi / 一般的な Ubuntu / x86 PC —— ⏳ 未対応

イメージは**設計上**対応しています——汎用 CPU 版は `python:3.12-slim` ベースで、
このベースイメージは公式に amd64 と arm64 の両バージョンが提供されています。

しかし**現在公開されている CPU 版はまだマルチアーキテクチャになっていません**（ビルドスクリプトは通常の
`docker build` で、生成されるのはビルドマシンのアーキテクチャのみです）。そのため、現在取得しても
amd64 のみ、または arm64 のみの可能性があり、もう一方のプラットフォームでは使用できません。

マルチアーキテクチャビルド（`docker buildx build --platform linux/amd64,linux/arm64`）を
行ってからこの部分を開放します。それまでは**Jetson Orin 上でのみ使用してください**。

> 自分のイメージが使えるか分からない場合：<code v-pre>docker image inspect &lt;イメージ&gt; --format '{{.Architecture}}'</code> で、
> `uname -m` と照合してください。

---

## コンテナに入った後

まずセルフチェックを実行します：

```bash
python -c "import torch, lerobot; print('torch', torch.__version__); print('lerobot', lerobot.__version__)"
```

期待される出力：

```
torch 2.11.0+cu130     ← Jetson 版。CPU 版は +cpu と表示
lerobot 0.6.2
```

> ⚠️ **`xlerobot` と `xlerobot_mecanum` は同一プロセス内に共存できません**——両者はソースコード内で
> どちらも `"xlerobot"` として登録されるためです（XLeRobot 上流のバグ）。
> `Cannot register ... as xlerobot because ... already registered` が報告されます。
>
> それ以外の組み合わせは問題ありません：**原版 LeRobot のロボットと XLeRobot は同一プロセス内で共存できます**
> （実測で 8 つのタイプが同時に登録成功）。`xlerobot_2wheels` も競合しません。
> 1 台のロボットには 1 つのバリアントしか使用しないため、通常の使用には影響しません。

---

> **次はどちらかのルートを選ぶ**：[xlerobot/](../xlerobot/01-Operation.md) 本体 ·
> [lerobot/](../lerobot/01-Operation.md) 単腕 / LeKiwi
