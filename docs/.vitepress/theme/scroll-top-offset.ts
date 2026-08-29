// 公告条(layout-top,36px)滚出视口后清除导航的 top 偏移:
// VPNav 是 sticky top: var(--vp-layout-top-height),banner 离开文档流后
// 若变量仍为 36px,导航会悬停在 36px 导致顶部空隙且滚动内容从缝隙穿过。
const BANNER_H = 36

if (typeof window !== 'undefined') {
  function syncTopOffset() {
    const h = window.scrollY > BANNER_H ? '0px' : `${BANNER_H}px`
    document.documentElement.style.setProperty('--vp-layout-top-height', h)
  }

  window.addEventListener('scroll', syncTopOffset, { passive: true })
  syncTopOffset()
}
