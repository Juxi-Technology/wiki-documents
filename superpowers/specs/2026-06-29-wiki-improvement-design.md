# Wiki 完善设计文档

**日期**: 2026-06-29  
**分支**: `improve-wiki`  
**参考项目**: [Seeed-Studio/wiki-documents](https://github.com/Seeed-Studio/wiki-documents)  
**目标**: 功能补全（搜索、评论、贡献指南）+ 视觉美化 + SEO/描述优化

---

## 1. 搜索功能

### 背景

`config.ts` 已配置 `search: { provider: 'local' }`，`package.json` 已有 `flexsearch` 依赖。但 `Layout.vue` 通过 `:deep(.VPNav) { display: none !important; }` 隐藏了默认导航栏，连带屏蔽了 VitePress 内置搜索框（弹窗、快捷键 `/` 均依赖 navbar 渲染）。

当前自定义 `<input>` 占位框（`Layout.vue:78-86`）无 JS 事件处理，纯装饰。

### 实现

**自研 VitePress 本地搜索集成**，用官方搜索后端直接实现 Vue 3 自定义 UI：

1. 删除 `Layout.vue` 中 `.search-container` 占位框
2. 导入 VitePress 的 `useSearch` composable，自行实现搜索弹窗 UI
3. 注册 `/` 快捷键唤起搜索
4. 三语搜索提示适配

**涉及文件**:
- `docs/.vitepress/theme/Layout.vue` — 替换搜索组件
- `docs/.vitepress/theme/style.css` — 搜索弹窗样式
- `docs/.vitepress/config.ts` — 补全搜索配置选项

---

## 2. Giscus 评论系统

### 背景

当前无任何页面反馈/评论功能。

### 实现

接入 [Giscus](https://giscus.app/)，由 GitHub Discussions API 驱动：
- 所有评论存储在仓库 Discussions 中，零后端成本
- 评论按页面路径自动分组
- 不同语言版本各自独立讨论

前置条件（已完成）:
- GitHub Discussions 已启用
- Giscus App 已安装并授权

**实现**:

新建 `docs/.vitepress/theme/components/PageComments.vue`：
- 从 `useData()` 获取当前页面路径作为 Discussion term
- 根据 `localeIndex` 设置 Giscus 语言
- 通过 frontmatter `comments: false` 可关闭单个页面评论
- 在 `Layout.vue` 的 `<VPLayout />` 下方插入该组件
- **注意**: Giscus repo/repoId/category/categoryId 由用户提供，实施时填入组件 props

**涉及文件**:
- `docs/.vitepress/theme/components/PageComments.vue` — 新建
- `docs/.vitepress/theme/Layout.vue` — 引入组件
- `docs/.vitepress/theme/style.css` — 容器样式

---

## 3. 社区贡献指南

### 背景

`docs/community/` 仅有首页占位，无贡献流程说明。无 PR 模板。

### 实现

**新建贡献指南页面** `docs/community/contributing.md`：

```
# 贡献指南
## 1. 准备工作 — Fork + 本地构建
## 2. 贡献方式 — 修正错误 / 新增教程 / 翻译
## 3. 内容规范 — 图片路径、命名、教程结构
## 4. PR 流程 — 模板填写、CI、Review
```

在 `config.ts` 三语侧边栏中分别为 `community` 分组添加"贡献指南"入口。

**新建 PR 模板** `.github/PULL_REQUEST_TEMPLATE.md`：
- 变更描述
- 关联 Issue
- 截图（如有 UI 变更）
- 环境信息

**涉及文件**:
- `docs/community/contributing.md` — 新建
- `.github/PULL_REQUEST_TEMPLATE.md` — 新建
- `docs/.vitepress/config.ts` — 侧边栏新增入口（三语）

---

## 4. SEO 元标签优化

### 背景

`config.ts` 的 `head` 仅有一行百度验证标签，缺失：
- Open Graph（社交预览）标签
- Twitter Card
- 描述元标签
- Canonical URL

### 实现

在 `config.ts` 中补全元标签：

**全局 head**（所有 locale 共享）:
```ts
head: [
  ['meta', { name: 'baidu-site-verification', content: 'codeva-Lzl2d4xzcv' }],
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:image', content: 'https://juxi-technology.github.io/wiki-documents/images/logos/logo-black.png' }],
  ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ['link', { rel: 'canonical', href: 'https://juxi-technology.github.io/wiki-documents/' }]
]
```

**各 locale 独立 head**（描述 + OG title）:
- `root`: 钜犀科技 Wiki - 产品教程与文档中心
- `en`: Juxi Technology Wiki - Product Tutorials and Documentation
- `zh-HK`: 鉅犀科技 Wiki - 產品教程與文檔中心

**README 优化**（三语）:
- 精炼首段 Tagline
- 补 Wiki 链接、构建状态徽章
- 三语 README 互相链接

**涉及文件**:
- `docs/.vitepress/config.ts`
- `README.md`
- `README_zh.md`
- `README_zh-HK.md`

---

## 5. 视觉美化

### 背景

- 首页 Hero 纯文字无视觉层次，按钮蓝色未体现品牌深蓝色调
- 卡片 `object-fit: cover` 裁切、无暗色模式适配
- 侧边栏硬编码白色背景 `!important`
- 排版沿用 VitePress 默认字体栈

### 实现

**5.1 首页重设计**（`docs/index.md`）:
- Hero 区增加副标题 + 描述段落，信息层次清晰
- 按钮改用品牌深蓝色
- 卡片 border 改用 `var(--vp-c-gutter)` 适配暗色
- 暗色模式下卡片背景色适配

**5.2 导航栏微调**（`Layout.vue`）:
- Logo 区添加图片 + 文字组合（非纯文字）
- 整体高度调整为更紧凑的视觉比例

**5.3 品牌色系完善**（`style.css`）:
- 补充辅助色变量
- 按钮、链接统一使用品牌 CSS 变量

**5.4 侧边栏样式修复**（`style.css`）:
- 移除硬编码 `white !important`
- 改用 VitePress CSS 变量驱动
- 分组间距增加呼吸感

**涉及文件**:
- `docs/index.md`
- `docs/.vitepress/theme/Layout.vue`
- `docs/.vitepress/theme/style.css`

---

## 文件变更总览

| 文件 | 操作 | 对应模块 |
|------|------|---------|
| `docs/.vitepress/config.ts` | 修改 | 搜索、SEO、侧边栏 |
| `docs/.vitepress/theme/Layout.vue` | 修改 | 搜索、评论、美化 |
| `docs/.vitepress/theme/style.css` | 修改 | 搜索、评论、美化 |
| `docs/.vitepress/theme/components/SearchModal.vue` | 新建 | 搜索 |
| `docs/.vitepress/theme/components/PageComments.vue` | 新建 | 评论 |
| `docs/community/contributing.md` | 新建 | 贡献指南 |
| `.github/PULL_REQUEST_TEMPLATE.md` | 新建 | 贡献指南 |
| `docs/index.md` | 修改 | 美化 |
| `docs/en/index.md` | 修改 | 美化（英文首页同步） |
| `docs/zh-HK/index.md` | 修改 | 美化（繁体首页同步） |
| `README.md` | 修改 | SEO/描述 |
| `README_zh.md` | 修改 | SEO/描述 |
| `README_zh-HK.md` | 修改 | SEO/描述 |

---

## 验收标准

1. **搜索**: 在任意页面按 `/` 唤起搜索弹窗，输入关键词返回结果
2. **评论**: 教程页面底部出现 Giscus 评论区，可发表评论
3. **贡献指南**: `/community/contributing` 页面可访问，侧边栏有入口
4. **SEO**: 构建后 HTML 包含正确的 `og:*` 和 `meta description` 标签
5. **美化**: 首页 Hero 按钮为品牌深蓝色，暗色模式下卡片无白框扎眼

## 不做

- 不迁移到 Docusaurus
- 不手写后端评论系统
- 不照搬 Seeed Contributor Hero Wall（社区规模未到）
- 不对现有教程内容做结构重组
