---
title: "Etapa 7: Recomendações de parâmetros de treino"
description: "Dicas práticas para os parâmetros do lerobot-train: reduzir o save_freq faz aparecer mais cedo um modelo intermédio; para tarefas simples (agarrar, apertar a mão, colocar), 20 mil passos são totalmente suficientes."
---

# Etapa 7: Recomendações de parâmetros de treino

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

Pode reduzir um pouco o parâmetro `save_freq` para que o modelo apareça mais cedo após o treino

Para tarefas simples (apanhar, apertar a mão, colocar), 20K passos de treino são totalmente suficientes

<RelatedProducts slugs="so-arm101" />
