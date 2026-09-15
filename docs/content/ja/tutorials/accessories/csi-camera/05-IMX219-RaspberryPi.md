---
title: "05、IMX219-CSIカメラ（Raspberry Pi）チュートリアル"
description: "存在しない場合、カーネルまたはデバイスハードウェアに問題がある可能性があります。システムを再インストールするか、ハードウェアを交換してみてください。"
---

# 05、IMX219-CSIカメラ（Raspberry Pi）チュートリアル

##### 1、まず"ls"コマンドを使用してvchiqデバイスノードが存在するか確認します：ls /dev を入力

![図 1](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/1.png)

存在しない場合、カーネルまたはデバイスハードウェアに問題がある可能性があります。システムを再インストールするか、ハードウェアを交換してみてください。

##### 2、"sudo raspi-config"コマンドを実行してRaspberry PiのCSIカメラを有効にします

![図 2](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/2.png)

![図 3](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/3.png)

![図 4](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/4.png)

![図 5](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/5.png)

その後終了し、コマンドsudo rebootを入力してRaspberry Piを再起動します

##### 3、"vcgencmd get_camera"を入力して現在のカメラと有効化が使用可能か確認します

![図 6](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/6.png)

detected=0の場合、カメラモジュールが正しく接続されていないことを示すため、ハードウェアを再確認してください。detected=1の場合はCSIカメラの接続が正常であることを示します。supported=1はカメラが有効化されており、カメラが使用可能であることを示します。supported=0の場合はCSIカメラが有効化されていないことを示すため、カメラモジュールを有効化する必要があります。

## **3.rapistillコマンドを使用して撮影**

**"raspistill -o image.jpg"**を入力すると撮影と保存に成功します。このときカメラの赤色ランプが点灯します。その他のパラメータはraspistill --helpを使用してください

![図 7](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/7.png)

image.jpg画像をWindowsデスクトップに転送して開くと、撮影された結果を確認できます



