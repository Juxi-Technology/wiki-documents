<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

// 各语言公告文案(如需要改动只需修改此处)
const MESSAGES: Record<string, string> = {
  'zh-CN': '🧪 新教程持续更新中 · 从机械臂到传感器,跟着教程从零搭建',
  'en': '🧪 New tutorials are being published — build from robot arms to sensors step by step',
  'zh-HK': '🧪 新教程持續更新中 · 由機械臂到傳感器,跟隨教程從零搭建',
  'ja': '🧪 新しいチュートリアルを公開中 — ロボットアームからセンサーまで',
  'ko': '🧪 새 튜토리얼이 계속 업데이트 중 — 로봇 팔부터 센서까지',
  'de': '🧪 Neue Tutorials in Arbeit — vom Roboterarm bis zum Sensor',
  'fr': '🧪 De nouveaux tutoriels arrivent — du bras robotique au capteur',
  'es': '🧪 Se publican nuevos tutoriales — del brazo robótico al sensor',
  'it': '🧪 Stanno arrivando nuovi tutorial — dal braccio robotico al sensore',
  'pt-BR': '🧪 Novos tutoriais em andamento — do braço robótico ao sensor',
  'pt-PT': '🧪 Novos tutoriais em andamento — do braço robótico ao sensor',
}

const msg = computed(() => MESSAGES[lang.value] || MESSAGES['zh-CN'])
</script>

<template>
  <div class="top-banner">
    <span class="top-banner-inner">
      {{ msg }}
    </span>
  </div>
</template>

<style scoped>
.top-banner {
  background: #eef4fc;
  border-bottom: 1px solid #c9dcf0;
  text-align: center;
  font-size: 13px;
  height: 36px;
  line-height: 36px;
  overflow: hidden;
  padding: 0 16px;
  /* 单行锁高:行盒基线/descender 会令实际高度漂移(如 51px),
     导致 --vp-layout-top-height(36px) 占位与真实高度错位出空白 */
  box-sizing: border-box;
}

.dark .top-banner {
  background: #14273f;
  border-bottom-color: #23486e;
}

.top-banner-inner {
  color: #1e4a7a;
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 100%;
}

.dark .top-banner-inner {
  color: #9dc1e8;
}
</style>
