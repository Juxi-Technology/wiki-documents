<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase, useData } from 'vitepress'
import { data as dates } from '../../home.data'

// useData().lang 返回 config lang 值('zh-CN'/'zh-HK'/'en'...),与字典键一致
const { lang } = useData()

// 9 语文案(键与 config lang 一致)
const T: Record<string, { title: string; all: string; robot: string; sensor: string; accessory: string }> = {
  'zh-CN': { title: '最新文档', all: '全部', robot: '机械臂', sensor: '传感器', accessory: '配件' },
  en: { title: 'Latest Documents', all: 'All', robot: 'Robot Arms', sensor: 'Sensors', accessory: 'Accessories' },
  'zh-HK': { title: '最新文檔', all: '全部', robot: '機械臂', sensor: '傳感器', accessory: '配件' },
  ja: { title: '最新ドキュメント', all: 'すべて', robot: 'ロボットアーム', sensor: 'センサー', accessory: 'アクセサリー' },
  ko: { title: '최신 문서', all: '전체', robot: '로봇 암', sensor: '센서', accessory: '액세서리' },
  de: { title: 'Neueste Dokumente', all: 'Alle', robot: 'Roboterarme', sensor: 'Sensoren', accessory: 'Zubehör' },
  fr: { title: 'Documents récents', all: 'Tous', robot: 'Bras robotiques', sensor: 'Capteurs', accessory: 'Accessoires' },
  es: { title: 'Documentos recientes', all: 'Todos', robot: 'Brazos robóticos', sensor: 'Sensores', accessory: 'Accesorios' },
  it: { title: 'Documenti recenti', all: 'Tutti', robot: 'Bracci robotici', sensor: 'Sensori', accessory: 'Accessori' },
}

// 卡片标题(各语,与既有首页卡片一致)
const TITLES: Record<string, string[]> = {
  'zh-CN': ['SO-ARM101-使用教程', 'KWS语音识别模块-系列教程', 'IMU惯性导航模块', 'AmazingHand-界面控制教程'],
  en: ['SO-ARM101-Tutorial', 'KWS Speech Recognition Module Series', 'IMU Inertial Navigation Module', 'AmazingHand-Interface-Control'],
  'zh-HK': ['SO-ARM101-使用教程', 'KWS語音識別模組-系列教程', 'IMU慣性導航模組', 'AmazingHand-界面控制教程'],
  ja: ['SO-ARM101 使用チュートリアル', 'KWS 音声認識モジュール シリーズ', 'IMU 慣性ナビゲーションモジュール', 'AmazingHand インターフェース制御'],
  ko: ['SO-ARM101 사용 튜토리얼', 'KWS 음성 인식 모듈 시리즈', 'IMU 관성 내비게이션 모듈', 'AmazingHand 인터페이스 제어'],
  de: ['SO-ARM101-Tutorial', 'KWS-Spracherkennungsmodul – Tutorial-Serie', 'IMU-Trägheitsnavigationsmodul', 'AmazingHand Interface-Steuerung'],
  fr: ['Tutoriel SO-ARM101', 'Module KWS – série de tutoriels', 'Module de navigation inertielle IMU', "Contrôle d'interface AmazingHand"],
  es: ['Tutorial SO-ARM101', 'Módulo KWS – serie de tutoriales', 'Módulo de navegación inercial IMU', 'Control de interfaz AmazingHand'],
  it: ['Tutorial SO-ARM101', 'Modulo KWS – serie di tutorial', 'Modulo di navigazione inerziale IMU', 'Controllo interfaccia AmazingHand'],
}

// 卡片:相对路径(语言前缀由组件拼接)、分类(与产品页 category 枚举对齐)、图片
const CARDS = [
  { href: 'tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial', cat: 'robot', img: 'SO-ARM101.png' },
  { href: 'tutorials/accessories/KWS-speech-recognition-module/index', cat: 'accessory', img: 'AI_SoundCard.png' },
  { href: 'tutorials/sensors/imu/index', cat: 'sensor', img: 'IMU.png' },
  { href: 'tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control', cat: 'robot', img: 'AmazingHand.png' },
]

const t = computed(() => T[lang.value] || T.en)
const titles = computed(() => TITLES[lang.value] || TITLES.en)
const langDir = computed(() => {
  const dirs: Record<string, string> = { 'zh-CN': '/zh-hans/', 'zh-HK': '/zh-hant/', ja: '/ja/', ko: '/ko/', de: '/de/', fr: '/fr/', es: '/es/', it: '/it/', en: '/' }
  return dirs[lang.value] || '/'
})

const filter = ref('all')
const FILTERS = ['all', 'robot', 'sensor', 'accessory'] as const

// 卡片日期(带语言前缀的 URL → lastUpdated)
const dateMap = new Map(dates.map((d) => [d.url.replace(/\/$/, ''), d.lastUpdated]))
function cardDate(href: string) {
  return dateMap.get((langDir.value + href).replace(/\/$/, '')) || ''
}

const filtered = computed(() =>
  CARDS.map((c, i) => ({ ...c, title: titles.value[i]!, date: cardDate(c.href) })).filter((c) => filter.value === 'all' || c.cat === filter.value),
)
</script>

<template>
  <section class="latest-docs reveal">
    <h2>{{ t.title }}</h2>
    <div class="doc-filters" role="tablist" aria-label="filter">
      <button
        v-for="f in FILTERS"
        :key="f"
        class="doc-filter"
        :class="{ active: filter === f }"
        role="tab"
        :aria-selected="filter === f"
        @click="filter = f"
      >
        {{ t[f] }}
      </button>
    </div>
    <div class="card-grid">
      <a :href="withBase(langDir + c.href)" class="card" v-for="c in filtered" :key="c.href">
        <img :src="withBase('/images/home-cards/' + c.img)" :alt="c.title" loading="lazy">
        <span class="card-title">{{ c.title }}</span>
        <span class="card-meta">
          <span class="card-cat">{{ t[c.cat as 'all' | 'robot' | 'sensor' | 'accessory'] }}</span>
          <span v-if="c.date" class="card-date">{{ c.date }}</span>
        </span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.doc-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 4px 0 18px;
}

.doc-filter {
  padding: 5px 14px;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.doc-filter:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-text-1);
}

.doc-filter.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.card-cat {
  color: var(--vp-c-brand);
}

.card-date {
  font-variant-numeric: tabular-nums;
}
</style>
