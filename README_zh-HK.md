
# <img src="docs/public/images/logos/logo-black.png" width="120" align="left" style="margin-right: 30px;"> 鉅犀科技 Wiki 文件平台

🤖**收錄鉅犀科技所有公開文件的開源文件平台**

[快速開始](#-快速開始) • [文件資源](#-文件資源) • [專案結構](#-專案結構) • [聯絡我們](#-聯絡我們)

---

## 📖 簡介

本倉庫包含鉅犀科技官方 Wiki 文件平台的原始檔。使用 VitePress 建置並部署在 GitHub Pages 上，為鉅犀科技產品提供全面的文件、教程和資源。

## 🚀 快速開始

### 先決條件

- Node.js (v16 或更高版本)
- npm 或 yarn

### 安裝

```bash
# 複製倉庫
git clone --depth 1 https://github.com/Juxi-Technology/wiki-documents.git

# 進入專案目錄
cd wiki-document

# 安裝相依套件
npm install

# 啟動開發伺服器
npm run docs:dev
```

訪問 `http://localhost:5173` 本地預覽網站。

## 📚 文件資源

### 產品教程

- [SO-ARM101 教程](https://juxi-technology.github.io/wiki-documents/tutorials/so-arm101-tutorial)
- [快速入門](https://juxi-technology.github.io/wiki-documents/tutorials/getting-started)
- [硬體設定](https://juxi-technology.github.io/wiki-documents/tutorials/hardware-setup)
- [軟體設定](https://juxi-technology.github.io/wiki-documents/tutorials/software-config)

### 技術文件

- [開發指南](https://juxi-technology.github.io/wiki-documents/tech/dev-guide)
- [API 參考](https://juxi-technology.github.io/wiki-documents/tech/api-reference)

### 專題與資源

- [機器人學習](https://juxi-technology.github.io/wiki-documents/topics/robot-learning/)
- [成功案例](https://juxi-technology.github.io/wiki-documents/cases/)
- [貢獻者社群](https://juxi-technology.github.io/wiki-documents/community/)

## 📁 專案結構

```
wiki-document/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts          # VitePress 設定
│   ├── public/                # 靜態資源（圖片等）
│   ├── tutorials/             # 產品教程（簡體中文）
│   ├── tech/                  # 技術文件
│   ├── topics/                # 技術專題
│   ├── cases/                 # 用戶成功案例
│   ├── community/             # 貢獻者社群
│   ├── en/                    # 英文版內容
│   ├── zh-HK/                 # 香港繁體版內容
│   └── index.md               # 首頁
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages 自動部署
└── package.json
```

## 🛠️ 使用指南

### 本地開發

1. **安裝相依套件**
   ```bash
   npm install
   ```

2. **啟動開發伺服器**
   ```bash
   npm run docs:dev
   ```
   訪問 `http://localhost:5173` 預覽。

3. **建置正式版本**
   ```bash
   npm run docs:build
   ```

### 在 GitHub 上管理文件

#### 新增文件（增）

**方法1：本地編輯**

1. 在 `docs/tutorials/` 或 `docs/tech/` 下建立新的 `.md` 檔案
2. 編寫內容（Markdown格式）
3. 在 `docs/.vitepress/config.ts` 的 `sidebar` 中新增連結
4. 提交並推送：
   ```bash
   git add .
   git commit -m "新增文件：[檔名]"
   git push
   ```

**方法2：GitHub 網頁介面**

1. 進入倉庫的 `docs/tutorials/` 或 `docs/tech/` 目錄
2. 點擊 "Add file" → "Create new file"
3. 檔案名稱格式：`[檔名].md"
4. 編寫內容
5. 提交變更

#### 更新文件（改）

1. 編輯對應的 `.md` 檔案
2. 提交並推送
   ```bash
   git add .
   git commit -m "更新文件：[檔名]"
   git push
   ```

#### 刪除文件（刪）

1. 刪除對應的 `.md` 檔案
2. 從 `docs/.vitepress/config.ts` 的 `sidebar` 中移除連結
3. 提交並推送
   ```bash
   git add .
   git commit -m "刪除文件：[檔名]"
   git push
   ```

#### 查看文件（查）

- 本地：`http://localhost:5173`
- 線上：`https://juxi-technology.github.io/wiki-documents/`

### 檔案格式

#### 支援的格式

- **Markdown** (.md) - 主要格式
- 圖片：.png, .jpg, .jpeg, .gif, .svg

#### Markdown 基本語法

```markdown
# 一級標題
## 二級標題
### 三級標題

**粗體文字**
*斜體文字*

- 列表項1
- 列表項2

[連結文字](連結位址)
![圖片說明](圖片路徑)

程式碼區塊：
```javascript
console.log('hello');
```
```

### 資料夾說明

#### docs/public/

存放靜態資源：

- Logo 圖片
- 產品圖片
- 圖表圖片

**命名規則：**
- logo.png (Logo)
- hero.png (首頁大圖)
- product-xxx.png (產品圖片)

#### docs/tutorials/

存放產品使用教程

#### docs/tech/

存放技術文件（API、開發指南等）

#### docs/topics/

存放技術專題內容

#### docs/cases/

存放用戶成功案例

#### docs/community/

存放貢獻者社群相關內容

#### docs/en/ 和 docs/zh-HK/

多語言版本內容，結構與主目錄相同

### 新增分類

如果需要新增新的文件分類：

1. 在 `docs/` 下建立新資料夾，如 `docs/hardware/`
2. 在資料夾內建立 `index.md` 作為入口
3. 在 `docs/.vitepress/config.ts` 的 `nav` 中新增連結：
   ```typescript
   nav: [
     { text: '硬體', link: '/hardware/' },
     // ...
   ]
   ```
4. 在 `sidebar` 中新增側邊欄設定：
   ```typescript
   sidebar: {
     '/hardware/': [
       {
         text: '硬體文件',
         items: [
           { text: '文件1', link: '/hardware/doc1' },
         ]
       }
     ]
   }
   ```

### 多語言內容管理

#### 新增語言內容

1. 在 `docs/` 下建立新資料夾，如 `docs/ja/` (日語)
2. 複製 `docs/tutorials/`、`docs/tech/` 的內容到新資料夾
3. 在 `docs/.vitepress/config.ts` 中新增設定

#### 現有語言

- 簡體中文：`docs/` (根目錄)
- English：`docs/en/`
- 繁體中文（香港）：`docs/zh-HK/`

### 部署說明

#### 自動部署

每次推送至 `main` 分支，GitHub Actions 會自動：

1. 建置網站
2. 部署到 GitHub Pages

#### 查看部署狀態

進入倉庫 → Actions → Deploy to GitHub Pages

#### 訪問位址

`https://juxi-technology.github.io/wiki-documents/`

## 📦 建置與部署

### 建置

```bash
npm run docs:build
```

### 預覽建置結果

```bash
npm run docs:preview
```

### 部署到 GitHub Pages

1. 推送程式碼到 GitHub
2. 在倉庫設定中啟用 GitHub Pages
3. 在 Settings > Pages 下：
   - Source: 選擇 `GitHub Actions`
4. 每次推送到 `main` 會自動觸發部署

## 🛠️ 技術棧

- [VitePress](https://vitepress.dev/) - 靜態網站產生器
- [GitHub Pages](https://pages.github.com/) - 主機服務
- [GitHub Actions](https://github.com/features/actions) - 自動部署

## 🔧 常見問題

### 1. 本地執行錯誤

```bash
npm install
```

重新安裝相依套件。

### 2. 頁面未更新

- 更新瀏覽器（Ctrl+Shift+R 強制更新）
- 重新啟動開發伺服器

### 3. 側邊欄未顯示

檢查 `docs/.vitepress/config.ts` 中的 `sidebar` 設定

### 4. 圖片未顯示

- 圖片放在 `docs/public/` 目錄
- 引用時用 `![圖片說明](/圖片名.png)"

## 🔗 聯絡我們

如有商業諮詢、ODM 合作或技術支援，請聯絡我們：

- 🌐 官方網站：[https://www.juxitech.com](https://www.juxitech.com/)
- 💬 回饋建議：[pe@juxitech.com](mailto:pe@juxitech.com)
- 📧 商業合作：[sales@juxitech.com](mailto:sales@juxitech.com)
- 📺 B站：[JuxiTech Bilibili](https://space.bilibili.com/3546906737248821)
- 🛒 淘寶：[JuxiTech 淘寶](https://juxitechnology.taobao.com/)
