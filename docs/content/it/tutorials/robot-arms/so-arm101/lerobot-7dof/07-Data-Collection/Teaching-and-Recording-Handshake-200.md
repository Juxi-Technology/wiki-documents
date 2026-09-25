---
title: "Raccolta del dataset tramite insegnamento-Stretta di mano 200"
description: "Esempio pratico: creazione del repo dataset su Hugging Face e registrazione di 200 episode di stretta di mano con il braccio a 7DOF tramite lerobot-record."
---

# Raccolta del dataset tramite insegnamento\-Stretta di mano 200

## Creare un Dataset Repo su HuggingFace

https://huggingface\.co/new\-dataset

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## Eliminare il dataset con lo stesso nome già esistente (se presente)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Raccolta del dataset Shake200

Una telecamera, raccolta del dataset\-Computer Mac

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

## Raccolta in corso

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

Operazioni con i tasti direzionali della tastiera:
→ (freccia destra) termina in anticipo l'episode corrente; passa all'episode successivo.
← (freccia sinistra) annulla l'episode corrente; registra di nuovo.
ESC, arresta immediatamente, codifica il video e carica il dataset.

## Raccolta completata: directory di salvataggio del dataset

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```



