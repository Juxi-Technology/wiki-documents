
# The JuxiTechnology Files Management Platform

![img](https://juxitech.feishu.cn/space/api/box/stream/download/asynccode/?code=OGYyNTczMmUzY2QyM2NhNzA3YjA0Yjg1MDExOWEyZWVfUnpTc2xLQnpFeW40MjVHT2ZtV2Z3UU9NMlNydXc3OHpfVG9rZW46UmtEbWJ4blFzb29STWx4U3VsaGM1S1Vsbm1jXzE3Nzk0NDMxMjg6MTc3OTQ0NjcyOF9WNA)

This is an open platform collecting all the wikis published by JuxiTechnology.

This is the Github source files for JuxiTechnology.

We recommend pull the latest one:

```bash
git clone --depth 1 https://github.com/Juxi-Technology/wiki-documents.git
```

# Quick Links

## 产品教程
- [SO-ARM101 教程](/tutorials/so-arm101-tutorial)
- [快速入门](/tutorials/getting-started)
- [硬件设置](/tutorials/hardware-setup)
- [软件配置](/tutorials/software-config)

## 技术文档
- [开发指南](/tech/dev-guide)
- [API 参考](/tech/api-reference)

## 技术专题
- [机器人学习](/topics/robot-learning/)

## 成功案例
- [用户案例](/cases/)

## 贡献者社区
- [加入社区](/community/)

---

# Juxi Technology Wiki (VitePress)

This project also includes a VitePress-based wiki website deployed on GitHub Pages.

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview build
npm run docs:preview
```

## Project Structure

```
wiki-document/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts          # VitePress config
│   ├── public/                # Static assets (images, etc.)
│   ├── tutorials/             # Product tutorials
│   ├── tech/                  # Technical docs
│   ├── topics/                # Technical topics
│   ├── cases/                 # User success cases
│   ├── community/             # Contributor community
│   ├── en/                    # English content
│   ├── zh-HK/                 # Hong Kong Traditional Chinese content
│   └── index.md               # Home page
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages auto deploy
└── package.json
```

## Deploy to GitHub Pages

1. Push code to GitHub
2. Enable GitHub Pages in repo settings
3. Under Settings &gt; Pages:
   - Source: Select `GitHub Actions`
4. Every push to `main` triggers auto deploy

## Add New Documentation

1. Create new `.md` files in `docs/tutorials/` or `docs/tech/`
2. Add links to `sidebar` in `docs/.vitepress/config.ts`
3. Commit and push, website updates automatically

## Tech Stack

- [VitePress](https://vitepress.dev/) - Static site generator
- [GitHub Pages](https://pages.github.com/) - Hosting
- [GitHub Actions](https://github.com/features/actions) - Auto deployment

## 🔗 More Information

For business inquiries, ODM cooperation or technical support, please contact us:

- 🌐 Official Website: [https://www.juxitech.com](https://www.juxitech.com/)
- 💬 Feedback: [pe@juxitech.com](mailto:pe@juxitech.com)
- 📧 Business: [sales@juxitech.com](mailto:sales@juxitech.com)
- 📺 Bilibili: [JuxiTech Bilibili](https://space.bilibili.com/3546906737248821)
- 💴 TaoBao: [JuxiTech Taobao](https://juxitechnology.taobao.com/)
