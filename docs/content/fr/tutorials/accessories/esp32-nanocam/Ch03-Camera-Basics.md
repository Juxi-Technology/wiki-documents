---
title: "Chapitre 3 : Bases de la caméra"
description: "Tutoriel ESP32-NanoCam chapitre 3 : comprendre l'interface caméra DVP, la diffusion vidéo MJPEG en PSRAM et les modes IA du firmware."
---

# Chapitre 3 : Bases de la caméra

> **[Acheter en boutique](https://www.juxitech.com/fr/products/esp32-s3-wifi-video-module)**

**Objectif de ce chapitre** : comprendre la chaîne de traitement caméra du NanoCam et découvrir les différents modes IA intégrés au firmware.

## Principe

Le NanoCam connecte la caméra via une interface DVP (vidéo numérique parallèle). Le capteur GC2145 émet des données de pixels parallèles 8 bits ; le périphérique LCD_CAM de l'ESP32-S3 les stocke directement en PSRAM par DMA, puis le serveur HTTP les diffuse au navigateur au format MJPEG.

### Concepts clés

- **DVP** : 8 lignes de données parallèles + 3 lignes de synchronisation (VSYNC/HREF/PCLK)

- **MJPEG** : chaque trame est une image JPEG indépendante ; le navigateur les charge en continu pour produire un effet vidéo

- **PSRAM** : 8 Mo de PSRAM servent de tampon de trames, avec une capacité de 2 à 4 trames

## Étapes

### 3.1 Afficher l'image par défaut

Après le flashage du firmware, l'appareil est en mode flux par défaut ; ouvrir `http://<IP>` dans le navigateur pour voir l'image.

|Commande|Fonction|
|---|---|
|`ai_mode:0\r`|Transmission d'images|
|`ai_mode:1\r`|Détection de visage de chat|
|`ai_mode:2\r`|Détection de visage|
|`ai_mode:3\r`|Reconnaissance des couleurs|
|`ai_mode:4\r`|Reconnaissance faciale|
|`ai_mode:5\r`|Lecture de QR codes|

> Pour tous les modes IA et les commandes série, voir le [Manuel du protocole série](./ESP32-NanoCam-Serial-Protocol.md).

Chapitre suivant : [Chapitre 4 : Détection de visage](./Ch04-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
