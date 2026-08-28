---
title: 鉅犀科技 Wiki
description: 鉅犀科技產品教程與文檔中心
aside: false
sidebar: false
outline: false
---

<div class="hero-section">

![logo](../../public/images/logos/logo-black.png)

# 鉅犀科技 Wiki

<p class="hero-subtitle">機器人與 AI 硬體的開放文檔平台</p>
<p class="hero-desc">從機械臂到傳感器，助你搭建智能機器人系統</p>

<div class="hero-links four">
  <a :href="withBase('/zh-hant/tutorials/')" class="hero-btn primary">🚀 快速開始</a>
  <a v-if="isZh" href="https://juxitechnology.taobao.com" target="_blank" rel="noopener" class="hero-btn taobao">🛒 淘寶店鋪</a>
  <a :href="storeUrl" target="_blank" rel="noopener" class="hero-btn shop">🛍️ 官方商城</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank" rel="noopener" class="hero-btn secondary">⭐ GitHub</a>
</div>

</div>

## 產品系列

<div class="category-grid">
  <a :href="withBase('/zh-hant/tutorials/robot-arms/')" class="category-card">
    <img :src="withBase('/images/categories/SO-ARM101.png')" alt="機械臂系列">
    <span>機械臂系列</span>
  </a>
  <a :href="withBase('/zh-hant/tutorials/sensors/')" class="category-card">
    <img :src="withBase('/images/categories/IMU.png')" alt="傳感器系列">
    <span>傳感器系列</span>
  </a>
  <a :href="withBase('/zh-hant/tutorials/accessories/')" class="category-card">
    <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="配件系列">
    <span>配件系列</span>
  </a>
</div>

## 最新文件

<div class="card-grid">
  <a :href="withBase('/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial')" class="card">
    <img :src="withBase('/images/home-cards/SO-ARM101.png')" alt="SO-ARM101-使用教程">
    <span>SO-ARM101-使用教程</span>
  </a>
  <a :href="withBase('/zh-hant/tutorials/accessories/KWS-speech-recognition-module/index')" class="card">
    <img :src="withBase('/images/home-cards/AI_SoundCard.png')" alt="KWS語音識別模組-系列教程">
    <span>KWS語音識別模組-系列教程</span>
  </a>
  <a :href="withBase('/zh-hant/tutorials/sensors/imu/index')" class="card">
    <img :src="withBase('/images/home-cards/IMU.png')" alt="IMU慣性導航模組">
    <span>IMU慣性導航模組</span>
  </a>
  <a :href="withBase('/zh-hant/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control')" class="card">
    <img :src="withBase('/images/home-cards/AmazingHand.png')" alt="AmazingHand-界面控制教程">
    <span>AmazingHand-界面控制教程</span>
  </a>
</div>

## 瀏覽分類

<div class="category-grid">
  <a :href="withBase('/zh-hant/tutorials/robot-arms/')" class="category-card">
    <img :src="withBase('/images/categories/SO-ARM101.png')" alt="機器人機械臂系列">
    <span>機器人機械臂系列</span>
  </a>
  <a :href="withBase('/zh-hant/tutorials/accessories/')" class="category-card">
    <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="機器人配件">
    <span>機器人配件</span>
  </a>
  <a :href="withBase('/zh-hant/tutorials/sensors/')" class="category-card">
    <img :src="withBase('/images/categories/IMU.png')" alt="傳感器與感知">
    <span>傳感器與感知</span>
  </a>
</div>

## 更多資訊

感謝你選擇我們的產品！我們提供多種支援方式，以確保你的使用體驗盡可能順暢。

- 🌐 官方網站：[https://www.juxitech.com](https://www.juxitech.com/zh-hant)
- 💬 郵箱：support@juxitech.com
- 📧 商務合作：sales@juxitech.com
- 📺 B站：[https://space.bilibili.com/3546906737248821](https://space.bilibili.com/3546906737248821)

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
</style>
