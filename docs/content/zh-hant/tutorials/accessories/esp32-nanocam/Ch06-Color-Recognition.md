---
title: 第 6 章:顏色識別
description: "ESP32-NanoCam 教程第 6 章:基於 HSV 色彩空間識別紅黃綠藍紫黑白 7 種顏色，畫面疊加標籤，並透過 I2C 寄存器讀取檢測框中心座標。"
---

# 第 6 章:顏色識別

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**

**本章目標**:讓 NanoCam 識別畫面中物體的顏色，並獲取座標用於分揀等應用。

## 原理

基於 HSV(色調-飽和度-明度)色彩空間。攝像頭輸出的 RGB565 圖像經 esp-dl 的 ColorDetector 引擎處理，將圖像縮放到 80×80 解析度降噪後，逐像素轉換為 HSV 值，與預設的 7 種顏色閾值進行匹配。

### 預設顏色閾值（OpenCV 標準 H 範圍，0-180 標度）

|顏色|色相(H)|飽和度(S)|明度(V)|面積門檻|
|---|---|---|---|---|
|紅色|0-15|70-255|90-255|64|
|黃色|23-33|70-255|90-255|64|
|綠色|34-75|70-255|90-255|64|
|藍色|97-124|70-255|90-255|64|
|紫色|125-155|70-255|90-255|64|
|白色|0-180|0-40|200-255|80|
|黑色|0-180|0-255|0-50|80|

> 色相使用 OpenCV 0-180 標度（對應 0-360°）。`set_bgr(false)` 確保庫原樣讀取 RGB565 數據，不交換通道。

## 步驟

### 6.1 進入顏色模式

```Plain
ai_mode:3
```

設備自動重啟進入顏色檢測模式，WS2812 RGB LED (GPIO18) 顯示當前識別到的顏色。

> 完整指令見[串口協議手冊](./ESP32-NanoCam-Serial-Protocol.md)。

### 6.2 觀察識別結果

將純色物體放在攝像頭前，瀏覽器打開 `http://<IP>` 會顯示:

- **彩色矩形框**標註檢測到的顏色區域

- **顏色標籤文字**(red/yellow/green/blue/purple/white/black)

- 框和標籤顏色與實際檢測顏色一致

> 顏色模式只做畫面疊加(OSD)，不輸出串口日誌。需要獲取座標請透過 I2C 寄存器讀取。

### 6.3 I2C 讀取檢測數據

NanoCam 作為 I2C Slave (地址 `0x33`,GPIO SDA=41 SCL=42)，實時更新檢測框中心點座標。

|寄存器|內容|數據類型|
|---|---|---|
|0x28-0x29|中心點 X|int16 BE|
|0x2A-0x2B|中心點 Y|int16 BE|
|0x2C-0x2D|識別 ID|int16 BE|

## 程式碼

### 核心檢測引擎

`components/modules/ai/who_color_detection.cpp` — 基於 esp-dl ColorDetector:

```C++
// 構建檢測器,set_bgr(false) 確保顏色通道正確
ColorDetector detector;
detector.set_bgr(false);
detector.set_detection_shape({80, 80, 1});
// 註冊 7 種顏色閾值
detector.register_color({h_lo, h_hi, s_lo, s_hi, v_lo, v_hi}, area_min, "red");
// 檢測
auto &results = detector.detect((uint16_t *)frame->buf,
    {(int)frame->height, (int)frame->width, 3});

// 遍歷結果畫框+標籤
for (int ci = 0; ci < (int)results.size(); ci++) {
    for (int ri = 0; ri < (int)results[ci].size(); ri++) {
        color_detect_result_t &res = results[ci][ri];
        draw_rect(frame, res.box[0], res.box[1], res.box[2], res.box[3], color_lcd);
        fb_gfx_print(frame, lx, ly, color_lcd, color_name);
    }
}
```

## 效果

紅綠藍物體→識別顏色→畫框+標籤→I2C 輸出座標→可接舵機分揀。

下一章:[第 7 章:二維碼掃描](./Ch07-QR-Code-Scanning.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
