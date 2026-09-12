<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SearchModal from './components/SearchModal.vue'
import PurchaseLinks from './components/PurchaseLinks.vue'
import TopBanner from './components/TopBanner.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import NotFound404 from './components/NotFound404.vue'
import SiteFooter from './components/SiteFooter.vue'
import NavLinks from './components/NavLinks.vue'

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
      <NavLinks />
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

/* ---- 导航外链图标组(GitHub / Hugging Face / 官方商城)----
   插在暗色开关左侧:官方 DOM 中 VPNavBarAppearance 位于插槽内容之前,
   直接插入会落在开关右侧;用 order 重排 content-body 内全部可见子元素,
   目标视觉:菜单 … [图标组] [暗色开关] [语言] [搜索] */
.VPNavBarMenu {
  order: 1;
}

.nav-icons {
  order: 2;
}

.VPNavBarAppearance {
  order: 3;
}

.nav-right {
  order: 4;
}

.VPNavBarHamburger {
  order: 5;
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0 2px 0 6px;
  flex-shrink: 0;
}

.nav-icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-decoration: none;
  font-size: 18px;
  line-height: 1;
  color: var(--vp-c-text-1);
  transition: background-color 0.2s;
}

.nav-icon:hover {
  background-color: var(--vp-c-bg-soft);
}

.nav-icon svg {
  display: block;
}

/* 商城按钮带文字(仅图标不易理解):与语言切换按钮同款式样 */
.nav-store {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 13px;
  line-height: 1.4;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color 0.2s;
}

.nav-store:hover {
  border-color: var(--vp-c-brand-1);
}

.nav-store .store-emoji {
  font-size: 14px;
  line-height: 1;
}

/* <1280:导航空间有限,商城按钮退化为纯图标(与 GitHub/HF 圆图标同款),
   避免长菜单语言的导航溢出 */
@media (max-width: 1279px) {
  .nav-store {
    width: 34px;
    height: 34px;
    padding: 0;
    justify-content: center;
    border-color: transparent;
    background-color: transparent;
    border-radius: 50%;
  }

  .nav-store:hover {
    border-color: transparent;
    background-color: var(--vp-c-bg-soft);
  }

  .nav-store .store-text {
    display: none;
  }
}

/* 窄屏(菜单收进汉堡)同步收起图标组,保持导航简洁 */
@media (max-width: 959px) {
  .nav-icons {
    display: none;
  }
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
  /* 官方自带 padding-top: var(--vp-layout-top-height)(吸附时"模拟 banner 高度"用);
     导航固定顶部后,顶部状态下它显示为 Menu 行上方一段真实空白带;
     去掉后 Menu 行全程紧贴导航底(滚动后 var 归零时它本为 0,无视觉回归) */
  padding-top: 0 !important;
  margin-top: var(--vp-nav-height);
  top: calc(var(--vp-layout-top-height, 0px) + var(--vp-nav-height)) !important;
}

/* 空态(无大纲且无侧栏,如首页滚动后出现 "Return to top")官方会转为
   position:fixed——fixed 的 top 与 margin-top 叠加导致偏移翻倍(56+56=112),
   fixed 状态不占文档流,补流 margin 应清零 */
.VPLocalNav.fixed {
  margin-top: 0;
}

/* 官方断点:menu≥768 显示。导航已重构为 3 项平铺 + 1 个"更多"下拉(NavLinks
   结构变更后菜单由 ~800px 压缩到 ~400px),1152 起可容纳全部语言;
   768-1151 收进官方汉堡菜单。VPNavScreen 官方 CSS 在 ≥768 强制 display:none,
   需一并覆盖否则出现"✕ 已点击但菜单不出现"的死锁 */
@media (min-width: 768px) and (max-width: 1151px) {
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
