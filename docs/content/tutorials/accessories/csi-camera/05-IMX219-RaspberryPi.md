---
title: "IMX219 on Raspberry Pi"
description: "IMX219 CSI camera on Raspberry Pi: enable the camera with raspi-config, verify detection with vcgencmd, and capture photos with raspistill."
---

# IMX219 on Raspberry Pi

##### 1. First, use the "ls" command to check whether the vchiq device node exists: enter ls /dev

![Image 1](../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/1.png)

If it does not exist, there may be a problem with the kernel or the device hardware; you can try reflashing the system or replacing the hardware.

##### 2. Run the "sudo raspi-config" command to enable the Raspberry Pi CSI camera

![Image 2](../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/2.png)

![Image 3](../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/3.png)

![Image 4](../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/4.png)

![Image 5](../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/5.png)

Then exit and enter the command sudo reboot to restart the Raspberry Pi

##### 3. Enter "vcgencmd get_camera" to check whether the current camera and enablement are available

![Image 6](../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/6.png)

If detected=0, it means the camera module is not connected properly; check the hardware again. detected=1 means the CSI camera is connected normally. supported=1 means the camera has been enabled and can be used. supported=0 means the CSI camera has not been enabled and you need to enable the camera module.

## **3. Take Photos Using the rapistill Command**

Enter **"raspistill -o image.jpg"** to successfully take a photo and save it; at this point the camera will light up red. For more parameters, use raspistill --help

![Image 7](../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/7.png)

Transfer the image.jpg image to the Windows desktop and open it, and you can see the effect of the photo taken

<RelatedProducts slugs="imx219-csi-camera" />
