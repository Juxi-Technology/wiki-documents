---
title: 第 8 章:人臉識別
description: "ESP32-NanoCam 教程第 8 章:註冊人臉特徵並持續識別(ID/who?)，掌握 face_eril、face_rz、face_del、face_detect 命令、跳幀策略與故障排除。"
---

# 第 8 章:人臉識別

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**

**本章目標**:註冊人臉特徵，讓 NanoCam 認出「你是誰」，搭建完整門禁方案。

## 原理

人臉識別 = **人臉檢測**（MSR01+MNP01 雙階段流水線）+ **特徵提取**（FaceRecognition112V1S8 MFN 神經網絡）+ **餘弦相似度比對**。

```Plain
攝像頭 RGB565 幀
  → MSR01 粗檢測（320×240, 0.3F 閾值）
  → MNP01 精檢測（基於粗檢候選框, 0.4F 閾值）
  → 10 個面部關鍵點提取（雙眼/鼻尖/嘴角）
  → 關鍵點對齊 → 裁剪 112×112 人臉
  → MFN 卷積網絡 → 512 維特徵向量
  → L2 歸一化
  → 與 Flash 中所有已註冊 ID 的向量逐一計算餘弦距離
  → 最大餘弦相似度 > 閾值(0.55) → 匹配成功 → 輸出 ID
  → 所有相似度 < 閾值 → 陌生人 → 輸出 "who?"
```

### 性能優化

MFN 特徵提取和全庫比對運算量較大，每幀都跑會導致畫面卡頓。當前實現採用**跳幀策略**：人臉檢測每幀運行（廉價），MFN 識別每 10 幀運行一次（昂貴），標籤使用上一次識別結果持續疊加顯示。這樣畫面保持流暢，ID 標籤不閃爍。

### 人臉特徵儲存

已註冊的人臉特徵（id + 512 維 embedding）持久化儲存在 Flash 的 `fr` 分區（96 KB，最多 47 個人臉 ID）。掉電不丟失。

## 硬體準備

- NanoCam 核心板 + 底板

- USB-C 數據線（接電腦供電+串口）

- 串口助手（波特率 115200）

## 步驟

### 8.1 進入人臉識別模式

```Plain
ai_mode:4
```

設備自動重啟進入 FaceID 模式，WS2812 RGB LED (GPIO18 DIN, VDD50 供電) 顯示紫色。重啟後串口應看到：

```Plain
I (5526) MFN: fr partition size: 98304 bytes, maxminum 47 IDs can be stored
I (5526) MFN: No face ID in flash
```

`No face ID in flash` 表示還沒有註冊過任何人臉，正常。

### 8.2 註冊人臉

讓人臉正對攝像頭（距離 30-50cm，光照均勻），確保畫面中**只有一張人臉**。在串口發送：

```Plain
face_eril
```

設備檢測到人臉後自動提取特徵並註冊到 Flash：

```Plain
I (xxxx) ENROLL: ID 1 is enrolled
```

畫面疊加藍色文字 `Enroll: ID 1`，持續約 0.5 秒後消失。

> **注意**：命令是 `face_eril`（enroll 縮寫），不是 `face_enroll`。如果看到 `fail: unknown command`，檢查拼寫。

### 8.3 辨識識別人臉

註冊完成後，發送識別命令：

```Plain
face_rz
```

系統進入持續識別模式。當前人臉與 Flash 中所有已註冊 ID 比對：

- **匹配成功**：串口輸出 `Similarity: 0.85, Match ID: 1`，畫面持續疊加綠色 `ID: 1`

- **陌生人**：串口輸出 `Similarity: 0.32, Match ID: 0`，畫面持續疊加紅色 `who?`

> 標籤**持續顯示**不會消失。要退出識別模式，發送 `face_detect` 返回純檢測模式。

### 8.4 刪除人臉

```Plain
face_del
```

刪除最後註冊的人臉 ID，串口返回 `N IDs left`，畫面短暫顯示剩餘 ID 數量。Flash 中的特徵同步刪除。

### 8.5 退出識別模式

```Plain
face_detect
```

返回純人臉檢測模式（只畫框+關鍵點，不識別），ID 標籤清除。

> **關於 DETECT 模式**: 在 ESP32-S3 上，純人臉檢測模式的串口座標打印被禁用（`#if !CONFIG_IDF_TARGET_ESP32S3`），這是為了避免串口被檢測日誌刷屏。進入識別模式(`face_rz`)後才會輸出 `detection_result` 座標日誌。

## 完整命令速查

|命令|功能|標籤行為|是否持續|
|---|---|---|---|
|`face_eril`|註冊當前檢測到的人臉|藍色「Enroll: ID N」|閃現 0.5s|
|`face_rz`|進入持續識別模式|綠色「ID: N」/ 紅色「who?」|✅ 持續|
|`face_del`|刪除最後註冊的 ID|紅色「N IDs left」|閃現 0.5s|
|`face_detect`|退出識別，返回純檢測|清除所有標籤|—|

> 完整指令見[串口協議手冊](./ESP32-NanoCam-Serial-Protocol.md)。

## 操作流程示例

```Plain
ai_mode:4                          # 進入人臉識別模式
[設備重啟，LED 紫色]

face_eril                          # 註冊第一個人臉（張三）
→ ID 1 is enrolled

face_eril                          # 註冊第二個人臉（李四）
→ ID 2 is enrolled

face_rz                            # 開始持續識別
→ 張三站攝像頭前: 畫面持續顯示 "ID: 1"
→ 李四站攝像頭前: 畫面持續顯示 "ID: 2"
→ 陌生人站攝像頭前: 畫面持續顯示 "who?"

face_detect                        # 退出識別模式
→ 標籤消失，只畫檢測框

face_del                           # 刪除李四 (ID 2)
→ 1 IDs left

face_rz                            # 再次識別
→ 張三站攝像頭前: "ID: 1"
→ 李四站攝像頭前: "who?" (已被刪除)
```

> 人臉識別模式記憶體佔用較大（MFN 模型 + 人臉檢測雙模型），Type-C 串口（UART0）正常工作。如遇串口無響應，先檢查波特率是否為 115200。

## 程式碼

### 核心識別邏輯

`components/modules/ai/who_human_face_recognition.cpp` — 跳幀識別策略:

```C++
case RECOGNIZE:
{
    // 跳幀：每 10 次檢測執行 1 次 MFN 識別
    static int recog_skip = 0;
    if (recog_skip <= 0) {
        recognize_result = recognizer->recognize(
            (uint16_t *)frame->buf,
            {(int)frame->height, (int)frame->width, 3},
            detect_results.front().keypoint);
        recog_skip = 10;
    }
    recog_skip--;
    frame_show_state = SHOW_STATE_RECOGNIZE;
    break;
}
```

## 故障排除

|症狀|可能原因|解決|
|---|---|---|
|`No face ID in flash`|正常，還沒註冊過|發送 `face_eril` 註冊|
|識別結果始終 `who?`|光照不足/角度偏/相似度低於閾值|重新註冊，正對攝像頭，光度均勻|
|註冊時沒反應|畫面中人臉 ≠ 1 張|確保只有一張臉，距離 30-50cm|
|識別時畫面卡頓|正常，MFN 推理需要時間|已透過跳幀優化，每 10 幀跑一次|
|標籤閃爍|—|已修復，標籤持續顯示不消失|
|`fail: unknown command`|命令拼寫錯誤|檢查命令：`face_eril` 不是 `face_enroll`|

## 效果

註冊人臉→持續識別顯示 ID→I2C/串口輸出結果→控制繼電器/舵機，完整門禁方案。

下一章:[第 9 章:語音對話](./Ch09-Voice-Chat.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
