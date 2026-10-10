---
title: "Lekiwi 组装教程"
description: "Lekiwi 移动机器人小车组装教程：从轮子模块到整车的分步安装说明，附 Fusion360 在线 CAD 与 URDF 文件参考。"
---

# Lekiwi 组装教程

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**

[*在Fusion360 在线 CAD*](https://a360.co/4k1P8yO)*中可以可视化精确的组件位置。*

[URDF文件](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

在线URDF预览https://urdf.d-robotics.cc/

## 一、组装轮子模块（每台机器人3个）

1.使用 12 个 **M2x6** 自攻螺钉将驱动电机固定到电机支架上。（舵机盒自带）

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-01.png)
![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-02.png)

2.使用 12 个 **M3x16** 机螺钉和 12个 **M3螺母** 用 驱动电机支架 将 舵机 固定到底板上。

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-03.jpg)

3.将82mm全向轮的机螺钉和螺母拆下

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-04.png)

4.使用 m3\*6螺丝 将 舵盘 固定到舵机上

![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-05.png)

5.安装 4个防松螺母到 联轴器里，先使用 4个 m3\*6螺丝 将 联轴器 固定到 舵盘 上

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-06.png)
![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-07.png)

6.使用 m3\*25机螺钉和防松螺母 将 82mm全向轮 固定在 联轴器 上



三个轮子全部安装到底板上后：

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-09.jpg)

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-10.png)

## 二、底板组件

1.将 2个M3螺母 插入舵机驱动板和电池安装座的孔中。用 4颗M3x12六角螺丝 将两者固定到底板上。

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-11.png)
![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-12.png)

2.用 2个M3\*12六角螺丝 和 2个M3螺母 安装 舵机驱动板 并连接到 3 个舵机上。

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-13.png)

移动电源 电缆连接

- **电源输入**直接连接到电源

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-14.png)
![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-15.png)

- **USB-C** 接口为树莓派提供 5V 电源
- 如果使用 **12V 机械臂**，直接用 **DC 电源分配器** 为 **舵机电机板**供电

![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-16.png)
![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-17.png)

电缆可按照下图所示连接：

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-18.png)

## 三、顶板组装

1.将 树莓派5 放入树莓派外壳底部，然后扣上外壳顶部。

2.使用 两颗 M3x16 六角螺丝 和 两颗 M3螺母 将树莓派固定到顶部底板上，并使用四颗 M4x25 机螺钉和 四颗M4螺母 安装 SO-101 机械臂底座。

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-19.png)

## 四、

1.将舵机驱动板 USB-C 转 USB-A 线、5V USB-C 电源线和 舵机线 穿过顶底板上的孔。

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-20.png)

2.使用 8 个 m3x16 机螺钉和 4个m3螺母将 顶底板 安装到电机支架上。

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-21.png)



## 五、安装摄像头

*注意：我们设计的支架是专为我们选择的相机设计的。对于不同的相机模块，可能需要进行修改。*

## （选项 1）安装前视摄像头

①使用 4个 m2\*5\*5垫片螺丝固定摄像头模组

②使用 2个 m3\*12机螺钉 和 2颗m3螺母 安装前视摄像头支架到底板上

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-22.webp)
![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-23.webp)

## （选项 2）安装臂载摄像头

使用 4个 m2\*5\*5垫片螺丝固定摄像头模组

该支架支持孔间距24\*25mm或者28\*28mm的摄像头

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-24.png)

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-25.png)

## 六、插上电源并接线

将直流圆筒形插头适配器插入 **舵机驱动板** 上；

将 5V USB-C 连接器插入**树莓派5**，即可为电子设备供电；

舵机驱动板和摄像头的 USB 数据线 可以直接插入树莓派。

![image – 26](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-26.png)
