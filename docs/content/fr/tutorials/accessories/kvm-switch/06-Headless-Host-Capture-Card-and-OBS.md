---
title: "06 · Machine sans écran (carte de capture + OBS)"
description: "Donner un clavier et une souris à une « carte de développement / carte mère sans écran » — sans lui fournir d'écran dédié : la vidéo passe par une carte de c…"
---

# 06 · Machine sans écran (carte de capture + OBS)

> [← Retour à la présentation](/fr/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produit concerné : JUXI Technology KVM&HUB&TTL

Donner un clavier et une souris à une « carte de développement / carte mère sans écran » — **sans lui fournir d'écran dédié** : la vidéo passe par une carte de capture vers l'ordinateur, le clavier/souris passe par le commutateur KVM.

## Principe

```
Carte de développement (sans écran) ──vidéo──→ carte de capture ──USB──→ votre ordinateur (image dans une fenêtre OBS)
Carte de développement (sans écran) ──clavier/souris──→ ←── commutateur KVM ──→ votre ordinateur (même clavier/souris)
```

## Étapes

**① Relier la vidéo** (envoyez la sortie vidéo de l'hôte vers une **carte de capture HDMI 4K**, dont l'extrémité USB va à votre ordinateur) :

| Sortie de l'hôte | Câblage |
|---|---|
| HDMI | Câble HDMI → carte de capture |
| Micro HDMI (Raspberry Pi, etc.) | Adaptateur Micro-HDMI → câble HDMI → carte de capture |
| DP | Adaptateur DP-HDMI → câble HDMI → carte de capture |

**② Relier le clavier/souris** : branchez le clavier/la souris (ou le récepteur sans fil) sur le port USB-A de ce produit, puis appuyez sur le bouton pour **les basculer vers la carte de développement** ;

**③ Voir et opérer** : sur votre ordinateur, ajoutez un « périphérique de capture vidéo » dans **OBS** ou **PotPlayer** — regardez l'écran de la carte et tapez au clavier.

(Illustration : ressource du tutoriel 06 – Carte + carte de capture en situation, 07 – câblage de la carte de capture, 08 – guide OBS, 09 – guide PotPlayer)

## Conseils

- Connectez la carte de capture **directement à l'ordinateur** (pas via les ports USB du KVM) pour une image stable ;
- Après avoir basculé le clavier/souris, la carte ne répond plus à ceux-ci — un appui sur le bouton les ramène.

<RelatedProducts slugs="kvm-switch" />
