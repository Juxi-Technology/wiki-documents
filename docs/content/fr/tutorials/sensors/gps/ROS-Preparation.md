---
title: "ROS : préparation"
description: "Préparer l'environnement ROS2 du module GPS BeiDou : compiler les paquets avec colcon et lier le port série du GPS avec une règle udev."
---

# ROS : préparation

#### 1. Remarques sur la compilation du module GPS

(1) Après avoir créé l'espace de travail, copiez le contenu du dossier gps_src dans le dossier src de l'espace de travail, puis compilez avec colcon build ; si aucune erreur n'apparaît, la compilation est réussie ;

Exécutez dans le répertoire ~/gps_ros2

```
colcon build
```

Exécutez dans le répertoire ~/gps_ros2 

```
source install/setup.bash
```

(2) Description du contenu des paquets fonctionnels :

- nmea_navsat_driver : fonctions telles que le démarrage du module GPS, la lecture des données du module GPS, le tracé des données GPS ;
- nmea_msgs : contient quelques fichiers msg de messages GPS
- imu_gps_localization : fonction de fusion des données IMU et GPS
- gps_goal : convertit les données de latitude et de longitude en données de navigation cible Nav2

#### 2. Lier le port GPS

Le module GPS se connecte à l'ordinateur ou à l'unité de commande principale via un port série ; nous devons donc lier correctement le port du GPS, afin qu'un problème de numéro de port n'empêche pas l'ordinateur ou l'unité de commande principale de reconnaître le module GPS.

(1) Consultez les périphériques USB connectés et trouvez le module GPS ; saisissez **lsusb** dans le terminal pour rechercher l'ID du périphérique auquel le GPS est connecté. Comme le montre l'illustration ci-dessous, il s'agit de l'ID d'identification du module GPS,

![Image 1](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/1.png)

(2) Maintenant que vous connaissez l'ID du périphérique, il s'agit ensuite d'écrire le fichier rules pour lier le port ; saisissez dans le terminal,

```
sudo gedit /etc/udev/rules.d/my_serial.rules 
```

Copiez le contenu suivant à l'intérieur,

```
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="myserial"
```

Enregistrez puis quittez, et donnez-lui les droits d'exécution ; saisissez dans le terminal,

```
sudo chmod 777 /etc/udev/rules.d/my_serial.rules 
```

(3) Rebranchez le module GPS ; saisissez dans le terminal ll /dev/myserial pour vérifier si la liaison a réussi. Si l'affichage suivant apparaît, la liaison a réussi,

```
ll /dev/myserial
```

![Image 2](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/2.png)

<RelatedProducts slugs="gps-beidou-module" />
