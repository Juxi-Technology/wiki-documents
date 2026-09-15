---
title: Tutoriel de débogage de la main robotique (servo TTL)
description: "Téléchargez d'abord l'archive « 灵巧手调试.zip » et extrayez-la ; utilisez ensuite le document « 使用arduio程序调试灵巧手过程（TTL舵机）» pour définir les IDs de servos, calibrer, aligner le centre et exécuter la démo, ou consultez le code open source officiel."
---

# Tutoriel de débogage de la main robotique (servo TTL)

> **[Acheter en boutique](https://www.juxitech.com/fr/products/amazinghand)**


Téléchargez d'abord l'archive « [灵巧手调试.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc) » et extrayez-la. Vous pouvez ensuite, via le document « 使用arduio程序调试灵巧手过程（TTL舵机）», définir les IDs de servos, calibrer, aligner la position centrale et exécuter le programme de démonstration, ou consulter le [code open source officiel](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample).

**Sans démontage du produit fini** (IDs de servos, calibrage et position centrale réglés en usine), vous pouvez passer directement au **[point 6 : exécuter « 02 演示程序 »](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188003&from=from_node_link)** et au point 7 **[suivi de la main](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188027&from=from_node_link)**.

![image – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTQ0NjE2ZmE3MmFlM2ZkMGQ5YmE2MmY3NTUyZDdjMWRfZjY1YjhhN2Q4ZjhhOWQ0NGE5ZWM4YWRjZDY3N2EwYjZfSUQ6NzYzODkzOTYxMTI1MDc4OTMzM18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 1. Câblage pour le débogage de la main

Une option : utiliser le PC avec un logiciel hôte Python (logiciel hôte Feetech ou code Python).
L'autre : utiliser un microcontrôleur comme MEGA328P ou une carte de développement/contrôleur achetée.

Câblage comme suit :
(1) Câblage pour le débogage Python (seule la carte driver de servos) :

![1. Câblage pour le débogage de la main – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTdmMjBiMGQzMTI2ODllOWMzYTU2N2ZkYWZlMzVkODdfNjNlZTQ2OTI4M2M3Mzg2NmZmZDNiYjI5Zjc3NDg0MjZfSUQ6NzYzODkzOTYxMTQ4OTg0ODI5MV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) Câblage pour le débogage MEGA328P (carte driver + carte 328P) :

![1. Câblage pour le débogage de la main – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjFjYzRiMGQ0ZGNjN2M0MmUyMTY1MjNiMjQ4MzQ4NmZfM2JmYWU5NmZjNDQyY2Y1MGZkNzExYTJiMDg1OGRlMjlfSUQ6NzYzODkzOTYwOTIwNDM5NDk2NV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

**Observez bien les positions des broches de la carte MEGA328P !**

![1. Câblage pour le débogage de la main – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzIxZTg3NzMxNzZiYTRhMWMzNmM5ODJhMzZhNTE2YzZfNDY1MTNkNTI3YTVmYzBkY2U2YjViZTQzZDU2YmI5NzBfSUQ6NzYzODkzOTYxMDQxMjE0MTUzNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Câblage pour le débogage de la main – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmYwNzM3ZjRiZjk3Njg1M2UyOGMwNzM0NmJhNjliMDNfNGE0NmRlYTI3MDY4ZDA1M2IwNTI3NTczZDE3NTBhNzhfSUQ6NzYzODkzOTYwOTU2NDkwODUwNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Câblage pour le débogage de la main – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTUwM2U2Nzc0MjVhNzczODJiMGUwNjA0YTdjZWM0YTVfYWU4ZTQzOWRjOTlkOWU4NjhlNWFlOGJiODViNzNjNDRfSUQ6NzYzODkzOTYwNzY5MDk3MjEwOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

Ci-dessous, le processus de débogage avec le microcontrôleur. Le microcontrôleur exécute le programme de démonstration en boucle ; il suffit de débrancher le câble de données pour l'arrêter.

## 2. Définir les IDs de servos

Une main utilise 8 servos : main droite ID 1-8, main gauche ID 11-18

Position centrale en usine : droite [451,571,451,571,451,571,451,571], gauche [571,451,571,451,571,451,571,451]

1. Câblage : connecter **individuellement** servo et carte driver, un par un.

![2. Définir les IDs de servos – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWM0NTY2YjdjZWU5ZmNiNmJhZWRhODg0NjgwZDJiZjlfNjMzNGZmNzY1NTg3YmM5ZTMyNGRlYzk4YzdiMmZhYmNfSUQ6NzYzODkzOTYwNzUzOTQzNjUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2. Utiliser le logiciel hôte FD1.9.8.2 du fabricant pour le réglage
FD.rar

![2. Définir les IDs de servos – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmI3MTMyZTFlMjRmM2U1OTY3M2JkN2ZlYWYwM2MyMzdfYjA0NzhmZDNjODMyYjNiNmYyZjBkN2Q2NzJkNDUxMmVfSUQ6NzYzODkzOTYwODM0OTAxOTA5MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![2. Définir les IDs de servos – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGJmNWE2MGEwZGU4ZGUxMWU4ZDA2YWIwYWFkMDk3YzJfMjcxOGRlZTE2Mjg3MDQ0OWExNjJmODU1OTBmYTBhZDRfSUQ6NzYzODkzOTYxMDcyNjY4MTU3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![2. Définir les IDs de servos – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmQyNGIyMTQwOTExYzM3YzJhNGY2ZWQwMGZkOGI5NjdfZWJiYTYwZDZjNDlmNzY1OGRjYjEwMmRhMGEzMWZkZDBfSUQ6NzYzODkzOTYwODAxMzQ0MTk4MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 3. **Fixer le palonnier du servo**

1. Téléverser le programme « 安装白色伺服喇叭时使用 » sur la carte de développement

Rôle du programme : placer l'engrenage du servo approximativement au centre ; les angles ultérieurs se basent sur cette position centrale.

(1) Installer le logiciel arduino selon votre système : [tutoriel d'installation](https://blog.csdn.net/weixin_35509395/article/details/156188274) ; avant de compiler, installer les bibliothèques FTServo et SCServo dans le gestionnaire de bibliothèques

![3. Fixer le palonnier du servo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjU0NGRjM2VhZDU4NGViMmU4YjBkNjQ3OGRmYzMxOGFfMzYxMzAxMDM1NmFhYjFjM2ZhMTlmODMwNDBiOWUwMzlfSUQ6NzYzODkzOTYwNzU1MjI4MTUzOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) Type de carte : choisir « Arduino Nano »

![3. Fixer le palonnier du servo – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjdiYmNjMzFjMjE3OTZkNjAzYjZkM2RhZDRiZDY5MDFfZTVjNTAyZGU5ZGFmYmJmYzgwNDI3YzMyOWNmMjljYzVfSUQ6NzYzODkzOTYxMTUyMzQ1MTg1NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2. Déboguer les servos 1, 2
(1) Modifier : selon l'ID du servo à déboguer (p. ex. index → ID 1, 2)

![3. Fixer le palonnier du servo – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2UyYzFjYmJiNjA3YTZkMjY4MWZkYjdhMzFhMDNkZDlfMjQ4NjdlY2M4ZjI2ZjcxNjJlNDc5YmQyNGNmNGZhYzVfSUQ6NzYzODkzOTYwNzYyMzQwNDUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) Téléverser le programme
(3) Câbler : carte + carte driver + **servos 1, 2** – on entend l'engrenage tourner d'un angle puis s'arrêter.

![3. Fixer le palonnier du servo – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2U4MTBhZWY4YmY0Y2MzOWU5MzhiODA0ZDZhODc4MzRfZGEzZjM4ODdkOWQ1MTJmZjNiYmQxNTMyMjQ2ZDQ0MDZfSUQ6NzYzODkzOTYwNzkzNTY4MzU1OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(4) Monter le palonnier sur l'engrenage, le plus parallèle possible

![3. Fixer le palonnier du servo – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTUyMDI0ODVjYjhhNDBjZDJkZmQ1YjNmMzA2NDc5ZTlfNTUxNmQ2MWQwOTdmYzdjOTM2YTNkZTkxYzYzYjI5YmVfSUQ6NzYzODkzOTYwODAxMzQ1ODM2NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

3. Déboguer les servos 3, 4
(1) **Débrancher le câblage entre la carte 328P et la carte driver (sinon pas de téléversement)**
(2) Modifier : ID 3, 4

![3. Fixer le palonnier du servo – 6](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2RlNzE0MzI1ZDYxY2I2YjE4Y2YyNWZkYjM0MTgyOGFfZTI2MWI2MmQ0NmJlNTgwOTEzZDAzN2U4OGRmOTkwNDFfSUQ6NzYzODkzOTYxMTI0NjY2MDU3OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(3) Téléverser le programme
(4) Câbler : carte + carte driver + **servos 3, 4**
(5) Monter le palonnier, le plus parallèle possible

4. Servos 5, 6 – même procédure
5. Servos 7, 8 – même procédure

## 4. **Ajuster finement les valeurs centrales**

1. Téléverser le programme « 01 微调MiddlePos值时使用 »

2. Doigts en position fermée, arrêter immédiatement le programme (débrancher le câble de données) et vérifier l'alignement des palonniers (voir figure). Si non alignés, régler MiddlePos_1 et MiddlePos_2 jusqu'à l'alignement. Noter ces valeurs (8 valeurs pour 8 servos) – utilisées dans le programme final.

![4. Ajuster finement les valeurs centrales – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmExMWZhZTY2NTUxMWE0OGJkMjg5OWJjM2QwNjcwMmJfNDE3MzY4ODI3OGRjNTU0YjlhMDA3ZDViMGNkZmUxNjZfSUQ6NzYzODkzOTYxMTE5MjAxOTkyMF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![4. Ajuster finement les valeurs centrales – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmY0ZTAyNTRkNGQ5OGQyMTAyZTkwNDk0Y2RmNDAzMjRfZGRjODE0NjQwODBlOTJkY2Q5NzUwN2M3OTZmYjEwZjlfSUQ6NzYzODkzOTYwODEwMzQ1NTY5NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 5. **Exécuter le programme de test**

1. Remplir les valeurs MiddlePos_1 et MiddlePos_2 dans le tableau suivant et télécharger le programme.

![5. Exécuter le programme de test – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzA4ZmVjODQzYzU3ZjIwMjU2NGQ1NjQ4YzFkZjFjZDdfMmU3ZDU0NGJiODU3OWI4ZDQzNDNiNzY0YjNkYzllYWZfSUQ6NzYzODkzOTYxMTI2MzQzNzc2Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 6. **Exécuter « 02 演示程序 »**

(1) Installez arduino selon votre système : [tutoriel d'installation](https://blog.csdn.net/weixin_35509395/article/details/156188274)
(2) Dans `灵巧手调试\00 TTL串口舵机\arduino程序（MEGA328P开发板）\02 演示程序`, ouvrir le fichier ino correspondant à la main gauche ou droite

![6. Exécuter « 02 演示程序 » – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGU3YzRlZWM2ZDRiNWZmYjNjMWQ3MmQzNGVkOTYxNTNfNzE3NWFjMGY4MGY4ZjJkYmJhMGY1NjhiMDAxNTFlMmVfSUQ6NzYzODkzOTYwODAxMzQ5MTEzMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(3) Avant de compiler, installer les bibliothèques FTServo et SCServo dans le gestionnaire de bibliothèques

![6. Exécuter « 02 演示程序 » – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzgwNjdhZWY4ZjAzNmIzNzMyYmIzMGZkYzE0OTNiMTBfNmU3ODBjZTA2ODMwMzc5MWJhMDJmNDkzMDU3MmY1MjlfSUQ6NzYzODkzOTYwNzk0NjU3ODg3Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(4) Type de carte : « Arduino Nano »

![6. Exécuter « 02 演示程序 » – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTc0YjYyYjRjMTY4NGI5NzIxN2RhNjA0MTQ5YzE3OTRfYjYzZGYyNjkwMzY5ZTM3MjIzZWIxNmI4MWUzMGMxNmZfSUQ6NzYzODkzOTYxMTUwMjQxNDgwMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(5) Compiler et téléverser

Attention : le PC est connecté uniquement à la carte de développement ; la carte n'est pas encore reliée à la carte driver (donc pas à la main).

Après téléversement réussi, relier la carte à la carte driver avec trois câbles jumper et les servos à la carte driver. Voir [le câblage du débogage MEGA328P](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link).

La main exécute **« 02 演示程序 »** en boucle.

Résultat :

![6. Exécuter « 02 演示程序 » – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTY0NzA2NGI2OTBjNzkwODE4ZGFhNGM2ZDFkNjhhMzFfZDMxNjlmZWZhNmMxYjQ0YTNhMjZhZWEzYWU0OGY2YzBfSUQ6NzYzODkzOTYwOTI1NDY0NDY3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## [7. Suivi de la main](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)
