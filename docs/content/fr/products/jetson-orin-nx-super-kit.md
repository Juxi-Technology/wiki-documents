---
title: Kit de développement Jetson Orin NX Super
category: compute-vision
description: "Kit de développement NVIDIA Jetson Orin NX SUPER — plateforme IA embarquée 117/157 TOPS, Ubuntu 22.04 et SSD NVMe 256GB préinstallés"
keywords: [jetson, orin nx, edge ai, leRobot, robotique]
---

# Kit de développement Jetson Orin NX Super

> **[Acheter en boutique](https://www.juxitech.com/fr/products/nvidia-jetson-orin-nx-super-developer-kit)**

## Présentation

Le kit de développement NVIDIA Jetson Orin NX SUPER est une plateforme d'IA embarquée haute performance pour développeurs robotiques, chercheurs en IA générative et ingénieurs embarqués. Avec le module Jetson Orin NX SUPER, il offre jusqu'à **117 TOPS (8GB) / 157 TOPS (16GB)** — 234× / 314× plus rapide que le Jetson Nano d'origine.

Prêt à l'emploi, sans acheter de stockage ni installer de système :

- **Ubuntu 22.04** préinstallé
- **SSD NVMe PCIe 3.0 x4 256GB** préconfiguré (lecture jusqu'à 2800MB/s)
- WiFi 5 bi-bande 2.4G/5G + Bluetooth 5.0 (antenne 4dBi)
- Ventilateur roulements PWM (50 000 heures)
- Boîtier acrylique avec perçages pour support caméra

**Cas d'usage** : déploiement LLM en périphérie, vision par ordinateur avancée, développement robotique LeRobot SO-ARM.

## Spécifications

| Catégorie | Spécification |
|------|------|
| Module | NVIDIA Jetson Orin NX SUPER |
| IA | 117 TOPS (8GB) / 157 TOPS (16GB) |
| CPU | 6 cœurs NVIDIA Carmel ARMv8.2 @ 2.0GHz |
| GPU | NVIDIA Ampere, 1792 cœurs CUDA + 56 cœurs Tensor + 2 moteurs NVDLA |
| Mémoire | 8GB / 16GB LPDDR5 (102.4 GB/s) |
| Stockage | 256GB NVMe PCIe 3.0 x4 SSD (lecture jusqu'à 2800MB/s) |
| Sans fil | WiFi 5 bi-bande + Bluetooth 5.0, double antenne 4dBi |
| Refroidissement | Ventilateur PWM (50 000 h) + dissipateur aluminium |
| Affichage | DP 1.4, jusqu'à 4K@60Hz (H.265) |
| Interfaces | 4× USB 3.2, DP 4K60Hz, connecteur GPIO 40 broches |
| Système | Ubuntu 22.04 préinstallé |

## Connexion matérielle

### Démarrage rapide

1. Brancher l'adaptateur (19V 40W)
2. Câble DP vers HDMI à l'écran
3. Clavier/souris (USB 3.2)
4. Démarrer dans Ubuntu 22.04 préinstallé

### Montage caméra

Le boîtier acrylique a des perçages pour supports caméra (CSI / USB, double caméra).

## Configuration logicielle

### Vérifier PyTorch GPU

```python
import torch
print(torch.cuda.is_available())  # doit afficher True
```

### Installer LeRobot (SO-ARM100/101)

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"
```

### Références

- [Compatibilité PyTorch sur Jetson Orin](/fr/tutorials/learning-resources/jetson-orin-pytorch-compatibility)
- [Tutoriel SO-ARM101](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)

## Variantes du kit

| Kit | Composants ajoutés | Cas d'usage |
|---------|---------|---------|
| **Kit standard** | Carte + boîtier acrylique + SSD 256GB + WiFi/BT + antenne + alim 19V 40W + câble DP-HDMI + câble Type-C + tournevis | Développement IA général |
| **Kit écran OLED** | + écran OLED 0.91" | Surveillance des ressources |
| **Kit audio USB** | + carte son USB (haut-parleur + micro, réduction bruit/écho) | Interaction vocale, assistant LLM |
| **Kit caméra IMX219** | + caméra CSI IMX219 (77° FOV, 8MP) + support aluminium réglable | Vision CSI native |
| **Kit caméra autofocus** | + caméra USB autofocus 86° (1080P) + support aluminium | Vision générale, bras robotiques |
| **Kit robotique SO-ARM100/101** | + HUB USB 3.0 + caméra autofocus + support dédié | Vision pour bras robotique |

## Choix de version

| Version | IA | Scénarios recommandés |
|------|---------|---------|
| **8GB** | 117 TOPS | Développement IA avancé, projets robotiques moyens, LLM edge |
| **16GB** | 157 TOPS | IA incarnée haute performance, grands modèles en périphérie, vision complexe |

## FAQ

**Q : Plus rapide qu'un Orin NX standard ?**
1.7× (optimisation SUPER).

**Q : Faut-il installer le système ?**
Non. Ubuntu 22.04 et SSD 256GB préinstallés — il suffit d'allumer.

**Q : Compatible SO-ARM101 ?**
Entièrement. Kit vision robotique dédié (caméra + support), intégration transparente LeRobot.

**Q : Bruit du refroidissement ?**
Ventilateur PWM à roulements : stable à 40W, silencieux, 50 000 heures (10× plus durable qu'un ventilateur hydraulique).

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
- 💬 [Retour](https://github.com/Juxi-Technology/wiki-documents/issues)
