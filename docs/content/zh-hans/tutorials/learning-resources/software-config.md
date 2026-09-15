---
title: 软件配置
description: "钜犀科技产品软件配置指南：介绍系统环境要求、仓库克隆与依赖安装步骤以及配置文件修改方法。"
---


# 软件配置

本章节介绍产品的软件配置方法。

## 系统要求

- Node.js 18+
- Python 3.10+
- Git

## 安装步骤

```bash
# 克隆仓库
git clone https://github.com/Juxi-Technology/your-repo.git

# 进入目录
cd your-repo

# 安装依赖
npm install
```

## 配置文件

编辑 `config.json` 来修改网站配置：

```json
{
  "port": 3000,
  "language": "zh-CN"
}
```
