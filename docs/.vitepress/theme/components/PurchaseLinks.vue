<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { localeIndex, frontmatter, page } = useData()

// 购买链接
const SITE_URL = 'https://www.juxitech.com'

// 产品路径 → Shopify 商品页映射(按教程路径片段匹配)
const PRODUCT_MAP = [
  { match: 'so-arm101', url: 'https://www.juxitech.com/products/so-arm101-developers-kit' },
  { match: 'amazing-hand', url: 'https://www.juxitech.com/products/amazinghand' },
  { match: 'lekiwi', url: 'https://www.juxitech.com/products/lekiwi-embodied-intelligence-mobile-robotic-car' },
  { match: 'imu', url: 'https://www.juxitech.com/products/imu-module-ahrs-attitude-and-heading-angle-sensor' },
  { match: 'KWS', url: 'https://www.juxitech.com/products/ai-voice-recognition-module' },
  { match: 'feetech', url: 'https://www.juxitech.com/products/feetech-scs0009-serial-bus-servo' },
  { match: '2dof-camera-gimbal', url: 'https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit' },
  { match: 'heart-rate-spo2', url: 'https://www.juxitech.com/collections/perception' },
  { match: '0.91-oled', url: 'https://www.juxitech.com/collections/all' },
  { match: '4k-hdmi', url: 'https://www.juxitech.com/products/4k-hd-hdmi-capture-card' },
  { match: 'kvm-switch', url: 'https://www.juxitech.com/products/4-in-1-kvm-switch-hub-ttl-serial-bluetooth-docking-station' },
  { match: 'usb-audio-card', url: 'https://www.juxitech.com/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction' },
  { match: 'jetson-csi', url: 'https://www.juxitech.com/collections/edge-computing' },
  { match: 'usb-auto-focus', url: 'https://www.juxitech.com/collections/perception' },
]

// 根据当前页面路径匹配产品购买链接
const productUrl = computed(() => {
  const path = page.value.relativePath
  const matched = PRODUCT_MAP.find((p) => path.includes(p.match))
  return matched ? matched.url : SITE_URL
})

// 非教程页不显示
const isVisible = computed(() => {
  if (frontmatter.value.purchase === false) return false
  return !page.value.relativePath.endsWith('index.md')
})

const copy = computed(() => {
  if (localeIndex.value === 'en') {
    return { buy: 'Buy This Product', store: 'Official Store', site: 'Official Website' }
  }
  if (localeIndex.value === 'zh-HK') {
    return { buy: '購買此產品', store: '官方商城', site: '官方網站' }
  }
  return { buy: '购买此产品', store: '官方商城', site: '官方网站' }
})
</script>

<template>
  <div v-if="isVisible" class="purchase-bar">
    <span class="purchase-text">{{ copy.buy }}</span>
    <a :href="productUrl" target="_blank" rel="noopener" class="purchase-btn primary">{{ copy.store }}</a>
    <a :href="SITE_URL" target="_blank" rel="noopener" class="purchase-btn">{{ copy.site }}</a>
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
