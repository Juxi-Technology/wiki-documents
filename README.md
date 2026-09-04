# <img src="docs/public/images/logos/logo-black.png" width="80" align="left" style="margin-right: 16px;"> Juxi Technology Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)

Open documentation platform for Juxi Technology's robotics and AI hardware products. Covers robot arms, sensors, accessories, and developer guides — from SO-ARM101 to IMU modules.

🌐 **[wiki.juxitech.com](https://wiki.juxitech.com/)**

Available in **9 languages**: English (default, no prefix), 简体中文 (`/zh-hans/`), 繁體中文 (`/zh-hant/`), 日本語 (`/ja/`), 한국어 (`/ko/`), Deutsch (`/de/`), Français (`/fr/`), Español (`/es/`), Italiano (`/it/`).

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
```

## Contributing

See [Contributing Guide](https://wiki.juxitech.com/community/contributing) and [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md).

## Tech Stack

- [VitePress](https://vitepress.dev/) — Static site generator
- [GitHub Pages](https://pages.github.com/) — Hosting
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## Contact

- 🌐 [juxitech.com](https://www.juxitech.com)
- 🛒 [JuxiTech Taobao](https://juxitechnology.taobao.com/)
- 📧 [support@juxitech.com](mailto:support@juxitech.com)
- 📧 [sales@juxitech.com](mailto:sales@juxitech.com)

[简体中文](README_zh.md) | [繁體中文](README_zh-HK.md)
