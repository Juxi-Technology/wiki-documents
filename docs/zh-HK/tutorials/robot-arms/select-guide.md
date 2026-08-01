---
title: 機械臂選型指南
description: SO-ARM101 vs AmazingHand vs Lekiwi 機械臂對比與選型建議
---

# 機械臂選型指南

鉅犀科技提供多款機械臂產品，分別面向不同的應用場景。本文檔幫助你快速對比並選擇適合的型號。

> 註：具體參數以各產品官方文檔為準，本表用於選型參考。

## 三款機械臂對比

| 特性 | SO-ARM101 | AmazingHand | Lekiwi |
|------|-----------|-------------|--------|
| **類型** | 雙臂遙操作機器人 | 靈巧手 | 低成本教學機械臂 |
| **自由度** | 雙臂各 6 DOF | 5 指多關節 | 6 DOF |
| **控制方式** | LeRobot 生態 / Python API | TTL 串行總線 | 舵機控制 |
| **主控平台** | PC(Linux) / Jetson | 主控板 | PC / 單片機 |
| **適用場景** | AI 模仿學習、遙操作研究 | 抓取操作、手勢複現 | 教學、入門學習 |
| **開源生態** | [LeRobot](https://github.com/Juxi-Technology/lerobot) | [AmazingHand](https://github.com/Juxi-Technology/AmazingHand) | 官方文檔 |
| **適合人群** | 研究者、AI 開發者 | 機器人操作研究者 | 學生、愛好者 |

## 如何選擇？

### 🎓 學生 / 教學入門 → Lekiwi

- 結構簡單、成本低，適合課堂教學和入門學習
- 舵機控制方式直觀，上手快

### 🤖 抓取與操作研究 → AmazingHand

- 5 指靈巧手，適合抓取策略、手勢控制研究
- TTL 串行總線控制，與主流主控兼容

### 🧠 AI 模仿學習 / 遙操作 → SO-ARM101

- 雙臂設計，支持 leader-follower 遙操作
- 深度集成 LeRobot 生態，適合模仿學習研究
- 支持 Jetson 平台，與 AI 工作流無縫銜接

## 組合推薦

| 需求 | 推薦組合 |
|------|---------|
| AI 遙操作研究 | SO-ARM101 + AmazingHand(靈巧手操作) |
| 教學實驗室 | Lekiwi × N(批量部署) |
| 完整機器人系統 | SO-ARM101 + IMU 模組 + 視覺配件 |

## 相關教程

- [SO-ARM101 使用教程](/zh-HK/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [AmazingHand 界面控制教程](/zh-HK/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Lekiwi 使用教程](/zh-HK/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial)

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
