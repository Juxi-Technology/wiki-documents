---
title: "Démarrage rapide"
description: "Le micrologiciel de reconnaissance vocale est déjà flashé en usine ; vous pouvez donc l'essayer rapidement sa…"
---

# Démarrage rapide

Le micrologiciel de reconnaissance vocale est déjà flashé en usine ; vous pouvez donc l'essayer rapidement sans avoir à le flasher. Si vous devez ajouter d'autres entrées de reconnaissance, ou si vous devez reflasher un autre micrologiciel ou personnaliser des entrées, consultez le tutoriel « 3. Création d'entrées de protocole personnalisées » pour savoir comment personnaliser des entrées.

## 1. Préparation avant utilisation

1. Un câble de données type-c  

2. Module d'interaction vocale

## 2. Connexion de l'appareil

![Image 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Quick-Start/1.png)

## 3. Mise en œuvre de la reconnaissance vocale et de la diffusion

Après avoir alimenté le module d'interaction vocale via type-c, vous pouvez réveiller le module grâce au mot de réveil “你好，小犀”. Un module réveillé avec succès répond “我在”, ce qui indique qu'il se trouve actuellement dans un état de reconnaissance vocale. Si aucune entrée de commande n'est reconnue dans les 15 secondes, le module entre en mode veille et diffuse simultanément “我去休息了”. Si vous souhaitez réveiller à nouveau le module, dites simplement le mot de réveil.

Le micrologiciel d'usine est livré avec des mots de commande et des mots de diffusion ; vous pouvez consulter la liste de protocole dans les pièces jointes fournies. La figure ci-dessous présente un extrait du contenu de la liste de protocole des mots de commande et des mots de diffusion ; vous pouvez déterminer quelle fonction représente le mot de commande correspondant grâce à son type de fonction. Les mots de diffusion à diffuser sont des mots de diffusion passive : ils ne peuvent être déclenchés qu'en envoyant la commande correspondante au module d'interaction vocale depuis un port série d'ordinateur ou un autre microcontrôleur ou dispositif contrôleur hôte ; voir la figure ci-dessous pour plus de détails.

Mots de fonction :

Mots de commande :

Mots de diffusion :

Il existe deux modes de diffusion : l'un est actif, l'autre est la diffusion passive.

Diffusion active : après que nous avons prononcé un mot de commande conformément au tableau, le module diffuse activement la phrase correspondante. Après le réveil, lorsque nous disons “小车前进”, le module diffuse activement “好的，正在前进” après l'avoir reconnu. 

Diffusion passive : la phrase correspondante n'est diffusée par le module qu'après l'envoi de la commande du tableau de protocole au module vocal via le port série. Vous pouvez également, conformément au protocole IIC, écrire les données de diffusion correspondantes dans le registre de diffusion passive. Pour plus de détails, consultez « Communication multi-contrôleurs ».

<RelatedProducts slugs="ai-voice-module" />
