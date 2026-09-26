---
title: "Descrizione dei comandi"
description: "Guida ai comandi di deployment di LeRobot: differenze tra raccolta dati e rollout, parametri principali, telecamera coerente e modalità base o episodica."
---

# Descrizione dei comandi

## Note sulla versione (importante, leggere per primo)

A partire da LeRobot **0.6.0**, il modello addestrato va distribuito con `lerobot-rollout`. La vecchia sintassi `lerobot-record --policy.path=...` era già stata rimossa nella versione **0.5.2**.

Questo tutorial installa LeRobot con `git clone` nel primo passo, ottenendo così la versione più recente attuale; usa pertanto la riga di comando `lerobot-rollout` riportata di seguito. Se insisti a usare `lerobot-record`, il programma restituirà direttamente un errore e ti suggerirà di passare a `lerobot-rollout`.

La divisione dei compiti tra i due comandi è la seguente:

- `lerobot-record`: si occupa solo della **raccolta dei dati di dimostrazione** (è quello usato nel settimo passo); ora rifiuta i nomi di dataset che iniziano con `eval_`
- `lerobot-rollout`: si occupa del **deployment del modello addestrato**; con `--strategy.type` si sceglie la modalità di funzionamento

## Parametri della riga di comando di rollout

| Parametro | Descrizione |
|---|---|
| `--strategy.type` | Modalità di funzionamento. `base` esegue solo il modello senza registrare dati, per valutare l'effetto dal vivo; `episodic` registra per episodio con una fase di reset, con un comportamento simile alla vecchia versione di `lerobot-record` |
| `--policy.path` | Percorso del modello, che punta a `checkpoints/last/pretrained_model` nell'output dell'addestramento |
| `--task` | Descrizione del task, da usare insieme a `--strategy.type=base` |
| `--duration` | Numero di secondi di esecuzione; `0` indica nessun limite di tempo |
| `--interactive` | Aggiungilo quando devi intervenire durante l'esecuzione; nel terminale puoi controllare con comandi come `/stop` e `/reset` |
| `--display_data` | Indica se avviare l'interfaccia di visualizzazione rerun.io |
| `--policy.device` | Dispositivo di calcolo, ad esempio `cuda`, `cpu` |

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









