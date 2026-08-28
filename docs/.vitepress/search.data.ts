import { createContentLoader } from 'vitepress'

// 构建期数据加载器:收集全部内容页(所有语言目录)用于搜索索引
// 注意 srcDir 为 content/,直接用 '**/xx/**/*.md' 才能覆盖各语言子目录;
// public/ 下有历史草稿 md(旧版教程,已被 content 树多语正版取代),必须排除
export default createContentLoader(
  [
    '**/tutorials/**/*.md',
    '!**/public/**',
    '**/topics/**/*.md',
    '**/tech/**/*.md',
    '**/cases/**/*.md',
    '**/community/**/*.md',
  ],
  {
    render: false,
    excerpt: false,
    transform(raw) {
      return raw.map(({ url, frontmatter }) => ({
        url,
        title: frontmatter.title || url.split('/').pop() || url,
        description: frontmatter.description || '',
      }))
    },
  },
)
