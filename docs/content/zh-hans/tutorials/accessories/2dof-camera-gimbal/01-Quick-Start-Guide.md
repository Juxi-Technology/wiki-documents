---
title: 快速开始指南
---

# 快速开始指南

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**

> 适用于硬件已经组装好，想要快速体验功能的用户

---

## 步骤 0: 查找可用设备

在开始之前，我们需要找到正确的摄像头和串口。

### 查找可用摄像头

```python
python examples/list_cameras.py
```

程序会列出所有可用摄像头和索引，记住你需要使用的索引（通常为 0）。

### 查找可用串口

```python
python examples/list_ports.py
```

程序会列出所有可用串口，Windows 下为 COM3、COM4 等，Linux 下为 /dev/ttyUSB0 等。

---

## 步骤 1: 安装依赖

```python
pip install -r requirements.txt
```

---

## 步骤 2: 按顺序运行分步教程（可选但推荐）

为了更好地理解系统，建议按顺序运行这几个程序：
1. **01_camera_only.py** - 仅显示摄像头画面，不连接云台

```python
python examples/01_camera_only.py --camera 0
```

功能：验证摄像头是否正常工作
1. **02_gimbal_only.py** - 仅控制云台，不连接摄像头

```python
python examples/02_gimbal_only.py --port COM3
```

功能：验证舵机和驱动板连接是否正常
1. **03_simple_gimbal_camera.py** - 摄像头和云台结合

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

功能：手动控制云台的同时查看摄像头画面
1. **04_color_track_simple.py** - 简单的颜色追踪（无锁定）

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

功能：最基础的自动追踪演示

---

## 步骤 3: 运行完整程序

当你熟悉了基础功能后，运行完整的自动追踪程序：

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

---

## 完整程序快捷键


|按键|功能|
|---|---|
|1|切换到人脸追踪模式|
|2|切换到颜色追踪模式|
|C|连接云台|
|R|云台回中|
|T|锁定/开始追踪目标|
|S|停止追踪|
|X|颜色模式：红色|
|Y|颜色模式：绿色|
|Z|颜色模式：蓝色|
|Q|退出程序|


---

## 快速体验流程

### 颜色追踪体验

1. 按 `C` 连接云台
2. 按 `2` 进入颜色追踪模式
3. 将红色物体（或其他颜色）移到画面中央
4. 按 `T` 锁定目标
5. 移动物体，观察云台跟随

### 人脸追踪体验

1. 按 `C` 连接云台
2. 按 `1` 进入人脸追踪模式
3. 将人脸放在画面中央
4. 按 `T` 锁定目标
5. 移动人脸，观察云台跟随

---

## 常见问题快速解答

问：程序提示找不到串口号？
答：运行 `list_ports.py` 查看可用串口，然后使用 `--port` 参数指定。
问：摄像头打不开？
答：运行 `list_cameras.py` 查看可用摄像头，使用 `--camera` 参数指定索引。
问：云台不动？
答：确认已按 `C` 连接云台，并且舵机电源已接通。
问：追踪方向反了？
答：查看故障排除章节。
