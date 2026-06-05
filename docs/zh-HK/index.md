---
title: 鉅犀科技 Wiki
description: 鉅犀科技產品教程與文檔中心
sidebar: false
outline: false
---

# 鉅犀科技 Wiki

鉅犀科技一直作為機器人與 AI 硬體合作夥伴，致力於實現更智慧、更易用的機器人解決方案。這裡是一個開放平台，彙集了鉅犀科技發布的全部 Wiki，向你展示我們在機器人學習與自動化方面的完整版圖。

<div class="hero-links">
  <a href="/zh-HK/tutorials/">快速開始</a>
  <a href="/zh-HK/topics/">技術專題</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank">GitHub</a>
</div>

## 最新文件

<div class="card-grid">
  <a href="/zh-HK/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial" class="card">
    <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop" alt="SO-ARM101-使用教程">
    <span>SO-ARM101-使用教程</span>
  </a>
  <a href="/zh-HK/tutorials/accessories/KWS-speech-recognition-module/index" class="card">
    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop" alt="KWS語音識別模組-系列教程">
    <span>KWS語音識別模組-系列教程</span>
  </a>
  <a href="/zh-HK/tutorials/sensors/imu/index" class="card">
    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop" alt="IMU慣性導航模組">
    <span>IMU慣性導航模組</span>
  </a>
  <a href="/zh-HK/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control" class="card">
    <img src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=250&fit=crop" alt="AmazingHand-界面控制教程">
    <span>AmazingHand-界面控制教程</span>
  </a>
</div>

## 瀏覽分類

<div class="category-grid">
  <a href="/zh-HK/tutorials/robot-arms/" class="category-card">
    <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop" alt="機器人機械臂系列">
    <span>機器人機械臂系列</span>
  </a>
  <a href="/zh-HK/tutorials/accessories/" class="category-card">
    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop" alt="機器人配件">
    <span>機器人配件</span>
  </a>
  <a href="/zh-HK/tutorials/sensors/" class="category-card">
    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop" alt="傳感器與感知">
    <span>傳感器與感知</span>
  </a>
</div>

## 更多資訊

感謝你選擇我們的產品！我們提供多種支援方式，以確保你的使用體驗盡可能順暢。

- 🌐 官方網站：[https://www.juxitech.com](https://www.juxitech.com)
- 💬 郵箱：support@juxitech.com
- 📧 商務合作：sales@juxitech.com
- 📺 B站：[https://space.bilibili.com/3546906737248821](https://space.bilibili.com/3546906737248821)

<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
})
</script>

<style>
.hero-links {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  margin-bottom: 48px;
}

.hero-links a {
  display: inline-block;
  padding: 10px 20px;
  background-color: #dbeafe;
  color: #1e40af;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
}

.hero-links a:hover {
  background-color: #bfdbfe;
  color: #1e3a8a;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin: 32px 0 64px 0;
}

.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.card span {
  display: block;
  padding: 16px;
  font-weight: 500;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin: 32px 0 64px 0;
}

.category-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.category-card img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.category-card span {
  display: block;
  padding: 16px;
  font-weight: 600;
}

.vp-doc h2 {
  margin-top: 64px;
}
</style>
