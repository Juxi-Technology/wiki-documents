
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Juxi Technology Wiki',
  description: 'Juxi Technology 产品教程与文档',
  lang: 'zh-CN',

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'Juxi Technology',

    nav: [
      { text: '首页', link: '/' },
      { text: '产品教程', link: '/tutorials/' },
      { text: '技术文档', link: '/tech/' },
      { text: 'GitHub', link: 'https://github.com/Juxi-Technology' }
    ],

    sidebar: {
      '/tutorials/': [
        {
          text: '产品教程',
          items: [
            { text: '快速入门', link: '/tutorials/getting-started' },
            { text: '硬件连接', link: '/tutorials/hardware-setup' },
            { text: '软件配置', link: '/tutorials/software-config' }
          ]
        }
      ],
      '/tech/': [
        {
          text: '技术文档',
          items: [
            { text: 'API 参考', link: '/tech/api-reference' },
            { text: '开发指南', link: '/tech/dev-guide' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Juxi-Technology' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: '© 2025 Juxi Technology'
    },

    search: {
      provider: 'local'
    }
  }
})
