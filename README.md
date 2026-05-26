
# Juxi Technology Wiki

Juxi Technology 产品教程与文档中心，基于 VitePress 构建，部署在 GitHub Pages 上。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 目录结构

```
wiki-document/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts          # VitePress 配置文件
│   ├── public/                # 静态资源（图片等）
│   ├── tutorials/             # 产品教程
│   ├── tech/                  # 技术文档
│   └── index.md               # 首页
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages 自动部署配置
└── package.json
```

## 部署到 GitHub Pages

1. 将代码推送到 GitHub 组织的仓库
2. 在仓库设置中启用 GitHub Pages
3. 在 Settings &gt; Pages 中：
   - Source 选择 "Deploy from a branch"
   - 或使用 GitHub Actions（已配置）
4. 每次推送到 `main` 分支会自动触发部署

## 添加新文档

1. 在 `docs/tutorials/` 或 `docs/tech/` 目录下创建新的 `.md` 文件
2. 在 `docs/.vitepress/config.ts` 中的 `sidebar` 配置中添加链接
3. 提交并推送到 GitHub，网站会自动更新

## 自定义配置

编辑 `docs/.vitepress/config.ts` 来修改网站配置，包括：
- 网站标题和描述
- 导航栏和侧边栏
- 主题颜色
- 社交媒体链接

## 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [GitHub Pages](https://pages.github.com/) - 托管平台
- [GitHub Actions](https://github.com/features/actions) - 自动部署
