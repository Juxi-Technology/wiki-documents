---
title: Flashage JetPack et configuration système
description: Guide de flashage JetPack pour NVIDIA Jetson – SDK Manager et images officielles, dépannage, configuration de base
keywords: [jetson, jetpack, flashage, configuration système, nvidia]
---

# Flashage JetPack et configuration système

> Pour les développeurs découvrant la plateforme NVIDIA Jetson. Les kits Jetson JUXI sont livrés avec Ubuntu 22.04. Ce document sert de référence pour la réinstallation ou le changement de JetPack.

## 1. Qu'est-ce que JetPack ?

JetPack est le SDK de NVIDIA pour la plateforme Jetson, comprenant :

- L'image système Ubuntu
- CUDA / cuDNN / TensorRT
- L'API multimédia (L4T)

**Correspondance de versions** (courante) :

| Carte Jetson | JetPack recommandé | Système |
|------------|-------------|------|
| Orin NX / Nano | JetPack 6.x | Ubuntu 22.04 |
| Xavier NX / AGX | JetPack 5.x | Ubuntu 20.04 |

> Le [kit Jetson Orin NX Super](/fr/products/jetson-orin-nx-super-kit) JUXI est livré avec Ubuntu 22.04 (écosystème JetPack 6.x).

## 2. Méthodes de flashage

### Méthode 1 : Image officielle (boot Ubuntu)

Adaptée aux hôtes Ubuntu existants ou au boot USB :

```bash
# 1. Télécharger le Driver Package officiel de NVIDIA pour la carte
# 2. Extraire et entrer dans Linux_for_Tegra
cd Linux_for_Tegra
sudo ./apply_binaries.sh
# 3. Mettre le Jetson en mode Recovery (maintenir REC puis allumer)
# 4. Flasher
sudo ./flash.sh <board-name> mmcblk0p1
```

### Méthode 2 : SDK Manager (recommandé aux débutants)

1. Installer [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)
2. Connecter le Jetson au PC (mode Recovery)
3. Choisir le modèle de carte → version JetPack → cocher les composants (de préférence tout CUDA/TensorRT)
4. Attendre le flashage et le premier démarrage

> ⚠️ Le flashage dure 20 à 60 minutes. **Ne débranchez pas le câble et ne coupez pas l'alimentation.**

## 3. Dépannage du flashage

| Symptôme | Vérification |
|------|------|
| Impossible d'entrer en mode Recovery | Maintenir REC puis allumer ; vérifier avec `lsusb` que le périphérique NVIDIA est détecté |
| Échec en cours de flashage | Changer de **câble de données** (éliminer d'abord le câble) ; désactiver l'économie d'énergie du PC ; reflasher |
| Écran noir après flashage | Vérifier le connecteur d'affichage (Orin utilise DP) ; revenir en mode Recovery et reflasher |
| Message de version non concordante | Vérifier la correspondance carte/version JetPack (sérigraphie sur la carte) |

## 4. Configuration de base du système

### 4.1 Réseau et sources

```bash
# Passer sur un miroir local (optionnel, accélère apt)
sudo sed -i 's|archive.ubuntu.com|mirrors.tuna.tsinghua.edu.cn|g' /etc/apt/sources.list
sudo apt update
```

### 4.2 Vérifier l'environnement GPU

```bash
# Voir JetPack/CUDA
cat /etc/nv_tegra_release
nvcc --version
# Vérifier PyTorch GPU
python3 -c "import torch; print(torch.cuda.is_available())"
```

> Si PyTorch n'est pas disponible, voir [Incompatibilité PyTorch sur Jetson Orin](/fr/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

### 4.3 Activer le mode mémoire 64G (Orin)

```bash
sudo nvpmodel -m 0          # mode pleine performance
sudo jetson_clocks          # déverrouiller les fréquences
```

### 4.4 Étendre la partition racine

Après le flashage, la partition racine peut n'occuper qu'une partie de la SD/eMMC :

```bash
sudo systemctl enable --now nvresize             # extension automatique
# ou manuellement :
sudo resize2fs /dev/nvme0n1p1                    # selon le périphérique réel
```

## 5. Questions fréquentes

**Q : Pas de WiFi après le flashage ?**
Les cartes cœur Orin nécessitent un module WiFi M.2 externe ; vérifiez les antennes double bande.

**Q : Comment entrer en mode Recovery ?**
Couper l'alimentation → maintenir REC (ou BOOT) puis brancher l'alimentation/Type-C → `lsusb` doit afficher `NVIDIA Corp.` = succès.

**Q : Quel stockage faut-il ?**
≥128 Go SSD recommandé (les SD sont le goulot d'étranglement en écriture). 256 Go est la config standard du kit.

---

## Liens connexes

- [Kit Jetson Orin NX Super](/fr/products/jetson-orin-nx-super-kit)
- [Introduction au déploiement IA en périphérie](/fr/topics/edge-ai-intro)
- [Tutoriel d'introduction à ROS](/fr/tutorials/ros-intro)

## Support technique

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
