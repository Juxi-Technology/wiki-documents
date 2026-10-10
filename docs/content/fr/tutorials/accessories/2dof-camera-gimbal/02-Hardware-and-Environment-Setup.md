---
title: Matériel et préparation de l'environnement
---

# Matériel et préparation de l'environnement

> **[Acheter en boutique](https://www.juxitech.com/fr/products/2-dof-servo-pan-tilt-unit)**

Ce chapitre détaille le processus complet d'assemblage du matériel, de connexion et de configuration de l'environnement.

---

## Liste du matériel

Avant d'utiliser le produit, vérifiez que vous disposez de tous les composants suivants :

|Composant|Modèle/Spécifications|Quantité|
|---|---|---|
|Servo|SCS009|2|
|Support de cardan|Structure de cardan 2-DOF|1|
|Carte de commande de servos|Carte de commande à puce CH343|1|
|Caméra USB|Résolution minimale 640x480|1|
|Alimentation des servos|Plage de tension 4 à 7,4 V, 6 V recommandé|1|
|Câble de données série|Relie la carte de commande à l'ordinateur|1|


---

## Description des paramètres des servos


|Paramètre|Servo n° 1 (rotation gauche/droite)|Servo n° 2 (inclinaison haut/bas)|
|---|---|---|
|Plage de position|220-802|220-511|
|Position centrale|511|511|
|Minimum|220 correspond à la position la plus à gauche|220 correspond à la position la plus haute|
|Maximum|802 correspond à la position la plus à droite|511 correspond à la position centrale|


---

## Connexion du matériel

### Étape 1 : Installer les servos et le support du cardan

1. Installez le servo n° 1 (rotation gauche/droite) à l'emplacement prévu sur le support inférieur du cardan, puis serrez les vis pour le fixer solidement
2. Installez le servo n° 2 (inclinaison haut/bas) sur le support supérieur du cardan, et fixez-le de la même manière
3. Installez le support de fixation de la caméra conformément aux instructions

### Étape 2 : Connecter les servos à la carte de commande

1. Connectez les câbles de données des deux servos aux ports servo de la carte de commande
2. Respectez l'ordre de connexion des fils : les couleurs sont généralement rouge (alimentation), noir (masse), blanc/jaune (signal)
3. Assurez-vous que chaque servo est connecté à l'ID correspondant : ID servo 1 pour gauche/droite, ID servo 2 pour haut/bas

### Étape 3 : Connexion de l'alimentation et du port série

1. Connectez l'alimentation des servos au connecteur d'alimentation de la carte de commande
2. Reliez la carte de commande au port USB de l'ordinateur à l'aide du câble de données série
3. Connectez la caméra à l'ordinateur

---

## Configuration système et environnement

### Systèmes d'exploitation pris en charge

- Windows 10/11
- Distributions Linux (par ex. Ubuntu 20.04 ou version ultérieure)

### Version de Python

Python 3.8 ou version ultérieure

---

## Installation des pilotes et des dépendances

### Installer le pilote du port série

#### Windows

1. Rendez-vous sur le site officiel du fabricant de la puce CH343 pour télécharger le programme d'installation du pilote correspondant à votre version de Windows
Installation du pilote CH343 (en tant qu'administrateur)
https://www.wch.cn/downloads/CH343SER_EXE.html

>
> Si le Gestionnaire de périphériques l'identifie comme un périphérique inconnu « usb single serial » ou « usb serial », faites d'abord un clic droit pour le désinstaller, puis installez le pilote !

1. Lancez le programme d'installation et suivez les instructions pour installer le pilote
2. Connectez la carte de commande des servos à l'ordinateur : le port série doit apparaître dans le Gestionnaire de périphériques

#### Linux

La plupart des distributions Linux intègrent déjà le pilote de port série CH343 ; aucune installation supplémentaire n'est nécessaire. En cas de problème, vous pouvez essayer :
1. Vérifiez si le noyau a chargé le pilote : `lsmod | grep ch343`
2. S'il n'est pas chargé, essayez de rebrancher l'appareil ou de redémarrer

### Installer les dépendances Python

Exécutez la commande suivante à la racine du projet :

```python
pip install -r requirements.txt
```

Les principales dépendances du projet sont :
- opencv-python : acquisition et traitement d'images
- numpy : bibliothèque de calcul numérique
- pyserial : bibliothèque de communication série

---

## Vérifier la connexion du matériel

Avant de lancer le programme principal, nous pouvons vérifier la connexion du matériel à l'aide des outils fournis.

### Rechercher les caméras disponibles

Exécutez la commande suivante pour lister les caméras disponibles :

```python
python examples/list_cameras.py
```

Le programme détecte et liste toutes les caméras disponibles ; notez l'indice de la caméra que vous devez utiliser.

### Rechercher les ports série disponibles

Exécutez la commande suivante pour lister les ports série disponibles :

```python
python examples/list_ports.py
```

Notez le nom du périphérique de port série que vous utilisez.

### Diagnostic du matériel

Pour effectuer une vérification complète du matériel, vous pouvez exécuter l'outil de diagnostic :

```python
python examples/diagnostic.py --camera 0 --port COM3
```

Le programme de diagnostic teste successivement la caméra, le port série et le cardan.

---

## Consignes de sécurité

Pendant l'utilisation, respectez les consignes de sécurité suivantes :
1. L'alimentation des servos doit rester dans la plage spécifiée (4 à 7,4 V) pour éviter de les endommager
2. Évitez de faire fonctionner les servos longtemps en position extrême afin de prolonger leur durée de vie
3. Il est conseillé de recentrer le cardan avant de couper l'alimentation, afin d'alléger la charge au prochain démarrage
