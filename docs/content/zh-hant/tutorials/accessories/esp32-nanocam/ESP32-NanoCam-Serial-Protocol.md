---
title: ESP32-NanoCam 串口協議手冊
description: "ESP32-NanoCam 串口 AT 協議手冊:WiFi 配置、AI 模式切換、信息查詢、系統控制與人臉識別等完整指令參考。"
---

# ESP32-NanoCam 串口協議手冊

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**


> 波特率: 115200 | 數據位: 8 | 校驗: 無 | 停止位: 1 | 流控: 無

> 兼容主流攝像頭模組 AT 指令集，新增 NanoCam 擴展指令。

## 一、通用規則

- 指令大小寫**不敏感**（`STA_SSID` = `sta_ssid`）
- 指令後需跟**任意英文標點**（`,` `.` `:` `;` 等）作為結束符
- 部分指令修改後會**自動重啟**
- 每條指令以 `\r\n` 結尾（串口助手通常自動添加）

## 二、WiFi 配置

### STA 模式（連接路由器）

|指令|說明|示例|返回值|
|---|---|---|---|
|`sta_ssid:名稱`|設置 WiFi 名稱|`sta_ssid:MyWiFi`|`OK`|
|`sta_pd:密碼`|設置 WiFi 密碼 (修改後重啟)|`sta_pd:12345678`|`OK` (重啟)|

> WiFi 名稱和密碼最長 30 字符，不支援中文。

### AP 模式（自發熱點）

|指令|說明|示例|返回值|
|---|---|---|---|
|`ap_ssid:名稱`|設置熱點名稱|`ap_ssid:NanoCam-AP`|`OK`|
|`ap_pd:密碼`|設置熱點密碼 (修改後重啟)|`ap_pd:12345678`|`OK` (重啟)|

### WiFi 模式

|指令|說明|參數|返回值|
|---|---|---|---|
|`wifi_mode:X`|切換模式|0=AP 1=STA 2=AP+STA|`OK` (變更時重啟)|

## 三、AI 模式切換

|指令|模式|說明|重啟|
|---|---|---|---|
|`ai_mode:0`|正常|MJPEG 圖傳，無 AI|✅|
|`ai_mode:1`|貓臉檢測|實時貓臉畫框 + 置信度|✅|
|`ai_mode:2`|人臉檢測|實時人臉畫框 + 坐標|✅|
|`ai_mode:3`|顏色識別|框選錄入→實時檢測|✅|
|`ai_mode:4`|人臉識別|註冊→辨認→刪除|✅|
|`ai_mode:5`|二維碼|實時解碼→串口輸出|✅|
|`ai_mode:6`|LLM 智能體|XiaoZhi AI 語音對話 + AI 視覺|✅|
|`ai_mode:7`|ESP-Claw|語音控制 + 拍照視覺分析 + OpenAI Vision|✅|

> `ai_mode` 有效值: 0-7。超出範圍默認變為 0。修改後自動重啟，重啟後新模式生效。

## 四、信息查詢

|指令|說明|返回值示例|
|---|---|---|
|`sta_ip`|查詢 STA IP|`sta_ip:192.168.1.100`|
|`ap_ip`|查詢 AP IP|`ap_ip:192.168.4.1`|
|`wifi_ver`|查詢固件版本|`NanoCam Board Ver:0.2.0`|

## 五、系統控制

|指令|說明|返回值|
|---|---|---|
|`wifi_reset`|恢復出廠設置 (重啟)|`Reset_OK`|
|`nano_reboot`|軟復位|`Rebooting...`|
|`nano_info`|完整設備信息 (JSON)|見下方|

### nano_info 返回示例

```JSON
{
  "device": "NanoCam",
  "ver": "0.2.0",
  "chip": "ESP32-S3",
  "flash": "16MB",
  "psram": "8MB",
  "ai_mode": 1,
  "wifi_mode": 2,
  "sta_ip": "192.168.1.100",
  "free_heap": 245760
}
```

## 六、人臉識別專用命令

> 僅在 ai_mode:4（人臉識別模式）下有效。

|指令|說明|標籤行為|返回示例|
|---|---|---|---|
|`face_eril`|註冊當前畫面中檢測到的人臉|藍色 "Enroll: ID N"，閃現 0.5s|`>>> face enroll triggered`|
|`face_rz`|進入持續人臉識別模式|綠色 "ID: N" / 紅色 "who?"，**持續顯示不消失**|`>>> face recognize triggered`|
|`face_del`|刪除最後註冊的人臉 ID|紅色 "N IDs left"，閃現 0.5s|`>>> face delete triggered`|
|`face_detect`|退出識別模式，返回純人臉檢測|清除所有標籤|`>>> face detect mode`|

### 人臉識別操作流程

```Plaintext
ai_mode:4          # 进入人脸识别模式 (设备自动重启)
face_eril          # 注册人脸 (确保只有一张脸在画面中)
face_rz            # 开始持续识别 — 标签持续显示不消失
face_detect        # 退出识别模式 — 标签清除
face_del           # 删除最后注册的人脸
```

### 人臉識別注意事項

1. 註冊時需確保畫面中**只有一張人臉**，距離 30-50cm
2. 識別模式（`face_rz`）下標籤**持續顯示**，不會 0.5 秒消失——這是 0.3.0 的新行為
3. 要退出識別模式需發送 `face_detect`，否則標籤一直顯示
4. 人臉特徵存儲在 Flash `fr` 分區，掉電不丟失，最多 47 個 ID
5. 識別採用跳幀策略（每 10 幀跑一次 MFN 推理）

## 七、擴展指令（NanoCam 專屬）

|指令|說明|狀態|
|---|---|---|
|`nano_server:url`|設置 LLM 服務器地址 (NVS 保存)|✅|
|`nano_api_key:key`|設置 LLM API 密鑰 (NVS 保存)|✅|
|`nano_mqtt:broker,port,topic`|配置 MQTT 服務器|🔨|
|`nano_led:R,G,B`|設置 RGB LED (WS2812, GPIO18 DIN)|📋|
|`nano_snap`|拍照存儲 (SPIFFS)|✅|
|`nano_stream:on/off`|啟停圖傳|📋|

### nano_server / nano_api_key

|指令|說明|示例|返回值|
|---|---|---|---|
|`nano_server:URL`|設置 LLM 服務器地址|`nano_server:https://api.openai.com`|`OK server=https://api.openai.com`|
|`nano_api_key:KEY`|設置 API 密鑰|`nano_api_key:sk-xxxx`|`OK`|

> 支援任意 OpenAI 兼容 API（vLLM / Ollama / 本地模型均可）。
> ESP-Claw 模式 (ai_mode:7) 支援使用 `nano_server`，XiaoZhi AI (ai_mode:6) 走獨立服務器配置。

## 八、注意事項

1. `sta_pd` / `ap_pd` 修改後自動重啟，重啟後新密碼生效
2. `ai_mode` 修改後自動重啟（僅當模式改變時）
3. 人臉識別模式（mode 4）下，Type-C 串口配置功能可能失效（內存不足）
4. WiFi 名稱/密碼不能超過 30 字符，不能有中文
5. 指令後需要跟標點符號作為結束符

## 下一步

- [快速開始](./ESP32-NanoCam-Quick-Start.md) — 從燒錄固件到 AI 模式切換的完整上手流程

<RelatedProducts slugs="esp32-s3-wifi-module" />
