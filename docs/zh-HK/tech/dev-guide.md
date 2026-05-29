
# 開發指南

本指南介紹如何基於 鉅犀科技 產品進行二次開發。

## 開發環境搭建

### 安裝開發工具

```bash
# 安裝 CLI 工具
npm install -g @juxi/cli

# 初始化項目
juxi init my-project
```

## 項目結構

```
my-project/
├── src/
│   ├── main.js
│   └── components/
├── docs/
└── package.json
```

## 代碼示例

```javascript
import { Device } from '@juxi/sdk'

const device = new Device()
device.connect()
```

