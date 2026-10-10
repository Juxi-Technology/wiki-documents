---
title: ESP32-NanoCam 快速开始指南
description: "ESP32-NanoCam 图传/AI 视觉模块快速开始:烧录固件、配置 WiFi、查看实时画面、切换 AI 模式并集成到 Arduino / Python 项目,五步上手。"
---

# ESP32-NanoCam 快速开始指南

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**

---

## 前期准备

- NanoCam 核心板 + 底板 (ESP32-S3 N16R8 + CH340K)
- USB Type-C 数据线 (支持数据传输)
- 电脑（Windows / Mac / Linux）
- GC2145 摄像头模组（出厂已连接）

![图 1:ESP32-NanoCam 核心板正面](../../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/1.png)
![图 2:ESP32-NanoCam 底板(USB-C 供电与串口烧录)](../../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/2.png)

---

## 第一步：烧录固件（3 分钟）

### 方式 A：免开发环境（推荐）

1. 打开浏览器访问 [esptool-js](https://espressif.github.io/esptool-js/)
2. 用 Type-C 线连接 NanoCam 到电脑
3. 选择串口，115200波特率
4. 找到解压压缩包后里面的固件文件`nanocam_xxx.bin`
5. 选择固件文件 `nanocam_xxx.bin`，地址 `0x0`
6. 点击 "START"，等待完成

### 方式 B：命令行（进阶）

```Bash
pip install esptool
esptool.py --chip esp32s3 --port COM3 write_flash 0x0 nanocam.bin
```

---

## 第二步：连接 WiFi（2 分钟）

NanoCam 默认 **AP+STA 双模式同时运行**，无需切换：
- **AP 热点**始终开启，手机直连 `NanoCam-AP`（密码 `12345678`），浏览器打开 `http://192.168.4.1`
- **STA 连路由器**需配置一次 WiFi：
用串口工具（波特率 **115200 8N1**）连接 NanoCam 的 Type-C 口：

```Plaintext
sta_ssid:你的WiFi名称
sta_pd:你的WiFi密码
```

> 收到 `OK` 表示设置成功。密码修改后会自动重启。
如需切换 WiFi 模式（通常不需要）：

|指令|模式|说明|
|---|---|---|
|`wifi_mode:0`|仅 AP|关闭 STA，只保留热点|
|`wifi_mode:1`|仅 STA|关闭热点，只连路由器|
|`wifi_mode:2`|AP+STA|默认，两者同时工作|

---

## 第三步：打开画面（1 分钟）

1. 串口发送 `sta_ip` 获取 STA IP
2. 浏览器输入 `http://<IP地址>`（或 AP 模式用 `http://192.168.4.1`）
3. 网页可以看到实时画面

---

## 第四步：玩转 AI（2 分钟）

在串口发送以下指令切换模式：

|指令|模式|效果|
|---|---|---|
|`ai_mode:0`|普通图传|实时 MJPEG 画面|
|`ai_mode:1`|猫脸检测|画面出现猫脸检测框|
|`ai_mode:2`|人脸检测|画面出现人脸检测框|
|`ai_mode:3`|颜色识别|框选颜色→实时追踪|
|`ai_mode:4`|人脸识别|注册→辨认→删除|
|`ai_mode:5`|二维码扫描|对准二维码→串口输出内容|
|`ai_mode:6`|LLM 智能体|语音唤醒 "你好小智" (XiaoZhi AI)|
|`ai_mode:7`|ESP-Claw|ESP-Claw AI Agent (乐鑫官方框架)|

> 每次切换模式需要手动重启，可以通过按下模块RST按键进行重启，重启后新模式生效。

---

## 第五步：集成到你的项目

### Arduino 控制

```C++
Serial.begin(115200);
Serial.print("ai_mode:2");  // 切换到人脸检测
```

### Python 控制

```Python
import serial
ser = serial.Serial("COM3", 115200)
ser.write(b"ai_mode:1\r\n")  # 切换到猫脸检测
```

### 查看完整指令

→ 串口 AT 协议手册

---

## 常见问题

|问题|解决|
|---|---|
|烧录失败|检查Type-C线是否支持数据，按住底板 S2(BOOT) 再上电|
|看不到画面|串口发 `sta_ip` 确认IP，检查是否同网段|
|摄像头不亮|检查FPC排线金属触点朝下插紧，检查 PWDN(IO12)/RESET(IO14)|
|WiFi连不上|发 `wifi_reset` 恢复出厂，重新配置|

更多问题 → [FAQ](https://FAQ.md)

---

## 下一步

- 📖 [串口协议手册](./ESP32-NanoCam-Serial-Protocol.md) — 完整 AT 指令参考
- 🎓 [教程大纲](./Ch01-Environment-Setup.md) — 递进式教程（本 wiki 收录 11 章）
- 🔧 [硬件规格书](./ESP32-NanoCam-Hardware-Spec.md) — GPIO 引脚全映射
- 🤖 [ROS2 集成指南](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop) — micro-ROS 无线遥操作教程

<RelatedProducts slugs="esp32-s3-wifi-module" />
