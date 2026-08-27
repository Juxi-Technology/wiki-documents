<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, useRoute } from 'vitepress'

const { site } = useData()
const route = useRoute()
const open = ref(false)

const LANGS = [
  { code: '', label: 'English', text: 'English' },
  { code: '/zh-hans', label: '简体中文', text: '简体中文' },
  { code: '/zh-hant', label: '繁體中文', text: '繁體中文' },
  { code: '/ja', label: '日本語', text: '日本語' },
  { code: '/ko', label: '한국어', text: '한국어' },
  { code: '/de', label: 'Deutsch', text: 'Deutsch' },
  { code: '/fr', label: 'Français', text: 'Français' },
  { code: '/es', label: 'Español', text: 'Español' },
  { code: '/it', label: 'Italiano', text: 'Italiano' },
]

const current = computed(() => {
  const path = route.path
  const matched = LANGS.filter((l) => l.code && path.startsWith(l.code + '/'))
  if (matched.length) return matched[0]
  return LANGS[0] // 无前缀 = English root
})

function switchTo(code: string) {
  const base = (site.value.base || '/').replace(/\/$/, '')
  const rest = route.path.replace(/^\/(zh-hans|zh-hant|ja|ko|de|fr|es|it)(?=\/|$)/, '')
  // 强校验:用 URL 构造并断言同源(防 Open Redirect/协议相对跳转)
  try {
    if (rest !== '' && (!rest.startsWith('/') || rest.startsWith('//'))) return
    const dest = new URL((code || '') + (rest || '/'), window.location.origin + base + '/')
    if (dest.origin !== window.location.origin) return
    window.location.href = dest.pathname + dest.search + dest.hash
  } catch {
    return
  }
}
</script>

<template>
  <div class="lang-switcher" @mouseleave="open = false">
    <button class="lang-btn" aria-label="切换语言 / Switch Language" @click="open = !open">
      <span class="lang-globe">🌐</span>
      <span class="lang-current">{{ current.text }}</span>
      <span class="lang-arrow">▾</span>
    </button>
    <transition name="lang-fade">
      <div v-if="open" class="lang-menu">
        <a
          v-for="l in LANGS"
          :key="l.code"
          class="lang-item"
          :class="{ active: l.code === current.code }"
          href="javascript:void(0)"
          @click.prevent="switchTo(l.code)"
        >
          {{ l.label }}
        </a>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.lang-switcher {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.lang-btn:hover {
  border-color: var(--vp-c-brand);
}

.lang-globe {
  font-size: 14px;
}

.lang-arrow {
  font-size: 10px;
  opacity: 0.7;
}

.lang-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 6px);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  padding: 6px;
  min-width: 128px;
  z-index: 60;
}

.dark .lang-menu {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);
}

.lang-item {
  display: block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.lang-item:hover {
  background: var(--vp-c-brand-soft);
}

.lang-item.active {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.lang-fade-enter-active,
.lang-fade-leave-active {
  transition: opacity 0.15s;
}

.lang-fade-enter-from,
.lang-fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .lang-current,
  .lang-arrow {
    display: none;
  }

  .lang-btn {
    padding: 4px 8px;
  }
}
</style>
