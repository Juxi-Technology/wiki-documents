---
title: 第 7 章:二維碼掃描
description: "ESP32-NanoCam 教程第 7 章:使用 esp-code-scanner 實時解碼二維碼/條形碼，解碼結果同步輸出到串口日誌與網頁畫面。"
---

# 第 7 章:二維碼掃描

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**

**本章目標**:讓 NanoCam 掃描二維碼/條形碼，把解碼結果輸出到串口與網頁畫面。

## 原理

使用 esp-code-scanner 預編譯庫實時解碼畫面中的二維碼(QR Code / Barcode)。攝像頭輸出的 RGB565 幀直接傳給掃描器，無需灰度轉換。每幀創建全新掃描器對象，掃完即銷毀，避免內部狀態累積。

解碼結果同時透過:

1. **串口日誌**輸出

2. **共享緩衝區** `g_last_code` 保存最新結果，供 HTTP/MJPEG 流疊加顯示

3. **網頁畫面底部**疊加綠色文字標註

## 步驟

### 7.1 切換模式

```Plain
ai_mode:5
```

> 完整指令見[串口協議手冊](./ESP32-NanoCam-Serial-Protocol.md)。

### 7.2 掃碼

將二維碼放在攝像頭前，串口輸出:

```Plain
I (xxxxx) qrcode: Decoded [QR-Code]: https://example.com
```

同時網頁畫面 `http://<IP>/` 底部出現綠色文字標註解碼內容。

### 7.3 連續掃碼

對準下一個碼自動解碼輸出，掃描器每幀重建，可連續工作不崩潰。

## 程式碼

### 核心掃描邏輯

`main/ai/nano_qrcode.cpp`:

```C++
// 每幀創建全新掃描器對象
esp_image_scanner_t *scn = esp_code_scanner_create();
esp_code_scanner_config_t cfg = {
    ESP_CODE_SCANNER_MODE_FAST,
    ESP_CODE_SCANNER_IMAGE_RGB565,
    fb->width, fb->height
};
esp_code_scanner_set_config(scn, cfg);
int count = esp_code_scanner_scan_image(scn, fb->buf);
// 解碼成功
const esp_code_scanner_symbol_t result = esp_code_scanner_result(scn);
ESP_LOGI(TAG, "Decoded [%s]: %s", result.type_name, result.data);
// 保存到共享緩衝區供網頁疊加
snprintf(g_last_code, sizeof(g_last_code), "%s: %s",
         result.type_name, result.data);
esp_code_scanner_destroy(scn);
```

## 效果

對準二維碼→串口輸出解碼內容 + 網頁畫面疊加顯示。

下一章:[第 8 章:人臉識別](./Ch08-Face-Recognition.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
