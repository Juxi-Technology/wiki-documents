import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '钜犀科技 Wiki',
  description: '钜犀科技 产品教程与文档',
  base: '/wiki-documents/',
  
  themeConfig: {
    search: {
      provider: 'local'
    }
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      description: '钜犀科技 产品教程与文档',
      themeConfig: {
        logo: '/logo.png',
        siteTitle: '钜犀科技',
        nav: [
          { text: '产品教程', link: '/tutorials/' },
          { text: '技术专题', link: '/topics/' },
          { text: '商店', link: 'https://juxitechnology.taobao.com/', target: '_blank' }
        ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/Juxi-Technology' }
        ],
        sidebar: {
          '/tutorials/': [
            {
              text: '产品教程',
              items: [
                { text: '产品教程首页', link: '/tutorials/' },
                { text: '快速入门', link: '/tutorials/getting-started' },
                { text: '硬件连接', link: '/tutorials/hardware-setup' },
                { text: '软件配置', link: '/tutorials/software-config' },
                { text: 'SO-ARM101教程', link: '/tutorials/so-arm101-tutorial' }
              ]
            }
          ],
          '/topics/': [
            {
              text: '技术专题',
              items: [
                { text: '技术专题首页', link: '/topics/' },
                { text: '机器人学习专题', link: '/topics/robot-learning/' }
              ]
            }
          ]
        },
        footer: {
          copyright: 'Copyright © 2026 Juxi Technology. Built with VitePress.'
        },
        outline: {
          level: [1, 6],
          label: '本页面'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      description: 'Juxi Technology Product Tutorials and Documentation',
      themeConfig: {
        logo: '/logo.png',
        siteTitle: 'Juxi Technology',
        nav: [
          { text: 'Tutorials', link: '/en/tutorials/' },
          { text: 'Topics', link: '/en/topics/' },
          { text: 'Shop', link: 'https://www.juxitech.com/', target: '_blank' }
        ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/Juxi-Technology' }
        ],
        sidebar: {
          '/en/tutorials/': [
            {
              text: 'Tutorials',
              items: [
                { text: 'Tutorials Home', link: '/en/tutorials/' },
                { text: 'Getting Started', link: '/en/tutorials/getting-started' },
                { text: 'Hardware Setup', link: '/en/tutorials/hardware-setup' },
                { text: 'Software Config', link: '/en/tutorials/software-config' },
                { text: 'SO-ARM101 Tutorial', link: '/en/tutorials/so-arm101-tutorial' }
              ]
            }
          ],
          '/en/topics/': [
            {
              text: 'Topics',
              items: [
                { text: 'Topics Home', link: '/en/topics/' },
                { text: 'Robot Learning Topic', link: '/en/topics/robot-learning/' }
              ]
            }
          ]
        },
        footer: {
          copyright: 'Copyright © 2026 Juxi Technology. Built with VitePress.'
        },
        outline: { level: [1, 6], label: 'On this page' }
      }
    },
    'zh-HK': {
      label: '繁體中文',
      lang: 'zh-HK',
      description: '鉅犀科技 產品教程與文檔',
      themeConfig: {
        logo: '/logo.png',
        siteTitle: '鉅犀科技',
        nav: [
          { text: '產品教程', link: '/zh-HK/tutorials/' },
          { text: '技術專題', link: '/zh-HK/topics/' },
          { text: '商店', link: 'https://www.juxitech.com/', target: '_blank' }
        ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/Juxi-Technology' }
        ],
        sidebar: {
          '/zh-HK/tutorials/': [
            {
              text: '產品教程',
              items: [
                { text: '產品教程首頁', link: '/zh-HK/tutorials/' },
                { text: '快速入門', link: '/zh-HK/tutorials/getting-started' },
                { text: '硬件連接', link: '/zh-HK/tutorials/hardware-setup' },
                { text: '軟件配置', link: '/zh-HK/tutorials/software-config' },
                { text: 'SO-ARM101教程', link: '/zh-HK/tutorials/so-arm101-tutorial' }
              ]
            }
          ],
          '/zh-HK/topics/': [
            {
              text: '技術專題',
              items: [
                { text: '技術專題首頁', link: '/zh-HK/topics/' },
                { text: '機器人學習專題', link: '/zh-HK/topics/robot-learning/' }
              ]
            }
          ]
        },
        footer: {
          copyright: 'Copyright © 2026 Juxi Technology. Built with VitePress.'
        },
        outline: { level: [1, 6], label: '本页面' }
      }
    }
  }
})
