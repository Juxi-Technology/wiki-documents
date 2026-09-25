---
title: "Sugestões de parâmetros de treinamento"
description: "Orientações práticas sobre os principais parâmetros do lerobot-train — frequência de save, batch size e steps — e como equilibrar tempo de treino e resultado."
---

# Sugestões de parâmetros de treinamento



https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

Você pode reduzir um pouco o parâmetro `save_freq`, assim será possível ver o modelo mais cedo após o treinamento



Para tarefas simples (pegar objetos, apertar mãos, colocar objetos), treinar 20K steps é totalmente suficiente



