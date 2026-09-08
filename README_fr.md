# <img src="docs/public/images/logos/logo-black.png" width="80" align="left" style="margin-right: 16px;"> Juxi Technology Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)
[![9 Languages](https://img.shields.io/badge/languages-11%20locales-10b981)](https://wiki.juxitech.com/)
[![llms.txt](https://img.shields.io/badge/LLM%20ready-llms.txt-634b8f)](https://wiki.juxitech.com/llms.txt)
[![VitePress](https://img.shields.io/badge/VitePress-1.x-646cff)](https://vitepress.dev/)

Plateforme de documentation ouverte pour les produits de robotique et de matériel IA de Juxi Technology. Bras robotiques, capteurs, accessoires et guides développeur.

🌐 **[wiki.juxitech.com](https://wiki.juxitech.com/)**

**Disponible en 11 langues** : English (par défaut, sans préfixe), 简体中文 (`/zh-hans/`), 繁體中文 (`/zh-hant/`), 日本語 (`/ja/`), 한국어 (`/ko/`), Deutsch (`/de/`), Français (`/fr/`), Español (`/es/`), Italiano (`/it/`), Português (Brasil) (`/pt-br/`), Português (Portugal) (`/pt-pt/`).

## Structure du dépôt

```
docs/
├── content/                  # Sources de contenu (vérifiées au build)
│   ├── tutorials/  topics/  tech/  cases/  community/   # Anglais (root, sans préfixe)
│   ├── products/  downloads/  about/
│   ├── zh-hans/  zh-hant/    # Locales chinoises, même structure
│   └── ja/  ko/  de/  fr/  es/  it/                     # 6 autres locales
├── .vitepress/
│   ├── config.ts             # Config par langue : nav / sidebar / SEO (hreflang, JSON-LD)
│   ├── search.data.ts        # Index de recherche (titre + corps de texte)
│   └── theme/                # Thème personnalisé (layout, recherche, sélecteur de langue, footer…)
└── public/                   # Assets statiques (images, llms.txt, robots.txt)
```

## Développement local

```bash
npm ci
npm run docs:dev      # http://localhost:5173
```

## Build & vérifications

```bash
npm run check:links   # Vérifie tous les liens internes (sidebar + corps), aussi en CI
npm run docs:build    # Build de production vers docs/.vitepress/dist
npm run docs:preview  # Prévisualisation du build de production
npm run gen:llms     # régénérer llms-full.txt (fait automatiquement en CI)
```

## Déploiement

Le site est publié sur **GitHub Pages** à `wiki.juxitech.com` via `.github/workflows/deploy.yml` :

- **Déclencheur** : push sur `main` (ou `workflow_dispatch` manuel) ; build + déploiement OIDC (`actions/deploy-pages`)
- **Domaine** : nom de domaine personnalisé déclaré via `docs/public/CNAME` ; **DNS** : CNAME `wiki.juxitech.com` → `<user>.github.io`, puis activer GitHub Pages sur le dépôt
- **Vérifications CI** : `check:links` (protection contre les liens morts) et `gen:llms` (régénère `llms-full.txt`) avant chaque build
- **Historique git complet requis** : le workflow utilise `fetch-depth: 0` pour que les dates « dernière mise à jour » de l'accueil proviennent des vrais commits

## Contribuer

Voir le [Guide de contribution](https://wiki.juxitech.com/fr/community/contributing) et le [Modèle de pull request](.github/PULL_REQUEST_TEMPLATE.md).

## Stack technique

- [VitePress](https://vitepress.dev/) — générateur de site statique
- [GitHub Pages](https://pages.github.com/) — hébergement
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## Contact

- 🌐 [juxitech.com](https://www.juxitech.com/fr)
- 🐙 [Organisation GitHub](https://github.com/Juxi-Technology/)
- 🧠 [Hugging Face](https://huggingface.co/Juxi-Technology)
- 🛒 [JuxiTech Taobao](https://juxitechnology.taobao.com/)
- 📧 [support@juxitech.com](mailto:support@juxitech.com)
- 📧 [sales@juxitech.com](mailto:sales@juxitech.com)

[English](README.md) | [简体中文](README_zh.md) | [繁體中文](README_zh-HK.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-BR.md) | [Português (Portugal)](README_pt-PT.md)