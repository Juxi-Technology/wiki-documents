
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useData, withBase } from 'vitepress'

const { localeIndex } = useData()
const router = useRoute()

const shopUrl = computed(() => {
  const isChinese = localeIndex.value === 'root' || localeIndex.value === 'zh-TW'
  return isChinese ? 'https://juxitechnology.taobao.com/' : 'https://www.juxitech.com'
})

const shopText = computed(() => {
  const isChinese = localeIndex.value === 'root' || localeIndex.value === 'zh-TW'
  return isChinese ? '商店' : 'Shop'
})

const langOptions = [
  { code: 'zh-CN', name: 'CN 简体中文', path: withBase('/'), isActive: () => localeIndex.value === 'root' },
  { code: 'en', name: 'EN English', path: withBase('/en/'), isActive: () => localeIndex.value === 'en' },
  { code: 'zh-TW', name: '繁體中文', path: withBase('/zh-TW/'), isActive: () => localeIndex.value === 'zh-TW' }
]

const showLangDropdown = ref(false)

const currentLangName = computed(() => {
  const active = langOptions.find(opt => opt.isActive())
  return active ? active.name : 'CN 简体中文'
})

function switchLang(path: string) {
  router.go(path)
  showLangDropdown.value = false
}

onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    if (showLangDropdown.value && !target.closest('.lang-selector-wrapper')) {
      showLangDropdown.value = false
    }
  })
})
</script>

<template>
  <div class="nav-extra">
    <!-- Language Selector -->
    <div class="lang-selector-wrapper" @click.stop>
      <button class="lang-selector-btn" @click="showLangDropdown = !showLangDropdown">
        {{ currentLangName }}
        <span class="arrow">▼</span>
      </button>
      <div v-if="showLangDropdown" class="lang-dropdown">
        <a 
          v-for="opt in langOptions" 
          :key="opt.code" 
          :href="opt.path" 
          class="lang-option"
          @click.prevent="switchLang(opt.path)"
        >
          {{ opt.name }}
        </a>
      </div>
    </div>

    <!-- Shop -->
    <a :href="shopUrl" target="_blank" class="shop-link">
      {{ shopText }}
    </a>
  </div>
</template>

<style scoped>
.nav-extra {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 8px;
}

.lang-selector-wrapper {
  position: relative;
}

.lang-selector-btn {
  background: none;
  border: none;
  color: var(--vp-c-text-1);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.lang-selector-btn:hover {
  color: var(--vp-c-brand);
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  z-index: 1000;
}

.lang-option {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
}

.lang-option:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
}

.shop-link {
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s;
}

.shop-link:hover {
  color: var(--vp-c-brand);
}

.arrow {
  font-size: 10px;
}
</style>
