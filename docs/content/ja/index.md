---
title: Juxi Technology Wiki
description: Juxi Technology 製品チュートリアルとドキュメントセンター
sidebar: false
outline: false
---

<div class="hero-section">

![logo](../../public/images/logos/logo-black.png)

# Juxi Technology Wiki

<p class="hero-subtitle">ロボティクスとAIハードウェアのオープンドキュメントプラットフォーム</p>
<p class="hero-desc">ロボットアームからセンサーまで、スマートロボットシステムの構築を支援</p>

<div class="hero-links">
  <a :href="withBase('/ja/tutorials/')" class="hero-btn primary">🚀 はじめる</a>
  <a :href="withBase('/ja/products/')" class="hero-btn secondary">📚 製品</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank" class="hero-btn secondary">⭐ GitHub</a>
</div>

</div>

## 製品シリーズ

<div class="category-grid">
  <a :href="withBase('/ja/products/so-arm101')" class="category-card">
    <img :src="withBase('/images/categories/SO-ARM101.png')" alt="ロボットアーム">
    <span>ロボットアーム</span>
  </a>
  <a :href="withBase('/ja/products/imu-module')" class="category-card">
    <img :src="withBase('/images/categories/IMU.png')" alt="センサー">
    <span>センサー</span>
  </a>
  <a :href="withBase('/ja/downloads/')" class="category-card">
    <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="ダウンロード">
    <span>ダウンロード</span>
  </a>
</div>

<script setup>
import { withBase } from 'vitepress'
</script>