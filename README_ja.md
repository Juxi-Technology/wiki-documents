# <img src="docs/public/images/logos/logo-black.png" width="80" align="left" style="margin-right: 16px;"> Juxi Technology Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)
[![9 Languages](https://img.shields.io/badge/languages-11%20locales-10b981)](https://wiki.juxitech.com/)
[![llms.txt](https://img.shields.io/badge/LLM%20ready-llms.txt-634b8f)](https://wiki.juxitech.com/llms.txt)
[![VitePress](https://img.shields.io/badge/VitePress-1.x-646cff)](https://vitepress.dev/)

鉅犀科技(Juxi Technology)のロボティクスと AI ハードウェア製品のオープン文書プラットフォーム。ロボットアーム、センサー、アクセサリー、開発者ガイドまで網羅します。

🌐 **[wiki.juxitech.com](https://wiki.juxitech.com/)**

**11 言語対応**:English(デフォルト、プレフィックスなし)、简体中文(`/zh-hans/`)、繁體中文(`/zh-hant/`)、日本語(`/ja/`)、한국어(`/ko/`)、Deutsch(`/de/`)、Français(`/fr/`)、Español(`/es/`)、Italiano(`/it/`)、Português (Brasil)(`/pt-br/`)、Português (Portugal)(`/pt-pt/`)。

## リポジトリ構成

```
docs/
├── content/                  # コンテンツソース(ビルド時に検証)
│   ├── tutorials/  topics/  tech/  cases/  community/   # 英語(root、プレフィックスなし)
│   ├── products/  downloads/  about/
│   ├── zh-hans/  zh-hant/    # 中国語ロケール、英語と同じ構造
│   └── ja/  ko/  de/  fr/  es/  it/                     # 残り 6 言語
├── .vitepress/
│   ├── config.ts             # 全言語設定:nav / sidebar / SEO(hreflang、JSON-LD)
│   ├── search.data.ts        # サイト内検索インデックス(タイトル + 本文)
│   └── theme/                # カスタムテーマ(レイアウト、検索、言語切替、フッターなど)
└── public/                   # 静的アセット(画像、llms.txt、robots.txt)
```

## ローカル開発

```bash
npm ci
npm run docs:dev      # http://localhost:5173
```

## ビルドとチェック

```bash
npm run check:links   # sidebar/本文内リンクを検証(CI でも実行)
npm run docs:build    # 本番ビルド → docs/.vitepress/dist
npm run docs:preview  # 本番ビルドのプレビュー
npm run gen:llms     # llms-full.txt を再生成(CI ビルド時に自動実行)
```

## デプロイ

`.github/workflows/deploy.yml` により **GitHub Pages** の `wiki.juxitech.com` に公開:

- **トリガー**:`main` への push(または手動 `workflow_dispatch`);OIDC でビルド+デプロイ(`actions/deploy-pages`)
- **ドメイン**:カスタムドメインは `docs/public/CNAME` で宣言;**DNS**:`wiki.juxitech.com` CNAME → `<user>.github.io` → リポジトリで GitHub Pages を有効化
- **CI チェック**:ビルド前に `check:links`(リンク切れ防止)と `gen:llms`(`llms-full.txt` 再生成)を実行
- **完全な git 履歴が必要**:workflow は `fetch-depth: 0` を使用。ホームの「最終更新」日付は実際のコミット日時

## コントリビュート

[コントリビューションガイド](https://wiki.juxitech.com/ja/community/contributing)と [Pull Request テンプレート](.github/PULL_REQUEST_TEMPLATE.md)を参照。

## 技術スタック

- [VitePress](https://vitepress.dev/) — 静的サイトジェネレーター
- [GitHub Pages](https://pages.github.com/) — ホスティング
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## お問い合わせ

- 🌐 [juxitech.com](https://www.juxitech.com/ja)
- 🐙 [GitHub 組織](https://github.com/Juxi-Technology/)
- 🧠 [Hugging Face](https://huggingface.co/Juxi-Technology)
- 🛒 [JuxiTech Taobao](https://juxitechnology.taobao.com/)
- 📧 [support@juxitech.com](mailto:support@juxitech.com)
- 📧 [sales@juxitech.com](mailto:sales@juxitech.com)

[English](README.md) | [简体中文](README_zh.md) | [繁體中文](README_zh-HK.md) | [한국어](README_ko.md) | [Deutsch](README_de.md) | [Français](README_fr.md) | [Español](README_es.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-BR.md) | [Português (Portugal)](README_pt-PT.md)