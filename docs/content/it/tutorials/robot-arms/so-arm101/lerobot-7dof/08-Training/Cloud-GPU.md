---
title: "Configurazione dell'ambiente di addestramento su GPU cloud"
description: "Preparare la macchina GPU cloud per addestrare i modelli: confronto tra gli algoritmi, installazione di LeRobot, wandb e trasferimento del dataset."
---

# Configurazione dell'ambiente di addestramento su GPU cloud

## Disattivare il proxy di rete del proprio computer

Altrimenti potrebbe non essere possibile aprire la riga di comando di Jupyter

## Accedere alla piattaforma GPU cloud Featurize

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

Entra nel gruppo utenti e di' al servizio clienti di essere un fan di Tongji Zihao Xiong per ricevere un buono sconto

## Avviare un'istanza GPU cloud

## Installare e configurare l'ambiente

```Shell
conda create -y -n lerobot python=3.12
conda activate lerobot
conda install ffmpeg=7.1.1 -c conda-forge -y
# git clone https://github.com/Seeed-Projects/lerobot.git ~/work/Lerobot
git clone https://github.com/huggingface/lerobot.git
cd lerobot
pip install -e ".[pi]"
pip install wandb --upgrade
# export HF_ENDPOINT=https://hf-mirror.com
hf auth login
```

## Accedere a wandb

```Shell
wandb login
Copia e incolla la chiave API, premi Invio
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## Montare il dataset

```Shell
Copia il comando di download dell'istanza, simile a:
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_zihao_dataset_shake_hands.zip
```

Il dataset comparirà nella directory `~`

## Modificare la frequenza di salvataggio dei pesi (opzionale)

Apri `lerobot/src/lerobot/configs/train.py`

Modifica save\_freq da 20\_000 a 5\_000

In questo modo potrai ottenere il file dei pesi del modello in una fase più precoce dell'addestramento



