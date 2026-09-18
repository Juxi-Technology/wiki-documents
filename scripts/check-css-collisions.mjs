// 跨页 CSS 选择器碰撞检查(CI 用)。
//
// 背景:VitePress 会把【全站所有 markdown 的 <style>】合并进同一个全局样式表
// (产物里只有 assets/style.<hash>.css 一个文件),因此**类名是全站共享的**:
// 两个页面若定义同名选择器,后打包者覆盖先打包者——顺序不可控、改了无提示。
// 2026-09-19 实际踩到:首页 .category-grid(满宽负 margin)被 products/index.md 的
// 同名规则覆盖掉 margin,导致首页与产品页在 ≥768px 横向溢出 248px。
//
// 全局样式源(类名不受页面边界保护)有三个,除逐页 <style> 外都一并纳入:
//   ① 各 markdown 页 <style>   ② theme/style.css   ③ Layout.vue 的非 scoped <style>
// 其余 .vue 组件均为 <style scoped>(带 data-v 属性),不会跨页碰撞,故不扫描。
//
// 判定:
//   ERROR = 同一 (媒体条件, 选择器) 下,声明不一致的变体分属【不同页面】→ 退出码 1
//   WARN  = 分属【页面 vs 全局源】(主题对卡片动效的叠加是有意为之)→ 只提示不失败
// 同页自身的媒体查询变体(如移动端覆盖)不算冲突。
//
// 用法:node scripts/check-css-collisions.mjs [rootDir] [--verbose]
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const verbose = args.includes('--verbose')
const root = args.find((a) => !a.startsWith('--')) || process.cwd()
const contentDir = path.join(root, 'docs/content')
const GLOBAL_SOURCES = [
  ['theme/style.css', path.join(root, 'docs/.vitepress/theme/style.css')],
  ['theme/Layout.vue', path.join(root, 'docs/.vitepress/theme/Layout.vue')],
]

if (!fs.existsSync(contentDir)) {
  console.error('not found:', contentDir)
  process.exit(1)
}

const LOCALES = ['zh-hans', 'zh-hant', 'ja', 'ko', 'de', 'fr', 'es', 'it', 'pt-br', 'pt-pt']

/** 收集 markdown 文件;en 轮必须跳过语种子目录(否则同一页会被当成 11 个页面) */
function collectPages() {
  const out = []
  const rec = (dir, isRoot) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const fp = path.join(dir, e.name)
      if (e.isDirectory()) {
        if (isRoot && LOCALES.includes(e.name)) continue
        rec(fp, false)
      } else if (e.name.endsWith('.md')) out.push(fp)
    }
  }
  rec(contentDir, true)
  for (const l of LOCALES) rec(path.join(contentDir, l), false)
  return out
}

/** 页面身份:去掉语种前缀——11 个语种的同一个页面算同一页 */
const pageKeyOf = (file) =>
  path.relative(contentDir, file).replace(new RegExp(`^(${LOCALES.join('|')})/`), '')

/** 声明规范化:去注释、统一空白与冒号分号,便于比较「同一条规则」 */
const normDecl = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*:\s*/g, ':').replace(/\s*;\s*/g, ';').replace(/;$/, '').trim()

/** 选择器规范化:只压掉组合符两侧空白(`.a > .b`≡`.a>.b`),保留后代空格(`.a .b`≠`.a.b`) */
const normSel = (s) => normDecl(s).replace(/\s*([>+~])\s*/g, '$1')

/** 括号配平解析 CSS,保留 @media/@supports 上下文;返回 {media, sel, decl} 列表 */
function parseRules(css, media, out) {
  let i = 0
  while (i < css.length) {
    const open = css.indexOf('{', i)
    if (open < 0) break
    const head = css.slice(i, open).trim()
    let depth = 1
    let j = open + 1
    while (j < css.length && depth > 0) {
      if (css[j] === '{') depth++
      else if (css[j] === '}') depth--
      j++
    }
    const body = css.slice(open + 1, j - 1)
    if (head.startsWith('@')) {
      // @keyframes/@font-face 等无选择器语义,跳过;@media/@supports 递归并保留条件
      if (/^@(media|supports)/.test(head)) parseRules(body, head.replace(/\s+/g, ' '), out)
    } else {
      const decl = normDecl(body)
      if (decl) {
        for (const sel of head.split(',')) {
          const s = normSel(sel)
          if (s) out.push({ media, sel: s, decl })
        }
      }
    }
    i = j
  }
}

// ── 收集规则 ────────────────────────────────────────────────
const rules = []
const pages = collectPages()
for (const f of pages) {
  const src = fs.readFileSync(f, 'utf8')
  const owner = pageKeyOf(f)
  for (const m of src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
    const found = []
    parseRules(m[1], '', found)
    for (const r of found) rules.push({ ...r, owner, kind: 'page' })
  }
}
for (const [label, file] of GLOBAL_SOURCES) {
  if (!fs.existsSync(file)) continue
  const src = fs.readFileSync(file, 'utf8')
  const blocks = [...src.matchAll(/<style(?![^>]*\bscoped\b)[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1])
  if (!blocks.length) blocks.push(src)   // 纯 .css 文件
  for (const b of blocks) {
    const found = []
    parseRules(b, '', found)
    for (const r of found) rules.push({ ...r, owner: label, kind: 'global' })
  }
}

// ── 分组比对:(媒体条件, 选择器) → 声明 → 拥有者 ───────────────
const group = new Map()
for (const r of rules) {
  const k = `${r.media} || ${r.sel}`
  if (!group.has(k)) group.set(k, new Map())
  const dm = group.get(k)
  if (!dm.has(r.decl)) dm.set(r.decl, new Map())
  const owners = dm.get(r.decl)
  owners.set(r.owner, (owners.get(r.owner) || 0) + 1)
}

const errors = []
const warns = []
const isPageOwner = (owner) => owner.endsWith('.md')
for (const [k, dm] of group) {
  if (dm.size < 2) continue                     // 只有一种声明:无冲突
  const variants = [...dm.entries()].map(([decl, owners]) => ({ decl, owners: [...owners.keys()] }))
  // 每种声明各自被哪些页面拥有;页面集合不同 = 两个页面在争同一个选择器
  const pageSets = [...new Set(
    variants.map((v) => [...new Set(v.owners.filter(isPageOwner))].sort().join(','))
  )].filter(Boolean)
  if (pageSets.length >= 2) errors.push({ k, variants })
  // 仅当存在「无页面归属」的变体时才算页面 vs 全局源;纯同页重复(基样式 + 后续覆盖)是正常写法
  else if (pageSets.length === 1 && variants.some((v) => !v.owners.some(isPageOwner))) warns.push({ k, variants })
}

// ── 输出 ───────────────────────────────────────────────────
console.log(`[css] scanned ${pages.length} md pages + ${GLOBAL_SOURCES.length} global style sources, ${group.size} distinct (media, selector) rules`)

if (errors.length) {
  console.error(`\n[css] ${errors.length} cross-page selector collision(s) — 同一选择器被不同页面定义成不同样式,后者会静默覆盖前者:`)
  for (const e of errors) {
    console.error(`\n  ${e.k}`)
    for (const v of e.variants) console.error(`    ← ${v.owners.join(', ')}\n      ${v.decl.slice(0, 160)}`)
  }
  console.error('\n  修法:让其中一个页面改用本页专属的类名(如首页用 .home-xxx),不要靠调整打包顺序。')
  process.exit(1)
}
console.log('[css] no cross-page selector collisions')

if (warns.length) {
  console.log(`[css] note: ${warns.length} selector(s) shared between a page and a global source (theme/Layout) — 主题对卡片动效等的有意叠加,不计为错误;列出加 --verbose`)
  if (verbose) {
    for (const w of warns) console.log(`  ${w.k}  ← ${w.variants.map((v) => v.owners.join('+')).join(' | ')}`)
  }
}
process.exit(0)
