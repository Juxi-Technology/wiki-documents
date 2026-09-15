---
title: "无线遥操作排障指南"
description: "汇总 SO-ARM101 无线遥操作(ESP32-NanoCam 版)的常见故障:烧录与串口、摄像头、音频、网络与 micro-ROS 问题的现象、原因与解决办法。"
---

# 无线遥操作排障指南

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**

本页汇总 ESP32-NanoCam 版 SO-ARM101 无线遥操作的常见故障排查。完整操作流程见 [SO-ARM101 无线遥操作(ESP32-NanoCam 版)](./SO-ARM101-NanoCam-Wireless-Teleop.md)。

## 通用排障速查

| 现象 | 排查 |
|---|---|
| 烧录连不上 | 手动进下载模式(BOOT+复位);`platformio.ini` 加 `upload_port` |
| 烧录后无串口输出 | 检查 USB 线与 CH340 驱动;Windows 看设备管理器 COM 口 |
| 卡在 `Waiting for micro-ROS Agent...` | 查 AGENT_IP / UDP 8888 / 客户端隔离 |
| 舵机总线无响应(`servo_mask≠0x3f`) | 确认经舵机驱动板 UART 接 P2-7/P2-8;从臂 12V 5A 外部供电 |
| 麦克风电平恒 0 | 看 `audio: ES8311 ready` 日志;I2C 41/42 上拉;对麦克风吹气验证 |
| 扬声器无声 | 检查喇叭连接;ES8311 音量寄存器 `R_DAC32`(当前固件已设为最大 0xFF) |
| WiFi 经常断 | 检查天线、距离;RGB 变红表示 WiFi 丢失,10s 后自动重启 |

## 烧录与串口问题

- **烧录连不上**:按住 BOOT 键(GPIO0)→ 插 USB(或按复位)→ 松开 BOOT,立即重跑 upload。Windows 下若没自动识别串口,在 `platformio.ini` 的 `[env:nano_cam]` 加一行 `upload_port = COM3`(替换成设备管理器里 CH340 的实际 COM 号)。
- **烧录后无串口输出**:NanoCam 的 USB 是 CH340K → UART0,Linux 下设备名 `/dev/ttyUSB0`;如果插上没识别,检查 USB 线和 CH340 驱动(内核自带)。
- **舵机总线无响应(`servo_mask≠0x3f`)**:确认舵机总线通过舵机驱动板 UART 接在 **P2-7/P2-8**(GPIO19/20)而不是 UART0 的 43/44;从臂必须 12V 5A 外部供电(USB 带不动 6 个舵机)。
- **舵机总线与调试串口混淆**:调试串口是 USB-C(CH340K → UART0),与舵机总线完全独立,可以同时使用。

## 编译与工具链问题

- **首次 `pio run` 下载慢/卡住**(首次会依次下载 espressif32 平台、`toolchain-xtensa-esp32s3` 工具链约 100 MB 与 Arduino 框架约 200 MB):PlatformIO 剩余时间估算不准,常卡住一段时间后突然跳完,给 5 分钟观察百分比是否推进;可开代理/VPN(走系统代理);
- **手动下载工具链**:浏览器下载 `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip`(Linux 对应 `-linux-amd64.tar.gz`),解压后把目录改名为 `toolchain-xtensa-esp32s3` 放入 `C:\Users\<用户名>\.platformio\packages\`,重跑 `pio run`;中途 Ctrl+C 中断不会损坏环境,重跑会续传;
- **Windows 下 `pio` 命令在 Git Bash 里找不到**:改用 PowerShell/CMD 终端,或把 `C:\Users\<用户名>\.platformio\penv\Scripts` 加入 PATH。

## 摄像头专项排障

| 现象 | 根因 | 修复 |
|---|---|---|
| `i2c driver install error` + `camera probe failed` | **I2C 冲突**:ES8311 用 `Wire1` 占用 GPIO41/42,摄像头 SCCB 再装 I2C 驱动被拒 | `audio_es8311.cpp` 的 `init()` 末尾加 `Wire1.end()`,释放 I2C 给摄像头 |
| `JPEG format is not supported on this sensor`(0x106) | **GC2145 无硬件 JPEG 编码器**(仅 OV2640/OV5640 有) | 采集改用 `PIXFORMAT_RGB565`,`/stream` 和 `/jpg` 用 `frame2jpg` 软件编码成 JPEG |
| `/jpg`、`/stream` 无响应,浏览器一直转圈 | **httpd 栈溢出**:默认栈 8KB 容不下 `frame2jpg` 软编码 | `start_server()` 里 `config.stack_size = 16384` |
| `/stream` 打开但黑屏 | **缺 multipart 边界**:每帧之间没发 `STREAM_BOUNDARY`,浏览器无法解析 | 每帧发送前补发 `STREAM_BOUNDARY` |
| curl 测 `/jpg` 返回 `HTTP:000`,但浏览器能出图 | esp_http_server **单任务**:`/stream` 占用 httpd 任务时 `/jpg` 排不上队;或 curl 超时太短 | 关掉 `/stream` 再单独测 `/jpg`;用浏览器代替 curl 验证 |
| 摄像头初始化成功但全黑/无帧 | 多为**硬件**:AVDD/DOVDD 供电、PWDN 电平、排线接触 | 先用浏览器 `/jpg` 测快照(能出图=链路通);查摄像头 2.8V 供电与排线 |
| VGA 画面下方约 2/3 花屏 | **DVP 数据率过高**:VGA RGB565 超出此板 DVP 采样时序余量(24/20/16MHz × 单/双缓冲均复现);QVGA 正常 | 正式配置用 **QVGA 320×240**(FPV 够用),或换更稳的 XCLK/改 DVP 硬件走线 |

> 备注:表中前四项均已在随附固件中修复,烧录最新固件即可,无需手动改代码。

**注意**:esp_http_server 是单任务的,`/stream` 和 `/jpg` 不能同时访问——开着 `/stream` 时 `/jpg` 会一直挂起。抓单帧前先关掉流页面。

## 音频专项排障

| 现象 | 根因 | 修复 |
|---|---|---|
| 扬声器**完全无声** + 麦克风电平 ≈ 0(如 `0.0009`) | **MCLK 没输出**:legacy I2S 驱动在 ESP32-S3 上不产生 MCLK,ES8311 内部 DAC/ADC 无时钟 | 用 **LEDC 在 GPIO39 生成 6.15MHz MCLK**(`audio_es8311.cpp` 的 `start_ledc_mclk()`) |
| 提示音**太小**(贴耳才听到) | 数字振幅低 + ES8311 主音量小 | `play_tone` 振幅 12000→30000、`R_DAC32` 0x30→0xFF(约 +29dB) |
| 上电只有启动"嘀嘀",无其他提示音 | **正常现象**:就绪/解锁提示音是事件驱动,需跑遥操作才触发 | 启动音=上电即播;就绪音=Agent 通信建立;解锁音=收到控制命令 |

> 备注:前两项已在随附固件中修复;第三项为正常现象,无需处理。

## 麦克风、扬声器与 RGB 硬件检查

- **麦克风电平一直为 0**:检查 `audio: ES8311 ready` 日志;确认 MCLK 已输出(GPIO39 应有 ~1.65V,LEDC 生成);I2C 总线 41/42 上拉(板上已有 10K);对着麦克风吹气,看 `/follower_audio/level` 是否跳动。
- **扬声器无声**:确认 NS4150B 喇叭接在扬声器连接器上;确认 GPIO39 MCLK 有输出(LEDC,`start_ledc_mclk()`);音量寄存器 `R_DAC32`(当前 0xFF);ES8311 未初始化时日志会打印失败原因。
- **RGB 灯不亮**:WS2812 数据脚是 GPIO18,检查固件启动日志是否出现 `camera_stream` 之前的 RMT 初始化错误(一般不会)。

## 网络与 micro-ROS 问题

- **卡在 `Waiting for micro-ROS Agent...`**:依次检查 `AGENT_IP` 是否填的是 Ubuntu 电脑局域网 IP、UDP 8888 是否放行、路由器/热点是否开启了客户端隔离(需关闭)。NanoCam 的天线是模块上的 U.FL 天线,RSSI 差时先看天线与摆放,建议做 5/10/20/30 米距离实测。
- **WiFi 经常断**:检查天线与距离;RGB 变红表示 WiFi 丢失,固件会在 10s 超时后自动重启。
- **无法连通时先确认环境**:NanoCam 与 Ubuntu 电脑必须在同一 2.4GHz 局域网(手机热点即可);若换过网络,记得同步更新 `AGENT_IP` 与 WiFi 配置(见无线遥操作教程的"配置 WiFi"一节)。

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
