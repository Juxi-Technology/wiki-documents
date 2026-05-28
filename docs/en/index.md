---
title: Juxi Technology Wiki
description: Juxi Technology Product Tutorials and Documentation Center
sidebar: false
outline: false
---

# Juxi Technology Wiki

Since 2026, Juxi Technology has been a robotics and AI hardware partner, committed to realizing smarter and easier-to-use robotic solutions. This is an open platform that brings together all Wiki published by Juxi Technology, showing you our complete landscape in robot learning and automation.

<div class="hero-links">
  <a href="/wiki-documents/en/tutorials/">Get Started</a>
  <a href="/wiki-documents/en/topics/">Tech Topics</a>
  <a href="https://github.com/Juxi-Technology/wiki-documents" target="_blank">GitHub</a>
</div>

## Latest Documents

<div class="card-grid">
  <div class="card">
    <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop" alt="SO-ARM101 Visual Grasping Tutorial">
    <a href="/wiki-documents/en/tutorials/so-arm101-tutorial">SO-ARM101 Visual Grasping Complete Tutorial</a>
  </div>
  <div class="card">
    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop" alt="LeRobot Data Collection Advanced">
    <a href="/wiki-documents/en/tutorials/getting-started">LeRobot Data Collection Advanced Skills</a>
  </div>
</div>

## Browse Categories

<div class="category-grid">
  <div class="category-card">
    <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop" alt="SO-ARM101 Series">
    <a href="/wiki-documents/en/tutorials/so-arm101-tutorial">SO-ARM101 Series Tutorials</a>
  </div>
  <div class="category-card">
    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop" alt="Robot Learning Topics">
    <a href="/wiki-documents/en/topics/">Tech Topics</a>
  </div>
</div>

## Tech Support & Product Discussion

Thank you for choosing our products! We offer multiple support methods to ensure your usage experience is as smooth as possible. We provide multiple communication channels to meet different preferences and needs.

- 📧 Email: support@juxitech.com
- 💬 GitHub Issues: [Issue Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
- 🌐 Official Website: [https://www.juxitech.com](https://www.juxitech.com)

<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
  // Custom JavaScript can be added here
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

/* Increase section spacing */
.vp-doc h2 {
  margin-top: 64px;
}
</style>
