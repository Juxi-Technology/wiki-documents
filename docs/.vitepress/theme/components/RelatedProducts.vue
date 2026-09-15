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
  'pt-BR': 'Produtos relacionados',
  'pt-PT': 'Produtos relacionados',
}

const NAMES: Record<string, Record<string, string>> = {
  'so-arm101': { 'zh-CN': 'SO-ARM101 开发套件', en: 'SO-ARM101 Developer Kit', 'zh-HK': 'SO-ARM101 開發套件', ja: 'SO-ARM101 開発キット', ko: 'SO-ARM101 개발 키트', de: 'SO-ARM101 Entwickler-Kit', fr: 'Kit développeur SO-ARM101', es: 'Kit desarrollador SO-ARM101', it: 'Kit sviluppatore SO-ARM101', 'pt-BR': 'Kit desenvolvedor SO-ARM101', 'pt-PT': 'Kit desenvolvedor SO-ARM101' },
  'robot-vision-kit': { 'zh-CN': 'SO-ARM101 机械臂视觉套件', en: 'SO-ARM101 Robot Vision Kit', 'zh-HK': 'SO-ARM101 機械臂視覺套件', ja: 'SO-ARM101 ロボットビジョンキット', ko: 'SO-ARM101 로봇 비전 키트', de: 'SO-ARM101-Robotervisions-Kit', fr: 'Kit vision robotique SO-ARM101', es: 'Kit de visión robótica SO-ARM101', it: 'Kit visione robotica SO-ARM101', 'pt-BR': 'Kit de visão robótica SO-ARM101', 'pt-PT': 'Kit de visão robótica SO-ARM101' },
  'tpu-flexible-gripper': { 'zh-CN': 'SO-ARM101 TPU 柔性夹爪', en: 'SO-ARM101 TPU Flexible Gripper', 'zh-HK': 'SO-ARM101 TPU 柔性夾爪', ja: 'SO-ARM101 TPU フレキシブルグリッパー', ko: 'SO-ARM101 TPU 플렉시블 그리퍼', de: 'SO-ARM101 TPU-Flex-Greifer', fr: 'Pince flexible TPU SO-ARM101', es: 'Pinza flexible de TPU SO-ARM101', it: 'Pinza flessibile TPU SO-ARM101', 'pt-BR': 'Garra flexível TPU SO-ARM101', 'pt-PT': 'Garra flexível TPU SO-ARM101' },
  'overhead-camera-mount': { 'zh-CN': 'SO-ARM101 顶置相机支架', en: 'Overhead Camera Mount', 'zh-HK': 'SO-ARM101 頂置相機支架', ja: 'SO-ARM101 頭上カメラマウント', ko: 'SO-ARM101 오버헤드 카메라 마운트', de: 'SO-ARM101-Overhead-Kamerahalterung', fr: 'Support caméra plafonnier SO-ARM101', es: 'Montaje de cámara superior SO-ARM101', it: 'Supporto fotocamera overhead SO-ARM101', 'pt-BR': 'Suporte de câmera superior SO-ARM101', 'pt-PT': 'Suporte de câmara superior SO-ARM101' },
  'servo-driver-board': { 'zh-CN': '总线舵机驱动板', en: 'Bus Servo Driver Board', 'zh-HK': '總線舵機驅動板', ja: 'バスサーボドライバ基板', ko: '버스 서보 드라이버 보드', de: 'Bus-Servo-Treiberplatine', fr: 'Carte driver servo bus', es: 'Placa driver de servo de bus', it: 'Scheda driver servo bus', 'pt-BR': 'Placa driver de servo de barramento', 'pt-PT': 'Placa driver de servo de barramento' },
  amazinghand: { 'zh-CN': 'AmazingHand 开源 4 指灵巧手', en: 'AmazingHand 4-Finger Dexterous Hand', 'zh-HK': 'AmazingHand 開源 4 指靈巧手', ja: 'AmazingHand 4指器用ハンド', ko: 'AmazingHand 4손가락 정교 손', de: 'AmazingHand 4-Finger-Greifhand', fr: 'Main dexterous 4 doigts AmazingHand', es: 'Mano diestra 4 dedos AmazingHand', it: 'Mano dexterous 4 dita AmazingHand', 'pt-BR': 'Mão dexterous de 4 dedos AmazingHand', 'pt-PT': 'Mão dexterous de 4 dedos AmazingHand' },
  lekiwi: { 'zh-CN': 'Lekiwi 具身智能移动机器人', en: 'Lekiwi Mobile Robot', 'zh-HK': 'Lekiwi 具身智能移動機器人', ja: 'Lekiwi 具身知能移動ロボット', ko: 'Lekiwi 구현 지능 이동 로봇', de: 'Lekiwi Mobilitätsroboter', fr: 'Robot mobile Lekiwi', es: 'Robot móvil Lekiwi', it: 'Robot mobile Lekiwi', 'pt-BR': 'Robô móvel Lekiwi', 'pt-PT': 'Robô móvel Lekiwi' },
  'gps-beidou-module': { 'zh-CN': 'GPS & 北斗 GNSS 定位模块', 'en': 'GPS & BeiDou GNSS Positioning Module', 'zh-HK': 'GPS & 北斗 GNSS 定位模組', 'ja': 'GPS & 北斗 GNSS 測位モジュール', 'ko': 'GPS & 北斗 GNSS 측위 모듈', 'de': 'GPS- & Beidou-GNSS-Positionsmodul', 'fr': 'Module de positionnement GNSS GPS & Beidou', 'es': 'Módulo de posicionamiento GNSS GPS y Beidou', 'it': 'Modulo di posizionamento GNSS GPS e Beidou', 'pt-BR': 'Módulo de Posicionamento GNSS GPS e BeiDou', 'pt-PT': 'Módulo de Posicionamento GNSS GPS e BeiDou' },
  'imx219-csi-camera': { 'zh-CN': '79° IMX219 CSI 摄像头', 'en': '79° IMX219 CSI Camera', 'zh-HK': '79° IMX219 CSI 攝像頭', 'ja': '79° IMX219 CSI カメラ', 'ko': '79° IMX219 CSI 카메라', 'de': '79° IMX219 CSI-Kamera', 'fr': 'Caméra CSI IMX219 79°', 'es': 'Cámara CSI IMX219 79°', 'it': 'Fotocamera CSI IMX219 79°', 'pt-BR': 'Câmera CSI IMX219 79°', 'pt-PT': 'Câmara CSI IMX219 79°' },
  'usb-auto-focus-camera': { 'zh-CN': 'USB 自动对焦摄像头', en: 'USB Auto-Focus Camera', 'zh-HK': 'USB 自動對焦攝像頭', ja: 'USBオートフォーカスカメラ', ko: 'USB 자동 초점 카메라', de: 'USB-Kamera mit Autofokus', fr: 'Caméra USB à autofocus', es: 'Cámara USB con enfoque automático', it: 'Fotocamera USB con autofocus', 'pt-BR': 'Câmera USB com foco automático', 'pt-PT': 'Câmara USB com foco automático' },
  'feetech-servo': { 'zh-CN': 'Feetech 总线舵机(SCS0009 / STS3215)', en: 'Feetech Bus Servos (SCS0009 / STS3215)', 'zh-HK': 'Feetech 總線舵機(SCS0009 / STS3215)', ja: 'Feetech バスサーボ(SCS0009 / STS3215)', ko: 'Feetech 버스 서보(SCS0009 / STS3215)', de: 'Feetech-Bus-Servos (SCS0009 / STS3215)', fr: 'Servos bus Feetech (SCS0009 / STS3215)', es: 'Servos de bus Feetech (SCS0009 / STS3215)', it: 'Servo bus Feetech (SCS0009 / STS3215)', 'pt-BR': 'Servos de Barramento Feetech (SCS0009 / STS3215)', 'pt-PT': 'Servos de Barramento Feetech (SCS0009 / STS3215)' },
  'esp32-s3-wifi-module': { 'zh-CN': 'ESP32-S3 WiFi 视频模块', en: 'ESP32-S3 WiFi Video Module', 'zh-HK': 'ESP32-S3 WiFi 視頻模組', ja: 'ESP32-S3 WiFi 動画モジュール', ko: 'ESP32-S3 WiFi 영상 모듈', de: 'ESP32-S3 WiFi-Videomodul', fr: 'Module vidéo WiFi ESP32-S3', es: 'Módulo de vídeo WiFi ESP32-S3', it: 'Modulo video WiFi ESP32-S3', 'pt-BR': 'Módulo de Vídeo WiFi ESP32-S3', 'pt-PT': 'Módulo de Vídeo WiFi ESP32-S3' },
  xlerobot: { 'zh-CN': 'XLeRobot 双臂移动机器人', en: 'XLeRobot Dual-Arm Mobile Robot', 'zh-HK': 'XLeRobot 雙臂移動機器人', ja: 'XLeRobot 双腕移動ロボット', ko: 'XLeRobot 양팔 이동 로봇', de: 'XLeRobot Zweiarm-Mobilroboter', fr: 'Robot mobile à deux bras XLeRobot', es: 'Robot móvil de dos brazos XLeRobot', it: 'Robot mobile a due bracci XLeRobot', 'pt-BR': 'Robô móvel de dois braços XLeRobot', 'pt-PT': 'Robô móvel de dois braços XLeRobot' },
  'ai-voice-module': { 'zh-CN': 'AI 语音交互模块', en: 'AI Voice Interaction Module', 'zh-HK': 'AI 語音交互模組', ja: 'AI 音声対話モジュール', ko: 'AI 음성 인터랙션 모듈', de: 'AI-Sprachinteraktionsmodul', fr: "Module d'interaction vocale IA", es: 'Módulo de interacción de voz IA', it: 'Modulo di interazione vocale IA', 'pt-BR': 'Módulo de interação por voz IA', 'pt-PT': 'Módulo de interação por voz IA' },
}

const slugList = computed(() => props.slugs.split(',').map((s) => s.trim()).filter(Boolean))
const dir = computed(() => {
  const dirs: Record<string, string> = { 'zh-CN': '/zh-hans/', 'zh-HK': '/zh-hant/', ja: '/ja/', ko: '/ko/', de: '/de/', fr: '/fr/', es: '/es/', it: '/it/', 'pt-BR': '/pt-br/', 'pt-PT': '/pt-pt/', en: '/' }
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
