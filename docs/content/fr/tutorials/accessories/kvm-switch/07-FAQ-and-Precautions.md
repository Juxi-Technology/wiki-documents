---
title: "07 · FAQ et précautions"
description: "Q1 : Peut-il commuter l'image de l'écran ?"
---

# 07 · FAQ et précautions

> [← Retour à la présentation](/fr/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produit concerné : JUXI Technology KVM&HUB&TTL
> Les questions spécifiques à chaque module figurent sur leur page dédiée (Bluetooth → 03 ; série TTL → 04).

## FAQ

**Q1 : Peut-il commuter l'image de l'écran ?**
Non. Ce produit commute le clavier/souris et les périphériques USB. Chaque ordinateur utilise son propre écran ; pour une machine sans écran, utilisez la solution carte de capture (voir [06](/fr/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS)).

**Q2 : Faut-il installer des pilotes ?**
Non — sans pilote (Windows / macOS / Linux / systèmes d'exploitation nationaux chinois).

**Q3 : Puis-je brancher un disque dur externe ?**
Ce produit est en USB 2.0 ; pour le stockage rapide et les cartes de capture, connectez directement à l'ordinateur. Clés USB, claviers/souris, imprimantes et dongles ne posent aucun problème.

**Q4 : Le téléphone ne se connecte pas en Bluetooth / une demande de code PIN apparaît ?**
N'utilisez pas l'« appairage » Bluetooth du système ; installez l'appli **BleUart** et connectez-vous depuis l'appli (voir [03](/fr/tutorials/accessories/kvm-switch/03-Bluetooth)).

**Q5 : Un téléphone et un ordinateur peuvent-ils se connecter en Bluetooth en même temps ?**
Non — un seul appareil hôte à la fois. Le **port série** (USB) du PC n'est pas concerné et reste utilisable en parallèle.

**Q6 : Les périphériques USB disparaissent-ils un instant lors de la commutation ?**
Normal : les périphériques « migrent » d'un ordinateur à l'autre avec la commutation et l'autre ordinateur les redétecte (quelques secondes pour certains).

**Q7 : Peut-il servir uniquement de HUB ?**
Oui — avec un seul ordinateur connecté, c'est un HUB USB 3 ports (voir [02](/fr/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three)).

**Q8 : Prend-il en charge les souris gaming ?**
Clavier/souris fonctionnent en USB 2.0 HID standard — imperceptible en bureautique et en débogage ; prudence avec les périphériques gaming à haut taux de rapport.

## Précautions

- Le niveau du port TTL est de **3,3 V** — n'y injectez jamais de signaux 5 V ; `3V3/5V` sont des broches de **sortie** — n'y injectez jamais d'alimentation ;
- La bande passante USB 2.0 est limitée ; choisissez les périphériques selon les recommandations de [02](/fr/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three) ;
- Ne démontez pas et ne ressoudez pas l'appareil ; il craint l'électricité statique — déchargez-vous avant de le toucher ;
- Les fonctions et interfaces du produit sont soumises à l'unité physique ; en cas de mise à jour de ce tutoriel, la dernière version fait foi.

## Historique des versions

| Version | Date | Description |
|---|---|---|
| v1.0 | 2026-10-14 | Version initiale, organisée par modules (commutation/HUB/Bluetooth/TTL/10 broches/carte de capture/FAQ) |

<RelatedProducts slugs="kvm-switch" />
