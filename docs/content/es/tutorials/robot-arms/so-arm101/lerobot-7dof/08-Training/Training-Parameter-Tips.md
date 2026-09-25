---
title: "Recomendaciones de parámetros de entrenamiento"
description: "Guía práctica de los parámetros de lerobot-train (frecuencia de guardado, batch size y steps) y cómo equilibrar el tiempo de entrenamiento y los resultados."
---

# Recomendaciones de parámetros de entrenamiento



https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

Puedes reducir un poco el parámetro `save_freq` para ver antes el modelo después del entrenamiento



Para tareas sencillas (agarrar, dar la mano, colocar), entrenar 20K steps es completamente suficiente



