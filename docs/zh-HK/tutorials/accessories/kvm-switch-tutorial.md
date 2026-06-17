# KVM切換器使用教程

KVM切換器包含HUB功能、TTL串口、藍牙模塊

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDdmNmJjY2U0NTAzY2U5Njk4N2E2MTBjZjc1MDliMDNfMDAzYTIxNmM4NWZkNTkzNjg3MzlkMDI5ZjEzYzFhZWNfSUQ6NzYzODk1OTUwNzMwNTU0ODc2Nl8xNzgwNDAzMzkzOjE3ODA0ODk3OTNfVjM)

## 單獨模塊功能

### 1、HUB功能

只需通過一根USB-TypeC線即可實現一個USB接口拓展爲三個USB接口

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGZlOTZkNTQwYTcwNDRmOWI2NGE2M2E5M2U2ZGIwYjlfY2Q3N2I0MDJmMDQzYWYyMDE2ZDQwNTc3ZDQ2Yjk1ZmNfSUQ6NzYzODk1OTUwOTM1MTg5Mzk0Nl8xNzgwNDAzMzkzOjE3ODA0ODk3OTNfVjM)

### 2、TTL串口

針腳從左到右分別爲 GND RXD TXD TNOW 3V3 5V

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWIyOGEwYjkyZTY3NWQwNzNkODE5YTgzNDc2NzhlNTVfOTdkMzM5ZDU3OGMzNmMwNDdlYmM2NzVjMDRhMzRjNWJfSUQ6NzYzODk1OTUwOTM1Nzg3NDE0N18xNzgwNDAzMzkzOjE3ODA0ODk3OTNfVjM)

### 3、藍牙模塊

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTY4YzhlMTBjOGJmYjA5YzAzMTZkMjk4NmY3MDljZmVfN2E2NTk5NzJhOTBjNTEwNWZmOGEyODcwZTJkYTkyYjhfSUQ6NzYzODk1OTUwOTgwNDg3ODgyMl8xNzgwNDAzMzkzOjE3ODA0ODk3OTNfVjM)

用at指令去連接，或者改成從模式，手機得走4.2協議連接



## 雙端切換

### 1、設備A+設備B（雙端都有顯示器）

按鍵切換&amp;紅外遙控器切換

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjhhY2U2NjQ1YzU4NDJmNmViMTgzNjhjZjkxN2M5NWZfMzcwYTgxNmEyMTNhMjlmZmIyODU4ZDdjNjU3ZjE3ODRfSUQ6NzYzODk1OTUxMDQ3MzMyOTYwN18xNzgwNDAzMzkzOjE3ODA0ODk3OTNfVjM)

### 2、主板（無顯示器）+主機（有顯示器）

只需要額外使用一個 4K高清HDMI採集器 連接到主機端，在**主機端使用OBS、Potplay等軟件即可採集**的畫面

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2VmYjMxMjk2Y2M3ODIyMjA4OTY1NjMxOWRkOGU1YjZfZGVlYzZlMmVmYTY2NGY4MGJjZGIwNTQwNmQ0ZDg4YjJfSUQ6NzYzODk1OTUwNjU5MjQ2NzkyOF8xNzgwNDAzMzkzOjE3ODA0ODk3OTNfVjM)

**4K高清HDMI採集器 接線操作**

根據主板的接口分以下三種接線操作

**HDMI接口**——\>HDMI線——\>採集器的HDMI接口——\> USB/Type-C ——\>筆記本、電腦、一體機、手機/平板等顯示器

**Micro HAMI接口**——\>Micro轉HDMI轉接頭——\>HDMI線——\>採集器的HDMI接口——\> USB/Type-C ——\>筆記本、電腦、一體機、手機/平板等顯示器

**DP接口**——\>DP轉HDMI轉接頭——\>HDMI線——\>採集器的HDMI接口——\> USB/Type-C ——\>筆記本、電腦、一體機、手機/平板等顯示器

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzYyYjU2NmUyOTI0YWRjOTUyMGZjOWI4MDMxZmNhZTZfOTAyNmIxYjFjOWQzOGE1MmUzMzkyNzQwOGFiNzJmMjFfSUQ6NzYzODk1OTUwODcwMTkwNzkzNF8xNzgwNDAzMzkzOjE3ODA0ODk3OTNfVjM)

**OBS操作指南**

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTZmNTNkOTFhZmE0ZjZlZDgxNDM2ZGFiNzgwNWVlZTBfMzY0MTJhNDAyZDQ2ZGRjOWM1ZWRmZmQ3NWM0OGRkOGFfSUQ6NzYzODk1OTUwODM0MTM0NTI0OV8xNzgwNDAzMzkzOjE3ODA0ODk3OTNfVjM)

**Potplayer操作指南**

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmJlMTkxNzVkZjY5ZmYzNWIzY2RkYzhhMDY1NWNjZGRfNDA1ZTViNDVmODQwN2M5MDI3MzQ0Y2RkNzkxMGFjNzdfSUQ6NzYzODk1OTUxMDAwMzY2NTg5MV8xNzgwNDAzMzkzOjE3ODA0ODk3OTNfVjM)





針腳圖示例

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmZjNjY5NzczMWI3ZDI5MmE5NDgzZjM3NmU4ZWY0MjFfMjRmM2IyMTFkZmEwZTE5ZTI3NGI0YWU2ZDZlMzY5NTZfSUQ6NzYzODk1OTUwOTM1MTg3NzU2Ml8xNzgwNDAzMzkzOjE3ODA0ODk3OTNfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjQ2NzMzMzk2OWYzMjU4YmJjZjNhZGNmMDRkZmIzNTVfZTRkM2Y3ZmY3Nzk4YzkyYjdmMGU3MTkwNDYwZTM2MWZfSUQ6NzYzODk1OTUxMDA5MDI1NTMxMl8xNzgwNDAzMzkzOjE3ODA0ODk3OTNfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzNkYTM3ODc3M2YyNzU1Yzc5ZTM4MzhiOGJlYzcyODNfYTY2YWIxNGQyYzkyZTY5MzVkNzQ0MDBlZWEwYmJiM2JfSUQ6NzYzODk1OTUwNjgwMjE4MzExM18xNzgwNDAzMzkzOjE3ODA0ODk3OTNfVjM)

