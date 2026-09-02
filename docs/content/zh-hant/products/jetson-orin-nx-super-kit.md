---
title: Jetson Orin NX Super 開發套件
description: 鉅犀科技 NVIDIA Jetson Orin NX SUPER 開發套件——117/157 TOPS 邊緣 AI 計算平台,預裝 Ubuntu 22.04 與 256GB NVMe SSD
keywords: [jetson, orin nx, edge ai, 邊緣計算, leRobot, 機器人]
---

# Jetson Orin NX Super 開發套件

> **[淘寶店鋪](https://juxitechnology.taobao.com)**

## 產品概述

NVIDIA Jetson Orin NX SUPER 開發套件是一款高性能邊緣 AI 計算平台,專為高級機器人開發者、生成式 AI 研究員和嵌入式系統工程師打造。它採用 Jetson Orin NX SUPER 模組,提供高達 **117 TOPS (8GB) / 157 TOPS (16GB)** 的 AI 性能——比初代 Jetson Nano 快 234 倍 / 314 倍。

開箱即用,無需單獨購買存儲或安裝系統:

- 預裝 **Ubuntu 22.04**
- 預配置 **256GB NVMe PCIe 3.0 x4 SSD**(讀取速度高達 2800MB/s)
- 2.4G/5G 雙頻 WiFi 5 + 藍牙 5.0(4dBi 高增益天線)
- PWM 控制滾珠軸承風扇(50,000 小時壽命)
- 亞克力外殼,預留攝像頭支架安裝孔位

**適用場景**:大語言模型邊緣部署、高級計算機視覺、LeRobot SO-ARM 機器人開發。

---

## 產品規格

| 類別 | 規格 |
|------|------|
| 核心模組 | NVIDIA Jetson Orin NX SUPER |
| AI 性能 | 117 TOPS(8GB 版本)/ 157 TOPS(16GB 版本) |
| CPU | 6 核 NVIDIA Carmel ARMv8.2 @ 2.0GHz |
| GPU | NVIDIA Ampere 架構,1792 CUDA 核心 + 56 Tensor 核心 + 2 NVDLA 引擎 |
| 記憶體 | 8GB / 16GB LPDDR5(102.4 GB/s) |
| 存儲 | 256GB NVMe PCIe 3.0 x4 SSD(讀取高達 2800MB/s) |
| 無線連接 | 2.4G/5G 雙頻 WiFi 5 + 藍牙 5.0,4dBi 高增益雙天線 |
| 散熱 | PWM 滾珠軸承風扇(50,000 小時)+ 鋁製散熱器 |
| 顯示輸出 | DP 1.4,最高 4K@60Hz (H.265) |
| 接口 | 4× USB 3.2、DP 4K60Hz、40 引腳 GPIO 排針 |
| 系統 | 預裝 Ubuntu 22.04 |

## 硬件連接

### 快速開始

1. 連接電源適配器(19V 40W)
2. 將 DP 轉 HDMI 線連接顯示器
3. 連接鍵盤滑鼠(USB 3.2 接口)
4. 開機進入預裝的 Ubuntu 22.04

### 攝像頭安裝

亞克力外殼預留攝像頭支架安裝孔位,支持雙攝像頭安裝(CSI / USB)。

---

## 軟件配置

### 確認 PyTorch GPU 可用

```python
import torch
print(torch.cuda.is_available())  # 應輸出 True
```

### 安裝 LeRobot(SO-ARM100/101 開發)

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"
```

### 參考

- [Jetson Orin 上 PyTorch 不相容問題](/zh-hant/tutorials/learning-resources/jetson-orin-pytorch-compatibility)
- [SO-ARM101 使用教程](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)

---

## 套件變體

| 套件類型 | 附加組件 | 適用場景 |
|---------|---------|---------|
| **標準套件** | 主板 + 亞克力外殼 + 256GB SSD + WiFi/BT + 天線 + 19V 40W 電源 + DP轉HDMI線 + Type-C線 + 螺絲刀 | 通用高性能 AI 開發 |
| **OLED 顯示套件** | + 0.91 英寸 OLED 狀態顯示屏 | 實時監控系統資源 |
| **USB 音頻套件** | + USB 聲卡(揚聲器 + 麥克風,降噪/回聲消除) | 語音交互、LLM 語音助手 |
| **IMX219 攝像頭套件** | + IMX219 CSI 攝像頭(77° FOV,8MP)+ 鋁製可調支架 | 原生 CSI 視覺 |
| **自動對焦攝像頭套件** | + 86° 自動對焦 USB 攝像頭(1080P)+ 鋁製可調支架 | 通用視覺、機械臂 |
| **SO-ARM100/101 機器人套件** | + USB 3.0 HUB + 自動對焦攝像頭 + 專用安裝支架 | 機械臂視覺開發 |

## 版本選擇

| 版本 | AI 性能 | 推薦場景 |
|------|---------|---------|
| **8GB** | 117 TOPS | 高級 AI 開發、中端機器人項目、LLM 邊緣部署 |
| **16GB** | 157 TOPS | 高性能具身智能、大型模型邊緣推理、複雜視覺任務 |

---

## 常見問題

**Q: 相比標準 Orin NX 快多少?**

快 1.7 倍(SUPER 版本優化)。

**Q: 需要自己裝系統嗎?**

不需要。已預裝 Ubuntu 22.04 和 256GB SSD,通電即用。

**Q: 支持 SO-ARM101 嗎?**

完全兼容。配套有專用機器人視覺套件(攝像頭 + 支架),與 LeRobot 生態無縫銜接。

**Q: 散熱噪音如何?**

PWM 滾珠軸承風扇,40W 滿載下性能穩定且噪音低,壽命 50,000 小時(比液壓風扇耐用 10 倍)。

---

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [問題反饋](https://github.com/Juxi-Technology/wiki-documents/issues)
