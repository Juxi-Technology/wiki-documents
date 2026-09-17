---
title: "TTL 調試教程"
description: "本頁介紹使用Arduino程序調試TTL舵機版AmazingHand靈巧手的流程:接線方式、舵機ID設置、固定伺服喇叭、微調中間值及運行演示程序。"
---

# TTL 調試教程

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**


首先，下載“[靈巧手調試.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc)”壓縮包，解壓後可通過“使用arduio程序調試靈巧手過程（TTL舵機）”文檔進行舵機ID設置、標定、校準中位及演示程序運行，或 參考[官方開源代碼](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample)。

**成品無拆卸**情況下（出廠 舵機ID設置、標定、校準中位已調試好）可以直接跳到**[**第6點 運行“02 演示程序”**](https://juxitech.feishu.cn/docx/MaBndXRkkoRuXaxgdSfc5nAZnkz#doxcnq15qT2cLMtHW6PsARcSGsf)** 和 第7點 **[**手部追蹤**](https://juxitech.feishu.cn/docx/MaBndXRkkoRuXaxgdSfc5nAZnkz#doxcncgX5XgyRUFRpYJytV7gV7e)**。**

![image – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/1.png)

## 1. 調試靈巧手的接線方式

一種是使用電腦運行python等上位機軟件，如飛特舵機上位機或者python代碼運行

一種是使用MEGA328P等單片機或自行購買的開發板或主控等

接線方式如下：

（1）python方式調試時的接線方式（只接舵機驅動板）： 

![1. 調試靈巧手的接線方式 – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/2.png)

（2）MEGA328P開發板調試時的接線方式（舵機驅動板+328P開發板）：

**看清楚MEGA328P開發板的針腳位置！**

![1. 調試靈巧手的接線方式 – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/3.png)

![1. 調試靈巧手的接線方式 – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/4.png)

![1. 調試靈巧手的接線方式 – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/5.png)

![1. 調試靈巧手的接線方式 – 5](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/6.png)

下面描述的是使用單片機的調試過程，單片機本身是會不斷循環演示程序的，只需斷開數據線即可停止。

## 2.設置舵機ID

單個靈巧手共使用了8個舵機，右手 ID需要設置爲1-8 ，左手 ID需要設置爲11-18

中位校準 成品默認 右手[451,571,451,571,451,571,451,571] 左手[571,451,571,451,571,451,571,451]

1、連線：依次將 **單個** 舵機、舵機驅動板連接起來。

![2.設置舵機ID – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/7.jpg)

2、使用舵機廠家提供的上位機軟件FD1.9.8.2進行設置

FD.rar

![2.設置舵機ID – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/8.png)

![2.設置舵機ID – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/9.png)

![2.設置舵機ID – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/10.png)

## 3.**固定伺服喇叭**

1、上傳代碼程序“安裝白色伺服喇叭時使用” 到開發板中

該程序的作用：使舵機的齒輪位置處於一個大致居中的位置，後續的動作角度都是基於這個中間的位置進行的。

（1）自行安裝軟件arduino，根據自身系統參考[安裝教程](https://blog.csdn.net/weixin_35509395/article/details/156188274)，編譯下載arduino程序的話，要先在 庫管理器 裏安裝FTServo庫、SCServo庫

![3.固定伺服喇叭 – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/11.png)

（2）開發板類型選：選擇“Arduino Nano” 

![3.固定伺服喇叭 – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/12.png)

2、調試舵機1、2

（1）編輯：根據要調試的舵機ID，修改如下位置。如要調試食指，則設置ID值爲1、2

![3.固定伺服喇叭 – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/13.png)

（2）上傳程序到開發板中

（3）連線：將開發板與舵機驅動板、**1、2**號舵機連接起來，可以聽到舵機齒輪旋轉一定角度後停止。

![3.固定伺服喇叭 – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/14.png)

（4）將伺服喇叭安裝在齒輪上，位置儘量保持平行

![3.固定伺服喇叭 – 5](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/15.png)

3、調試舵機3、4

（1）**斷開328P開發板與舵機驅動板之間的接線（否則無法上傳）**

（2）編輯：設置ID值爲3、4

![3.固定伺服喇叭 – 6](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/16.png)

（3）上傳程序到開發板中

（4）連線：將開發板與舵機驅動板、**3、4**號舵機連接起來，可以聽到舵機齒輪旋轉一定角度後停止。

（5）將伺服喇叭安裝在齒輪上，位置儘量保持平行

4、調試舵機5、6

步驟同上

5、調試舵機7、8

步驟同上

## 4.**微調中間值**

1、上傳代碼程序“01 微調MiddlePos值時使用” 到 開發板中

2、手指處於閉合位置時，立即停止程序（斷開數據線即可），並檢查伺服喇叭是否正確對齊（如下圖）。如果未對齊，調整程序中MiddlePos_1、MiddlePos_2的值，直到對齊爲止。記錄下該值（8個舵機對應8個值），最後的程序中要使用。

![4.微調中間值 – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/17.png)

![4.微調中間值 – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/18.png)

## 5.**運行測試程序**

1、將上面保存的MiddlePos_1、MiddlePos_2的值填入下面數組中，下載程序即可。

![5.運行測試程序 – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/19.png)

## 6.**運行“02 演示程序”**

（1）自行安裝軟件arduino，根據自身系統參考[安裝教程](https://blog.csdn.net/weixin_35509395/article/details/156188274)

（2）在 `靈巧手調試\00 TTL串口舵機\arduino程序（MEGA328P開發板）\02 演示程序`目錄下根據 左手還是右手 打開對應的ino文件

![6.運行“02 演示程序” – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/20.png)

（3）編譯上傳arduino程序到開發板的話，要先在 庫管理器 裏安裝FTServo庫、SCServo庫

![6.運行“02 演示程序” – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/21.png)

（4）開發板類型選：選擇“Arduino Nano”

![6.運行“02 演示程序” – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/22.png)

（5）編譯並上傳

注意 此時電腦只單獨連接到開發板，開發板先不連接到舵機驅動板（即不和靈巧手連接）

上傳成功後，將開發板通過三根跳線連接到舵機驅動板上，舵機連接到舵機驅動板，參考 [MEGA328P開發板調試](https://juxitech.feishu.cn/docx/MaBndXRkkoRuXaxgdSfc5nAZnkz#doxcnaxxi5SbMcbd39Q7Aar7akh)[時的接線方式](https://juxitech.feishu.cn/docx/MaBndXRkkoRuXaxgdSfc5nAZnkz#doxcnaxxi5SbMcbd39Q7Aar7akh)

靈巧手會不斷循環運行**“02 演示程序”**

運行結果如下

![6.運行“02 演示程序” – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/23.png)

## [7.手部追蹤](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)



