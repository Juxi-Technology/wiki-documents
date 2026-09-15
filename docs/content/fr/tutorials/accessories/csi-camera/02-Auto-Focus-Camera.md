---
title: "02、Utilisation de la caméra autofocus"
description: "L'image montre le résultat de la connexion de deux caméras CSI et d'une caméra USB : en général, une caméra C…"
---

# 02、Utilisation de la caméra autofocus

## 1、Afficher les périphériques vidéo

```Plain Text
ls /dev/video*
```

L'image montre le résultat de la connexion de deux caméras CSI et d'une caméra USB : en général, une caméra CSI affiche un périphérique `video` et une caméra USB affiche deux périphériques `video`. Pour la caméra USB, sélectionnez le `/dev/video2` nouvellement ajouté et dont le numéro est plus petit (lors du branchement de la caméra USB, le système ajoute les numéros de périphérique `/dev/video2` et `/dev/video3`).

![Image 1](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/1.png)

## 2、GUVCView

GUVCView est un logiciel libre et open source destiné aux systèmes Linux, utilisé pour capturer et enregistrer des vidéos et des images, principalement pour les caméras Webcam.

### 2.1、Installer GUVCView

```Plain Text
sudo apt update
sudo apt install guvcview -y
```

![Image 2](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/2.png)

### 2.2、Utiliser GUVCView

Ouvrez la barre de menus des applications et cliquez sur l'icône `guvcview`, ou saisissez la commande de démarrage dans le terminal : sélectionnez la caméra USB, la caméra CSI n'affiche aucun aperçu.

```Plain Text
guvcview
```

![Image 3](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/3.png)

![Image 4](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/4.png)

## 3、VLC

VLC media player est un lecteur multimédia libre et open source qui prend en charge de nombreux formats audio et vidéo ainsi que les DVD, CD audio, VCD et divers protocoles de streaming.

### 3.1、Installer VLC

```Plain Text
sudo apt update
sudo apt install vlc -y
```

![Image 5](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/5.png)

### 3.2、Utiliser VLC

Ouvrez la barre de menus des applications et cliquez sur l'icône `VLC media player`, ou saisissez la commande de démarrage dans le terminal : sélectionnez la caméra USB, la caméra CSI n'affiche aucun aperçu.

```Plain Text
vlc
```

![Image 6](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/6.png)

![Image 7](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/7.png)

Sélectionnez le numéro de périphérique correspondant à la caméra USB :

![Image 8](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/8.png)

![Image 9](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/9.png)



