// 语言自动切换(仅静态站,客户端执行):
// 1) **仅首页**(根路径 /)访问时,按 localStorage 偏好或浏览器语言自动重定向到对应语言的首页;
//    内页一律不自动换语种 —— 用户从哪个语种的页面点进来,就停在哪个语种
//    (2026-09-25 收窄:此前内页也跳,表现为"从英文页点进教程却被拽到中文页",令人困惑)
// 2) 手动点击语言切换后记住偏好,首页跳转与下次访问据此回落
// 3) 已带语言前缀的 URL(爬虫/直接链接)绝不跳转 → 对 SEO 无害
if (typeof window !== 'undefined') {
  const URL_LANG_RE = /^\/(zh-hans|zh-hant|ja|ko|de|fr|es|it|pt-br|pt-pt|en)(?=\/|$)/
  const PREF_KEY = 'wiki-lang'
  // 合法跳转目标集合(英文是根路径,不作为跳转目标)。
  // 作用:①把历史脏偏好视为无偏好;②拼 URL 前终检 —— 目标必须在集合内,
  // 保证 location.replace 入参永远是 '/<已知语言>/' 形式
  const KNOWN_LANGS = new Set(['zh-hans', 'zh-hant', 'ja', 'ko', 'de', 'fr', 'es', 'it', 'pt-br', 'pt-pt'])

  // 手动切换语言时记录偏好
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement | null)?.closest?.('a[href*="/zh-hans"], a[href*="/zh-hant"], a[href*="/ja/"], a[href*="/ko/"], a[href*="/de/"], a[href*="/fr/"], a[href*="/es/"], a[href*="/it/"], a[href*="/pt/"]')
    if (!a) return
    const m = (a as HTMLAnchorElement).pathname.match(/^\/(zh-hans|zh-hant|ja|ko|de|fr|es|it|pt-br|pt-pt)/)
    if (m) {
      try {
        localStorage.setItem(PREF_KEY, m[1])
      } catch {
        /* private mode */
      }
    }
  })

  const path = window.location.pathname
  // 只认首页:根路径并且不带语言前缀(带前缀的根语言页如 /zh-hans/ 也一律不跳)
  if (path === '/' && !URL_LANG_RE.test(path)) {
    const nav = navigator.language || ''
    let pref: string | null = null
    try {
      pref = localStorage.getItem(PREF_KEY)
    } catch {
      pref = null
    }
    // 规范偏好值:旧版语言下拉曾把带前导斜杠的代码存入(如 '/zh-hans'),
    // 若原样与 '/' 拼接会得到协议相对 URL '//zh-hans/' —— 浏览器把它当作
    // 主机名 zh-hans 解析,整站跳飞出 wiki.juxitech.com(2026-10 线上 404 事故根因)
    if (pref) pref = pref.replace(/^\/+|\/+$/g, '').toLowerCase()

    let target: string | null = null
    if (pref !== 'en') {
      if (pref && KNOWN_LANGS.has(pref)) {
        target = pref // 手选过非英文语言 → 按其回落
      } else {
        // 无偏好,或偏好值不可识别(历史脏值,视为无偏好)时按浏览器语言;
        // 手选过英文(pref='en')则停留英文,不再被浏览器语言覆盖
        if (/^(zh-HK|zh-TW|zh-Hant)/i.test(nav)) target = 'zh-hant'
        else if (/^zh/i.test(nav)) target = 'zh-hans'
        else if (/^ja/i.test(nav)) target = 'ja'
        else if (/^ko/i.test(nav)) target = 'ko'
        else if (/^de/i.test(nav)) target = 'de'
        else if (/^fr/i.test(nav)) target = 'fr'
        else if (/^es/i.test(nav)) target = 'es'
        else if (/^it/i.test(nav)) target = 'it'
        else if (/^pt[-_]BR|^pt[-_]br/i.test(nav)) target = 'pt-br'
        else if (/^pt/i.test(nav)) target = 'pt-pt'
      }
    }
    // 终检:目标必须是已知语言才跳转。任何异常值最坏只是不跳(停留英文首页),
    // 天然兜底本次协议相对 URL 事故,也防未来再写入怪值
    if (target && KNOWN_LANGS.has(target)) {
      try {
        localStorage.setItem(PREF_KEY, target)
      } catch {
        /* ignore */
      }
      window.location.replace('/' + target + '/')
    }
  }
}
