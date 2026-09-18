---
title: Guide de montage du bras robotique Lerobot
description: "Montage du bras SO-ARM101 sous LeRobot : réglage des ID des servos sous Windows ou Linux, assemblage des bras leader et follower, adaptateurs 5V6A et 12V5A."
---

# Guide de montage du bras robotique Lerobot

Remarque : si vous disposez d'un bras robotisé déjà assemblé, vous pouvez ignorer ce tutoriel

## Pièces imprimées en 3D du bras esclave

![IMG_20251229_141748.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

## Pièces imprimées en 3D du bras maître

![IMG_20251229_141533.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.jpg)

Le bras maître et le bras esclave sont très similaires ; seule l'extrémité diffère

Le bras maître possède une poignée et une gâchette, tandis que le bras esclave possède une pince

## Retirer les supports résiduels des pièces imprimées en 3D

Vérifiez chaque orifice, trou, rainure et maillage, en particulier les cinq trous ressemblant au « cinq de cercle » du mahjong

Cette étape est très importante, sinon vous ne pourrez pas visser les vis par la suite

## Distinguer les quatre types de servomoteurs

|Grand modèle|Petit modèle|Tension (V)|Rapport de réduction|Articulation du bras|Quantité|
|---|---|---|---|---|---|
|STS-3215|C001|7.4|1:345|Bras maître 2|1|
||C044|7.4|1:191|Bras maître 1, 3|2|
||C046|7.4|1:147|Bras maître 4, 5, 6|3|
||C047|12|1:345|Toutes les articulations du bras esclave|6|

> Le rapport de réduction est le rapport « vitesse du moteur : vitesse de l'arbre de sortie du servomoteur » ; par exemple, 1:345 signifie que pour 345 tours du moteur, l'arbre de sortie du servomoteur n'effectue qu'un seul tour.
> 
> Un rapport de réduction élevé amplifie le couple via le train d'engrenages, ce qui permet d'entraîner des charges plus lourdes (comme le bras esclave)
> 
> Mais en contrepartie, la vitesse de rotation de l'arbre de sortie est plus lente (car elle est « réduite »)
> 
> Si vous déplacez les articulations à la main, l'effort sera plus important
> 
> 

Ci-dessous figurent les modèles et les rapports de réduction de tous les servomoteurs de ce projet ; le soulignement indique leur numéro

![12月30日(7).png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/3.jpg)

![IMG_20260108_145707.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/4.jpg)

## Distinguer les deux adaptateurs secteur de tension différente

Adaptateur secteur 5V 6A 30W : alimente les servomoteurs de 7.4V (bras maître), noir

Adaptateur secteur 12V 5A 60W : alimente les servomoteurs de 12V (bras esclave), blanc

## Télécharger l'outil de débogage des servomoteurs Feetech

### Ordinateur Windows

https://gitee.com/ftservo/fddebug

Téléchargez [`FD1.9.8.5(250729).7z`](https://gitee.com/ftservo/fddebug/blob/master/FD1.9.8.5(250729).7z), décompressez-le et exécutez le programme .exe qu'il contient

### Ordinateur Ubuntu et ordinateur Mac (l'archive contient le tutoriel)

[Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip)

![Lerobot 101机械臂.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/5.jpg)

**Version Pro : le bras maître utilise un adaptateur secteur 5V6A et le bras esclave un adaptateur secteur 12V5A**

La configuration des ID et la calibration des angles des servomoteurs ainsi que l'assemblage doivent être réalisés au préalable ; vous pouvez consulter le [tutoriel d'assemblage officiel](https://huggingface.co/docs/lerobot/so101)

## Étape 1 : configurer les ID des servomoteurs et installer les palonniers (sauf le servomoteur n° 5)

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/6.png)

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

1. Ouvrez l'outil de débogage pour PC Feetech, sélectionnez le numéro de port COM, réglez le débit en bauds sur un million, puis cliquez sur « Ouvrir »

2. Cliquez sur « Rechercher » ; lorsque « STS3215 » apparaît, cliquez sur « Arrêter », puis cliquez sur « STS3215 »

3. Sélectionnez « Débogage » en haut ; vous pouvez faire glisser le curseur pour faire tourner le servomoteur, ou cliquer sur « Balayage » pour le faire aller et venir. Vérifiez que le servomoteur fonctionne correctement

4. Sélectionnez « Programmation » en haut

5. Cliquez sur « Calibration du point milieu » pour définir la position actuelle de l'axe de rotation du servomoteur comme point milieu (0-4095)

6. Cliquez sur « ID », définissez le numéro d'ID du servomoteur correspondant en bas à droite, puis cliquez sur « Enregistrer ». Notez que le numéro est composé uniquement de chiffres arabes, sans lettre.

7. Débranchez le câble reliant le servomoteur à la carte de commande

8. Branchez le câble du servomoteur sur le servomoteur

Le servomoteur n° 1 se raccorde avec deux câbles ; pour les autres servomoteurs, ne branchez d'abord qu'un seul câble

![截图_20260115151626.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

Rappel : assurez-vous que l'ID d'articulation et le rapport d'engrenage des servomoteurs correspondent strictement à ceux du **SO-ARM101**.

Chaque moteur sur le bus possède un ID unique. Les moteurs neufs ont généralement un ID par défaut de `1`. Pour garantir une communication correcte entre les moteurs et le contrôleur, nous devons d'abord attribuer un ID unique à chaque moteur. De plus, la vitesse de transmission des données sur le bus est déterminée par le débit en bauds. Pour pouvoir communiquer entre eux, le contrôleur et tous les moteurs doivent être configurés avec le même débit en bauds ; le débit en bauds des servomoteurs de ce bras robotisé est de 100000.

Pour cela, nous devons d'abord connecter le contrôleur à chaque moteur séparément afin d'effectuer les réglages. Comme ces paramètres sont écrits dans une zone non volatile de la mémoire interne (EEPROM) du moteur, une seule opération suffit.

Si vous réutilisez les moteurs d'un autre robot, vous devrez peut-être aussi effectuer cette étape, car les ID et le débit en bauds peuvent ne pas correspondre.

La vidéo ci-dessous montre l'ordre des étapes de configuration de l'ID des moteurs.

### Système Windows

[Logiciel PC Feetech pour servomoteurs.zip](/downloads/飞特舵机上位机.zip)

Utilisez le logiciel PC Feetech pour servomoteurs afin de configurer l'ID des servomoteurs et de calibrer le point milieu ; la configuration des ID se fait de 1 à 6 !

**Configuration des ID des servomoteurs du bras robotisé - Système Windows.mp4**（机械臂舵机设置ID-Windows系统.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

### Système Linux/Ubuntu et ordinateur Mac

Si vous avez besoin du logiciel PC Feetech pour servomoteurs, reportez-vous à l'[outil de débogage des servomoteurs Feetech](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g#share-Jvk1dRRl8oY0Skxrt2VczA9jnNb) ci-dessus

Veuillez d'abord déployer l'environnement en suivant la page [Installation officielle de l'environnement LeRobot](https://huggingface.co/docs/lerobot/installation)

Veillez à activer l'environnement virtuel et à vous placer dans le répertoire src/lerobot correspondant

conda activate lerobot

cd lerobot/src/lerobot

1、Rechercher le port USB correspondant au bras robotisé Pour trouver le bon port de chaque bras robotisé, exécutez le script utilitaire deux fois : :

```Plain Text
lerobot-find-port
```

Exemple de sortie lors de l'identification du port du bras maître (par exemple, `/dev/tty.usbmodem575E0031751` sur Mac, ou éventuellement `/dev/ttyACM0` sous Linux) :

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

Exemple de sortie lors de l'identification du port du bras esclave (par exemple, `/dev/tty.usbmodem575E0032081`, ou éventuellement `/dev/ttyACM1` sous Linux) :

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

N'oubliez pas de débrancher le connecteur USB, sinon l'interface ne pourra pas être détectée.

2、Reliez l'ordinateur à la carte de commande des servomoteurs du bras esclave à l'aide d'un câble USB, puis mettez sous tension. Exécutez ensuite la commande suivante. Remplacez --robot.port=/dev/ttyACM0 dans la commande par le numéro de port trouvé. Si le port trouvé est /dev/ttyACM1, remplacez par --robot.port=/dev/ttyACM1

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

Vous verrez la sortie suivante.

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

Conformément aux instructions, connectez le servomoteur de la pince. Assurez-vous qu'il est le seul servomoteur connecté à la carte de commande des servomoteurs et qu'il n'est encore relié à aucun autre servomoteur. Après avoir appuyé sur la touche **[Enter]**, le script configurera automatiquement l'ID et le débit en bauds de ce servomoteur ; la configuration des ID se fait de 6 à 1 !

Vous devriez ensuite voir le message suivant :

```Python
'gripper' motor id set to 6
```

Puis la sortie suivante est :

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**Remarque **Conformément aux instructions, répétez l'opération ci-dessus pour chaque servomoteur.

Comme pour les servomoteurs précédents, assurez-vous qu'il est le seul servomoteur connecté à la carte de commande et qu'il n'est lui-même relié à aucun autre servomoteur.

Avant chaque appui sur la touche **Enter**, vérifiez impérativement vos connexions de câbles. Par exemple, le câble d'alimentation peut se débrancher lorsque vous manipulez la carte de circuit imprimé.

Une fois toutes les étapes terminées, le script se termine automatiquement et les servomoteurs sont prêts à l'emploi. Vous pouvez maintenant connecter les interfaces à 3 broches de chaque servomoteur l'une après l'autre, et relier le câble du premier servomoteur (le servomoteur « shoulder pan » d'ID 1) à la carte de commande. Vous pouvez à présent installer la carte de commande sur la base du bras robotisé.

Répétez les mêmes étapes pour le bras maître.

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

**Configuration des ID des servomoteurs du bras robotisé - Système Linux.mp4**（机械臂舵机设置ID-Linux系统.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

## Étape 2 : assemblage

- Les étapes d'assemblage du bras esclave sont globalement identiques à celles du bras maître. La seule différence réside, après l'étape 12, dans la manière d'installer l'effecteur terminal (pince et poignée).

**Tutoriel d'assemblage du bras robotisé SO-ARM101.mp4**（SO-ARM101机械臂组装教程.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

Installation de la carte de commande des servomoteurs : installez d'abord les 4 entretoises en laiton, puis fixez la carte de commande avec quatre vis M2.5*8

![1768467962506.webp](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.webp)

![1768467970234.webp](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/10.webp)

![截图_20260115170850.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/11.png)

**Version Pro : le bras maître noir utilise un adaptateur secteur 5V6A et le bras esclave blanc un adaptateur secteur 12V5A**

## Configurer l'ID des servomoteurs et la calibration du point milieu via le navigateur

https://bambot.org/feetech.js?lang=zh

1、Saisissez 0 ou 1 selon le modèle de servomoteur, puis cliquez sur « Connecter »

![截图_20260413125622.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/12.png)

2、Scannez les servomoteurs d'ID 1~6 ; vous pouvez confirmer le servomoteur d'un ID donné grâce à la mention FOUND dans le résultat du scan. Par exemple, sur l'image, le servomoteur d'ID 1 a été détecté

![截图_20260413125712.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/13.png)

3、Configuration de l'ID et calibration du point milieu

①Saisissez comme ID de servomoteur actuel l'ID du servomoteur détecté

②Dans « Gestion des ID », saisissez un nombre puis cliquez sur « Modifier l'ID » pour définir l'ID

③Calibration du point milieu (le point milieu du servomoteur STS3215 est 2047, celui du servomoteur SCS0009 est 511)

Servomoteur STS : dans « Contrôle de position », saisissez 2047 puis cliquez sur « Set »

Servomoteur SCS : dans « Contrôle de position », saisissez 511 puis cliquez sur « Set »

![截图_20260413125748.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/14.png)
