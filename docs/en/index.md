---
title: Juxi Technology Wiki
description: Juxi Technology Product Tutorials and Documentation Center
sidebar: false
outline: false
---

# Juxi Technology Wiki

Juxi Technology has been a robotics and AI hardware partner, committed to realizing smarter and easier-to-use robotic solutions. This is an open platform that brings together all Wiki published by Juxi Technology, showing you our complete landscape in robot learning and automation.

<div class="hero-links">
  <a href="/en/tutorials/">Get Started</a>
  <a href="/en/topics/">Tech Topics</a>
  <a href="https://github.com/Juxi-Technology/" target="_blank">GitHub</a>
</div>

## Latest Documents

<div class="card-grid">
  <a href="/en/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial" class="card">
    <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop" alt="SO-ARM101-Tutorial">
    <span>SO-ARM101-Tutorial</span>
  </a>
  <a href="/en/tutorials/accessories/KWS-speech-recognition-module/index" class="card">
    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop" alt="KWS Speech Recognition Module Series">
    <span>KWS Speech Recognition Module Series</span>
  </a>
  <a href="/en/tutorials/sensors/imu/index" class="card">
    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop" alt="IMU Inertial Navigation Module">
    <span>IMU Inertial Navigation Module</span>
  </a>
  <a href="/en/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control" class="card">
    <img src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=250&fit=crop" alt="AmazingHand-Interface-Control">
    <span>AmazingHand-Interface-Control</span>
  </a>
</div>

## Browse Categories

<div class="category-grid">
  <a href="/en/tutorials/robot-arms/" class="category-card">
    <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop" alt="Robot Arm Series">
    <span>Robot Arm Series</span>
  </a>
  <a href="/en/tutorials/accessories/" class="category-card">
    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop" alt="Robot Accessories">
    <span>Robot Accessories</span>
  </a>
  <a href="/en/tutorials/sensors/" class="category-card">
    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop" alt="Sensors and Perception">
    <span>Sensors and Perception</span>
  </a>
</div>

## More Information

Thank you for choosing our products! We offer multiple support methods to ensure your usage experience is as smooth as possible.

- 🌐 Official Website: [https://www.juxitech.com](https://www.juxitech.com)
- 💬 Email: support@juxitech.com
- 📧 Business: sales@juxitech.com
- 📺 Bilibili: [https://space.bilibili.com/3546906737248821](https://space.bilibili.com/3546906737248821)

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
