
# <img src="docs/public/images/logos/logo-black.png" width="120" align="left" style="margin-right: 30px;"> 钜犀科技 Wiki 文档平台

🤖**收录钜犀科技所有公开文档的开源文档平台**

[快速开始](#-快速开始) • [文档资源](#-文档资源) • [项目结构](#-项目结构) • [联系我们](#-联系我们)

---

## 📖 简介

本仓库包含钜犀科技官方 Wiki 文档平台的源文件。使用 VitePress 构建并部署在 GitHub Pages 上，为钜犀科技产品提供全面的文档、教程和资源。

## 🚀 快速开始

### 前置条件

- Node.js (v16 或更高版本)
- npm 或 yarn

### 安装

```bash
# 克隆仓库
git clone --depth 1 https://github.com/Juxi-Technology/wiki-documents.git

# 进入项目目录
cd wiki-document

# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev
```

访问 `http://localhost:5173` 本地预览网站。

## 📚 文档资源

### 产品教程

- [SO-ARM101 教程](https://juxi-technology.github.io/wiki-documents/tutorials/so-arm101-tutorial)
- [快速入门](https://juxi-technology.github.io/wiki-documents/tutorials/getting-started)
- [硬件设置](https://juxi-technology.github.io/wiki-documents/tutorials/hardware-setup)
- [软件配置](https://juxi-technology.github.io/wiki-documents/tutorials/software-config)

### 技术文档

- [开发指南](https://juxi-technology.github.io/wiki-documents/tech/dev-guide)
- [API 参考](https://juxi-technology.github.io/wiki-documents/tech/api-reference)

### 专题与资源

- [机器人学习](https://juxi-technology.github.io/wiki-documents/topics/robot-learning/)
- [成功案例](https://juxi-technology.github.io/wiki-documents/cases/)
- [贡献者社区](https://juxi-technology.github.io/wiki-documents/community/)

## 📁 项目结构

```
wiki-document/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts          # VitePress 配置
│   ├── public/                # 静态资源（图片等）
│   ├── tutorials/             # 产品教程（简体中文）
│   ├── tech/                  # 技术文档
│   ├── topics/                # 技术专题
│   ├── cases/                 # 用户成功案例
│   ├── community/             # 贡献者社区
│   ├── en/                    # 英文版内容
│   ├── zh-HK/                 # 香港繁体版内容
│   └── index.md               # 首页
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages 自动部署
└── package.json
```

## 🛠️ 使用指南

### 本地开发

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run docs:dev
   ```
   访问 `http://localhost:5173` 预览。

3. **构建生产版本**
   ```bash
   npm run docs:build
   ```

### 在 GitHub 上管理文档

#### 添加新文档（增）

**方法1：本地编辑**

1. 在 `docs/tutorials/` 或 `docs/tech/` 下创建新的 `.md` 文件
2. 编写内容（Markdown格式）
3. 在 `docs/.vitepress/config.ts` 的 `sidebar` 中添加链接
4. 提交并推送：
   ```bash
   git add .
   git commit -m "添加新文档：[文档名]"
   git push
   ```

**方法2：GitHub 网页界面**

1. 进入仓库的 `docs/tutorials/` 或 `docs/tech/` 目录
2. 点击 "Add file" → "Create new file"
3. 文件名格式：`[文档名].md"
4. 编写内容
5. 提交变更

#### 更新文档（改）

1. 编辑对应的 `.md` 文件
2. 提交并推送
   ```bash
   git add .
   git commit -m "更新文档：[文档名]"
   git push
   ```

#### 删除文档（删）

1. 删除对应的 `.md` 文件
2. 从 `docs/.vitepress/config.ts` 的 `sidebar` 中移除链接
3. 提交并推送
   ```bash
   git add .
   git commit -m "删除文档：[文档名]"
   git push
   ```

#### 查看文档（查）

- 本地：`http://localhost:5173`
- 在线：`https://juxi-technology.github.io/wiki-documents/`

### 文件格式

#### 支持的格式

- **Markdown** (.md) - 主要格式
- 图片：.png, .jpg, .jpeg, .gif, .svg

#### Markdown 基本语法

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文字**
*斜体文字*

- 列表项1
- 列表项2

[链接文字](链接地址)
![图片说明](图片路径)

代码块：
```javascript
console.log('hello');
```
```

### 文件夹说明

#### docs/public/

存放静态资源：

- Logo 图片
- 产品图片
- 图表图片

**命名规则：**
- logo.png (Logo)
- hero.png (首页大图)
- product-xxx.png (产品图片)

#### docs/tutorials/

存放产品使用教程

#### docs/tech/

存放技术文档（API、开发指南等）

#### docs/topics/

存放技术专题内容

#### docs/cases/

存放用户成功案例

#### docs/community/

存放贡献者社区相关内容

#### docs/en/ 和 docs/zh-HK/

多语言版本内容，结构与主目录相同

### 添加新分类

如果需要添加新的文档分类：

1. 在 `docs/` 下创建新文件夹，如 `docs/hardware/`
2. 在文件夹内创建 `index.md` 作为入口
3. 在 `docs/.vitepress/config.ts` 的 `nav` 中添加链接：
   ```typescript
   nav: [
     { text: '硬件', link: '/hardware/' },
     // ...
   ]
   ```
4. 在 `sidebar` 中添加侧边栏配置：
   ```typescript
   sidebar: {
     '/hardware/': [
       {
         text: '硬件文档',
         items: [
           { text: '文档1', link: '/hardware/doc1' },
         ]
       }
     ]
   }
   ```

### 多语言内容管理

#### 添加新语言内容

1. 在 `docs/` 下创建文件夹，如 `docs/ja/` (日语)
2. 复制 `docs/tutorials/`、`docs/tech/` 的内容到新文件夹
3. 在 `docs/.vitepress/config.ts` 中添加配置

#### 现有语言

- 简体中文：`docs/` (根目录)
- English：`docs/en/`
- 繁体中文（香港）：`docs/zh-HK/`

### 部署说明

#### 自动部署

每次推送到 `main` 分支，GitHub Actions 会自动：

1. 构建网站
2. 部署到 GitHub Pages

#### 查看部署状态

进入仓库 → Actions → Deploy to GitHub Pages

#### 访问地址

`https://juxi-technology.github.io/wiki-documents/`

## 📦 构建与部署

### 构建

```bash
npm run docs:build
```

### 预览构建结果

```bash
npm run docs:preview
```

### 部署到 GitHub Pages

1. 推送代码到 GitHub
2. 在仓库设置中启用 GitHub Pages
3. 在 Settings > Pages 下：
   - Source: 选择 `GitHub Actions`
4. 每次推送到 `main` 会自动触发部署

## 🛠️ 技术栈

- [VitePress](https://vitepress.dev/) - 静态网站生成器
- [GitHub Pages](https://pages.github.com/) - 托管服务
- [GitHub Actions](https://github.com/features/actions) - 自动部署

## 🔧 常见问题

### 1. 本地执行错误

```bash
npm install
```

重新安装依赖。

### 2. 页面未更新

- 刷新浏览器（Ctrl+Shift+R 强制刷新）
- 重新启动开发服务器

### 3. 侧边栏未显示

检查 `docs/.vitepress/config.ts` 中的 `sidebar` 配置

### 4. 图片未显示

- 图片放在 `docs/public/` 目录
- 引用时用 `![图片说明](/图片名.png)`

## 🔗 联系我们

如有商业咨询、ODM 合作或技术支持，请联系我们：

- 🌐 官方网站：[https://www.juxitech.com](https://www.juxitech.com/)
- 💬 反馈建议：[pe@juxitech.com](mailto:pe@juxitech.com)
- 📧 商业合作：[sales@juxitech.com](mailto:sales@juxitech.com)
- 📺 B站：[JuxiTech Bilibili](https://space.bilibili.com/3546906737248821)
- 🛒 淘宝：[JuxiTech 淘宝](https://juxitechnology.taobao.com/)
