---
title: "第二步:查看串列埠編號(macOS)"
description: "本頁說明如何在 macOS 查看機械臂的串列埠編號、賦予裝置讀寫權限，並解釋為什麼會有兩個連接埠。"
---

# 第二步:查看串列埠編號(macOS)

## 查看連接埠

```Shell
ls /dev/tty.*
```

效果類似下圖，用兩個連接埠中的任意一個都可

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-MacOS/1.png)

## 給連接埠賦予權限

讓所有使用者都有權限讀寫這些串口裝置

```Shell
chmod 666 /dev/tty.*
```

## 記錄我的連接埠

從動臂：

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

主動臂：

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## 為什麼Mac中會有兩個連接埠？

我們用的舵機控制板，在Mac系統中被**同時識別為了兩種不同類型的串口驅動**，所以會顯示兩個連接埠：

- 一個是系統預設的通用串口驅動（`/dev/tty.usbmodemxxxx`）

- 另一個是芯片廠商（比如這裡的 “wch” 對應南京沁恆的 CH340/CH341 芯片）提供的專用串口驅動（`/dev/tty.wchusbserialxxxx`）

這屬於正常現象，**兩個連接埠其實對應同一個硬件裝置**，選擇其中任意一個都可以連接通信（比如在控制機械臂的軟件中選擇其中一個連接埠即可）。

如果後續操作某一個連接埠報錯，可以換成另一個連接埠試試。

<RelatedProducts slugs="so-arm101" />
