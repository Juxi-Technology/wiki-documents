---
title: "Passo 7: Ottenere il file dei pesi del modello"
description: "Ottenere il file dei pesi del modello dalla GPU cloud: creare un archivio della cartella dei checkpoint e scaricarlo sul computer per usarlo senza GPU."
---

# Passo 7: Ottenere il file dei pesi del modello

Al termine dell'addestramento sulla GPU cloud, puoi impacchettare e scaricare il modello in locale:

```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

Ogni 20K step viene salvato una volta il file dei pesi del modello

Fai clic con il tasto destro per scaricare l'archivio `ckpt.zip`, poi decomprimilo sul computer locale

> Se devi inviare il modello ad altre persone, oppure prevedi di eseguire l'inferenza su un altro computer, caricarlo direttamente su Hugging Face è più semplice che impacchettarlo e scaricarlo; vedi [Caricare il modello su HuggingFace (opzionale)](/it/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload).

## Stretta di mano

```Shell
# Modello salvato al numero di step di addestramento specificato
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# Il modello più recente
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

<RelatedProducts slugs="so-arm101" />
