---
title: 钜犀科技 Wiki
description: 钜犀科技产品教程与文档中心
sidebar: false
outline: false
---

<div class="hero-section">

![logo](/images/logos/logo-black.png)

# 钜犀科技 Wiki

<p class="hero-subtitle">机器人与 AI 硬件的开放文档平台</p>
<p class="hero-desc">从机械臂到传感器，助你搭建智能机器人系统</p>

<div class="hero-links">
  <a :href="withBase('/tutorials/')" class="hero-btn primary">🚀 快速开始</a>
  <a :href="withBase('/tutorials/')" class="hero-btn secondary">📚 浏览教程</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank" class="hero-btn secondary">⭐ GitHub</a>
</div>

</div>

## 最新文档

<div class="card-grid">
  <a :href="withBase('/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial')" class="card">
    <img :src="withBase('/images/home-cards/SO-ARM101.png')" alt="SO-ARM101-使用教程">
    <span>SO-ARM101-使用教程</span>
  </a>
  <a :href="withBase('/tutorials/accessories/KWS-speech-recognition-module/index')" class="card">
    <img :src="withBase('/images/home-cards/AI_SoundCard.png')" alt="KWS语音识别模块-系列教程">
    <span>KWS语音识别模块-系列教程</span>
  </a>
  <a :href="withBase('/tutorials/sensors/imu/index')" class="card">
    <img :src="withBase('/images/home-cards/IMU.png')" alt="IMU惯性导航模块">
    <span>IMU惯性导航模块</span>
  </a>
  <a :href="withBase('/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control')" class="card">
    <img :src="withBase('/images/home-cards/AmazingHand.png')" alt="AmazingHand-界面控制教程">
    <span>AmazingHand-界面控制教程</span>
  </a>
</div>

## 浏览分类

<div class="category-grid">
  <a :href="withBase('/tutorials/robot-arms/')" class="category-card">
    <img :src="withBase('/images/categories/SO-ARM101.png')" alt="机器人机械臂系列">
    <span>机器人机械臂系列</span>
  </a>
  <a :href="withBase('/tutorials/accessories/')" class="category-card">
    <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="机器人配件">
    <span>机器人配件</span>
  </a>
  <a :href="withBase('/tutorials/sensors/')" class="category-card">
    <img :src="withBase('/images/categories/IMU.png')" alt="传感器与感知">
    <span>传感器与感知</span>
  </a>
</div>

## 更多信息

感谢你选择我们的产品！我们提供多种支持方式，以确保你的使用体验尽可能顺畅。

- 🌐 官方网站：[https://www.juxitech.com](https://www.juxitech.com)
- 💬 邮箱：support@juxitech.com
- 📧 商务合作：sales@juxitech.com
- 📺 B站：[https://space.bilibili.com/3546906737248821](https://space.bilibili.com/3546906737248821)

<script setup>
import { withBase } from 'vitepress'
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
