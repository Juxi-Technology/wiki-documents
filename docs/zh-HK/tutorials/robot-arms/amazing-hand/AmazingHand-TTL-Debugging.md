# 靈巧手\(TTL串口舵機\)調試教程

首先，下載“[靈巧手調試\.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc)”壓縮包，解壓後可通過“使用arduio程序調試靈巧手過程（TTL舵機）”文檔進行舵機ID設置、標定、校準中位及演示程序運行，或 參考[官方開源代碼](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample)。

**成品無拆卸****情況下（出廠 舵機ID設置、標定、校準中位已調試好）可以直接跳到**[**第6點 運行“02 演示程序”**](https://juxitech.feishu.cn/docx/MaBndXRkkoRuXaxgdSfc5nAZnkz#doxcnq15qT2cLMtHW6PsARcSGsf)** 和 第7點 **[**手部追蹤**](https://juxitech.feishu.cn/docx/MaBndXRkkoRuXaxgdSfc5nAZnkz#doxcncgX5XgyRUFRpYJytV7gV7e)**。**

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MWUwNmZiY2VmNTcwNTY2YzZkNGI2NDRlNWNiNWZkMjFfMDFhNzcwZTRjOWIwNzc1YzY0ZDNhYWYwN2Y0YTE2MWRfSUQ6NzYzODk2MDg2OTQ3NDc2NTc4NV8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

## 1\. 調試靈巧手的接線方式

一種是使用電腦運行python等上位機軟件，如飛特舵機上位機或者python代碼運行

一種是使用MEGA328P等單片機或自行購買的開發板或主控等

接線方式如下：

（1）python方式調試時的接線方式（只接舵機驅動板）： 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MmE3ODA4Y2I3ODIyMDhiMGU5NmY4NTI1NTliYmFlZDFfYjI3OGZlNDJkMGMxMzRhMmViZGRmMzBhZjNmYWNjMDZfSUQ6NzYzODk2MDg3MjU1NTI4NTQ1OF8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

（2）MEGA328P開發板調試時的接線方式（舵機驅動板\+328P開發板）：

**看清楚MEGA328P開發板的針腳位置！**

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTQ3YWY1YjkzYmIyODE4OTM0NTJlOWYyMjZmZTA1MzFfNjA1NGFhZWQ1ZjQ1MzI5MTIwZjFmMGEzODIxMzgwODhfSUQ6NzYzODk2MDg3MDk0MDYyNTg4Nl8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmY0NTIwYjc0ZjQ3ZWMzYTFlNmZhZGU4YWI5OWIyMmNfZWYyZTg3NzUzZjQ2ZmE4OWJkOGJmMWJjZTQyYWFmYzFfSUQ6NzYzODk2MDg2OTQ3NzEwODcwMl8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjIwZWM2YjQ2NzFiOTk1ODg1NDJjOTk3OGM0ZTUxZDZfNTliNzQyMWJlMTc5YmNmZTNmNTNiNGZjOTI2MjhlMWFfSUQ6NzYzODk2MDg3MTg2NzQ2ODc3N18xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2VmM2NjZDJhNzlhZWQwMTZmMWQ3Yzk5NWJjM2FhZTNfOWU4MDNlMmM5ZDM4MGUzNDA0ZjBmYjQ2Y2FlMGRlYjFfSUQ6NzYzODk2MDg2OTgyOTQ2Mjk4M18xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

下面描述的是使用單片機的調試過程，單片機本身是會不斷循環演示程序的，只需斷開數據線即可停止。

## 2\.設置舵機ID

單個靈巧手共使用了8個舵機，右手 ID需要設置爲1\-8 ，左手 ID需要設置爲11\-18

中位校準 成品默認 右手\[451,571,451,571,451,571,451,571\] 左手\[571,451,571,451,571,451,571,451\]

1、連線：依次將 **單個** 舵機、舵機驅動板連接起來。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Y2Q4MzBjODVhNDhiMmYwNDBkNzViMDNhNmE3ZDkyMTFfNTU4OTM1ODIzNmZhZjUyYjBhMTQzNjNjODUwN2I5MTRfSUQ6NzYzODk2MDg3MDUwMDUwMjQ2MF8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

2、使用舵機廠家提供的上位機軟件FD1\.9\.8\.2進行設置

\[FD\.rar\]

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmM5N2YxYzJhZWQyZDgxNTM5YWIxOGRkMzRjOTAwOGJfMjY2OTA1MWI2ZTg0Yjg3ZjY4NDE1ZGEzZGI2ZGIzN2RfSUQ6NzYzODk2MDg3Mjc1NjU0NjUyN18xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmMxYTAwMTE4ZWFiYjAzMGI5OGVkZDcyZGQ1ZjEzNjZfNDk1ZDUyOGU0MmEzMTBjYjkyNjkzZmFjMmEyYmRjMzhfSUQ6NzYzODk2MDg3MDIxMDkzMTY2Nl8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjM1OWRmMWMwYmMwMGE4YjYzMzQ0MzI0N2QxMjhhZjZfOTliZTMyYzQ5YTZkZTZlOTQ4ZTE3YzIyNmY2OTY1YjhfSUQ6NzYzODk2MDg3Mjc1NjUzMDE0M18xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

## 3\.**固定伺服喇叭**

1、上傳代碼程序“安裝白色伺服喇叭時使用” 到開發板中

該程序的作用：使舵機的齒輪位置處於一個大致居中的位置，後續的動作角度都是基於這個中間的位置進行的。

（1）自行安裝軟件arduino，根據自身系統參考[安裝教程](https://blog.csdn.net/weixin_35509395/article/details/156188274)，編譯下載arduino程序的話，要先在 庫管理器 裏安裝FTServo庫、SCServo庫

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDBkZmE2ZDJjYTE0N2U2ZDgyZTNmYzkwMGI1YTA4ZjBfYWY3ZWRjY2YzOGIwMjM5MWU1Y2MxMmExMjM0MGE5ZmFfSUQ6NzYzODk2MDg3MTMxMzk4NDQ4OV8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

（2）開發板類型選：選擇“Arduino Nano” 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODIzOTI4MDlmODMwMTEyMTY4MTcwYTE4OGNkNWViNTdfYjhlNjdjYTI1MDk1OTVhOWZkZWViMmNjNTJkMTIxOTRfSUQ6NzYzODk2MDg3MTMxMzk2ODEwNV8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

2、調試舵機1、2

（1）編輯：根據要調試的舵機ID，修改如下位置。如要調試食指，則設置ID值爲1、2

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzhmYTBhYTY5NTM5ZDQxODNhNGIwZTIwMmE3MWFhMjJfNWVjYThmN2ZhODg4OWZkNmQwODJiNGE1NWU5M2VkODJfSUQ6NzYzODk2MDg3MzU4Njg4NzYxMF8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

（2）上傳程序到開發板中

（3）連線：將開發板與舵機驅動板、**1、2**號舵機連接起來，可以聽到舵機齒輪旋轉一定角度後停止。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTM3YzIyZTYyOTdjMWM0ZDBkODdkYjlkZjM0OTRmNmNfZTIxM2MwN2E3ZTkyODUzMjk0OTllN2JlYzQ4OGUyMTJfSUQ6NzYzODk2MDg3MTMzOTAxOTIxNF8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

（4）將伺服喇叭安裝在齒輪上，位置儘量保持平行

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTVlN2RhMTMzMmNhMTM5YWM4ZWVmNjExMTE1MjdlNDlfNWQzNWQ2YmVmYzZlY2ZmZmM2Mzg0Yzk5M2NjODE5NmNfSUQ6NzYzODk2MDg2OTc5NTg0MzAzM18xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

3、調試舵機3、4

（1）**斷開328P開發板與舵機驅動板之間的接線（否則無法上傳）**

（2）編輯：設置ID值爲3、4

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGVmMGI3MDlkMDg0NTgwZDM5MGU2ODY2Yzc5YzJmZjVfNTg3YzBiY2QzMGY1N2I5MzA4YTI2MmY3OWY4ODlkN2RfSUQ6NzYzODk2MDg3MDc5Mzc0MzI4OF8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

（3）上傳程序到開發板中

（4）連線：將開發板與舵機驅動板、**3、4**號舵機連接起來，可以聽到舵機齒輪旋轉一定角度後停止。

（5）將伺服喇叭安裝在齒輪上，位置儘量保持平行

4、調試舵機5、6

步驟同上

5、調試舵機7、8

步驟同上

## 4\.**微調中間值**

1、上傳代碼程序“01 微調MiddlePos值時使用” 到 開發板中

2、手指處於閉合位置時，立即停止程序（斷開數據線即可），並檢查伺服喇叭是否正確對齊（如下圖）。如果未對齊，調整程序中MiddlePos\_1、MiddlePos\_2的值，直到對齊爲止。記錄下該值（8個舵機對應8個值），最後的程序中要使用。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Y2E4NmU4M2MzZWQ5MjczZmY4Yjc2YjYyMzYyYzM1MjlfYmIyYTFlZmY5OWUxYTI4MWE2YjA0ZjA4ZWUxMjQzOTVfSUQ6NzYzODk2MDg3MjYwNTYxNzA5N18xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzRiM2VjNWM4NjIzYjJlMWYyYjAzOWJjYjdlZWI3MWNfMzA5Y2VkY2MyNGRkN2Q5ZGRkOTMxNzYyY2ZjOWFjMWRfSUQ6NzYzODk2MDg2OTc1ODE3NjIwNF8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

## 5\.**運行測試程序**

1、將上面保存的MiddlePos\_1、MiddlePos\_2的值填入下面數組中，下載程序即可。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGI1YjdhOWZhYmE4NGFhZjgyMGU3ODkwMDMwNzhlNDNfOGRjMTgyOGQ3NjE0ODY5YjliOGRmYjNkYmJhZWRhYzZfSUQ6NzYzODk2MDg2OTQ3NzA5MjMxOF8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

## 6\.**運行“02 演示程序”**

（1）自行安裝軟件arduino，根據自身系統參考[安裝教程](https://blog.csdn.net/weixin_35509395/article/details/156188274)

（2）在 `靈巧手調試\00 TTL串口舵機\arduino程序（MEGA328P開發板）\02 演示程序`目錄下根據 左手還是右手 打開對應的ino文件

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmQ3YjE5OWI0MjQzN2FiNjY3YzdkZDY3NmYzNTVjM2JfNTJlYzBhMjVkMTFiNzA3ZGNmMWFiMTY1ZDgwYjIwOWZfSUQ6NzYzODk2MDg2OTg1NzkyMTk3Nl8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

（3）編譯上傳arduino程序到開發板的話，要先在 庫管理器 裏安裝FTServo庫、SCServo庫

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2Y2ZjkxNmRkMTAzYWIyZmZhYzZlN2Y3NDBjYzgyNDBfNmE1MDgxOGVmYTI5Zjg3ZGQ0YTg2ZGZkN2U5NDJkNzhfSUQ6NzYzODk2MDg3MDEzNTU2NTI3Ml8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

（4）開發板類型選：選擇“Arduino Nano”

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2NlN2Y2YTQ5YzZhZTU1OTRjNTM0NDc4ZjVlNjY3YjRfZWM2NGRlM2JlNzVjNWMxYmE0ZGZhZDRkOThlNzFiMDBfSUQ6NzYzODk2MDg3MTk3NjYwMjU3Ml8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

（5）編譯並上傳

注意 此時電腦只單獨連接到開發板，開發板先不連接到舵機驅動板（即不和靈巧手連接）

上傳成功後，將開發板通過三根跳線連接到舵機驅動板上，舵機連接到舵機驅動板，參考 [MEGA328P開發板調試](https://juxitech.feishu.cn/docx/MaBndXRkkoRuXaxgdSfc5nAZnkz#doxcnaxxi5SbMcbd39Q7Aar7akh)[時的接線方式](https://juxitech.feishu.cn/docx/MaBndXRkkoRuXaxgdSfc5nAZnkz#doxcnaxxi5SbMcbd39Q7Aar7akh)

靈巧手會不斷循環運行**“02 演示程序”**

運行結果如下

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjA0OWZmODFiNzY2NjA4NjJkNjIxYzgyNTQ2YWU5OGRfOGE1MTU3NjY4Njg1ZmM1NWZkOTc0MDQwYmE1Y2M1YjBfSUQ6NzYzODk2MDg3MDg4MTkyMjAyNV8xNzgwNDAzMzA0OjE3ODA0ODk3MDRfVjM)

## [7\.手部追蹤](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)



