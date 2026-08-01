<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
import FlexSearch from 'flexsearch'
import { data as searchData } from '../../search.data'

const { site, localeIndex } = useData()
const showModal = ref(false)
const query = ref('')
const selectedIndex = ref(0)
const results = ref([])
const inputRef = ref(null)

// 创建 flexsearch 索引
let index = null

// 去掉 base 前缀得到站点相对路径(如 /wiki-documents/ -> /)
function stripBase(url) {
  const base = site.value.base || '/'
  if (url.startsWith(base) && base !== '/') {
    return url.slice(base.length - 1) // 保留前导 /
  }
  return url
}

// 当前 locale 的页面过滤
function isInLocale(url) {
  const rel = stripBase(url)
  if (localeIndex.value === 'root') {
    return !rel.startsWith('/en/') && !rel.startsWith('/zh-HK/')
  }
  return rel.startsWith(`/${localeIndex.value}/`)
}

function buildIndex() {
  index = new FlexSearch.Document({
    document: {
      id: 'id',
      index: ['title', 'text'],
      store: ['title', 'path'],
    },
    tokenize: 'forward',
    charset: 'latin:extra',
  })

  searchData.forEach((page, i) => {
    if (isInLocale(page.url)) {
      index.add({
        id: i,
        title: page.title || '',
        text: page.description || '',
        path: page.url,
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
    results.value = searchResults[0].result.map((r) => ({
      id: r.id,
      title: r.doc.title,
      path: r.doc.path,
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
      window.location.href = results.value[selectedIndex.value].path
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

const noResultsText = computed(() => {
  if (localeIndex.value === 'en') return 'No results found'
  if (localeIndex.value === 'zh-HK') return '無匹配結果'
  return '无匹配结果'
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
            :href="result.path"
            :class="['search-result', { selected: i === selectedIndex }]"
            @click="closeSearch"
          >
            <span class="result-title">{{ result.title || result.path }}</span>
            <span class="result-path">{{ result.path }}</span>
          </a>
        </div>
        <div class="search-empty" v-else-if="query">
          {{ noResultsText }}
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
  min-width: 120px;
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
