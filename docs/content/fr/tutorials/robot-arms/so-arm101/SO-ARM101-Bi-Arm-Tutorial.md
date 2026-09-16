---
title: Tutoriel SO-ARM101 bi-bras (double suiveur)
description: "Présentation du flux complet du système SO-ARM101 bi-bras (double bras follower) : câblage et calibration du matériel, téléopération bi-bras."
---

# Tutoriel SO-ARM101 bi-bras (double suiveur)

> **[Acheter en boutique](https://www.juxitech.com/fr/products/so-arm101-developers-kit)**

Ce guide présente le flux complet d'entraînement d'un système robotique SO-ARM bi-bras avec LeRobot : connexion matérielle, calibration bi-bras, téléopération bi-bras, enregistrement et gestion du dataset, entraînement de la politique ACT et déploiement sur robot réel. En suivant ce guide, vous pourrez collecter des données de démonstration avec deux bras leader et deux bras follower, entraîner une politique d'apprentissage par imitation et l'exécuter sur de vrais bras robotiques.

Commencez par effectuer le câblage comme suit :

| Rôle | Port |
| --- | --- |
| Bras follower gauche | `/dev/ttyACM0` |
| Bras follower droit | `/dev/ttyACM1` |
| Bras leader gauche | `/dev/ttyACM2` |
| Bras leader droit | `/dev/ttyACM3` |

Le type du bras follower est `so101_follower`, le type du bras leader est `so101_leader` (dans LeRobot, `so100_leader` et `so101_leader` partagent la même implémentation).

## Prérequis

### Installation des dépendances

Pour l'installation de l'environnement, consultez le [Tutoriel SO-ARM101](./SO-ARM101-Tutorial.md).

### Autorisations USB

```bash
sudo chmod 666 /dev/ttyACM0 /dev/ttyACM1 /dev/ttyACM2 /dev/ttyACM3
```

## 1. Calibration (étape clé)

### 1.1 Calibrer le bras follower gauche

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_so101_bi_follower_left
```

### 1.2 Calibrer le bras follower droit

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower_right
```

### 1.3 Calibrer le bras leader gauche

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM2 \
  --teleop.id=my_so101_bi_leader_left
```

### 1.4 Calibrer le bras leader droit

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader_right
```

Une fois la calibration terminée, les fichiers sont enregistrés dans :

```text
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_left.json
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_right.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_left.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_right.json
```

> Remarque sur les noms de dossiers : `so101_follower` et `so100_follower`, `so101_leader` et `so100_leader` partagent la même implémentation, les dossiers sont donc uniformisés en `so_follower` / `so_leader` ; le bras leader relève des teleoperators, ses fichiers de calibration se trouvent donc dans `teleoperators/` et non dans `robots/`.

### (Optionnel) Si vous avez déjà calibré auparavant avec d'autres ID

Par exemple, si vous utilisiez auparavant `my_awesome_follower_arm1`, `my_awesome_follower_arm2`, etc., vous pouvez copier les fichiers de calibration :

```bash
CAL_DIR=~/.cache/huggingface/lerobot/calibration

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm1.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_left.json

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm2.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_right.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm3.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_left.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm4.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_right.json
```

## 2. Téléopération bi-bras

### 2.1 Sans caméra

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### 2.2 Avec caméra

Vous pouvez utiliser `lerobot-find-cameras opencv` pour consulter les index des caméras ; vous pouvez également ajouter ou retirer des caméras.

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### Conseils de sécurité

- Faites attention à l'environnement autour et évitez les collisions des bras follower.

## 3. Enregistrement du dataset

### 3.1 Sauvegarde en local (sans téléversement vers le Hub)

Ajoutez `--dataset.root` (les données sont écrites dans ce répertoire) et `--dataset.push_to_hub=false`, ainsi que `--dataset.no_stamp=true` pour garder un nom de dataset stable (sinon un horodatage est automatiquement ajouté au `repo_id`, et les reprises d'enregistrement/relectures/entraînements ultérieurs ne le retrouveront pas).

> Remarque : il est recommandé d'inclure un `/` dans `repo_id` (de la forme `nom_d_utilisateur/nom_du_dataset`) ; un dataset local n'est pas réellement téléversé.

```bash
lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> L'encodage vidéo est déjà `libsvtav1` par défaut, rien à spécifier ; pour le personnaliser, utilisez des paramètres imbriqués comme `--dataset.rgb_encoder.vcodec=h264`.

Les données sont enregistrées dans `./datasets/bi_so101_task/`, avec la structure suivante :

```text
├── meta/
│   ├── info.json         # 数据集信息(fps、特征形状等)
│   ├── episodes/         # 每集的元数据(chunk-000/...)
│   ├── stats.json        # 各特征归一化统计
│   └── tasks.parquet     # 任务文本 → task_index
├── data/                 # 每帧特征数据(chunk-*.parquet)
└── videos/               # 每个摄像头一个子目录(chunk-*.mp4)
```

### 3.2 Téléversement vers le Hugging Face Hub

Si vous souhaitez un téléversement automatique, conservez `HF_USER` et retirez `root` et `push_to_hub=false` (le téléversement est le comportement par défaut). Veillez à garder les ports et index de caméras cohérents avec le tableau de câblage :

```bash
export HF_USER=your_hf_username

lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> Le nom du dépôt Hub après téléversement est `${HF_USER}/bi_so101_task`, identique au `repo_id` utilisé pour l'entraînement depuis le Hub en 4.2 ci-dessous. La copie locale est d'abord enregistrée dans `~/.cache/huggingface/lerobot/${HF_USER}/bi_so101_task/`.

### 3.3 Poursuite de la collecte (reprise d'enregistrement)

Si l'enregistrement s'est arrêté accidentellement (par exemple en quittant par un clic droit pendant la phase de reset), ou si vous souhaitez réaliser la collecte en plusieurs fois, vous pouvez utiliser `--resume` pour continuer à ajouter des épisodes au même dataset.

**Attention** :

- `--resume=true` est obligatoire, sinon `LeRobotDataset.create()` renverra une erreur car le répertoire existe déjà.
- Dans la commande de reprise, `--dataset.root` et `--dataset.repo_id` doivent être strictement identiques à ceux du premier enregistrement (3.1) (`resume` exige explicitement `root`).
- `--dataset.num_episodes` désigne **le nombre d'épisodes à enregistrer cette fois-ci**, pas l'objectif total. Par exemple, si 15 épisodes sont déjà enregistrés et que vous en voulez 50 au total, indiquez `35`.
- À la sortie, essayez de quitter pendant l'enregistrement d'un épisode ou juste après sa fin naturelle ; évitez de quitter pendant la phase « Reset the environment » (cela provoque l'échec de sauvegarde d'un épisode vide).

```bash
lerobot-record \
  --resume=true \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=35 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

### 3.4 Rejouer et supprimer des épisodes

#### Rejouer un épisode spécifique

```bash
lerobot-replay \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.episode=24
```

> `episode` est un index basé sur 0 ; `24` désigne le 25e épisode.

#### Supprimer un épisode spécifique

```bash
python -m lerobot.scripts.lerobot_edit_dataset \
  --repo_id=juxi/bi_so101_task \
  --root=./datasets/bi_so101_task \
  --operation.type=delete_episodes \
  --operation.episode_indices="[24]"
```

Après la suppression, le dataset est réécrit sur place et les données d'origine sont sauvegardées dans `./datasets/bi_so101_task_old/`. Une fois le nouveau dataset vérifié, vous pouvez supprimer manuellement la sauvegarde :

```bash
rm -rf ./datasets/bi_so101_task_old
```

#### Supprimer tout le dataset

```bash
rm -rf ./datasets/bi_so101_task
```

## 4. Entraînement ACT

### 4.1 Entraînement à partir d'un dataset local

```bash
lerobot-train \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=60000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> `--dataset.root` pointe vers le répertoire du dataset enregistré en 3.1 (`repo_id` doit être identique à celui de l'enregistrement). Si le répertoire `--output_dir` existe déjà, une erreur `FileExistsError` est renvoyée directement : choisissez un nouveau répertoire de sortie ou ajoutez `--resume=true` pour reprendre l'entraînement.

### 4.2 Entraînement à partir du Hugging Face Hub

```bash
export HF_USER=your_hf_username

lerobot-train \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=100000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> Ce qui précède utilise les paramètres par défaut d'ACT (`chunk_size=100`, `dim_model=512`, etc.).

> `repo_id` doit correspondre au nom du dépôt lors du téléversement en 3.2 (3.2 inclut `--dataset.no_stamp=true`, le nom du dépôt est donc fixé à `${HF_USER}/bi_so101_task`). À l'entraînement, `--dataset.root` n'est pas nécessaire : le dataset est téléchargé automatiquement depuis le Hub.

## 5. Déploiement sur robot réel

> Remarque : `lerobot-record` sert uniquement à collecter des données de démonstration. Pour déployer une politique entraînée, utilisez `lerobot-rollout` — dans la version actuelle, `lerobot-record` n'accepte plus `--policy.path` et refuse aussi les noms de dataset préfixés par `eval_`.

### 5.1 Évaluation sur site (sans enregistrement de données)

```bash
lerobot-rollout \
  --strategy.type=base \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --task="Pick the cube with left arm and hand it to right arm" \
  --duration=60 \
  --display_data=true
```

- `--duration` est la durée de fonctionnement en secondes ; `0` signifie aucune limite de temps.
- Pour prendre la main ou l'arrêter en cours de route, ajoutez `--interactive=true` et pilotez dans le terminal avec des commandes comme `/stop`, `/reset`.

### 5.2 Évaluation avec enregistrement de données (local)

Utilisez la stratégie `episodic` (comportement similaire à l'ancien `lerobot-record` : enregistrement par épisode avec phase de reset) :

```bash
lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=juxi/rollout_bi_so101_task \
  --dataset.root=./datasets/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

> Le nom du dataset de déploiement doit commencer par `rollout_` (convention imposée par la version actuelle). Pour un enregistrement en local, il est recommandé d'ajouter `--dataset.root` et `--dataset.no_stamp=true` afin d'éviter l'ajout d'un horodatage au nom du répertoire.

### 5.3 Téléversement des données d'évaluation vers le Hugging Face Hub

```bash
export HF_USER=your_hf_username

lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=${HF_USER}/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

## 6. Questions fréquentes

| Problème | Cause | Solution |
| --- | --- | --- |
| Recalibration demandée pendant la téléopération | `bi_so_follower` ne trouve pas les fichiers de calibration avec suffixe `_left` / `_right` | Recalibrer avec des ID portant `_left` / `_right`, ou copier les fichiers de calibration existants |
| Le bras leader ne se laisse pas déplacer | couple (torque) du leader non désactivé | Recalibrer ou vérifier les moteurs |
| Erreur « répertoire déjà existant » lors de la reprise de la collecte | `--resume=true` absent | Ajouter `--resume=true` à la commande `lerobot-record` |
| Erreur demandant `root` avec `--resume=true` | la reprise doit spécifier explicitement le répertoire du dataset | Ajouter `--dataset.root=./datasets/bi_so101_task` à la commande de reprise, identique au premier enregistrement |
| Un horodatage apparaît dans le nom du répertoire du dataset, relecture/entraînement introuvables | `no_stamp` non défini à l'enregistrement, un horodatage est automatiquement ajouté au `repo_id` | Ajouter `--dataset.no_stamp=true` lors de l'enregistrement/de la reprise |
| `--dataset.vcodec=...` renvoie une erreur de paramètre inexistant | ancien paramètre ; les paramètres d'encodage vidéo actuels sont imbriqués | Utiliser `--dataset.rgb_encoder.vcodec=h264` (déjà `libsvtav1` par défaut) |
| Erreur `--policy.path` / `eval_` avec `lerobot-record` au déploiement | la version actuelle de `lerobot-record` n'a plus la capacité de déploiement de politique | Utiliser `lerobot-rollout --strategy.type=episodic` pour le déploiement, avec un nom de dataset commençant par `rollout_` |
| Bras gauche/droit inversés | mauvaise configuration des ports | Échanger `left_arm_config.port` et `right_arm_config.port` |
| Dataset introuvable à l'entraînement | le dataset local ne spécifie pas `root` | Ajouter `--dataset.root=./datasets/xxx` à l'entraînement |
| Le dataset est téléversé automatiquement | `push_to_hub=false` non défini | Ajouter `--dataset.push_to_hub=false` lors de l'enregistrement |
| Erreur `You must add one or several frames before calling add_episode` à la sortie | sortie pendant la phase de reset, l'épisode en cours n'a aucune image | Sans impact sur les données déjà enregistrées ; continuer la collecte avec `--resume=true` |

<RelatedProducts slugs="so-arm101" />
