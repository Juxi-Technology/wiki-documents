// 生成 llms-full.txt(全站内容转储,AI 引擎/LLM 引用用)。
// 从 docs/content 遍历全部 md(跳过 public 符号链接目录),剥离 frontmatter 拼接。
// 用法:node scripts/gen-llms.mjs [rootDir];CI 在构建前执行,保证内容永远最新。
import fs from 'node:fs'
import path from 'node:path'

const root = process.argv[2] || process.cwd()
const contentDir = path.join(root, 'docs/content')
const outFile = path.join(root, 'docs/public/llms-full.txt')

const walk = (dir, rel, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, e.name)
    // 符号链接(e.g. docs/content/public -> ../public)不遍历
    if (e.isSymbolicLink()) continue
    if (e.isDirectory()) walk(fp, `${rel}/${e.name}`, out)
    else if (e.name.endsWith('.md')) out.push({ rel: `${rel}/${e.name}`, fp })
  }
  return out
}

const stripFrontmatter = (src) => {
  if (!src.startsWith('---')) return src
  const end = src.indexOf('\n---', 3)
  return end < 0 ? src : src.slice(end + 4).trimStart()
}

const files = walk(contentDir, '').sort((a, b) => a.rel.localeCompare(b.rel))
const parts = ['# Juxi Technology Wiki (Full Content)', '']
for (const f of files) {
  const body = stripFrontmatter(fs.readFileSync(f.fp, 'utf8')).trimEnd()
  parts.push(`## ${f.rel}`, '', body, '')
}
fs.writeFileSync(outFile, parts.join('\n'))
console.log(`llms-full.txt 生成: ${files.length} 个文件, ${(fs.statSync(outFile).size / 1024).toFixed(0)} KB`)
