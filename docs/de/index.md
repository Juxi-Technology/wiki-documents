---
title: Juxi Technology Wiki
description: Juxi Technology Produkt-Tutorials und Dokumentationszentrum
sidebar: false
outline: false
---

<div class="hero-section">

![logo](/images/logos/logo-black.png)

# Juxi Technology Wiki

<p class="hero-subtitle">Offene Dokumentationsplattform für Robotik & AI-Hardware</p>
<p class="hero-desc">Von Roboterarmen bis Sensoren — bauen Sie Ihr intelligentes Robotersystem</p>

<div class="hero-links">
  <a :href="withBase('/de/tutorials/')" class="hero-btn primary">🚀 Loslegen</a>
  <a :href="withBase('/de/products/')" class="hero-btn secondary">📚 Produkte</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank" class="hero-btn secondary">⭐ GitHub</a>
</div>

</div>

## Produktreihen

<div class="category-grid">
  <a :href="withBase('/de/products/so-arm101')" class="category-card">
    <img :src="withBase('/images/categories/SO-ARM101.png')" alt="Roboterarme">
    <span>Roboterarme</span>
  </a>
  <a :href="withBase('/de/products/imu-module')" class="category-card">
    <img :src="withBase('/images/categories/IMU.png')" alt="Sensoren">
    <span>Sensoren</span>
  </a>
  <a :href="withBase('/de/downloads/')" class="category-card">
    <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="Downloads">
    <span>Downloads</span>
  </a>
</div>

<script setup>
import { withBase } from 'vitepress'
</script>