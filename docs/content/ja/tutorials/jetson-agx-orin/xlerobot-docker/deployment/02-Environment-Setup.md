---
title: 02 · 環境準備
---

# 02 · 環境準備

> **前へ：**[01-Overview](01-Overview.md)
> **次へ：**[03-Deployment](03-Deployment.md)

Docker をインストールし、中国本土向けのネットワークを設定し、ハードウェアを接続します。**このページを終わらせないと、次のページは動きません。**

---

## 1. Docker のインストール

すでにインストール済みの場合はスキップできます。まず確認します：

```bash
docker --version
```

未インストールの場合は：

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

**最後のコマンドを実行したら再ログインが必要です**（ログアウトして再ログイン、または再起動）。そうしないと `docker` コマンドが
権限エラーになります。確認：

```bash
docker run --rm hello-world
```

---

## 2. 中国本土向けミラーアクセラレータの設定 ⚠️ 中国本土のユーザーは必須

**Docker Hub に中国本土から直接接続するとタイムアウトします**。アクセラレータを設定しないと、どのイメージも取得できません。

`/etc/docker/daemon.json` を編集します（なければ新規作成）：

```json
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.1ms.run",
        "https://docker.xuanyuan.me"
    ]
}
```

Docker を再起動します：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

反映を確認します：

```bash
docker info | grep -A4 "Registry Mirrors"
```

> ⚠️ ネット上に出回っているミラーアドレスの多くはすでに無効です（中国科学技術大学、NetEase、`dockerproxy.com`
> はすべてサービス終了済み）。古い記事をそのまま真似しないでください。上記の 3 つは 2026 年 9 月時点の実測で利用可能なものです。

---

## 3. ハードウェアの準備

### 3.1 ロボットの接続

1. SO-101 ロボットアームのサーボを USB アダプタボード経由でパソコンに接続します
2. カメラを USB に接続します（RealSense を使う場合は USB 3.0 ポートに接続）

### 3.2 シリアルポートの権限 ⚠️ 重要

設定しないと、**コンテナ内でデバイスが見えません**：

```bash
sudo usermod -aG dialout $USER
```

**こちらも再ログインで有効になります。**

### 3.3 デバイスが認識されているか確認

```bash
ls /dev/ttyACM* /dev/ttyUSB*    # サーボのシリアルポート
ls /dev/video*                   # カメラ
```

デバイスノードが見えれば、システムが認識しています。

---

## 4. Hugging Face ミラーの設定 ⚠️ 中国本土では必須

**`huggingface.co` は中国本土からは完全に到達できません**。一方、事前学習済みモデルの読み込みには必ず必要です。

コンテナ起動時にこの環境変数を追加します：

```bash
-e HF_ENDPOINT=https://hf-mirror.com
```

`scripts/run.sh` にはすでにデフォルトで設定されています。完全にオフラインの場合は `-e HF_HUB_OFFLINE=1` も追加してください。

---

## チェックリスト

次のページに進む前に、以下の項目がすべてクリアしていることを確認してください：

```bash
docker --version                       # Docker インストール済み
docker info | grep -A4 "Registry Mirrors"   # アクセラレータが有効
groups | grep dialout                  # シリアルポートの権限を設定済み（再ログイン後）
ls /dev/ttyACM*                        # デバイスを認識済み
```

---

> **次へ：**[03-Deployment](03-Deployment.md) —— イメージの取得、コンテナの起動
