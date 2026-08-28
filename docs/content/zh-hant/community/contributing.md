---
title: 貢獻指南
description: 如何為鉅犀科技 Wiki 貢獻內容
---

# 貢獻指南

感謝你考慮為鉅犀科技 Wiki 做貢獻！本文檔將引導你完成貢獻流程。

## 準備工作

1. **Fork** [wiki-documents 倉庫](https://github.com/Juxi-Technology/wiki-documents)
2. 克隆你的 Fork 到本地
3. 安裝依賴：

```bash
cd wiki-documents
npm ci
```

4. 啟動本地開發伺服器預覽：

```bash
npm run docs:dev
```

瀏覽器訪問 `http://localhost:5173` 即可預覽你的修改。

## 貢獻方式

### 修正文檔錯誤

發現錯別字、錯誤連結、過時資訊？直接提交 Pull Request 到 `main` 分支。

### 新增教程

如果你有使用鉅犀科技產品的教程想要分享：

1. 先在 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues) 中提一個 Proposal，說明教程主題和大致內容
2. 待維護者確認後，參照現有教程結構編寫
3. 提交 PR

### 翻譯貢獻

項目支援 9 種語言：英文為 root 主目錄（無前綴），其餘語言位於子目錄：`zh-hans/`、`zh-hant/`、`ja/`、`ko/`、`de/`、`fr/`、`es/`、`it/`。翻譯遵循以下規則：

- 每個 `.md` 檔案在三語目錄中應有對應檔案
- 圖片共用 `docs/public/images/` 下的資源
- 保持各語言版本的連結指向對應語言路徑

## 內容規範

### 圖片

- 存放路徑：`docs/public/images/tutorials/{產品名}/{教程名}/`
- 命名規則：按序號或描述性命名（如 `1.png`，`wiring-diagram.png`）
- 在教程中使用相對路徑引用：

```markdown
![描述](../../../public/images/tutorials/xxx/xxx.png)
```

### 檔案命名

- 教程檔案使用英文命名，kebab-case 風格
- 每個 `.md` 檔案需要有 `title` 和 `description` frontmatter

### 程式碼區塊

- 必須標註語言類型
- 確保命令可正確執行

## PR 流程

1. 確保本地構建通過：`npm run docs:build`
2. 填寫 Pull Request 模板中的所有內容
3. CI 構建通過後，至少 1 位維護者批准方可合併
4. PR 合併後，GitHub Actions 自動部署到線上

## 行為準則

- 尊重所有貢獻者和使用者
- 提供客觀、準確的技術內容
- 不提交未經測試的程式碼或命令

感謝你的貢獻！🎉
