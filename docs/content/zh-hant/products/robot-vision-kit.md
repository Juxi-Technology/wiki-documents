---
title: SO-ARM101 機械臂視覺套件
category: robot
description: "鉅犀科技 SO-ARM101 機械臂視覺套件:腕部、側方、俯視三種視角安裝,可選 60FPS 定焦或 30FPS 自動對焦變焦相機,兼容主流具身智能訓練框架。"
keywords: [camera mount, 視覺套件, 相機支架, so-arm101, 機械臂視覺]
---

# SO-ARM101 機械臂視覺套件

> **[淘寶購買](https://item.taobao.com/item.htm?id=912105917442)**

## 產品概述

SO-ARM101 機械臂視覺套件是專為機械臂設計的相機配件,提供雙相機選擇:**60FPS 定焦**和**30FPS 自動對焦變焦**。支持 SO-ARM101、LeKiwi 和 XLerobot 平台,兼容 **ACT、Smolvla、Pi0、Pi0.5、GR00T N1.5** 等主流具身智能訓練框架。

**核心特性**:

- 三種安裝位置:**腕部 / 側方 / 俯視**
- 雙相機選擇:60FPS 定焦(快速運動捕捉)/ 30FPS 自動對焦變焦(靈活視覺開發)
- 與 SO-ARM101 完美匹配,無需額外修改
- 附贈防滑夾持墊

---

## 產品規格

| 類別 | 規格 |
|------|------|
| 兼容平台 | SO-ARM101、LeKiwi、XLerobot、M3 安裝孔兼容平台 |
| 安裝位置 | 腕部 / 側方 / 俯視 |
| 相機選擇 | 60FPS 定焦 / 30FPS 自動對焦變焦 |
| 訓練框架兼容 | ACT、Smolvla、Pi0、Pi0.5、GR00T N1.5 |

## 相機對比

| 相機 | 適用場景 |
|------|---------|
| **60FPS 定焦** | 高幀率,成像穩定清晰,快速運動捕捉、固定距離視覺 |
| **30FPS 自動對焦變焦** | 焦距調節靈活,變距視覺應用場景 |

---

## 快速開始

### 1. 選擇安裝位置

- **腕部**:抓取操作視角(推薦抓取任務)
- **側方**:全局環境視角
- **俯視**:桌面操作俯視視角(適合數據採集)

### 2. 安裝

將相機模組固定到對應支架,通過 USB 連接主控(Jetson/樹莓派)。

### 3. 訓練框架集成

```bash
# 查找相機
python -m lerobot.find_cameras

# 採集帶視覺數據
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0, width: 640, height: 480} }' \
  --dataset.repo_id=juxi/vision_test \
  --dataset.num_episodes=50
```

---

## 常見問題

**Q: 怎麼選相機?**

**A:** 快速運動捕捉(如抓取)選 60FPS 定焦;變距視覺開發選 30FPS 自動對焦變焦。

**Q: 支持哪些訓練框架?**

**A:** ACT、Smolvla、Pi0、Pi0.5、GR00T N1.5,全面覆蓋主流具身智能模型訓練框架。

**Q: 其他機械臂能用嗎?**

**A:** SO-ARM101、LeKiwi、XLerobot 及其他帶 M3 安裝孔的兼容平台。

---

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [問題反饋](https://github.com/Juxi-Technology/wiki-documents/issues)
