---
title: Présentation du produit — Kit de développement Jetson AGX Orin
sidebar_label: Présentation du produit
slug: /product/overview
description: >-
  Ce qu'est le kit de développement NVIDIA Jetson AGX Orin (64GB), à quoi il
  sert et quelle est sa place dans la gamme Jetson Orin.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
todo: add full module specification table from NVIDIA's official data sheet
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/
    checked: 2026-09-23
review_owner: cheny
---

# Présentation du produit

![Kit de développement Jetson AGX Orin](/images/jetson-agx-orin/jaodk_1024px.png)

Le kit de développement NVIDIA® Jetson AGX Orin™ est le fleuron de la famille
Jetson Orin : un ordinateur d'IA compact pour développer et prototyper des
applications de robotique, de vision par ordinateur et d'IA générative en
périphérie. Ce guide porte sur le kit de développement **64GB**.

## Faits essentiels (vérifiés par rapport à la documentation NVIDIA)

- Le kit de développement partage **une même architecture SoC avec tous les
  modules Jetson Orin**, il peut donc **émuler les performances et la
  consommation** des modules AGX Orin, Orin NX ou Orin Nano par reflashage. Il
  est livré configuré par défaut pour la **série Jetson AGX Orin**.
  *(Developer Kit User Guide)*
- NVIDIA annonce des performances d'IA **jusqu'à 275 TOPS** pour la famille de
  modules AGX Orin, avec une consommation configurable entre **15W et 60W**.
  *(page produit NVIDIA)*
- Le GPU du module 64GB est un **GPU NVIDIA d'architecture Ampere à 2048
  cœurs, doté de 64 cœurs Tensor**. *(page produit NVIDIA, tableau comparatif)*
- La carte porteuse de référence incluse expose des interfaces standard —
  DisplayPort, Ethernet 10GBASE-T, USB 3.2, M.2 (NVMe et Wi-Fi), connecteur 40
  broches, PCIe, connecteur caméra, et plus encore. Voir **[Interfaces et
  disposition du matériel](/fr/tutorials/jetson-agx-orin/interfaces)**.

## À quoi sert le kit de développement

- **Développement et prototypage** — le kit est la plateforme de référence pour
  les applications qui seront à terme exécutées sur des modules Jetson Orin en
  production.
- **Exploration des performances et de la consommation** — comme il émule les
  autres modules Orin, un seul kit vous permet de tester vos charges de travail
  sur toute la gamme de modules avant de choisir une pièce de série.
- **Charges de travail d'IA en périphérie** — vision par ordinateur, robotique
  et IA générative locale (voir notre section tutoriels, qui s'enrichit au fur
  et à mesure).

> **Remarque de Juxi :** les produits de série sont construits sur des *modules*
> Jetson Orin (64GB / 32GB / versions industrielles) montés sur votre propre
> carte porteuse ou sur celle d'un partenaire. Le kit de développement est le
> véhicule de développement, pas la pièce de série.

## Contenu de la boîte

Module Jetson AGX Orin et carte porteuse de référence, module Wi-Fi, bloc
d'alimentation USB Type-C et un câble USB Type-C vers USB Type-A. Pour ce que
vous devez fournir vous-même, voir **[Démarrage
rapide](/fr/tutorials/jetson-agx-orin/quick-start)**.

## Pour aller plus loin

- **[Démarrage rapide](/fr/tutorials/jetson-agx-orin/quick-start)** — de la boîte à un système JetPack 7.2.1 fonctionnel
- **[Interfaces et disposition du matériel](/fr/tutorials/jetson-agx-orin/interfaces)** — chaque port et connecteur
- **[Téléchargements](/fr/tutorials/jetson-agx-orin/downloads)** — images officielles, outils et liens vers la documentation *(page en cours de rédaction)*

## Sources

- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (vérifié le 2026-09-23)
- [Page produit NVIDIA Jetson Orin](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/) (vérifié le 2026-09-23)

*Statut : relu le 2026-10-11. Un tableau complet des
spécifications du module sera ajouté à partir de la fiche technique officielle
de NVIDIA ; d'ici là, considérez la page produit NVIDIA comme la source faisant
autorité pour les spécifications.*

**Crédits image :** image produit issue du *Jetson AGX Orin Developer Kit User
Guide* officiel de NVIDIA (téléchargée le 2026-09-23), © NVIDIA Corporation.

---

NVIDIA® et Jetson™ sont des marques de NVIDIA Corporation. Cette page est
publiée par Juxi Technology et ne constitue pas une publication de NVIDIA.
