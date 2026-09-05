<script setup lang="ts">
import { computed } from 'vue'
import { withBase, useData } from 'vitepress'

const props = defineProps<{ slugs: string }>()

// useData().lang 返回 config lang 值,与字典键一致
const { lang } = useData()

const T: Record<string, string> = {
  'zh-CN': '相关产品',
  en: 'Related Products',
  'zh-HK': '相關產品',
  ja: '関連製品',
  ko: '관련 제품',
  de: 'Verwandte Produkte',
  fr: 'Produits associés',
  es: 'Productos relacionados',
  it: 'Prodotti correlati',
}

const NAMES: Record<string, Record<string, string>> = {
  'so-arm101': { 'zh-CN': 'SO-ARM101 开发套件', en: 'SO-ARM101 Developer Kit', 'zh-HK': 'SO-ARM101 開發套件', ja: 'SO-ARM101 開発キット', ko: 'SO-ARM101 개발 키트', de: 'SO-ARM101 Entwickler-Kit', fr: 'Kit développeur SO-ARM101', es: 'Kit desarrollador SO-ARM101', it: 'Kit sviluppatore SO-ARM101' },
  'robot-vision-kit': { 'zh-CN': 'SO-ARM101 机械臂视觉套件', en: 'SO-ARM101 Robot Vision Kit', 'zh-HK': 'SO-ARM101 機械臂視覺套件', ja: 'SO-ARM101 ロボットビジョンキット', ko: 'SO-ARM101 로봇 비전 키트', de: 'SO-ARM101-Robotervisions-Kit', fr: 'Kit vision robotique SO-ARM101', es: 'Kit de visión robótica SO-ARM101', it: 'Kit visione robotica SO-ARM101' },
  'tpu-flexible-gripper': { 'zh-CN': 'SO-ARM101 TPU 柔性夹爪', en: 'SO-ARM101 TPU Flexible Gripper', 'zh-HK': 'SO-ARM101 TPU 柔性夾爪', ja: 'SO-ARM101 TPU フレキシブルグリッパー', ko: 'SO-ARM101 TPU 플렉시블 그리퍼', de: 'SO-ARM101 TPU-Flex-Greifer', fr: 'Pince flexible TPU SO-ARM101', es: 'Pinza flexible de TPU SO-ARM101', it: 'Pinza flessibile TPU SO-ARM101' },
  'overhead-camera-mount': { 'zh-CN': 'SO-ARM101 顶置相机支架', en: 'Overhead Camera Mount', 'zh-HK': 'SO-ARM101 頂置相機支架', ja: 'SO-ARM101 頭上カメラマウント', ko: 'SO-ARM101 오버헤드 카메라 마운트', de: 'SO-ARM101-Overhead-Kamerahalterung', fr: 'Support caméra plafonnier SO-ARM101', es: 'Montaje de cámara superior SO-ARM101', it: 'Supporto fotocamera overhead SO-ARM101' },
  'servo-driver-board': { 'zh-CN': '总线舵机驱动板', en: 'Bus Servo Driver Board', 'zh-HK': '總線舵機驅動板', ja: 'バスサーボドライバ基板', ko: '버스 서보 드라이버 보드', de: 'Bus-Servo-Treiberplatine', fr: 'Carte driver servo bus', es: 'Placa driver de servo de bus', it: 'Scheda driver servo bus' },
  amazinghand: { 'zh-CN': 'AmazingHand 开源 4 指灵巧手', en: 'AmazingHand 4-Finger Dexterous Hand', 'zh-HK': 'AmazingHand 開源 4 指靈巧手', ja: 'AmazingHand 4指器用ハンド', ko: 'AmazingHand 4손가락 정교 손', de: 'AmazingHand 4-Finger-Greifhand', fr: 'Main dexterous 4 doigts AmazingHand', es: 'Mano diestra 4 dedos AmazingHand', it: 'Mano dexterous 4 dita AmazingHand' },
  lekiwi: { 'zh-CN': 'Lekiwi 具身智能移动机器人', en: 'Lekiwi Mobile Robot', 'zh-HK': 'Lekiwi 具身智能移動機器人', ja: 'Lekiwi 具身知能移動ロボット', ko: 'Lekiwi 구현 지능 이동 로봇', de: 'Lekiwi Mobilitätsroboter', fr: 'Robot mobile Lekiwi', es: 'Robot móvil Lekiwi', it: 'Robot mobile Lekiwi' },
}

const slugList = computed(() => props.slugs.split(',').map((s) => s.trim()).filter(Boolean))
const dir = computed(() => {
  const dirs: Record<string, string> = { 'zh-CN': '/zh-hans/', 'zh-HK': '/zh-hant/', ja: '/ja/', ko: '/ko/', de: '/de/', fr: '/fr/', es: '/es/', it: '/it/', en: '/' }
  return dirs[lang.value] || '/'
})
const title = computed(() => T[lang.value] || T.en)
const items = computed(() =>
  slugList.value
    .map((slug) => ({ slug, name: NAMES[slug]?.[lang.value] || NAMES[slug]?.en || slug }))
    .filter((x) => x.name),
)
</script>

<template>
  <section class="related-products">
    <h2>{{ title }}</h2>
    <div class="rp-grid">
      <a v-for="p in items" :key="p.slug" :href="withBase(dir + 'products/' + p.slug)" class="rp-card">
        <span class="rp-name">{{ p.name }}</span>
        <span class="rp-arrow">→</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.rp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.rp-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 16px;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.rp-card:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
}

.rp-name {
  font-size: 14px;
  font-weight: 500;
}

.rp-arrow {
  color: var(--vp-c-brand);
  font-size: 16px;
  transition: transform 0.2s ease;
}

.rp-card:hover .rp-arrow {
  transform: translateX(3px);
}
</style>
