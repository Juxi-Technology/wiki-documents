---
title: "MAX30102 心率血氧傳感器模組使用教程"
description: "MAX30102 心率血氧傳感器模組完整教程：產品資料、網頁端、Arduino、樹莓派與 PC 端上位機。"
---

# MAX30102 心率血氧傳感器模組使用教程

本教程介紹鉅犀科技 MAX30102 心率血氧傳感器模組的使用方法。模組搭載美信（Maxim）MAX30102 專用心率血氧檢測晶片，內置自研心率血氧演算法，可直接輸出心率、血氧飽和度和板載溫度，支援 I2C 與 UART 兩種通訊方式。

## 教程目錄

| 內容 | 說明 |
|---|---|
| [產品資料](./product-info.md) | 產品概述、檢測原理、技術規格、引腳定義與典型應用場景 |
| [網頁端使用教程](./web-console.md) | 瀏覽器 Web Serial 直接連接，無需安裝軟體 |
| [Arduino 使用教程](./arduino.md) | 接線、庫安裝、範例程式碼、API 與常見問題 |
| [樹莓派使用教程](./raspberry-pi.md) | I2C / UART 接線、環境配置、範例程式碼與 API |
| [PC 端 · Python 執行](./pc/python.md) | USB 轉 TTL + Python 腳本讀取數據 |
| [PC 端上位機](./pc/upper-computer.md) | 圖形化上位機：串口設定、採集與實時監測 |

## 快速開始

1. 先閱讀[產品資料](./product-info.md)，確認供電（3.3–5V）與引腳定義；
2. 只想快速看數據：使用[網頁端使用教程](./web-console.md)，以 Chrome / Edge 開啟網頁即可；
3. 接單片機：參閱 [Arduino 使用教程](./arduino.md)；
4. 接樹莓派：參閱[樹莓派使用教程](./raspberry-pi.md)；
5. 接電腦：參閱 [PC 端 · Python 執行](./pc/python.md) 或 [PC 端上位機](./pc/upper-computer.md)。

> 本產品為消費級電子檢測模組，不屬於專業醫療器械，檢測數據僅作日常健康參考。

<RelatedProducts slugs="heart-rate-spo2" />
