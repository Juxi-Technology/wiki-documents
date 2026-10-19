---
title: "Commutateur KVM · Présentation du tutoriel"
description: "Un commutateur USB clavier/souris 2 entrées / 3 sorties : un clavier et une souris (et les périphériques) passent d'un ordinateur à l'autre d'une simple pres…"
---

# Commutateur KVM · Présentation du tutoriel

> Produit concerné : commutateur clavier/souris deux ordinateurs **KVM&HUB&TTL** de JUXI Technology (USB 2.0)
> Version v1.0 (2026-10-14) | Le tutoriel est organisé par modules fonctionnels — consultez uniquement ce dont vous avez besoin

---

## Rechercher par module

| Ce que je veux faire | À lire |
|---|---|
| D'abord faire fonctionner l'appareil | Cette page → « Démarrage rapide » |
| Basculer clavier/souris et périphériques entre deux ordinateurs | [01 - Commutation entre deux ordinateurs (bouton et télécommande IR)](/fr/tutorials/accessories/kvm-switch/01-Switching-Between-Two-Computers) |
| L'utiliser comme HUB USB (un vers trois) | [02 - Fonction HUB (un vers trois)](/fr/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three) |
| **Me connecter en Bluetooth depuis le téléphone, envoyer/recevoir des données** | [03 - Bluetooth](/fr/tutorials/accessories/kvm-switch/03-Bluetooth) |
| **Câbler le port série TTL 6 broches, voir les données sur le PC** | [04 - Port série TTL (série sans fil)](/fr/tutorials/accessories/kvm-switch/04-TTL-Serial-Port) |
| **En savoir plus sur le connecteur d'extension 10 broches** | [05 - Connecteur d'extension 10 broches](/fr/tutorials/accessories/kvm-switch/05-10-Pin-Expansion-Header) |
| Contrôler une carte de développement / une machine sans écran | [06 - Machine sans écran (carte de capture + OBS)](/fr/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |
| FAQ et précautions | [07 - FAQ et précautions](/fr/tutorials/accessories/kvm-switch/07-FAQ-and-Precautions) |

## Le produit en une phrase

**Un commutateur USB clavier/souris 2 entrées / 3 sorties** : un clavier et une souris (et les périphériques) passent d'un ordinateur à l'autre d'une simple pression ; HUB USB 3 ports intégré ; plus une **fonction série sans fil** — connectez le port série d'une carte de développement ou d'un capteur au connecteur 6 broches et les données sont transmises simultanément au port série du PC et au téléphone via Bluetooth.

## Interfaces en un coup d'œil

| Emplacement | Nom | Description |
|---|---|---|
| Côté gauche / droit | Ports PC1 / PC2 (Type-C) | Relient les deux ordinateurs |
| Bas | USB-A × 3 | Clavier/souris, clé USB, imprimante, etc. — commutés en bloc |
| Haut | Port d'alimentation (Type-C) | Alimentation auxiliaire (si l'alimentation de l'hôte est insuffisante) |
| Centre | Bouton de commutation | Appui court = commutateur ; appui long = mode Bluetooth |
| En haut à gauche | Récepteur infrarouge | Fonctionne avec la télécommande IR |
| En bas à droite | Port série TTL (6 broches) | Fonction série sans fil (voir 04) |
| En bas à droite | Connecteur 10 broches | Interface d'extension (voir 05) |
| En haut à droite | Module Bluetooth (intégré) | Fonction série sans fil (voir 03) |

**Voyants** : PC1/PC2 (canal actuel) | Alimentation | UART série (clignote lors des échanges) | Bluetooth (s'allume après un appui long)

## Démarrage rapide (5 minutes)

1. Ordinateur A → câble Type-C → port **PC1** ; ordinateur B → port **PC2** (un seul ordinateur suffit aussi — il s'agit alors d'un simple HUB USB) ;
2. Branchez le clavier/la souris (ou le récepteur sans fil) sur n'importe quel port **USB-A** ;
3. Appuyez sur le bouton de commutation et vérifiez avec le **voyant PC1/PC2** à quel ordinateur vous êtes connecté ;
4. Si l'alimentation de l'hôte est insuffisante, branchez également une alimentation Type-C sur le **port d'alimentation**.

(Illustration : ressource du tutoriel 01 – Disposition des fonctions)

## Deux avertissements importants

- Ce produit **ne commute pas la vidéo** : chaque ordinateur utilise son propre écran. Pour une machine sans écran, utilisez la solution carte de capture (voir 06) ;
- Ce produit est en **USB 2.0** : parfaitement adapté aux claviers/souris, imprimantes, clés USB et dongles ; pour le stockage rapide, connectez directement à l'ordinateur.

---

*(Pour les détails de chaque module, cliquez sur l'entrée correspondante du tableau « Rechercher par module ».)*

<RelatedProducts slugs="kvm-switch" />
