// 公告条(layout-top,36px)滚出视口后清除导航的 top 偏移:
// VPNav 是 sticky top: var(--vp-layout-top-height),banner 离开文档流后
// 若变量仍为 36px,导航会悬停在 36px 导致顶部空隙且滚动内容从缝隙穿过。
const BANNER_H = 36

if (typeof window !== 'undefined') {
  let raf = 0
  function syncTopOffset() {
    // 连续函数:scrollY 0→36 期间偏移 36→0 线性过渡,nav 随滚动平滑升至顶端
    // (阶跃写法 scrolled ? 0 : 36 会让 nav 在越过阈值时瞬间跳变)
    const h = Math.max(0, BANNER_H - window.scrollY)
    document.documentElement.style.setProperty('--vp-layout-top-height', `${h}px`)
  }

  // rAF 节流:scroll 高频率事件下合并到每帧一次 DOM 写
  window.addEventListener('scroll', () => {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(syncTopOffset)
  }, { passive: true })
  syncTopOffset()
}
