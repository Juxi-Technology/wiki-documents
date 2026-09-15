---
title: "Protocole du port série"
description: "Ouvrez le fichier 命令词播报词协议列表V1中文 dans les pièces jointes ; vous pouvez voir le protocole d'envoi et le protoc…"
---

# Protocole du port série

Ouvrez le fichier 命令词播报词协议列表V1_中文 dans les pièces jointes ; vous pouvez voir le protocole d'envoi et le protocole de réception,

## 1. Analyse des entrées fonctionnelles

D'après le fichier, vous pouvez voir les protocoles d'envoi et de réception de 10 entrées fonctionnelles,

![Image 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/1.png)

Nous pouvons distinguer les entrées fonctionnelles en analysant le troisième octet du protocole

![Image 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/2.png)

Parmi eux, les premier et deuxième octets (EF EF) représentent l'en-tête de trame, le troisième octet représente l'ID du mot de fonction, le quatrième octet représente l'ID du mot de commande, et le cinquième octet (EE) représente la fin de trame

## 2. Entrées de mots de commande

Un exemple d'entrée de mot de commande est présenté ci-dessous ; le quatrième octet du mot de commande représente l'ID

![Image 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/3.png)

Exemple :

Par exemple, si nous disons 小车停止 au module, le module envoie les cinq octets FE EF 00 01 EE via le port série. Nous pouvons obtenir ce groupe de données via la fonction de service du port série du contrôleur hôte, puis analyser le quatrième octet pour obtenir ID:01 ; nous savons alors qu'il s'agit de 小车停止.

## 3. Entrées de phrases de diffusion

Les entrées de phrases de diffusion ne sont pas diffusées activement ; le contrôleur hôte doit envoyer une commande via le port série pour qu'elles soient diffusées (les phrases de diffusion des entrées de mots de commande peuvent également être diffusées).

![Image 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/4.png)

Parmi eux, les premier et deuxième octets (FE EF) représentent l'en-tête de trame, le troisième octet représente la fonction de diffusion FF, le quatrième octet représente l'ID du contenu à diffuser, et le cinquième octet (EE) représente la fin de trame

Exemple :

Lorsque nous devons diffuser “初始化完成”, le contrôleur hôte doit envoyer FE EF FF 67 EE au module d'interaction vocale via le port série ; une fois l'envoi terminé, le module d'interaction vocale peut diffuser “初始化完成”

![Image 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/5.png)

