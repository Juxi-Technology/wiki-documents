// 托管文件链接检查(CI 用):md 里所有 /downloads/<文件> 链接必须指向 docs/public/downloads/ 下真实存在的文件。
// 动机:check-links 的 SKIP_EXT 跳过了 zip/rar/stp/step 等二进制,这类断链此前无人检查——
// 2026-09-19 就发现 AmazingHand-main.zip(106MB,超 CF Pages 单文件上限,从未托管)在 11 个语种里挂着死链。
// 用法:node scripts/check-downloads.mjs [rootDir]
import fs from 'node:fs'
import path from 'node:path'

const root = process.argv[2] || process.cwd()
const CONTENT = path.join(root, 'docs/content')
const PUB = path.join(root, 'docs/public/downloads')

if (!fs.existsSync(CONTENT)) {
  console.error('not found:', CONTENT)
  process.exit(1)
}
const have = new Set(fs.existsSync(PUB) ? fs.readdirSync(PUB) : [])

const walk = (d, out = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    e.isDirectory() ? walk(p, out) : e.name.endsWith('.md') && out.push(p)
  }
  return out
}
const dec = (s) => { try { return decodeURIComponent(s) } catch { return s } }

const broken = []
const spaced = []
let total = 0
for (const f of walk(CONTENT)) {
  const src = fs.readFileSync(f, 'utf8')
  // 注意:不能用 [^)\s]+ ——它会连同「目标含裸空格」的链接一起跳过,
  // 而 markdown 会在空格处截断,这类链接要么退化成纯文本、要么指向错路径。
  for (const m of src.matchAll(/\]\((\/downloads\/[^)\n]*)\)/g)) {
    const dest = m[1]
    if (/ /.test(dest)) { spaced.push({ file: path.relative(root, f), dest }); continue }
    const name = dec(dest.slice('/downloads/'.length))
    if (!name) continue
    total++
    if (!have.has(name)) broken.push({ file: path.relative(root, f), name })
  }
}

if (spaced.length) {
  console.error(`[downloads] ${spaced.length} link target(s) contain a raw space — markdown 会在空格处截断,链接会失效:`)
  for (const s of spaced.slice(0, 20)) console.error(`  ${s.file} → ${s.dest}`)
  console.error('\n  修法:把空格写作 %20(站内托管文件的既有写法)。')
  process.exit(1)
}
if (broken.length) {
  console.error(`[downloads] ${broken.length} link(s) point to files missing from docs/public/downloads/:`)
  for (const b of broken.slice(0, 30)) console.error(`  ${b.file} → ${b.name}`)
  if (broken.length > 30) console.error(`  … 另 ${broken.length - 30} 处`)
  console.error('\n  修法:把文件放进 docs/public/downloads/(单文件需 <25MB),或改为纯文本说明(超限件按站内惯例注明可向 support@juxitech.com 索取)。')
  process.exit(1)
}
console.log(`[downloads] all ${total} /downloads/ links resolve to hosted files`)
