---
title: "TTL 调试教程"
description: "本页介绍使用Arduino程序调试TTL舵机版AmazingHand灵巧手的流程:接线方式、舵机ID设置、固定伺服喇叭、微调中间值及运行演示程序。"
---

# TTL 调试教程

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**


首先，下载"[灵巧手调试.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc)"压缩包，解压后可通过"使用arduio程序调试灵巧手过程（TTL舵机）"文档进行舵机ID设置、标定、校准中位及演示程序运行，或 参考[官方开源代码](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample)。

**成品无拆卸**情况下（出厂 舵机ID设置、标定、校准中位已调试好）可以直接跳到**[第6点 运行"02 演示程序"](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188003&from=from_node_link)** 和 第7点 **[手部追踪](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188027&from=from_node_link)**。

![image – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/1.png)

## 1. 调试灵巧手的接线方式

一种是使用电脑运行python等上位机软件，如飞特舵机上位机或者python代码运行

一种是使用MEGA328P等单片机或自行购买的开发板或主控等

接线方式如下：

（1）python方式调试时的接线方式（只接舵机驱动板）：

![1. 调试灵巧手的接线方式 – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/2.png)

（2）MEGA328P开发板调试时的接线方式（舵机驱动板+328P开发板）：

**看清楚MEGA328P开发板的针脚位置！**

![1. 调试灵巧手的接线方式 – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/3.png)

![1. 调试灵巧手的接线方式 – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/4.png)

![1. 调试灵巧手的接线方式 – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/5.png)

![1. 调试灵巧手的接线方式 – 5](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/6.png)

下面描述的是使用单片机的调试过程，单片机本身是会不断循环演示程序的，只需断开数据线即可停止。

## 2.设置舵机ID

单个灵巧手共使用了8个舵机，右手 ID需要设置为1-8 ，左手 ID需要设置为11-18

中位校准 成品默认 右手[451,571,451,571,451,571,451,571] 左手[571,451,571,451,571,451,571,451]

1、连线：依次将 **单个** 舵机、舵机驱动板连接起来。

![2.设置舵机ID – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/7.jpg)

2、使用舵机厂家提供的上位机软件FD1.9.8.2进行设置

FD.rar

![2.设置舵机ID – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/8.png)

![2.设置舵机ID – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/9.png)

![2.设置舵机ID – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/10.png)

## 3.**固定伺服喇叭**

1、上传代码程序"安装白色伺服喇叭时使用" 到开发板中

该程序的作用：使舵机的齿轮位置处于一个大致居中的位置，后续的动作角度都是基于这个中间的位置进行的。

（1）自行安装软件arduino，根据自身系统参考[安装教程](https://blog.csdn.net/weixin_35509395/article/details/156188274)，编译下载arduino程序的话，要先在 库管理器 里安装FTServo库、SCServo库

![3.固定伺服喇叭 – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/11.png)

（2）开发板类型选：选择"Arduino Nano"

![3.固定伺服喇叭 – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/12.png)

2、调试舵机1、2

（1）编辑：根据要调试的舵机ID，修改如下位置。如要调试食指，则设置ID值为1、2

![3.固定伺服喇叭 – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/13.png)

（2）上传程序到开发板中

（3）连线：将开发板与舵机驱动板、**1、2**号舵机连接起来，可以听到舵机齿轮旋转一定角度后停止。

![3.固定伺服喇叭 – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/14.png)

（4）将伺服喇叭安装在齿轮上，位置尽量保持平行

![3.固定伺服喇叭 – 5](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/15.png)

3、调试舵机3、4

（1）**断开328P开发板与舵机驱动板之间的接线（否则无法上传）**

（2）编辑：设置ID值为3、4

![3.固定伺服喇叭 – 6](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/16.png)

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

![4.微调中间值 – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/17.png)

![4.微调中间值 – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/18.png)

## 5.**运行测试程序**

1、将上面保存的MiddlePos_1、MiddlePos_2的值填入下面数组中，下载程序即可。

![5.运行测试程序 – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/19.png)

## 6.**运行"02 演示程序"**

（1）自行安装软件arduino，根据自身系统参考[安装教程](https://blog.csdn.net/weixin_35509395/article/details/156188274)

（2）在 `灵巧手调试\00 TTL串口舵机\arduino程序（MEGA328P开发板）\02 演示程序`目录下根据 左手还是右手 打开对应的ino文件

![6.运行"02 演示程序" – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/20.png)

（3）编译上传arduino程序到开发板的话，要先在 库管理器 里安装FTServo库、SCServo库

![6.运行"02 演示程序" – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/21.png)

（4）开发板类型选：选择"Arduino Nano"

![6.运行"02 演示程序" – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/22.png)

（5）编译并上传

注意 此时电脑只单独连接到开发板，开发板先不连接到舵机驱动板（即不和灵巧手连接）

上传成功后，将开发板通过三根跳线连接到舵机驱动板上，舵机连接到舵机驱动板，参考 [MEGA328P开发板调试](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link)[时的接线方式](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link)。

灵巧手会不断循环运行**"02 演示程序"**

运行结果如下：

![6.运行"02 演示程序" – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/23.png)

## [7.手部追踪](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)
