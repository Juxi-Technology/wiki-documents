---
title: "Étape 2 : Vérification du port série (Ubuntu)"
description: "Repérez sous Ubuntu le numéro de port série de chaque bras, branchez d'abord le bras esclave, puis accordez les permissions pour la suite du cours."
---

# Étape 2 : Vérification du port série (Ubuntu)

## Méthode 1 : consultation directe en ligne de commande Linux

### Voir le port du périphérique série

```Shell
ls /dev/ttyACM*
```

### Connecter le port USB de l'ordinateur et du bras robotisé

Branchez d'abord le bras esclave Follower, puis branchez le bras maître Leader

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/1.png)

## Méthode 2 : outil officiel LeRobot

```Shell
lerobot-find-port
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/3.png)

## Noter mes ports

`/dev/ttyACM0` est le numéro de port du périphérique série du bras esclave Follower

`/dev/ttyACM1` est le numéro de port du périphérique série du bras maître Leader

## Accorder les permissions au port

Permettre à tous les utilisateurs de lire et d'écrire ces périphériques série

```Shell
sudo chmod 666 /dev/ttyACM*
```

<RelatedProducts slugs="so-arm101" />
