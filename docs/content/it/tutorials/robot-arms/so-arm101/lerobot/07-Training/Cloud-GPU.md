---
title: "Passo 7: Ambiente di addestramento su GPU cloud"
description: "Preparare la macchina GPU cloud per addestrare i modelli: confronto tra gli algoritmi, installazione di LeRobot, wandb e trasferimento del dataset."
---

# Passo 7: Ambiente di addestramento su GPU cloud

## Prima di iniziare l'addestramento, leggi qui

Il dataset è già stato acquisito nel sesto passo; ora si passa all'addestramento del modello. Questo passo comprende tre attività, e il presente capitolo si occupa delle prime due:

1. **Preparare l'ambiente di addestramento**: attivare un'istanza sulla piattaforma GPU cloud e installare LeRobot, ffmpeg, wandb, ecc. (questo capitolo)
2. **Trasferire il dataset sulla GPU cloud**: i dati acquisiti nel sesto passo sono ancora sul tuo computer (sezione "Montare il dataset" di questo capitolo)
3. **Eseguire il comando di addestramento**: come scegliere l'algoritmo e come regolare i parametri, vedi i capitoli seguenti

## Dataset utilizzato nel tutorial

Nei comandi di addestramento e inferenza il dataset usato è **il task di stretta di mano `lerobot_my_dataset_shake_hands`** (è quello mostrato nel terzo capitolo del sesto passo), con percorso locale `~/lerobot_my_dataset_shake_hands`. Prima di eseguire il comando di addestramento, verifica che questa directory esista davvero e che il nome sia identico.

Se vuoi addestrare un task acquisito da te, sostituisci semplicemente tutte le occorrenze di `lerobot_my_dataset_shake_hands` nei comandi con il nome del tuo dataset.

## Come scegliere l'algoritmo di addestramento

| Algoritmo | Documentazione | Caratteristiche |
|---|---|---|
| ACT | [Comando di addestramento-ACT](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT) | Consigliato per iniziare: modello piccolo, addestramento rapido, con una singola GPU si vedono risultati in un'ora |
| SmolVLA | [Comando di addestramento-smolvla](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla) | Consigliato per progredire: consente il fine-tuning basato su un modello pre-addestrato |
| pi0 | [Comando di addestramento-pi0](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0) | Risultati migliori, ma con elevato consumo di VRAM e addestramento lento |
| pi0.5 | [Comando di addestramento-pi0.5](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5) | Versione migliorata di pi0 |
| pi0fast | [Comando di addestramento-pi0fast](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast) | Inferenza più rapida |

Si consiglia di eseguire prima l'intera procedura con ACT e, una volta acquisita familiarità, passare ad altri algoritmi.

## Dopo l'addestramento

- Per caricare il modello addestrato su Hugging Face (backup, cambio di macchina, condivisione con altri), vedi [Caricare il modello su HuggingFace (opzionale)](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)
- Per scaricare il modello sul tuo computer locale, vedi [Ottenere il file dei pesi del modello](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights)

## Addestramento in locale

Se il tuo computer dispone già di una scheda grafica NVIDIA, puoi fare a meno della GPU cloud e addestrare direttamente in locale; vedi [Addestramento su Ubuntu locale](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu).

## Disattivare il proxy di rete del proprio computer

Altrimenti potrebbe non essere possibile aprire la riga di comando di Jupyter

## Accedere alla piattaforma GPU cloud Featurize

https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1

## Avviare un'istanza GPU cloud

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/4.png)

> Fai clic su "JupyterLab" in basso; in alto a sinistra c'è un pulsante di caricamento, da cui puoi caricare codice e dataset
> 
> 

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

# Se non carichi su Huggingface e non ti serve wandb, non è necessario installarlo
```

> Se durante l'installazione del modello manca "training", è necessario installarlo separatamente
> 
> `pip install -e ".[training]"`
> 
> 

## Accedere a wandb

```Shell
wandb login
Copia e incolla la chiave API, premi Invio
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## Montare il dataset

Primo passo: comprimi in un file zip il dataset acquisito nel sesto passo e caricalo nella sezione "Dataset" della piattaforma GPU cloud (in alto a sinistra in JupyterLab c'è un pulsante di caricamento). Una volta completata l'elaborazione, la piattaforma ti fornirà un comando di download.

Secondo passo: esegui questo comando di download nella riga di comando dell'istanza e decomprimi:

```Shell
Copia il comando di download dell'istanza, simile a:
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_my_dataset_shake_hands.zip
```

Il dataset comparirà nella directory `~`.

Dopo la decompressione puoi verificare con `ls ~`; il nome della directory deve corrispondere esattamente a `--dataset.root` nel comando di addestramento (sia questo capitolo sia quelli successivi usano `~/lerobot_my_dataset_shake_hands`). Se dalla decompressione risulta un livello aggiuntivo con lo stesso nome, ad esempio `~/lerobot_my_dataset_shake_hands/lerobot_my_dataset_shake_hands`, sposta il contenuto del livello interno in quello esterno, oppure punta direttamente `--dataset.root` al livello effettivo.

## Modificare la frequenza di salvataggio dei pesi (opzionale)

Apri `lerobot/src/lerobot/configs/train.py`

Modifica save_freq da 20_000 a 5_000

In questo modo potrai ottenere il file dei pesi del modello in una fase più precoce dell'addestramento

<RelatedProducts slugs="so-arm101" />
