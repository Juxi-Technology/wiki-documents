import { createContentLoader } from 'vitepress'

// 构建期数据加载器:收集全部内容页用于搜索索引
// 排除:冗余的 so-arm101-tutorial 副本(内容与 canonical 发散,见计划文档)
export default createContentLoader(
  [
    'tutorials/**/*.md',
    'topics/**/*.md',
    'tech/**/*.md',
    'cases/**/*.md',
    'community/**/*.md',
    '!**/so-arm101-tutorial.md',
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
