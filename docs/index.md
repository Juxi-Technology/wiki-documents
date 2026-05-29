---
title: 钜犀科技 Wiki
description: 钜犀科技产品教程与文档中心
sidebar: false
outline: false
---

# 钜犀科技 Wiki

钜犀科技一直作为机器人与 AI 硬件合作伙伴，致力于实现更智能、更易用的机器人解决方案。这里是一个开放平台，汇集了钜犀科技发布的全部 Wiki，向你展示我们在机器人学习与自动化方面的完整版图。

<div class="hero-links">
  <a href="/wiki-documents/tutorials/">快速开始</a>
  <a href="/wiki-documents/topics/">技术专题</a>
  <a href="https://github.com/Juxi-Technology/wiki-documents" target="_blank">GitHub</a>
</div>

## 最新文档

<div class="card-grid">
  <div class="card">
    <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop" alt="SO-ARM101 视觉抓取教程">
    <a href="/wiki-documents/tutorials/so-arm101-tutorial">SO-ARM101 视觉抓取完整教程</a>
  </div>
  <div class="card">
    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop" alt="LeRobot 数据采集进阶">
    <a href="/wiki-documents/tutorials/getting-started">LeRobot 数据采集进阶技巧</a>
  </div>
</div>

## 浏览分类

<div class="category-grid">
  <div class="category-card">
    <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop" alt="SO-ARM101 系列">
    <a href="/wiki-documents/tutorials/so-arm101-tutorial">SO-ARM101 系列教程</a>
  </div>
  <div class="category-card">
    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop" alt="技术文档">
    <a href="/wiki-documents/tech/">技术文档</a>
  </div>
  <div class="category-card">
    <img src="https://images.unsplash.com/photo-1531746790731-6c087fecd6c5?w=400&h=200&fit=crop" alt="成功案例">
    <a href="/wiki-documents/cases/">成功案例</a>
  </div>
  <div class="category-card">
    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop" alt="贡献者社区">
    <a href="/wiki-documents/community/">贡献者社区</a>
  </div>
  <div class="category-card">
    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop" alt="机器人学习专题">
    <a href="/wiki-documents/topics/">技术专题</a>
  </div>
</div>

## 技术支持与产品讨论

感谢你选择我们的产品！我们提供多种支持方式，以确保你的使用体验尽可能顺畅。我们提供多个沟通渠道，以满足不同偏好与需求。

- 📧 邮箱：support@juxitech.com
- 💬 GitHub Issues：[问题反馈](https://github.com/Juxi-Technology/wiki-documents/issues)
- 🌐 官方网站：[https://www.juxitech.com](https://www.juxitech.com)

<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
  // 这里可以添加自定义的 JavaScript
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

/* 增加模块间距 */
.vp-doc h2 {
  margin-top: 64px;
}
</style>
