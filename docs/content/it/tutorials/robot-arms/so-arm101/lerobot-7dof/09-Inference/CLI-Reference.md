---
title: "Descrizione dei comandi"
description: "Guida ai comandi di deployment di LeRobot: differenze tra raccolta dati e rollout, parametri principali, telecamera coerente e modalità base o episodica."
---

# Descrizione dei comandi

## Descrizione dei comandi

Con visualizzazione in tempo reale: \-\-display\_data=true

Senza visualizzazione in tempo reale: \-\-display\_data=false

Con `--display_data=true` si avvia la splendida interfaccia di visualizzazione di rerun\.io, ma nella directory `/Users/tommy/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000` viene salvata l'immagine di ogni frame, occupando molto spazio. In seguito puoi impostarlo su `--display_data=false`



Inferenza dal modello presente sul Repo di modelli HuggingFace: \-\-policy\.path=Tommymy/lerobot\_my\_model\_a



## Esempio con il task di raccolta delle arance

- Inferenza di un modello locale (con visualizzazione in tempo reale)

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

- Inferenza di un modello locale (senza visualizzazione in tempo reale)

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

- Inferenza dal modello presente sul Repo di modelli HuggingFace

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

Dopo l'esecuzione il modello verrà scaricato

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)









