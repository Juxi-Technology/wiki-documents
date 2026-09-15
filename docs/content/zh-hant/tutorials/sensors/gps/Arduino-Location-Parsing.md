---
title: "Arduino:位置資訊解析"
description: "Arduino 搭配 GPS 北斗模組的位置資訊解析教程：NMEA 資料解析與經緯度列印功能的實現方法。"
---

# Arduino:位置資訊解析

**1. 學習目標**

本次課程我們主要學習使用arduino和GPS模組實現位置資訊解析並列印功能。

**2. 課前準備**

GPS模組採用的是UART和USB通訊，這裏使用arduino UNO的UART口讀取資訊，將模組的TX連接arduino UNO板子的D0引腳。VCC和GND分別連接5V和GND。

![圖 1](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/1.png)

**3.** **程式**

初始化串口。

![圖 2](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/2.jpg) 

讀取串口數據。

![圖 3](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/3.jpg) 

解析串口數據。

![圖 4](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/4.jpg) 

列印解析之後的位置資訊。

![圖 5](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/5.jpg) 

**4. 編譯下載程式**

4.1 我們需要通用Arduino IDE軟件打開檔案，然後點擊選單欄中的“√”編譯程式，並且等待左下角出現“編譯成功”的字樣。

 ![圖 6](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/6.jpg)

4.2 在Arduino IDE的選單欄中，我們需要選擇【工具】---【連接埠】---選擇裝置管理器中剛剛顯示連接埠號，如下圖所示。

![圖 7](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/7.jpg) 

4.3 選擇完成後，點擊選單欄下的“→”將代碼上傳到UNO板。 當左下角出現“上傳完成”字樣時，表示程式已成功上傳到UNO板，如下圖所示。

![圖 8](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/8.jpg) 

 

**5. 實驗現象**

模組通電後，需要32s左右的時間啓動，之後模組上的串口列印狀態燈會持續閃爍，此時可以正常接收數據。

程式下載後執行，打開串口監視視窗，打開串口軟件，波特率設定為9600，串口會循環列印解析過的實時位置資訊。

![圖 9](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Parsing/9.jpg) 

注意，模組天線需要在室外，否則可能搜索不到GPS信號。

<RelatedProducts slugs="gps-beidou-module" />
