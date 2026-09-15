---
title: 開発ガイド
description: "JUXI 製品をベースにした二次開発ガイド。開発環境の構築手順、プロジェクト構造、コード例を順に解説します。"
---

# 開発ガイド

本ガイドでは、JUXI 製品をベースに二次開発する方法を紹介します。

## 開発環境の構築

### 開発ツールのインストール

```bash
# CLI ツールのインストール
npm install -g @juxi/cli
# プロジェクトの初期化
juxi init my-project
```

## プロジェクト構造

```
my-project/
├── src/
│   ├── main.js
│   └── components/
├── docs/
└── package.json
```

## コード例

```javascript
import { Device } from '@juxi/sdk'
const device = new Device()
device.connect()
```
