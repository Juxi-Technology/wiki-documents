---
title: "01 · Commutation entre deux ordinateurs (bouton et télécommande IR)"
description: "Un clavier et une souris (ainsi que les périphériques branchés sur les ports USB-A) commutent entre deux ordinateurs ; un seul est connecté à la fois."
---

# 01 · Commutation entre deux ordinateurs (bouton et télécommande IR)

> [← Retour à la présentation](/fr/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produit concerné : JUXI Technology KVM&HUB&TTL

Un clavier et une souris (ainsi que les périphériques branchés sur les ports USB-A) commutent entre **deux ordinateurs** ; un seul est connecté à la fois.

## Comment commuter

### ① Bouton
Appuyez sur le **bouton de commutation** au centre de l'appareil pour permuter PC1 ⇄ PC2. Le **voyant PC1/PC2** du côté correspondant s'allume et indique l'ordinateur connecté.

### ② Télécommande infrarouge
Pointez la **télécommande infrarouge** vers le récepteur IR (coin supérieur gauche) et appuyez sur la touche de commutation.
(La présence d'une télécommande dépend du pack acheté.)

(Illustration : ressource du tutoriel 05 – Commutation par bouton et infrarouge)

## Deux modes d'utilisation

| Mode | Câblage | Remarques |
|---|---|---|
| Les deux ordinateurs ont un écran | Chacun sur son propre écran | Clavier/souris utilisables dès la commutation (voir Démarrage rapide dans 00) |
| Un ordinateur sans écran (carte de développement, etc.) | L'autre avec écran + solution carte de capture | Voir [06 - Machine sans écran (carte de capture + OBS)](/fr/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |

## Comportement normal pendant la commutation

- Les périphériques des ports USB-A disparaissent temporairement de l'ordinateur « actuel » et apparaissent sur l'autre (les dongles/imprimantes peuvent mettre quelques secondes à être redétectés) ;
- **Le canal Bluetooth sans fil n'est pas affecté par la commutation** (la connexion reste établie). Le port série du PC se déconnecte brièvement pendant la commutation et se rétablit automatiquement au retour (voir [03](/fr/tutorials/accessories/kvm-switch/03-Bluetooth)/[04](/fr/tutorials/accessories/kvm-switch/04-TTL-Serial-Port)).

## Dépannage

**Aucune réaction à l'appui ?** Vérifiez le voyant PC1/PC2 pour connaître le canal actuel ; assurez-vous que l'ordinateur cible est connecté en Type-C et allumé ; appuyez à nouveau pour revenir à l'ordinateur d'origine.

<RelatedProducts slugs="kvm-switch" />
