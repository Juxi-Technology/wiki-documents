<script setup>
import DefaultTheme from 'vitepress/theme'
import SearchModal from './components/SearchModal.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <SearchModal />
    </template>
  </Layout>
</template>
