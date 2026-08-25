---
title: ソフトウェア設定
description: "製品のソフトウェア設定方法を説明します。"
---

# ソフトウェア設定

製品のソフトウェア設定方法を説明します。

## システム要件

- Node.js 18+
- Python 3.10+
- Git

## インストール手順

```bash
# リポジトリのクローン
git clone https://github.com/Juxi-Technology/lerobot.git

# ディレクトリへ移動
cd lerobot

# 依存関係のインストール
pip install -e ".[feetech]"
```

## 設定ファイル

必要に応じて `config.json` を編集します:

```json
{
  "port": 3000,
  "language": "ja"
}
```