---
title: Juxi Technology Wiki
description: "Tutorials and documentation for Juxi Technology robotics hardware: SO-ARM101 robot arms, AmazingHand dexterous hand, XLeRobot mobile robots."
aside: false
sidebar: false
outline: false
---

<div class="hero-section">
<div class="hero-inner">
  <div class="hero-main">

# Juxi Technology Wiki

<p class="home-hero-subtitle">Open Documentation Platform for Robotics & AI Hardware</p>
<p class="hero-desc">Juxi Technology, based in Qianhai Shenzhen, follows &quot;With Hong Kong · For the Mainland · To the World&quot;. We develop physical AI, embodied robotics and edge AI, delivering open-source solutions to developers worldwide.</p>

<div class="hero-links three">
  <a :href="withBase('/tutorials/')" class="hero-btn primary">🚀 Get Started</a>
  <a :href="storeUrl" target="_blank" rel="noopener" class="hero-btn shop">🛍️ Official Store</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank" rel="noopener" class="hero-btn secondary">⭐ GitHub</a>
  </div>
</div>
  <div class="hero-brand">
    <span class="brand-wiki">Wiki</span>
    <span class="brand-name">Juxi Technology</span>
  </div>
</div>
</div>

## Product Series

<div class="home-category-grid reveal">
  <a :href="withBase('/products/so-arm101')" class="home-category-card">
    <img :src="withBase('/images/categories/SO-ARM101.png')" alt="SO-ARM101 Robot Arm">
    <span>SO-ARM101 Robot Arm</span>
  </a>
  <a :href="withBase('/products/amazinghand')" class="home-category-card">
    <img :src="withBase('/images/categories/AmazingHand.png')" alt="AmazingHand Dexterous Hand">
    <span>AmazingHand Dexterous Hand</span>
  </a>
  <a :href="withBase('/products/xlerobot')" class="home-category-card">
    <img :src="withBase('/images/categories/XLeRobot.png')" alt="XLeRobot Mobile Robot">
    <span>XLeRobot Mobile Robot</span>
  </a>
  <a :href="withBase('/products/esp32-s3-wifi-module')" class="home-category-card">
    <img :src="withBase('/images/categories/ESP32-NanoCam.png')" alt="ESP32-NanoCam Video Module">
    <span>ESP32-NanoCam Video Module</span>
  </a>
  <a :href="withBase('/products/ai-voice-module')" class="home-category-card">
    <img :src="withBase('/images/categories/AI-Voice-Module.png')" alt="AI Voice Interaction Module">
    <span>AI Voice Interaction Module</span>
  </a>
  <a :href="withBase('/products/imu-module')" class="home-category-card">
    <img :src="withBase('/images/categories/IMU.png')" alt="IMU Inertial Module">
    <span>IMU Inertial Module</span>
  </a>
  <a :href="withBase('/products/gps-beidou-module')" class="home-category-card">
    <img :src="withBase('/images/categories/GPS.png')" alt="GPS & BeiDou Positioning">
    <span>GPS & BeiDou Positioning</span>
  </a>
  <a :href="withBase('/products/imx219-csi-camera')" class="home-category-card">
    <img :src="withBase('/images/categories/CSI-Camera.png')" alt="IMX219 CSI Camera">
    <span>IMX219 CSI Camera</span>
  </a>
</div>

<HomeLatestDocs />
## Browse Categories

<div class="home-category-grid reveal">
  <a :href="withBase('/tutorials/robot-arms/')" class="home-category-card">
    <img :src="withBase('/images/categories/SO-ARM101.png')" alt="Robot Arm Tutorials">
    <span>Robot Arm Tutorials</span>
  </a>
  <a :href="withBase('/tutorials/robot-arms/xlerobot/')" class="home-category-card">
    <img :src="withBase('/images/categories/XLeRobot.png')" alt="Mobile Robot Tutorials">
    <span>Mobile Robot Tutorials</span>
  </a>
  <a :href="withBase('/tutorials/sensors/')" class="home-category-card">
    <img :src="withBase('/images/categories/IMU.png')" alt="Sensor Tutorials">
    <span>Sensor Tutorials</span>
  </a>
  <a :href="withBase('/tutorials/accessories/')" class="home-category-card">
    <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="Accessory Tutorials">
    <span>Accessory Tutorials</span>
  </a>
</div>

## More Information

Thank you for choosing our products! We offer multiple support methods to ensure your usage experience is as smooth as possible.

- 🌐 Official Website: [https://www.juxitech.com](https://www.juxitech.com)
- 💬 Email: support@juxitech.com
- 📧 Business: sales@juxitech.com
- 📺 Bilibili: [https://space.bilibili.com/3546906737248821](https://space.bilibili.com/3546906737248821)


<CommunityStrip />
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

.home-hero-subtitle {
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

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  /* 满宽:突破文档容器的 688px 限宽(与 hero 同思路但不用 50vw,
     避免滚动条宽度被计入导致横向溢出);超宽屏封顶 1320px 与 hero 对齐 */
  --grid-w: min(1320px, 100vw - 48px);
  width: var(--grid-w);
  margin: 32px calc(50% - var(--grid-w) / 2) 64px;
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

.home-category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  /* 满宽:突破文档容器的 688px 限宽(与 hero 同思路但不用 50vw,
     避免滚动条宽度被计入导致横向溢出);超宽屏封顶 1320px 与 hero 对齐 */
  --grid-w: min(1320px, 100vw - 48px);
  width: var(--grid-w);
  margin: 32px calc(50% - var(--grid-w) / 2) 64px;
}

.home-category-card {
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

.home-category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand);
}

.home-category-card img {
  width: 100%;
  height: 140px;
  object-fit: contain;
  padding: 16px;
  background: var(--vp-c-bg);
}

.home-category-card span {
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
/* ---- hero 渐变标题与分区标题装饰线 (2026-08) ---- */
.home-hero-subtitle {
  font-size: 26px;
}

.vp-doc h2::after {
  content: '';
  display: block;
  width: 56px;
  height: 4px;
  border-radius: 2px;
  margin: 14px auto 0;
  background: linear-gradient(90deg, #1e4a7a, #3a7bd5 60%, #2b6cb0);
}

.dark .vp-doc h2::after {
  background: linear-gradient(90deg, #5b87c9, #7ea6e0 60%, #4a90d9);
}
/* ---- hero 改版 v2:满宽 hero,左文右巨型品牌字 ---- */
.hero-section {
  padding: 56px 0 40px;
  text-align: left;
  border: none;
  border-radius: 0;
  background: none;
}

/* 满宽改由 .hero-inner 承担:不再用 50vw 负 margin——50vw 把滚动条宽度也算进去,
   会让整页多出约 7px 横向滚动(Windows/常显滚动条下必现);
   改用「按视口定宽 + 48px 余量」,与 .card-grid / .home-category-grid 同一套写法 */
.hero-inner {
  --hero-w: min(1320px, 100vw - 48px);
  width: var(--hero-w);
  margin-left: calc(50% - var(--hero-w) / 2);
  margin-right: 0;
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

.home-hero-subtitle {
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
  /* 移动端:先巨型品牌字,再标题 → 描述 → 按钮,整体左对齐 */
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
  .home-hero-subtitle {
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