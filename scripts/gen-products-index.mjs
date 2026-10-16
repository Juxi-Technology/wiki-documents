// 生成 11 语产品中心 index.md(分区 + 图片卡片网格)。
// 数据源:docs/.vitepress/products-data.mjs;本脚本产出即为提交物,勿手改生成的 md。
// 用法:node scripts/gen-products-index.mjs
import fs from 'node:fs'
import path from 'node:path'
import { CATEGORY_ORDER, SECTION_NAMES, HERO, PRODUCTS, NAMES, BLURBS, SHOP_URL, SHOP_LOCALE_PREFIX } from '../docs/.vitepress/products-data.mjs'

const LOCALES = [
  { dir: 'docs/content', prefix: '', key: 'en' },
  { dir: 'docs/content/zh-hans', prefix: '/zh-hans', key: 'zh-hans' },
  { dir: 'docs/content/zh-hant', prefix: '/zh-hant', key: 'zh-hant' },
  { dir: 'docs/content/ja', prefix: '/ja', key: 'ja' },
  { dir: 'docs/content/ko', prefix: '/ko', key: 'ko' },
  { dir: 'docs/content/de', prefix: '/de', key: 'de' },
  { dir: 'docs/content/fr', prefix: '/fr', key: 'fr' },
  { dir: 'docs/content/es', prefix: '/es', key: 'es' },
  { dir: 'docs/content/it', prefix: '/it', key: 'it' },
  { dir: 'docs/content/pt-br', prefix: '/pt-br', key: 'pt-br' },
  { dir: 'docs/content/pt-pt', prefix: '/pt-pt', key: 'pt-pt' },
]

// 各语 hub 标题(h1 保持既有页面名;title 关键词化,均取自站内既有词表)
const TITLES = {
  en: { h1: 'Products', title: 'Products — Robot Arms, Jetson Kits & Sensors' },
  'zh-hans': { h1: '产品中心', title: '产品中心——机械臂、Jetson 套件与传感器' },
  'zh-hant': { h1: '產品中心', title: '產品中心——機械臂、Jetson 套件與傳感器' },
  ja: { h1: '製品一覧', title: '製品一覧——ロボットアーム、Jetson キット、センサー' },
  ko: { h1: '제품 목록', title: '제품 목록 — 로봇 팔, Jetson 키트 및 센서' },
  de: { h1: 'Produkte', title: 'Produkte — Roboterarme, Jetson-Kits & Sensoren' },
  fr: { h1: 'Produits', title: 'Produits — Bras robotiques, kits Jetson et capteurs' },
  es: { h1: 'Productos', title: 'Productos — Brazos robóticos, kits Jetson y sensores' },
  it: { h1: 'Prodotti', title: 'Prodotti — Bracci robotici, kit Jetson e sensori' },
  'pt-br': { h1: 'Produtos', title: 'Produtos — Braços robóticos, kits Jetson e sensores' },
  'pt-pt': { h1: 'Produtos', title: 'Produtos — Braços robóticos, kits Jetson e sensores' },
}

// 各语 keywords meta 的「机械臂」词(分区名直接复用 SECTION_NAMES;Jetson/LeRobot 跨语种保留)
const KW_ARM = {
  en: 'robot arm',
  'zh-hans': '机械臂',
  'zh-hant': '機械臂',
  ja: 'ロボットアーム',
  ko: '로봇 팔',
  de: 'Roboterarm',
  fr: 'bras robotique',
  es: 'brazo robótico',
  it: 'braccio robotico',
  'pt-br': 'braço robótico',
  'pt-pt': 'braço robótico',
}

// hub 页 UI 词(筛选 chips 的「全部」+ 卡片购买按钮;非内容,不入 products-data.mjs)
const FILTER_ALL = {
  en: 'All',
  'zh-hans': '全部',
  'zh-hant': '全部',
  ja: 'すべて',
  ko: '전체',
  de: 'Alle',
  fr: 'Tous',
  es: 'Todos',
  it: 'Tutti',
  'pt-br': 'Todos',
  'pt-pt': 'Todos',
}
const BUY_WORD = {
  en: 'Buy',
  'zh-hans': '购买',
  'zh-hant': '購買',
  ja: '購入',
  ko: '구매',
  de: 'Kaufen',
  fr: 'Acheter',
  es: 'Comprar',
  it: 'Acquista',
  'pt-br': 'Comprar',
  'pt-pt': 'Comprar',
}

// 淘宝店铺按钮文案:全 11 语(2026-10-17 用户拍板——海外用户可经淘宝海外进店;
// 中文两语取首页既有措辞,其余按各语「官方商店」的既有词组风格拼装)
const TAOBAO_WORD = {
  en: '🛒 Taobao Store',
  'zh-hans': '🛒 淘宝店铺',
  'zh-hant': '🛒 淘寶店鋪',
  ja: '🛒 Taobao ストア',
  ko: '🛒 Taobao 스토어',
  de: '🛒 Taobao Shop',
  fr: '🛒 Boutique Taobao',
  es: '🛒 Tienda Taobao',
  it: '🛒 Negozio Taobao',
  'pt-br': '🛒 Loja Taobao',
  'pt-pt': '🛒 Loja Taobao',
}

// 侧边目录标题(分类导航栏;≥1280px 显示,窄屏回落 chips 行)
const SIDE_TITLE = {
  en: 'Contents',
  'zh-hans': '目录',
  'zh-hant': '目錄',
  ja: '目次',
  ko: '목차',
  de: 'Inhalt',
  fr: 'Sommaire',
  es: 'Índice',
  it: 'Indice',
  'pt-br': 'Índice',
  'pt-pt': 'Índice',
}

// 既有 description 保留(逐语从现文件读回)
function keepDescription(file) {
  const src = fs.readFileSync(file, 'utf8')
  const m = src.match(/^description:\s*(.*)$/m)
  return m ? m[1] : '""'
}

// 官方商城按钮文案:直接取各语首页 hero 上已上线的那枚按钮(含 emoji,措辞零新写)
function heroLabel(dir, cls) {
  const src = fs.readFileSync(path.join(dir, 'index.md'), 'utf8')
  const m = src.match(new RegExp(`class="hero-btn ${cls}"[^>]*>([^<]+)</a>`))
  if (!m) throw new Error(`首页缺少 hero-btn.${cls} 按钮: ${dir}/index.md`)
  return m[1].trim()
}

const STYLES = `
.vp-doc .hero-subtitle {
  font-size: 19px;
  line-height: 1.8;
  margin: 8px auto 8px;
  max-width: 780px;
  color: var(--vp-c-text-2);
  display: block;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin: 24px 0 48px 0;
}
.vp-doc .hub-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 18px 0 6px;
}
.hub-chip {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.4;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s, color 0.2s;
}
.hub-chip:hover {
  border-color: #1e3a5f;
  color: var(--vp-c-text-1);
}
.hub-chip.active {
  background: #1e3a5f;
  border-color: #1e3a5f;
  color: #ffffff;
}
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  background: var(--vp-c-bg-soft);
}
/* 卡片内 a/p 元素样式须 .vp-doc 前缀:主题 .vp-doc a / .vp-doc p(0,1,1)会以
   品牌蓝+下划线,或 margin:16px 0(清掉左右间距)压过单类选择器(0,1,0) */
.vp-doc .pc-link {
  display: block;
  flex: 1;
  text-decoration: none;
  color: inherit;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand);
}
.product-card img {
  width: 100%;
  height: 150px;
  object-fit: contain;
  padding: 14px 16px 0;
  background: var(--vp-c-bg);
}
.pc-title {
  display: block;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  margin: 12px 16px 8px;
}
.vp-doc .pc-desc {
  font-size: 13px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0 16px 16px;
}
.vp-doc .pc-buy {
  align-self: center;
  margin: 0 16px 18px;
  padding: 7px 26px;
  border-radius: 6px;
  background: #1e3a5f;
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.4;
  text-decoration: none;
  transition: background-color 0.2s;
}
.vp-doc .pc-buy:hover {
  background: #152a45;
  color: #ffffff;
}
.vp-doc .hub-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin: 12px 0 2px;
}
/* 侧边分类目录:≥1280px 固定竖排导航(左缘空白区),窄屏隐藏并回落 chips 行 */
.vp-doc .hub-side {
  display: none;
}
.hub-side-title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
  padding: 0 12px 6px;
}
.hub-side-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 13.5px;
  line-height: 1.5;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}
.hub-side-btn:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}
.hub-side-btn.active {
  background: #1e3a5f;
  color: #ffffff;
}
@media (min-width: 1280px) {
  .vp-doc .hub-side {
    position: fixed;
    left: 40px;
    top: 150px;
    width: 184px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .vp-doc .hub-filters {
    display: none;
  }
}
@media (max-width: 767px) {
  .product-grid { grid-template-columns: 1fr; }
}
`

function card(loc, p, key) {
  const name = NAMES[p.slug][key]
  const blurb = BLURBS[p.slug][key]
  // 在售商品(shop 有值):购买按钮直连商店(带 UTM 归因);未在售的不渲染按钮
  const buy = p.shop
    ? `
    <a href="${SHOP_URL}/${SHOP_LOCALE_PREFIX[key]}products/${p.shop}?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=${p.slug}" target="_blank" rel="noopener" class="pc-buy">${BUY_WORD[key]}</a>`
    : ''
  return `  <div class="product-card" data-cat="${p.category}">
    <a :href="withBase('${loc.prefix}/products/${p.slug}')" class="pc-link">
      <img :src="withBase('/images/categories/${p.img}')" alt="${name}" loading="lazy">
      <span class="pc-title">${name}</span>
      <p class="pc-desc">${blurb}</p>
    </a>${buy}
  </div>`
}

let total = 0
for (const loc of LOCALES) {
  const file = path.join(loc.dir, 'products/index.md')
  const desc = keepDescription(file)
  const t = TITLES[loc.key]
  const kws = [...SECTION_NAMES[loc.key], KW_ARM[loc.key], 'Jetson', 'LeRobot'].map((s) => JSON.stringify(s)).join(', ')
  const chips = [
    `  <button class="hub-chip active" aria-pressed="true" data-filter="all" @click="applyFilter('all')">${FILTER_ALL[loc.key]}</button>`,
    ...CATEGORY_ORDER.map(
      (cat, i) =>
        `  <button class="hub-chip" aria-pressed="false" data-filter="${cat}" @click="applyFilter('${cat}')">${SECTION_NAMES[loc.key][i]}</button>`,
    ),
  ].join('\n')
  // 主标语下:淘宝(全语种,海外用户经淘宝海外进店)+ 官方商城按钮;样式复用首页 .hero-btn(全局主题)
  const taobaoBtn = `  <a href="https://juxitechnology.taobao.com" target="_blank" rel="noopener" class="hero-btn taobao">${TAOBAO_WORD[loc.key]}</a>\n`
  const cta = `<p class="hub-cta">
${taobaoBtn}  <a href="${SHOP_URL}/${SHOP_LOCALE_PREFIX[loc.key]}?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=hero-store" target="_blank" rel="noopener" class="hero-btn shop">${heroLabel(loc.dir, 'shop')}</a>
</p>`
  const sideBtns = [
    `  <button class="hub-side-btn active" aria-pressed="true" data-filter="all" @click="applyFilter('all')">${FILTER_ALL[loc.key]}</button>`,
    ...CATEGORY_ORDER.map(
      (cat, i) =>
        `  <button class="hub-side-btn" aria-pressed="false" data-filter="${cat}" @click="applyFilter('${cat}')">${SECTION_NAMES[loc.key][i]}</button>`,
    ),
  ].join('\n')
  const sections = CATEGORY_ORDER.map((cat, i) => {
    const items = PRODUCTS.filter((p) => p.category === cat)
    return `## ${SECTION_NAMES[loc.key][i]}\n\n<div class="product-grid">\n${items.map((p) => card(loc, p, loc.key)).join('\n')}\n</div>`
  }).join('\n\n')

  const body = `---
title: ${t.title}
description: ${desc}
keywords: [${kws}]
aside: false
sidebar: false
outline: false
prev: false
next: false
---

<!-- 本文件由 scripts/gen-products-index.mjs 生成,请勿手改(数据源:docs/.vitepress/products-data.mjs) -->

# ${t.h1}

<p class="hero-subtitle">${HERO[loc.key]}</p>

${cta}

<nav class="hub-side">
  <span class="hub-side-title">${SIDE_TITLE[loc.key]}</span>
${sideBtns}
</nav>

<p class="hub-filters">
${chips}
</p>

${sections}

<script setup>
import { withBase } from 'vitepress'

// 分类筛选:纯 DOM 切换(卡片是静态内容,不参与 Vue 重渲染;无 JS 时默认全部可见)
function applyFilter(cat) {
  document.querySelectorAll('.hub-chip, .hub-side-btn').forEach((btn) => {
    const on = btn.dataset.filter === cat
    btn.classList.toggle('active', on)
    btn.setAttribute('aria-pressed', String(on))
  })
  let firstVisible = null
  document.querySelectorAll('.product-grid').forEach((grid) => {
    let any = false
    grid.querySelectorAll('.product-card').forEach((cardEl) => {
      const on = cat === 'all' || cardEl.dataset.cat === cat
      cardEl.style.display = on ? '' : 'none'
      if (on) any = true
    })
    grid.style.display = any ? '' : 'none'
    const h2 = grid.previousElementSibling
    if (h2 && h2.tagName === 'H2') {
      h2.style.display = any ? '' : 'none'
      if (any && !firstVisible) firstVisible = h2
    }
  })
  // 过滤后滚动到首个可见分区(标题自带 scroll-margin,不会被固定导航遮住)
  if (firstVisible) firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style>
${STYLES}</style>
`
  fs.writeFileSync(file, body, 'utf8')
  total++
  console.log('生成:', file)
}
console.log(`完成,共 ${total} 个文件`)
