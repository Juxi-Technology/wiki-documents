---
title: ESP32-NanoCam Démarrage rapide
description: "Démarrage rapide de l'ESP32-NanoCam, module de transmission vidéo / vision IA : flasher le firmware, configurer le WiFi, afficher l'image en temps réel, changer de mode IA et intégrer le module à un projet Arduino / Python, en cinq étapes."
---

# ESP32-NanoCam Démarrage rapide

> **[Acheter en boutique](https://www.juxitech.com/fr/products/esp32-s3-wifi-video-module)**


L'ESP32-NanoCam est le module de transmission vidéo / vision IA ESP32-S3 de Juxi Technology (page produit : [Module vidéo WiFi ESP32-S3](/fr/products/esp32-s3-wifi-module)), avec une architecture à deux cartes : carte principale + carte de base. Ce guide vous fait parcourir en cinq étapes le flashage du firmware, la connexion WiFi, l'affichage de l'image et le changement de mode IA.

## Préparation

- Carte principale NanoCam + carte de base (ESP32-S3 N16R8 + CH340K)
- Câble USB Type-C (prise en charge du transfert de données)
- Ordinateur (Windows / Mac / Linux)
- Module caméra GC2145 (connecté en usine)

![Figure 1 : face avant de la carte principale ESP32-NanoCam](../../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/1.png)

![Figure 2 : carte de base ESP32-NanoCam (alimentation USB-C et flashage série)](../../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/2.png)

## Étape 1 : flasher le firmware (3 minutes)

### Méthode A : sans environnement de développement (recommandée)

1. Installer le [pilote de port série CH340K](https://www.wch.cn/download/CH341SER_EXE.html)
2. Ouvrir le navigateur et accéder à [esptool-js](https://espressif.github.io/esptool-js/)
3. Relier le NanoCam à l'ordinateur avec un câble Type-C
4. Sélectionner le port série, débit 115200
5. Repérer le fichier firmware `nanocam_xxx.bin` dans l'archive décompressée
6. Sélectionner le fichier firmware `nanocam_xxx.bin`, adresse `0x0`
7. Cliquer sur « START » et attendre la fin de l'opération

### Méthode B : ligne de commande (avancé)

```Bash
pip install esptool
esptool.py --chip esp32s3 --port COM3 write_flash 0x0 nanocam.bin
```

## Étape 2 : connexion WiFi (2 minutes)

Le NanoCam fonctionne par défaut en **double mode AP+STA simultané**, sans commutation :

- Le **point d'accès AP** est toujours actif : connectez directement le téléphone à `NanoCam-AP` (mot de passe `12345678`), puis ouvrez `http://192.168.4.1` dans le navigateur
- La **connexion STA au routeur** nécessite une configuration WiFi unique

Avec un outil de port série (débit **115200 8N1**), connectez-vous au port Type-C du NanoCam :

```Plaintext
sta_ssid:votre_nom_WiFi
sta_pd:votre_mot_de_passe_WiFi
```

> La réception de `OK` confirme la réussite. Le module redémarre automatiquement après modification du mot de passe.

Pour changer de mode WiFi (généralement inutile) :

|Commande|Mode|Description|
|---|---|---|
|`wifi_mode:0`|AP seul|Désactive le STA, seul le point d'accès reste actif|
|`wifi_mode:1`|STA seul|Désactive le point d'accès, connexion au routeur uniquement|
|`wifi_mode:2`|AP+STA|Par défaut, les deux fonctionnent simultanément|

## Étape 3 : afficher l'image (1 minute)

1. Envoyer `sta_ip` sur le port série pour obtenir l'IP STA
2. Saisir `http://<adresse IP>` dans le navigateur (ou `http://192.168.4.1` en mode AP)
3. La page web affiche l'image en temps réel

## Étape 4 : maîtriser l'IA (2 minutes)

Envoyez les commandes suivantes sur le port série pour changer de mode :

|Commande|Mode|Effet|
|---|---|---|
|`ai_mode:0`|Transmission standard|Image MJPEG en temps réel|
|`ai_mode:1`|Détection de visage de chat|Cadre de détection de visage de chat à l'écran|
|`ai_mode:2`|Détection de visage|Cadre de détection de visage à l'écran|
|`ai_mode:3`|Reconnaissance de couleur|Sélection de la couleur → suivi en temps réel|
|`ai_mode:4`|Reconnaissance faciale|Enregistrer → reconnaître → supprimer|
|`ai_mode:5`|Scan de QR code|Viser un QR code → sortie du contenu sur le port série|
|`ai_mode:6`|Agent LLM|Réveil vocal « 你好小智 » (XiaoZhi AI)|
|`ai_mode:7`|ESP-Claw|Agent IA ESP-Claw (framework officiel Espressif)|

> Chaque changement de mode nécessite un redémarrage manuel : appuyez sur la touche RST du module. Le nouveau mode prend effet après le redémarrage.

## Étape 5 : intégrer dans votre projet

### Contrôle Arduino

```C++
Serial.begin(115200);
Serial.print("ai_mode:2");  // basculer en détection de visage
```

### Contrôle Python

```Python
import serial
ser = serial.Serial("COM3", 115200)
ser.write(b"ai_mode:1\r\n")  # basculer en détection de visage de chat
```

### Voir toutes les commandes

Référence complète des commandes : [Manuel du protocole série](./ESP32-NanoCam-Serial-Protocol.md).

## Questions fréquentes

|Problème|Solution|
|---|---|
|Échec du flashage|Vérifier que le câble Type-C prend en charge les données ; maintenir S2 (BOOT) de la carte de base enfoncé, puis remettre sous tension|
|Aucune image|Envoyer `sta_ip` sur le port série pour confirmer l'IP ; vérifier que les appareils sont sur le même sous-réseau|
|Caméra inactive|Vérifier que la nappe FPC est insérée fermement, contacts métalliques vers le bas ; contrôler PWDN (IO12) / RESET (IO14)|
|WiFi inaccessible|Envoyer `wifi_reset` pour restaurer les paramètres d'usine, puis reconfigurer|

## Étapes suivantes

- 📖 [Manuel du protocole série](./ESP32-NanoCam-Serial-Protocol.md) — référence complète des commandes AT
- 🎓 [Plan du tutoriel](./Ch01-Environment-Setup.md) — tutoriel progressif (11 chapitres sur ce wiki)
- 🔧 [Spécifications matérielles](./ESP32-NanoCam-Hardware-Spec.md) — mappage complet des broches GPIO
- 🤖 [Guide d'intégration ROS2](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop) — tutoriel de téléopération sans fil micro-ROS

<RelatedProducts slugs="esp32-s3-wifi-module" />
