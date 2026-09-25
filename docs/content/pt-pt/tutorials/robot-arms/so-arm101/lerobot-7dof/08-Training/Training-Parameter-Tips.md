---
title: "Sugestões de parâmetros de treino"
description: "Orientações práticas sobre os parâmetros do lerobot-train: frequência de gravação, batch size e passos, e o equilíbrio entre tempo de treino e resultados."
---

# Sugestões de parâmetros de treino



https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

Pode reduzir um pouco o parâmetro `save_freq`; assim, verá o modelo mais cedo durante o treino



Para tarefas simples (apanhar, apertar a mão, colocar), 20K passos de treino são completamente suficientes


