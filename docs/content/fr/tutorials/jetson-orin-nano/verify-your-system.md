---
title: Vérifier votre système — version, Super Mode et modes d'alimentation
sidebar_label: Vérifier votre système
slug: /getting-started/verify-your-system
description: >-
  Vérifiez que votre kit de développement Jetson Orin Nano Super exécute
  JetPack 7.2.1 avec la pile de composants complète, la configuration de carte
  Super Mode et les bons modes d'alimentation.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
review_owner: cheny
---

# Vérifier votre système

Après le premier démarrage de votre système JetPack 7.2.1, exécutez cette liste de contrôle. Elle confirme la
**version L4T**, les **composants JetPack installés**, la **configuration de carte Super Mode**
et les **modes d'alimentation**. Si le système n'est pas encore configuré, commencez par **[Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start)**.

## Étape 1 — Vérifier la version L4T (BSP)

```bash
cat /etc/nv_tegra_release
```

Un système **JetPack 7.2.1** indique **R39** avec **REVISION: 2.1** :

```
# R39 (release), REVISION: 2.1, GCID: 46758480, BOARD: generic, EABI: aarch64, DATE: Fri Aug 7 05:54:22 AM UTC 2026
# KERNEL_VARIANT: oot
TARGET_USERSPACE_LIB_DIR=nvidia
TARGET_USERSPACE_LIB_DIR_PATH=usr/lib/aarch64-linux-gnu/nvidia
```

> **Remarque de Juxi :** NVIDIA ne publie pas de sortie d'exemple pour ce fichier. Le bloc ci-dessus est
> une sortie r39.2.1 observée par la communauté sur un appareil Orin ; vos valeurs `GCID` et `DATE`
> seront différentes. Ce qui compte est `REVISION: 2.1`.

Si la sortie indique une version plus ancienne (par exemple R36 de JetPack 6.x), votre système n'exécute pas
JetPack 7.2.1 — voir **[Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates)** et la
**[migration JetPack 6 vers 7](/fr/tutorials/jetson-orin-nano/jetpack-6-to-7)**.

## Étape 2 — Vérifier les composants et versions JetPack

Les composants JetPack tels que CUDA, cuDNN et TensorRT sont installés sous forme de paquets Debian.
La commande officielle de NVIDIA pour les lister est :

```bash
apt list --installed | grep nvidia-jetpack
```

Le métapaquet `nvidia-jetpack` doit apparaître dans la sortie. Pour contrôler rapidement un composant, interrogez
`dpkg` directement — par exemple, cuDNN avec `dpkg -l | grep cudnn`. Si le métapaquet manque,
exécutez `sudo apt update` puis `sudo apt install nvidia-jetpack`, et redémarrez si vous y êtes invité.

Le tableau ci-dessous liste les versions officielles des composants NVIDIA pour **JetPack 7.2.1 / Jetson
Linux 39.2.1** (vérifiées le 2026-09-26 sur la page de téléchargement de JetPack) :

| Composant | Version |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| Système d'exploitation | Ubuntu 24.04 (L4T) |
| Noyau | 6.8 |
| CUDA | 13.2.2 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI (vision par ordinateur) | 4.1.4 |
| V4L2 | 1.22.1 |
| SDK DeepStream | 9.1 |
| SDK Holoscan | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19 (avec image ISO) |
| Isaac ROS | **Livré** — Isaac ROS 4.6.0 (août 2026) a ajouté la prise en charge de Jetson Orin et de JetPack 7.2 ; le tableau des composants de NVIDIA dit encore « coming soon » |

> **Remarque de Juxi :** la page 7.2.1 de NVIDIA liste une seule matrice pour toute la gamme JetPack 7 (Thor et
> Orin ensemble), pas par plateforme. `dpkg` peut afficher des versions avec un suffixe de build — faites correspondre le
> numéro de version, pas la chaîne complète. Le tableau de NVIDIA ne liste pas les versions d'OpenCV, de DLA ou de Python,
> donc cette page non plus.

> **À propos de la version de VPI :** la page de téléchargement de NVIDIA n'a pas été entièrement actualisée pour la
> 7.2.1 — sa ligne VPI porte encore la valeur de JetPack 7.2 (4.1.3). JetPack 7.2.1 embarque en réalité **VPI 4.1.4**,
> confirmé à partir du dépôt de paquets de NVIDIA lui-même : `nvidia-jetpack-runtime (= 7.2.1-b49)` dépend de
> `nvidia-vpi (= 7.2.1-b49)`, qui fixe `libnvvpi4 (= 4.1.4)`. Les versions 4.1.3 et 4.1.4 existent toutes deux dans le
> pool de paquets, donc seul le verrou de dépendance est décisif. (vérifié le 2026-09-26)

## Étape 3 — Installer jtop et lire l'activité du système (facultatif)

`jtop` fait partie de **jetson-stats**, un projet communautaire — pas un produit NVIDIA. NVIDIA ne
le documente pas pour cette version, et sa compatibilité avec L4T r39 n'est pas vérifiée par NVIDIA.

Installez-le en suivant les instructions communautaires de la
[page du projet jetson-stats](https://pypi.org/project/jetson-stats/).

Exécutez ensuite `jtop` — un moniteur système interactif et un visualiseur de processus. Surveillez les 8 GB de
mémoire unifiée partagée avant de lancer une grosse charge de travail d'IA. Une alternative officielle est `sudo tegrastats`
(activité en direct du CPU, du GPU, de la mémoire, des températures et de l'alimentation ; `Ctrl`+`C` l'arrête). La page
How-To de NVIDIA recommande `tegrastats` plutôt que `nvidia-smi` pour la surveillance sur Jetson.

## Étape 4 — Vérifier la configuration de carte Super Mode (TNSPEC)

Les installations par ISO de JetPack 7.2.1 flashent la configuration **Super Mode** par défaut. Confirmez-le sur l'appareil :

```bash
cat /etc/nv_boot_control.conf
```

Sur un kit configuré en Super, la ligne `TNSPEC` porte un suffixe `-super`. Le personnel NVIDIA a publié
cet exemple :

```
TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-
```

Sur un kit non-Super, la même ligne se termine sans `-super` — par exemple, d'après le rapport d'un utilisateur
sur un système affecté : `TNSPEC 3767-300-0005-X.1-1-1-jetson-orin-nano-devkit-`

> **Remarque de Juxi :** les caractères au milieu de la chaîne TNSPEC varient selon l'unité et l'état
> du micrologiciel. Ce qui compte est le suffixe `-super` à la fin de la ligne TNSPEC.

Problème des notes de version **6480645** : après une installation ISO, la variable UEFI `TegraPlatformSpec`
peut ne pas refléter fidèlement la spécification de la carte. NVIDIA indique de lire l'entrée `TNSPEC`
dans `/etc/nv_boot_control.conf` pour obtenir les informations correctes sur la carte.

## Étape 5 — Vérifier les modes d'alimentation

Le mode d'alimentation par défaut est généralement **25W**. Depuis le bureau : cliquez sur le mode d'alimentation dans la
barre supérieure d'Ubuntu, sélectionnez **Power Mode**, puis choisissez **MAXN SUPER**. En ligne de commande,
affichez le mode actif et son ID de mode :

```bash
sudo /usr/sbin/nvpmodel -q
```

Pour changer de mode, utilisez l'ID affiché par la requête (`sudo /usr/sbin/nvpmodel -m <mode_id>`).
Comment distinguer Super de non-Super :

| | Configuration Super | Configuration non-Super |
|---|---|---|
| Modes disponibles | 15W, 25W, **MAXN SUPER** | 7W, 15W uniquement |
| ID de mode (observés par la communauté) | 0 = 15W, 1 = 25W, 2 = MAXN_SUPER ; 25W par défaut | 0 = 15W, 1 = 7W |
| `sudo nvpmodel -m 2` | sélectionne MAXN SUPER | échoue : `NVPM ERROR: request for bad power mode 2` |

> **Astuce Juxi :** les ID de mode proviennent d'un rapport communautaire sur les fichiers de profils d'un système
> 7.2 ; le menu d'alimentation du bureau liste directement les modes disponibles. Après utilisation du GPU,
> un changement de mode d'alimentation peut demander un redémarrage — le personnel NVIDIA indique que cette invite est normale.

## Si seuls 7W et 15W apparaissent

Il s'agit d'un problème connu de JetPack 7.2, corrigé par conception dans la 7.2.1.

- Sur **JetPack 7.2 (L4T 39.2)**, le problème connu **6279443** indique que les unités mises à jour via l'installateur
  ISO « ne démarreront pas par défaut en mode “Super” » ; la consigne de NVIDIA était de flasher la cible
  depuis un hôte Linux ou avec SDK Manager.
- **JetPack 7.2.1** change cela : « l'ISO flashe désormais le kit de développement Jetson Orin Nano avec
  la configuration de flashage Super Mode par défaut ». Le problème 6279443 ne figure pas dans la liste des problèmes connus de la 7.2.1,
  et le personnel NVIDIA a déclaré : « Cela sera corrigé dans jp7.2.1. »

Une installation ISO 7.2.1 récente devrait afficher 25W et MAXN SUPER. Si ce n'est pas le cas pour votre kit :

1. Pour un système installé avec l'ISO 7.2, reflashez avec la configuration Super depuis un
   hôte Linux ou SDK Manager — voir **[Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates)**.
2. NVIDIA ne précise pas si une réinstallation via l'ISO 7.2.1 convertit une carte installée
   avec l'ISO 7.2. Si les modes Super manquent toujours, utilisez les options de reflashage de la page
   **[Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting)**.

La même question est répertoriée dans la **[FAQ](/fr/tutorials/jetson-orin-nano/faq)**.

## À quoi ressemble un système correct

| Vérification | Commande | Ce qu'affiche un système correct |
|---|---|---|
| Version L4T | `cat /etc/nv_tegra_release` | `R39 (release), REVISION: 2.1` |
| Paquets JetPack | `apt list --installed \| grep nvidia-jetpack` | Paquets JetPack installés, y compris le métapaquet `nvidia-jetpack` |
| Contrôle rapide de cuDNN | `dpkg -l \| grep cudnn` | Version 9.20.0 |
| Configuration de carte | `cat /etc/nv_boot_control.conf` | La ligne `TNSPEC` se termine par `jetson-orin-nano-devkit-super-` |
| Modes d'alimentation | `sudo /usr/sbin/nvpmodel -q` | Le mode actif est 25W par défaut ; 15W, 25W et MAXN SUPER sont sélectionnables |

## S'il y a encore un problème

Composants manquants : réexécutez les deux commandes de l'étape 2. Pour des problèmes de configuration Super ou de
modes d'alimentation, voir **[Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates)** et **[Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting)**.
Avant de demander de l'aide, rassemblez la sortie de `cat /etc/nv_tegra_release` et de `cat /etc/nv_boot_control.conf`
— le personnel NVIDIA demande cet état (plus `sudo /usr/sbin/nvpmodel -q --verbose`) avant tout
contournement par fichiers de configuration. Support Juxi : **support@juxitech.com** avec votre numéro de commande.

## Sources

- [Configuration du SDK JetPack](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) · [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) — Guide de l'utilisateur du kit de développement Jetson Orin Nano (vérifié le 2026-09-26)
- [Téléchargements et notes de version du SDK JetPack](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-26)
- [Notes de version Jetson Linux 39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) · [Notes de version 39.2 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (vérifié le 2026-09-26)
- [Forum NVIDIA — 25W et MAXN SUPER absents dans JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [problèmes de mode d'alimentation persistants](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [Super Mode qui ne se déverrouille pas](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) (vérifié le 2026-09-26 ; inclut des réponses du personnel NVIDIA)
- [jetson-stats (jtop) sur PyPI](https://pypi.org/project/jetson-stats/) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) (vérifié le 2026-09-26 ; sources communautaires pour l'installation de jtop)

*Statut : brouillon, en attente de révision par cheny. Fondé sur la documentation officielle NVIDIA et des sources de forum
NVIDIA aux dates indiquées ; pas encore vérifié sur matériel physique par Juxi Technology.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est publiée
par Juxi Technology et n'est pas une publication de NVIDIA.
