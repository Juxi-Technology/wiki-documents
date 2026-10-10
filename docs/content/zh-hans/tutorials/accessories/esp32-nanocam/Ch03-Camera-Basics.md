---
title: "第 3 章:摄像头基础"
description: "ESP32-NanoCam 教程第 3 章——DVP 摄像头接口、MJPEG 推流与 PSRAM 帧缓冲原理,认识内置 AI 模式。"
---

# 第 3 章:摄像头基础

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**

**本章目标**:理解 NanoCam 的摄像头数据链路,并认识固件内置的各 AI 模式。

## 原理

NanoCam 通过 DVP(数字视频并行)接口连接摄像头。GC2145 传感器输出 8-bit 并行像素数据,ESP32-S3 的 LCD_CAM 外设通过 DMA 直接存入 PSRAM,然后由 HTTP 服务器以 MJPEG 格式推流到浏览器。

### 关键概念

- **DVP**: 8线并行数据 + 3线同步信号(VSYNC/HREF/PCLK)
- **MJPEG**: 每一帧是独立的 JPEG 图片,浏览器连续加载实现视频效果
- **PSRAM**: 8MB PSRAM 用作帧缓冲,可存 2-4 帧

## 步骤

### 3.1 查看默认画面

固件烧录后默认为流模式,浏览器打开 `http://<IP>` 即可看到画面。

|指令|功能|
|---|---|
|ai_mode:0\r|传图传模块|
|ai_mode:1\r|猫脸检测|
|ai_mode:2\r|人脸检测|
|ai_mode:3\r|颜色识别|
|ai_mode:4\r|人脸识别|
|ai_mode:5\r|二维码识别|
> 完整 AI 模式与串口指令见[串口协议手册](./ESP32-NanoCam-Serial-Protocol.md)。

下一章:[第 4 章:人脸检测](./Ch04-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
