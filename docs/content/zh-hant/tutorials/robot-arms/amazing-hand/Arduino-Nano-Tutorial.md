---
title: "Arduino Nano 使用教程"
description: "用 Arduino Nano（328P）和舵機驅動板執行 AmazingHand「02 演示程序」：接線、庫安裝、編譯上傳與執行結果。"
---

# Arduino Nano 使用教程

## 接線方式（舵機驅動板 + Nano 板）

**看清楚 Nano 板（即 328P 開發板）的針腳位置！**

![圖示](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/01.png)

![圖示](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/02.png)

![圖示](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/03.png)

![圖示](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/04.png)

下面描述的是使用單片機的調試過程。單片機本身會不斷循環執行演示程序，只需斷開數據線即可停止。

## 執行「02 演示程序」

1. 自行安裝 Arduino IDE。

2. 根據**左手還是右手**，打開對應的 `.ino` 文件。

   ![圖示](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/05.png)

3. 編譯上傳 Arduino 程序到 Nano 板之前，先在「庫管理器」裡安裝 **FTServo 庫** 和 **SCServo 庫**。

   ![圖示](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/06.png)

4. Nano 板類型選擇「**Arduino Nano**」。

   ![圖示](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/07.png)

5. 編譯並上傳。

> **注意：** 此時電腦只單獨連接到 Nano 板，Nano 板先不連接舵機驅動板（即不和靈巧手連接）。

上傳成功後，將 Nano 板透過三根跳線連接到舵機驅動板上，舵機連接到舵機驅動板，參考 [MEGA328P Nano 板調試時的接線方式](https://juxitech.feishu.cn/wiki/Wt46wtt26imdWkkQlxTcL87qnHd#share-HdS4dNgwyo2seVxRZ9PcZ1R3nuc)。

靈巧手會不斷循環執行「02 演示程序」，執行結果如下：

![圖示](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/08.png)
