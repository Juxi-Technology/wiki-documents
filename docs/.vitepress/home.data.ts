import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { createContentLoader } from 'vitepress'

// 首页最新文档卡片数据:url → 最后更新日期(YYYY-MM-DD)
// createContentLoader 项不含 lastUpdated,这里按 url 反推文件路径,
// 用 git log 取真实提交日期(CI 已配 fetch-depth: 0)
function gitDate(rel: string) {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', rel], {
      cwd: process.cwd(),
      encoding: 'utf8',
    }).trim()
  } catch {
    return ''
  }
}

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
            lastUpdated: existsSync(file) ? gitDate(file) : '',
          }
        })
        .filter((x) => x.lastUpdated)
    },
  },
)
