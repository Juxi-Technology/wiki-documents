---
title: "Jetson CSI Camera Setup"
description: "Jetson CSI camera setup guide: configure the 24-pin CSI connector with jetson-io, save pin changes, and check video devices for IMX219 cameras."
---

# Jetson CSI Camera Setup

## 1. Configure CSI Camera Pins

```Plain Text
sudo /opt/nvidia/jetson-io/jetson-io.py
```

![Image 1](../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/1.png)

Press the Down arrow key to select **Configure Jetson 24pin CSI Connector**. Then press Enter to proceed to the next option

![Image 2](../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/2.png)

Select **Configure for compatible hardware** , then press Enter.

![Image 3](../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/3.png)

Press the Down arrow key to select **Camera IMX219 Dual**, then press Enter.

If running the camera preview after the subsequent restart reports an error or shows a black screen, change this to Camera IMX219-C

![Image 4](../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/4.png)

Select **Save pin changes** , then press Enter.

![Image 5](../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/5.png)

Press the Down arrow key to select **Save and reboot to reconfigure pins**, then press Enter.

![Image 6](../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/6.png)

When the following screen appears, press Enter directly, and the board will restart.

![Image 7](../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/7.jpg)

## 2. View Video Devices

```Plain Text
ls /dev/video*
```

The result in the image is the result of connecting two CSI cameras: generally, one CSI camera shows one `video` device

![Image 8](../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/8.png)

## 3. Preview the Camera Image

Enter the following command in the terminal, and the system will automatically pop up a camera image window: it opens the `/dev/video0` device by default

```Plain Text
nvgstcapture-1.0
```

![Image 9](../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/9.png)

### 3.1. Specify the Camera

If there are multiple cameras, you can specify the camera ID:

```Plain Text
nvgstcapture-1.0 --sensor-id=1
```

![Image 10](../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/10.png)

### 3.2. Specify the Preview Resolution

If there is only one CSI camera, you can change `--sensor-id=1` to `--sensor-id=0`:

```Plain Text
nvgstcapture-1.0 --sensor-id=1 --cus-prev-res=1280x720
```

![Image 11](../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/11.png)

<RelatedProducts slugs="imx219-csi-camera" />
