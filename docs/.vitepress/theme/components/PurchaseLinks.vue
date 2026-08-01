<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { localeIndex, frontmatter } = useData()

// 购买链接(README 中的淘宝店 + 官网)
const STORE_URL = 'https://juxitechnology.taobao.com/'
const SITE_URL = 'https://www.juxitech.com'

// 首页/About 等非教程页不显示(通过 frontmatter 控制,Layout 按路径过滤)
const isVisible = computed(() => frontmatter.value.purchase !== false)

const copy = computed(() => {
  if (localeIndex.value === 'en') {
    return { buy: 'Buy This Product', store: 'Taobao Store', site: 'Official Website' }
  }
  if (localeIndex.value === 'zh-HK') {
    return { buy: '購買此產品', store: '淘寶店', site: '官方網站' }
  }
  return { buy: '购买此产品', store: '淘宝店', site: '官方网站' }
})
</script>

<template>
  <div v-if="isVisible" class="purchase-bar">
    <span class="purchase-text">{{ copy.buy }}</span>
    <a :href="STORE_URL" target="_blank" rel="noopener" class="purchase-btn primary">{{ copy.store }}</a>
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
