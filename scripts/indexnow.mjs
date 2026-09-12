// IndexNow:部署后向 Bing/Yandex/Seznam/Naver 主动推送 URL,加速收录
// 约定:key 文件位于 docs/public/{key}.txt(构建后可从站点根 /{key}.txt 访问);
// URL 列表读本地 dist/sitemap.xml(与刚部署的内容一致),首次运行即全量提交。
import { readFileSync, readdirSync } from 'node:fs'
import { basename } from 'node:path'

const HOST = 'wiki.juxitech.com'

const keyFile = readdirSync('docs/public').find((f) => /^[a-f0-9]{32}\.txt$/.test(f))
if (!keyFile) {
  console.error('未找到 IndexNow key 文件(docs/public/{32位hex}.txt)')
  process.exit(1)
}
const key = basename(keyFile, '.txt')

const xml = readFileSync('docs/.vitepress/dist/sitemap.xml', 'utf8')
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (!urls.length) {
  console.error('dist/sitemap.xml 中未解析到 URL')
  process.exit(1)
}

const body = JSON.stringify({
  host: HOST,
  key,
  keyLocation: `https://${HOST}/${keyFile}`,
  urlList: urls,
})
const submit = () =>
  fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  })

let res = await submit()
// 403 = key 校验失败;部署链中紧跟 deploy 运行时,key 文件可能尚未在边缘就绪,延迟重试一次
if (res.status === 403) {
  console.log('IndexNow: key 校验未通过(边缘可能未就绪),30 秒后重试…')
  await new Promise((r) => setTimeout(r, 30000))
  res = await submit()
}
console.log(`IndexNow: 已提交 ${urls.length} 条 URL → HTTP ${res.status}(200=成功, 202=已接受待校验)`)
if (res.status >= 400 && res.status !== 429) {
  console.error(`IndexNow 提交失败: HTTP ${res.status}`)
  process.exit(1)
}
