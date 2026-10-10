<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase, useData } from 'vitepress'
import { data as dates } from '../../home.data'

// useData().lang 返回 config lang 值('zh-CN'/'zh-HK'/'en'...),与字典键一致
const { lang } = useData()

// 11 语文案(键与 config lang 一致)
const T: Record<string, { title: string; filterLabel: string; all: string; robot: string; sensor: string; accessory: string; vision: string; kit: string }> = {
  'zh-CN': { title: '最新文档', filterLabel: '筛选', all: '全部', robot: '机器人', sensor: '传感器', accessory: '配件', vision: '视觉', kit: '套件' },
  en: { title: 'Latest Documents', filterLabel: 'Filter', all: 'All', robot: 'Robots', sensor: 'Sensors', accessory: 'Accessories', vision: 'Vision', kit: 'Kits' },
  'zh-HK': { title: '最新文檔', filterLabel: '篩選', all: '全部', robot: '機器人', sensor: '傳感器', accessory: '配件', vision: '視覺', kit: '套件' },
  ja: { title: '最新ドキュメント', filterLabel: '絞り込み', all: 'すべて', robot: 'ロボット', sensor: 'センサー', accessory: 'アクセサリー', vision: 'ビジョン', kit: 'キット' },
  ko: { title: '최신 문서', filterLabel: '필터', all: '전체', robot: '로봇', sensor: '센서', accessory: '액세서리', vision: '비전', kit: '키트' },
  de: { title: 'Neueste Dokumente', filterLabel: 'Filter', all: 'Alle', robot: 'Roboter', sensor: 'Sensoren', accessory: 'Zubehör', vision: 'Vision', kit: 'Kits' },
  fr: { title: 'Documents récents', filterLabel: 'Filtrer', all: 'Tous', robot: 'Robots', sensor: 'Capteurs', accessory: 'Accessoires', vision: 'Vision', kit: 'Kits' },
  es: { title: 'Documentos recientes', filterLabel: 'Filtrar', all: 'Todos', robot: 'Robots', sensor: 'Sensores', accessory: 'Accesorios', vision: 'Visión', kit: 'Kits' },
  it: { title: 'Documenti recenti', filterLabel: 'Filtra', all: 'Tutti', robot: 'Robot', sensor: 'Sensori', accessory: 'Accessori', vision: 'Visione', kit: 'Kit' },
  'pt-BR': { title: 'Documentos recentes', filterLabel: 'Filtrar', all: 'Todos', robot: 'Robôs', sensor: 'Sensores', accessory: 'Acessórios', vision: 'Visão', kit: 'Kits' },
  'pt-PT': { title: 'Documentos recentes', filterLabel: 'Filtrar', all: 'Todos', robot: 'Robôs', sensor: 'Sensores', accessory: 'Acessórios', vision: 'Visão', kit: 'Kits' },
}

// 卡片标题(各语,与既有首页卡片一致)
const TITLES: Record<string, string[]> = {
  'zh-CN': ['Jetson AGX Orin 教程', 'Jetson Orin Nano Super 教程', 'LeRobot 完整课程', 'AmazingHand灵巧手', 'XLeRobot-使用教程', 'IMU惯导模块', 'GPS北斗定位', 'ESP32-NanoCam图传', 'AI语音交互模块', 'CSI摄像头'],
  en: ['Jetson AGX Orin Tutorials', 'Jetson Orin Nano Super Tutorials', 'LeRobot Full Course', 'AmazingHand Dexterous Hand', 'XLeRobot-Tutorial', 'IMU Inertial Navigation Module', 'GPS & BeiDou Positioning Module', 'ESP32-NanoCam Video Module', 'AI Voice Interaction Module', 'IMX219 CSI Camera'],
  'zh-HK': ['Jetson AGX Orin 教程', 'Jetson Orin Nano Super 教程', 'LeRobot 完整課程', 'AmazingHand-界面控制教程', 'XLeRobot-使用教程', 'IMU慣性導航模組', 'GPS北斗定位模組', 'ESP32-NanoCam圖傳模組', 'AI語音交互模組', 'CSI攝像頭使用教程'],
  ja: ['Jetson AGX Orin チュートリアル', 'Jetson Orin Nano Super チュートリアル', 'LeRobot完全コース', 'AmazingHand 器用ハンド', 'XLeRobot 使用チュートリアル', 'IMU 慣性ナビゲーションモジュール', 'GPS 北斗測位モジュール', 'ESP32-NanoCam 動画転送モジュール', 'AI 音声対話モジュール', 'IMX219 CSI カメラ'],
  ko: ['Jetson AGX Orin 튜토리얼', 'Jetson Orin Nano Super 튜토리얼', 'LeRobot 전체 코스', 'AmazingHand 정교 손', 'XLeRobot 튜토리얼', 'IMU 관성 내비게이션 모듈', 'GPS 北斗 측위 모듈', 'ESP32-NanoCam 영상 전송', 'AI 음성 인터랙션 모듈', 'CSI 카메라'],
  de: ['Jetson AGX Orin Tutorials', 'Jetson Orin Nano Super Tutorials', 'LeRobot-Komplettkurs', 'AmazingHand Greifhand', 'XLeRobot-Tutorial', 'IMU-Trägheitsnavigationsmodul', 'GPS- & BeiDou-GNSS-Positionsmodul', 'ESP32-NanoCam Videomodul', 'AI-Sprachinteraktionsmodul', 'IMX219 CSI-Kamera'],
  fr: ['Tutoriels Jetson AGX Orin', 'Tutoriels Jetson Orin Nano Super', 'Cours LeRobot', 'Main dexterous AmazingHand', 'Tutoriel XLeRobot', 'Navigation inertielle IMU', 'Module GPS & Beidou', 'Transmission vidéo ESP32-NanoCam', 'Module d\'interaction vocale IA', 'Tutoriels caméra CSI'],
  es: ['Tutoriales de Jetson AGX Orin', 'Tutoriales de Jetson Orin Nano Super', 'Curso de LeRobot', 'Control de interfaz AmazingHand', 'Tutorial XLeRobot', 'Módulo de navegación inercial IMU', 'Posicionamiento GPS y BeiDou', 'Módulo de vídeo ESP32-NanoCam', 'Módulo de interacción de voz IA', 'Cámara CSI IMX219 79°'],
  it: ['Tutorial Jetson AGX Orin', 'Tutorial Jetson Orin Nano Super', 'Corso LeRobot', 'Mano robotica AmazingHand', 'Tutorial XLeRobot', 'Navigazione inerziale IMU', 'Modulo GPS e Beidou', 'Modulo video ESP32-NanoCam', 'Modulo di interazione vocale IA', 'Fotocamera CSI IMX219'],
  'pt-BR': ['Tutoriais do Jetson AGX Orin', 'Tutoriais do Jetson Orin Nano Super', 'Curso LeRobot', 'Mão hábil AmazingHand', 'Tutorial XLeRobot', 'Módulo de navegação inercial IMU', 'Posicionamento GPS e BeiDou', 'Módulo de vídeo ESP32-NanoCam', 'Módulo de interação por voz IA', 'Câmera CSI IMX219 79°'],
  'pt-PT': ['Tutoriais do Jetson AGX Orin', 'Tutoriais do Jetson Orin Nano Super', 'Curso de LeRobot', 'AmazingHand Mão Hábil', 'Tutorial XLeRobot', 'Módulo de navegação inercial IMU', 'Módulo GNSS GPS e BeiDou', 'Módulo de Vídeo ESP32-NanoCam', 'Módulo de interação por voz IA', 'Câmara CSI IMX219'],
}

// 卡片:相对路径(语言前缀由组件拼接)、分类(与产品页 category 枚举对齐)、图片
const CARDS = [
  { href: 'tutorials/jetson-agx-orin/quick-start', cat: 'kit', img: 'Jetson-AGX-Orin.png' },
  { href: 'tutorials/jetson-orin-nano/quick-start', cat: 'kit', img: 'Jetson-Orin-Nano.png' },
  { href: 'tutorials/robot-arms/so-arm101/lerobot/', cat: 'robot', img: 'SO-ARM101.png' },
  { href: 'tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control', cat: 'robot', img: 'AmazingHand.png' },
  { href: 'tutorials/robot-arms/xlerobot/', cat: 'robot', img: 'XLeRobot.png' },
  { href: 'tutorials/sensors/imu/', cat: 'sensor', img: 'IMU.png' },
  { href: 'tutorials/sensors/gps/GPS-Module-Info', cat: 'sensor', img: 'GPS.png' },
  { href: 'tutorials/accessories/esp32-nanocam/Ch02-Quick-Start', cat: 'accessory', img: 'ESP32-NanoCam.png' },
  { href: 'tutorials/accessories/ai-voice-module/Quick-Start', cat: 'accessory', img: 'AI-Voice-Module.png' },
  { href: 'tutorials/accessories/csi-camera/01-Jetson-CSI-Setup', cat: 'vision', img: 'CSI-Camera.png' },
]

const t = computed(() => T[lang.value] || T.en)
const titles = computed(() => TITLES[lang.value] || TITLES.en)
const langDir = computed(() => {
  const dirs: Record<string, string> = { 'zh-CN': '/zh-hans/', 'zh-HK': '/zh-hant/', ja: '/ja/', ko: '/ko/', de: '/de/', fr: '/fr/', es: '/es/', it: '/it/', 'pt-BR': '/pt-br/', 'pt-PT': '/pt-pt/', en: '/' }
  return dirs[lang.value] || '/'
})

const filter = ref('all')
const FILTERS = ['all', 'robot', 'sensor', 'accessory', 'vision', 'kit'] as const

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
    <div class="doc-filters" role="tablist" :aria-label="t.filterLabel">
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
          <span class="card-cat">{{ t[c.cat as 'all' | 'robot' | 'sensor' | 'accessory' | 'vision' | 'kit'] }}</span>
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
