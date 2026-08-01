<script setup>
import DefaultTheme from 'vitepress/theme'
import SearchModal from './components/SearchModal.vue'
import PageComments from './components/PageComments.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <SearchModal />
    </template>
    <template #page-bottom>
      <PageComments />
    </template>
  </Layout>
</template>
