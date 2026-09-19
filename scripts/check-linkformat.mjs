// 链接书写形态检查(CI 用):只查两类「静默坏链」——它们不报错,但用户点不到:
//   ① 空文本链接:[](url) / [ ](url) → 渲染成看不见的链接(无障碍也读不出)
//      ※ 链接文字是行内代码的写法(如 [`https://x`](https://x))是**合法**的,判据里要排除
//   ② 目标含裸空格:[](/a b.md) → markdown 在空格处截断,链接退化成纯文本或指向错路径
//      (站内托管文件的正确写法是 %20,见 check:downloads)
// 2026-09-19 第九轮全局检查就是靠人工扫才发现这两类(各 1 / 6 处),故固化为闸门。
// 用法:node scripts/check-linkformat.mjs [rootDir]
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

const emptyText = []
const spacedDest = []
let total = 0
for (const f of files) {
  const rel = path.relative(root, f)
  // 只剥围栏代码块:保留行内代码(链接文字可能是行内代码)
  const body = fs.readFileSync(f, 'utf8').replace(/```[\s\S]*?```/g, ' FENCE ').replace(/^---[\s\S]*?\n---\n/, '')
  for (const m of body.matchAll(/\[([^\]]*)\]\(([^)\n]*)\)/g)) {
    total++
    const label = m[1], dest = m[2]
    if (/^[\s`]*$/.test(label)) emptyText.push({ rel, hit: m[0].slice(0, 70) })
    if (/ /.test(dest) && !/^</.test(dest) && !/["']/.test(dest)) spacedDest.push({ rel, dest })
  }
}

let failed = false
if (emptyText.length) {
  failed = true
  console.error(`[linkfmt] ${emptyText.length} empty-text link(s) — 渲染成看不见的链接:`)
  for (const x of emptyText.slice(0, 20)) console.error(`  ${x.rel}  ${x.hit}`)
}
if (spacedDest.length) {
  failed = true
  console.error(`[linkfmt] ${spacedDest.length} link target(s) with a raw space — markdown 会在空格处截断:`)
  for (const x of spacedDest.slice(0, 20)) console.error(`  ${x.rel} → ${x.dest}`)
}
if (failed) {
  console.error('\n  修法:空文本链接补上文字(或删掉多余的重复链接);目标里的空格写作 %20。')
  process.exit(1)
}
console.log(`[linkfmt] all ${total} markdown links have non-empty text and space-free targets`)
