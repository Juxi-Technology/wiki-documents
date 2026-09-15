---
title: "百度地圖api申請教程"
description: "1. 註冊方法"
---

# 百度地圖api申請教程

**1.** **註冊方法**

進入百度地圖開放平台https://lbsyun.baidu.com/

滑動到頁面底端

點擊立即註冊

![圖 1](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/19.jpg) 

建議選擇成為個人開發者（因為當天申請即可使用）

按照提示一步步完成即可

![圖 2](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/20.jpg) 

**2. 獲取ak**

我們使用的是web服務裏的 普通IP定位，文檔可在下面的連接查閲。

https://lbsyun.baidu.com/index.php?title=webapi/ip-api

點擊 控制枱，選擇 我的應用，選擇 建立應用。

![圖 3](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/21.jpg) 

應用名隨便寫，應用類型選擇 伺服器端 ，啓用服務，白名單輸入一個 0.0.0.0/0。

![圖 4](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/22.jpg) 

點擊 提交 生成一個應用。

![圖 5](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/23.jpg) 

複製我們應用的ak值

![圖 6](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/24.jpg) 

貼上在程式裏，儲存，即可通過百度地圖讀取到位置資訊。

![圖 7](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/25.jpg)

<RelatedProducts slugs="gps-beidou-module" />
