---
title: "Étape 6 : Collecte du jeu de données par démonstration"
description: "Collectez un jeu de données par démonstration avec le SO-ARM101 : remplacez les espaces réservés, enregistrez vos épisodes et gérez les interruptions clavier."
---

# Étape 6 : Collecte du jeu de données par démonstration

## Remplacez d'abord les espaces réservés des commandes par vos propres informations

Le tutoriel décrit des étapes d'opération génériques ; à partir de cette étape, les commandes utilisent donc deux espaces réservés, qui représentent des informations que vous seul possédez. Remplacez-les selon les explications ci-dessous, en **supprimant aussi les chevrons** :

| Espace réservé | Ce qu'il représente | Comment le remplacer |
|---|---|---|
| `<nom-utilisateur>` | Le nom d'utilisateur système de votre ordinateur, c'est-à-dire le nom du répertoire personnel | Saisissez `whoami` dans le terminal pour l'afficher |
| `<nom-utilisateur>` | Le nom de votre compte HuggingFace | Après vous être connecté à HuggingFace, regardez le nom de compte à côté de l'avatar en haut à droite |

Prenons un exemple. Supposez que la sortie de `whoami` dans le terminal soit `zhangsan` et que votre nom de compte HuggingFace soit aussi `zhangsan`, alors

- `/Users/<nom-utilisateur>/.cache/huggingface/lerobot/<nom-utilisateur>/` doit s'écrire `/Users/zhangsan/.cache/huggingface/lerobot/zhangsan/`
- `<nom-utilisateur>/lerobot_my_dataset_a` doit s'écrire `zhangsan/lerobot_my_dataset_a`

> Les deux espaces réservés de toutes les commandes suivantes se remplacent de la même manière.

> **Attention** : la première commande ci-dessous est `sudo rm -rf` et sert à supprimer un répertoire. Assurez-vous que le chemin a bien été remplacé par le vôtre avant d'appuyer sur Entrée.

## Supprimer le jeu de données du même nom déjà existant (le cas échéant)

```Shell
sudo rm -rf /Users/<nom-utilisateur>/.cache/huggingface/lerobot/<nom-utilisateur>/lerobot_my_dataset_a
```

## Une caméra, collecte du jeu de données - Mac

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<nom-utilisateur>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## Deux caméras, collecte du jeu de données - Mac

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<nom-utilisateur>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## Collecte en cours

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/1.jpg)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/2.jpg)

Commandes au clavier avec les flèches :
→ (flèche droite) termine prématurément l'épisode en cours ; passe à l'épisode suivant.
← (flèche gauche) annule l'épisode en cours ; recommence l'enregistrement.
ESC, arrête immédiatement, encode la vidéo et téléverse le jeu de données.

## Collecte terminée, répertoire de sauvegarde du jeu de données

```Shell
/Users/<nom-utilisateur>/.cache/huggingface/lerobot/<nom-utilisateur>/lerobot_my_dataset_a
```

## Poignée de main

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<nom-utilisateur>/lerobot_my_dataset_shake_hands \
    --dataset.num_episodes=30 \
    --dataset.single_task="Shanke Hands" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=12 \
    --dataset.reset_time_s=1
```

Une fois la collecte terminée, le jeu de données de poignée de main est enregistré dans :

```Shell
/Users/<nom-utilisateur>/.cache/huggingface/lerobot/<nom-utilisateur>/lerobot_my_dataset_shake_hands
```

## À propos des deux jeux de données utilisés dans le tutoriel

Ce chapitre illustre deux tâches, aux usages différents :

- **Attraper des oranges `lerobot_my_dataset_a`** : correspond aux deux commandes de collecte « une caméra » et « deux caméras » ci-dessus, et c'est aussi l'exemple utilisé dans [Entraînement Ubuntu local](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu)
- **Poignée de main `lerobot_my_dataset_shake_hands`** : correspond à la commande « Poignée de main » ci-dessus. De l'entraînement de la septième étape au déploiement de la huitième étape, le tutoriel l'utilise uniformément comme exemple, c'est pourquoi vous verrez que `--dataset.repo_id` et `--dataset.root` dans les commandes d'entraînement pointent vers lui

Autrement dit, **c'est le jeu de données de poignée de main qui constitue l'exemple fil rouge de la seconde moitié du tutoriel** ; veuillez le collecter en conséquence. Quant aux paramètres `--dataset.num_episodes=30`, `--dataset.episode_time_s=12` des commandes, ajustez-les selon votre propre tâche.

## Quelques points à surveiller lors de la collecte

- Le bras maître ne doit pas apparaître dans l'image, sinon le modèle apprendra aussi le bras maître comme caractéristique ; pour plus de détails, voir [Points d'attention pour la collecte de jeu de données](/fr/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes)
- Après chaque cycle de collecte, remettez l'objet à sa position de départ et gardez des actions aussi cohérentes que possible ; la cohérence du jeu de données importe plus que la quantité
- **Les paramètres de caméra (résolution, fps, rapport largeur/hauteur) lors de la collecte et de l'inférence doivent être parfaitement identiques**. La résolution est inscrite dans les métadonnées du jeu de données et vérifiée lors de l'entraînement et de l'inférence ; toute incohérence provoquera une erreur directe ; même sans erreur, une résolution différente implique un champ de vision (cadrage) différent, et le monde vu par le modèle ne correspondra pas à celui de votre démonstration. Ce tutoriel utilise uniformément `1280×720@30` ; pour changer de valeur, modifiez ensemble les trois commandes de collecte, de téléopération et de déploiement
- En cas de sortie en cours de route, ne vous arrêtez pas à l'étape reset, sinon ce cycle échouera à l'enregistrement faute d'images (sans impact sur les données déjà collectées)
- Si vous quittez en cours de route et souhaitez reprendre la collecte, utilisez `--resume=true`, et `--dataset.root` et `--dataset.repo_id` doivent être parfaitement identiques à la première fois

## Après la collecte

Les données sont enregistrées par défaut sous `~/.cache/huggingface/lerobot/<nom-utilisateur>/`. Ensuite :

1. Pour sauvegarder le jeu de données dans le cloud, voir [Téléverser un jeu de données sur HuggingFace (facultatif)](/fr/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload)
2. Pour commencer l'entraînement, passez à [Étape 7 : entraîner un modèle](/fr/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU) ; ce chapitre vous guidera d'abord pour téléverser les données et installer l'environnement sur la plateforme de GPU cloud

<RelatedProducts slugs="so-arm101" />
