<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

// 官方商城:各语言路径与首页 hero 一致(en 无前缀;Shopify root 会按浏览器语言跳转,不能作静态链接)
const STORE: Record<string, string> = {
  'zh-CN': 'https://www.juxitech.com/zh-hans',
  'zh-HK': 'https://www.juxitech.com/zh-hant',
  ja: 'https://www.juxitech.com/ja',
  ko: 'https://www.juxitech.com/ko',
  de: 'https://www.juxitech.com/de',
  fr: 'https://www.juxitech.com/fr',
  es: 'https://www.juxitech.com/es',
  it: 'https://www.juxitech.com/it',
  'pt-BR': 'https://www.juxitech.com/pt-br',
  'pt-PT': 'https://www.juxitech.com/pt-pt',
  en: 'https://www.juxitech.com',
}
const STORE_LABEL: Record<string, string> = {
  'zh-CN': '官方商城',
  'zh-HK': '官方商城',
  ja: '公式ストア',
  ko: '공식 스토어',
  de: 'Offizieller Shop',
  fr: 'Boutique officielle',
  es: 'Tienda oficial',
  it: 'Negozio ufficiale',
  'pt-BR': 'Loja oficial',
  'pt-PT': 'Loja oficial',
  en: 'Official Store',
}
const storeUrl = computed(() => STORE[lang.value] || STORE.en)
const storeLabel = computed(() => STORE_LABEL[lang.value] || STORE_LABEL.en)
</script>

<template>
  <div class="nav-icons">
    <a class="nav-icon" href="https://github.com/Juxi-Technology/" target="_blank" rel="noopener" aria-label="GitHub">
      <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"
        />
      </svg>
    </a>
    <a class="nav-icon" href="https://huggingface.co/Juxi-Technology" target="_blank" rel="noopener" aria-label="Hugging Face">🤗</a>
    <a class="nav-icon" :href="storeUrl" target="_blank" rel="noopener" :aria-label="storeLabel">🛍️</a>
  </div>
</template>
