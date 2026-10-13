---
title: "1 · Vue d'ensemble"
description: "LeLab réunit le flux de travail LeRobot — calibrer, téléopérer, enregistrer, entraîner, rejouer — dans une seule fenêtre de navigateur : fonctions, prérequis et emplacement des fichiers."
---

# 1 · Vue d'ensemble

> **Suivant :** [02 Installer et lancer](02-Install.md)

LeLab est une application web qui réunit le flux de travail LeRobot — calibrer, téléopérer, enregistrer, entraîner, rejouer — dans une seule fenêtre de navigateur.

## Ce que vous pouvez faire

| Page | Ce que ça fait |
|---|---|
| **Calibration** | Calibration guidée des deux bras |
| **Teleoperation** | Déplacez le bras leader ; le follower le reproduit, avec diffusion des articulations en direct |
| **Recording** | Capturez des épisodes dans un LeRobotDataset, avec les caméras |
| **Datasets** | Parcourez les épisodes sur le disque, image par image, avec une courbe de mouvement des articulations |
| **Training** | Lancez une tâche d'entraînement LeRobot et suivez les journaux |
| **Inference** | Exécutez une policy entraînée sur le bras follower |
| **Upload** | Poussez votre jeu de données vers le Hugging Face Hub |

## LeLab et LeRobot

LeRobot est la bibliothèque — pilotes de robots, format de jeu de données, code d'entraînement. LeLab est un serveur FastAPI qui l'appelle, accompagné d'un front end React qui communique avec ce serveur via HTTP et WebSocket.

- Tout ce que LeLab n'expose pas reste accessible via la ligne de commande `lerobot-*`.
- LeLab n'embarque pas LeRobot. Installer LeLab installe LeRobot.

## Prérequis

| | |
|---|---|
| Robot | **bras leader + follower SO-101** — la seule configuration prise en charge |
| Ordinateur | Linux, macOS ou Windows |
| Python | **3.12 ou plus récent** |
| Node.js | 22 — uniquement pour `lelab --dev` |
| USB | Deux ports libres, un par bras |

La calibration, la téléopération et l'enregistrement tournent sur un ordinateur portable. L'entraînement est l'étape lourde, et LeLab peut l'exécuter sur le Hugging Face Hub à la place — voir [page 6](06-Train-and-Inference.md).

## Où vont les fichiers

Sous `~/.cache/huggingface/lerobot/` :

| Chemin | Contenu |
|---|---|
| `calibration/teleoperators/so101_leader/*.json` | Fichiers de calibration du leader |
| `calibration/robots/so101_follower/*.json` | Fichiers de calibration du follower |
| `ports/leader_port.txt` · `ports/follower_port.txt` | Derniers ports série utilisés |
| `saved_configs/*.txt` | Dernier profil de calibration sélectionné |

Les jeux de données vont là où LeRobot les place — par défaut, la même arborescence.

Vider ce cache, ou réinstaller, impose de recalibrer les deux bras. Voir [Dépannage](07-Troubleshooting.md).

## Vocabulaire

LeRobot nomme les bras par rôle ; l'API de LeLab utilise un second jeu de noms pour ces deux mêmes bras :

| Vous dites | LeRobot / LeLab dit |
|---|---|
| Le bras que vous déplacez à la main | **leader** · **teleop** |
| Le bras qui suit | **follower** · **robot** |

---

> **Suivant :** [02 Installer et lancer](02-Install.md)

<RelatedProducts slugs="so-arm101" />
