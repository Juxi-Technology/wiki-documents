---
title: 第 1 章:环境搭建
description: "ESP32-NanoCam 教程第 1 章:安装 CH340K 串口驱动,掌握 esptool-js 网页烧录、esptool 命令行、ESP-IDF 与 ESP-EIM-GUI 四种烧录环境搭建方式,并完成 xiaozhi.me 服务器账号注册。"
---

# 第 1 章:环境搭建

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**

**本章目标**:搭好固件烧录环境与服务器环境,为后续所有实操章节做准备。

## 1.1 固件烧录环境

### 方式A: 免开发环境(推荐新手)

1. 安装 [CH340K 串口驱动](https://www.wch.cn/download/CH341SER_EXE.html)

2. 打开浏览器 → [esptool-js](https://espressif.github.io/esptool-js/)

3. 连接 NanoCam,选择串口,选择固件 .bin 文件

4. 点击 Program 烧录

### 方式B: 命令行

```Bash
pip install esptool
esptool.py --chip esp32s3 --port COM_x write_flash 0x0 nanocam_xxx.bin
```

### 方式C: ESP-IDF 开发环境(进阶)

1. 安装 VSCode + ESP-IDF 插件

2. F1 → `ESP-IDF: Configure ESP-IDF Extension`

3. 选择或安装 ESP-IDF v5.4+

4. 编译: `idf.py build flash monitor`

### 方式D: ESP-EIM-GUI安装方式

1. 官网下载 [https://dl.espressif.cn/dl/eim/](https://dl.espressif.cn/dl/eim/)

2. 下载双击进入EIM页面，右上角可切换为中文版本

3. 点击开始安装

4. 下一步选择自定义安装

5. 在此之前需要安装好 `git` 和 `python3.12.x`（git国内下载源:[CNPM Binaries Mirror](https://registry.npmmirror.com/binary.html?path=git-for-windows/v2.55.0.windows.3/)）

6. 选择目标设备为esp32s3

7. 选择ESP-IDF版本这里需要选中“显示旧稳定版本”，往下滑选择v5.4.1版本

8. 选择下载镜像这里不变，下一步

9. 选择ESP-IDF功能，这里建议全选，继续下一步

10. 选择工具，这里下一步，之后选择想要安装的位置安装即可，等待安装完毕
安装完成之后这个版本会存在解压问题，找到目录 C:\Espressif\dist\xtensa-esp-elf-14.2.0_20241119-x86_64-w64-mingw32.zip，复制压缩包到 C:\Espressif\tools\xtensa-esp-elf，解压之后找到 xtensa-esp-elf 文件夹，将 C:\Espressif\tools\xtensa-esp-elf\esp-14.2.0_20241119 目录下的文件夹替换即可编译成功

## 1.2 服务器环境

### xiaozhi.me 官方服务(免费)

1. 访问 [xiaozhi.me](https://xiaozhi.me) 注册账号

2. 进入控制台

3. 模块联网之后会播报6位数字验证码

4. 点击“智能体”区块右侧的添加设备

5. 输入播报的6位数字验证码

6. 绑定设备后即可开始对话

下一章:[第 2 章:快速上手](./Ch02-Quick-Start.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
