# <img src="docs/public/images/logos/logo-black.png" width="80" align="left" style="margin-right: 16px;"> 钜犀科技 Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)

钜犀科技机器人与 AI 硬件产品的开放文档平台。涵盖机器人机械臂、传感器、配件及开发者指南。

🌐 **[wiki.juxitech.com](https://wiki.juxitech.com/)**

支持 **9 种语言**:English(默认,无前缀)、简体中文(`/zh-hans/`)、繁體中文(`/zh-hant/`)、日本語(`/ja/`)、한국어(`/ko/`)、Deutsch(`/de/`)、Français(`/fr/`)、Español(`/es/`)、Italiano(`/it/`)。

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
```

## 贡献

参见[贡献指南](https://wiki.juxitech.com/community/contributing)和 [Pull Request 模板](.github/PULL_REQUEST_TEMPLATE.md)。

## 技术栈

- [VitePress](https://vitepress.dev/) — 静态网站生成器
- [GitHub Pages](https://pages.github.com/) — 托管服务
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## 联系我们

- 🌐 [juxitech.com](https://www.juxitech.com)
- 🛒 [钜犀科技 淘宝](https://juxitechnology.taobao.com/)
- 📧 [support@juxitech.com](mailto:support@juxitech.com)
- 📧 [sales@juxitech.com](mailto:sales@juxitech.com)

[English](README.md) | [繁體中文](README_zh-HK.md)
