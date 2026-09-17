---
title: ESP32-S3 WiFi 視頻模組
category: compute-vision
description: "鉅犀科技 ESP32-S3 WiFi 圖傳模組——200 萬像素攝像頭,WiFi 實時圖傳,AI 視覺識別(顏色/人臉/二維碼),AP+STA 雙模式"
keywords: [esp32, wifi, 圖傳, 攝像頭, ai vision]
---

# ESP32-S3 WiFi 視頻模組

> **[淘寶購買](https://item.taobao.com/item.htm?id=1060833276782)**

## 產品概述

ESP32-WiFi 圖傳模組（型號 **ESP32-NanoCam**）是一款緊湊、高性價比的 AI 視覺解決方案,採用雙板模塊化架構(核心處理板 + 通信擴展板)。核心板搭載 **ESP32-S3** 高性能處理器與 200 萬像素高清攝像頭,支持 WiFi 視頻流傳輸、AI 視覺識別與語音交互功能,預裝固件開箱即用。

**核心特性**:

- 200 萬像素高清攝像頭(1600×1200@30FPS)
- **AP + STA 雙模式** WiFi 實時圖傳
- 8 種 AI 模式:貓臉檢測、人臉檢測、顏色識別、人臉識別、二維碼掃描、LLM 語音對話(小智 AI)、ESP-Claw 語音控制
- 板載 ES8311 音頻(麥克風 + 揚聲器),支援語音交互
- WS2812 RGB 狀態燈
- Type-C 一鍵固件升級
- 標準 PH2.0 I2C / UART 通信接口

---

## 產品規格

| 類別 | 規格 |
|------|------|
| 主控芯片 | ESP32-S3 N16R8(樂鑫官方,雙核 240MHz) |
| 存儲 | 16MB Flash + 8MB PSRAM |
| 攝像頭 | 200 萬像素 CMOS GC2145(1600×1200@30FPS) |
| 視角 | 對角線 68°,水平 49.5° |
| 音頻 | ES8311 編解碼 + MEMS 麥克風 + D 類功放揚聲器 |
| 狀態燈 | WS2812 RGB |
| 無線 | WiFi AP/STA + 高增益天線 |
| 接口 | Type-C / I2C / UART(PH2.0) |
| 功能鍵 | 復位鍵 + BOOT 鍵 |
| 識別能力 | 貓臉、人臉檢測、人臉識別、顏色、二維碼、語音對話 |

## 快速開始

### 1. 開機連接

預裝固件開箱即用,通電後模組自建 WiFi 熱點:

- 手機/電腦搜索並連接模組熱點
- 瀏覽器訪問指定地址查看實時視頻

### 2. 兩種工作模式

| 模式 | 說明 |
|------|------|
| **AP 模式** | 模組自建 WiFi 熱點,終端直連模組 |
| **STA 模式** | 模組連接現有 WiFi 路由器,與終端同網傳輸 |

### 3. 連接主控

**UART 通信**(樹莓派/Jetson Orin):

```
ESP32 模組 RX → 主控 TX
ESP32 模組 TX → 主控 RX
```

**I2C 通信**:標準 PH2.0 I2C 接口,可輸出人臉檢測/顏色識別的**坐標數據**。

### 4. 二次開發

Type-C 連接電腦,一鍵固件升級;通過串口指令切換 AI 模式(貓臉/人臉檢測/顏色/人臉識別/二維碼/語音對話),完整指令參考[串口協議手冊](/zh-hant/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol)。

---

## 完整教程

- [快速開始——3 分鐘燒錄固件、連接 WiFi、打開畫面](/zh-hant/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start)
- [硬體規格書——完整 GPIO 引腳映射與電源設計](/zh-hant/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec)
- [串口協議手冊——WiFi 配置與 AI 模式完整 AT 指令](/zh-hant/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol)
- [AI 視覺教程——11 章遞進式實戰(人臉/貓臉/顏色/二維碼/語音)](/zh-hant/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup)
- [ESP32-NanoCam 作為 SO-ARM101 無線從臂控制器](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)

---

## 應用場景

- 無線視頻傳輸(AP/STA 雙模式)
- AI 視覺開發(顏色/人臉/二維碼識別)
- 物聯網 AIoT 項目
- 機器人視覺擴展

---

## 常見問題

**Q: 如何觀看實時視頻?**

**A:** 模組預裝固件會自建 AP 熱點,手機/電腦連接後通過指定網頁或 App 查看。

**Q: 支持哪些識別?**

**A:** 內置顏色閾值分割 + 輕量 CNN,支持顏色、人臉、二維碼識別,可通過通信指令切換。

**Q: 能返回識別坐標嗎?**

**A:** 可以。通過 I2C/UART 通信接口輸出人臉/顏色檢測的坐標數據。

**Q: 固件怎麼更新?**

**A:** Type-C 連接電腦,支持一鍵固件升級。

---

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [問題反饋](https://github.com/Juxi-Technology/wiki-documents/issues)
