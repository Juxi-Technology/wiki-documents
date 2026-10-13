---
title: "Passo 6: Raccolta tramite dimostrazione — Handshake 200"
description: "Esempio completo di raccolta: crea prima un repository Dataset su Hugging Face, poi registra 200 episodi di stretta di mano con una telecamera tramite lerobot-record, con i tasti e la cartella di salvataggio."
---

# Passo 6: Raccolta tramite dimostrazione — Handshake 200

## Creare un repository di dataset su HuggingFace

https://huggingface.co/new-dataset

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-01.png)

## Eliminare qualsiasi dataset esistente con lo stesso nome (se presente)

```Shell
sudo rm -rf /Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

## Raccolta del dataset Shake200

Una telecamera, raccolta di un dataset - computer Mac

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

## Durante la raccolta

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording-Handshake-200/d37-03.png)

Controlli con i tasti freccia della tastiera:
→ (Freccia destra) Termina anticipatamente l'episodio corrente; passa all'episodio successivo.
← (Freccia sinistra) Annulla l'episodio corrente; registralo di nuovo.
ESC, ferma immediatamente, codifica il video e carica il dataset.

## Raccolta terminata — Directory di salvataggio del dataset

```Shell
/Users/tommy/.cache/huggingface/lerobot/Tommymy/lerobot_my_dataset_shake200
```

<RelatedProducts slugs="so-arm101" />
