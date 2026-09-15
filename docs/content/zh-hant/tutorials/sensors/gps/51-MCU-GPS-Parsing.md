---
title: "51 單片機:GPS 數據解析"
description: "本次課程我們主要學習使用STC89C52RC型號的51單片機和GPS模組實現位置資訊解析功能。"
---

# 51 單片機:GPS 數據解析

**1. 學習目標**

本次課程我們主要學習使用STC89C52RC型號的51單片機和GPS模組實現位置資訊解析功能。

**2. 課前準備**

GPS模組採用的是UART和USB通訊，這裏使用C51的UART口讀取資訊，將模組的TX連接51板子的P3.0引腳。VCC和GND分別連接5V和GND。

![圖 1](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/1.png)

**3.** **程式**

初始化串口和數據陣列

![圖 2](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/2.jpg) 

讀取並解析接收到的數據。

![圖 3](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/3.jpg) 

通過串口列印接收到的數據。

![圖 4](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/4.jpg) 

**4****. 實驗現象**

模組通電後，需要32s左右的時間啓動，之後模組上的串口列印狀態燈會持續閃爍，此時可以正常接收數據。

程式下載後執行，打開串口軟件，波特率設定為9600，串口會循環列印現在的位置資訊。

![圖 5](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/5.jpg) 

注意，模組天線需要在室外，否則可能搜索不到GPS信號。

<RelatedProducts slugs="gps-beidou-module" />
