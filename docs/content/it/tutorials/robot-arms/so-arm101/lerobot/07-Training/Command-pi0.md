---
title: "Passo 7: Comando di addestramento pi0"
description: "Comando di addestramento pi0 su GPU cloud: macchina consigliata, installazione delle dipendenze, parametri principali e avvio su un dataset di esempio."
---

# Passo 7: Comando di addestramento pi0

## Prima di eseguire

- **Ambiente**: attiva prima un'istanza seguendo [Configurazione dell'ambiente di addestramento su GPU cloud](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU) e carica il dataset, poi torna a questo capitolo per eseguire le sezioni "Installare l'ambiente" e "Comandi"
- **Dataset**: `--dataset.root=~/lerobot_my_dataset_shake_hands` nel comando punta al dataset di stretta di mano acquisito nel sesto passo. Se stai addestrando un tuo task, sostituiscilo con il nome del tuo dataset
- **Directory di output**: se `--output_dir` esiste già, eliminala prima con il comando `sudo rm -rf` indicato sopra, oppure usa un nuovo nome
- **Durante l'addestramento puoi in qualsiasi momento visualizzare le curve su wandb**, vedi [Visualizzare le curve di addestramento in tempo reale con wandb](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentazione di riferimento

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0.mdx

## Istanza GPU cloud consigliata

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0/1.png)

## Installazione dell'ambiente

```Shell
conda create -y -n lerobot-pi python=3.10 -y
conda activate lerobot-pi
conda install ffmpeg=7.1.1 -c conda-forge -y

cd lerobot
pip install -e ".[pi]"
```

## Comandi

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_A

lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0 \
  --output_dir=~/output_lerobot_train/shake/pi0_A \
  --job_name=shake_pi0_A \
  --policy.pretrained_path=lerobot/pi0_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --policy.freeze_vision_encoder=false \
  --policy.train_expert_only=false \
  --steps=50000 \
  --policy.device=cuda \
  --policy.push_to_hub=false \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --batch_size=8
```

L'addestramento inizia davvero solo dopo 20 minuti dall'esecuzione del comando

L'archivio del modello è di circa 5 GB, che diventano 7 GB una volta decompresso

<RelatedProducts slugs="so-arm101" />
