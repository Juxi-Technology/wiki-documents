---
title: "自动对焦摄像头使用"
description: "自动对焦摄像头使用教程——查看 video 设备号,并用 GUVCView 测试 USB 摄像头画面。"
---

# 自动对焦摄像头使用

## 1、查看video设备

```Plain Text
ls /dev/video*
```

图片的结果是接了两个CSI摄像头、一个USB摄像头的结果：一般一个CSI摄像头显示一个`video`设备，一个USB摄像头显示两个`video`设备，USB摄像头选择新增加且数字较小的`/dev/video2`调用（接上USB摄像头系统新增`/dev/video2`、`/dev/video3`设备号）

![图 1](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/1.png)

## 2、GUVCView

GUVCView是一个用于Linux系统的开源软件，用于捕捉和录制视频和图像，主要用于Webcam摄像头。

### 2.1、GUVCView安装

```Plain Text
sudo apt update
sudo apt install guvcview -y
```

![图 2](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/2.png)

### 2.2、GUVCView使用

进入应用菜单栏点击`guvcview`图标或者终端输入启动命令：选择USB摄像头，CSI摄像头无预览画面

```Plain Text
guvcview
```

![图 3](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/3.png)

![图 4](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/4.png)

## 3、VLC

VLC media player是一个自由且开源的多媒体播放器，支持多种音频和视频格式以及DVD、音频CD、VCD和各种流媒体协议。

### 3.1、VLC安装

```Plain Text
sudo apt update
sudo apt install vlc -y
```

![图 5](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/5.png)

### 3.2、VLC使用

进入应用菜单栏点击`VLC media player`图标或者终端输入启动命令：选择USB摄像头，CSI摄像头无预览画面

```Plain Text
vlc
```

![图 6](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/6.png)

![图 7](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/7.png)

选择USB摄像头对应的设备号：

![图 8](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/8.png)

![图 9](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/9.png)

<RelatedProducts slugs="usb-auto-focus-camera" />
