---
title: Carte driver servo bus JUXI
description: "Carte driver servo bus JUXI – contrôle jusqu'à 253 servos sur un bus, tension large 7–12,6 V, Type-C plug-and-play, conçue pour LeRobot SO-ARM"
keywords: [driver servo, servo bus, LeRobot, SO-ARM]
---

# Carte driver servo bus JUXI

> **[Acheter en boutique](https://www.juxitech.com/fr/products/bus-servo-driver-board)**

## Présentation du produit

**Caractéristiques principales** :

- Contrôle jusqu'à **253** servos à bus série sur un seul bus
- Entrée large tension **7–12,6 V**, alimentation intégrée (prise DC 5521)
- Retour en temps réel : position, vitesse, couple, mode de fonctionnement
- **Type-C plug-and-play**, compatible Raspberry Pi/Jetson/RDK/PC
- Trous de montage précis, installation directe sur SO-ARM100/101 en 2 minutes
- Circuit de protection TVS (surtension/surintensité)

## Spécifications du produit

| Catégorie | Spécification |
|------|------|
| Tension d'entrée | DC 7 V – 12,6 V |
| Interfaces | USB Type-C / UART |
| Support de servos | jusqu'à 253 servos à bus série |
| Retour de données | Position, vitesse, couple, mode de fonctionnement |
| Dimensions | 42,00 × 33,00 mm |
| Écart des trous | 37,00 × 28,00 mm (correspond aux trous SO-ARM) |
| Servos compatibles | la plupart des servos à bus série courants |
| Hôtes compatibles | Raspberry Pi, NVIDIA Jetson (Nano/Orin/Xavier), RDK, PC (Win/macOS/Linux), Orange Pi |

## Démarrage rapide

```bash
# Exemple de démarrage SO-ARM101
python3 examples/arm_boot.py --port /dev/ttyACM0
```

## Tutoriels associés

- [Kit de développement SO-ARM101](/fr/products/so-arm101)
- [Servo bus Feetech (SCS0009 / STS3215)](/fr/products/feetech-servo)

## Support technique

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
