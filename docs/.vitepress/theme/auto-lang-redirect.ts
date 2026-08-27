// 语言自动切换(仅静态站,客户端执行):
// 1) 访问根语言(无前缀 URL)时,按 localStorage 偏好或浏览器语言自动重定向
// 2) 手动点击语言切换后记住偏好,下次直接进入所选语言
// 3) 已带语言前缀的 URL(爬虫/直接链接)绝不跳转 → 对 SEO 无害
if (typeof window !== 'undefined') {
  const URL_LANG_RE = /^\/(zh-hans|zh-hant|ja|ko|de|fr|es|it|en)(?=\/|$)/
  const PREF_KEY = 'wiki-lang'

  // 手动切换语言时记录偏好
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement | null)?.closest?.('a[href*="/zh-hans"], a[href*="/zh-hant"], a[href*="/ja/"], a[href*="/ko/"], a[href*="/de/"], a[href*="/fr/"], a[href*="/es/"], a[href*="/it/"]')
    if (!a) return
    const m = (a as HTMLAnchorElement).pathname.match(/^\/(zh-hans|zh-hant|ja|ko|de|fr|es|it)/)
    if (m) {
      try {
        localStorage.setItem(PREF_KEY, m[1])
      } catch {
        /* private mode */
      }
    }
  })

  const path = window.location.pathname
  // 仅处理无前缀的根语言页面(英文 root)
  if (!URL_LANG_RE.test(path)) {
    const nav = navigator.language || ''
    let pref: string | null = null
    try {
      pref = localStorage.getItem(PREF_KEY)
    } catch {
      pref = null
    }
    let target: string | null = null
    if (pref && pref !== 'en') target = pref
    if (!target) {
      if (/^(zh-HK|zh-TW|zh-Hant)/i.test(nav)) target = 'zh-hant'
      else if (/^zh/i.test(nav)) target = 'zh-hans'
      else if (/^ja/i.test(nav)) target = 'ja'
      else if (/^ko/i.test(nav)) target = 'ko'
      else if (/^de/i.test(nav)) target = 'de'
      else if (/^fr/i.test(nav)) target = 'fr'
      else if (/^es/i.test(nav)) target = 'es'
      else if (/^it/i.test(nav)) target = 'it'
    }
    if (target && target !== 'en') {
      try {
        localStorage.setItem(PREF_KEY, target)
      } catch {
        /* ignore */
      }
      window.location.replace('/' + target + path)
    }
  }
}
