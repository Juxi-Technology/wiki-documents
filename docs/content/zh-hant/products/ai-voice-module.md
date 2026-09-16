---
title: AI 語音交互模組
category: accessory
description: 鉅犀科技 AI 語音交互模組(CI1302)——110+ 條離線語音指令,5 米辨識率 99%,支援自訂中英文指令詞,串列埠/IIC 通訊,適配 Arduino/Jetson/RDK/樹莓派/PC
keywords: [ai語音, 語音交互模組, ci1302, 離線語音辨識, 喚醒詞, 命令詞, 串列埠, iic, ros1, ros2]
---

# AI 語音交互模組

> **[淘寶購買](https://item.taobao.com/item.htm?id=1055967142978)**

## 產品概述

AI 語音交互模組基於啟英泰倫 **CI1302** 高效能神經網路智慧語音晶片,整合 BNPU V3 腦神經網路處理器,支援離線遠場語音辨識;板載 **STC8H 協處理器**,可將語音辨識結果自動轉換為串列埠或 IIC 資料,簡化與外部主控裝置的通訊。辨識全程在模組本地完成,無需聯網。

**核心特性**:

- 100% 離線語音辨識,無需聯網(隱私 + 低延遲)
- 出廠預設 **110+ 條語音指令**,支援自訂中文和英文指令詞(最多約 120 條)
- 喚醒詞 “你好，小犀”,15 秒無指令自動休眠,再次喚醒即用
- 內建高傳真揚聲器與高效能麥克風,降噪與回聲消除,5 米內辨識率可達 99%
- 板載 STC8H 協處理器,辨識結果輸出為串列埠 / IIC 資料
- 主動播報與被動播報兩種播報模式
- 提供 ROS1 / ROS2 SDK,以及 Arduino / Jetson / RDK / 樹莓派 / PC 通訊教程

---

## 產品規格

| 類別 | 規格 |
|------|------|
| 語音晶片 | 啟英泰倫 CI1302(BNPU V3 神經網路處理器,主頻可達 220MHz) |
| 儲存 | 640KB SRAM + 2MB Flash |
| 語音指令 | 預設 110+ 條;自訂中英文指令詞,最多可寫入約 120 條 |
| 喚醒方式 | 喚醒詞 “你好，小犀”(支援修改) |
| 辨識距離 | 5 米以內(安靜環境,辨識率可達 99%) |
| 音訊 | 內建高傳真揚聲器 + 高效能麥克風(降噪 + 回聲消除) |
| 通訊介面 | 串列埠 / IIC / Type-C(板載 STC8H 協處理器) |
| 供電 | 5V(Type-C) |
| 支援平台 | Arduino、Jetson、RDK、樹莓派、PC(STM32 / ESP32 / MSPM0 等 MCU) |
| 軟體支援 | ROS1 / ROS2 SDK、韌體燒錄工具、自訂詞條網頁工具 |

---

## 快速開始

出廠已燒錄語音辨識韌體,無需燒錄即可快速體驗:

1. 使用 Type-C 資料線為模組供電(5V)
2. 說出喚醒詞 “你好，小犀”,模組回覆“我在”後即可下達指令(如“小車前進”)
3. 15 秒內沒有辨識到命令詞條,模組播報“我去休息了”並進入休眠,再次使用時重新說出喚醒詞即可

需要增加其他辨識詞條時,可透過網頁工具修改指令詞產生新韌體,再用 PC 軟體將韌體寫入模組,詳見[模組韌體燒錄](/zh-hant/tutorials/accessories/ai-voice-module/Firmware-Flashing)與[自訂協定詞條製作](/zh-hant/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)。

---

## 完整教程

- [快速上手——開箱體驗、喚醒與播報](/zh-hant/tutorials/accessories/ai-voice-module/Quick-Start)
- [產品資料——產品特點、工作原理、注意事項與硬體介面](/zh-hant/tutorials/accessories/ai-voice-module/Product-Info)
- [模組韌體燒錄](/zh-hant/tutorials/accessories/ai-voice-module/Firmware-Flashing)
- [修改喚醒詞和命令詞](/zh-hant/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit)
- [自訂協定詞條製作](/zh-hant/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)
- [ROS1 語音互動](/zh-hant/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction) / [ROS2 語音互動](/zh-hant/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction)
- [串列埠協定](/zh-hant/tutorials/accessories/ai-voice-module/Serial-Protocol) / [IIC 協定](/zh-hant/tutorials/accessories/ai-voice-module/IIC-Protocol)
- [PC 通訊](/zh-hant/tutorials/accessories/ai-voice-module/PC-Communication)
- Arduino:[串列埠通訊](/zh-hant/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication) / [IIC 通訊](/zh-hant/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication)
- Jetson:[串列埠通訊](/zh-hant/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication) / [IIC 通訊](/zh-hant/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication)
- RDK:[串列埠通訊](/zh-hant/tutorials/accessories/ai-voice-module/RDK-Serial-Communication) / [IIC 通訊](/zh-hant/tutorials/accessories/ai-voice-module/RDK-IIC-Communication)
- 樹莓派:[串列埠通訊](/zh-hant/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication) / [IIC 通訊](/zh-hant/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication)

---

## 應用場景

- 機器人語音互動與指令控制(如“小車前進”“停止”)
- 智慧家庭語音控制(照明、家電)
- 教育與玩具類語音產品
- 工業設備語音控制
- 各類 DIY 語音互動專案

---

## 常見問題

**Q: 需要聯網嗎?**

**A:** 不需要。CI1302 為離線語音晶片,辨識在模組本地完成,無需聯網即可工作。

**Q: 出廠就能用嗎?**

**A:** 可以。出廠已燒錄語音辨識功能韌體,Type-C 供電後說出喚醒詞即可體驗;只有新增自訂詞條時才需要重新燒錄韌體。

**Q: 支援英文指令嗎?**

**A:** 支援。可自訂中文和英文指令詞,透過網頁工具修改後產生韌體並燒錄。

**Q: 如何與主控通訊?**

**A:** 板載 STC8H 協處理器將語音辨識結果自動轉換為串列埠或 IIC 資料;提供 Arduino、Jetson、RDK、樹莓派、PC 通訊教程與 ROS1 / ROS2 SDK。

**Q: 辨識距離多遠?**

**A:** 安靜環境下 5 米內辨識率可達 99%;嘈雜環境會影響辨識效果。

---

## 注意事項

- 使用 5V 電壓供電,超過 5V 會損壞模組
- 使用場景應盡量安靜,嘈雜的環境會影響辨識效果
- 說詞條的時候,聲音要洪亮而且語速不宜過快,建議與模組之間保持在 5 米之內

---

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [問題反饋](https://github.com/Juxi-Technology/wiki-documents/issues)
