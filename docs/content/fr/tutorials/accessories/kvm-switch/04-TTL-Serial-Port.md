---
title: "04 · Port série TTL (série sans fil)"
description: "Le port TTL 6 broches est un port de passerelle série : reliez une carte de développement, un capteur, etc."
---

# 04 · Port série TTL (série sans fil)

> [← Retour à la présentation](/fr/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produit concerné : JUXI Technology KVM&HUB&TTL

## De quoi s'agit-il

Le port TTL 6 broches est un **port de passerelle série** : reliez une carte de développement, un capteur, etc., et ses données série sont émises « simultanément » à deux endroits (bidirectionnel) :

```
                ┌─→ Port série du PC (USB ; reconnu par le système comme "USB-BLE-SERIAL CH9143")
Périphérique externe → 6 broches ┤
                └─→ Bluetooth sans fil (appli BleUart du téléphone, voir 03)
```

**Référence mesurée** : avec un capteur IMU connecté, le port série du PC et le Bluetooth ont reçu simultanément et stablement environ 1650 octets/seconde.

## Brochage et câblage

De gauche à droite : `GND` `RXD` `TXD` `TNOW` `3V3` `5V`

| Broche | Description | Câblage |
|---|---|---|
| GND | Masse | Relier au GND du périphérique externe (**obligatoire**) |
| RXD | Réception locale | Relier au **TXD** du périphérique externe (croisé) |
| TXD | Émission locale | Relier au **RXD** du périphérique externe (croisé) |
| TNOW | Indicateur de sens d'émission | **Laisser non connecté** |
| 3V3 | Sortie d'alimentation 3,3 V | Alimente les périphériques à faible consommation (au choix avec 5V) |
| 5V | Sortie d'alimentation 5 V | Alimente les périphériques à faible consommation (au choix avec 3V3) |

**Points essentiels** : TX/RX doivent être **croisés** ; niveau logique **3,3 V** ; les broches d'alimentation sont des **sorties** — n'y injectez jamais d'alimentation ; n'alimentez que des modules à faible consommation.

(Illustration : ressource du tutoriel 12 – Exemple de câblage TTL)

## Utilisation sur ordinateur

1. Connectez ce produit à l'ordinateur en Type-C (PC1 ou PC2, au choix) ;
2. Le système reconnaît automatiquement le port série **`USB-BLE-SERIAL CH9143`** (sans pilote sous Windows 10/11) ;
3. Ouvrez-le avec n'importe quel outil série ; paramètres : **115200, 8N1** ;
4. Les données du périphérique externe arrivent en temps réel (vous pouvez aussi lui en envoyer).

## Connexion aux cartes de développement (Raspberry Pi / Jetson)

Niveau 3,3 V, connexion directe possible (câblage croisé, GND relié) :

| Ce produit | Raspberry Pi | Jetson (série Orin, 40 broches) |
|---|---|---|
| RXD | Pin8 (GPIO14 / TXD) | Pin8 (UART1_TXD) |
| TXD | Pin10 (GPIO15 / RXD) | Pin10 (UART1_RXD) |
| GND | N'importe quel GND (ex. Pin9) | N'importe quel GND (ex. Pin9) |

> Sur Raspberry Pi, activez le port série dans `raspi-config` ; sur Jetson, activez d'abord l'UART 40 broches.
> Scénario typique : série de la carte → KVM → taper des commandes sur le PC et lire les journaux, tandis que le téléphone les voit aussi en Bluetooth (débogage sans fil).

(Illustration : ressource du tutoriel 10 – Brochage Jetson, 11 – Brochage Raspberry Pi)

## Dépannage : aucune donnée série ?

Vérifiez dans l'ordre :
1. Le TX/RX du périphérique externe est-il **croisé** et le GND relié ?
2. La vitesse du périphérique externe est-elle **115200** ?
3. Le périphérique externe est-il alimenté (les broches 5V/3V3 de ce produit peuvent l'alimenter) ?
4. Le port série du PC est-il occupé par un autre logiciel ? Lors du passage à l'autre ordinateur, le port disparaît brièvement (normal).

<RelatedProducts slugs="kvm-switch" />
