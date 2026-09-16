---
title: "01-GUI可视化控制"
description: "本目录提供上位机控制工具:连接 ESP32 后,用电脑点按钮/敲命令让灵巧手做手势。"
---

# 01-GUI可视化控制

可视化手势指令 — 使用教程

本目录提供**上位机控制工具**:连接 ESP32 后,用电脑点按钮/敲命令让灵巧手做手势。

> 适用:ESP32-S3 + 8 路 PWM 舵机(差动驱动)。固件烧录见 `..\03_firmware_docs` 的说明。

## 一、两种使用方式

|方式|需要|适合|
|---|---|---|
|**打包程序**(推荐)|双击 `AmazingHand控制台.exe`|免装 Python,即点即用|
|**源码运行**|64 位 Python 3.12|需要手势追踪、或自定义|

## 二、方式一:双击 exe

1. 双击 `AmazingHand控制台.exe`。

2. **选串口**:顶部下拉框选 ESP32 的 COM 口(设备管理器查看)。

3. 点**「连接」**:状态灯变绿,日志显示"已连接"。

4. 点手势按钮:**石头 / 剪刀 / 布 / 真棒 / OK / 捏合 / 指向 / 张开 / 握拳**,灵巧手执行。

5. **左右手**:勾选「右手」/「左手」切换(拇指镜像方向不同)。

6. **舵机直驱**:拖 8 个滑块,实时控制单个舵机角度(0-180°)。

7. **手指差动控制**:每根手指两个进度条——

    - **弯曲◀▶伸直**:手指弯曲或伸直(范围 -70 ~ +70)。

    - **右摆◀▶左摆**:手指左右摆动(范围 60 ~ 120,90=中立)。

8. **重复 / 停止**:重复上一次手势 / 立即中断。

## 三、方式二:源码运行

### 安装依赖

需要 **64 位 Python 3.12**(mediapipe 只支持 64 位)。

```Bash
# 1. 安装基础依赖
pip install -r requirements.txt

# 2. 安装追踪依赖(需要手势追踪时,自动建虚拟环境)
setup_tracking.bat
```

### 运行

```Bash
# 用追踪环境启动(含 mediapipe)
tracking_env\Scripts\python hand_gui.py
```

> 或直接 `python hand_gui.py`(任意带 pyserial 的 Python)。

### GUI 内置手势追踪

GUI 里自带**手势追踪**面板(摄像头跟随手部动作):

1. 连接串口后,滚动到「手势追踪 (MediaPipe 摄像头)」面板。

2. 选摄像头号(默认 0),点**「开始追踪」**。

3. 把手放进摄像头画面,灵巧手跟随弯曲/伸直。

> 追踪需要 `setup_tracking.bat` 装好 mediapipe。免安装 exe 不含追踪功能。

## 四、命令行测试(serial_test.py)

```Bash
# 链路测试(先确认能通)
python serial_test.py COM3 nop

# 手势
python serial_test.py COM3 rock         # 石头
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 张开
python serial_test.py COM3 close        # 握拳

# 单舵机直驱
python serial_test.py COM3 servo 1 90   # 舵机1 → 90°

# 全部归中
python serial_test.py COM3 mid

# 设左右手
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# 扫频/自检
python serial_test.py COM3 sweep 1      # 舵机1 扫频
python serial_test.py COM3 test         # 全部舵机逐个测试
```

## 五、常见问题

|现象|处理|
|---|---|
|舵机不动|检查供电(5V 3A 独立电源)、COM 口、接线|
|exe 闪退|用源码方式运行(打包版可能缺依赖)|
|摄像头没画面|允许摄像头权限(设置→隐私→相机)|
|手型反了|勾选相反的左右手|

> 完整协议与命令说明见 `..\03_firmware_docs\用户手册.md`。

