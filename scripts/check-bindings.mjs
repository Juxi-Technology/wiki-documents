// 绑定式站内链接检查(CI 用):md 里的 `:href="withBase('/x')"` 与裸 `href="/x"`。
// 为什么单独一项:check-links 只扫 markdown 链接(](…)),config.ts 的 nav/sidebar 另扫,
// 而首页/产品/专题的**卡片链接**是 Vue 绑定或裸 HTML href——改页面文件名时它们会静默失效。
// 用法:node scripts/check-bindings.mjs [rootDir]
import fs from 'node:fs'
import path from 'node:path'

const root = process.argv[2] || process.cwd()
const CONTENT = path.resolve(root, 'docs/content')
const LOCS = ['zh-hans', 'zh-hant', 'ja', 'ko', 'de', 'fr', 'es', 'it', 'pt-br', 'pt-pt']

if (!fs.existsSync(CONTENT)) {
  console.error('not found:', CONTENT)
  process.exit(1)
}

const files = []
const rec = (d, isRoot) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) { if (isRoot && LOCS.includes(e.name)) continue; rec(p, false) }
    else if (e.name.endsWith('.md')) files.push(p)
  }
}
rec(CONTENT, true)
for (const l of LOCS) rec(path.join(CONTENT, l), false)

const exists = (url) => {
  if (/\.(png|jpe?g|gif|webp|svg|zip|rar|7z|mp4|webm|step|stp|pdf|txt|xml|json|ico)$/i.test(url)) return true
  const segs = url.replace(/^\//, '').split('/')
  const noLocale = LOCS.includes(segs[0]) ? segs.slice(1).join('/') : segs.join('/')
  for (const rel of [url.replace(/^\//, ''), noLocale]) {
    const base = path.join(CONTENT, rel)
    if ([base, base + '.md', path.join(base, 'index.md')].some((c) => fs.existsSync(c))) return true
  }
  return false
}

const broken = []
let total = 0
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8')
  const urls = []
  for (const m of src.matchAll(/withBase\(['"]([^'"]+)['"]\)/g)) urls.push(m[1])
  for (const m of src.matchAll(/\bhref="(\/[^"#?]*)"/g)) urls.push(m[1])
  for (const u of urls) {
    if (/^\/(downloads|images|assets|vp-icons)\//.test(u)) continue   // 静态资源由 check:downloads / 构建负责
    total++
    if (!exists(u)) broken.push({ file: path.relative(root, f), url: u })
  }
}

if (broken.length) {
  console.error(`[bindings] ${broken.length} of ${total} withBase/href internal targets do not exist:`)
  for (const b of broken.slice(0, 30)) console.error(`  ${b.file} → ${b.url}`)
  if (broken.length > 30) console.error(`  … 另 ${broken.length - 30} 处`)
  process.exit(1)
}
console.log(`[bindings] all ${total} withBase/href internal targets resolve`)
