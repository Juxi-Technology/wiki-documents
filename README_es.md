# <img src="docs/public/images/logos/logo-black.png" width="80" align="left" style="margin-right: 16px;"> Juxi Technology Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)
[![9 Languages](https://img.shields.io/badge/languages-9%20locales-10b981)](https://wiki.juxitech.com/)
[![llms.txt](https://img.shields.io/badge/LLM%20ready-llms.txt-634b8f)](https://wiki.juxitech.com/llms.txt)
[![VitePress](https://img.shields.io/badge/VitePress-1.x-646cff)](https://vitepress.dev/)

Plataforma de documentación abierta para los productos de robótica y hardware de IA de Juxi Technology. Brazos robóticos, sensores, accesorios y guías para desarrolladores.

🌐 **[wiki.juxitech.com](https://wiki.juxitech.com/)**

**Disponible en 9 idiomas** : English (predeterminado, sin prefijo), 简体中文 (`/zh-hans/`), 繁體中文 (`/zh-hant/`), 日本語 (`/ja/`), 한국어 (`/ko/`), Deutsch (`/de/`), Français (`/fr/`), Español (`/es/`), Italiano (`/it/`).

## Estructura del repositorio

```
docs/
├── content/                  # Fuentes de contenido (verificadas en el build)
│   ├── tutorials/  topics/  tech/  cases/  community/   # Inglés (root, sin prefijo)
│   ├── products/  downloads/  about/
│   ├── zh-hans/  zh-hant/    # Locales chinas, misma estructura
│   └── ja/  ko/  de/  fr/  es/  it/                     # 6 locales restantes
├── .vitepress/
│   ├── config.ts             # Configuración por idioma: nav / sidebar / SEO (hreflang, JSON-LD)
│   ├── search.data.ts        # Índice de búsqueda (título + cuerpo del texto)
│   └── theme/                # Tema personalizado (layout, búsqueda, selector de idioma, footer…)
└── public/                   # Recursos estáticos (imágenes, llms.txt, robots.txt)
```

## Desarrollo local

```bash
npm ci
npm run docs:dev      # http://localhost:5173
```

## Build y comprobaciones

```bash
npm run check:links   # Verifica todos los enlaces internos (sidebar + cuerpo), también en CI
npm run docs:build    # Build de producción a docs/.vitepress/dist
npm run docs:preview  # Vista previa del build de producción
npm run gen:llms     # regenerar llms-full.txt (se hace automáticamente en CI)
```

## Despliegue

El sitio se publica en **GitHub Pages** en `wiki.juxitech.com` mediante `.github/workflows/deploy.yml`:

- **Disparador**: push a `main` (o `workflow_dispatch` manual); build + despliegue con OIDC (`actions/deploy-pages`)
- **Dominio**: nombre de dominio personalizado declarado en `docs/public/CNAME`; **DNS**: CNAME `wiki.juxitech.com` → `<user>.github.io`, y luego activar GitHub Pages en el repositorio
- **Comprobaciones CI**: `check:links` (protección contra enlaces rotos) y `gen:llms` (regenera `llms-full.txt`) antes de cada build
- **Historial git completo requerido**: el workflow usa `fetch-depth: 0` para que las fechas de "última actualización" de la portada provengan de commits reales

## Contribuir

Consulta la [Guía de contribución](https://wiki.juxitech.com/es/community/contributing) y la [Plantilla de pull request](.github/PULL_REQUEST_TEMPLATE.md).

## Stack tecnológico

- [VitePress](https://vitepress.dev/) — generador de sitios estáticos
- [GitHub Pages](https://pages.github.com/) — hosting
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## Contacto

- 🌐 [juxitech.com](https://www.juxitech.com/es)
- 🐙 [Organización GitHub](https://github.com/Juxi-Technology/)
- 🧠 [Hugging Face](https://huggingface.co/Juxi-Technology)
- 🛒 [JuxiTech Taobao](https://juxitechnology.taobao.com/)
- 📧 [support@juxitech.com](mailto:support@juxitech.com)
- 📧 [sales@juxitech.com](mailto:sales@juxitech.com)

[English](README.md) | [简体中文](README_zh.md) | [繁體中文](README_zh-HK.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Deutsch](README_de.md) | [Français](README_fr.md) | [Italiano](README_it.md)
