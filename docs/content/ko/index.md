---
title: Juxi Technology Wiki
description: Juxi Technology 제품 튜토리얼 및 문서 센터
aside: false
sidebar: false
outline: false
---

<div class="hero-section">
<div class="hero-inner">
  <div class="hero-main">

# Juxi Technology Wiki

<p class="hero-subtitle">로보틱스 및 AI 하드웨어 오픈 문서 플랫폼</p>
<p class="hero-desc">Juxi Technology 는 선전 첸하이에 기반을 두고 &quot;With Hong Kong · For the Mainland · To the World&quot; 의 이념 아래 물리 AI, 구체적 로봇공학, 엣지 AI 를 개발하여 전 세계 개발자에게 오픈소스 솔루션을 제공합니다.</p>

<div class="hero-links three">
  <a :href="withBase('/ko/tutorials/')" class="hero-btn primary">🚀 시작하기</a>
  <a :href="storeUrl" target="_blank" rel="noopener" class="hero-btn shop">🛍️ 공식 스토어</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank" rel="noopener" class="hero-btn secondary">⭐ GitHub</a>
  </div>
</div>
  <div class="hero-brand">
    <span class="brand-wiki">Wiki</span>
    <span class="brand-name">Juxi Technology</span>
  </div>
</div>
</div>

## 제품 시리즈

<div class="category-grid">
  <a :href="withBase('/ko/products/so-arm101')" class="category-card">
    <img :src="withBase('/images/categories/SO-ARM101.png')" alt="로봇 암">
    <span>로봇 암</span>
  </a>
  <a :href="withBase('/ko/products/imu-module')" class="category-card">
    <img :src="withBase('/images/categories/IMU.png')" alt="센서">
    <span>센서</span>
  </a>
  <a :href="withBase('/ko/downloads/')" class="category-card">
    <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="다운로드">
    <span>다운로드</span>
  </a>
</div>

<script setup>
import { withBase } from 'vitepress'
import { computed } from 'vue'
import { useData } from 'vitepress'

const { localeIndex } = useData()
// 简体/繁体首页展示淘宝店铺按钮,其余语言仅 Shopify 官方商店
const isZh = computed(() => localeIndex.value === 'zh-hans' || localeIndex.value === 'zh-hant')
// 商店路径显式对应每个语言:Shopify root 会按访客浏览器语言 302,
// 不能作为静态链接(zh-TW 浏览器点 English 页的商店会跳到 /zh-hant)
const storeUrl = computed(() => {
  const dirs = {
    'zh-hans': 'zh-hans',
    'zh-hant': 'zh-hant',
    ja: 'ja',
    ko: 'ko',
    de: 'de',
    fr: 'fr',
    es: 'es',
    it: 'it',
  }
  const langDir = dirs[localeIndex.value]
  return langDir ? `https://www.juxitech.com/${langDir}` : 'https://www.juxitech.com'
})
</script>

<style>
.hero-section {
  text-align: center;
  padding: 64px 24px 48px;
}

.hero-section img {
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
}

.hero-subtitle {
  font-size: 22px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 16px 0 8px;
}

.hero-desc {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin-bottom: 32px;
}

.hero-links {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  transition: all 0.2s;
}

.hero-btn.primary {
  background-color: #1e3a5f;
  color: #ffffff;
}

.hero-btn.primary:hover {
  background-color: #152a45;
}

.hero-btn.secondary {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-gutter);
}

.hero-btn.secondary:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  margin: 32px 0 64px 0;
}

.card {
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  display: block;
  background: var(--vp-c-bg-soft);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand);
}

.card img {
  width: 100%;
  height: 160px;
  object-fit: contain;
  padding: 16px;
  background: var(--vp-c-bg);
}

.card span {
  display: block;
  padding: 12px 16px 16px;
  font-weight: 500;
  font-size: 14px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin: 32px 0 64px 0;
}

.category-card {
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  display: block;
  background: var(--vp-c-bg-soft);
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand);
}

.category-card img {
  width: 100%;
  height: 140px;
  object-fit: contain;
  padding: 16px;
  background: var(--vp-c-bg);
}

.category-card span {
  display: block;
  padding: 12px 16px 16px;
  font-weight: 600;
  font-size: 14px;
}

.vp-doc h2 {
  margin-top: 64px;
  text-align: center;
}

.vp-doc h1 {
  display: none;
}
/* ---- 按钮等宽对齐:3 按钮一行,中/繁 2×2 (2026-08) ---- */
.hero-links {
  display: grid;
  gap: 12px;
  justify-items: stretch;
  width: 100%;
  margin: 0 auto;
}

.hero-links.three {
  grid-template-columns: repeat(3, 1fr);
  max-width: 620px;
}

.hero-links.four {
  grid-template-columns: repeat(2, 1fr);
  max-width: 480px;
}

.hero-btn {
  text-align: center;
}

@media (max-width: 640px) {
  .hero-links.three {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
/* ---- 首页升级:hero 卡片化 + 商店按钮 (2026-08) ---- */
.hero-section {
  border: 1px solid var(--vp-c-gutter);
  border-radius: 16px;
  background: linear-gradient(180deg, var(--vp-c-brand-soft) 0%, var(--vp-c-bg) 92%);
}

.hero-btn:hover {
  transform: translateY(-2px);
}

.hero-btn.taobao {
  background-color: #ff5000;
  border-color: #ff5000;
  color: #ffffff;
}

.hero-btn.taobao:hover {
  background-color: #d64400;
  border-color: #d64400;
  color: #ffffff;
}

.hero-btn.shop {
  background-color: #95bf47;
  border-color: #95bf47;
  color: #ffffff;
}

.hero-btn.shop:hover {
  background-color: #7aa53a;
  border-color: #7aa53a;
  color: #ffffff;
}

.hero-btn.taobao,
.hero-btn.shop {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
/* ---- hero 渐变标题与分区标题装饰线 (2026-08) ---- */
.hero-subtitle {
  font-size: 26px;
  background: linear-gradient(92deg, #0f9d63 0%, #35c47f 55%, #0ea5b7 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.vp-doc h2::after {
  content: '';
  display: block;
  width: 56px;
  height: 4px;
  border-radius: 2px;
  margin: 14px auto 0;
  background: linear-gradient(90deg, #0f9d63, #35c47f 60%, #0ea5b7);
}
/* ---- hero 改版 v2:照 Seeed Studio Wiki 首页(满宽 hero,左文右巨型品牌字) ---- */
.hero-section {
  margin: 0 calc(50% - 50vw);
  padding: 56px 0 40px;
  text-align: left;
  border: none;
  border-radius: 0;
  background: none;
}

.hero-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 64px;
}

.hero-main {
  flex: 1 1 58%;
  min-width: 0;
}

/* 恢复主标题(hallway早前 display:none 隐藏) */
.vp-doc h1 {
  display: block;
}

.hero-main h1 {
  font-size: 52px;
  line-height: 1.15;
  margin: 0 0 16px;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.hero-subtitle {
  font-size: 22px;
  margin: 0 0 10px;
}

.hero-desc {
  font-size: 16px;
  line-height: 1.75;
  color: var(--vp-c-text-2);
  margin: 0 0 32px;
  max-width: 44ch;
}

/* 按钮一律等宽网格:桌面 1×N(4 枚 4 列 / 3 枚 3 列),手机 2×2 */
.hero-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  justify-items: stretch;
  width: auto;
  margin: 0;
}

.hero-links.three {
  grid-template-columns: repeat(3, 1fr);
  max-width: none;
}

.hero-links.four {
  grid-template-columns: repeat(4, 1fr);
  max-width: none;
}

.hero-btn {
  padding: 14px 16px;
  border-radius: 999px;
  font-size: 15px;
  white-space: nowrap;
}

/* 主按钮:参考图 GETTING STARTED 的亮绿大胶囊 */
.hero-btn.primary {
  background-color: #7fc93c;
  border-color: #7fc93c;
  color: #ffffff;
  font-weight: 700;
}

.hero-btn.primary:hover {
  background-color: #6fb832;
  border-color: #6fb832;
  color: #ffffff;
}

/* 右侧巨型品牌字(参考图 Wiki / seed studio) */
.hero-brand {
  flex: 0 0 42%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}

.brand-wiki {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  font-size: min(15vw, 200px);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(180deg, #9fdc5a 0%, #35c47f 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.brand-name {
  margin-top: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  font-size: min(3vw, 38px);
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--vp-c-text-1);
  text-transform: uppercase;
}

/* 标题锚点 # 常显,遮挡视觉,全站隐藏(原生锚点跳转不受影响) */
.vp-doc .header-anchor {
  display: none !important;
}

@media (max-width: 767px) {
  .hero-section {
    padding-top: 32px;
    padding-bottom: 40px;
    text-align: left;
  }
  /* 移动端参照 Seeed:先巨型品牌字,再标题 → 描述 → 按钮,整体左对齐 */
  .hero-inner {
    flex-direction: column;
    gap: 20px;
    padding: 0 20px;
  }
  .hero-brand {
    order: -1;
    flex: none;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  .brand-wiki {
    font-size: min(30vw, 130px);
  }
  .brand-name {
    font-size: min(8vw, 56px);
    margin-top: 6px;
  }
  .hero-main h1 {
    font-size: 40px;
    text-align: left;
  }
  .hero-subtitle {
    font-size: 22px;
  }
  .hero-desc {
    font-size: 17px;
    max-width: none;
  }
  /* 手机 2×2 等宽 */
  .hero-links,
  .hero-links.three,
  .hero-links.four {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .hero-btn {
    padding: 12px 20px;
    font-size: 15px;
  }
}
</style>