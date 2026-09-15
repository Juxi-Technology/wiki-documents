---
title: "Jetson CSI 摄像头配置"
description: "按方向键下选择Configure Jetson 24pin CSI Connector。然后按Enter进入下一个选项"
---

# Jetson CSI 摄像头配置

## 1、配置CSI摄像头引脚

```Plain Text
sudo /opt/nvidia/jetson-io/jetson-io.py
```

![图 1](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/1.png)

按方向键下选择**Configure Jetson 24pin CSI Connector**。然后按Enter进入下一个选项

![图 2](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/2.png)

选择**Configure for compatible hardware** ，然后按Enter。

![图 3](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/3.png)

按方向键下选择**Camera IMX219 Dual**，然后按Enter。

如果后面重启之后运行预览摄像头画面是报错或黑屏，这里改为Camera IMX219-C

![图 4](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/4.png)

选择**Save pin changes** ，然后按Enter。

![图 5](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/5.png)

按方向键下选择**Save and reboot to reconfigure pins**，然后按Enter。

![图 6](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/6.png)

出现以下界面直接按Enter键，主板会重新启动。

![图 7](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/7.jpg)

## 2、查看video设备

```Plain Text
ls /dev/video*
```

图片的结果是接了两个CSI摄像头的结果：一般一个CSI摄像头显示一个`video`设备

![图 8](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/8.png)

## 3、预览摄像头画面

终端输入下面命令，系统会自动弹出摄像头画面窗口：默认打开`/dev/video0`设备

```Plain Text
nvgstcapture-1.0
```

![图 9](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/9.png)

### 3.1、指定摄像头

若有多个摄像头，可以指定摄像头ID：

```Plain Text
nvgstcapture-1.0 --sensor-id=1
```

![图 10](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/10.png)

### 3.2、指定预览分辨率

若只有一个CSI摄像头，可将`--sensor-id=1`改成`--sensor-id=0`：

```Plain Text
nvgstcapture-1.0 --sensor-id=1 --cus-prev-res=1280x720
```

![图 11](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/11.png)

<RelatedProducts slugs="imx219-csi-camera" />
