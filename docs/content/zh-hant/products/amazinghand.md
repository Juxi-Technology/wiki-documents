---
title: AmazingHand 開源靈巧手
description: 鉅犀科技 AmazingHand 開源仿生靈巧手——5 指多關節,TTL 總線控制,開源 CAD,具身智能與人機交互研究
keywords: [amazinghand, 靈巧手, dexterous hand, 具身智能]
---

# AmazingHand 開源靈巧手

> **[淘寶店鋪](https://juxitechnology.taobao.com)amazinghand)**

## 產品概述

AmazingHand 是鉅犀科技開源的仿生靈巧手,5 指多關節設計,支持 TTL 串行總線控制。開源 CAD 文件可自由修改手指設計,廣泛用於靈巧操作、抓取策略、人機交互研究。

**核心特性**:

- 5 指多關節,類人手比例
- TTL 串行總線控制,與主流主控兼容
- 開源 CAD/源碼,支持定制改裝
- 與 SO-ARM101 組合構建完整操作平台
- 實時手部追蹤：網絡攝像頭追蹤手勢，實時控制機械手
- 仿真演示：無需硬件即可運行手部追蹤演示（dora-rs 生態）
- 手指角度控制：可單獨控制每根手指角度，支持雙手
- 供電：舵機驅動板 5V3A，USB 連接主控

## 產品規格

| 類別 | 規格 |
|------|------|
| 類型 | 5 指多關節靈巧手 |
| 控制 | TTL 串行總線 |
| 生態 | Python SDK,ROS |
| 開源 | CAD/源碼 GitHub 公開 |

## 快速開始

```bash
git clone https://github.com/Juxi-Technology/AmazingHand.git
cd AmazingHand
pip install -r requirements.txt
python examples/basic_control.py
```

## 相關教程

- [AmazingHand 界面控制教程](/zh-hant/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [AmazingHand 官方示例運行教程](/zh-hant/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
- [AmazingHand TTL 調試教程](/zh-hant/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
