---
title: Juxi Technology Wiki
description: Juxi Technology Product Tutorials and Documentation Center
sidebar: false
outline: false
---

<div class="hero-section">

![logo](/images/logos/logo-black.png)

# Juxi Technology Wiki

<p class="hero-subtitle">Open Documentation Platform for Robotics & AI Hardware</p>
<p class="hero-desc">From robot arms to sensors — build your intelligent robotic system</p>

<div class="hero-links">
  <a href="/en/tutorials/" class="hero-btn primary">🚀 Get Started</a>
  <a href="/en/tutorials/" class="hero-btn secondary">📚 Tutorials</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank" class="hero-btn secondary">⭐ GitHub</a>
</div>

</div>

## Latest Documents

<div class="card-grid">
  <a href="/en/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial" class="card">
    <img src="/images/home-cards/SO-ARM101.png" alt="SO-ARM101-Tutorial">
    <span>SO-ARM101-Tutorial</span>
  </a>
  <a href="/en/tutorials/accessories/KWS-speech-recognition-module/index" class="card">
    <img src="/images/home-cards/AI_SoundCard.png" alt="KWS Speech Recognition Module Series">
    <span>KWS Speech Recognition Module Series</span>
  </a>
  <a href="/en/tutorials/sensors/imu/index" class="card">
    <img src="/images/home-cards/IMU.png" alt="IMU Inertial Navigation Module">
    <span>IMU Inertial Navigation Module</span>
  </a>
  <a href="/en/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control" class="card">
    <img src="/images/home-cards/AmazingHand.png" alt="AmazingHand-Interface-Control">
    <span>AmazingHand-Interface-Control</span>
  </a>
</div>

## Browse Categories

<div class="category-grid">
  <a href="/en/tutorials/robot-arms/" class="category-card">
    <img src="/images/categories/SO-ARM101.png" alt="Robot Arm Series">
    <span>Robot Arm Series</span>
  </a>
  <a href="/en/tutorials/accessories/" class="category-card">
    <img src="/images/categories/AI_SoundCard.png" alt="Robot Accessories">
    <span>Robot Accessories</span>
  </a>
  <a href="/en/tutorials/sensors/" class="category-card">
    <img src="/images/categories/IMU.png" alt="Sensors and Perception">
    <span>Sensors and Perception</span>
  </a>
</div>

## More Information

Thank you for choosing our products! We offer multiple support methods to ensure your usage experience is as smooth as possible.

- 🌐 Official Website: [https://www.juxitech.com](https://www.juxitech.com)
- 💬 Email: support@juxitech.com
- 📧 Business: sales@juxitech.com
- 📺 Bilibili: [https://space.bilibili.com/3546906737248821](https://space.bilibili.com/3546906737248821)

<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
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
