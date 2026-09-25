---
title: "Collecte du dataset par démonstration - Poignée de main 200"
description: "Exemple concret : créez un dépôt de dataset sur Hugging Face et enregistrez 200 épisodes de poignée de main sur le bras 7-DOF avec lerobot-record."
---

# Collecte du dataset par démonstration \- Poignée de main 200

## Créer un Dataset Repo sur HuggingFace

https://huggingface\.co/new\-dataset

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## Supprimer le dataset du même nom déjà existant (le cas échéant)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Collecte du dataset Shake200

Une caméra, collecte du dataset \- Mac

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

## Collecte en cours

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

Commandes au clavier avec les flèches :
→ (flèche droite) termine prématurément l'épisode en cours ; passe à l'épisode suivant.
← (flèche gauche) annule l'épisode en cours ; recommence l'enregistrement.
ESC, arrête immédiatement, encode la vidéo et téléverse le dataset.

## Collecte terminée, répertoire de sauvegarde du dataset

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```



