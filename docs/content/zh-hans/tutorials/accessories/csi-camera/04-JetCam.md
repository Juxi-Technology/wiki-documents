---
title: "JetCam 使用"
description: "JetCam 使用教程——在 NVIDIA Jetson 上安装 JetCam 库,调用 CSI 与 USB 摄像头采集画面。"
---

# JetCam 使用

JetCam使用

1、JetCam安装

2、JetCam使用

2.1、CSI摄像头

主要代码解释

调用摄像头

获取摄像头画面

2.1.1、单路摄像头

2.1.2、多路摄像头

2.2、USB摄像头

参考资料



JetCam 是 NVIDIA 为 Jetson 平台开发的一个易用的 Python 库，用于集成和操作 USB 摄像头或 CSI 摄像头

## 1、JetCam安装

```Plain Text
git clone https://github.com/NVIDIA-AI-IOT/jetcam
cd jetcam
sudo python3 setup.py install
sudo pip3 install ipywidgets
```

## 2、JetCam使用

JetCam提供典型的示例程序给用户演示CSI和USB摄像头的调用。

案例需要使用Jupyter Lab运行，使用我们出厂镜像系统，可以直接通过主板IP:8888进行访问！

### 2.1、CSI摄像头

Jupyter Lab网页端进入CSI摄像头所在文件夹并打开对应文件夹：

`/home/jetson/jetcam/notebooks/csi_camera`

**注意：对Jupyter Lab不太熟悉的，可以看Jupyter Lab使用教程了解基础操作！**

#### 主要代码解释

##### 调用摄像头

width：图像输出宽度

height：图像输出高度

`from jetcam.csi_camera import CSICamera`

`camera = CSICamera(width=224, height=224)`

##### 获取摄像头画面

`image = camera.read()`

#### 2.1.1、单路摄像头

> **源码路径**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/csi_camera.ipynb`

> **运行现象**
> 
> 

打开程序文件后，单个单元块从上往下运行：

![图 1](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/1.png)

#### 2.1.2、多路摄像头

> **源码路径**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/multi_csi_camera.ipynb`

> **运行现象**
> 
> 

打开程序文件后，单个单元块从上往下运行：

![图 2](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/2.png)

### 2.2、USB摄像头

Jupyter Lab进入USB摄像头所在文件夹并打开文件，出厂镜像系统文件夹路径：

`/home/jetson/jetcam/notebooks/usb_camera`

![图 3](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/3.png)

## 参考资料

[https://github.com/NVIDIA-AI-IOT/jetcam](https://github.com/NVIDIA-AI-IOT/jetcam)

<RelatedProducts slugs="imx219-csi-camera" />
