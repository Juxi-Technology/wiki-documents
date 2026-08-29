import { defineConfig } from 'vitepress'

// 全局 head:SEO 基础标签(baidu 验证 + Open Graph + Twitter Card + canonical)
const globalHead = [
  ['meta', { name: 'baidu-site-verification', content: 'codeva-Lzl2d4xzcv' }],
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:image', content: 'https://wiki.juxitech.com/images/logos/logo-black.png' }],
  ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ['link', { rel: 'canonical', href: 'https://wiki.juxitech.com/' }],
  ['meta', { name: 'robots', content: 'index, follow' }],
  // 百度统计(替换 YOUR_BAIDU_ID 为真实统计 ID;不配置则脚本为空 no-op)
  ['script', {}, `(function(){
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;
    var _hmt = _hmt || [];
    var hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?' + 'YOUR_BAIDU_ID';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
  })();`],
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
      { text: '教程', link: '/zh-hans/tutorials/', activeMatch: '/zh-hans/tutorials/' },
      { text: '技术专题', link: '/zh-hans/topics/', activeMatch: '/zh-hans/topics/' },
      { text: '技术文档', link: '/zh-hans/tech/', activeMatch: '/zh-hans/tech/' },
      { text: '用户案例', link: '/zh-hans/cases/', activeMatch: '/zh-hans/cases/' },
      { text: '社区', link: '/zh-hans/community/', activeMatch: '/zh-hans/community/' },
      { text: '下载', link: '/zh-hans/downloads/', activeMatch: '/zh-hans/downloads/' },
      { text: '关于我们', link: '/zh-hans/about/', activeMatch: '/zh-hans/about/' },
      { text: '更新日志', link: '/zh-hans/changelog/', activeMatch: '/zh-hans/changelog/' },
    ],
    sidebar: {
      '/zh-hans/tutorials/': [
        {
          text: '快速开始',
          items: [
            { text: '常见问题 FAQ', link: '/zh-hans/tutorials/faq' },
            { text: 'ROS 入门', link: '/zh-hans/tutorials/ros-intro' },
            { text: '快速开始', link: '/zh-hans/tutorials/getting-started' },
            { text: '硬件设置', link: '/zh-hans/tutorials/hardware-setup' },
            { text: '软件配置', link: '/zh-hans/tutorials/software-config' },
            { text: '飞书文档', link: '/zh-hans/tutorials/lark-wiki' },
          ],
        },
        {
          text: '学习资源',
          items: [
            { text: '学习资源首页', link: '/zh-hans/tutorials/learning-resources/' },
            { text: '快速开始', link: '/zh-hans/tutorials/learning-resources/getting-started' },
            { text: '硬件设置', link: '/zh-hans/tutorials/learning-resources/hardware-setup' },
            { text: '软件配置', link: '/zh-hans/tutorials/learning-resources/software-config' },
            { text: 'Jetson Orin PyTorch 兼容性', link: '/zh-hans/tutorials/learning-resources/jetson-orin-pytorch-compatibility' },
          ],
        },
        {
          text: '机械臂',
          items: [
            { text: '机械臂总览', link: '/zh-hans/tutorials/robot-arms/' },
                { text: '选型指南', link: '/zh-hans/tutorials/robot-arms/select-guide' },
            {
              text: 'SO-ARM101 系列',
              collapsed: false,
              items: [
                { text: 'SO-ARM101 使用教程', link: '/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                { text: 'SO-ARM101 组装教程', link: '/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                { text: 'SO-ARM101 Jetson Orin PyTorch 兼容性', link: '/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                { text: '臂载支架与环境相机套件安装', link: '/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                { text: '顶置摄像头安装', link: '/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: '界面控制教程', link: '/zh-hans/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: '官方示例运行教程', link: '/zh-hans/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'TTL 调试教程', link: '/zh-hans/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
              ],
            },
            {
              text: 'Lekiwi',
              collapsed: true,
              items: [
                { text: 'Lekiwi 使用教程', link: '/zh-hans/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial' },
                { text: 'Lekiwi 组装教程', link: '/zh-hans/tutorials/robot-arms/lekiwi/Lekiwi-Assembly' },
              ],
            },
          ],
        },
        {
          text: '配件',
          items: [
            { text: '配件总览', link: '/zh-hans/tutorials/accessories/' },
            {
              text: 'KWS 语音识别模块',
              collapsed: true,
              items: [
                { text: '系列教程首页', link: '/zh-hans/tutorials/accessories/KWS-speech-recognition-module/' },
                { text: 'Jetson Nano 串口通信', link: '/zh-hans/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                { text: 'Jetson 串口通信', link: '/zh-hans/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                { text: 'PC 串口通信', link: '/zh-hans/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                { text: '树莓派串口通信', link: '/zh-hans/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' },
                { text: 'ROS2 rviz2 可视化', link: '/zh-hans/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                { text: '中英文识别词固件下载与烧录', link: '/zh-hans/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
              ],
            },
            {
              text: 'Feetech 舵机',
              collapsed: true,
              items: [
                { text: 'STS3215 & SCS0009 调试教程', link: '/zh-hans/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial' },
                { text: 'SCS 通信协议', link: '/zh-hans/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol' },
                { text: '磁编码 STS 舵机内存表解析', link: '/zh-hans/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis' },
                { text: '电位器 SCSCL 舵机内存表解析', link: '/zh-hans/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis' },
              ],
            },
            {
              text: '其他配件',
              collapsed: true,
              items: [
                { text: 'USB 自动对焦摄像头', link: '/zh-hans/tutorials/accessories/usb-auto-focus-camera' },
                { text: 'Jetson CSI 摄像头', link: '/zh-hans/tutorials/accessories/jetson-csi-camera' },
                { text: '2 自由度相机云台', link: '/zh-hans/tutorials/accessories/2dof-camera-gimbal' },
                { text: '心率血氧传感器', link: '/zh-hans/tutorials/accessories/heart-rate-spo2' },
                { text: '0.91 寸 OLED 屏幕', link: '/zh-hans/tutorials/accessories/0.91-oled-screen-tutorial' },
                { text: '4K HDMI 采集器', link: '/zh-hans/tutorials/accessories/4k-hdmi-capture-tutorial' },
                { text: 'KVM 切换器', link: '/zh-hans/tutorials/accessories/kvm-switch-tutorial' },
                { text: 'USB 免驱声卡', link: '/zh-hans/tutorials/accessories/usb-audio-card-tutorial' },
              ],
            },
          ],
        },
        {
          text: '传感器',
          items: [
            { text: '传感器总览', link: '/zh-hans/tutorials/sensors/' },
            {
              text: 'IMU 惯性导航模块',
              collapsed: true,
              items: [
                { text: '产品信息', link: '/zh-hans/tutorials/sensors/imu/product-info' },
                {
                  text: '多板卡示例',
                  items: [
                    { text: '多主控通信案例概览', link: '/zh-hans/tutorials/sensors/imu/multi-board-examples/overview' },
                    { text: 'PC 通信', link: '/zh-hans/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                    {
                      text: 'I2C 通信',
                      items: [
                        { text: 'Arduino', link: '/zh-hans/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                        { text: 'Jetson', link: '/zh-hans/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                        { text: '树莓派', link: '/zh-hans/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' },
                        { text: 'RDK', link: '/zh-hans/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                        { text: 'STM32', link: '/zh-hans/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                      ],
                    },
                    {
                      text: '串口通信',
                      items: [
                        { text: 'Arduino', link: '/zh-hans/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                        { text: 'Jetson', link: '/zh-hans/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                        { text: '树莓派', link: '/zh-hans/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' },
                        { text: 'RDK', link: '/zh-hans/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                        { text: 'STM32', link: '/zh-hans/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                      ],
                    },
                  ],
                },
                {
                  text: 'ROS 示例',
                  items: [
                    { text: 'ROS1 应用', link: '/zh-hans/tutorials/sensors/imu/ros-examples/ros1' },
                    { text: 'ROS2 应用', link: '/zh-hans/tutorials/sensors/imu/ros-examples/ros2' },
                  ],
                },
              ],
            },
          ],
        },
      ],
      '/zh-hans/topics/': [
        { text: '技术专题', items: [{ text: '专题首页', link: '/zh-hans/topics/' }, { text: 'JetPack 刷机与系统配置', link: '/zh-hans/topics/jetpack-setup' }, { text: '边缘 AI 部署入门', link: '/zh-hans/topics/edge-ai-intro' }, { text: '具身智能入门（LeRobot）', link: '/zh-hans/topics/embodied-ai-intro' }, { text: '机器人学习', link: '/zh-hans/topics/robot-learning/' }, { text: '开源硬件理念', link: '/zh-hans/topics/open-source-hardware' }] },
      ],
      '/zh-hans/tech/': [
        { text: '技术文档', items: [{ text: '技术文档首页', link: '/zh-hans/tech/' }, { text: 'API 参考', link: '/zh-hans/tech/api-reference' }, { text: '开发指南', link: '/zh-hans/tech/dev-guide' }] },
      ],
      '/zh-hans/cases/': [
        { text: '用户案例', items: [{ text: '案例首页', link: '/zh-hans/cases/' }] },
      ],
      '/zh-hans/community/': [
        { text: '社区', items: [{ text: '社区首页', link: '/zh-hans/community/' }, { text: '贡献指南', link: '/zh-hans/community/contributing' }] },
      ],
      '/zh-hans/products/': [
        { text: '产品', items: [
          { text: 'Jetson Orin NX Super 开发套件', link: '/zh-hans/products/jetson-orin-nx-super-kit' },
          { text: '3D RealSense 深度相机', link: '/zh-hans/products/realsense-depth-camera' },
          { text: '总线舵机驱动板', link: '/zh-hans/products/servo-driver-board' },
          { text: 'GPS & 北斗 GNSS 定位模块', link: '/zh-hans/products/gps-beidou-module' },
          { text: 'ESP32-S3 WiFi 视频模块', link: '/zh-hans/products/esp32-s3-wifi-module' },
          { text: 'SO-ARM101 TPU 柔性夹爪', link: '/zh-hans/products/tpu-flexible-gripper' },
          { text: 'SO-ARM101 机械臂视觉套件', link: '/zh-hans/products/robot-vision-kit' },
          { text: 'SO-ARM101 开发套件', link: '/zh-hans/products/so-arm101' },
          { text: 'AmazingHand 开源灵巧手', link: '/zh-hans/products/amazinghand' },
          { text: 'Lekiwi 具身智能移动机器人', link: '/zh-hans/products/lekiwi' },
          { text: '2 自由度舵机云台', link: '/zh-hans/products/2dof-gimbal' },
          { text: 'KWS 语音交互模块', link: '/zh-hans/products/kws-voice-module' },
          { text: 'IMU 高精度惯导模块', link: '/zh-hans/products/imu-module' },
          { text: '79\u00b0 IMX219 CSI 摄像头', link: '/zh-hans/products/imx219-csi-camera' },
          { text: 'Feetech 总线舵机', link: '/zh-hans/products/feetech-servo' },
          { text: '4 合 1 KVM 切换器', link: '/zh-hans/products/kvm-switch' },
          { text: 'USB 免驱声卡', link: '/zh-hans/products/usb-sound-card' },
          { text: '4K HDMI 采集卡', link: '/zh-hans/products/4k-hdmi-capture' },
          { text: 'SO-ARM101 顶置相机支架', link: '/zh-hans/products/overhead-camera-mount' },
        ] },
      ],
      '/zh-hans/downloads/': [
        { text: '下载', items: [{ text: '下载中心', link: '/zh-hans/downloads/' }] },
      ],
      '/zh-hans/about/': [
        { text: '关于', items: [{ text: '关于我们', link: '/zh-hans/about/' }] },
      ],
      '/zh-hans/changelog/': [
        { text: '更新', items: [{ text: '更新日志', link: '/zh-hans/changelog/' }] },
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
      { text: 'Tutorials', link: '/tutorials/', activeMatch: '/tutorials/' },
      { text: 'Topics', link: '/topics/', activeMatch: '/topics/' },
      { text: 'Tech Docs', link: '/tech/', activeMatch: '/tech/' },
      { text: 'Cases', link: '/cases/', activeMatch: '/cases/' },
      { text: 'Community', link: '/community/', activeMatch: '/community/' },
      { text: 'Downloads', link: '/downloads/', activeMatch: '/downloads/' },
      { text: 'About', link: '/about/', activeMatch: '/about/' },
      { text: 'Changelog', link: '/changelog/', activeMatch: '/changelog/' },
    ],
    sidebar: {
      '/tutorials/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'FAQ', link: '/tutorials/faq' },
            { text: 'ROS Intro', link: '/tutorials/ros-intro' },
            { text: 'Getting Started', link: '/tutorials/getting-started' },
            { text: 'Hardware Setup', link: '/tutorials/hardware-setup' },
            { text: 'Software Config', link: '/tutorials/software-config' },
            { text: 'Lark Docs', link: '/tutorials/lark-wiki' },
          ],
        },
        {
          text: 'Learning Resources',
          items: [
            { text: 'Learning Resources Home', link: '/tutorials/learning-resources/' },
            { text: 'Getting Started', link: '/tutorials/learning-resources/getting-started' },
            { text: 'Hardware Setup', link: '/tutorials/learning-resources/hardware-setup' },
            { text: 'Software Config', link: '/tutorials/learning-resources/software-config' },
            { text: 'Jetson Orin PyTorch Compatibility', link: '/tutorials/learning-resources/jetson-orin-pytorch-compatibility' },
          ],
        },
        {
          text: 'Robot Arms',
          items: [
            { text: 'Robot Arms Overview', link: '/tutorials/robot-arms/' },
                { text: 'Selection Guide', link: '/tutorials/robot-arms/select-guide' },
            {
              text: 'SO-ARM101 Series',
              collapsed: false,
              items: [
                { text: 'SO-ARM101 Tutorial', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                { text: 'SO-ARM101 Assembly', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                { text: 'SO-ARM101 Jetson Orin PyTorch Compatibility', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                { text: 'Arm Mount & Camera Kit Installation', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                { text: 'Overhead Camera Mount Installation', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: 'Interface Control Tutorial', link: '/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: 'Official Example Tutorial', link: '/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'TTL Debugging Tutorial', link: '/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
              ],
            },
            {
              text: 'Lekiwi',
              collapsed: true,
              items: [
                { text: 'Lekiwi Tutorial', link: '/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial' },
                { text: 'Lekiwi Assembly', link: '/tutorials/robot-arms/lekiwi/Lekiwi-Assembly' },
              ],
            },
          ],
        },
        {
          text: 'Accessories',
          items: [
            { text: 'Accessories Overview', link: '/tutorials/accessories/' },
            {
              text: 'KWS Speech Recognition Module',
              collapsed: true,
              items: [
                { text: 'Series Home', link: '/tutorials/accessories/KWS-speech-recognition-module/' },
                { text: 'Jetson Nano Serial Communication', link: '/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                { text: 'Jetson Serial Communication', link: '/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                { text: 'PC Serial Communication', link: '/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                { text: 'Raspberry Pi Serial Communication', link: '/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' },
                { text: 'ROS2 rviz2 Visualization', link: '/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                { text: 'Firmware Download & Burn', link: '/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
              ],
            },
            {
              text: 'Feetech Servos',
              collapsed: true,
              items: [
                { text: 'STS3215 & SCS0009 Tutorial', link: '/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial' },
                { text: 'SCS Communication Protocol', link: '/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol' },
                { text: 'Magnetic Encoder STS Servo Memory Table', link: '/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis' },
                { text: 'Potentiometer SCSCL Servo Memory Table', link: '/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis' },
              ],
            },
            {
              text: 'Other Accessories',
              collapsed: true,
              items: [
                { text: 'USB Auto-Focus Camera', link: '/tutorials/accessories/usb-auto-focus-camera' },
                { text: 'Jetson CSI Camera', link: '/tutorials/accessories/jetson-csi-camera' },
                { text: '2-DOF Camera Gimbal', link: '/tutorials/accessories/2dof-camera-gimbal' },
                { text: 'Heart Rate & SpO2 Sensor', link: '/tutorials/accessories/heart-rate-spo2' },
                { text: '0.91" OLED Screen', link: '/tutorials/accessories/0.91-oled-screen-tutorial' },
                { text: '4K HDMI Capture', link: '/tutorials/accessories/4k-hdmi-capture-tutorial' },
                { text: 'KVM Switch', link: '/tutorials/accessories/kvm-switch-tutorial' },
                { text: 'USB Driver-Free Sound Card', link: '/tutorials/accessories/usb-audio-card-tutorial' },
              ],
            },
          ],
        },
        {
          text: 'Sensors',
          items: [
            { text: 'Sensors Overview', link: '/tutorials/sensors/' },
            {
              text: 'IMU Inertial Module',
              collapsed: true,
              items: [
                { text: 'Product Info', link: '/tutorials/sensors/imu/product-info' },
                {
                  text: 'Multi-Board Examples',
                  items: [
                    { text: 'Overview', link: '/tutorials/sensors/imu/multi-board-examples/overview' },
                    { text: 'PC Communication', link: '/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                    {
                      text: 'I2C Communication',
                      items: [
                        { text: 'Arduino', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                        { text: 'Jetson', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                        { text: 'Raspberry Pi', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' },
                        { text: 'RDK', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                        { text: 'STM32', link: '/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                      ],
                    },
                    {
                      text: 'Serial Communication',
                      items: [
                        { text: 'Arduino', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                        { text: 'Jetson', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                        { text: 'Raspberry Pi', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' },
                        { text: 'RDK', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                        { text: 'STM32', link: '/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                      ],
                    },
                  ],
                },
                {
                  text: 'ROS Examples',
                  items: [
                    { text: 'ROS1', link: '/tutorials/sensors/imu/ros-examples/ros1' },
                    { text: 'ROS2', link: '/tutorials/sensors/imu/ros-examples/ros2' },
                  ],
                },
              ],
            },
          ],
        },
      ],
      '/topics/': [
        { text: 'Topics', items: [{ text: 'Topics Home', link: '/topics/' }, { text: 'JetPack Flashing & Setup', link: '/topics/jetpack-setup' }, { text: 'Edge AI Deployment Intro', link: '/topics/edge-ai-intro' }, { text: 'Embodied AI Intro (LeRobot)', link: '/topics/embodied-ai-intro' }, { text: 'Robot Learning', link: '/topics/robot-learning/' }, { text: 'Open-Source Hardware Philosophy', link: '/topics/open-source-hardware' }] },
      ],
      '/tech/': [
        { text: 'Tech Docs', items: [{ text: 'Tech Docs Home', link: '/tech/' }, { text: 'API Reference', link: '/tech/api-reference' }, { text: 'Developer Guide', link: '/tech/dev-guide' }] },
      ],
      '/cases/': [
        { text: 'Cases', items: [{ text: 'Cases Home', link: '/cases/' }] },
      ],
      '/community/': [
        { text: 'Community', items: [{ text: 'Community Home', link: '/community/' }, { text: 'Contributing Guide', link: '/community/contributing' }] },
      ],
      '/products/': [
        { text: 'Products', items: [
          { text: 'Jetson Orin NX Super Dev Kit', link: '/products/jetson-orin-nx-super-kit' },
          { text: '3D RealSense Depth Camera', link: '/products/realsense-depth-camera' },
          { text: 'Bus Servo Driver Board', link: '/products/servo-driver-board' },
          { text: 'GPS & BeiDou GNSS Module', link: '/products/gps-beidou-module' },
          { text: 'ESP32-S3 WiFi Video Module', link: '/products/esp32-s3-wifi-module' },
          { text: 'SO-ARM101 TPU Flexible Gripper', link: '/products/tpu-flexible-gripper' },
          { text: 'SO-ARM101 Robot Vision Kit', link: '/products/robot-vision-kit' },
          { text: 'SO-ARM101 Developer Kit', link: '/products/so-arm101' },
          { text: 'AmazingHand Dexterous Hand', link: '/products/amazinghand' },
          { text: 'Lekiwi Mobile Robot', link: '/products/lekiwi' },
          { text: '2-DOF Servo Pan-Tilt Unit', link: '/products/2dof-gimbal' },
          { text: 'KWS Voice Module', link: '/products/kws-voice-module' },
          { text: 'IMU Module', link: '/products/imu-module' },
          { text: '79\u00b0 IMX219 CSI Camera', link: '/products/imx219-csi-camera' },
          { text: 'Feetech Bus Servos', link: '/products/feetech-servo' },
          { text: '4-in-1 KVM Switch', link: '/products/kvm-switch' },
          { text: 'USB Sound Card', link: '/products/usb-sound-card' },
          { text: '4K HDMI Capture', link: '/products/4k-hdmi-capture' },
          { text: 'Overhead Camera Mount', link: '/products/overhead-camera-mount' },
        ] },
      ],
      '/downloads/': [
        { text: 'Downloads', items: [{ text: 'Download Center', link: '/downloads/' }] },
      ],
      '/about/': [
        { text: 'About', items: [{ text: 'About Us', link: '/about/' }] },
      ],
      '/changelog/': [
        { text: 'Updates', items: [{ text: 'Changelog', link: '/changelog/' }] },
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
      { text: '教程', link: '/zh-hant/tutorials/', activeMatch: '/zh-hant/tutorials/' },
      { text: '技術專題', link: '/zh-hant/topics/', activeMatch: '/zh-hant/topics/' },
      { text: '技術文檔', link: '/zh-hant/tech/', activeMatch: '/zh-hant/tech/' },
      { text: '用戶案例', link: '/zh-hant/cases/', activeMatch: '/zh-hant/cases/' },
      { text: '社區', link: '/zh-hant/community/', activeMatch: '/zh-hant/community/' },
      { text: '下載', link: '/zh-hant/downloads/', activeMatch: '/zh-hant/downloads/' },
      { text: '關於我們', link: '/zh-hant/about/', activeMatch: '/zh-hant/about/' },
      { text: '更新日誌', link: '/zh-hant/changelog/', activeMatch: '/zh-hant/changelog/' },
    ],
    sidebar: {
      '/zh-hant/tutorials/': [
        {
          text: '快速開始',
          items: [
            { text: '常見問題 FAQ', link: '/zh-hant/tutorials/faq' },
            { text: 'ROS 入門', link: '/zh-hant/tutorials/ros-intro' },
            { text: '快速開始', link: '/zh-hant/tutorials/getting-started' },
            { text: '硬件設置', link: '/zh-hant/tutorials/hardware-setup' },
            { text: '軟件配置', link: '/zh-hant/tutorials/software-config' },
            { text: '飛書文檔', link: '/zh-hant/tutorials/lark-wiki' },
          ],
        },
        {
          text: '學習資源',
          items: [
            { text: '學習資源首頁', link: '/zh-hant/tutorials/learning-resources/' },
            { text: '快速開始', link: '/zh-hant/tutorials/learning-resources/getting-started' },
            { text: '硬件設置', link: '/zh-hant/tutorials/learning-resources/hardware-setup' },
            { text: '軟件配置', link: '/zh-hant/tutorials/learning-resources/software-config' },
            { text: 'Jetson Orin PyTorch 相容性', link: '/zh-hant/tutorials/learning-resources/jetson-orin-pytorch-compatibility' },
          ],
        },
        {
          text: '機械臂',
          items: [
            { text: '機械臂總覽', link: '/zh-hant/tutorials/robot-arms/' },
                { text: '選型指南', link: '/zh-hant/tutorials/robot-arms/select-guide' },
            {
              text: 'SO-ARM101 系列',
              collapsed: false,
              items: [
                { text: 'SO-ARM101 使用教程', link: '/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                { text: 'SO-ARM101 組裝教程', link: '/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                { text: 'SO-ARM101 Jetson Orin PyTorch 相容性', link: '/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                { text: '臂載支架與環境相機套件安裝', link: '/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                { text: '頂置攝像頭安裝', link: '/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: '界面控制教程', link: '/zh-hant/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: '官方示例運行教程', link: '/zh-hant/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'TTL 調試教程', link: '/zh-hant/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
              ],
            },
            {
              text: 'Lekiwi',
              collapsed: true,
              items: [
                { text: 'Lekiwi 使用教程', link: '/zh-hant/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial' },
                { text: 'Lekiwi 組裝教程', link: '/zh-hant/tutorials/robot-arms/lekiwi/Lekiwi-Assembly' },
              ],
            },
          ],
        },
        {
          text: '配件',
          items: [
            { text: '配件總覽', link: '/zh-hant/tutorials/accessories/' },
            {
              text: 'KWS 語音識別模組',
              collapsed: true,
              items: [
                { text: '系列教程首頁', link: '/zh-hant/tutorials/accessories/KWS-speech-recognition-module/' },
                { text: 'Jetson Nano 串口通信', link: '/zh-hant/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                { text: 'Jetson 串口通信', link: '/zh-hant/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                { text: 'PC 串口通信', link: '/zh-hant/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                { text: '樹莓派串口通信', link: '/zh-hant/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' },
                { text: 'ROS2 rviz2 可視化', link: '/zh-hant/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                { text: '中英文識別詞固件下載與燒錄', link: '/zh-hant/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
              ],
            },
            {
              text: 'Feetech 舵機',
              collapsed: true,
              items: [
                { text: 'STS3215 & SCS0009 調試教程', link: '/zh-hant/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial' },
                { text: 'SCS 通信協議', link: '/zh-hant/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol' },
                { text: '磁編碼 STS 舵機內存表解析', link: '/zh-hant/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis' },
                { text: '電位器 SCSCL 舵機內存表解析', link: '/zh-hant/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis' },
              ],
            },
            {
              text: '其他配件',
              collapsed: true,
              items: [
                { text: 'USB 自動對焦攝像頭', link: '/zh-hant/tutorials/accessories/usb-auto-focus-camera' },
                { text: 'Jetson CSI 攝像頭', link: '/zh-hant/tutorials/accessories/jetson-csi-camera' },
                { text: '2 自由度相機雲台', link: '/zh-hant/tutorials/accessories/2dof-camera-gimbal' },
                { text: '心率血氧傳感器', link: '/zh-hant/tutorials/accessories/heart-rate-spo2' },
                { text: '0.91 吋 OLED 屏幕', link: '/zh-hant/tutorials/accessories/0.91-oled-screen-tutorial' },
                { text: '4K HDMI 採集器', link: '/zh-hant/tutorials/accessories/4k-hdmi-capture-tutorial' },
                { text: 'KVM 切換器', link: '/zh-hant/tutorials/accessories/kvm-switch-tutorial' },
                { text: 'USB 免驅聲卡', link: '/zh-hant/tutorials/accessories/usb-audio-card-tutorial' },
              ],
            },
          ],
        },
        {
          text: '傳感器',
          items: [
            { text: '傳感器總覽', link: '/zh-hant/tutorials/sensors/' },
            {
              text: 'IMU 慣性導航模組',
              collapsed: true,
              items: [
                { text: '產品資料', link: '/zh-hant/tutorials/sensors/imu/product-info' },
                {
                  text: '多板卡示例',
                  items: [
                    { text: '多主控通信案例概覽', link: '/zh-hant/tutorials/sensors/imu/multi-board-examples/overview' },
                    { text: 'PC 通信', link: '/zh-hant/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                    {
                      text: 'I2C 通信',
                      items: [
                        { text: 'Arduino', link: '/zh-hant/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                        { text: 'Jetson', link: '/zh-hant/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                        { text: '樹莓派', link: '/zh-hant/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' },
                        { text: 'RDK', link: '/zh-hant/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                        { text: 'STM32', link: '/zh-hant/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                      ],
                    },
                    {
                      text: '串口通信',
                      items: [
                        { text: 'Arduino', link: '/zh-hant/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                        { text: 'Jetson', link: '/zh-hant/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                        { text: '樹莓派', link: '/zh-hant/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' },
                        { text: 'RDK', link: '/zh-hant/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                        { text: 'STM32', link: '/zh-hant/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                      ],
                    },
                  ],
                },
                {
                  text: 'ROS 示例',
                  items: [
                    { text: 'ROS1 應用', link: '/zh-hant/tutorials/sensors/imu/ros-examples/ros1' },
                    { text: 'ROS2 應用', link: '/zh-hant/tutorials/sensors/imu/ros-examples/ros2' },
                  ],
                },
              ],
            },
          ],
        },
      ],
      '/zh-hant/topics/': [
        { text: '技術專題', items: [{ text: '專題首頁', link: '/zh-hant/topics/' }, { text: 'JetPack 刷機與系統配置', link: '/zh-hant/topics/jetpack-setup' }, { text: '邊緣 AI 部署入門', link: '/zh-hant/topics/edge-ai-intro' }, { text: '具身智能入門（LeRobot）', link: '/zh-hant/topics/embodied-ai-intro' }, { text: '機器人學習', link: '/zh-hant/topics/robot-learning/' }, { text: '開源硬件理念', link: '/zh-hant/topics/open-source-hardware' }] },
      ],
      '/zh-hant/tech/': [
        { text: '技術文檔', items: [{ text: '技術文檔首頁', link: '/zh-hant/tech/' }, { text: 'API 參考', link: '/zh-hant/tech/api-reference' }, { text: '開發指南', link: '/zh-hant/tech/dev-guide' }] },
      ],
      '/zh-hant/cases/': [
        { text: '用戶案例', items: [{ text: '案例首頁', link: '/zh-hant/cases/' }] },
      ],
      '/zh-hant/community/': [
        { text: '社區', items: [{ text: '社區首頁', link: '/zh-hant/community/' }, { text: '貢獻指南', link: '/zh-hant/community/contributing' }] },
      ],
      '/zh-hant/products/': [
        { text: '產品', items: [
          { text: 'Jetson Orin NX Super 開發套件', link: '/zh-hant/products/jetson-orin-nx-super-kit' },
          { text: '3D RealSense 深度相機', link: '/zh-hant/products/realsense-depth-camera' },
          { text: '總線舵機驅動板', link: '/zh-hant/products/servo-driver-board' },
          { text: 'GPS & 北斗 GNSS 定位模組', link: '/zh-hant/products/gps-beidou-module' },
          { text: 'ESP32-S3 WiFi 視頻模組', link: '/zh-hant/products/esp32-s3-wifi-module' },
          { text: 'SO-ARM101 TPU 柔性夾爪', link: '/zh-hant/products/tpu-flexible-gripper' },
          { text: 'SO-ARM101 機械臂視覺套件', link: '/zh-hant/products/robot-vision-kit' },
          { text: 'SO-ARM101 開發套件', link: '/zh-hant/products/so-arm101' },
          { text: 'AmazingHand 開源靈巧手', link: '/zh-hant/products/amazinghand' },
          { text: 'Lekiwi 具身智能移動機器人', link: '/zh-hant/products/lekiwi' },
          { text: '2 自由度舵機雲台', link: '/zh-hant/products/2dof-gimbal' },
          { text: 'KWS 語音交互模組', link: '/zh-hant/products/kws-voice-module' },
          { text: 'IMU 高精度慣導模組', link: '/zh-hant/products/imu-module' },
          { text: '79\u00b0 IMX219 CSI 攝像頭', link: '/zh-hant/products/imx219-csi-camera' },
          { text: 'Feetech 總線舵機', link: '/zh-hant/products/feetech-servo' },
          { text: '4 合 1 KVM 切換器', link: '/zh-hant/products/kvm-switch' },
          { text: 'USB 免驅聲卡', link: '/zh-hant/products/usb-sound-card' },
          { text: '4K HDMI 採集卡', link: '/zh-hant/products/4k-hdmi-capture' },
          { text: 'SO-ARM101 頂置相機支架', link: '/zh-hant/products/overhead-camera-mount' },
        ] },
      ],
      '/zh-hant/downloads/': [
        { text: '下載', items: [{ text: '下載中心', link: '/zh-hant/downloads/' }] },
      ],
      '/zh-hant/about/': [
        { text: '關於', items: [{ text: '關於我們', link: '/zh-hant/about/' }] },
      ],
      '/zh-hant/changelog/': [
        { text: '更新', items: [{ text: '更新日誌', link: '/zh-hant/changelog/' }] },
      ],
    },
  },
}



// ---- 上一篇/下一篇:从各语言 sidebar 链接序列计算相邻页 ----
function collectSidebarLinks(sidebar) {
  const out = []
  const walk = (items) => {
    if (!Array.isArray(items)) return
    for (const sub of items) {
      if (sub && sub.link) out.push(sub.link.replace(/\/$/g, ''))
      if (sub && sub.items) walk(sub.items)
    }
  }
  if (!sidebar) return out
  for (const group of Object.values(sidebar)) {
    walk(group)
  }
  return out
}

const LANG_PREFIX_RE = /^\/(zh-hans|zh-hant|ja|ko|de|fr|es|it)(?=\/|$)/
function resolveLangPrefix(relativePath) {
  const seg = relativePath.split('/')[0]
  return LANG_PREFIX_RE.test('/' + seg) ? '/' + seg : ''
}

function computePrevNext(userConfig, pageData) {
  const prefix = resolveLangPrefix(pageData.relativePath)
  const locales = userConfig && userConfig.locales
  const langKey = prefix ? prefix.slice(1) : 'root'
  const localeCfg = locales && (locales[langKey] || (langKey === 'root' && locales.root))
  const sidebar = localeCfg && localeCfg.themeConfig && localeCfg.themeConfig.sidebar
  if (!sidebar) return
  const links = collectSidebarLinks(sidebar)
  const target = ('/' + pageData.relativePath.replace(/\.md$/, '').replace(/index$/, '')).replace(/\/$/, '')
  const i = links.indexOf(target)
  if (i < 0) return undefined
  return {
    prevNext: {
      prev: i > 0 ? links[i - 1] : undefined,
      next: i < links.length - 1 ? links[i + 1] : undefined,
    },
  }
}

// ---- hreflang:注入 9 语言 alternate + x-default(多语 SEO 必备)----
const HREFLANG_LANGS = ['', 'zh-hans', 'zh-hant', 'ja', 'ko', 'de', 'fr', 'es', 'it']
function injectHreflang(pageData) {
  const u = pageData.url || '/'
  const seg = u.split('/')[1]
  const hasLang = HREFLANG_LANGS.includes(seg)
  const core = hasLang ? '/' + u.split('/').slice(2).join('/') : u
  const seen = new Set()
  const heads = HREFLANG_LANGS.map((l) => {
    const href = 'https://wiki.juxitech.com' + (l ? '/' + l : '') + core
    const langCode = l === '' ? 'en' : (l === 'zh-hans' ? 'zh-Hans' : l === 'zh-hant' ? 'zh-HK' : l)
    return ['link', { rel: 'alternate', hreflang: langCode, href: href }]
  }).concat([['link', { rel: 'alternate', hreflang: 'x-default', href: 'https://wiki.juxitech.com' + core }]])
  return heads
}

export default defineConfig({
  srcDir: 'content',
  vite: {
    publicDir: 'public',
  },
  lang: 'zh-CN',
  title: '钜犀科技 Wiki',
  description: '钜犀科技产品教程与文档中心',
  base: '/',
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
    // 冗余的 so-arm101-tutorial 副本(与 canonical 内容发散,暂不发布)
    'tutorials/so-arm101-tutorial.md',
    'en/tutorials/so-arm101-tutorial.md',
    'en/tutorials/robot-arms/so-arm101-tutorial.md',
    'zh-HK/tutorials/so-arm101-tutorial.md',
  ],
  head: globalHead,
  locales: {
    root: en,
    'zh-hans': zhCN,
    'zh-hant': zhHK,

  ja: {
    label: '日本語',
    lang: 'ja',
    description: 'Juxi Technology 製品チュートリアルとドキュメントセンター',
    head: [
      ['meta', { property: 'og:title', content: 'Juxi Technology Wiki - 製品チュートリアルとドキュメント' }],
      ['meta', { property: 'og:description', content: 'Juxi Technology Wiki — ロボットアーム、センサー、アクセサリーの包括的なチュートリアルと技術ドキュメント。SO-ARM101 から IMU モジュールまで。' }],
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      nav: [
        { text: 'チュートリアル', link: '/ja/tutorials/', activeMatch: '/ja/tutorials/' },
        { text: 'トピック', link: '/ja/topics/', activeMatch: '/ja/topics/' },
        { text: '技術ドキュメント', link: '/ja/tech/', activeMatch: '/ja/tech/' },
        { text: 'ダウンロード', link: '/ja/downloads/', activeMatch: '/ja/downloads/' },
        { text: '製品', link: '/ja/products/', activeMatch: '/ja/products/' },
        { text: 'コミュニティ', link: '/ja/community/', activeMatch: '/ja/community/' },
        { text: '会社概要', link: '/ja/about/', activeMatch: '/ja/about/' },
      ],
      sidebar: {
        '/ja/tutorials/': [
          { text: 'クイックスタート', items: [
            { text: 'FAQ', link: '/ja/tutorials/faq' },
            { text: 'クイックスタート', link: '/ja/tutorials/getting-started' },
            { text: 'ハードウェア接続', link: '/ja/tutorials/hardware-setup' },
            { text: 'ソフトウェア設定', link: '/ja/tutorials/software-config' },
            { text: 'ROS 入門', link: '/ja/tutorials/ros-intro' },
          ] },
          { text: 'ロボットアーム', items: [
            { text: '選定ガイド', link: '/ja/tutorials/robot-arms/select-guide' },
          ] },
          { text: 'センサー', items: [
            { text: 'IMU キャリブレーション', link: '/ja/tutorials/sensors/imu/calibration' },
            {
              text: 'IMU 慣性ナビゲーション',
              collapsed: true,
              items: [
                { text: '製品情報', link: '/ja/tutorials/sensors/imu/product-info' },
                {
                  text: 'マルチボード例',
                  items: [
                    { text: 'マルチホスト通信ケース概要', link: '/ja/tutorials/sensors/imu/multi-board-examples/overview' },
                    { text: 'PC 通信', link: '/ja/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                    {
                      text: 'I2C 通信',
                      items: [
                        { text: 'Arduino', link: '/ja/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                        { text: 'Jetson', link: '/ja/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                        { text: 'ラズベリーパイ', link: '/ja/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' },
                        { text: 'RDK', link: '/ja/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                        { text: 'STM32', link: '/ja/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                      ],
                    },
                    {
                      text: 'シリアル通信',
                      items: [
                        { text: 'Arduino', link: '/ja/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                        { text: 'Jetson', link: '/ja/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                        { text: 'ラズベリーパイ', link: '/ja/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' },
                        { text: 'RDK', link: '/ja/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                        { text: 'STM32', link: '/ja/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                      ],
                    },
                  ],
                },
                {
                  text: 'ROS サンプル',
                  items: [
                    { text: 'ROS1 応用', link: '/ja/tutorials/sensors/imu/ros-examples/ros1' },
                    { text: 'ROS2 応用', link: '/ja/tutorials/sensors/imu/ros-examples/ros2' },
                  ],
                },
              ],
            },
          ] },
          { text: 'アクセサリー', items: [
                { text: 'USB オートフォーカスカメラ', link: '/ja/tutorials/accessories/usb-auto-focus-camera' },
                { text: 'Jetson CSI カメラ', link: '/ja/tutorials/accessories/jetson-csi-camera' },
                {
                    text: 'KWS 音声認識モジュール',
                    collapsed: true,
                    items: [
                      { text: 'シリーズチュートリアルホーム', link: '/ja/tutorials/accessories/KWS-speech-recognition-module/' },
                      { text: 'Jetson Nano シリアル通信', link: '/ja/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                      { text: 'Jetson シリアル通信', link: '/ja/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                      { text: 'PC シリアル通信', link: '/ja/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                      { text: 'ラズベリーパイシリアル通信', link: '/ja/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' },
                      { text: 'ROS2 RViz2 可視化', link: '/ja/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                      { text: '中英認識語ファームウェアのダウンロードと書き込み', link: '/ja/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
                    ],
                },
                {
                    text: 'Feetech サーボ',
                    collapsed: true,
                    items: [
                      { text: 'STS3215 & SCS0009 デバッグチュートリアル', link: '/ja/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial' },
                      { text: 'SCS 通信プロトコル', link: '/ja/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol' },
                      { text: '磁気エンコーダ STS サーボ - メモリテーブル解析', link: '/ja/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis' },
                      { text: 'ポテンショメータ SCSCL サーボ - メモリテーブル解析', link: '/ja/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis' },
                    ],
                },
                { text: '2自由度ジンバル', link: '/ja/tutorials/accessories/2dof-camera-gimbal' },
            { text: '心拍・血中酸素センサー', link: '/ja/tutorials/accessories/heart-rate-spo2' },
            { text: '0.91 インチ OLED スクリーン', link: '/ja/tutorials/accessories/0.91-oled-screen-tutorial' },
            { text: '4K HDMI キャプチャカード', link: '/ja/tutorials/accessories/4k-hdmi-capture-tutorial' },
            { text: 'KVMスイッチ', link: '/ja/tutorials/accessories/kvm-switch-tutorial' },
            { text: 'USB ドライバ不要サウンドカード', link: '/ja/tutorials/accessories/usb-audio-card-tutorial' },
          ] },
        ],
        '/ja/topics/': [{ text: 'トピック', items: [{ text: 'トピック', link: '/ja/topics/' }, { text: 'オープンソースハードウェアの理念', link: '/ja/topics/open-source-hardware' }] }],
        '/ja/tech/': [{ text: '技術ドキュメント', items: [{ text: '技術ドキュメント', link: '/ja/tech/' }] }],
        '/ja/community/': [{ text: 'コミュニティ', items: [{ text: 'コミュニティ', link: '/ja/community/' }] }],
        '/ja/products/': [
          { text: '製品', items: [
            { text: 'SO-ARM101 開発キット', link: '/ja/products/so-arm101' },
            { text: 'AmazingHand 器用ハンド', link: '/ja/products/amazinghand' },
            { text: 'Jetson Orin NX Super 開発キット', link: '/ja/products/jetson-orin-nx-super-kit' },
            { text: 'IMU 慣性ナビゲーションモジュール', link: '/ja/products/imu-module' },
            { text: 'バスサーボドライバ基板', link: '/ja/products/servo-driver-board' },
            { text: 'GPS & 北斗 GNSS 測位モジュール', link: '/ja/products/gps-beidou-module' },
            { text: 'ESP32-S3 WiFi 映像モジュール', link: '/ja/products/esp32-s3-wifi-module' },
            { text: 'SO-ARM101 TPU フレキシブルグリッパー', link: '/ja/products/tpu-flexible-gripper' },
            { text: 'SO-ARM101 ロボットビジョンキット', link: '/ja/products/robot-vision-kit' },
            { text: 'Lekiwi 具身知能移動ロボット', link: '/ja/products/lekiwi' },
            { text: '2自由度サーボジンバル', link: '/ja/products/2dof-gimbal' },
            { text: 'KWS 音声対話モジュール', link: '/ja/products/kws-voice-module' },
            { text: '79° IMX219 CSI カメラ', link: '/ja/products/imx219-csi-camera' },
            { text: 'Feetech バスサーボ', link: '/ja/products/feetech-servo' },
            { text: '4 in 1 KVM スイッチ', link: '/ja/products/kvm-switch' },
            { text: 'USB ドライバ不要サウンドカード', link: '/ja/products/usb-sound-card' },
            { text: '4K HDMI キャプチャカード', link: '/ja/products/4k-hdmi-capture' },
            { text: 'SO-ARM101 頭上カメラマウント', link: '/ja/products/overhead-camera-mount' },
            { text: 'バスサーボドライバ基板', link: '/ja/products/servo-driver-board' },
            { text: 'GPS & 北斗 GNSS 測位モジュール', link: '/ja/products/gps-beidou-module' },
            { text: 'ESP32-S3 WiFi 映像モジュール', link: '/ja/products/esp32-s3-wifi-module' },
            { text: 'SO-ARM101 TPU フレキシブルグリッパー', link: '/ja/products/tpu-flexible-gripper' },
            { text: 'SO-ARM101 ロボットビジョンキット', link: '/ja/products/robot-vision-kit' },
            { text: 'Lekiwi 具身知能移動ロボット', link: '/ja/products/lekiwi' },
            { text: '2自由度サーボジンバル', link: '/ja/products/2dof-gimbal' },
            { text: 'KWS 音声対話モジュール', link: '/ja/products/kws-voice-module' },
            { text: '79° IMX219 CSI カメラ', link: '/ja/products/imx219-csi-camera' },
            { text: 'Feetech バスサーボ', link: '/ja/products/feetech-servo' },
            { text: '4 in 1 KVM スイッチ', link: '/ja/products/kvm-switch' },
            { text: 'USB ドライバ不要サウンドカード', link: '/ja/products/usb-sound-card' },
            { text: '4K HDMI キャプチャカード', link: '/ja/products/4k-hdmi-capture' },
            { text: 'SO-ARM101 頭上カメラマウント', link: '/ja/products/overhead-camera-mount' },
            { text: '3D RealSense 深度カメラ', link: '/ja/products/realsense-depth-camera' },
          ] },
        ],
      },
    },
  },
  ko: {
    label: '한국어',
    lang: 'ko',
    description: 'Juxi Technology 제품 튜토리얼 및 문서 센터',
    head: [
      ['meta', { property: 'og:title', content: 'Juxi Technology Wiki - 제품 튜토리얼 및 문서' }],
      ['meta', { property: 'og:description', content: 'Juxi Technology Wiki — 로봇 암, 센서, 액세서리에 대한 포괄적인 튜토리얼과 기술 문서. SO-ARM101부터 IMU 모듈까지.' }],
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      nav: [
        { text: '튜토리얼', link: '/ko/tutorials/', activeMatch: '/ko/tutorials/' },
        { text: '토픽', link: '/ko/topics/', activeMatch: '/ko/topics/' },
        { text: '기술 문서', link: '/ko/tech/', activeMatch: '/ko/tech/' },
        { text: '다운로드', link: '/ko/downloads/', activeMatch: '/ko/downloads/' },
        { text: '제품', link: '/ko/products/', activeMatch: '/ko/products/' },
        { text: '커뮤니티', link: '/ko/community/', activeMatch: '/ko/community/' },
        { text: '회사 소개', link: '/ko/about/', activeMatch: '/ko/about/' },
      ],
      sidebar: {
        '/ko/tutorials/': [
          { text: '빠른 시작', items: [
            { text: 'FAQ', link: '/ko/tutorials/faq' },
            { text: '빠른 시작', link: '/ko/tutorials/getting-started' },
            { text: '하드웨어 연결', link: '/ko/tutorials/hardware-setup' },
            { text: '소프트웨어 설정', link: '/ko/tutorials/software-config' },
            { text: 'ROS 입문', link: '/ko/tutorials/ros-intro' },
          ] },
          { text: '로봇 암', items: [
            { text: '선택 가이드', link: '/ko/tutorials/robot-arms/select-guide' },
          ] },
          { text: '센서', items: [
            { text: 'IMU 캘리브레이션', link: '/ko/tutorials/sensors/imu/calibration' },
            {
              text: 'IMU 관성 내비게이션',
              collapsed: true,
              items: [
                { text: '제품 정보', link: '/ko/tutorials/sensors/imu/product-info' },
                {
                  text: '멀티 보드 예제',
                  items: [
                    { text: '멀티 호스트 통신 케이스 개요', link: '/ko/tutorials/sensors/imu/multi-board-examples/overview' },
                    { text: 'PC 통신', link: '/ko/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                    {
                      text: 'I2C 통신',
                      items: [
                        { text: 'Arduino', link: '/ko/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                        { text: 'Jetson', link: '/ko/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                        { text: '라즈베리파이', link: '/ko/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' },
                        { text: 'RDK', link: '/ko/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                        { text: 'STM32', link: '/ko/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                      ],
                    },
                    {
                      text: '직렬 통신',
                      items: [
                        { text: 'Arduino', link: '/ko/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                        { text: 'Jetson', link: '/ko/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                        { text: '라즈베리파이', link: '/ko/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' },
                        { text: 'RDK', link: '/ko/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                        { text: 'STM32', link: '/ko/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                      ],
                    },
                  ],
                },
                {
                  text: 'ROS 예제',
                  items: [
                    { text: 'ROS1 응용', link: '/ko/tutorials/sensors/imu/ros-examples/ros1' },
                    { text: 'ROS2 응용', link: '/ko/tutorials/sensors/imu/ros-examples/ros2' },
                  ],
                },
              ],
            },
          ] },
          { text: '액세서리', items: [
                { text: 'USB 자동 초점 카메라', link: '/ko/tutorials/accessories/usb-auto-focus-camera' },
                { text: 'Jetson CSI 카메라', link: '/ko/tutorials/accessories/jetson-csi-camera' },
                {
                    text: 'KWS 음성 인식 모듈',
                    collapsed: true,
                    items: [
                      { text: '시리즈 튜토리얼 홈', link: '/ko/tutorials/accessories/KWS-speech-recognition-module/' },
                      { text: 'Jetson Nano 직렬 통신', link: '/ko/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                      { text: 'Jetson 직렬 통신', link: '/ko/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                      { text: 'PC 직렬 통신', link: '/ko/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                      { text: '라즈베리파이 직렬 통신', link: '/ko/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' },
                      { text: 'ROS2 RViz2 시각화', link: '/ko/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                      { text: '중문/영문 인식어 펌웨어 다운로드 및 굽기', link: '/ko/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
                    ],
                },
                {
                    text: 'Feetech 서보',
                    collapsed: true,
                    items: [
                      { text: 'STS3215 & SCS0009 디버깅 튜토리얼', link: '/ko/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial' },
                      { text: 'SCS 통신 프로토콜', link: '/ko/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol' },
                      { text: '자기 엔코더 STS 서보 - 메모리 테이블 분석', link: '/ko/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis' },
                      { text: '전위차계 SCSCL 서보 - 메모리 테이블 분석', link: '/ko/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis' },
                    ],
                },
                { text: '2자유도 짐벌', link: '/ko/tutorials/accessories/2dof-camera-gimbal' },
            { text: '심박·혈중 산소 센서', link: '/ko/tutorials/accessories/heart-rate-spo2' },
            { text: '0.91인치 OLED 화면', link: '/ko/tutorials/accessories/0.91-oled-screen-tutorial' },
            { text: '4K HDMI 캡처 카드', link: '/ko/tutorials/accessories/4k-hdmi-capture-tutorial' },
            { text: 'KVM 스위치', link: '/ko/tutorials/accessories/kvm-switch-tutorial' },
            { text: 'USB 무드라이버 사운드 카드', link: '/ko/tutorials/accessories/usb-audio-card-tutorial' },
          ] },
        ],
        '/ko/topics/': [{ text: '토픽', items: [{ text: '토픽', link: '/ko/topics/' }, { text: '오픈소스 하드웨어 철학', link: '/ko/topics/open-source-hardware' }] }],
        '/ko/tech/': [{ text: '기술 문서', items: [{ text: '기술 문서', link: '/ko/tech/' }] }],
        '/ko/community/': [{ text: '커뮤니티', items: [{ text: '커뮤니티', link: '/ko/community/' }] }],
        '/ko/products/': [
          { text: '제품', items: [
            { text: 'SO-ARM101 개발 키트', link: '/ko/products/so-arm101' },
            { text: 'AmazingHand 로봇 손', link: '/ko/products/amazinghand' },
            { text: 'Jetson Orin NX Super 개발 키트', link: '/ko/products/jetson-orin-nx-super-kit' },
            { text: 'IMU 관성 모듈', link: '/ko/products/imu-module' },
            { text: '버스 서보 드라이버 보드', link: '/ko/products/servo-driver-board' },
            { text: 'GPS & 北斗 GNSS 측위 모듈', link: '/ko/products/gps-beidou-module' },
            { text: 'ESP32-S3 WiFi 영상 모듈', link: '/ko/products/esp32-s3-wifi-module' },
            { text: 'SO-ARM101 TPU 플렉시블 그리퍼', link: '/ko/products/tpu-flexible-gripper' },
            { text: 'SO-ARM101 로봇 비전 키트', link: '/ko/products/robot-vision-kit' },
            { text: 'Lekiwi 구현 지능 이동 로봇', link: '/ko/products/lekiwi' },
            { text: '2자유도 서보 짐벌', link: '/ko/products/2dof-gimbal' },
            { text: 'KWS 음성 상호작용 모듈', link: '/ko/products/kws-voice-module' },
            { text: '79° IMX219 CSI 카메라', link: '/ko/products/imx219-csi-camera' },
            { text: 'Feetech 버스 서보', link: '/ko/products/feetech-servo' },
            { text: '4 in 1 KVM 스위치', link: '/ko/products/kvm-switch' },
            { text: 'USB 무드라이버 사운드 카드', link: '/ko/products/usb-sound-card' },
            { text: '4K HDMI 캡처 카드', link: '/ko/products/4k-hdmi-capture' },
            { text: 'SO-ARM101 오버헤드 카메라 마운트', link: '/ko/products/overhead-camera-mount' },
            { text: '버스 서보 드라이버 보드', link: '/ko/products/servo-driver-board' },
            { text: 'GPS & 北斗 GNSS 측위 모듈', link: '/ko/products/gps-beidou-module' },
            { text: 'ESP32-S3 WiFi 영상 모듈', link: '/ko/products/esp32-s3-wifi-module' },
            { text: 'SO-ARM101 TPU 플렉시블 그리퍼', link: '/ko/products/tpu-flexible-gripper' },
            { text: 'SO-ARM101 로봇 비전 키트', link: '/ko/products/robot-vision-kit' },
            { text: 'Lekiwi 구현 지능 이동 로봇', link: '/ko/products/lekiwi' },
            { text: '2자유도 서보 짐벌', link: '/ko/products/2dof-gimbal' },
            { text: 'KWS 음성 상호작용 모듈', link: '/ko/products/kws-voice-module' },
            { text: '79° IMX219 CSI 카메라', link: '/ko/products/imx219-csi-camera' },
            { text: 'Feetech 버스 서보', link: '/ko/products/feetech-servo' },
            { text: '4 in 1 KVM 스위치', link: '/ko/products/kvm-switch' },
            { text: 'USB 무드라이버 사운드 카드', link: '/ko/products/usb-sound-card' },
            { text: '4K HDMI 캡처 카드', link: '/ko/products/4k-hdmi-capture' },
            { text: 'SO-ARM101 오버헤드 카메라 마운트', link: '/ko/products/overhead-camera-mount' },
            { text: '3D RealSense 깊이 카메라', link: '/ko/products/realsense-depth-camera' },
          ] },
        ],
      },
    },
  },
  de: {
    label: 'Deutsch',
    lang: 'de',
    description: 'Juxi Technology Produkt-Tutorials und Dokumentationszentrum',
    head: [
      ['meta', { property: 'og:title', content: 'Juxi Technology Wiki - Produkt-Tutorials & Dokumentation' }],
      ['meta', { property: 'og:description', content: 'Juxi Technology Wiki — umfassende Tutorials und Dokumentation für Roboterarme, Sensoren und Zubehör. Von SO-ARM101 bis IMU-Module.' }],
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      nav: [
        { text: 'Tutorials', link: '/de/tutorials/', activeMatch: '/de/tutorials/' },
        { text: 'Themen', link: '/de/topics/', activeMatch: '/de/topics/' },
        { text: 'Technische Doku', link: '/de/tech/', activeMatch: '/de/tech/' },
        { text: 'Downloads', link: '/de/downloads/', activeMatch: '/de/downloads/' },
        { text: 'Produkte', link: '/de/products/', activeMatch: '/de/products/' },
        { text: 'Community', link: '/de/community/', activeMatch: '/de/community/' },
        { text: 'Über uns', link: '/de/about/', activeMatch: '/de/about/' },
      ],
      sidebar: {
        '/de/tutorials/': [
          { text: 'Schnellstart', items: [
            { text: 'FAQ', link: '/de/tutorials/faq' },
            { text: 'Schnellstart', link: '/de/tutorials/getting-started' },
            { text: 'Hardware-Verbindung', link: '/de/tutorials/hardware-setup' },
            { text: 'Software-Konfiguration', link: '/de/tutorials/software-config' },
            { text: 'ROS-Einführung', link: '/de/tutorials/ros-intro' },
          ] },
          { text: 'Roboterarme', items: [
            { text: 'Auswahlhilfe', link: '/de/tutorials/robot-arms/select-guide' },
          ] },
          { text: 'Sensoren', items: [
            { text: 'IMU-Kalibrierung', link: '/de/tutorials/sensors/imu/calibration' },
            {
              text: 'IMU-Trägheitsnavigation',
              collapsed: true,
              items: [
                { text: 'Produktinformation', link: '/de/tutorials/sensors/imu/product-info' },
                {
                  text: 'Multi-Board-Beispiele',
                  items: [
                    { text: 'Multi-Host-Kommunikationsfälle Übersicht', link: '/de/tutorials/sensors/imu/multi-board-examples/overview' },
                    { text: 'PC-Kommunikation', link: '/de/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                    {
                      text: 'I2C-Kommunikation',
                      items: [
                        { text: 'Arduino', link: '/de/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                        { text: 'Jetson', link: '/de/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                        { text: 'Raspberry Pi', link: '/de/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' },
                        { text: 'RDK', link: '/de/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                        { text: 'STM32', link: '/de/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                      ],
                    },
                    {
                      text: 'Serielle Kommunikation',
                      items: [
                        { text: 'Arduino', link: '/de/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                        { text: 'Jetson', link: '/de/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                        { text: 'Raspberry Pi', link: '/de/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' },
                        { text: 'RDK', link: '/de/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                        { text: 'STM32', link: '/de/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                      ],
                    },
                  ],
                },
                {
                  text: 'ROS-Beispiele',
                  items: [
                    { text: 'ROS1-Anwendung', link: '/de/tutorials/sensors/imu/ros-examples/ros1' },
                    { text: 'ROS2-Anwendung', link: '/de/tutorials/sensors/imu/ros-examples/ros2' },
                  ],
                },
              ],
            },
          ] },
          { text: 'Zubehör', items: [
                { text: 'USB-Kamera mit Autofokus', link: '/de/tutorials/accessories/usb-auto-focus-camera' },
                { text: 'Jetson-CSI-Kamera', link: '/de/tutorials/accessories/jetson-csi-camera' },
                {
                    text: 'KWS-Spracherkennungsmodul',
                    collapsed: true,
                    items: [
                      { text: 'Tutorial-Startseite', link: '/de/tutorials/accessories/KWS-speech-recognition-module/' },
                      { text: 'Jetson Nano serielle Kommunikation', link: '/de/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                      { text: 'Jetson serielle Kommunikation', link: '/de/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                      { text: 'PC serielle Kommunikation', link: '/de/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                      { text: 'Raspberry Pi serielle Kommunikation', link: '/de/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' },
                      { text: 'ROS2 RViz2-Visualisierung', link: '/de/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                      { text: 'Firmware für Wake-Wörter herunterladen und flashen', link: '/de/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
                    ],
                },
                {
                    text: 'Feetech-Servo',
                    collapsed: true,
                    items: [
                      { text: 'STS3215 & SCS0009 – Debug-Tutorial', link: '/de/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial' },
                      { text: 'SCS-Kommunikationsprotokoll', link: '/de/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol' },
                      { text: 'Magnetencoder-STS-Servo – Speichertabelle', link: '/de/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis' },
                      { text: 'Potentiometer-SCSCL-Servo – Speichertabelle', link: '/de/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis' },
                    ],
                },
                { text: '2-DOF-Gimbal', link: '/de/tutorials/accessories/2dof-camera-gimbal' },
            { text: 'Herzfrequenz- und SpO2-Sensor', link: '/de/tutorials/accessories/heart-rate-spo2' },
            { text: '0,91-Zoll-OLED-Display', link: '/de/tutorials/accessories/0.91-oled-screen-tutorial' },
            { text: '4K-HDMI-Capture-Karte', link: '/de/tutorials/accessories/4k-hdmi-capture-tutorial' },
            { text: 'KVM-Switch', link: '/de/tutorials/accessories/kvm-switch-tutorial' },
            { text: 'USB-Soundkarte ohne Treiber', link: '/de/tutorials/accessories/usb-audio-card-tutorial' },
          ] },
        ],
        '/de/topics/': [{ text: 'Themen', items: [{ text: 'Themen', link: '/de/topics/' }, { text: 'Open-Source-Hardware-Philosophie', link: '/de/topics/open-source-hardware' }] }],
        '/de/tech/': [{ text: 'Technische Doku', items: [{ text: 'Technische Doku', link: '/de/tech/' }] }],
        '/de/community/': [{ text: 'Community', items: [{ text: 'Community', link: '/de/community/' }] }],
        '/de/products/': [
          { text: 'Produkte', items: [
            { text: 'SO-ARM101 Entwickler-Kit', link: '/de/products/so-arm101' },
            { text: 'AmazingHand Robotikhand', link: '/de/products/amazinghand' },
            { text: 'Jetson Orin NX Super Dev-Kit', link: '/de/products/jetson-orin-nx-super-kit' },
            { text: 'IMU-Trägheitsmodul', link: '/de/products/imu-module' },
            { text: 'Bus-Servo-Treiberplatine', link: '/de/products/servo-driver-board' },
            { text: 'GPS- & Beidou-GNSS-Positionsmodul', link: '/de/products/gps-beidou-module' },
            { text: 'ESP32-S3-WiFi-Videomodul', link: '/de/products/esp32-s3-wifi-module' },
            { text: 'SO-ARM101 TPU-Flex-Greifer', link: '/de/products/tpu-flexible-gripper' },
            { text: 'SO-ARM101-Robotervisions-Kit', link: '/de/products/robot-vision-kit' },
            { text: 'Lekiwi Mobilitätsroboter', link: '/de/products/lekiwi' },
            { text: '2-DOF-Servo-Pan-Tilt', link: '/de/products/2dof-gimbal' },
            { text: 'KWS-Sprachinteraktionsmodul', link: '/de/products/kws-voice-module' },
            { text: '79°-IMX219-CSI-Kamera', link: '/de/products/imx219-csi-camera' },
            { text: 'Feetech-Bus-Servo', link: '/de/products/feetech-servo' },
            { text: '4-in-1-KVM-Switch', link: '/de/products/kvm-switch' },
            { text: 'USB-Soundkarte ohne Treiber', link: '/de/products/usb-sound-card' },
            { text: '4K-HDMI-Capture-Karte', link: '/de/products/4k-hdmi-capture' },
            { text: 'SO-ARM101-Overhead-Kamerahalterung', link: '/de/products/overhead-camera-mount' },
            { text: 'Bus-Servo-Treiberplatine', link: '/de/products/servo-driver-board' },
            { text: 'GPS- & Beidou-GNSS-Positionsmodul', link: '/de/products/gps-beidou-module' },
            { text: 'ESP32-S3-WiFi-Videomodul', link: '/de/products/esp32-s3-wifi-module' },
            { text: 'SO-ARM101 TPU-Flex-Greifer', link: '/de/products/tpu-flexible-gripper' },
            { text: 'SO-ARM101-Robotervisions-Kit', link: '/de/products/robot-vision-kit' },
            { text: 'Lekiwi Mobilitätsroboter', link: '/de/products/lekiwi' },
            { text: '2-DOF-Servo-Pan-Tilt', link: '/de/products/2dof-gimbal' },
            { text: 'KWS-Sprachinteraktionsmodul', link: '/de/products/kws-voice-module' },
            { text: '79°-IMX219-CSI-Kamera', link: '/de/products/imx219-csi-camera' },
            { text: 'Feetech-Bus-Servo', link: '/de/products/feetech-servo' },
            { text: '4-in-1-KVM-Switch', link: '/de/products/kvm-switch' },
            { text: 'USB-Soundkarte ohne Treiber', link: '/de/products/usb-sound-card' },
            { text: '4K-HDMI-Capture-Karte', link: '/de/products/4k-hdmi-capture' },
            { text: 'SO-ARM101-Overhead-Kamerahalterung', link: '/de/products/overhead-camera-mount' },
            { text: '3D RealSense Tiefenkamera', link: '/de/products/realsense-depth-camera' },
          ] },
        ],
      },
    },
  },
  fr: {
    label: 'Français',
    lang: 'fr',
    description: 'Centre de tutoriels et de documentation Juxi Technology',
    head: [
      ['meta', { property: 'og:title', content: 'Juxi Technology Wiki - Tutoriels & Documentation' }],
      ['meta', { property: 'og:description', content: 'Juxi Technology Wiki — tutoriels et documentation complets pour bras robotiques, capteurs et accessoires. De SO-ARM101 aux modules IMU.' }],
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      nav: [
        { text: 'Tutoriels', link: '/fr/tutorials/', activeMatch: '/fr/tutorials/' },
        { text: 'Sujets', link: '/fr/topics/', activeMatch: '/fr/topics/' },
        { text: 'Documentation', link: '/fr/tech/', activeMatch: '/fr/tech/' },
        { text: 'Téléchargements', link: '/fr/downloads/', activeMatch: '/fr/downloads/' },
        { text: 'Produits', link: '/fr/products/', activeMatch: '/fr/products/' },
        { text: 'Communauté', link: '/fr/community/', activeMatch: '/fr/community/' },
        { text: 'À propos', link: '/fr/about/', activeMatch: '/fr/about/' },
      ],
      sidebar: {
        '/fr/tutorials/': [
          { text: 'Démarrage rapide', items: [
            { text: 'FAQ', link: '/fr/tutorials/faq' },
            { text: 'Démarrage rapide', link: '/fr/tutorials/getting-started' },
            { text: 'Connexion matérielle', link: '/fr/tutorials/hardware-setup' },
            { text: 'Configuration logicielle', link: '/fr/tutorials/software-config' },
            { text: 'Introduction à ROS', link: '/fr/tutorials/ros-intro' },
          ] },
          { text: 'Bras robotiques', items: [
            { text: 'Guide de sélection', link: '/fr/tutorials/robot-arms/select-guide' },
          ] },
          { text: 'Capteurs', items: [
            { text: 'Calibration IMU', link: '/fr/tutorials/sensors/imu/calibration' },
            {
              text: 'Navigation inertielle IMU',
              collapsed: true,
              items: [
                { text: 'Informations produit', link: '/fr/tutorials/sensors/imu/product-info' },
                {
                  text: 'Exemples multi-cartes',
                  items: [
                    { text: 'Aperçu des cas multi-hôtes', link: '/fr/tutorials/sensors/imu/multi-board-examples/overview' },
                    { text: 'Communication PC', link: '/fr/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                    {
                      text: 'Communication I2C',
                      items: [
                        { text: 'Arduino', link: '/fr/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                        { text: 'Jetson', link: '/fr/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                        { text: 'Raspberry Pi', link: '/fr/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' },
                        { text: 'RDK', link: '/fr/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                        { text: 'STM32', link: '/fr/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                      ],
                    },
                    {
                      text: 'Communication série',
                      items: [
                        { text: 'Arduino', link: '/fr/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                        { text: 'Jetson', link: '/fr/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                        { text: 'Raspberry Pi', link: '/fr/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' },
                        { text: 'RDK', link: '/fr/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                        { text: 'STM32', link: '/fr/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                      ],
                    },
                  ],
                },
                {
                  text: 'Exemples ROS',
                  items: [
                    { text: 'Application ROS1', link: '/fr/tutorials/sensors/imu/ros-examples/ros1' },
                    { text: 'Application ROS2', link: '/fr/tutorials/sensors/imu/ros-examples/ros2' },
                  ],
                },
              ],
            },
          ] },
          { text: 'Accessoires', items: [
                { text: 'Caméra USB à autofocus', link: '/fr/tutorials/accessories/usb-auto-focus-camera' },
                { text: 'Caméra CSI Jetson', link: '/fr/tutorials/accessories/jetson-csi-camera' },
                {
                    text: 'Module de reconnaissance vocale KWS',
                    collapsed: true,
                    items: [
                      { text: 'Accueil des tutoriels', link: '/fr/tutorials/accessories/KWS-speech-recognition-module/' },
                      { text: 'Communication série Jetson Nano', link: '/fr/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                      { text: 'Communication série Jetson', link: '/fr/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                      { text: 'Communication série PC', link: '/fr/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                      { text: 'Communication série Raspberry Pi', link: '/fr/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' },
                      { text: 'Visualisation ROS2 RViz2', link: '/fr/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                      { text: 'Flashage du firmware chinois/anglais', link: '/fr/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
                    ],
                },
                {
                    text: 'Servos Feetech',
                    collapsed: true,
                    items: [
                      { text: 'Tutoriel de débogage STS3215 & SCS0009', link: '/fr/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial' },
                      { text: 'Protocole de communication SCS', link: '/fr/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol' },
                      { text: 'Table mémoire du servo STS à encodeur magnétique', link: '/fr/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis' },
                      { text: 'Table mémoire du servo SCSCL à potentiomètre', link: '/fr/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis' },
                    ],
                },
                { text: 'Cardan 2-DOF', link: '/fr/tutorials/accessories/2dof-camera-gimbal' },
            { text: 'Capteur de fréquence cardiaque et SpO2', link: '/fr/tutorials/accessories/heart-rate-spo2' },
            { text: 'Écran OLED 0,91 pouce', link: '/fr/tutorials/accessories/0.91-oled-screen-tutorial' },
            { text: 'Carte de capture HDMI 4K', link: '/fr/tutorials/accessories/4k-hdmi-capture-tutorial' },
            { text: 'Switch KVM', link: '/fr/tutorials/accessories/kvm-switch-tutorial' },
            { text: 'Carte son USB sans pilote', link: '/fr/tutorials/accessories/usb-audio-card-tutorial' },
          ] },
        ],
        '/fr/topics/': [{ text: 'Sujets', items: [{ text: 'Sujets', link: '/fr/topics/' }, { text: "Philosophie du matériel open source", link: '/fr/topics/open-source-hardware' }] }],
        '/fr/tech/': [{ text: 'Documentation', items: [{ text: 'Documentation', link: '/fr/tech/' }] }],
        '/fr/community/': [{ text: 'Communauté', items: [{ text: 'Communauté', link: '/fr/community/' }] }],
        '/fr/products/': [
          { text: 'Produits', items: [
            { text: 'Kit développeur SO-ARM101', link: '/fr/products/so-arm101' },
            { text: 'Main robotique AmazingHand', link: '/fr/products/amazinghand' },
            { text: 'Kit Jetson Orin NX Super', link: '/fr/products/jetson-orin-nx-super-kit' },
            { text: 'Module inertiel IMU', link: '/fr/products/imu-module' },
            { text: 'Carte driver servo bus', link: '/fr/products/servo-driver-board' },
            { text: 'Module GNSS GPS & Beidou', link: '/fr/products/gps-beidou-module' },
            { text: 'Module vidéo WiFi ESP32-S3', link: '/fr/products/esp32-s3-wifi-module' },
            { text: 'Pince flexible TPU SO-ARM101', link: '/fr/products/tpu-flexible-gripper' },
            { text: 'Kit vision robotique SO-ARM101', link: '/fr/products/robot-vision-kit' },
            { text: 'Robot mobile Lekiwi', link: '/fr/products/lekiwi' },
            { text: 'Cardan servo 2-DOF', link: '/fr/products/2dof-gimbal' },
            { text: "Module d'interaction vocale KWS", link: '/fr/products/kws-voice-module' },
            { text: 'Caméra CSI IMX219 79°', link: '/fr/products/imx219-csi-camera' },
            { text: 'Servo bus Feetech', link: '/fr/products/feetech-servo' },
            { text: 'Commutateur KVM 4-en-1', link: '/fr/products/kvm-switch' },
            { text: 'Carte son USB sans pilote', link: '/fr/products/usb-sound-card' },
            { text: 'Carte de capture HDMI 4K', link: '/fr/products/4k-hdmi-capture' },
            { text: 'Support caméra plafonnier SO-ARM101', link: '/fr/products/overhead-camera-mount' },
            { text: 'Carte driver servo bus', link: '/fr/products/servo-driver-board' },
            { text: 'Module GNSS GPS & Beidou', link: '/fr/products/gps-beidou-module' },
            { text: 'Module vidéo WiFi ESP32-S3', link: '/fr/products/esp32-s3-wifi-module' },
            { text: 'Pince flexible TPU SO-ARM101', link: '/fr/products/tpu-flexible-gripper' },
            { text: 'Kit vision robotique SO-ARM101', link: '/fr/products/robot-vision-kit' },
            { text: 'Robot mobile Lekiwi', link: '/fr/products/lekiwi' },
            { text: 'Cardan servo 2-DOF', link: '/fr/products/2dof-gimbal' },
            { text: "Module d'interaction vocale KWS", link: '/fr/products/kws-voice-module' },
            { text: 'Caméra CSI IMX219 79°', link: '/fr/products/imx219-csi-camera' },
            { text: 'Servo bus Feetech', link: '/fr/products/feetech-servo' },
            { text: 'Commutateur KVM 4-en-1', link: '/fr/products/kvm-switch' },
            { text: 'Carte son USB sans pilote', link: '/fr/products/usb-sound-card' },
            { text: 'Carte de capture HDMI 4K', link: '/fr/products/4k-hdmi-capture' },
            { text: 'Support caméra plafonnier SO-ARM101', link: '/fr/products/overhead-camera-mount' },
            { text: 'Caméra de profondeur RealSense', link: '/fr/products/realsense-depth-camera' },
          ] },
        ],
      },
    },
  },
  es: {
    label: 'Español',
    lang: 'es',
    description: 'Centro de tutoriales y documentación de Juxi Technology',
    head: [
      ['meta', { property: 'og:title', content: 'Juxi Technology Wiki - Tutoriales y Documentación' }],
      ['meta', { property: 'og:description', content: 'Juxi Technology Wiki — tutoriales y documentación completos para brazos robóticos, sensores y accesorios. De SO-ARM101 a módulos IMU.' }],
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      nav: [
        { text: 'Tutoriales', link: '/es/tutorials/', activeMatch: '/es/tutorials/' },
        { text: 'Temas', link: '/es/topics/', activeMatch: '/es/topics/' },
        { text: 'Documentación', link: '/es/tech/', activeMatch: '/es/tech/' },
        { text: 'Descargas', link: '/es/downloads/', activeMatch: '/es/downloads/' },
        { text: 'Productos', link: '/es/products/', activeMatch: '/es/products/' },
        { text: 'Comunidad', link: '/es/community/', activeMatch: '/es/community/' },
        { text: 'Sobre nosotros', link: '/es/about/', activeMatch: '/es/about/' },
      ],
      sidebar: {
        '/es/tutorials/': [
          { text: 'Inicio rápido', items: [
            { text: 'FAQ', link: '/es/tutorials/faq' },
            { text: 'Inicio rápido', link: '/es/tutorials/getting-started' },
            { text: 'Conexión de hardware', link: '/es/tutorials/hardware-setup' },
            { text: 'Configuración de software', link: '/es/tutorials/software-config' },
            { text: 'Introducción a ROS', link: '/es/tutorials/ros-intro' },
          ] },
          { text: 'Brazos robóticos', items: [
            { text: 'Guía de selección', link: '/es/tutorials/robot-arms/select-guide' },
          ] },
          { text: 'Sensores', items: [
            { text: 'Calibración IMU', link: '/es/tutorials/sensors/imu/calibration' },
            {
              text: 'Navegación inercial IMU',
              collapsed: true,
              items: [
                { text: 'Información del producto', link: '/es/tutorials/sensors/imu/product-info' },
                {
                  text: 'Ejemplos multi-placa',
                  items: [
                    { text: 'Resumen de casos multi-host', link: '/es/tutorials/sensors/imu/multi-board-examples/overview' },
                    { text: 'Comunicación PC', link: '/es/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                    {
                      text: 'Comunicación I2C',
                      items: [
                        { text: 'Arduino', link: '/es/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                        { text: 'Jetson', link: '/es/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                        { text: 'Raspberry Pi', link: '/es/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' },
                        { text: 'RDK', link: '/es/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                        { text: 'STM32', link: '/es/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                      ],
                    },
                    {
                      text: 'Comunicación serie',
                      items: [
                        { text: 'Arduino', link: '/es/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                        { text: 'Jetson', link: '/es/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                        { text: 'Raspberry Pi', link: '/es/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' },
                        { text: 'RDK', link: '/es/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                        { text: 'STM32', link: '/es/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                      ],
                    },
                  ],
                },
                {
                  text: 'Ejemplos ROS',
                  items: [
                    { text: 'Aplicación ROS1', link: '/es/tutorials/sensors/imu/ros-examples/ros1' },
                    { text: 'Aplicación ROS2', link: '/es/tutorials/sensors/imu/ros-examples/ros2' },
                  ],
                },
              ],
            },
          ] },
          { text: 'Accesorios', items: [
                { text: 'Cámara USB con enfoque automático', link: '/es/tutorials/accessories/usb-auto-focus-camera' },
                { text: 'Cámara CSI Jetson', link: '/es/tutorials/accessories/jetson-csi-camera' },
                {
                    text: 'Módulo de reconocimiento de voz KWS',
                    collapsed: true,
                    items: [
                      { text: 'Inicio de tutoriales', link: '/es/tutorials/accessories/KWS-speech-recognition-module/' },
                      { text: 'Comunicación serie Jetson Nano', link: '/es/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                      { text: 'Comunicación serie Jetson', link: '/es/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                      { text: 'Comunicación serie PC', link: '/es/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                      { text: 'Comunicación serie Raspberry Pi', link: '/es/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' },
                      { text: 'Visualización ROS2 RViz2', link: '/es/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                      { text: 'Grabación de firmware chino/inglés', link: '/es/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
                    ],
                },
                {
                    text: 'Servos Feetech',
                    collapsed: true,
                    items: [
                      { text: 'Tutorial de depuración STS3215 & SCS0009', link: '/es/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial' },
                      { text: 'Protocolo de comunicación SCS', link: '/es/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol' },
                      { text: 'Tabla de memoria del servo STS con encoder magnético', link: '/es/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis' },
                      { text: 'Tabla de memoria del servo SCSCL con potenciómetro', link: '/es/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis' },
                    ],
                },
                { text: 'Cardán 2-DOF', link: '/es/tutorials/accessories/2dof-camera-gimbal' },
            { text: 'Sensor de frecuencia cardíaca y SpO2', link: '/es/tutorials/accessories/heart-rate-spo2' },
            { text: 'Pantalla OLED de 0,91 pulgadas', link: '/es/tutorials/accessories/0.91-oled-screen-tutorial' },
            { text: 'Capturadora HDMI 4K', link: '/es/tutorials/accessories/4k-hdmi-capture-tutorial' },
            { text: 'Conmutador KVM', link: '/es/tutorials/accessories/kvm-switch-tutorial' },
            { text: 'Tarjeta de sonido USB sin controlador', link: '/es/tutorials/accessories/usb-audio-card-tutorial' },
          ] },
        ],
        '/es/topics/': [{ text: 'Temas', items: [{ text: 'Temas', link: '/es/topics/' }, { text: 'Filosofía del hardware de código abierto', link: '/es/topics/open-source-hardware' }] }],
        '/es/tech/': [{ text: 'Documentación', items: [{ text: 'Documentación', link: '/es/tech/' }] }],
        '/es/community/': [{ text: 'Comunidad', items: [{ text: 'Comunidad', link: '/es/community/' }] }],
        '/es/products/': [
          { text: 'Productos', items: [
            { text: 'Kit desarrollador SO-ARM101', link: '/es/products/so-arm101' },
            { text: 'Mano robótica AmazingHand', link: '/es/products/amazinghand' },
            { text: 'Kit Jetson Orin NX Super', link: '/es/products/jetson-orin-nx-super-kit' },
            { text: 'Módulo inercial IMU', link: '/es/products/imu-module' },
            { text: 'Placa driver de servo de bus', link: '/es/products/servo-driver-board' },
            { text: 'Módulo GNSS GPS y Beidou', link: '/es/products/gps-beidou-module' },
            { text: 'Módulo de video WiFi ESP32-S3', link: '/es/products/esp32-s3-wifi-module' },
            { text: 'Pinza flexible de TPU SO-ARM101', link: '/es/products/tpu-flexible-gripper' },
            { text: 'Kit de visión robótica SO-ARM101', link: '/es/products/robot-vision-kit' },
            { text: 'Robot móvil Lekiwi', link: '/es/products/lekiwi' },
            { text: 'Cardán servo 2-DOF', link: '/es/products/2dof-gimbal' },
            { text: 'Módulo de interacción de voz KWS', link: '/es/products/kws-voice-module' },
            { text: 'Cámara CSI IMX219 de 79°', link: '/es/products/imx219-csi-camera' },
            { text: 'Servo de bus Feetech', link: '/es/products/feetech-servo' },
            { text: 'Conmutador KVM 4 en 1', link: '/es/products/kvm-switch' },
            { text: 'Tarjeta de sonido USB sin controlador', link: '/es/products/usb-sound-card' },
            { text: 'Capturadora HDMI 4K', link: '/es/products/4k-hdmi-capture' },
            { text: 'Montaje de cámara superior SO-ARM101', link: '/es/products/overhead-camera-mount' },
            { text: 'Placa driver de servo de bus', link: '/es/products/servo-driver-board' },
            { text: 'Módulo GNSS GPS y Beidou', link: '/es/products/gps-beidou-module' },
            { text: 'Módulo de video WiFi ESP32-S3', link: '/es/products/esp32-s3-wifi-module' },
            { text: 'Pinza flexible de TPU SO-ARM101', link: '/es/products/tpu-flexible-gripper' },
            { text: 'Kit de visión robótica SO-ARM101', link: '/es/products/robot-vision-kit' },
            { text: 'Robot móvil Lekiwi', link: '/es/products/lekiwi' },
            { text: 'Cardán servo 2-DOF', link: '/es/products/2dof-gimbal' },
            { text: 'Módulo de interacción de voz KWS', link: '/es/products/kws-voice-module' },
            { text: 'Cámara CSI IMX219 de 79°', link: '/es/products/imx219-csi-camera' },
            { text: 'Servo de bus Feetech', link: '/es/products/feetech-servo' },
            { text: 'Conmutador KVM 4 en 1', link: '/es/products/kvm-switch' },
            { text: 'Tarjeta de sonido USB sin controlador', link: '/es/products/usb-sound-card' },
            { text: 'Capturadora HDMI 4K', link: '/es/products/4k-hdmi-capture' },
            { text: 'Montaje de cámara superior SO-ARM101', link: '/es/products/overhead-camera-mount' },
            { text: 'Cámara de profundidad RealSense', link: '/es/products/realsense-depth-camera' },
          ] },
        ],
      },
    },
  },
  it: {
    label: 'Italiano',
    lang: 'it',
    description: 'Centro tutorial e documentazione Juxi Technology',
    head: [
      ['meta', { property: 'og:title', content: 'Juxi Technology Wiki - Tutorial e Documentazione' }],
      ['meta', { property: 'og:description', content: 'Juxi Technology Wiki — tutorial e documentazione completi per bracci robotici, sensori e accessori. Da SO-ARM101 ai moduli IMU.' }],
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      nav: [
        { text: 'Tutorial', link: '/it/tutorials/', activeMatch: '/it/tutorials/' },
        { text: 'Argomenti', link: '/it/topics/', activeMatch: '/it/topics/' },
        { text: 'Documentazione', link: '/it/tech/', activeMatch: '/it/tech/' },
        { text: 'Download', link: '/it/downloads/', activeMatch: '/it/downloads/' },
        { text: 'Prodotti', link: '/it/products/', activeMatch: '/it/products/' },
        { text: 'Community', link: '/it/community/', activeMatch: '/it/community/' },
        { text: 'Chi siamo', link: '/it/about/', activeMatch: '/it/about/' },
      ],
      sidebar: {
        '/it/tutorials/': [
          { text: 'Guida rapida', items: [
            { text: 'FAQ', link: '/it/tutorials/faq' },
            { text: 'Guida rapida', link: '/it/tutorials/getting-started' },
            { text: 'Collegamento hardware', link: '/it/tutorials/hardware-setup' },
            { text: 'Configurazione software', link: '/it/tutorials/software-config' },
            { text: 'Introduzione a ROS', link: '/it/tutorials/ros-intro' },
          ] },
          { text: 'Bracci robotici', items: [
            { text: 'Guida alla scelta', link: '/it/tutorials/robot-arms/select-guide' },
          ] },
          { text: 'Sensori', items: [
            { text: 'Calibrazione IMU', link: '/it/tutorials/sensors/imu/calibration' },
            {
              text: 'Navigazione inerziale IMU',
              collapsed: true,
              items: [
                { text: 'Informazioni prodotto', link: '/it/tutorials/sensors/imu/product-info' },
                {
                  text: 'Esempi multi-scheda',
                  items: [
                    { text: 'Panoramica dei casi multi-host', link: '/it/tutorials/sensors/imu/multi-board-examples/overview' },
                    { text: 'Comunicazione PC', link: '/it/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                    {
                      text: 'Comunicazione I2C',
                      items: [
                        { text: 'Arduino', link: '/it/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                        { text: 'Jetson', link: '/it/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                        { text: 'Raspberry Pi', link: '/it/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' },
                        { text: 'RDK', link: '/it/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                        { text: 'STM32', link: '/it/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                      ],
                    },
                    {
                      text: 'Comunicazione seriale',
                      items: [
                        { text: 'Arduino', link: '/it/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                        { text: 'Jetson', link: '/it/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                        { text: 'Raspberry Pi', link: '/it/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' },
                        { text: 'RDK', link: '/it/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                        { text: 'STM32', link: '/it/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                      ],
                    },
                  ],
                },
                {
                  text: 'Esempi ROS',
                  items: [
                    { text: 'Applicazione ROS1', link: '/it/tutorials/sensors/imu/ros-examples/ros1' },
                    { text: 'Applicazione ROS2', link: '/it/tutorials/sensors/imu/ros-examples/ros2' },
                  ],
                },
              ],
            },
          ] },
          { text: 'Accessori', items: [
                { text: 'Fotocamera USB con autofocus', link: '/it/tutorials/accessories/usb-auto-focus-camera' },
                { text: 'Fotocamera CSI Jetson', link: '/it/tutorials/accessories/jetson-csi-camera' },
                {
                    text: 'Modulo di riconoscimento vocale KWS',
                    collapsed: true,
                    items: [
                      { text: 'Home dei tutorial', link: '/it/tutorials/accessories/KWS-speech-recognition-module/' },
                      { text: 'Comunicazione seriale Jetson Nano', link: '/it/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                      { text: 'Comunicazione seriale Jetson', link: '/it/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                      { text: 'Comunicazione seriale PC', link: '/it/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                      { text: 'Comunicazione seriale Raspberry Pi', link: '/it/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' },
                      { text: 'Visualizzazione ROS2 RViz2', link: '/it/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                      { text: 'Flashing firmware cinese/inglese', link: '/it/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
                    ],
                },
                {
                    text: 'Servomotori Feetech',
                    collapsed: true,
                    items: [
                      { text: 'Tutorial di debug STS3215 & SCS0009', link: '/it/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial' },
                      { text: 'Protocollo di comunicazione SCS', link: '/it/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol' },
                      { text: 'Tabella di memoria del servo STS a encoder magnetico', link: '/it/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis' },
                      { text: 'Tabella di memoria del servo SCSCL a potenziometro', link: '/it/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis' },
                    ],
                },
                { text: 'Gimbal 2-DOF', link: '/it/tutorials/accessories/2dof-camera-gimbal' },
            { text: 'Sensore di frequenza cardiaca e SpO2', link: '/it/tutorials/accessories/heart-rate-spo2' },
            { text: 'Display OLED da 0,91 pollici', link: '/it/tutorials/accessories/0.91-oled-screen-tutorial' },
            { text: 'Scheda di acquisizione HDMI 4K', link: '/it/tutorials/accessories/4k-hdmi-capture-tutorial' },
            { text: 'Switch KVM', link: '/it/tutorials/accessories/kvm-switch-tutorial' },
            { text: 'Scheda audio USB senza driver', link: '/it/tutorials/accessories/usb-audio-card-tutorial' },
          ] },
        ],
        '/it/topics/': [{ text: 'Argomenti', items: [{ text: 'Argomenti', link: '/it/topics/' }, { text: "Filosofia dell'hardware open source", link: '/it/topics/open-source-hardware' }] }],
        '/it/tech/': [{ text: 'Documentazione', items: [{ text: 'Documentazione', link: '/it/tech/' }] }],
        '/it/community/': [{ text: 'Community', items: [{ text: 'Community', link: '/it/community/' }] }],
        '/it/products/': [
          { text: 'Prodotti', items: [
            { text: 'Kit sviluppatore SO-ARM101', link: '/it/products/so-arm101' },
            { text: 'Mano robotica AmazingHand', link: '/it/products/amazinghand' },
            { text: 'Kit Jetson Orin NX Super', link: '/it/products/jetson-orin-nx-super-kit' },
            { text: 'Modulo inerziale IMU', link: '/it/products/imu-module' },
            { text: 'Scheda driver servo bus', link: '/it/products/servo-driver-board' },
            { text: 'Modulo GNSS GPS e Beidou', link: '/it/products/gps-beidou-module' },
            { text: 'Modulo video WiFi ESP32-S3', link: '/it/products/esp32-s3-wifi-module' },
            { text: 'Pinza flessibile TPU SO-ARM101', link: '/it/products/tpu-flexible-gripper' },
            { text: 'Kit visione robotica SO-ARM101', link: '/it/products/robot-vision-kit' },
            { text: 'Robot mobile Lekiwi', link: '/it/products/lekiwi' },
            { text: 'Pan-tilt servo 2-DOF', link: '/it/products/2dof-gimbal' },
            { text: 'Modulo di interazione vocale KWS', link: '/it/products/kws-voice-module' },
            { text: 'Fotocamera CSI IMX219 79°', link: '/it/products/imx219-csi-camera' },
            { text: 'Servo bus Feetech', link: '/it/products/feetech-servo' },
            { text: 'Switch KVM 4-in-1', link: '/it/products/kvm-switch' },
            { text: 'Scheda audio USB senza driver', link: '/it/products/usb-sound-card' },
            { text: 'Scheda di acquisizione HDMI 4K', link: '/it/products/4k-hdmi-capture' },
            { text: 'Supporto fotocamera overhead SO-ARM101', link: '/it/products/overhead-camera-mount' },
            { text: 'Scheda driver servo bus', link: '/it/products/servo-driver-board' },
            { text: 'Modulo GNSS GPS e Beidou', link: '/it/products/gps-beidou-module' },
            { text: 'Modulo video WiFi ESP32-S3', link: '/it/products/esp32-s3-wifi-module' },
            { text: 'Pinza flessibile TPU SO-ARM101', link: '/it/products/tpu-flexible-gripper' },
            { text: 'Kit visione robotica SO-ARM101', link: '/it/products/robot-vision-kit' },
            { text: 'Robot mobile Lekiwi', link: '/it/products/lekiwi' },
            { text: 'Pan-tilt servo 2-DOF', link: '/it/products/2dof-gimbal' },
            { text: 'Modulo di interazione vocale KWS', link: '/it/products/kws-voice-module' },
            { text: 'Fotocamera CSI IMX219 79°', link: '/it/products/imx219-csi-camera' },
            { text: 'Servo bus Feetech', link: '/it/products/feetech-servo' },
            { text: 'Switch KVM 4-in-1', link: '/it/products/kvm-switch' },
            { text: 'Scheda audio USB senza driver', link: '/it/products/usb-sound-card' },
            { text: 'Scheda di acquisizione HDMI 4K', link: '/it/products/4k-hdmi-capture' },
            { text: 'Supporto fotocamera overhead SO-ARM101', link: '/it/products/overhead-camera-mount' },
            { text: 'Camera di profondità RealSense', link: '/it/products/realsense-depth-camera' },
          ] },
        ],
      },
    },
  },
  },
  themeConfig: {
    logo: {
      light: '/images/logos/logo-black.png',
      dark: '/images/logos/logo-white.png',
    },
    // 三语 nav/sidebar 定义在各 locales.themeConfig 中,这里只放公共 logo
  },
  // 结构化数据:每页注入 JSON-LD(首页 Organization,其余 Article)
  transformPageData: (pageData, { siteConfig }) => computePrevNext(siteConfig && siteConfig.userConfig, pageData),
  transformHead({ pageData }) {
    const base = 'https://wiki.juxitech.com'
    const isHome = pageData.relativePath === 'index.md'
    let ld
    if (isHome) {
      ld = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: '钜犀科技 Juxi Technology',
        url: base + '/',
        logo: base + '/images/logos/logo-black.png',
        description: '机器人与 AI 硬件的开放文档平台 — 机械臂、传感器、配件产品教程与技术文档',
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'support@juxitech.com',
          contactType: 'customer service',
        },
      }
    } else {
      ld = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageData.title || 'Juxi Technology Wiki',
        description: pageData.description || '',
        url: base + '/' + pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, ''),
        publisher: {
          '@type': 'Organization',
          name: 'Juxi Technology',
          url: base + '/',
        },
        inLanguage: pageData.lang || 'zh-CN',
      }
    }
    return [
      // hreflang:9 语言 alternate + x-default(置顶,爬虫优先识别语言对应)
      ...injectHreflang(pageData),
      ['script', { type: 'application/ld+json' }, JSON.stringify(ld)],
    ]
  },
})
