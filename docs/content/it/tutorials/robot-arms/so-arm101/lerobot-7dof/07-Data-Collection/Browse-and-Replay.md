---
title: "Rivedere e riprodurre il dataset"
description: "Controllo degli episode registrati nel visualizzatore di dataset di LeRobot e riproduzione dei movimenti sul braccio, prima di passare all'addestramento."
---

# Rivedere e riprodurre il dataset

## Visualizzare l'intero dataset

https://huggingface\.co/spaces/lerobot/visualize\_dataset

http://io\-ai\.tech/lerobot

https://open\.platform\.io\-ai\.tech

Inserisci `TommyZihao/lerobot_zihao_dataset_a`, oppure un altro dataset

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)



![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

Osservazione: il comando e lo stato non coincidono; il comando è fornito dal braccio attivo Leader, lo stato dal braccio passivo Follower

## Visualizzare un episode specifico

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/4.png)

Trascina la barra temporale per visualizzare l'immagine della telecamera e la posizione dei servomotori in qualsiasi momento

## Riprodurre i movimenti del braccio passivo di un episode specifico

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

Si sentirà il suono `Replaying episode`, poi il braccio passivo si muoverà, riproducendo i movimenti dell'episode specificato



