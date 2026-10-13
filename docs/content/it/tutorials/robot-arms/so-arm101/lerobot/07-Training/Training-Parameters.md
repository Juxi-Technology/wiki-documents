---
title: "Passo 7: Consigli sui parametri di addestramento"
description: "Consigli pratici sui parametri di lerobot-train: ridurre save_freq fa comparire prima un modello intermedio; per compiti semplici (afferrare, stringere la mano, posare) 20.000 passi sono più che sufficienti."
---

# Passo 7: Consigli sui parametri di addestramento

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

Puoi abbassare un po' il parametro `save_freq` in modo che il modello compaia prima dopo l'addestramento

Per compiti semplici (prelievo, stretta di mano, posizionamento), 20K step di addestramento sono del tutto sufficienti

<RelatedProducts slugs="so-arm101" />
