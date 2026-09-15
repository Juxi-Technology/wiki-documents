---
title: "Protocole IIC"
description: "Remarque : l'alimentation du dispositif hôte et celle du module d'interaction vocale peuvent être différentes…"
---

# Protocole IIC

Remarque : l'alimentation du dispositif hôte et celle du module d'interaction vocale peuvent être différentes, mais elles doivent être mises à la masse commune lors de la connexion afin de fournir un niveau de communication stable

## 1. Le module d'interaction vocale en tant qu'esclave

Réception et analyse du signal envoyé par l'hôte :

Attendez une interruption du signal IIC ; si des données sont reçues sur l'IIC, appelez la fonction correspondante en fonction des informations d'adresse de registre reçues par IIC.

Traitement des données et retour :

Lorsque le module d'interaction vocale reçoit une commande de lecture de registre, il doit appeler la fonction d'envoi correspondante pour envoyer les données reconnues au dispositif hôte.

## 2. Adresse du dispositif IIC et fonctions des registres

L'adresse du dispositif esclave IIC du module d'interaction vocale est 0x2A.

## 3. Obtenir les entrées de mots de commande.

Ouvrez le fichier 命令词播报词协议列表V1_中文 dans les pièces jointes ; vous pouvez voir que le protocole de communication commence par 0xFE, 0xED et se termine par 0xEE, avec 2 octets au milieu qui sont respectivement le type de fonction et le numéro d'ID.

![Image 1](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/1.png)

Lorsque le module d'interaction vocale reconnaît le mot de commande “停车”, il répond “好的，已停止”. Le contrôleur hôte peut lire un octet de données, 0x02, dans le registre de résultat de reconnaissance (0xDA) ; cette donnée est identique au 4e octet du protocole d'envoi de “停车”.

![Image 2](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/2.png)

## 4. Entrées de phrases de diffusion

Les entrées de phrases de diffusion ne sont pas diffusées activement ; le contrôleur hôte doit les définir via l'IIC pour qu'elles soient diffusées (les phrases de diffusion des entrées de mots de commande peuvent également être diffusées).

Le contrôleur hôte écrit un octet — le numéro d'ID du mot de commande — à l'adresse du registre de diffusion (0xD1) via l'IIC, et le module de diffusion vocale diffuse la phrase correspondante ; 0xFF est la phrase de diffusion ordinaire.

![Image 3](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/3.png)

Par exemple :

Lorsque l'utilisateur doit diffuser “这是红色”, le contrôleur hôte doit écrire “0x5F” dans le registre de diffusion (0xD1) via l'IIC, et le module d'interaction vocale diffuse alors “这是红色”.

![Image 4](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/4.png)

## 5. Entrées de mots de fonction à diffuser

Les entrées de mots de fonction peuvent être diffusées lorsqu'un mot de commande est reconnu, ou diffusées en écrivant un octet spécifique via l'IIC.

Le contrôleur hôte écrit un octet — le numéro d'ID du mot de commande — à l'adresse du registre de diffusion (0xD2) via l'IIC, et le module de diffusion vocale diffuse la phrase correspondante ; 0xFF est la phrase de diffusion ordinaire.

![Image 5](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/5.png)

Par exemple :

Lorsque l'utilisateur doit diffuser “这是红色”, le contrôleur hôte doit écrire “0x01” dans le registre de diffusion (0xD2) via l'IIC, et le module d'interaction vocale diffuse alors “欢迎使用小犀”.

![Image 6](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/6.png)

## 5. Entrées de mots de commande à diffuser

Les entrées de mots de commande peuvent être diffusées lorsqu'un mot de commande est reconnu, ou diffusées en écrivant un octet spécifique via l'IIC.

Le contrôleur hôte écrit un octet — le numéro d'ID du mot de commande — à l'adresse du registre de diffusion (0xD3) via l'IIC, et le module de diffusion vocale diffuse la phrase correspondante ; 0xFF est la phrase de diffusion ordinaire.

![Image 7](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/7.png)

Par exemple :

Lorsque l'utilisateur doit diffuser “好的，正在前进”, le contrôleur hôte doit écrire “0x04” dans le registre de diffusion (0xD3) via l'IIC, et le module d'interaction vocale diffuse alors “好的，正在前进”.

![Image 8](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/8.png)

<RelatedProducts slugs="ai-voice-module" />
