---
title: "Passo 6: Raccolta del dataset tramite insegnamento"
description: "Raccogliere un dataset tramite insegnamento con il comando di registrazione di LeRobot: segnaposto, episodi, due attività di esempio e gestione da tastiera."
---

# Passo 6: Raccolta del dataset tramite insegnamento

## Segnaposto nei comandi: sostituiscili prima con le tue informazioni

Il tutorial descrive passaggi generici, quindi a partire da questo punto nei comandi verranno usati due segnaposto, che rappresentano informazioni che solo tu possiedi. Sostituiscili secondo le spiegazioni seguenti e, al momento della sostituzione, **rimuovi anche le parentesi angolari**:

| Segnaposto | Cosa rappresenta | Come sostituirlo |
|---|---|---|
| `<nome-utente>` | il nome utente di sistema del tuo computer, cioè il nome della directory home | digitando `whoami` nel terminale puoi vederlo |
| `<nome-utente>` | il nome del tuo account HuggingFace | dopo aver effettuato l'accesso a HuggingFace, guarda il nome dell'account accanto all'avatar in alto a destra |

Un esempio. Supponiamo che l'output di `whoami` nel terminale sia `zhangsan` e che anche il nome del tuo account HuggingFace sia `zhangsan`, allora

- `/Users/<nome-utente>/.cache/huggingface/lerobot/<nome-utente>/` dovrebbe essere scritto come `/Users/zhangsan/.cache/huggingface/lerobot/zhangsan/`
- `<nome-utente>/lerobot_my_dataset_a` dovrebbe essere scritto come `zhangsan/lerobot_my_dataset_a`

> I due segnaposto presenti in tutti i comandi successivi vanno sostituiti allo stesso modo.

> **Attenzione**: il primo comando qui sotto è `sudo rm -rf` e serve a eliminare una directory. Assicurati che il percorso sia stato sostituito con il tuo prima di premere Invio.

## Eliminare il dataset con lo stesso nome già esistente (se presente)

```Shell
sudo rm -rf /Users/<nome-utente>/.cache/huggingface/lerobot/<nome-utente>/lerobot_my_dataset_a
```

## Una telecamera, raccolta del dataset-Computer Mac

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
    --dataset.repo_id=<nome-utente>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## Due telecamere, raccolta del dataset-Computer Mac

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
    --dataset.repo_id=<nome-utente>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## Raccolta in corso

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/1.jpg)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/2.jpg)

Operazioni con i tasti direzionali della tastiera:
→ (freccia destra) termina in anticipo l'episode corrente; passa all'episode successivo.
← (freccia sinistra) annulla l'episode corrente; registra di nuovo.
ESC, arresta immediatamente, codifica il video e carica il dataset.

## Raccolta completata: directory di salvataggio del dataset

```Shell
/Users/<nome-utente>/.cache/huggingface/lerobot/<nome-utente>/lerobot_my_dataset_a
```

## Stretta di mano

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
    --dataset.repo_id=<nome-utente>/lerobot_my_dataset_shake_hands \
    --dataset.num_episodes=30 \
    --dataset.single_task="Shanke Hands" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=12 \
    --dataset.reset_time_s=1
```

Al termine della raccolta, il dataset della stretta di mano verrà salvato in:

```Shell
/Users/<nome-utente>/.cache/huggingface/lerobot/<nome-utente>/lerobot_my_dataset_shake_hands
```

## Informazioni sui due dataset usati nel tutorial

Questo capitolo mostra due attività, con usi diversi:

- **Afferrare le arance `lerobot_my_dataset_a`**: corrisponde ai due comandi di raccolta "una telecamera" e "due telecamere" precedenti, ed è anche l'esempio usato nel capitolo [Addestramento su Ubuntu locale](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu)
- **Stretta di mano `lerobot_my_dataset_shake_hands`**: corrisponde al comando "Stretta di mano" qui sopra. Dal settimo passo dell'addestramento all'ottavo passo del deployment, il tutorial lo usa uniformemente come esempio, per questo vedrai che `--dataset.repo_id` e `--dataset.root` nei comandi di addestramento puntano entrambi ad esso

In altre parole, **è il dataset della stretta di mano l'esempio principale della seconda metà del tutorial**; raccoglilo secondo questo esempio. Quanto ai parametri come `--dataset.num_episodes=30` e `--dataset.episode_time_s=12` nei comandi, puoi regolarli in base alla tua attività.

## Alcuni punti da tenere presente durante la raccolta

- Il braccio attivo non deve comparire nell'immagine, altrimenti il modello imparerà a considerare anche il braccio attivo come caratteristica; per i dettagli vedi [Note sulla raccolta del dataset](/it/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes)
- Al termine di ogni raccolta riporta l'oggetto al punto di partenza e cerca di mantenere i movimenti il più possibile coerenti: la coerenza del dataset è più importante della quantità
- **I parametri della telecamera (risoluzione, fps, rapporto d'aspetto) durante la raccolta e l'inferenza devono essere completamente identici**. La risoluzione viene scritta nei metadati del dataset e viene verificata durante l'addestramento e l'inferenza: in caso di incoerenza verrà restituito direttamente un errore; anche senza errore, risoluzioni diverse significano campi visivi (inquadratura) diversi, e il mondo visto dal modello non corrisponderà a quello che vedevi durante l'insegnamento. Questo tutorial utilizza uniformemente `1280×720@30`; se vuoi cambiarlo con un altro valore, devi modificare insieme i comandi di raccolta, teleoperazione e deployment
- Se esci a metà, non fermarti nella fase reset, altrimenti questo ciclo non verrà salvato perché non contiene alcun frame (senza influire sui dati già raccolti)
- Se esci a metà e vuoi riprendere la raccolta, usa `--resume=true`, e `--dataset.root` e `--dataset.repo_id` devono essere completamente identici a quelli della prima volta

## Dopo aver completato la raccolta

I dati vengono salvati per impostazione predefinita in `~/.cache/huggingface/lerobot/<nome-utente>/`. Di seguito:

1. Se vuoi eseguire il backup del dataset sul cloud, vedi [Caricare il dataset su HuggingFace (opzionale)](/it/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload)
2. Per prepararti all'addestramento, continua con [Settimo passo: addestrare il modello](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU); quel capitolo ti guiderà prima a caricare i dati e a preparare l'ambiente sulla piattaforma GPU cloud

<RelatedProducts slugs="so-arm101" />
