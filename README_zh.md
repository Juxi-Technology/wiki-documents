# <img src="docs/public/images/logos/logo-black.png" width="80" align="left" style="margin-right: 16px;"> 钜犀科技 Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)
[![9 Languages](https://img.shields.io/badge/languages-11%20locales-10b981)](https://wiki.juxitech.com/)
[![llms.txt](https://img.shields.io/badge/LLM%20ready-llms.txt-634b8f)](https://wiki.juxitech.com/llms.txt)
[![VitePress](https://img.shields.io/badge/VitePress-1.x-646cff)](https://vitepress.dev/)

钜犀科技机器人与 AI 硬件产品的开放文档平台。涵盖机器人机械臂、传感器、配件及开发者指南。

🌐 **[wiki.juxitech.com](https://wiki.juxitech.com/)**

支持 **11 种语言**:English(默认,无前缀)、简体中文(`/zh-hans/`)、繁體中文(`/zh-hant/`)、日本語(`/ja/`)、한국어(`/ko/`)、Deutsch(`/de/`)、Français(`/fr/`)、Español(`/es/`)、Italiano(`/it/`)、Português (Brasil)(`/pt-br/`)、Português (Portugal)(`/pt-pt/`)。

## 仓库结构

```
docs/
├── content/                  # 内容源(构建时校验)
│   ├── tutorials/  topics/  tech/  cases/  community/   # 英文(root,无前缀)
│   ├── products/  downloads/  about/
│   ├── zh-hans/  zh-hant/    # 中文语言,与英文同构
│   └── ja/  ko/  de/  fr/  es/  it/                     # 其余 6 语
├── .vitepress/
│   ├── config.ts             # 全语言配置:nav / sidebar / SEO(hreflang、JSON-LD)
│   ├── search.data.ts        # 站内搜索索引(标题 + 正文)
│   └── theme/                # 自定义主题(布局、搜索、语言切换、页脚等)
└── public/                   # 静态资源(图片、llms.txt、robots.txt)
```

## 本地开发

```bash
npm ci
npm run docs:dev      # http://localhost:5173
```

## 构建与检查

```bash
npm run check:links   # 校验站内 sidebar/正文链接(CI 也会执行)
npm run docs:build    # 生产构建到 docs/.vitepress/dist
npm run docs:preview  # 预览生产构建
npm run gen:llms     # 重新生成 llms-full.txt(CI 构建时自动执行)
```

## 部署

站点通过 `.github/workflows/deploy.yml` 发布到 **GitHub Pages** 的 `wiki.juxitech.com`:

- **触发**:推送到 `main`(或手动 `workflow_dispatch`);OIDC 构建+部署(`actions/deploy-pages`)
- **域名**:自定义域名由 `docs/public/CNAME` 声明;**DNS**:`wiki.juxitech.com` CNAME → `<user>.github.io`,然后在仓库启用 GitHub Pages
- **CI 检查**:每次构建前执行 `check:links`(死链防护)与 `gen:llms`(重新生成 `llms-full.txt`)
- **需要完整 git 历史**:workflow 使用 `fetch-depth: 0`,首页"最后更新"日期来自真实提交时间

## 贡献

参见[贡献指南](https://wiki.juxitech.com/community/contributing)和 [Pull Request 模板](.github/PULL_REQUEST_TEMPLATE.md)。

## 技术栈

- [VitePress](https://vitepress.dev/) — 静态网站生成器
- [GitHub Pages](https://pages.github.com/) — 托管服务
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## 联系我们

- 🌐 [juxitech.com](https://www.juxitech.com/zh-hans)
- 🐙 [GitHub 组织](https://github.com/Juxi-Technology/)
- 🧠 [Hugging Face](https://huggingface.co/Juxi-Technology)
- 🛒 [钜犀科技 淘宝](https://juxitechnology.taobao.com/)
- 📧 [support@juxitech.com](mailto:support@juxitech.com)
- 📧 [sales@juxitech.com](mailto:sales@juxitech.com)

[English](README.md) | [繁體中文](README_zh-HK.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Deutsch](README_de.md) | [Français](README_fr.md) | [Español](README_es.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-BR.md) | [Português (Portugal)](README_pt-PT.md)