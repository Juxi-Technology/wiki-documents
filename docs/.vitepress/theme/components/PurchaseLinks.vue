<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { localeIndex, frontmatter, page } = useData()

const SITE_URL = 'https://www.juxitech.com'

// 产品路径 → Shopify 商品路径映射(不含语言前缀,由 localePrefix 拼接)
const PRODUCT_MAP = [
  { match: 'so-arm101', path: 'products/so-arm101-developers-kit' },
  { match: 'amazing-hand', path: 'products/amazinghand' },
  { match: 'lekiwi', path: 'products/lekiwi-embodied-intelligence-mobile-robotic-car' },
  { match: 'imu', path: 'products/imu-module-ahrs-attitude-and-heading-angle-sensor' },
  { match: 'KWS', path: 'products/ai-voice-recognition-module' },
  { match: 'feetech', path: 'products/feetech-scs0009-serial-bus-servo' },
  { match: '2dof-camera-gimbal', path: 'products/2-dof-servo-pan-tilt-unit' },
  { match: 'heart-rate-spo2', path: 'collections/perception' },
  { match: '0.91-oled', path: 'collections/all' },
  { match: '4k-hdmi', path: 'products/4k-hd-hdmi-capture-card' },
  { match: 'kvm-switch', path: 'products/4-in-1-kvm-switch-hub-ttl-serial-bluetooth-docking-station' },
  { match: 'usb-audio-card', path: 'products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction' },
  { match: 'jetson-csi', path: 'collections/edge-computing' },
  { match: 'usb-auto-focus', path: 'collections/perception' },
]

// Shopify 语言前缀:Wiki locale → Shopify 语言
// 9 语言全显式:Shopify root 按访客浏览器语言 302,不能当静态链接
// (zh-hans → zh-hans/;zh-hant → zh-hant/;ja/ko/de/fr/es/it 各自目录;en root → 无前缀)
const localePrefix = computed(() => {
  const dirs = {
    'zh-hans': 'zh-hans/',
    'zh-hant': 'zh-hant/',
    ja: 'ja/',
    ko: 'ko/',
    de: 'de/',
    fr: 'fr/',
    es: 'es/',
    it: 'it/',
  }
  return dirs[localeIndex.value] || ''
})

// 根据当前页面路径匹配产品购买链接(带语言前缀)
const productUrl = computed(() => {
  const path = page.value.relativePath
  const matched = PRODUCT_MAP.find((p) => path.includes(p.match))
  const basePath = matched ? matched.path : ''
  return `${SITE_URL}/${localePrefix.value}${basePath}`
})

// 官网链接同样带语言前缀
const siteUrl = computed(() => `${SITE_URL}/${localePrefix.value}`)

// 非教程页不显示
const isVisible = computed(() => {
  if (frontmatter.value.purchase === false) return false
  return !page.value.relativePath.endsWith('index.md')
})

const copy = computed(() => {
  if (localeIndex.value === 'zh-hans') {
    return { buy: '购买此产品', store: '官方商城', site: '官方网站' }
  }
  if (localeIndex.value === 'zh-hant') {
    return { buy: '購買此產品', store: '官方商城', site: '官方網站' }
  }
  return { buy: 'Buy This Product', store: 'Official Store', site: 'Official Website' }
})
</script>

<template>
  <div v-if="isVisible" class="purchase-bar">
    <span class="purchase-text">{{ copy.buy }}</span>
    <a :href="productUrl" target="_blank" rel="noopener" class="purchase-btn primary">{{ copy.store }}</a>
    <a :href="siteUrl" target="_blank" rel="noopener" class="purchase-btn">{{ copy.site }}</a>
  </div>
</template>

<style scoped>
.purchase-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin: 24px 0;
  padding: 16px 20px;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.purchase-text {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.purchase-btn {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid var(--vp-c-gutter);
  color: var(--vp-c-text-1);
  transition: all 0.2s;
}

.purchase-btn.primary {
  background-color: #1e3a5f;
  border-color: #1e3a5f;
  color: #ffffff;
}

.purchase-btn.primary:hover {
  background-color: #152a45;
}

.purchase-btn:not(.primary):hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}
</style>
