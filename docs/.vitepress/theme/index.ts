import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import HomeLatestDocs from './components/HomeLatestDocs.vue'
import CommunityStrip from './components/CommunityStrip.vue'
import RelatedProducts from './components/RelatedProducts.vue'
import './style.css'
// 语言自动重定向(浏览器语言 + 手选偏好记忆;**仅首页**触发,内页不换语种)
import './auto-lang-redirect'
// 滚动越过公告条后导航置顶(清除 --vp-layout-top-height 偏移)
import './scroll-top-offset'
// 区块滚动渐入 + 阅读进度条
import './effects'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // 首页/内容组件:md 内直接使用,无需在每个 index.md 里 import
    app.component('HomeLatestDocs', HomeLatestDocs)
    app.component('CommunityStrip', CommunityStrip)
    app.component('RelatedProducts', RelatedProducts)
  },
}
