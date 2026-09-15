---
title: "IMX219(樹莓派)教程"
description: "如果沒有，則可能是核心或者裝置硬件存在問題，可嘗試重刷系統或更換硬件。"
---

# IMX219(樹莓派)教程

##### 1、首先使用"ls"指令來查看是否存在vchiq裝置節點：輸入 ls /dev

![圖 1](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/1.png)

如果沒有，則可能是核心或者裝置硬件存在問題，可嘗試重刷系統或更換硬件。

##### 2、執行"sudo raspi-config"命令啟用樹莓派CSI攝像頭

![圖 2](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/2.png)

![圖 3](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/3.png)

![圖 4](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/4.png)

![圖 5](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/5.png)

然後退出，輸入命令sudo reboot重啟下樹莓派

##### 3、輸入"vcgencmd get_camera"查看當前攝像頭跟啟用是否可用

![圖 6](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/6.png)

如果detected=0，說明攝像頭模組沒接好，重新排查下硬件。detected=1則說明CSI攝像頭接入正常。supported=1說明攝像頭已經啟用，攝像頭已經可以使用。supported=0則說明CSI攝像頭沒有啟用，需要啟用下攝像頭模組。

## **3.使用rapistill命令拍照**

輸入**"raspistill -o image.jpg"**即可成功拍照並儲存，此時攝像頭會亮紅燈，更多參數使用raspistill --help

![圖 7](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/7.png)

將image.jpg圖片傳輸到windows桌面打開， 即可看到拍照出來的效果

<RelatedProducts slugs="imx219-csi-camera" />
