#!/usr/bin/env node
// 跨语种一致性闸门 (check:parity)—— 判据全部是「设计上必然相同」的精确不变量,不做多数投票
//(多数投票有结构性盲点:缺陷被多个语种共享时,永远选不出正确形式)
//   ⓪ 围栏不得被转义:行首 `\`\`\`` / `\``` 渲染时只是字面反引号,代码块失效 —— 硬失败
//   ① 结构:各语种同一页面的「标题层级序列 + 表格块数」必须一致(围栏感知)
//   ② 图片:图片目标集合必须一致(相对层级归一后比较)
//   ②b 下载:页面上的 /downloads/ 目标集合必须一致(文件名不随语种变)
//   ③ 围栏:每份 md 的围栏必须成对
//   ⑤ 围栏语言标签序列:同一段代码必须用同一标签(标签决定高亮)。相邻同标签块先折叠——合并/拆分
//      相邻块对渲染几乎无差别,只有标签不同才改变高亮
//   ④ 代码行覆盖(默认仅提示,--strict 判失败):围栏内出现过的「代码行」(剥注释/字符串/占位符、
//      路径归一、跳过图解块与块内说明文字)必须出现在所有语种里 —— 抓「某语种漏了一行/命令写坏」
// 误报处理:若某行确实只应存在于个别语种,加进 ALLOW 白名单并注明原因。
import fs from 'node:fs'
import path from 'node:path'

const ROOT = 'docs/content'
const LOCS = ['en', 'zh-hans', 'zh-hant', 'ja', 'ko', 'de', 'fr', 'es', 'it', 'pt-br', 'pt-pt']
const VERBOSE = process.argv.includes('--verbose')
const STRICT = process.argv.includes('--strict')
// 允许跨语种不同的代码行(前缀/包含匹配);每条都要有理由
const ALLOW = [
  'STORE',                    // 商店链接按语种前缀,已在归一里处理,这里兜底
]
// 仅在指定页面上豁免的行(整行相等,不用前缀/包含 —— 避免顺带豁免同前缀的其它变体)
const ALLOW_BY_PAGE = [
  {
    page: 'tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk.md',
    why: '「查看 I2C 设备」这一步:5 个语种按 RDK 素材用厂商脚本 python3 /app/40pin_samples/test_i2c.py;6 个语种(i2c-tools 方案:sudo apt-get install -y i2c-tools + i2cdetect -y -r -a 0)是从同一套素材的 Jetson 页带过来的,且这 6 语缺素材里的 test_i2c.py 步与 ros1 的 cd 行。按「不改原意」保留各语种原样、不强行统一,故在此豁免',
    lines: [
      'python3 /app/40pin_samples/test_i2c.py',
      'sudo apt-get update',
      'sudo apt-get install -y i2c-tools',
      'sudo i2cdetect -y -r -a 0',
      'cd ~/imu_ros1/src/IMU_ROS1/IMU_Library',
    ],
  },
]

const files = []
const rec = (d, loc) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (loc === 'en' && LOCS.includes(e.name)) continue
    const p = path.join(d, e.name)
    if (e.isDirectory()) { if (!e.isSymbolicLink()) rec(p, loc); continue }
    if (e.name.endsWith('.md')) files.push({ p, loc })
  }
}
rec(ROOT, 'en')
for (const l of LOCS.slice(1)) rec(path.join(ROOT, l), l)

const normPath = (p) => p.replace(/(?:\.\.\/)+/g, 'UP/')
const mask = (line) => {
  let res = '', q = null
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (q) { res += ch; if (ch === q && line[i - 1] !== '\\') q = null; continue }
    if (ch === '"' || ch === "'" || ch === '`') { q = ch; res += ch; continue }
    if (ch === '#' || (ch === '/' && line[i + 1] === '/' && line[i - 1] !== ':')) break
    res += ch
  }
  return res
    .replace(/\/\*.*?\*\//g, ' ')
    .replace(/!\[[^\]]*\]\(([^)]+)\)/g, (_, t) => `![](${normPath(t)})`)
    .replace(/\[[^\]]*\]\(([^)]+)\)/g, (_, t) => `[](${normPath(t)})`)
    .replace(/https?:\/\/www\.juxitech\.com(?:\/[a-z-]+)?/g, 'STORE')
    .replace(/<[^<>]{1,60}>/g, '<PH>')
    .replace(/"[^"]*"/g, '""').replace(/'[^']*'/g, "''").replace(/`[^`]*`/g, '``')
    .replace(/\s+/g, ' ').trim()
}
const FIG_LANG = new Set(['plaintext', 'plain text', 'text', 'txt', 'ascii', 'plain'])
// 围栏语言标签归一:大小写、多余空格、以及「无高亮」一族(VitePress 对它们渲染相同)
const fenceNorm = (raw) => {
  const t = raw.trim().toLowerCase().replace(/\s+/g, ' ')
  return FIG_LANG.has(t) || t === '' ? 'text' : t
}
const collapse = (a) => a.filter((t, i) => i === 0 || t !== a[i - 1])
const BOX_CHARS = /[│─┌┐└┘├┤┬┴┼↓→←▶►]/
// 「像代码的行」:含代码特征符号或已知命令词。剥掉注释后仍不像代码的,判为块内说明文字(逐语翻译),不比较。
// 这是保守过滤 —— 只会漏报,不会误报。
const CODEISH = /[=<>|&$#*\/\\{}[\]()"'`@%~^]|\b(?:sudo|pip\d?|git|cd|cp|mv|rm|chmod|chown|apt|apt-get|docker|npm|npx|yarn|python\d?|pip3|ros\d?|colcon|catkin|make|cmake|export|source|echo|cat|ls|mkdir|ssh|scp|wget|curl|systemctl|modprobe|reboot|unzip|tar|gcc|g\+\+|node|cargo|conda|mamba|lerobot|huggingface-cli|hf|speaker-test|alsamixer|trtexec|i2cdetect|udevadm|modprobe)\b/
const codeLines = (src) => {
  const out = new Map()   // 行 → 出现次数(次数也要跨语种一致:重复的示例块漏一个会被抓到)
  for (const m of src.matchAll(/```([^\n]*)\n([\s\S]*?)```/g)) {
    const lang = fenceNorm(m[1])
    if (lang === 'text') continue
    if (BOX_CHARS.test(m[2])) continue       // 整块跳过:含框线字符 = 图解/结构图,其文字逐语翻译,不比
    const body = m[2].replace(/"""[\s\S]*?"""/g, '""').replace(/'''[\s\S]*?'''/g, "''")
    for (const line of body.split('\n')) {
      const t = line.trim()
      if (!t) continue
      const x = mask(t)                       // 先剥注释、屏蔽字符串与路径,再判断
      if (!x) continue
      if (/[一-鿿぀-ヿ가-힯]/.test(x)) continue  // 剥完注释仍含 CJK = 可翻译的标注,不比较
      if (!CODEISH.test(x)) continue             // 不含任何代码特征 = 块内说明文字,不比较
      if (BOX_CHARS.test(t)) continue            // 图解块里的画线/箭头行(内容可翻译)
      out.set(x, (out.get(x) || 0) + 1)
    }
  }
  return out
}
// 宽松版:该语种任意围栏里(含 text/图解块)出现过的行 —— 用于判定「某行是否真的缺失」。
// 只在 text 块里出现 ≠ 缺失(是块标签不同),故 ④ 的「缺失」判定要同时看这张表。
const looseLines = (src) => {
  const out = new Set()
  for (const m of src.matchAll(/```([^\n]*)\n([\s\S]*?)```/g)) {
    for (const line of m[2].split('\n')) {
      const t = line.trim()
      if (!t) continue
      const x = mask(t)
      if (x) out.add(x)
    }
  }
  return out
}
const imgTargets = (src) => {
  const t = new Set()
  for (const m of src.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const u = m[1].split('#')[0]
    t.add(/^https?:/.test(u) ? u : normPath(u))
  }
  return t
}
// ②b 下载文件目标:同一页面各语种必须链到同一批 /downloads/ 文件(托管文件名不随语种变)
const dlTargets = (src) => {
  const t = new Set()
  for (const m of src.matchAll(/\]\((\/downloads\/[^)\s]+)\)/g)) t.add(normPath(decodeURIComponent(m[1])))
  return t
}
const structure = (src) => {
  const h = []; let fenceOpen = false, fence = 0, table = 0, inTable = false
  const langs = []
  for (const line of src.split('\n')) {
    const fm = line.match(/^\s*```(.*)$/)
    if (fm) {
      if (!fenceOpen) langs.push(fenceNorm(fm[1]))
      fenceOpen = !fenceOpen; fence++; continue
    }
    if (fenceOpen) continue
    const m = line.match(/^(#{1,6})\s/)
    if (m) h.push(m[1].length)
    if (/^\s*\|/.test(line)) { if (!inTable) { table++; inTable = true } } else inTable = false
  }
  return { h: h.join(','), table, fence, langs }
}

const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n?/g, '\n')

const pages = new Map()
const fenceOdd = []
const problems = []
const warnings = []
const ESCAPED = /^(?:\s*)(?:\\`){3}|^\s*\\+```/
for (const { p, loc } of files) {
  const rel = path.relative(ROOT, p)
  const key = loc === 'en' ? rel : rel.split('/').slice(1).join('/')
  const src = read(p)
  // ⓪ 被转义的围栏:行首出现 \`\`\` 或 \``` — 渲染时不会成为代码块,而是显示字面反引号
  src.split('\n').forEach((line, i) => {
    if (ESCAPED.test(line)) problems.push(`围栏被转义 ${rel}:${i + 1}: ${line.trim().slice(0, 40)}`)
  })
  const fcount = (src.match(/^\s*```/gm) || []).length
  if (fcount % 2 !== 0) fenceOdd.push(`${rel}: 围栏 {fcount} 个(应为偶数)`.replace('{fcount}', fcount))
  if (!pages.has(key)) pages.set(key, {})
  pages.get(key)[loc] = { code: codeLines(src), loose: looseLines(src), img: imgTargets(src), dl: dlTargets(src), st: structure(src) }
}

const allow = (l, key) => ALLOW.some((a) => l.startsWith(a) || l.includes(a))
  || ALLOW_BY_PAGE.some((e) => e.page === key && e.lines.some((x) => l === x))  // 整行相等,避免顺带豁免同前缀变体
for (const [key, m] of pages) {
  const locs = Object.keys(m)
  if (locs.length < LOCS.length) { problems.push(`缺语种(${locs.length}/11): ${key}`); continue }
  const base = m.en.st
  const baseImg = m.en.img
  for (const loc of locs) {
    if (loc === 'en') continue
    const L = m[loc]
    if (L.st.h !== base.h) problems.push(`结构(标题层级) ${loc} ${key}`)
    else if (L.st.table !== base.table) problems.push(`结构(表格数 ${base.table}≠${L.st.table}) ${loc} ${key}`)
    if (L.st.fence !== base.fence && VERBOSE) console.log(`  · 围栏数不同(通常为代码块拆分差异) ${loc} ${key}: ${base.fence}≠${L.st.fence}`)
    // ⑤ 围栏语言标签序列:同一段代码在各语种必须用同一标签(标签决定高亮,不是译文内容)。
    //    相邻「同标签」块被合并/拆分对渲染几乎无差别,故先折叠再比——只盯真正会变高亮的差异。
    const ce = collapse(base.langs), cl = collapse(L.st.langs)
    if (cl.join(' ') !== ce.join(' ')) {
      const n = Math.min(cl.length, ce.length)
      let d = 0
      while (d < n && ce[d] === cl[d]) d++
      problems.push(`围栏标签 ${loc} ${key}: 第 ${d + 1} 处 ${ce[d] ?? '—'}≠${cl[d] ?? '—'}(共 ${ce.length} vs ${cl.length} 段)`)
    }
    for (const t of baseImg) if (!L.img.has(t)) problems.push(`图片缺失 ${loc} ${key}: ${t}`)
    for (const t of L.img) if (!baseImg.has(t)) problems.push(`图片多余 ${loc} ${key}: ${t}`)
    const baseDl = m.en.dl
    for (const t of baseDl) if (!L.dl.has(t)) problems.push(`下载链接缺失 ${loc} ${key}: ${t}`)
    for (const t of L.dl) if (!baseDl.has(t)) problems.push(`下载链接多余 ${loc} ${key}: ${t}`)
  }
  // ④ 代码行覆盖:凡「在 ≥2 个语种中逐字相同」的代码行,必须出现在所有语种里。
  //    只被单一语种持有的行跳过(可能是语种专属内容),用 --verbose 时打印供人看。
  const owner = new Map()
  for (const loc of locs) for (const l of m[loc].code.keys()) {
    if (!owner.has(l)) owner.set(l, [])
    owner.get(l).push(loc)
  }
  for (const [line, owners] of owner) {
    if (allow(line, key)) continue
    if (owners.length === locs.length) continue
    if (owners.length < 2) {
      if (VERBOSE) console.log(`  · 仅 ${owners[0]} 独有(跳过):「${line.slice(0, 60)}」(${key})`)
      continue
    }
    // 该语种若在任意围栏(含 text/图解块)里出现过这一行,就不算「缺失」——那只是块标签不同
    const missing = locs.filter((l) => !m[l].code.has(line) && !m[l].loose.has(line))
    if (!missing.length) continue
    const msg = `代码行缺失 ${missing.join(',')} ${key}: 「${line.slice(0, 70)}」(存在于 ${owners.join(',')})`
    // ④ 默认只报告:围栏内哪些行「必须一致」取决于内容是否可翻译,需人工分诊;--strict 才判失败
    ;(STRICT ? problems : warnings).push(msg)
  }
  // ⑤b 代码行「次数」:en 里出现 ≥2 次、且该语种也含该行时,次数必须与 en 相同。
  //     译文行在该语种是另一种写法(次数 0)→ 自动跳过;这条抓「重复的示例块漏了一个」。
  for (const [line, n] of m.en.code) {
    if (n < 2 || allow(line, key)) continue
    for (const loc of locs) {
      if (loc === 'en') continue
      const k = m[loc].code.get(line) || 0
      if (k >= 1 && k !== n) problems.push(`代码行次数 ${loc} ${key}: 「${line.slice(0, 60)}」en×${n} vs ${loc}×${k}`)
    }
  }
}
for (const f of fenceOdd) problems.push(f)

if (warnings.length) {
  console.log(`[parity] ! ${warnings.length} 处「代码行覆盖」提示(需人工分诊;--strict 时判失败)`)
  warnings.slice(0, 20).forEach((w) => console.log('   ' + w))
  if (warnings.length > 20) console.log(`   … 另有 ${warnings.length - 20}`)
}
if (problems.length) {
  console.log(`[parity] ✗ ${problems.length} 处跨语种不一致`)
  problems.slice(0, 80).forEach((p) => console.log('   ' + p))
  if (problems.length > 80) console.log(`   … 另有 ${problems.length - 80}`)
  process.exit(1)
} else {
  console.log(`[parity] ✓ 结构/图片/下载/围栏标签 全部一致(${pages.size} 组页面 × ${LOCS.length} 语)` + (warnings.length ? `;另有 ${warnings.length} 条代码行提示` : ''))
}
