---
title: Module vidéo WiFi ESP32-S3
category: compute-vision
description: Module vidéo WiFi ESP32-S3 de Juxi Technology — caméra 2MP, transmission WiFi en temps réel, vision IA (couleur/visage/QR), double mode AP+STA
keywords: [esp32, wifi, transmission vidéo, caméra, vision ia]
---

# Module vidéo WiFi ESP32-S3

> **[Acheter en boutique](https://www.juxitech.com/fr/products/esp32-s3-wifi-video-module)**

## Présentation

Le module vidéo WiFi ESP32 (modèle **ESP32-NanoCam**) est une solution de vision IA compacte et économique avec une architecture modulaire à deux cartes (carte de traitement + carte d'extension communication). La carte principale embarque le processeur **ESP32-S3** et une caméra 2MP pour le streaming vidéo WiFi, la vision IA et l'interaction vocale — firmware préinstallé, prêt à l'emploi.

**Caractéristiques clés** :

- Caméra HD 2MP (1600×1200@30FPS)
- **Double mode AP + STA** transmission WiFi en temps réel
- 8 modes IA : détection de visage de chat, détection de visage, reconnaissance de couleur, reconnaissance faciale, scan de QR code, dialogue vocal LLM (XiaoZhi AI), contrôle vocal ESP-Claw
- Audio embarqué ES8311 (microphone + haut-parleur), prise en charge de l'interaction vocale
- LED d'état RGB WS2812
- Mise à jour du firmware en un clic via Type-C
- Interface I2C / UART standard PH2.0

## Spécifications

| Catégorie | Spécification |
|------|------|
| MCU | ESP32-S3 N16R8 (Espressif, double cœur 240MHz) |
| Stockage | 16MB Flash + 8MB PSRAM |
| Caméra | CMOS 2MP GC2145 (1600×1200@30FPS) |
| Champ de vision | Diagonale 68°, horizontale 49.5° |
| Audio | Codec ES8311 + microphone MEMS + haut-parleur classe D |
| LED d'état | WS2812 RGB |
| Sans fil | WiFi (BT dual-mode) AP/STA + antenne haut gain |
| Interfaces | Type-C / I2C / UART (PH2.0) |
| Touches | Reset + touche BOOT |
| Reconnaissance | Visage de chat, détection de visage, reconnaissance faciale, couleur, QR code, dialogue vocal |

## Démarrage rapide

### 1. Mise sous tension

Firmware préinstallé — le module crée son propre hotspot WiFi :

- Connecter le smartphone/PC au hotspot
- Ouvrir l'adresse indiquée dans le navigateur pour la vidéo en direct

### 2. Deux modes de fonctionnement

| Mode | Description |
|------|------|
| **Mode AP** | Le module crée son propre hotspot, le terminal s'y connecte directement |
| **Mode STA** | Le module se connecte à un routeur WiFi existant, transmission sur le même réseau |

### 3. Connexion à l'hôte

**Communication UART** (Raspberry Pi/Jetson Orin) :

```
ESP32 模块 RX → 主控 TX
ESP32 模块 TX → 主控 RX
```

**Communication I2C** : interface I2C standard PH2.0, peut sortir les **coordonnées** de détection visage/couleur.

### 4. Développement personnalisé

Type-C vers PC, mise à jour du firmware en un clic ; changer de mode IA (visage de chat/détection de visage/couleur/reconnaissance faciale/QR code/dialogue vocal) par commandes série ; référence complète des commandes dans le [Manuel du protocole série](/fr/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol).

---

## Tutoriels complets

- [Démarrage rapide — flasher le firmware, connecter le WiFi et afficher l'image en 3 minutes](/fr/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start)
- [Spécifications matérielles — mappage complet des broches GPIO et conception de l'alimentation](/fr/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec)
- [Manuel du protocole série — commandes AT complètes pour la configuration WiFi et les modes IA](/fr/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol)
- [Tutoriel vision IA — 11 chapitres progressifs (visage/chat/couleur/QR code/voix)](/fr/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup)
- [ESP32-NanoCam comme contrôleur d'esclave sans fil pour SO-ARM101](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)

---

## Cas d'usage

- Transmission vidéo sans fil (double mode AP/STA)
- Développement vision IA (couleur/visage/QR)
- Projets IoT/AIoT
- Extension vision robotique

---

## FAQ

**Q : Comment voir la vidéo en direct ?**
Le firmware préinstallé crée un hotspot AP. Connectez le smartphone/PC puis ouvrez la page ou l'application indiquée.

**Q : Quelles reconnaissances sont prises en charge ?**
Segmentation par seuil de couleur + CNN léger pour couleur, visage et QR code ; commutable par commande.

**Q : Peut-on renvoyer les coordonnées de reconnaissance ?**
Oui. Les coordonnées de détection visage/couleur sont émises via I2C/UART pour le développement personnalisé.

**Q : Comment mettre à jour le firmware ?**
Type-C vers PC, mise à jour en un clic.

---

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
- 💬 [Retour](https://github.com/Juxi-Technology/wiki-documents/issues)