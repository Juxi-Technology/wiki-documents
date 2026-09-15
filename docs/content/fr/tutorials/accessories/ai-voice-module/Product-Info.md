---
title: "Informations produit"
description: "CI1302 est une nouvelle génération de puce vocale intelligente à réseau de neurones haute performance dévelop…"
---

# Informations produit

## 1. Présentation du module d'interaction vocale

CI1302 est une nouvelle génération de puce vocale intelligente à réseau de neurones haute performance développée par Chipintelli, intégrant le processeur de réseau neuronal cérébral BNPU V3 développé en propre par Chipintelli et un cœur CPU. Sa fréquence système peut atteindre 220MHz, elle intègre une SRAM allant jusqu'à 640KByte, une unité de gestion d'alimentation PMU et un oscillateur RC, ainsi qu'un codec audio double canal haute performance à faible consommation et de multiples interfaces de contrôle périphériques telles que UART, IIC, IIS, PWM, GPIO, PDM, etc. Avec seulement quelques composants périphériques tels que des résistances et des condensateurs, la puce permet de réaliser des solutions matérielles pour toutes sortes de produits vocaux intelligents, avec un rapport coût-performance extrêmement élevé.

Elle adopte la technologie BNPU matérielle de 3e génération et prend en charge des réseaux neuronaux tels que DNN\\TDNN\\RNN\\CNN ainsi que les opérations vectorielles parallèles, ce qui permet des fonctions telles que la reconnaissance vocale, la reconnaissance d'empreinte vocale, l'auto-apprentissage de mots de commande, la détection vocale et la réduction de bruit par apprentissage profond. Cette solution de puce prend également en charge de nombreuses langues mondiales comme le chinois, l'anglais et le japonais, et peut être largement appliquée dans des domaines tels que l'électroménager, l'éclairage, les jouets, les objets portables connectés, l'industrie et l'automobile, afin de réaliser l'interaction et le contrôle vocaux ainsi que diverses applications de solutions vocales intelligentes.

La puce CI1302 dispose d'un cœur de processeur de réseau neuronal cérébral (BNPU), prend en charge le calcul accéléré de NN hors ligne et l'accélération matérielle du traitement du signal vocal, etc. Sa fréquence CPU peut atteindre 220MHz, elle est capable de reconnaissance vocale hors ligne en champ lointain, intègre un stockage FLASH de 2MB et peut prendre en charge 300 mots de commande.

## 2. Caractéristiques du produit

- Plus de 110+ commandes vocales préchargées, prise en charge de mots de commande personnalisés en chinois et en anglais.

Vous pouvez modifier les mots de commande via la page web que nous fournissons, générer un nouveau fichier de micrologiciel, puis écrire le micrologiciel dans le module à l'aide du logiciel PC ; le module pourra alors reconnaître les nouvelles commandes. Avec un espace de stockage interne de 2M, il est possible d'écrire jusqu'à environ 120 mots de commande.

- Haut-parleur haute fidélité et microphone haute performance intégrés.

Il intègre des algorithmes avancés et une technologie de réduction de bruit au niveau des circuits, ce qui permet de filtrer efficacement le bruit ambiant et d'atteindre un taux de reconnaissance allant jusqu'à 99% dans un rayon de 5 mètres, rendant ainsi possibles une conversation naturelle et l'annulation d'écho. Il offre une sortie audio claire et restitue fidèlement les détails de la voix.

- Coprocesseur embarqué et interfaces IIC/port série/Type-C.

Il intègre une puce STC8H, qui peut convertir automatiquement les données vocales au format de données du port série ou de l'IIC, ce qui simplifie le processus de communication avec les dispositifs contrôleurs hôtes externes. Divers câbles de connexion sont fournis gratuitement, ce qui vous permet de le connecter à des cartes de développement MCU et à des dispositifs contrôleurs hôtes embarqués afin de communiquer et de créer vos propres projets DIY.

- Des tutoriels d'utilisation basés sur diverses cartes de développement sont fournis

Des informations sur les cartes de développement sont fournies, telles que STM32, ESP32, MSPM0, Raspberry Pi, la série de cartes de développement Jetson, RDK, etc. Des fichiers SDK pour les systèmes ROS1 et ROS2 sont également fournis.

## 3. Principe de fonctionnement

Ce module adopte un réveil en mode mot-clé : vous devez prononcer le mot de réveil configuré pour activer d'abord le module d'interaction vocale ; une fois activé, la reconnaissance vocale peut être effectuée. Le mot-clé de réveil par défaut du micrologiciel d'usine est “你好，小犀” ; si aucune parole n'est reconnue au bout de 15 secondes, le module entre en mode veille et doit être réactivé lors de la prochaine utilisation.

Lorsque la puce CI1302 reconnaît l'entrée vocale correspondante, elle l'envoie via le port série ou l'interface IIC et fournit une diffusion en retour ; la puce IIC stocke l'instruction vocale reçue et l'envoie via le protocole esclave IIC.

Le module prend en charge la modification du mot de réveil, la modification des mots de commande et les entrées personnalisées ; vous pouvez apprendre comment procéder dans les tutoriels « [Modifier le mot de réveil et les mots de commande](https://juxitech.feishu.cn/wiki/Po6bw8OtLiDNonklg7ZcBbGknyc) » et « [Création d'entrées de protocole personnalisées](https://juxitech.feishu.cn/wiki/CIHLwo8qNiVBtKkhuTtcZIeNnAb) ».

## 4. Précautions

1、Alimentez avec une tension de 5v ; dépasser 5v endommagera le module

2、Le lieu d'utilisation doit être calme ; un environnement bruyant affectera les performances de reconnaissance

3、Lorsque vous prononcez une entrée, la voix doit être forte et le débit ne doit pas être trop rapide ; il est recommandé de rester à moins de 5 mètres du module

## 5. Description de l'interface matérielle

![Image 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Product-Info/1.png)





