<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SearchModal from './components/SearchModal.vue'
import PurchaseLinks from './components/PurchaseLinks.vue'

const { Layout } = DefaultTheme
const { page } = useData()

// 首页与各 section 首页不显示购买入口
const showPurchase = computed(() => !page.value.relativePath.endsWith('index.md'))
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <SearchModal />
    </template>
    <template #doc-before>
      <PurchaseLinks v-if="showPurchase" />
    </template>
  </Layout>
</template>
