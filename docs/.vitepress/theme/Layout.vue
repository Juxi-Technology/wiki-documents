<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SearchModal from './components/SearchModal.vue'
import PurchaseLinks from './components/PurchaseLinks.vue'
import TopBanner from './components/TopBanner.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import PrevNext from './components/PrevNext.vue'

const { Layout } = DefaultTheme
const { page } = useData()

// 首页与各 section 首页不显示购买入口
const showPurchase = computed(() => !page.value.relativePath.endsWith('index.md'))
// 404 页不显示面包屑/购买
const is404 = computed(() => /404/.test(page.value.relativePath))
</script>

<template>
  <Layout>
    <template #layout-top>
      <TopBanner />
    </template>
    <template #nav-bar-content-after>
      <div class="nav-right">
        <LanguageSwitcher />
        <SearchModal />
      </div>
    </template>
    <template #doc-before>
      <template v-if="!is404">
        <Breadcrumb />
        <PurchaseLinks v-if="showPurchase" />
      </template>
    </template>
    <template #doc-footer-before>
      <PrevNext v-if="!is404" />
    </template>
  </Layout>
</template>

<style>
.nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 隐藏 VitePress 默认语言切换器(已被自定义 LanguageSwitcher 替代) */
.VPLocaleSwitcher {
  display: none !important;
}
</style>
