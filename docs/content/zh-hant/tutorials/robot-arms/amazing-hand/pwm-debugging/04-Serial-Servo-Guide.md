---
title: "04-串口舵機版本-使用說明"
description: "SCS0009 官方總線舵機版 — 使用說明"
---

# 04-串口舵機版本-使用說明

SCS0009 官方總線舵機版 — 使用說明

> **如您購買的是 PWM 舵機版(ESP32-S3 + 8 路 PWM),請忽略本目錄**,
使用 `..\01_gui_control` 或 `..\02_hand_tracking` 即可。

本目錄說明的是 AmazingHand **官方原版 SCS0009 總線舵機**的支援情況。

## 當前狀態

本delivery_package的 `..\02_hand_tracking\Demo` 同時支援兩種舵機後端,可通過配置無縫切換:

|版本|舵機類型|波特率|設定檔|
|---|---|---|---|
|**PWM**(本包主要交付)|ESP32-S3 直驅 PWM|115200|`{l,r}_hand_pwm.toml`|
|**SCS0009**(官方原版)|官方總線舵機|1,000,000|`{l,r}_hand.toml`|

- **PWM 版**:選單選 `3 - PWM 舵機(ESP32 直驅)`,用本包教程。

- **SCS0009 版**:選單選 `2 - 真實硬件(SCS0009 總線舵機)`。

## SCS0009 版使用方法

1. 硬件:官方總線舵機 + 串口適配器(波特率 1M)。

2. 部署:`Demo\Windows_Scripts_CN\3-部署代码.bat`(或 Linux 對應腳本)。

3. 執行:4-运行代码.bat → 選 `2 - 真實硬件(SCS0009 總線舵機)` → 選手型。

4. 詳細說明見 `..\02_hand_tracking\Demo\双版本舵机并存说明.md`
以及 `Demo\Windows_Scripts_CN\Windows使用教程.md`(官方教程)。

## 注意事項

- SCS0009 需要官方舵機 id 配置(已內置在 `{l,r}_hand.toml`),PWM 版不涉及。

- 兩種舵機**同一時刻只接一套**,切換硬件 + 選單選項即可。

- 本包以 PWM 版為主要交付物;SCS0009 官方教程以官方 Demo 為準。

