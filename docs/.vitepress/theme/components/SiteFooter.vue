<script setup lang="ts">
import { computed } from 'vue'
import { withBase, useData } from 'vitepress'

const { lang } = useData()

// 9 语页脚文案(语言代码与 config lang 一致)
const T: Record<string, { tagline: string; docs: string; community: string; support: string; rights: string; tut: string; prod: string; topic: string; dl: string; communityItem: string; aboutItem: string; faq: string; contributing: string }> = {
  'zh-CN': { tagline: '机器人与 AI 硬件的开放文档平台，从机械臂到传感器，助你搭建智能机器人系统。', docs: '文档', community: '社区', support: '支持', rights: '保留所有权利', tut: '教程', prod: '产品', topic: '技术专题', dl: '下载', communityItem: '社区', aboutItem: '关于我们', faq: '常见问题', contributing: '贡献指南' },
  en: { tagline: 'Open documentation platform for robotics & AI hardware — from robot arms to sensors, building your intelligent robotic system.', docs: 'Docs', community: 'Community', support: 'Support', rights: 'All rights reserved', tut: 'Tutorials', prod: 'Products', topic: 'Topics', dl: 'Downloads', communityItem: 'Community', aboutItem: 'About', faq: 'FAQ', contributing: 'Contributing' },
  'zh-HK': { tagline: '機器人與 AI 硬體的開放文檔平台，從機械臂到傳感器，助你搭建智能機器人系統。', docs: '文檔', community: '社區', support: '支援', rights: '保留所有權利', tut: '教程', prod: '產品', topic: '技術專題', dl: '下載', communityItem: '社區', aboutItem: '關於我們', faq: '常見問題', contributing: '貢獻指南' },
  ja: { tagline: 'ロボティクスとAIハードウェアのオープンドキュメントプラットフォーム。', docs: 'ドキュメント', community: 'コミュニティ', support: 'サポート', rights: 'All rights reserved', tut: 'チュートリアル', prod: '製品', topic: 'トピック', dl: 'ダウンロード', communityItem: 'コミュニティ', aboutItem: '会社概要', faq: 'よくある質問', contributing: '貢献ガイド' },
  ko: { tagline: '로봇과 AI 하드웨어를 위한 오픈 문서 플랫폼입니다.', docs: '문서', community: '커뮤니티', support: '지원', rights: 'All rights reserved', tut: '튜토리얼', prod: '제품', topic: '토픽', dl: '다운로드', communityItem: '커뮤니티', aboutItem: '회사 소개', faq: '자주 묻는 질문', contributing: '기여 가이드' },
  de: { tagline: 'Offene Dokumentationsplattform für Robotik & AI-Hardware.', docs: 'Dokumente', community: 'Community', support: 'Support', rights: 'Alle Rechte vorbehalten', tut: 'Tutorials', prod: 'Produkte', topic: 'Themen', dl: 'Downloads', communityItem: 'Community', aboutItem: 'Über uns', faq: 'Häufige Fragen', contributing: 'Mitwirkungsleitfaden' },
  fr: { tagline: 'Plateforme de documentation ouverte pour la robotique et le matériel IA.', docs: 'Docs', community: 'Communauté', support: 'Support', rights: 'Tous droits réservés', tut: 'Tutoriels', prod: 'Produits', topic: 'Sujets', dl: 'Téléchargements', communityItem: 'Communauté', aboutItem: 'À propos', faq: 'FAQ', contributing: 'Guide de contribution' },
  es: { tagline: 'Plataforma de documentación abierta para robótica y hardware de IA.', docs: 'Docs', community: 'Comunidad', support: 'Soporte', rights: 'Todos los derechos reservados', tut: 'Tutoriales', prod: 'Productos', topic: 'Temas', dl: 'Descargas', communityItem: 'Comunidad', aboutItem: 'Sobre nosotros', faq: 'Preguntas frecuentes', contributing: 'Guía de contribución' },
  it: { tagline: 'Piattaforma di documentazione aperta per robotica e hardware AI.', docs: 'Docs', community: 'Community', support: 'Supporto', rights: 'Tutti i diritti riservati', tut: 'Tutorial', prod: 'Prodotti', topic: 'Argomenti', dl: 'Download', communityItem: 'Community', aboutItem: 'Chi siamo', faq: 'Domande frequenti', contributing: 'Guida alla contribuzione' },
}

const t = computed(() => T[lang.value] || T.en)

// 语言目录前缀(root=en 无前缀)
const pref = computed(() => {
  // 必须带前导 "/":withBase 对非 "/" 开头的路径原样返回(相对 URL),
  // 浏览器会按当前页语言前缀再解析一层,导致 /zh-hans/zh-hans/... 双前缀 404
  const dirs: Record<string, string> = { 'zh-CN': '/zh-hans/', 'zh-HK': '/zh-hant/', ja: '/ja/', ko: '/ko/', de: '/de/', fr: '/fr/', es: '/es/', it: '/it/', en: '/' }
  return dirs[lang.value] || ''
})
</script>

<template>
  <footer class="site-footer">
    <div class="sf-inner">
      <div class="sf-brand">
        <span class="sf-logo">JUXI TECHNOLOGY</span>
        <p class="sf-tagline">{{ t.tagline }}</p>
      </div>
      <div class="sf-col">
        <h4>{{ t.docs }}</h4>
        <a :href="withBase(pref + 'tutorials/')">{{ t.tut }}</a>
        <a :href="withBase(pref + 'products/')">{{ t.prod }}</a>
        <a :href="withBase(pref + 'topics/')">{{ t.topic }}</a>
        <a :href="withBase(pref + 'downloads/')">{{ t.dl }}</a>
      </div>
      <div class="sf-col">
        <h4>{{ t.community }}</h4>
        <a :href="withBase(pref + 'community/')">{{ t.communityItem }}</a>
        <a :href="withBase(pref + 'about/')">{{ t.aboutItem }}</a>
        <a href="https://github.com/Juxi-Technology/" target="_blank" rel="noopener">GitHub</a>
        <a href="https://huggingface.co/Juxi-Technology" target="_blank" rel="noopener">Hugging Face</a>
        <a href="https://space.bilibili.com/3546906737248821" target="_blank" rel="noopener">Bilibili</a>
      </div>
      <div class="sf-col">
        <h4>{{ t.support }}</h4>
        <a :href="withBase(pref + 'tutorials/faq')">{{ t.faq }}</a>
        <a :href="withBase(pref + 'community/contributing')">{{ t.contributing }}</a>
        <a href="mailto:support@juxitech.com">support@juxitech.com</a>
        <a href="https://www.juxitech.com" target="_blank" rel="noopener">juxitech.com</a>
      </div>
    </div>
    <p class="sf-copy">
      © 2026 Juxi Technology · {{ t.rights }}
    </p>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--vp-c-gutter);
  background: var(--vp-c-bg-soft);
  margin-top: 48px;
}

.sf-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
}

.sf-logo {
  font-weight: 800;
  letter-spacing: 2px;
  font-size: 14px;
  color: var(--vp-c-brand);
}

.sf-tagline {
  font-size: 13px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  max-width: 40ch;
}

.sf-col h4 {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--vp-c-text-1);
}

.sf-col a {
  display: block;
  font-size: 13px;
  line-height: 2;
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.sf-col a:hover {
  color: var(--vp-c-brand);
}

.sf-copy {
  margin: 0;
  padding: 16px 24px;
  text-align: center;
  font-size: 12px;
  color: var(--vp-c-text-3);
  border-top: 1px solid var(--vp-c-gutter);
}
</style>
