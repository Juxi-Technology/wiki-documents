---
title: Interfaces et disposition matérielle
sidebar_label: Interfaces et disposition matérielle
slug: /product/interfaces
description: >-
  Schéma annoté et référence des connecteurs du kit de développement NVIDIA
  Jetson Orin Nano Super — chaque port, logement, connecteur et commande, le
  logement microSD sous le module, les connecteurs caméra, l'alimentation et la
  console série.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697
    checked: 2026-09-26
review_owner: cheny
---

# Interfaces et disposition matérielle

Le kit se compose de deux cartes : le **module Jetson Orin Nano** (P3767) sur la
**carte porteuse de référence** (P3768) ; le kit complet est le P3766. Cette page
couvre les connecteurs et les commandes, en utilisant les repères officiels de
NVIDIA (1–12).

## Vue numérotée — pièces annotées

![Vue numérotée du kit de développement](/images/jetson-orin-nano/jetson-orin-nano-qtr_numbered.png)
*La vue numérotée officielle — les repères 1–12 de NVIDIA.*

| # | Pièce | Remarques |
|---|---|---|
| 1 | Logement de carte microSD | Sur la **face inférieure du module** — voir ci-dessous |
| 2 | Connecteur d'extension 40 broches | UART, SPI, I2S, I2C, GPIO |
| 3 | LED d'alimentation | Verte ; s'allume lorsque le kit est sous tension |
| 4 | Port USB-C | Modes hôte, périphérique et USB recovery ; pas de sortie vidéo |
| 5 | Port Ethernet Gigabit | RJ45 |
| 6 | USB 3.2 Type-A ×4 | 10 Gbps ; deux connecteurs doubles empilés |
| 7 | Sortie DisplayPort | **La seule sortie d'affichage du kit** |
| 8 | Prise d'alimentation DC | Prise cylindrique 5,5 mm × 2,5 mm |
| 9 | Connecteurs caméra MIPI CSI ×2 | 22 broches, pas de 0,5 mm |
| 10 | Logement M.2 Key-M (2280) | PCIe 3.0 ×4 — pour un SSD NVMe |
| 11 | Logement M.2 Key-M (2230) | PCIe 3.0 ×2 — pour un SSD NVMe |
| 12 | Logement M.2 Key-E (2230) | Occupé par le module sans fil fourni |

> **Trois choses à savoir avant tout :**
> - **Stockage :** pas d'eMMC et **aucun stockage dans la boîte**. Ajoutez une carte microSD ou un SSD NVMe.
> - **Logement microSD :** sur la **face inférieure du module** — voir ci-dessous.
> - **Affichage :** le DisplayPort est la *seule* sortie d'affichage — pas de HDMI, pas de vidéo via USB-C.

## Logement microSD — face inférieure du module

![Le logement microSD sur la face inférieure du module](/images/jetson-orin-nano/jetson-orin-nano-dev-kit-sd-slot.jpg)
*La carte s'insère sur la **face inférieure du module** — image NVIDIA, avec un encart agrandi.*

> **Attention :** le logement microSD (repère 1) est sur la **face inférieure du
> module**, pas sur la carte porteuse. C'est le détail physique le plus souvent
> manqué de ce kit. Insérez la carte avant de démarrer l'installateur.

- Le kit démarre depuis la carte microSD lorsqu'une carte est présente ; 64 GB UHS-1 ou plus recommandé.
- Si l'installateur n'affiche pas la carte, la consigne de dépannage de NVIDIA
  est de vérifier que la carte est bien enfoncée dans le logement du module.
- JetPack 7.2 et versions ultérieures n'ont pas d'images pour carte SD. Pour changer ce qui est installé,
  utilisez une méthode d'installation prise en charge — voir **[Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Options de stockage

- **microSD** (face inférieure du module, repère 1) — le stockage principal du module.
- **SSD NVMe** — taille 2280 ou 2230 dans les logements M.2 Key-M (repères 10 et 11, ci-dessous).
- **Clé USB** — sur USB-C ou Type-A ; l'ordre de démarrage se règle dans le gestionnaire de démarrage UEFI.

Voir **[Démarrage rapide](/fr/tutorials/jetson-orin-nano/quick-start)** pour ce qu'il faut acheter et le déroulé du premier démarrage.

## USB

| Port | Vitesse | Modes | Remarques |
|---|---|---|---|
| USB 3.2 Type-A ×4 (repère 6) | USB 3.2 Gen 2, 10 Gbps | Hôte uniquement | Deux connecteurs doubles empilés ; VBUS limité à 3 A par connecteur empilé |
| USB-C (repère 4) | USB 3.2 Type-C | Hôte, périphérique, USB Recovery | Données uniquement — ce port ne sort pas de vidéo |

En **mode périphérique**, le port USB-C présente le kit à un PC hôte comme :

- un périphérique de stockage de masse contenant le fichier **L4T-README** ;
- un périphérique série USB ;
- une liaison Ethernet USB (RNDIS) — le Jetson est à l'adresse **192.168.55.1**.

## Sortie DisplayPort

- Une seule sortie (repère 7) : **DisplayPort 1.2 avec MST**. Il n'y a pas de port
  HDMI, et le port USB-C ne transporte pas de vidéo.
- Pour un écran HDMI, utilisez un adaptateur DisplayPort vers HDMI.
- S'il n'y a pas de sortie d'affichage, connectez l'écran directement — pas de
  commutateur KVM ni de chaîne d'adaptateurs.

## Ethernet

- 1× Ethernet Gigabit (RJ45), repère 5. Le kit n'a pas de port 10 GbE.

## Logements M.2

| Repère | Logement | Taille | Électrique | Accueille |
|---|---|---|---|---|
| 10 | M.2 Key-M | 2280 | PCIe 3.0 ×4 | SSD NVMe |
| 11 | M.2 Key-M | 2230 | PCIe 3.0 ×2 | SSD NVMe |
| 12 | M.2 Key-E | 2230 | — | Le module sans fil fourni (occupé) |

### Module sans fil

- Le logement Key-E est livré **occupé**. NVIDIA ne décrit la carte que comme un
  « contrôleur d'interface réseau sans fil 802.11ac/ab/gn » — aucun nom de puce.
- Des rapports de la communauté (non confirmés) identifient la carte d'origine comme un **Realtek
  RTL8822CE** (module AzureWave, ID PCI 10ec:c822). C'est une information
  communautaire, pas une déclaration de NVIDIA.
- Les modèles NVMe et modules Key-E officiellement pris en charge figurent dans la liste « Jetson
  supported components information » du Jetson Download Center, pas sur
  une page publique. Vérifiez une référence à cet endroit avant d'acheter.
- Si la carte ne voit pas votre réseau — par exemple un routeur 6 GHz utilisant
  MBSSID — voir **[Dépannage → Le Wi-Fi ne voit pas le réseau](/fr/tutorials/jetson-orin-nano/troubleshooting)**.

## Connecteurs caméra CSI

- Deux connecteurs (repère 9) : 22 positions, pas de 0,5 mm, nappe à contacts inférieurs.
- **CAM0 :** CSI 1×2 voie. **CAM1 :** CSI 1×2 voie ou 1×4 voie.
- Une caméra 15 broches (par exemple la Raspberry Pi Camera Module v2) nécessite un câble 15 vers 22 broches.

## Connecteur d'extension 40 broches (repère 2)

- Interfaces GPIO et périphériques : UART, SPI, I2S, I2C, GPIO.
- Pour les affectations de broches, les niveaux de tension et les limites électriques, NVIDIA renvoie
  à la *Jetson Orin Nano Developer Kit Carrier Board Specification* (Jetson
  Download Center). Ce document n'était pas accessible pour cette page.

## Connecteur des boutons (12 broches)

Le connecteur des boutons porte les fonctions de console série, de réinitialisation et de force recovery.

| Broches | Fonction |
|---|---|
| 3 (RXD), 4 (TXD), 7 (GND) | Console série (UART) |
| 9 + 10 | Mode Force Recovery — reliez les broches, puis mettez sous tension |
| 7 + 8 | Réinitialisation — reliez les broches pendant que le système est sous tension |
| cavalier | Définit le comportement de mise sous tension automatique |

### Console série

- Connectez un adaptateur série USB-TTL : TX de l'adaptateur vers la broche 3 (RXD), RX vers la broche 4 (TXD), GND vers la broche 7.
- C'est la solution de repli sans écran. Voir **[Dépannage](/fr/tutorials/jetson-orin-nano/troubleshooting)**
  pour savoir comment capturer les journaux de démarrage.

### Force Recovery et réinitialisation

- **Mode Force Recovery :** reliez les broches 9 et 10, puis mettez le kit sous tension.
- **Réinitialisation :** kit sous tension, reliez les broches 7 et 8.
- Le mode Force Recovery sert aux procédures de flashage — voir **[Flashage et mises à jour](/fr/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Alimentation

- **Prise d'alimentation DC (repère 8) :** prise cylindrique 5,5 mm × 2,5 mm ; utilisez le bloc
  d'alimentation 19 V fourni.
- **Mise sous tension automatique :** par défaut, le kit s'allume dès que l'alimentation DC est
  connectée. Un cavalier sur le connecteur des boutons modifie ce comportement.
- **LED d'alimentation (repère 3) :** une LED verte à côté du connecteur USB-C s'allume lorsque
  le kit est sous tension.
- Les pages vérifiées de NVIDIA n'indiquent ni l'intensité nominale du bloc d'alimentation fourni ni
  la polarité de la prise. Pour un bloc d'alimentation tiers, confirmez les deux avec votre fournisseur.

## Connecteur de ventilateur

- La carte porteuse possède un connecteur de ventilateur à 4 broches.
- Le module est livré avec un dissipateur thermique ; les images officielles montrent le ventilateur intégré
  au carénage du dissipateur. Le connecteur est destiné aux solutions thermiques de remplacement.
- Les pages vérifiées de NVIDIA n'indiquent ni la plage de température de fonctionnement du module ni les
  limites Tj — celles-ci figurent dans la *Jetson Orin Nano Series Data Sheet* et
  le *Orin NX/Orin Nano Thermal Design Guide*, tous deux dans le Download Center
  à accès authentifié.

## Dimensions

- **Module :** 69,6 mm × 45 mm, connecteur SO-DIMM 260 broches.
- **Kit :** deux chiffres officiels se contredisent — la fiche technique (déc. 2024) indique
  **103 mm × 90,5 mm × 34,77 mm** ; le tableau de la gamme produit de NVIDIA indique
  **100 mm × 79 mm × 21 mm**. Les deux définissent la hauteur comme incluant les pieds, la carte porteuse,
  le module et la solution thermique.
- NVIDIA n'a pas publié de réconciliation. Une explication de revendeur (kit sur
  son socle vs carte porteuse nue) est **non vérifiée**.

> **Remarque de Juxi :** confirmez les dimensions sur la fiche technique actuelle de NVIDIA avant de concevoir un boîtier.

## Sources

- [Disposition matérielle — Guide de l'utilisateur du kit de développement Jetson Orin Nano](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (vérifié le 2026-09-26)
- [Démarrage rapide — Guide de l'utilisateur du kit de développement Jetson Orin Nano](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (vérifié le 2026-09-26)
- [How-To — Guide de l'utilisateur du kit de développement Jetson Orin Nano](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (vérifié le 2026-09-26)
- [Dépannage — Guide de l'utilisateur du kit de développement Jetson Orin Nano](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) (vérifié le 2026-09-26)
- [Fiche technique du kit de développement Jetson Orin Nano Super (PDF, déc. 2024)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (vérifié le 2026-09-26)
- [Série Jetson Orin NX/Nano — Adaptation et mise en route du module, Guide du développeur L4T r39.2](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (vérifié le 2026-09-26)
- [Gamme Jetson Orin — developer.nvidia.com](https://developer.nvidia.com/embedded/jetson-orin) (vérifié le 2026-09-26)
- [Forums développeurs NVIDIA — « Slow Wi-Fi on Orin Nano DevKit (RTL8822CE) », fil communautaire](https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697) (vérifié le 2026-09-26)

*Statut : brouillon, en attente de révision par cheny. Fondé sur la documentation officielle de NVIDIA
aux dates indiquées ; pas encore vérifié sur matériel physique par Juxi Technology.*

**Crédits images :** les schémas de disposition proviennent du *Jetson Orin
Nano Developer Kit User Guide* officiel de NVIDIA (téléchargé le 2026-09-26), © NVIDIA Corporation.

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est publiée
par Juxi Technology et n'est pas une publication de NVIDIA.
