---
title: Guide de dépannage de la téléopération sans fil SO-ARM101 (version NanoCam)
description: "Synthèse des pannes courantes de la téléopération sans fil SO-ARM101 (version ESP32-NanoCam) : flashage et port série, caméra, audio, réseau et micro-ROS — symptômes, causes et solutions."
---

# Guide de dépannage de la téléopération sans fil SO-ARM101 (version NanoCam)

> **[Acheter en boutique](https://www.juxitech.com/fr/products/so-arm101-developers-kit)**

Cette page recense les pannes courantes de la téléopération sans fil du SO-ARM101 en version ESP32-NanoCam. Pour le déroulement complet des opérations, voir [Téléopération sans fil SO-ARM101 (version ESP32-NanoCam)](./SO-ARM101-NanoCam-Wireless-Teleop.md).

## Aide-mémoire de dépannage général

| Symptôme | Vérification |
|---|---|
| Impossible de se connecter pour le flashage | Passer manuellement en mode téléchargement (BOOT + reset) ; ajouter `upload_port` dans `platformio.ini` |
| Aucune sortie série après le flashage | Vérifier le câble USB et le pilote CH340 ; sous Windows, consulter le port COM dans le Gestionnaire de périphériques |
| Bloqué sur `Waiting for micro-ROS Agent...` | Vérifier AGENT_IP / UDP 8888 / l'isolation des clients |
| Bus de servos sans réponse (`servo_mask≠0x3f`) | Vérifier le branchement via l'UART de la carte driver de servos sur P2-7/P2-8 ; alimenter le bras follower en 12V 5A externe |
| Niveau du microphone toujours à 0 | Vérifier le log `audio: ES8311 ready` ; résistances de tirage I2C 41/42 ; souffler sur le microphone pour tester |
| Aucun son du haut-parleur | Vérifier la connexion du haut-parleur ; registre de volume ES8311 `R_DAC32` (déjà réglé au maximum 0xFF dans le firmware actuel) |
| Coupures WiFi fréquentes | Vérifier l'antenne et la distance ; un RGB rouge indique une perte du WiFi, redémarrage automatique après 10s |

## Problèmes de flashage et de port série

- **Impossible de se connecter pour le flashage** : maintenir le bouton BOOT (GPIO0) → brancher l'USB (ou appuyer sur reset) → relâcher BOOT, puis relancer immédiatement l'upload. Sous Windows, si le port série n'est pas détecté automatiquement, ajouter une ligne `upload_port = COM3` dans la section `[env:nano_cam]` de `platformio.ini` (remplacer par le numéro COM réel du CH340 indiqué dans le Gestionnaire de périphériques).
- **Aucune sortie série après le flashage** : l'USB du NanoCam passe par un CH340K → UART0, sous Linux le nom du périphérique est `/dev/ttyUSB0` ; si rien n'est détecté au branchement, vérifier le câble USB et le pilote CH340 (fourni par le noyau).
- **Bus de servos sans réponse (`servo_mask≠0x3f`)** : vérifier que le bus de servos est connecté via l'UART de la carte driver de servos sur **P2-7/P2-8** (GPIO19/20) et non sur les 43/44 de l'UART0 ; le bras follower doit être alimenté en 12V 5A externe (l'USB ne peut pas alimenter 6 servos).
- **Ne pas confondre le bus de servos et le port série de débogage** : le port série de débogage est l'USB-C (CH340K → UART0), totalement indépendant du bus de servos ; les deux peuvent être utilisés simultanément.

## Problèmes de compilation et de chaîne d'outils

- **Premier `pio run` lent ou bloqué** (le premier lancement télécharge successivement la plateforme espressif32, la chaîne d'outils `toolchain-xtensa-esp32s3` d'environ 100 Mo et le framework Arduino d'environ 200 Mo) : l'estimation du temps restant de PlatformIO est imprécise — il reste souvent bloqué un moment puis se termine d'un coup ; laisser 5 minutes en observant si le pourcentage progresse ; possibilité d'activer un proxy/VPN (proxy système) ;
- **Téléchargement manuel de la chaîne d'outils** : télécharger avec le navigateur `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` (sous Linux, `-linux-amd64.tar.gz`), décompresser puis renommer le dossier en `toolchain-xtensa-esp32s3` et le placer dans `C:\Users\<nom d'utilisateur>\.platformio\packages\`, puis relancer `pio run` ; une interruption par Ctrl+C en cours de route n'abîme pas l'environnement, le relancer reprend le téléchargement ;
- **Sous Windows, commande `pio` introuvable dans Git Bash** : utiliser un terminal PowerShell/CMD, ou ajouter `C:\Users\<nom d'utilisateur>\.platformio\penv\Scripts` au PATH.

## Dépannage spécifique de la caméra

| Symptôme | Cause racine | Correction |
|---|---|---|
| `i2c driver install error` + `camera probe failed` | **Conflit I2C** : l'ES8311 utilise `Wire1` sur GPIO41/42, l'installation du pilote I2C par le SCCB de la caméra est refusée | Ajouter `Wire1.end()` à la fin de `init()` dans `audio_es8311.cpp` pour libérer l'I2C au profit de la caméra |
| `JPEG format is not supported on this sensor` (0x106) | **Le GC2145 n'a pas d'encodeur JPEG matériel** (seuls les OV2640/OV5640 en ont) | Passer l'acquisition en `PIXFORMAT_RGB565`, puis encoder en JPEG par logiciel avec `frame2jpg` pour `/stream` et `/jpg` |
| `/jpg`, `/stream` sans réponse, le navigateur tourne indéfiniment | **Débordement de pile du httpd** : la pile par défaut de 8 Ko ne suffit pas pour l'encodage logiciel `frame2jpg` | `config.stack_size = 16384` dans `start_server()` |
| `/stream` s'ouvre mais écran noir | **Frontière multipart manquante** : `STREAM_BOUNDARY` n'est pas envoyé entre les images, le navigateur ne peut pas analyser le flux | Envoyer `STREAM_BOUNDARY` avant chaque image |
| curl sur `/jpg` renvoie `HTTP:000`, mais le navigateur affiche l'image | esp_http_server est **monotâche** : quand `/stream` occupe la tâche httpd, `/jpg` ne peut pas passer ; ou le délai d'attente de curl est trop court | Fermer `/stream` puis tester `/jpg` seul ; utiliser le navigateur au lieu de curl pour vérifier |
| La caméra s'initialise mais image entièrement noire / aucune image | Le plus souvent **matériel** : alimentation AVDD/DOVDD, niveau PWDN, contact de la nappe | Tester d'abord un instantané via `/jpg` dans le navigateur (image OK = liaison fonctionnelle) ; vérifier l'alimentation 2.8V de la caméra et la nappe |
| Environ 2/3 inférieurs de l'image VGA brouillés | **Débit de données DVP trop élevé** : le VGA en RGB565 dépasse la marge de synchronisation d'échantillonnage DVP de cette carte (reproduit en 24/20/16MHz × simple/double tampon) ; le QVGA est normal | Utiliser **QVGA 320×240** en configuration finale (suffisant pour le FPV), ou un XCLK plus stable / revoir le routage matériel DVP |

> Remarque : les quatre premières lignes du tableau sont déjà corrigées dans le firmware fourni — il suffit de flasher le dernier firmware, aucune modification manuelle du code n'est nécessaire.

**Attention** : esp_http_server est monotâche, `/stream` et `/jpg` ne peuvent pas être consultés en même temps — quand `/stream` est ouvert, `/jpg` reste en suspens. Fermer la page du flux avant de capturer une image unique.

## Dépannage spécifique de l'audio

| Symptôme | Cause racine | Correction |
|---|---|---|
| Haut-parleur **totalement muet** + niveau du microphone ≈ 0 (p. ex. `0.0009`) | **MCLK absent** : le pilote I2S legacy ne génère pas de MCLK sur l'ESP32-S3, le DAC/ADC interne de l'ES8311 n'a pas d'horloge | Générer un **MCLK de 6.15MHz avec le LEDC sur GPIO39** (`start_ledc_mclk()` dans `audio_es8311.cpp`) |
| Signal sonore **trop faible** (audible seulement l'oreille collée) | Amplitude numérique faible + volume principal ES8311 faible | Amplitude de `play_tone` 12000→30000, `R_DAC32` 0x30→0xFF (environ +29dB) |
| À la mise sous tension, seuls les « bip bip » de démarrage, aucun autre signal sonore | **Comportement normal** : les signaux de prêt/déverrouillage sont pilotés par événements et ne se déclenchent qu'en lançant la téléopération | Signal de démarrage = joué dès la mise sous tension ; signal de prêt = communication avec l'Agent établie ; signal de déverrouillage = commande de contrôle reçue |

> Remarque : les deux premières lignes sont déjà corrigées dans le firmware fourni ; la troisième correspond à un comportement normal, aucune action requise.

## Vérifications matérielles du microphone, du haut-parleur et du RGB

- **Niveau du microphone toujours à 0** : vérifier le log `audio: ES8311 ready` ; confirmer que le MCLK est généré (GPIO39 doit être à ~1.65V, généré par le LEDC) ; résistances de tirage du bus I2C 41/42 (10K déjà présentes sur la carte) ; souffler sur le microphone et regarder si `/follower_audio/level` bouge.
- **Aucun son du haut-parleur** : vérifier que le haut-parleur NS4150B est branché sur le connecteur de haut-parleur ; confirmer la sortie MCLK sur GPIO39 (LEDC, `start_ledc_mclk()`) ; registre de volume `R_DAC32` (actuellement 0xFF) ; si l'ES8311 n'est pas initialisé, le log affiche la cause de l'échec.
- **LED RGB éteinte** : la broche de données du WS2812 est GPIO18 ; vérifier dans le log de démarrage du firmware l'absence d'erreur d'initialisation RMT avant `camera_stream` (en principe aucune).

## Problèmes réseau et micro-ROS

- **Blocage sur `Waiting for micro-ROS Agent...`** : vérifier successivement que `AGENT_IP` correspond bien à l'IP locale de l'ordinateur Ubuntu, que l'UDP 8888 est autorisé, et que l'isolation des clients n'est pas activée sur le routeur/point d'accès (à désactiver). L'antenne du NanoCam est une antenne U.FL sur le module ; en cas de RSSI faible, vérifier d'abord l'antenne et le placement, et tester idéalement les distances de 5/10/20/30 mètres.
- **Coupures WiFi fréquentes** : vérifier l'antenne et la distance ; un RGB rouge indique une perte du WiFi, le firmware redémarre automatiquement après un délai de 10s.
- **En cas d'impossibilité de connexion, vérifier d'abord l'environnement** : le NanoCam et l'ordinateur Ubuntu doivent être sur le même réseau local 2.4GHz (un partage de connexion mobile suffit) ; si vous avez changé de réseau, pensez à mettre à jour `AGENT_IP` et la configuration WiFi (voir la section « Configuration du WiFi » du tutoriel de téléopération sans fil).

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
