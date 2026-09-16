---
title: "04-Version servomoteurs série - Notice d'utilisation"
description: "Version servomoteurs bus SCS0009 officiels — Notice d'utilisation"
---

# 04-Version servomoteurs série - Notice d'utilisation

Version servomoteurs bus SCS0009 officiels — Notice d'utilisation

> **Si vous avez acheté la version servomoteurs PWM (ESP32-S3 + 8 PWM), veuillez ignorer ce dossier**,
utilisez `..\01_gui_control` ou `..\02_hand_tracking`.

Ce dossier décrit la prise en charge des **servomoteurs bus SCS0009 de la version officielle d'origine** d'AmazingHand.

## État actuel

Le `..\02_hand_tracking\Demo` de ce delivery_package prend en charge simultanément les deux backends de servomoteurs, avec un basculement transparent possible par configuration :

|Version|Type de servomoteur|Débit en bauds|Fichier de configuration|
|---|---|---|---|
|**PWM** (livrable principal de ce pack)|ESP32-S3 commande directe PWM|115200|`{l,r}_hand_pwm.toml`|
|**SCS0009** (version officielle d'origine)|Servomoteurs bus officiels|1,000,000|`{l,r}_hand.toml`|

- **Version PWM** : dans le menu, sélectionnez `3 - PWM 舵机(ESP32 直驱)`, et utilisez le tutoriel de ce pack.

- **Version SCS0009** : dans le menu, sélectionnez `2 - 真实硬件(SCS0009 总线舵机)`.

## Méthode d'utilisation de la version SCS0009

1. Matériel : servomoteurs bus officiels + adaptateur série (débit en bauds 1M).

2. Déploiement : `Demo\Windows_Scripts_CN\3-部署代码.bat` (ou le script Linux correspondant).

3. Exécution : 4-运行代码.bat → sélectionnez `2 - 真实硬件(SCS0009 总线舵机)` → choisissez le type de main.

4. Pour les explications détaillées, voir `..\02_hand_tracking\Demo\双版本舵机并存说明.md`
ainsi que `Demo\Windows_Scripts_CN\Windows使用教程.md` (tutoriel officiel).

## Remarques

- SCS0009 nécessite la configuration des id des servomoteurs officiels (déjà intégrée dans `{l,r}_hand.toml`) ; la version PWM n'est pas concernée.

- Les deux types de servomoteurs **ne peuvent être connectés qu'un seul à la fois** ; il suffit de changer le matériel + l'option de menu.

- Ce pack a pour livrable principal la version PWM ; pour le tutoriel officiel SCS0009, référez-vous à la Demo officielle.

