<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { lang } = useData()
const route = useRoute()

// 一级目录名(9 语翻译,分段映射)
const SEG_NAMES: Record<string, Record<string, string>> = {
  tutorials: { 'zh-CN': '教程', en: 'Tutorials', 'zh-HK': '教程', ja: 'チュートリアル', ko: '튜토리얼', de: 'Tutorials', fr: 'Tutoriels', es: 'Tutoriales', it: 'Tutorial' },
  products: { 'zh-CN': '产品', en: 'Products', 'zh-HK': '產品', ja: '製品', ko: '제품', de: 'Produkte', fr: 'Produits', es: 'Productos', it: 'Prodotti' },
  topics: { 'zh-CN': '技术专题', en: 'Topics', 'zh-HK': '技術專題', ja: 'トピック', ko: '토픽', de: 'Themen', fr: 'Sujets', es: 'Temas', it: 'Argomenti' },
  tech: { 'zh-CN': '技术文档', en: 'Tech Docs', 'zh-HK': '技術文件', ja: '技術ドキュメント', ko: '기술 문서', de: 'Technikdoku', fr: 'Documentation tech', es: 'Docs técnicos', it: 'Documentazione' },
  cases: { 'zh-CN': '用户案例', en: 'Cases', 'zh-HK': '用戶案例', ja: '事例', ko: '사례', de: 'Fälle', fr: 'Cas', es: 'Casos', it: 'Casi' },
  community: { 'zh-CN': '社区', en: 'Community', 'zh-HK': '社區', ja: 'コミュニティ', ko: '커뮤니티', de: 'Community', fr: 'Communauté', es: 'Comunidad', it: 'Community' },
  downloads: { 'zh-CN': '下载', en: 'Downloads', 'zh-HK': '下載', ja: 'ダウンロード', ko: '다운로드', de: 'Downloads', fr: 'Téléchargements', es: 'Descargas', it: 'Download' },
  about: { 'zh-CN': '关于我们', en: 'About', 'zh-HK': '關於我們', ja: '私たちについて', ko: '소개', de: 'Über uns', fr: 'À propos', es: 'Sobre nosotros', it: 'Chi siamo' },
}

const HOME_TEXT: Record<string, string> = {
  'zh-CN': '首页', en: 'Home', 'zh-HK': '首頁', ja: 'ホーム', ko: '홈', de: 'Start', fr: 'Accueil', es: 'Inicio', it: 'Home',
}

const crumbs = computed(() => {
  const segs = route.path.split('/').filter(Boolean)
  // 去掉语言前缀段
  const LANG_RE = /^(zh-hans|zh-hant|ja|ko|de|fr|es|it|en)$/
  if (segs.length && LANG_RE.test(segs[0])) segs.shift()
  // 去掉索引页(已在语言根)
  if (segs.length && segs[segs.length - 1] === 'index') segs.pop()
  if (!segs.length) return [{ text: HOME_TEXT[lang.value] || 'Home', path: '/' }]
  return [{ text: HOME_TEXT[lang.value] || 'Home', path: '/' }]
    .concat(segs.slice(0, 1).map((s) => ({
      text: SEG_NAMES[s]?.[lang.value] || s,
      path: route.path.split('/').slice(0, 2).join('/') || '/',
    })))
})
</script>

<template>
  <nav v-if="crumbs.length > 1" class="breadcrumb" aria-label="面包屑">
    <template v-for="(c, i) in crumbs" :key="i">
      <a v-if="i > 0" class="breadcrumb-sep">/</a>
      <a
        class="breadcrumb-link"
        :class="{ muted: i === crumbs.length - 1 }"
        :href="i === crumbs.length - 1 ? undefined : c.path"
      >{{ c.text }}</a>
    </template>
  </nav>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 0 0 12px 0;
  line-height: 1;
  flex-wrap: wrap;
}

.breadcrumb-link {
  color: var(--vp-c-text-2);
  text-decoration: none;
}

a.breadcrumb-link[href]:hover {
  color: var(--vp-c-brand);
}

.breadcrumb-link.muted {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.breadcrumb-sep {
  color: var(--vp-c-text-3);
  user-select: none;
}
</style>
