---
title: Dépannage
sidebar_label: Dépannage
slug: /support/troubleshooting
description: >-
  Dépannage guidé par les symptômes pour le kit de développement Jetson AGX
  Orin — démarrage et affichage, alimentation, flashage et problèmes connus,
  fondé sur la documentation officielle de NVIDIA.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# Dépannage

Les problèmes sont regroupés par symptôme — trouvez le vôtre, puis suivez les
vérifications dans l'ordre. Tout ici s'appuie sur la documentation officielle de
NVIDIA (sources en bas de page). Pour tout ce qui n'est pas couvert, voir
*Obtenir de l'aide* à la fin.

## Le kit ne s'allume pas

1. L'alimentation USB-C fournie doit être branchée sur le **port USB-C au-dessus de la prise DC** (J24) — pas sur le port à côté du connecteur 40 broches.
2. Le kit s'allume automatiquement lorsque l'alimentation est connectée ; sinon, appuyez sur le **bouton d'alimentation**.
3. Si vous utilisez votre propre alimentation via la prise cylindrique (J41) : 5,5 mm OD, 2,5 mm ID, **positif au centre**.

## Pas de sortie d'affichage / l'écran reste noir

- **Le DisplayPort est la seule sortie d'affichage.** Il n'y a ni port HDMI ni DisplayPort via USB-C. Pour un écran HDMI, utilisez un adaptateur ou un câble DP→HDMI **actif**.
- Le premier démarrage peut prendre **jusqu'à une minute** avant que l'écran ne s'allume.
- Si vous utilisez un **switch KVM**, connectez plutôt le moniteur directement au kit — les appareils KVM sont une source connue de problèmes d'écran noir, aussi bien au démarrage normal que pendant l'installation ISO (NVIDIA le mentionne dans le guide de configuration).
- Vous démarrez avec une configuration d'alimentation problématique ? Voir *Le système plante au redémarrage avec un écran connecté* ci-dessous — essayez de démarrer **sans** écran connecté, puis rebranchez-le après le démarrage.

## Après l'installation ISO, le kit démarre sur l'ancien système

Retirez la clé USB d'installation après l'installation. Si la clé reste
insérée, le kit risque de démarrer à nouveau dessus au lieu du système
fraîchement installé. (Recommandation officielle.)

## Flashage — problèmes avec la Jetson ISO

- **Le kit ne démarre pas depuis la clé USB :** ouvrez le **gestionnaire d'amorçage UEFI** pendant le démarrage et sélectionnez le lecteur USB.
- **Une invite de micrologiciel QSPI apparaît :** appuyez sur **`Y`**. Cette mise à jour de capsule est requise pour la compatibilité et s'exécute deux fois. Si vous manquez l'invite ou si vous n'êtes pas sûr qu'elle se soit terminée, **redémarrez l'installation** et confirmez-la. Ignorer cette étape entraîne des problèmes d'installation (problème connu 6266271 des notes de version NVIDIA).
- **Mon kit est plus ancien que L4T r35.5 :** la méthode ISO nécessite un BSP installé en r35.5 ou version ultérieure. Utilisez d'abord les méthodes via PC hôte (SDK Manager ou `flash.sh`) pour passer en r35.5+ — voir [Flashage et mises à jour](/fr/tutorials/jetson-agx-orin/flashing-and-updates).

## Flashage — problèmes avec SDK Manager

- **Appareil non détecté :** vérifiez, dans l'ordre —
  1. Le câble est branché sur le **port USB-C à côté du connecteur 40 broches** (port 10 / J40), pas sur le port d'alimentation ;
  2. Le kit est bien entré en **mode Force Recovery** : maintenez le **bouton Force Recovery central** enfoncé pendant que vous insérez la prise d'alimentation ;
  3. Le PC hôte répond aux exigences : Ubuntu Desktop 20.04/22.04 (x86_64), 8 Go de RAM, 25 Go d'espace disque libre, un compte NVIDIA Developer Program connecté. (Les notes de version L4T 39.2 indiquent Ubuntu 24.04/22.04 comme distributions hôtes pour le flashage — consultez la page des exigences système de SDK Manager pour la liste à jour.)
- **Je veux flasher vers NVMe / microSD / clé USB :** l'installateur ISO prend en charge l'eMMC et le NVMe ; les autres cibles nécessitent SDK Manager ou le script de flashage (PC hôte).

## Le système plante au redémarrage avec un écran connecté (AGX Orin 64GB, mode 15W)

Problème connu **6236259** des notes de version NVIDIA : sur les plateformes
AGX Orin, abaisser la fréquence EMC sous son maximum (ce qui se produit dans
les modes basse consommation tels que 15W) pendant l'initialisation de systemd
peut faire planter le système au redémarrage — surtout avec un écran connecté.
Solution de contournement selon NVIDIA :

1. Avant de redémarrer, passez en mode d'alimentation **MAXN** (restaure la fréquence EMC à Fmax).
2. Une fois le système redémarré, appliquez le mode d'alimentation souhaité.
3. S'il a redémarré alors qu'il était dans le mode problématique : débranchez l'écran, démarrez, puis rebranchez l'écran après l'initialisation.

## Réseau et sans fil (notes après flashage)

- **Impossible de se connecter en 6 GHz / WPA3 juste après le flashage :** réinitialisez l'appareil et réessayez (signalé comme corrigé dans L4T 39.2.0 ; la note de réinitialisation s'applique toujours aux unités flashées avec des images plus anciennes).
- **Certains points d'accès Wi-Fi manquent lors des scans (environnements chargés) :** augmentez le tampon de scan — `wpa_cli set bss_max_count 500` (tiré de la section des problèmes corrigés des notes de version).

## Problèmes connus au-delà de cette page

Avant de pousser le débogage à fond, consultez la section **Known Issues** des
notes de version actuelles — elle couvre les éléments généraux du système, la
caméra, le multimédia, les graphiques, la connectivité, l'affichage et la pile
de calcul :

- [Notes de version Jetson Linux 39.2.0 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)

## Obtenir de l'aide

- **[NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70)** — communauté officielle ; faites une recherche avant de publier, et incluez la sortie de `cat /etc/nv_tegra_release`.
- **Support de Juxi Technology** — **support@juxitech.com** pour l'assistance technique, ainsi que pour les questions de commande, de garantie et de RMA. Pour accélérer le traitement, incluez votre numéro de commande et la sortie de `cat /etc/nv_tegra_release`. (Ventes : sales@juxitech.com · Questions produits : pe@juxitech.com)

## Sources

- [Démarrage rapide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [Installation du BSP](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [Disposition matérielle](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) — Guide de l'utilisateur du kit de développement Jetson AGX Orin (vérifié le 2026-09-23)
- [Notes de version Jetson Linux 39.2.0 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (vérifié le 2026-09-23)

*Statut : brouillon, en attente de révision par cheny. Les comportements
spécifiques au matériel signalés par les clients peuvent différer ; mettez à
jour cette page au fur et à mesure des retours terrain.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est publiée
par Juxi Technology et n'est pas une publication de NVIDIA.
