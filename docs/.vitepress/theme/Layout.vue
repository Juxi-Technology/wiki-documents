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
import NotFound404 from './components/NotFound404.vue'
import SiteFooter from './components/SiteFooter.vue'

const { Layout } = DefaultTheme
const { page } = useData()

// 首页与各 section 首页不显示购买入口
const showPurchase = computed(() => !page.value.relativePath.endsWith('index.md'))
// 404 页不显示面包屑/购买,并整页替换为品牌 404
const is404 = computed(() => page.value.isNotFound === true || /404/.test(page.value.relativePath))
</script>

<template>
  <NotFound404 v-if="is404" />
  <Layout v-else>
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
    <template #layout-bottom>
      <SiteFooter />
    </template>
  </Layout>
</template>

<style>
.nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
  /* 与官方暗色开关(VPNavBarAppearance)留呼吸间距,并在 resize 时禁止被压缩重叠 */
  margin-left: 12px;
  flex-shrink: 0;
}

/* 隐藏 VitePress 默认语言切换器(.VPNavBarTranslations,VitePress 1.6 实际类名;
   已被自定义 LanguageSwitcher 替代,避免导航出现两个语言按钮挤占) */
.VPNavBarTranslations {
  display: none !important;
}

/* 有 sidebar 的页面:页脚左侧栏避让 fixed sidebar 面板,
   否则页脚品牌列会被白色侧栏面板遮挡 */
@media (min-width: 960px) {
  body:has(.VPDoc.has-sidebar) .site-footer {
    margin-left: var(--vp-sidebar-width);
  }
}

/* 官方仅在 ≥960 将 VPNav 设为 fixed,<960 为 relative(top: var)
   → 移动/平板出现滚动丢失置顶 + banner 与 nav 之间 36px 空隙。
   统一全断点固定:顶部偏移跟随 --vp-layout-top-height(由
   scroll-top-offset.ts 在滚动越过公告条后清零) */
.VPNav {
  position: fixed !important;
  top: var(--vp-layout-top-height, 0px);
}

/* 无内置搜索配置,默认搜索模块为空占位;自定义 SearchModal 接管 */
.VPNavBarSearch {
  display: none !important;
}

/* VPNavBarExtra 承载默认 translations+appearance 的 flyout(⋯),
   翻译切换已由自定义组件替代,整套隐藏使 nav 右侧只留 语言/搜索 两枚按钮 */
.VPNavBarExtra {
  display: none !important;
}

/* VPLocalNav(<960 的 "Menu ⏤ On this page" 行)官方 <960 依赖 VPNav 占文档流
   (relative)排位,而我们将 VPNav 全面改为 fixed(脱流)→ 流缺 nav-height,
   localNav 上移钻进固定 nav 底下被裁上半;补回流位,并把 sticky 吸附基准
   从视口顶改为 nav 底边(滚动后 nav 固定,吸附点必须同步,否则整行被 nav 盖住) */
.VPLocalNav {
  margin-top: var(--vp-nav-height);
  top: calc(var(--vp-layout-top-height, 0px) + var(--vp-nav-height)) !important;
}

/* 官方断点:menu≥768 显示但 7 项菜单在 768-959 必然溢出(官方无兜底),
   此区间收进官方汉堡菜单;VPNavScreen 官方 CSS 在 ≥768 强制 display:none,
   需一并覆盖否则出现"✕ 已点击但菜单不出现"的死锁 */
@media (min-width: 768px) and (max-width: 959px) {
  .VPNavBarMenu {
    display: none !important;
  }

  .VPNavBarHamburger {
    display: flex !important;
  }

  .VPNavScreen {
    display: block !important;
  }
}
</style>
