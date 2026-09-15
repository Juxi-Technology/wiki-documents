---
title: "Auto-Focus Camera Usage"
description: "The result in the image is the result of connecting two CSI cameras and one USB camera: generally, one CSI ca…"
---

# Auto-Focus Camera Usage

## 1. View Video Devices

```Plain Text
ls /dev/video*
```

The result in the image is the result of connecting two CSI cameras and one USB camera: generally, one CSI camera shows one `video` device, and one USB camera shows two `video` devices. For the USB camera, choose the newly added `/dev/video2` with the smaller number to use it (connecting the USB camera adds the `/dev/video2` and `/dev/video3` device numbers to the system)

![Image 1](../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/1.png)

## 2. GUVCView

GUVCView is open-source software for Linux systems, used to capture and record video and images, mainly for webcam cameras.

### 2.1. GUVCView Installation

```Plain Text
sudo apt update
sudo apt install guvcview -y
```

![Image 2](../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/2.png)

### 2.2. GUVCView Usage

Go to the application menu bar and click the `guvcview` icon, or enter the launch command in the terminal: select the USB camera; the CSI camera has no preview image

```Plain Text
guvcview
```

![Image 3](../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/3.png)

![Image 4](../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/4.png)

## 3. VLC

VLC media player is a free and open-source multimedia player that supports multiple audio and video formats as well as DVD, audio CD, VCD, and various streaming protocols.

### 3.1. VLC Installation

```Plain Text
sudo apt update
sudo apt install vlc -y
```

![Image 5](../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/5.png)

### 3.2. VLC Usage

Go to the application menu bar and click the `VLC media player` icon, or enter the launch command in the terminal: select the USB camera; the CSI camera has no preview image

```Plain Text
vlc
```

![Image 6](../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/6.png)

![Image 7](../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/7.png)

Select the device number corresponding to the USB camera:

![Image 8](../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/8.png)

![Image 9](../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/9.png)

<RelatedProducts slugs="usb-auto-focus-camera" />
