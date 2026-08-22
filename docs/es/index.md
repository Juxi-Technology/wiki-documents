---
title: Juxi Technology Wiki
description: Centro de tutoriales y documentación de Juxi Technology
sidebar: false
outline: false
---

<div class="hero-section">

![logo](/images/logos/logo-black.png)

# Juxi Technology Wiki

<p class="hero-subtitle">Plataforma abierta de documentación para robótica y hardware de IA</p>
<p class="hero-desc">De brazos robóticos a sensores — construye tu sistema robótico inteligente</p>

<div class="hero-links">
  <a :href="withBase('/es/tutorials/')" class="hero-btn primary">🚀 Empezar</a>
  <a :href="withBase('/es/products/')" class="hero-btn secondary">📚 Productos</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank" class="hero-btn secondary">⭐ GitHub</a>
</div>

</div>

## Gamas de productos

<div class="category-grid">
  <a :href="withBase('/es/products/so-arm101')" class="category-card">
    <img :src="withBase('/images/categories/SO-ARM101.png')" alt="Brazos robóticos">
    <span>Brazos robóticos</span>
  </a>
  <a :href="withBase('/es/products/imu-module')" class="category-card">
    <img :src="withBase('/images/categories/IMU.png')" alt="Sensores">
    <span>Sensores</span>
  </a>
  <a :href="withBase('/es/downloads/')" class="category-card">
    <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="Descargas">
    <span>Descargas</span>
  </a>
</div>

<script setup>
import { withBase } from 'vitepress'
</script>