---
title: 鉅犀科技 Wiki
description: 鉅犀科技產品教程與文檔中心
sidebar: false
outline: false
---

# 鉅犀科技 Wiki

鉅犀科技一直作為機器人與 AI 硬體合作夥伴，致力於實現更智慧、更易用的機器人解決方案。這裡是一個開放平台，彙集了鉅犀科技發布的全部 Wiki，向你展示我們在機器人學習與自動化方面的完整版圖。

<div class="hero-links">
  <a href="/wiki-documents/zh-HK/tutorials/">快速開始</a>
  <a href="/wiki-documents/zh-HK/topics/">技術專題</a>
  <a href="https://github.com/Juxi-Technology/wiki-documents" target="_blank">GitHub</a>
</div>

## 最新文件

<div class="card-grid">
  <div class="card">
    <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop" alt="SO-ARM101 視覺抓取教程">
    <a href="/wiki-documents/zh-HK/tutorials/so-arm101-tutorial">SO-ARM101 視覺抓取完整教程</a>
  </div>
  <div class="card">
    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop" alt="LeRobot 數據採集進階">
    <a href="/wiki-documents/zh-HK/tutorials/getting-started">LeRobot 數據採集進階技巧</a>
  </div>
</div>

## 瀏覽分類

<div class="category-grid">
  <div class="category-card">
    <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop" alt="SO-ARM101 系列">
    <a href="/wiki-documents/zh-HK/tutorials/so-arm101-tutorial">SO-ARM101 系列教程</a>
  </div>
  <div class="category-card">
    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop" alt="機器人學習專題">
    <a href="/wiki-documents/zh-HK/topics/">技術專題</a>
  </div>
</div>

## 技術支援與產品討論

感謝你選擇我們的產品！我們提供多種支援方式，以確保你的使用體驗盡可能順暢。我們提供多個溝通渠道，以滿足不同偏好與需求。

- 📧 郵箱：support@juxitech.com
- 💬 GitHub Issues：[問題回饋](https://github.com/Juxi-Technology/wiki-documents/issues)
- 🌐 官方網站：[https://www.juxitech.com](https://www.juxitech.com)

<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
  // 這裡可以添加自訂的 JavaScript
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

.card a {
  display: block;
  padding: 16px;
  text-decoration: none;
  color: inherit;
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

.category-card a {
  display: block;
  padding: 16px;
  text-decoration: none;
  color: inherit;
  font-weight: 600;
}

/* 增加模組間距 */
.vp-doc h2 {
  margin-top: 64px;
}
</style>
