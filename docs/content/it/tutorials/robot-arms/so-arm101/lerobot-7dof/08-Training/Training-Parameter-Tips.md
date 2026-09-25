---
title: "Suggerimenti sui parametri di addestramento"
description: "Consigli pratici sui parametri di lerobot-train — frequenza di salvataggio, batch size e step — per bilanciare tempo di addestramento e risultati."
---

# Suggerimenti sui parametri di addestramento



https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

Puoi ridurre opportunamente il parametro `save_freq`, così dopo l'addestramento vedrai il modello prima



Per task semplici (afferrare, stringere la mano, posare), 20K step di addestramento sono del tutto sufficienti



