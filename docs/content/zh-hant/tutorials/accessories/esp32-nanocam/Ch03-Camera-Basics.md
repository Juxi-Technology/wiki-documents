---
title: "第 3 章:攝影機基礎"
description: "ESP32-NanoCam 教程第 3 章:認識 DVP 攝像頭接口、MJPEG 串流與 PSRAM 幀緩衝原理，並查看默認畫面與內置的 AI 模式切換。"
---

# 第 3 章:攝影機基礎

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**

**本章目標**:理解 NanoCam 的攝像頭數據鏈路，並認識固件內置的各 AI 模式。

## 原理

NanoCam 透過 DVP（數位視訊並行）介面連接攝影機。GC2145 傳感器輸出 8-bit 並行像素數據，ESP32-S3 的 LCD_CAM 周邊透過 DMA 直接存入 PSRAM，然後由 HTTP 伺服器以 MJPEG 格式串流到瀏覽器。

### 關鍵概念

- **DVP**：8 線並行數據 + 3 線同步信號（VSYNC/HREF/PCLK）
- **MJPEG**：每一幀是獨立的 JPEG 圖片，瀏覽器連續載入實現影片效果
- **PSRAM**：8MB PSRAM 用作幀緩衝，可存 2-4 幀

## 步驟

### 3.1 查看預設畫面

固件燒錄後預設為串流模式，瀏覽器開啟 `http://<IP>` 即可看到畫面。

|指令|功能|
|---|---|
|ai_mode:0\r|圖傳模組|
|ai_mode:1\r|貓臉偵測|
|ai_mode:2\r|人臉偵測|
|ai_mode:3\r|顏色辨識|
|ai_mode:4\r|人臉辨識|
|ai_mode:5\r|二維條碼辨識|
> 完整 AI 模式與串口指令見[串口協議手冊](./ESP32-NanoCam-Serial-Protocol.md)。

下一章:[第 4 章:人臉偵測](./Ch04-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
