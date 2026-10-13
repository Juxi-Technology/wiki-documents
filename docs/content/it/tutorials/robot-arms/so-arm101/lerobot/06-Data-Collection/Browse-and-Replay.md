---
title: "Passo 6: Visualizzare e riprodurre un dataset"
description: "Consulta un dataset nel LeRobot Dataset Visualizer, visualizza un episodio specifico con lerobot-dataset-viz e riproduci il movimento del braccio follower con lerobot-replay per verificarne la qualità."
---

# Passo 6: Visualizzare e riprodurre un dataset

## Visualizzare l'intero dataset

https://huggingface.co/spaces/lerobot/visualize_dataset

http://io-ai.tech/lerobot

https://open.platform.io-ai.tech

Inserisci `TommyZihao/lerobot_zihao_dataset_a`, o un altro dataset

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-01.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-02.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-03.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-04.png)

Osservazione: il comando e lo stato non sono la stessa cosa — il comando è fornito dal braccio Leader, e lo stato è fornito dal braccio Follower

## Visualizzare un episodio specifico

```Shell
lerobot-dataset-viz --repo-id TommyZihao/lerobot_zihao_dataset_a --episode-index=2
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Browse-and-Replay/d39-05.png)

Trascina la timeline per vedere il feed della telecamera e le posizioni dei servo in qualsiasi momento

## Riprodurre il movimento del braccio Follower per un episodio specifico

```Shell
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_a \
    --dataset.episode=2
```

Sentirai `Replaying episode`, poi il braccio Follower si muove, riproducendo e ricreando il movimento dell'episodio specificato

In realtà, a questo punto puoi già impressionare molti profani, no?

[VID_20260115_140050.mp4](/downloads/VID_20260115_140050.mp4)

<RelatedProducts slugs="so-arm101" />
