---
title: Main dexterous AmazingHand
description: Main bionique open source à 4 doigts de Juxi Technology, contrôle bus TTL, CAO ouverte, recherche IA incarnée et HRI
keywords: [amazinghand, main dexterous, dexterous hand, ia incarnée]
---

# Main dexterous AmazingHand

> **[Acheter en boutique](https://www.juxitech.com/fr/products/amazinghand)**

## Présentation

AmazingHand est la main dexterous open source à 4 doigts de Juxi Technology et un contrôle par bus série TTL. Les fichiers CAO ouverts permettent de personnaliser librement les doigts pour la manipulation fine, les stratégies de préhension et la recherche en interaction homme-robot (HRI).

**Caractéristiques clés** :

- 4 doigts multi-articulations, proportions proches de la main humaine
- Contrôle par bus série TTL, compatible avec les contrôleurs courants
- CAO/source ouverts, personnalisables
- Se combine avec SO-ARM101 pour des plateformes de manipulation complètes
- Suivi de main en temps réel : suivi gestuel par webcam et contrôle en direct
- Démonstrations de simulation : suivi de main sans matériel (écosystème dora-rs)
- Contrôle d'angle de chaque doigt, une ou deux mains
- Alimentation : carte driver de servos 5V3A, connexion USB à l'hôte

## Spécifications

| Catégorie | Spécification |
|------|------|
| Type | Main dexterous à 4 doigts |
| Contrôle | Bus série TTL |
| Écosystème | SDK Python, ROS |
| Open source | CAO/source sur GitHub |

## Démarrage rapide

```bash
git clone https://github.com/Juxi-Technology/AmazingHand.git
cd AmazingHand
pip install -r requirements.txt
python examples/basic_control.py
```

## Tutoriels

- [Contrôle d'interface AmazingHand](/fr/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Exemple officiel AmazingHand](/fr/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
- [Débogage TTL AmazingHand](/fr/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
