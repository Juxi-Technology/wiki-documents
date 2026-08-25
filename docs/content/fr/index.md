---
title: Juxi Technology Wiki
description: Centre de tutoriels et de documentation Juxi Technology
sidebar: false
outline: false
---

<div class="hero-section">

![logo](../../public/images/logos/logo-black.png)

# Juxi Technology Wiki

<p class="hero-subtitle">Plateforme documentaire ouverte pour la robotique & l'IA matérielle</p>
<p class="hero-desc">Des bras robotiques aux capteurs — construisez votre système robotique intelligent</p>

<div class="hero-links">
  <a :href="withBase('/fr/tutorials/')" class="hero-btn primary">🚀 Commencer</a>
  <a :href="withBase('/fr/products/')" class="hero-btn secondary">📚 Produits</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank" class="hero-btn secondary">⭐ GitHub</a>
</div>

</div>

## Gammes de produits

<div class="category-grid">
  <a :href="withBase('/fr/products/so-arm101')" class="category-card">
    <img :src="withBase('/images/categories/SO-ARM101.png')" alt="Bras robotiques">
    <span>Bras robotiques</span>
  </a>
  <a :href="withBase('/fr/products/imu-module')" class="category-card">
    <img :src="withBase('/images/categories/IMU.png')" alt="Capteurs">
    <span>Capteurs</span>
  </a>
  <a :href="withBase('/fr/downloads/')" class="category-card">
    <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="Téléchargements">
    <span>Téléchargements</span>
  </a>
</div>

<script setup>
import { withBase } from 'vitepress'
</script>