
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '钜犀科技 Wiki',
  description: '钜犀科技 产品教程与文档',
  base: '/wiki-documents/',
  ignoreDeadLinks: true,
  
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
                        collapsible: true,
                        collapsed: false,
                        items: [
                            { text: '产品教程首页', link: '/tutorials/' },
                            {
                                text: '机器人机械臂系列',
                                collapsible: true,
                                collapsed: false,
                                items: [
                                    {
                                        text: 'SO-ARM101',
                                        collapsible: true,
                                        collapsed: false,
                                        items: [
                                            { text: 'SO-ARM101-使用教程', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                                            { text: 'SO-ARM101-组装教程', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                                            { text: 'SO-ARM101-Jetson Orin PyTorch兼容性教程', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                                            { text: 'SO-ARM101-臂载支架和环境相机套件安装教程', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                                            { text: 'SO-ARM101-顶置摄像头安装教程', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' }
                                        ]
                                    },
                                    {
                                        text: 'AmazingHand',
                                        collapsible: true,
                                        collapsed: false,
                                        items: [
                                            { text: 'AmazingHand-官方示例运行教程', link: '/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                                            { text: 'AmazingHand-TTL调试教程', link: '/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                                            { text: 'AmazingHand-界面控制教程', link: '/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' }
                                        ]
                                    }
                                ]
                            },
                            {
                                text: '机器人配件',
                                collapsible: true,
                                collapsed: false,
                                items: [
                                    { text: '4K高清HDMI采集器-教程', link: '/tutorials/accessories/4k-hdmi-capture-tutorial' },
                                    { text: 'KVM切换器-使用教程', link: '/tutorials/accessories/kvm-switch-tutorial' },
                                    { text: 'USB免驱声卡-教程', link: '/tutorials/accessories/usb-audio-card-tutorial' },
                                    { text: '0.91寸OLED屏幕-教程', link: '/tutorials/accessories/0.91-oled-screen-tutorial' },
                                    {
                                        text: 'KWS语音识别模块-系列教程',
                                        collapsible: true,
                                        collapsed: false,
                                        items: [
                                            { text: 'KWS语音识别模块（首页）', link: '/tutorials/accessories/KWS-speech-recognition-module/index' },
                                            { text: 'Jetson Nano串口通讯', link: '/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                                            { text: 'Jetson串口通讯', link: '/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                                            { text: 'PC串口通讯', link: '/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                                            { text: 'ROS2 RViz2可视化', link: '/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                                            { text: '中英文识别词固件下载与烧录', link: '/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
                                            { text: '树莓派串口通讯', link: '/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' }
                                        ]
                                    }
                                ]
                            },
                            {
                                text: '传感器与感知',
                                collapsible: true,
                                collapsed: false,
                                items: [
                                    {
                                        text: 'IMU惯导模块-系列教程',
                                        collapsible: true,
                                        collapsed: false,
                                        items: [
                                            { text: 'IMU模块使用教程', link: '/tutorials/sensors/imu' },
                                            { text: 'IMU模块产品资料', link: '/tutorials/sensors/imu/product-info' },
                                            {
                                                text: 'ROS应用案例',
                                                collapsible: true,
                                                collapsed: false,
                                                items: [
                                                    { text: 'ROS1应用', link: '/tutorials/sensors/imu/ros-examples/ros1' },
                                                    { text: 'ROS2应用', link: '/tutorials/sensors/imu/ros-examples/ros2' }
                                                ]
                                            },
                                            {
                                                text: '多主控通讯案例',
                                                collapsible: true,
                                                collapsed: false,
                                                items: [
                                                    { text: '多主控通讯案例', link: '/tutorials/sensors/imu/multi-board-examples/overview' },
                                                    { text: 'PC通讯', link: '/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                                                    {
                                                        text: 'IIC通讯',
                                                        collapsible: true,
                                                        collapsed: false,
                                                        items: [
                                                            { text: 'Arduino', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                                                            { text: 'Jetson系列', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                                                            { text: 'RDK系列', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                                                            { text: 'STM32 F103C8T6', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                                                            { text: '树莓派5', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' }
                                                        ]
                                                    },
                                                    {
                                                        text: '串口通讯',
                                                        collapsible: true,
                                                        collapsed: false,
                                                        items: [
                                                            { text: 'Arduino', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                                                            { text: 'Jetson系列', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                                                            { text: 'RDK系列', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                                                            { text: 'STM32 F103C8T6', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                                                            { text: '树莓派5', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                text: '学习资源',
                                collapsible: true,
                                collapsed: false,
                                items: [
                                    { text: '快速入门', link: '/tutorials/learning-resources/getting-started' },
                                    { text: '硬件连接', link: '/tutorials/learning-resources/hardware-setup' },
                                    { text: '软件配置', link: '/tutorials/learning-resources/software-config' }
                                ]
                            }
                        ]
                    }
                ],
          '/topics/': [
            {
              text: '技术专题',
              collapsible: true,
              collapsed: false,
              items: [
                { text: '技术专题首页', link: '/topics/' },
                { text: '机器人学习专题', link: '/topics/robot-learning/' }
              ]
            }
          ],
          '/tech/': [
            {
              text: '技术文档',
              collapsible: true,
              collapsed: false,
              items: [
                { text: '技术文档首页', link: '/tech/' },
                { text: '开发指南', link: '/tech/dev-guide' },
                { text: 'API 参考', link: '/tech/api-reference' }
              ]
            }
          ],
          '/cases/': [
            {
              text: '案例',
              collapsible: true,
              collapsed: false,
              items: [
                { text: '案例首页', link: '/cases/' }
              ]
            }
          ],
          '/community/': [
            {
              text: '社区',
              collapsible: true,
              collapsed: false,
              items: [
                { text: '社区首页', link: '/community/' }
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
              collapsible: true,
              collapsed: false,
              items: [
                { text: 'Tutorials Home', link: '/en/tutorials/' },
                {
                  text: 'Robot Arm Series',
                  collapsible: true,
                  collapsed: false,
                  items: [
                    {
                      text: 'SO-ARM101',
                      collapsible: true,
                      collapsed: false,
                      items: [
                        { text: 'SO-ARM101-Tutorial', link: '/en/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                        { text: 'SO-ARM101-Assembly', link: '/en/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                        { text: 'SO-ARM101-Jetson-Orin-PyTorch-Compatibility', link: '/en/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                        { text: 'SO-ARM101-100-Arm-Mount-Camera-Kit-Installation', link: '/en/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                        { text: 'SO-ARM101-Overhead-Camera-Mount-Installation', link: '/en/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' }
                      ]
                    },
                    {
                      text: 'AmazingHand',
                      collapsible: true,
                      collapsed: false,
                      items: [
                        { text: 'AmazingHand-Official-Example', link: '/en/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                        { text: 'AmazingHand-TTL-Debugging', link: '/en/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                        { text: 'AmazingHand-Interface-Control', link: '/en/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' }
                      ]
                    }
                  ]
                },
                {
                  text: 'Robot Accessories',
                  collapsible: true,
                  collapsed: false,
                  items: [
                    { text: '4K HDMI Capture Tutorial', link: '/en/tutorials/accessories/4k-hdmi-capture-tutorial' },
                    { text: 'KVM Switch Tutorial', link: '/en/tutorials/accessories/kvm-switch-tutorial' },
                    { text: 'USB Audio Card Tutorial', link: '/en/tutorials/accessories/usb-audio-card-tutorial' },
                    { text: '0.91 OLED Screen Tutorial', link: '/en/tutorials/accessories/0.91-oled-screen-tutorial' },
                    {
                      text: 'KWS Speech Recognition Module Series',
                      collapsible: true,
                      collapsed: false,
                      items: [
                        { text: 'KWS Speech Recognition Module (Home)', link: '/en/tutorials/accessories/KWS-speech-recognition-module/index' },
                        { text: 'Jetson Nano Serial Communication', link: '/en/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                        { text: 'Jetson Serial Communication', link: '/en/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                        { text: 'PC Serial Communication', link: '/en/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                        { text: 'ROS2 RViz2 Visualization', link: '/en/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                        { text: 'Chinese and English Recognition Word Firmware Download and Burn', link: '/en/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
                        { text: 'Raspberry Pi Serial Communication', link: '/en/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' }
                      ]
                    }
                  ]
                },
                {
                  text: 'Sensors and Perception',
                  collapsible: true,
                  collapsed: false,
                  items: [
                    {
                      text: 'IMU-Inertial Navigation Module-Series',
                      collapsible: true,
                      collapsed: false,
                      items: [
                        { text: 'IMU Tutorial', link: '/en/tutorials/sensors/imu/index' },
                        { text: 'Product Info', link: '/en/tutorials/sensors/imu/product-info' },
                        {
                          text: 'ROS Examples',
                          collapsible: true,
                          collapsed: false,
                          items: [
                            { text: 'ROS1', link: '/en/tutorials/sensors/imu/ros-examples/ros1' },
                            { text: 'ROS2', link: '/en/tutorials/sensors/imu/ros-examples/ros2' }
                          ]
                        },
                        {
                          text: 'Multi-Board Examples',
                          collapsible: true,
                          collapsed: false,
                          items: [
                            { text: 'Overview', link: '/en/tutorials/sensors/imu/multi-board-examples/overview' },
                            { text: 'PC Communication', link: '/en/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                            {
                              text: 'I2C Communication',
                              collapsible: true,
                              collapsed: false,
                              items: [
                                { text: 'Arduino', link: '/en/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                                { text: 'Jetson', link: '/en/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                                { text: 'RDK', link: '/en/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                                { text: 'STM32', link: '/en/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                                { text: 'Raspberry Pi', link: '/en/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' }
                              ]
                            },
                            {
                              text: 'Serial Communication',
                              collapsible: true,
                              collapsed: false,
                              items: [
                                { text: 'Arduino', link: '/en/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                                { text: 'Jetson', link: '/en/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                                { text: 'RDK', link: '/en/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                                { text: 'STM32', link: '/en/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                                { text: 'Raspberry Pi', link: '/en/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  text: 'Learning Resources',
                  collapsible: true,
                  collapsed: false,
                  items: [
                    { text: 'Getting Started', link: '/en/tutorials/learning-resources/getting-started' },
                    { text: 'Hardware Setup', link: '/en/tutorials/learning-resources/hardware-setup' },
                    { text: 'Software Config', link: '/en/tutorials/learning-resources/software-config' }
                  ]
                }
              ]
            }
          ],
          '/en/topics/': [
            {
              text: 'Topics',
              collapsible: true,
              collapsed: false,
              items: [
                { text: 'Topics Home', link: '/en/topics/' },
                { text: 'Robot Learning Topic', link: '/en/topics/robot-learning/' }
              ]
            }
          ],
          '/en/tech/': [
            {
              text: 'Tech Docs',
              collapsible: true,
              collapsed: false,
              items: [
                { text: 'Tech Docs Home', link: '/en/tech/' },
                { text: 'Dev Guide', link: '/en/tech/dev-guide' },
                { text: 'API Reference', link: '/en/tech/api-reference' }
              ]
            }
          ],
          '/en/cases/': [
            {
              text: 'Cases',
              collapsible: true,
              collapsed: false,
              items: [
                { text: 'Cases Home', link: '/en/cases/' }
              ]
            }
          ],
          '/en/community/': [
            {
              text: 'Community',
              collapsible: true,
              collapsed: false,
              items: [
                { text: 'Community Home', link: '/en/community/' }
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
              collapsible: true,
              collapsed: false,
              items: [
                { text: '產品教程首頁', link: '/zh-HK/tutorials/' },
                {
                  text: '機器人機械臂系列',
                  collapsible: true,
                  collapsed: false,
                  items: [
                    {
                      text: 'SO-ARM101',
                      collapsible: true,
                      collapsed: false,
                      items: [
                        { text: 'SO-ARM101-使用教程', link: '/zh-HK/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                        { text: 'SO-ARM101-組裝教程', link: '/zh-HK/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                        { text: 'SO-ARM101-Jetson Orin PyTorch兼容性教程', link: '/zh-HK/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                        { text: 'SO-ARM101-臂載支架和環境相機套件安裝教程', link: '/zh-HK/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                        { text: 'SO-ARM101-頂置攝像頭安裝教程', link: '/zh-HK/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' }
                      ]
                    },
                    {
                      text: 'AmazingHand',
                      collapsible: true,
                      collapsed: false,
                      items: [
                        { text: 'AmazingHand-官方示例運行教程', link: '/zh-HK/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                        { text: 'AmazingHand-TTL調試教程', link: '/zh-HK/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                        { text: 'AmazingHand-界面控制教程', link: '/zh-HK/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' }
                      ]
                    }
                  ]
                },
                {
                  text: '機器人配件',
                  collapsible: true,
                  collapsed: false,
                  items: [
                    { text: '4K高清HDMI採集器-教程', link: '/zh-HK/tutorials/accessories/4k-hdmi-capture-tutorial' },
                    { text: 'KVM切換器-使用教程', link: '/zh-HK/tutorials/accessories/kvm-switch-tutorial' },
                    { text: 'USB免驅聲卡-教程', link: '/zh-HK/tutorials/accessories/usb-audio-card-tutorial' },
                    { text: '0.91寸OLED屏幕-教程', link: '/zh-HK/tutorials/accessories/0.91-oled-screen-tutorial' },
                    {
                      text: 'KWS語音識別模組-系列教程',
                      collapsible: true,
                      collapsed: false,
                      items: [
                        { text: 'KWS語音識別模組（首頁）', link: '/zh-HK/tutorials/accessories/KWS-speech-recognition-module/index' },
                        { text: 'Jetson Nano串口通訊', link: '/zh-HK/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                        { text: 'Jetson串口通訊', link: '/zh-HK/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                        { text: 'PC串口通訊', link: '/zh-HK/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                        { text: 'ROS2 RViz2可視化', link: '/zh-HK/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                        { text: '中英文識別詞固件下載與燒錄', link: '/zh-HK/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
                        { text: '樹莓派串口通訊', link: '/zh-HK/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' }
                      ]
                    }
                  ]
                },
                {
                  text: '傳感器與感知',
                  collapsible: true,
                  collapsed: false,
                  items: [
                    {
                      text: 'IMU慣導模組-系列教程',
                      collapsible: true,
                      collapsed: false,
                      items: [
                        { text: 'IMU模組使用教程', link: '/zh-HK/tutorials/sensors/imu' },
                        { text: 'IMU模組產品資料', link: '/zh-HK/tutorials/sensors/imu/product-info' },
                        {
                          text: 'ROS應用案例',
                          collapsible: true,
                          collapsed: false,
                          items: [
                            { text: 'ROS1應用', link: '/zh-HK/tutorials/sensors/imu/ros-examples/ros1' },
                            { text: 'ROS2應用', link: '/zh-HK/tutorials/sensors/imu/ros-examples/ros2' }
                          ]
                        },
                        {
                          text: '多主控通訊案例',
                          collapsible: true,
                          collapsed: false,
                          items: [
                            { text: '多主控通訊案例', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/overview' },
                            { text: 'PC通訊', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                            {
                              text: 'IIC通訊',
                              collapsible: true,
                              collapsed: false,
                              items: [
                                { text: 'Arduino', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                                { text: 'Jetson系列', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                                { text: 'RDK系列', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                                { text: 'STM32 F103C8T6', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                                { text: '樹莓派5', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' }
                              ]
                            },
                            {
                              text: '串口通訊',
                              collapsible: true,
                              collapsed: false,
                              items: [
                                { text: 'Arduino', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                                { text: 'Jetson系列', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                                { text: 'RDK系列', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                                { text: 'STM32 F103C8T6', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                                { text: '樹莓派5', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  text: '學習資源',
                  collapsible: true,
                  collapsed: false,
                  items: [
                    { text: '快速入門', link: '/zh-HK/tutorials/learning-resources/getting-started' },
                    { text: '硬件連接', link: '/zh-HK/tutorials/learning-resources/hardware-setup' },
                    { text: '軟件配置', link: '/zh-HK/tutorials/learning-resources/software-config' }
                  ]
                }
              ]
            }
          ],
          '/zh-HK/topics/': [
            {
              text: '技術專題',
              collapsible: true,
              collapsed: false,
              items: [
                { text: '技術專題首頁', link: '/zh-HK/topics/' },
                { text: '機器人學習專題', link: '/zh-HK/topics/robot-learning/' }
              ]
            }
          ],
          '/zh-HK/tech/': [
            {
              text: '技術文檔',
              collapsible: true,
              collapsed: false,
              items: [
                { text: '技術文檔首頁', link: '/zh-HK/tech/' },
                { text: '開發指南', link: '/zh-HK/tech/dev-guide' },
                { text: 'API 參考', link: '/zh-HK/tech/api-reference' }
              ]
            }
          ],
          '/zh-HK/cases/': [
            {
              text: '案例',
              collapsible: true,
              collapsed: false,
              items: [
                { text: '案例首頁', link: '/zh-HK/cases/' }
              ]
            }
          ],
          '/zh-HK/community/': [
            {
              text: '社區',
              collapsible: true,
              collapsed: false,
              items: [
                { text: '社區首頁', link: '/zh-HK/community/' }
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
