---
title: "Passo 7: Comando di addestramento SmolVLA"
description: "Comando di addestramento SmolVLA: fine-tuning da modello preaddestrato oppure addestramento da zero, con dipendenze e parametri per entrambe le modalità."
---

# Passo 7: Comando di addestramento SmolVLA

## Prima di eseguire

- **Ambiente**: attiva prima un'istanza seguendo [Configurazione dell'ambiente di addestramento su GPU cloud](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU) e carica il dataset; nota che smolvla richiede l'installazione di dipendenze aggiuntive, vedi "Installazione dell'ambiente" qui sotto
- **Dataset**: `--dataset.root=~/lerobot_my_dataset_shake_hands` nel comando punta al dataset di stretta di mano acquisito nel sesto passo. Se stai addestrando un tuo task, sostituiscilo con il nome del tuo dataset
- **Due modalità di addestramento**: il fine-tuning basato su un modello pre-addestrato offre di norma risultati migliori e una convergenza più rapida; l'addestramento da zero non richiede di scaricare i pesi pre-addestrati. Scegli in base alle tue esigenze
- **Durante l'addestramento puoi in qualsiasi momento visualizzare le curve su wandb**, vedi [Visualizzare le curve di addestramento in tempo reale con wandb](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentazione di riferimento

https://huggingface.co/docs/lerobot/smolvla

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_smolvla_README.md

## Installazione dell'ambiente

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## Fine-tuning basato su un modello pre-addestrato (consigliato)

```Shell
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## Addestramento da zero

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## Scaricare il modello

L'archivio del modello smolvla è di circa 1 GB

<RelatedProducts slugs="so-arm101" />
