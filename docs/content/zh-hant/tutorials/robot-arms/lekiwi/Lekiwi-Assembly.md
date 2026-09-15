---
title: "Lekiwi 組裝教程"
description: "Lekiwi 移動機器人組裝教程：輪組模組、底板、頂板與攝影機安裝步驟，附在線 CAD 與模型參考。"
---

# Lekiwi 組裝教程

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**


[*在Fusion360 在線 CAD*](https://a360.co/4k1P8yO)*中可以可視化精確的組件位置。*

[URDF文件](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

在線URDF預覽 https://urdf.d-robotics.cc/

## 一、組裝輪子模塊（每臺機器人3個）

1.使用 12 個 **M2x6** 自攻螺釘將驅動電機固定到電機支架上。（舵機盒自帶）

![image – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/1.jpg)

![image – 2](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/10.jpg)

2.使用 12 個 **M3x16 機螺釘和 12個 ** 將驅動電機支架固定到底板上。

![image – 3](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/11.jpg)

3.將82mm全向輪的機螺釘和螺母拆下

![image – 4](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/12.jpg)

4.使用 m3\*6螺絲 將 舵盤 固定到舵機上

![image – 5](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/13.jpg)

5.安裝 4個防鬆螺母到 聯軸器裏，並使用 4個 m3\*6螺絲 將 聯軸器 固定到 舵盤 上

![image – 6](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/14.jpg)

![image – 7](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/15.jpg)

6.使用 m3\*25機螺釘和防鬆螺母 將 82mm全向輪 固定在 聯軸器 上



三個輪子全部安裝到底板上後：

![image – 8](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/16.jpg)

![image – 9](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/17.jpg)

![image – 10](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/18.jpg)

## 二、底板組件

1.將M3螺母插入舵機驅動板和電池安裝座的孔中。用4顆M3x12機螺釘將兩者固定到底板上。

![image – 11](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/19.jpg)

![image – 12](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/2.jpg)

2.用四個M2.5\*6.5銅柱和四個M2.5\*8螺絲安裝舵機驅動板並連接到 3 個舵機上。

![image – 13](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/20.jpg)

移動電源 電纜連接

- **電源輸入**直接連接到電源

![image – 14](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/21.jpg)

![image – 15](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/22.jpg)

- **USB-C** 接口爲樹莓派提供 5V 電源

- 如果使用 **12V 機械臂**，直接用 **DC 電源分配器 **爲 **舵機電機板**供電

![image – 16](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/3.jpg)

![image – 17](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/4.jpg)

電纜可按照下圖所示連接：

![image – 18](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/5.jpg)

## 三、頂板組裝

1.將樹莓派 5 放入樹莓派外殼底部，然後扣上外殼頂部。

2.使用兩顆 M3x12 機螺釘和兩顆 M3防鬆螺母將樹莓派固定到頂部底板上，並使用四顆 M4x25 機螺釘和四顆M4防鬆螺母 安裝 SO-101 機械臂底座。使用我們改進的 SO-101 底座或原裝底座均可，因爲底板上預留了兩種底座的安裝孔。

![image – 19](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/6.jpg)

## 四、

1.將舵機驅動板 USB-C 轉 USB-A 線、5V USB-C 電源線和 SO0-101 舵機線穿過頂底板上的孔。

![image – 20](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/7.jpg)

2.使用 6 個 m3x12 機螺釘和 6個m3防鬆螺母將 頂底板 安裝到電機支架上。

![image – 21](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/8.jpg)

3.使用 6個 M3\*50 銅柱 和 6個 M3\*機螺釘 連接 頂板和底板



## 五、安裝攝像頭

*注意：我們設計的支架是專爲我們選擇的相機設計的。對於不同的相機模塊，可能需要進行修改。*

### （選項 1）安裝前視攝像頭

使用 3個 m3\*12機螺釘 和 三顆m3螺母 安裝前視攝像頭支架到底板上



使用 4個 m2\*5\*5墊片螺絲固定攝像頭模組



### （選項 2）安裝臂載攝像頭



使用 4個 m2\*5\*5墊片螺絲固定攝像頭模組

## 六、插上電源



將直流圓筒形插頭適配器插入舵機驅動板上，將 5V USB-C 連接器插入樹莓派 5，即可爲電子設備供電。舵機驅動板和攝像頭的 USB 數據線可以直接插入樹莓派。

![（選項 2）安裝臂載攝像頭 – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/9.jpg)



