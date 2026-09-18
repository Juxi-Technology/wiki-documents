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
// 各语言站点名:用于 <title> 后缀与 og:site_name。
// 此前 <title> 后缀取全局 title('钜犀科技 Wiki'),英文/日文/德文页标题也带中文后缀,不利英文搜索
const SITE_BRAND: Record<string, string> = { 'zh-hans': '钜犀科技 Wiki', 'zh-hant': '鉅犀科技 Wiki' }
const brandOf = (relativePath: string) => SITE_BRAND[relativePath.split('/')[0]] || 'Juxi Technology Wiki'

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
  // og:site_name 逐页按语言注入(见 transformHead);静态 head 无法区分语言
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
  title: '钜犀科技 Wiki',
  description: '钜犀科技产品教程与文档中心',
  head: [
  ],
  themeConfig: {
    siteTitle: '钜犀科技 Wiki',
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    outline: { level: [2, 3], label: '本页目录' },
    skipToContentLabel: '跳到主要内容',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchLabel: '显示模式',
    darkModeSwitchTitle: '切换到深色模式',
    lastUpdated: {
      text: '最后更新于 (UTC)',
      // forceLocale:日期格式跟随页面语言(默认跟随访客系统区域,英文页会显示中文格式)
      // timeZone: UTC 统一,timeZoneName 显式标注
      formatOptions: { forceLocale: true, timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
    },
    nav: [
      { text: '教程', link: '/zh-hans/tutorials/', activeMatch: '/zh-hans/tutorials/' },
      { text: '产品', link: '/zh-hans/products/', activeMatch: '/zh-hans/products/' },
      { text: '社区', link: '/zh-hans/community/', activeMatch: '/zh-hans/community/' },
      { text: '更多', items: [
        { text: '技术专题', link: '/zh-hans/topics/' },
        { text: '技术文档', link: '/zh-hans/tech/' },
        { text: '用户案例', link: '/zh-hans/cases/' },
        { text: '下载', link: '/zh-hans/downloads/' },
        { text: '关于我们', link: '/zh-hans/about/' },
      ] },
    ],
    sidebar: {
      '/zh-hans/tutorials/': [
        {
          text: '快速开始',
          items: [
            { text: '常见问题 FAQ', link: '/zh-hans/tutorials/faq' },
            { text: 'ROS 入门', link: '/zh-hans/tutorials/ros-intro' },
            { text: '飞书文档', link: '/zh-hans/tutorials/lark-wiki' },
          ],
        },
        {
          text: '学习资源',
          items: [
            { text: '学习资源首页', link: '/zh-hans/tutorials/learning-resources/' },
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
                { text: 'SO-ARM101 无线遥操作(ESP32-NanoCam 版)', link: '/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop' },
                { text: '无线遥操作排障指南', link: '/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting' },
                { text: 'SO-ARM101 双臂(双从臂)教程', link: '/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial' },
                { text: 'SO-ARM101 7-DOF 改造与 LeRobot 使用教程', link: '/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-7DOF-LeRobot' },
                { text: 'SoARM 系列舵机校准工具使用教程', link: '/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool' },
                {
                  text: 'LeRobot 完整课程',
                  collapsed: true,
                  items: [
                    { text: 'LeRobot 完整课程', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/' },
                    {
                      text: '1. 安装 LeRobot 环境',
                      collapsed: true,
                      items: [
                        { text: '第一步:安装 LeRobot 环境(Ubuntu)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu' },
                        { text: '第一步:安装 LeRobot 环境(Windows)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Windows' },
                        { text: '第一步:安装 LeRobot 环境(macOS)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/MacOS' },
                      ],
                    },
                    {
                      text: '2. 查看串口设备端口号',
                      collapsed: true,
                      items: [
                        { text: '第二步:查看串口设备端口号(Ubuntu)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Ubuntu' },
                        { text: '第二步:查看串口设备端口号(Windows)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Windows' },
                        { text: '第二步:查看串口设备端口号(macOS)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/MacOS' },
                      ],
                    },
                    {
                      text: '3. 校准机械臂',
                      collapsed: true,
                      items: [
                        { text: '第三步:校准机械臂(Ubuntu)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Ubuntu' },
                        { text: '第三步:校准机械臂(Windows)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Windows' },
                        { text: '第三步:校准机械臂(macOS)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/MacOS' },
                      ],
                    },
                    {
                      text: '4. 遥操作',
                      collapsed: true,
                      items: [
                        { text: '第四步:遥操作(Ubuntu)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Ubuntu' },
                        { text: '第四步:遥操作(Windows)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Windows' },
                        { text: '第四步:遥操作(macOS)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '5. 连接摄像头的遥操作',
                      collapsed: true,
                      items: [
                        { text: '第五步:连接摄像头的遥操作(Ubuntu)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu' },
                        { text: '第五步:连接摄像头的遥操作(Windows)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Windows' },
                        { text: '第五步:连接摄像头的遥操作(macOS)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '6. 采集数据集(真机)',
                      collapsed: true,
                      items: [
                        { text: '第六步:采集数据集(真机)——示教采集', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording' },
                        { text: '第六步:采集数据集(真机)——注意事项', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes' },
                        { text: '第六步:采集数据集(真机)——注册 Hugging Face 账号(可选)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account' },
                        { text: '第六步:采集数据集(真机)——上传数据集到 Hugging Face(可选)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload' },
                      ],
                    },
                    {
                      text: '7. 训练模型',
                      collapsed: true,
                      items: [
                        { text: '第七步:训练模型——本地 Ubuntu 训练', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu' },
                        { text: '第七步:训练模型——云 GPU 训练环境配置', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU' },
                        { text: '第七步:训练模型——wandb 查看实时训练曲线', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves' },
                        { text: '第七步:训练模型——上传模型到 Hugging Face(可选)', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload' },
                        { text: '第七步:训练模型——获得模型权重文件', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights' },
                        { text: '第七步:训练模型——ACT 训练命令', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT' },
                        { text: '第七步:训练模型——pi0 训练命令', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0' },
                        { text: '第七步:训练模型——pi0.5 训练命令', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5' },
                        { text: '第七步:训练模型——pi0fast 训练命令', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast' },
                        { text: '第七步:训练模型——smolvla 训练命令', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla' },
                      ],
                    },
                    {
                      text: '8. 模型推理',
                      collapsed: true,
                      items: [
                        { text: '第八步:模型推理——命令行说明', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference' },
                        { text: '第八步:模型推理——常见 Bug 及解决', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Common-Bugs' },
                        { text: '第八步:模型推理——ACT 推理命令', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-ACT' },
                        { text: '第八步:模型推理——pi0 推理命令', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0' },
                        { text: '第八步:模型推理——pi0.5 推理命令', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0.5' },
                        { text: '第八步:模型推理——smolvla 推理命令', link: '/zh-hans/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-smolvla' },
                      ],
                    },
                    {
                      text: '基础知识',
                      collapsed: true,
                      items: [
                        { text: '了解 LeRobot', link: '/zh-hans/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot' },
                        { text: 'Hugging Face 上的 LeRobot 数据集', link: '/zh-hans/tutorials/robot-arms/so-arm101/basics/HF-Datasets' },
                        { text: '模型训练的资料', link: '/zh-hans/tutorials/robot-arms/so-arm101/basics/Training-Resources' },
                        { text: 'SO-ARM 100 机械臂官方 3D 打印文件', link: '/zh-hans/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files' },
                        { text: 'URDF 文件及资料参考', link: '/zh-hans/tutorials/robot-arms/so-arm101/basics/URDF-Reference' },
                      ],
                    },
                    {
                      text: '专题与进阶',
                      collapsed: true,
                      items: [
                        { text: 'ROS2 仿真控制', link: '/zh-hans/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control' },
                        { text: '平行指夹爪安装教程', link: '/zh-hans/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              text: 'SO-ARM101 + AmazingHand 教程',
              collapsed: true,
              items: [
                { text: '课程总览', link: '/zh-hans/tutorials/robot-arms/so-arm-amazinghand/' },
                { text: '阶段一：环境搭建（Linux）', link: '/zh-hans/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Linux' },
                { text: '阶段一：环境搭建（Windows）', link: '/zh-hans/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Windows' },
                { text: '阶段二:灵巧手与双臂校准(Linux)', link: '/zh-hans/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Linux' },
                { text: '阶段二:灵巧手与双臂校准(Windows)', link: '/zh-hans/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Windows' },
                { text: '阶段三：遥操作（Linux）', link: '/zh-hans/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Linux' },
                { text: '阶段三：遥操作（Windows）', link: '/zh-hans/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Windows' },
                { text: '阶段四：数据采集（Linux）', link: '/zh-hans/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Linux' },
                { text: '阶段四：数据采集（Windows）', link: '/zh-hans/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Windows' },
                { text: '阶段五：模型训练（Linux）', link: '/zh-hans/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Linux' },
                { text: '阶段五：模型训练（Windows）', link: '/zh-hans/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Windows' },
                { text: '阶段六:模型部署(Linux)', link: '/zh-hans/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Linux' },
                { text: '阶段六:模型部署(Windows)', link: '/zh-hans/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Windows' },
              ],
            },
            {
              text: 'XLeRobot 教程',
              collapsed: true,
              items: [
                { text: '教程总览', link: '/zh-hans/tutorials/robot-arms/xlerobot/' },
                { text: '安装环境(macOS)', link: '/zh-hans/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS' },
                { text: '安装环境(Ubuntu)', link: '/zh-hans/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu' },
                { text: '安装环境(Windows)', link: '/zh-hans/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows' },
                { text: '移动 XLeRobot 文件', link: '/zh-hans/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files' },
                { text: '成品组装教程', link: '/zh-hans/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit' },
                { text: '散件组装教程', link: '/zh-hans/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: '界面控制教程', link: '/zh-hans/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: 'AmazingHand灵巧手产品资料', link: '/zh-hans/tutorials/robot-arms/amazing-hand/product-info' },
                { text: '官方示例运行教程', link: '/zh-hans/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'TTL 调试教程', link: '/zh-hans/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                {
                  text: 'PWM 舵机调试教程',
                  collapsed: true,
                  items: [
                    { text: '01-GUI可视化控制', link: '/zh-hans/tutorials/robot-arms/amazing-hand/pwm-debugging/01-GUI-Visual-Control' },
                    { text: '02-手势追踪教程', link: '/zh-hans/tutorials/robot-arms/amazing-hand/pwm-debugging/02-Gesture-Tracking' },
                    { text: '03-PWM舵机版本-使用手册', link: '/zh-hans/tutorials/robot-arms/amazing-hand/pwm-debugging/03-PWM-Servo-Manual' },
                    { text: '04-串口舵机版本-使用说明', link: '/zh-hans/tutorials/robot-arms/amazing-hand/pwm-debugging/04-Serial-Servo-Guide' },
                  ],
                },
                {
                  text: '手势追踪教程',
                  collapsed: true,
                  items: [
                    { text: 'Linux（Ubuntu）一键部署运行', link: '/zh-hans/tutorials/robot-arms/amazing-hand/gesture-tracking/01-Ubuntu' },
                    { text: 'Windows一键部署运行', link: '/zh-hans/tutorials/robot-arms/amazing-hand/gesture-tracking/02-Windows' },
                    { text: 'Mac一键部署运行', link: '/zh-hans/tutorials/robot-arms/amazing-hand/gesture-tracking/03-macOS' },
                  ],
                },
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
                { text: 'SCS0009 舵机调试工具使用教程', link: '/zh-hans/tutorials/accessories/feetech/SCS0009-Debug-Tool' },
              ],
            },
            {
              text: 'ESP32-NanoCam 图传模块',
              collapsed: true,
              items: [
                { text: 'ESP32-NanoCam 快速开始', link: '/zh-hans/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start' },
                { text: 'ESP32-NanoCam 硬件规格书', link: '/zh-hans/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec' },
                { text: 'ESP32-NanoCam 串口协议手册', link: '/zh-hans/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol' },
                {
                  text: 'AI 视觉教程(11 章)',
                  collapsed: true,
                  items: [
                    { text: '第 1 章:环境搭建', link: '/zh-hans/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup' },
                    { text: '第 2 章:快速上手', link: '/zh-hans/tutorials/accessories/esp32-nanocam/Ch02-Quick-Start' },
                    { text: '第 3 章:摄像头基础', link: '/zh-hans/tutorials/accessories/esp32-nanocam/Ch03-Camera-Basics' },
                    { text: '第 4 章:人脸检测', link: '/zh-hans/tutorials/accessories/esp32-nanocam/Ch04-Face-Detection' },
                    { text: '第 5 章:猫脸检测', link: '/zh-hans/tutorials/accessories/esp32-nanocam/Ch05-Cat-Face-Detection' },
                    { text: '第 6 章:颜色识别', link: '/zh-hans/tutorials/accessories/esp32-nanocam/Ch06-Color-Recognition' },
                    { text: '第 7 章:二维码扫描', link: '/zh-hans/tutorials/accessories/esp32-nanocam/Ch07-QR-Code-Scanning' },
                    { text: '第 8 章:人脸识别', link: '/zh-hans/tutorials/accessories/esp32-nanocam/Ch08-Face-Recognition' },
                    { text: '第 9 章:语音对话', link: '/zh-hans/tutorials/accessories/esp32-nanocam/Ch09-Voice-Chat' },
                    { text: '第 10 章:AI 视觉理解', link: '/zh-hans/tutorials/accessories/esp32-nanocam/Ch10-AI-Vision-Understanding' },
                    { text: '第 11 章:ESP-Claw 语音控制', link: '/zh-hans/tutorials/accessories/esp32-nanocam/Ch11-ESP-Claw-Voice-Control' },
                  ],
                },
              ],
            },
            {
              text: 'CSI 摄像头使用教程',
              collapsed: true,
              items: [
                { text: 'Jetson CSI 摄像头配置', link: '/zh-hans/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup' },
                { text: '自动对焦摄像头使用', link: '/zh-hans/tutorials/accessories/csi-camera/02-Auto-Focus-Camera' },
                { text: 'Jupyter Lab 使用', link: '/zh-hans/tutorials/accessories/csi-camera/03-JupyterLab' },
                { text: 'JetCam 使用', link: '/zh-hans/tutorials/accessories/csi-camera/04-JetCam' },
                { text: 'IMX219(树莓派)教程', link: '/zh-hans/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi' },
              ],
            },
            {
              text: 'AI 语音交互模块',
              collapsed: true,
              items: [
                { text: '快速上手', link: '/zh-hans/tutorials/accessories/ai-voice-module/Quick-Start' },
                { text: '产品资料', link: '/zh-hans/tutorials/accessories/ai-voice-module/Product-Info' },
                { text: '模块固件烧录', link: '/zh-hans/tutorials/accessories/ai-voice-module/Firmware-Flashing' },
                { text: '修改唤醒词和命令词', link: '/zh-hans/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit' },
                { text: '自定义协议词条制作', link: '/zh-hans/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries' },
                { text: 'ROS1语音交互', link: '/zh-hans/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction' },
                { text: 'ROS2语音交互', link: '/zh-hans/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction' },
                { text: '串口协议', link: '/zh-hans/tutorials/accessories/ai-voice-module/Serial-Protocol' },
                { text: 'IIC协议', link: '/zh-hans/tutorials/accessories/ai-voice-module/IIC-Protocol' },
                { text: 'PC通讯', link: '/zh-hans/tutorials/accessories/ai-voice-module/PC-Communication' },
                { text: 'Arduino: 串口通讯', link: '/zh-hans/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication' },
                { text: 'Arduino: IIC通讯', link: '/zh-hans/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication' },
                { text: 'Jetson: 串口通讯', link: '/zh-hans/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication' },
                { text: 'Jetson: IIC通讯', link: '/zh-hans/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication' },
                { text: 'RDK: 串口通讯', link: '/zh-hans/tutorials/accessories/ai-voice-module/RDK-Serial-Communication' },
                { text: 'RDK: IIC通讯', link: '/zh-hans/tutorials/accessories/ai-voice-module/RDK-IIC-Communication' },
                { text: '树莓派: 串口通讯', link: '/zh-hans/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication' },
                { text: '树莓派: IIC通讯', link: '/zh-hans/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication' },
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
                { text: '文件远程传输', link: '/zh-hans/tutorials/sensors/imu/remote-file-transfer' },
                { text: 'SSH文件传输', link: '/zh-hans/tutorials/sensors/imu/ssh-file-transfer' },
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
            {
              text: 'GPS 北斗定位模块',
              collapsed: true,
              items: [
                { text: '模块资料', link: '/zh-hans/tutorials/sensors/gps/GPS-Module-Info' },
                { text: '51 单片机:GPS 数据解析', link: '/zh-hans/tutorials/sensors/gps/51-MCU-GPS-Parsing' },
                { text: 'Arduino:位置信息读取', link: '/zh-hans/tutorials/sensors/gps/Arduino-Location-Reading' },
                { text: 'Arduino:位置信息解析', link: '/zh-hans/tutorials/sensors/gps/Arduino-Location-Parsing' },
                { text: 'STM32F103:GPS 解析输出', link: '/zh-hans/tutorials/sensors/gps/STM32F103-GPS-Parsing' },
                { text: 'Jetson:位置信息解析', link: '/zh-hans/tutorials/sensors/gps/Jetson-GPS-Parsing' },
                { text: 'Jetson:AGNSS 辅助定位', link: '/zh-hans/tutorials/sensors/gps/Jetson-AGNSS' },
                { text: 'Jetson:百度地图 API 申请', link: '/zh-hans/tutorials/sensors/gps/Jetson-Baidu-Map-API' },
                { text: '树莓派:位置信息解析', link: '/zh-hans/tutorials/sensors/gps/RaspberryPi-GPS-Parsing' },
                { text: '树莓派:AGNSS 辅助定位', link: '/zh-hans/tutorials/sensors/gps/RaspberryPi-AGNSS' },
                { text: '树莓派:百度地图 API 申请', link: '/zh-hans/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API' },
                { text: 'ROS:使用前准备', link: '/zh-hans/tutorials/sensors/gps/ROS-Preparation' },
                { text: 'ROS:读取 GPS 数据', link: '/zh-hans/tutorials/sensors/gps/ROS-Read-GPS-Data' },
                { text: 'ROS:绘制 GPS 轨迹', link: '/zh-hans/tutorials/sensors/gps/ROS-Draw-GPS-Track' },
                { text: '地图定位误差排查', link: '/zh-hans/tutorials/sensors/gps/Map-Location-Error' },
              ],
            },
          ],
        },
      ],
      '/zh-hans/topics/': [
        { text: '技术专题', items: [{ text: '专题首页', link: '/zh-hans/topics/' }, { text: 'JetPack 刷机与系统配置', link: '/zh-hans/topics/jetpack-setup' }, { text: '边缘 AI 部署入门', link: '/zh-hans/topics/edge-ai-intro' }, { text: '具身智能入门（LeRobot）', link: '/zh-hans/topics/embodied-ai-intro' }, { text: '机器人学习', link: '/zh-hans/topics/robot-learning/' }, { text: '我们为何构建开源——开源机器人硬件的案例', link: '/zh-hans/topics/open-source-hardware' }] },
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
          { text: 'JUXI 总线舵机驱动板', link: '/zh-hans/products/servo-driver-board' },
          { text: 'SO-ARM101 TPU 柔性夹爪', link: '/zh-hans/products/tpu-flexible-gripper' },
          { text: 'SO-ARM101 机械臂视觉套件', link: '/zh-hans/products/robot-vision-kit' },
          { text: 'SO-ARM101 开发套件', link: '/zh-hans/products/so-arm101' },
          { text: 'AmazingHand 开源 4 指灵巧手', link: '/zh-hans/products/amazinghand' },
          { text: 'Lekiwi 具身智能移动机器人', link: '/zh-hans/products/lekiwi' },
          { text: 'SO-ARM101 顶置相机支架', link: '/zh-hans/products/overhead-camera-mount' },
          { text: 'XLeRobot 双臂移动机器人', link: '/zh-hans/products/xlerobot' },
        ] },
        { text: '计算与视觉', items: [
          { text: 'Jetson Orin NX Super 开发套件', link: '/zh-hans/products/jetson-orin-nx-super-kit' },
          { text: '3D RealSense 深度相机', link: '/zh-hans/products/realsense-depth-camera' },
          { text: 'ESP32-S3 WiFi 视频模块', link: '/zh-hans/products/esp32-s3-wifi-module' },
          { text: '79° IMX219 CSI 摄像头', link: '/zh-hans/products/imx219-csi-camera' },
          { text: 'USB 自动对焦摄像头', link: '/zh-hans/products/usb-auto-focus-camera' },
        ] },
        { text: '传感器', items: [
          { text: 'GPS & 北斗 GNSS 定位模块', link: '/zh-hans/products/gps-beidou-module' },
          { text: 'IMU 高精度惯导模块', link: '/zh-hans/products/imu-module' },
        ] },
        { text: '配件', items: [
          { text: '2 自由度舵机云台', link: '/zh-hans/products/2dof-gimbal' },
          { text: 'KWS 语音交互模块', link: '/zh-hans/products/kws-voice-module' },
          { text: 'Feetech 总线舵机(SCS0009 / STS3215)', link: '/zh-hans/products/feetech-servo' },
          { text: '4 合 1 KVM 切换器', link: '/zh-hans/products/kvm-switch' },
          { text: 'USB 免驱声卡', link: '/zh-hans/products/usb-sound-card' },
          { text: '4K HDMI 采集卡', link: '/zh-hans/products/4k-hdmi-capture' },
          { text: 'AI 语音交互模块', link: '/zh-hans/products/ai-voice-module' },
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
  title: 'Juxi Technology Wiki',
  description: 'Juxi Technology Product Tutorials and Documentation Center',
  head: [
  ],
  themeConfig: {
    siteTitle: 'Juxi Technology Wiki',
    docFooter: { prev: 'Previous', next: 'Next' },
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',
    outline: { level: [2, 3], label: 'On this page' },
    skipToContentLabel: 'Skip to content',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchLabel: 'Appearance',
    darkModeSwitchTitle: 'Switch to dark theme',
    lastUpdated: {
      text: 'Last updated (UTC)',
      // forceLocale:日期格式跟随页面语言(默认跟随访客系统区域,英文页会显示中文格式)
      // timeZone: UTC 统一,timeZoneName 显式标注
      formatOptions: { forceLocale: true, timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
    },
    nav: [
      { text: 'Tutorials', link: '/tutorials/', activeMatch: '/tutorials/' },
      { text: 'Products', link: '/products/', activeMatch: '/products/' },
      { text: 'Community', link: '/community/', activeMatch: '/community/' },
      { text: 'More', items: [
        { text: 'Topics', link: '/topics/' },
        { text: 'Tech Docs', link: '/tech/' },
        { text: 'Cases', link: '/cases/' },
        { text: 'Downloads', link: '/downloads/' },
        { text: 'About', link: '/about/' },
      ] },
    ],
    sidebar: {
      '/tutorials/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'FAQ', link: '/tutorials/faq' },
            { text: 'ROS Intro', link: '/tutorials/ros-intro' },
            { text: 'Lark Docs', link: '/tutorials/lark-wiki' },
          ],
        },
        {
          text: 'Learning Resources',
          items: [
            { text: 'Learning Resources Home', link: '/tutorials/learning-resources/' },
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
                { text: 'SO-ARM101 Wireless Teleoperation (ESP32-NanoCam Version)', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop' },
                { text: 'Wireless Teleoperation Troubleshooting', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting' },
                { text: 'SO-ARM101 Bi-Arm (Dual Follower) Tutorial', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial' },
                { text: 'SO-ARM101 7-DOF Modification and LeRobot Tutorial', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-7DOF-LeRobot' },
                { text: 'SoARM Series Servo Calibration Tool Tutorial', link: '/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool' },
                {
                  text: 'LeRobot Full Course',
                  collapsed: true,
                  items: [
                    { text: 'LeRobot Course Overview', link: '/tutorials/robot-arms/so-arm101/lerobot/' },
                    {
                      text: '1. Environment Setup',
                      collapsed: true,
                      items: [
                        { text: 'Step 1: Environment Setup (Ubuntu)', link: '/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu' },
                        { text: 'Step 1: Environment Setup (Windows)', link: '/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Windows' },
                        { text: 'Step 1: Environment Setup (macOS)', link: '/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/MacOS' },
                      ],
                    },
                    {
                      text: '2. Serial Port Check',
                      collapsed: true,
                      items: [
                        { text: 'Step 2: Serial Port Check (Ubuntu)', link: '/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Ubuntu' },
                        { text: 'Step 2: Serial Port Check (Windows)', link: '/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Windows' },
                        { text: 'Step 2: Serial Port Check (macOS)', link: '/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/MacOS' },
                      ],
                    },
                    {
                      text: '3. Arm Calibration',
                      collapsed: true,
                      items: [
                        { text: 'Step 3: Arm Calibration (Ubuntu)', link: '/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Ubuntu' },
                        { text: 'Step 3: Arm Calibration (Windows)', link: '/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Windows' },
                        { text: 'Step 3: Arm Calibration (macOS)', link: '/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/MacOS' },
                      ],
                    },
                    {
                      text: '4. Teleoperation',
                      collapsed: true,
                      items: [
                        { text: 'Step 4: Teleoperation (Ubuntu)', link: '/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Ubuntu' },
                        { text: 'Step 4: Teleoperation (Windows)', link: '/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Windows' },
                        { text: 'Step 4: Teleoperation (macOS)', link: '/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '5. Camera Teleop',
                      collapsed: true,
                      items: [
                        { text: 'Step 5: Camera Teleoperation (Ubuntu)', link: '/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu' },
                        { text: 'Step 5: Camera Teleoperation (Windows)', link: '/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Windows' },
                        { text: 'Step 5: Camera Teleoperation (macOS)', link: '/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '6. Data Collection',
                      collapsed: true,
                      items: [
                        { text: 'Step 6: Teaching & Recording a Dataset', link: '/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording' },
                        { text: 'Step 6: Dataset Collection Notes', link: '/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes' },
                        { text: 'Step 6: Hugging Face Account (Optional)', link: '/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account' },
                        { text: 'Step 6: Upload Dataset to Hugging Face (Optional)', link: '/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload' },
                      ],
                    },
                    {
                      text: '7. Model Training',
                      collapsed: true,
                      items: [
                        { text: 'Step 7: Training — Local Ubuntu', link: '/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu' },
                        { text: 'Step 7: Training — Cloud GPU Setup', link: '/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU' },
                        { text: 'Step 7: Training — wandb Curves', link: '/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves' },
                        { text: 'Step 7: Training — Upload Model (Optional)', link: '/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload' },
                        { text: 'Step 7: Training — Model Weights', link: '/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights' },
                        { text: 'Step 7: Training — ACT Command', link: '/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT' },
                        { text: 'Step 7: Training — pi0 Command', link: '/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0' },
                        { text: 'Step 7: Training — pi0.5 Command', link: '/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5' },
                        { text: 'Step 7: Training — pi0fast Command', link: '/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast' },
                        { text: 'Step 7: Training — smolvla Command', link: '/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla' },
                      ],
                    },
                    {
                      text: '8. Model Inference',
                      collapsed: true,
                      items: [
                        { text: 'Step 8: Inference — CLI Reference', link: '/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference' },
                        { text: 'Step 8: Inference — Common Bugs', link: '/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Common-Bugs' },
                        { text: 'Step 8: Inference — ACT Command', link: '/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-ACT' },
                        { text: 'Step 8: Inference — pi0 Command', link: '/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0' },
                        { text: 'Step 8: Inference — pi0.5 Command', link: '/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0.5' },
                        { text: 'Step 8: Inference — smolvla Command', link: '/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-smolvla' },
                      ],
                    },
                    {
                      text: 'Basics',
                      collapsed: true,
                      items: [
                        { text: 'Understanding LeRobot', link: '/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot' },
                        { text: 'LeRobot Datasets on Hugging Face', link: '/tutorials/robot-arms/so-arm101/basics/HF-Datasets' },
                        { text: 'Model Training Resources', link: '/tutorials/robot-arms/so-arm101/basics/Training-Resources' },
                        { text: 'SO-ARM100 Official 3D Print Files', link: '/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files' },
                        { text: 'URDF Files and Reference Materials', link: '/tutorials/robot-arms/so-arm101/basics/URDF-Reference' },
                      ],
                    },
                    {
                      text: 'Extras & Advanced',
                      collapsed: true,
                      items: [
                        { text: 'ROS2 Simulation Control', link: '/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control' },
                        { text: 'Parallel Finger Gripper Installation', link: '/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              text: 'SO-ARM101 + AmazingHand Course',
              collapsed: true,
              items: [
                { text: 'Course Overview', link: '/tutorials/robot-arms/so-arm-amazinghand/' },
                { text: 'Stage 1: Environment Setup (Linux)', link: '/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Linux' },
                { text: 'Stage 1: Environment Setup (Windows)', link: '/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Windows' },
                { text: 'Stage 2: Hand & Arm Calibration (Linux)', link: '/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Linux' },
                { text: 'Stage 2: Hand & Arm Calibration (Windows)', link: '/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Windows' },
                { text: 'Stage 3: Teleoperation (Linux)', link: '/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Linux' },
                { text: 'Stage 3: Teleoperation (Windows)', link: '/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Windows' },
                { text: 'Stage 4: Data Collection (Linux)', link: '/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Linux' },
                { text: 'Stage 4: Data Collection (Windows)', link: '/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Windows' },
                { text: 'Stage 5: Model Training (Linux)', link: '/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Linux' },
                { text: 'Stage 5: Model Training (Windows)', link: '/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Windows' },
                { text: 'Stage 6: Model Deployment (Linux)', link: '/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Linux' },
                { text: 'Stage 6: Model Deployment (Windows)', link: '/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Windows' },
              ],
            },
            {
              text: 'XLeRobot Tutorials',
              collapsed: true,
              items: [
                { text: 'Tutorials Overview', link: '/tutorials/robot-arms/xlerobot/' },
                { text: 'Environment Setup (macOS)', link: '/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS' },
                { text: 'Environment Setup (Ubuntu)', link: '/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu' },
                { text: 'Environment Setup (Windows)', link: '/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows' },
                { text: 'Move XLeRobot Files', link: '/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files' },
                { text: 'Assembled-Kit Assembly', link: '/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit' },
                { text: 'Parts-Kit Assembly', link: '/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: 'Interface Control Tutorial', link: '/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: 'AmazingHand Dexterous Hand Product Information', link: '/tutorials/robot-arms/amazing-hand/product-info' },
                { text: 'Official Example Tutorial', link: '/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'TTL Debugging Tutorial', link: '/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                {
                  text: 'PWM Servo Debugging',
                  collapsed: true,
                  items: [
                    { text: '01-GUI Visual Control', link: '/tutorials/robot-arms/amazing-hand/pwm-debugging/01-GUI-Visual-Control' },
                    { text: '02-Gesture Tracking Tutorial', link: '/tutorials/robot-arms/amazing-hand/pwm-debugging/02-Gesture-Tracking' },
                    { text: '03-PWM Servo Version-User Manual', link: '/tutorials/robot-arms/amazing-hand/pwm-debugging/03-PWM-Servo-Manual' },
                    { text: '04-Serial Bus Servo Version-User Instructions', link: '/tutorials/robot-arms/amazing-hand/pwm-debugging/04-Serial-Servo-Guide' },
                  ],
                },
                {
                  text: 'Gesture Tracking',
                  collapsed: true,
                  items: [
                    { text: 'Linux (Ubuntu) One-Click Deployment and Run', link: '/tutorials/robot-arms/amazing-hand/gesture-tracking/01-Ubuntu' },
                    { text: 'Windows One-Click Deployment and Run', link: '/tutorials/robot-arms/amazing-hand/gesture-tracking/02-Windows' },
                    { text: 'Mac One-Click Deployment and Run', link: '/tutorials/robot-arms/amazing-hand/gesture-tracking/03-macOS' },
                  ],
                },
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
                { text: 'SCS0009 Servo Debug Tool Tutorial', link: '/tutorials/accessories/feetech/SCS0009-Debug-Tool' },
              ],
            },
            {
              text: 'ESP32-NanoCam Video Module',
              collapsed: true,
              items: [
                { text: 'ESP32-NanoCam Quick Start', link: '/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start' },
                { text: 'ESP32-NanoCam Hardware Spec', link: '/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec' },
                { text: 'ESP32-NanoCam Serial Protocol Manual', link: '/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol' },
                {
                  text: 'AI Vision Tutorial (11 chapters)',
                  collapsed: true,
                  items: [
                    { text: 'Chapter 1: Environment Setup', link: '/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup' },
                    { text: 'Chapter 2: Quick Start', link: '/tutorials/accessories/esp32-nanocam/Ch02-Quick-Start' },
                    { text: 'Chapter 3: Camera Basics', link: '/tutorials/accessories/esp32-nanocam/Ch03-Camera-Basics' },
                    { text: 'Chapter 4: Face Detection', link: '/tutorials/accessories/esp32-nanocam/Ch04-Face-Detection' },
                    { text: 'Chapter 5: Cat Face Detection', link: '/tutorials/accessories/esp32-nanocam/Ch05-Cat-Face-Detection' },
                    { text: 'Chapter 6: Color Recognition', link: '/tutorials/accessories/esp32-nanocam/Ch06-Color-Recognition' },
                    { text: 'Chapter 7: QR Code Scanning', link: '/tutorials/accessories/esp32-nanocam/Ch07-QR-Code-Scanning' },
                    { text: 'Chapter 8: Face Recognition', link: '/tutorials/accessories/esp32-nanocam/Ch08-Face-Recognition' },
                    { text: 'Chapter 9: Voice Chat', link: '/tutorials/accessories/esp32-nanocam/Ch09-Voice-Chat' },
                    { text: 'Chapter 10: AI Vision Understanding', link: '/tutorials/accessories/esp32-nanocam/Ch10-AI-Vision-Understanding' },
                    { text: 'Chapter 11: ESP-Claw Voice Control', link: '/tutorials/accessories/esp32-nanocam/Ch11-ESP-Claw-Voice-Control' },
                  ],
                },
              ],
            },
            {
              text: 'CSI Camera Tutorials',
              collapsed: true,
              items: [
                { text: 'Jetson CSI Camera Setup', link: '/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup' },
                { text: 'Auto-Focus Camera Usage', link: '/tutorials/accessories/csi-camera/02-Auto-Focus-Camera' },
                { text: 'Using JupyterLab', link: '/tutorials/accessories/csi-camera/03-JupyterLab' },
                { text: 'Using JetCam', link: '/tutorials/accessories/csi-camera/04-JetCam' },
                { text: 'IMX219 on Raspberry Pi', link: '/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi' },
              ],
            },
            {
              text: 'AI Voice Interaction Module',
              collapsed: true,
              items: [
                { text: 'Quick Start', link: '/tutorials/accessories/ai-voice-module/Quick-Start' },
                { text: 'Product Information', link: '/tutorials/accessories/ai-voice-module/Product-Info' },
                { text: 'Module Firmware Flashing', link: '/tutorials/accessories/ai-voice-module/Firmware-Flashing' },
                { text: 'Modify the Wake Word and Command Words', link: '/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit' },
                { text: 'Custom Protocol Entry Creation', link: '/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries' },
                { text: 'ROS1 Voice Interaction', link: '/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction' },
                { text: 'ROS2 Voice Interaction', link: '/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction' },
                { text: 'Serial Port Protocol', link: '/tutorials/accessories/ai-voice-module/Serial-Protocol' },
                { text: 'IIC Protocol', link: '/tutorials/accessories/ai-voice-module/IIC-Protocol' },
                { text: 'PC Communication', link: '/tutorials/accessories/ai-voice-module/PC-Communication' },
                { text: 'Arduino: Serial Port Communication', link: '/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication' },
                { text: 'Arduino: IIC Communication', link: '/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication' },
                { text: 'Jetson: Serial Port Communication', link: '/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication' },
                { text: 'Jetson: IIC Communication', link: '/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication' },
                { text: 'RDK: Serial Port Communication', link: '/tutorials/accessories/ai-voice-module/RDK-Serial-Communication' },
                { text: 'RDK: IIC Communication', link: '/tutorials/accessories/ai-voice-module/RDK-IIC-Communication' },
                { text: 'Raspberry Pi: Serial Port Communication', link: '/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication' },
                { text: 'Raspberry Pi: IIC Communication', link: '/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication' },
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
                { text: 'Remote File Transfer', link: '/tutorials/sensors/imu/remote-file-transfer' },
                { text: 'SSH File Transfer', link: '/tutorials/sensors/imu/ssh-file-transfer' },
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
            {
              text: 'GPS & BeiDou Module',
              collapsed: true,
              items: [
                { text: 'Module Info', link: '/tutorials/sensors/gps/GPS-Module-Info' },
                { text: '51 MCU: GPS Parsing', link: '/tutorials/sensors/gps/51-MCU-GPS-Parsing' },
                { text: 'Arduino: Location Reading', link: '/tutorials/sensors/gps/Arduino-Location-Reading' },
                { text: 'Arduino: Location Parsing', link: '/tutorials/sensors/gps/Arduino-Location-Parsing' },
                { text: 'STM32F103: GPS Parsing Output', link: '/tutorials/sensors/gps/STM32F103-GPS-Parsing' },
                { text: 'Jetson: GPS Parsing', link: '/tutorials/sensors/gps/Jetson-GPS-Parsing' },
                { text: 'Jetson: AGNSS Positioning', link: '/tutorials/sensors/gps/Jetson-AGNSS' },
                { text: 'Jetson: Baidu Map API', link: '/tutorials/sensors/gps/Jetson-Baidu-Map-API' },
                { text: 'Raspberry Pi: GPS Parsing', link: '/tutorials/sensors/gps/RaspberryPi-GPS-Parsing' },
                { text: 'Raspberry Pi: AGNSS Positioning', link: '/tutorials/sensors/gps/RaspberryPi-AGNSS' },
                { text: 'Raspberry Pi: Baidu Map API', link: '/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API' },
                { text: 'ROS: Preparation', link: '/tutorials/sensors/gps/ROS-Preparation' },
                { text: 'ROS: Reading GPS Data', link: '/tutorials/sensors/gps/ROS-Read-GPS-Data' },
                { text: 'ROS: Drawing GPS Tracks', link: '/tutorials/sensors/gps/ROS-Draw-GPS-Track' },
                { text: 'Map Location Error', link: '/tutorials/sensors/gps/Map-Location-Error' },
              ],
            },
          ],
        },
      ],
      '/topics/': [
        { text: 'Topics', items: [{ text: 'Topics Home', link: '/topics/' }, { text: 'JetPack Flashing & Setup', link: '/topics/jetpack-setup' }, { text: 'Edge AI Deployment Intro', link: '/topics/edge-ai-intro' }, { text: 'Embodied AI Intro (LeRobot)', link: '/topics/embodied-ai-intro' }, { text: 'Robot Learning', link: '/topics/robot-learning/' }, { text: 'Why We Build Open — The Case for Open-Source Robotics Hardware', link: '/topics/open-source-hardware' }] },
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
          { text: 'JUXI Bus Servo Driver Board', link: '/products/servo-driver-board' },
          { text: 'SO-ARM101 TPU Flexible Gripper', link: '/products/tpu-flexible-gripper' },
          { text: 'SO-ARM101 Robot Vision Kit', link: '/products/robot-vision-kit' },
          { text: 'SO-ARM101 Developer Kit', link: '/products/so-arm101' },
          { text: 'AmazingHand Open-Source 4-Finger Dexterous Hand', link: '/products/amazinghand' },
          { text: 'Lekiwi Embodied Intelligence Mobile Robot', link: '/products/lekiwi' },
          { text: 'SO-ARM101 Overhead Camera Mount', link: '/products/overhead-camera-mount' },
          { text: 'XLeRobot Dual-Arm Mobile Robot', link: '/products/xlerobot' },
        ] },
        { text: 'Compute & Vision', items: [
          { text: 'Jetson Orin NX Super Developer Kit', link: '/products/jetson-orin-nx-super-kit' },
          { text: '3D RealSense Depth Camera', link: '/products/realsense-depth-camera' },
          { text: 'ESP32-S3 WiFi Video Module', link: '/products/esp32-s3-wifi-module' },
          { text: '79° IMX219 CSI Camera', link: '/products/imx219-csi-camera' },
          { text: 'USB Auto-Focus Camera', link: '/products/usb-auto-focus-camera' },
        ] },
        { text: 'Sensors', items: [
          { text: 'GPS & BeiDou GNSS Positioning Module', link: '/products/gps-beidou-module' },
          { text: 'IMU High-Precision Inertial Module', link: '/products/imu-module' },
        ] },
        { text: 'Accessories', items: [
          { text: '2-DOF Servo Pan-Tilt Unit', link: '/products/2dof-gimbal' },
          { text: 'KWS Voice Interaction Module', link: '/products/kws-voice-module' },
          { text: 'Feetech Bus Servos (SCS0009 / STS3215)', link: '/products/feetech-servo' },
          { text: '4-in-1 KVM Switch', link: '/products/kvm-switch' },
          { text: 'USB Driver-Free Sound Card', link: '/products/usb-sound-card' },
          { text: '4K HDMI Capture Card', link: '/products/4k-hdmi-capture' },
          { text: 'AI Voice Interaction Module', link: '/products/ai-voice-module' },
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
  title: '鉅犀科技 Wiki',
  description: '鉅犀科技產品教程與文檔中心',
  head: [
  ],
  themeConfig: {
    siteTitle: '鉅犀科技 Wiki',
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '選單',
    returnToTopLabel: '回到頂部',
    outline: { level: [2, 3], label: '本頁目錄' },
    skipToContentLabel: '跳到主要內容',
    lightModeSwitchTitle: '切換到淺色模式',
    darkModeSwitchLabel: '外觀模式',
    darkModeSwitchTitle: '切換到深色模式',
    lastUpdated: {
      text: '最後更新於 (UTC)',
      // forceLocale:日期格式跟随页面语言(默认跟随访客系统区域,英文页会显示中文格式)
      // timeZone: UTC 统一,timeZoneName 显式标注
      formatOptions: { forceLocale: true, timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
    },
    nav: [
      { text: '教程', link: '/zh-hant/tutorials/', activeMatch: '/zh-hant/tutorials/' },
      { text: '產品', link: '/zh-hant/products/', activeMatch: '/zh-hant/products/' },
      { text: '社區', link: '/zh-hant/community/', activeMatch: '/zh-hant/community/' },
      { text: '更多', items: [
        { text: '技術專題', link: '/zh-hant/topics/' },
        { text: '技術文檔', link: '/zh-hant/tech/' },
        { text: '用戶案例', link: '/zh-hant/cases/' },
        { text: '下載', link: '/zh-hant/downloads/' },
        { text: '關於我們', link: '/zh-hant/about/' },
      ] },
    ],
    sidebar: {
      '/zh-hant/tutorials/': [
        {
          text: '快速開始',
          items: [
            { text: '常見問題 FAQ', link: '/zh-hant/tutorials/faq' },
            { text: 'ROS 入門', link: '/zh-hant/tutorials/ros-intro' },
            { text: '飛書文檔', link: '/zh-hant/tutorials/lark-wiki' },
          ],
        },
        {
          text: '學習資源',
          items: [
            { text: '學習資源首頁', link: '/zh-hant/tutorials/learning-resources/' },
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
                { text: 'SO-ARM101 無線遙操作(ESP32-NanoCam 版)', link: '/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop' },
                { text: '無線遙操作排障指南', link: '/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting' },
                { text: 'SO-ARM101 雙臂(雙從動臂)教程', link: '/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial' },
                { text: 'SO-ARM101 7-DOF 改造與 LeRobot 使用教程', link: '/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-7DOF-LeRobot' },
                { text: 'SoARM 系列舵機校準工具使用教程', link: '/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool' },
                {
                  text: 'LeRobot 完整課程',
                  collapsed: true,
                  items: [
                    { text: 'LeRobot 完整課程', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/' },
                    {
                      text: '1. 安裝 LeRobot 環境',
                      collapsed: true,
                      items: [
                        { text: '第一步:安裝 LeRobot 環境(Ubuntu)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu' },
                        { text: '第一步:安裝 LeRobot 環境(Windows)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Windows' },
                        { text: '第一步:安裝 LeRobot 環境(macOS)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/MacOS' },
                      ],
                    },
                    {
                      text: '2. 查看串列埠編號',
                      collapsed: true,
                      items: [
                        { text: '第二步:查看串列埠編號(Ubuntu)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Ubuntu' },
                        { text: '第二步:查看串列埠編號(Windows)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Windows' },
                        { text: '第二步:查看串列埠編號(macOS)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/MacOS' },
                      ],
                    },
                    {
                      text: '3. 校準機械臂',
                      collapsed: true,
                      items: [
                        { text: '第三步:校準機械臂(Ubuntu)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Ubuntu' },
                        { text: '第三步:校準機械臂(Windows)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Windows' },
                        { text: '第三步:校準機械臂(macOS)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/MacOS' },
                      ],
                    },
                    {
                      text: '4. 遙操作',
                      collapsed: true,
                      items: [
                        { text: '第四步:遙操作(Ubuntu)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Ubuntu' },
                        { text: '第四步:遙操作(Windows)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Windows' },
                        { text: '第四步:遙操作(macOS)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '5. 連接攝像頭的遙操作',
                      collapsed: true,
                      items: [
                        { text: '第五步:連接攝像頭的遙操作(Ubuntu)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu' },
                        { text: '第五步:連接攝像頭的遙操作(Windows)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Windows' },
                        { text: '第五步:連接攝像頭的遙操作(macOS)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '6. 採集數據集(實機)',
                      collapsed: true,
                      items: [
                        { text: '第六步:示教採集數據集', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording' },
                        { text: '第六步:數據集採集注意事項', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes' },
                        { text: '第六步:註冊 Hugging Face 帳號(可選)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account' },
                        { text: '第六步:上傳數據集到 Hugging Face(可選)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload' },
                      ],
                    },
                    {
                      text: '7. 訓練模型',
                      collapsed: true,
                      items: [
                        { text: '第七步:本機 Ubuntu 訓練', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu' },
                        { text: '第七步:雲端 GPU 訓練環境設定', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU' },
                        { text: '第七步:wandb 查看實時訓練曲線', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves' },
                        { text: '第七步:上傳模型到 Hugging Face(可選)', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload' },
                        { text: '第七步:取得模型權重檔案', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights' },
                        { text: '第七步:ACT 訓練命令列', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT' },
                        { text: '第七步:pi0 訓練命令列', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0' },
                        { text: '第七步:pi0.5 訓練命令列', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5' },
                        { text: '第七步:pi0fast 訓練命令列', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast' },
                        { text: '第七步:SmolVLA 訓練命令列', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla' },
                      ],
                    },
                    {
                      text: '8. 模型推論',
                      collapsed: true,
                      items: [
                        { text: '第八步:推論命令列說明', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference' },
                        { text: '第八步:常見錯誤與排解', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Common-Bugs' },
                        { text: '第八步:ACT 推論命令列', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-ACT' },
                        { text: '第八步:pi0 推論命令列', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0' },
                        { text: '第八步:pi0.5 推論命令列', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0.5' },
                        { text: '第八步:SmolVLA 推論命令列', link: '/zh-hant/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-smolvla' },
                      ],
                    },
                    {
                      text: '基礎知識',
                      collapsed: true,
                      items: [
                        { text: '了解 LeRobot', link: '/zh-hant/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot' },
                        { text: 'Hugging Face 上的 LeRobot 數據集', link: '/zh-hant/tutorials/robot-arms/so-arm101/basics/HF-Datasets' },
                        { text: '模型訓練資源', link: '/zh-hant/tutorials/robot-arms/so-arm101/basics/Training-Resources' },
                        { text: 'SO-ARM 100 機械臂官方 3D 列印檔案', link: '/zh-hant/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files' },
                        { text: 'URDF 檔案及資料參考', link: '/zh-hant/tutorials/robot-arms/so-arm101/basics/URDF-Reference' },
                      ],
                    },
                    {
                      text: '其他與進階',
                      collapsed: true,
                      items: [
                        { text: 'ROS2 模擬控制', link: '/zh-hant/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control' },
                        { text: '平行指夾爪安裝', link: '/zh-hant/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              text: 'SO-ARM101 + AmazingHand 教程',
              collapsed: true,
              items: [
                { text: '課程總覽', link: '/zh-hant/tutorials/robot-arms/so-arm-amazinghand/' },
                { text: '階段一：環境搭建（Linux）', link: '/zh-hant/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Linux' },
                { text: '階段一：環境搭建（Windows）', link: '/zh-hant/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Windows' },
                { text: '階段二:靈巧手與雙臂校準(Linux)', link: '/zh-hant/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Linux' },
                { text: '階段二:靈巧手與雙臂校準(Windows)', link: '/zh-hant/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Windows' },
                { text: '階段三：遙操作（Linux）', link: '/zh-hant/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Linux' },
                { text: '階段三：遙操作（Windows）', link: '/zh-hant/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Windows' },
                { text: '階段四：數據採集（Linux）', link: '/zh-hant/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Linux' },
                { text: '階段四：數據採集（Windows）', link: '/zh-hant/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Windows' },
                { text: '階段五：模型訓練（Linux）', link: '/zh-hant/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Linux' },
                { text: '階段五：模型訓練（Windows）', link: '/zh-hant/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Windows' },
                { text: '階段六:模型部署(Linux)', link: '/zh-hant/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Linux' },
                { text: '階段六:模型部署(Windows)', link: '/zh-hant/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Windows' },
              ],
            },
            {
              text: 'XLeRobot 教程',
              collapsed: true,
              items: [
                { text: '教程總覽', link: '/zh-hant/tutorials/robot-arms/xlerobot/' },
                { text: '安裝環境(macOS)', link: '/zh-hant/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS' },
                { text: '安裝環境(Ubuntu)', link: '/zh-hant/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu' },
                { text: '安裝環境(Windows)', link: '/zh-hant/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows' },
                { text: '移動 XLeRobot 文件', link: '/zh-hant/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files' },
                { text: '成品組裝教程', link: '/zh-hant/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit' },
                { text: '散件組裝教程', link: '/zh-hant/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: '界面控制教程', link: '/zh-hant/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: 'AmazingHand靈巧手產品資料', link: '/zh-hant/tutorials/robot-arms/amazing-hand/product-info' },
                { text: '官方示例運行教程', link: '/zh-hant/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'TTL 調試教程', link: '/zh-hant/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                {
                  text: 'PWM 舵機調試教程',
                  collapsed: true,
                  items: [
                    { text: '01-GUI可視化控制', link: '/zh-hant/tutorials/robot-arms/amazing-hand/pwm-debugging/01-GUI-Visual-Control' },
                    { text: '02-手勢追蹤教程', link: '/zh-hant/tutorials/robot-arms/amazing-hand/pwm-debugging/02-Gesture-Tracking' },
                    { text: '03-PWM舵機版本-使用手冊', link: '/zh-hant/tutorials/robot-arms/amazing-hand/pwm-debugging/03-PWM-Servo-Manual' },
                    { text: '04-串口舵機版本-使用說明', link: '/zh-hant/tutorials/robot-arms/amazing-hand/pwm-debugging/04-Serial-Servo-Guide' },
                  ],
                },
                {
                  text: '手勢追蹤教程',
                  collapsed: true,
                  items: [
                    { text: 'Linux（Ubuntu）一鍵部署執行', link: '/zh-hant/tutorials/robot-arms/amazing-hand/gesture-tracking/01-Ubuntu' },
                    { text: 'Windows一鍵部署執行', link: '/zh-hant/tutorials/robot-arms/amazing-hand/gesture-tracking/02-Windows' },
                    { text: 'Mac一鍵部署執行', link: '/zh-hant/tutorials/robot-arms/amazing-hand/gesture-tracking/03-macOS' },
                  ],
                },
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
                { text: 'SCS0009 舵機調試工具使用教程', link: '/zh-hant/tutorials/accessories/feetech/SCS0009-Debug-Tool' },
              ],
            },
            {
              text: 'ESP32-NanoCam 圖傳模組',
              collapsed: true,
              items: [
                { text: 'ESP32-NanoCam 快速開始', link: '/zh-hant/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start' },
                { text: 'ESP32-NanoCam 硬體規格書', link: '/zh-hant/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec' },
                { text: 'ESP32-NanoCam 串口協議手冊', link: '/zh-hant/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol' },
                {
                  text: 'AI 視覺教程(11 章)',
                  collapsed: true,
                  items: [
                    { text: '第 1 章:環境搭建', link: '/zh-hant/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup' },
                    { text: '第 2 章:快速上手', link: '/zh-hant/tutorials/accessories/esp32-nanocam/Ch02-Quick-Start' },
                    { text: '第 3 章:攝像頭基礎', link: '/zh-hant/tutorials/accessories/esp32-nanocam/Ch03-Camera-Basics' },
                    { text: '第 4 章:人臉檢測', link: '/zh-hant/tutorials/accessories/esp32-nanocam/Ch04-Face-Detection' },
                    { text: '第 5 章:貓臉檢測', link: '/zh-hant/tutorials/accessories/esp32-nanocam/Ch05-Cat-Face-Detection' },
                    { text: '第 6 章:顏色識別', link: '/zh-hant/tutorials/accessories/esp32-nanocam/Ch06-Color-Recognition' },
                    { text: '第 7 章:二維碼掃描', link: '/zh-hant/tutorials/accessories/esp32-nanocam/Ch07-QR-Code-Scanning' },
                    { text: '第 8 章:人臉識別', link: '/zh-hant/tutorials/accessories/esp32-nanocam/Ch08-Face-Recognition' },
                    { text: '第 9 章:語音對話', link: '/zh-hant/tutorials/accessories/esp32-nanocam/Ch09-Voice-Chat' },
                    { text: '第 10 章:AI 視覺理解', link: '/zh-hant/tutorials/accessories/esp32-nanocam/Ch10-AI-Vision-Understanding' },
                    { text: '第 11 章:ESP-Claw 語音控制', link: '/zh-hant/tutorials/accessories/esp32-nanocam/Ch11-ESP-Claw-Voice-Control' },
                  ],
                },
              ],
            },
            {
              text: 'CSI 攝像頭使用教程',
              collapsed: true,
              items: [
                { text: 'Jetson CSI 攝像頭配置', link: '/zh-hant/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup' },
                { text: '自動對焦攝像頭使用', link: '/zh-hant/tutorials/accessories/csi-camera/02-Auto-Focus-Camera' },
                { text: 'Jupyter Lab 使用', link: '/zh-hant/tutorials/accessories/csi-camera/03-JupyterLab' },
                { text: 'JetCam 使用', link: '/zh-hant/tutorials/accessories/csi-camera/04-JetCam' },
                { text: 'IMX219(樹莓派)教程', link: '/zh-hant/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi' },
              ],
            },
            {
              text: 'AI 語音交互模組',
              collapsed: true,
              items: [
                { text: '快速上手', link: '/zh-hant/tutorials/accessories/ai-voice-module/Quick-Start' },
                { text: '產品資料', link: '/zh-hant/tutorials/accessories/ai-voice-module/Product-Info' },
                { text: '模組韌體燒錄', link: '/zh-hant/tutorials/accessories/ai-voice-module/Firmware-Flashing' },
                { text: '修改喚醒詞和命令詞', link: '/zh-hant/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit' },
                { text: '自訂協定詞條製作', link: '/zh-hant/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries' },
                { text: 'ROS1語音互動', link: '/zh-hant/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction' },
                { text: 'ROS2語音互動', link: '/zh-hant/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction' },
                { text: '串列埠協定', link: '/zh-hant/tutorials/accessories/ai-voice-module/Serial-Protocol' },
                { text: 'IIC協定', link: '/zh-hant/tutorials/accessories/ai-voice-module/IIC-Protocol' },
                { text: 'PC通訊', link: '/zh-hant/tutorials/accessories/ai-voice-module/PC-Communication' },
                { text: 'Arduino: 串列埠通訊', link: '/zh-hant/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication' },
                { text: 'Arduino: IIC通訊', link: '/zh-hant/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication' },
                { text: 'Jetson: 串列埠通訊', link: '/zh-hant/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication' },
                { text: 'Jetson: IIC通訊', link: '/zh-hant/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication' },
                { text: 'RDK: 串列埠通訊', link: '/zh-hant/tutorials/accessories/ai-voice-module/RDK-Serial-Communication' },
                { text: 'RDK: IIC通訊', link: '/zh-hant/tutorials/accessories/ai-voice-module/RDK-IIC-Communication' },
                { text: '樹莓派: 串列埠通訊', link: '/zh-hant/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication' },
                { text: '樹莓派: IIC通訊', link: '/zh-hant/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication' },
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
                { text: '檔案遠程傳輸', link: '/zh-hant/tutorials/sensors/imu/remote-file-transfer' },
                { text: 'SSH檔案傳輸', link: '/zh-hant/tutorials/sensors/imu/ssh-file-transfer' },
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
            {
              text: 'GPS 北斗定位模組',
              collapsed: true,
              items: [
                { text: '模組資料', link: '/zh-hant/tutorials/sensors/gps/GPS-Module-Info' },
                { text: '51 單片機:GPS 數據解析', link: '/zh-hant/tutorials/sensors/gps/51-MCU-GPS-Parsing' },
                { text: 'Arduino:位置資訊讀取', link: '/zh-hant/tutorials/sensors/gps/Arduino-Location-Reading' },
                { text: 'Arduino:位置資訊解析', link: '/zh-hant/tutorials/sensors/gps/Arduino-Location-Parsing' },
                { text: 'STM32F103:GPS 解析輸出', link: '/zh-hant/tutorials/sensors/gps/STM32F103-GPS-Parsing' },
                { text: 'Jetson:位置資訊解析', link: '/zh-hant/tutorials/sensors/gps/Jetson-GPS-Parsing' },
                { text: 'Jetson:AGNSS 輔助定位', link: '/zh-hant/tutorials/sensors/gps/Jetson-AGNSS' },
                { text: 'Jetson:百度地圖 API 申請', link: '/zh-hant/tutorials/sensors/gps/Jetson-Baidu-Map-API' },
                { text: '樹莓派:位置資訊解析', link: '/zh-hant/tutorials/sensors/gps/RaspberryPi-GPS-Parsing' },
                { text: '樹莓派:AGNSS 輔助定位', link: '/zh-hant/tutorials/sensors/gps/RaspberryPi-AGNSS' },
                { text: '樹莓派:百度地圖 API 申請', link: '/zh-hant/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API' },
                { text: 'ROS:使用前準備', link: '/zh-hant/tutorials/sensors/gps/ROS-Preparation' },
                { text: 'ROS:讀取 GPS 數據', link: '/zh-hant/tutorials/sensors/gps/ROS-Read-GPS-Data' },
                { text: 'ROS:繪製 GPS 軌跡', link: '/zh-hant/tutorials/sensors/gps/ROS-Draw-GPS-Track' },
                { text: '地圖定位誤差排查', link: '/zh-hant/tutorials/sensors/gps/Map-Location-Error' },
              ],
            },
          ],
        },
      ],
      '/zh-hant/topics/': [
        { text: '技術專題', items: [{ text: '專題首頁', link: '/zh-hant/topics/' }, { text: 'JetPack 刷機與系統配置', link: '/zh-hant/topics/jetpack-setup' }, { text: '邊緣 AI 部署入門', link: '/zh-hant/topics/edge-ai-intro' }, { text: '具身智能入門（LeRobot）', link: '/zh-hant/topics/embodied-ai-intro' }, { text: '機器人學習', link: '/zh-hant/topics/robot-learning/' }, { text: '我們為何構建開源——開源機器人硬體的案例', link: '/zh-hant/topics/open-source-hardware' }] },
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
          { text: 'JUXI 總線舵機驅動板', link: '/zh-hant/products/servo-driver-board' },
          { text: 'SO-ARM101 TPU 柔性夾爪', link: '/zh-hant/products/tpu-flexible-gripper' },
          { text: 'SO-ARM101 機械臂視覺套件', link: '/zh-hant/products/robot-vision-kit' },
          { text: 'SO-ARM101 開發套件', link: '/zh-hant/products/so-arm101' },
          { text: 'AmazingHand 開源 4 指靈巧手', link: '/zh-hant/products/amazinghand' },
          { text: 'Lekiwi 具身智能移動機器人', link: '/zh-hant/products/lekiwi' },
          { text: 'SO-ARM101 頂置相機支架', link: '/zh-hant/products/overhead-camera-mount' },
          { text: 'XLeRobot 雙臂移動機器人', link: '/zh-hant/products/xlerobot' },
        ] },
        { text: '計算與視覺', items: [
          { text: 'Jetson Orin NX Super 開發套件', link: '/zh-hant/products/jetson-orin-nx-super-kit' },
          { text: '3D RealSense 深度相機', link: '/zh-hant/products/realsense-depth-camera' },
          { text: 'ESP32-S3 WiFi 視頻模組', link: '/zh-hant/products/esp32-s3-wifi-module' },
          { text: '79° IMX219 CSI 攝像頭', link: '/zh-hant/products/imx219-csi-camera' },
          { text: 'USB 自動對焦攝像頭', link: '/zh-hant/products/usb-auto-focus-camera' },
        ] },
        { text: '傳感器', items: [
          { text: 'GPS & 北斗 GNSS 定位模組', link: '/zh-hant/products/gps-beidou-module' },
          { text: 'IMU 高精度慣導模組', link: '/zh-hant/products/imu-module' },
        ] },
        { text: '配件', items: [
          { text: '2 自由度舵機雲台', link: '/zh-hant/products/2dof-gimbal' },
          { text: 'KWS 語音交互模組', link: '/zh-hant/products/kws-voice-module' },
          { text: 'Feetech 總線舵機(SCS0009 / STS3215)', link: '/zh-hant/products/feetech-servo' },
          { text: '4 合 1 KVM 切換器', link: '/zh-hant/products/kvm-switch' },
          { text: 'USB 免驅聲卡', link: '/zh-hant/products/usb-sound-card' },
          { text: '4K HDMI 採集卡', link: '/zh-hant/products/4k-hdmi-capture' },
          { text: 'AI 語音交互模組', link: '/zh-hant/products/ai-voice-module' },
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
    title: 'Juxi Technology Wiki',
    description: 'Juxi Technology 製品チュートリアルとドキュメントセンター',
    head: [
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      docFooter: { prev: '前へ', next: '次へ' },
      sidebarMenuLabel: 'メニュー',
      returnToTopLabel: 'トップへ戻る',
      outline: { level: [2, 3], label: '目次' },
      skipToContentLabel: 'コンテンツへスキップ',
      lightModeSwitchTitle: 'ライトモードに切り替え',
      darkModeSwitchLabel: '外観モード',
      darkModeSwitchTitle: 'ダークモードに切り替え',
      lastUpdated: {
        text: '最終更新 (UTC)',
        // forceLocale:日期格式跟随页面语言(默认跟随访客系统区域,英文页会显示中文格式)
        // timeZone: UTC 统一,timeZoneName 显式标注
        formatOptions: { forceLocale: true, timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
      },
      nav: [
        { text: 'チュートリアル', link: '/ja/tutorials/', activeMatch: '/ja/tutorials/' },
        { text: '製品', link: '/ja/products/', activeMatch: '/ja/products/' },
        { text: 'コミュニティ', link: '/ja/community/', activeMatch: '/ja/community/' },
        { text: 'その他', items: [
          { text: 'トピック', link: '/ja/topics/' },
          { text: '技術ドキュメント', link: '/ja/tech/' },
          { text: 'ケーススタディ', link: '/ja/cases/' },
          { text: 'ダウンロード', link: '/ja/downloads/' },
          { text: '会社概要', link: '/ja/about/' },
        ] },
      ],
      sidebar: {
        '/ja/tutorials/': [
          { text: 'クイックスタート', items: [
            { text: 'FAQ', link: '/ja/tutorials/faq' },
            { text: 'ROS 入門', link: '/ja/tutorials/ros-intro' },
            { text: 'Lark Wiki', link: '/ja/tutorials/lark-wiki' },
          ] },
          { text: '学習リソース', items: [
            { text: '学習リソース', link: '/ja/tutorials/learning-resources/' },
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
                { text: 'SO-ARM101 ワイヤレス遠隔操作(ESP32-NanoCam 版)', link: '/ja/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop' },
                { text: '遠隔操作トラブルシューティング', link: '/ja/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting' },
                { text: 'SO-ARM101 デュアルアーム(デュアルフォロワー)チュートリアル', link: '/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial' },
                { text: 'SO-ARM101 7-DOF 改造と LeRobot 使用チュートリアル', link: '/ja/tutorials/robot-arms/so-arm101/SO-ARM101-7DOF-LeRobot' },
                { text: 'SoARM シリーズ サーボキャリブレーションツール使用チュートリアル', link: '/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool' },
                {
                  text: 'LeRobot完全コース',
                  collapsed: true,
                  items: [
                    { text: 'LeRobot完全コース', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/' },
                    {
                      text: '1. LeRobot環境のインストール',
                      collapsed: true,
                      items: [
                        { text: 'ステップ1:LeRobot環境のインストール（Ubuntu）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu' },
                        { text: 'ステップ1:LeRobot環境のインストール（Windows）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Windows' },
                        { text: 'ステップ1:LeRobot環境のインストール（macOS）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/MacOS' },
                      ],
                    },
                    {
                      text: '2. シリアルポート番号の確認',
                      collapsed: true,
                      items: [
                        { text: 'ステップ2:シリアルポート番号の確認（Ubuntu）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Ubuntu' },
                        { text: 'ステップ2:シリアルポート番号の確認（Windows）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Windows' },
                        { text: 'ステップ2:シリアルポート番号の確認（macOS）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/MacOS' },
                      ],
                    },
                    {
                      text: '3. ロボットアームのキャリブレーション',
                      collapsed: true,
                      items: [
                        { text: 'ステップ3:ロボットアームのキャリブレーション（Ubuntu）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Ubuntu' },
                        { text: 'ステップ3:ロボットアームのキャリブレーション（Windows）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Windows' },
                        { text: 'ステップ3:ロボットアームのキャリブレーション（macOS）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/MacOS' },
                      ],
                    },
                    {
                      text: '4. テレオペレーション',
                      collapsed: true,
                      items: [
                        { text: 'ステップ4:テレオペレーション（Ubuntu）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Ubuntu' },
                        { text: 'ステップ4:テレオペレーション（Windows）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Windows' },
                        { text: 'ステップ4:テレオペレーション（macOS）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '5. カメラ付きテレオペレーション',
                      collapsed: true,
                      items: [
                        { text: 'ステップ5:カメラ付きテレオペレーション（Ubuntu）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu' },
                        { text: 'ステップ5:カメラ付きテレオペレーション（Windows）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Windows' },
                        { text: 'ステップ5:カメラ付きテレオペレーション（macOS）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '6. データセット収集（実機）',
                      collapsed: true,
                      items: [
                        { text: 'ステップ6:教示によるデータセット収集', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording' },
                        { text: 'ステップ6:データセット収集の注意事項', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes' },
                        { text: 'ステップ6:HuggingFaceアカウントの登録（任意）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account' },
                        { text: 'ステップ6:データセットをHuggingFaceにアップロード（任意）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload' },
                      ],
                    },
                    {
                      text: '7. モデルの訓練',
                      collapsed: true,
                      items: [
                        { text: 'ステップ7:ローカルUbuntuでの訓練', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu' },
                        { text: 'ステップ7:クラウドGPU訓練環境の設定', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU' },
                        { text: 'ステップ7:wandbでリアルタイム訓練曲線を確認', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves' },
                        { text: 'ステップ7:モデルをHuggingFaceにアップロード（任意）', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload' },
                        { text: 'ステップ7:モデルの重みファイルを取得', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights' },
                        { text: 'ステップ7:訓練コマンドライン-ACT', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT' },
                        { text: 'ステップ7:訓練コマンドライン-pi0', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0' },
                        { text: 'ステップ7:訓練コマンドライン-pi0.5', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5' },
                        { text: 'ステップ7:訓練コマンドライン-pi0fast', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast' },
                        { text: 'ステップ7:訓練コマンドライン-smolvla', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla' },
                      ],
                    },
                    {
                      text: '8. モデルのデプロイ',
                      collapsed: true,
                      items: [
                        { text: 'ステップ8:デプロイコマンドラインの説明', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference' },
                        { text: 'ステップ8:よくあるBugと解決方法', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Common-Bugs' },
                        { text: 'ステップ8:デプロイコマンドライン-ACT', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-ACT' },
                        { text: 'ステップ8:デプロイコマンドライン-pi0', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0' },
                        { text: 'ステップ8:デプロイコマンドライン-pi0.5', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0.5' },
                        { text: 'ステップ8:デプロイコマンドライン-smolvla', link: '/ja/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-smolvla' },
                      ],
                    },
                    {
                      text: '基礎知識',
                      collapsed: true,
                      items: [
                        { text: 'LeRobotを知る', link: '/ja/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot' },
                        { text: 'HuggingFace上のLeRobotデータセット', link: '/ja/tutorials/robot-arms/so-arm101/basics/HF-Datasets' },
                        { text: 'モデルトレーニングの資料', link: '/ja/tutorials/robot-arms/so-arm101/basics/Training-Resources' },
                        { text: 'SO-ARM 100公式3Dプリントファイル', link: '/ja/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files' },
                        { text: 'URDFファイルおよび資料参考', link: '/ja/tutorials/robot-arms/so-arm101/basics/URDF-Reference' },
                      ],
                    },
                    {
                      text: 'その他・応用',
                      collapsed: true,
                      items: [
                        { text: 'ROS2シミュレーション制御', link: '/ja/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control' },
                        { text: '平行指グリッパー取り付けチュートリアル', link: '/ja/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              text: 'SO-ARM101 + AmazingHand チュートリアル',
              collapsed: true,
              items: [
                { text: 'コース概要', link: '/ja/tutorials/robot-arms/so-arm-amazinghand/' },
                { text: 'ステージ1：環境構築（Linux）', link: '/ja/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Linux' },
                { text: 'ステージ1：環境構築（Windows）', link: '/ja/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Windows' },
                { text: 'ステージ2:ハンドとアームのキャリブレーション(Linux)', link: '/ja/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Linux' },
                { text: 'ステージ2:ハンドとアームのキャリブレーション(Windows)', link: '/ja/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Windows' },
                { text: 'ステージ3：遠隔操作（Linux）', link: '/ja/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Linux' },
                { text: 'ステージ3：遠隔操作（Windows）', link: '/ja/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Windows' },
                { text: 'ステージ4：データ収集（Linux）', link: '/ja/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Linux' },
                { text: 'ステージ4：データ収集（Windows）', link: '/ja/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Windows' },
                { text: 'ステージ5：モデル訓練（Linux）', link: '/ja/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Linux' },
                { text: 'ステージ5：モデル訓練（Windows）', link: '/ja/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Windows' },
                { text: 'ステージ6:モデルデプロイ(Linux)', link: '/ja/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Linux' },
                { text: 'ステージ6:モデルデプロイ(Windows)', link: '/ja/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Windows' },
              ],
            },
            {
              text: 'XLeRobot チュートリアル',
              collapsed: true,
              items: [
                { text: 'チュートリアル概要', link: '/ja/tutorials/robot-arms/xlerobot/' },
                { text: '環境構築(macOS)', link: '/ja/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS' },
                { text: '環境構築(Ubuntu)', link: '/ja/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu' },
                { text: '環境構築(Windows)', link: '/ja/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows' },
                { text: 'XLeRobot ファイルの移動', link: '/ja/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files' },
                { text: '完成品組み立て', link: '/ja/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit' },
                { text: 'パーツキット組み立て', link: '/ja/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: 'ロボットハンド インターフェース制御', link: '/ja/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: 'AmazingHand 器用なハンド製品資料', link: '/ja/tutorials/robot-arms/amazing-hand/product-info' },
                { text: '器用ハンド公式サンプル実行チュートリアル', link: '/ja/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: '器用ハンド（TTL シリアルサーボ）デバッグチュートリアル', link: '/ja/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                {
                  text: 'PWMサーボ デバッグ',
                  collapsed: true,
                  items: [
                    { text: '01-GUI 可視化制御', link: '/ja/tutorials/robot-arms/amazing-hand/pwm-debugging/01-GUI-Visual-Control' },
                    { text: '02-ジェスチャートラッキングチュートリアル', link: '/ja/tutorials/robot-arms/amazing-hand/pwm-debugging/02-Gesture-Tracking' },
                    { text: '03-PWM サーボバージョン-使用マニュアル', link: '/ja/tutorials/robot-arms/amazing-hand/pwm-debugging/03-PWM-Servo-Manual' },
                    { text: '04-シリアルサーボバージョン-使用説明', link: '/ja/tutorials/robot-arms/amazing-hand/pwm-debugging/04-Serial-Servo-Guide' },
                  ],
                },
                {
                  text: 'ジェスチャー追跡',
                  collapsed: true,
                  items: [
                    { text: 'Linux（Ubuntu）ワンクリックデプロイ実行', link: '/ja/tutorials/robot-arms/amazing-hand/gesture-tracking/01-Ubuntu' },
                    { text: 'Windows ワンクリックデプロイ実行', link: '/ja/tutorials/robot-arms/amazing-hand/gesture-tracking/02-Windows' },
                    { text: 'Mac ワンクリックデプロイ実行', link: '/ja/tutorials/robot-arms/amazing-hand/gesture-tracking/03-macOS' },
                  ],
                },
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
            { text: 'ファイルリモート転送', link: '/ja/tutorials/sensors/imu/remote-file-transfer' },
            { text: 'SSHファイル転送', link: '/ja/tutorials/sensors/imu/ssh-file-transfer' },
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
            {
              text: 'GPS 北斗測位モジュール',
              collapsed: true,
              items: [
                { text: 'モジュール資料', link: '/ja/tutorials/sensors/gps/GPS-Module-Info' },
                { text: '51 マイコン:GPS 解析', link: '/ja/tutorials/sensors/gps/51-MCU-GPS-Parsing' },
                { text: 'Arduino:位置情報の読み取り', link: '/ja/tutorials/sensors/gps/Arduino-Location-Reading' },
                { text: 'Arduino:位置情報の解析', link: '/ja/tutorials/sensors/gps/Arduino-Location-Parsing' },
                { text: 'STM32F103:GPS 解析出力', link: '/ja/tutorials/sensors/gps/STM32F103-GPS-Parsing' },
                { text: 'Jetson:位置情報解析', link: '/ja/tutorials/sensors/gps/Jetson-GPS-Parsing' },
                { text: 'Jetson:AGNSS 支援測位', link: '/ja/tutorials/sensors/gps/Jetson-AGNSS' },
                { text: 'Jetson:百度地図 API 申請', link: '/ja/tutorials/sensors/gps/Jetson-Baidu-Map-API' },
                { text: 'ラズベリーパイ:位置情報解析', link: '/ja/tutorials/sensors/gps/RaspberryPi-GPS-Parsing' },
                { text: 'ラズベリーパイ:AGNSS 支援測位', link: '/ja/tutorials/sensors/gps/RaspberryPi-AGNSS' },
                { text: 'ラズベリーパイ:百度地図 API 申請', link: '/ja/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API' },
                { text: 'ROS:事前準備', link: '/ja/tutorials/sensors/gps/ROS-Preparation' },
                { text: 'ROS:GPS データの読み取り', link: '/ja/tutorials/sensors/gps/ROS-Read-GPS-Data' },
                { text: 'ROS:GPS 軌跡の描画', link: '/ja/tutorials/sensors/gps/ROS-Draw-GPS-Track' },
                { text: '地図の位置誤差', link: '/ja/tutorials/sensors/gps/Map-Location-Error' },
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
                      { text: 'SCS0009 サーボデバッグツール使用チュートリアル', link: '/ja/tutorials/accessories/feetech/SCS0009-Debug-Tool' },
                    ],
                },
                {
                  text: 'ESP32-NanoCam 映像伝送モジュール',
                  collapsed: true,
                  items: [
                    { text: 'ESP32-NanoCam クイックスタート', link: '/ja/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start' },
                    { text: 'ESP32-NanoCam ハードウェア仕様書', link: '/ja/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec' },
                    { text: 'ESP32-NanoCam シリアルプロトコルマニュアル', link: '/ja/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol' },
                    {
                      text: 'AI ビジョンチュートリアル(全 11 章)',
                      collapsed: true,
                      items: [
                        { text: '第 1 章:環境構築', link: '/ja/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup' },
                        { text: '第 2 章:クイックスタート', link: '/ja/tutorials/accessories/esp32-nanocam/Ch02-Quick-Start' },
                        { text: '第 3 章:カメラの基礎', link: '/ja/tutorials/accessories/esp32-nanocam/Ch03-Camera-Basics' },
                        { text: '第 4 章:顔検出', link: '/ja/tutorials/accessories/esp32-nanocam/Ch04-Face-Detection' },
                        { text: '第 5 章:猫顔検出', link: '/ja/tutorials/accessories/esp32-nanocam/Ch05-Cat-Face-Detection' },
                        { text: '第 6 章:色認識', link: '/ja/tutorials/accessories/esp32-nanocam/Ch06-Color-Recognition' },
                        { text: '第 7 章:QR コードスキャン', link: '/ja/tutorials/accessories/esp32-nanocam/Ch07-QR-Code-Scanning' },
                        { text: '第 8 章:顔認識', link: '/ja/tutorials/accessories/esp32-nanocam/Ch08-Face-Recognition' },
                        { text: '第 9 章:音声対話', link: '/ja/tutorials/accessories/esp32-nanocam/Ch09-Voice-Chat' },
                        { text: '第 10 章:AI 視覚理解', link: '/ja/tutorials/accessories/esp32-nanocam/Ch10-AI-Vision-Understanding' },
                        { text: '第 11 章:ESP-Claw 音声制御', link: '/ja/tutorials/accessories/esp32-nanocam/Ch11-ESP-Claw-Voice-Control' },
                      ],
                    },
                  ],
                },
                {
                  text: 'CSI カメラ使用チュートリアル',
                  collapsed: true,
                  items: [
                    { text: 'Jetson CSI カメラ設定', link: '/ja/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup' },
                    { text: 'オートフォーカスカメラの使用', link: '/ja/tutorials/accessories/csi-camera/02-Auto-Focus-Camera' },
                    { text: 'Jupyter Lab の使用', link: '/ja/tutorials/accessories/csi-camera/03-JupyterLab' },
                    { text: 'JetCam の使用', link: '/ja/tutorials/accessories/csi-camera/04-JetCam' },
                    { text: 'IMX219(ラズベリーパイ)', link: '/ja/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi' },
                  ],
                },
                {
                  text: 'AI 音声対話モジュール',
                  collapsed: true,
                  items: [
                    { text: 'クイックスタート', link: '/ja/tutorials/accessories/ai-voice-module/Quick-Start' },
                    { text: '製品資料', link: '/ja/tutorials/accessories/ai-voice-module/Product-Info' },
                    { text: 'モジュールファームウェアの書き込み', link: '/ja/tutorials/accessories/ai-voice-module/Firmware-Flashing' },
                    { text: 'ウェイクワードとコマンドワードの変更', link: '/ja/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit' },
                    { text: 'カスタムプロトコルエントリーの作成', link: '/ja/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries' },
                    { text: 'ROS1 音声対話', link: '/ja/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction' },
                    { text: 'ROS2 音声対話', link: '/ja/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction' },
                    { text: 'シリアルポートプロトコル', link: '/ja/tutorials/accessories/ai-voice-module/Serial-Protocol' },
                    { text: 'IIC プロトコル', link: '/ja/tutorials/accessories/ai-voice-module/IIC-Protocol' },
                    { text: 'PC 通信', link: '/ja/tutorials/accessories/ai-voice-module/PC-Communication' },
                    { text: 'Arduino: シリアルポート通信', link: '/ja/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication' },
                    { text: 'Arduino: IIC 通信', link: '/ja/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication' },
                    { text: 'Jetson: シリアルポート通信', link: '/ja/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication' },
                    { text: 'Jetson: IIC 通信', link: '/ja/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication' },
                    { text: 'RDK: シリアルポート通信', link: '/ja/tutorials/accessories/ai-voice-module/RDK-Serial-Communication' },
                    { text: 'RDK: IIC 通信', link: '/ja/tutorials/accessories/ai-voice-module/RDK-IIC-Communication' },
                    { text: 'ラズベリーパイ: シリアルポート通信', link: '/ja/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication' },
                    { text: 'ラズベリーパイ: IIC 通信', link: '/ja/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication' },
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
        '/ja/topics/': [{ text: 'トピック', items: [{ text: 'トピック', link: '/ja/topics/' }, { text: 'JetPack フラッシングとシステム設定', link: '/ja/topics/jetpack-setup' }, { text: 'エッジ AI 導入入門', link: '/ja/topics/edge-ai-intro' }, { text: '具身知能入門（LeRobot）', link: '/ja/topics/embodied-ai-intro' }, { text: 'ロボット学習特集', link: '/ja/topics/robot-learning/' }, { text: 'なぜ私たちはオープンソースで作るのか——オープンソース・ロボットハードウェアの事例', link: '/ja/topics/open-source-hardware' }] }],
        '/ja/tech/': [{ text: '技術ドキュメント', items: [{ text: '技術ドキュメント', link: '/ja/tech/' }, { text: 'API リファレンス', link: '/ja/tech/api-reference' }, { text: '開発ガイド', link: '/ja/tech/dev-guide' }] }],
        '/ja/community/': [{ text: 'コミュニティ', items: [{ text: 'コミュニティ', link: '/ja/community/' }, { text: '貢献ガイド', link: '/ja/community/contributing' }] }],
        '/ja/cases/': [{ text: 'ケーススタディ', items: [{ text: 'ユーザー成功事例', link: '/ja/cases/' }] }],
        '/ja/products/': [
          { text: 'ロボット', items: [
            { text: 'SO-ARM101 開発キット', link: '/ja/products/so-arm101' },
            { text: 'AmazingHand オープンソース 4指器用ハンド', link: '/ja/products/amazinghand' },
            { text: 'JUXI バスサーボドライバボード', link: '/ja/products/servo-driver-board' },
            { text: 'SO-ARM101 TPU フレキシブルグリッパー', link: '/ja/products/tpu-flexible-gripper' },
            { text: 'SO-ARM101 ロボットアームビジョンキット', link: '/ja/products/robot-vision-kit' },
            { text: 'Lekiwi 具身知能モバイルロボット', link: '/ja/products/lekiwi' },
            { text: 'SO-ARM101 オーバーヘッドカメラマウント', link: '/ja/products/overhead-camera-mount' },
            { text: 'XLeRobot 双腕移動ロボット', link: '/ja/products/xlerobot' },
          ] },
          { text: '計算とビジョン', items: [
            { text: 'Jetson Orin NX Super 開発キット', link: '/ja/products/jetson-orin-nx-super-kit' },
            { text: 'ESP32-S3 WiFi 動画モジュール', link: '/ja/products/esp32-s3-wifi-module' },
            { text: '79° IMX219 CSI カメラ', link: '/ja/products/imx219-csi-camera' },
            { text: 'USBオートフォーカスカメラ', link: '/ja/products/usb-auto-focus-camera' },
            { text: '3D RealSense 深度カメラ', link: '/ja/products/realsense-depth-camera' },
          ] },
          { text: 'センサー', items: [
            { text: 'IMU 高精度慣性航法モジュール', link: '/ja/products/imu-module' },
            { text: 'GPS & 北斗 GNSS 測位モジュール', link: '/ja/products/gps-beidou-module' },
          ] },
          { text: 'アクセサリー', items: [
            { text: '2 自由度サーボパンチルト', link: '/ja/products/2dof-gimbal' },
            { text: 'KWS 音声対話モジュール', link: '/ja/products/kws-voice-module' },
            { text: 'Feetech バスサーボ(SCS0009 / STS3215)', link: '/ja/products/feetech-servo' },
            { text: '4-in-1 KVM スイッチャー', link: '/ja/products/kvm-switch' },
            { text: 'USB ドライバ不要サウンドカード', link: '/ja/products/usb-sound-card' },
            { text: '4K HDMI キャプチャカード', link: '/ja/products/4k-hdmi-capture' },
            { text: 'AI 音声対話モジュール', link: '/ja/products/ai-voice-module' },
          ] },
        ],
      },
    },
  },
  ko: {
    label: '한국어',
    lang: 'ko',
    title: 'Juxi Technology Wiki',
    description: 'Juxi Technology 제품 튜토리얼 및 문서 센터',
    head: [
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      docFooter: { prev: '이전', next: '다음' },
      sidebarMenuLabel: '메뉴',
      returnToTopLabel: '맨 위로',
      outline: { level: [2, 3], label: '목차' },
      skipToContentLabel: '본문으로 건너뛰기',
      lightModeSwitchTitle: '라이트 모드로 전환',
      darkModeSwitchLabel: '화면 모드',
      darkModeSwitchTitle: '다크 모드로 전환',
      lastUpdated: {
        text: '마지막 업데이트 (UTC)',
        // forceLocale:日期格式跟随页面语言(默认跟随访客系统区域,英文页会显示中文格式)
        // timeZone: UTC 统一,timeZoneName 显式标注
        formatOptions: { forceLocale: true, timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
      },
      nav: [
        { text: '튜토리얼', link: '/ko/tutorials/', activeMatch: '/ko/tutorials/' },
        { text: '제품', link: '/ko/products/', activeMatch: '/ko/products/' },
        { text: '커뮤니티', link: '/ko/community/', activeMatch: '/ko/community/' },
        { text: '더 보기', items: [
          { text: '토픽', link: '/ko/topics/' },
          { text: '기술 문서', link: '/ko/tech/' },
          { text: '사용자 사례', link: '/ko/cases/' },
          { text: '다운로드', link: '/ko/downloads/' },
          { text: '회사 소개', link: '/ko/about/' },
        ] },
      ],
      sidebar: {
        '/ko/tutorials/': [
          { text: '빠른 시작', items: [
            { text: 'FAQ', link: '/ko/tutorials/faq' },
            { text: 'ROS 입문', link: '/ko/tutorials/ros-intro' },
            { text: 'Lark Wiki', link: '/ko/tutorials/lark-wiki' },
          ] },
          { text: '학습 리소스', items: [
            { text: '학습 리소스', link: '/ko/tutorials/learning-resources/' },
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
                { text: 'SO-ARM101 무선 텔레오퍼레이션(ESP32-NanoCam 버전)', link: '/ko/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop' },
                { text: '원격조작 문제 해결', link: '/ko/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting' },
                { text: 'SO-ARM101 양팔(듀얼 팔로워 암) 튜토리얼', link: '/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial' },
                { text: 'SO-ARM101 7-DOF 개조와 LeRobot 사용 튜토리얼', link: '/ko/tutorials/robot-arms/so-arm101/SO-ARM101-7DOF-LeRobot' },
                { text: 'SoARM 시리즈 서보 캘리브레이션 도구 사용 튜토리얼', link: '/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool' },
                {
                  text: 'LeRobot 전체 코스',
                  collapsed: true,
                  items: [
                    { text: 'LeRobot 코스 개요', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/' },
                    {
                      text: '1. LeRobot 환경 설치',
                      collapsed: true,
                      items: [
                        { text: '1단계: LeRobot 환경 설치 (Ubuntu)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu' },
                        { text: '1단계: LeRobot 환경 설치 (Windows)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Windows' },
                        { text: '1단계: LeRobot 환경 설치 (macOS)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/MacOS' },
                      ],
                    },
                    {
                      text: '2. 시리얼 포트 확인',
                      collapsed: true,
                      items: [
                        { text: '2단계: 시리얼 장치 포트 번호 확인 (Ubuntu)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Ubuntu' },
                        { text: '2단계: 시리얼 장치 포트 번호 확인 (Windows)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Windows' },
                        { text: '2단계: 시리얼 장치 포트 번호 확인 (macOS)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/MacOS' },
                      ],
                    },
                    {
                      text: '3. 로봇 암 캘리브레이션',
                      collapsed: true,
                      items: [
                        { text: '3단계: 로봇 암 캘리브레이션 (Ubuntu)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Ubuntu' },
                        { text: '3단계: 로봇 암 캘리브레이션 (Windows)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Windows' },
                        { text: '3단계: 로봇 암 캘리브레이션 (macOS)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/MacOS' },
                      ],
                    },
                    {
                      text: '4. 원격조작',
                      collapsed: true,
                      items: [
                        { text: '4단계: 원격조작 (Ubuntu)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Ubuntu' },
                        { text: '4단계: 원격조작 (Windows)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Windows' },
                        { text: '4단계: 원격조작 (macOS)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '5. 카메라 원격조작',
                      collapsed: true,
                      items: [
                        { text: '5단계: 카메라 연결 원격조작 (Ubuntu)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu' },
                        { text: '5단계: 카메라 연결 원격조작 (Windows)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Windows' },
                        { text: '5단계: 카메라 연결 원격조작 (macOS)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '6. 데이터셋 수집',
                      collapsed: true,
                      items: [
                        { text: '6단계: 시연 데이터셋 수집', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording' },
                        { text: '6단계: 데이터셋 수집 주의 사항', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes' },
                        { text: '6단계: Hugging Face 계정 등록(선택 사항)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account' },
                        { text: '6단계: HuggingFace에 데이터셋 업로드(선택 사항)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload' },
                      ],
                    },
                    {
                      text: '7. 모델 학습',
                      collapsed: true,
                      items: [
                        { text: '7단계: 로컬 Ubuntu 학습', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu' },
                        { text: '7단계: 클라우드 GPU 학습 환경 설정', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU' },
                        { text: '7단계: wandb 실시간 학습 곡선 확인', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves' },
                        { text: '7단계: HuggingFace에 모델 업로드(선택 사항)', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload' },
                        { text: '7단계: 모델 가중치 파일 얻기', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights' },
                        { text: '7단계: ACT 학습 커맨드라인', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT' },
                        { text: '7단계: pi0 학습 커맨드라인', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0' },
                        { text: '7단계: pi0.5 학습 커맨드라인', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5' },
                        { text: '7단계: pi0fast 학습 커맨드라인', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast' },
                        { text: '7단계: smolvla 학습 커맨드라인', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla' },
                      ],
                    },
                    {
                      text: '8. 모델 배포',
                      collapsed: true,
                      items: [
                        { text: '8단계: 커맨드라인 설명', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference' },
                        { text: '8단계: 자주 발생하는 Bug 및 해결', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Common-Bugs' },
                        { text: '8단계: ACT 배포 커맨드라인', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-ACT' },
                        { text: '8단계: pi0 배포 커맨드라인', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0' },
                        { text: '8단계: pi0.5 배포 커맨드라인', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0.5' },
                        { text: '8단계: smolvla 배포 커맨드라인', link: '/ko/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-smolvla' },
                      ],
                    },
                    {
                      text: '기초 지식',
                      collapsed: true,
                      items: [
                        { text: 'LeRobot 알아보기', link: '/ko/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot' },
                        { text: 'HuggingFace의 LeRobot 데이터셋', link: '/ko/tutorials/robot-arms/so-arm101/basics/HF-Datasets' },
                        { text: '모델 학습 자료', link: '/ko/tutorials/robot-arms/so-arm101/basics/Training-Resources' },
                        { text: 'SO-ARM 100 로봇 암 공식 3D 프린팅 파일', link: '/ko/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files' },
                        { text: 'URDF 파일 및 자료 참고', link: '/ko/tutorials/robot-arms/so-arm101/basics/URDF-Reference' },
                      ],
                    },
                    {
                      text: '기타 및 심화',
                      collapsed: true,
                      items: [
                        { text: 'ROS2 시뮬레이션 제어', link: '/ko/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control' },
                        { text: '평행 핑거 그리퍼 설치 튜토리얼', link: '/ko/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              text: 'SO-ARM101 + AmazingHand 튜토리얼',
              collapsed: true,
              items: [
                { text: '코스 개요', link: '/ko/tutorials/robot-arms/so-arm-amazinghand/' },
                { text: '단계 1: 환경 구축(Linux)', link: '/ko/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Linux' },
                { text: '단계 1: 환경 구축(Windows)', link: '/ko/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Windows' },
                { text: '2단계: 핸드·양팔 캘리브레이션 (Linux)', link: '/ko/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Linux' },
                { text: '2단계: 핸드·양팔 캘리브레이션 (Windows)', link: '/ko/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Windows' },
                { text: '단계 3: 원격 조작(Linux)', link: '/ko/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Linux' },
                { text: '단계 3: 원격 조작(Windows)', link: '/ko/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Windows' },
                { text: '단계 4: 데이터 수집(Linux)', link: '/ko/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Linux' },
                { text: '단계 4: 데이터 수집(Windows)', link: '/ko/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Windows' },
                { text: '단계 5: 모델 학습(Linux)', link: '/ko/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Linux' },
                { text: '단계 5: 모델 학습(Windows)', link: '/ko/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Windows' },
                { text: '6단계: 모델 배포 (Linux)', link: '/ko/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Linux' },
                { text: '6단계: 모델 배포 (Windows)', link: '/ko/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Windows' },
              ],
            },
            {
              text: 'XLeRobot 튜토리얼',
              collapsed: true,
              items: [
                { text: '튜토리얼 개요', link: '/ko/tutorials/robot-arms/xlerobot/' },
                { text: '환경 구축(macOS)', link: '/ko/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS' },
                { text: '환경 구축(Ubuntu)', link: '/ko/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu' },
                { text: '환경 구축(Windows)', link: '/ko/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows' },
                { text: 'XLeRobot 파일 이동', link: '/ko/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files' },
                { text: '완제품 조립', link: '/ko/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit' },
                { text: '부품 키트 조립', link: '/ko/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: '로봇 핸드 인터페이스 제어', link: '/ko/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: 'AmazingHand 로봇 손 제품 자료', link: '/ko/tutorials/robot-arms/amazing-hand/product-info' },
                { text: '로봇핸드 공식 예제 실행 튜토리얼', link: '/ko/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: '로봇핸드(TTL 직렬 서보) 디버깅 튜토리얼', link: '/ko/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                {
                  text: 'PWM 서보 디버깅',
                  collapsed: true,
                  items: [
                    { text: '01-GUI 시각화 제어', link: '/ko/tutorials/robot-arms/amazing-hand/pwm-debugging/01-GUI-Visual-Control' },
                    { text: '02-제스처 추적 튜토리얼', link: '/ko/tutorials/robot-arms/amazing-hand/pwm-debugging/02-Gesture-Tracking' },
                    { text: '03-PWM 서보 버전-사용 매뉴얼', link: '/ko/tutorials/robot-arms/amazing-hand/pwm-debugging/03-PWM-Servo-Manual' },
                    { text: '04-시리얼 서보 버전-사용 설명', link: '/ko/tutorials/robot-arms/amazing-hand/pwm-debugging/04-Serial-Servo-Guide' },
                  ],
                },
                {
                  text: '제스처 트래킹',
                  collapsed: true,
                  items: [
                    { text: 'Linux(Ubuntu) 원클릭 배포 실행', link: '/ko/tutorials/robot-arms/amazing-hand/gesture-tracking/01-Ubuntu' },
                    { text: 'Windows 원클릭 배포 실행', link: '/ko/tutorials/robot-arms/amazing-hand/gesture-tracking/02-Windows' },
                    { text: 'Mac 원클릭 배포 실행', link: '/ko/tutorials/robot-arms/amazing-hand/gesture-tracking/03-macOS' },
                  ],
                },
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
            { text: '파일 원격 전송', link: '/ko/tutorials/sensors/imu/remote-file-transfer' },
            { text: 'SSH 파일 전송', link: '/ko/tutorials/sensors/imu/ssh-file-transfer' },
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
            {
              text: 'GPS 베이더우 측위 모듈',
              collapsed: true,
              items: [
                { text: '모듈 자료', link: '/ko/tutorials/sensors/gps/GPS-Module-Info' },
                { text: '51 MCU: GPS 파싱', link: '/ko/tutorials/sensors/gps/51-MCU-GPS-Parsing' },
                { text: 'Arduino: 위치 정보 읽기', link: '/ko/tutorials/sensors/gps/Arduino-Location-Reading' },
                { text: 'Arduino: 위치 정보 파싱', link: '/ko/tutorials/sensors/gps/Arduino-Location-Parsing' },
                { text: 'STM32F103: GPS 파싱 출력', link: '/ko/tutorials/sensors/gps/STM32F103-GPS-Parsing' },
                { text: 'Jetson: GPS 파싱', link: '/ko/tutorials/sensors/gps/Jetson-GPS-Parsing' },
                { text: 'Jetson: AGNSS 보조 측위', link: '/ko/tutorials/sensors/gps/Jetson-AGNSS' },
                { text: 'Jetson: 바이두 지도 API', link: '/ko/tutorials/sensors/gps/Jetson-Baidu-Map-API' },
                { text: '라즈베리파이: GPS 파싱', link: '/ko/tutorials/sensors/gps/RaspberryPi-GPS-Parsing' },
                { text: '라즈베리파이: AGNSS 보조 측위', link: '/ko/tutorials/sensors/gps/RaspberryPi-AGNSS' },
                { text: '라즈베리파이: 바이두 지도 API', link: '/ko/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API' },
                { text: 'ROS: 사전 준비', link: '/ko/tutorials/sensors/gps/ROS-Preparation' },
                { text: 'ROS: GPS 데이터 읽기', link: '/ko/tutorials/sensors/gps/ROS-Read-GPS-Data' },
                { text: 'ROS: GPS 궤적 그리기', link: '/ko/tutorials/sensors/gps/ROS-Draw-GPS-Track' },
                { text: '지도 위치 오차', link: '/ko/tutorials/sensors/gps/Map-Location-Error' },
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
                      { text: 'SCS0009 서보 디버깅 도구 사용 튜토리얼', link: '/ko/tutorials/accessories/feetech/SCS0009-Debug-Tool' },
                    ],
                },
                {
                  text: 'ESP32-NanoCam 영상 전송 모듈',
                  collapsed: true,
                  items: [
                    { text: 'ESP32-NanoCam 빠른 시작', link: '/ko/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start' },
                    { text: 'ESP32-NanoCam 하드웨어 사양서', link: '/ko/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec' },
                    { text: 'ESP32-NanoCam 시리얼 프로토콜 매뉴얼', link: '/ko/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol' },
                    {
                      text: 'AI 비전 튜토리얼(11장)',
                      collapsed: true,
                      items: [
                        { text: '1장: 환경 구축', link: '/ko/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup' },
                        { text: '2장: 퀵 스타트', link: '/ko/tutorials/accessories/esp32-nanocam/Ch02-Quick-Start' },
                        { text: '3장: 카메라 기초', link: '/ko/tutorials/accessories/esp32-nanocam/Ch03-Camera-Basics' },
                        { text: '4장: 얼굴 검출', link: '/ko/tutorials/accessories/esp32-nanocam/Ch04-Face-Detection' },
                        { text: '5장: 고양이 얼굴 검출', link: '/ko/tutorials/accessories/esp32-nanocam/Ch05-Cat-Face-Detection' },
                        { text: '6장: 색상 인식', link: '/ko/tutorials/accessories/esp32-nanocam/Ch06-Color-Recognition' },
                        { text: '7장: QR 코드 스캔', link: '/ko/tutorials/accessories/esp32-nanocam/Ch07-QR-Code-Scanning' },
                        { text: '8장: 얼굴 인식', link: '/ko/tutorials/accessories/esp32-nanocam/Ch08-Face-Recognition' },
                        { text: '9장: 음성 대화', link: '/ko/tutorials/accessories/esp32-nanocam/Ch09-Voice-Chat' },
                        { text: '10장: AI 비전 이해', link: '/ko/tutorials/accessories/esp32-nanocam/Ch10-AI-Vision-Understanding' },
                        { text: '11장: ESP-Claw 음성 제어', link: '/ko/tutorials/accessories/esp32-nanocam/Ch11-ESP-Claw-Voice-Control' },
                      ],
                    },
                  ],
                },
                {
                  text: 'CSI 카메라 사용 튜토리얼',
                  collapsed: true,
                  items: [
                    { text: 'Jetson CSI 카메라 설정', link: '/ko/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup' },
                    { text: '자동 초점 카메라 사용', link: '/ko/tutorials/accessories/csi-camera/02-Auto-Focus-Camera' },
                    { text: 'Jupyter Lab 사용', link: '/ko/tutorials/accessories/csi-camera/03-JupyterLab' },
                    { text: 'JetCam 사용', link: '/ko/tutorials/accessories/csi-camera/04-JetCam' },
                    { text: 'IMX219(라즈베리파이)', link: '/ko/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi' },
                  ],
                },
                {
                  text: 'AI 음성 인터랙션 모듈',
                  collapsed: true,
                  items: [
                    { text: '빠른 시작', link: '/ko/tutorials/accessories/ai-voice-module/Quick-Start' },
                    { text: '제품 자료', link: '/ko/tutorials/accessories/ai-voice-module/Product-Info' },
                    { text: '모듈 펌웨어 플래싱', link: '/ko/tutorials/accessories/ai-voice-module/Firmware-Flashing' },
                    { text: '웨이크 워드 및 명령어 수정', link: '/ko/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit' },
                    { text: '사용자 정의 프로토콜 항목 제작', link: '/ko/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries' },
                    { text: 'ROS1 음성 인터랙션', link: '/ko/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction' },
                    { text: 'ROS2 음성 인터랙션', link: '/ko/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction' },
                    { text: '시리얼 포트 프로토콜', link: '/ko/tutorials/accessories/ai-voice-module/Serial-Protocol' },
                    { text: 'IIC 프로토콜', link: '/ko/tutorials/accessories/ai-voice-module/IIC-Protocol' },
                    { text: 'PC 통신', link: '/ko/tutorials/accessories/ai-voice-module/PC-Communication' },
                    { text: 'Arduino: 시리얼 통신', link: '/ko/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication' },
                    { text: 'Arduino: IIC 통신', link: '/ko/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication' },
                    { text: 'Jetson: 시리얼 통신', link: '/ko/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication' },
                    { text: 'Jetson: IIC 통신', link: '/ko/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication' },
                    { text: 'RDK: 시리얼 통신', link: '/ko/tutorials/accessories/ai-voice-module/RDK-Serial-Communication' },
                    { text: 'RDK: IIC 통신', link: '/ko/tutorials/accessories/ai-voice-module/RDK-IIC-Communication' },
                    { text: '라즈베리파이: 시리얼 통신', link: '/ko/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication' },
                    { text: '라즈베리파이: IIC 통신', link: '/ko/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication' },
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
        '/ko/topics/': [{ text: '토픽', items: [{ text: '토픽', link: '/ko/topics/' }, { text: 'JetPack 플래싱 및 시스템 설정', link: '/ko/topics/jetpack-setup' }, { text: '엣지 AI 배포 입문', link: '/ko/topics/edge-ai-intro' }, { text: '구현 지능 입문(LeRobot)', link: '/ko/topics/embodied-ai-intro' }, { text: '로봇 학습 특집', link: '/ko/topics/robot-learning/' }, { text: '왜 우리는 오픈소스로 만드는가 — 오픈소스 로봇 하드웨어의 사례', link: '/ko/topics/open-source-hardware' }] }],
        '/ko/tech/': [{ text: '기술 문서', items: [{ text: '기술 문서', link: '/ko/tech/' }, { text: 'API 참조', link: '/ko/tech/api-reference' }, { text: '개발 가이드', link: '/ko/tech/dev-guide' }] }],
        '/ko/community/': [{ text: '커뮤니티', items: [{ text: '커뮤니티', link: '/ko/community/' }, { text: '기여 가이드', link: '/ko/community/contributing' }] }],
        '/ko/cases/': [{ text: '사용자 사례', items: [{ text: '사용자 성공 사례', link: '/ko/cases/' }] }],
        '/ko/products/': [
          { text: '로봇', items: [
            { text: 'SO-ARM101 개발 키트', link: '/ko/products/so-arm101' },
            { text: 'AmazingHand 오픈소스 4손가락 정교 손', link: '/ko/products/amazinghand' },
            { text: 'JUXI 버스 서보 드라이버 보드', link: '/ko/products/servo-driver-board' },
            { text: 'SO-ARM101 TPU 플렉서블 그리퍼', link: '/ko/products/tpu-flexible-gripper' },
            { text: 'SO-ARM101 로봇 팔 비전 키트', link: '/ko/products/robot-vision-kit' },
            { text: 'Lekiwi 구현 지능 모바일 로봇', link: '/ko/products/lekiwi' },
            { text: 'SO-ARM101 오버헤드 카메라 마운트', link: '/ko/products/overhead-camera-mount' },
            { text: 'XLeRobot 양팔 이동 로봇', link: '/ko/products/xlerobot' },
          ] },
          { text: '컴퓨팅 & 비전', items: [
            { text: 'Jetson Orin NX Super 개발 키트', link: '/ko/products/jetson-orin-nx-super-kit' },
            { text: 'ESP32-S3 WiFi 영상 모듈', link: '/ko/products/esp32-s3-wifi-module' },
            { text: '79° IMX219 CSI 카메라', link: '/ko/products/imx219-csi-camera' },
            { text: 'USB 자동 초점 카메라', link: '/ko/products/usb-auto-focus-camera' },
            { text: '3D RealSense 깊이 카메라', link: '/ko/products/realsense-depth-camera' },
          ] },
          { text: '센서', items: [
            { text: 'IMU 고정밀 관성항법 모듈', link: '/ko/products/imu-module' },
            { text: 'GPS & 北斗 GNSS 측위 모듈', link: '/ko/products/gps-beidou-module' },
          ] },
          { text: '액세서리', items: [
            { text: '2 자유도 서보 팬틸트', link: '/ko/products/2dof-gimbal' },
            { text: 'KWS 음성 상호작용 모듈', link: '/ko/products/kws-voice-module' },
            { text: 'Feetech 버스 서보(SCS0009 / STS3215)', link: '/ko/products/feetech-servo' },
            { text: '4-in-1 KVM 스위처', link: '/ko/products/kvm-switch' },
            { text: 'USB 드라이버 프리 사운드 카드', link: '/ko/products/usb-sound-card' },
            { text: '4K HDMI 캡처 카드', link: '/ko/products/4k-hdmi-capture' },
            { text: 'AI 음성 인터랙션 모듈', link: '/ko/products/ai-voice-module' },
          ] },
        ],
      },
    },
  },
  de: {
    label: 'Deutsch',
    lang: 'de',
    title: 'Juxi Technology Wiki',
    description: 'Juxi Technology Produkt-Tutorials und Dokumentationszentrum',
    head: [
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      docFooter: { prev: 'Zurück', next: 'Weiter' },
      sidebarMenuLabel: 'Menü',
      returnToTopLabel: 'Zurück nach oben',
      outline: { level: [2, 3], label: 'Auf dieser Seite' },
      skipToContentLabel: 'Zum Inhalt springen',
      lightModeSwitchTitle: 'Zum hellen Design wechseln',
      darkModeSwitchLabel: 'Darstellung',
      darkModeSwitchTitle: 'Zum dunklen Design wechseln',
      lastUpdated: {
        text: 'Zuletzt aktualisiert (UTC)',
        // forceLocale:日期格式跟随页面语言(默认跟随访客系统区域,英文页会显示中文格式)
        // timeZone: UTC 统一,timeZoneName 显式标注
        formatOptions: { forceLocale: true, timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
      },
      nav: [
        { text: 'Tutorials', link: '/de/tutorials/', activeMatch: '/de/tutorials/' },
        { text: 'Produkte', link: '/de/products/', activeMatch: '/de/products/' },
        { text: 'Community', link: '/de/community/', activeMatch: '/de/community/' },
        { text: 'Mehr', items: [
          { text: 'Themen', link: '/de/topics/' },
          { text: 'Technische Doku', link: '/de/tech/' },
          { text: 'Fallstudien', link: '/de/cases/' },
          { text: 'Downloads', link: '/de/downloads/' },
          { text: 'Über uns', link: '/de/about/' },
        ] },
      ],
      sidebar: {
        '/de/tutorials/': [
          { text: 'Schnellstart', items: [
            { text: 'FAQ', link: '/de/tutorials/faq' },
            { text: 'ROS-Einführung', link: '/de/tutorials/ros-intro' },
            { text: 'Lark Wiki', link: '/de/tutorials/lark-wiki' },
          ] },
          { text: 'Lernressourcen', items: [
            { text: 'Lernressourcen', link: '/de/tutorials/learning-resources/' },
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
                { text: 'SO-ARM101 Drahtlose Teleoperation (ESP32-NanoCam-Version)', link: '/de/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop' },
                { text: 'Teleoperation-Fehlerbehebung', link: '/de/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting' },
                { text: 'SO-ARM101 Zweiarm-Tutorial (zwei Folgearme)', link: '/de/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial' },
                { text: 'SO-ARM101 7-DOF-Umbau und LeRobot-Nutzung', link: '/de/tutorials/robot-arms/so-arm101/SO-ARM101-7DOF-LeRobot' },
                { text: 'SoARM-Servo-Kalibrierungstool – Anleitung', link: '/de/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool' },
                {
                  text: 'LeRobot-Komplettkurs',
                  collapsed: true,
                  items: [
                    { text: 'LeRobot-Komplettkurs', link: '/de/tutorials/robot-arms/so-arm101/lerobot/' },
                    {
                      text: '1. LeRobot-Umgebung',
                      collapsed: true,
                      items: [
                        { text: 'Schritt 1: LeRobot-Umgebung installieren (Ubuntu)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu' },
                        { text: 'Schritt 1: LeRobot-Umgebung installieren (Windows)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Windows' },
                        { text: 'Schritt 1: LeRobot-Umgebung installieren (macOS)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/MacOS' },
                      ],
                    },
                    {
                      text: '2. Serielle Ports',
                      collapsed: true,
                      items: [
                        { text: 'Schritt 2: Ports der seriellen Geräte anzeigen (Ubuntu)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Ubuntu' },
                        { text: 'Schritt 2: Ports der seriellen Geräte anzeigen (Windows)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Windows' },
                        { text: 'Schritt 2: Ports der seriellen Geräte anzeigen (macOS)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/MacOS' },
                      ],
                    },
                    {
                      text: '3. Kalibrierung',
                      collapsed: true,
                      items: [
                        { text: 'Schritt 3: Roboterarm kalibrieren (Ubuntu)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Ubuntu' },
                        { text: 'Schritt 3: Roboterarm kalibrieren (Windows)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Windows' },
                        { text: 'Schritt 3: Roboterarm kalibrieren (macOS)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/MacOS' },
                      ],
                    },
                    {
                      text: '4. Teleoperation',
                      collapsed: true,
                      items: [
                        { text: 'Schritt 4: Teleoperation (Ubuntu)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Ubuntu' },
                        { text: 'Schritt 4: Teleoperation (Windows)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Windows' },
                        { text: 'Schritt 4: Teleoperation (macOS)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '5. Teleop mit Kamera',
                      collapsed: true,
                      items: [
                        { text: 'Schritt 5: Teleoperation mit Kamera (Ubuntu)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu' },
                        { text: 'Schritt 5: Teleoperation mit Kamera (Windows)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Windows' },
                        { text: 'Schritt 5: Teleoperation mit Kamera (macOS)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '6. Datenerfassung',
                      collapsed: true,
                      items: [
                        { text: 'Schritt 6: Datensatz durch Demonstration erfassen', link: '/de/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording' },
                        { text: 'Schritt 6: Hinweise zum Erfassen von Datensätzen', link: '/de/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes' },
                        { text: 'Schritt 6: Hugging-Face-Konto registrieren (optional)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account' },
                        { text: 'Schritt 6: Datensatz auf HuggingFace hochladen (optional)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload' },
                      ],
                    },
                    {
                      text: '7. Modelltraining',
                      collapsed: true,
                      items: [
                        { text: 'Schritt 7: Lokales Training unter Ubuntu', link: '/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu' },
                        { text: 'Schritt 7: Cloud-GPU-Trainingsumgebung einrichten', link: '/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU' },
                        { text: 'Schritt 7: Trainingskurven in Echtzeit mit wandb anzeigen', link: '/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves' },
                        { text: 'Schritt 7: Modell zu HuggingFace hochladen (optional)', link: '/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload' },
                        { text: 'Schritt 7: Modelldateien abrufen', link: '/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights' },
                        { text: 'Schritt 7: Trainingsbefehl für ACT', link: '/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT' },
                        { text: 'Schritt 7: Trainingsbefehl für pi0', link: '/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0' },
                        { text: 'Schritt 7: Trainingsbefehl für pi0.5', link: '/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5' },
                        { text: 'Schritt 7: Trainingsbefehl für pi0fast', link: '/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast' },
                        { text: 'Schritt 7: Trainingsbefehl für SmolVLA', link: '/de/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla' },
                      ],
                    },
                    {
                      text: '8. Modell-Inferenz',
                      collapsed: true,
                      items: [
                        { text: 'Schritt 8: Erläuterung der Befehle', link: '/de/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference' },
                        { text: 'Schritt 8: Häufige Bugs und Lösungen', link: '/de/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Common-Bugs' },
                        { text: 'Schritt 8: Deploy-Befehl für ACT', link: '/de/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-ACT' },
                        { text: 'Schritt 8: Deploy-Befehl für pi0', link: '/de/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0' },
                        { text: 'Schritt 8: Deploy-Befehl für pi0.5', link: '/de/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0.5' },
                        { text: 'Schritt 8: Deploy-Befehl für SmolVLA', link: '/de/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-smolvla' },
                      ],
                    },
                    {
                      text: 'Grundlagen',
                      collapsed: true,
                      items: [
                        { text: 'LeRobot kennenlernen', link: '/de/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot' },
                        { text: 'LeRobot-Datensätze auf HuggingFace', link: '/de/tutorials/robot-arms/so-arm101/basics/HF-Datasets' },
                        { text: 'Materialien zum Modelltraining', link: '/de/tutorials/robot-arms/so-arm101/basics/Training-Resources' },
                        { text: 'Offizielle 3D-Druckdateien für den SO-ARM 100 Roboterarm', link: '/de/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files' },
                        { text: 'URDF-Dateien und Referenzmaterial', link: '/de/tutorials/robot-arms/so-arm101/basics/URDF-Reference' },
                      ],
                    },
                    {
                      text: 'Weitere Themen',
                      collapsed: true,
                      items: [
                        { text: 'ROS2-Simulationssteuerung', link: '/de/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control' },
                        { text: 'Montageanleitung für den Parallelbacken-Greifer', link: '/de/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              text: 'SO-ARM101 + AmazingHand Kurs',
              collapsed: true,
              items: [
                { text: 'Kursübersicht', link: '/de/tutorials/robot-arms/so-arm-amazinghand/' },
                { text: 'Phase 1: Umgebung einrichten (Linux)', link: '/de/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Linux' },
                { text: 'Phase 1: Umgebung einrichten (Windows)', link: '/de/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Windows' },
                { text: 'Stufe 2: Hand- & Arm-Kalibrierung (Linux)', link: '/de/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Linux' },
                { text: 'Stufe 2: Hand- & Arm-Kalibrierung (Windows)', link: '/de/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Windows' },
                { text: 'Phase 3: Teleoperation (Linux)', link: '/de/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Linux' },
                { text: 'Phase 3: Teleoperation (Windows)', link: '/de/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Windows' },
                { text: 'Phase 4: Datenerfassung (Linux)', link: '/de/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Linux' },
                { text: 'Phase 4: Datenerfassung (Windows)', link: '/de/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Windows' },
                { text: 'Phase 5: Modelltraining (Linux)', link: '/de/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Linux' },
                { text: 'Phase 5: Modelltraining (Windows)', link: '/de/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Windows' },
                { text: 'Stufe 6: Modell-Deployment (Linux)', link: '/de/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Linux' },
                { text: 'Stufe 6: Modell-Deployment (Windows)', link: '/de/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Windows' },
              ],
            },
            {
              text: 'XLeRobot-Tutorials',
              collapsed: true,
              items: [
                { text: 'Tutorial-Übersicht', link: '/de/tutorials/robot-arms/xlerobot/' },
                { text: 'Umgebung einrichten (macOS)', link: '/de/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS' },
                { text: 'Umgebung einrichten (Ubuntu)', link: '/de/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu' },
                { text: 'Umgebung einrichten (Windows)', link: '/de/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows' },
                { text: 'XLeRobot-Dateien verschieben', link: '/de/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files' },
                { text: 'Montage (fertiger Bausatz)', link: '/de/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit' },
                { text: 'Montage (Einzelteile)', link: '/de/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: 'Roboterhand Interface-Steuerung', link: '/de/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: 'AmazingHand Fingerhand Produktinformationen', link: '/de/tutorials/robot-arms/amazing-hand/product-info' },
                { text: 'Tutorial zum offiziellen Beispiel der Roboterhand', link: '/de/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'Dexterous Hand (TTL-Servo) Debug-Tutorial', link: '/de/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                {
                  text: 'PWM-Servo-Debugging',
                  collapsed: true,
                  items: [
                    { text: '01-GUI-visuelle Steuerung', link: '/de/tutorials/robot-arms/amazing-hand/pwm-debugging/01-GUI-Visual-Control' },
                    { text: '02-Gesten-Tracking-Tutorial', link: '/de/tutorials/robot-arms/amazing-hand/pwm-debugging/02-Gesture-Tracking' },
                    { text: '03-PWM-Servo-Version - Handbuch', link: '/de/tutorials/robot-arms/amazing-hand/pwm-debugging/03-PWM-Servo-Manual' },
                    { text: '04-Serienservo-Version - Benutzungshinweise', link: '/de/tutorials/robot-arms/amazing-hand/pwm-debugging/04-Serial-Servo-Guide' },
                  ],
                },
                {
                  text: 'Gestenverfolgung',
                  collapsed: true,
                  items: [
                    { text: 'Linux（Ubuntu）Ein-Klick-Deployment und -Ausführung', link: '/de/tutorials/robot-arms/amazing-hand/gesture-tracking/01-Ubuntu' },
                    { text: 'Windows Ein-Klick-Deployment und -Ausführung', link: '/de/tutorials/robot-arms/amazing-hand/gesture-tracking/02-Windows' },
                    { text: 'Mac Ein-Klick-Deployment und -Ausführung', link: '/de/tutorials/robot-arms/amazing-hand/gesture-tracking/03-macOS' },
                  ],
                },
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
            { text: 'Remote-Dateiübertragung', link: '/de/tutorials/sensors/imu/remote-file-transfer' },
            { text: 'SSH-Dateiübertragung', link: '/de/tutorials/sensors/imu/ssh-file-transfer' },
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
            {
              text: 'GPS- & BeiDou-Modul',
              collapsed: true,
              items: [
                { text: 'Modul-Informationen', link: '/de/tutorials/sensors/gps/GPS-Module-Info' },
                { text: '51-MCU: GPS-Auswertung', link: '/de/tutorials/sensors/gps/51-MCU-GPS-Parsing' },
                { text: 'Arduino: Positionsausgabe', link: '/de/tutorials/sensors/gps/Arduino-Location-Reading' },
                { text: 'Arduino: Positionsauswertung', link: '/de/tutorials/sensors/gps/Arduino-Location-Parsing' },
                { text: 'STM32F103: GPS-Auswertung', link: '/de/tutorials/sensors/gps/STM32F103-GPS-Parsing' },
                { text: 'Jetson: GPS-Auswertung', link: '/de/tutorials/sensors/gps/Jetson-GPS-Parsing' },
                { text: 'Jetson: AGNSS-Unterstützung', link: '/de/tutorials/sensors/gps/Jetson-AGNSS' },
                { text: 'Jetson: Baidu-Maps-API', link: '/de/tutorials/sensors/gps/Jetson-Baidu-Map-API' },
                { text: 'Raspberry Pi: GPS-Auswertung', link: '/de/tutorials/sensors/gps/RaspberryPi-GPS-Parsing' },
                { text: 'Raspberry Pi: AGNSS-Unterstützung', link: '/de/tutorials/sensors/gps/RaspberryPi-AGNSS' },
                { text: 'Raspberry Pi: Baidu-Maps-API', link: '/de/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API' },
                { text: 'ROS: Vorbereitung', link: '/de/tutorials/sensors/gps/ROS-Preparation' },
                { text: 'ROS: GPS-Daten lesen', link: '/de/tutorials/sensors/gps/ROS-Read-GPS-Data' },
                { text: 'ROS: GPS-Spur zeichnen', link: '/de/tutorials/sensors/gps/ROS-Draw-GPS-Track' },
                { text: 'Kartenpositionsfehler', link: '/de/tutorials/sensors/gps/Map-Location-Error' },
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
                      { text: 'SCS0009-Servo-Debug-Tool – Anleitung', link: '/de/tutorials/accessories/feetech/SCS0009-Debug-Tool' },
                    ],
                },
                {
                  text: 'ESP32-NanoCam Videoübertragungsmodul',
                  collapsed: true,
                  items: [
                    { text: 'ESP32-NanoCam Schnellstart', link: '/de/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start' },
                    { text: 'ESP32-NanoCam Hardware-Spezifikation', link: '/de/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec' },
                    { text: 'ESP32-NanoCam Handbuch zum seriellen Protokoll', link: '/de/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol' },
                    {
                      text: 'KI-Vision-Tutorial (11 Kapitel)',
                      collapsed: true,
                      items: [
                        { text: 'Kapitel 1: Umgebungseinrichtung', link: '/de/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup' },
                        { text: 'Kapitel 2: Schnellstart', link: '/de/tutorials/accessories/esp32-nanocam/Ch02-Quick-Start' },
                        { text: 'Kapitel 3: Kamera-Grundlagen', link: '/de/tutorials/accessories/esp32-nanocam/Ch03-Camera-Basics' },
                        { text: 'Kapitel 4: Gesichtsdetektion', link: '/de/tutorials/accessories/esp32-nanocam/Ch04-Face-Detection' },
                        { text: 'Kapitel 5: Katzengesichtsdetektion', link: '/de/tutorials/accessories/esp32-nanocam/Ch05-Cat-Face-Detection' },
                        { text: 'Kapitel 6: Farberkennung', link: '/de/tutorials/accessories/esp32-nanocam/Ch06-Color-Recognition' },
                        { text: 'Kapitel 7: QR-Code-Scanning', link: '/de/tutorials/accessories/esp32-nanocam/Ch07-QR-Code-Scanning' },
                        { text: 'Kapitel 8: Gesichtserkennung', link: '/de/tutorials/accessories/esp32-nanocam/Ch08-Face-Recognition' },
                        { text: 'Kapitel 9: Sprachdialog', link: '/de/tutorials/accessories/esp32-nanocam/Ch09-Voice-Chat' },
                        { text: 'Kapitel 10: KI-Bildverständnis', link: '/de/tutorials/accessories/esp32-nanocam/Ch10-AI-Vision-Understanding' },
                        { text: 'Kapitel 11: ESP-Claw-Sprachsteuerung', link: '/de/tutorials/accessories/esp32-nanocam/Ch11-ESP-Claw-Voice-Control' },
                      ],
                    },
                  ],
                },
                {
                  text: 'CSI-Kamera-Tutorials',
                  collapsed: true,
                  items: [
                    { text: 'Jetson CSI-Kamera einrichten', link: '/de/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup' },
                    { text: 'Autofokus-Kamera verwenden', link: '/de/tutorials/accessories/csi-camera/02-Auto-Focus-Camera' },
                    { text: 'Jupyter Lab verwenden', link: '/de/tutorials/accessories/csi-camera/03-JupyterLab' },
                    { text: 'JetCam verwenden', link: '/de/tutorials/accessories/csi-camera/04-JetCam' },
                    { text: 'IMX219 am Raspberry Pi', link: '/de/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi' },
                  ],
                },
                {
                  text: 'AI-Sprachinteraktionsmodul',
                  collapsed: true,
                  items: [
                    { text: 'Schnellstart', link: '/de/tutorials/accessories/ai-voice-module/Quick-Start' },
                    { text: 'Produktinformationen', link: '/de/tutorials/accessories/ai-voice-module/Product-Info' },
                    { text: 'Flashen der Modul-Firmware', link: '/de/tutorials/accessories/ai-voice-module/Firmware-Flashing' },
                    { text: 'Weckwort und Befehlswörter ändern', link: '/de/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit' },
                    { text: 'Benutzerdefinierte Protokolleinträge erstellen', link: '/de/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries' },
                    { text: 'ROS1-Sprachinteraktion', link: '/de/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction' },
                    { text: 'ROS2-Sprachinteraktion', link: '/de/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction' },
                    { text: 'Serielles Protokoll', link: '/de/tutorials/accessories/ai-voice-module/Serial-Protocol' },
                    { text: 'IIC-Protokoll', link: '/de/tutorials/accessories/ai-voice-module/IIC-Protocol' },
                    { text: 'PC-Kommunikation', link: '/de/tutorials/accessories/ai-voice-module/PC-Communication' },
                    { text: 'Arduino: Serielle Kommunikation', link: '/de/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication' },
                    { text: 'Arduino: IIC-Kommunikation', link: '/de/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication' },
                    { text: 'Jetson: Serielle Kommunikation', link: '/de/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication' },
                    { text: 'Jetson: IIC-Kommunikation', link: '/de/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication' },
                    { text: 'RDK: Serielle Kommunikation', link: '/de/tutorials/accessories/ai-voice-module/RDK-Serial-Communication' },
                    { text: 'RDK: IIC-Kommunikation', link: '/de/tutorials/accessories/ai-voice-module/RDK-IIC-Communication' },
                    { text: 'Raspberry Pi: Serielle Kommunikation', link: '/de/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication' },
                    { text: 'Raspberry Pi: IIC-Kommunikation', link: '/de/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication' },
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
        '/de/topics/': [{ text: 'Themen', items: [{ text: 'Themen', link: '/de/topics/' }, { text: 'JetPack-Flashing und Systemkonfiguration', link: '/de/topics/jetpack-setup' }, { text: 'Einstieg in Edge-KI-Deployment', link: '/de/topics/edge-ai-intro' }, { text: 'Einstieg in die verkörperte Intelligenz (LeRobot)', link: '/de/topics/embodied-ai-intro' }, { text: 'Robot-Learning-Schwerpunkt', link: '/de/topics/robot-learning/' }, { text: 'Warum wir Open Source bauen — Das Plädoyer für Open-Source-Roboterhardware', link: '/de/topics/open-source-hardware' }] }],
        '/de/tech/': [{ text: 'Technische Doku', items: [{ text: 'Technische Doku', link: '/de/tech/' }, { text: 'API-Referenz', link: '/de/tech/api-reference' }, { text: 'Entwicklungsleitfaden', link: '/de/tech/dev-guide' }] }],
        '/de/community/': [{ text: 'Community', items: [{ text: 'Community', link: '/de/community/' }, { text: 'Mitwirkungsleitfaden', link: '/de/community/contributing' }] }],
        '/de/cases/': [{ text: 'Fallstudien', items: [{ text: 'Nutzer-Erfolgsgeschichten', link: '/de/cases/' }] }],
        '/de/products/': [
          { text: 'Roboter', items: [
            { text: 'SO-ARM101 Entwicklungs-Kit', link: '/de/products/so-arm101' },
            { text: 'AmazingHand 4-Finger-Greifhand', link: '/de/products/amazinghand' },
            { text: 'JUXI-Bus-Servo-Treiberplatine', link: '/de/products/servo-driver-board' },
            { text: 'SO-ARM101 TPU-Flex-Greifer', link: '/de/products/tpu-flexible-gripper' },
            { text: 'SO-ARM101 Robotik-Visions-Kit', link: '/de/products/robot-vision-kit' },
            { text: 'Lekiwi Embodied-Intelligence-Mobileroboter', link: '/de/products/lekiwi' },
            { text: 'SO-ARM101 Overhead-Kamera-Halterung', link: '/de/products/overhead-camera-mount' },
            { text: 'XLeRobot Zweiarm-Mobilroboter', link: '/de/products/xlerobot' },
          ] },
          { text: 'Computing & Vision', items: [
            { text: 'Jetson Orin NX Super Developer Kit', link: '/de/products/jetson-orin-nx-super-kit' },
            { text: 'ESP32-S3 WiFi-Videomodul', link: '/de/products/esp32-s3-wifi-module' },
            { text: '79° IMX219 CSI-Kamera', link: '/de/products/imx219-csi-camera' },
            { text: 'USB-Kamera mit Autofokus', link: '/de/products/usb-auto-focus-camera' },
            { text: '3D-RealSense-Tiefenkamera', link: '/de/products/realsense-depth-camera' },
          ] },
          { text: 'Sensoren', items: [
            { text: 'IMU Hochpräzisions-Trägheitsnavigationsmodul', link: '/de/products/imu-module' },
            { text: 'GPS- & Beidou-GNSS-Positionsmodul', link: '/de/products/gps-beidou-module' },
          ] },
          { text: 'Zubehör', items: [
            { text: '2-DOF-Servo-Pan-Tilt-Einheit', link: '/de/products/2dof-gimbal' },
            { text: 'KWS-Sprachinteraktionsmodul', link: '/de/products/kws-voice-module' },
            { text: 'Feetech-Bus-Servos (SCS0009 / STS3215)', link: '/de/products/feetech-servo' },
            { text: '4-in-1-KVM-Switch', link: '/de/products/kvm-switch' },
            { text: 'USB Soundkarte ohne Treiber', link: '/de/products/usb-sound-card' },
            { text: '4K-HDMI-Capture-Karte', link: '/de/products/4k-hdmi-capture' },
            { text: 'AI-Sprachinteraktionsmodul', link: '/de/products/ai-voice-module' },
          ] },
        ],
      },
    },
  },
  fr: {
    label: 'Français',
    lang: 'fr',
    title: 'Juxi Technology Wiki',
    description: 'Centre de tutoriels et de documentation Juxi Technology',
    head: [
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      docFooter: { prev: 'Précédent', next: 'Suivant' },
      sidebarMenuLabel: 'Menu',
      returnToTopLabel: 'Retour en haut',
      outline: { level: [2, 3], label: 'Sur cette page' },
      skipToContentLabel: 'Aller au contenu',
      lightModeSwitchTitle: 'Passer au thème clair',
      darkModeSwitchLabel: 'Apparence',
      darkModeSwitchTitle: 'Passer au thème sombre',
      lastUpdated: {
        text: 'Dernière mise à jour (UTC)',
        // forceLocale:日期格式跟随页面语言(默认跟随访客系统区域,英文页会显示中文格式)
        // timeZone: UTC 统一,timeZoneName 显式标注
        formatOptions: { forceLocale: true, timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
      },
      nav: [
        { text: 'Tutoriels', link: '/fr/tutorials/', activeMatch: '/fr/tutorials/' },
        { text: 'Produits', link: '/fr/products/', activeMatch: '/fr/products/' },
        { text: 'Communauté', link: '/fr/community/', activeMatch: '/fr/community/' },
        { text: 'Plus', items: [
          { text: 'Sujets', link: '/fr/topics/' },
          { text: 'Documentation', link: '/fr/tech/' },
          { text: 'Cas clients', link: '/fr/cases/' },
          { text: 'Téléchargements', link: '/fr/downloads/' },
          { text: 'À propos', link: '/fr/about/' },
        ] },
      ],
      sidebar: {
        '/fr/tutorials/': [
          { text: 'Démarrage rapide', items: [
            { text: 'FAQ', link: '/fr/tutorials/faq' },
            { text: 'Introduction à ROS', link: '/fr/tutorials/ros-intro' },
            { text: 'Lark Wiki', link: '/fr/tutorials/lark-wiki' },
          ] },
          { text: 'Ressources pédagogiques', items: [
            { text: 'Ressources pédagogiques', link: '/fr/tutorials/learning-resources/' },
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
                { text: 'Téléopération sans fil SO-ARM101 (version ESP32-NanoCam)', link: '/fr/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop' },
                { text: 'Dépannage de la téléopération', link: '/fr/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting' },
                { text: 'Tutoriel SO-ARM101 bi-bras (double suiveur)', link: '/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial' },
                { text: 'Mise à niveau 7-DOF du SO-ARM101 et utilisation avec LeRobot', link: '/fr/tutorials/robot-arms/so-arm101/SO-ARM101-7DOF-LeRobot' },
                { text: 'Tutoriel d\'utilisation de l\'outil de calibration des servos de la série SoARM', link: '/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool' },
                {
                  text: 'Cours LeRobot',
                  collapsed: true,
                  items: [
                    { text: 'Présentation du cours LeRobot', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/' },
                    {
                      text: '1. Installer LeRobot',
                      collapsed: true,
                      items: [
                        { text: 'Étape 1 : Installation de l\'environnement LeRobot (Ubuntu)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu' },
                        { text: 'Étape 1 : Installation de l\'environnement LeRobot (Windows)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Windows' },
                        { text: 'Étape 1 : Installation de l\'environnement LeRobot (macOS)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/MacOS' },
                      ],
                    },
                    {
                      text: '2. Port série',
                      collapsed: true,
                      items: [
                        { text: 'Étape 2 : Vérification du port série (Ubuntu)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Ubuntu' },
                        { text: 'Étape 2 : Vérification du port série (Windows)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Windows' },
                        { text: 'Étape 2 : Vérification du port série (macOS)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/MacOS' },
                      ],
                    },
                    {
                      text: '3. Calibration',
                      collapsed: true,
                      items: [
                        { text: 'Étape 3 : Calibration du bras (Ubuntu)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Ubuntu' },
                        { text: 'Étape 3 : Calibration du bras (Windows)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Windows' },
                        { text: 'Étape 3 : Calibration du bras (macOS)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/MacOS' },
                      ],
                    },
                    {
                      text: '4. Téléopération',
                      collapsed: true,
                      items: [
                        { text: 'Étape 4 : Téléopération (Ubuntu)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Ubuntu' },
                        { text: 'Étape 4 : Téléopération (Windows)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Windows' },
                        { text: 'Étape 4 : Téléopération (macOS)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '5. Téléop. caméra',
                      collapsed: true,
                      items: [
                        { text: 'Étape 5 : Téléopération avec caméra (Ubuntu)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu' },
                        { text: 'Étape 5 : Téléopération avec caméra (Windows)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Windows' },
                        { text: 'Étape 5 : Téléopération avec caméra (macOS)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '6. Collecte données',
                      collapsed: true,
                      items: [
                        { text: 'Étape 6 : Collecte du jeu de données par démonstration', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording' },
                        { text: 'Étape 6 : Points d\'attention pour la collecte', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes' },
                        { text: 'Étape 6 : Créer un compte Hugging Face (facultatif)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account' },
                        { text: 'Étape 6 : Téléverser le jeu de données (facultatif)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload' },
                      ],
                    },
                    {
                      text: '7. Entraînement',
                      collapsed: true,
                      items: [
                        { text: 'Étape 7 : Entraînement local sur Ubuntu', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu' },
                        { text: 'Étape 7 : Environnement d\'entraînement cloud GPU', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU' },
                        { text: 'Étape 7 : Courbes d\'entraînement en temps réel (wandb)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves' },
                        { text: 'Étape 7 : Téléverser le modèle (facultatif)', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload' },
                        { text: 'Étape 7 : Obtenir les fichiers de poids du modèle', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights' },
                        { text: 'Étape 7 : Commande d\'entraînement ACT', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT' },
                        { text: 'Étape 7 : Commande d\'entraînement pi0', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0' },
                        { text: 'Étape 7 : Commande d\'entraînement pi0.5', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5' },
                        { text: 'Étape 7 : Commande d\'entraînement pi0fast', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast' },
                        { text: 'Étape 7 : Commande d\'entraînement smolvla', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla' },
                      ],
                    },
                    {
                      text: '8. Inférence',
                      collapsed: true,
                      items: [
                        { text: 'Étape 8 : Description de la ligne de commande', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference' },
                        { text: 'Étape 8 : Bugs courants et solutions', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Common-Bugs' },
                        { text: 'Étape 8 : Commande de déploiement ACT', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-ACT' },
                        { text: 'Étape 8 : Commande de déploiement pi0', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0' },
                        { text: 'Étape 8 : Commande de déploiement pi0.5', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0.5' },
                        { text: 'Étape 8 : Commande de déploiement smolvla', link: '/fr/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-smolvla' },
                      ],
                    },
                    {
                      text: 'Notions de base',
                      collapsed: true,
                      items: [
                        { text: 'Découvrir LeRobot', link: '/fr/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot' },
                        { text: 'Jeux de données LeRobot sur HuggingFace', link: '/fr/tutorials/robot-arms/so-arm101/basics/HF-Datasets' },
                        { text: 'Ressources pour l\'entraînement de modèles', link: '/fr/tutorials/robot-arms/so-arm101/basics/Training-Resources' },
                        { text: 'Fichiers d\'impression 3D officiels du bras SO-ARM 100', link: '/fr/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files' },
                        { text: 'Fichiers URDF et références', link: '/fr/tutorials/robot-arms/so-arm101/basics/URDF-Reference' },
                      ],
                    },
                    {
                      text: 'Compléments',
                      collapsed: true,
                      items: [
                        { text: 'Simulation et contrôle ROS2', link: '/fr/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control' },
                        { text: 'Installation de la pince à doigts parallèles', link: '/fr/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              text: 'Cours SO-ARM101 + AmazingHand',
              collapsed: true,
              items: [
                { text: 'Aperçu du cours', link: '/fr/tutorials/robot-arms/so-arm-amazinghand/' },
                { text: 'Phase 1 : Configuration de l\'environnement (Linux)', link: '/fr/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Linux' },
                { text: 'Phase 1 : Configuration de l\'environnement (Windows)', link: '/fr/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Windows' },
                { text: 'Étape 2 : calibration main et bras (Linux)', link: '/fr/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Linux' },
                { text: 'Étape 2 : calibration main et bras (Windows)', link: '/fr/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Windows' },
                { text: 'Phase 3 : Téléopération (Linux)', link: '/fr/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Linux' },
                { text: 'Phase 3 : Téléopération (Windows)', link: '/fr/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Windows' },
                { text: 'Phase 4 : Collecte de données (Linux)', link: '/fr/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Linux' },
                { text: 'Phase 4 : Collecte de données (Windows)', link: '/fr/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Windows' },
                { text: 'Phase 5 : Entraînement du modèle (Linux)', link: '/fr/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Linux' },
                { text: 'Phase 5 : Entraînement du modèle (Windows)', link: '/fr/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Windows' },
                { text: 'Étape 6 : déploiement du modèle (Linux)', link: '/fr/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Linux' },
                { text: 'Étape 6 : déploiement du modèle (Windows)', link: '/fr/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Windows' },
              ],
            },
            {
              text: 'Tutoriels XLeRobot',
              collapsed: true,
              items: [
                { text: 'Aperçu des tutoriels', link: '/fr/tutorials/robot-arms/xlerobot/' },
                { text: 'Configuration (macOS)', link: '/fr/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS' },
                { text: 'Configuration (Ubuntu)', link: '/fr/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu' },
                { text: 'Configuration (Windows)', link: '/fr/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows' },
                { text: 'Déplacer les fichiers XLeRobot', link: '/fr/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files' },
                { text: 'Assemblage du kit monté', link: '/fr/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit' },
                { text: 'Assemblage du kit en pièces', link: '/fr/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: "Contrôle d'interface main robotique", link: '/fr/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: 'Documentation produit AmazingHand', link: '/fr/tutorials/robot-arms/amazing-hand/product-info' },
                { text: "Tutoriel d'exécution de l'exemple officiel de la main robotique", link: '/fr/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'Tutoriel de débogage de la main robotique (servo TTL)', link: '/fr/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                {
                  text: 'Débogage servo PWM',
                  collapsed: true,
                  items: [
                    { text: '01-Contrôle visuel par GUI', link: '/fr/tutorials/robot-arms/amazing-hand/pwm-debugging/01-GUI-Visual-Control' },
                    { text: '02-Tutoriel de suivi de gestes', link: '/fr/tutorials/robot-arms/amazing-hand/pwm-debugging/02-Gesture-Tracking' },
                    { text: '03-Version servomoteurs PWM - Manuel d\'utilisation', link: '/fr/tutorials/robot-arms/amazing-hand/pwm-debugging/03-PWM-Servo-Manual' },
                    { text: '04-Version servomoteurs série - Notice d\'utilisation', link: '/fr/tutorials/robot-arms/amazing-hand/pwm-debugging/04-Serial-Servo-Guide' },
                  ],
                },
                {
                  text: 'Suivi des gestes',
                  collapsed: true,
                  items: [
                    { text: 'Déploiement et exécution en un clic sous Linux (Ubuntu)', link: '/fr/tutorials/robot-arms/amazing-hand/gesture-tracking/01-Ubuntu' },
                    { text: 'Déploiement et exécution en un clic sous Windows', link: '/fr/tutorials/robot-arms/amazing-hand/gesture-tracking/02-Windows' },
                    { text: 'Déploiement et exécution en un clic sous Mac', link: '/fr/tutorials/robot-arms/amazing-hand/gesture-tracking/03-macOS' },
                  ],
                },
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
            { text: 'Transfert de fichiers à distance', link: '/fr/tutorials/sensors/imu/remote-file-transfer' },
            { text: 'Transfert de fichiers SSH', link: '/fr/tutorials/sensors/imu/ssh-file-transfer' },
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
            {
              text: 'Module GPS & BeiDou',
              collapsed: true,
              items: [
                { text: 'Informations module', link: '/fr/tutorials/sensors/gps/GPS-Module-Info' },
                { text: '51 MCU : analyse GPS', link: '/fr/tutorials/sensors/gps/51-MCU-GPS-Parsing' },
                { text: 'Arduino : lecture de position', link: '/fr/tutorials/sensors/gps/Arduino-Location-Reading' },
                { text: 'Arduino : analyse de position', link: '/fr/tutorials/sensors/gps/Arduino-Location-Parsing' },
                { text: 'STM32F103 : sortie analyse GPS', link: '/fr/tutorials/sensors/gps/STM32F103-GPS-Parsing' },
                { text: 'Jetson : analyse GPS', link: '/fr/tutorials/sensors/gps/Jetson-GPS-Parsing' },
                { text: 'Jetson : positionnement AGNSS', link: '/fr/tutorials/sensors/gps/Jetson-AGNSS' },
                { text: 'Jetson : API Baidu Maps', link: '/fr/tutorials/sensors/gps/Jetson-Baidu-Map-API' },
                { text: 'Raspberry Pi : analyse GPS', link: '/fr/tutorials/sensors/gps/RaspberryPi-GPS-Parsing' },
                { text: 'Raspberry Pi : positionnement AGNSS', link: '/fr/tutorials/sensors/gps/RaspberryPi-AGNSS' },
                { text: 'Raspberry Pi : API Baidu Maps', link: '/fr/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API' },
                { text: 'ROS : préparation', link: '/fr/tutorials/sensors/gps/ROS-Preparation' },
                { text: 'ROS : lecture des données GPS', link: '/fr/tutorials/sensors/gps/ROS-Read-GPS-Data' },
                { text: 'ROS : tracer la trace GPS', link: '/fr/tutorials/sensors/gps/ROS-Draw-GPS-Track' },
                { text: 'Erreur de localisation sur la carte', link: '/fr/tutorials/sensors/gps/Map-Location-Error' },
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
                      { text: 'Tutoriel d\'utilisation de l\'outil de débogage du servo SCS0009', link: '/fr/tutorials/accessories/feetech/SCS0009-Debug-Tool' },
                    ],
                },
                {
                  text: 'Module de transmission vidéo ESP32-NanoCam',
                  collapsed: true,
                  items: [
                    { text: 'ESP32-NanoCam Démarrage rapide', link: '/fr/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start' },
                    { text: 'ESP32-NanoCam Spécifications matérielles', link: '/fr/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec' },
                    { text: 'ESP32-NanoCam Manuel du protocole série', link: '/fr/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol' },
                    {
                      text: 'Tutoriel de vision IA (11 chapitres)',
                      collapsed: true,
                      items: [
                        { text: 'Chapitre 1 : Configuration de l\'environnement', link: '/fr/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup' },
                        { text: 'Chapitre 2 : Démarrage rapide', link: '/fr/tutorials/accessories/esp32-nanocam/Ch02-Quick-Start' },
                        { text: 'Chapitre 3 : Bases de la caméra', link: '/fr/tutorials/accessories/esp32-nanocam/Ch03-Camera-Basics' },
                        { text: 'Chapitre 4 : Détection de visage', link: '/fr/tutorials/accessories/esp32-nanocam/Ch04-Face-Detection' },
                        { text: 'Chapitre 5 : Détection de visage de chat', link: '/fr/tutorials/accessories/esp32-nanocam/Ch05-Cat-Face-Detection' },
                        { text: 'Chapitre 6 : Reconnaissance des couleurs', link: '/fr/tutorials/accessories/esp32-nanocam/Ch06-Color-Recognition' },
                        { text: 'Chapitre 7 : Scan de QR codes', link: '/fr/tutorials/accessories/esp32-nanocam/Ch07-QR-Code-Scanning' },
                        { text: 'Chapitre 8 : Reconnaissance faciale', link: '/fr/tutorials/accessories/esp32-nanocam/Ch08-Face-Recognition' },
                        { text: 'Chapitre 9 : Dialogue vocal', link: '/fr/tutorials/accessories/esp32-nanocam/Ch09-Voice-Chat' },
                        { text: 'Chapitre 10 : Compréhension visuelle par IA', link: '/fr/tutorials/accessories/esp32-nanocam/Ch10-AI-Vision-Understanding' },
                        { text: 'Chapitre 11 : Contrôle vocal ESP-Claw', link: '/fr/tutorials/accessories/esp32-nanocam/Ch11-ESP-Claw-Voice-Control' },
                      ],
                    },
                  ],
                },
                {
                  text: 'Tutoriels caméra CSI',
                  collapsed: true,
                  items: [
                    { text: 'Configuration caméra CSI Jetson', link: '/fr/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup' },
                    { text: 'Utilisation de la caméra autofocus', link: '/fr/tutorials/accessories/csi-camera/02-Auto-Focus-Camera' },
                    { text: 'Utiliser Jupyter Lab', link: '/fr/tutorials/accessories/csi-camera/03-JupyterLab' },
                    { text: 'Utiliser JetCam', link: '/fr/tutorials/accessories/csi-camera/04-JetCam' },
                    { text: 'IMX219 sur Raspberry Pi', link: '/fr/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi' },
                  ],
                },
                {
                  text: 'Module d\'interaction vocale IA',
                  collapsed: true,
                  items: [
                    { text: 'Démarrage rapide', link: '/fr/tutorials/accessories/ai-voice-module/Quick-Start' },
                    { text: 'Informations produit', link: '/fr/tutorials/accessories/ai-voice-module/Product-Info' },
                    { text: 'Flashage du micrologiciel du module', link: '/fr/tutorials/accessories/ai-voice-module/Firmware-Flashing' },
                    { text: 'Modifier le mot de réveil et les mots de commande', link: '/fr/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit' },
                    { text: 'Création d\'entrées de protocole personnalisées', link: '/fr/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries' },
                    { text: 'Interaction vocale ROS1', link: '/fr/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction' },
                    { text: 'Interaction vocale ROS2', link: '/fr/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction' },
                    { text: 'Protocole du port série', link: '/fr/tutorials/accessories/ai-voice-module/Serial-Protocol' },
                    { text: 'Protocole IIC', link: '/fr/tutorials/accessories/ai-voice-module/IIC-Protocol' },
                    { text: 'Communication PC', link: '/fr/tutorials/accessories/ai-voice-module/PC-Communication' },
                    { text: 'Arduino: Communication par port série', link: '/fr/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication' },
                    { text: 'Arduino: Communication IIC', link: '/fr/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication' },
                    { text: 'Jetson: Communication par port série', link: '/fr/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication' },
                    { text: 'Jetson: Communication IIC', link: '/fr/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication' },
                    { text: 'RDK: Communication par port série', link: '/fr/tutorials/accessories/ai-voice-module/RDK-Serial-Communication' },
                    { text: 'RDK: Communication IIC', link: '/fr/tutorials/accessories/ai-voice-module/RDK-IIC-Communication' },
                    { text: 'Raspberry Pi: Communication par port série', link: '/fr/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication' },
                    { text: 'Raspberry Pi: Communication IIC', link: '/fr/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication' },
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
        '/fr/topics/': [{ text: 'Sujets', items: [{ text: 'Sujets', link: '/fr/topics/' }, { text: 'Flashage JetPack et configuration système', link: '/fr/topics/jetpack-setup' }, { text: 'Introduction au déploiement IA en périphérie', link: '/fr/topics/edge-ai-intro' }, { text: "Introduction à l'intelligence incarnée (LeRobot)", link: '/fr/topics/embodied-ai-intro' }, { text: 'Thématique Robot Learning', link: '/fr/topics/robot-learning/' }, { text: "Pourquoi nous construisons en open source — Le plaidoyer pour le matériel robotique open source", link: '/fr/topics/open-source-hardware' }] }],
        '/fr/tech/': [{ text: 'Documentation', items: [{ text: 'Documentation', link: '/fr/tech/' }, { text: 'Référence API', link: '/fr/tech/api-reference' }, { text: 'Guide de développement', link: '/fr/tech/dev-guide' }] }],
        '/fr/community/': [{ text: 'Communauté', items: [{ text: 'Communauté', link: '/fr/community/' }, { text: 'Guide de contribution', link: '/fr/community/contributing' }] }],
        '/fr/cases/': [{ text: 'Cas clients', items: [{ text: "Témoignages d'utilisateurs", link: '/fr/cases/' }] }],
        '/fr/products/': [
          { text: 'Robots', items: [
            { text: 'Kit de développement SO-ARM101', link: '/fr/products/so-arm101' },
            { text: 'Main dexterous AmazingHand', link: '/fr/products/amazinghand' },
            { text: 'Carte driver de servos bus JUXI', link: '/fr/products/servo-driver-board' },
            { text: 'Pince flexible en TPU SO-ARM101', link: '/fr/products/tpu-flexible-gripper' },
            { text: 'Kit vision bras robotique SO-ARM101', link: '/fr/products/robot-vision-kit' },
            { text: 'Robot mobile à intelligence incarnée Lekiwi', link: '/fr/products/lekiwi' },
            { text: 'Support caméra aérienne SO-ARM101', link: '/fr/products/overhead-camera-mount' },
            { text: 'Robot mobile à deux bras XLeRobot', link: '/fr/products/xlerobot' },
          ] },
          { text: 'Calcul & Vision', items: [
            { text: 'Kit de développement Jetson Orin NX Super', link: '/fr/products/jetson-orin-nx-super-kit' },
            { text: 'Module vidéo WiFi ESP32-S3', link: '/fr/products/esp32-s3-wifi-module' },
            { text: 'Caméra CSI IMX219 79°', link: '/fr/products/imx219-csi-camera' },
            { text: 'Caméra USB à autofocus', link: '/fr/products/usb-auto-focus-camera' },
            { text: 'Caméra de profondeur 3D RealSense', link: '/fr/products/realsense-depth-camera' },
          ] },
          { text: 'Capteurs', items: [
            { text: 'Module IMU inertiel de haute précision', link: '/fr/products/imu-module' },
            { text: 'Module de positionnement GNSS GPS & Beidou', link: '/fr/products/gps-beidou-module' },
          ] },
          { text: 'Accessoires', items: [
            { text: 'Unité pan-tilt servo 2 DDL', link: '/fr/products/2dof-gimbal' },
            { text: "Module d'interaction vocale KWS", link: '/fr/products/kws-voice-module' },
            { text: 'Servos bus Feetech (SCS0009 / STS3215)', link: '/fr/products/feetech-servo' },
            { text: 'Switch KVM 4-en-1', link: '/fr/products/kvm-switch' },
            { text: 'Carte son USB sans pilote', link: '/fr/products/usb-sound-card' },
            { text: 'Carte de capture HDMI 4K', link: '/fr/products/4k-hdmi-capture' },
            { text: 'Module d\'interaction vocale IA', link: '/fr/products/ai-voice-module' },
          ] },
        ],
      },
    },
  },
  es: {
    label: 'Español',
    lang: 'es',
    title: 'Juxi Technology Wiki',
    description: 'Centro de tutoriales y documentación de Juxi Technology',
    head: [
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      docFooter: { prev: 'Anterior', next: 'Siguiente' },
      sidebarMenuLabel: 'Menú',
      returnToTopLabel: 'Volver arriba',
      outline: { level: [2, 3], label: 'En esta página' },
      skipToContentLabel: 'Saltar al contenido',
      lightModeSwitchTitle: 'Cambiar al tema claro',
      darkModeSwitchLabel: 'Apariencia',
      darkModeSwitchTitle: 'Cambiar al tema oscuro',
      lastUpdated: {
        text: 'Última actualización (UTC)',
        // forceLocale:日期格式跟随页面语言(默认跟随访客系统区域,英文页会显示中文格式)
        // timeZone: UTC 统一,timeZoneName 显式标注
        formatOptions: { forceLocale: true, timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
      },
      nav: [
        { text: 'Tutoriales', link: '/es/tutorials/', activeMatch: '/es/tutorials/' },
        { text: 'Productos', link: '/es/products/', activeMatch: '/es/products/' },
        { text: 'Comunidad', link: '/es/community/', activeMatch: '/es/community/' },
        { text: 'Más', items: [
          { text: 'Temas', link: '/es/topics/' },
          { text: 'Documentación', link: '/es/tech/' },
          { text: 'Casos de éxito', link: '/es/cases/' },
          { text: 'Descargas', link: '/es/downloads/' },
          { text: 'Sobre nosotros', link: '/es/about/' },
        ] },
      ],
      sidebar: {
        '/es/tutorials/': [
          { text: 'Inicio rápido', items: [
            { text: 'FAQ', link: '/es/tutorials/faq' },
            { text: 'Introducción a ROS', link: '/es/tutorials/ros-intro' },
            { text: 'Lark Wiki', link: '/es/tutorials/lark-wiki' },
          ] },
          { text: 'Recursos didácticos', items: [
            { text: 'Recursos didácticos', link: '/es/tutorials/learning-resources/' },
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
                { text: 'Teleoperación inalámbrica SO-ARM101 (versión ESP32-NanoCam)', link: '/es/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop' },
                { text: 'Solución de problemas de teleoperación', link: '/es/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting' },
                { text: 'Tutorial de doble brazo (doble brazo seguidor) del SO-ARM101', link: '/es/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial' },
                { text: 'Tutorial de conversión a 7-DOF del SO-ARM101 y uso con LeRobot', link: '/es/tutorials/robot-arms/so-arm101/SO-ARM101-7DOF-LeRobot' },
                { text: 'Tutorial de uso de la herramienta de calibración de servos de la serie SoARM', link: '/es/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool' },
                {
                  text: 'Curso de LeRobot',
                  collapsed: true,
                  items: [
                    { text: 'Curso completo de LeRobot', link: '/es/tutorials/robot-arms/so-arm101/lerobot/' },
                    {
                      text: '1. Instalar LeRobot',
                      collapsed: true,
                      items: [
                        { text: 'Paso 1: Instalar el entorno de LeRobot (Ubuntu)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu' },
                        { text: 'Paso 1: Instalar el entorno de LeRobot (Windows)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Windows' },
                        { text: 'Paso 1: Instalar el entorno de LeRobot (macOS)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/MacOS' },
                      ],
                    },
                    {
                      text: '2. Puerto serie',
                      collapsed: true,
                      items: [
                        { text: 'Paso 2: Ver el puerto del dispositivo serie (Ubuntu)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Ubuntu' },
                        { text: 'Paso 2: Ver el puerto del dispositivo serie (Windows)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Windows' },
                        { text: 'Paso 2: Ver el puerto del dispositivo serie (macOS)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/MacOS' },
                      ],
                    },
                    {
                      text: '3. Calibración',
                      collapsed: true,
                      items: [
                        { text: 'Paso 3: Calibrar el brazo robótico (Ubuntu)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Ubuntu' },
                        { text: 'Paso 3: Calibrar el brazo robótico (Windows)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Windows' },
                        { text: 'Paso 3: Calibrar el brazo robótico (macOS)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/MacOS' },
                      ],
                    },
                    {
                      text: '4. Teleoperación',
                      collapsed: true,
                      items: [
                        { text: 'Paso 4: Teleoperación (Ubuntu)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Ubuntu' },
                        { text: 'Paso 4: Teleoperación (Windows)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Windows' },
                        { text: 'Paso 4: Teleoperación (macOS)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '5. Cámara y teleop.',
                      collapsed: true,
                      items: [
                        { text: 'Paso 5: Teleoperación con cámara (Ubuntu)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu' },
                        { text: 'Paso 5: Teleoperación con cámara (Windows)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Windows' },
                        { text: 'Paso 5: Teleoperación con cámara (macOS)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '6. Conjunto de datos',
                      collapsed: true,
                      items: [
                        { text: 'Paso 6: Recopilación de datos por enseñanza', link: '/es/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording' },
                        { text: 'Paso 6: Notas de la recopilación de datos', link: '/es/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes' },
                        { text: 'Paso 6: Cuenta de Hugging Face (opcional)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account' },
                        { text: 'Paso 6: Subir el conjunto de datos (opcional)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload' },
                      ],
                    },
                    {
                      text: '7. Entrenamiento',
                      collapsed: true,
                      items: [
                        { text: 'Paso 7: Entrenamiento local en Ubuntu', link: '/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu' },
                        { text: 'Paso 7: Entorno de entrenamiento con GPU en la nube', link: '/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU' },
                        { text: 'Paso 7: Curvas de entrenamiento con wandb', link: '/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves' },
                        { text: 'Paso 7: Subir el modelo (opcional)', link: '/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload' },
                        { text: 'Paso 7: Obtener los pesos del modelo', link: '/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights' },
                        { text: 'Paso 7: Comando de entrenamiento ACT', link: '/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT' },
                        { text: 'Paso 7: Comando de entrenamiento pi0', link: '/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0' },
                        { text: 'Paso 7: Comando de entrenamiento pi0.5', link: '/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5' },
                        { text: 'Paso 7: Comando de entrenamiento pi0fast', link: '/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast' },
                        { text: 'Paso 7: Comando de entrenamiento smolvla', link: '/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla' },
                      ],
                    },
                    {
                      text: '8. Inferencia',
                      collapsed: true,
                      items: [
                        { text: 'Paso 8: Descripción de la línea de comandos', link: '/es/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference' },
                        { text: 'Paso 8: Bugs comunes y soluciones', link: '/es/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Common-Bugs' },
                        { text: 'Paso 8: Comando de despliegue ACT', link: '/es/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-ACT' },
                        { text: 'Paso 8: Comando de despliegue pi0', link: '/es/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0' },
                        { text: 'Paso 8: Comando de despliegue pi0.5', link: '/es/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0.5' },
                        { text: 'Paso 8: Comando de despliegue smolvla', link: '/es/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-smolvla' },
                      ],
                    },
                    {
                      text: 'Conceptos básicos',
                      collapsed: true,
                      items: [
                        { text: 'Conocer LeRobot y la inteligencia encarnada', link: '/es/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot' },
                        { text: 'Conjuntos de datos de LeRobot en HuggingFace', link: '/es/tutorials/robot-arms/so-arm101/basics/HF-Datasets' },
                        { text: 'Materiales para el entrenamiento de modelos', link: '/es/tutorials/robot-arms/so-arm101/basics/Training-Resources' },
                        { text: 'Archivos oficiales de impresión 3D del SO-ARM 100', link: '/es/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files' },
                        { text: 'Archivos URDF y referencias de materiales', link: '/es/tutorials/robot-arms/so-arm101/basics/URDF-Reference' },
                      ],
                    },
                    {
                      text: 'Extras y avanzado',
                      collapsed: true,
                      items: [
                        { text: 'Control de simulación en ROS2', link: '/es/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control' },
                        { text: 'Instalación de la pinza de dedos paralelos', link: '/es/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              text: 'Curso SO-ARM101 + AmazingHand',
              collapsed: true,
              items: [
                { text: 'Resumen del curso', link: '/es/tutorials/robot-arms/so-arm-amazinghand/' },
                { text: 'Fase 1: Preparación del entorno (Linux)', link: '/es/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Linux' },
                { text: 'Fase 1: Preparación del entorno (Windows)', link: '/es/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Windows' },
                { text: 'Etapa 2: calibración de mano y brazos (Linux)', link: '/es/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Linux' },
                { text: 'Etapa 2: calibración de mano y brazos (Windows)', link: '/es/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Windows' },
                { text: 'Fase 3: Teleoperación (Linux)', link: '/es/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Linux' },
                { text: 'Fase 3: Teleoperación (Windows)', link: '/es/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Windows' },
                { text: 'Fase 4: Recolección de datos (Linux)', link: '/es/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Linux' },
                { text: 'Fase 4: Recolección de datos (Windows)', link: '/es/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Windows' },
                { text: 'Fase 5: Entrenamiento del modelo (Linux)', link: '/es/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Linux' },
                { text: 'Fase 5: Entrenamiento del modelo (Windows)', link: '/es/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Windows' },
                { text: 'Etapa 6: despliegue del modelo (Linux)', link: '/es/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Linux' },
                { text: 'Etapa 6: despliegue del modelo (Windows)', link: '/es/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Windows' },
              ],
            },
            {
              text: 'Tutoriales de XLeRobot',
              collapsed: true,
              items: [
                { text: 'Resumen de tutoriales', link: '/es/tutorials/robot-arms/xlerobot/' },
                { text: 'Configuración (macOS)', link: '/es/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS' },
                { text: 'Configuración (Ubuntu)', link: '/es/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu' },
                { text: 'Configuración (Windows)', link: '/es/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows' },
                { text: 'Mover archivos de XLeRobot', link: '/es/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files' },
                { text: 'Montaje del kit ensamblado', link: '/es/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit' },
                { text: 'Montaje del kit de piezas', link: '/es/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: 'Control de interfaz de mano robótica', link: '/es/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: 'Material de producto de la mano diestra AmazingHand', link: '/es/tutorials/robot-arms/amazing-hand/product-info' },
                { text: 'Tutorial de ejecución del ejemplo oficial de la mano robótica', link: '/es/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'Tutorial de depuración de la mano hábil (servo TTL)', link: '/es/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                {
                  text: 'Depuración servo PWM',
                  collapsed: true,
                  items: [
                    { text: '01-Control visual por GUI', link: '/es/tutorials/robot-arms/amazing-hand/pwm-debugging/01-GUI-Visual-Control' },
                    { text: '02-Tutorial de seguimiento de gestos', link: '/es/tutorials/robot-arms/amazing-hand/pwm-debugging/02-Gesture-Tracking' },
                    { text: '03-Versión con servos PWM - Manual de uso', link: '/es/tutorials/robot-arms/amazing-hand/pwm-debugging/03-PWM-Servo-Manual' },
                    { text: '04-Versión con servos de puerto serie - Instrucciones de uso', link: '/es/tutorials/robot-arms/amazing-hand/pwm-debugging/04-Serial-Servo-Guide' },
                  ],
                },
                {
                  text: 'Seguimiento de gestos',
                  collapsed: true,
                  items: [
                    { text: 'Despliegue y ejecución en Linux (Ubuntu) en un clic', link: '/es/tutorials/robot-arms/amazing-hand/gesture-tracking/01-Ubuntu' },
                    { text: 'Despliegue y ejecución en Windows en un clic', link: '/es/tutorials/robot-arms/amazing-hand/gesture-tracking/02-Windows' },
                    { text: 'Despliegue y ejecución en Mac en un clic', link: '/es/tutorials/robot-arms/amazing-hand/gesture-tracking/03-macOS' },
                  ],
                },
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
            { text: 'Transferencia remota de archivos', link: '/es/tutorials/sensors/imu/remote-file-transfer' },
            { text: 'Transferencia de archivos por SSH', link: '/es/tutorials/sensors/imu/ssh-file-transfer' },
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
            {
              text: 'Módulo GPS y BeiDou',
              collapsed: true,
              items: [
                { text: 'Información del módulo', link: '/es/tutorials/sensors/gps/GPS-Module-Info' },
                { text: '51 MCU: análisis GPS', link: '/es/tutorials/sensors/gps/51-MCU-GPS-Parsing' },
                { text: 'Arduino: lectura de posición', link: '/es/tutorials/sensors/gps/Arduino-Location-Reading' },
                { text: 'Arduino: análisis de posición', link: '/es/tutorials/sensors/gps/Arduino-Location-Parsing' },
                { text: 'STM32F103: salida de análisis GPS', link: '/es/tutorials/sensors/gps/STM32F103-GPS-Parsing' },
                { text: 'Jetson: análisis GPS', link: '/es/tutorials/sensors/gps/Jetson-GPS-Parsing' },
                { text: 'Jetson: posicionamiento AGNSS', link: '/es/tutorials/sensors/gps/Jetson-AGNSS' },
                { text: 'Jetson: API de Baidu Maps', link: '/es/tutorials/sensors/gps/Jetson-Baidu-Map-API' },
                { text: 'Raspberry Pi: análisis GPS', link: '/es/tutorials/sensors/gps/RaspberryPi-GPS-Parsing' },
                { text: 'Raspberry Pi: posicionamiento AGNSS', link: '/es/tutorials/sensors/gps/RaspberryPi-AGNSS' },
                { text: 'Raspberry Pi: API de Baidu Maps', link: '/es/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API' },
                { text: 'ROS: preparación', link: '/es/tutorials/sensors/gps/ROS-Preparation' },
                { text: 'ROS: lectura de datos GPS', link: '/es/tutorials/sensors/gps/ROS-Read-GPS-Data' },
                { text: 'ROS: dibujar trayectoria GPS', link: '/es/tutorials/sensors/gps/ROS-Draw-GPS-Track' },
                { text: 'Error de ubicación en el mapa', link: '/es/tutorials/sensors/gps/Map-Location-Error' },
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
                      { text: 'Tutorial de uso de la herramienta de depuración del servo SCS0009', link: '/es/tutorials/accessories/feetech/SCS0009-Debug-Tool' },
                    ],
                },
                {
                  text: 'Módulo de transmisión de video ESP32-NanoCam',
                  collapsed: true,
                  items: [
                    { text: 'Inicio rápido de ESP32-NanoCam', link: '/es/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start' },
                    { text: 'Especificaciones de hardware del ESP32-NanoCam', link: '/es/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec' },
                    { text: 'Manual del protocolo serie del ESP32-NanoCam', link: '/es/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol' },
                    {
                      text: 'Tutorial de visión IA (11 capítulos)',
                      collapsed: true,
                      items: [
                        { text: 'Capítulo 1: Configuración del entorno', link: '/es/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup' },
                        { text: 'Capítulo 2: Inicio rápido', link: '/es/tutorials/accessories/esp32-nanocam/Ch02-Quick-Start' },
                        { text: 'Capítulo 3: Fundamentos de la cámara', link: '/es/tutorials/accessories/esp32-nanocam/Ch03-Camera-Basics' },
                        { text: 'Capítulo 4: Detección de rostros', link: '/es/tutorials/accessories/esp32-nanocam/Ch04-Face-Detection' },
                        { text: 'Capítulo 5: Detección de caras de gatos', link: '/es/tutorials/accessories/esp32-nanocam/Ch05-Cat-Face-Detection' },
                        { text: 'Capítulo 6: Reconocimiento de colores', link: '/es/tutorials/accessories/esp32-nanocam/Ch06-Color-Recognition' },
                        { text: 'Capítulo 7: Escaneo de códigos QR', link: '/es/tutorials/accessories/esp32-nanocam/Ch07-QR-Code-Scanning' },
                        { text: 'Capítulo 8: Reconocimiento facial', link: '/es/tutorials/accessories/esp32-nanocam/Ch08-Face-Recognition' },
                        { text: 'Capítulo 9: Conversación de voz', link: '/es/tutorials/accessories/esp32-nanocam/Ch09-Voice-Chat' },
                        { text: 'Capítulo 10: Comprensión visual con IA', link: '/es/tutorials/accessories/esp32-nanocam/Ch10-AI-Vision-Understanding' },
                        { text: 'Capítulo 11: Control por voz ESP-Claw', link: '/es/tutorials/accessories/esp32-nanocam/Ch11-ESP-Claw-Voice-Control' },
                      ],
                    },
                  ],
                },
                {
                  text: 'Tutoriales de cámara CSI',
                  collapsed: true,
                  items: [
                    { text: 'Configuración de cámara CSI en Jetson', link: '/es/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup' },
                    { text: 'Uso de la cámara con autofoco', link: '/es/tutorials/accessories/csi-camera/02-Auto-Focus-Camera' },
                    { text: 'Uso de Jupyter Lab', link: '/es/tutorials/accessories/csi-camera/03-JupyterLab' },
                    { text: 'Uso de JetCam', link: '/es/tutorials/accessories/csi-camera/04-JetCam' },
                    { text: 'IMX219 en Raspberry Pi', link: '/es/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi' },
                  ],
                },
                {
                  text: 'Módulo de interacción de voz IA',
                  collapsed: true,
                  items: [
                    { text: 'Inicio rápido', link: '/es/tutorials/accessories/ai-voice-module/Quick-Start' },
                    { text: 'Información del producto', link: '/es/tutorials/accessories/ai-voice-module/Product-Info' },
                    { text: 'Grabación del firmware del módulo', link: '/es/tutorials/accessories/ai-voice-module/Firmware-Flashing' },
                    { text: 'Modificar la palabra de activación y las palabras de comando', link: '/es/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit' },
                    { text: 'Creación de entradas de protocolo personalizadas', link: '/es/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries' },
                    { text: 'Interacción por voz en ROS1', link: '/es/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction' },
                    { text: 'Interacción por voz en ROS2', link: '/es/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction' },
                    { text: 'Protocolo de puerto serie', link: '/es/tutorials/accessories/ai-voice-module/Serial-Protocol' },
                    { text: 'Protocolo IIC', link: '/es/tutorials/accessories/ai-voice-module/IIC-Protocol' },
                    { text: 'Comunicación con PC', link: '/es/tutorials/accessories/ai-voice-module/PC-Communication' },
                    { text: 'Arduino: Comunicación por puerto serie', link: '/es/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication' },
                    { text: 'Arduino: Comunicación IIC', link: '/es/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication' },
                    { text: 'Jetson: Comunicación por puerto serie', link: '/es/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication' },
                    { text: 'Jetson: Comunicación IIC', link: '/es/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication' },
                    { text: 'RDK: Comunicación por puerto serie', link: '/es/tutorials/accessories/ai-voice-module/RDK-Serial-Communication' },
                    { text: 'RDK: Comunicación IIC', link: '/es/tutorials/accessories/ai-voice-module/RDK-IIC-Communication' },
                    { text: 'Raspberry Pi: Comunicación por puerto serie', link: '/es/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication' },
                    { text: 'Raspberry Pi: Comunicación IIC', link: '/es/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication' },
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
        '/es/topics/': [{ text: 'Temas', items: [{ text: 'Temas', link: '/es/topics/' }, { text: 'Flasheo de JetPack y configuración del sistema', link: '/es/topics/jetpack-setup' }, { text: 'Introducción al despliegue de IA en el borde', link: '/es/topics/edge-ai-intro' }, { text: 'Introducción a la inteligencia incorporada (LeRobot)', link: '/es/topics/embodied-ai-intro' }, { text: 'Tema Robot Learning', link: '/es/topics/robot-learning/' }, { text: 'Por qué construimos en código abierto — El caso del hardware robótico de código abierto', link: '/es/topics/open-source-hardware' }] }],
        '/es/tech/': [{ text: 'Documentación', items: [{ text: 'Documentación', link: '/es/tech/' }, { text: 'Referencia de API', link: '/es/tech/api-reference' }, { text: 'Guía de desarrollo', link: '/es/tech/dev-guide' }] }],
        '/es/community/': [{ text: 'Comunidad', items: [{ text: 'Comunidad', link: '/es/community/' }, { text: 'Guía de contribución', link: '/es/community/contributing' }] }],
        '/es/cases/': [{ text: 'Casos de éxito', items: [{ text: 'Casos de éxito de usuarios', link: '/es/cases/' }] }],
        '/es/products/': [
          { text: 'Robots', items: [
            { text: 'Kit de desarrollo SO-ARM101', link: '/es/products/so-arm101' },
            { text: 'Mano diestra AmazingHand', link: '/es/products/amazinghand' },
            { text: 'Placa driver de servos de bus JUXI', link: '/es/products/servo-driver-board' },
            { text: 'Pinza flexible TPU SO-ARM101', link: '/es/products/tpu-flexible-gripper' },
            { text: 'Kit de visión de brazo robótico SO-ARM101', link: '/es/products/robot-vision-kit' },
            { text: 'Robot móvil de inteligencia corporizada Lekiwi', link: '/es/products/lekiwi' },
            { text: 'Soporte de cámara superior SO-ARM101', link: '/es/products/overhead-camera-mount' },
            { text: 'Robot móvil de dos brazos XLeRobot', link: '/es/products/xlerobot' },
          ] },
          { text: 'Cómputo y visión', items: [
            { text: 'Kit de desarrollo Jetson Orin NX Super', link: '/es/products/jetson-orin-nx-super-kit' },
            { text: 'Módulo de vídeo WiFi ESP32-S3', link: '/es/products/esp32-s3-wifi-module' },
            { text: 'Cámara CSI IMX219 79°', link: '/es/products/imx219-csi-camera' },
            { text: 'Cámara USB con enfoque automático', link: '/es/products/usb-auto-focus-camera' },
            { text: 'Cámara de profundidad 3D RealSense', link: '/es/products/realsense-depth-camera' },
          ] },
          { text: 'Sensores', items: [
            { text: 'Módulo IMU inercial de alta precisión', link: '/es/products/imu-module' },
            { text: 'Módulo de posicionamiento GNSS GPS y Beidou', link: '/es/products/gps-beidou-module' },
          ] },
          { text: 'Accesorios', items: [
            { text: 'Unidad pan-tilt de servo de 2 GDL', link: '/es/products/2dof-gimbal' },
            { text: 'Módulo de interacción por voz KWS', link: '/es/products/kws-voice-module' },
            { text: 'Servos de bus Feetech (SCS0009 / STS3215)', link: '/es/products/feetech-servo' },
            { text: 'Conmutador KVM 4 en 1', link: '/es/products/kvm-switch' },
            { text: 'Tarjeta de sonido USB sin controladores', link: '/es/products/usb-sound-card' },
            { text: 'Tarjeta de captura HDMI 4K', link: '/es/products/4k-hdmi-capture' },
            { text: 'Módulo de interacción de voz IA', link: '/es/products/ai-voice-module' },
          ] },
        ],
      },
    },
  },
  it: {
    label: 'Italiano',
    lang: 'it',
    title: 'Juxi Technology Wiki',
    description: 'Centro tutorial e documentazione Juxi Technology',
    head: [
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      docFooter: { prev: 'Precedente', next: 'Successivo' },
      sidebarMenuLabel: 'Menu',
      returnToTopLabel: 'Torna su',
      outline: { level: [2, 3], label: 'In questa pagina' },
      skipToContentLabel: 'Vai al contenuto',
      lightModeSwitchTitle: 'Passa al tema chiaro',
      darkModeSwitchLabel: 'Aspetto',
      darkModeSwitchTitle: 'Passa al tema scuro',
      lastUpdated: {
        text: 'Ultimo aggiornamento (UTC)',
        // forceLocale:日期格式跟随页面语言(默认跟随访客系统区域,英文页会显示中文格式)
        // timeZone: UTC 统一,timeZoneName 显式标注
        formatOptions: { forceLocale: true, timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
      },
      nav: [
        { text: 'Tutorial', link: '/it/tutorials/', activeMatch: '/it/tutorials/' },
        { text: 'Prodotti', link: '/it/products/', activeMatch: '/it/products/' },
        { text: 'Community', link: '/it/community/', activeMatch: '/it/community/' },
        { text: 'Altro', items: [
          { text: 'Argomenti', link: '/it/topics/' },
          { text: 'Documentazione', link: '/it/tech/' },
          { text: 'Casi di successo', link: '/it/cases/' },
          { text: 'Download', link: '/it/downloads/' },
          { text: 'Chi siamo', link: '/it/about/' },
        ] },
      ],
      sidebar: {
        '/it/tutorials/': [
          { text: 'Guida rapida', items: [
            { text: 'FAQ', link: '/it/tutorials/faq' },
            { text: 'Introduzione a ROS', link: '/it/tutorials/ros-intro' },
            { text: 'Lark Wiki', link: '/it/tutorials/lark-wiki' },
          ] },
          { text: 'Risorse didattiche', items: [
            { text: 'Risorse didattiche', link: '/it/tutorials/learning-resources/' },
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
                { text: 'SO-ARM101 Teleoperazione wireless (versione ESP32-NanoCam)', link: '/it/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop' },
                { text: 'Risoluzione problemi di teleoperazione', link: '/it/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting' },
                { text: 'SO-ARM101 Tutorial bi-braccio (doppio follower)', link: '/it/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial' },
                { text: 'SO-ARM101 Conversione a 7-DOF e utilizzo con LeRobot', link: '/it/tutorials/robot-arms/so-arm101/SO-ARM101-7DOF-LeRobot' },
                { text: 'Tutorial d\'uso del tool di calibrazione servo della serie SoARM', link: '/it/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool' },
                {
                  text: 'Corso LeRobot',
                  collapsed: true,
                  items: [
                    { text: 'Panoramica del corso LeRobot', link: '/it/tutorials/robot-arms/so-arm101/lerobot/' },
                    {
                      text: '1. Ambiente LeRobot',
                      collapsed: true,
                      items: [
                        { text: 'Passo 1: Installare l\'ambiente LeRobot (Ubuntu)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu' },
                        { text: 'Passo 1: Installare l\'ambiente LeRobot (Windows)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Windows' },
                        { text: 'Passo 1: Installare l\'ambiente LeRobot (macOS)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/MacOS' },
                      ],
                    },
                    {
                      text: '2. Porte seriali',
                      collapsed: true,
                      items: [
                        { text: 'Passo 2: Visualizzare le porte seriali (Ubuntu)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Ubuntu' },
                        { text: 'Passo 2: Visualizzare le porte seriali (Windows)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Windows' },
                        { text: 'Passo 2: Visualizzare le porte seriali (macOS)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/MacOS' },
                      ],
                    },
                    {
                      text: '3. Calibrazione',
                      collapsed: true,
                      items: [
                        { text: 'Passo 3: Calibrare il braccio robotico (Ubuntu)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Ubuntu' },
                        { text: 'Passo 3: Calibrare il braccio robotico (Windows)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Windows' },
                        { text: 'Passo 3: Calibrare il braccio robotico (macOS)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/MacOS' },
                      ],
                    },
                    {
                      text: '4. Teleoperazione',
                      collapsed: true,
                      items: [
                        { text: 'Passo 4: Teleoperazione (Ubuntu)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Ubuntu' },
                        { text: 'Passo 4: Teleoperazione (Windows)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Windows' },
                        { text: 'Passo 4: Teleoperazione (macOS)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '5. Con telecamera',
                      collapsed: true,
                      items: [
                        { text: 'Passo 5: Teleoperazione con telecamera (Ubuntu)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu' },
                        { text: 'Passo 5: Teleoperazione con telecamera (Windows)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Windows' },
                        { text: 'Passo 5: Teleoperazione con telecamera (macOS)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/MacOS' },
                      ],
                    },
                    {
                      text: '6. Raccolta dataset',
                      collapsed: true,
                      items: [
                        { text: 'Passo 6: Raccolta del dataset tramite insegnamento', link: '/it/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording' },
                        { text: 'Passo 6: Note sulla raccolta del dataset', link: '/it/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes' },
                        { text: 'Passo 6: Registrare un account Hugging Face (opzionale)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account' },
                        { text: 'Passo 6: Caricare il dataset su HuggingFace (opzionale)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload' },
                      ],
                    },
                    {
                      text: '7. Addestramento',
                      collapsed: true,
                      items: [
                        { text: 'Passo 7: Addestramento su Ubuntu locale', link: '/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu' },
                        { text: 'Passo 7: Ambiente di addestramento su GPU cloud', link: '/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU' },
                        { text: 'Passo 7: Curve di addestramento in tempo reale con wandb', link: '/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves' },
                        { text: 'Passo 7: Caricare il modello su HuggingFace (opzionale)', link: '/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload' },
                        { text: 'Passo 7: Ottenere il file dei pesi del modello', link: '/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights' },
                        { text: 'Passo 7: Comando di addestramento ACT', link: '/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT' },
                        { text: 'Passo 7: Comando di addestramento pi0', link: '/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0' },
                        { text: 'Passo 7: Comando di addestramento pi0.5', link: '/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5' },
                        { text: 'Passo 7: Comando di addestramento pi0fast', link: '/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast' },
                        { text: 'Passo 7: Comando di addestramento SmolVLA', link: '/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla' },
                      ],
                    },
                    {
                      text: '8. Deployment',
                      collapsed: true,
                      items: [
                        { text: 'Passo 8: Descrizione dei comandi di deployment', link: '/it/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference' },
                        { text: 'Passo 8: Bug comuni e soluzioni', link: '/it/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Common-Bugs' },
                        { text: 'Passo 8: Comando di deployment ACT', link: '/it/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-ACT' },
                        { text: 'Passo 8: Comando di deployment pi0', link: '/it/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0' },
                        { text: 'Passo 8: Comando di deployment pi0.5', link: '/it/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0.5' },
                        { text: 'Passo 8: Comando di deployment SmolVLA', link: '/it/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-smolvla' },
                      ],
                    },
                    {
                      text: 'Nozioni di base',
                      collapsed: true,
                      items: [
                        { text: 'Conoscere LeRobot', link: '/it/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot' },
                        { text: 'Dataset LeRobot su HuggingFace', link: '/it/tutorials/robot-arms/so-arm101/basics/HF-Datasets' },
                        { text: 'Materiali per l\'addestramento del modello', link: '/it/tutorials/robot-arms/so-arm101/basics/Training-Resources' },
                        { text: 'File di stampa 3D ufficiali del braccio SO-ARM 100', link: '/it/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files' },
                        { text: 'File URDF e materiali di riferimento', link: '/it/tutorials/robot-arms/so-arm101/basics/URDF-Reference' },
                      ],
                    },
                    {
                      text: 'Approfondimenti',
                      collapsed: true,
                      items: [
                        { text: 'Controllo di simulazione ROS2', link: '/it/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control' },
                        { text: 'Installazione della pinza a dita parallele', link: '/it/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              text: 'Corso SO-ARM101 + AmazingHand',
              collapsed: true,
              items: [
                { text: 'Panoramica del corso', link: '/it/tutorials/robot-arms/so-arm-amazinghand/' },
                { text: 'Fase 1: Configurazione dell\'ambiente (Linux)', link: '/it/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Linux' },
                { text: 'Fase 1: Configurazione dell\'ambiente (Windows)', link: '/it/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Windows' },
                { text: 'Fase 2: calibrazione mano e bracci (Linux)', link: '/it/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Linux' },
                { text: 'Fase 2: calibrazione mano e bracci (Windows)', link: '/it/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Windows' },
                { text: 'Fase 3: Teleoperazione (Linux)', link: '/it/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Linux' },
                { text: 'Fase 3: Teleoperazione (Windows)', link: '/it/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Windows' },
                { text: 'Fase 4: Acquisizione dati (Linux)', link: '/it/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Linux' },
                { text: 'Fase 4: Acquisizione dati (Windows)', link: '/it/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Windows' },
                { text: 'Fase 5: Addestramento del modello (Linux)', link: '/it/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Linux' },
                { text: 'Fase 5: Addestramento del modello (Windows)', link: '/it/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Windows' },
                { text: 'Fase 6: deployment modello (Linux)', link: '/it/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Linux' },
                { text: 'Fase 6: deployment modello (Windows)', link: '/it/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Windows' },
              ],
            },
            {
              text: 'Tutorial XLeRobot',
              collapsed: true,
              items: [
                { text: 'Panoramica dei tutorial', link: '/it/tutorials/robot-arms/xlerobot/' },
                { text: 'Configurazione (macOS)', link: '/it/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS' },
                { text: 'Configurazione (Ubuntu)', link: '/it/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu' },
                { text: 'Configurazione (Windows)', link: '/it/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows' },
                { text: 'Spostare i file XLeRobot', link: '/it/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files' },
                { text: 'Montaggio kit assemblato', link: '/it/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit' },
                { text: 'Montaggio kit a pezzi', link: '/it/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit' },
              ],
            },
            {
              text: 'AmazingHand',
              collapsed: true,
              items: [
                { text: 'Controllo interfaccia mano robotica', link: '/it/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                { text: 'Scheda prodotto AmazingHand', link: '/it/tutorials/robot-arms/amazing-hand/product-info' },
                { text: "Tutorial di esecuzione dell'esempio ufficiale della mano robotica", link: '/it/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                { text: 'Tutorial di debug della mano dexterous (servo TTL)', link: '/it/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                {
                  text: 'Debug servo PWM',
                  collapsed: true,
                  items: [
                    { text: '01-Controllo visuale tramite GUI', link: '/it/tutorials/robot-arms/amazing-hand/pwm-debugging/01-GUI-Visual-Control' },
                    { text: '02-Tutorial del tracciamento dei gesti', link: '/it/tutorials/robot-arms/amazing-hand/pwm-debugging/02-Gesture-Tracking' },
                    { text: '03-Versione con servomotori PWM-Manuale d\'uso', link: '/it/tutorials/robot-arms/amazing-hand/pwm-debugging/03-PWM-Servo-Manual' },
                    { text: '04-Versione con servomotori seriali-Istruzioni per l\'uso', link: '/it/tutorials/robot-arms/amazing-hand/pwm-debugging/04-Serial-Servo-Guide' },
                  ],
                },
                {
                  text: 'Tracciamento gesti',
                  collapsed: true,
                  items: [
                    { text: 'Distribuzione ed esecuzione in un clic su Linux（Ubuntu）', link: '/it/tutorials/robot-arms/amazing-hand/gesture-tracking/01-Ubuntu' },
                    { text: 'Distribuzione ed esecuzione in un clic su Windows', link: '/it/tutorials/robot-arms/amazing-hand/gesture-tracking/02-Windows' },
                    { text: 'Distribuzione ed esecuzione in un clic su Mac', link: '/it/tutorials/robot-arms/amazing-hand/gesture-tracking/03-macOS' },
                  ],
                },
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
            { text: 'Trasferimento remoto di file', link: '/it/tutorials/sensors/imu/remote-file-transfer' },
            { text: 'Trasferimento di file tramite SSH', link: '/it/tutorials/sensors/imu/ssh-file-transfer' },
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
            {
              text: 'Modulo GPS e BeiDou',
              collapsed: true,
              items: [
                { text: 'Informazioni modulo', link: '/it/tutorials/sensors/gps/GPS-Module-Info' },
                { text: '51 MCU: analisi GPS', link: '/it/tutorials/sensors/gps/51-MCU-GPS-Parsing' },
                { text: 'Arduino: lettura posizione', link: '/it/tutorials/sensors/gps/Arduino-Location-Reading' },
                { text: 'Arduino: analisi posizione', link: '/it/tutorials/sensors/gps/Arduino-Location-Parsing' },
                { text: 'STM32F103: output analisi GPS', link: '/it/tutorials/sensors/gps/STM32F103-GPS-Parsing' },
                { text: 'Jetson: analisi GPS', link: '/it/tutorials/sensors/gps/Jetson-GPS-Parsing' },
                { text: 'Jetson: posizionamento AGNSS', link: '/it/tutorials/sensors/gps/Jetson-AGNSS' },
                { text: 'Jetson: API Baidu Maps', link: '/it/tutorials/sensors/gps/Jetson-Baidu-Map-API' },
                { text: 'Raspberry Pi: analisi GPS', link: '/it/tutorials/sensors/gps/RaspberryPi-GPS-Parsing' },
                { text: 'Raspberry Pi: posizionamento AGNSS', link: '/it/tutorials/sensors/gps/RaspberryPi-AGNSS' },
                { text: 'Raspberry Pi: API Baidu Maps', link: '/it/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API' },
                { text: 'ROS: preparazione', link: '/it/tutorials/sensors/gps/ROS-Preparation' },
                { text: 'ROS: lettura dati GPS', link: '/it/tutorials/sensors/gps/ROS-Read-GPS-Data' },
                { text: 'ROS: tracciare il percorso GPS', link: '/it/tutorials/sensors/gps/ROS-Draw-GPS-Track' },
                { text: 'Errore di posizione sulla mappa', link: '/it/tutorials/sensors/gps/Map-Location-Error' },
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
                      { text: 'Tutorial d\'uso del tool di debug servo SCS0009', link: '/it/tutorials/accessories/feetech/SCS0009-Debug-Tool' },
                    ],
                },
                {
                  text: 'Modulo di trasmissione video ESP32-NanoCam',
                  collapsed: true,
                  items: [
                    { text: 'ESP32-NanoCam Avvio rapido', link: '/it/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start' },
                    { text: 'ESP32-NanoCam Specifiche hardware', link: '/it/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec' },
                    { text: 'ESP32-NanoCam Manuale del protocollo seriale', link: '/it/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol' },
                    {
                      text: 'Tutorial di visione IA (11 capitoli)',
                      collapsed: true,
                      items: [
                        { text: 'Capitolo 1: Configurazione dell\'ambiente', link: '/it/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup' },
                        { text: 'Capitolo 2: Avvio rapido', link: '/it/tutorials/accessories/esp32-nanocam/Ch02-Quick-Start' },
                        { text: 'Capitolo 3: Fondamenti della fotocamera', link: '/it/tutorials/accessories/esp32-nanocam/Ch03-Camera-Basics' },
                        { text: 'Capitolo 4: Rilevamento del volto', link: '/it/tutorials/accessories/esp32-nanocam/Ch04-Face-Detection' },
                        { text: 'Capitolo 5: Rilevamento del muso del gatto', link: '/it/tutorials/accessories/esp32-nanocam/Ch05-Cat-Face-Detection' },
                        { text: 'Capitolo 6: Riconoscimento dei colori', link: '/it/tutorials/accessories/esp32-nanocam/Ch06-Color-Recognition' },
                        { text: 'Capitolo 7: Scansione dei codici QR', link: '/it/tutorials/accessories/esp32-nanocam/Ch07-QR-Code-Scanning' },
                        { text: 'Capitolo 8: Riconoscimento facciale', link: '/it/tutorials/accessories/esp32-nanocam/Ch08-Face-Recognition' },
                        { text: 'Capitolo 9: Conversazione vocale', link: '/it/tutorials/accessories/esp32-nanocam/Ch09-Voice-Chat' },
                        { text: 'Capitolo 10: Comprensione visiva AI', link: '/it/tutorials/accessories/esp32-nanocam/Ch10-AI-Vision-Understanding' },
                        { text: 'Capitolo 11: Controllo vocale ESP-Claw', link: '/it/tutorials/accessories/esp32-nanocam/Ch11-ESP-Claw-Voice-Control' },
                      ],
                    },
                  ],
                },
                {
                  text: 'Tutorial della fotocamera CSI',
                  collapsed: true,
                  items: [
                    { text: 'Configurazione fotocamera CSI su Jetson', link: '/it/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup' },
                    { text: 'Uso della fotocamera autofocus', link: '/it/tutorials/accessories/csi-camera/02-Auto-Focus-Camera' },
                    { text: 'Uso di Jupyter Lab', link: '/it/tutorials/accessories/csi-camera/03-JupyterLab' },
                    { text: 'Uso di JetCam', link: '/it/tutorials/accessories/csi-camera/04-JetCam' },
                    { text: 'IMX219 su Raspberry Pi', link: '/it/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi' },
                  ],
                },
                {
                  text: 'Modulo di interazione vocale IA',
                  collapsed: true,
                  items: [
                    { text: 'Avvio rapido', link: '/it/tutorials/accessories/ai-voice-module/Quick-Start' },
                    { text: 'Informazioni sul prodotto', link: '/it/tutorials/accessories/ai-voice-module/Product-Info' },
                    { text: 'Flash del firmware del modulo', link: '/it/tutorials/accessories/ai-voice-module/Firmware-Flashing' },
                    { text: 'Modifica della parola di attivazione e delle parole di comando', link: '/it/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit' },
                    { text: 'Creazione di voci con protocollo personalizzato', link: '/it/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries' },
                    { text: 'Interazione vocale ROS1', link: '/it/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction' },
                    { text: 'Interazione vocale ROS2', link: '/it/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction' },
                    { text: 'Protocollo della porta seriale', link: '/it/tutorials/accessories/ai-voice-module/Serial-Protocol' },
                    { text: 'Protocollo IIC', link: '/it/tutorials/accessories/ai-voice-module/IIC-Protocol' },
                    { text: 'Comunicazione con PC', link: '/it/tutorials/accessories/ai-voice-module/PC-Communication' },
                    { text: 'Arduino: Comunicazione della porta seriale', link: '/it/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication' },
                    { text: 'Arduino: Comunicazione IIC', link: '/it/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication' },
                    { text: 'Jetson: Comunicazione della porta seriale', link: '/it/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication' },
                    { text: 'Jetson: Comunicazione IIC', link: '/it/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication' },
                    { text: 'RDK: Comunicazione della porta seriale', link: '/it/tutorials/accessories/ai-voice-module/RDK-Serial-Communication' },
                    { text: 'RDK: Comunicazione IIC', link: '/it/tutorials/accessories/ai-voice-module/RDK-IIC-Communication' },
                    { text: 'Raspberry Pi: Comunicazione della porta seriale', link: '/it/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication' },
                    { text: 'Raspberry Pi: Comunicazione IIC', link: '/it/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication' },
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
        '/it/topics/': [{ text: 'Argomenti', items: [{ text: 'Argomenti', link: '/it/topics/' }, { text: 'Flashing JetPack e configurazione di sistema', link: '/it/topics/jetpack-setup' }, { text: 'Introduzione al deploy AI edge', link: '/it/topics/edge-ai-intro' }, { text: "Introduzione all'intelligenza incarnata (LeRobot)", link: '/it/topics/embodied-ai-intro' }, { text: 'Tema Robot Learning', link: '/it/topics/robot-learning/' }, { text: "Perché costruiamo open source — Il caso dell'hardware robotico open source", link: '/it/topics/open-source-hardware' }] }],
        '/it/tech/': [{ text: 'Documentazione', items: [{ text: 'Documentazione', link: '/it/tech/' }, { text: 'Riferimento API', link: '/it/tech/api-reference' }, { text: 'Guida di sviluppo', link: '/it/tech/dev-guide' }] }],
        '/it/community/': [{ text: 'Community', items: [{ text: 'Community', link: '/it/community/' }, { text: 'Guida alla contribuzione', link: '/it/community/contributing' }] }],
        '/it/cases/': [{ text: 'Casi di successo', items: [{ text: 'Storie di successo degli utenti', link: '/it/cases/' }] }],
        '/it/products/': [
          { text: 'Robot', items: [
            { text: 'Kit di sviluppo SO-ARM101', link: '/it/products/so-arm101' },
            { text: 'Mano dexterous AmazingHand', link: '/it/products/amazinghand' },
            { text: 'Scheda driver servo bus JUXI', link: '/it/products/servo-driver-board' },
            { text: 'Pinza flessibile in TPU SO-ARM101', link: '/it/products/tpu-flexible-gripper' },
            { text: 'Kit visione braccio robotico SO-ARM101', link: '/it/products/robot-vision-kit' },
            { text: 'Robot mobile a intelligenza incarnata Lekiwi', link: '/it/products/lekiwi' },
            { text: 'Supporto fotocamera overhead SO-ARM101', link: '/it/products/overhead-camera-mount' },
            { text: 'Robot mobile a due bracci XLeRobot', link: '/it/products/xlerobot' },
          ] },
          { text: 'Calcolo e visione', items: [
            { text: 'Kit di sviluppo Jetson Orin NX Super', link: '/it/products/jetson-orin-nx-super-kit' },
            { text: 'Modulo video WiFi ESP32-S3', link: '/it/products/esp32-s3-wifi-module' },
            { text: 'Fotocamera CSI IMX219 79°', link: '/it/products/imx219-csi-camera' },
            { text: 'Fotocamera USB con autofocus', link: '/it/products/usb-auto-focus-camera' },
            { text: 'Fotocamera di profondità 3D RealSense', link: '/it/products/realsense-depth-camera' },
          ] },
          { text: 'Sensori', items: [
            { text: 'Modulo IMU inerziale di alta precisione', link: '/it/products/imu-module' },
            { text: 'Modulo di posizionamento GNSS GPS e Beidou', link: '/it/products/gps-beidou-module' },
          ] },
          { text: 'Accessori', items: [
            { text: 'Unità pan-tilt servo a 2 DOF', link: '/it/products/2dof-gimbal' },
            { text: 'Modulo di interazione vocale KWS', link: '/it/products/kws-voice-module' },
            { text: 'Servo bus Feetech (SCS0009 / STS3215)', link: '/it/products/feetech-servo' },
            { text: 'Switch KVM 4-in-1', link: '/it/products/kvm-switch' },
            { text: 'Scheda audio USB senza driver', link: '/it/products/usb-sound-card' },
            { text: 'Scheda di acquisizione HDMI 4K', link: '/it/products/4k-hdmi-capture' },
            { text: 'Modulo di interazione vocale IA', link: '/it/products/ai-voice-module' },
          ] },
        ],
      },
    },
  },
  'pt-br': {
    label: 'Português (Brasil)',
    lang: 'pt-BR',
    title: 'Juxi Technology Wiki',
    description: 'Central de tutoriais e documentação Juxi Technology',
    head: [
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      docFooter: { prev: 'Anterior', next: 'Próximo' },
      sidebarMenuLabel: 'Menu',
      returnToTopLabel: 'Voltar ao topo',
      outline: { level: [2, 3], label: 'Nesta página' },
      skipToContentLabel: 'Ir para o conteúdo',
      lightModeSwitchTitle: 'Mudar para o tema claro',
      darkModeSwitchLabel: 'Aparência',
      darkModeSwitchTitle: 'Mudar para o tema escuro',
      lastUpdated: {
        text: 'Última atualização (UTC)',
        // forceLocale:日期格式跟随页面语言(默认跟随访客系统区域,英文页会显示中文格式)
        // timeZone: UTC 统一,timeZoneName 显式标注
        formatOptions: { forceLocale: true, timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
      },
      nav: [
        { text: 'Tutoriais', link: '/pt-br/tutorials/', activeMatch: '/pt-br/tutorials/' },
        { text: 'Produtos', link: '/pt-br/products/', activeMatch: '/pt-br/products/' },
        { text: 'Comunidade', link: '/pt-br/community/', activeMatch: '/pt-br/community/' },
        { text: 'Mais', items: [
          { text: 'Tópicos', link: '/pt-br/topics/' },
          { text: 'Docs Técnicos', link: '/pt-br/tech/' },
          { text: 'Casos', link: '/pt-br/cases/' },
          { text: 'Downloads', link: '/pt-br/downloads/' },
          { text: 'Sobre', link: '/pt-br/about/' },
        ] },
      ],
      sidebar: {
        '/pt-br/tutorials/': [
          {
            text: 'Guia Rápido',
            items: [
              { text: 'FAQ', link: '/pt-br/tutorials/faq' },
              { text: 'Introdução ao ROS', link: '/pt-br/tutorials/ros-intro' },
              { text: 'Docs Lark', link: '/pt-br/tutorials/lark-wiki' },
            ],
          },
          {
            text: 'Recursos de Aprendizado',
            items: [
              { text: 'Recursos de Aprendizado', link: '/pt-br/tutorials/learning-resources/' },
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
                  { text: 'Teleoperação sem fio do SO-ARM101 (versão ESP32-NanoCam)', link: '/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop' },
                  { text: 'Solução de problemas de teleoperação', link: '/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting' },
                  { text: 'Tutorial de dois braços (dois seguidores) do SO-ARM101', link: '/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial' },
                  { text: 'Tutorial de conversão do SO-ARM101 para 7-DOF e uso com LeRobot', link: '/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-7DOF-LeRobot' },
                  { text: 'Tutorial de uso da ferramenta de calibração de servos da série SoARM', link: '/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool' },
                  {
                    text: 'Curso LeRobot',
                    collapsed: true,
                    items: [
                      { text: 'Curso completo LeRobot', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/' },
                      {
                        text: '1. Ambiente LeRobot',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 1: Instalação do ambiente LeRobot (Ubuntu)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu' },
                          { text: 'Etapa 1: Instalação do ambiente LeRobot (Windows)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Windows' },
                          { text: 'Etapa 1: Instalação do ambiente LeRobot (macOS)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/MacOS' },
                        ],
                      },
                      {
                        text: '2. Porta serial',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 2: Ver a porta do dispositivo serial (Ubuntu)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Ubuntu' },
                          { text: 'Etapa 2: Ver a porta do dispositivo serial (Windows)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Windows' },
                          { text: 'Etapa 2: Ver a porta do dispositivo serial (macOS)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/MacOS' },
                        ],
                      },
                      {
                        text: '3. Calibração',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 3: Calibrar o braço robótico (Ubuntu)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Ubuntu' },
                          { text: 'Etapa 3: Calibrar o braço robótico (Windows)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Windows' },
                          { text: 'Etapa 3: Calibrar o braço robótico (macOS)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/MacOS' },
                        ],
                      },
                      {
                        text: '4. Teleoperação',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 4: Teleoperação (Ubuntu)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Ubuntu' },
                          { text: 'Etapa 4: Teleoperação (Windows)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Windows' },
                          { text: 'Etapa 4: Teleoperação (macOS)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/MacOS' },
                        ],
                      },
                      {
                        text: '5. Teleop. e câmera',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 5: Teleoperação com câmera (Ubuntu)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu' },
                          { text: 'Etapa 5: Teleoperação com câmera (Windows)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Windows' },
                          { text: 'Etapa 5: Teleoperação com câmera (macOS)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/MacOS' },
                        ],
                      },
                      {
                        text: '6. Coleta de dados',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 6: Coleta de dados por demonstração', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording' },
                          { text: 'Etapa 6: Observações sobre a coleta de dados', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes' },
                          { text: 'Etapa 6: Registrar conta no Hugging Face (opcional)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account' },
                          { text: 'Etapa 6: Enviar o dataset ao Hugging Face (opcional)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload' },
                        ],
                      },
                      {
                        text: '7. Treinamento',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 7: Treinamento local no Ubuntu', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu' },
                          { text: 'Etapa 7: Configuração do ambiente de GPU na nuvem', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU' },
                          { text: 'Etapa 7: Curvas de treinamento em tempo real no wandb', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves' },
                          { text: 'Etapa 7: Enviar o modelo ao Hugging Face (opcional)', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload' },
                          { text: 'Etapa 7: Obter o arquivo de pesos do modelo', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights' },
                          { text: 'Etapa 7: Comando de treinamento — ACT', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT' },
                          { text: 'Etapa 7: Comando de treinamento — pi0', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0' },
                          { text: 'Etapa 7: Comando de treinamento — pi0.5', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5' },
                          { text: 'Etapa 7: Comando de treinamento — pi0fast', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast' },
                          { text: 'Etapa 7: Comando de treinamento — SmolVLA', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla' },
                        ],
                      },
                      {
                        text: '8. Inferência',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 8: Descrição da linha de comando', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference' },
                          { text: 'Etapa 8: Bugs comuns e soluções', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Common-Bugs' },
                          { text: 'Etapa 8: Comando de inferência — ACT', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-ACT' },
                          { text: 'Etapa 8: Comando de inferência — pi0', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0' },
                          { text: 'Etapa 8: Comando de inferência — pi0.5', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0.5' },
                          { text: 'Etapa 8: Comando de inferência — SmolVLA', link: '/pt-br/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-smolvla' },
                        ],
                      },
                      {
                        text: 'Fundamentos',
                        collapsed: true,
                        items: [
                          { text: 'Entendendo o LeRobot', link: '/pt-br/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot' },
                          { text: 'Conjuntos de dados LeRobot no Hugging Face', link: '/pt-br/tutorials/robot-arms/so-arm101/basics/HF-Datasets' },
                          { text: 'Materiais para treinamento de modelos', link: '/pt-br/tutorials/robot-arms/so-arm101/basics/Training-Resources' },
                          { text: 'Arquivos oficiais de impressão 3D do SO-ARM 100', link: '/pt-br/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files' },
                          { text: 'Arquivos URDF e materiais de referência', link: '/pt-br/tutorials/robot-arms/so-arm101/basics/URDF-Reference' },
                        ],
                      },
                      {
                        text: 'Extras e avançado',
                        collapsed: true,
                        items: [
                          { text: 'Controle de simulação ROS2', link: '/pt-br/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control' },
                          { text: 'Tutorial de instalação da garra de dedos paralelos', link: '/pt-br/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation' },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                text: 'Curso SO-ARM101 + AmazingHand',
                collapsed: true,
                items: [
                  { text: 'Visão geral do curso', link: '/pt-br/tutorials/robot-arms/so-arm-amazinghand/' },
                  { text: 'Etapa 1: Configuração do ambiente (Linux)', link: '/pt-br/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Linux' },
                  { text: 'Etapa 1: Configuração do ambiente (Windows)', link: '/pt-br/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Windows' },
                  { text: 'Etapa 2: calibração de mão e braços (Linux)', link: '/pt-br/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Linux' },
                  { text: 'Etapa 2: calibração de mão e braços (Windows)', link: '/pt-br/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Windows' },
                  { text: 'Etapa 3: Teleoperação (Linux)', link: '/pt-br/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Linux' },
                  { text: 'Etapa 3: Teleoperação (Windows)', link: '/pt-br/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Windows' },
                  { text: 'Etapa 4: Coleta de dados (Linux)', link: '/pt-br/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Linux' },
                  { text: 'Etapa 4: Coleta de dados (Windows)', link: '/pt-br/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Windows' },
                  { text: 'Etapa 5: Treinamento do modelo (Linux)', link: '/pt-br/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Linux' },
                  { text: 'Etapa 5: Treinamento do modelo (Windows)', link: '/pt-br/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Windows' },
                  { text: 'Etapa 6: implantação do modelo (Linux)', link: '/pt-br/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Linux' },
                  { text: 'Etapa 6: implantação do modelo (Windows)', link: '/pt-br/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Windows' },
                ],
              },
              {
                text: 'Tutoriais do XLeRobot',
                collapsed: true,
                items: [
                  { text: 'Visão geral dos tutoriais', link: '/pt-br/tutorials/robot-arms/xlerobot/' },
                  { text: 'Configuração (macOS)', link: '/pt-br/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS' },
                  { text: 'Configuração (Ubuntu)', link: '/pt-br/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu' },
                  { text: 'Configuração (Windows)', link: '/pt-br/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows' },
                  { text: 'Mover arquivos do XLeRobot', link: '/pt-br/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files' },
                  { text: 'Montagem do kit montado', link: '/pt-br/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit' },
                  { text: 'Montagem do kit em peças', link: '/pt-br/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit' },
                ],
              },
              {
                text: 'AmazingHand',
                collapsed: true,
                items: [
                  { text: 'Controle de Interface da Mão Robótica', link: '/pt-br/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                  { text: 'AmazingHand Mão hábil — Informações do produto', link: '/pt-br/tutorials/robot-arms/amazing-hand/product-info' },
                  { text: 'Tutorial do Exemplo Oficial da Mão Robótica', link: '/pt-br/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                  { text: 'Tutorial de Depuração da Mão Hábil (servo TTL)', link: '/pt-br/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                  {
                    text: 'Depuração servo PWM',
                    collapsed: true,
                    items: [
                      { text: '01-Controle visual por GUI', link: '/pt-br/tutorials/robot-arms/amazing-hand/pwm-debugging/01-GUI-Visual-Control' },
                      { text: '02-Tutorial de rastreamento de gestos', link: '/pt-br/tutorials/robot-arms/amazing-hand/pwm-debugging/02-Gesture-Tracking' },
                      { text: '03-Versão com servomotor PWM-Manual de uso', link: '/pt-br/tutorials/robot-arms/amazing-hand/pwm-debugging/03-PWM-Servo-Manual' },
                      { text: '04-Versão de servomotor serial-Instruções de uso', link: '/pt-br/tutorials/robot-arms/amazing-hand/pwm-debugging/04-Serial-Servo-Guide' },
                    ],
                  },
                  {
                    text: 'Rastreamento de gestos',
                    collapsed: true,
                    items: [
                      { text: 'Linux (Ubuntu) implantação e execução com um clique', link: '/pt-br/tutorials/robot-arms/amazing-hand/gesture-tracking/01-Ubuntu' },
                      { text: 'Implantação e execução com um clique no Windows', link: '/pt-br/tutorials/robot-arms/amazing-hand/gesture-tracking/02-Windows' },
                      { text: 'Mac implantação e execução com um clique', link: '/pt-br/tutorials/robot-arms/amazing-hand/gesture-tracking/03-macOS' },
                    ],
                  },
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
                  { text: 'Tutorial de uso da ferramenta de depuração do servo SCS0009', link: '/pt-br/tutorials/accessories/feetech/SCS0009-Debug-Tool' },
                ],
              },
              {
                text: 'Módulo de transmissão de vídeo ESP32-NanoCam',
                collapsed: true,
                items: [
                  { text: 'Início rápido do ESP32-NanoCam', link: '/pt-br/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start' },
                  { text: 'Especificações de hardware do ESP32-NanoCam', link: '/pt-br/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec' },
                  { text: 'Manual do protocolo serial do ESP32-NanoCam', link: '/pt-br/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol' },
                  {
                    text: 'Tutorial de visão IA (11 capítulos)',
                    collapsed: true,
                    items: [
                      { text: 'Capítulo 1: Configuração do ambiente', link: '/pt-br/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup' },
                      { text: 'Capítulo 2: Início rápido', link: '/pt-br/tutorials/accessories/esp32-nanocam/Ch02-Quick-Start' },
                      { text: 'Capítulo 3: Fundamentos da câmera', link: '/pt-br/tutorials/accessories/esp32-nanocam/Ch03-Camera-Basics' },
                      { text: 'Capítulo 4: Detecção de rosto', link: '/pt-br/tutorials/accessories/esp32-nanocam/Ch04-Face-Detection' },
                      { text: 'Capítulo 5: Detecção de rosto de gato', link: '/pt-br/tutorials/accessories/esp32-nanocam/Ch05-Cat-Face-Detection' },
                      { text: 'Capítulo 6: Reconhecimento de cores', link: '/pt-br/tutorials/accessories/esp32-nanocam/Ch06-Color-Recognition' },
                      { text: 'Capítulo 7: Leitura de código QR', link: '/pt-br/tutorials/accessories/esp32-nanocam/Ch07-QR-Code-Scanning' },
                      { text: 'Capítulo 8: Reconhecimento facial', link: '/pt-br/tutorials/accessories/esp32-nanocam/Ch08-Face-Recognition' },
                      { text: 'Capítulo 9: Conversa por voz', link: '/pt-br/tutorials/accessories/esp32-nanocam/Ch09-Voice-Chat' },
                      { text: 'Capítulo 10: Compreensão visual por IA', link: '/pt-br/tutorials/accessories/esp32-nanocam/Ch10-AI-Vision-Understanding' },
                      { text: 'Capítulo 11: Controle por voz do ESP-Claw', link: '/pt-br/tutorials/accessories/esp32-nanocam/Ch11-ESP-Claw-Voice-Control' },
                    ],
                  },
                ],
              },
              {
                text: 'Tutoriais da câmera CSI',
                collapsed: true,
                items: [
                  { text: 'Configuração da câmera CSI no Jetson', link: '/pt-br/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup' },
                  { text: 'Uso da câmera com autofoco', link: '/pt-br/tutorials/accessories/csi-camera/02-Auto-Focus-Camera' },
                  { text: 'Uso do Jupyter Lab', link: '/pt-br/tutorials/accessories/csi-camera/03-JupyterLab' },
                  { text: 'Uso do JetCam', link: '/pt-br/tutorials/accessories/csi-camera/04-JetCam' },
                  { text: 'IMX219 no Raspberry Pi', link: '/pt-br/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi' },
                ],
              },
              {
                text: 'Módulo de interação por voz IA',
                collapsed: true,
                items: [
                  { text: 'Início rápido', link: '/pt-br/tutorials/accessories/ai-voice-module/Quick-Start' },
                  { text: 'Informações do produto', link: '/pt-br/tutorials/accessories/ai-voice-module/Product-Info' },
                  { text: 'Gravação do firmware do módulo', link: '/pt-br/tutorials/accessories/ai-voice-module/Firmware-Flashing' },
                  { text: 'Modificar a palavra de ativação e as palavras de comando', link: '/pt-br/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit' },
                  { text: 'Criação de entradas de protocolo personalizadas', link: '/pt-br/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries' },
                  { text: 'Interação de voz ROS1', link: '/pt-br/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction' },
                  { text: 'Interação de voz ROS2', link: '/pt-br/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction' },
                  { text: 'Protocolo da porta serial', link: '/pt-br/tutorials/accessories/ai-voice-module/Serial-Protocol' },
                  { text: 'Protocolo IIC', link: '/pt-br/tutorials/accessories/ai-voice-module/IIC-Protocol' },
                  { text: 'Comunicação com PC', link: '/pt-br/tutorials/accessories/ai-voice-module/PC-Communication' },
                  { text: 'Arduino: Comunicação por porta serial', link: '/pt-br/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication' },
                  { text: 'Arduino: Comunicação IIC', link: '/pt-br/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication' },
                  { text: 'Jetson: Comunicação por porta serial', link: '/pt-br/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication' },
                  { text: 'Jetson: Comunicação IIC', link: '/pt-br/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication' },
                  { text: 'RDK: Comunicação por porta serial', link: '/pt-br/tutorials/accessories/ai-voice-module/RDK-Serial-Communication' },
                  { text: 'RDK: Comunicação IIC', link: '/pt-br/tutorials/accessories/ai-voice-module/RDK-IIC-Communication' },
                  { text: 'Raspberry Pi: Comunicação por porta serial', link: '/pt-br/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication' },
                  { text: 'Raspberry Pi: Comunicação IIC', link: '/pt-br/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication' },
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
                  { text: 'Transferência remota de arquivos', link: '/pt-br/tutorials/sensors/imu/remote-file-transfer' },
                  { text: 'Transferência de arquivos via SSH', link: '/pt-br/tutorials/sensors/imu/ssh-file-transfer' },
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
              {
                text: 'Módulo GPS e BeiDou',
                collapsed: true,
                items: [
                  { text: 'Informações do módulo', link: '/pt-br/tutorials/sensors/gps/GPS-Module-Info' },
                  { text: '51 MCU: análise GPS', link: '/pt-br/tutorials/sensors/gps/51-MCU-GPS-Parsing' },
                  { text: 'Arduino: leitura de posição', link: '/pt-br/tutorials/sensors/gps/Arduino-Location-Reading' },
                  { text: 'Arduino: análise de posição', link: '/pt-br/tutorials/sensors/gps/Arduino-Location-Parsing' },
                  { text: 'STM32F103: saída de análise GPS', link: '/pt-br/tutorials/sensors/gps/STM32F103-GPS-Parsing' },
                  { text: 'Jetson: análise GPS', link: '/pt-br/tutorials/sensors/gps/Jetson-GPS-Parsing' },
                  { text: 'Jetson: posicionamento AGNSS', link: '/pt-br/tutorials/sensors/gps/Jetson-AGNSS' },
                  { text: 'Jetson: API do Baidu Maps', link: '/pt-br/tutorials/sensors/gps/Jetson-Baidu-Map-API' },
                  { text: 'Raspberry Pi: análise GPS', link: '/pt-br/tutorials/sensors/gps/RaspberryPi-GPS-Parsing' },
                  { text: 'Raspberry Pi: posicionamento AGNSS', link: '/pt-br/tutorials/sensors/gps/RaspberryPi-AGNSS' },
                  { text: 'Raspberry Pi: API do Baidu Maps', link: '/pt-br/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API' },
                  { text: 'ROS: preparação', link: '/pt-br/tutorials/sensors/gps/ROS-Preparation' },
                  { text: 'ROS: leitura de dados GPS', link: '/pt-br/tutorials/sensors/gps/ROS-Read-GPS-Data' },
                  { text: 'ROS: desenhar trajeto GPS', link: '/pt-br/tutorials/sensors/gps/ROS-Draw-GPS-Track' },
                  { text: 'Erro de localização no mapa', link: '/pt-br/tutorials/sensors/gps/Map-Location-Error' },
                ],
              },
            ],
          },
        ],
        '/pt-br/topics/': [{ text: 'Tópicos', items: [{ text: 'Tópicos', link: '/pt-br/topics/' }, { text: 'Flasheamento JetPack e Configuração do Sistema', link: '/pt-br/topics/jetpack-setup' }, { text: 'Introdução ao Deploy de IA Edge', link: '/pt-br/topics/edge-ai-intro' }, { text: 'Introdução à Inteligência Incorporada (LeRobot)', link: '/pt-br/topics/embodied-ai-intro' }, { text: 'Tema Robot Learning', link: '/pt-br/topics/robot-learning/' }, { text: 'Por Que Construímos Aberto — O Caso do Hardware Robótico Open Source', link: '/pt-br/topics/open-source-hardware' }] }],
        '/pt-br/tech/': [{ text: 'Docs Técnicos', items: [{ text: 'Docs Técnicos', link: '/pt-br/tech/' }, { text: 'Referência de API', link: '/pt-br/tech/api-reference' }, { text: 'Guia de Desenvolvimento', link: '/pt-br/tech/dev-guide' }] }],
        '/pt-br/community/': [{ text: 'Comunidade', items: [{ text: 'Comunidade', link: '/pt-br/community/' }, { text: 'Guia de Contribuição', link: '/pt-br/community/contributing' }] }],
        '/pt-br/cases/': [{ text: 'Casos', items: [{ text: 'Histórias de Sucesso de Usuários', link: '/pt-br/cases/' }] }],
        '/pt-br/products/': [
          { text: 'Robôs', items: [
            { text: 'Kit de Desenvolvimento SO-ARM101', link: '/pt-br/products/so-arm101' },
            { text: 'Mão Dexterous de 4 Dedos Open Source AmazingHand', link: '/pt-br/products/amazinghand' },
            { text: 'Placa Driver de Servo de Barramento JUXI', link: '/pt-br/products/servo-driver-board' },
            { text: 'Garra Flexível TPU SO-ARM101', link: '/pt-br/products/tpu-flexible-gripper' },
            { text: 'Kit de Visão Robótica SO-ARM101', link: '/pt-br/products/robot-vision-kit' },
            { text: 'Robô Móvel de Inteligência Incorporada Lekiwi', link: '/pt-br/products/lekiwi' },
            { text: 'Suporte de Câmera Superior SO-ARM101', link: '/pt-br/products/overhead-camera-mount' },
            { text: 'Robô móvel de dois braços XLeRobot', link: '/pt-br/products/xlerobot' },
          ] },
          { text: 'Computação & Visão', items: [
            { text: 'Kit de Desenvolvedor Jetson Orin NX Super', link: '/pt-br/products/jetson-orin-nx-super-kit' },
            { text: 'Câmera de Profundidade 3D RealSense', link: '/pt-br/products/realsense-depth-camera' },
            { text: 'Módulo de Vídeo WiFi ESP32-S3', link: '/pt-br/products/esp32-s3-wifi-module' },
            { text: 'Câmera CSI IMX219 79°', link: '/pt-br/products/imx219-csi-camera' },
            { text: 'Câmera USB com foco automático', link: '/pt-br/products/usb-auto-focus-camera' },
          ] },
          { text: 'Sensores', items: [
            { text: 'Módulo Inercial IMU de Alta Precisão', link: '/pt-br/products/imu-module' },
            { text: 'Módulo de Posicionamento GNSS GPS e BeiDou', link: '/pt-br/products/gps-beidou-module' },
          ] },
          { text: 'Acessórios', items: [
            { text: 'Unidade Pan-Tilt de Servo 2-DOF', link: '/pt-br/products/2dof-gimbal' },
            { text: 'Módulo de Interação por Voz KWS', link: '/pt-br/products/kws-voice-module' },
            { text: 'Servos de Barramento Feetech (SCS0009 / STS3215)', link: '/pt-br/products/feetech-servo' },
            { text: 'Chaveador KVM 4-em-1', link: '/pt-br/products/kvm-switch' },
            { text: 'Placa de Som USB sem Driver', link: '/pt-br/products/usb-sound-card' },
            { text: 'Capturadora HDMI 4K', link: '/pt-br/products/4k-hdmi-capture' },
            { text: 'Módulo de interação por voz IA', link: '/pt-br/products/ai-voice-module' },
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
    title: 'Juxi Technology Wiki',
    description: 'Central de tutoriais e documentação Juxi Technology',
    head: [
    ],
    themeConfig: {
      siteTitle: 'Juxi Technology Wiki',
      docFooter: { prev: 'Anterior', next: 'Próximo' },
      sidebarMenuLabel: 'Menu',
      returnToTopLabel: 'Voltar ao topo',
      outline: { level: [2, 3], label: 'Nesta página' },
      skipToContentLabel: 'Ir para o conteúdo',
      lightModeSwitchTitle: 'Mudar para o tema claro',
      darkModeSwitchLabel: 'Aparência',
      darkModeSwitchTitle: 'Mudar para o tema escuro',
      lastUpdated: {
        text: 'Última atualização (UTC)',
        // forceLocale:日期格式跟随页面语言(默认跟随访客系统区域,英文页会显示中文格式)
        // timeZone: UTC 统一,timeZoneName 显式标注
        formatOptions: { forceLocale: true, timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
      },
      nav: [
        { text: 'Tutoriais', link: '/pt-pt/tutorials/', activeMatch: '/pt-pt/tutorials/' },
        { text: 'Produtos', link: '/pt-pt/products/', activeMatch: '/pt-pt/products/' },
        { text: 'Comunidade', link: '/pt-pt/community/', activeMatch: '/pt-pt/community/' },
        { text: 'Mais', items: [
          { text: 'Tópicos', link: '/pt-pt/topics/' },
          { text: 'Docs Técnicos', link: '/pt-pt/tech/' },
          { text: 'Casos', link: '/pt-pt/cases/' },
          { text: 'Downloads', link: '/pt-pt/downloads/' },
          { text: 'Sobre', link: '/pt-pt/about/' },
        ] },
      ],
      sidebar: {
        '/pt-pt/tutorials/': [
          {
            text: 'Guia Rápido',
            items: [
              { text: 'FAQ', link: '/pt-pt/tutorials/faq' },
              { text: 'Introdução ao ROS', link: '/pt-pt/tutorials/ros-intro' },
              { text: 'Docs Lark', link: '/pt-pt/tutorials/lark-wiki' },
            ],
          },
          {
            text: 'Recursos de Aprendizado',
            items: [
              { text: 'Recursos de Aprendizado', link: '/pt-pt/tutorials/learning-resources/' },
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
                  { text: 'Teleoperação sem fios do SO-ARM101 (versão ESP32-NanoCam)', link: '/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop' },
                  { text: 'Resolução de problemas de teleoperação', link: '/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting' },
                  { text: 'Tutorial do braço duplo SO-ARM101 (dois braços seguidores)', link: '/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial' },
                  { text: 'Tutorial de modificação do SO-ARM101 para 7-DOF e utilização com o LeRobot', link: '/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-7DOF-LeRobot' },
                  { text: 'Tutorial de utilização da ferramenta de calibração de servos da série SoARM', link: '/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool' },
                  {
                    text: 'Curso de LeRobot',
                    collapsed: true,
                    items: [
                      { text: 'Visão geral do curso de LeRobot', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/' },
                      {
                        text: '1. Ambiente LeRobot',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 1: Instalar o ambiente LeRobot (Ubuntu)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu' },
                          { text: 'Etapa 1: Instalar o ambiente LeRobot (Windows)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Windows' },
                          { text: 'Etapa 1: Instalar o ambiente LeRobot (macOS)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/MacOS' },
                        ],
                      },
                      {
                        text: '2. Portas série',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 2: Ver a porta do dispositivo série (Ubuntu)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Ubuntu' },
                          { text: 'Etapa 2: Ver a porta do dispositivo série (Windows)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Windows' },
                          { text: 'Etapa 2: Ver a porta do dispositivo série (macOS)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/MacOS' },
                        ],
                      },
                      {
                        text: '3. Calibração',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 3: Calibrar o braço robótico (Ubuntu)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Ubuntu' },
                          { text: 'Etapa 3: Calibrar o braço robótico (Windows)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Windows' },
                          { text: 'Etapa 3: Calibrar o braço robótico (macOS)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/MacOS' },
                        ],
                      },
                      {
                        text: '4. Teleoperação',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 4: Teleoperação (Ubuntu)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Ubuntu' },
                          { text: 'Etapa 4: Teleoperação (Windows)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Windows' },
                          { text: 'Etapa 4: Teleoperação (macOS)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/MacOS' },
                        ],
                      },
                      {
                        text: '5. Teleop. c/ câmara',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 5: Teleoperação com câmara (Ubuntu)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu' },
                          { text: 'Etapa 5: Teleoperação com câmara (Windows)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Windows' },
                          { text: 'Etapa 5: Teleoperação com câmara (macOS)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/MacOS' },
                        ],
                      },
                      {
                        text: '6. Recolha de dados',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 6: Recolha de conjuntos de dados por ensino', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording' },
                          { text: 'Etapa 6: Notas sobre a recolha de conjuntos de dados', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes' },
                          { text: 'Etapa 6: Registar uma conta Hugging Face (opcional)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account' },
                          { text: 'Etapa 6: Carregar dados para o HuggingFace (opcional)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload' },
                        ],
                      },
                      {
                        text: '7. Treino de modelos',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 7: Treino local em Ubuntu', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu' },
                          { text: 'Etapa 7: Ambiente de treino em GPU na nuvem', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU' },
                          { text: 'Etapa 7: Visualizar as curvas de treino com o wandb', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves' },
                          { text: 'Etapa 7: Enviar o modelo para o HuggingFace (opcional)', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload' },
                          { text: 'Etapa 7: Obter o ficheiro de pesos do modelo', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights' },
                          { text: 'Etapa 7: Comando de treino ACT', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT' },
                          { text: 'Etapa 7: Comando de treino pi0', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0' },
                          { text: 'Etapa 7: Comando de treino pi0.5', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5' },
                          { text: 'Etapa 7: Comando de treino pi0fast', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast' },
                          { text: 'Etapa 7: Comando de treino smolvla', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla' },
                        ],
                      },
                      {
                        text: '8. Implantação',
                        collapsed: true,
                        items: [
                          { text: 'Etapa 8: Descrição da linha de comando', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference' },
                          { text: 'Etapa 8: Bugs comuns e soluções', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Common-Bugs' },
                          { text: 'Etapa 8: Comando de implantação ACT', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-ACT' },
                          { text: 'Etapa 8: Comando de implantação pi0', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0' },
                          { text: 'Etapa 8: Comando de implantação pi0.5', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0.5' },
                          { text: 'Etapa 8: Comando de implantação smolvla', link: '/pt-pt/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-smolvla' },
                        ],
                      },
                      {
                        text: 'Noções básicas',
                        collapsed: true,
                        items: [
                          { text: 'Conhecer o LeRobot', link: '/pt-pt/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot' },
                          { text: 'Conjuntos de dados LeRobot no HuggingFace', link: '/pt-pt/tutorials/robot-arms/so-arm101/basics/HF-Datasets' },
                          { text: 'Materiais para o treino de modelos', link: '/pt-pt/tutorials/robot-arms/so-arm101/basics/Training-Resources' },
                          { text: 'Ficheiros oficiais de impressão 3D do SO-ARM 100', link: '/pt-pt/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files' },
                          { text: 'Ficheiros URDF e materiais de referência', link: '/pt-pt/tutorials/robot-arms/so-arm101/basics/URDF-Reference' },
                        ],
                      },
                      {
                        text: 'Tópicos adicionais',
                        collapsed: true,
                        items: [
                          { text: 'Controlo de simulação ROS2', link: '/pt-pt/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control' },
                          { text: 'Instalação da garra de dedos paralelos', link: '/pt-pt/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation' },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                text: 'Curso SO-ARM101 + AmazingHand',
                collapsed: true,
                items: [
                  { text: 'Visão geral do curso', link: '/pt-pt/tutorials/robot-arms/so-arm-amazinghand/' },
                  { text: 'Etapa 1: Configuração do ambiente (Linux)', link: '/pt-pt/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Linux' },
                  { text: 'Etapa 1: Configuração do ambiente (Windows)', link: '/pt-pt/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Windows' },
                  { text: 'Etapa 2: calibração de mão e braços (Linux)', link: '/pt-pt/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Linux' },
                  { text: 'Etapa 2: calibração de mão e braços (Windows)', link: '/pt-pt/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Windows' },
                  { text: 'Etapa 3: Teleoperação (Linux)', link: '/pt-pt/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Linux' },
                  { text: 'Etapa 3: Teleoperação (Windows)', link: '/pt-pt/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Windows' },
                  { text: 'Etapa 4: Recolha de dados (Linux)', link: '/pt-pt/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Linux' },
                  { text: 'Etapa 4: Recolha de dados (Windows)', link: '/pt-pt/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Windows' },
                  { text: 'Etapa 5: Treino do modelo (Linux)', link: '/pt-pt/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Linux' },
                  { text: 'Etapa 5: Treino do modelo (Windows)', link: '/pt-pt/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Windows' },
                  { text: 'Etapa 6: implementação do modelo (Linux)', link: '/pt-pt/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Linux' },
                  { text: 'Etapa 6: implementação do modelo (Windows)', link: '/pt-pt/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Windows' },
                ],
              },
              {
                text: 'Tutoriais do XLeRobot',
                collapsed: true,
                items: [
                  { text: 'Visão geral dos tutoriais', link: '/pt-pt/tutorials/robot-arms/xlerobot/' },
                  { text: 'Configuração (macOS)', link: '/pt-pt/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS' },
                  { text: 'Configuração (Ubuntu)', link: '/pt-pt/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu' },
                  { text: 'Configuração (Windows)', link: '/pt-pt/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows' },
                  { text: 'Mover ficheiros do XLeRobot', link: '/pt-pt/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files' },
                  { text: 'Montagem do kit montado', link: '/pt-pt/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit' },
                  { text: 'Montagem do kit em peças', link: '/pt-pt/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit' },
                ],
              },
              {
                text: 'AmazingHand',
                collapsed: true,
                items: [
                  { text: 'Controle de Interface da Mão Robótica', link: '/pt-pt/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control' },
                  { text: 'AmazingHand Mão hábil — Informações do produto', link: '/pt-pt/tutorials/robot-arms/amazing-hand/product-info' },
                  { text: 'Tutorial do Exemplo Oficial da Mão Robótica', link: '/pt-pt/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example' },
                  { text: 'Tutorial de Depuração da Mão Hábil (servo TTL)', link: '/pt-pt/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging' },
                  {
                    text: 'Depuração servo PWM',
                    collapsed: true,
                    items: [
                      { text: '01-Controlo visual por GUI', link: '/pt-pt/tutorials/robot-arms/amazing-hand/pwm-debugging/01-GUI-Visual-Control' },
                      { text: '02-Tutorial de rastreamento de gestos', link: '/pt-pt/tutorials/robot-arms/amazing-hand/pwm-debugging/02-Gesture-Tracking' },
                      { text: '03-Versão com servomotor PWM-Manual de utilização', link: '/pt-pt/tutorials/robot-arms/amazing-hand/pwm-debugging/03-PWM-Servo-Manual' },
                      { text: '04-Versão de servomotor série-Instruções de utilização', link: '/pt-pt/tutorials/robot-arms/amazing-hand/pwm-debugging/04-Serial-Servo-Guide' },
                    ],
                  },
                  {
                    text: 'Rastreamento de gestos',
                    collapsed: true,
                    items: [
                      { text: 'Linux (Ubuntu) implementação e execução com um clique', link: '/pt-pt/tutorials/robot-arms/amazing-hand/gesture-tracking/01-Ubuntu' },
                      { text: 'Implementação e execução com um clique no Windows', link: '/pt-pt/tutorials/robot-arms/amazing-hand/gesture-tracking/02-Windows' },
                      { text: 'Mac implementação e execução com um clique', link: '/pt-pt/tutorials/robot-arms/amazing-hand/gesture-tracking/03-macOS' },
                    ],
                  },
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
                  { text: 'Tutorial de utilização da ferramenta de depuração do servo SCS0009', link: '/pt-pt/tutorials/accessories/feetech/SCS0009-Debug-Tool' },
                ],
              },
              {
                text: 'Módulo de transmissão de vídeo ESP32-NanoCam',
                collapsed: true,
                items: [
                  { text: 'Início rápido do ESP32-NanoCam', link: '/pt-pt/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start' },
                  { text: 'Especificações de hardware do ESP32-NanoCam', link: '/pt-pt/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec' },
                  { text: 'Manual do protocolo serial do ESP32-NanoCam', link: '/pt-pt/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol' },
                  {
                    text: 'Tutorial de visão IA (11 capítulos)',
                    collapsed: true,
                    items: [
                      { text: 'Capítulo 1: Configuração do ambiente', link: '/pt-pt/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup' },
                      { text: 'Capítulo 2: Início rápido', link: '/pt-pt/tutorials/accessories/esp32-nanocam/Ch02-Quick-Start' },
                      { text: 'Capítulo 3: Noções básicas da câmara', link: '/pt-pt/tutorials/accessories/esp32-nanocam/Ch03-Camera-Basics' },
                      { text: 'Capítulo 4: Deteção de rostos', link: '/pt-pt/tutorials/accessories/esp32-nanocam/Ch04-Face-Detection' },
                      { text: 'Capítulo 5: Deteção de caras de gato', link: '/pt-pt/tutorials/accessories/esp32-nanocam/Ch05-Cat-Face-Detection' },
                      { text: 'Capítulo 6: Reconhecimento de cores', link: '/pt-pt/tutorials/accessories/esp32-nanocam/Ch06-Color-Recognition' },
                      { text: 'Capítulo 7: Leitura de códigos QR', link: '/pt-pt/tutorials/accessories/esp32-nanocam/Ch07-QR-Code-Scanning' },
                      { text: 'Capítulo 8: Reconhecimento facial', link: '/pt-pt/tutorials/accessories/esp32-nanocam/Ch08-Face-Recognition' },
                      { text: 'Capítulo 9: Conversa por voz', link: '/pt-pt/tutorials/accessories/esp32-nanocam/Ch09-Voice-Chat' },
                      { text: 'Capítulo 10: Compreensão visual com IA', link: '/pt-pt/tutorials/accessories/esp32-nanocam/Ch10-AI-Vision-Understanding' },
                      { text: 'Capítulo 11: Controlo por voz ESP-Claw', link: '/pt-pt/tutorials/accessories/esp32-nanocam/Ch11-ESP-Claw-Voice-Control' },
                    ],
                  },
                ],
              },
              {
                text: 'Tutoriais da câmara CSI',
                collapsed: true,
                items: [
                  { text: 'Configuração da câmara CSI no Jetson', link: '/pt-pt/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup' },
                  { text: 'Utilização da câmara com autofoco', link: '/pt-pt/tutorials/accessories/csi-camera/02-Auto-Focus-Camera' },
                  { text: 'Uso do Jupyter Lab', link: '/pt-pt/tutorials/accessories/csi-camera/03-JupyterLab' },
                  { text: 'Uso do JetCam', link: '/pt-pt/tutorials/accessories/csi-camera/04-JetCam' },
                  { text: 'IMX219 no Raspberry Pi', link: '/pt-pt/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi' },
                ],
              },
              {
                text: 'Módulo de interação por voz IA',
                collapsed: true,
                items: [
                  { text: 'Iniciação rápida', link: '/pt-pt/tutorials/accessories/ai-voice-module/Quick-Start' },
                  { text: 'Informações do produto', link: '/pt-pt/tutorials/accessories/ai-voice-module/Product-Info' },
                  { text: 'Gravação do firmware do módulo', link: '/pt-pt/tutorials/accessories/ai-voice-module/Firmware-Flashing' },
                  { text: 'Modificar a palavra de ativação e as palavras de comando', link: '/pt-pt/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit' },
                  { text: 'Criação de entradas de protocolo personalizadas', link: '/pt-pt/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries' },
                  { text: 'Interação por voz ROS1', link: '/pt-pt/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction' },
                  { text: 'Interação por voz ROS2', link: '/pt-pt/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction' },
                  { text: 'Protocolo de porta série', link: '/pt-pt/tutorials/accessories/ai-voice-module/Serial-Protocol' },
                  { text: 'Protocolo IIC', link: '/pt-pt/tutorials/accessories/ai-voice-module/IIC-Protocol' },
                  { text: 'Comunicação PC', link: '/pt-pt/tutorials/accessories/ai-voice-module/PC-Communication' },
                  { text: 'Arduino: Comunicação de porta série', link: '/pt-pt/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication' },
                  { text: 'Arduino: Comunicação IIC', link: '/pt-pt/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication' },
                  { text: 'Jetson: Comunicação de porta série', link: '/pt-pt/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication' },
                  { text: 'Jetson: Comunicação IIC', link: '/pt-pt/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication' },
                  { text: 'RDK: Comunicação de porta série', link: '/pt-pt/tutorials/accessories/ai-voice-module/RDK-Serial-Communication' },
                  { text: 'RDK: Comunicação IIC', link: '/pt-pt/tutorials/accessories/ai-voice-module/RDK-IIC-Communication' },
                  { text: 'Raspberry Pi: Comunicação de porta série', link: '/pt-pt/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication' },
                  { text: 'Raspberry Pi: Comunicação IIC', link: '/pt-pt/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication' },
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
                  { text: 'Transferência remota de ficheiros', link: '/pt-pt/tutorials/sensors/imu/remote-file-transfer' },
                  { text: 'Transferência de ficheiros via SSH', link: '/pt-pt/tutorials/sensors/imu/ssh-file-transfer' },
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
              {
                text: 'Módulo GPS e BeiDou',
                collapsed: true,
                items: [
                  { text: 'Informações do módulo', link: '/pt-pt/tutorials/sensors/gps/GPS-Module-Info' },
                  { text: '51 MCU: análise GPS', link: '/pt-pt/tutorials/sensors/gps/51-MCU-GPS-Parsing' },
                  { text: 'Arduino: leitura de posição', link: '/pt-pt/tutorials/sensors/gps/Arduino-Location-Reading' },
                  { text: 'Arduino: análise de posição', link: '/pt-pt/tutorials/sensors/gps/Arduino-Location-Parsing' },
                  { text: 'STM32F103: saída de análise GPS', link: '/pt-pt/tutorials/sensors/gps/STM32F103-GPS-Parsing' },
                  { text: 'Jetson: análise GPS', link: '/pt-pt/tutorials/sensors/gps/Jetson-GPS-Parsing' },
                  { text: 'Jetson: posicionamento AGNSS', link: '/pt-pt/tutorials/sensors/gps/Jetson-AGNSS' },
                  { text: 'Jetson: API do Baidu Maps', link: '/pt-pt/tutorials/sensors/gps/Jetson-Baidu-Map-API' },
                  { text: 'Raspberry Pi: análise GPS', link: '/pt-pt/tutorials/sensors/gps/RaspberryPi-GPS-Parsing' },
                  { text: 'Raspberry Pi: posicionamento AGNSS', link: '/pt-pt/tutorials/sensors/gps/RaspberryPi-AGNSS' },
                  { text: 'Raspberry Pi: API do Baidu Maps', link: '/pt-pt/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API' },
                  { text: 'ROS: preparação', link: '/pt-pt/tutorials/sensors/gps/ROS-Preparation' },
                  { text: 'ROS: leitura de dados GPS', link: '/pt-pt/tutorials/sensors/gps/ROS-Read-GPS-Data' },
                  { text: 'ROS: desenhar trajeto GPS', link: '/pt-pt/tutorials/sensors/gps/ROS-Draw-GPS-Track' },
                  { text: 'Erro de localização no mapa', link: '/pt-pt/tutorials/sensors/gps/Map-Location-Error' },
                ],
              },
            ],
          },
        ],
        '/pt-pt/topics/': [{ text: 'Tópicos', items: [{ text: 'Tópicos', link: '/pt-pt/topics/' }, { text: 'Flasheamento JetPack e Configuração do Sistema', link: '/pt-pt/topics/jetpack-setup' }, { text: 'Introdução ao Deploy de IA Edge', link: '/pt-pt/topics/edge-ai-intro' }, { text: 'Introdução à Inteligência Incorporada (LeRobot)', link: '/pt-pt/topics/embodied-ai-intro' }, { text: 'Tema Robot Learning', link: '/pt-pt/topics/robot-learning/' }, { text: 'Por Que Construímos Aberto — O Caso do Hardware Robótico Open Source', link: '/pt-pt/topics/open-source-hardware' }] }],
        '/pt-pt/tech/': [{ text: 'Docs Técnicos', items: [{ text: 'Docs Técnicos', link: '/pt-pt/tech/' }, { text: 'Referência de API', link: '/pt-pt/tech/api-reference' }, { text: 'Guia de Desenvolvimento', link: '/pt-pt/tech/dev-guide' }] }],
        '/pt-pt/community/': [{ text: 'Comunidade', items: [{ text: 'Comunidade', link: '/pt-pt/community/' }, { text: 'Guia de Contribuição', link: '/pt-pt/community/contributing' }] }],
        '/pt-pt/cases/': [{ text: 'Casos', items: [{ text: 'Histórias de Sucesso de Utilizadores', link: '/pt-pt/cases/' }] }],
        '/pt-pt/products/': [
          { text: 'Robôs', items: [
            { text: 'Kit de Desenvolvimento SO-ARM101', link: '/pt-pt/products/so-arm101' },
            { text: 'Mão Dexterous de 4 Dedos Open Source AmazingHand', link: '/pt-pt/products/amazinghand' },
            { text: 'Placa Driver de Servo de Barramento JUXI', link: '/pt-pt/products/servo-driver-board' },
            { text: 'Garra Flexível TPU SO-ARM101', link: '/pt-pt/products/tpu-flexible-gripper' },
            { text: 'Kit de Visão Robótica SO-ARM101', link: '/pt-pt/products/robot-vision-kit' },
            { text: 'Robô Móvel de Inteligência Incorporada Lekiwi', link: '/pt-pt/products/lekiwi' },
            { text: 'Suporte de Câmara Superior SO-ARM101', link: '/pt-pt/products/overhead-camera-mount' },
            { text: 'Robô móvel de dois braços XLeRobot', link: '/pt-pt/products/xlerobot' },
          ] },
          { text: 'Computação & Visão', items: [
            { text: 'Kit de Desenvolvedor Jetson Orin NX Super', link: '/pt-pt/products/jetson-orin-nx-super-kit' },
            { text: 'Câmara de Profundidade 3D RealSense', link: '/pt-pt/products/realsense-depth-camera' },
            { text: 'Módulo de Vídeo WiFi ESP32-S3', link: '/pt-pt/products/esp32-s3-wifi-module' },
            { text: 'Câmara CSI IMX219 79°', link: '/pt-pt/products/imx219-csi-camera' },
            { text: 'Câmara USB com foco automático', link: '/pt-pt/products/usb-auto-focus-camera' },
          ] },
          { text: 'Sensores', items: [
            { text: 'Módulo Inercial IMU de Alta Precisão', link: '/pt-pt/products/imu-module' },
            { text: 'Módulo de Posicionamento GNSS GPS e BeiDou', link: '/pt-pt/products/gps-beidou-module' },
          ] },
          { text: 'Acessórios', items: [
            { text: 'Unidade Pan-Tilt de Servo 2-DOF', link: '/pt-pt/products/2dof-gimbal' },
            { text: 'Módulo de Interação por Voz KWS', link: '/pt-pt/products/kws-voice-module' },
            { text: 'Servos de Barramento Feetech (SCS0009 / STS3215)', link: '/pt-pt/products/feetech-servo' },
            { text: 'Chaveador KVM 4-em-1', link: '/pt-pt/products/kvm-switch' },
            { text: 'Placa de Som USB sem Driver', link: '/pt-pt/products/usb-sound-card' },
            { text: 'Capturadora HDMI 4K', link: '/pt-pt/products/4k-hdmi-capture' },
            { text: 'Módulo de interação por voz IA', link: '/pt-pt/products/ai-voice-module' },
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
      const siteTitle = brandOf(pageData.relativePath)
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
        ['meta', { property: 'og:site_name', content: brandOf(pageData.relativePath) }],
      )
    }
    if (breadcrumbLd) heads.push(['script', { type: 'application/ld+json' }, JSON.stringify(breadcrumbLd)])
    return heads
  },
})
