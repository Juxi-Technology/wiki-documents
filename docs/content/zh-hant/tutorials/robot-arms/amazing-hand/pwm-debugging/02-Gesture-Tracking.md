---
title: "02-手勢追蹤教程"
description: "手勢追蹤 — 使用教程(PWM 舵機版)"
---

# 02-手勢追蹤教程

**手勢追蹤 — 使用教程(PWM 舵機版)**

本目錄提供**手勢追蹤**:攝像頭識別你的手,靈巧手實時跟隨(完整 IK 鏈路)。

> 鏈路:攝像頭 → mediapipe 手部骨架 → MuJoCo+IK → 8 關節角 → ESP32 → PWM 舵機

> 適用:ESP32-S3 + 8 路 PWM 舵機。固件燒錄見 `..\03_firmware_docs`。

## 一、前置條件

1. **硬件**:ESP32-S3 + 8 路 PWM 舵機通電、USB 接好、攝像頭可用。

2. **固件**:已燒錄(見 `..\03_firmware_docs` 的使用者手冊)。

3. **首次部署**(只需一次,見下)。

## 二、首次部署

### 2.1 安裝環境

進入 `Demo\Windows_Scripts_CN\`(英文系統用 `Windows_Deploy_Scripts\`),按編號雙擊:

```Plaintext
1-安装环境.bat   → 安装 Rust / uv / dora(几分钟)
```

裝完**關掉終端重新打開**一次。

### 2.2 部署 Demo

```Plaintext
3-部署代码.bat   → 创建 Python 环境 + 编译 AHControl + 安装依赖(几分钟)
```

## 三、執行手勢追蹤(每次)

### 3.1 雙擊執行腳本

進入 `Demo\Windows_Scripts_CN\`,雙擊 `4-运行代码.bat`:

```Plaintext
Select a run mode:
   1 - 模拟仿真（摄像头手势追踪）
   2 - 真实硬件（SCS0009 总线舵机）
   3 - PWM 舵机（ESP32 直驱）    ← 选 3
```

再選手型:

```Plaintext
PWM 舵机（ESP32 直驱）- 请选择灵巧手：
   1 - 右手          ← 选 1
   2 - 左手          ← 选 2
```

### 3.2 開始使用

1. 腳本自動 `dora build` + `dora run`。

2. 攝像頭視窗打開,3D 仿真手指出現。

3. 把手放進畫面、動手指 → **3D 仿真跟隨 → 靈巧手跟隨**。

4. 停止:Ctrl+C(或關閉視窗)。

> Linux 系統:用 `Demo\Linux_Scripts_CN\`(中文)或 `Linux_Deploy_Scripts\`(英文),腳本名帶 `.sh`,需 `bash 腳本名` 或加執行權限執行。

## 四、怎麼確認執行正常

執行視窗裡 AHControl 節點會輸出:

```Plaintext
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N`(如 `sent 300 frames, ESP32 acked 300 frames`)→ **正常**,舵機鏈路通。

- `M = 0` → ESP32 沒收到數據,查串口/供電(見下)。

只要這行在增長,就說明舵機鏈路正常,剩下的就是攝像頭跟不跟得上的問題。

## 五、切換左右手

在執行選單裡選手型即可。切換後腳本自動重新構建,等構建完成再操作。

## 六、常見問題

|現象|處理|
|---|---|
|舵機完全不動|查供電(5V 3A)、COM 口、接線;日誌 `acked M frames` 是否為 0|
|攝像頭沒畫面|允許攝像頭權限(設定→隱私→相機)|
|手不跟隨 / 遲鈍|光線充足、手完整入畫、動慢一點幅度大一點|
|手型反了 / 拇指方向反|選單裡選對了左/右手嗎?換另一個試試|
|換了 USB 口找不到串口|重跑 `2-配置串口.bat`,選一次新 COM 口|

## 七、SCS0009 總線舵機使用者

本 Demo 同時支援官方 **SCS0009 總線舵機**。選單選 `2 - 真實硬件(SCS0009 總線舵機)`,配置與說明見 `Demo\双版本舵机并存说明.md` 及官方教程。

## 目錄說明

|路徑|內容|
|---|---|
|`Demo\AHControl`|Rust 舵機控制程式(源碼,部署時自動編譯)|
|`Demo\AHSimulation`|MuJoCo 仿真 + IK 求解|
|`Demo\HandTracking`|MediaPipe 手部追蹤|
|`Demo\Windows_Scripts_CN` / `Windows_Deploy_Scripts`|Windows 一鍵腳本(中/英)|
|`Demo\Linux_Scripts_CN` / `Linux_Deploy_Scripts`|Linux 一鍵腳本(中/英)|
|`Demo\dataflow_*_pwm.yml`|PWM 版數據流(已內置波特率 115200)|

