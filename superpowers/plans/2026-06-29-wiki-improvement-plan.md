# Wiki 完善实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 参考 Seeed Studio wiki-documents，为钜犀科技 Wiki 补全搜索、评论、贡献指南、SEO 元标签，并美化首页和整体视觉。

**Architecture:** 保持 VitePress 1.4 + Vue 3 不动。搜索基于 flexsearch（已安装）+ VitePress `usePages()` API 自建搜素弹窗；评论接入 Giscus（GitHub Discussions 驱动）；SEO 在 `config.ts` 中补全 head 元标签；视觉通过 CSS 变量和 Vue SFC 样式升级。

**Tech Stack:** VitePress 1.4, Vue 3.4, flexsearch 0.8, Giscus, GitHub Pages

---

## 文件结构

| 文件 | 操作 | 职责 |
|------|------|------|
| `docs/.vitepress/config.ts` | 修改 | 搜索配置选项 + SEO 元标签 + 侧边栏贡献指南入口 |
| `docs/.vitepress/theme/Layout.vue` | 修改 | 替换搜索组件 + 引入 PageComments + 导航栏微调 |
| `docs/.vitepress/theme/style.css` | 修改 | 搜索弹窗样式 + Giscus 容器 + 品牌色完善 + 侧边栏修复 |
| `docs/.vitepress/theme/components/SearchModal.vue` | 新建 | 自定义搜索弹窗（flexsearch + usePages） |
| `docs/.vitepress/theme/components/PageComments.vue` | 新建 | Giscus 评论组件 |
| `docs/community/contributing.md` | 新建 | 三语贡献指南页面 |
| `.github/PULL_REQUEST_TEMPLATE.md` | 新建 | PR 模板 |
| `docs/index.md` | 修改 | 简体中文首页美化 |
| `docs/en/index.md` | 修改 | 英文首页美化 |
| `docs/zh-HK/index.md` | 修改 | 繁体中文首页美化 |
| `README.md` | 修改 | 英文 README 描述优化 |
| `README_zh.md` | 修改 | 简体中文 README 描述优化 |
| `README_zh-HK.md` | 修改 | 繁体中文 README 描述优化 |

---

### Task 1: 创建搜索弹窗组件 SearchModal.vue

**Files:**
- Create: `docs/.vitepress/theme/components/SearchModal.vue`

- [ ] **Step 1: 创建 SearchModal.vue**

```vue
<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { usePages, useData, withBase } from 'vitepress'
import FlexSearch from 'flexsearch'

const { localeIndex } = useData()
const pages = usePages()
const showModal = ref(false)
const query = ref('')
const selectedIndex = ref(0)
const results = ref([])
const inputRef = ref(null)

// 创建 flexsearch 索引
let index = null

function buildIndex() {
  index = new FlexSearch.Document({
    document: {
      id: 'id',
      index: ['title', 'text'],
      store: ['title', 'path']
    },
    tokenize: 'forward',
    charset: 'latin:extra'
  })

  pages.forEach((page, i) => {
    // 只索引当前 locale 的页面
    const currentLocale = localeIndex.value === 'root' ? '/' : `/${localeIndex.value}/`
    if (page.path.startsWith(currentLocale) || (localeIndex.value === 'root' && !page.path.startsWith('/en/') && !page.path.startsWith('/zh-HK/'))) {
      index.add({
        id: i,
        title: page.title || page.frontmatter?.title || '',
        text: page.frontmatter?.description || '',
        path: page.path
      })
    }
  })
}

onMounted(() => {
  buildIndex()
})

// 监听 locale 变化重建索引
watch(localeIndex, () => {
  buildIndex()
})

watch(query, () => {
  selectedIndex.value = 0
  if (!query.value.trim() || !index) {
    results.value = []
    return
  }
  const searchResults = index.search(query.value, { limit: 10, enrich: true })
  if (searchResults.length > 0) {
    results.value = searchResults[0].result.map(r => ({
      id: r.id,
      title: r.doc.title,
      path: r.doc.path
    }))
  } else {
    results.value = []
  }
})

function openSearch() {
  showModal.value = true
  query.value = ''
  results.value = []
  selectedIndex.value = 0
  // 等 DOM 更新后自动聚焦
  setTimeout(() => {
    inputRef.value?.focus()
  }, 50)
}

function closeSearch() {
  showModal.value = false
  query.value = ''
  results.value = []
}

function onKeyDown(e) {
  if (!showModal.value) return
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (results.value[selectedIndex.value]) {
      window.location.href = withBase(results.value[selectedIndex.value].path)
      closeSearch()
    }
  } else if (e.key === 'Escape') {
    closeSearch()
  }
}

// 全局快捷键 /
function onGlobalKeydown(e) {
  if (e.key === '/' && !showModal.value && !isEditing(e.target)) {
    e.preventDefault()
    openSearch()
  }
}

function isEditing(target) {
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

onMounted(() => {
  document.addEventListener('keydown', onGlobalKeydown)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onGlobalKeydown)
})

const placeholder = computed(() => {
  if (localeIndex.value === 'en') return 'Search docs...'
  if (localeIndex.value === 'zh-HK') return '搜尋文件...'
  return '搜索文档...'
})
</script>

<template>
  <!-- 导航栏搜索按钮 -->
  <div class="search-trigger" @click="openSearch" title="Search (/)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="6" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
    <span class="search-hint">/</span>
  </div>

  <!-- 搜索弹窗遮罩 -->
  <Teleport to="body">
    <div v-if="showModal" class="search-overlay" @click.self="closeSearch">
      <div class="search-modal" @keydown="onKeyDown">
        <div class="search-input-wrapper">
          <svg class="search-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="6" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            :placeholder="placeholder"
            class="search-modal-input"
          />
          <button class="search-close-btn" @click="closeSearch">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div class="search-results" v-if="results.length > 0">
          <a
            v-for="(result, i) in results"
            :key="result.id"
            :href="withBase(result.path)"
            :class="['search-result', { selected: i === selectedIndex }]"
            @click="closeSearch"
          >
            <span class="result-title">{{ result.title || result.path }}</span>
            <span class="result-path">{{ result.path }}</span>
          </a>
        </div>
        <div class="search-empty" v-else-if="query">
          无匹配结果
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.search-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
  min-width: 160px;
  justify-content: space-between;
}

.search-trigger:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-text-1);
}

.search-hint {
  font-size: 12px;
  padding: 2px 6px;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 4px;
  color: var(--vp-c-text-3);
}

.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  padding-top: 15vh;
}

.search-modal {
  width: 560px;
  max-height: 70vh;
  background: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--vp-c-gutter);
}

.search-input-icon {
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.search-modal-input {
  flex: 1;
  border: none;
  outline: none;
  background: none;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.search-modal-input::placeholder {
  color: var(--vp-c-text-3);
}

.search-close-btn {
  border: none;
  background: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
}

.search-close-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.search-results {
  overflow-y: auto;
  padding: 8px;
}

.search-result {
  display: flex;
  flex-direction: column;
  padding: 10px 12px;
  border-radius: 6px;
  text-decoration: none;
  color: inherit;
  transition: background 0.15s;
}

.search-result:hover,
.search-result.selected {
  background: var(--vp-c-brand-soft);
}

.result-title {
  font-weight: 500;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.result-path {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 2px;
}

.search-empty {
  padding: 32px 16px;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 14px;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/theme/components/SearchModal.vue
git commit -m "feat: 添加自定义搜索弹窗 SearchModal 组件

基于 flexsearch + usePages() API，支持 / 快捷键唤起、键盘导航、
三语搜索提示适配。

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 2: 将搜索组件集成到 Layout.vue

**Files:**
- Modify: `docs/.vitepress/theme/Layout.vue`

- [ ] **Step 1: 在 Layout.vue 中导入 SearchModal 并替换占位框**

在 `<script setup>` 顶部添加 import：

```typescript
import SearchModal from './components/SearchModal.vue'
```

- [ ] **Step 2: 替换导航栏中的搜索占位框**

删除 `Layout.vue:78-86` 的 `.search-container`：

```html
<!-- 删除这整个 div -->
<div class="search-container">
  <input type="text" :placeholder="isEnglish ? 'Search...' : '搜索文档...'" class="search-input" />
  <button class="search-icon">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="6" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  </button>
</div>
```

替换为：

```html
<SearchModal />
```

- [ ] **Step 3: 删除 style.css 中旧的搜索占位框样式**

删除 `Layout.vue` 中 `<style scoped>` 里的 `.search-container`、`.search-input`、`.search-input::placeholder`、`.search-icon`、`.search-icon:hover` 样式块（原第 205-249 行）。

- [ ] **Step 4: Commit**

```bash
git add docs/.vitepress/theme/Layout.vue
git commit -m "feat: 集成 SearchModal 替代搜索占位框

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3: 创建 Giscus 评论组件 PageComments.vue

**Files:**
- Create: `docs/.vitepress/theme/components/PageComments.vue`

- [ ] **Step 1: 创建 PageComments.vue**

```vue
<script setup>
import { computed, ref, onMounted } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter, localeIndex, isDark } = useData()

// 由用户提供：Giscus 配置
const GISCUS_REPO = 'Juxi-Technology/wiki-documents'
# repo-id 和 category-id 需从 Giscus 配置页面获取后填入
# 访问 https://giscus.app 填入你的仓库名获取
const GISCUS_REPO_ID = 'YOUR_REPO_ID'
const GISCUS_CATEGORY_ID = 'YOUR_CATEGORY_ID'

const showComments = computed(() => {
  // 首页和社区首页关闭评论
  if (frontmatter.value.comments === false) return false
  return true
})

const giscusLang = computed(() => {
  if (localeIndex.value === 'zh-HK') return 'zh-TW'
  if (localeIndex.value === 'root') return 'zh-CN'
  return 'en'
})

const giscusTheme = computed(() => {
  return isDark.value ? 'dark_dimmed' : 'light'
})

const pageTerm = computed(() => {
  return page.value.relativePath
})

function loadGiscus() {
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', GISCUS_REPO)
  script.setAttribute('data-repo-id', GISCUS_REPO_ID)
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-category-id', GISCUS_CATEGORY_ID)
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-theme', giscusTheme.value)
  script.setAttribute('data-lang', giscusLang.value)
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  const container = document.getElementById('giscus-container')
  if (container && !container.hasChildNodes()) {
    container.appendChild(script)
  }
}

onMounted(() => {
  if (showComments.value) {
    loadGiscus()
  }
})
</script>

<template>
  <div v-if="showComments" class="page-comments">
    <h3 class="comments-heading">💬 讨论与反馈</h3>
    <div id="giscus-container"></div>
  </div>
</template>

<style scoped>
.page-comments {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-gutter);
}

.comments-heading {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--vp-c-text-1);
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/theme/components/PageComments.vue
git commit -m "feat: 添加 Giscus 评论组件 PageComments

支持三语（zh-CN/en/zh-TW）、暗色模式同步、通过 frontmatter comments:false 关闭。

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 4: 将 PageComments 集成到 Layout.vue

**Files:**
- Modify: `docs/.vitepress/theme/Layout.vue`

- [ ] **Step 1: 导入 PageComments**

在 `<script setup>` 顶部添加：

```typescript
import PageComments from './components/PageComments.vue'
```

- [ ] **Step 2: 在 VPLayout 下方插入评论组件**

在 `<VPLayout />` 后添加：

```html
<VPLayout />
<PageComments />
```

- [ ] **Step 3: Commit**

```bash
git add docs/.vitepress/theme/Layout.vue
git commit -m "feat: 在布局中集成 PageComments 评论组件

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 5: 创建贡献指南页面

**Files:**
- Create: `docs/community/contributing.md`

- [ ] **Step 1: 创建 contributing.md**

```markdown
---
title: 贡献指南
description: 如何为钜犀科技 Wiki 贡献内容
---

# 贡献指南

感谢你考虑为钜犀科技 Wiki 做贡献！本文档将引导你完成贡献流程。

## 准备工作

1. **Fork** [wiki-documents 仓库](https://github.com/Juxi-Technology/wiki-documents)
2. 克隆你的 Fork 到本地
3. 安装依赖：

```bash
cd wiki-documents
npm ci
```

4. 启动本地开发服务器预览：

```bash
npm run docs:dev
```

浏览器访问 `http://localhost:5173` 即可预览你的修改。

## 贡献方式

### 修正文档错误

发现错别字、错误链接、过时信息？直接提交 Pull Request 到 `main` 分支。

### 新增教程

如果你有使用钜犀科技产品的教程想要分享：

1. 先在 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues) 中提一个 Proposal，说明教程主题和大致内容
2. 待维护者确认后，参照现有教程结构编写
3. 提交 PR

### 翻译贡献

项目支持三语：简体中文 (root)、English (`/en/`)、繁體中文 (`/zh-HK/`)。翻译遵循以下规则：

- 每个 `.md` 文件在三语目录中应有对应文件
- 图片共用 `docs/public/images/` 下的资源
- 保持各语言版本的链接指向对应语言路径

## 内容规范

### 图片

- 存放路径：`docs/public/images/tutorials/{产品名}/{教程名}/`
- 命名规则：按序号或描述性命名（如 `1.png`，`wiring-diagram.png`）
- 在教程中使用相对路径引用：

```markdown
![描述](../../../../public/images/tutorials/xxx/xxx.png)
```

### 文件命名

- 教程文件使用英文命名，kebab-case 风格
- 每个 `.md` 文件需要有 `title` 和 `description` frontmatter

### 代码块

- 必须标注语言类型
- 确保命令可正确运行

## PR 流程

1. 确保本地构建通过：`npm run docs:build`
2. 填写 Pull Request 模板中的所有内容
3. CI 构建通过后，至少 1 位维护者批准方可合并
4. PR 合并后，GitHub Actions 自动部署到线上

## 行为准则

- 尊重所有贡献者和用户
- 提供客观、准确的技术内容
- 不提交未经测试的代码或命令

感谢你的贡献！🎉
```

- [ ] **Step 2: Commit**

```bash
git add docs/community/contributing.md
git commit -m "docs: 添加贡献指南页面

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 6: 创建 Pull Request 模板

**Files:**
- Create: `.github/PULL_REQUEST_TEMPLATE.md`

- [ ] **Step 1: 创建 .github/PULL_REQUEST_TEMPLATE.md**

```markdown
## 变更描述

<!-- 请清晰描述这个 PR 做了什么，为什么需要做 -->

## 关联 Issue

<!-- 如果有关联 Issue，请在此处链接：Fixes #123 -->

## 变更类型

- [ ] 文档修正（错别字、链接修复等）
- [ ] 新增教程 / 内容
- [ ] 功能改进
- [ ] 翻译更新
- [ ] 其他

## 截图

<!-- 如果有 UI 变更，请贴截图 -->

## 测试

- [ ] 本地构建通过 (`npm run docs:build`)
- [ ] 本地预览无异常 (`npm run docs:preview`)

## 环境信息

<!-- 如果本 PR 由 AI 辅助生成，请注明使用的模型和工具 -->
- [ ] 本 PR 由人工手写，无 AI 辅助
- [ ] 本 PR 使用了 AI 辅助（模型：______，工具：______）

## 额外说明

<!-- 任何 Reviewer 需要了解的额外信息 -->
```

- [ ] **Step 2: Commit**

```bash
git add .github/PULL_REQUEST_TEMPLATE.md
git commit -m "docs: 添加 Pull Request 模板

参考 Seeed Studio wiki-documents 的 PR 模板格式，适配本项目的 三语文档特点。

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 7: 更新侧边栏添加贡献指南入口（三语）

**Files:**
- Modify: `docs/.vitepress/config.ts`

- [ ] **Step 1: 在简体中文侧边栏 community 分组中添加贡献指南**

在 `config.ts` 简体中文 `sidebar` 的 `/community/` 部分（约第 221-230 行），在已有 `{ text: '社区首页', link: '/community/' }` 后添加：

```typescript
{ text: '贡献指南', link: '/community/contributing' }
```

同理，在英文 sidear 的 `/en/community/` 部分添加：

```typescript
{ text: 'Contributing Guide', link: '/en/community/contributing' }
```

在繁体中文 sidebar 的 `/zh-HK/community/` 部分添加：

```typescript
{ text: '貢獻指南', link: '/zh-HK/community/contributing' }
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/config.ts
git commit -m "docs: 侧边栏添加贡献指南入口（三语）

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 8: 补全 SEO 元标签

**Files:**
- Modify: `docs/.vitepress/config.ts`

- [ ] **Step 1: 更新全局 head**

将 `config.ts` 顶层的 `head` 数组从：

```typescript
head: [
  ['meta', { name: 'baidu-site-verification', content: 'codeva-Lzl2d4xzcv' }]
],
```

改为：

```typescript
head: [
  ['meta', { name: 'baidu-site-verification', content: 'codeva-Lzl2d4xzcv' }],
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:image', content: 'https://juxi-technology.github.io/wiki-documents/images/logos/logo-black.png' }],
  ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ['link', { rel: 'canonical', href: 'https://juxi-technology.github.io/wiki-documents/' }],
  ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ['meta', { name: 'robots', content: 'index, follow' }],
],
```

- [ ] **Step 2: 在 root locale 添加 OG title/description**

在 root locale 的 `head`（新建字段）：

```typescript
root: {
  label: '简体中文',
  lang: 'zh-CN',
  description: '钜犀科技产品教程与文档中心',
  head: [
    ['meta', { property: 'og:title', content: '钜犀科技 Wiki - 产品教程与文档中心' }],
    ['meta', { property: 'og:description', content: '钜犀科技 Wiki，涵盖机器人机械臂、传感器、配件等完整产品教程与技术文档。从 SO-ARM101 到 IMU 惯导模块，为机器人与 AI 硬件开发者提供全流程指南。' }],
    ['meta', { name: 'description', content: '钜犀科技 Wiki，涵盖机器人机械臂、传感器、配件等完整产品教程与技术文档。' }],
  ],
```

- [ ] **Step 3: 在 en locale 添加 OG title/description**

```typescript
en: {
  label: 'English',
  lang: 'en',
  description: 'Juxi Technology Product Tutorials and Documentation Center',
  head: [
    ['meta', { property: 'og:title', content: 'Juxi Technology Wiki - Product Tutorials & Documentation' }],
    ['meta', { property: 'og:description', content: 'Juxi Technology Wiki — comprehensive tutorials and docs for robot arms, sensors, and accessories. From SO-ARM101 to IMU modules, a complete guide for robotics and AI hardware developers.' }],
    ['meta', { name: 'description', content: 'Juxi Technology Wiki — comprehensive tutorials and docs for robot arms, sensors, and accessories.' }],
  ],
```

- [ ] **Step 4: 在 zh-HK locale 添加 OG title/description**

```typescript
'zh-HK': {
  label: '繁體中文',
  lang: 'zh-HK',
  description: '鉅犀科技產品教程與文檔中心',
  head: [
    ['meta', { property: 'og:title', content: '鉅犀科技 Wiki - 產品教程與文檔中心' }],
    ['meta', { property: 'og:description', content: '鉅犀科技 Wiki，涵蓋機器人機械臂、傳感器、配件等完整產品教程與技術文檔。從 SO-ARM101 到 IMU 慣導模組，為機器人與 AI 硬件開發者提供全流程指南。' }],
    ['meta', { name: 'description', content: '鉅犀科技 Wiki，涵蓋機器人機械臂、傳感器、配件等完整產品教程與技術文檔。' }],
  ],
```

- [ ] **Step 5: Commit**

```bash
git add docs/.vitepress/config.ts
git commit -m "feat: 补全 SEO 元标签（OG/Twitter/description/canonical）

三语各自独立 OG title 和 description。

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 9: 视觉美化 — 首页 Hero 升级（三语）

**Files:**
- Modify: `docs/index.md`（简体中文首页）
- Modify: `docs/en/index.md`（英文首页）
- Modify: `docs/zh-HK/index.md`（繁体中文首页）

- [ ] **Step 1: 简体中文首页 Hero 升级**

将 `docs/index.md` 中第 1-16 行替换为：

```markdown
---
title: 钜犀科技 Wiki
description: 钜犀科技产品教程与文档中心
sidebar: false
outline: false
---

<div class="hero-section">

![logo](/images/logos/logo-black.png)

# 钜犀科技 Wiki

<p class="hero-subtitle">机器人与 AI 硬件的开放文档平台</p>
<p class="hero-desc">从机械臂到传感器，助你搭建智能机器人系统</p>

<div class="hero-links">
  <a href="/tutorials/" class="hero-btn primary">🚀 快速开始</a>
  <a href="/tutorials/" class="hero-btn secondary">📚 浏览教程</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank" class="hero-btn secondary">⭐ GitHub</a>
</div>

</div>

<style>
.hero-section {
  text-align: center;
  padding: 64px 24px 48px;
}

.hero-section img {
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
}

.hero-subtitle {
  font-size: 22px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 16px 0 8px;
}

.hero-desc {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin-bottom: 32px;
}

.hero-links {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  transition: all 0.2s;
}

.hero-btn.primary {
  background-color: #1e3a5f;
  color: #ffffff;
}

.hero-btn.primary:hover {
  background-color: #152a45;
}

.hero-btn.secondary {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-gutter);
}

.hero-btn.secondary:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin: 32px 0 64px 0;
}

.card {
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  display: block;
  background: var(--vp-c-bg-soft);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand);
}

.card img {
  width: 100%;
  height: 160px;
  object-fit: contain;
  padding: 16px;
  background: var(--vp-c-bg);
}

.card span {
  display: block;
  padding: 12px 16px 16px;
  font-weight: 500;
  font-size: 14px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin: 32px 0 64px 0;
}

.category-card {
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  display: block;
  background: var(--vp-c-bg-soft);
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand);
}

.category-card img {
  width: 100%;
  height: 140px;
  object-fit: contain;
  padding: 16px;
  background: var(--vp-c-bg);
}

.category-card span {
  display: block;
  padding: 12px 16px 16px;
  font-weight: 600;
  font-size: 14px;
}

.vp-doc h2 {
  margin-top: 64px;
  text-align: center;
}

.vp-doc h1 {
  display: none;
}
</style>
```

**注意：** 首页下方的 `## 最新文档` 和 `## 浏览分类` 等原有内容段保留不动，只需替换 Hero 部分和 `<style>` 块。保留原有的 `## 更多信息` 部分。

- [ ] **Step 2: 英文首页 Hero 升级**

同样修改 `docs/en/index.md`，替换 Hero + style 块，内容翻译为英文：

```markdown
<p class="hero-subtitle">Open Documentation Platform for Robotics & AI Hardware</p>
<p class="hero-desc">From robot arms to sensors — build your intelligent robotic system</p>
```

```html
<a href="/en/tutorials/" class="hero-btn primary">🚀 Get Started</a>
<a href="/en/tutorials/" class="hero-btn secondary">📚 Tutorials</a>
<a href="https://github.com/Juxi-Technology/" target="_blank" class="hero-btn secondary">⭐ GitHub</a>
```

（完整内容参照简体中文版，仅翻译文本）

- [ ] **Step 3: 繁体中文首页 Hero 升级**

修改 `docs/zh-HK/index.md`，同样替换 Hero + style 块，内容翻译：

```markdown
<p class="hero-subtitle">機器人與 AI 硬體的開放文檔平台</p>
<p class="hero-desc">從機械臂到傳感器，助你搭建智能機器人系統</p>
```

```html
<a href="/zh-HK/tutorials/" class="hero-btn primary">🚀 快速開始</a>
<a href="/zh-HK/tutorials/" class="hero-btn secondary">📚 瀏覽教程</a>
<a href="https://github.com/Juxi-Technology/" target="_blank" class="hero-btn secondary">⭐ GitHub</a>
```

- [ ] **Step 4: Commit**

```bash
git add docs/index.md docs/en/index.md docs/zh-HK/index.md
git commit -m "feat: 三语首页 Hero 视觉升级

- Hero 区增加 Logo + 副标题 + 描述段落
- 按钮改为品牌深蓝色（primary）+ 边框风格（secondary）
- 卡片改用 CSS 变量适配暗色模式
- 卡片图片 object-fit: contain 避免裁切

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 10: 导航栏视觉微调

**Files:**
- Modify: `docs/.vitepress/theme/Layout.vue`

- [ ] **Step 1: Logo 区添加图片 + 文字组合**

在 Layout.vue 的模板中，将第 57-60 行 logo 链接改为：

```html
<a :href="withBase('/')" class="logo">
  <img :src="withBase('/images/logos/logo-black.png')" alt="Logo" class="logo-img" />
  <span v-if="isZhCN || isZhTW">钜犀科技</span>
  <span v-else>Juxi Technology</span>
</a>
```

- [ ] **Step 2: 调整导航栏高度和 logo 样式**

在 `<style scoped>` 中，修改 `.logo` 样式并新增 `.logo-img`：

```css
.logo {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-img {
  width: 36px;
  height: 36px;
}
```

修改 `.nav-inner` height（原第 159 行）：

```css
.nav-inner {
  max-width: var(--vp-max-width);
  height: 56px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

- [ ] **Step 3: Commit**

```bash
git add docs/.vitepress/theme/Layout.vue
git commit -m "feat: 导航栏添加 Logo 图标 + 高度微调

- Logo 区增加图片 + 文字组合
- 导航栏高度从 64px 调整到 56px

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 11: 品牌色系完善 + 侧边栏修复

**Files:**
- Modify: `docs/.vitepress/theme/style.css`

- [ ] **Step 1: 补全品牌辅助色变量**

在 `style.css` 的 `:root` 块中，在现有 `--vp-c-brand-darker` 后添加：

```css
--vp-c-brand-soft: rgba(16, 185, 129, 0.08);
--vp-c-brand-mute: rgba(16, 185, 129, 0.16);
```

- [ ] **Step 2: 修复侧边栏样式 — 移除硬编码白色**

将侧边栏的 `background-color: white !important;` 替换为 CSS 变量。删除原有的 VPSidebar 系列 `!important` 样式（原第 30-40 行），替换为：

```css
/* 侧边栏使用 VitePress CSS 变量驱动 */
.VPSidebar {
  background-color: var(--vp-c-bg) !important;
}

.dark .VPSidebar {
  background-color: var(--vp-c-bg) !important;
}

/* 导航栏背景也使用变量 */
.VPNav {
  background-color: var(--vp-c-bg) !important;
}

.dark .VPNav {
  background-color: var(--vp-c-bg) !important;
}
```

- [ ] **Step 3: 增加侧边栏分组间距**

```css
/* 侧边栏分组间增加呼吸感 */
.VPSidebarGroup + .VPSidebarGroup {
  margin-top: 16px;
}

.VPSidebarItem .VPSidebarItem {
  margin: 2px 0;
}

.VPSidebarItem .text {
  line-height: 1.6;
}
```

- [ ] **Step 4: Commit**

```bash
git add docs/.vitepress/theme/style.css
git commit -m "feat: 品牌色系完善 + 侧边栏样式修复

- 补全 --vp-c-brand-soft/mute 辅助色
- 侧边栏改用 VitePress CSS 变量驱动
- 增加分组间距

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 12: 优化 README 文件（三语）

**Files:**
- Modify: `README.md`
- Modify: `README_zh.md`
- Modify: `README_zh-HK.md`

- [ ] **Step 1: 精炼 README.md（英文）**

将 `README.md` 更新为精炼版本：

```markdown
# Juxi Technology Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Open documentation platform for Juxi Technology's robotics and AI hardware products. Covers robot arms, sensors, accessories, and developer guides — from SO-ARM101 to IMU modules.

🌐 **[wiki.juxitech.com](https://juxi-technology.github.io/wiki-documents/)**

## Local Development

```bash
npm ci
npm run docs:dev   # http://localhost:5173
```

## Contributing

See [Contributing Guide](https://juxi-technology.github.io/wiki-documents/community/contributing) and [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md).

[简体中文](README_zh.md) | [繁體中文](README_zh-HK.md)
```

- [ ] **Step 2: 精炼 README_zh.md（简体中文）**

```markdown
# 钜犀科技 Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)

钜犀科技机器人与 AI 硬件产品的开放文档平台。涵盖机器人机械臂、传感器、配件及开发者指南。

🌐 **[wiki.juxitech.com](https://juxi-technology.github.io/wiki-documents/)**

## 本地开发

```bash
npm ci
npm run docs:dev   # http://localhost:5173
```

## 贡献

参见[贡献指南](https://juxi-technology.github.io/wiki-documents/community/contributing)和 [Pull Request 模板](.github/PULL_REQUEST_TEMPLATE.md)。

[English](README.md) | [繁體中文](README_zh-HK.md)
```

- [ ] **Step 3: 精炼 README_zh-HK.md（繁体中文）**

```markdown
# 鉅犀科技 Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)

鉅犀科技機器人與 AI 硬體產品的開放文檔平台。涵蓋機器人機械臂、傳感器、配件及開發者指南。

🌐 **[wiki.juxitech.com](https://juxi-technology.github.io/wiki-documents/)**

## 本地開發

```bash
npm ci
npm run docs:dev   # http://localhost:5173
```

## 貢獻

參見[貢獻指南](https://juxi-technology.github.io/wiki-documents/community/contributing)和 [Pull Request 模板](.github/PULL_REQUEST_TEMPLATE.md)。

[English](README.md) | [简体中文](README_zh.md)
```

- [ ] **Step 4: Commit**

```bash
git add README.md README_zh.md README_zh-HK.md
git commit -m "docs: 三语 README 精炼优化

- 补充构建状态徽章
- 精炼首段 Tagline
- 添加 Wiki 链接和 CONTRIBUTING 入口
- 三语 README 互相链接

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 13: 构建验证

- [ ] **Step 1: 安装依赖并构建**

```bash
npm ci
npm run docs:build
```

预期：构建成功，无错误退出。输出在 `docs/.vitepress/dist/`。

- [ ] **Step 2: 验证关键 HTML 输出**

检查构建产物是否包含 SEO 标签：

```bash
grep -r 'og:title' docs/.vitepress/dist/
grep -r 'giscus' docs/.vitepress/dist/
grep -r 'flexsearch\|search' docs/.vitepress/dist/
```

预期：输出中包含 og:title、giscus 脚本引用等。

- [ ] **Step 3: 验证搜索索引文件存在**

```bash
ls docs/.vitepress/dist/ | grep -i search
```

- [ ] **Step 4: 本地预览检查（手动）**

```bash
npm run docs:preview
```

访问 `http://localhost:4173`，手动检查：
- 首页 Hero 按钮为深蓝色
- 按 `/` 唤起搜索弹窗
- 任意教程页面底部出现评论区
- 侧边栏有"贡献指南"入口

- [ ] **Step 5: Commit（如有微调）**

```bash
git add -A
git commit -m "chore: 构建验证通过后的收尾微调

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## 实施顺序

```
Task 1 (SearchModal) ──→ Task 2 (Layout 集成搜索)
                    │
Task 3 (PageComments) ──→ Task 4 (Layout 集成评论)
                    │
Task 5 (贡献指南) + Task 6 (PR模板) ──→ Task 7 (侧边栏)
                    │
                    ├── Task 8 (SEO 元标签)
                    │
                    ├── Task 9 (首页美化) + Task 10 (导航栏) + Task 11 (style.css)
                    │
                    └── Task 12 (README 优化)
                    │
                    └── Task 13 (构建验证)
```

Task 1-4 可并行，Task 5-8 可并行，Task 9-12 可并行。Task 13 在最后串行运行。
