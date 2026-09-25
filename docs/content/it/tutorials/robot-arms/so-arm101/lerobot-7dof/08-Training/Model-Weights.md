---
title: "Ottenere il file dei pesi del modello"
description: "Ottenere il file dei pesi del modello dalla GPU cloud: creare un archivio della cartella dei checkpoint e scaricarlo sul computer per usarlo senza GPU."
---

# Ottenere il file dei pesi del modello



```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

Ogni 20K step viene salvato una volta il file dei pesi del modello



Fai clic con il tasto destro per scaricare l'archivio `ckpt.zip`, poi decomprimilo sul computer locale









## Stretta di mano

```Shell
# Modello salvato al numero di step di addestramento specificato
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# Il modello più recente
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```



