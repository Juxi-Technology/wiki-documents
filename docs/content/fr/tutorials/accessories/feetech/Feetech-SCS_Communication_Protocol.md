---
title: "Protocole de communication SCS"
description: "Le niveau de communication utilise le TTL compatible haute vitesse et le RS485 à forte immunité aux interférences ; la communication reste asynchrone duplex, l'émission et la réception sont traitées en asynchrone."
---

# Protocole de communication SCS

> **[Acheter en boutique](https://www.juxitech.com/fr/products/feetech-scs0009-serial-bus-servo)**


## 1 Aperçu du protocole de communication

  Le niveau de communication utilise le TTL compatible haute vitesse et le RS485 à forte immunité aux interférences ; la communication reste asynchrone duplex, l'émission et la réception sont traitées en asynchrone.

  Le contrôleur et le servo communiquent en mode question-réponse : le contrôleur envoie une trame de commande, le servo renvoie une trame de réponse.

  Un réseau de contrôle à bus peut contenir plusieurs servos ; chaque servo possède donc un numéro d'ID unique dans le réseau. La commande envoyée par le contrôleur contient l'information d'ID ; seul le servo dont l'ID correspond peut recevoir complètement cette commande et renvoyer une réponse.

La communication est de type série asynchrone : une trame comprend 1 bit de départ, 8 bits de données et 1 bit d'arrêt, sans bit de parité, soit 10 bits.

  Lorsque certains paramètres de la table mémoire utilisent deux octets, leur ordre dépend du modèle de servo : les servos à potentiomètre utilisent le format big-endian (octet haut d'abord, octet bas ensuite), les servos à encodeur magnétique le format little-endian (octet bas d'abord, octet haut ensuite). Chaque servo ayant des fonctions légèrement différentes, référez-vous à la table mémoire du modèle concerné pour le contrôle réel.

## 2 Trame de commande

- En-tête : deux 0xFF reçus consécutivement signalent l'arrivée d'un paquet de données.
Numéro d'ID : chaque servo possède un ID. Plage 0 à 253, soit 0x00 à 0xFD en hexadécimal.

- ID de diffusion : l'ID 254 est l'ID de diffusion. Si le contrôleur envoie l'ID 254 (0xFE), tous les servos reçoivent la commande ; sauf pour PING, aucune réponse n'est renvoyée (avec plusieurs servos sur le bus, la commande PING en diffusion ne doit pas être utilisée).

- Longueur de données : égale au nombre de paramètres N à envoyer plus 2, soit « N+2 ».

- Commande : code de fonction du paquet de données, voir 1.3 Types de commandes.

- Paramètres : informations de contrôle complémentaires à la commande ; un paramètre peut représenter une valeur mémoire sur deux octets au maximum. Ordre des octets : voir la table de contrôle mémoire du manuel du servo (l'ordre varie selon les modèles).

- Somme de contrôle : calcul du Check Sum :
Check Sum = ~ (ID + Length + Instruction + Parameter1 + … Parameter N) Si le total entre parenthèses dépasse 255, ne prendre que l'octet le plus bas. « ~ » représente l'inversion binaire.

## 3 Trame de réponse

La trame de réponse contient l'état actuel ERROR du servo. Si l'état de fonctionnement n'est pas normal, cela se reflète dans cet octet (signification des états : voir la table de contrôle mémoire du manuel). Si ERROR vaut 0, le servo n'a aucune erreur.

## 4 Types de commandes

### 4.1 Commande d'interrogation d'état PING

- Fonction : lire l'état de fonctionnement du servo

- Longueur : 0x02

- Commande : 0x01

- Paramètres : aucun

- Avec l'adresse de diffusion, PING renvoie également une réponse.

Exemple 1 : lire l'état du servo d'ID 1.

Trame de commande : FF FF 01 02 01 FB (envoi en hexadécimal)

```Plain Text
En-tête : FF FF
ID : 01
Longueur : 02
Commande : 01
Somme de contrôle : FB
```

Trame de réponse :  FF FF 01 02 00 FC (affichage hexadécimal)

```Plain Text
En-tête : FF FF
ID : 01
Longueur : 02
État : 00
Somme de contrôle : FC
```

### 4.2 Commande de lecture READ DATA

- Fonction : lire des données dans la table de contrôle mémoire du servo

- Longueur : 0x04

- Commande : 0x02

- Paramètre 1 : adresse de début du segment de lecture

- Paramètre 2 : longueur des données à lire

Exemple 2 : lire la position actuelle du servo d'ID 1 (octet bas d'abord, octet haut ensuite). L'adresse du paramètre de position est 0X38, sur deux octets consécutifs.

Trame de commande : FF FF 01 04 02 38 02 BE (envoi en hexadécimal)

```Plain Text
En-tête : FF FF
ID : 01
Longueur : 04
Commande : 02
Paramètres : 38 02 (adresse position actuelle, longueur de lecture)
Somme de contrôle : BE
```

Trame de réponse : FF FF 01 04 00 18 05 DD (affichage hexadécimal)

```Plain Text
En-tête : FF FF
ID : 01
Longueur : 04
État : 00
Paramètres : 18 05
Somme de contrôle : DD
```

Les deux octets lus (structure little-endian) : octet bas L 0x18, octet haut H 0x05. Les deux octets forment la valeur 16 bits 0X0518, soit en décimal une position actuelle de 1304.

### 4.3 Commande d'écriture WRITE DATA

- Fonction : écrire des données dans la table de contrôle mémoire du servo

- Longueur : N+2 (N = longueur des paramètres)

- Commande : 0x03

- Paramètre 1 : adresse de début du segment d'écriture

- Paramètre 2 : première donnée à écrire

- Paramètre 3 : deuxième donnée à écrire
…

- Paramètre N : n-ième donnée à écrire, N=n+1

Exemple 3 : avec l'ID de diffusion (0xFE), définir l'ID d'un servo quelconque à 1. Dans la table mémoire, l'adresse de sauvegarde de l'ID est 5.

Trame de commande : FF FF FE 04 03 05 01 F4 (envoi en hexadécimal)

```Plain Text
En-tête : FF FF
ID : 01
Longueur : 04
Commande : 03
Paramètres : 05 01 (adresse ID, nouvelle valeur d'ID)
Somme de contrôle : F4
```

Comme l'envoi utilise l'ID de diffusion, aucune donnée n'est renvoyée. De plus, l'EPROM de la table mémoire possède un verrou de protection : il faut le désactiver (0) avant de modifier l'ID, sinon le nouvel ID ne sera pas conservé hors tension. Voir la table mémoire ou le manuel du modèle de servo concerné.

Exemple 4 : faire tourner le servo ID1 à 1000 pas par seconde jusqu'à la position 2048. L'adresse de début de la position cible est 0x2A ; écrire donc six octets consécutifs à partir de 0x2A.

- Donnée de position 0x0800 (2048)

- Donnée réservée 0x0000 (0)

- Donnée de vitesse 0x03E8 (1000)

Trame de commande : FF FF 01 09 03 2A 00 08 00 00 E8 03 D5 (envoi en hexadécimal)

```Plain Text
En-tête : FF FF
ID : 01
Longueur : 09
Commande : 03
Paramètres :
2A (adresse de début)
00 08 (position)
00 00 (réservé)
E8 03 (vitesse)
Somme de contrôle : D5
```

Trame de réponse : FF FF 01 02 00 FC (affichage hexadécimal)

```Plain Text
En-tête : FF FF
ID : 01
Longueur : 02
État : 00
Somme de contrôle : FC
```

L'état de fonctionnement renvoyé est 0 : le servo a reçu la commande sans erreur et a commencé à l'exécuter. L'ID du paquet envoyé n'étant pas l'ID de diffusion (0xFE), le servo renvoie un paquet d'état après réception.

### 4.4 Commande d'écriture asynchrone REG WRITE

REG WRITE est semblable à WRITE DATA, mais le moment d'exécution diffère. À la réception d'une trame REG WRITE, les données sont stockées dans un buffer et le registre d'écriture asynchrone est mis à 1. À la réception de la commande ACTION, la commande stockée est finalement exécutée.

- Longueur : N+2 (N = longueur des paramètres)

- Commande : 0x04

- Paramètre 1 : adresse de début de la zone d'écriture

- Paramètre 2 : première donnée à écrire

- Paramètre 3 : deuxième donnée à écrire

- Paramètre N : n-ième donnée à écrire, N=n+1

Exemple 5 : faire tourner les servos ID1 à ID10 à 1000 pas/s jusqu'à la position 2048.

```Plain Text
ID 1 : trame d'écriture asynchrone : FF FF 01 09 04 2A 00 08 00 00 E8 03 D4
ID 1 : trame de réponse : FF FF 01 02 00 FC
ID 2 : trame d'écriture asynchrone : FF FF 02 09 04 2A 00 08 00 00 E8 03 D3
ID 2 : trame de réponse : FF FF 02 02 00 FB
ID 3 : trame d'écriture asynchrone : FF FF 03 09 04 2A 00 08 00 00 E8 03 D2
ID 3 : trame de réponse : FF FF 03 02 00 FA
ID 4 : trame d'écriture asynchrone : FF FF 04 09 04 2A 00 08 00 00 E8 03 D1
ID 4 : trame de réponse : FF FF 04 02 00 F9
ID 5 : trame d'écriture asynchrone : FF FF 05 09 04 2A 00 08 00 00 E8 03 D0
ID 5 : trame de réponse : FF FF 05 02 00 F8
ID 6 : trame d'écriture asynchrone : FF FF 06 09 04 2A 00 08 00 00 E8 03 CF
ID 6 : trame de réponse : FF FF 06 02 00 F7
ID 7 : trame d'écriture asynchrone : FF FF 07 09 04 2A 00 08 00 00 E8 03 CE
ID 7 : trame de réponse : FF FF 07 02 00 F6
ID 8 : trame d'écriture asynchrone : FF FF 08 09 04 2A 00 08 00 00 E8 03 CD
ID 8 : trame de réponse : FF FF 08 02 00 F5
ID 9 : trame d'écriture asynchrone : FF FF 09 09 04 2A 00 08 00 00 E8 03 CC
ID 9 : trame de réponse : FF FF 09 02 00 F4
ID10 : trame d'écriture asynchrone : FF FF 0A 09 04 2A 00 08 00 00 E8 03 CB
ID10 : trame de réponse : FF FF 0A 02 00 F3
```

### 4.5 Exécuter la commande d'écriture asynchrone ACTION

- Fonction : déclencher la commande REG WRITE

- Longueur : 0x02

- Commande : 0x05

- Paramètres : aucun

1. ACTION est très utile pour contrôler plusieurs servos en même temps.

2. Avec plusieurs servos, ACTION permet au premier et au dernier servo d'exécuter simultanément leurs actions, sans délai intermédiaire.

3. L'envoi d'ACTION à plusieurs servos utilise l'ID de diffusion (0xFE) : aucune trame de données n'est renvoyée.

Exemple 6 : après l'envoi de l'écriture asynchrone pour les servos ID1 à ID10 (1000 pas/s vers la position 2048), il faut exécuter la commande d'écriture asynchrone.

```Plain Text
Trame de commande : FF FF FE 02 05 FA
Trame de réponse : aucune
```

### 4.6 Commande d'écriture synchrone SYNC WRITE

- Fonction : contrôler simultanément plusieurs servos.

- ID : 0xFE

- Longueur : (L+1)*n+4 (L : longueur des données envoyées à chaque servo, n : nombre de servos)

- Commande : 0x83

- Paramètre 1 : adresse de début des données à écrire

- Paramètre 2 : longueur des données à écrire (L)

- Paramètre 3 : ID du premier servo

- Paramètre 4 : première donnée du premier servo

- Paramètre 5 : deuxième donnée du premier servo
…

- Paramètre L+3 : L-ième donnée du premier servo

- Paramètre L+4 : ID du deuxième servo

- Paramètre L+5 : première donnée du deuxième servo

- Paramètre L+6 : deuxième donnée du deuxième servo
…

- Paramètre 2L+4 : L-ième donnée du deuxième servo
…

Contrairement à REG WRITE+ACTION, le temps réel est meilleur : une seule commande SYNC WRITE peut modifier les tables de contrôle de plusieurs servos, tandis que REG WRITE+ACTION procède par étapes. Cependant, avec SYNC WRITE, la longueur des données écrites et l'adresse de début doivent être identiques.

Exemple 7 : écrire pour 4 servos (ID1-ID4) à l'adresse de début 0x2A : position 0x0800, temps 0X0000 et vitesse 0x03E8 (octet bas d'abord, octet haut ensuite).

Trame de commande : FF FF FE 20 83 2A 06 01 00 08 00 00 E8 03 02 00 08 00 00 E8 03 03 00 08 00 00 E8 03 04 00 08 00 00 E8 03 58 (envoi en hexadécimal)

```Plain Text
En-tête : FF FF
ID : FE
Longueur de données effective : 20
Commande : 83
Paramètres :
2A 06 (adresse de début, longueur de données)
01 00 08 00 00 E8 03 (commande servo ID1)
02 00 08 00 00 E8 03 (commande servo ID2)
03 00 08 00 00 E8 03 (commande servo ID3)
04 00 08 00 00 E8 03 (commande servo ID4)
Somme de contrôle : 58
```

### 4.7 Commande de lecture synchrone SYNC READ

- Fonction : interroger simultanément plusieurs servos.

- ID : 0xFE

- Longueur : n+4 (n = nombre de servos)

- Commande : 0x82

- Paramètre 1 : adresse de début des données à lire

- Paramètre 2 : longueur des données à lire

- Paramètre 3 : ID du premier servo

- Paramètre 4 : ID du deuxième servo
…

- Paramètre N : ID du n-ième servo, N=n+2

Une commande SYNC READ interroge en une fois les tables de contrôle de plusieurs servos ; les ID à interroger sont spécifiés dans la commande, et les servos répondent dans l'ordre des ID du paquet. Avec SYNC READ, la longueur et l'adresse de début de toutes les données interrogées doivent être identiques (commande disponible sur certains servos à bus série seulement).

Exemple 8 : interroger pour 2 servos (ID1-ID2) la position, la vitesse, la charge, la tension et la température actuelles (adresse de début 0x38, 8 mots de données au total, octet bas d'abord, octet haut ensuite).

Trame de commande : FF FF FE 06 82 38 08 01 02 36

```Plain Text
En-tête : FF FF
ID : FE
Longueur : 06
Commande : 82
Paramètres :
38 08 (adresse de début des données, longueur de données)
01 02 (ID01, ID02)
Somme de contrôle : 36
```

Trame de réponse :

```Plain Text
Servo ID01 : FF FF 01 0A 00 00 08 00 00 00 00 79 1E 55
Servo ID02 : FF FF 02 0A 00 FF 07 00 00 00 00 77 23 53
```

La trame de réponse peut être décodée selon la commande de lecture

### 4.8 Commande de réinitialisation d'état RESET

- Fonction : réinitialiser l'état du servo (réinitialiser les tours du servo)

- Longueur : 0x02

- Commande : 0x0A

- Paramètres : aucun

Exemple 9 : réinitialiser le servo, ID 01.

```Plain Text
Trame de commande : FF FF 01 02 0A F2 (envoi en hexadécimal)
Trame de réponse : FF FF 01 02 00 FC (affichage hexadécimal)
```

### 4.9 Commande de calibrage de position

- Fonction : recalibrer la position actuelle à une valeur définie

- Longueur : 0x02 ou 0x04

- Commande : 0x0B

- Paramètres : aucun ou valeur définie

Remarque : sans paramètre, la position actuelle est calibrée à la position médiane. La commande de calibrage n'est supportée que par certains modèles – voir le tableau ci-dessous.

Exemple 10 : recalibrer la position actuelle à la position médiane.

```Plain Text
Trame de commande : FF FF 01 02 0B F1 (envoi en hexadécimal)
Trame de réponse : FF FF 01 02 00 FC (affichage hexadécimal)
```

Exemple 11 : recalibrer la position actuelle à 1024.

Trame de commande : FF FF 01 04 0B 00 04 EB (envoi en hexadécimal)

```Plain Text
En-tête : FF FF
ID : 01
Longueur : 04
Commande : 0B
Valeur définie : 00 04 (1024)
Somme de contrôle : EB
```

Trame de réponse : FF FF 01 02 00 FC (affichage hexadécimal)

```Plain Text
En-tête : FF FF
ID : 01
Longueur : 02
État : 00
Somme de contrôle : FC
```

### 4.10 Commande de restauration des paramètres

- Fonction : restaurer les paramètres du servo sauf l'ID

- Longueur : 0x02

- Commande : 0x06

- Paramètres : aucun

Exemple 11 : restaurer les paramètres du servo.

```Plain Text
Trame de commande : FF FF 01 02 06 F6 (envoi en hexadécimal)
Trame de réponse : FF FF 01 02 00 FC (affichage hexadécimal)
```

Remarque : déverrouiller les paramètres EPROM avant de restaurer les paramètres du servo

### 4.11 Commande de sauvegarde des paramètres

- Fonction : sauvegarde des paramètres (pour la restauration)

- Longueur : 0x02

- Commande : 0x09

- Paramètres : aucun

Exemple 12 : sauvegarder les paramètres du servo.

```Plain Text
Trame de commande : FF FF 01 02 09 F3 (envoi en hexadécimal)
Trame de réponse : FF FF 01 02 00 FC (affichage hexadécimal)
```

Remarque : déverrouiller les paramètres EPROM avant de sauvegarder les paramètres du servo

### 4.12 Commande de redémarrage

- Fonction : redémarrer le servo

- Longueur : 0x02

- Commande : 0x08

- Paramètres : aucun

Exemple 13 : redémarrer le servo.

```Plain Text
Trame de commande : FF FF 01 02 08 F4 (envoi en hexadécimal)
Trame de réponse : aucune (redémarrage d'environ 800 ms)
```

Remarque : désactiver l'interrupteur de couple avant de redémarrer le servo
