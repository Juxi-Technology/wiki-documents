import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { createContentLoader } from 'vitepress'

// 首页最新文档卡片数据:url → 最后更新日期(YYYY-MM-DD)。
// createContentLoader 项不含 lastUpdated;一次 git log 取全历史
// (每条 commit 的日期+变更文件,首个出现即该文件最后修改日),
// 避免逐文件 fork git(此前 873 次调用拖慢构建 ~7s)。
function gitDates() {
  try {
    const out = execFileSync(
      'git',
      ['log', '--pretty=format:%x1e%cs%x1f', '--name-only', '--no-renames'],
      { cwd: process.cwd(), encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
    )
    const map = new Map<string, string>()
    let cur = ''
    for (const line of out.split('\n')) {
      if (line.startsWith('\x1e')) {
        // 行为 \x1e<date>\x1f,日期在 split 后的 [0]([1] 是末尾 \x1f 之后的空串,曾因此全站日期为空)
        cur = line.slice(1).split('\x1f')[0] || ''
        continue
      }
      if (line && !map.has(line) && cur) map.set(line, cur)
    }
    return map
  } catch {
    return new Map<string, string>()
  }
}

const dateMap = gitDates()

export default createContentLoader(
  [
    '**/tutorials/**/*.md',
    '!**/public/**',
  ],
  {
    render: false,
    excerpt: false,
    transform(raw) {
      return raw
        .map(({ url }) => {
          // url(/zh-hans/tutorials/faq) → docs/content/zh-hans/tutorials/faq.md
          const rel = url.replace(/^\//, '')
          const base = path.join('docs/content', rel)
          const file = existsSync(base + '.md') ? base + '.md' : path.join(base, 'index.md')
          return {
            url,
            lastUpdated: dateMap.get(file) || '',
          }
        })
        .filter((x) => x.lastUpdated)
    },
  },
)
