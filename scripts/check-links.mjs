// 站内链接完整性检查(CI 用):1) config.ts 提取的全部 sidebar 链接
// 2) 内容树 docs/content/**/*.md 正文里的站内 markdown 链接。
// 任一缺失即退出码 1,防止回归(来源:2026-09 全站扫描后固化)。
// 用法:node scripts/check-links.mjs [rootDir]
import fs from 'node:fs'
import path from 'node:path'

const root = process.argv[2] || process.cwd()
const cfgFile = path.join(root, 'docs/.vitepress/config.ts')
const contentDir = path.join(root, 'docs/content')

if (!fs.existsSync(cfgFile)) {
  console.error('not found:', cfgFile)
  process.exit(1)
}

/** 收集 sidebar 链接并核对文件 */
function checkSidebarLinks() {
  const cfg = fs.readFileSync(cfgFile, 'utf8')
  const links = [...cfg.matchAll(/link:\s*'(\/[^']*)'/g)].map((m) => m[1])
  const unique = [...new Set(links)]
  const LANGS = ['zh-hans', 'zh-hant', 'ja', 'ko', 'de', 'fr', 'es', 'it', 'pt']
  const missing = []
  for (const l of unique) {
    const parts = l.split('/').filter(Boolean)
    const lang = LANGS.includes(parts[0]) ? parts.shift() : ''
    const rel = parts.join('/')
    const base = path.join(contentDir, lang)
    const cands = [path.join(base, rel + '.md'), path.join(base, rel, 'index.md')]
    if (!cands.some((c) => fs.existsSync(c))) missing.push(`${lang || 'root'}: ${l}`)
  }
  return { total: unique.length, missing }
}

/** 收集所有 md 正文站内链接并核对文件 */
function checkBodyLinks() {
  const walk = (dir, out = []) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const fp = path.join(dir, e.name)
      if (e.isDirectory()) walk(fp, out)
      else if (e.name.endsWith('.md')) out.push(fp)
    }
    return out
  }
  const files = walk(contentDir)
  const SKIP_EXT = /\.(png|jpe?g|gif|webp|svg|mp4|webm|zip|rar|7z|stp|step|pdf|bin|hex|ino|xlsx|csv|stl)$/i
  const missing = []
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8')
    const dir = path.dirname(f)
    const re = /\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g
    let m
    while ((m = re.exec(src))) {
      const t = m[1].trim()
      if (t.startsWith('#') || t.startsWith('http') || t.startsWith('mailto') || t.startsWith('tel') || t.startsWith('//')) continue
      if (SKIP_EXT.test(t)) continue
      const target = t.startsWith('/')
        ? path.join(contentDir, t.replace(/^\//, ''))
        : path.resolve(dir, t.split('#')[0])
      const cands = [target + '.md', path.join(target, 'index.md'), target]
      if (!cands.some((c) => fs.existsSync(c))) {
        missing.push(`${path.relative(root, f).replace('./', '')} -> ${t}`)
      }
    }
  }
  return { total: files.length, missing }
}

const sb = checkSidebarLinks()
const body = checkBodyLinks()
let failed = false
if (sb.missing.length) {
  failed = true
  console.error(`[sidebar] ${sb.missing.length} of ${sb.total} links unresolvable:`)
  sb.missing.forEach((x) => console.error('  ', x))
} else {
  console.log(`[sidebar] all ${sb.total} sidebar links resolve`)
}
if (body.missing.length) {
  failed = true
  console.error(`[body] ${body.missing.length} broken links in ${body.total} md files:`)
  body.missing.slice(0, 50).forEach((x) => console.error('  ', x))
} else {
  console.log(`[body] all internal links in ${body.total} md files resolve`)
}
process.exit(failed ? 1 : 0)
