---
title: Juxi Technology Wiki
description: Centro tutorial e documentazione Juxi Technology
sidebar: false
outline: false
---

<div class="hero-section">

![logo](/images/logos/logo-black.png)

# Juxi Technology Wiki

<p class="hero-subtitle">Piattaforma documentale aperta per robotica e hardware AI</p>
<p class="hero-desc">Dai bracci robotici ai sensori — costruisci il tuo sistema robotico intelligente</p>

<div class="hero-links">
  <a :href="withBase('/it/tutorials/')" class="hero-btn primary">🚀 Inizia</a>
  <a :href="withBase('/it/products/')" class="hero-btn secondary">📚 Prodotti</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank" class="hero-btn secondary">⭐ GitHub</a>
</div>

</div>

## Gamme di prodotti

<div class="category-grid">
  <a :href="withBase('/it/products/so-arm101')" class="category-card">
    <img :src="withBase('/images/categories/SO-ARM101.png')" alt="Bracci robotici">
    <span>Bracci robotici</span>
  </a>
  <a :href="withBase('/it/products/imu-module')" class="category-card">
    <img :src="withBase('/images/categories/IMU.png')" alt="Sensori">
    <span>Sensori</span>
  </a>
  <a :href="withBase('/it/downloads/')" class="category-card">
    <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="Download">
    <span>Download</span>
  </a>
</div>

<script setup>
import { withBase } from 'vitepress'
</script>