---
title: "IMX219(树莓派)教程"
description: "IMX219 CSI 摄像头树莓派教程——检查 vchiq 节点、raspi-config 使能摄像头并拍照验证。"
---

# IMX219(树莓派)教程

##### 1、首先使用"ls"指令来查看是否存在vchiq设备节点：输入 ls /dev

![图 1](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/1.png)

如果没有，则可能是内核或者设备硬件存在问题，可尝试重刷系统或更换硬件。

##### 2、运行"sudo raspi-config"命令使能树莓派CSI摄像头

![图 2](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/2.png)

![图 3](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/3.png)

![图 4](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/4.png)

![图 5](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/5.png)

然后退出，输入命令sudo reboot重启下树莓派

##### 3、输入"vcgencmd get_camera"查看当前摄像头跟使能是否可用

![图 6](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/6.png)

如果detected=0，说明摄像头模块没接好，重新排查下硬件。detected=1则说明CSI摄像头接入正常。supported=1说明摄像头已经使能，摄像头已经可以使用。supported=0则说明CSI摄像头没有使能，需要使能下摄像头模块。

## **3.使用rapistill命令拍照**

输入**"raspistill -o image.jpg"**即可成功拍照并保存，此时摄像头会亮红灯，更多参数使用raspistill --help

![图 7](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/7.png)

将image.jpg图片传输到windows桌面打开， 即可看到拍照出来的效果

<RelatedProducts slugs="imx219-csi-camera" />
