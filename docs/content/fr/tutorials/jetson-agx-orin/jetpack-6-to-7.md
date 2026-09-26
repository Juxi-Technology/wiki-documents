---
title: Migration de JetPack 6.x vers JetPack 7.2
sidebar_label: Migrer depuis JetPack 6.x
slug: /migration/jetpack-6-to-7
description: >-
  Ce qui change entre JetPack 6.x et JetPack 7.2.1 sur le kit de développement
  Jetson AGX Orin, ce qui doit être reconstruit, et un ordre de migration
  recommandé.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: its component table lags on some rows (VPI/PVA still show 7.2 values)
  - source: https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/
    checked: 2026-09-23
    note: secondary source — used for migration-topic organization only
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
    note: Isaac ROS support status — supersedes the "coming soon" note in the migration checklist
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 (not the 13.2.1 shown on the JetPack downloads page) per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# Migration de JetPack 6.x vers JetPack 7.2

Cette page s'adresse aux utilisateurs existants de JetPack 6.x sur le kit de
développement AGX Orin.
Nouveaux kits : commencez plutôt par [Démarrage rapide](/fr/tutorials/jetson-agx-orin/quick-start).

## Ce qui change

| Couche | Période JetPack 6.x | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (la version 6.2 utilisait 36.4.x) | **39.2.1** |
| Système d'exploitation / système de fichiers racine | Ubuntu 22.04 | **Ubuntu 24.04** |
| Noyau Linux | 5.15 | **6.8** |
| CUDA | 12.x | **13.2.2** |
| TensorRT | 10.x (période 6.x) | **10.16.2** |

> Les valeurs de la colonne JetPack 6.x sont indicatives (période JetPack 6.2).
> Vérifiez **vos** versions actuelles exactes avec `cat /etc/nv_tegra_release`
> avant de planifier, et consultez l'[archive JetPack](https://developer.nvidia.com/embedded/jetpack-archive)
> de NVIDIA pour les détails par version.

## Nouveautés pour Orin dans la série 7.2

Extrait des notes de version de Jetson Linux 39.2 :

- La **famille Jetson Orin rejoint la série logicielle JetPack 7** (même génération que Thor).
- **Installation ISO unifiée** — une méthode d'installation par clé USB, sans PC hôte requis.
- **NemoClaw** : installation en une seule commande pour les workflows d'IA agentique.
- **Recettes Yocto/OpenEmbedded** officielles (OE4T) pour des images de production personnalisées.
- Pile caméra : **SIPL API v2.0** (GMSL et CoE) — attention, cette version comporte des **changements d'ABI** : les pilotes UDDF compilés pour JetPack 7.1 doivent être reconstruits avec les en-têtes de JetPack 7.2.
- *(Le mode Super / MAXN_SUPER de l'AGX Orin 32GB est spécifique au 32GB et ne s'applique pas au kit 64GB. Les changements SBSA et MIG concernent le Jetson Thor.)*

## Ce qui ne peut pas être conservé — prévoir une reconstruction

- **Modules noyau hors arbre (out-of-tree)** — le noyau est passé à 6.8 ; les modules doivent être reconstruits avec les nouveaux en-têtes.
- **Pilotes caméra et personnalisations du device-tree** — à reconstruire pour 39.2 ; SIPL 2.0 apporte également des changements d'ABI pour les pilotes UDDF.
- **Moteurs TensorRT** — les moteurs sérialisés sont liés à la version de TensorRT ; reconstruisez avec TensorRT 10.16.2 sur la cible.
- **Binaires CUDA** — à reconstruire avec CUDA 13 ; ne comptez pas sur une compatibilité des binaires 12.x.
- **Conteneurs** — passez à des images compatibles JetPack 7 (par exemple, les conteneurs NGC mis à jour).
- **Environnements Python et services système** — à recréer pour Ubuntu 24.04 (les noms de paquets, les dépôts et les versions d'interpréteur ont changé).

## Ordre de migration recommandé

1. **Confirmez que votre pile logicielle est prise en charge** sur 7.2.1 *avant* d'effacer quoi que ce soit — vérifiez chaque composant dont vous dépendez par rapport à la [liste des composants JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) de NVIDIA. Cette page peut être en retard pour les SDK publiés indépendamment : elle indique encore Isaac ROS comme « bientôt disponible », alors qu'Isaac ROS 4.6.0 a ajouté la prise en charge de Jetson Orin + JetPack 7.2 (voir [Robotique (état des lieux)](/fr/tutorials/jetson-agx-orin/robotics)).
2. **Sauvegardez :** les données applicatives, les fichiers d'étalonnage des capteurs, les volumes de conteneurs, les sources device-tree, les scripts de compilation TensorRT et les modèles ONNX.
3. **Flashez JetPack 7.2.1** ([Flashage et mises à jour](/fr/tutorials/jetson-agx-orin/flashing-and-updates)) et validez : le démarrage, le stockage, le réseau, et le fait que le mode Force Recovery fonctionne toujours.
4. **Restaurez les périphériques :** Wi-Fi, caméras, CAN ou pilotes de bus de terrain — reconstruits pour le noyau 6.8.
5. **Reconstruisez** les applications CUDA, les plugins TensorRT et les moteurs TensorRT **sur la cible**.
6. **Validez d'abord votre application dans son mode d'alimentation d'origine** ; n'essayez les autres modes de performance qu'ensuite.
7. **Enregistrez des valeurs de référence :** utilisation de la mémoire, températures, consommation, latence, débit — avant de passer en production.

## Retour arrière

- Avant d'effacer, conservez une **copie de référence fonctionnelle** de votre système actuel (une image NVMe/eMMC de rechange, ou au minimum les données de l'étape 2).
- L'installateur ISO peut installer n'importe quelle version de L4T dont vous disposez des supports — conservez la clé USB d'installation précédente si vous risquez de devoir revenir en arrière.
- Pour les parcs d'appareils : déployez par étapes et privilégiez les conceptions dotées d'un chemin de récupération indépendant (clé USB de récupération + image de sauvegarde) plutôt que les mises à niveau sur place.

## Sources

- [Notes de version de Jetson Linux 39.2.0 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — *What's New*, problèmes connus (vérifié le 2026-09-23)
- [Téléchargements du SDK JetPack](https://developer.nvidia.com/embedded/jetpack/downloads) (vérifié le 2026-09-23) — ⚠️ son tableau des composants est en retard sur certaines lignes ; pour les versions qu'un système 7.2.1 installe réellement, voir [Vérifier votre système](/fr/tutorials/jetson-agx-orin/verify-your-system)
- [Seeed Studio JetPack 7.2 Resource Hub](https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/) — source secondaire ; utilisée pour l'organisation des thèmes de migration (vérifié le 2026-09-23)

*Statut : brouillon, en attente de relecture par cheny. Fondé sur la
documentation officielle NVIDIA à la date indiquée ; pas encore vérifié sur
matériel physique par Juxi Technology. La liste de reconstruction décrit des
conséquences standard de la plateforme (changements de version du
noyau/TensorRT/CUDA) — validez-la par rapport à votre propre pile.*

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
