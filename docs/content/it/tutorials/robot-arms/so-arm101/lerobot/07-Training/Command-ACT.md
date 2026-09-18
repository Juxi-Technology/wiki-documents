---
title: "Passo 7: Comando di addestramento ACT"
description: "Comando di addestramento ACT con LeRobot: perché iniziare da questo algoritmo leggero e veloce, parametri della riga di comando e avvio su GPU cloud."
---

# Passo 7: Comando di addestramento ACT

## Prima di eseguire

- **Ambiente**: è necessario prima configurare l'ambiente seguendo [Configurazione dell'ambiente di addestramento su GPU cloud](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU) e trasferire il dataset sulla GPU cloud. ACT è già incluso nell'ambiente di base di LeRobot, non serve installarlo separatamente
- **Dataset**: `--dataset.root=~/lerobot_my_dataset_shake_hands` nel comando punta al dataset di stretta di mano acquisito nel sesto passo. Se stai addestrando un tuo task, sostituiscilo con il nome del tuo dataset
- **Directory di output**: se `--output_dir` esiste già, verrà restituito direttamente l'errore `FileExistsError`; usa un nuovo nome di directory, oppure aggiungi `--resume=true` per proseguire l'addestramento
- **Durante l'addestramento puoi in qualsiasi momento visualizzare le curve su wandb**, vedi [Visualizzare le curve di addestramento in tempo reale con wandb](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentazione di riferimento

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/act.mdx

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

## Perché iniziare dall'algoritmo ACT

ACT è il primo modello che si consiglia di addestrare quando si usa LeRobot; i suoi vantaggi sono i seguenti:

- Il modello è estremamente leggero: ha solo ottanta milioni di parametri addestrabili

- La convergenza dell'addestramento è molto rapida e anche l'inferenza è veloce

- Con una singola GPU si vedono risultati dopo un'ora di addestramento

- Il modello ACT in sé è molto piccolo: l'archivio compresso è di circa 200 MB, il che lo rende molto comodo da archiviare e trasferire. L'archivio del modello prodotto dall'addestramento è di circa 300 MB (vedi in fondo a questo capitolo)

- Per il dataset, raccogliere circa 30 episodi di dati è generalmente sufficiente

- Può essere distribuito per l'inferenza su un computer host Ubuntu, un Mac, un PC Windows e persino su un Raspberry Pi

- L'effetto dell'inferenza sul robot reale è comunque piuttosto buono, sufficiente per task semplici come afferrare, stringere la mano o posare una penna

- L'algoritmo ACT è già incluso nell'ambiente di base della libreria LeRobot, non è necessario installare altre librerie

## Comandi

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=~/output_lerobot_train/shake/act/ \
  --job_name=shake_act_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=20000 \
  --batch_size=8
```

## Descrizione dei comandi

Prima del carattere di continuazione di riga `` può esserci un solo spazio, dopo non deve esserci alcuno spazio

|Parametro della riga di comando|Descrizione|
|---|---|
|--dataset.repo_id|Repo_ID del dataset HuggingFace, nella forma `nome_utente/nome_dataset`|
|--dataset.root|Percorso locale del dataset. Se il dataset è già stato scaricato in locale, deve puntare alla directory effettiva|
|--dataset.revision|Versione del dataset, specificata al momento del caricamento del dataset su HuggingFace|
|--dataset.streaming|Indica se usare la lettura in streaming. Quando il dataset è in locale, imposta `false`, poiché non è necessaria la lettura in streaming|
|--policy.type|Algoritmo da addestrare, ad esempio act, smolvla, diffusion, pi0, pi05, pi0_fast, wall_x|
|--output_dir|Directory in cui salvare l'output dell'addestramento|
|--job_name|Nome dell'attività di addestramento corrente|
|--policy.device|Dispositivo di calcolo|
|--wandb.enable|Abilita la visualizzazione wandb|
|--wandb.project|Nome del progetto wandb|
|--policy.push_to_hub|Invia il modello addestrato al cloud HuggingFace|
|--steps|Numero di step di addestramento|
|--batch_size|Quantità di dati inserita in uno step; se la VRAM non è sufficiente, va ridotta|

## Processo di addestramento

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)

L'archivio del modello è di circa 300 MB

<RelatedProducts slugs="so-arm101" />
