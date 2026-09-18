---
title: "Passo 8: Descrizione dei comandi di deployment"
description: "Guida ai comandi di deployment di LeRobot: differenze tra raccolta dati e rollout, parametri principali, telecamera coerente e modalità base o episodica."
---

# Passo 8: Descrizione dei comandi di deployment

## Note sulla versione (importante, leggere per primo)

A partire da LeRobot **0.6.0**, il modello addestrato va distribuito con `lerobot-rollout`. La vecchia sintassi `lerobot-record --policy.path=...` era già stata rimossa nella versione **0.5.2**.

Questo tutorial installa LeRobot con `git clone` nel primo passo, ottenendo così la versione più recente attuale; usa pertanto la riga di comando `lerobot-rollout` riportata di seguito. Se insisti a usare `lerobot-record`, il programma restituirà direttamente un errore e ti suggerirà di passare a `lerobot-rollout`.

La divisione dei compiti tra i due comandi è la seguente:

- `lerobot-record`: si occupa solo della **raccolta dei dati di dimostrazione** (è quello usato nel sesto passo); ora rifiuta i nomi di dataset che iniziano con `eval_`
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

## I parametri della telecamera devono coincidere con quelli della raccolta

In tutti i comandi seguenti `--robot.cameras` usa `1280×720@30`, valore uniformato con [Raccolta del dataset di dimostrazione](/it/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording). In fase di deployment è necessario mantenere la risoluzione, gli fps e le proporzioni usati durante la raccolta: la risoluzione viene scritta nei metadati del dataset e sottoposta a verifica, e un'incoerenza genera direttamente un errore; anche se dovesse passare per fortuna, un campo visivo diverso farebbe "vedere al modello un mondo" diverso da quello che gli hai mostrato durante la dimostrazione, con un peggioramento evidente dei risultati.

## Informazioni sulla visualizzazione

`--display_data=true` avvia l'interfaccia di visualizzazione di rerun.io e allo stesso tempo salva l'immagine di ogni frame nella directory `/Users/<你的用户名>/.cache/huggingface/lerobot/rollout_lerobot_my_dataset_a/images/observation.images.front/episode-000000`; occupa parecchio spazio, quindi in uso ufficiale puoi impostarlo su `--display_data=false`.

## Esempio con il task di raccolta delle arance

- Valutazione dal vivo (con visualizzazione in tempo reale)

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

- Valutazione dal vivo (senza visualizzazione in tempo reale)

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=false
```

- Inferenza dal modello presente sul Repo di modelli HuggingFace

```Shell
lerobot-rollout  \
  --strategy.type=base \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=<用户名>/lerobot_my_model_a \
  --task="Grab Oranges" \
  --duration=60 \
  --display_data=true
```

Dopo l'esecuzione il modello verrà scaricato

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-CLI-Reference/1.png)

- Valutazione con registrazione dei dati (`--strategy.type=episodic`)

Se vuoi registrare il processo in un dataset mentre viene eseguito, sostituisci `base` con `episodic`. In questa modalità non si scrive `--task`, ma si usa `--dataset.single_task`, ed è obbligatorio fornire `--dataset.repo_id`:

```Shell
lerobot-rollout  \
  --strategy.type=episodic \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem5AAF2193061 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
  --robot.id=my_follower_arm \
  --policy.path=/Users/<你的用户名>/Downloads/7-lerobot/checkpoints/last/pretrained_model \
  --dataset.repo_id=<用户名>/rollout_lerobot_my_dataset_a \
  --dataset.num_episodes=10 \
  --dataset.single_task="Grab Oranges" \
  --display_data=false
```

<RelatedProducts slugs="so-arm101" />
