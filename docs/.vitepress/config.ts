import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'

// FAQ 页 → FAQPage JSON-LD:构建期解析各语 tutorials/faq.md 的 Q/A 对
// (格式: **Q: xxx?** / **A:** yyy;fr 为 **Q :** 与 **A :**,正则兼容空白)
function buildFaqPageLd(relativePath: string) {
  if (!/tutorials\/faq\.md$/.test(relativePath)) return null
  const file = path.join(process.cwd(), 'docs/content', relativePath)
  if (!fs.existsSync(file)) return null
  const src = fs.readFileSync(file, 'utf8')
  const segs = src.split(/\*\*Q\s*:/).slice(1)
  const mainEntity = []
  for (const seg of segs) {
    const q = seg.split('**')[0].replace(/\s*\?+\s*$/, '').trim()
    const am = seg.match(/\*\*A\s*:\*\*\s*([\s\S]*?)(?=\n\*\*Q\s*:|\n---|$)/)
    if (!am) continue
    const a = am[1]
      // 答案清洗为纯文本:markdown 链接保留文字、列表记号/行内代码去掉、压缩空白
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/^\s*[-*]\s+/gm, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\s*\n+\s*/g, ' ')
      .trim()
    if (!q || !a) continue
    mainEntity.push({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })
  }
  if (!mainEntity.length) return null
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity }
}

// 面包屑段名(与 theme/components/Breadcrumb.vue 同源;lang 值同 config lang)
const SEG_NAMES: Record<string, Record<string, string>> = {
  tutorials: { 'zh-CN': '教程', en: 'Tutorials', 'zh-HK': '教程', ja: 'チュートリアル', ko: '튜토리얼', de: 'Tutorials', fr: 'Tutoriels', es: 'Tutoriales', it: 'Tutorial', pt: 'Tutoriais' },
  products: { 'zh-CN': '产品', en: 'Products', 'zh-HK': '產品', ja: '製品', ko: '제품', de: 'Produkte', fr: 'Produits', es: 'Productos', it: 'Prodotti', pt: 'Produtos' },
  topics: { 'zh-CN': '技术专题', en: 'Topics', 'zh-HK': '技術專題', ja: 'トピック', ko: '토픽', de: 'Themen', fr: 'Sujets', es: 'Temas', it: 'Argomenti', pt: 'Tópicos' },
  tech: { 'zh-CN': '技术文档', en: 'Tech Docs', 'zh-HK': '技術文件', ja: '技術ドキュメント', ko: '기술 문서', de: 'Technikdoku', fr: 'Documentation tech', es: 'Docs técnicos', it: 'Documentazione', pt: 'Docs Técnicos' },
  cases: { 'zh-CN': '用户案例', en: 'Cases', 'zh-HK': '用戶案例', ja: '事例', ko: '사례', de: 'Fälle', fr: 'Cas', es: 'Casos', it: 'Casi', pt: 'Casos' },
  community: { 'zh-CN': '社区', en: 'Community', 'zh-HK': '社區', ja: 'コミュニティ', ko: '커뮤니티', de: 'Community', fr: 'Communauté', es: 'Comunidad', it: 'Community', pt: 'Comunidade' },
  downloads: { 'zh-CN': '下载', en: 'Downloads', 'zh-HK': '下載', ja: 'ダウンロード', ko: '다운로드', de: 'Downloads', fr: 'Téléchargements', es: 'Descargas', it: 'Download', pt: 'Downloads' },
  about: { 'zh-CN': '关于我们', en: 'About', 'zh-HK': '關於我們', ja: '私たちについて', ko: '소개', de: 'Über uns', fr: 'À propos', es: 'Sobre nosotros', it: 'Chi siamo', pt: 'Sobre' },
}
const HOME_NAMES: Record<string, string> = { 'zh-CN': '首页', en: 'Home', 'zh-HK': '首頁', ja: 'ホーム', ko: '홈', de: 'Start', fr: 'Accueil', es: 'Inicio', it: 'Home', pt: 'Início' }

// 语言目录 → config lang 值(PageData 没有 lang 字段,须由 relativePath 推导)
const LANG_CODE: Record<string, string> = { 'zh-hans': 'zh-CN', 'zh-hant': 'zh-HK', ja: 'ja', ko: 'ko', de: 'de', fr: 'fr', es: 'es', it: 'it', 'pt-br': 'pt-BR', 'pt-pt': 'pt-PT' }

// Open Graph locale(og:locale 标准格式 language_TERRITORY)
const OG_LOCALE: Record<string, string> = { en: 'en_US', 'zh-CN': 'zh_CN', 'zh-HK': 'zh_HK', ja: 'ja_JP', ko: 'ko_KR', de: 'de_DE', fr: 'fr_FR', es: 'es_ES', it: 'it_IT', 'pt-BR': 'pt_BR', 'pt-PT': 'pt_PT' }
function langOf(relativePath: string) {
  return LANG_CODE[relativePath.split('/')[0]] || 'en'
}

// 面包屑 JSON-LD:按 URL 段生成(站点根 → 各段 → 当前页),skip 首页;
// 中间段名按当前语言映射,item 保留语言前缀(否则 zh 页面面包屑指向 en URL)
function buildBreadcrumbLd(url: string, title: string, lang: string) {
  if (url === '/' || url === '') return null
  const segs = url.split('/').filter(Boolean)
  const LANG_SEGS = ['zh-hans', 'zh-hant', 'ja', 'ko', 'de', 'fr', 'es', 'it', 'pt-br', 'pt-pt']
  const langSeg = LANG_SEGS.includes(segs[0]) ? segs.shift() : ''
  if (!segs.length) return null
  const items = [{ '@type': 'ListItem', position: 1, name: HOME_NAMES[lang] || 'Home', item: 'https://wiki.juxitech.com/' }]
  let acc = ''
  for (let i = 0; i < segs.length; i++) {
    acc += '/' + segs[i]
    const name = i === segs.length - 1 ? title : (SEG_NAMES[segs[i]]?.[lang] || segs[i])
    // 最后一项必须等于页面自身 URL(canonical):url 参数保留尾斜杠(index 页 /about/)
    const item = i === segs.length - 1 ? 'https://wiki.juxitech.com' + url
      : 'https://wiki.juxitech.com' + (langSeg ? '/' + langSeg : '') + acc
    items.push({ '@type': 'ListItem', position: i + 2, name, item })
  }
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }
}

// 全局 head:SEO 基础标签(baidu 验证 + Open Graph + Twitter Card)
// canonical 不在此处:逐页 unique canonical 由 transformHead 生成(此前钉死首页导致全站声明首页)
const globalHead = [
  ['meta', { name: 'baidu-site-verification', content: 'codeva-Lzl2d4xzcv' }],
  // favicon 复用现有 logo(此前缺失,浏览器访问会 404;PNG 可直接作 favicon)
  ['link', { rel: 'icon', type: 'image/png', href: '/images/logos/logo-black.png' }],
  ['link', { rel: 'apple-touch-icon', href: '/images/logos/logo-black.png' }],
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:site_name', content: '钜犀科技 Wiki' }],
  ['meta', { property: 'og:image', content: 'https://wiki.juxitech.com/images/logos/logo-black.png' }],
  ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ['meta', { name: 'robots', content: 'index, follow' }],
  // 百度统计:默认占位 ID 时 no-op(不发请求);替换 JUXI_BAIDU_ID 为真实统计 ID 后生效
  ['script', {}, `(function(){
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;
    var JUXI_BAIDU_ID = 'YOUR_BAIDU_ID';
    if (JUXI_BAIDU_ID === 'YOUR_BAIDU_ID') return;
    var _hmt = _hmt || [];
    var hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?' + JUXI_BAIDU_ID;
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
  ],
  themeConfig: {
    siteTitle: '钜犀科技 Wiki',
    nav: [
      { text: '教程', link: '/zh-hans/tutorials/', activeMatch: '/zh-hans/tutorials/' },
      { text: '技术专题', link: '/zh-hans/topics/', activeMatch: '/zh-hans/topics/' },
      { text: '技术文档', link: '/zh-hans/tech/', activeMatch: '/zh-hans/tech/' },
      { text: '产品', link: '/zh-hans/products/', activeMatch: '/zh-hans/products/' },
      { text: '用户案例', link: '/zh-hans/cases/', activeMatch: '/zh-hans/cases/' },
      { text: '社区', link: '/zh-hans/community/', activeMatch: '/zh-hans/community/' },
      { text: '下载', link: '/zh-hans/downloads/', activeMatch: '/zh-hans/downloads/' },
      { text: '关于我们', link: '/zh-hans/about/', activeMatch: '/zh-hans/about/' },
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
                { text: 'IMU 校准', link: '/zh-hans/tutorials/sensors/imu/calibration' },
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
        { text: '机器人', items: [
          { text: '总线舵机驱动板', link: '/zh-hans/products/servo-driver-board' },
          { text: 'SO-ARM101 TPU 柔性夹爪', link: '/zh-hans/products/tpu-flexible-gripper' },
          { text: 'SO-ARM101 机械臂视觉套件', link: '/zh-hans/products/robot-vision-kit' },
          { text: 'SO-ARM101 开发套件', link: '/zh-hans/products/so-arm101' },
          { text: 'AmazingHand 开源 4 指灵巧手', link: '/zh-hans/products/amazinghand' },
          { text: 'Lekiwi 具身智能移动机器人', link: '/zh-hans/products/lekiwi' },
          { text: 'SO-ARM101 顶置相机支架', link: '/zh-hans/products/overhead-camera-mount' },
        ] },
        { text: '计算与视觉', items: [
          { text: 'Jetson Orin NX Super 开发套件', link: '/zh-hans/products/jetson-orin-nx-super-kit' },
          { text: '3D RealSense 深度相机', link: '/zh-hans/products/realsense-depth-camera' },
          { text: 'ESP32-S3 WiFi 视频模块', link: '/zh-hans/products/esp32-s3-wifi-module' },
          { text: '79\u00b0 IMX219 CSI 摄像头', link: '/zh-hans/products/imx219-csi-camera' },
        ] },
        { text: '传感器', items: [
          { text: 'GPS & 北斗 GNSS 定位模块', link: '/zh-hans/products/gps-beidou-module' },
          { text: 'IMU 高精度惯导模块', link: '/zh-hans/products/imu-module' },
        ] },
        { text: '配件', items: [
          { text: '2 自由度舵机云台', link: '/zh-hans/products/2dof-gimbal' },
          { text: 'KWS 语音交互模块', link: '/zh-hans/products/kws-voice-module' },
          { text: 'Feetech 总线舵机', link: '/zh-hans/products/feetech-servo' },
          { text: '4 合 1 KVM 切换器', link: '/zh-hans/products/kvm-switch' },
          { text: 'USB 免驱声卡', link: '/zh-hans/products/usb-sound-card' },
          { text: '4K HDMI 采集卡', link: '/zh-hans/products/4k-hdmi-capture' },
        ] },
      ],
      '/zh-hans/downloads/': [
        { text: '下载', items: [{ text: '下载中心', link: '/zh-hans/downloads/' }] },
      ],
      '/zh-hans/about/': [
        { text: '关于', items: [{ text: '关于我们', link: '/zh-hans/about/' }] },
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
  ],
  themeConfig: {
    siteTitle: 'Juxi Technology Wiki',
    nav: [
      { text: 'Tutorials', link: '/tutorials/', activeMatch: '/tutorials/' },
      { text: 'Topics', link: '/topics/', activeMatch: '/topics/' },
      { text: 'Tech Docs', link: '/tech/', activeMatch: '/tech/' },
      { text: 'Products', link: '/products/', activeMatch: '/products/' },
      { text: 'Cases', link: '/cases/', activeMatch: '/cases/' },
      { text: 'Community', link: '/community/', activeMatch: '/community/' },
      { text: 'Downloads', link: '/downloads/', activeMatch: '/downloads/' },
      { text: 'About', link: '/about/', activeMatch: '/about/' },
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
                { text: 'IMU Calibration', link: '/tutorials/sensors/imu/calibration' },
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
                    { text: 'ROS1 Application', link: '/tutorials/sensors/imu/ros-examples/ros1' },
                    { text: 'ROS2 Application', link: '/tutorials/sensors/imu/ros-examples/ros2' },
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
        { text: 'Robots', items: [
          { text: 'Bus Servo Driver Board', link: '/products/servo-driver-board' },
          { text: 'SO-ARM101 TPU Flexible Gripper', link: '/products/tpu-flexible-gripper' },
          { text: 'SO-ARM101 Robot Vision Kit', link: '/products/robot-vision-kit' },
          { text: 'SO-ARM101 Developer Kit', link: '/products/so-arm101' },
          { text: 'AmazingHand 4-Finger Dexterous Hand', link: '/products/amazinghand' },
          { text: 'Lekiwi Mobile Robot', link: '/products/lekiwi' },
          { text: 'Overhead Camera Mount', link: '/products/overhead-camera-mount' },
        ] },
        { text: 'Compute & Vision', items: [
          { text: 'Jetson Orin NX Super Dev Kit', link: '/products/jetson-orin-nx-super-kit' },
          { text: '3D RealSense Depth Camera', link: '/products/realsense-depth-camera' },
          { text: 'ESP32-S3 WiFi Video Module', link: '/products/esp32-s3-wifi-module' },
          { text: '79\u00b0 IMX219 CSI Camera', link: '/products/imx219-csi-camera' },
        ] },
        { text: 'Sensors', items: [
          { text: 'GPS & BeiDou GNSS Module', link: '/products/gps-beidou-module' },
          { text: 'IMU Module', link: '/products/imu-module' },
        ] },
        { text: 'Accessories', items: [
          { text: '2-DOF Servo Pan-Tilt Unit', link: '/products/2dof-gimbal' },
          { text: 'KWS Voice Module', link: '/products/kws-voice-module' },
          { text: 'Feetech Bus Servos', link: '/products/feetech-servo' },
          { text: '4-in-1 KVM Switch', link: '/products/kvm-switch' },
          { text: 'USB Sound Card', link: '/products/usb-sound-card' },
          { text: '4K HDMI Capture', link: '/products/4k-hdmi-capture' },
        ] },
      ],
      '/downloads/': [
        { text: 'Downloads', items: [{ text: 'Download Center', link: '/downloads/' }] },
      ],
      '/about/': [
        { text: 'About', items: [{ text: 'About Us', link: '/about/' }] },
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
  ],
  themeConfig: {
    siteTitle: '鉅犀科技 Wiki',
    nav: [
      { text: '教程', link: '/zh-hant/tutorials/', activeMatch: '/zh-hant/tutorials/' },
      { text: '技術專題', link: '/zh-hant/topics/', activeMatch: '/zh-hant/topics/' },
      { text: '技術文檔', link: '/zh-hant/tech/', activeMatch: '/zh-hant/tech/' },
      { text: '產品', link: '/zh-hant/products/', activeMatch: '/zh-hant/products/' },
      { text: '用戶案例', link: '/zh-hant/cases/', activeMatch: '/zh-hant/cases/' },
      { text: '社區', link: '/zh-hant/community/', activeMatch: '/zh-hant/community/' },
      { text: '下載', link: '/zh-hant/downloads/', activeMatch: '/zh-hant/downloads/' },
      { text: '關於我們', link: '/zh-hant/about/', activeMatch: '/zh-hant/about/' },
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
                { text: 'IMU 校準', link: '/zh-hant/tutorials/sensors/imu/calibration' },
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
        { text: '機器人', items: [
          { text: '總線舵機驅動板', link: '/zh-hant/products/servo-driver-board' },
          { text: 'SO-ARM101 TPU 柔性夾爪', link: '/zh-hant/products/tpu-flexible-gripper' },
          { text: 'SO-ARM101 機械臂視覺套件', link: '/zh-hant/products/robot-vision-kit' },
          { text: 'SO-ARM101 開發套件', link: '/zh-hant/products/so-arm101' },
          { text: 'AmazingHand 開源 4 指靈巧手', link: '/zh-hant/products/amazinghand' },
          { text: 'Lekiwi 具身智能移動機器人', link: '/zh-hant/products/lekiwi' },
          { text: 'SO-ARM101 頂置相機支架', link: '/zh-hant/products/overhead-camera-mount' },
        ] },
        { text: '計算與視覺', items: [
          { text: 'Jetson Orin NX Super 開發套件', link: '/zh-hant/products/jetson-orin-nx-super-kit' },
          { text: '3D RealSense 深度相機', link: '/zh-hant/products/realsense-depth-camera' },
          { text: 'ESP32-S3 WiFi 視頻模組', link: '/zh-hant/products/esp32-s3-wifi-module' },
          { text: '79\u00b0 IMX219 CSI 攝像頭', link: '/zh-hant/products/imx219-csi-camera' },
        ] },
        { text: '傳感器', items: [
          { text: 'GPS & 北斗 GNSS 定位模組', link: '/zh-hant/products/gps-beidou-module' },
          { text: 'IMU 高精度慣導模組', link: '/zh-hant/products/imu-module' },
        ] },
        { text: '配件', items: [
          { text: '2 自由度舵機雲台', link: '/zh-hant/products/2dof-gimbal' },
          { text: 'KWS 語音交互模組', link: '/zh-hant/products/kws-voice-module' },
          { text: 'Feetech 總線舵機', link: '/zh-hant/products/feetech-servo' },
          { text: '4 合 1 KVM 切換器', link: '/zh-hant/products/kvm-switch' },
          { text: 'USB 免驅聲卡', link: '/zh-hant/products/usb-sound-card' },
          { text: '4K HDMI 採集卡', link: '/zh-hant/products/4k-hdmi-capture' },
        ] },
      ],
      '/zh-hant/downloads/': [
        { text: '下載', items: [{ text: '下載中心', link: '/zh-hant/downloads/' }] },
      ],
      '/zh-hant/about/': [
        { text: '關於', items: [{ text: '關於我們', link: '/zh-hant/about/' }] },
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

const LANG_PREFIX_RE = /^\/(zh-hans|zh-hant|ja|ko|de|fr|es|it|pt-br|pt-pt)(?=\/|$)/
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

// ---- hreflang:注入 11 语言 alternate + x-default(多语 SEO 必备)----
const HREFLANG_LANGS = ['', 'zh-hans', 'zh-hant', 'ja', 'ko', 'de', 'fr', 'es', 'it', 'pt-br', 'pt-pt']

// PageData 没有 url 字段(types/shared.d.ts),必须由 relativePath 推导站点路径;
// 此前用 pageData.url 取到 undefined → hreflang 全部错指站点根(多语 SEO 失效)
function pageUrlOf(relativePath: string) {
  if (relativePath === 'index.md') return '/'
  let p = relativePath.replace(/\.md$/, '')
  // index 页的真实 URL 是目录路径(带尾斜杠),hreflang 目标必须精确匹配
  if (p.endsWith('/index')) p = p.slice(0, -6) + '/'
  return '/' + p
}

function injectHreflang(pageData: { relativePath: string }) {
  const u = pageUrlOf(pageData.relativePath)
  const seg = u.split('/')[1]
  const hasLang = HREFLANG_LANGS.includes(seg)
  const core = hasLang ? '/' + u.split('/').slice(2).join('/') : u
  const seen = new Set()
  const heads = HREFLANG_LANGS.map((l) => {
    const href = 'https://wiki.juxitech.com' + (l ? '/' + l : '') + core
    const langCode = l === '' ? 'en' : (l === 'zh-hans' ? 'zh-Hans' : l === 'zh-hant' ? 'zh-HK' : l === 'pt-br' ? 'pt-BR' : l === 'pt-pt' ? 'pt-PT' : l)
    return ['link', { rel: 'alternate', hreflang: langCode, href: href }]
  }).concat([['link', { rel: 'alternate', hreflang: 'x-default', href: 'https://wiki.juxitech.com' + core }]])
  return heads
}

export default defineConfig({
  srcDir: 'content',
  vite: {
    publicDir: 'public',
  },
  // 正文图片懒加载:SSR 阶段给 markdown 图片注入 loading="lazy" + decoding="async",
  // 视口外图片滚动到才下载(教程页 29 图不再一次性全下)
  markdown: {
    config(md) {
      const defaultImage = md.renderer.rules.image
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        token.attrSet('loading', 'lazy')
        token.attrSet('decoding', 'async')
        return defaultImage(tokens, idx, options, env, self)
      }
    },
  },
  lang: 'zh-CN',
  title: '钜犀科技 Wiki',
  description: '钜犀科技产品教程与文档中心',
  base: '/',
  // 内置 sitemap 生成:从构建页面自动产出 sitemap.xml(hostname 用线上域名)
  // 取代原手工维护的 public/sitemap.xml(内容增删会脱节)
  sitemap: {
    hostname: 'https://wiki.juxitech.com',
  },
  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  // public/ 下的 .md 是历史遗留占位/草稿(飞书链接),不应渲染为页面
  srcExclude: [
    'public/**/*.md',
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
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      nav: [
        { text: 'チュートリアル', link: '/ja/tutorials/', activeMatch: '/ja/tutorials/' },
        { text: 'トピック', link: '/ja/topics/', activeMatch: '/ja/topics/' },
        { text: '技術ドキュメント', link: '/ja/tech/', activeMatch: '/ja/tech/' },
        { text: '製品', link: '/ja/products/', activeMatch: '/ja/products/' },
        { text: 'ケーススタディ', link: '/ja/cases/', activeMatch: '/ja/cases/' },
        { text: 'コミュニティ', link: '/ja/community/', activeMatch: '/ja/community/' },
        { text: 'ダウンロード', link: '/ja/downloads/', activeMatch: '/ja/downloads/' },
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
            { text: 'Lark Wiki', link: '/ja/tutorials/lark-wiki' },
          ] },
          { text: '学習リソース', items: [
            { text: '学習リソース', link: '/ja/tutorials/learning-resources/' },
            { text: 'クイックスタート', link: '/ja/tutorials/learning-resources/getting-started' },
            { text: 'ハードウェア接続', link: '/ja/tutorials/learning-resources/hardware-setup' },
            { text: 'ソフトウェア設定', link: '/ja/tutorials/learning-resources/software-config' },
            { text: 'Jetson Orin での PyTorch 非互換問題', link: '/ja/tutorials/learning-resources/jetson-orin-pytorch-compatibility' },
          ] },
          { text: 'ロボットアーム', items: [
            { text: 'ロボットアームシリーズ', link: '/ja/tutorials/robot-arms/' },
            { text: '選定ガイド', link: '/ja/tutorials/robot-arms/select-guide' },
            {
              text: 'SO-ARM101 シリーズ',
              collapsed: false,
              items: [
                { text: 'LeRobot ロボットアームチュートリアル', link: '/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                { text: 'Lerobot ロボットアーム組立ガイド', link: '/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                { text: 'Jetson Orin での PyTorch 非互換問題', link: '/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                { text: 'SO-ARM100&101 アーム搭載ブラケットと環境カメラキット 取付チュートリアル', link: '/ja/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                { text: 'オーバーヘッドカメラマウント取付ガイド', link: '/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: 'ロボットハンド インターフェース制御', link: '/ja/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: '器用ハンド公式サンプル実行チュートリアル', link: '/ja/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: '器用ハンド（TTL シリアルサーボ）デバッグチュートリアル', link: '/ja/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
              ],
            },
            {
              text: 'Lekiwi',
              collapsed: true,
              items: [
                { text: 'Lekiwi 移動ロボット使用チュートリアル', link: '/ja/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial' },
                { text: 'Lekiwi 移動ロボット組み立てチュートリアル', link: '/ja/tutorials/robot-arms/lekiwi/Lekiwi-Assembly' },
              ],
            },
          ] },
          { text: 'センサー', items: [
            { text: 'センサーと知覚', link: '/ja/tutorials/sensors/' },
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
            { text: 'ロボットアクセサリ', link: '/ja/tutorials/accessories/' },
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
        '/ja/topics/': [{ text: 'トピック', items: [{ text: 'トピック', link: '/ja/topics/' }, { text: 'JetPack フラッシングとシステム設定', link: '/ja/topics/jetpack-setup' }, { text: 'エッジ AI 導入入門', link: '/ja/topics/edge-ai-intro' }, { text: '具身知能入門（LeRobot）', link: '/ja/topics/embodied-ai-intro' }, { text: 'ロボット学習特集', link: '/ja/topics/robot-learning/' }, { text: 'オープンソースハードウェアの理念', link: '/ja/topics/open-source-hardware' }] }],
        '/ja/tech/': [{ text: '技術ドキュメント', items: [{ text: '技術ドキュメント', link: '/ja/tech/' }, { text: 'API リファレンス', link: '/ja/tech/api-reference' }, { text: '開発ガイド', link: '/ja/tech/dev-guide' }] }],
        '/ja/community/': [{ text: 'コミュニティ', items: [{ text: 'コミュニティ', link: '/ja/community/' }, { text: '貢献ガイド', link: '/ja/community/contributing' }] }],
        '/ja/cases/': [{ text: 'ケーススタディ', items: [{ text: 'ユーザー成功事例', link: '/ja/cases/' }] }],
        '/ja/products/': [
          { text: 'ロボット', items: [
            { text: 'SO-ARM101 開発キット', link: '/ja/products/so-arm101' },
            { text: 'AmazingHand 4指器用ハンド', link: '/ja/products/amazinghand' },
            { text: 'バスサーボドライバ基板', link: '/ja/products/servo-driver-board' },
            { text: 'SO-ARM101 TPU フレキシブルグリッパー', link: '/ja/products/tpu-flexible-gripper' },
            { text: 'SO-ARM101 ロボットビジョンキット', link: '/ja/products/robot-vision-kit' },
            { text: 'Lekiwi 具身知能移動ロボット', link: '/ja/products/lekiwi' },
            { text: 'SO-ARM101 頭上カメラマウント', link: '/ja/products/overhead-camera-mount' },
          ] },
          { text: '計算とビジョン', items: [
            { text: 'Jetson Orin NX Super 開発キット', link: '/ja/products/jetson-orin-nx-super-kit' },
            { text: 'ESP32-S3 WiFi 映像モジュール', link: '/ja/products/esp32-s3-wifi-module' },
            { text: '79° IMX219 CSI カメラ', link: '/ja/products/imx219-csi-camera' },
            { text: '3D RealSense 深度カメラ', link: '/ja/products/realsense-depth-camera' },
          ] },
          { text: 'センサー', items: [
            { text: 'IMU 慣性ナビゲーションモジュール', link: '/ja/products/imu-module' },
            { text: 'GPS & 北斗 GNSS 測位モジュール', link: '/ja/products/gps-beidou-module' },
          ] },
          { text: 'アクセサリー', items: [
            { text: '2自由度サーボジンバル', link: '/ja/products/2dof-gimbal' },
            { text: 'KWS 音声対話モジュール', link: '/ja/products/kws-voice-module' },
            { text: 'Feetech バスサーボ', link: '/ja/products/feetech-servo' },
            { text: '4 in 1 KVM スイッチ', link: '/ja/products/kvm-switch' },
            { text: 'USB ドライバ不要サウンドカード', link: '/ja/products/usb-sound-card' },
            { text: '4K HDMI キャプチャカード', link: '/ja/products/4k-hdmi-capture' },
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
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      nav: [
        { text: '튜토리얼', link: '/ko/tutorials/', activeMatch: '/ko/tutorials/' },
        { text: '토픽', link: '/ko/topics/', activeMatch: '/ko/topics/' },
        { text: '기술 문서', link: '/ko/tech/', activeMatch: '/ko/tech/' },
        { text: '제품', link: '/ko/products/', activeMatch: '/ko/products/' },
        { text: '사용자 사례', link: '/ko/cases/', activeMatch: '/ko/cases/' },
        { text: '커뮤니티', link: '/ko/community/', activeMatch: '/ko/community/' },
        { text: '다운로드', link: '/ko/downloads/', activeMatch: '/ko/downloads/' },
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
            { text: 'Lark Wiki', link: '/ko/tutorials/lark-wiki' },
          ] },
          { text: '학습 리소스', items: [
            { text: '학습 리소스', link: '/ko/tutorials/learning-resources/' },
            { text: '빠른 시작', link: '/ko/tutorials/learning-resources/getting-started' },
            { text: '하드웨어 연결', link: '/ko/tutorials/learning-resources/hardware-setup' },
            { text: '소프트웨어 설정', link: '/ko/tutorials/learning-resources/software-config' },
            { text: 'Jetson Orin에서 PyTorch 비호환 문제', link: '/ko/tutorials/learning-resources/jetson-orin-pytorch-compatibility' },
          ] },
          { text: '로봇 암', items: [
            { text: '로봇 팔 시리즈', link: '/ko/tutorials/robot-arms/' },
            { text: '선택 가이드', link: '/ko/tutorials/robot-arms/select-guide' },
            {
              text: 'SO-ARM101 시리즈',
              collapsed: false,
              items: [
                { text: 'LeRobot 로봇팔 튜토리얼', link: '/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                { text: 'Lerobot 로봇 암 조립 가이드', link: '/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                { text: 'Jetson Orin에서 PyTorch 비호환 문제', link: '/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                { text: 'SO-ARM100&101 암 장착 브래킷 및 환경 카메라 키트 설치 튜토리얼', link: '/ko/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                { text: '오버헤드 카메라 마운트 설치 가이드', link: '/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: '로봇 핸드 인터페이스 제어', link: '/ko/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: '로봇핸드 공식 예제 실행 튜토리얼', link: '/ko/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: '로봇핸드(TTL 직렬 서보) 디버깅 튜토리얼', link: '/ko/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
              ],
            },
            {
              text: 'Lekiwi',
              collapsed: true,
              items: [
                { text: 'Lekiwi 이동 로봇 사용 튜토리얼', link: '/ko/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial' },
                { text: 'Lekiwi 이동 로봇 조립 튜토리얼', link: '/ko/tutorials/robot-arms/lekiwi/Lekiwi-Assembly' },
              ],
            },
          ] },
          { text: '센서', items: [
            { text: '센서와 인지', link: '/ko/tutorials/sensors/' },
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
            { text: '로봇 액세서리', link: '/ko/tutorials/accessories/' },
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
        '/ko/topics/': [{ text: '토픽', items: [{ text: '토픽', link: '/ko/topics/' }, { text: 'JetPack 플래싱 및 시스템 설정', link: '/ko/topics/jetpack-setup' }, { text: '엣지 AI 배포 입문', link: '/ko/topics/edge-ai-intro' }, { text: '구현 지능 입문(LeRobot)', link: '/ko/topics/embodied-ai-intro' }, { text: '로봇 학습 특집', link: '/ko/topics/robot-learning/' }, { text: '오픈소스 하드웨어 철학', link: '/ko/topics/open-source-hardware' }] }],
        '/ko/tech/': [{ text: '기술 문서', items: [{ text: '기술 문서', link: '/ko/tech/' }, { text: 'API 참조', link: '/ko/tech/api-reference' }, { text: '개발 가이드', link: '/ko/tech/dev-guide' }] }],
        '/ko/community/': [{ text: '커뮤니티', items: [{ text: '커뮤니티', link: '/ko/community/' }, { text: '기여 가이드', link: '/ko/community/contributing' }] }],
        '/ko/cases/': [{ text: '사용자 사례', items: [{ text: '사용자 성공 사례', link: '/ko/cases/' }] }],
        '/ko/products/': [
          { text: '로봇', items: [
            { text: 'SO-ARM101 개발 키트', link: '/ko/products/so-arm101' },
            { text: 'AmazingHand 4손가락 정교 손', link: '/ko/products/amazinghand' },
            { text: '버스 서보 드라이버 보드', link: '/ko/products/servo-driver-board' },
            { text: 'SO-ARM101 TPU 플렉시블 그리퍼', link: '/ko/products/tpu-flexible-gripper' },
            { text: 'SO-ARM101 로봇 비전 키트', link: '/ko/products/robot-vision-kit' },
            { text: 'Lekiwi 구현 지능 이동 로봇', link: '/ko/products/lekiwi' },
            { text: 'SO-ARM101 오버헤드 카메라 마운트', link: '/ko/products/overhead-camera-mount' },
          ] },
          { text: '컴퓨팅 & 비전', items: [
            { text: 'Jetson Orin NX Super 개발 키트', link: '/ko/products/jetson-orin-nx-super-kit' },
            { text: 'ESP32-S3 WiFi 영상 모듈', link: '/ko/products/esp32-s3-wifi-module' },
            { text: '79° IMX219 CSI 카메라', link: '/ko/products/imx219-csi-camera' },
            { text: '3D RealSense 깊이 카메라', link: '/ko/products/realsense-depth-camera' },
          ] },
          { text: '센서', items: [
            { text: 'IMU 관성 모듈', link: '/ko/products/imu-module' },
            { text: 'GPS & 北斗 GNSS 측위 모듈', link: '/ko/products/gps-beidou-module' },
          ] },
          { text: '액세서리', items: [
            { text: '2자유도 서보 짐벌', link: '/ko/products/2dof-gimbal' },
            { text: 'KWS 음성 상호작용 모듈', link: '/ko/products/kws-voice-module' },
            { text: 'Feetech 버스 서보', link: '/ko/products/feetech-servo' },
            { text: '4 in 1 KVM 스위치', link: '/ko/products/kvm-switch' },
            { text: 'USB 무드라이버 사운드 카드', link: '/ko/products/usb-sound-card' },
            { text: '4K HDMI 캡처 카드', link: '/ko/products/4k-hdmi-capture' },
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
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      nav: [
        { text: 'Tutorials', link: '/de/tutorials/', activeMatch: '/de/tutorials/' },
        { text: 'Themen', link: '/de/topics/', activeMatch: '/de/topics/' },
        { text: 'Technische Doku', link: '/de/tech/', activeMatch: '/de/tech/' },
        { text: 'Produkte', link: '/de/products/', activeMatch: '/de/products/' },
        { text: 'Fallstudien', link: '/de/cases/', activeMatch: '/de/cases/' },
        { text: 'Community', link: '/de/community/', activeMatch: '/de/community/' },
        { text: 'Downloads', link: '/de/downloads/', activeMatch: '/de/downloads/' },
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
            { text: 'Lark Wiki', link: '/de/tutorials/lark-wiki' },
          ] },
          { text: 'Lernressourcen', items: [
            { text: 'Lernressourcen', link: '/de/tutorials/learning-resources/' },
            { text: 'Schnellstart', link: '/de/tutorials/learning-resources/getting-started' },
            { text: 'Hardware-Verbindung', link: '/de/tutorials/learning-resources/hardware-setup' },
            { text: 'Software-Konfiguration', link: '/de/tutorials/learning-resources/software-config' },
            { text: 'PyTorch-Inkompatibilitäten auf Jetson Orin', link: '/de/tutorials/learning-resources/jetson-orin-pytorch-compatibility' },
          ] },
          { text: 'Roboterarme', items: [
            { text: 'Serie Roboterarme', link: '/de/tutorials/robot-arms/' },
            { text: 'Auswahlhilfe', link: '/de/tutorials/robot-arms/select-guide' },
            {
              text: 'SO-ARM101-Serie',
              collapsed: false,
              items: [
                { text: 'LeRobot-Roboterarm-Tutorial', link: '/de/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                { text: 'Lerobot-Roboterarm-Montageanleitung', link: '/de/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                { text: 'PyTorch-Inkompatibilität auf Jetson Orin', link: '/de/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                { text: 'SO-ARM100&101 Armhalterung und Umgebungskamera-Kit – Montage-Tutorial', link: '/de/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                { text: 'Overhead-Kamera-Halterung Montage', link: '/de/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: 'Roboterhand Interface-Steuerung', link: '/de/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: 'Tutorial zum offiziellen Beispiel der Roboterhand', link: '/de/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'Dexterous Hand (TTL-Servo) Debug-Tutorial', link: '/de/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
              ],
            },
            {
              text: 'Lekiwi',
              collapsed: true,
              items: [
                { text: 'Lekiwi-Mobilitätsroboter – Bedienungstutorial', link: '/de/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial' },
                { text: 'Lekiwi-Mobilitätsroboter – Montage-Tutorial', link: '/de/tutorials/robot-arms/lekiwi/Lekiwi-Assembly' },
              ],
            },
          ] },
          { text: 'Sensoren', items: [
            { text: 'Sensoren & Wahrnehmung', link: '/de/tutorials/sensors/' },
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
            { text: 'Roboter-Accessoires', link: '/de/tutorials/accessories/' },
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
        '/de/topics/': [{ text: 'Themen', items: [{ text: 'Themen', link: '/de/topics/' }, { text: 'JetPack-Flashing und Systemkonfiguration', link: '/de/topics/jetpack-setup' }, { text: 'Einstieg in Edge-KI-Deployment', link: '/de/topics/edge-ai-intro' }, { text: 'Einstieg in die verkörperte Intelligenz (LeRobot)', link: '/de/topics/embodied-ai-intro' }, { text: 'Robot-Learning-Schwerpunkt', link: '/de/topics/robot-learning/' }, { text: 'Open-Source-Hardware-Philosophie', link: '/de/topics/open-source-hardware' }] }],
        '/de/tech/': [{ text: 'Technische Doku', items: [{ text: 'Technische Doku', link: '/de/tech/' }, { text: 'API-Referenz', link: '/de/tech/api-reference' }, { text: 'Entwicklungsleitfaden', link: '/de/tech/dev-guide' }] }],
        '/de/community/': [{ text: 'Community', items: [{ text: 'Community', link: '/de/community/' }, { text: 'Mitwirkungsleitfaden', link: '/de/community/contributing' }] }],
        '/de/cases/': [{ text: 'Fallstudien', items: [{ text: 'Nutzer-Erfolgsgeschichten', link: '/de/cases/' }] }],
        '/de/products/': [
          { text: 'Roboter', items: [
            { text: 'SO-ARM101 Entwickler-Kit', link: '/de/products/so-arm101' },
            { text: 'AmazingHand 4-Finger-Greifhand', link: '/de/products/amazinghand' },
            { text: 'Bus-Servo-Treiberplatine', link: '/de/products/servo-driver-board' },
            { text: 'SO-ARM101 TPU-Flex-Greifer', link: '/de/products/tpu-flexible-gripper' },
            { text: 'SO-ARM101-Robotervisions-Kit', link: '/de/products/robot-vision-kit' },
            { text: 'Lekiwi Mobilitätsroboter', link: '/de/products/lekiwi' },
            { text: 'SO-ARM101-Overhead-Kamerahalterung', link: '/de/products/overhead-camera-mount' },
          ] },
          { text: 'Computing & Vision', items: [
            { text: 'Jetson Orin NX Super Dev-Kit', link: '/de/products/jetson-orin-nx-super-kit' },
            { text: 'ESP32-S3-WiFi-Videomodul', link: '/de/products/esp32-s3-wifi-module' },
            { text: '79°-IMX219-CSI-Kamera', link: '/de/products/imx219-csi-camera' },
            { text: '3D RealSense Tiefenkamera', link: '/de/products/realsense-depth-camera' },
          ] },
          { text: 'Sensoren', items: [
            { text: 'IMU-Trägheitsmodul', link: '/de/products/imu-module' },
            { text: 'GPS- & Beidou-GNSS-Positionsmodul', link: '/de/products/gps-beidou-module' },
          ] },
          { text: 'Zubehör', items: [
            { text: '2-DOF-Servo-Pan-Tilt', link: '/de/products/2dof-gimbal' },
            { text: 'KWS-Sprachinteraktionsmodul', link: '/de/products/kws-voice-module' },
            { text: 'Feetech-Bus-Servo', link: '/de/products/feetech-servo' },
            { text: '4-in-1-KVM-Switch', link: '/de/products/kvm-switch' },
            { text: 'USB-Soundkarte ohne Treiber', link: '/de/products/usb-sound-card' },
            { text: '4K-HDMI-Capture-Karte', link: '/de/products/4k-hdmi-capture' },
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
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      nav: [
        { text: 'Tutoriels', link: '/fr/tutorials/', activeMatch: '/fr/tutorials/' },
        { text: 'Sujets', link: '/fr/topics/', activeMatch: '/fr/topics/' },
        { text: 'Documentation', link: '/fr/tech/', activeMatch: '/fr/tech/' },
        { text: 'Produits', link: '/fr/products/', activeMatch: '/fr/products/' },
        { text: 'Cas clients', link: '/fr/cases/', activeMatch: '/fr/cases/' },
        { text: 'Communauté', link: '/fr/community/', activeMatch: '/fr/community/' },
        { text: 'Téléchargements', link: '/fr/downloads/', activeMatch: '/fr/downloads/' },
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
            { text: 'Lark Wiki', link: '/fr/tutorials/lark-wiki' },
          ] },
          { text: 'Ressources pédagogiques', items: [
            { text: 'Ressources pédagogiques', link: '/fr/tutorials/learning-resources/' },
            { text: 'Démarrage rapide', link: '/fr/tutorials/learning-resources/getting-started' },
            { text: 'Connexion matérielle', link: '/fr/tutorials/learning-resources/hardware-setup' },
            { text: 'Configuration logicielle', link: '/fr/tutorials/learning-resources/software-config' },
            { text: 'Incompatibilités PyTorch sur Jetson Orin', link: '/fr/tutorials/learning-resources/jetson-orin-pytorch-compatibility' },
          ] },
          { text: 'Bras robotiques', items: [
            { text: 'Série bras robotiques', link: '/fr/tutorials/robot-arms/' },
            { text: 'Guide de sélection', link: '/fr/tutorials/robot-arms/select-guide' },
            {
              text: 'Série SO-ARM101',
              collapsed: false,
              items: [
                { text: 'Tutoriel bras robotique LeRobot', link: '/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                { text: 'Guide de montage du bras robotique Lerobot', link: '/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                { text: 'Incompatibilité PyTorch sur Jetson Orin', link: '/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                { text: "Support de bras et kit caméra d'environnement SO-ARM100&101 – Tutoriel d'installation", link: '/fr/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                { text: 'Installation du support caméra plafond', link: '/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: "Contrôle d'interface main robotique", link: '/fr/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: "Tutoriel d'exécution de l'exemple officiel de la main robotique", link: '/fr/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'Tutoriel de débogage de la main robotique (servo TTL)', link: '/fr/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
              ],
            },
            {
              text: 'Lekiwi',
              collapsed: true,
              items: [
                { text: "Tutoriel d'utilisation du robot mobile Lekiwi", link: '/fr/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial' },
                { text: "Tutoriel d'assemblage du robot mobile Lekiwi", link: '/fr/tutorials/robot-arms/lekiwi/Lekiwi-Assembly' },
              ],
            },
          ] },
          { text: 'Capteurs', items: [
            { text: 'Capteurs et perception', link: '/fr/tutorials/sensors/' },
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
            { text: 'Accessoires robotiques', link: '/fr/tutorials/accessories/' },
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
        '/fr/topics/': [{ text: 'Sujets', items: [{ text: 'Sujets', link: '/fr/topics/' }, { text: 'Flashage JetPack et configuration système', link: '/fr/topics/jetpack-setup' }, { text: 'Introduction au déploiement IA en périphérie', link: '/fr/topics/edge-ai-intro' }, { text: "Introduction à l'intelligence incarnée (LeRobot)", link: '/fr/topics/embodied-ai-intro' }, { text: 'Thématique Robot Learning', link: '/fr/topics/robot-learning/' }, { text: "Philosophie du matériel open source", link: '/fr/topics/open-source-hardware' }] }],
        '/fr/tech/': [{ text: 'Documentation', items: [{ text: 'Documentation', link: '/fr/tech/' }, { text: 'Référence API', link: '/fr/tech/api-reference' }, { text: 'Guide de développement', link: '/fr/tech/dev-guide' }] }],
        '/fr/community/': [{ text: 'Communauté', items: [{ text: 'Communauté', link: '/fr/community/' }, { text: 'Guide de contribution', link: '/fr/community/contributing' }] }],
        '/fr/cases/': [{ text: 'Cas clients', items: [{ text: "Témoignages d'utilisateurs", link: '/fr/cases/' }] }],
        '/fr/products/': [
          { text: 'Robots', items: [
            { text: 'Kit développeur SO-ARM101', link: '/fr/products/so-arm101' },
            { text: 'Main dexterous 4 doigts AmazingHand', link: '/fr/products/amazinghand' },
            { text: 'Carte driver servo bus', link: '/fr/products/servo-driver-board' },
            { text: 'Pince flexible TPU SO-ARM101', link: '/fr/products/tpu-flexible-gripper' },
            { text: 'Kit vision robotique SO-ARM101', link: '/fr/products/robot-vision-kit' },
            { text: 'Robot mobile Lekiwi', link: '/fr/products/lekiwi' },
            { text: 'Support caméra plafonnier SO-ARM101', link: '/fr/products/overhead-camera-mount' },
          ] },
          { text: 'Calcul & Vision', items: [
            { text: 'Kit Jetson Orin NX Super', link: '/fr/products/jetson-orin-nx-super-kit' },
            { text: 'Module vidéo WiFi ESP32-S3', link: '/fr/products/esp32-s3-wifi-module' },
            { text: 'Caméra CSI IMX219 79°', link: '/fr/products/imx219-csi-camera' },
            { text: 'Caméra de profondeur RealSense', link: '/fr/products/realsense-depth-camera' },
          ] },
          { text: 'Capteurs', items: [
            { text: 'Module inertiel IMU', link: '/fr/products/imu-module' },
            { text: 'Module GNSS GPS & Beidou', link: '/fr/products/gps-beidou-module' },
          ] },
          { text: 'Accessoires', items: [
            { text: 'Cardan servo 2-DOF', link: '/fr/products/2dof-gimbal' },
            { text: "Module d'interaction vocale KWS", link: '/fr/products/kws-voice-module' },
            { text: 'Servo bus Feetech', link: '/fr/products/feetech-servo' },
            { text: 'Commutateur KVM 4-en-1', link: '/fr/products/kvm-switch' },
            { text: 'Carte son USB sans pilote', link: '/fr/products/usb-sound-card' },
            { text: 'Carte de capture HDMI 4K', link: '/fr/products/4k-hdmi-capture' },
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
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      nav: [
        { text: 'Tutoriales', link: '/es/tutorials/', activeMatch: '/es/tutorials/' },
        { text: 'Temas', link: '/es/topics/', activeMatch: '/es/topics/' },
        { text: 'Documentación', link: '/es/tech/', activeMatch: '/es/tech/' },
        { text: 'Productos', link: '/es/products/', activeMatch: '/es/products/' },
        { text: 'Casos de éxito', link: '/es/cases/', activeMatch: '/es/cases/' },
        { text: 'Comunidad', link: '/es/community/', activeMatch: '/es/community/' },
        { text: 'Descargas', link: '/es/downloads/', activeMatch: '/es/downloads/' },
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
            { text: 'Lark Wiki', link: '/es/tutorials/lark-wiki' },
          ] },
          { text: 'Recursos didácticos', items: [
            { text: 'Recursos didácticos', link: '/es/tutorials/learning-resources/' },
            { text: 'Inicio rápido', link: '/es/tutorials/learning-resources/getting-started' },
            { text: 'Conexión de hardware', link: '/es/tutorials/learning-resources/hardware-setup' },
            { text: 'Configuración de software', link: '/es/tutorials/learning-resources/software-config' },
            { text: 'Incompatibilidades de PyTorch en Jetson Orin', link: '/es/tutorials/learning-resources/jetson-orin-pytorch-compatibility' },
          ] },
          { text: 'Brazos robóticos', items: [
            { text: 'Serie de brazos robóticos', link: '/es/tutorials/robot-arms/' },
            { text: 'Guía de selección', link: '/es/tutorials/robot-arms/select-guide' },
            {
              text: 'Serie SO-ARM101',
              collapsed: false,
              items: [
                { text: 'Tutorial del brazo robótico LeRobot', link: '/es/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                { text: 'Guía de montaje del brazo robótico Lerobot', link: '/es/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                { text: 'Incompatibilidad de PyTorch en Jetson Orin', link: '/es/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                { text: 'Soporte de brazo y kit de cámara ambiental SO-ARM100&101 – Tutorial de instalación', link: '/es/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                { text: 'Instalación del soporte de cámara superior', link: '/es/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: 'Control de interfaz de mano robótica', link: '/es/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: 'Tutorial de ejecución del ejemplo oficial de la mano robótica', link: '/es/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'Tutorial de depuración de la mano hábil (servo TTL)', link: '/es/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
              ],
            },
            {
              text: 'Lekiwi',
              collapsed: true,
              items: [
                { text: 'Tutorial de uso del robot móvil Lekiwi', link: '/es/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial' },
                { text: 'Tutorial de ensamblaje del robot móvil Lekiwi', link: '/es/tutorials/robot-arms/lekiwi/Lekiwi-Assembly' },
              ],
            },
          ] },
          { text: 'Sensores', items: [
            { text: 'Sensores y percepción', link: '/es/tutorials/sensors/' },
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
            { text: 'Accesorios robóticos', link: '/es/tutorials/accessories/' },
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
        '/es/topics/': [{ text: 'Temas', items: [{ text: 'Temas', link: '/es/topics/' }, { text: 'Flasheo de JetPack y configuración del sistema', link: '/es/topics/jetpack-setup' }, { text: 'Introducción al despliegue de IA en el borde', link: '/es/topics/edge-ai-intro' }, { text: 'Introducción a la inteligencia incorporada (LeRobot)', link: '/es/topics/embodied-ai-intro' }, { text: 'Tema Robot Learning', link: '/es/topics/robot-learning/' }, { text: 'Filosofía del hardware de código abierto', link: '/es/topics/open-source-hardware' }] }],
        '/es/tech/': [{ text: 'Documentación', items: [{ text: 'Documentación', link: '/es/tech/' }, { text: 'Referencia de API', link: '/es/tech/api-reference' }, { text: 'Guía de desarrollo', link: '/es/tech/dev-guide' }] }],
        '/es/community/': [{ text: 'Comunidad', items: [{ text: 'Comunidad', link: '/es/community/' }, { text: 'Guía de contribución', link: '/es/community/contributing' }] }],
        '/es/cases/': [{ text: 'Casos de éxito', items: [{ text: 'Casos de éxito de usuarios', link: '/es/cases/' }] }],
        '/es/products/': [
          { text: 'Robots', items: [
            { text: 'Kit desarrollador SO-ARM101', link: '/es/products/so-arm101' },
            { text: 'Mano diestra 4 dedos AmazingHand', link: '/es/products/amazinghand' },
            { text: 'Placa driver de servo de bus', link: '/es/products/servo-driver-board' },
            { text: 'Pinza flexible de TPU SO-ARM101', link: '/es/products/tpu-flexible-gripper' },
            { text: 'Kit de visión robótica SO-ARM101', link: '/es/products/robot-vision-kit' },
            { text: 'Robot móvil Lekiwi', link: '/es/products/lekiwi' },
            { text: 'Montaje de cámara superior SO-ARM101', link: '/es/products/overhead-camera-mount' },
          ] },
          { text: 'Cómputo y visión', items: [
            { text: 'Kit Jetson Orin NX Super', link: '/es/products/jetson-orin-nx-super-kit' },
            { text: 'Módulo de video WiFi ESP32-S3', link: '/es/products/esp32-s3-wifi-module' },
            { text: 'Cámara CSI IMX219 de 79°', link: '/es/products/imx219-csi-camera' },
            { text: 'Cámara de profundidad RealSense', link: '/es/products/realsense-depth-camera' },
          ] },
          { text: 'Sensores', items: [
            { text: 'Módulo inercial IMU', link: '/es/products/imu-module' },
            { text: 'Módulo GNSS GPS y Beidou', link: '/es/products/gps-beidou-module' },
          ] },
          { text: 'Accesorios', items: [
            { text: 'Cardán servo 2-DOF', link: '/es/products/2dof-gimbal' },
            { text: 'Módulo de interacción de voz KWS', link: '/es/products/kws-voice-module' },
            { text: 'Servo de bus Feetech', link: '/es/products/feetech-servo' },
            { text: 'Conmutador KVM 4 en 1', link: '/es/products/kvm-switch' },
            { text: 'Tarjeta de sonido USB sin controlador', link: '/es/products/usb-sound-card' },
            { text: 'Capturadora HDMI 4K', link: '/es/products/4k-hdmi-capture' },
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
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      nav: [
        { text: 'Tutorial', link: '/it/tutorials/', activeMatch: '/it/tutorials/' },
        { text: 'Argomenti', link: '/it/topics/', activeMatch: '/it/topics/' },
        { text: 'Documentazione', link: '/it/tech/', activeMatch: '/it/tech/' },
        { text: 'Prodotti', link: '/it/products/', activeMatch: '/it/products/' },
        { text: 'Casi di successo', link: '/it/cases/', activeMatch: '/it/cases/' },
        { text: 'Community', link: '/it/community/', activeMatch: '/it/community/' },
        { text: 'Download', link: '/it/downloads/', activeMatch: '/it/downloads/' },
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
            { text: 'Lark Wiki', link: '/it/tutorials/lark-wiki' },
          ] },
          { text: 'Risorse didattiche', items: [
            { text: 'Risorse didattiche', link: '/it/tutorials/learning-resources/' },
            { text: 'Guida rapida', link: '/it/tutorials/learning-resources/getting-started' },
            { text: 'Collegamento hardware', link: '/it/tutorials/learning-resources/hardware-setup' },
            { text: 'Configurazione software', link: '/it/tutorials/learning-resources/software-config' },
            { text: 'Incompatibilità PyTorch su Jetson Orin', link: '/it/tutorials/learning-resources/jetson-orin-pytorch-compatibility' },
          ] },
          { text: 'Bracci robotici', items: [
            { text: 'Serie bracci robotici', link: '/it/tutorials/robot-arms/' },
            { text: 'Guida alla scelta', link: '/it/tutorials/robot-arms/select-guide' },
            {
              text: 'Serie SO-ARM101',
              collapsed: false,
              items: [
                { text: 'Tutorial braccio robotico LeRobot', link: '/it/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                { text: 'Guida di montaggio del braccio robotico Lerobot', link: '/it/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                { text: 'Incompatibilità PyTorch su Jetson Orin', link: '/it/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                { text: "Supporto da braccio e kit camera ambientale SO-ARM100&101 – Tutorial di installazione", link: '/it/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                { text: 'Installazione del supporto camera overhead', link: '/it/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: 'Controllo interfaccia mano robotica', link: '/it/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: "Tutorial di esecuzione dell'esempio ufficiale della mano robotica", link: '/it/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'Tutorial di debug della mano dexterous (servo TTL)', link: '/it/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
              ],
            },
            {
              text: 'Lekiwi',
              collapsed: true,
              items: [
                { text: "Tutorial d'uso del robot mobile Lekiwi", link: '/it/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial' },
                { text: 'Tutorial di assemblaggio del robot mobile Lekiwi', link: '/it/tutorials/robot-arms/lekiwi/Lekiwi-Assembly' },
              ],
            },
          ] },
          { text: 'Sensori', items: [
            { text: 'Sensori e percezione', link: '/it/tutorials/sensors/' },
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
            { text: 'Accessori robotici', link: '/it/tutorials/accessories/' },
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
        '/it/topics/': [{ text: 'Argomenti', items: [{ text: 'Argomenti', link: '/it/topics/' }, { text: 'Flashing JetPack e configurazione di sistema', link: '/it/topics/jetpack-setup' }, { text: 'Introduzione al deploy AI edge', link: '/it/topics/edge-ai-intro' }, { text: "Introduzione all'intelligenza incarnata (LeRobot)", link: '/it/topics/embodied-ai-intro' }, { text: 'Tema Robot Learning', link: '/it/topics/robot-learning/' }, { text: "Filosofia dell'hardware open source", link: '/it/topics/open-source-hardware' }] }],
        '/it/tech/': [{ text: 'Documentazione', items: [{ text: 'Documentazione', link: '/it/tech/' }, { text: 'Riferimento API', link: '/it/tech/api-reference' }, { text: 'Guida di sviluppo', link: '/it/tech/dev-guide' }] }],
        '/it/community/': [{ text: 'Community', items: [{ text: 'Community', link: '/it/community/' }, { text: 'Guida alla contribuzione', link: '/it/community/contributing' }] }],
        '/it/cases/': [{ text: 'Casi di successo', items: [{ text: 'Storie di successo degli utenti', link: '/it/cases/' }] }],
        '/it/products/': [
          { text: 'Robot', items: [
            { text: 'Kit sviluppatore SO-ARM101', link: '/it/products/so-arm101' },
            { text: 'Mano dexterous 4 dita AmazingHand', link: '/it/products/amazinghand' },
            { text: 'Scheda driver servo bus', link: '/it/products/servo-driver-board' },
            { text: 'Pinza flessibile TPU SO-ARM101', link: '/it/products/tpu-flexible-gripper' },
            { text: 'Kit visione robotica SO-ARM101', link: '/it/products/robot-vision-kit' },
            { text: 'Robot mobile Lekiwi', link: '/it/products/lekiwi' },
            { text: 'Supporto fotocamera overhead SO-ARM101', link: '/it/products/overhead-camera-mount' },
          ] },
          { text: 'Calcolo e visione', items: [
            { text: 'Kit Jetson Orin NX Super', link: '/it/products/jetson-orin-nx-super-kit' },
            { text: 'Modulo video WiFi ESP32-S3', link: '/it/products/esp32-s3-wifi-module' },
            { text: 'Fotocamera CSI IMX219 79°', link: '/it/products/imx219-csi-camera' },
            { text: 'Camera di profondità RealSense', link: '/it/products/realsense-depth-camera' },
          ] },
          { text: 'Sensori', items: [
            { text: 'Modulo inerziale IMU', link: '/it/products/imu-module' },
            { text: 'Modulo GNSS GPS e Beidou', link: '/it/products/gps-beidou-module' },
          ] },
          { text: 'Accessori', items: [
            { text: 'Pan-tilt servo 2-DOF', link: '/it/products/2dof-gimbal' },
            { text: 'Modulo di interazione vocale KWS', link: '/it/products/kws-voice-module' },
            { text: 'Servo bus Feetech', link: '/it/products/feetech-servo' },
            { text: 'Switch KVM 4-in-1', link: '/it/products/kvm-switch' },
            { text: 'Scheda audio USB senza driver', link: '/it/products/usb-sound-card' },
            { text: 'Scheda di acquisizione HDMI 4K', link: '/it/products/4k-hdmi-capture' },
          ] },
        ],
      },
    },
  },
  'pt-br': {
    label: 'Português (Brasil)',
    lang: 'pt-BR',
    description: 'Central de tutoriais e documentação Juxi Technology',
    head: [
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      nav: [
        { text: 'Tutoriais', link: '/pt-br/tutorials/', activeMatch: '/pt-br/tutorials/' },
        { text: 'Tópicos', link: '/pt-br/topics/', activeMatch: '/pt-br/topics/' },
        { text: 'Docs Técnicos', link: '/pt-br/tech/', activeMatch: '/pt-br/tech/' },
        { text: 'Produtos', link: '/pt-br/products/', activeMatch: '/pt-br/products/' },
        { text: 'Casos', link: '/pt-br/cases/', activeMatch: '/pt-br/cases/' },
        { text: 'Comunidade', link: '/pt-br/community/', activeMatch: '/pt-br/community/' },
        { text: 'Downloads', link: '/pt-br/downloads/', activeMatch: '/pt-br/downloads/' },
        { text: 'Sobre', link: '/pt-br/about/', activeMatch: '/pt-br/about/' },
      ],
      sidebar: {
        '/pt-br/tutorials/': [
          {
            text: 'Guia Rápido',
            items: [
              { text: 'FAQ', link: '/pt-br/tutorials/faq' },
              { text: 'Introdução ao ROS', link: '/pt-br/tutorials/ros-intro' },
              { text: 'Guia Rápido', link: '/pt-br/tutorials/getting-started' },
              { text: 'Configuração de Hardware', link: '/pt-br/tutorials/hardware-setup' },
              { text: 'Configuração de Software', link: '/pt-br/tutorials/software-config' },
              { text: 'Docs Lark', link: '/pt-br/tutorials/lark-wiki' },
            ],
          },
          {
            text: 'Recursos de Aprendizado',
            items: [
              { text: 'Recursos de Aprendizado', link: '/pt-br/tutorials/learning-resources/' },
              { text: 'Guia Rápido', link: '/pt-br/tutorials/learning-resources/getting-started' },
              { text: 'Configuração de Hardware', link: '/pt-br/tutorials/learning-resources/hardware-setup' },
              { text: 'Configuração de Software', link: '/pt-br/tutorials/learning-resources/software-config' },
              { text: 'Compatibilidade PyTorch no Jetson Orin', link: '/pt-br/tutorials/learning-resources/jetson-orin-pytorch-compatibility' },
            ],
          },
          {
            text: 'Braços Robóticos',
            items: [
              { text: 'Visão Geral dos Braços Robóticos', link: '/pt-br/tutorials/robot-arms/' },
              { text: 'Guia de Seleção', link: '/pt-br/tutorials/robot-arms/select-guide' },
              {
                text: 'Série SO-ARM101',
                collapsed: false,
                items: [
                  { text: 'Tutorial do Braço Robótico LeRobot', link: '/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                  { text: 'Guia de Montagem do Braço Robótico Lerobot', link: '/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                  { text: 'Compatibilidade PyTorch no Jetson Orin', link: '/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                  { text: 'Instalação do Suporte de Braço e Kit de Câmera SO-ARM100&101', link: '/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                  { text: 'Instalação da Câmera Superior', link: '/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' },
                ],
              },
              {
                text: 'AmazingHand',
                collapsed: true,
                items: [
                  { text: 'Controle de Interface da Mão Robótica', link: '/pt-br/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                  { text: 'Tutorial do Exemplo Oficial da Mão Robótica', link: '/pt-br/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                  { text: 'Tutorial de Depuração da Mão Hábil (servo TTL)', link: '/pt-br/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                ],
              },
              {
                text: 'Lekiwi',
                collapsed: true,
                items: [
                  { text: 'Tutorial de Uso do Robô Móvel Lekiwi', link: '/pt-br/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial' },
                  { text: 'Tutorial de Montagem do Robô Móvel Lekiwi', link: '/pt-br/tutorials/robot-arms/lekiwi/Lekiwi-Assembly' },
                ],
              },
            ],
          },
          {
            text: 'Acessórios',
            items: [
              { text: 'Visão Geral dos Acessórios', link: '/pt-br/tutorials/accessories/' },
              {
                text: 'Módulo de Reconhecimento de Voz KWS',
                collapsed: true,
                items: [
                  { text: 'Início da Série', link: '/pt-br/tutorials/accessories/KWS-speech-recognition-module/' },
                  { text: 'Comunicação Serial Jetson Nano', link: '/pt-br/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                  { text: 'Comunicação Serial Jetson', link: '/pt-br/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                  { text: 'Comunicação Serial PC', link: '/pt-br/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                  { text: 'Comunicação Serial Raspberry Pi', link: '/pt-br/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' },
                  { text: 'Visualização ROS2 RViz2', link: '/pt-br/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                  { text: 'Download e Gravação de Firmware de Palavras de Ativação', link: '/pt-br/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
                ],
              },
              {
                text: 'Servos Feetech',
                collapsed: true,
                items: [
                  { text: 'Tutorial de Depuração STS3215 & SCS0009', link: '/pt-br/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial' },
                  { text: 'Protocolo de Comunicação SCS', link: '/pt-br/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol' },
                  { text: 'Tabela de Memória do Servo STS com Encoder Magnético', link: '/pt-br/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis' },
                  { text: 'Tabela de Memória do Servo SCSCL com Potenciômetro', link: '/pt-br/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis' },
                ],
              },
              {
                text: 'Outros Acessórios',
                collapsed: true,
                items: [
                  { text: 'Câmera USB com Foco Automático', link: '/pt-br/tutorials/accessories/usb-auto-focus-camera' },
                  { text: 'Câmera CSI Jetson', link: '/pt-br/tutorials/accessories/jetson-csi-camera' },
                  { text: 'Gimbal de Câmera 2-DOF', link: '/pt-br/tutorials/accessories/2dof-camera-gimbal' },
                  { text: 'Sensor de Frequência Cardíaca e SpO2', link: '/pt-br/tutorials/accessories/heart-rate-spo2' },
                  { text: 'Tela OLED de 0,91"', link: '/pt-br/tutorials/accessories/0.91-oled-screen-tutorial' },
                  { text: 'Captura HDMI 4K', link: '/pt-br/tutorials/accessories/4k-hdmi-capture-tutorial' },
                  { text: 'Chaveador KVM', link: '/pt-br/tutorials/accessories/kvm-switch-tutorial' },
                  { text: 'Placa de Som USB sem Driver', link: '/pt-br/tutorials/accessories/usb-audio-card-tutorial' },
                ],
              },
            ],
          },
          {
            text: 'Sensores',
            items: [
              { text: 'Visão Geral dos Sensores', link: '/pt-br/tutorials/sensors/' },
              {
                text: 'Módulo de Navegação Inercial IMU',
                collapsed: true,
                items: [
                  { text: 'Informações do Produto', link: '/pt-br/tutorials/sensors/imu/product-info' },
                  { text: 'Calibração IMU', link: '/pt-br/tutorials/sensors/imu/calibration' },
                  {
                    text: 'Exemplos Multi-Placa',
                    items: [
                      { text: 'Visão Geral dos Casos Multi-Host', link: '/pt-br/tutorials/sensors/imu/multi-board-examples/overview' },
                      { text: 'Comunicação PC', link: '/pt-br/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                      {
                        text: 'Comunicação I2C',
                        items: [
                          { text: 'Arduino', link: '/pt-br/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                          { text: 'Jetson', link: '/pt-br/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                          { text: 'Raspberry Pi', link: '/pt-br/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' },
                          { text: 'RDK', link: '/pt-br/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                          { text: 'STM32', link: '/pt-br/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                        ],
                      },
                      {
                        text: 'Comunicação Serial',
                        items: [
                          { text: 'Arduino', link: '/pt-br/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                          { text: 'Jetson', link: '/pt-br/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                          { text: 'Raspberry Pi', link: '/pt-br/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' },
                          { text: 'RDK', link: '/pt-br/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                          { text: 'STM32', link: '/pt-br/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                        ],
                      },
                    ],
                  },
                  {
                    text: 'Exemplos ROS',
                    items: [
                      { text: 'Aplicação ROS1', link: '/pt-br/tutorials/sensors/imu/ros-examples/ros1' },
                      { text: 'Aplicação ROS2', link: '/pt-br/tutorials/sensors/imu/ros-examples/ros2' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        '/pt-br/topics/': [{ text: 'Tópicos', items: [{ text: 'Tópicos', link: '/pt-br/topics/' }, { text: 'Flasheamento JetPack e Configuração do Sistema', link: '/pt-br/topics/jetpack-setup' }, { text: 'Introdução ao Deploy de IA Edge', link: '/pt-br/topics/edge-ai-intro' }, { text: 'Introdução à Inteligência Incorporada (LeRobot)', link: '/pt-br/topics/embodied-ai-intro' }, { text: 'Tema Robot Learning', link: '/pt-br/topics/robot-learning/' }, { text: 'Filosofia de Hardware Open Source', link: '/pt-br/topics/open-source-hardware' }] }],
        '/pt-br/tech/': [{ text: 'Docs Técnicos', items: [{ text: 'Docs Técnicos', link: '/pt-br/tech/' }, { text: 'Referência de API', link: '/pt-br/tech/api-reference' }, { text: 'Guia de Desenvolvimento', link: '/pt-br/tech/dev-guide' }] }],
        '/pt-br/community/': [{ text: 'Comunidade', items: [{ text: 'Comunidade', link: '/pt-br/community/' }, { text: 'Guia de Contribuição', link: '/pt-br/community/contributing' }] }],
        '/pt-br/cases/': [{ text: 'Casos', items: [{ text: 'Histórias de Sucesso de Usuários', link: '/pt-br/cases/' }] }],
        '/pt-br/products/': [
          { text: 'Robôs', items: [
            { text: 'Kit Desenvolvedor SO-ARM101', link: '/pt-br/products/so-arm101' },
            { text: 'Mão Dexterous de 4 Dedos AmazingHand', link: '/pt-br/products/amazinghand' },
            { text: 'Placa Driver de Servo de Barramento', link: '/pt-br/products/servo-driver-board' },
            { text: 'Garra Flexível TPU SO-ARM101', link: '/pt-br/products/tpu-flexible-gripper' },
            { text: 'Kit de Visão Robótica SO-ARM101', link: '/pt-br/products/robot-vision-kit' },
            { text: 'Robô Móvel Lekiwi', link: '/pt-br/products/lekiwi' },
            { text: 'Suporte de Câmera Superior SO-ARM101', link: '/pt-br/products/overhead-camera-mount' },
          ] },
          { text: 'Computação & Visão', items: [
            { text: 'Kit Jetson Orin NX Super', link: '/pt-br/products/jetson-orin-nx-super-kit' },
            { text: 'Câmera de Profundidade RealSense', link: '/pt-br/products/realsense-depth-camera' },
            { text: 'Módulo de Vídeo WiFi ESP32-S3', link: '/pt-br/products/esp32-s3-wifi-module' },
            { text: 'Câmera CSI IMX219 79°', link: '/pt-br/products/imx219-csi-camera' },
          ] },
          { text: 'Sensores', items: [
            { text: 'Módulo Inercial IMU', link: '/pt-br/products/imu-module' },
            { text: 'Módulo GNSS GPS e Beidou', link: '/pt-br/products/gps-beidou-module' },
          ] },
          { text: 'Acessórios', items: [
            { text: 'Pan-tilt de Servo 2-DOF', link: '/pt-br/products/2dof-gimbal' },
            { text: 'Módulo de Interação de Voz KWS', link: '/pt-br/products/kws-voice-module' },
            { text: 'Servo de Barramento Feetech', link: '/pt-br/products/feetech-servo' },
            { text: 'Chaveador KVM 4-em-1', link: '/pt-br/products/kvm-switch' },
            { text: 'Placa de Som USB sem Driver', link: '/pt-br/products/usb-sound-card' },
            { text: 'Capturadora HDMI 4K', link: '/pt-br/products/4k-hdmi-capture' },
          ] },
        ],
        '/pt-br/downloads/': [{ text: 'Downloads', items: [{ text: 'Central de Downloads', link: '/pt-br/downloads/' }] }],
        '/pt-br/about/': [{ text: 'Sobre', items: [{ text: 'Sobre Nós', link: '/pt-br/about/' }] }],
      },
    },
  },
  'pt-pt': {
    label: 'Português (Portugal)',
    lang: 'pt-PT',
    description: 'Central de tutoriais e documentação Juxi Technology',
    head: [
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      nav: [
        { text: 'Tutoriais', link: '/pt-pt/tutorials/', activeMatch: '/pt-pt/tutorials/' },
        { text: 'Tópicos', link: '/pt-pt/topics/', activeMatch: '/pt-pt/topics/' },
        { text: 'Docs Técnicos', link: '/pt-pt/tech/', activeMatch: '/pt-pt/tech/' },
        { text: 'Produtos', link: '/pt-pt/products/', activeMatch: '/pt-pt/products/' },
        { text: 'Casos', link: '/pt-pt/cases/', activeMatch: '/pt-pt/cases/' },
        { text: 'Comunidade', link: '/pt-pt/community/', activeMatch: '/pt-pt/community/' },
        { text: 'Downloads', link: '/pt-pt/downloads/', activeMatch: '/pt-pt/downloads/' },
        { text: 'Sobre', link: '/pt-pt/about/', activeMatch: '/pt-pt/about/' },
      ],
      sidebar: {
        '/pt-pt/tutorials/': [
          {
            text: 'Guia Rápido',
            items: [
              { text: 'FAQ', link: '/pt-pt/tutorials/faq' },
              { text: 'Introdução ao ROS', link: '/pt-pt/tutorials/ros-intro' },
              { text: 'Guia Rápido', link: '/pt-pt/tutorials/getting-started' },
              { text: 'Configuração de Hardware', link: '/pt-pt/tutorials/hardware-setup' },
              { text: 'Configuração de Software', link: '/pt-pt/tutorials/software-config' },
              { text: 'Docs Lark', link: '/pt-pt/tutorials/lark-wiki' },
            ],
          },
          {
            text: 'Recursos de Aprendizado',
            items: [
              { text: 'Recursos de Aprendizado', link: '/pt-pt/tutorials/learning-resources/' },
              { text: 'Guia Rápido', link: '/pt-pt/tutorials/learning-resources/getting-started' },
              { text: 'Configuração de Hardware', link: '/pt-pt/tutorials/learning-resources/hardware-setup' },
              { text: 'Configuração de Software', link: '/pt-pt/tutorials/learning-resources/software-config' },
              { text: 'Compatibilidade PyTorch no Jetson Orin', link: '/pt-pt/tutorials/learning-resources/jetson-orin-pytorch-compatibility' },
            ],
          },
          {
            text: 'Braços Robóticos',
            items: [
              { text: 'Visão Geral dos Braços Robóticos', link: '/pt-pt/tutorials/robot-arms/' },
              { text: 'Guia de Seleção', link: '/pt-pt/tutorials/robot-arms/select-guide' },
              {
                text: 'Série SO-ARM101',
                collapsed: false,
                items: [
                  { text: 'Tutorial do Braço Robótico LeRobot', link: '/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial' },
                  { text: 'Guia de Montagem do Braço Robótico Lerobot', link: '/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly' },
                  { text: 'Compatibilidade PyTorch no Jetson Orin', link: '/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility' },
                  { text: 'Instalação do Suporte de Braço e Kit de Câmara SO-ARM100&101', link: '/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation' },
                  { text: 'Instalação da Câmara Superior', link: '/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation' },
                ],
              },
              {
                text: 'AmazingHand',
                collapsed: true,
                items: [
                  { text: 'Controle de Interface da Mão Robótica', link: '/pt-pt/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                  { text: 'Tutorial do Exemplo Oficial da Mão Robótica', link: '/pt-pt/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                  { text: 'Tutorial de Depuração da Mão Hábil (servo TTL)', link: '/pt-pt/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                ],
              },
              {
                text: 'Lekiwi',
                collapsed: true,
                items: [
                  { text: 'Tutorial de Uso do Robô Móvel Lekiwi', link: '/pt-pt/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial' },
                  { text: 'Tutorial de Montagem do Robô Móvel Lekiwi', link: '/pt-pt/tutorials/robot-arms/lekiwi/Lekiwi-Assembly' },
                ],
              },
            ],
          },
          {
            text: 'Acessórios',
            items: [
              { text: 'Visão Geral dos Acessórios', link: '/pt-pt/tutorials/accessories/' },
              {
                text: 'Módulo de Reconhecimento de Voz KWS',
                collapsed: true,
                items: [
                  { text: 'Início da Série', link: '/pt-pt/tutorials/accessories/KWS-speech-recognition-module/' },
                  { text: 'Comunicação Serial Jetson Nano', link: '/pt-pt/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication' },
                  { text: 'Comunicação Serial Jetson', link: '/pt-pt/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication' },
                  { text: 'Comunicação Serial PC', link: '/pt-pt/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication' },
                  { text: 'Comunicação Serial Raspberry Pi', link: '/pt-pt/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication' },
                  { text: 'Visualização ROS2 RViz2', link: '/pt-pt/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization' },
                  { text: 'Download e Gravação de Firmware de Palavras de Ativação', link: '/pt-pt/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words' },
                ],
              },
              {
                text: 'Servos Feetech',
                collapsed: true,
                items: [
                  { text: 'Tutorial de Depuração STS3215 & SCS0009', link: '/pt-pt/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial' },
                  { text: 'Protocolo de Comunicação SCS', link: '/pt-pt/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol' },
                  { text: 'Tabela de Memória do Servo STS com Encoder Magnético', link: '/pt-pt/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis' },
                  { text: 'Tabela de Memória do Servo SCSCL com Potenciômetro', link: '/pt-pt/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis' },
                ],
              },
              {
                text: 'Outros Acessórios',
                collapsed: true,
                items: [
                  { text: 'Câmara USB com Foco Automático', link: '/pt-pt/tutorials/accessories/usb-auto-focus-camera' },
                  { text: 'Câmara CSI Jetson', link: '/pt-pt/tutorials/accessories/jetson-csi-camera' },
                  { text: 'Gimbal de Câmara 2-DOF', link: '/pt-pt/tutorials/accessories/2dof-camera-gimbal' },
                  { text: 'Sensor de Frequência Cardíaca e SpO2', link: '/pt-pt/tutorials/accessories/heart-rate-spo2' },
                  { text: 'Ecrã OLED de 0,91"', link: '/pt-pt/tutorials/accessories/0.91-oled-screen-tutorial' },
                  { text: 'Captura HDMI 4K', link: '/pt-pt/tutorials/accessories/4k-hdmi-capture-tutorial' },
                  { text: 'Chaveador KVM', link: '/pt-pt/tutorials/accessories/kvm-switch-tutorial' },
                  { text: 'Placa de Som USB sem Driver', link: '/pt-pt/tutorials/accessories/usb-audio-card-tutorial' },
                ],
              },
            ],
          },
          {
            text: 'Sensores',
            items: [
              { text: 'Visão Geral dos Sensores', link: '/pt-pt/tutorials/sensors/' },
              {
                text: 'Módulo de Navegação Inercial IMU',
                collapsed: true,
                items: [
                  { text: 'Informações do Produto', link: '/pt-pt/tutorials/sensors/imu/product-info' },
                  { text: 'Calibração IMU', link: '/pt-pt/tutorials/sensors/imu/calibration' },
                  {
                    text: 'Exemplos Multi-Placa',
                    items: [
                      { text: 'Visão Geral dos Casos Multi-Host', link: '/pt-pt/tutorials/sensors/imu/multi-board-examples/overview' },
                      { text: 'Comunicação PC', link: '/pt-pt/tutorials/sensors/imu/multi-board-examples/pc-communication' },
                      {
                        text: 'Comunicação I2C',
                        items: [
                          { text: 'Arduino', link: '/pt-pt/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino' },
                          { text: 'Jetson', link: '/pt-pt/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson' },
                          { text: 'Raspberry Pi', link: '/pt-pt/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi' },
                          { text: 'RDK', link: '/pt-pt/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk' },
                          { text: 'STM32', link: '/pt-pt/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32' },
                        ],
                      },
                      {
                        text: 'Comunicação Serial',
                        items: [
                          { text: 'Arduino', link: '/pt-pt/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino' },
                          { text: 'Jetson', link: '/pt-pt/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson' },
                          { text: 'Raspberry Pi', link: '/pt-pt/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi' },
                          { text: 'RDK', link: '/pt-pt/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk' },
                          { text: 'STM32', link: '/pt-pt/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32' },
                        ],
                      },
                    ],
                  },
                  {
                    text: 'Exemplos ROS',
                    items: [
                      { text: 'Aplicação ROS1', link: '/pt-pt/tutorials/sensors/imu/ros-examples/ros1' },
                      { text: 'Aplicação ROS2', link: '/pt-pt/tutorials/sensors/imu/ros-examples/ros2' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        '/pt-pt/topics/': [{ text: 'Tópicos', items: [{ text: 'Tópicos', link: '/pt-pt/topics/' }, { text: 'Flasheamento JetPack e Configuração do Sistema', link: '/pt-pt/topics/jetpack-setup' }, { text: 'Introdução ao Deploy de IA Edge', link: '/pt-pt/topics/edge-ai-intro' }, { text: 'Introdução à Inteligência Incorporada (LeRobot)', link: '/pt-pt/topics/embodied-ai-intro' }, { text: 'Tema Robot Learning', link: '/pt-pt/topics/robot-learning/' }, { text: 'Filosofia de Hardware Open Source', link: '/pt-pt/topics/open-source-hardware' }] }],
        '/pt-pt/tech/': [{ text: 'Docs Técnicos', items: [{ text: 'Docs Técnicos', link: '/pt-pt/tech/' }, { text: 'Referência de API', link: '/pt-pt/tech/api-reference' }, { text: 'Guia de Desenvolvimento', link: '/pt-pt/tech/dev-guide' }] }],
        '/pt-pt/community/': [{ text: 'Comunidade', items: [{ text: 'Comunidade', link: '/pt-pt/community/' }, { text: 'Guia de Contribuição', link: '/pt-pt/community/contributing' }] }],
        '/pt-pt/cases/': [{ text: 'Casos', items: [{ text: 'Histórias de Sucesso de Utilizadores', link: '/pt-pt/cases/' }] }],
        '/pt-pt/products/': [
          { text: 'Robôs', items: [
            { text: 'Kit Desenvolvedor SO-ARM101', link: '/pt-pt/products/so-arm101' },
            { text: 'Mão Dexterous de 4 Dedos AmazingHand', link: '/pt-pt/products/amazinghand' },
            { text: 'Placa Driver de Servo de Barramento', link: '/pt-pt/products/servo-driver-board' },
            { text: 'Garra Flexível TPU SO-ARM101', link: '/pt-pt/products/tpu-flexible-gripper' },
            { text: 'Kit de Visão Robótica SO-ARM101', link: '/pt-pt/products/robot-vision-kit' },
            { text: 'Robô Móvel Lekiwi', link: '/pt-pt/products/lekiwi' },
            { text: 'Suporte de Câmara Superior SO-ARM101', link: '/pt-pt/products/overhead-camera-mount' },
          ] },
          { text: 'Computação & Visão', items: [
            { text: 'Kit Jetson Orin NX Super', link: '/pt-pt/products/jetson-orin-nx-super-kit' },
            { text: 'Câmara de Profundidade RealSense', link: '/pt-pt/products/realsense-depth-camera' },
            { text: 'Módulo de Vídeo WiFi ESP32-S3', link: '/pt-pt/products/esp32-s3-wifi-module' },
            { text: 'Câmara CSI IMX219 79°', link: '/pt-pt/products/imx219-csi-camera' },
          ] },
          { text: 'Sensores', items: [
            { text: 'Módulo Inercial IMU', link: '/pt-pt/products/imu-module' },
            { text: 'Módulo GNSS GPS e Beidou', link: '/pt-pt/products/gps-beidou-module' },
          ] },
          { text: 'Acessórios', items: [
            { text: 'Pan-tilt de Servo 2-DOF', link: '/pt-pt/products/2dof-gimbal' },
            { text: 'Módulo de Interação de Voz KWS', link: '/pt-pt/products/kws-voice-module' },
            { text: 'Servo de Barramento Feetech', link: '/pt-pt/products/feetech-servo' },
            { text: 'Chaveador KVM 4-em-1', link: '/pt-pt/products/kvm-switch' },
            { text: 'Placa de Som USB sem Driver', link: '/pt-pt/products/usb-sound-card' },
            { text: 'Capturadora HDMI 4K', link: '/pt-pt/products/4k-hdmi-capture' },
          ] },
        ],
        '/pt-pt/downloads/': [{ text: 'Downloads', items: [{ text: 'Central de Downloads', link: '/pt-pt/downloads/' }] }],
        '/pt-pt/about/': [{ text: 'Sobre', items: [{ text: 'Sobre Nós', link: '/pt-pt/about/' }] }],
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
    // 首页 = 各语树根 index.md(root 或 {lang}/index.md);目录 index(tutorials/index.md 等)不算首页
    const segs = pageData.relativePath.split('/')
    const isHome = segs.length === 1 ? segs[0] === 'index.md'
      : (segs.length === 2 && segs[1] === 'index.md' && !!LANG_CODE[segs[0]])
    const faqLd = buildFaqPageLd(pageData.relativePath)
    const pageLang = langOf(pageData.relativePath)
    const breadcrumbLd = buildBreadcrumbLd(pageUrlOf(pageData.relativePath), pageData.title || '', pageLang)
    let ld
    if (isHome) {
      ld = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: '钜犀科技 Juxi Technology',
        url: base + '/',
        logo: base + '/images/logos/logo-black.png',
        description: '机器人与 AI 硬件的开放文档平台 — 机械臂、传感器、配件产品教程与技术文档',
        sameAs: [
          'https://github.com/Juxi-Technology',
          'https://huggingface.co/Juxi-Technology',
          'https://space.bilibili.com/3546906737248821',
          'https://www.juxitech.com',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'support@juxitech.com',
          contactType: 'customer service',
        },
      }
    } else if (faqLd) {
      // FAQ 页用 FAQPage 替代 Article(富媒体收割 + AI 引用,避免类型混杂)
      ld = faqLd
    } else {
      ld = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageData.title || 'Juxi Technology Wiki',
        description: pageData.description || '',
        url: base + '/' + pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, ''),
        // git 最后修改时间(毫秒时间戳,getGitTimestamp 返回 +new Date)→ ISO8601
        ...(pageData.lastUpdated ? { dateModified: new Date(pageData.lastUpdated).toISOString() } : {}),
        publisher: {
          '@type': 'Organization',
          name: 'Juxi Technology',
          url: base + '/',
        },
        inLanguage: pageLang,
      }
    }
    const heads: any[] = [
      // 逐页 canonical(与 hreflang 同一 URL 推导,404 等虚拟页不注入)
      !pageData.isNotFound && ['link', { rel: 'canonical', href: base + pageUrlOf(pageData.relativePath) }],
      // hreflang:11 语言 alternate + x-default(置顶,爬虫优先识别语言对应);
      // 404 虚拟页无对应内容,跳过(与 canonical 同步)
      ...(pageData.isNotFound ? [] : injectHreflang(pageData)),
      ['script', { type: 'application/ld+json' }, JSON.stringify(ld)],
    ].filter(Boolean)
    // 页面级 Open Graph(索引页与 404 跳过:与 canonical 同步)
    if (!pageData.isNotFound) {
      // 复刻 VitePress 的 <title> 规则:frontmatter titleTemplate 优先;
      // 页面 title 与站点 title 相同(zh 首页)或缺失时不加后缀,避免 "X | X"
      const tpl = (pageData as any).frontmatter?.titleTemplate
      const siteTitle = '钜犀科技 Wiki'
      const pgTitle = pageData.title || ''
      const ogTitle = tpl
        ? (String(tpl).includes(':title') ? String(tpl).replace(/:title/g, pgTitle)
          : (pgTitle ? pgTitle + ' | ' + String(tpl) : String(tpl)))
        : (!pgTitle || pgTitle === siteTitle ? siteTitle : pgTitle + ' | ' + siteTitle)
      heads.push(
        ['meta', { property: 'og:title', content: ogTitle }],
        ['meta', { property: 'og:description', content: pageData.description || 'Juxi Technology Wiki' }],
        ['meta', { property: 'og:url', content: base + pageUrlOf(pageData.relativePath) }],
        ['meta', { property: 'og:locale', content: OG_LOCALE[LANG_CODE[pageData.relativePath.split('/')[0]] || 'en'] || 'en_US' }],
      )
    }
    if (breadcrumbLd) heads.push(['script', { type: 'application/ld+json' }, JSON.stringify(breadcrumbLd)])
    return heads
  },
})
