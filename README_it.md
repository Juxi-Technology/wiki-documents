# <img src="docs/public/images/logos/logo-black.png" width="80" align="left" style="margin-right: 16px;"> Juxi Technology Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)
[![9 Languages](https://img.shields.io/badge/languages-11%20locales-10b981)](https://wiki.juxitech.com/)
[![llms.txt](https://img.shields.io/badge/LLM%20ready-llms.txt-634b8f)](https://wiki.juxitech.com/llms.txt)
[![VitePress](https://img.shields.io/badge/VitePress-1.x-646cff)](https://vitepress.dev/)

Piattaforma di documentazione aperta per i prodotti di robotica e hardware AI di Juxi Technology. Bracci robotici, sensori, accessori e guide per sviluppatori.

🌐 **[wiki.juxitech.com](https://wiki.juxitech.com/)**

**Disponibile in 11 lingue** : English (predefinita, senza prefisso), 简体中文 (`/zh-hans/`), 繁體中文 (`/zh-hant/`), 日本語 (`/ja/`), 한국어 (`/ko/`), Deutsch (`/de/`), Français (`/fr/`), Español (`/es/`), Italiano (`/it/`), Português (Brasil) (`/pt-br/`), Português (Portugal) (`/pt-pt/`).

## Struttura del repository

```
docs/
├── content/                  # Sorgenti dei contenuti (verificate in build)
│   ├── tutorials/  topics/  tech/  cases/  community/   # Inglese (root, senza prefisso)
│   ├── products/  downloads/  about/
│   ├── zh-hans/  zh-hant/    # Locale cinese, stessa struttura
│   └── ja/  ko/  de/  fr/  es/  it/                     # altre 6 lingue
├── .vitepress/
│   ├── config.ts             # Config per lingua: nav / sidebar / SEO (hreflang, JSON-LD)
│   ├── search.data.ts        # Indice di ricerca interno (titolo + corpo)
│   └── theme/                # Tema personalizzato (layout, ricerca, selettore lingua, footer…)
└── public/                   # Asset statici (immagini, llms.txt, robots.txt)
```

## Sviluppo locale

```bash
npm ci
npm run docs:dev      # http://localhost:5173
```

## Build e verifiche

```bash
npm run check:links   # Verifica tutti i link interni (sidebar + corpo), anche in CI
npm run docs:build    # Build di produzione in docs/.vitepress/dist
npm run docs:preview  # Anteprima della build di produzione
npm run gen:llms     # rigenera llms-full.txt (eseguito automaticamente in CI)
```

## Deployment

Il sito viene pubblicato su **GitHub Pages** all'indirizzo `wiki.juxitech.com` tramite `.github/workflows/deploy.yml`:

- **Trigger**: push su `main` (o `workflow_dispatch` manuale); build + deploy con OIDC (`actions/deploy-pages`)
- **Dominio**: dominio personalizzato dichiarato in `docs/public/CNAME`; **DNS**: CNAME `wiki.juxitech.com` → `<user>.github.io`, quindi attivare GitHub Pages sul repository
- **Check CI**: `check:links` (protezione dai link rotti) e `gen:llms` (rigenera `llms-full.txt`) prima di ogni build
- **Storia git completa richiesta**: il workflow usa `fetch-depth: 0` così le date "ultimo aggiornamento" della home derivano dai commit reali

## Contribuire

Consulta la [Guida alla contribuzione](https://wiki.juxitech.com/it/community/contributing) e il [Modello di pull request](.github/PULL_REQUEST_TEMPLATE.md).

## Stack tecnologico

- [VitePress](https://vitepress.dev/) — generatore di siti statici
- [GitHub Pages](https://pages.github.com/) — hosting
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## Contatti

- 🌐 [juxitech.com](https://www.juxitech.com/it)
- 🐙 [Organizzazione GitHub](https://github.com/Juxi-Technology/)
- 🧠 [Hugging Face](https://huggingface.co/Juxi-Technology)
- 🛒 [JuxiTech Taobao](https://juxitechnology.taobao.com/)
- 📧 [support@juxitech.com](mailto:support@juxitech.com)
- 📧 [sales@juxitech.com](mailto:sales@juxitech.com)

[English](README.md) | [简体中文](README_zh.md) | [繁體中文](README_zh-HK.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Deutsch](README_de.md) | [Français](README_fr.md) | [Español](README_es.md) | [Português (Brasil)](README_pt-BR.md) | [Português (Portugal)](README_pt-PT.md)