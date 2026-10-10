---
title: "第 4 章:人脸检测"
description: "ESP32-NanoCam 教程第 4 章:使用 ESP-DL MobileNet 检测人脸并标注人脸框与 5 个关键点,用 Arduino/Python 读取坐标控制舵机。"
---

# 第 4 章:人脸检测

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**

**本章目标**:让 NanoCam 检测画面中的人脸、标注人脸框与关键点,并读取坐标用于外部控制。

## 原理

人脸检测使用 ESP-DL 深度学习库,基于 MobileNet 轻量级检测模型。输入 320x240 RGB565 图像,输出人脸边界框列表(位置+大小+置信度)。推理在 ESP32-S3 上完成,无需联网。

### 检测结果格式

- 坐标: 左上角(x,y) + 宽高(w,h)
- 置信度: 0-1 之间的浮点数
- 多人脸时返回多个框

## 步骤

### 4.1 切换模式

```Plain
ai_mode:2
```

> 完整指令见[串口协议手册](./ESP32-NanoCam-Serial-Protocol.md)。

### 4.2 观察效果

浏览器 `http://<IP>` 看到人脸检测框。

### 4.3 获取坐标

串口输出格式:

```Plain
I (xxxxx) detection_result: [ 0]: ( 45,  30, 180, 210)
I (xxxxx) detection_result:       left eye: ( 90,  80), right eye: (150,  80), nose: (120, 120), mouth left: ( 95, 150), mouth right: (145, 150)
```

- 第一行：`[序号] (x, y, w, h)` — 人脸框坐标
- 第二行：5 个关键点 — 左眼、右眼、鼻子、左嘴角、右嘴角

## 代码

### Arduino 读取坐标控制舵机

```C++
// 解析 $face:x,y,w,h# 格式
if (nanoSerial.available()) {
    String line = nanoSerial.readStringUntil('\n');
    if (line.startsWith("$face:")) {
        int x = line.substring(6).toInt();
        int y = line.substring(line.indexOf(',')+1).toInt();
        servoX.write(map(x, 0, 320, 0, 180));
    }
}
```

### Python 读取

```Python
ser = serial.Serial("COM3", 115200)
line = ser.readline().decode()
if line.startswith("$face:"):
    parts = line[6:-1].split(",")
    x, y, w, h = map(int, parts)
```

## 效果

摄像头前出现人脸→画面标注绿框→串口输出坐标。

下一章:[第 5 章:猫脸检测](./Ch05-Cat-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
