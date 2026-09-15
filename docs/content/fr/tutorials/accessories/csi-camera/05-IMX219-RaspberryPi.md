---
title: "IMX219 sur Raspberry Pi"
description: "S'il n'existe pas, un problème peut provenir du noyau ou du matériel du périphérique ; essayez de réinstaller…"
---

# IMX219 sur Raspberry Pi

##### 1、Utilisez d'abord la commande "ls" pour vérifier si le nœud de périphérique vchiq existe : saisissez ls /dev

![Image 1](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/1.png)

S'il n'existe pas, un problème peut provenir du noyau ou du matériel du périphérique ; essayez de réinstaller le système ou de remplacer le matériel.

##### 2、Exécutez la commande "sudo raspi-config" pour activer la caméra CSI du Raspberry Pi

![Image 2](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/2.png)

![Image 3](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/3.png)

![Image 4](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/4.png)

![Image 5](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/5.png)

Quittez ensuite et saisissez la commande sudo reboot pour redémarrer le Raspberry Pi

##### 3、Saisissez "vcgencmd get_camera" pour vérifier si la caméra actuelle et son activation sont disponibles

![Image 6](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/6.png)

Si detected=0, cela signifie que le module de caméra est mal connecté ; vérifiez à nouveau le matériel. detected=1 signifie que la caméra CSI est correctement connectée. supported=1 signifie que la caméra est activée et peut être utilisée. supported=0 signifie que la caméra CSI n'est pas activée et que le module de caméra doit être activé.

## **3.Utilisez la commande rapistill pour prendre une photo**

Saisissez **"raspistill -o image.jpg"** pour prendre et enregistrer une photo avec succès ; la caméra s'allume alors en rouge. Pour plus de paramètres, utilisez raspistill --help

![Image 7](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/7.png)

Transférez l'image image.jpg sur le bureau Windows et ouvrez-la pour voir le résultat de la photo

<RelatedProducts slugs="imx219-csi-camera" />
