---
title: ESP32-NanoCam Quick Start
description: "ESP32-NanoCam video streaming / AI vision module quick start: flash the firmware, configure WiFi, view the live video, switch AI modes and integrate with Arduino / Python projects — in five steps."
---

# ESP32-NanoCam Quick Start

> **[Buy in Store](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**


The ESP32-NanoCam is Juxi Technology's ESP32-S3 video streaming / AI vision module (product page: [ESP32-S3 WiFi Video Module](/products/esp32-s3-wifi-module)), with a core board + base board dual-board architecture. This guide walks you through firmware flashing, WiFi connection, video viewing and AI mode switching in five steps.

## Prerequisites

- NanoCam core board + base board (ESP32-S3 N16R8 + CH340K)
- USB Type-C data cable (data transfer supported)
- Computer (Windows / Mac / Linux)
- GC2145 camera module (connected at the factory)

![Figure 1: ESP32-NanoCam core board, front](../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/1.png)

![Figure 2: ESP32-NanoCam base board (USB-C power and serial flashing)](../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/2.png)

## Step 1: Flash the Firmware (3 minutes)

### Method A: No Development Environment (Recommended)

1. Install the [CH340K serial driver](https://www.wch.cn/download/CH341SER_EXE.html)
2. Open your browser and visit [esptool-js](https://espressif.github.io/esptool-js/)
3. Connect the NanoCam to your computer with a Type-C cable
4. Select the serial port, baud rate 115200
5. Find the firmware file `nanocam_xxx.bin` inside the extracted archive
6. Select the firmware file `nanocam_xxx.bin`, address `0x0`
7. Click "START" and wait for completion

### Method B: Command Line (Advanced)

```Bash
pip install esptool
esptool.py --chip esp32s3 --port COM3 write_flash 0x0 nanocam.bin
```

## Step 2: Connect to WiFi (2 minutes)

By default the NanoCam runs **AP+STA dual mode simultaneously** — no switching required:

- The **AP hotspot** is always on: connect your phone directly to `NanoCam-AP` (password `12345678`), then open `http://192.168.4.1` in a browser
- **STA to a router**: configure the WiFi once

Connect to the NanoCam's Type-C port with a serial tool (baud rate **115200 8N1**):

```Plaintext
sta_ssid:你的WiFi名称
sta_pd:你的WiFi密码
```

> Receiving `OK` means the configuration succeeded. The device reboots automatically after the password is changed.

To switch WiFi modes (usually not necessary):

|Command|Mode|Description|
|---|---|---|
|`wifi_mode:0`|AP only|Disables STA, keeps only the hotspot|
|`wifi_mode:1`|STA only|Disables the hotspot, connects only to the router|
|`wifi_mode:2`|AP+STA|Default; both work simultaneously|

## Step 3: View the Video (1 minute)

1. Send `sta_ip` over serial to get the STA IP
2. Enter `http://<IP address>` in your browser (or `http://192.168.4.1` in AP mode)
3. The web page shows the live video

## Step 4: Explore the AI (2 minutes)

Send the following commands over serial to switch modes:

|Command|Mode|Effect|
|---|---|---|
|`ai_mode:0`|Normal streaming|Real-time MJPEG video|
|`ai_mode:1`|Cat face detection|Cat face detection boxes appear on screen|
|`ai_mode:2`|Face detection|Face detection boxes appear on screen|
|`ai_mode:3`|Color recognition|Select a color → real-time tracking|
|`ai_mode:4`|Face recognition|Enroll → identify → delete|
|`ai_mode:5`|QR code scanning|Aim at a QR code → content output to serial|
|`ai_mode:6`|LLM agent|Voice wake-up "你好小智" (XiaoZhi AI)|
|`ai_mode:7`|ESP-Claw|ESP-Claw AI Agent (official Espressif framework)|

> Each mode switch requires a manual reboot — press the module's RST button to reboot; the new mode takes effect after the restart.

## Step 5: Integrate Into Your Project

### Arduino Control

```C++
Serial.begin(115200);
Serial.print("ai_mode:2");  // 切换到人脸检测
```

### Python Control

```Python
import serial
ser = serial.Serial("COM3", 115200)
ser.write(b"ai_mode:1\r\n")  # 切换到猫脸检测
```

### View the Complete Command List

Full command reference: [Serial Protocol Manual](./ESP32-NanoCam-Serial-Protocol.md).

## FAQ

|Problem|Solution|
|---|---|
|Flashing fails|Check that the Type-C cable supports data; hold S2(BOOT) on the base board while powering on|
|No video|Send `sta_ip` over serial to confirm the IP; check that both devices are on the same subnet|
|Camera stays dark|Check that the FPC cable is fully seated with the metal contacts facing down; check PWDN(IO12)/RESET(IO14)|
|Cannot connect to WiFi|Send `wifi_reset` to restore factory settings, then configure again|

## Next Steps

- 📖 [Serial Protocol Manual](./ESP32-NanoCam-Serial-Protocol.md) — complete AT command reference
- 🎓 [Tutorial Outline](./Ch01-Environment-Setup.md) — progressive tutorial (11 chapters covered in this wiki)
- 🔧 [Hardware Spec](./ESP32-NanoCam-Hardware-Spec.md) — complete GPIO pin mapping
- 🤖 [ROS2 Integration Guide](/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop) — micro-ROS wireless teleoperation tutorial

<RelatedProducts slugs="esp32-s3-wifi-module" />
