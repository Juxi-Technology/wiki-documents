---
title: Module d'interaction vocale IA
category: accessory
description: Module d'interaction vocale IA de Juxi Technology (CI1302) — 110+ commandes vocales hors ligne, 99% de reconnaissance à 5 m, mots de commande personnalisés en chinois et en anglais, communication série/IIC, compatible Arduino/Jetson/RDK/Raspberry Pi/PC
keywords: [ia vocale, module d'interaction vocale, ci1302, reconnaissance vocale hors ligne, mot de réveil, mots de commande, port série, iic, ros1, ros2]
---

# Module d'interaction vocale IA

> **[Acheter sur Taobao](https://item.taobao.com/item.htm?id=1055967142978)**

## Présentation

Le module d'interaction vocale IA repose sur la puce vocale intelligente à réseau de neurones haute performance **CI1302** de Chipintelli, intégrant le processeur cérébral à réseau de neurones BNPU V3, et prend en charge la reconnaissance vocale hors ligne en champ lointain ; un **coprocesseur STC8H** embarqué convertit automatiquement les résultats de la reconnaissance vocale en données de port série ou IIC, ce qui simplifie la communication avec les dispositifs contrôleurs hôtes externes. Toute la reconnaissance s'effectue localement sur le module, sans connexion réseau.

**Caractéristiques clés** :

- Reconnaissance vocale 100% hors ligne, sans internet (confidentialité + faible latence)
- **110+ commandes vocales** préchargées en usine ; mots de commande personnalisés en chinois et en anglais pris en charge (jusqu'à environ 120 entrées)
- Mot de réveil “你好，小犀” ; mise en veille automatique après 15 secondes sans commande, un simple réveil suffit pour le réutiliser
- Haut-parleur haute fidélité et microphone haute performance intégrés, réduction de bruit et annulation d'écho ; taux de reconnaissance jusqu'à 99% dans un rayon de 5 m
- Coprocesseur STC8H embarqué : les résultats de reconnaissance sont émis en données de port série / IIC
- Deux modes de diffusion : active et passive
- SDK ROS1 / ROS2 fournis, ainsi que des tutoriels de communication Arduino / Jetson / RDK / Raspberry Pi / PC

---

## Spécifications

| Catégorie | Spécification |
|------|------|
| Puce vocale | CI1302 de Chipintelli (processeur neuronal BNPU V3, fréquence jusqu'à 220MHz) |
| Mémoire | 640KB SRAM + 2MB Flash |
| Commandes vocales | 110+ préchargées ; mots de commande personnalisés en chinois et en anglais, jusqu'à environ 120 entrées |
| Réveil | Mot de réveil “你好，小犀” (modifiable) |
| Distance de reconnaissance | Jusqu'à 5 m (environnement calme, taux de reconnaissance jusqu'à 99%) |
| Audio | Haut-parleur haute fidélité + microphone haute performance intégrés (réduction de bruit + annulation d'écho) |
| Interfaces | Port série / IIC / Type-C (coprocesseur STC8H embarqué) |
| Alimentation | 5V (Type-C) |
| Plateformes prises en charge | Arduino, Jetson, RDK, Raspberry Pi, PC (STM32 / ESP32 / MSPM0 et autres MCU) |
| Logiciel | SDK ROS1 / ROS2, outil de flashage du micrologiciel, outil web pour entrées personnalisées |

---

## Démarrage rapide

Le micrologiciel de reconnaissance vocale est déjà flashé en usine ; vous pouvez donc l'essayer immédiatement, sans avoir à le flasher :

1. Alimentez le module avec un câble de données Type-C (5V)
2. Prononcez le mot de réveil “你好，小犀” : dès que le module répond “我在”, vous pouvez donner une commande (par ex. « faire avancer le chariot »)
3. Si aucune entrée de commande n'est reconnue dans les 15 secondes, le module diffuse “我去休息了” et entre en veille ; pour le réutiliser, prononcez à nouveau le mot de réveil

Pour ajouter d'autres entrées de reconnaissance, modifiez les mots de commande via l'outil web pour générer un nouveau micrologiciel, puis écrivez-le dans le module à l'aide du logiciel PC ; voir [Flashage du micrologiciel du module](/fr/tutorials/accessories/ai-voice-module/Firmware-Flashing) et [Création d'entrées de protocole personnalisées](/fr/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries).

---

## Tutoriels complets

- [Démarrage rapide — déballage, réveil et diffusion](/fr/tutorials/accessories/ai-voice-module/Quick-Start)
- [Informations produit — caractéristiques, principe de fonctionnement, précautions et interfaces matérielles](/fr/tutorials/accessories/ai-voice-module/Product-Info)
- [Flashage du micrologiciel du module](/fr/tutorials/accessories/ai-voice-module/Firmware-Flashing)
- [Modifier le mot de réveil et les mots de commande](/fr/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit)
- [Création d'entrées de protocole personnalisées](/fr/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)
- [Interaction vocale ROS1](/fr/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction) / [Interaction vocale ROS2](/fr/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction)
- [Protocole du port série](/fr/tutorials/accessories/ai-voice-module/Serial-Protocol) / [Protocole IIC](/fr/tutorials/accessories/ai-voice-module/IIC-Protocol)
- [Communication PC](/fr/tutorials/accessories/ai-voice-module/PC-Communication)
- Arduino : [Communication par port série](/fr/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication) / [Communication IIC](/fr/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication)
- Jetson : [Communication par port série](/fr/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication) / [Communication IIC](/fr/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication)
- RDK : [Communication par port série](/fr/tutorials/accessories/ai-voice-module/RDK-Serial-Communication) / [Communication IIC](/fr/tutorials/accessories/ai-voice-module/RDK-IIC-Communication)
- Raspberry Pi : [Communication par port série](/fr/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication) / [Communication IIC](/fr/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication)

---

## Cas d'usage

- Interaction vocale et contrôle par commandes pour robots (par ex. « faire avancer le chariot », « arrêter »)
- Contrôle vocal de la domotique (éclairage, appareils électroménagers)
- Produits vocaux éducatifs et jouets
- Contrôle vocal d'équipements industriels
- Divers projets DIY d'interaction vocale

---

## FAQ

**Q : Faut-il une connexion internet ?**
Non. Le CI1302 est une puce vocale hors ligne ; la reconnaissance s'effectue localement sur le module et ne nécessite aucune connexion réseau.

**Q : Fonctionne-t-il dès la sortie d'usine ?**
Oui. Le micrologiciel de reconnaissance vocale est déjà flashé en usine : il suffit de l'alimenter en Type-C et de prononcer le mot de réveil pour l'essayer. Un nouveau flashage n'est nécessaire que pour ajouter des entrées personnalisées.

**Q : Les commandes en anglais sont-elles prises en charge ?**
Oui. Les mots de commande sont personnalisables en chinois et en anglais : modifiez-les via l'outil web pour générer le micrologiciel, puis flashez-le sur le module.

**Q : Comment communique-t-il avec un contrôleur hôte ?**
Le coprocesseur STC8H embarqué convertit automatiquement les résultats de reconnaissance vocale en données de port série ou IIC ; des tutoriels de communication Arduino, Jetson, RDK, Raspberry Pi et PC sont fournis, ainsi que les SDK ROS1 / ROS2.

**Q : Quelle est la distance de reconnaissance ?**
En environnement calme, le taux de reconnaissance peut atteindre 99% dans un rayon de 5 m ; un environnement bruyant affecte les performances de reconnaissance.

---

## Précautions

- Alimentez le module avec une tension de 5V ; dépasser 5V l'endommagerait
- Le lieu d'utilisation doit être aussi calme que possible ; un environnement bruyant affecte les performances de reconnaissance
- Lorsque vous prononcez une entrée, la voix doit être forte et le débit ne doit pas être trop rapide ; il est recommandé de rester à moins de 5 m du module

---

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
- 💬 [Retour](https://github.com/Juxi-Technology/wiki-documents/issues)
