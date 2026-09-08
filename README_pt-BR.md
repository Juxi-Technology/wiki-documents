# <img src="docs/public/images/logos/logo-black.png" width="80" align="left" style="margin-right: 16px;"> Juxi Technology Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)
[![10 Languages](https://img.shields.io/badge/languages-11%20locales-10b981)](https://wiki.juxitech.com/)
[![llms.txt](https://img.shields.io/badge/LLM%20ready-llms.txt-634b8f)](https://wiki.juxitech.com/llms.txt)
[![VitePress](https://img.shields.io/badge/VitePress-1.x-646cff)](https://vitepress.dev/)

Plataforma de documentação aberta para os produtos de robótica e hardware de IA da Juxi Technology. Braços robóticos, sensores, acessórios e guias para desenvolvedores.

🌐 **[wiki.juxitech.com](https://wiki.juxitech.com/)**

**Disponível em 11 idiomas**: English (padrão, sem prefixo), 简体中文 (`/zh-hans/`), 繁體中文 (`/zh-hant/`), 日本語 (`/ja/`), 한국어 (`/ko/`), Deutsch (`/de/`), Français (`/fr/`), Español (`/es/`), Italiano (`/it/`), Português (Brasil) (`/pt-br/`), Português (Portugal) (`/pt-pt/`).

## Estrutura do repositório

```
docs/
├── content/                  # Fontes de conteúdo (validadas no build)
│   ├── tutorials/  topics/  tech/  cases/  community/   # Inglês (root, sem prefixo)
│   ├── products/  downloads/  about/
│   ├── zh-hans/  zh-hant/    # Locais em chinês, mesma estrutura
│   └── ja/  ko/  de/  fr/  es/  it/  pt-br/  pt-pt/         # demais 8 idiomas
├── .vitepress/
│   ├── config.ts             # Config por idioma: nav / sidebar / SEO (hreflang, JSON-LD)
│   ├── search.data.ts        # Índice de busca (título + corpo do texto)
│   └── theme/                # Tema personalizado (layout, busca, seletor de idioma, footer…)
└── public/                   # Recursos estáticos (imagens, llms.txt, robots.txt)
```

## Desenvolvimento local

```bash
npm ci
npm run docs:dev      # http://localhost:5173
```

## Build e verificações

```bash
npm run check:links   # Verifica todos os links internos (sidebar + corpo), também no CI
npm run docs:build    # Build de produção para docs/.vitepress/dist
npm run docs:preview  # Pré-visualização do build de produção
npm run gen:llms     # regenera llms-full.txt (feito automaticamente no CI)
```

## Implantação

O site é publicado no **GitHub Pages** em `wiki.juxitech.com` por meio de `.github/workflows/deploy.yml`:

- **Gatilho**: push para `main` (ou `workflow_dispatch` manual); build + implantação com OIDC (`actions/deploy-pages`)
- **Domínio**: domínio personalizado declarado em `docs/public/CNAME`; **DNS**: CNAME `wiki.juxitech.com` → `<user>.github.io`, depois ativar o GitHub Pages no repositório
- **Verificações no CI**: `check:links` (proteção contra links quebrados) e `gen:llms` (regenera `llms-full.txt`) antes de cada build
- **Histórico git completo necessário**: o workflow usa `fetch-depth: 0` para que as datas de "última atualização" da página inicial venham de commits reais

## Contribuir

Veja o [Guia de contribuição](https://wiki.juxitech.com/pt/community/contributing) e o [Modelo de pull request](.github/PULL_REQUEST_TEMPLATE.md).

## Stack tecnológica

- [VitePress](https://vitepress.dev/) — gerador de sites estáticos
- [GitHub Pages](https://pages.github.com/) — hospedagem
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## Contato

- 🌐 [juxitech.com](https://www.juxitech.com/pt-br)
- 🐙 [Organização GitHub](https://github.com/Juxi-Technology/)
- 🧠 [Hugging Face](https://huggingface.co/Juxi-Technology)
- 🛒 [JuxiTech Taobao](https://juxitechnology.taobao.com/)
- 📧 [support@juxitech.com](mailto:support@juxitech.com)
- 📧 [sales@juxitech.com](mailto:sales@juxitech.com)

[English](README.md) | [简体中文](README_zh.md) | [繁體中文](README_zh-HK.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Deutsch](README_de.md) | [Français](README_fr.md) | [Español](README_es.md) | [Italiano](README_it.md) | [Português (Portugal)](README_pt-PT.md)
