---
title: 贡献指南
description: 如何为钜犀科技 Wiki 贡献内容
---

# 贡献指南

感谢你考虑为钜犀科技 Wiki 做贡献！本文档将引导你完成贡献流程。

## 准备工作

1. **Fork** [wiki-documents 仓库](https://github.com/Juxi-Technology/wiki-documents)
2. 克隆你的 Fork 到本地
3. 安装依赖：

```bash
cd wiki-documents
npm ci
```

4. 启动本地开发服务器预览：

```bash
npm run docs:dev
```

浏览器访问 `http://localhost:5173` 即可预览你的修改。

## 贡献方式

### 修正文档错误

发现错别字、错误链接、过时信息？直接提交 Pull Request 到 `main` 分支。

### 新增教程

如果你有使用钜犀科技产品的教程想要分享：

1. 先在 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues) 中提一个 Proposal，说明教程主题和大致内容
2. 待维护者确认后，参照现有教程结构编写
3. 提交 PR

### 翻译贡献

项目支持三语：简体中文 (root)、English (`/en/`)、繁體中文 (`/zh-HK/`)。翻译遵循以下规则：

- 每个 `.md` 文件在三语目录中应有对应文件
- 图片共用 `docs/public/images/` 下的资源
- 保持各语言版本的链接指向对应语言路径

## 内容规范

### 图片

- 存放路径：`docs/public/images/tutorials/{产品名}/{教程名}/`
- 命名规则：按序号或描述性命名（如 `1.png`，`wiring-diagram.png`）
- 在教程中使用相对路径引用：

```markdown
![描述](../../../../public/images/tutorials/xxx/xxx.png)
```

### 文件命名

- 教程文件使用英文命名，kebab-case 风格
- 每个 `.md` 文件需要有 `title` 和 `description` frontmatter

### 代码块

- 必须标注语言类型
- 确保命令可正确运行

## PR 流程

1. 确保本地构建通过：`npm run docs:build`
2. 填写 Pull Request 模板中的所有内容
3. CI 构建通过后，至少 1 位维护者批准方可合并
4. PR 合并后，GitHub Actions 自动部署到线上

## 行为准则

- 尊重所有贡献者和用户
- 提供客观、准确的技术内容
- 不提交未经测试的代码或命令

感谢你的贡献！🎉
