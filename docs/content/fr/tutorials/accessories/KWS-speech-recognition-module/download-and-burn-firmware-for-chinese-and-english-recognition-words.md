---
title: "Flashage du firmware chinois/anglais"
description: "Le module est livré avec le firmware de reconnaissance vocale d'usine, également fourni en pièces jointes. Si vous devez recréer le firmware, suivez les étapes ci-dessous."
---

# Flashage du firmware chinois/anglais

> **[Acheter en boutique](https://www.juxitech.com/fr/products/ai-voice-recognition-module)**


> Le module est livré avec le firmware de reconnaissance vocale d'usine, également fourni en pièces jointes. Si vous devez recréer le firmware, suivez les étapes ci-dessous.
>

## Accéder à la [plateforme IA vocale Chipintelli](https://aiplatform.chipintelli.com/home/index.html)

#### Enregistrer un compte sur le site officiel Chipintelli

#### Cliquer sur « 平台功能 » dans le menu supérieur, choisir « 产品固件及SDK深度开发 »

![Cliquer sur « 平台功能 » dans le menu supérieur, choisir « 产品固件及SDK深度开发 » – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/1.png)

---

#### Cliquer sur « 离线语音识别大模型应用 »

![Cliquer sur « 平台功能 » dans le menu supérieur, choisir « 产品固件及SDK深度开发 » – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/10.png)

---

#### Cliquer sur « 语音识别固件及SDK开发 »

![Cliquer sur « 语音识别固件及SDK开发 » – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/11.png)

---

#### Créer un nouveau projet

![Cliquer sur « 语音识别固件及SDK开发 » – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/12.png)

---

#### Remplir les informations produit

1. **Nom du produit :** selon vos propres règles de nommage

2. **Schéma d'application :** choisir « 单麦语音识别 » (reconnaissance vocale mono-micro)

3. **Type de produit :** « 通用-&gt;智能中控 » (général – contrôleur intelligent)

4. **Modèle de puce :** Cl1302

5. **Nom du SDK :** Cl13XX_SDK_ASR_Offline

6. **Version du SDK :** 1.12.16

7. **Description :** selon vos propres règles

![Remplir les informations produit – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/13.png)

---

#### Choisir les informations du firmware

> Vous pouvez choisir ici le chinois ou l'anglais
>

1. **Nom de version :** selon vos propres règles

2. **Type de langue :** selon votre besoin

3. **Choisir le type acoustique :**

    1. **Chinois :** VO0681_中文_ASR_通用_0.9M

    2. **Anglais :** VO0916_英文_ASR_通用_1.1M

4. **Choisir la carte module :** CI-D02GS02S

![Remplir les informations produit – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/14.png)

---

#### Configuration du firmware

![Configuration du firmware – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/2.png)

---

#### Télécharger le firmware des mots de réveil

1. Téléverser – choisir le tableau des mots de réveil de la langue correspondante

2. Cliquer sur « 立即提交 » (soumettre immédiatement)

3. Attendre quelques minutes puis télécharger le firmware

4. Deux fichiers 命令詞播報詞協議列表 (liste des protocoles d'annonce) sont fournis ; modifiez-les selon ce tableau si besoin

    [命令詞播報詞協議列表V3_中文模板.xlsx]

    [命令詞播報詞協議列表V3_英文模板.xlsx]

![Configuration du firmware – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/3.png)

![Configuration du firmware – 3](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/4.png)

---

## Flasher le firmware du module vocal

#### Télécharger l'archive du logiciel de flashage

[Logiciel de flashage du firmware du module vocal.7z]

1. Extraire puis ouvrir le logiciel

> Choisir « CI1302 » comme firmware, cliquer sur « 固件升级 » (mise à jour du firmware)
>

![Télécharger l'archive du logiciel de flashage – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/5.png)

2. Brancher la carte son au PC, ouvrir le gestionnaire de périphériques

![Télécharger l'archive du logiciel de flashage – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/6.png)

![Télécharger l'archive du logiciel de flashage – 3](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/7.png)

3. Passer à la page du logiciel de flashage

> Position du bouton de la carte son
>
> ![Télécharger l'archive du logiciel de flashage – 4](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/8.png)
>

![Télécharger l'archive du logiciel de flashage – 5](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/9.png)

#### Après le flashage, passer aux autres tutoriels de gauche

#### Des fichiers de firmware prêts à flasher sont fournis ici

[CI1302_中文_单麦_V00681_UART0_115200_2M.bin]

[CI1302_英文_单麦_V00916_UART0_115200_2M.bin]




## Remarques

1. Installer le pilote CH341 (en tant qu'administrateur)

https://www.wch.cn/downloads/CH341SER_EXE.html

Si un périphérique inconnu usb single serial ou usb serial apparaît dans le gestionnaire de périphériques, désinstallez-le d'abord (clic droit), puis installez le pilote !
