---
title: 产品信息
---

# 产品信息

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**

二自由度摄像头云台控制项目，支持颜色、人脸、QR码自动追踪。

---

## 📋 功能特性

- 🎮 键盘手动控制云台
- 🎯 颜色物体自动追踪
- 👤 人脸自动追踪
- 📱 QR码自动追踪
- 🔒 目标锁定机制
- 🚀 快速启动（使用 DSHOW 后端）

---

## 🛠 硬件配置

- **舵机型号**: SCS009
- **舵机分配**:
  - 1号舵机: 左右转动控制
  - 2号舵机: 上下俯仰控制
- **通信方式**: 串行总线驱动板
- **驱动板芯片**: CH343
- **波特率**: 默认 1Mbps

### 舵机参数


|参数|1号舵机（左右）|2号舵机（上下）|
|---|---|---|
|范围|220-802|220-511|
|中位|511|511|
|说明|220=左，802=右|220=上，511=中位|


---

## 📁 项目结构

```python
2-DOF-Camera-Gimbal/
├── docs/            # 文档和教程
│   └── tutorials/  # 教程文件
├── examples/        # 示例程序
│   ├── auto_tracking_demo.py  # 完整追踪演示
│   ├── basic_usage.py        # 基础使用示例
│   ├── keyboard_control.py    # 键盘控制示例
│   └── diagnostic.py         # 诊断工具
├── src/            # 源代码
│   ├── detectors/  # 目标检测器
│   │   ├── color_detector.py
│   │   ├── face_detector.py
│   │   └── qr_detector.py
│   ├── trackers/  # 追踪控制器
│   │   └── tracking_controller.py
│   └── sc_servo.py  # 舵机通信库
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 🚀 快速开始

### 安装依赖

```python
pip install -r requirements.txt
```

### 查找可用设备

**查找可用摄像头**

```python
python examples/list_cameras.py
```

**查找可用串口**

```python
python examples/list_ports.py
```

### 运行演示

使用命令行参数配置：

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

**参数说明**
- `--camera` 或 `-c`: 摄像头索引（默认 0）
- `--port` 或 `-p`: 串口设备（默认 COM3）
- `--color` 或 `-C`: 默认颜色（默认 red）

---

## 🎮 使用说明

### 快捷键


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


### 自动追踪使用流程

1. 按 `C` 连接云台
2. 选择模式（按 `1` 或 `2`）
3. 将目标物体移到画面中央
4. 按 `T` 锁定目标
5. 移动目标，云台会自动跟随

---

## 📚 文档和教程

详细教程请查看 docs/tutorials/ 目录：
- 01-快速开始指南.md - 快速上手使用
- 02-硬件与环境准备.md - 硬件清单和环境准备
- 03-基础使用.md - 键盘控制和基础使用
- 04-高级功能与追踪.md - 高级功能和追踪详解
- 05-故障排除.md - 常见问题和解决方法

---

## 🔧 技术说明

### 追踪控制参数

在 `src/trackers/tracking_controller.py` 中可以调整：

|参数|默认值|说明|
|---|---|---|
|kp_pan|0.08|左右追踪的比例增益|
|kp_tilt|0.12|上下追踪的比例增益|
|dead_zone|30|死区（像素），在此范围内不移动|
|min_move_interval|0.15|最小移动间隔（秒）|


### 目标锁定机制

锁定后，系统会根据以下条件选择目标：
- 距离锁定点最近（权重 70%）
- 大小与锁定时最相似（权重 30%）

---

## 📖 舵机规格

- **型号**: SCS009
- **工作电压**: 4V-7.4V（典型 6V）
- **堵转扭矩**: 6V 下 2.3kg·cm
- **协议**: 半双工异步串口（TTL）
