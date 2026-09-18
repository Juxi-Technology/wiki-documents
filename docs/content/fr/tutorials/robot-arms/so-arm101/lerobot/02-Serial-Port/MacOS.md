---
title: "Étape 2 : Vérification du port série (macOS)"
description: "Repérez sur Mac les ports des deux bras, accordez les permissions, et comprenez pourquoi la carte apparaît sous deux pilotes série différents."
---

# Étape 2 : Vérification du port série (macOS)

## Voir les ports

```Shell
ls /dev/tty.*
```

Le résultat ressemble à l'image ci-dessous ; l'un ou l'autre des deux ports convient

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-MacOS/1.png)

## Accorder les permissions au port

Permettre à tous les utilisateurs de lire et d'écrire ces périphériques série

```Shell
chmod 666 /dev/tty.*
```

## Noter mes ports

Bras esclave :

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

Bras maître :

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## Pourquoi y a-t-il deux ports sur Mac ?

La carte de commande des servomoteurs que nous utilisons est **reconnue simultanément comme deux types différents de pilotes de port série** dans le système Mac, c'est pourquoi deux ports s'affichent :

- L'un est le pilote de port série générique par défaut du système (`/dev/tty.usbmodemxxxx`)

- L'autre est le pilote de port série dédié fourni par le fabricant de la puce (par exemple ici « wch » correspond aux puces CH340/CH341 de Nanjing WCH) (`/dev/tty.wchusbserialxxxx`)

C'est un phénomène normal, **les deux ports correspondent en réalité au même périphérique matériel** ; choisir l'un ou l'autre permet de se connecter et de communiquer (par exemple, sélectionner l'un des deux ports dans le logiciel de commande du bras robotisé).

Si une opération ultérieure échoue sur un port, essayez de passer à l'autre port.

<RelatedProducts slugs="so-arm101" />
