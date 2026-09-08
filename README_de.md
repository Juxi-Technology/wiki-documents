# <img src="docs/public/images/logos/logo-black.png" width="80" align="left" style="margin-right: 16px;"> Juxi Technology Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)
[![9 Languages](https://img.shields.io/badge/languages-11%20locales-10b981)](https://wiki.juxitech.com/)
[![llms.txt](https://img.shields.io/badge/LLM%20ready-llms.txt-634b8f)](https://wiki.juxitech.com/llms.txt)
[![VitePress](https://img.shields.io/badge/VitePress-1.x-646cff)](https://vitepress.dev/)

Offene Dokumentationsplattform für die Robotik- und AI-Hardware-Produkte von Juxi Technology. Von Roboterarmen über Sensoren bis zu Zubehör und Entwickleranleitungen.

🌐 **[wiki.juxitech.com](https://wiki.juxitech.com/)**

**11 Sprachen verfügbar**: English (Standard, ohne Präfix), 简体中文 (`/zh-hans/`), 繁體中文 (`/zh-hant/`), 日本語 (`/ja/`), 한국어 (`/ko/`), Deutsch (`/de/`), Français (`/fr/`), Español (`/es/`), Italiano (`/it/`), Português (Brasil) (`/pt-br/`), Português (Portugal) (`/pt-pt/`).

## Repository-Struktur

```
docs/
├── content/                  # Inhaltsquellen (beim Build geprüft)
│   ├── tutorials/  topics/  tech/  cases/  community/   # Englisch (root, ohne Präfix)
│   ├── products/  downloads/  about/
│   ├── zh-hans/  zh-hant/    # Chinesische Locales, gleiche Struktur
│   └── ja/  ko/  de/  fr/  es/  it/                     # übrige 6 Sprachen
├── .vitepress/
│   ├── config.ts             # Alle Sprachen: nav / sidebar / SEO (hreflang, JSON-LD)
│   ├── search.data.ts        # Interner Suchindex (Titel + Volltext)
│   └── theme/                # Custom Theme (Layout, Suche, Sprachumschalter, Footer …)
└── public/                   # Statische Assets (Bilder, llms.txt, robots.txt)
```

## Lokale Entwicklung

```bash
npm ci
npm run docs:dev      # http://localhost:5173
```

## Build & Checks

```bash
npm run check:links   # Alle internen Sidebar-/Body-Links prüfen (auch in CI)
npm run docs:build    # Produktions-Build nach docs/.vitepress/dist
npm run docs:preview  # Produktions-Build ansehen
npm run gen:llms     # llms-full.txt neu generieren (in CI automatisch)
```

## Deployment

Veröffentlicht wird über `.github/workflows/deploy.yml` auf **GitHub Pages** unter `wiki.juxitech.com`:

- **Trigger**: Push auf `main` (oder manuell `workflow_dispatch`); Build + Deploy mit OIDC (`actions/deploy-pages`)
- **Domain**: Custom Domain via `docs/public/CNAME`; **DNS**: `wiki.juxitech.com` CNAME → `<user>.github.io`, danach GitHub Pages im Repo aktivieren
- **CI-Checks**: Vor jedem Build `check:links` (Schutz vor toten Links) und `gen:llms` (regeneriert `llms-full.txt`)
- **Voller Git-Verlauf nötig**: Das Workflow nutzt `fetch-depth: 0`, damit die „Zuletzt aktualisiert"-Daten der Startseite aus echten Commit-Daten stammen

## Mitwirken

Siehe [Mitwirkungsleitfaden](https://wiki.juxitech.com/de/community/contributing) und [Pull-Request-Vorlage](.github/PULL_REQUEST_TEMPLATE.md).

## Tech-Stack

- [VitePress](https://vitepress.dev/) — Static Site Generator
- [GitHub Pages](https://pages.github.com/) — Hosting
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## Kontakt

- 🌐 [juxitech.com](https://www.juxitech.com/de)
- 🐙 [GitHub-Organisation](https://github.com/Juxi-Technology/)
- 🧠 [Hugging Face](https://huggingface.co/Juxi-Technology)
- 🛒 [JuxiTech Taobao](https://juxitechnology.taobao.com/)
- 📧 [support@juxitech.com](mailto:support@juxitech.com)
- 📧 [sales@juxitech.com](mailto:sales@juxitech.com)

[English](README.md) | [简体中文](README_zh.md) | [繁體中文](README_zh-HK.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Français](README_fr.md) | [Español](README_es.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-BR.md) | [Português (Portugal)](README_pt-PT.md)