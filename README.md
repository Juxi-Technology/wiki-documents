# <img src="docs/public/images/logos/logo-black.png" width="80" align="left" style="margin-right: 16px;"> Juxi Technology Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)
[![9 Languages](https://img.shields.io/badge/languages-11%20locales-10b981)](https://wiki.juxitech.com/)
[![llms.txt](https://img.shields.io/badge/LLM%20ready-llms.txt-634b8f)](https://wiki.juxitech.com/llms.txt)
[![VitePress](https://img.shields.io/badge/VitePress-1.x-646cff)](https://vitepress.dev/)

Open documentation platform for Juxi Technology's robotics and AI hardware products. Covers robot arms, sensors, accessories, and developer guides — from SO-ARM101 to IMU modules.

🌐 **[wiki.juxitech.com](https://wiki.juxitech.com/)**

Available in **11 languages**: English (default, no prefix), 简体中文 (`/zh-hans/`), 繁體中文 (`/zh-hant/`), 日本語 (`/ja/`), 한국어 (`/ko/`), Deutsch (`/de/`), Français (`/fr/`), Español (`/es/`), Italiano (`/it/`), Português (Brasil) (`/pt-br/`), Português (Portugal) (`/pt-pt/`).

## Repository Layout

```
docs/
├── content/                  # content source tree (verified at build time)
│   ├── tutorials/  topics/  tech/  cases/  community/   # English (root, no prefix)
│   ├── products/  downloads/  about/
│   ├── zh-hans/  zh-hant/    # Chinese locales, same structure
│   └── ja/  ko/  de/  fr/  es/  it/                     # remaining 6 locales
├── .vitepress/
│   ├── config.ts             # all locales: nav / sidebar / SEO (hreflang, JSON-LD)
│   ├── search.data.ts        # client search index (title + body text)
│   └── theme/                # custom theme (Layout, search, language switcher, footer…)
└── public/                   # static assets (images, llms.txt, robots.txt)
```

## Local Development

```bash
npm ci
npm run docs:dev      # http://localhost:5173
```

## Build & Checks

```bash
npm run check:links   # verify all internal sidebar/body links resolve (runs in CI too)
npm run docs:build    # production build to docs/.vitepress/dist
npm run docs:preview  # preview production build
npm run gen:llms     # regenerate llms-full.txt (done automatically in CI)
```

## Deployment

The site is published to **GitHub Pages** at `wiki.juxitech.com` via `.github/workflows/deploy.yml`:

- **Trigger**: push to `main` (or manual `workflow_dispatch`); build + deploy with OIDC (`actions/deploy-pages`)
- **Domain**: custom domain via `docs/public/CNAME`; **DNS**: `wiki.juxitech.com` CNAME → `<user>.github.io`, then enable GitHub Pages for the repo
- **CI checks**: `check:links` (dead-link guard) and `gen:llms` (regenerates `llms-full.txt`) run before every build
- **Full git history required**: the workflow uses `fetch-depth: 0` so homepage "last updated" dates come from real commit dates

## Contributing

See [Contributing Guide](https://wiki.juxitech.com/community/contributing) and [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md).

## Tech Stack

- [VitePress](https://vitepress.dev/) — Static site generator
- [GitHub Pages](https://pages.github.com/) — Hosting
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## Contact

- 🌐 [juxitech.com](https://www.juxitech.com)
- 🐙 [GitHub Organization](https://github.com/Juxi-Technology/)
- 🧠 [Hugging Face](https://huggingface.co/Juxi-Technology)
- 🛒 [JuxiTech Taobao](https://juxitechnology.taobao.com/)
- 📧 [support@juxitech.com](mailto:support@juxitech.com)
- 📧 [sales@juxitech.com](mailto:sales@juxitech.com)

[简体中文](README_zh.md) | [繁體中文](README_zh-HK.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Deutsch](README_de.md) | [Français](README_fr.md) | [Español](README_es.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-BR.md) | [Português (Portugal)](README_pt-PT.md)