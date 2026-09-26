---
title: Introduction à l'intelligence incarnée (LeRobot)
description: "Intelligence incarnée – framework LeRobot, flux complet de collecte/entraînement/évaluation SO-ARM101, choix ACT/politique de diffusion/SmolVLA"
keywords: [lerobot, intelligence incarnée, apprentissage par imitation, act, so-arm101, apprentissage robotique]
---

# Introduction à l'intelligence incarnée (LeRobot)

> Pour les développeurs qui abordent pour la première fois l'« apprentissage robotique ». Avec HuggingFace LeRobot + le bras robotique JUXI SO-ARM101 : parcours complet **collecte → entraînement → évaluation**.

## 1. Qu'est-ce que l'intelligence incarnée ?

L'intelligence incarnée (Embodied AI) permet à un agent d'interagir avec le monde physique via les capteurs du corps. L'apprentissage par imitation robotique en est une ligne majeure : démonstrations téléopérées → collecte de données → entraînement d'un modèle de politique → le robot reproduit les actions.

**Pourquoi c'est important** : la programmation classique ne couvre pas les tâches complexes (visser, plier des vêtements) ; l'apprentissage par imitation n'a besoin que de « démo + entraînement ».

## 2. Configuration matérielle

| Composant | Recommandation | Description |
|------|------|------|
| Bras robotique | SO-ARM101 (leader + follower) | Téléopération bimanuelle, 6 DOF |
| Calcul | Jetson Orin NX Super / PC 4090 | entraînement à forte puissance, inférence sur Jetson |
| Vision | RealSense / caméra USB | capture de l'environnement en téléopération |

- [Tutoriel d'utilisation SO-ARM101](/fr/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Kit Jetson Orin NX Super](/fr/products/jetson-orin-nx-super-kit)

## 3. Installation de l'environnement

```bash
# Cloner (fork stable JUXI)
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"        # SO-ARM utilise des servos Feetech
# Utilisateurs Jetson : vérifier d'abord PyTorch
python3 -c "import torch; print(torch.cuda.is_available())"
```

## 4. Collecte de données (téléopération)

```bash
# Calibrer le bras (première fois)
lerobot-calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
# Collecter les données
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 \
  --dataset.repo_id=juxi/pick_cube \
  --dataset.num_episodes=50 \
  --dataset.single_task="Pick the red cube" \
  --dataset.episode_time_s=30
```

**Conseils de collecte** :

- ≥50 épisodes par tâche, varier positions/techniques
- Caméra fixe, objet visible de manière cohérente
- Style de démonstration constant (même démonstrateur)

## 5. Entraînement

```bash
# Politique ACT (recommandée aux débutants)
lerobot-train \
  --dataset.repo_id=juxi/pick_cube \
  --policy.type=act \
  --output_dir=outputs/train/act_pick \
  --steps=300000 \
  --policy.device=cuda
```

**Choix de la politique** :

| Politique | Avantages | Usage |
|------|------|------|
| ACT | stable même avec peu de données, accessible | tâches uniques, peu de données |
| Politique de diffusion | mouvements multimodaux complexes | manipulation fine |
| SmolVLA / modèles de fondation | généralisation zero/few-shot | multi-tâches |

## 6. Évaluation

```bash
# Rejouer le dataset (vérifier la qualité)
lerobot-dataset-viz --repo-id juxi/pick_cube
# Évaluer la politique
lerobot-rollout \
  --strategy.type=episodic \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --policy.path=outputs/train/act_pick/checkpoints/last/pretrained_model \
  --dataset.repo_id=juxi/rollout_pick \
  --policy.device=cuda
```

| Métrique | Description |
|---------|------|
| Taux de réussite | proportion de tâches terminées |
| Lissité de trajectoire | tremblements ou non |
| Généralisation | succès aussi avec d'autres objets/positions |

## 7. Questions fréquentes

**Q : L'entraînement est lent ?**
Quantité de données, steps et puissance sont proportionnels. Commencer avec 50 épisodes / 100k steps, valider le flux, puis passer à l'échelle.

**Q : La politique ne fait qu'une seule action ?**
L'entraînement mono-tâche nécessite un dataset de tâche ; les modèles de fondation GR00T/Pi0 peuvent être affinés en multi-tâches avec peu de données.

**Q : Les mouvements tremblent après l'entraînement ?**
Vérifier la qualité des données (démos stables), ajouter un filtre de lissage, réduire la fréquence de contrôle.

**Q : Mémoire/VRAM insuffisante ?**
Réduire batch_size, résolution d'image ; sur Jetson utiliser la version 16 Go.

---

## Liens connexes

- [Guide de choix du bras robotique](/fr/tutorials/robot-arms/select-guide)
- [Introduction au déploiement IA en périphérie](/fr/topics/edge-ai-intro)
- [Pince flexible TPU SO-ARM101](/fr/products/tpu-flexible-gripper)
- [Kit vision robotique SO-ARM101](/fr/products/robot-vision-kit)

## Support technique

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
