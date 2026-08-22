---
title: Juxi Technology Wiki
description: Juxi Technology 제품 튜토리얼 및 문서 센터
sidebar: false
outline: false
---

<div class="hero-section">

![logo](/images/logos/logo-black.png)

# Juxi Technology Wiki

<p class="hero-subtitle">로보틱스 및 AI 하드웨어 오픈 문서 플랫폼</p>
<p class="hero-desc">로봇 암부터 센서까지, 스마트 로봇 시스템 구축 지원</p>

<div class="hero-links">
  <a :href="withBase('/ko/tutorials/')" class="hero-btn primary">🚀 시작하기</a>
  <a :href="withBase('/ko/products/')" class="hero-btn secondary">📚 제품</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank" class="hero-btn secondary">⭐ GitHub</a>
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
</script>