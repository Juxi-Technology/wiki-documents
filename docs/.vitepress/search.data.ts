import { createContentLoader } from 'vitepress'

// 冗余副本:内容与 canonical(robot-arms/so-arm101/SO-ARM101-Tutorial)发散,不参与搜索
const EXCLUDED_URLS = [
  '/tutorials/so-arm101-tutorial',
  '/en/tutorials/so-arm101-tutorial',
  '/en/tutorials/robot-arms/so-arm101-tutorial',
  '/zh-HK/tutorials/so-arm101-tutorial',
]

// 构建期数据加载器:收集全部内容页用于搜索索引
export default createContentLoader(
  ['tutorials/**/*.md', 'topics/**/*.md', 'tech/**/*.md', 'cases/**/*.md', 'community/**/*.md'],
  {
    render: false,
    excerpt: false,
    transform(raw) {
      return raw
        .filter(({ url }) => !EXCLUDED_URLS.includes(url))
        .map(({ url, frontmatter }) => ({
          url,
          title: frontmatter.title || url.split('/').pop() || url,
          description: frontmatter.description || '',
        }))
    },
  },
)
