---
title: "Jetson:AGNSS 輔助定位"
description: "本次課程我們主要學習使用Jetson Orin和GPS模組和agnss伺服器實現弱信號下位置資訊讀取解析。"
---

# Jetson:AGNSS 輔助定位

**1. 學習目標**

本次課程我們主要學習使用Jetson Orin和GPS模組和agnss伺服器實現弱信號下位置資訊讀取解析。

**2. AGNSS説明**

2.1. **為什麼要用AGNSS**

• 自主式GNSS接收機定位的條件包括：

- 捕獲並跟蹤衞星信號，解析時間

- 從衞星獲取電文

• 強信號環境，自主式GNSS接收機可以在30秒左右冷啓動定位；但是在弱信號環境，無外部輔助的接收機捕獲衞星很慢，很難從衞星獲取電文，因此需要很久才能定位，甚至無法定位。

• AGNSS可以為接收機提供定位必需的輔助資訊，比如電文，粗略位置和時間。不管是在強信號還是弱信號環境，這些資訊可以顯著的縮短首次定位時間。

2.2. **AGNSS解決方案**

• AGNSS伺服器從多個GNSS數據源獲取並管理AGNSS輔助資訊。伺服器時刻監聽並回應客戶端的AGNSS請求（需要使用者名和密碼）。

• 使用者通過TCP/IP協定從AGNSS伺服器獲取輔助資訊，獲取到輔助資訊可以直接傳輸給GNSS接收機。

• 使用者也可以建立自己的代理伺服器。

![圖 1](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/1.png) 

2.3. **AGNSS流程**

• 連接AGNSS伺服器

–伺服器的地址為121.41.40.95(域名：www.gnss-aide.com)

–連接埠號為2621

• 發送AGNSS請求

–請求語句：(使用者名和密碼欄位是必需項)

–user=pm@juxi.com;pwd=juxi;cmd=full;gnss=gps+bd;lat=60.0;lon=55.0;alt=0;

• 獲取AGNSS輔助資訊

• 把AGNSS輔助資訊發送給接收機

2.4. **AGNSS請求參數**

• 使用者端發送請求到AGNSS伺服器，請求語句的格式如下

–請求語句是多組key=value;的組合，如：key=value;key=value;

• 示例：user=pm@juxi.com;pwd=juxi;cmd=full;gnss=gps+bd;lat=60.0;lon=55.0;alt=0;

• 具體的key和value定義如下表

| 關鍵字(Key) | 取值(value) | 可選性 | 備註                                                         |
| ----------- | ----------- | ------ | ------------------------------------------------------------ |
| **user**    | 字串      | 必須   | 使用者名。強烈建議使用者名為一個有效的郵箱地址，重要的AGNSS伺服器維護資訊將會發送到該郵箱。 |
| **pwd**     | 字串      | 必須   | 使用者密碼                                                     |
| **gnss**    | 字串      | 可選   | 用逗號隔開的GNSS列表，目前支援GPS。有效的取值有：gps,bds,glo”gnss=gps;”表示請求GPS輔助資訊；gnss=gps,bds;”表示請求GPS和BDS輔助資訊； |
| **cmd**     | 字串      | 可選   | full:全部資訊，包括星曆，估計的時間和位置eph:僅提供星曆資訊aid:輔助時間、位置等資訊此項若不填，預設為full |
| **lat**     | 數值        | 可選   | 使用者位置緯度的估計值。緯度的單位：度。取值範圍是-90~90度。兩者位置輔助格式，經緯高格式和ECEF格式，二選一。有效的經緯高位置輔助格式是”lat=30;lon=120.3;alt=100;”三個欄位都必須完整。 |
| **lon**     | 數值        | 可選   | 使用者位置經度的估計值。經度的單位：度。取值範圍是-180~180度。 |
| **alt**     | 數值        | 可選   | 使用者位置高度的估計值。單位:米。                              |
| **x**       | 數值        | 可選   | 使用者位置（ECEF座標系下的X,Y,Z）的估計值。單位:米。有效的ECEF位置輔助格式是”x=30000;y=1111120.3;z=3345100;”三個欄位都必須完整。 |
| **y**       | 數值        | 可選   | 使用者位置（ECEF座標系下的X,Y,Z）的估計值。單位:米。           |
| **z**       | 數值        | 可選   | 使用者位置（ECEF座標系下的X,Y,Z）的估計值。單位:米。           |
| **pacc**    | 數值        | 可選   | 使用者位置的準確度。單位為米。                                 |

2.5. **伺服器返回資訊**

![圖 2](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/2.png) 

• AGNSS伺服器返回的數據示例：數據頭+輔助數據內容

• 二進制數據就是GNSS接收機所需的輔助數據，這些二進制數據中都自帶了數據校驗。二進制數據格式參考中科微的接收機協定規範。

• 如果把數據頭也發送給了GNSS接收機，不會對GNSS接收機產生影響。

2.6. **AGNSS性能對比**

• 相比普通的獨立式GNSS接收機，AGNSS接收機在TTFF性能上具有顯著的提升，尤其是在弱信號條件下。

![圖 3](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/3.jpg) 

2.7. **注意事項**

• 粗略位置輔助需要使用者端通過其它方式獲取，比如

–GSM/GPRS/3G通信模組，這些模組都可以利用CELL ID的方式獲取當前粗略的位置

–WiFi等其它無線模組，也可以粗略定位

• 粗略位置的精度要求在15km以內，錯誤的位置輔助會影響接收機的性能

• 如果無法獲取粗略位置，在AGNSS請求語句中忽略位置的欄位（lat,lon,alt,x,y,z)，接收機會自動選擇歷史定位的有效位置

• 沒有必要把GNSS接收機自己輸出的位置作為粗略位置

2.8. **什麼時候需要AGNSS**

• 不需要每次開機都從伺服器下載，節省流量

–中科微的晶片內部有電池備份SRAM，以及永久備份FLASH，都可以自動儲存接收到星曆數據等

–晶片在正常工作中，不斷的從衞星下載最新的星曆數據

• 通過查詢接收機的狀態，決定是否需要從伺服器下載AGNSS數據

–接收機可以輸出電文狀態語句（預設不輸出，需要配置才輸出）

2.9. **電文狀態語句介紹**

![圖 4](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/4.png) 

![圖 5](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/5.png) 

• 該語句輸出的是當前接收機內部的時間+電文狀態。

• 可以發送命令$PCAS03,,,,,,,,,,,1*1F，每秒輸出一次電文狀態語句

• 可以發送命令$PCAS03,,,,,,,,,,,0*1E，停止輸出電文狀態語句

• 注意：每條語句後面都必須\r\n結尾(0x0D,0x0A)，語句中有11個逗號

• 如果時間標誌有效（非0），且有效星曆數目很多（大於8個），就不必下載AGNSS星曆了。

 

**3. 課前準備**

**3.1. 接線**

GPS模組採用的是UART通訊或USB通訊，這裏以USB通訊為例。

![圖 6](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/6.png)

使用type-c線連接Jetson Orin和GPS模組，執行命令 ls /dev | grep 'ttyUSB' ，可以看到識別到GPS模組為USB0

![圖 7](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/7.jpg) 

**3.2. 申請百度地圖ak**

請看文檔 [百度地圖api申請教程](./Jetson-Baidu-Map-API.md)

 

**4. 程式**

本次課程的程式請參考：GPS-agnss.py

初始化USB：

![圖 8](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/8.jpg) 

資料ak需要填上自己申請的ak值，然後就能通過百度地圖獲得當前粗略的經緯度資訊

![圖 9](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/9.jpg) 

這裏把百度地圖獲取到的粗略經緯度資訊發送給伺服器，我們使用的登入帳號是鉅犀官方的帳號，獲取完成之後把整個包發送給模組

![圖 10](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/10.jpg) 

![圖 11](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/11.jpg) 

位置資訊獲取和解析函數，下圖中在位置資訊中篩選出GNGGA開頭的位置資訊，然後解析出數據存到各個全局變數中。

![圖 12](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/12.jpg) 

![圖 13](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/13.jpg) 

同樣的方法獲取了GNVTG的航向資訊並解析。

![圖 14](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/14.jpg) 

解析後的數據循環列印

![圖 15](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/15.jpg) 

**5.執行程式**

終端輸入sudo python2 GPS-agnss.py執行程式。

**6.實驗現象**

**注意，輔助定位下Jetson Orin必須聯網。**

模組在弱信號下通電後，開始初始化USB，初始化成功顯示“GPS Serial Opened! Baudrate=9600”，否則顯示“GPS Serial Open Failed!”，如果錯誤需要檢查接線或USB連接埠。

之後顯示"GPS Agnss start"開始將輔助定位資訊發送給伺服器，發送完成之後顯示"GPS Agnss success"

在發送之後的一段時間內還未讀取到GPS信號，此時顯示"GPS no found"並且列印百度地圖讀取到的粗略經緯度資訊。

![圖 16](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/16.jpg) 

過一段時間識別到GPS之後，識別會循環列印位置和航向資訊。

![圖 17](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/17.jpg) 

按Ctrl+C退出資訊讀取。

<RelatedProducts slugs="gps-beidou-module" />
