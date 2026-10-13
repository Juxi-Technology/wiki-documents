---
title: "Etapa 7: Recomendações de parâmetros de treinamento"
description: "Dicas práticas para os parâmetros do lerobot-train: reduzir o save_freq faz um modelo intermediário aparecer mais cedo; para tarefas simples (pegar, apertar a mão, colocar), 20 mil passos são totalmente suficientes."
---

# Etapa 7: Recomendações de parâmetros de treinamento

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

Você pode diminuir um pouco o parâmetro `save_freq` para que o modelo apareça mais cedo após o treinamento

Para tarefas simples (pegar objetos, apertar as mãos, posicionar), 20K passos de treinamento são totalmente suficientes

<RelatedProducts slugs="so-arm101" />
