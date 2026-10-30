---
title: "Module capteur de fréquence cardiaque et SpO2 MAX30102 – Tutoriel"
description: "Tutoriel complet du module capteur de fréquence cardiaque et SpO2 MAX30102 : informations produit, version Web, Arduino, Raspberry Pi et logiciel hôte PC."
---

# Module capteur de fréquence cardiaque et SpO2 MAX30102 – Tutoriel

Ce tutoriel présente l'utilisation du module capteur de fréquence cardiaque et SpO2 MAX30102 de Juxi Technology. Le module embarque la puce dédiée MAX30102 de Maxim pour la mesure de la fréquence cardiaque et du SpO2, intègre un algorithme de fréquence cardiaque et SpO2 développé en interne et fournit directement la fréquence cardiaque, la saturation en oxygène et la température de la carte ; il prend en charge les deux modes de communication I2C et UART.

## Contenu du tutoriel

| Contenu | Description |
|---|---|
| [Informations produit](./product-info.md) | Présentation du produit, principe de mesure, spécifications techniques, brochage et applications typiques |
| [Console Web – Guide d'utilisation](./web-console.md) | Connexion directe via Web Serial dans le navigateur, sans installer de logiciel |
| [Guide Arduino](./arduino.md) | Câblage, installation de la bibliothèque, exemple de code, API et questions fréquentes |
| [Guide Raspberry Pi](./raspberry-pi.md) | Câblage I2C / UART, configuration de l'environnement, exemple de code et API |
| [PC · Exécution Python](./pc/python.md) | Adaptateur USB-TTL + script Python pour lire les données |
| [Logiciel hôte PC](./pc/upper-computer.md) | Logiciel hôte graphique : paramètres du port série, acquisition et surveillance en temps réel |

## Démarrage rapide

1. Lisez d'abord les [Informations produit](./product-info.md) et vérifiez l'alimentation (3,3–5 V) ainsi que le brochage ;
2. Pour voir rapidement des données : utilisez la [Console Web – Guide d'utilisation](./web-console.md), il suffit d'ouvrir la page dans Chrome / Edge ;
3. Pour un microcontrôleur : voir le [Guide Arduino](./arduino.md) ;
4. Pour un Raspberry Pi : voir le [Guide Raspberry Pi](./raspberry-pi.md) ;
5. Pour un ordinateur : voir [PC · Exécution Python](./pc/python.md) ou le [Logiciel hôte PC](./pc/upper-computer.md).

> Ce produit est un module de mesure électronique grand public, et non un dispositif médical professionnel ; les données mesurées ne servent que de référence de santé quotidienne.

<RelatedProducts slugs="heart-rate-spo2" />
