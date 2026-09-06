<script setup lang="ts">
import { computed } from 'vue'
import { withBase, useData } from 'vitepress'

// useData().lang 返回 config lang 值('zh-CN'/'zh-HK'/'en'...),与字典键一致
const { lang } = useData()

const T: Record<string, { title: string; desc: string; contribute: string; github: string; bilibili: string; email: string }> = {
  'zh-CN': { title: '参与与支持', desc: '贡献教程,或获取技术支持', contribute: '贡献指南', github: 'GitHub 组织', bilibili: '哔哩哔哩', email: 'support@juxitech.com' },
  en: { title: 'Get Involved & Support', desc: 'Contribute tutorials or get technical support', contribute: 'Contributing Guide', github: 'GitHub Org', bilibili: 'Bilibili', email: 'support@juxitech.com' },
  'zh-HK': { title: '參與與支持', desc: '貢獻教程,或獲取技術支援', contribute: '貢獻指南', github: 'GitHub 組織', bilibili: '嗶哩嗶哩', email: 'support@juxitech.com' },
  ja: { title: '参加とサポート', desc: 'チュートリアルの貢献や技術サポート', contribute: '貢献ガイド', github: 'GitHub 組織', bilibili: 'Bilibili', email: 'support@juxitech.com' },
  ko: { title: '참여 및 지원', desc: '튜토리얼 기여 또는 기술 지원 받기', contribute: '기여 가이드', github: 'GitHub 조직', bilibili: 'Bilibili', email: 'support@juxitech.com' },
  de: { title: 'Mitmachen & Support', desc: 'Tutorials beisteuern oder Support erhalten', contribute: 'Mitwirkungsleitfaden', github: 'GitHub-Organisation', bilibili: 'Bilibili', email: 'support@juxitech.com' },
  fr: { title: 'Participer & Support', desc: 'Contribuer des tutoriels ou obtenir du support', contribute: 'Guide de contribution', github: 'Organisation GitHub', bilibili: 'Bilibili', email: 'support@juxitech.com' },
  es: { title: 'Participar y soporte', desc: 'Contribuye con tutoriales u obtén soporte técnico', contribute: 'Guía de contribución', github: 'Organización GitHub', bilibili: 'Bilibili', email: 'support@juxitech.com' },
  it: { title: 'Partecipa e supporto', desc: 'Contribuisci con tutorial o ricevi supporto tecnico', contribute: 'Guida alla contribuzione', github: 'Organizzazione GitHub', bilibili: 'Bilibili', email: 'support@juxitech.com' },
}

const t = computed(() => T[lang.value] || T.en)
const pref = computed(() => {
  const dirs: Record<string, string> = { 'zh-CN': '/zh-hans/', 'zh-HK': '/zh-hant/', ja: '/ja/', ko: '/ko/', de: '/de/', fr: '/fr/', es: '/es/', it: '/it/', en: '/' }
  return dirs[lang.value] || '/'
})
</script>

<template>
  <section class="community-strip reveal">
    <div class="cs-head">
      <h2>{{ t.title }}</h2>
      <p>{{ t.desc }}</p>
    </div>
    <div class="cs-links">
      <a :href="withBase(pref + 'community/contributing')" class="cs-link">{{ t.contribute }}</a>
      <a href="https://github.com/Juxi-Technology/" target="_blank" rel="noopener" class="cs-link">{{ t.github }}</a>
      <a href="https://huggingface.co/Juxi-Technology" target="_blank" rel="noopener" class="cs-link">Hugging Face</a>
      <a href="https://space.bilibili.com/3546906737248821" target="_blank" rel="noopener" class="cs-link">{{ t.bilibili }}</a>
      <a href="mailto:support@juxitech.com" class="cs-link">{{ t.email }}</a>
    </div>
  </section>
</template>

<style scoped>
.community-strip {
  margin-top: 8px;
}

.cs-head {
  text-align: center;
  margin-bottom: 14px;
}

.cs-head p {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.cs-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.cs-link {
  padding: 8px 18px;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 999px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.cs-link:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}
</style>
