---
title: "Étape 6 : Collecte par démonstration — Handshake 200"
description: "Exemple complet de collecte : créez d'abord un dépôt Dataset sur Hugging Face, puis enregistrez 200 épisodes de poignée de main avec une caméra via lerobot-record, avec les touches et le dossier d'enregistrement."
---

# Étape 6 : Collecte par démonstration — Handshake 200

## Créer un dépôt de jeu de données sur HuggingFace

https://huggingface.co/new-dataset

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-01.png)

## Supprimer tout jeu de données existant portant le même nom (le cas échéant)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Collecte du jeu de données Shake200

Une caméra, collecte d'un jeu de données - ordinateur Mac

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1920, height: 1080, fps: 60, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_shake200 \
    --dataset.num_episodes=200 \
    --dataset.single_task="Shanke Hands" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=12 \
    --dataset.reset_time_s=1
```

## Pendant la collecte

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-03.png)

Commandes par les touches fléchées du clavier :
→ (Flèche droite) Terminer l'épisode en cours de manière anticipée ; passer à l'épisode suivant.
← (Flèche gauche) Annuler l'épisode en cours ; l'enregistrer à nouveau.
ESC, arrêter immédiatement, encoder la vidéo et téléverser le jeu de données.

## Collecte terminée — Répertoire d'enregistrement du jeu de données

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

<RelatedProducts slugs="so-arm101" />
