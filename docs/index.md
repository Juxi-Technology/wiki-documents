---
title: 钜犀科技 Wiki
description: 钜犀科技产品教程与文档中心
sidebar: false
outline: false
---

# 钜犀科技 Wiki

钜犀科技一直作为机器人与 AI 硬件合作伙伴，致力于实现更智能、更易用的机器人解决方案。这里是一个开放平台，汇集了钜犀科技发布的全部 Wiki，向你展示我们在机器人学习与自动化方面的完整版图。

<div class="hero-links">
  <a href="/tutorials/">快速开始</a>
  <a href="/topics/">技术专题</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank">GitHub</a>
</div>

## 最新文档

<div class="card-grid">
  <a href="/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial" class="card">
    <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop" alt="SO-ARM101-使用教程">
    <span>SO-ARM101-使用教程</span>
  </a>
  <a href="/tutorials/accessories/KWS-speech-recognition-module/index" class="card">
    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop" alt="KWS语音识别模块-系列教程">
    <span>KWS语音识别模块-系列教程</span>
  </a>
  <a href="/tutorials/sensors/imu/index" class="card">
    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop" alt="IMU惯性导航模块">
    <span>IMU惯性导航模块</span>
  </a>
  <a href="/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control" class="card">
    <img src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=250&fit=crop" alt="AmazingHand-界面控制教程">
    <span>AmazingHand-界面控制教程</span>
  </a>
</div>

## 浏览分类

<div class="category-grid">
  <a href="/tutorials/robot-arms/" class="category-card">
    <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop" alt="机器人机械臂系列">
    <span>机器人机械臂系列</span>
  </a>
  <a href="/tutorials/accessories/" class="category-card">
    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop" alt="机器人配件">
    <span>机器人配件</span>
  </a>
  <a href="/tutorials/sensors/" class="category-card">
    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop" alt="传感器与感知">
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
