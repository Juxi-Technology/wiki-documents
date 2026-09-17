---
title: Servos bus Feetech (SCS0009 / STS3215)
category: accessory
description: "Servos bus série Feetech de Juxi Technology — protocole SCS, versions à encodeur magnétique/potentiomètre, analyse des tables mémoire, débogage FD"
keywords: [feetech, servo, scs, sts, bus série]
---

# Servos bus Feetech (SCS0009 / STS3215)

> **[Acheter en boutique](https://www.juxitech.com/fr/products/feetech-scs0009-serial-bus-servo)**

## Présentation

Les servos bus série Feetech sont le cœur d'entraînement des bras robotiques comme le SO-ARM101. Ils prennent en charge le **protocole SCS** et relient plusieurs servos sur un même bus. Deux versions (encodeur magnétique STS / potentiomètre SCSCL) avec débogage hôte FD sous Windows.

**Caractéristiques clés** :

- Communication bus série, plusieurs servos sur un bus
- Versions encodeur magnétique (STS) / potentiomètre (SCSCL)
- Retour temps réel position/vitesse/couple
- Documentation complète des tables mémoire
- Double communication : TTL (rapide) / RS485 (antiparasite)
- Jusqu'à 254 servos par bus (ID 0-253, diffusion ID 254)
- 1M bauds par défaut, 8 bits de données, 1 bit d'arrêt
- Protections surchauffe/surtension/surintensité/surcharge
- Débogage hôte FD (Windows)

## Spécifications

| Catégorie | Spécification |
|------|------|
| Protocole | Bus série SCS |
| Versions | STS3215 (encodeur magnétique) / SCS0009 (potentiomètre) |
| Débogage | Hôte FD (Windows) |
| Débit | 1 000 000 (défaut hôte) |

## Démarrage rapide

```bash
# 上位机调试(Windows):下载 feetechrc.com/software.html
# 选择端口,波特率 1000000,点击搜索
```
## Tutoriels

- [Tutoriel de débogage Feetech STS3215 & SCS0009](/fr/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial)
- [Protocole de communication SCS](/fr/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol)
- [Table mémoire du servo STS à encodeur magnétique](/fr/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis)
- [Table mémoire du servo SCSCL à potentiomètre](/fr/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis)

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
