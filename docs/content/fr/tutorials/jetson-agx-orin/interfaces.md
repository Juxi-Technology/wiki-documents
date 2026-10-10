---
title: Interfaces et disposition matérielle
sidebar_label: Interfaces et disposition matérielle
slug: /product/interfaces
description: >-
  Schéma annoté et référence des connecteurs du kit de développement NVIDIA
  Jetson AGX Orin — boutons, ports, connecteurs de la carte porteuse, options
  d'affichage et de stockage, le connecteur 40 broches et le connecteur
  d'automatisation.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-23
review_owner: cheny
---

# Interfaces et disposition matérielle

Deux systèmes de référence coexistent pour le kit de développement : les
**étiquettes numérotées (0–12) sur les vues latérales**, utilisées par le guide
officiel de NVIDIA et par cette page, et les **numéros de connecteurs de la
carte porteuse (numéros J)** imprimés sur le PCB. Gardez les deux sous la main —
le reste de nos guides y fait référence.

## Vues latérales — pièces annotées

![Kit de développement, vue de l'angle bouton et entrée DC](/images/jetson-agx-orin/jaodk_labeled_01.png)
![Kit de développement, vue de l'angle cache PCIe et 40 broches](/images/jetson-agx-orin/jaodk_labeled_02.png)

| # | Pièce | Remarques |
|---|---|---|
| 0 | LED blanche | Indicateur d'alimentation |
| 1 | Bouton d'alimentation | |
| 2 | Bouton Force Recovery | Utilisé pour les modes de récupération / flashage |
| 3 | Bouton de réinitialisation | |
| 4 | Port USB Type-C | DFP uniquement (connecter des périphériques) |
| 5 | Prise d'alimentation DC | Prise cylindrique — voir J41 pour les spécifications |
| 6 | Port Ethernet | |
| 7 | USB Type-A ×2 | USB 3.2 Gen 2 |
| 8 | Sortie DisplayPort | **La seule interface d'affichage du kit** |
| 9 | Port USB micro-B | Pour le débogage |
| 10 | Port USB Type-C | Flashage et données (UFP et DFP) |
| 11 | Connecteur 40 broches | |
| 12 | USB Type-A ×2 | USB 3.2 Gen 1 |

## Carte porteuse — connecteurs

| Repère | Connecteur | Spécification / remarques |
|---|---|---|
| DS2 | LED blanche | |
| S1 / S2 / S3 | Boutons d'alimentation / de réinitialisation / Force Recovery | |
| J24 | USB Type-C (au-dessus de la prise DC) | DFP uniquement, USB 3.2 Gen 2 — **c'est ici que se connecte l'alimentation USB-C fournie** |
| J41 | Prise d'alimentation DC | 5,5 mm OD, 2,5 mm ID, positif au centre |
| J17 | Ethernet | Jusqu'à 10GBASE-T |
| J33 | USB Type-A ×2 (à côté de l'Ethernet) | USB 3.2 Gen 2 |
| J18 | Sortie DisplayPort | Compatible MST |
| J26 | USB micro-B | UART de débogage |
| J40 | USB Type-C (à côté du connecteur 40 broches) | UFP et DFP — **le port utilisé pour se connecter à un PC hôte pour SDK Manager** |
| J30 | Connecteur 40 broches | La broche 1 est marquée par un triangle blanc sur le PCB |
| J42 | Connecteur d'automatisation | Mise sous tension automatique, wake-on-LAN, déclenchement du throttling (broches ci-dessous) |
| J13 | Connecteur de batterie de sauvegarde RTC | |
| J509 | Connecteur caméra | |
| J502 | Connecteur de débogage JTAG | |
| J505 | Logement M.2 E-Key | Contient généralement le module Wi-Fi |
| J511 | Connecteur HD Audio | |
| J1 | Logement M.2 M-Key | Pour un SSD NVMe |
| J10 | Logement de carte microSD | UHS-1 |
| J3 | Connecteur du module Jetson | 699 broches |
| J6 | Connecteur PCIe x16 | PCIe 4.0 ×8 électriquement |
| J9 | Connecteur de ventilateur | 4 broches, pas de 1,25 mm |

> **Les trois questions qui reviennent le plus souvent :**
> - **Affichage :** le DisplayPort (J18) est la *seule* sortie d'affichage — il
>   n'y a ni port HDMI ni DisplayPort via USB-C. Pour un écran HDMI, utilisez un
>   adaptateur ou un câble actif DP→HDMI.
> - **Alimentation :** l'alimentation USB-C fournie se connecte sur **J24** (le
>   port USB-C au-dessus de la prise DC). Une entrée séparée à prise
>   cylindrique (J41) est disponible si vous fournissez votre propre
>   alimentation.
> - **Connexion au PC hôte :** pour SDK Manager ou une console série, utilisez
>   **J40** (le port USB-C à côté du connecteur 40 broches) — pas J24.

## Sortie DisplayPort

- Prend en charge DP SST, DP MST (jusqu'à 2 écrans externes) et DP DSC
- Résolution maximale : 8K@30 / 4K@120 (avec ou sans DSC)
- Formats de sortie : RGB 8/10 bpc, YUV444 8/10 bpc

## Options de stockage

- **Par défaut :** mémoire flash eMMC sur le module
- **En option :** SSD NVMe (M.2 M-Key, J1) · carte microSD (J10, UHS-1) · clé USB

L'installateur ISO de Jetson peut installer le système sur eMMC ou NVMe ; SDK
Manager peut flasher le BSP L4T de base sur n'importe quel support de stockage
pris en charge.

## Connecteur 40 broches (J30)

![Brochage du connecteur 40 broches](/images/jetson-agx-orin/jao_cbspec_figure_3-4_black-bg.png)
*Brochage du connecteur 40 broches — issu de la Carrier Board Specification de NVIDIA.*

![Repérage de la broche 1 sur le connecteur 40 broches](/images/jetson-agx-orin/jao_40pin_pin1_marking.png)
*La broche 1 est marquée par un triangle blanc sur le PCB.*

## Connecteur d'automatisation (J42)

Utilisé pour le câblage de production et d'automatisation :

- Broches 1, 12 : GND
- Broches 2, 3, 4 : entrées, même fonction que les boutons Force Recovery, de réinitialisation et d'alimentation
- Broches 5–6 : ouvert = mise sous tension automatique désactivée ; fermé = mise sous tension automatique activée
- Broche 7 : sortie CVB_STBY — indique si le module est en veille
- Broche 8 : entrée SYSTEM_OC — déclenche le throttling Tegra
- Broches 9–10 : ouvert = réveil/démarrage sur LAN depuis l'état éteint désactivé ; fermé = activé
- Broche 11 : JTAG_TRST — réinitialisation de test JTAG

## Sources

- [Disposition matérielle — Guide de l'utilisateur du kit de développement Jetson AGX Orin](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) (vérifié le 2026-09-23)
- Pour les détails de la carte porteuse, consultez la *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification* (liée depuis la [page de téléchargements](https://developer.nvidia.com/embedded/downloads) de NVIDIA)

*Statut : relu le 2026-10-11. Les étapes et valeurs
ci-dessus s'appuient sur la documentation officielle de NVIDIA à la date
indiquée ; pas encore vérifiées sur matériel physique par Juxi Technology.*

**Crédits images :** les schémas de disposition et les images de brochage
proviennent du *Jetson AGX Orin Developer Kit User Guide* et de la *Carrier
Board Specification* officiels de NVIDIA (téléchargés le 2026-09-23) et restent
© NVIDIA Corporation.

---

NVIDIA® et Jetson™ sont des marques déposées de NVIDIA Corporation. Cette page
est publiée par Juxi Technology et n'est pas une publication officielle de
NVIDIA.
