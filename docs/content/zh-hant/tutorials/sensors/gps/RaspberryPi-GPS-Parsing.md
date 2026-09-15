---
title: "GPS模組解析位置資訊"
description: "本次課程我們主要學習使用樹莓派和GPS模組實讀取並解析位置資訊。"
---

# GPS模組解析位置資訊

**1. 學習目標**

本次課程我們主要學習使用樹莓派和GPS模組實讀取並解析位置資訊。

**2. 課前準備**

GPS模組採用的是UART通訊或USB通訊，這裏以USB通訊為例。

![圖 1](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/1.png)

使用type-c線連接樹莓派和GPS模組，執行命令 ls /dev | grep 'ttyUSB' ，可以看到識別到語音模組為USB0

![圖 2](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/2.jpg) 

**3. 程式**

本次課程的程式請參考：GPS.py

初始化USB：

![圖 3](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/3.jpg) 

位置資訊獲取和解析函數，下圖中在位置資訊中篩選出GNGGA開頭的位置資訊，然後解析出數據存到各個全局變數中。

![圖 4](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/4.jpg) 

![圖 5](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/5.jpg) 

同樣的方法獲取了GNVTG的航向資訊並解析。

![圖 6](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/6.jpg) 

解析後的數據循環列印

![圖 7](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/7.jpg) 

**4. 執行程式**

終端輸入sudo python2 GPS.py執行程式。

**5.** **實驗現象**

模組通電後，需要32s左右的時間啓動，之後模組上的串口列印狀態燈會持續閃爍，此時可以正常接收數據。

程式執行以後，開始初始化USB，初始化成功顯示“GPS Serial Opened! Baudrate=9600”，否則顯示“GPS Serial Open Failed!”，如果錯誤需要檢查接線或USB連接埠，之後循環列印位置和航向資訊。

![圖 8](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/8.jpg) 

按Ctrl+C退出資訊讀取。

注意，模組天線需要在室外，否則可能搜索不到GPS信號，搜索不到信號的時候列印"GPS no found"。

<RelatedProducts slugs="gps-beidou-module" />
