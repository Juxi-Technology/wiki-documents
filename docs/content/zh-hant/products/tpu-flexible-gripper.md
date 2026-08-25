---
title: SO-ARM101 TPU 柔性夾爪
description: 鉅犀科技 SO-ARM101 TPU 柔性夾爪——軟 TPU 材質安全抓取不規則/易碎物品,支持臂載相機,可選 30FPS 變焦或 60FPS 定焦
keywords: [gripper, 夾爪, tpu, 柔性, so-arm101, 抓取]
---

# SO-ARM101 TPU 柔性夾爪

> **[淘寶店鋪](https://juxitechnology.taobao.com)**

## 產品概述

這款 SO-ARM101 TPU 柔性夾爪專為 XLerobot 機械臂設計,支持安裝 SO-ARM101 臂載相機支架/套件。採用柔軟的 **TPU 材質**,非常適合抓取不規則和易碎物品而不造成損壞;配合可選相機配置(變焦 30FPS / 定焦 60FPS),滿足機器人抓取開發與視覺引導應用。

**核心特性**:

- 直接安裝到 XLerobot 機械臂,無需額外修改
- 軟 TPU:柔韌、耐磨、防滑,安全抓取易碎/不規則物品
- 兼容 SO-ARM101 臂載相機支架/套件(視覺引導抓取)
- 螺絲直連固定,即插即用

---

## 產品規格

| 類別 | 規格 |
|------|------|
| 兼容機械臂 | SO-ARM101(XLerobot 系列) |
| 材質 | 軟 TPU(熱塑性聚氨酯) |
| 驅動方式 | 舵機驅動 |
| 可選相機 | 變焦 30FPS / 定焦 60FPS |
| 安裝方式 | 螺絲直連固定,即插即用 |

## 套件內容

| 套件 | 內容 |
|------|------|
| **基礎夾爪** | 1× TPU 柔性夾爪 |
| **變焦相機套件** | 夾爪 + 30FPS 自動對焦變焦相機 |
| **定焦相機套件** | 夾爪 + 60FPS 定焦相機 |

---

## 快速開始

1. 將夾爪螺絲孔與機械臂末端對齊
2. 螺絲直連固定(無需接線改動)
3. 如需視覺引導,加裝 SO-ARM101 臂載相機支架

### 視覺抓取開發

配合臂載相機與 LeRobot 框架:

```bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0} }' \
  --dataset.repo_id=juxi/gripper_test \
  --dataset.num_episodes=50
```

---

## 常見問題

**Q: 為什麼不規則/易碎物品也能抓?**
TPU 柔性材質會自適應物體形狀,受力均勻,有效避免損壞被夾持物體。

**Q: 如何選相機?**
- 變焦 30FPS:焦距靈活,適合變距視覺應用
- 定焦 60FPS:高幀率,適合快速運動捕捉

**Q: 支持哪些平台?**
SO-ARM101 / XLerobot 機械臂系列,與 ACT、Smolvla、Pi0 等 LeRobot 訓練框架兼容。

---

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [問題反饋](https://github.com/Juxi-Technology/wiki-documents/issues)
