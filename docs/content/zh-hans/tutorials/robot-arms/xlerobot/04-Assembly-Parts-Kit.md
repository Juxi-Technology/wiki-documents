---
title: "⚒️散件组装"
description: "如果你宁愿跳过拧螺丝的乐趣，你也可以购买适配Xlerobot的SO101从动臂的预组装套件。"
---

# ⚒️散件组装

![图 1](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/1.png)

小技巧

如果你宁愿跳过拧螺丝的乐趣，你也可以购买适配Xlerobot的SO101从动臂的[预组装套件](https://item.taobao.com/item.htm?ft=t&id=1002551208989&spm=a21dvs.23580594.0.0.47b32c1bwUlxLA&skuId=6088534920039)。



## 🦾 SO101机械臂

![图 2](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/2.png)

> 如果你已经有2个配置了舵机的组装好的SO101机械臂，请跳过。
> 
> 

- 按照[SO101逐步组装说明](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g)构建2个SO101机械臂，制作2个相同的从动臂，配备2套舵机(之前都ID为1-6)用于2个舵机驱动板。

- 按照这个[安装指南](https://juxitech.feishu.cn/wiki/LjJywf5ILihuwkkOboGcFx1Qnkc)添加手腕相机。

- 如果你有防滑垫，可以将其贴在夹爪上。

## 一、配置舵机

||数量|舵机id|用途|
|---|---|---|---|
|飞特STS3215-C018舵机|3|7、8、9|万向轮底盘车|
|飞特STS3215-C018舵机|2|7、8|上肢套件-相机塔|
|舵机延长线90CM|2||将底盘车和相机塔连接舵机驱动板|

![图 3](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/3.png)

> 由于官方lerobot代码库目前不支持除机械臂外的舵机配置，我们使用[Bambot](https://bambot.org/)代替(在Windows和Mac上工作，Linux需要先运行sudo chmod 666 /dev/ttyACM0)。
> 
> 

```Plain Text
sudo chmod 666 /dev/ttyACM0
```

- 将你想要配置的舵机(逐个)连接到舵机驱动板，并直接将舵机驱动板连接到你的计算机。

- 导航到[Bambot的舵机配置页面](https://bambot.org/feetech.js)，建立连接并扫描你的舵机。 

![图 4](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/4.png)

- 按照下面的说明重命名舵机ID。 

![图 5](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/5.png)

- 除了SO101机械臂外，你还需要为2个 舵机驱动板 配置两套舵机：

    - 一套用于**相机塔**(舵机id：7, 8)

    - 另一套用于**万向轮底盘车**(舵机id：7, 8, 9)。

- 提示：用记号笔在舵机上写数字，并区分不同板子的舵机(如L1-L8和R1-R9)。

## 🛒 推车

- 万一你意外扔掉了手册，[这里有一份](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manuals_raskog_utility_cart.pdf)。

![图 6](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/6.png)

## 🧑‍🦼‍➡ 轮式底座

> 如果你已经有一个Lekiwi底座，请拆下电池、舵机支架等。底板只需安装3个带轮子的舵机(保留接线)。
> 
> 

![图 7](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/7.png)

**备注**

不要选错板子，每个板子都有特定的顺序。

- 根据上图将 全向轮 安装到板子上。

    - 应相应安装特定的舵机id。

- 注意全向轮的连接器需要3个M4螺丝。

- 按照[教程](https://github.com/SIGRobotics-UIUC/LeKiwi/blob/main/Assembly.md#2-bottom-plate-assembly)正常接线舵机，之后不要将舵机线缆连接到舵机驱动板，而是使用 **90CM舵机延长线** 来连接 舵机驱动板。

![图 8](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/8.png)

- 根据上图安装顶板。

- 让 **90CM舵机延长线** 悬挂，暂时不要从 顶板孔 拉出来。

![图 9](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/9.png)

- 根据上图在顶板上安装3个连接器（增高架）。

小技巧

将带连接器的Lekiwi底座放在推车下方，看看是否能给推车足够的压力，推车的四个轮子仍能接触地面。如果不能，尝试通过在切片软件中直接稍微调整z轴比例(保持xy轴比例不变)来修改连接器的3D模型并重新打印。

![图 10](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/10.png)

小技巧

翻转推车进行下面的组装。

- 现在将带连接器的Lekiwi底座安装到推车的底部，较薄的板子在另一侧。

- 参考图片根据舵机索引找到所需的组装方向。

备注

这个新硬件版本与推车金属网格兼容，所有12个M3螺丝都应该能够轻松装入。

![图 11](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/11.png)

- 然后，将之前延长的线缆从下方穿过推车向上布线。

## 🦾 机械臂底座

### 顶部底座组装

14个 M3\*12 六角螺丝

4个 M3\*16 六角螺丝

![图 12](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/12.png)

- 当底座翻转过来时组装更容易。

### 头部组装

①先用 90CM舵机延长线（黑白相间）和 舵机线（白红黑相间） 插在7号舵机上。



②用四个 M2\*6垫片螺丝 将摄像头固定

![图 13](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/13.png)

- 注意安装舵盘时，舵盘的中间孔不锁螺丝。

- 这应该与[SO101机械臂组装](https://huggingface.co/docs/lerobot/so101#joint-1)的前两个步骤相同。

## 🧵 接线

重要

在将顶部底座夹到推车之前，完成顶部底座的所有接线和线缆管理，并将树莓派放入其外壳中。

![图 14](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/14.png)

- 将来自**Lekiwi底座**的 90CM舵机延长线 连接到 **左 SO101机械臂**(这使底座和机械臂成为Lekiwi)。

- 将2根**USB-C转USB-A数据线 **从2个 **舵机驱动板** 连接到 **树莓派**(剩下2个USB-A插槽用于相机)或Jetson主板。

- 连接所有3根**电源线缆**：2根**USB-C转DC(12V)从2个舵机驱动板**和1根**USB-C转USB-C**从**树莓派**，连接到电源的 PD快充 接口。每个接口在同时充电时提供高达100W功率，经测试足以支持12V版本运行。

### 🔋 放置电池 🛒

- 放在推车中层或下层的任何位置以保持低重心。电池有防滑底部，在正常操作中不易滑动。

- 为了安全保持直立放置。

- 万一你也意外扔掉了电池手册，[这里有一份](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manual_Anker_SOLIX_C300_DC_Portable_Power_Station.pdf)。

重要

为了保护舵机驱动板，确保最后连接电源线缆。在插拔其他线缆时始终断开电源线缆。

## 📸 最终组装

### 底座装入推车

重要

在将顶部底座夹到推车之前，完成顶部底座的所有接线和线缆管理，并将树莓派放入其外壳中。

![图 15](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/15.png)

- 当你将推车边缘塞入外壳插座时要小心不要弄坏外壳。

- 为了更容易测试，SO101机械臂直接夹在推车上。将[机械臂底座](https://github.com/Vector-Wangel/XLeRobot/blob/main/3D_Models/3D_models_for_printing/XLeRobot_special/SO_5DOF_ARM100_Assemblybases.stl)定位在推车顶层的两个角落，然后用 **F型固定夹** 固定。

- 如果你有 bambulab耗材纸质线轴，不要忘记将其放在里面以提供稳定的结构支撑。

![图 16](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/16.png)

完成这些步骤后，XLeRobot应该在物理上组装良好，准备做一些家务。

![图 17](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/17.png)

![图 18](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/18.png)

重要

XLeRobot完全组装后，不要像推车那样推着它到处走，因为这可能损坏舵机齿轮。相反，当你需要手动移动时，请抬起机器人(~12kg)。

<RelatedProducts slugs="xlerobot" />
