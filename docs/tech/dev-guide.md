
# 开发指南

本指南介绍如何基于 Juxi Technology 产品进行二次开发。

## 开发环境搭建

### 安装开发工具

```bash
# 安装 CLI 工具
npm install -g @juxi/cli

# 初始化项目
juxi init my-project
```

## 项目结构

```
my-project/
├── src/
│   ├── main.js
│   └── components/
├── docs/
└── package.json
```

## 代码示例

```javascript
import { Device } from '@juxi/sdk'

const device = new Device()
device.connect()
```
