---
title: "MAC電腦"
description: "本頁說明如何在 macOS 查看機械臂的串列埠編號、賦予裝置讀寫權限，並解釋為什麼會有兩個連接埠。"
---

# MAC電腦

## 查看端口

```Shell
ls /dev/tty.*
```

效果類似下圖，用兩個端口中的任意一個都可

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-MacOS/1.png)

## 給端口賦予權限

讓所有用戶都有權限讀寫這些串口設備

```Shell
chmod 666 /dev/tty.*
```

## 記錄我的端口

從動臂：

/dev/tty\.usbmodem5AAF2193061

/dev/tty\.wchusbserial5AAF2193061

主動臂：

/dev/tty\.usbmodem5AAF2194741

/dev/tty\.wchusbserial5AAF2194741

## 為什麼Mac中會有兩個端口？

我們用的舵機控制板，在Mac系統中被**同時識別為了兩種不同類型的串口驅動**，所以會顯示兩個端口：

- 一個是系統默認的通用串口驅動（`/dev/tty.usbmodemxxxx`）

- 另一個是芯片廠商（比如這裡的 “wch” 對應南京沁恆的 CH340/CH341 芯片）提供的專用串口驅動（`/dev/tty.wchusbserialxxxx`）

這屬於正常現象，**兩個端口其實對應同一個硬件設備**，選擇其中任意一個都可以連接通信（比如在控制機械臂的軟件中選擇其中一個端口即可）。

如果後續操作某一個端口報錯，可以換成另一個端口試試。





