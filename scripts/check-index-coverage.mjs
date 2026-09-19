// 索引页覆盖率检查(CI 用):每个 index.md 必须能在 ≤2 跳内到达自己子树里的每一页。
// 动机:2026-09-19 发现 /tutorials/ 及其分类枢纽是手写目录,新增内容(课程/新品教程)没同步进去,
// 页面"看起来没更新"。这个检查把"索引页漏链自家页面"变成可拦截的回归。
// 判据:索引页直接链到 = 1 跳;被它链到的页面再链到 = 2 跳(即"经由产品枢纽")。
// 站点根 index.md 是落地页(子树=整站)不适用;EXEMPT 里的页面为有意豁免,须写明理由。
// 用法:node scripts/check-index-coverage.mjs [rootDir]
import fs from 'node:fs'
import path from 'node:path'

const root = process.argv[2] || process.cwd()
const CONTENT = path.join(root, 'docs/content')
const LOCS = ['zh-hans', 'zh-hant', 'ja', 'ko', 'de', 'fr', 'es', 'it', 'pt-br', 'pt-pt']

// 有意豁免(相对 docs/content 的 index.md 路径):留空表示"所有索引页都必须覆盖自己的子树"
const EXEMPT = new Set([])

if (!fs.existsSync(CONTENT)) {
  console.error('not found:', CONTENT)
  process.exit(1)
}

const all = []
const rec = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) { if (d === CONTENT && LOCS.includes(e.name)) continue; rec(p, false) }
    else if (e.name.endsWith('.md')) all.push(p)
  }
}
rec(CONTENT)

const resolve = (t, dir) => {
  const clean = t.split('#')[0]
  const base = clean.startsWith('/') ? path.join(CONTENT, clean.replace(/^\//, '')) : path.resolve(dir, clean)
  return [base, base + '.md', path.join(base, 'index.md')].find((c) => fs.existsSync(c) && c.endsWith('.md')) || null
}

const cache = new Map()
const linksOf = (file) => {
  if (cache.has(file)) return cache.get(file)
  const src = fs.readFileSync(file, 'utf8')
  const dir = path.dirname(file)
  const out = new Set()
  const targets = []
  for (const m of src.matchAll(/\]\(([^)\s]+?)(?:#[^)]*)?\)/g)) targets.push(m[1])                        // markdown 链接
  for (const m of src.matchAll(/[:@]?href="(?:withBase\()?['"]([^'"]+)['"]\)?"/g)) targets.push(m[1])    // :href="withBase('/x')" / href="'/x'"
  for (const m of src.matchAll(/\bhref="((?:\/|\.\.?\/)[^"#?]*)"/g)) targets.push(m[1])                  // 裸 HTML href="/x"
  for (const t0 of targets) {
    const t = t0.trim()
    if (/^(https?:|mailto:|tel:|#)/.test(t) || /^\/\//.test(t)) continue
    if (/\.(png|jpe?g|gif|webp|svg|zip|rar|7z|stp|step|mp4|pdf)$/i.test(t)) continue
    const hit = resolve(t, dir)
    if (hit) out.add(path.normalize(hit))
  }
  cache.set(file, out)
  return out
}

const indexes = all.filter((f) => path.basename(f) === 'index.md' && f !== path.join(CONTENT, 'index.md'))
const gaps = []
for (const idx of indexes) {
  if (EXEMPT.has(path.relative(CONTENT, idx))) continue
  const dir = path.dirname(idx)
  const subtree = all.filter((f) => f.startsWith(dir + path.sep) && f !== idx)
  if (!subtree.length) continue
  const direct = linksOf(idx)
  const hop2 = new Set(direct)
  for (const d of direct) for (const x of linksOf(d)) hop2.add(x)
  const unreachable = subtree.filter((f) => !hop2.has(path.normalize(f)))
  if (unreachable.length) gaps.push({ idx, unreachable })
}

if (gaps.length) {
  console.error(`[index] ${gaps.length} index page(s) cannot reach their own subtree within 2 hops — 索引页漏链了自家页面(用户看到的现象:页面"没更新"):`)
  for (const g of gaps) {
    console.error(`\n  ${path.relative(root, g.idx)}  (${g.unreachable.length} 页未链)`)
    for (const u of g.unreachable.slice(0, 12)) console.error(`    - ${path.relative(path.dirname(g.idx), u)}`)
    if (g.unreachable.length > 12) console.error(`    … 另 ${g.unreachable.length - 12} 页`)
  }
  console.error('\n  修法:把缺的页面补进该索引页(或补进它已链到的产品枢纽页),不要靠侧边栏兜底。')
  process.exit(1)
}
console.log(`[index] all ${indexes.length} index pages reach every page in their subtree within 2 hops`)
