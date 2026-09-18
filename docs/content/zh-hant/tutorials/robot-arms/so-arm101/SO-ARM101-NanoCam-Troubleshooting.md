---
title: "無線遙操作排障指南"
description: "匯總 SO-ARM101 無線遙操作(ESP32-NanoCam 版)的常見故障:燒錄與串口、攝像頭、音頻、網絡與 micro-ROS 問題的現象、原因與解決辦法。"
---

# 無線遙操作排障指南

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**

本頁匯總 ESP32-NanoCam 版 SO-ARM101 無線遙操作的常見故障排查。完整操作流程見 [SO-ARM101 無線遙操作(ESP32-NanoCam 版)](./SO-ARM101-NanoCam-Wireless-Teleop.md)。

## 通用排障速查

| 現象 | 排查 |
|---|---|
| 燒錄連不上 | 手動進下載模式(BOOT+復位);`platformio.ini` 加 `upload_port` |
| 燒錄後無串口輸出 | 檢查 USB 線與 CH340 驅動;Windows 看設備管理器 COM 口 |
| 卡在 `Waiting for micro-ROS Agent...` | 查 AGENT_IP / UDP 8888 / 客戶端隔離 |
| 舵機總線無響應(`servo_mask≠0x3f`) | 確認經舵機驅動板 UART 接 P2-7/P2-8;從動臂 12V 5A 外部供電 |
| 麥克風電平恆 0 | 看 `audio: ES8311 ready` 日誌;I2C 41/42 上拉;對麥克風吹氣驗證 |
| 揚聲器無聲 | 檢查喇叭連接;ES8311 音量寄存器 `R_DAC32`(當前固件已設為最大 0xFF) |
| WiFi 經常斷 | 檢查天線、距離;RGB 變紅表示 WiFi 丟失,10s 後自動重啟 |

## 燒錄與串口問題

- **燒錄連不上**:按住 BOOT 鍵(GPIO0)→ 插 USB(或按復位)→ 鬆開 BOOT,立即重跑 upload。Windows 下若沒自動識別串口,在 `platformio.ini` 的 `[env:nano_cam]` 加一行 `upload_port = COM3`(替換成設備管理器裏 CH340 的實際 COM 號)。
- **燒錄後無串口輸出**:NanoCam 的 USB 是 CH340K → UART0,Linux 下設備名 `/dev/ttyUSB0`;如果插上沒識別,檢查 USB 線和 CH340 驅動(內核自帶)。
- **舵機總線無響應(`servo_mask≠0x3f`)**:確認舵機總線通過舵機驅動板 UART 接在 **P2-7/P2-8**(GPIO19/20)而不是 UART0 的 43/44;從動臂必須 12V 5A 外部供電(USB 帶不動 6 個舵機)。
- **舵機總線與調試串口混淆**:調試串口是 USB-C(CH340K → UART0),與舵機總線完全獨立,可以同時使用。

## 編譯與工具鏈問題

- **首次 `pio run` 下載慢/卡住**(首次會依次下載 espressif32 平台、`toolchain-xtensa-esp32s3` 工具鏈約 100 MB 與 Arduino 框架約 200 MB):PlatformIO 剩餘時間估算不準,常卡住一段時間後突然跳完,給 5 分鐘觀察百分比是否推進;可開代理/VPN(走系統代理);
- **手動下載工具鏈**:瀏覽器下載 `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip`(Linux 對應 `-linux-amd64.tar.gz`),解壓後把目錄改名為 `toolchain-xtensa-esp32s3` 放入 `C:\Users\<你的使用者名稱>\.platformio\packages\`,重跑 `pio run`;中途 Ctrl+C 中斷不會損壞環境,重跑會續傳;
- **Windows 下 `pio` 命令在 Git Bash 裏找不到**:改用 PowerShell/CMD 終端,或把 `C:\Users\<你的使用者名稱>\.platformio\penv\Scripts` 加入 PATH。

## 攝像頭專項排障

| 現象 | 根本原因 | 修復 |
|---|---|---|
| `i2c driver install error` + `camera probe failed` | **I2C 衝突**:ES8311 用 `Wire1` 佔用 GPIO41/42,攝像頭 SCCB 再裝 I2C 驅動被拒 | `audio_es8311.cpp` 的 `init()` 末尾加 `Wire1.end()`,釋放 I2C 給攝像頭 |
| `JPEG format is not supported on this sensor`(0x106) | **GC2145 無硬件 JPEG 編碼器**(僅 OV2640/OV5640 有) | 採集改用 `PIXFORMAT_RGB565`,`/stream` 和 `/jpg` 用 `frame2jpg` 軟件編碼成 JPEG |
| `/jpg`、`/stream` 無響應,瀏覽器一直轉圈 | **httpd 棧溢出**:默認棧 8KB 容不下 `frame2jpg` 軟編碼 | `start_server()` 裏 `config.stack_size = 16384` |
| `/stream` 打開但黑屏 | **缺 multipart 邊界**:每幀之間沒發 `STREAM_BOUNDARY`,瀏覽器無法解析 | 每幀發送前補發 `STREAM_BOUNDARY` |
| curl 測 `/jpg` 返回 `HTTP:000`,但瀏覽器能出圖 | esp_http_server **單任務**:`/stream` 佔用 httpd 任務時 `/jpg` 排不上隊;或 curl 超時太短 | 關掉 `/stream` 再單獨測 `/jpg`;用瀏覽器代替 curl 驗證 |
| 攝像頭初始化成功但全黑/無幀 | 多為**硬件**:AVDD/DOVDD 供電、PWDN 電平、排線接觸 | 先用瀏覽器 `/jpg` 測快照(能出圖=鏈路通);查攝像頭 2.8V 供電與排線 |
| VGA 畫面下方約 2/3 花屏 | **DVP 數據率過高**:VGA RGB565 超出此板 DVP 採樣時序餘量(24/20/16MHz × 單/雙緩衝均復現);QVGA 正常 | 正式配置用 **QVGA 320×240**(FPV 夠用),或換更穩的 XCLK/改 DVP 硬件走線 |

> 備註:表中前四項均已在隨附固件中修復,燒錄最新固件即可,無需手動改代碼。

**注意**:esp_http_server 是單任務的,`/stream` 和 `/jpg` 不能同時訪問——開着 `/stream` 時 `/jpg` 會一直掛起。抓單幀前先關掉流頁面。

## 音頻專項排障

| 現象 | 根本原因 | 修復 |
|---|---|---|
| 揚聲器**完全無聲** + 麥克風電平 ≈ 0(如 `0.0009`) | **MCLK 沒輸出**:legacy I2S 驅動在 ESP32-S3 上不產生 MCLK,ES8311 內部 DAC/ADC 無時鐘 | 用 **LEDC 在 GPIO39 生成 6.15MHz MCLK**(`audio_es8311.cpp` 的 `start_ledc_mclk()`) |
| 提示音**太小**(貼耳才聽到) | 數字振幅低 + ES8311 主音量小 | `play_tone` 振幅 12000→30000、`R_DAC32` 0x30→0xFF(約 +29dB) |
| 上電只有啟動"嘀嘀",無其他提示音 | **正常現象**:就緒/解鎖提示音是事件驅動,需跑遙操作才觸發 | 啟動音=上電即播;就緒音=Agent 通信建立;解鎖音=收到控制命令 |

> 備註:前兩項已在隨附固件中修復;第三項為正常現象,無需處理。

## 麥克風、揚聲器與 RGB 硬件檢查

- **麥克風電平一直為 0**:檢查 `audio: ES8311 ready` 日誌;確認 MCLK 已輸出(GPIO39 應有 ~1.65V,LEDC 生成);I2C 總線 41/42 上拉(板上已有 10K);對着麥克風吹氣,看 `/follower_audio/level` 是否跳動。
- **揚聲器無聲**:確認 NS4150B 喇叭接在揚聲器連接器上;確認 GPIO39 MCLK 有輸出(LEDC,`start_ledc_mclk()`);音量寄存器 `R_DAC32`(當前 0xFF);ES8311 未初始化時日誌會打印失敗原因。
- **RGB 燈不亮**:WS2812 數據腳是 GPIO18,檢查固件啟動日誌是否出現 `camera_stream` 之前的 RMT 初始化錯誤(一般不會)。

## 網絡與 micro-ROS 問題

- **卡在 `Waiting for micro-ROS Agent...`**:依次檢查 `AGENT_IP` 是否填的是 Ubuntu 電腦局域網 IP、UDP 8888 是否放行、路由器/熱點是否開啟了客戶端隔離(需關閉)。NanoCam 的天線是模組上的 U.FL 天線,RSSI 差時先看天線與擺放,建議做 5/10/20/30 米距離實測。
- **WiFi 經常斷**:檢查天線與距離;RGB 變紅表示 WiFi 丟失,固件會在 10s 超時後自動重啟。
- **無法連通時先確認環境**:NanoCam 與 Ubuntu 電腦必須在同一 2.4GHz 局域網(手機熱點即可);若換過網絡,記得同步更新 `AGENT_IP` 與 WiFi 配置(見無線遙操作教程的"配置 WiFi"一節)。

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
