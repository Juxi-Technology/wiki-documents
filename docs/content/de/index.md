---
title: Juxi Technology Wiki
description: Juxi Technology Produkt-Tutorials und Dokumentationszentrum
sidebar: false
outline: false
---

<div class="hero-section">

![logo](../../public/images/logos/logo-black.png)

# Juxi Technology Wiki

<p class="hero-subtitle">Offene Dokumentationsplattform für Robotik & AI-Hardware</p>
<p class="hero-desc">Von Roboterarmen bis Sensoren — bauen Sie Ihr intelligentes Robotersystem</p>

<div class="hero-links">
  <a :href="withBase('/de/tutorials/')" class="hero-btn primary">🚀 Loslegen</a>
  <a :href="storeUrl" target="_blank" rel="noopener" class="hero-btn shop">🛍️ Offizieller Shop</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank" rel="noopener" class="hero-btn secondary">⭐ GitHub</a>
</div>

</div>

## Produktreihen

<div class="category-grid">
  <a :href="withBase('/de/products/so-arm101')" class="category-card">
    <img :src="withBase('/images/categories/SO-ARM101.png')" alt="Roboterarme">
    <span>Roboterarme</span>
  </a>
  <a :href="withBase('/de/products/imu-module')" class="category-card">
    <img :src="withBase('/images/categories/IMU.png')" alt="Sensoren">
    <span>Sensoren</span>
  </a>
  <a :href="withBase('/de/downloads/')" class="category-card">
    <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="Downloads">
    <span>Downloads</span>
  </a>
</div>

<script setup>
import { withBase } from 'vitepress'
import { computed } from 'vue'
import { useData } from 'vitepress'

const { localeIndex } = useData()
// 简体/繁体首页展示淘宝店铺按钮,其余语言仅 Shopify 官方商店
const isZh = computed(() => localeIndex.value === 'zh-hans' || localeIndex.value === 'zh-hant')
const storeUrl = computed(() => {
  if (localeIndex.value === 'zh-hans') return 'https://www.juxitech.com/zh-hans'
  if (localeIndex.value === 'zh-hant') return 'https://www.juxitech.com/zh-hant'
  return 'https://www.juxitech.com'
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
</style>
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
