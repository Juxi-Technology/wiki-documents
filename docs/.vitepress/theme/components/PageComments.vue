<script setup>
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter, localeIndex, isDark } = useData()

// Giscus 配置:repo-id / category-id 需从 https://giscus.app 配置页面获取
// 填入真实值后评论区自动启用
const GISCUS_REPO = 'Juxi-Technology/wiki-documents'
const GISCUS_REPO_ID = 'REPO_ID_PLACEHOLDER'
const GISCUS_CATEGORY_ID = 'CATEGORY_ID_PLACEHOLDER'

// 占位符未配置时:整个组件零渲染,不加载 giscus 脚本
const isConfigured = computed(
  () => !GISCUS_REPO_ID.startsWith('REPO_ID_PLACEHOLDER') && !GISCUS_CATEGORY_ID.startsWith('CATEGORY_ID_PLACEHOLDER'),
)

const showComments = computed(() => {
  // frontmatter comments: false 可强制关闭
  if (frontmatter.value.comments === false) return false
  // 首页与各 section 首页默认关闭
  if (page.value.relativePath.endsWith('index.md')) return false
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

const giscusContainer = ref(null)

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

  if (giscusContainer.value && !giscusContainer.value.hasChildNodes()) {
    giscusContainer.value.appendChild(script)
  }
}

onMounted(() => {
  if (showComments.value && isConfigured.value) {
    loadGiscus()
  }
})
</script>

<template>
  <div v-if="showComments && isConfigured" class="page-comments">
    <h3 class="comments-heading">💬 讨论与反馈</h3>
    <div ref="giscusContainer"></div>
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
