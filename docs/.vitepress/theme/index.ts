import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './style.css'
// 语言自动重定向(浏览器语言 + 手选偏好记忆,仅根语言 URL 触发)
import './auto-lang-redirect'

export default {
  ...DefaultTheme,
  Layout,
}
