---
title: Module de positionnement GNSS GPS & Beidou
description: "Module GNSS GPS & Beidou JUXI – puce ATGM336H-5N, positionnement combiné quatre systèmes de satellites, précision 2,5 m, compatible ROS"
keywords: [GPS, Beidou, GNSS, positionnement, ATGM336H]
---

# Module de positionnement GNSS GPS & Beidou

> **[Acheter en boutique](https://www.juxitech.com/fr/products/gps-beidou-gnss-positioning-module)**

## Présentation du produit

**Caractéristiques principales** :

- Prend en charge **BDS/GPS/QZSS/GLONASS** (seul ou combiné)
- Récepteur **32 canaux** haute sensibilité, positionnement stable
- Précision **2,5 m (CEP50)**, démarrage à froid 32 s
- Série USB et série TTL plug-and-play
- Tutoriels open source Arduino/Jetson/Raspberry Pi/ROS

## Spécifications du produit

| Catégorie | Spécification |
|------|------|
| Puce | ATGM336H-5N |
| Systèmes de satellites | BDS / GPS / QZSS / GLONASS |
| Canaux | 32 canaux, réception multi-systèmes simultanée |
| Précision | <2,5 m (CEP50) |
| Fréquence de mise à jour | 1 Hz par défaut, max. 10 Hz |
| Débit | 4800–115200 bps (9600 par défaut) |
| Sensibilité | Démarrage à froid −148 dBm, poursuite −162 dBm |
| Consommation | 25 mA @ 3,3 V |
| Température de fonctionnement | −40 °C ~ +85 °C |
| Interfaces | USB Type-C / série TTL (PH2.0) |

## Démarrage rapide

```bash
# Vérifier le port série USB
ls /dev/ttyUSB*
# Recevoir les données (p. ex. /dev/ttyUSB0, 9600 bps)
sudo gpsd /dev/ttyUSB0 -n
cgps
```

## Tutoriels associés

- [Dépôt officiel](https://github.com/Juxi-Technology)

## Support technique

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
