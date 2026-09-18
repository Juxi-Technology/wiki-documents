---
title: "第二步:查看串口设备端口号(macOS)"
description: "在 Mac 下查看串口端口号:列出串口设备并赋予读写权限,记录两个机械臂的端口;系统识别出的两类串口驱动属正常现象,任选其一即可。"
---

# 第二步:查看串口设备端口号(macOS)

## 查看端口

```Shell
ls /dev/tty.*
```

效果类似下图，用两个端口中的任意一个都可

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-MacOS/1.png)

## 给端口赋予权限

让所有用户都有权限读写这些串口设备

```Shell
chmod 666 /dev/tty.*
```

## 记录我的端口

从动臂：

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

主动臂：

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## 为什么Mac中会有两个端口？

我们用的舵机控制板，在Mac系统中被**同时识别为了两种不同类型的串口驱动**，所以会显示两个端口：

- 一个是系统默认的通用串口驱动（`/dev/tty.usbmodemxxxx`）

- 另一个是芯片厂商（比如这里的 “wch” 对应南京沁恒的 CH340/CH341 芯片）提供的专用串口驱动（`/dev/tty.wchusbserialxxxx`）

这属于正常现象，**两个端口其实对应同一个硬件设备**，选择其中任意一个都可以连接通信（比如在控制机械臂的软件中选择其中一个端口即可）。

如果后续操作某一个端口报错，可以换成另一个端口试试。

<RelatedProducts slugs="so-arm101" />
