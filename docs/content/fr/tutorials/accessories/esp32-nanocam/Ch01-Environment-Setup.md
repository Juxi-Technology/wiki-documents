---
title: "Chapitre 1 : Configuration de l'environnement"
description: "Tutoriel ESP32-NanoCam chapitre 1 : installer le pilote série CH340K, maîtriser les quatre méthodes de flashage — web esptool-js, ligne de commande esptool, ESP-IDF et ESP-EIM-GUI — et créer un compte sur le serveur xiaozhi.me."
---

# Chapitre 1 : Configuration de l'environnement

> **[Acheter en boutique](https://www.juxitech.com/fr/products/esp32-s3-wifi-video-module)**

**Objectif de ce chapitre** : mettre en place l'environnement de flashage du firmware et l'environnement serveur, en préparation de tous les chapitres pratiques suivants.

## 1.1 Environnement de flashage du firmware

### Méthode A : sans environnement de développement (recommandé pour les débutants)

1. Installer le [pilote série CH340K](https://www.wch.cn/download/CH341SER_EXE.html)

2. Ouvrir le navigateur → [esptool-js](https://espressif.github.io/esptool-js/)

3. Connecter le NanoCam, choisir le port série, sélectionner le fichier firmware .bin

4. Cliquer sur Program pour flasher

### Méthode B : ligne de commande

```Bash
pip install esptool
esptool.py --chip esp32s3 --port COM_x write_flash 0x0 nanocam_xxx.bin
```

### Méthode C : environnement de développement ESP-IDF (avancé)

1. Installer VSCode + l'extension ESP-IDF

2. F1 → `ESP-IDF: Configure ESP-IDF Extension`

3. Choisir ou installer ESP-IDF v5.4+

4. Compiler : `idf.py build flash monitor`

### Méthode D : installation via ESP-EIM-GUI

1. Télécharger sur le site officiel [https://dl.espressif.cn/dl/eim/](https://dl.espressif.cn/dl/eim/)

2. Après le téléchargement, double-cliquer pour ouvrir la page EIM ; le coin supérieur droit permet de basculer l'interface en chinois

3. Cliquer sur « Commencer l'installation »

4. À l'étape suivante, choisir l'installation personnalisée

5. Avant cela, `git` et `python3.12.x` doivent être installés (source de téléchargement de git en Chine : [CNPM Binaries Mirror](https://registry.npmmirror.com/binary.html?path=git-for-windows/v2.55.0.windows.3/))

6. Choisir esp32s3 comme appareil cible

7. Choisir la version ESP-IDF : cocher ici « afficher les anciennes versions stables », faire défiler vers le bas et sélectionner la version v5.4.1

8. Laisser la sélection du miroir de téléchargement inchangée, passer à l'étape suivante

9. Choisir les fonctionnalités ESP-IDF : tout sélectionner est recommandé ici, puis continuer

10. Choisir les outils, passer à l'étape suivante, puis sélectionner l'emplacement d'installation souhaité et lancer l'installation ; attendre la fin
Une fois l'installation terminée, cette version présente un problème de décompression : trouver le répertoire C:\Espressif\dist\xtensa-esp-elf-14.2.0_20241119-x86_64-w64-mingw32.zip, copier l'archive vers C:\Espressif\tools\xtensa-esp-elf, après extraction trouver le dossier xtensa-esp-elf, puis remplacer par les dossiers situés sous C:\Espressif\tools\xtensa-esp-elf\esp-14.2.0_20241119 pour que la compilation réussisse

## 1.2 Environnement serveur

### Service officiel xiaozhi.me (gratuit)

1. Visiter [xiaozhi.me](https://xiaozhi.me) pour créer un compte

2. Entrer dans la console

3. Une fois le module connecté au réseau, il annonce un code de vérification à 6 chiffres

4. Cliquer sur l'ajout d'appareil à droite de la section « agent »

5. Saisir le code de vérification à 6 chiffres annoncé

6. Une fois l'appareil associé, la conversation peut commencer

Chapitre suivant : [Chapitre 2 : Démarrage rapide](./Ch02-Quick-Start.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
