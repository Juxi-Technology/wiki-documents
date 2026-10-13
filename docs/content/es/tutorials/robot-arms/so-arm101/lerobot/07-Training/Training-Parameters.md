---
title: "Paso 7: Recomendaciones de parámetros de entrenamiento"
description: "Consejos prácticos para los parámetros de lerobot-train: reducir save_freq hace que aparezca antes un modelo intermedio; para tareas sencillas (agarrar, dar la mano, colocar) 20 000 pasos son más que suficientes."
---

# Paso 7: Recomendaciones de parámetros de entrenamiento

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

Puedes bajar un poco el parámetro `save_freq` para que el modelo aparezca antes tras el entrenamiento

Para tareas sencillas (recoger, dar la mano, colocar), 20K pasos de entrenamiento son más que suficientes

<RelatedProducts slugs="so-arm101" />
