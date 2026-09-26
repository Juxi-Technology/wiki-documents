---
title: "Description de la ligne de commande"
description: "Comprenez la commande de déploiement LeRobot : rôle de chaque paramètre, différence entre les modes base et episodic, et pièges sur les paramètres caméra."
---

# Description de la ligne de commande

## Remarque sur les versions (important, à lire en premier)

À partir de LeRobot **0.6.0**, les modèles entraînés doivent être déployés avec `lerobot-rollout`. L'ancienne syntaxe `lerobot-record --policy.path=...` a été supprimée dès la version **0.5.2**.

La première étape de ce tutoriel installe LeRobot avec `git clone`, ce qui vous fournit la version la plus récente ; utilisez donc la ligne de commande `lerobot-rollout` ci-dessous. Si vous tenez à utiliser `lerobot-record`, le programme signalera directement une erreur et vous invitera à passer à `lerobot-rollout`.

Voici comment se répartissent les rôles des deux commandes :

- `lerobot-record` : est uniquement chargé de **collecter les données de démonstration** (c'est elle qui est utilisée à la septième étape) ; elle refuse désormais les noms de dataset commençant par `eval_`
- `lerobot-rollout` : est chargé de **déployer le modèle entraîné**, et utilise `--strategy.type` pour choisir le mode de fonctionnement

## Paramètres de ligne de commande de rollout

| Paramètre | Description |
|---|---|
| `--strategy.type` | Mode de fonctionnement. `base` exécute uniquement le modèle sans enregistrer de données, pour observer les résultats en direct ; `episodic` enregistre par épisode avec une phase de reset, un comportement proche de l'ancienne version de `lerobot-record` |
| `--policy.path` | Chemin du modèle, pointant vers `checkpoints/last/pretrained_model` dans les sorties de l'entraînement |
| `--task` | Description de la tâche, à utiliser avec `--strategy.type=base` |
| `--duration` | Nombre de secondes d'exécution ; `0` signifie sans limite de temps |
| `--interactive` | À ajouter lorsque vous devez reprendre la main en cours de route ; permet de contrôler dans le terminal avec des commandes comme `/stop`, `/reset` |
| `--display_data` | Indique s'il faut lancer l'interface de visualisation rerun.io |
| `--policy.device` | Périphérique de calcul, par exemple `cuda`, `cpu` |

## Description de la ligne de commande

Avec visualisation en temps réel : \-\-display\_data=true

Sans visualisation en temps réel : \-\-display\_data=false

Avec `--display_data=true`, l'interface de visualisation très sympa de rerun\.io se lance, mais dans le répertoire `/Users/tommy/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000`, l'image de chaque frame est enregistrée, ce qui occupe pas mal d'espace. Vous pouvez ensuite la définir à `--display_data=false`



Inférence d'un modèle depuis un Repo de modèle HuggingFace : \-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## Exemple avec la tâche de saisie d'oranges

- Inférence d'un modèle local (avec visualisation en temps réel)

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- Inférence d'un modèle local (sans visualisation en temps réel)

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=false \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --dataset.episode_time_s=1000 \
  --policy.path=/Users/tommy/Downloads/7-lerobot/checkpoints/last/pretrained_model
```

- Inférence d'un modèle depuis un Repo de modèle HuggingFace

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --display_data=true \
  --dataset.repo_id=Tommymy/rollout_lerobot_my_dataset_a \
  --dataset.single_task="Grab Oranges" \
  --policy.path=Tommymy/lerobot_my_model_a
```

Le modèle sera téléchargé après l'exécution

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









