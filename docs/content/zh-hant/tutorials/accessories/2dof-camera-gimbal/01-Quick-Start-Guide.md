---
title: 快速開始指南
---

# 快速開始指南

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**

> 適用於硬體已經組裝好，想要快速體驗功能的使用者

---

## 步驟 0：尋找可用裝置

在開始之前，我們需要找到正確的攝影機和串口。

### 尋找可用攝影機

```python
python examples/list_cameras.py
```

程式會列出所有可用攝影機和索引，記住你需要使用的索引（通常為 0）。

### 尋找可用串口

```python
python examples/list_ports.py
```

程式會列出所有可用串口，Windows 下為 COM3、COM4 等，Linux 下為 /dev/ttyUSB0 等。

---

## 步驟 1：安裝相依性

```python
pip install -r requirements.txt
```

---

## 步驟 2：按順序執行分步教程（可選但推薦）

為了更好地理解系統，建議按順序執行這幾個程式：
1. **01_camera_only.py** - 僅顯示攝影機畫面，不連接雲台

```python
python examples/01_camera_only.py --camera 0
```

功能：驗證攝影機是否正常工作
1. **02_gimbal_only.py** - 僅控制雲台，不連接攝影機

```python
python examples/02_gimbal_only.py --port COM3
```

功能：驗證舵機和驅動板連接是否正常
1. **03_simple_gimbal_camera.py** - 攝影機和雲台結合

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

功能：手動控制雲台的同時查看攝影機畫面
1. **04_color_track_simple.py** - 簡單的顏色追蹤（無鎖定）

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

功能：最基礎的自動追蹤示範

---

## 步驟 3：執行完整程式

當你熟悉了基礎功能後，執行完整的自動追蹤程式：

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

---

## 完整程式快捷鍵


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


---

## 快速體驗流程

### 顏色追蹤體驗

1. 按 `C` 連接雲台
2. 按 `2` 進入顏色追蹤模式
3. 將紅色物體（或其他顏色）移到畫面中央
4. 按 `T` 鎖定目標
5. 移動物體，觀察雲台跟隨

### 人臉追蹤體驗

1. 按 `C` 連接雲台
2. 按 `1` 進入人臉追蹤模式
3. 將人臉放在畫面中央
4. 按 `T` 鎖定目標
5. 移動人臉，觀察雲台跟隨

---

## 常見問題快速解答

問：程式提示找不到串口號？
答：執行 `list_ports.py` 查看可用串口，然後使用 `--port` 參數指定。
問：攝影機打不開？
答：執行 `list_cameras.py` 查看可用攝影機，使用 `--camera` 參數指定索引。
問：雲台不動？
答：確認已按 `C` 連接雲台，並且舵機電源已接通。
問：追蹤方向反了？
答：查看疑難排解章節。
