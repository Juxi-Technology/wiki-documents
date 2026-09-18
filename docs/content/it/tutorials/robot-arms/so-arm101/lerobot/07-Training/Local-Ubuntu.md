---
title: "Passo 7: Addestramento su Ubuntu locale"
description: "Addestramento di un modello LeRobot su Ubuntu locale con scheda NVIDIA: dataset di esempio, parametri del comando e indicazioni sui percorsi di output."
---

# Passo 7: Addestramento su Ubuntu locale

Questo capitolo si applica al caso in cui il tuo computer disponga già di una scheda grafica NVIDIA, senza necessità di GPU cloud.

## Prima di eseguire

- **Ambiente**: è sufficiente averlo installato seguendo [Primo passo: installare l'ambiente LeRobot](/it/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu); per l'addestramento in locale non è necessario trasferire il dataset altrove
- **Dataset**: l'esempio seguente usa il dataset di raccolta delle arance `lerobot_my_dataset_a` acquisito nel primo capitolo del sesto passo; il percorso è scritto come percorso assoluto, sostituiscilo con il tuo nome utente
- **Addestramento su Mac**: sostituisci `/home/<nome-utente>/` nei comandi con `/Users/<nome-utente>/`
- **Directory di output**: se `--output_dir` esiste già, verrà restituito direttamente l'errore `FileExistsError`; usa un nuovo nome di directory, oppure aggiungi `--resume=true` per proseguire l'addestramento

## Documentazione di riferimento

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

- Nota

Prima di `` può esserci un solo spazio, dopo non deve esserci alcuno spazio

Quando il dataset è in locale, `--dataset.streaming` deve essere `false`, poiché non è necessaria la lettura in streaming

```Shell
lerobot-train \
  --dataset.repo_id=<nome-utente>/lerobot_my_dataset_a \
  --dataset.root=/home/<nome-utente>/.cache/huggingface/lerobot/<nome-utente>/lerobot_my_dataset_a \
  --dataset.revision=v0.4.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=output_lerobot_train/a \
  --job_name=orange_job \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=300000 \
  --batch_size=8
  
lerobot-train --dataset.repo_id=<nome-utente>/lerobot_my_dataset_a --dataset.root=/home/<nome-utente>/.cache/huggingface/lerobot/<nome-utente>/lerobot_my_dataset_a --dataset.revision=v0.4.0 --dataset.streaming=false --policy.type=act --output_dir=output_lerobot_train/a --job_name=orange_job --policy.device=cuda --wandb.enable=true --wandb.project=Lerobot_my_Project --policy.push_to_hub=false --steps=300000 --batch_size=8
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/3.png)

<RelatedProducts slugs="so-arm101" />
