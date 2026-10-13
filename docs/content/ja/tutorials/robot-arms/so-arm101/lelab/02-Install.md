---
title: "2 · インストールと起動"
description: "LeLab のインストールと起動:uv のワンライナーまたはソースからのインストール(どちらも LeRobot を一緒に導入)。ブラウザーで localhost:8000 を開きます。"
---

# 2 · インストールと起動

> **前へ:** [01 概要](01-Overview.md)
> **次へ:** [03 接続とキャリブレーション](03-Calibration.md)

どちらの方法も LeRobot を一緒にインストールします——LeLab がそれを必要とするためです。

---

## 方法 A · ワンライナー

[uv](https://docs.astral.sh/uv/) が必要です。分離された環境にインストールします：

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git && lelab
```

ブラウザが `http://localhost:8000/` で開きます。

## 方法 B · ソースから

```bash
git clone https://github.com/Juxi-Technology/leLab.git
cd leLab
pip install -e .
```

`pip install -e .` は React フロントエンドをビルドして Python パッケージに同梱するので、1 つのプロセスが API と UI の両方を提供します。初回のインストールは数分かかります。

ビルドが Node.js を見つけられない場合は、**Node.js 22** をインストールして再試行してください。Node が必要なのはインストール時と開発モードのみで、その後に LeLab を実行するためではありません。

> **代わりに上流のコードを使いたいですか？** このリポジトリはコピーです。Hugging Face の LeRobot チームが保守するオリジナルは <https://github.com/huggingface/leLab> です。ここにある内容はすべてそのまま当てはまります。

---

## 起動

```bash
lelab
```

**<http://localhost:8000/>** で UI を提供し、ブラウザを開きます。

| フラグ | 動作 |
|---|---|
| `lelab` | 本番モード。1 つのプロセスが `:8000` で API とビルド済み UI を提供 |
| `lelab --dev` | `:8080` で Vite ホットリロード、`:8000` で uvicorn `--reload`。Node.js 22 が必要 |
| `lelab --rebuild` | ローカルのソースからフロントエンドを再ビルドし、本番モードで起動 |
| `lelab --no-open` | ブラウザを開かずに起動 |
| `lelab --stop` | 実行中の LeLab を停止し、ポート 8000 と 8080 を解放 |

`Ctrl+C` で停止するか、別のターミナルから：

```bash
lelab --stop
```

ページが読み込まれなくなったら `--stop` を使ってください。ポート 8000 か 8080 を握った古いプロセスがよくある原因です。

---

## 動作確認

<http://localhost:8000/> を開きます。ランディングページには **Calibration**、**Teleoperation**、**Recording**、**Datasets**、**Training**、**Inference** のタブがあります。

ターミナルから：

```bash
curl http://localhost:8000/health
```

JSON のステータスを返します。

---

## 開発モード

```bash
lelab --dev
```

`:8080` で Vite、`:8000` で自動リロード付きの API。`frontend/src/` 下の編集は再起動なしでページに反映され、`lelab/` 下の編集はサーバをリロードします。

**`--dev` モードでは `:8000` ではなく `:8080` を開いてください。** ポート 8000 では UI なしの API しか得られません。

---

## 更新

LeLab はインストール元のブランチが更新されたかを確認し、UI で更新を提案します。手動で更新するには：

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git --force
```

編集可能インストール（`pip install -e .`）はこのチェックの対象外です。`git pull` で更新してください。

---

> **次へ:** [03 接続とキャリブレーション](03-Calibration.md)

<RelatedProducts slugs="so-arm101" />
