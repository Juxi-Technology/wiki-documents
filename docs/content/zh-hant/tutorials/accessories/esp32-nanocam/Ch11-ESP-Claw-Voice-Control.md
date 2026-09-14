---
title: 第 11 章:ESP-Claw 語音控制
description: "ESP32-NanoCam 教程第 11 章:ESP-Claw 模式下的 5 個硬體控制工具——語音調色 LED、切換 AI 模式、拍照視覺分析與設備資訊查詢。"
---

# 第 11 章:ESP-Claw 語音控制

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**

**本章目標**:用語音直接控制 NanoCam 的 LED 燈效、AI 模式切換與拍照視覺分析。

## 關於本章

當設備切換為 `ai_mode:7` 時，NanoCam 進入 ESP-Claw 模式。它與 XiaoZhi AI（`ai_mode:6`）**共用同一份固件**（`nanocam_espclaw/`），差別僅在於：ESP-Claw 模式在語音對話的基礎上，額外註冊了 5 個硬體控制工具。

|對比維度|XiaoZhi AI (mode 6)|ESP-Claw (mode 7)|
|---|---|---|
|語音對話|✅ ASR→LLM→TTS|✅ 同一條語音管線|
|LED 控制|❌|✅ 語音調色 / 開關|
|AI 模式切換|❌|✅ 語音切換|
|拍照 + AI 視覺分析|❌|✅ 拍照並調用多模態 AI 理解畫面|

## 原理

ESP-Claw 模式在語音管線之上，透過 `RegisterMcpTools()` 註冊了 5 個 NanoCam 專用工具：

```Plain
用戶語音 "把燈調成藍色"
  → ASR 語音識別（雲端）
  → LLM 理解意圖 → 調用 self.led.set_color({"r":0, "g":0, "b":255})
  → NanoCam WS2812 LED 變藍
  → TTS: "好的，燈已經調成藍色"
```

## 步驟

### 11.1 燒錄固件

ESP-Claw 使用 `nanocam_espclaw/` 獨立固件項目：

```Bash
cd nanocam_espclaw
idf.py set-target esp32s3
idf.py build
idf.py -p COMx flash
```

### 11.2 切換模式

啟動後設置為 ESP-Claw 模式：

```Plain
ai_mode:7
```

設備自動重啟後進入。用 `ai_mode:6` 可切回 XiaoZhi AI 模式。

### 11.3 語音控制示例

喚醒後直接說出需求：

```Plain
💬 "把燈打開"              → WS2812 亮白色
💬 "把燈調成藍色"          → LED 變藍
💬 "關燈"                  → LED 關閉
💬 "切換到人臉檢測模式"    → NVS 保存 ai_mode:2 + 重啟
💬 "看看這裏有什麼"        → 拍照 + 上傳多模態 AI 分析
💬 "我面前有杯子嗎"        → 多模態 AI 識別畫面
```

### 11.4 拍照 + AI 視覺分析

當用戶說「看看...」時，固件抓取一幀 VGA RGB565 圖像，壓縮為 JPEG，發送到伺服器端配置的多模態 API 進行分析，結果透過 TTS 語音播報。

> 多模態 API 的 URL 和 token 由伺服器端在連接握手階段自動下發，不需要在串口手動輸入配置命令。

## 5 個 NanoCam 專用工具

|工具名|功能|參數|
|---|---|---|
|`self.led.set_color`|設置 WS2812 RGB LED (GPIO18)|`r,g,b`: 0-255|
|`self.led.turn_off`|關閉 LED|無|
|`self.camera.set_ai_mode`|切換 AI 模式 (NVS 保存 + 重啟)|`mode`: 0-7|
|`self.camera.inspect_image`|拍照 + 多模態 LLM 視覺分析|`prompt`: 問題描述|
|`self.get_device_info`|設備資訊 JSON|無|

## 設定檔

|內容|路徑|
|---|---|
|MCP 工具註冊|`nanocam_espclaw/main/boards/nanocam/nanocam_board.cc`|
|Vision 發送邏輯|`nanocam_espclaw/main/boards/common/esp32_camera.cc`|
|SDK 默認配置|`nanocam_espclaw/sdkconfig.defaults`|

> ESP-Claw 固件是獨立項目，不與 `nanocam_vision` 共用程式碼。兩個固件需分別編譯燒錄。

## 如何選擇

|你的需求|推薦模式|
|---|---|
|只想語音聊天、問答|mode 6 (XiaoZhi)|
|想語音控制 LED|mode 7 (ESP-Claw)|
|想拍照 + AI 「看」畫面|mode 7 (ESP-Claw)|
|想語音切換 AI 檢測模式|mode 7 (ESP-Claw)|

> ESP-Claw 的完整使用方式（伺服器端配置、自訂 MCP 工具開發等）仍在探索中，文檔會隨研究進展持續更新。

至此，本系列 11 章教程全部完成。完整的串口指令（如 `ai_mode` 模式切換）見[串口協議手冊](./ESP32-NanoCam-Serial-Protocol.md)。

<RelatedProducts slugs="esp32-s3-wifi-module" />
