---
title: 貢献ガイド
description: "Juxi Technology Wiki への貢献ガイド。Fork からプルリクエストまでの流れ、コンテンツ規範、行動規範を解説します。"
---

# 貢献ガイド

Juxi Technology Wiki へ貢献をご検討いただきありがとうございます！本ドキュメントが貢献フローを案内します。

## 準備

1. [wiki-documents リポジトリ](https://github.com/Juxi-Technology/wiki-documents) を **Fork**
2. Fork をローカルにクローン
3. 依存関係のインストール：

```bash
cd wiki-documents
npm ci
```

4. ローカル開発サーバーを起動してプレビュー：

```bash
npm run docs:dev
```

ブラウザで `http://localhost:5173` にアクセスすると変更をプレビューできます。

## 貢献方法

### ドキュメントの誤りを修正

誤字、リンク切れ、古い情報を見つけましたか？ `main` ブランチに直接 Pull Request を送ってください。

### 新規チュートリアルの追加

Juxi Technology製品のチュートリアルを共有したい場合：

1. まず [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues) に Proposal を投稿し、チュートリアルのテーマと概要を説明
2. メンテナーが確認したら、既存のチュートリアル構成に沿って執筆
3. PR を提出

### 翻訳への貢献

プロジェクトは11言語をサポートしています。翻訳は以下のルールに従います：

- 各 `.md` ファイルは各言語ディレクトリに対応ファイルが必要
- 画像は `docs/public/images/` のリソースを共用
- 各言語バージョンのリンクは対応する言語パスを指すこと

## コンテンツ規範

### 画像

- 保存場所：`docs/public/images/tutorials/{製品名}/{チュートリアル名}/`
- 命名規則：連番または説明的な名前（例：`1.png`、`wiring-diagram.png`）
- チュートリアルでは相対パスで参照：

```markdown
![説明](../../../public/images/tutorials/xxx/xxx.png)
```

### ファイル命名

- チュートリアルファイルは英語の kebab-case で命名
- 各 `.md` ファイルに `title` と `description` の frontmatter が必要

### コードブロック

- 言語タイプを必ず指定
- コマンドが正しく実行できることを確認

## PR フロー

1. ローカルビルドが成功することを確認：`npm run docs:build`
2. Pull Request テンプレートの全項目を記入
3. CI ビルド成功後、少なくとも1人のメンテナーの承認でマージ
4. PR マージ後、GitHub Actions が自動デプロイ

## 行動規範

- すべての貢献者とユーザーを尊重
- 客観的で正確な技術コンテンツを提供
- 未テストのコードやコマンドを提出しない

ご貢献ありがとうございます！🎉
