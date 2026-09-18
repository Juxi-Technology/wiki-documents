---
title: SO-ARM101 開發套件
category: robot
description: "鉅犀科技 SO-ARM101 雙臂機器人開發套件——6 DOF 開源機械臂,LeRobot 生態,遙操作/模仿學習/AI 研究首選"
keywords: [so-arm101, 機械臂, leRobot, 遙操作, 雙臂機器人]
---

# SO-ARM101 開發套件

> **[淘寶購買](https://item.taobao.com/item.htm?id=1002551208989)**

## 產品概述

SO-ARM101 是鉅犀科技開源的 6-DOF 雙臂機器人開發套件,深度集成 **LeRobot** 生態,支持 leader-follower 遙操作、模仿學習數據採集與策略訓練。黑色主動臂(leader)+ 白色從動臂(follower),開箱即用。

**核心特性**:

- 雙臂各 6 DOF,總線舵機驅動
- 深度兼容 LeRobot(HuggingFace),支持 ACT/Diffusion/Pi0 等策略
- 支持 Jetson / PC(Linux)平台
- 完整硬件開源(原理圖/CAD/固件)

## 一、硬件設計：高性能模組化，易組裝可定製

- **結構材質**：核心結構採用 3D 列印件與加固承重部件結合，優化走線與關節設計，避免運動干涉，兼顧輕量化與耐用性，使用者可自行列印替換或擴展結構件。

- **驅動配置**：從動臂搭載**6 個 12V 30KG 大扭矩磁編碼舵機**，配合 360° 磁編碼反饋與 PID 控制算法，運動絲滑無抖動，重複定位精度高，動力強勁且動作精準；主動臂則採用**6 個 7.4V 舵機**，按關節負載分配不同減速比，便於手動拖拽示教。

- **視覺系統**：支援雙攝智能視覺系統，末端攝像頭捕捉近距離抓取細節，全局攝像頭覆蓋作業環境，雙攝數據融合構建立體模型，為模仿學習提供豐富的數據支撐。

- **控制連接**：配備舵機驅動板，通過 USB-C 接口直連電腦或樹莓派，即插即用，簡化硬件連接流程，快速搭建控制環境。

## 二、軟件生態：深度集成 LeRobot，AI 開發零門檻

- **核心框架兼容**：深度適配 Hugging Face **LeRobot 開源機器人 ML 框架**，基於 PyTorch 構建，內置預訓練模型、多場景數據集及仿真環境，兼容 Stanford ALOHA 等知名開源數據集。

- **低延遲通信**：採用**DORA 分佈式數據流引擎**，實現硬件與算法的低延遲交互，Python 運行性能較 ROS2 快 17 倍，支援代碼熱重載，無需重啟即可實時調整策略。

- **全棧開源**：硬件 3D 列印檔案、軟件控制代碼、AI 訓練腳本及全套教程**完全開源**，使用者可自由修改、二次開發，快速實現個性化功能擴展。

## 三、核心應用場景：從入門到落地，全場景適配

1. **機器人教育入門**：提供從機械臂組裝、基礎編程到 AI 策略部署的全流程教程，配套可視化操作介面與案例代碼，零基礎使用者可快速掌握機器人控制與 AI 應用技能。

2. **科研算法驗證**：專注**模仿學習、強化學習**研究，支援通過 VR 錄製人類操作數據訓練機器人；典型案例：基於 50 段 15 秒操作影片，2 小時訓練即可掌握疊衣、插鑰匙、物料分揀等任務。

3. **輕量工業原型**：低成本驗證自動化方案，適配**物料搬運、精密裝配、零件分揀**等場景，以千元級成本實現工業級機械臂的核心功能，快速落地原型驗證。

## 產品規格

| 類別 | 規格 |
|------|------|
| 類型 | 雙臂遙操作機器人 |
| 自由度 | 雙臂各 6 DOF |
| 驅動 | Feetech 總線舵機 |
| 主控 | PC(Linux)/ Jetson |
| 生態 | LeRobot,ROS 2,ROS 1 |
| 電源 | 主動臂 5V6A / 從動臂 12V5A |
| 負載 | 500g |
| 重複定位精度 | ±0.1mm |
| 工作半徑 | 520mm |
| 通信方式 | USB-C |
| 材質 | 拓竹 PLA+ |
| 尺寸(主動臂 / 從動臂) | 111×239×525 mm / 111×173×532 mm |

![主動臂與從動臂尺寸圖](../../../public/images/products/so-arm101/dimensions.jpg)

## 快速開始

```bash
# 安裝環境
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

# 校準
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 遙操作
lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## 相關教程

- [SO-ARM101 使用教程](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [SO-ARM101 組裝教程](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [機械臂選型指南](/zh-hant/tutorials/robot-arms/select-guide)
- [具身智能入門(LeRobot)](/zh-hant/topics/embodied-ai-intro)

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
