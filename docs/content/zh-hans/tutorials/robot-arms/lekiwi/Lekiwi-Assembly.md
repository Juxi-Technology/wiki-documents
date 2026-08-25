---
title: Lekiwi移动机器人组装教程
description: "在Fusion360 在线 CAD中可以可视化精确的组件位置。"
---

# Lekiwi移动机器人组装教程

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**


[*在Fusion360 在线 CAD*](https://a360.co/4k1P8yO)*中可以可视化精确的组件位置。*

[URDF文件](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

在线URDF预览https://urdf.d-robotics.cc/

# 一、组装轮子模块（每台机器人3个）

1.使用 12 个 **M2x6** 自攻螺钉将驱动电机固定到电机支架上。（舵机盒自带）

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/1.png)

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/10.png)

2.使用 12 个 **M3x16 机螺钉和 12个 ** 将驱动电机支架固定到底板上。

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/11.png)

3.将82mm全向轮的机螺钉和螺母拆下

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/12.png)

4.使用 m3\*6螺丝 将 舵盘 固定到舵机上

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/13.png)

5.安装 4个防松螺母到 联轴器里，并使用 4个 m3\*6螺丝 将 联轴器 固定到 舵盘 上

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/14.png)

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/15.png)

6.使用 m3\*25机螺钉和防松螺母 将 82mm全向轮 固定在 联轴器 上



三个轮子全部安装到底板上后：

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/16.png)

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/17.png)

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/18.png)

# 二、底板组件

1.将M3螺母插入舵机驱动板和电池安装座的孔中。用4颗M3x12机螺钉将两者固定到底板上。

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/19.png)

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/2.png)

2.用四个M2.5\*6.5铜柱和四个M2.5\*8螺丝安装舵机驱动板并连接到 3 个舵机上。

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/20.png)

移动电源 电缆连接

- **电源输入**直接连接到电源

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/21.png)

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/22.png)

- **USB-C** 接口为树莓派提供 5V 电源

- 如果使用 **12V 机械臂**，直接用 **DC 电源分配器 **为 **舵机电机板**供电

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/3.png)

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/4.png)

电缆可按照下图所示连接：

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/5.png)

# 三、顶板组装

1.将树莓派 5 放入树莓派外壳底部，然后扣上外壳顶部。

2.使用两颗 M3x12 机螺钉和两颗 M3防松螺母将树莓派固定到顶部底板上，并使用四颗 M4x25 机螺钉和四颗M4防松螺母 安装 SO-101 机械臂底座。使用我们改进的 SO-101 底座或原装底座均可，因为底板上预留了两种底座的安装孔。

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/6.png)

# 四、

1.将舵机驱动板 USB-C 转 USB-A 线、5V USB-C 电源线和 SO0-101 舵机线穿过顶底板上的孔。

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/7.png)

2.使用 6 个 m3x12 机螺钉和 6个m3防松螺母将 顶底板 安装到电机支架上。

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/8.png)

3.使用 6个 M3\*50 铜柱 和 6个 M3\*机螺钉 连接 顶板和底板



# 五、安装摄像头

*注意：我们设计的支架是专为我们选择的相机设计的。对于不同的相机模块，可能需要进行修改。*

## （选项 1）安装前视摄像头

使用 3个 m3\*12机螺钉 和 三颗m3螺母 安装前视摄像头支架到底板上



使用 4个 m2\*5\*5垫片螺丝固定摄像头模组



## （选项 2）安装臂载摄像头



使用 4个 m2\*5\*5垫片螺丝固定摄像头模组

# 六、插上电源



将直流圆筒形插头适配器插入舵机驱动板上，将 5V USB-C 连接器插入树莓派 5，即可为电子设备供电。舵机驱动板和摄像头的 USB 数据线可以直接插入树莓派。

![](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/9.png)



