<script setup lang="ts">
import { computed } from 'vue'

// 9 语文案(未命中语言回退英文)
const T: Record<string, { title: string; subtitle: string; cta: string; home: string; tutorials: string; search: string; report: string }> = {
  'zh-CN': { title: '页面未找到', subtitle: '您访问的页面不存在或已被移动。', cta: '带你去首页', home: '首页', tutorials: '查看全部教程', search: '使用搜索查找( / 或 ⌘K )', report: '报告失效链接' },
  en: { title: 'Page Not Found', subtitle: 'The page you are looking for doesn’t exist or may have moved.', cta: 'Take me home', home: 'Home', tutorials: 'Browse Tutorials', search: 'Search ( / or ⌘K )', report: 'Report a broken link' },
  'zh-HK': { title: '頁面未找到', subtitle: '您訪問的頁面不存在或已被移動。', cta: '帶你去首頁', home: '首頁', tutorials: '瀏覽全部教程', search: '使用搜尋查找( / 或 ⌘K )', report: '回報失效連結' },
  ja: { title: 'ページが見つかりません', subtitle: 'アクセスしたページは存在しないか、移動しました。', cta: 'ホームへ', home: 'ホーム', tutorials: 'チュートリアル一覧', search: '検索( / または ⌘K )', report: 'リンク切れを報告' },
  ko: { title: '페이지를 찾을 수 없습니다', subtitle: '요청하신 페이지가 존재하지 않거나 이동되었습니다.', cta: '홈으로', home: '홈', tutorials: '튜토리얼 보기', search: '검색( / 또는 ⌘K )', report: '깨진 링크 신고' },
  de: { title: 'Seite nicht gefunden', subtitle: 'Die angeforderte Seite existiert nicht oder wurde verschoben.', cta: 'Zur Startseite', home: 'Startseite', tutorials: 'Tutorials ansehen', search: 'Suche ( / oder ⌘K )', report: 'Defekten Link melden' },
  fr: { title: 'Page introuvable', subtitle: 'La page demandée n’existe pas ou a été déplacée.', cta: 'Accueil', home: 'Accueil', tutorials: 'Voir les tutoriels', search: 'Recherche ( / ou ⌘K )', report: 'Signaler un lien cassé' },
  es: { title: 'Página no encontrada', subtitle: 'La página solicitada no existe o se ha movido.', cta: 'Ir al inicio', home: 'Inicio', tutorials: 'Ver tutoriales', search: 'Buscar ( / o ⌘K )', report: 'Reportar enlace roto' },
  it: { title: 'Pagina non trovata', subtitle: 'La pagina richiesta non esiste o è stata spostata.', cta: 'Torna alla home', home: 'Home', tutorials: 'Vedi i tutorial', search: 'Cerca ( / o ⌘K )', report: 'Segnala link rotto' },
}

// 404 页为 CSR 渲染,语言无法由 useData 提供,从请求路径推断;
// 据此得出 CTA 语言及 base,避免英文/日文环境下按钮误跳 /zh-hans/
const match = typeof window !== 'undefined'
  ? window.location.pathname.match(/^\/(zh-hans|zh-hant|ja|ko|de|fr|es|it)\//)
  : null

const t = computed(() => {
  if (!match) return T.en
  const langMap: Record<string, string> = {
    'zh-hans': 'zh-CN',
    'zh-hant': 'zh-HK',
    ja: 'ja',
    ko: 'ko',
    de: 'de',
    fr: 'fr',
    es: 'es',
    it: 'it',
  }
  return T[langMap[match[1]]] || T.en
})

const base = computed(() => (match ? '/' + match[1] + '/' : '/'))
</script>

<template>
  <div class="nf">
    <h1 class="nf-code">404</h1>
    <h2 class="nf-title">{{ t.title }}</h2>
    <p class="nf-subtitle">{{ t.subtitle }}</p>
    <div class="nf-actions">
      <a class="nf-btn" :href="base">{{ t.cta }}</a>
      <span class="nf-links">
        <a :href="base" class="nf-link">{{ t.home }}</a> ·
        <a :href="base + 'tutorials/'" class="nf-link">{{ t.tutorials }}</a> ·
        <span class="nf-plain">{{ t.search }}</span> ·
        <a href="https://github.com/Juxi-Technology/wiki-documents/issues" target="_blank" class="nf-link">{{ t.report }}</a>
      </span>
    </div>
  </div>
</template>

<style scoped>
.nf {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--vp-nav-height) - var(--vp-layout-top-height, 0px) - 120px);
  gap: 8px;
  padding: 24px;
  text-align: center;
}

.nf-code {
  margin: 0;
  font-size: 72px;
  font-weight: 800;
  letter-spacing: 6px;
  color: var(--vp-c-brand-2);
  line-height: 1.1;
}

.nf-title {
  margin: 8px 0 0;
  font-size: 22px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.nf-subtitle {
  margin: 4px 0 16px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.nf-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.nf-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 8px;
  background: var(--vp-c-brand);
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: background 0.2s;
}

.nf-btn:hover {
  background: var(--vp-c-brand-2);
}

.nf-links {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.nf-link {
  color: var(--vp-c-text-2);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.nf-plain {
  color: var(--vp-c-text-2);
}

.nf-link:hover {
  color: var(--vp-c-brand);
}
</style>
