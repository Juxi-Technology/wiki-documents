---
title: "Étape 8 : Description de la ligne de commande"
description: "Comprenez la commande de déploiement LeRobot : rôle de chaque paramètre, différence entre les modes base et episodic, et pièges sur les paramètres caméra."
---

# Étape 8 : Description de la ligne de commande

## Remarque sur les versions (important, à lire en premier)

À partir de LeRobot **0.6.0**, les modèles entraînés doivent être déployés avec `lerobot-rollout`. L'ancienne syntaxe `lerobot-record --policy.path=...` a été supprimée dès la version **0.5.2**.

La première étape de ce tutoriel installe LeRobot avec `git clone`, ce qui vous fournit la version la plus récente ; utilisez donc la ligne de commande `lerobot-rollout` ci-dessous. Si vous tenez à utiliser `lerobot-record`, le programme signalera directement une erreur et vous invitera à passer à `lerobot-rollout`.

Voici comment se répartissent les rôles des deux commandes :

- `lerobot-record` : est uniquement chargé de **collecter les données de démonstration** (c'est elle qui est utilisée à la sixième étape) ; elle refuse désormais les noms de dataset commençant par `eval_`
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

## Les paramètres des caméras doivent être identiques à ceux de la collecte

Dans toutes les commandes ci-dessous, `--robot.cameras` utilise `1280×720@30`, une valeur harmonisée avec [Collecter un dataset par démonstration](/fr/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording). Lors du déploiement, vous devez conserver la résolution, le fps et le rapport largeur/hauteur utilisés lors de la collecte : la résolution est écrite dans les métadonnées du dataset et participe à la validation, tout écart entraînera une erreur immédiate ; même si elle passe par chance, un champ de vision différent fera que « le monde que voit » le modèle ne sera pas le même que lors de votre démonstration, et les résultats se dégraderont nettement.

## À propos de la visualisation

`--display_data=true` lance l'interface de visualisation rerun.io et enregistre en même temps l'image de chaque frame dans le répertoire `/Users/<nom-utilisateur>/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000`, ce qui occupe pas mal d'espace ; pour un usage réel, vous pouvez le définir à `--display_data=false`.

## Exemple avec la tâche de saisie d'oranges

- Évaluation en direct (avec visualisation en temps réel)

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<nom-utilisateur>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

- Évaluation en direct (sans visualisation en temps réel)

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<nom-utilisateur>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=false
```

- Inférence d'un modèle depuis un Repo de modèle HuggingFace

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=<nom-utilisateur>/lerobot_my_model_a \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

Le modèle sera téléchargé après l'exécution

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)

- Évaluer et enregistrer des données (`--strategy.type=episodic`)

Pour enregistrer le processus sous forme de dataset au fil de l'exécution, remplacez `base` par `episodic`. Dans ce mode, n'indiquez pas `--task`, utilisez plutôt `--dataset.single_task`, et vous devez fournir `--dataset.repo_id` :

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<nom-utilisateur>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --dataset.repo_id=<nom-utilisateur>/rollout_lerobot_my_dataset_a \
  --dataset.num_episodes=10 \
  --dataset.single_task="Grab Oranges" \
  --display_data=false
```

<RelatedProducts slugs="so-arm101" />
