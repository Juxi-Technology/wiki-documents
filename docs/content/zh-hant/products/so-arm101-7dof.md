---
title: SO-ARM101 開源七自由度機械臂
category: robot
description: "鉅犀科技 SO-ARM101 開源七自由度機械臂——90° 腕部滾轉、12V 30kg.cm 總線舵機、深度集成 LeRobot、工廠組裝並附完整教程系列"
keywords: [so-arm101, 7-dof, 7軸, 機械臂, leRobot, 遙操作, 模仿學習]
---

# SO-ARM101 開源七自由度機械臂

> **[商店購買](https://www.juxitech.com/products/so-arm101-open-source-7-dof-robotic-arm)**

## 產品概述

SO-ARM101 是在 SO-ARM100 基礎上進行深度優化的開源機械臂。改進後的線纜佈線與電機/齒輪搭配消除了關節線纜斷裂的問題，性能升級支持實時主從跟隨。**這是 7 自由度版本**：它在 6 軸模型基礎上增加了一個腕部滾轉（偏航）舵機，使得腕部具有更大的姿態自由度、更多的可達點與多角度精確抓取能力。

它完美適配 Hugging Face **LeRobot** 工具包，並直接連接 PyTorch 模型與共享數據集，使得模仿學習與強化學習易於實踐。產品包含完整的組裝教程與 DIY 套件——學生、研究人員與創客都可以使用智能機器人進行學習、研究與創造。

**一覽**：7 自由度，90° 腕部滾轉 · 12V 30kg.cm 高扭矩舵機 · 可選 TPU 柔性夾爪 · 雙視角數據採集 · NVIDIA 與 D-Robotics RDK 板載推理 · 工廠組裝，開箱即用 · 支持 ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5 模型訓練。

## 主要優勢

### 7 自由度，90° 腕部滾轉

7 自由度版本在 6 軸設計上增加了左/右腕部滾轉（偏航）舵機，因此腕部可以從更多角度接近目標，並覆蓋工作空間內的更多點。這種額外的自由度使得多角度、精細抓取成為可能。

### 主從遙操作與模仿學習

機械臂集成了 Hugging Face AI 框架。遙操作主動臂錄製演示動作，然後一次性訓練模仿學習模型並部署優化後的策略。它能夠執行複雜任務並適應環境，實現端到端的自動化閉環。

### 雙視角全局覆蓋

SO-ARM101 臂載攝像頭近距離捕捉目標的空間位置、角度與表面紋理，以實現更高保真度的數據採集，而桌面場景攝像頭則實時讀取工作空間環境。兩者協同工作，確保操作精確，快速響應變化，並防止漂移或停滯。

### 30kg.cm 高扭矩 12V 總線舵機

從動臂統一採用 7 個 Feetech STS3215-C018（12V，30kg.cm，1:345），以確保在多軸負載下有足夠的抓取扭矩，而主動臂保持 7.4V 以平衡手感與成本。12 位磁編碼器在每個軸上提供 0.088° 的精度。

### 多模型訓練支持

在同一硬件上訓練與部署 ACT、SmolVLA、Pi0、Pi0.5 與 GR00T N1.5 策略，並直接從 LeRobot 模型中心復用 `lerobot/smolvla_base`、`lerobot/pi0_base`、`lerobot/pi05_base` 與 `lerobot/xvla-widowx` 等預訓練模型。

### NVIDIA 與 D-Robotics RDK 板載推理

只需一根線纜連接樹莓派、D-Robotics RDK 或 NVIDIA Jetson 控制器，即可在機械臂上進行推理，並獲得實時電機控制與編碼器反饋。

### 工廠組裝，開箱即用

每台設備均已組裝、接線與校準——連接電源與 USB，即可用於遙操作與數據採集。

### 可升級柔性夾爪

柔性夾爪是標準剛性夾爪的升級版，採用柔性 TPU 材料 3D 列印。它採用中空設計，內部有加強筋，並基於鰭型夾爪原理工作：它能適應被抓取物體的形狀，減少施加在其上的接觸力——非常適合抓取傳統剛性夾爪無法安全處理的柔軟或易損壞物品（水果、玻璃器皿、雞蛋、食品加工）。

## 產品規格

| 類別 | 規格 |
|----------|------|
| 類型 | 主從遙操作機械臂 |
| 自由度 | 7（在 6 軸模型基礎上增加腕部滾轉/偏航軸） |
| 從動臂舵機 | 7 × Feetech STS3215-C018（12V，30kg.cm，1:345） |
| 主動臂舵機 | 7 × 7.4V STS3215——阻尼版：1 × C001（1:345）+ 2 × C044（1:191）+ 3 × C046（1:147）；零阻尼版：7 × C066 |
| 編碼器 | 12 位磁編碼器（0.088° 精度） |
| 電源 | 主動臂 5V6A / 從動臂 12V5A |
| 主控 | PC（Linux）/ 樹莓派 / D-Robotics RDK / NVIDIA Jetson |
| 生態 | Hugging Face LeRobot（ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5） |
| 夾爪 | 剛性 PLA（標配）或柔性 TPU（升級） |
| 組裝 | 工廠組裝、接線並校準 |

*舵機佈局與可選套餐配置見商店頁面。*

## 相關教程

- **[SO-ARM101 7 自由度完整課程](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/)**——環境搭建、7DOF 文件替換、校準、遙操作、數據採集、訓練與推理，逐步講解
- [替換文件（讓官方 lerobot 克隆適配 7DOF）](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- [SO-ARM101 使用教程（6 軸）](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [機械臂選型指南](/zh-hant/tutorials/robot-arms/select-guide)
- [具身智能入門（LeRobot）](/zh-hant/topics/embodied-ai-intro)

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
