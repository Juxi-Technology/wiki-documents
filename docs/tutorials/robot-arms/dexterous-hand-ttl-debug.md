# 灵巧手(TTL串口舵机)调试教程

首先，下载"[灵巧手调试.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc)"压缩包，解压后可通过"使用arduio程序调试灵巧手过程（TTL舵机）"文档进行舵机ID设置、标定、校准中位及演示程序运行，或 参考[官方开源代码](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample)。

**成品无拆卸**情况下（出厂 舵机ID设置、标定、校准中位已调试好）可以直接跳到**[第6点 运行"02 演示程序"](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188003&from=from_node_link)** 和 第7点 **[手部追踪](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188027&from=from_node_link)**。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTQ2NDUzNmM5MGUwMTkyYWRmYWQxNjQxMmI2ZDVkOWVfMTBkYjQ4Yjc2NDAzMjhkMTAyYTUzMjI3MjBjNWNhODZfSUQ6NzU4NzM3NDkyMDU1NzA1NTE3Nl8xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

## 1. 调试灵巧手的接线方式

一种是使用电脑运行python等上位机软件，如飞特舵机上位机或者python代码运行

一种是使用MEGA328P等单片机或自行购买的开发板或主控等

接线方式如下：

（1）python方式调试时的接线方式（只接舵机驱动板）：

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGQzZjQ2ZWQ2ZTNkNjNjYTYzY2M5ZDZiZDQ4M2YxYTFfN2ZlNzE5MmM2NjdlYTE4NDU1N2M4NGYyYmI0ZTJmNzlfSUQ6NzU4NzM2NTg3MzkxODEwMjc5MV8xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

（2）MEGA328P开发板调试时的接线方式（舵机驱动板+328P开发板）：

**看清楚MEGA328P开发板的针脚位置！**

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGM2ZGVlMGM0ZDg1NTZlMWM1MzlkZTA2Mzc0NGQyODRfMzM1YWQzNDNlZTg5NTc1M2U3ZGRjOTRjYmJjZjUzOGZfSUQ6NzU4NzM2OTM0MTA4ODU4MjU4Nl8xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTU4ZWM3OWNhNzA0ZjE2NDM4MTI5OWFhODlhOTc1OTlfYjQzOTQ1NjMxNTNiYjg5ODQxNDBiOGQwODk1NTBmMGVfSUQ6NzU4NzM2OTA3ODIzMTM4NzMyNl8xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjUwMzc3YjRiYWIyODFiOGZkMzA5ODFiY2JjMmEzOGJfZTAyMWY1NGFjYTU1OWMzMGNkZTJkNTI5NmJjNjNlZGRfSUQ6NzYwMjg0NjU0MTc5NTkyMDg0OF8xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGIxMmRkNWMyMjI1NWE5OTcxODAyYTQzNGNhM2Y1MGRfNjkyYzJlZTg3ODZjMzUyOWVlYzQyNjFkN2YwMTMwNzdfSUQ6NzYwMjg0NjM4MTk5NzEzMjczMl8xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

下面描述的是使用单片机的调试过程，单片机本身是会不断循环演示程序的，只需断开数据线即可停止。

## 2.设置舵机ID

单个灵巧手共使用了8个舵机，右手 ID需要设置为1-8 ，左手 ID需要设置为11-18

中位校准 成品默认 右手[451,571,451,571,451,571,451,571] 左手[571,451,571,451,571,451,571,451]

1、连线：依次将 **单个** 舵机、舵机驱动板连接起来。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWQwNThhM2NjOTk0MDIzODEwZmMzMTQwYjNmMDYxYjNfMGM4NTA5MTliMzc4NzU0NDU2NGIzNWVhMTQwN2Q4MzVfSUQ6NzU5NTE2NTQzMzAzNzE4MDEyOV8xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

2、使用舵机厂家提供的上位机软件FD1.9.8.2进行设置

[FD.rar]

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTQ0NjA3ODFjYjdjN2VmNThiOTFhNTdhYzE1YWM3MjFfYmM0MTQ3ZWMwNDVmYzA0Y2E5ODZiNTlkMTBmM2NiZWFfSUQ6NzU4NzMzNTExMTU2MjIxODY3Nl8xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2I1YjkzNTljZTU4MDM3OTFhNTIxYjg4ZWRmZmIxYzFfMDNiNmFkNmU1ZmE1ZjAxMmMzODM4MmFlMjkwMmFjNDVfSUQ6NzU9NTE0MjM4OTQzNTM3MDcwM18xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWY3Zjc0ZTk2MDQ0MzdhYWRjZmI0OWEzZDVjMmYwMWZfMWY5YmQ1MGZkZmVjNTIzNWY1N2EyOGQ2ZWI4ZWZmMjBfSUQ6NzU4NzMzNTIxNjQwNzg5MTEyOV8xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

## 3.**固定伺服喇叭**

1、上传代码程序"安装白色伺服喇叭时使用" 到开发板中

该程序的作用：使舵机的齿轮位置处于一个大致居中的位置，后续的动作角度都是基于这个中间的位置进行的。

（1）自行安装软件arduino，根据自身系统参考[安装教程](https://blog.csdn.net/weixin_35509395/article/details/156188274)，编译下载arduino程序的话，要先在 库管理器 里安装FTServo库、SCServo库

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODkxMTM1NTIwMTRhNTQxZDI2ODU0MzNjNGY0NTY2NzZfYjUyMWIxMWZmMTIyYmNiMTg5OGVjMGQ0MDZhYjM3OTRfSUQ6NzU4NzMzNTIxNjQwNzg5MTEyOV8xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

（2）开发板类型选：选择"Arduino Nano"

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWEzNDNhYjVhODcxNDhmOWVmMGY3NDAzNWM1ZDNjNTJfMThjZTM1YWJiYThkZGMzYzExOWExZjk0OWVmNGIwODJfSUQ6NzU9Njk4MjA2MzQwMDgxNTU2N18xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

2、调试舵机1、2

（1）编辑：根据要调试的舵机ID，修改如下位置。如要调试食指，则设置ID值为1、2

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTk5NzA4NWFkNjExYzVjNDI5MzU5ODliZGIyYjhlMjlfYjcwZmI2MTE0OGViMjM2MDU0Njc5MzZiMGQ1YjcwZTlfSUQ6NzU4NzMzNTM5NjkzODk1OTgxNV8xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

（2）上传程序到开发板中

（3）连线：将开发板与舵机驱动板、**1、2**号舵机连接起来，可以听到舵机齿轮旋转一定角度后停止。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTU3MGQ3MDEyZGU3MmRkNmEyYjAxYjQyZTFhZmRmMGFfZjU0YmZkMjY4NWY2MmNiY2U5NTI0ZjI5NjI4Y2Y1YTVfSUQ6NzU4NzM3MzM5NjI2MzA5NTIyN18xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

（4）将伺服喇叭安装在齿轮上，位置尽量保持平行

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2VhYWMyMjg3YjQyMWE3ZWZkMTJhYmY0NDZmOWU1OWFfMzJlMjY3NzA1ZDYxNTRmZGIyYTNiYWJhMmFjNTk0YmJfSUQ6NzU4NzMzNTUwMDU1NTA5NTI0M18xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

3、调试舵机3、4

（1）**断开328P开发板与舵机驱动板之间的接线（否则无法上传）**

（2）编辑：设置ID值为3、4

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzI5YjVmZDNlOWI4OTc1NWMzMTlkM2UwM2IxMTM3NmFfYzJlZTRiNzA5MTc0YjkzNzBkMzg0ZWM4MWJjM2YzNGZfSUQ6NzU4NzMzNTU0MzQ2MjkwNjgyNF8xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

（3）上传程序到开发板中

（4）连线：将开发板与舵机驱动板、**3、4**号舵机连接起来，可以听到舵机齿轮旋转一定角度后停止。

（5）将伺服喇叭安装在齿轮上，位置尽量保持平行

4、调试舵机5、6

步骤同上

5、调试舵机7、8

步骤同上

## 4.**微调中间值**

1、上传代码程序"01 微调MiddlePos值时使用" 到 开发板中

2、手指处于闭合位置时，立即停止程序（断开数据线即可），并检查伺服喇叭是否正确对齐（如下图）。如果未对齐，调整程序中MiddlePos_1、MiddlePos_2的值，直到对齐为止。记录下该值（8个舵机对应8个值），最后的程序中要使用。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGE2MzQ0NDFhYTMwZGU3NGMyMWNkYTI2YmJjYTNhODVfODk5ZGU2OTE0YjMxMmQ2NmE3MGRmZGQ1ZjBiNjc2YzVfSUQ6NzU4NzMzNTYzNTAwMzE2NTg4N18xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Y2ExYWE2ZGNjYTMwY2RmNzNlN2NiY2VhOWIzYWNjM2FfMmM0NGVmNzBhNTc2YWE5ZWU2MzNjZGM2ZGI5NTc4YTdfSUQ6NzU4NzMzNTY1OTI5NjYyMzU3N18xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

## 5.**运行测试程序**

1、将上面保存的MiddlePos_1、MiddlePos_2的值填入下面数组中，下载程序即可。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTYzY2Y4MWVhN2QzN2ZkNGJmNDkyNmRlNWRiZjY0YTNfYzI2NzQ3MTU5YzBmNDk1ZDU1ZTRlODMzMTM3OWYwOTJfSUQ6NzU4NzMzNTcxNTY0Njc3MDEyN18xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

## 6.**运行"02 演示程序"**

（1）自行安装软件arduino，根据自身系统参考[安装教程](https://blog.csdn.net/weixin_35509395/article/details/156188274)

（2）在 `灵巧手调试\00 TTL串口舵机\arduino程序（MEGA328P开发板）\02 演示程序`目录下根据 左手还是右手 打开对应的ino文件

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDcwMmVkZDRhNGVhOGU3MWY3MzNlOTAyYjhiMTkzNDJfNDg5MzNhODQ2M2UyYmU2NWExNGU4MTcxOWIxZjgyOWFfSUQ6NzU9Njk4MzM0NDUwNjU1NTM1OF8xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

（3）编译上传arduino程序到开发板的话，要先在 库管理器 里安装FTServo库、SCServo库

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDg2MmM3MTZjMGUyMDZiMzI0OWRmNDA5MWVkMzBmZDJfOTNmOTkzZDA0MDVjMWZkODQ0MDQ0ODE5ZjljODZhODJfSUQ6NzU9Njk4Mjk2MjY0Njc0ODM3OF8xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

（4）开发板类型选：选择"Arduino Nano"

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTk5MTA1YTQ1OGY1ZGYyZDk2YzE4MWQwYTBmMDU3MjRfMjI2MDY2MWM4MTIzNzk5NGFhNmFmZmFhZDA4NzlmNmZfSUQ6NzU9Njk4Mjk2MDM5ODk5NDY1N18xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

（5）编译并上传

注意 此时电脑只单独连接到开发板，开发板先不连接到舵机驱动板（即不和灵巧手连接）

上传成功后，将开发板通过三根跳线连接到舵机驱动板上，舵机连接到舵机驱动板，参考 [MEGA328P开发板调试](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link)[时的接线方式](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link)。

灵巧手会不断循环运行**"02 演示程序"**

运行结果如下：

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzE3YzdkODRiNTM5MTE2Njk2NzdmZmVlOGMzOGI5NDJfZmE5M2Q0NTkyMTk2N2UzMDM1ZjA1Yzg5NTliOTA3N2ZfSUQ6NzU9NTE0MzkzNjczOTMxNDg3M18xNzgwMDUxNjg2OjE3ODAxMzgwODZfVjM)

## [7.手部追踪](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)
