import { defineConfig } from 'vitepress'

// 全局 head:SEO 基础标签(baidu 验证 + Open Graph + Twitter Card + canonical)
const globalHead = [
  ['meta', { name: 'baidu-site-verification', content: 'codeva-Lzl2d4xzcv' }],
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:image', content: 'https://juxi-technology.github.io/wiki-documents/images/logos/logo-black.png' }],
  ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ['link', { rel: 'canonical', href: 'https://juxi-technology.github.io/wiki-documents/' }],
  ['meta', { name: 'robots', content: 'index, follow' }],
]

// ---- 简体中文 (root) ----
const zhCN = {
  label: '简体中文',
  lang: 'zh-CN',
  description: '钜犀科技产品教程与文档中心',
  head: [
    ['meta', { property: 'og:title', content: '钜犀科技 Wiki - 产品教程与文档中心' }],
    ['meta', { property: 'og:description', content: '钜犀科技 Wiki，涵盖机器人机械臂、传感器、配件等完整产品教程与技术文档。从 SO-ARM101 到 IMU 惯导模块，为机器人与 AI 硬件开发者提供全流程指南。' }],
  ],
  themeConfig: {
    siteTitle: '钜犀科技 Wiki',
    nav: [
      { text: '教程', link: '/tutorials/', activeMatch: '/tutorials/' },
      { text: '技术专题', link: '/topics/', activeMatch: '/topics/' },
      { text: '技术文档', link: '/tech/', activeMatch: '/tech/' },
      { text: '用户案例', link: '/cases/', activeMatch: '/cases/' },
      { text: '社区', link: '/community/', activeMatch: '/community/' },
    ],
    sidebar: {
      '/tutorials/': [
        {
          text: '快速开始',
          items: [
            { text: '快速开始', link: '/tutorials/getting-started' },
            { text: '硬件设置', link: '/tutorials/hardware-setup' },
            { text: '软件配置', link: '/tutorials/software-config' },
            { text: '飞书文档', link: '/tutorials/lark-wiki' },
          ],
        },
        {
          text: '学习资源',
          items: [
            { text: '学习资源首页', link: '/tutorials/learning-resources/' },
            { text: '快速开始', link: '/tutorials/learning-resources/getting-started' },
            { text: '硬件设置', link: '/tutorials/learning-resources/hardware-setup' },
            { text: '软件配置', link: '/tutorials/learning-resources/software-config' },
            { text: 'Jetson Orin PyTorch 兼容性', link: '/tutorials/learning-resources/jetson-orin-pytorch-compatibility' },
          ],
        },
        {
          text: '机械臂',
          items: [
            { text: '机械臂总览', link: '/tutorials/robot-arms/' },
            {
              text: 'SO-ARM101 系列',
              collapsed: false,
              items: [
                { text: 'SO-ARM101 使用教程', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                { text: 'SO-ARM101 组装教程', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                { text: 'SO-ARM101 Jetson Orin PyTorch 兼容性', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                { text: '臂载支架与环境相机套件安装', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                { text: '顶置摄像头安装', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: '界面控制教程', link: '/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: '官方示例运行教程', link: '/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'TTL 调试教程', link: '/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
              ],
            },
            {
              text: 'Lekiwi',
              collapsed: true,
              items: [
                { text: 'Lekiwi 使用教程', link: '/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial' },
                { text: 'Lekiwi 组装教程', link: '/tutorials/robot-arms/lekiwi/Lekiwi-Assembly' },
              ],
            },
          ],
        },
        {
          text: '配件',
          items: [
            { text: '配件总览', link: '/tutorials/accessories/' },
            {
              text: 'KWS 语音识别模块',
              collapsed: true,
              items: [
                { text: '系列教程首页', link: '/tutorials/accessories/KWS-speech-recognition-module/' },
                { text: 'Jetson Nano 串口通信', link: '/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                { text: 'Jetson 串口通信', link: '/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                { text: 'PC 串口通信', link: '/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                { text: '树莓派串口通信', link: '/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' },
                { text: 'ROS2 rviz2 可视化', link: '/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                { text: '中英文识别词固件下载与烧录', link: '/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
              ],
            },
            {
              text: 'Feetech 舵机',
              collapsed: true,
              items: [
                { text: 'STS3215 & SCS0009 调试教程', link: '/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial' },
                { text: 'SCS 通信协议', link: '/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol' },
                { text: '磁编码 STS 舵机内存表解析', link: '/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis' },
                { text: '电位器 SCSCL 舵机内存表解析', link: '/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis' },
              ],
            },
            {
              text: '其他配件',
              collapsed: true,
              items: [
                { text: 'USB 自动对焦摄像头', link: '/tutorials/accessories/usb-auto-focus-camera' },
                { text: 'Jetson CSI 摄像头', link: '/tutorials/accessories/jetson-csi-camera' },
                { text: '2 自由度相机云台', link: '/tutorials/accessories/2dof-camera-gimbal' },
                { text: '心率血氧传感器', link: '/tutorials/accessories/heart-rate-spo2' },
                { text: '0.91 寸 OLED 屏幕', link: '/tutorials/accessories/0.91-oled-screen-tutorial' },
                { text: '4K HDMI 采集器', link: '/tutorials/accessories/4k-hdmi-capture-tutorial' },
                { text: 'KVM 切换器', link: '/tutorials/accessories/kvm-switch-tutorial' },
                { text: 'USB 免驱声卡', link: '/tutorials/accessories/usb-audio-card-tutorial' },
              ],
            },
          ],
        },
        {
          text: '传感器',
          items: [
            { text: '传感器总览', link: '/tutorials/sensors/' },
            {
              text: 'IMU 惯性导航模块',
              collapsed: true,
              items: [
                { text: '产品信息', link: '/tutorials/sensors/imu/product-info' },
                {
                  text: '多板卡示例',
                  items: [
                    { text: '多主控通信案例概览', link: '/tutorials/sensors/imu/multi-board-examples/overview' },
                    { text: 'PC 通信', link: '/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                    {
                      text: 'I2C 通信',
                      items: [
                        { text: 'Arduino', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                        { text: 'Jetson', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                        { text: '树莓派', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' },
                        { text: 'RDK', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                        { text: 'STM32', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                      ],
                    },
                    {
                      text: '串口通信',
                      items: [
                        { text: 'Arduino', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                        { text: 'Jetson', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                        { text: '树莓派', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' },
                        { text: 'RDK', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                        { text: 'STM32', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                      ],
                    },
                  ],
                },
                {
                  text: 'ROS 示例',
                  items: [
                    { text: 'ROS1 应用', link: '/tutorials/sensors/imu/ros-examples/ros1' },
                    { text: 'ROS2 应用', link: '/tutorials/sensors/imu/ros-examples/ros2' },
                  ],
                },
              ],
            },
          ],
        },
      ],
      '/topics/': [
        { text: '技术专题', items: [{ text: '专题首页', link: '/topics/' }, { text: '机器人学习', link: '/topics/robot-learning/' }] },
      ],
      '/tech/': [
        { text: '技术文档', items: [{ text: '技术文档首页', link: '/tech/' }, { text: 'API 参考', link: '/tech/api-reference' }, { text: '开发指南', link: '/tech/dev-guide' }] },
      ],
      '/cases/': [
        { text: '用户案例', items: [{ text: '案例首页', link: '/cases/' }] },
      ],
      '/community/': [
        { text: '社区', items: [{ text: '社区首页', link: '/community/' }, { text: '贡献指南', link: '/community/contributing' }] },
      ],
    },
  },
}

// ---- English ----
const en = {
  label: 'English',
  lang: 'en',
  description: 'Juxi Technology Product Tutorials and Documentation Center',
  head: [
    ['meta', { property: 'og:title', content: 'Juxi Technology Wiki - Product Tutorials & Documentation' }],
    ['meta', { property: 'og:description', content: 'Juxi Technology Wiki — comprehensive tutorials and docs for robot arms, sensors, and accessories. From SO-ARM101 to IMU modules, a complete guide for robotics and AI hardware developers.' }],
  ],
  themeConfig: {
    siteTitle: 'Juxi Technology Wiki',
    nav: [
      { text: 'Tutorials', link: '/en/tutorials/', activeMatch: '/en/tutorials/' },
      { text: 'Topics', link: '/en/topics/', activeMatch: '/en/topics/' },
      { text: 'Tech Docs', link: '/en/tech/', activeMatch: '/en/tech/' },
      { text: 'Cases', link: '/en/cases/', activeMatch: '/en/cases/' },
      { text: 'Community', link: '/en/community/', activeMatch: '/en/community/' },
    ],
    sidebar: {
      '/en/tutorials/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Getting Started', link: '/en/tutorials/getting-started' },
            { text: 'Hardware Setup', link: '/en/tutorials/hardware-setup' },
            { text: 'Software Config', link: '/en/tutorials/software-config' },
            { text: 'Lark Docs', link: '/en/tutorials/lark-wiki' },
          ],
        },
        {
          text: 'Learning Resources',
          items: [
            { text: 'Learning Resources Home', link: '/en/tutorials/learning-resources/' },
            { text: 'Getting Started', link: '/en/tutorials/learning-resources/getting-started' },
            { text: 'Hardware Setup', link: '/en/tutorials/learning-resources/hardware-setup' },
            { text: 'Software Config', link: '/en/tutorials/learning-resources/software-config' },
            { text: 'Jetson Orin PyTorch Compatibility', link: '/en/tutorials/learning-resources/jetson-orin-pytorch-compatibility' },
          ],
        },
        {
          text: 'Robot Arms',
          items: [
            { text: 'Robot Arms Overview', link: '/en/tutorials/robot-arms/' },
            {
              text: 'SO-ARM101 Series',
              collapsed: false,
              items: [
                { text: 'SO-ARM101 Tutorial', link: '/en/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                { text: 'SO-ARM101 Assembly', link: '/en/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                { text: 'SO-ARM101 Jetson Orin PyTorch Compatibility', link: '/en/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                { text: 'Arm Mount & Camera Kit Installation', link: '/en/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                { text: 'Overhead Camera Mount Installation', link: '/en/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: 'Interface Control Tutorial', link: '/en/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: 'Official Example Tutorial', link: '/en/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'TTL Debugging Tutorial', link: '/en/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
              ],
            },
            {
              text: 'Lekiwi',
              collapsed: true,
              items: [
                { text: 'Lekiwi Tutorial', link: '/en/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial' },
                { text: 'Lekiwi Assembly', link: '/en/tutorials/robot-arms/lekiwi/Lekiwi-Assembly' },
              ],
            },
          ],
        },
        {
          text: 'Accessories',
          items: [
            { text: 'Accessories Overview', link: '/en/tutorials/accessories/' },
            {
              text: 'KWS Speech Recognition Module',
              collapsed: true,
              items: [
                { text: 'Series Home', link: '/en/tutorials/accessories/KWS-speech-recognition-module/' },
                { text: 'Jetson Nano Serial Communication', link: '/en/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                { text: 'Jetson Serial Communication', link: '/en/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                { text: 'PC Serial Communication', link: '/en/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                { text: 'Raspberry Pi Serial Communication', link: '/en/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' },
                { text: 'ROS2 rviz2 Visualization', link: '/en/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                { text: 'Firmware Download & Burn', link: '/en/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
              ],
            },
            {
              text: 'Feetech Servos',
              collapsed: true,
              items: [
                { text: 'STS3215 & SCS0009 Tutorial', link: '/en/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial' },
                { text: 'SCS Communication Protocol', link: '/en/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol' },
                { text: 'Magnetic Encoder STS Servo Memory Table', link: '/en/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis' },
                { text: 'Potentiometer SCSCL Servo Memory Table', link: '/en/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis' },
              ],
            },
            {
              text: 'Other Accessories',
              collapsed: true,
              items: [
                { text: 'USB Auto-Focus Camera', link: '/en/tutorials/accessories/usb-auto-focus-camera' },
                { text: 'Jetson CSI Camera', link: '/en/tutorials/accessories/jetson-csi-camera' },
                { text: '2-DOF Camera Gimbal', link: '/en/tutorials/accessories/2dof-camera-gimbal' },
                { text: 'Heart Rate & SpO2 Sensor', link: '/en/tutorials/accessories/heart-rate-spo2' },
                { text: '0.91" OLED Screen', link: '/en/tutorials/accessories/0.91-oled-screen-tutorial' },
                { text: '4K HDMI Capture', link: '/en/tutorials/accessories/4k-hdmi-capture-tutorial' },
                { text: 'KVM Switch', link: '/en/tutorials/accessories/kvm-switch-tutorial' },
                { text: 'USB Driver-Free Sound Card', link: '/en/tutorials/accessories/usb-audio-card-tutorial' },
              ],
            },
          ],
        },
        {
          text: 'Sensors',
          items: [
            { text: 'Sensors Overview', link: '/en/tutorials/sensors/' },
            {
              text: 'IMU Inertial Module',
              collapsed: true,
              items: [
                { text: 'Product Info', link: '/en/tutorials/sensors/imu/product-info' },
                {
                  text: 'Multi-Board Examples',
                  items: [
                    { text: 'Overview', link: '/en/tutorials/sensors/imu/multi-board-examples/overview' },
                    { text: 'PC Communication', link: '/en/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                    {
                      text: 'I2C Communication',
                      items: [
                        { text: 'Arduino', link: '/en/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                        { text: 'Jetson', link: '/en/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                        { text: 'Raspberry Pi', link: '/en/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' },
                        { text: 'RDK', link: '/en/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                        { text: 'STM32', link: '/en/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                      ],
                    },
                    {
                      text: 'Serial Communication',
                      items: [
                        { text: 'Arduino', link: '/en/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                        { text: 'Jetson', link: '/en/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                        { text: 'Raspberry Pi', link: '/en/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' },
                        { text: 'RDK', link: '/en/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                        { text: 'STM32', link: '/en/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                      ],
                    },
                  ],
                },
                {
                  text: 'ROS Examples',
                  items: [
                    { text: 'ROS1', link: '/en/tutorials/sensors/imu/ros-examples/ros1' },
                    { text: 'ROS2', link: '/en/tutorials/sensors/imu/ros-examples/ros2' },
                  ],
                },
              ],
            },
          ],
        },
      ],
      '/en/topics/': [
        { text: 'Topics', items: [{ text: 'Topics Home', link: '/en/topics/' }, { text: 'Robot Learning', link: '/en/topics/robot-learning/' }] },
      ],
      '/en/tech/': [
        { text: 'Tech Docs', items: [{ text: 'Tech Docs Home', link: '/en/tech/' }, { text: 'API Reference', link: '/en/tech/api-reference' }, { text: 'Developer Guide', link: '/en/tech/dev-guide' }] },
      ],
      '/en/cases/': [
        { text: 'Cases', items: [{ text: 'Cases Home', link: '/en/cases/' }] },
      ],
      '/en/community/': [
        { text: 'Community', items: [{ text: 'Community Home', link: '/en/community/' }, { text: 'Contributing Guide', link: '/en/community/contributing' }] },
      ],
    },
  },
}

// ---- 繁體中文 (zh-HK) ----
const zhHK = {
  label: '繁體中文',
  lang: 'zh-HK',
  description: '鉅犀科技產品教程與文檔中心',
  head: [
    ['meta', { property: 'og:title', content: '鉅犀科技 Wiki - 產品教程與文檔中心' }],
    ['meta', { property: 'og:description', content: '鉅犀科技 Wiki，涵蓋機器人機械臂、傳感器、配件等完整產品教程與技術文檔。從 SO-ARM101 到 IMU 慣導模組，為機器人與 AI 硬件開發者提供全流程指南。' }],
  ],
  themeConfig: {
    siteTitle: '鉅犀科技 Wiki',
    nav: [
      { text: '教程', link: '/zh-HK/tutorials/', activeMatch: '/zh-HK/tutorials/' },
      { text: '技術專題', link: '/zh-HK/topics/', activeMatch: '/zh-HK/topics/' },
      { text: '技術文檔', link: '/zh-HK/tech/', activeMatch: '/zh-HK/tech/' },
      { text: '用戶案例', link: '/zh-HK/cases/', activeMatch: '/zh-HK/cases/' },
      { text: '社區', link: '/zh-HK/community/', activeMatch: '/zh-HK/community/' },
    ],
    sidebar: {
      '/zh-HK/tutorials/': [
        {
          text: '快速開始',
          items: [
            { text: '快速開始', link: '/zh-HK/tutorials/getting-started' },
            { text: '硬件設置', link: '/zh-HK/tutorials/hardware-setup' },
            { text: '軟件配置', link: '/zh-HK/tutorials/software-config' },
            { text: '飛書文檔', link: '/zh-HK/tutorials/lark-wiki' },
          ],
        },
        {
          text: '學習資源',
          items: [
            { text: '學習資源首頁', link: '/zh-HK/tutorials/learning-resources/' },
            { text: '快速開始', link: '/zh-HK/tutorials/learning-resources/getting-started' },
            { text: '硬件設置', link: '/zh-HK/tutorials/learning-resources/hardware-setup' },
            { text: '軟件配置', link: '/zh-HK/tutorials/learning-resources/software-config' },
            { text: 'Jetson Orin PyTorch 相容性', link: '/zh-HK/tutorials/learning-resources/jetson-orin-pytorch-compatibility' },
          ],
        },
        {
          text: '機械臂',
          items: [
            { text: '機械臂總覽', link: '/zh-HK/tutorials/robot-arms/' },
            {
              text: 'SO-ARM101 系列',
              collapsed: false,
              items: [
                { text: 'SO-ARM101 使用教程', link: '/zh-HK/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                { text: 'SO-ARM101 組裝教程', link: '/zh-HK/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                { text: 'SO-ARM101 Jetson Orin PyTorch 相容性', link: '/zh-HK/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                { text: '臂載支架與環境相機套件安裝', link: '/zh-HK/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                { text: '頂置攝像頭安裝', link: '/zh-HK/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: '界面控制教程', link: '/zh-HK/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: '官方示例運行教程', link: '/zh-HK/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'TTL 調試教程', link: '/zh-HK/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
              ],
            },
            {
              text: 'Lekiwi',
              collapsed: true,
              items: [
                { text: 'Lekiwi 使用教程', link: '/zh-HK/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial' },
                { text: 'Lekiwi 組裝教程', link: '/zh-HK/tutorials/robot-arms/lekiwi/Lekiwi-Assembly' },
              ],
            },
          ],
        },
        {
          text: '配件',
          items: [
            { text: '配件總覽', link: '/zh-HK/tutorials/accessories/' },
            {
              text: 'KWS 語音識別模組',
              collapsed: true,
              items: [
                { text: '系列教程首頁', link: '/zh-HK/tutorials/accessories/KWS-speech-recognition-module/' },
                { text: 'Jetson Nano 串口通信', link: '/zh-HK/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                { text: 'Jetson 串口通信', link: '/zh-HK/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                { text: 'PC 串口通信', link: '/zh-HK/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                { text: '樹莓派串口通信', link: '/zh-HK/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' },
                { text: 'ROS2 rviz2 可視化', link: '/zh-HK/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                { text: '中英文識別詞固件下載與燒錄', link: '/zh-HK/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
              ],
            },
            {
              text: 'Feetech 舵機',
              collapsed: true,
              items: [
                { text: 'STS3215 & SCS0009 調試教程', link: '/zh-HK/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial' },
                { text: 'SCS 通信協議', link: '/zh-HK/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol' },
                { text: '磁編碼 STS 舵機內存表解析', link: '/zh-HK/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis' },
                { text: '電位器 SCSCL 舵機內存表解析', link: '/zh-HK/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis' },
              ],
            },
            {
              text: '其他配件',
              collapsed: true,
              items: [
                { text: 'USB 自動對焦攝像頭', link: '/zh-HK/tutorials/accessories/usb-auto-focus-camera' },
                { text: 'Jetson CSI 攝像頭', link: '/zh-HK/tutorials/accessories/jetson-csi-camera' },
                { text: '2 自由度相機雲台', link: '/zh-HK/tutorials/accessories/2dof-camera-gimbal' },
                { text: '心率血氧傳感器', link: '/zh-HK/tutorials/accessories/heart-rate-spo2' },
                { text: '0.91 吋 OLED 屏幕', link: '/zh-HK/tutorials/accessories/0.91-oled-screen-tutorial' },
                { text: '4K HDMI 採集器', link: '/zh-HK/tutorials/accessories/4k-hdmi-capture-tutorial' },
                { text: 'KVM 切換器', link: '/zh-HK/tutorials/accessories/kvm-switch-tutorial' },
                { text: 'USB 免驅聲卡', link: '/zh-HK/tutorials/accessories/usb-audio-card-tutorial' },
              ],
            },
          ],
        },
        {
          text: '傳感器',
          items: [
            { text: '傳感器總覽', link: '/zh-HK/tutorials/sensors/' },
            {
              text: 'IMU 慣性導航模組',
              collapsed: true,
              items: [
                { text: '產品資料', link: '/zh-HK/tutorials/sensors/imu/product-info' },
                {
                  text: '多板卡示例',
                  items: [
                    { text: '多主控通信案例概覽', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/overview' },
                    { text: 'PC 通信', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                    {
                      text: 'I2C 通信',
                      items: [
                        { text: 'Arduino', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                        { text: 'Jetson', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                        { text: '樹莓派', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' },
                        { text: 'RDK', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                        { text: 'STM32', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                      ],
                    },
                    {
                      text: '串口通信',
                      items: [
                        { text: 'Arduino', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                        { text: 'Jetson', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                        { text: '樹莓派', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' },
                        { text: 'RDK', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                        { text: 'STM32', link: '/zh-HK/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                      ],
                    },
                  ],
                },
                {
                  text: 'ROS 示例',
                  items: [
                    { text: 'ROS1 應用', link: '/zh-HK/tutorials/sensors/imu/ros-examples/ros1' },
                    { text: 'ROS2 應用', link: '/zh-HK/tutorials/sensors/imu/ros-examples/ros2' },
                  ],
                },
              ],
            },
          ],
        },
      ],
      '/zh-HK/topics/': [
        { text: '技術專題', items: [{ text: '專題首頁', link: '/zh-HK/topics/' }, { text: '機器人學習', link: '/zh-HK/topics/robot-learning/' }] },
      ],
      '/zh-HK/tech/': [
        { text: '技術文檔', items: [{ text: '技術文檔首頁', link: '/zh-HK/tech/' }, { text: 'API 參考', link: '/zh-HK/tech/api-reference' }, { text: '開發指南', link: '/zh-HK/tech/dev-guide' }] },
      ],
      '/zh-HK/cases/': [
        { text: '用戶案例', items: [{ text: '案例首頁', link: '/zh-HK/cases/' }] },
      ],
      '/zh-HK/community/': [
        { text: '社區', items: [{ text: '社區首頁', link: '/zh-HK/community/' }, { text: '貢獻指南', link: '/zh-HK/community/contributing' }] },
      ],
    },
  },
}

export default defineConfig({
  lang: 'zh-CN',
  title: '钜犀科技 Wiki',
  description: '钜犀科技产品教程与文档中心',
  base: '/wiki-documents/',
  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  // public/ 下的 .md 是历史遗留占位/草稿(飞书链接),不应渲染为页面
  // test.md / superpowers/ 已在阶段 1 移出 docs/(git 层面),磁盘残留待 sudo 清理,构建时一并排除
  srcExclude: [
    'public/**/*.md',
    'superpowers/**/*.md',
    'test.md',
    'tutorials/so-arm101/**/*.md',
  ],
  head: globalHead,
  locales: {
    root: zhCN,
    en,
    'zh-HK': zhHK,
  },
  themeConfig: {
    logo: {
      light: '/images/logos/logo-black.png',
      dark: '/images/logos/logo-white.png',
    },
    // 三语 nav/sidebar 定义在各 locales.themeConfig 中,这里只放公共 logo
    footer: {
      message: 'Juxi Technology',
      copyright: '© 2026 Juxi Technology',
    },
  },
})
