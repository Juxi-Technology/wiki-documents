---
title: 產品資訊
---

# 產品資訊

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**

二自由度攝影機雲台控制專案，支援顏色、人臉、QR碼自動追蹤。

---

## 📋 功能特性

- 🎮 鍵盤手動控制雲台
- 🎯 顏色物體自動追蹤
- 👤 人臉自動追蹤
- 📱 QR碼自動追蹤
- 🔒 目標鎖定機制
- 🚀 快速啟動（使用 DSHOW 後端）

---

## 🛠 硬體配置

- **舵機型號**：SCS009
- **舵機分配**：
  - 1號舵機：左右轉動控制
  - 2號舵機：上下俯仰控制
- **通訊方式**：串行總線驅動板
- **驅動板晶片**：CH343
- **鮑率**：預設 1Mbps

### 舵機參數


|參數|1號舵機（左右）|2號舵機（上下）|
|---|---|---|
|範圍|220-802|220-511|
|中位|511|511|
|說明|220=左，802=右|220=上，511=中位|


---

## 📁 專案結構

```python
2-DOF-Camera-Gimbal/
├── docs/            # 文檔和教程
│   └── tutorials/  # 教程檔案
├── examples/        # 範例程式
│   ├── auto_tracking_demo.py  # 完整追蹤示範
│   ├── basic_usage.py        # 基礎使用範例
│   ├── keyboard_control.py    # 鍵盤控制範例
│   └── diagnostic.py         # 診斷工具
├── src/            # 原始碼
│   ├── detectors/  # 目標偵測器
│   │   ├── color_detector.py
│   │   ├── face_detector.py
│   │   └── qr_detector.py
│   ├── trackers/  # 追蹤控制器
│   │   └── tracking_controller.py
│   └── sc_servo.py  # 舵機通訊庫
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 🚀 快速開始

### 安裝相依性

```python
pip install -r requirements.txt
```

### 尋找可用裝置

**尋找可用攝影機**

```python
python examples/list_cameras.py
```

**尋找可用串口**

```python
python examples/list_ports.py
```

### 執行示範

使用命令列參數設定：

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

**參數說明**
- `--camera` 或 `-c`：攝影機索引（預設 0）
- `--port` 或 `-p`：串口裝置（預設 COM3）
- `--color` 或 `-C`：預設顏色（預設 red）

---

## 🎮 使用說明

### 快捷鍵


|按鍵|功能|
|---|---|
|1|切換到人臉追蹤模式|
|2|切換到顏色追蹤模式|
|C|連接雲台|
|R|雲台回中|
|T|鎖定/開始追蹤目標|
|S|停止追蹤|
|X|顏色模式：紅色|
|Y|顏色模式：綠色|
|Z|顏色模式：藍色|
|Q|退出程式|


### 自動追蹤使用流程

1. 按 `C` 連接雲台
2. 選擇模式（按 `1` 或 `2`）
3. 將目標物體移到畫面中央
4. 按 `T` 鎖定目標
5. 移動目標，雲台會自動跟隨

---

## 📚 文檔和教程

詳細教程請查看 docs/tutorials/ 目錄：
- 01-快速開始指南.md - 快速上手使用
- 02-硬體與環境準備.md - 硬體清單和環境準備
- 03-基礎使用.md - 鍵盤控制和基礎使用
- 04-高級功能與追蹤.md - 高級功能和追蹤詳解
- 05-故障排除.md - 常見問題和解決方法

---

## 🔧 技術說明

### 追蹤控制參數

在 `src/trackers/tracking_controller.py` 中可以調整：

|參數|預設值|說明|
|---|---|---|
|kp_pan|0.08|左右追蹤的比例增益|
|kp_tilt|0.12|上下追蹤的比例增益|
|dead_zone|30|死區（像素），在此範圍內不移動|
|min_move_interval|0.15|最小移動間隔（秒）|


### 目標鎖定機制

鎖定後，系統會根據以下條件選擇目標：
- 距離鎖定點最近（權重 70%）
- 大小與鎖定時最相似（權重 30%）

---

## 📖 舵機規格

- **型號**：SCS009
- **工作電壓**：4V-7.4V（典型 6V）
- **堵轉扭矩**：6V 下 2.3kg·cm
- **協議**：半雙工非同步串口（TTL）
