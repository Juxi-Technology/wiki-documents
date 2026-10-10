---
title: "第 2 章:快速上手"
description: "ESP32-NanoCam 教程第 2 章:烧录固件并完成 WiFi 配网(串口或 AP 热点),在浏览器打开第一帧实时 MJPEG 画面,了解各 HTTP 端点。"
---

# 第 2 章:快速上手

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**

**本章目标**:烧录固件、完成 WiFi 配网,并在浏览器里看到 NanoCam 的第一帧实时画面。

## 2.1 固件烧录

### 步骤

1. 解压文件夹→ `nanocam_xxx.bin`
2. 打开 [esptool-js](https://espressif.github.io/esptool-js/)
3. Type-C 连接 NanoCam
4. 点击 Connect → 选择串口
5. 选择固件文件, 地址填 `0x0`
6. 点击 START → 等待完成

### 验证

串口工具(115200 8N1)连接 NanoCam, 应看到:

```Plain
NanoCam Board Ver:0.3.0
```

---

## 2.2 WiFi 配网

> 产出: **NanoCam 连上 WiFi, 获得 IP**

### 方式A: 串口配网(最常用)

```Plain
sta_ssid:你的WiFi名
sta_pd:你的WiFi密码
```

收到 `OK` → 设置成功。密码修改后自动重启。

> 完整串口指令见[串口协议手册](./ESP32-NanoCam-Serial-Protocol.md)。

### 方式B: AP 热点直连

NanoCam 自带热点: `NanoCam-AP`, 密码 `12345678`
手机连上后,浏览器打开 `http://192.168.4.1`

### 验证

```Plain
sta_ip
```

返回: `sta_ip:192.168.x.x` ✅

---

## 2.3 第一帧画面

> 产出: **浏览器看到 NanoCam 实时画面**
1. 浏览器输入 `http://<IP地址>`
2. 看到实时 MJPEG 画面
3. 串口发 `ai_mode:1` → 切换到猫脸检测 → 画面出现检测框

### 端点说明

|URL|用途|
|---|---|
|`http://<IP>/`|实时画面(HTML)|
|`http://<IP>/stream`|纯 MJPEG 流(OpenCV/VLC可读)|
|`http://<IP>/status`|设备状态 JSON|
|`http://<IP>/admin`|Web 管理后台|

下一章:[第 3 章:摄像头基础](./Ch03-Camera-Basics.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
