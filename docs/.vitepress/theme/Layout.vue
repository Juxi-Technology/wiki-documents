<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useData, withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
const { Layout: VPLayout } = DefaultTheme
const { isDark, toggleDark, localeIndex } = useData()

const isZhCN = computed(() => localeIndex.value === 'root')
const isZhTW = computed(() => localeIndex.value === 'zh-TW')
const isEnglish = computed(() => localeIndex.value === 'en')
const showLangMenu = ref(false)

const shopUrl = computed(() => {
  if (isZhCN.value) return 'https://juxitechnology.taobao.com/'
  return 'https://www.juxitech.com/'
})

const shopText = computed(() => {
  if (isEnglish.value) return 'Shop'
  return '商店'
})

const currentLangText = computed(() => {
  if (isEnglish.value) return 'EN'
  if (isZhTW.value) return '繁體'
  return '简体'
})

function switchLang(locale) {
  const newPath = locale === 'root' ? '/' : `/${locale}/`
  window.location.href = withBase(newPath)
  showLangMenu.value = false
}

function handleClickOutside(event) {
  const target = event.target
  if (!target.closest('.lang-selector-wrapper')) {
    showLangMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="custom-layout">
    <!-- 统一的顶部导航栏 -->
    <header class="custom-nav">
      <div class="nav-inner">
        <div class="nav-left">
          <a :href="withBase('/')" class="logo">
            <span v-if="isZhCN || isZhTW">钜犀科技</span>
            <span v-else>Juxi Technology</span>
          </a>
          <nav class="nav-links">
            <template v-if="isZhCN || isZhTW">
              <a :href="withBase('/tutorials/')" class="nav-link">
                {{ isZhTW ? '產品教程' : '产品教程' }}
              </a>
              <a :href="withBase('/topics/')" class="nav-link">
                {{ isZhTW ? '技術專題' : '技术专题' }}
              </a>
            </template>
            <template v-else>
              <a :href="withBase('/en/tutorials/')" class="nav-link">Tutorials</a>
              <a :href="withBase('/en/topics/')" class="nav-link">Topics</a>
            </template>
          </nav>
        </div>

        <div class="nav-right">
          <div class="search-container">
            <input type="text" :placeholder="isEnglish ? 'Search...' : '搜索文档...'" class="search-input" />
            <button class="search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="6" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </div>
          
          <div class="lang-selector-wrapper">
            <button class="lang-button" @click.stop="showLangMenu = !showLangMenu">
              {{ currentLangText }}
              <span class="arrow">▼</span>
            </button>
            <div v-if="showLangMenu" class="lang-dropdown">
              <a class="lang-option" @click.prevent="switchLang('root')">简体中文</a>
              <a class="lang-option" @click.prevent="switchLang('en')">English</a>
              <a class="lang-option" @click.prevent="switchLang('zh-TW')">繁體中文</a>
            </div>
          </div>

          <a :href="shopUrl" target="_blank" class="shop-link">{{ shopText }}</a>

          <a href="https://github.com/Juxi-Technology" target="_blank" class="nav-icon" title="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.576 9.576 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.939.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>

          <button class="nav-icon theme-btn" @click="toggleDark" title="Toggle theme">
            <svg v-if="isDark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- 下面是VitePress默认的布局内容 -->
    <div class="main-content">
      <VPLayout />
    </div>
  </div>
</template>

<style scoped>
.custom-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 隐藏默认导航栏，用我们自定义的 */
:deep(.VPNav) {
  display: none !important;
}

.custom-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-gutter);
  flex-shrink: 0;
}

.nav-inner {
  max-width: var(--vp-max-width);
  height: var(--vp-nav-height);
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-link {
  padding: 8px 14px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-link:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 8px;
  padding: 4px 8px;
  transition: all 0.2s;
}

.search-container:hover {
  border-color: var(--vp-c-brand);
}

.search-input {
  border: none;
  background: none;
  outline: none;
  color: var(--vp-c-text-1);
  font-size: 14px;
  width: 160px;
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.search-icon:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.lang-selector-wrapper {
  position: relative;
}

.lang-button {
  background: none;
  border: none;
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.2s;
}

.lang-button:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.arrow {
  font-size: 10px;
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  min-width: 140px;
  z-index: 1000;
}

.lang-option {
  display: block;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: none;
  color: var(--vp-c-text-1);
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.lang-option:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.shop-link {
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.2s;
}

.shop-link:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: var(--vp-c-text-1);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-icon:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.main-content {
  flex: 1;
}
</style>
