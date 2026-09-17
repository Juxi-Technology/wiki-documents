---
title: "02-手势追踪教程"
description: "AmazingHand 手势追踪教程(PWM 舵机版):摄像头捕捉手部动作,经 MediaPipe 与 IK 解算后由 ESP32-S3 直驱 8 路 PWM 舵机实时跟随。"
---

# 02-手势追踪教程

**手势追踪 — 使用教程(PWM 舵机版)**

本目录提供**手势追踪**:摄像头识别你的手,灵巧手实时跟随(完整 IK 链路)。

> 链路:摄像头 → mediapipe 手部骨架 → MuJoCo+IK → 8 关节角 → ESP32 → PWM 舵机

> 适用:ESP32-S3 + 8 路 PWM 舵机。固件烧录见 `..\03_firmware_docs`。

## 一、前置条件

1. **硬件**:ESP32-S3 + 8 路 PWM 舵机通电、USB 接好、摄像头可用。

2. **固件**:已烧录(见 `..\03_firmware_docs` 的用户手册)。

3. **首次部署**(只需一次,见下)。

## 二、首次部署

### 2.1 安装环境

进入 `Demo\Windows_Scripts_CN\`(英文系统用 `Windows_Deploy_Scripts\`),按编号双击:

```Plaintext
1-安装环境.bat   → 安装 Rust / uv / dora(几分钟)
```

装完**关掉终端重新打开**一次。

### 2.2 部署 Demo

```Plaintext
3-部署代码.bat   → 创建 Python 环境 + 编译 AHControl + 安装依赖(几分钟)
```

## 三、运行手势追踪(每次)

### 3.1 双击运行脚本

进入 `Demo\Windows_Scripts_CN\`,双击 `4-运行代码.bat`:

```Plaintext
Select a run mode:
   1 - 模拟仿真（摄像头手势追踪）
   2 - 真实硬件（SCS0009 总线舵机）
   3 - PWM 舵机（ESP32 直驱）    ← 选 3
```

再选手型:

```Plaintext
PWM 舵机（ESP32 直驱）- 请选择灵巧手：
   1 - 右手          ← 选 1
   2 - 左手          ← 选 2
```

### 3.2 开始使用

1. 脚本自动 `dora build` + `dora run`。

2. 摄像头窗口打开,3D 仿真手指出现。

3. 把手放进画面、动手指 → **3D 仿真跟随 → 灵巧手跟随**。

4. 停止:Ctrl+C(或关闭窗口)。

> Linux 系统:用 `Demo\Linux_Scripts_CN\`(中文)或 `Linux_Deploy_Scripts\`(英文),脚本名带 `.sh`,需 `bash 脚本名` 或加执行权限运行。

## 四、怎么确认运行正常

运行窗口里 AHControl 节点会输出:

```Plaintext
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N`(如 `sent 300 frames, ESP32 acked 300 frames`)→ **正常**,舵机链路通。

- `M = 0` → ESP32 没收到数据,查串口/供电(见下)。

只要这行在增长,就说明舵机链路正常,剩下的就是摄像头跟不跟得上的问题。

## 五、切换左右手

在运行菜单里选手型即可。切换后脚本自动重新构建,等构建完成再操作。

## 六、常见问题

|现象|处理|
|---|---|
|舵机完全不动|查供电(5V 3A)、COM 口、接线;日志 `acked M frames` 是否为 0|
|摄像头没画面|允许摄像头权限(设置→隐私→相机)|
|手不跟随 / 迟钝|光线充足、手完整入画、动慢一点幅度大一点|
|手型反了 / 拇指方向反|菜单里选对了左/右手吗?换另一个试试|
|换了 USB 口找不到串口|重跑 `2-配置串口.bat`,选一次新 COM 口|

## 七、SCS0009 总线舵机用户

本 Demo 同时支持官方 **SCS0009 总线舵机**。菜单选 `2 - 真实硬件(SCS0009 总线舵机)`,配置与说明见 `Demo\双版本舵机并存说明.md` 及官方教程。

## 目录说明

|路径|内容|
|---|---|
|`Demo\AHControl`|Rust 舵机控制程序(源码,部署时自动编译)|
|`Demo\AHSimulation`|MuJoCo 仿真 + IK 求解|
|`Demo\HandTracking`|MediaPipe 手部追踪|
|`Demo\Windows_Scripts_CN` / `Windows_Deploy_Scripts`|Windows 一键脚本(中/英)|
|`Demo\Linux_Scripts_CN` / `Linux_Deploy_Scripts`|Linux 一键脚本(中/英)|
|`Demo\dataflow_*_pwm.yml`|PWM 版数据流(已内置波特率 115200)|

