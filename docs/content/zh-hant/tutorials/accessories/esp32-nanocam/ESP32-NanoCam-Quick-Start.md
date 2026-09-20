---
title: ESP32-NanoCam 快速開始
description: "ESP32-NanoCam 圖傳/AI 視覺模組快速開始:燒錄固件、配置 WiFi、查看實時畫面、切換 AI 模式並集成到 Arduino / Python 項目,五步上手。"
---

# ESP32-NanoCam 快速開始

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**


ESP32-NanoCam 是鉅犀科技的 ESP32-S3 圖傳 / AI 視覺模組(產品頁:[ESP32-S3 WiFi 視頻模組](/zh-hant/products/esp32-s3-wifi-module)),採用核心板 + 底板雙板架構。本指南用五步帶你完成固件燒錄、WiFi 連接、畫面查看與 AI 模式切換。

## 前期準備

- NanoCam 核心板 + 底板 (ESP32-S3 N16R8 + CH340K)
- USB Type-C 數據線 (支援數據傳輸)
- 電腦（Windows / Mac / Linux）
- GC2145 攝像頭模組（出廠已連接）

![圖 1:ESP32-NanoCam 核心板正面](../../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/1.png)

![圖 2:ESP32-NanoCam 底板(USB-C 供電與串口燒錄)](../../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/2.png)

## 第一步：燒錄固件（3 分鐘）

### 方式 A：免開發環境（推薦）

1. 安裝 [CH340K 串口驅動](https://www.wch.cn/download/CH341SER_EXE.html)
2. 打開瀏覽器訪問 [esptool-js](https://espressif.github.io/esptool-js/)
3. 用 Type-C 線連接 NanoCam 到電腦
4. 選擇串口，115200 波特率
5. 找到解壓壓縮包後裏面的固件文件 `nanocam_xxx.bin`
6. 選擇固件文件 `nanocam_xxx.bin`，地址 `0x0`
7. 點擊 "START"，等待完成

### 方式 B：命令行（進階）

```Bash
pip install esptool
esptool.py --chip esp32s3 --port COM3 write_flash 0x0 nanocam.bin
```

## 第二步：連接 WiFi（2 分鐘）

NanoCam 默認 **AP+STA 雙模式同時運行**，無需切換：

- **AP 熱點**始終開啟，手機直連 `NanoCam-AP`（密碼 `12345678`），瀏覽器打開 `http://192.168.4.1`
- **STA 連路由器**需配置一次 WiFi

用串口工具（波特率 **115200 8N1**）連接 NanoCam 的 Type-C 口：

```Plaintext
sta_ssid:你的WiFi名稱
sta_pd:你的WiFi密碼
```

> 收到 `OK` 表示設置成功。密碼修改後會自動重啟。

如需切換 WiFi 模式（通常不需要）：

|指令|模式|說明|
|---|---|---|
|`wifi_mode:0`|僅 AP|關閉 STA，只保留熱點|
|`wifi_mode:1`|僅 STA|關閉熱點，只連路由器|
|`wifi_mode:2`|AP+STA|默認，兩者同時工作|

## 第三步：打開畫面（1 分鐘）

1. 串口發送 `sta_ip` 獲取 STA IP
2. 瀏覽器輸入 `http://<IP地址>`（或 AP 模式用 `http://192.168.4.1`）
3. 網頁可以看到實時畫面

## 第四步：玩轉 AI（2 分鐘）

在串口發送以下指令切換模式：

|指令|模式|效果|
|---|---|---|
|`ai_mode:0`|普通圖傳|實時 MJPEG 畫面|
|`ai_mode:1`|貓臉檢測|畫面出現貓臉檢測框|
|`ai_mode:2`|人臉檢測|畫面出現人臉檢測框|
|`ai_mode:3`|顏色識別|框選顏色→實時追蹤|
|`ai_mode:4`|人臉識別|註冊→辨認→刪除|
|`ai_mode:5`|二維碼掃描|對準二維碼→串口輸出內容|
|`ai_mode:6`|LLM 智能體|語音喚醒 "你好小智" (XiaoZhi AI)|
|`ai_mode:7`|ESP-Claw|ESP-Claw AI Agent (樂鑫官方框架)|

> 每次切換模式需要手動重啟，可以通過按下模組 RST 按鍵進行重啟，重啟後新模式生效。

## 第五步：集成到你的項目

### Arduino 控制

```C++
Serial.begin(115200);
Serial.print("ai_mode:2");  // 切換到人臉檢測
```

### Python 控制

```Python
import serial
ser = serial.Serial("COM3", 115200)
ser.write(b"ai_mode:1\r\n")  # 切換到貓臉檢測
```

### 查看完整指令

完整指令參考：[串口協議手冊](./ESP32-NanoCam-Serial-Protocol.md)。

## 常見問題

|問題|解決|
|---|---|
|燒錄失敗|檢查 Type-C 線是否支援數據，按住底板 S2(BOOT) 再上電|
|看不到畫面|串口發 `sta_ip` 確認 IP，檢查是否同網段|
|攝像頭不亮|檢查 FPC 排線金屬觸點朝下插緊，檢查 PWDN(IO12)/RESET(IO14)|
|WiFi 連不上|發 `wifi_reset` 恢復出廠，重新配置|

## 下一步

- 📖 [串口協議手冊](./ESP32-NanoCam-Serial-Protocol.md) — 完整 AT 指令參考
- 🎓 [教程大綱](./Ch01-Environment-Setup.md) — 遞進式教程（本 wiki 收錄 11 章）
- 🔧 [硬體規格書](./ESP32-NanoCam-Hardware-Spec.md) — GPIO 引腳全映射
- 🤖 [ROS2 集成指南](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop) — micro-ROS 無線遙操作教程

<RelatedProducts slugs="esp32-s3-wifi-module" />
