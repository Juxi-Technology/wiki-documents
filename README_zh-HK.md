# <img src="docs/public/images/logos/logo-black.png" width="80" align="left" style="margin-right: 16px;"> 鉅犀科技 Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)
[![11 Languages](https://img.shields.io/badge/languages-11%20locales-10b981)](https://wiki.juxitech.com/)
[![llms.txt](https://img.shields.io/badge/LLM%20ready-llms.txt-634b8f)](https://wiki.juxitech.com/llms.txt)
[![VitePress](https://img.shields.io/badge/VitePress-1.x-646cff)](https://vitepress.dev/)

鉅犀科技機器人與 AI 硬件產品的開放文檔平台。涵蓋機器人機械臂、傳感器、配件及開發者指南。

🌐 **[wiki.juxitech.com](https://wiki.juxitech.com/)**

支援 **11 種語言**:English(預設,無前綴)、簡體中文(`/zh-hans/`)、繁體中文(`/zh-hant/`)、日本語(`/ja/`)、한국어(`/ko/`)、Deutsch(`/de/`)、Français(`/fr/`)、Español(`/es/`)、Italiano(`/it/`)、Português (Brasil)(`/pt-br/`)、Português (Portugal)(`/pt-pt/`)。

## 倉庫結構

```
docs/
├── content/                  # 內容源(構建時校驗)
│   ├── tutorials/  topics/  tech/  cases/  community/   # 英文(root,無前綴)
│   ├── products/  downloads/  about/
│   ├── zh-hans/  zh-hant/    # 中文語言,與英文同構
│   └── ja/  ko/  de/  fr/  es/  it/                     # 其餘 6 語
├── .vitepress/
│   ├── config.ts             # 全語言配置:nav / sidebar / SEO(hreflang、JSON-LD)
│   ├── search.data.ts        # 站內搜索索引(標題 + 正文)
│   └── theme/                # 自定義主題(佈局、搜索、語言切換、頁腳等)
└── public/                   # 靜態資源(圖片、llms.txt、robots.txt)
```

## 本地開發

```bash
npm ci
npm run docs:dev      # http://localhost:5173
```

## 構建與檢查

```bash
npm run check:links   # 校驗站內 sidebar/正文鏈接(CI 也會執行)
npm run docs:build    # 生產構建到 docs/.vitepress/dist
npm run docs:preview  # 預覽生產構建
npm run gen:llms     # 重新生成 llms-full.txt(CI 構建時自動執行)
```

## 部署

站點通過 `.github/workflows/deploy.yml` 發佈到 **GitHub Pages** 的 `wiki.juxitech.com`:

- **觸發**:推送到 `main`(或手動 `workflow_dispatch`);OIDC 構建+部署(`actions/deploy-pages`)
- **域名**:自定義域名由 `docs/public/CNAME` 聲明;**DNS**:`wiki.juxitech.com` CNAME → `<user>.github.io`,然後在倉庫啟用 GitHub Pages
- **CI 檢查**:每次構建前執行 `check:links`(死鏈防護)與 `gen:llms`(重新生成 `llms-full.txt`)
- **需要完整 git 歷史**:workflow 使用 `fetch-depth: 0`,首頁"最後更新"日期來自真實提交時間

## 貢獻

參見[貢獻指南](https://wiki.juxitech.com/community/contributing)和 [Pull Request 模板](.github/PULL_REQUEST_TEMPLATE.md)。

## 技術棧

- [VitePress](https://vitepress.dev/) — 靜態網站生成器
- [GitHub Pages](https://pages.github.com/) — 託管服務
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## 聯繫我們

- 🌐 [juxitech.com](https://www.juxitech.com/zh-hant)
- 🐙 [GitHub 組織](https://github.com/Juxi-Technology/)
- 🧠 [Hugging Face](https://huggingface.co/Juxi-Technology)
- 🛒 [鉅犀科技 淘寶](https://juxitechnology.taobao.com/)
- 📧 [support@juxitech.com](mailto:support@juxitech.com)
- 📧 [sales@juxitech.com](mailto:sales@juxitech.com)

[English](README.md) | [简体中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Deutsch](README_de.md) | [Français](README_fr.md) | [Español](README_es.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-BR.md) | [Português (Portugal)](README_pt-PT.md)