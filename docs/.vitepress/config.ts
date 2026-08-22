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
      { text: '教程', link: '/tutorials/', activeMatch: '/tutorials/' },
      { text: '技术专题', link: '/topics/', activeMatch: '/topics/' },
      { text: '技术文档', link: '/tech/', activeMatch: '/tech/' },
      { text: '用户案例', link: '/cases/', activeMatch: '/cases/' },
      { text: '社区', link: '/community/', activeMatch: '/community/' },
      { text: '下载', link: '/downloads/', activeMatch: '/downloads/' },
      { text: '关于我们', link: '/about/', activeMatch: '/about/' },
      { text: '更新日志', link: '/changelog/', activeMatch: '/changelog/' },
    ],
    sidebar: {
      '/tutorials/': [
        {
          text: '快速开始',
          items: [
            { text: '常见问题 FAQ', link: '/tutorials/faq' },
            { text: 'ROS 入门', link: '/tutorials/ros-intro' },
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
                { text: '选型指南', link: '/tutorials/robot-arms/select-guide' },
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
        { text: '技术专题', items: [{ text: '专题首页', link: '/topics/' }, { text: 'JetPack 刷机与系统配置', link: '/topics/jetpack-setup' }, { text: '边缘 AI 部署入门', link: '/topics/edge-ai-intro' }, { text: '具身智能入门（LeRobot）', link: '/topics/embodied-ai-intro' }, { text: '机器人学习', link: '/topics/robot-learning/' }] },
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
      '/products/': [
        { text: '产品', items: [
          { text: 'Jetson Orin NX Super 开发套件', link: '/products/jetson-orin-nx-super-kit' },
          { text: '3D RealSense 深度相机', link: '/products/realsense-depth-camera' },
          { text: '总线舵机驱动板', link: '/products/servo-driver-board' },
          { text: 'GPS & 北斗 GNSS 定位模块', link: '/products/gps-beidou-module' },
          { text: 'ESP32-S3 WiFi 视频模块', link: '/products/esp32-s3-wifi-module' },
          { text: 'SO-ARM101 TPU 柔性夹爪', link: '/products/tpu-flexible-gripper' },
          { text: 'SO-ARM101 机械臂视觉套件', link: '/products/robot-vision-kit' },
          { text: 'SO-ARM101 开发套件', link: '/products/so-arm101' },
          { text: 'AmazingHand 开源灵巧手', link: '/products/amazinghand' },
          { text: 'Lekiwi 具身智能移动机器人', link: '/products/lekiwi' },
          { text: '2 自由度舵机云台', link: '/products/2dof-gimbal' },
          { text: 'KWS 语音交互模块', link: '/products/kws-voice-module' },
          { text: 'IMU 高精度惯导模块', link: '/products/imu-module' },
          { text: '79\u00b0 IMX219 CSI 摄像头', link: '/products/imx219-csi-camera' },
          { text: 'Feetech 总线舵机', link: '/products/feetech-servo' },
          { text: '4 合 1 KVM 切换器', link: '/products/kvm-switch' },
          { text: 'USB 免驱声卡', link: '/products/usb-sound-card' },
          { text: '4K HDMI 采集卡', link: '/products/4k-hdmi-capture' },
          { text: 'SO-ARM101 顶置相机支架', link: '/products/overhead-camera-mount' },
        ] },
      ],
      '/downloads/': [
        { text: '下载', items: [{ text: '下载中心', link: '/downloads/' }] },
      ],
      '/about/': [
        { text: '关于', items: [{ text: '关于我们', link: '/about/' }] },
      ],
      '/changelog/': [
        { text: '更新', items: [{ text: '更新日志', link: '/changelog/' }] },
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
      { text: 'Downloads', link: '/en/downloads/', activeMatch: '/en/downloads/' },
      { text: 'About', link: '/en/about/', activeMatch: '/en/about/' },
      { text: 'Changelog', link: '/en/changelog/', activeMatch: '/en/changelog/' },
    ],
    sidebar: {
      '/en/tutorials/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'FAQ', link: '/en/tutorials/faq' },
            { text: 'ROS Intro', link: '/en/tutorials/ros-intro' },
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
                { text: 'Selection Guide', link: '/en/tutorials/robot-arms/select-guide' },
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
        { text: 'Topics', items: [{ text: 'Topics Home', link: '/en/topics/' }, { text: 'JetPack Flashing & Setup', link: '/en/topics/jetpack-setup' }, { text: 'Edge AI Deployment Intro', link: '/en/topics/edge-ai-intro' }, { text: 'Embodied AI Intro (LeRobot)', link: '/en/topics/embodied-ai-intro' }, { text: 'Robot Learning', link: '/en/topics/robot-learning/' }] },
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
      '/en/products/': [
        { text: 'Products', items: [
          { text: 'Jetson Orin NX Super Dev Kit', link: '/en/products/jetson-orin-nx-super-kit' },
          { text: '3D RealSense Depth Camera', link: '/en/products/realsense-depth-camera' },
          { text: 'Bus Servo Driver Board', link: '/en/products/servo-driver-board' },
          { text: 'GPS & BeiDou GNSS Module', link: '/en/products/gps-beidou-module' },
          { text: 'ESP32-S3 WiFi Video Module', link: '/en/products/esp32-s3-wifi-module' },
          { text: 'SO-ARM101 TPU Flexible Gripper', link: '/en/products/tpu-flexible-gripper' },
          { text: 'SO-ARM101 Robot Vision Kit', link: '/en/products/robot-vision-kit' },
          { text: 'SO-ARM101 Developer Kit', link: '/en/products/so-arm101' },
          { text: 'AmazingHand Dexterous Hand', link: '/en/products/amazinghand' },
          { text: 'Lekiwi Mobile Robot', link: '/en/products/lekiwi' },
          { text: '2-DOF Servo Pan-Tilt Unit', link: '/en/products/2dof-gimbal' },
          { text: 'KWS Voice Module', link: '/en/products/kws-voice-module' },
          { text: 'IMU Module', link: '/en/products/imu-module' },
          { text: '79\u00b0 IMX219 CSI Camera', link: '/en/products/imx219-csi-camera' },
          { text: 'Feetech Bus Servos', link: '/en/products/feetech-servo' },
          { text: '4-in-1 KVM Switch', link: '/en/products/kvm-switch' },
          { text: 'USB Sound Card', link: '/en/products/usb-sound-card' },
          { text: '4K HDMI Capture', link: '/en/products/4k-hdmi-capture' },
          { text: 'Overhead Camera Mount', link: '/en/products/overhead-camera-mount' },
        ] },
      ],
      '/en/downloads/': [
        { text: 'Downloads', items: [{ text: 'Download Center', link: '/en/downloads/' }] },
      ],
      '/en/about/': [
        { text: 'About', items: [{ text: 'About Us', link: '/en/about/' }] },
      ],
      '/en/changelog/': [
        { text: 'Updates', items: [{ text: 'Changelog', link: '/en/changelog/' }] },
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
      { text: '下載', link: '/zh-HK/downloads/', activeMatch: '/zh-HK/downloads/' },
      { text: '關於我們', link: '/zh-HK/about/', activeMatch: '/zh-HK/about/' },
      { text: '更新日誌', link: '/zh-HK/changelog/', activeMatch: '/zh-HK/changelog/' },
    ],
    sidebar: {
      '/zh-HK/tutorials/': [
        {
          text: '快速開始',
          items: [
            { text: '常見問題 FAQ', link: '/zh-HK/tutorials/faq' },
            { text: 'ROS 入門', link: '/zh-HK/tutorials/ros-intro' },
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
                { text: '選型指南', link: '/zh-HK/tutorials/robot-arms/select-guide' },
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
        { text: '技術專題', items: [{ text: '專題首頁', link: '/zh-HK/topics/' }, { text: 'JetPack 刷機與系統配置', link: '/zh-HK/topics/jetpack-setup' }, { text: '邊緣 AI 部署入門', link: '/zh-HK/topics/edge-ai-intro' }, { text: '具身智能入門（LeRobot）', link: '/zh-HK/topics/embodied-ai-intro' }, { text: '機器人學習', link: '/zh-HK/topics/robot-learning/' }] },
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
      '/zh-HK/products/': [
        { text: '產品', items: [
          { text: 'Jetson Orin NX Super 開發套件', link: '/zh-HK/products/jetson-orin-nx-super-kit' },
          { text: '3D RealSense 深度相機', link: '/zh-HK/products/realsense-depth-camera' },
          { text: '總線舵機驅動板', link: '/zh-HK/products/servo-driver-board' },
          { text: 'GPS & 北斗 GNSS 定位模組', link: '/zh-HK/products/gps-beidou-module' },
          { text: 'ESP32-S3 WiFi 視頻模組', link: '/zh-HK/products/esp32-s3-wifi-module' },
          { text: 'SO-ARM101 TPU 柔性夾爪', link: '/zh-HK/products/tpu-flexible-gripper' },
          { text: 'SO-ARM101 機械臂視覺套件', link: '/zh-HK/products/robot-vision-kit' },
          { text: 'SO-ARM101 開發套件', link: '/zh-HK/products/so-arm101' },
          { text: 'AmazingHand 開源靈巧手', link: '/zh-HK/products/amazinghand' },
          { text: 'Lekiwi 具身智能移動機器人', link: '/zh-HK/products/lekiwi' },
          { text: '2 自由度舵機雲台', link: '/zh-HK/products/2dof-gimbal' },
          { text: 'KWS 語音交互模組', link: '/zh-HK/products/kws-voice-module' },
          { text: 'IMU 高精度慣導模組', link: '/zh-HK/products/imu-module' },
          { text: '79\u00b0 IMX219 CSI 攝像頭', link: '/zh-HK/products/imx219-csi-camera' },
          { text: 'Feetech 總線舵機', link: '/zh-HK/products/feetech-servo' },
          { text: '4 合 1 KVM 切換器', link: '/zh-HK/products/kvm-switch' },
          { text: 'USB 免驅聲卡', link: '/zh-HK/products/usb-sound-card' },
          { text: '4K HDMI 採集卡', link: '/zh-HK/products/4k-hdmi-capture' },
          { text: 'SO-ARM101 頂置相機支架', link: '/zh-HK/products/overhead-camera-mount' },
        ] },
      ],
      '/zh-HK/downloads/': [
        { text: '下載', items: [{ text: '下載中心', link: '/zh-HK/downloads/' }] },
      ],
      '/zh-HK/about/': [
        { text: '關於', items: [{ text: '關於我們', link: '/zh-HK/about/' }] },
      ],
      '/zh-HK/changelog/': [
        { text: '更新', items: [{ text: '更新日誌', link: '/zh-HK/changelog/' }] },
      ],
    },
  },
}

export default defineConfig({
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
    root: zhCN,
    en,
    'zh-HK': zhHK,

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
        '/ja/tutorials/': [{ text: 'チュートリアル', items: [{ text: 'チュートリアル', link: '/ja/tutorials/' }] }],
        '/ja/topics/': [{ text: 'トピック', items: [{ text: 'トピック', link: '/ja/topics/' }] }],
        '/ja/tech/': [{ text: '技術ドキュメント', items: [{ text: '技術ドキュメント', link: '/ja/tech/' }] }],
        '/ja/community/': [{ text: 'コミュニティ', items: [{ text: 'コミュニティ', link: '/ja/community/' }] }],
        '/ja/products/': [
          { text: '製品', items: [
            { text: 'SO-ARM101 開発キット', link: '/ja/products/so-arm101' },
            { text: 'AmazingHand 器用ハンド', link: '/ja/products/amazinghand' },
            { text: 'Jetson Orin NX Super 開発キット', link: '/ja/products/jetson-orin-nx-super-kit' },
            { text: 'IMU 慣性ナビゲーションモジュール', link: '/ja/products/imu-module' },
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
        '/ko/tutorials/': [{ text: '튜토리얼', items: [{ text: '튜토리얼', link: '/ko/tutorials/' }] }],
        '/ko/topics/': [{ text: '토픽', items: [{ text: '토픽', link: '/ko/topics/' }] }],
        '/ko/tech/': [{ text: '기술 문서', items: [{ text: '기술 문서', link: '/ko/tech/' }] }],
        '/ko/community/': [{ text: '커뮤니티', items: [{ text: '커뮤니티', link: '/ko/community/' }] }],
        '/ko/products/': [
          { text: '제품', items: [
            { text: 'SO-ARM101 개발 키트', link: '/ko/products/so-arm101' },
            { text: 'AmazingHand 로봇 손', link: '/ko/products/amazinghand' },
            { text: 'Jetson Orin NX Super 개발 키트', link: '/ko/products/jetson-orin-nx-super-kit' },
            { text: 'IMU 관성 모듈', link: '/ko/products/imu-module' },
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
        '/de/tutorials/': [{ text: 'Tutorials', items: [{ text: 'Tutorials', link: '/de/tutorials/' }] }],
        '/de/topics/': [{ text: 'Themen', items: [{ text: 'Themen', link: '/de/topics/' }] }],
        '/de/tech/': [{ text: 'Technische Doku', items: [{ text: 'Technische Doku', link: '/de/tech/' }] }],
        '/de/community/': [{ text: 'Community', items: [{ text: 'Community', link: '/de/community/' }] }],
        '/de/products/': [
          { text: 'Produkte', items: [
            { text: 'SO-ARM101 Entwickler-Kit', link: '/de/products/so-arm101' },
            { text: 'AmazingHand Robotikhand', link: '/de/products/amazinghand' },
            { text: 'Jetson Orin NX Super Dev-Kit', link: '/de/products/jetson-orin-nx-super-kit' },
            { text: 'IMU-Trägheitsmodul', link: '/de/products/imu-module' },
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
        '/fr/tutorials/': [{ text: 'Tutoriels', items: [{ text: 'Tutoriels', link: '/fr/tutorials/' }] }],
        '/fr/topics/': [{ text: 'Sujets', items: [{ text: 'Sujets', link: '/fr/topics/' }] }],
        '/fr/tech/': [{ text: 'Documentation', items: [{ text: 'Documentation', link: '/fr/tech/' }] }],
        '/fr/community/': [{ text: 'Communauté', items: [{ text: 'Communauté', link: '/fr/community/' }] }],
        '/fr/products/': [
          { text: 'Produits', items: [
            { text: 'Kit développeur SO-ARM101', link: '/fr/products/so-arm101' },
            { text: 'Main robotique AmazingHand', link: '/fr/products/amazinghand' },
            { text: 'Kit Jetson Orin NX Super', link: '/fr/products/jetson-orin-nx-super-kit' },
            { text: 'Module inertiel IMU', link: '/fr/products/imu-module' },
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
        '/es/tutorials/': [{ text: 'Tutoriales', items: [{ text: 'Tutoriales', link: '/es/tutorials/' }] }],
        '/es/topics/': [{ text: 'Temas', items: [{ text: 'Temas', link: '/es/topics/' }] }],
        '/es/tech/': [{ text: 'Documentación', items: [{ text: 'Documentación', link: '/es/tech/' }] }],
        '/es/community/': [{ text: 'Comunidad', items: [{ text: 'Comunidad', link: '/es/community/' }] }],
        '/es/products/': [
          { text: 'Productos', items: [
            { text: 'Kit desarrollador SO-ARM101', link: '/es/products/so-arm101' },
            { text: 'Mano robótica AmazingHand', link: '/es/products/amazinghand' },
            { text: 'Kit Jetson Orin NX Super', link: '/es/products/jetson-orin-nx-super-kit' },
            { text: 'Módulo inercial IMU', link: '/es/products/imu-module' },
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
        '/it/tutorials/': [{ text: 'Tutorial', items: [{ text: 'Tutorial', link: '/it/tutorials/' }] }],
        '/it/topics/': [{ text: 'Argomenti', items: [{ text: 'Argomenti', link: '/it/topics/' }] }],
        '/it/tech/': [{ text: 'Documentazione', items: [{ text: 'Documentazione', link: '/it/tech/' }] }],
        '/it/community/': [{ text: 'Community', items: [{ text: 'Community', link: '/it/community/' }] }],
        '/it/products/': [
          { text: 'Prodotti', items: [
            { text: 'Kit sviluppatore SO-ARM101', link: '/it/products/so-arm101' },
            { text: 'Mano robotica AmazingHand', link: '/it/products/amazinghand' },
            { text: 'Kit Jetson Orin NX Super', link: '/it/products/jetson-orin-nx-super-kit' },
            { text: 'Modulo inerziale IMU', link: '/it/products/imu-module' },
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
    footer: {
      message: 'Juxi Technology',
      copyright: '© 2026 Juxi Technology',
    },
  },
  // 结构化数据:每页注入 JSON-LD(首页 Organization,其余 Article)
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
      ['script', { type: 'application/ld+json' }, JSON.stringify(ld)],
    ]
  },
})
