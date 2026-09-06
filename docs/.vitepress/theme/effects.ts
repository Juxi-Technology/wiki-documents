// 首页区块滚动渐入 + 文档页阅读进度条(均挂载于 Layout,页面切换自动重建)
if (typeof window !== 'undefined') {
  // 模块执行标志(供调试)
  ;(window as any).__juxiEffects = true
  // 渐入门控:style.css 中 .reveal 的初始隐藏仅在 html.js-anim 下生效
  document.documentElement.classList.add('js-anim')

  // ---- 滚动渐入:元素顶部进入视口即加 .in ----
  // 不用 IntersectionObserver:页面可被一键滚到底/锚点跳转,元素会被"跨帧越过",
  // IO 可能漏检;逐帧检测 getBoundingClientRect 对所有场景一致可靠
  function checkReveal() {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in)')
    if (!els.length) return
    const vh = window.innerHeight
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('in')
    })
  }
  function initReveal() {
    checkReveal()
  }

  // ---- 阅读进度条(仅文档页) ----
  let bar: HTMLDivElement | null = null
  let raf = 0
  function updateBar() {
    const doc = document.documentElement
    const max = doc.scrollHeight - doc.clientHeight
    if (max > 0 && bar) bar.style.width = Math.min(100, (doc.scrollTop / max) * 100) + '%'
  }
  function initProgress() {
    const isHome = !document.querySelector('.vp-doc')
    bar = document.getElementById('reading-bar')
    if (isHome) {
      if (bar) bar.style.display = 'none'
      return
    }
    if (!bar) {
      bar = document.createElement('div')
      bar.id = 'reading-bar'
      document.body.appendChild(bar)
    }
    bar.style.display = 'block'
    updateBar()
  }
  function onScroll() {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      updateBar()
      checkReveal()
    })
  }

  // ---- 正文图片灯箱:点击 .vp-doc 内图片放大,←/→ 切换,ESC/遮罩点击关闭 ----
  function initLightbox() {
    if (document.getElementById('image-lightbox')) return
    let imgs: string[] = []
    let idx = 0
    const overlay = document.createElement('div')
    overlay.id = 'image-lightbox'
    overlay.className = 'lightbox'
    overlay.innerHTML = `
      <button class="lb-close" aria-label="Close">✕</button>
      <button class="lb-nav lb-prev" aria-label="Previous">‹</button>
      <figure class="lb-figure">
        <img alt="">
        <figcaption></figcaption>
      </figure>
      <button class="lb-nav lb-next" aria-label="Next">›</button>`
    document.body.appendChild(overlay)
    const imgEl = overlay.querySelector('img')!
    const capEl = overlay.querySelector('figcaption')!
    const closeBtn = overlay.querySelector('.lb-close')!
    const prevBtn = overlay.querySelector('.lb-prev')!
    const nextBtn = overlay.querySelector('.lb-next')!

    const IMG_RE = /\.(png|jpe?g|gif|webp|svg)(\?[^)]*)?$/i
    function show(i: number) {
      idx = (i + imgs.length) % imgs.length
      imgEl.src = imgs[idx]
      const docImg = document.querySelectorAll<HTMLImageElement>('.vp-doc img')[idx]
      const alt = docImg?.alt || ''
      capEl.replaceChildren()
      if (imgs.length > 1) {
        const counter = document.createElement('span')
        counter.textContent = `${idx + 1} / ${imgs.length}`
        capEl.appendChild(counter)
      }
      if (alt) {
        const altSpan = document.createElement('span')
        altSpan.textContent = alt
        capEl.appendChild(altSpan)
      }
      const nav = imgs.length > 1 ? 'flex' : 'none'
      ;(prevBtn as HTMLElement).style.display = nav
      ;(nextBtn as HTMLElement).style.display = nav
      overlay.classList.add('open')
      document.body.style.overflow = 'hidden'
    }
    function close() {
      overlay.classList.remove('open')
      document.body.style.overflow = ''
    }

    document.addEventListener('click', (e) => {
      const t = e.target as HTMLElement
      if (t.tagName === 'IMG' && t.closest('.vp-doc') && !t.closest('a') && t.clientWidth >= 80) {
        const list = Array.from(document.querySelectorAll<HTMLImageElement>('.vp-doc img')).filter((i) => IMG_RE.test(i.src || ''))
        const src = (t as HTMLImageElement).src
        const i = list.findIndex((x) => x.src === src)
        if (i >= 0) {
          imgs = list.map((x) => x.src)
          e.preventDefault()
          show(i)
        }
      }
    })
    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('open')) return
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') show(idx - 1)
      else if (e.key === 'ArrowRight') show(idx + 1)
    })
    closeBtn.addEventListener('click', close)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close()
    })
    prevBtn.addEventListener('click', () => show(idx - 1))
    nextBtn.addEventListener('click', () => show(idx + 1))
  }

  // VitePress 路由切换不刷新页面;hydration/导航会替换 DOM 节点,
  // 需要在新 DOM 就绪后重新检查 reveal 与进度条
  let lastUrl = location.href
  let recheckTimer = 0
  const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href
      initProgress()
    }
    // 节流:DOM 高频变化时合并检查
    clearTimeout(recheckTimer)
    recheckTimer = window.setTimeout(() => {
      initProgress()
      checkReveal()
    }, 120)
  })
  observer.observe(document.body, { childList: true, subtree: true })

  addEventListener('scroll', onScroll, { passive: true })
  initLightbox()
  requestAnimationFrame(() => {
    initProgress()
    checkReveal()
  })

  // 开发热更新时 MutationObserver 长效存在,无碍;页面卸载无需清理(单页应用生命周期)
}
