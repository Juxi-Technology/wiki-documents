<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, lang } = useData()

// 语言切换函数无需(纯链接跳转)——直接使用大主题
// 仅非首页且存在前后项时显示
const prev = computed(() => (page.value as any).prevNext?.prev)
const next = computed(() => (page.value as any).prevNext?.next)
const show = computed(() => !!prev.value || !!next.value)

const T = {
  'zh-CN': { prev: '上一篇', next: '下一篇' },
  en: { prev: 'Prev', next: 'Next' },
  'zh-HK': { prev: '上一篇', next: '下一篇' },
  ja: { prev: '前へ', next: '次へ' },
  ko: { prev: '이전', next: '다음' },
  de: { prev: 'Zurück', next: 'Weiter' },
  fr: { prev: 'Précédent', next: 'Suivant' },
  es: { prev: 'Anterior', next: 'Siguiente' },
  it: { prev: 'Precedente', next: 'Successivo' },
}
const label = computed(() => ({ prev: T[lang.value as keyof typeof T]?.prev || 'Prev', next: T[lang.value as keyof typeof T]?.next || 'Next' }))
</script>

<template>
  <nav v-if="show" class="prev-next">
    <a v-if="prev" class="pn pn-prev" :href="prev">
      <span class="pn-arrow">←</span>
      <span class="pn-meta">{{ label.prev }}</span>
    </a>
    <a v-if="next" class="pn pn-next" :href="next">
      <span class="pn-meta">{{ label.next }}</span>
      <span class="pn-arrow">→</span>
    </a>
  </nav>
</template>

<style scoped>
.prev-next {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.pn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 13px;
  max-width: 46%;
  transition: border-color 0.2s, color 0.2s;
}

.pn:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand);
}

.pn-arrow {
  font-size: 15px;
  line-height: 1;
}

.pn-meta {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 500;
}

.pn-next {
  margin-left: auto;
  justify-content: flex-end;
}

@media (max-width: 640px) {
  .prev-next {
    flex-direction: column;
  }

  .pn {
    max-width: 100%;
  }
}
</style>
