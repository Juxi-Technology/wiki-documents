
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '钜犀科技 Wiki',
  description: '钜犀科技 产品教程与文档',
  base: '/wiki-documents/',

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      description: '钜犀科技 产品教程与文档',
      themeConfig: {
        logo: '/logo.png',
        siteTitle: '钜犀科技',
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
          copyright: 'Copyright © 2026 Juxi Technology. Built with VitePress.'
        },
        search: {
          provider: 'local',
          options: {
            locales: {
              root: {
                translations: {
                  button: {
                    buttonText: '搜索文档',
                    buttonAriaLabel: '搜索文档'
                  },
                  modal: {
                    displayDetails: '显示完整列表',
                    footer: {
                      selectText: '选择',
                      navigateText: '导航',
                      closeText: '关闭'
                    },
                    noResultsText: '没有找到相关结果',
                    resetButtonTitle: '重置搜索',
                    backButtonTitle: '返回搜索',
                    header: {
                      selectText: '选择',
                      navigateText: '导航',
                      closeText: '关闭'
                    }
                  }
                }
              }
            }
          }
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
          { text: 'Home', link: '/en/' },
          { text: 'Tutorials', link: '/en/tutorials/' },
          { text: 'Tech Docs', link: '/en/tech/' },
          { text: 'GitHub', link: 'https://github.com/Juxi-Technology' }
        ],
        sidebar: {
          '/en/tutorials/': [
            {
              text: 'Tutorials',
              items: [
                { text: 'Getting Started', link: '/en/tutorials/getting-started' },
                { text: 'Hardware Setup', link: '/en/tutorials/hardware-setup' },
                { text: 'Software Config', link: '/en/tutorials/software-config' }
              ]
            }
          ],
          '/en/tech/': [
            {
              text: 'Tech Docs',
              items: [
                { text: 'API Reference', link: '/en/tech/api-reference' },
                { text: 'Dev Guide', link: '/en/tech/dev-guide' }
              ]
            }
          ]
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/Juxi-Technology' }
        ],
        footer: {
          copyright: 'Copyright © 2026 Juxi Technology. Built with VitePress.'
        },
        search: {
          provider: 'local'
        },
        outline: {
          level: [1, 6],
          label: 'On this page'
        }
      }
    },
    'zh-TW': {
      label: '繁體中文',
      lang: 'zh-TW',
      description: '鉅犀科技 產品教程與文檔',
      themeConfig: {
        logo: '/logo.png',
        siteTitle: '鉅犀科技',
        nav: [
          { text: '首頁', link: '/zh-TW/' },
          { text: '產品教程', link: '/zh-TW/tutorials/' },
          { text: '技術文檔', link: '/zh-TW/tech/' },
          { text: 'GitHub', link: 'https://github.com/Juxi-Technology' }
        ],
        sidebar: {
          '/zh-TW/tutorials/': [
            {
              text: '產品教程',
              items: [
                { text: '快速入門', link: '/zh-TW/tutorials/getting-started' },
                { text: '硬件連接', link: '/zh-TW/tutorials/hardware-setup' },
                { text: '軟件配置', link: '/zh-TW/tutorials/software-config' }
              ]
            }
          ],
          '/zh-TW/tech/': [
            {
              text: '技術文檔',
              items: [
                { text: 'API 參考', link: '/zh-TW/tech/api-reference' },
                { text: '開發指南', link: '/zh-TW/tech/dev-guide' }
              ]
            }
          ]
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/Juxi-Technology' }
        ],
        footer: {
          copyright: 'Copyright © 2026 Juxi Technology. Built with VitePress.'
        },
        search: {
          provider: 'local',
          options: {
            locales: {
              'zh-TW': {
                translations: {
                  button: {
                    buttonText: '搜索文檔',
                    buttonAriaLabel: '搜索文檔'
                  },
                  modal: {
                    displayDetails: '顯示完整列表',
                    footer: {
                      selectText: '選擇',
                      navigateText: '導航',
                      closeText: '關閉'
                    },
                    noResultsText: '沒有找到相關結果',
                    resetButtonTitle: '重置搜索',
                    backButtonTitle: '返回搜索',
                    header: {
                      selectText: '選擇',
                      navigateText: '導航',
                      closeText: '關閉'
                    }
                  }
                }
              }
            }
          }
        },
        outline: {
          level: [1, 6],
          label: '本页面'
        }
      }
    }
  }
})
