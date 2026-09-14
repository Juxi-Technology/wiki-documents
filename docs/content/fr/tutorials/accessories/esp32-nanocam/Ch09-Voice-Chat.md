---
title: "Chapitre 9 : Dialogue vocal"
description: "Tutoriel ESP32-NanoCam chapitre 9 : se connecter au service cloud xiaozhi.me via le framework XiaoZhi AI et dialoguer en full-duplex ASR→LLM→TTS, avec serveur auto-hébergé et dépannage."
---

# Chapitre 9 : Dialogue vocal

> **[Acheter en boutique](https://www.juxitech.com/fr/products/esp32-s3-wifi-video-module)**

**Objectif de ce chapitre** : connecter le service cloud XiaoZhi AI et dialoguer naturellement à la voix avec le NanoCam.

## À propos de ce chapitre

Ce chapitre concerne le mode XiaoZhi AI (`ai_mode:6`). **Important** : les modes 6 (dialogue vocal) et 7 (ESP-Claw) **partagent le même firmware** (`nanocam_espclaw/`) ; au démarrage, l'appareil charge simplement un ensemble d'outils MCP différent selon la valeur `ai_mode` stockée en NVS.

|Critère|XiaoZhi AI (mode 6)|ESP-Claw (mode 7)|
|---|---|---|
|Dialogue vocal|✅ ASR→LLM→TTS|✅ même pipeline vocal|
|Outils MCP|Outils génériques (volume / photo, etc.)|**Outils génériques + 5 outils matériels dédiés**|
|Compréhension visuelle|`self.camera.take_photo`|**`self.camera.inspect_image`** (vision multimodale)|
|Contrôle LED|❌|✅ couleur réglée à la voix|
|Cas d'usage|Dialogue IA général, éducation pour enfants|Contrôle matériel, inspection visuelle, domotique|

> Ce chapitre se concentre sur le dialogue vocal du **XiaoZhi AI (mode 6)**. Pour découvrir les capacités de contrôle matériel d'ESP-Claw, voir le [Chapitre 11 : Contrôle vocal ESP-Claw](./Ch11-ESP-Claw-Voice-Control.md).

## Principe

NanoCam intègre le framework open source XiaoZhi AI et se connecte à un serveur LLM via WebSocket / MQTT pour réaliser la pipeline d'interaction vocale complète :

```Plain
L'utilisateur parle → capture par le microphone ES8311 → encodage Opus
  → WebSocket → ASR cloud (reconnaissance vocale)
  → Le grand modèle LLM génère la réponse
  → Synthèse vocale TTS → décodage Opus
  → Amplificateur NS4150B → lecture sur le haut-parleur
```

Conception full-duplex : l'utilisateur peut interrompre l'IA pendant qu'elle parle (barge-in), pour une expérience proche d'une conversation humaine.

## Matériel requis

Ce chapitre fait appel aux fonctions audio et nécessite le matériel suivant :

- Carte principale NanoCam (avec codec ES8311 + microphone AP2718AT)

- Carte de base NanoCam (avec amplificateur NS4150B + CH340K)

- Haut-parleur (à relier au connecteur haut-parleur de la carte de base, VON/VOP)

> La carte principale seule permet aussi de tester (écoute via la sortie casque de l'ES8311). Le microphone est un MEMS analogique AP2718AT, relié à MIC1P de l'ES8311 via le condensateur de liaison C26.

## Étapes

### 9.1 Flasher le firmware XiaoZhi AI

XiaoZhi AI utilise le projet de firmware indépendant `nanocam_espclaw/` :

```Bash
cd nanocam_espclaw
idf.py set-target esp32s3
idf.py build
idf.py -p COMx flash monitor
```

Au démarrage, le mode XiaoZhi AI est actif par défaut.

### 9.2 Se connecter au service cloud xiaozhi.me

Le NanoCam se connecte par défaut au service cloud officiel [xiaozhi.me](https://xiaozhi.me) (gratuit), sans serveur à auto-héberger.

1. Créer un compte sur [xiaozhi.me](https://xiaozhi.me)

2. À la mise sous tension, l'appareil annonce vocalement un code d'activation à 6 chiffres

3. Saisir le code d'activation dans la console xiaozhi.me → associer l'appareil

4. Choisir le modèle LLM dans la console (Qwen / DeepSeek, etc.)

L'activation n'est nécessaire qu'une seule fois ; ensuite, la connexion est automatique à chaque mise sous tension.

### 9.3 Premier dialogue

Après le signal sonore, vous pouvez dialoguer :

```Plain
Vous : « 你好小智, quel temps fait-il aujourd'hui ? »
NanoCam : « Je vais regarder la météo pour toi... »
```

Le mot d'éveil est **« 你好小智 »** (par défaut).

### 9.4 Scénarios de dialogue courants

```Plain
💬 « Raconte une blague »                 → réponse vocale de l'IA
💬 « Mets-moi un réveil dans 5 minutes »  → fonction réveil
💬 « Quelle heure est-il »                → annonce de l'heure
💬 « Joue une musique douce »             → lecture de musique en ligne
💬 « C'est quoi un trou noir »            → questions de connaissances
```

## Serveur auto-hébergé (facultatif)

Si vous avez des exigences de confidentialité, ou souhaitez utiliser votre propre LLM, vous pouvez déployer le serveur open source XiaoZhi AI :

```Bash
git clone https://github.com/xinnan-tech/xiaozhi-esp32-server
cd xiaozhi-esp32-server
pip install -r requirements.txt
python app.py
```

L'adresse du serveur du firmware est fournie via le système OTA (`CONFIG_OTA_URL` dans sdkconfig) ; l'appareil demande automatiquement cette adresse à la mise sous tension.

> XiaoZhi AI utilise le serveur open source XiaoZhi AI (protocole privé WebSocket + pipeline ASR/LLM/TTS). En mode ESP-Claw, en plus, la fonction d'analyse visuelle : le serveur fournit l'URL de la Vision API et le token lors du handshake MCP, sans configuration côté firmware.

## Dépannage

|Symptôme|Cause possible|Solution|
|---|---|---|
|Aucun son|Haut-parleur non connecté|Vérifier le connecteur haut-parleur de la carte de base|
|Reconnaissance vocale imprécise|Bruit ambiant trop fort|Parler près du microphone (distance < 1 m)|
|Connexion impossible|WiFi non configuré|Configurer d'abord le réseau via le port série `sta_ssid:xxx`|
|Pas de code d'activation|Premier démarrage non terminé|Attendre 30 secondes, l'appareil annonce le code automatiquement|
|Réponses très lentes|Latence du serveur LLM|Choisir un modèle plus rapide sur xiaozhi.me, ou auto-héberger le serveur|

> Pour la configuration WiFi par port série et toutes les commandes, voir le [Manuel du protocole série](./ESP32-NanoCam-Serial-Protocol.md).

Chapitre suivant : [Chapitre 10 : Compréhension visuelle par IA](./Ch10-AI-Vision-Understanding.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
