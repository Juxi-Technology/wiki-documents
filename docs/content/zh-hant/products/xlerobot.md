---
title: XLeRobot 雙臂移動機器人
category: robot
description: 鉅犀科技 XLeRobot 雙臂移動機器人——SO-ARM101 雙臂 + 全向輪底盤 + 相機塔,雙伺服馬達驅動板 12V 供電,LeRobot 生態,支援成品/散件兩種形態
keywords: [xlerobot, 雙臂機器人, 移動機器人, 具身智能, lerobot, so-arm101, 全向輪底盤]
---

# XLeRobot 雙臂移動機器人

> **[淘寶購買](https://item.taobao.com/item.htm?id=1045195950187)**

## 產品概述

XLeRobot 是一款雙臂移動機器人平台:以全向輪(萬向輪)底盤車為移動底座,透過相機塔承載兩個 SO-ARM101 從動機械臂,配合雙伺服馬達驅動板、樹莓派/Jetson 主控與 PD 行動電源,構成可以移動操作的開源機器人,面向具身智能研究、家務操作與 LeRobot 生態開發。

**核心特性**:

- 雙臂操作 + 全向移動底盤,可移動抓取多種家庭物品
- 基於 SO-ARM101 機械臂,採用飛特 STS3215-C018 匯流排伺服馬達
- 相機塔 + 手腕相機,支援資料收集與模仿學習
- 雙伺服馬達驅動板獨立驅動雙臂與底盤,12V 供電
- 完整 LeRobot 軟體生態:環境建立、資料收集、訓練與推論
- 提供成品組裝與散件組裝兩種形態,散件附完整配件清單
- 相容 Lekiwi 底座(已有 Lekiwi 可直接沿用輪式底座)

---

## 產品規格

| 類別 | 規格 |
|------|------|
| 機械臂 | SO-ARM101 從動臂 ×2(飛特 STS3215-C018 匯流排伺服馬達,ID 1-6) |
| 底盤 | 全向輪(萬向輪)底盤車,3 個 STS3215-C018 伺服馬達(ID 7/8/9) |
| 相機塔 | 相機塔底座 + 2 個 STS3215-C018 伺服馬達(ID 7/8)+ 攝像頭 |
| 驅動 | 伺服馬達驅動板 ×2(USB-C 轉 USB-A 資料線連接主控;PD 轉 DC12V3A 電源線) |
| 供電 | PD 行動電源 12V 版本(單口最高 100W,經測試足以支援運行) |
| 主控 | 樹莓派(需自備)/ Jetson |
| 連接線 | 90CM 伺服馬達延長線 ×2(底盤車與相機塔 → 伺服馬達驅動板) |
| 整機重量 | 約 12kg(完全組裝後) |
| 軟體 | LeRobot 生態;伺服馬達配置使用 Bambot(Windows / macOS / Linux) |

---

## 快速開始

### 1. 建立 LeRobot 環境

按作業系統選擇環境建立教程(macOS / Ubuntu / Windows),安裝 LeRobot 與相依套件。

### 2. 移動 XLeRobot 文件

將 XLeRobot 文件移動到對應資料夾,完成軟體準備工作。

### 3. 組裝機器人

- **成品組裝**:按配件清單直接安裝底盤車、相機塔底座、雙臂與接線
- **散件組裝**:先配置伺服馬達(用 [Bambot](https://bambot.org/feetech.js) 掃描並重新命名 ID),再依次組裝推車、輪式底座、機械手臂底座與接線,最後放置電池

散件組裝建議最後連接電源線纜;在插拔其他線纜時保持電源斷開,以保護伺服馬達驅動板。

---

## 完整教程

- [XLeRobot 教程總覽](/zh-hant/tutorials/robot-arms/xlerobot/)
- [安裝環境(macOS)](/zh-hant/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS)
- [安裝環境(Ubuntu)](/zh-hant/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu)
- [安裝環境(Windows)](/zh-hant/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows)
- [移動 XLeRobot 文件](/zh-hant/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files)
- [成品組裝教程](/zh-hant/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit)
- [散件組裝教程](/zh-hant/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit)

---

## 應用場景

- 具身智能與模仿學習研究(家務操作、物品抓取)
- 雙臂移動操作演算法開發(LeRobot 生態)
- 機器人教學與競賽
- 家庭服務機器人原型驗證

---

## 常見問題

**Q: 成品和散件有什麼差異?**

**A:** 成品為按配件清單裝配好的套件;散件需要自行組裝,並先用 Bambot 工具配置伺服馬達 ID(機械臂 1-6,底盤 7/8/9,相機塔 7/8)。

**Q: 還需要自備哪些部件?**

**A:** 行動電源、樹莓派以及 PD 5V5A 樹莓派電源線需自行購買(教程中已註明)。

**Q: 伺服馬達 ID 怎麼配置?**

**A:** 連接伺服馬達與伺服馬達驅動板到電腦後,使用 [Bambot 伺服馬達配置頁面](https://bambot.org/feetech.js)掃描並重新命名伺服馬達 ID;官方 LeRobot 程式碼庫暫不支援機械臂以外的伺服馬達配置,故使用 Bambot 代替。

**Q: 組裝完成後可以直接推著移動嗎?**

**A:** 不可以。完全組裝後請勿像推車一樣推著走,這可能損壞伺服馬達齒輪;需要手動移動時請抬起機器人(約 12kg)。

---

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [問題反饋](https://github.com/Juxi-Technology/wiki-documents/issues)
