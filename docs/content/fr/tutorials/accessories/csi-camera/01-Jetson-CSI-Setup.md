---
title: "01、Utilisation de la caméra CSI"
description: "Utilisez la flèche bas pour sélectionner Configure Jetson 24pin CSI Connector. Appuyez ensuite sur Entrée pou…"
---

# 01、Utilisation de la caméra CSI

## 1、Configurer les broches de la caméra CSI

```Plain Text
sudo /opt/nvidia/jetson-io/jetson-io.py
```

![Image 1](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/1.png)

Utilisez la flèche bas pour sélectionner **Configure Jetson 24pin CSI Connector**. Appuyez ensuite sur Entrée pour passer à l'option suivante.

![Image 2](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/2.png)

Sélectionnez **Configure for compatible hardware**, puis appuyez sur Entrée.

![Image 3](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/3.png)

Utilisez la flèche bas pour sélectionner **Camera IMX219 Dual**, puis appuyez sur Entrée.

Si, après le redémarrage, l'aperçu de la caméra affiche une erreur ou un écran noir, choisissez ici Camera IMX219-C.

![Image 4](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/4.png)

Sélectionnez **Save pin changes**, puis appuyez sur Entrée.

![Image 5](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/5.png)

Utilisez la flèche bas pour sélectionner **Save and reboot to reconfigure pins**, puis appuyez sur Entrée.

![Image 6](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/6.png)

Lorsque l'interface suivante apparaît, appuyez directement sur la touche Entrée, la carte mère redémarre.

![Image 7](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/7.jpg)

## 2、Afficher les périphériques vidéo

```Plain Text
ls /dev/video*
```

L'image montre le résultat de la connexion de deux caméras CSI : en général, une caméra CSI affiche un périphérique `video`.

![Image 8](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/8.png)

## 3、Afficher l'image de la caméra en aperçu

Saisissez la commande suivante dans le terminal ; le système ouvre automatiquement une fenêtre avec l'image de la caméra : par défaut, le périphérique `/dev/video0` est ouvert.

```Plain Text
nvgstcapture-1.0
```

![Image 9](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/9.png)

### 3.1、Spécifier la caméra

Si plusieurs caméras sont présentes, vous pouvez spécifier l'ID de la caméra :

```Plain Text
nvgstcapture-1.0 --sensor-id=1
```

![Image 10](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/10.png)

### 3.2、Spécifier la résolution d'aperçu

Si une seule caméra CSI est présente, vous pouvez remplacer `--sensor-id=1` par `--sensor-id=0` :

```Plain Text
nvgstcapture-1.0 --sensor-id=1 --cus-prev-res=1280x720
```

![Image 11](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/11.png)



